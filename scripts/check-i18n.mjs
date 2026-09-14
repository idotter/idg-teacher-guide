#!/usr/bin/env node
/**
 * Vergleicht alle vorhandenen src/site/i18n/<lang>.js gegen die deutsche Datei
 * (die massgebliche Quelle) und meldet Abweichungen:
 *
 *  - fehlende / überzählige Schlüsselpfade (inkl. `precedenceNote`: im
 *    Deutschen erlaubt zu fehlen, in den fünf Übersetzungen Pflicht)
 *  - je Array: abweichende Länge, abweichende Folge der `t`-Blocktypen
 *    (bei Block-Listen wie `body`) und abweichende Markup-Ziele
 *    (`[Text](url)` / `[Text](path:key)`) — reine Schlüsselgleichheit sieht
 *    ein Array als einen einzigen Pfad und wäre blind für fehlende Absätze,
 *    verkürzte FAQ-Listen oder verlorene Links
 *  - `lang`, das nicht zum Dateinamen passt, und `htmlLang`/`ogLocale`, die
 *    identisch mit dem Deutschen geblieben sind (typisches Zeichen einer
 *    kopierten, aber nicht übersetzten Datei)
 *
 * Dazu eine Prüfung, die **alle sechs Dateien einschliesslich Deutsch** trifft
 * und nicht vergleicht, sondern zusichert: jedes Linkziel muss so gebaut sein,
 * dass der Inline-Parser in `src/site/pages.jsx` es lesen kann — `path:`-Ziele
 * lösen in der Segment-Tabelle auf, kein Ziel trägt eine Klammer. Der Vergleich
 * gegen Deutsch fängt einen Neuzugang in einer Übersetzung ab; die deutsche
 * Referenz selbst liest sonst niemand gegen. Siehe `src/site/i18n/link-targets.js`.
 *
 * Übersetzungsdateien, die es noch nicht gibt (z. B. vor Task 3), werden
 * stillschweigend übersprungen — das ist kein Befund.
 *
 * Aufruf: node scripts/check-i18n.mjs
 * Rückgabecode 1, wenn es Befunde gibt, sonst 0.
 */
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { LANGS } from '../src/content/langs.js'
import { keyPaths } from '../src/site/i18n/key-paths.js'
import { collectLinkTargets, linkTargetFindings } from '../src/site/i18n/link-targets.js'
import { SEGMENTS } from '../src/site/i18n/segments.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const I18N_DIR = path.resolve(__dirname, '../src/site/i18n')
const DEFAULT_LANG = 'de'

/**
 * Vergleicht Array-Strukturen rekursiv gegen die deutsche Referenz (`de`):
 * Länge, Blocktyp-Folge (wenn Elemente ein `t`-Feld tragen, wie `body`) und
 * Markup-Ziele. `keyPaths` behandelt Arrays als ein einziges Blatt und sieht
 * das nicht — das holt diese Funktion nach. Gibt lesbare Befund-Strings zurück.
 */
function structuralFindings(de, other, path_ = '') {
  const findings = []

  if (Array.isArray(de)) {
    if (!Array.isArray(other)) {
      findings.push(`${path_}: kein Array in der Übersetzung`)
      return findings
    }
    if (de.length !== other.length) {
      findings.push(`${path_}: Länge weicht ab (DE=${de.length}, Übersetzung=${other.length})`)
    }

    const hasBlockTypes = de.length > 0 && de.every((el) => el && typeof el === 'object' && 't' in el)
    if (hasBlockTypes) {
      const deTypes = de.map((el) => el.t)
      const otherTypes = other.map((el) => el?.t)
      if (JSON.stringify(deTypes) !== JSON.stringify(otherTypes)) {
        findings.push(`${path_}: Blocktyp-Folge weicht ab (DE=[${deTypes.join(', ')}], Übersetzung=[${otherTypes.join(', ')}])`)
      }
    }

    const deTargets = collectLinkTargets(de)
    const otherTargets = collectLinkTargets(other)
    if (JSON.stringify(deTargets) !== JSON.stringify(otherTargets)) {
      findings.push(`${path_}: Markup-Ziele weichen ab (DE=[${deTargets.join(', ')}], Übersetzung=[${otherTargets.join(', ')}])`)
    }

    // In gemeinsame Elemente absteigen, damit verschachtelte Arrays (z. B.
    // der `v`-Array eines `ul`-Blocks) ebenfalls geprüft werden.
    const n = Math.min(de.length, other.length)
    for (let i = 0; i < n; i++) {
      findings.push(...structuralFindings(de[i], other[i], `${path_}[${i}]`))
    }
    return findings
  }

  if (de && typeof de === 'object') {
    for (const k of Object.keys(de)) {
      const childPath = path_ ? `${path_}.${k}` : k
      findings.push(...structuralFindings(de[k], other?.[k], childPath))
    }
    return findings
  }

  return findings
}

/** Prüft lang/htmlLang/ogLocale — typische Zeichen einer kopierten, aber nicht übersetzten Datei. */
function identityFindings(lang, translation, de) {
  const findings = []
  if (translation.lang !== lang) {
    findings.push(`lang stimmt nicht mit Dateiname überein (erwartet '${lang}', gefunden '${translation.lang}')`)
  }
  if (translation.htmlLang === de.htmlLang) {
    findings.push(`htmlLang ist identisch mit Deutsch ('${translation.htmlLang}') — vermutlich unübersetzte Kopie`)
  }
  if (translation.ogLocale === de.ogLocale) {
    findings.push(`ogLocale ist identisch mit Deutsch ('${translation.ogLocale}') — vermutlich unübersetzte Kopie`)
  }
  return findings
}

async function loadSite(lang) {
  const file = path.join(I18N_DIR, `${lang}.js`)
  const mod = await import(pathToFileURL(file).href)
  return mod.default
}

async function main() {
  const findings = []

  const defaultFile = path.join(I18N_DIR, `${DEFAULT_LANG}.js`)
  if (!existsSync(defaultFile)) {
    console.error(`i18n-Check: ${path.relative(process.cwd(), defaultFile)} fehlt — kann nicht prüfen.`)
    process.exit(1)
  }
  const de = await loadSite(DEFAULT_LANG)
  const baseKeys = new Set(keyPaths(de))

  // precedenceNote ist im Deutschen erlaubt zu fehlen, in den Übersetzungen Pflicht.
  const requiredExtra = ['pages.privacy.precedenceNote', 'pages.terms.precedenceNote']

  // Zusicherung über alle Sprachen, Deutsch eingeschlossen: Linkziele, die der
  // Inline-Parser lesen kann. Kein Vergleich, sondern eine eigene Prüfung.
  const deLinks = linkTargetFindings(de, SEGMENTS[DEFAULT_LANG])
  if (deLinks.length) {
    findings.push({ lang: DEFAULT_LANG, missing: [], extra: [], structural: [], identity: [], links: deLinks })
  }
  let linkChecked = 1

  const translationLangs = LANGS.map((l) => l.v).filter((v) => v !== DEFAULT_LANG)
  let checked = 0

  for (const lang of translationLangs) {
    const file = path.join(I18N_DIR, `${lang}.js`)
    if (!existsSync(file)) continue // noch nicht übersetzt — kein Befund
    checked += 1
    linkChecked += 1

    const translation = await loadSite(lang)
    const ownKeys = new Set(keyPaths(translation))
    const expected = new Set([...baseKeys, ...requiredExtra])

    const missing = [...expected].filter((k) => !ownKeys.has(k)).sort()
    const extra = [...ownKeys].filter((k) => !expected.has(k)).sort()
    const structural = structuralFindings(de, translation)
    const identity = identityFindings(lang, translation, de)
    const links = linkTargetFindings(translation, SEGMENTS[lang] || SEGMENTS[DEFAULT_LANG])

    if (missing.length || extra.length || structural.length || identity.length || links.length) {
      findings.push({ lang, missing, extra, structural, identity, links })
    }
  }

  if (findings.length === 0) {
    const note = checked === 0
      ? '(noch keine Übersetzungsdateien vorhanden)'
      : `(${checked} Übersetzung${checked === 1 ? '' : 'en'} geprüft)`
    console.log(`i18n-Check: keine Abweichungen ${note}, Linkziele in ${linkChecked} Dateien geprüft.`)
    process.exit(0)
  }

  console.error('i18n-Check: Abweichungen gefunden:\n')
  for (const { lang, missing, extra, structural, identity, links = [] } of findings) {
    console.error(`  ${lang}.js`)
    for (const key of missing) console.error(`    fehlt:      ${key}`)
    for (const key of extra) console.error(`    überzählig: ${key}`)
    for (const msg of identity) console.error(`    identität:  ${msg}`)
    for (const msg of structural) console.error(`    struktur:   ${msg}`)
    for (const msg of links) console.error(`    linkziel:   ${msg}`)
  }
  console.error('')
  process.exit(1)
}

main()
