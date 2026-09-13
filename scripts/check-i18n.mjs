#!/usr/bin/env node
/**
 * Vergleicht die Schlüsselpfade aller vorhandenen src/site/i18n/<lang>.js
 * gegen die deutsche Datei (die massgebliche Quelle) und meldet Abweichungen:
 * fehlende Schlüssel, überzählige Schlüssel und — nur für die fünf
 * Übersetzungen — ein fehlendes `precedenceNote` in pages.privacy/pages.terms.
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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const I18N_DIR = path.resolve(__dirname, '../src/site/i18n')
const DEFAULT_LANG = 'de'

/** Rekursive Schlüsselpfade, Arrays als eine Einheit (identisch zu i18n.test.js). */
function keyPaths(value, prefix = '') {
  if (Array.isArray(value) || value === null || typeof value !== 'object') return [prefix]
  return Object.keys(value).flatMap((k) => keyPaths(value[k], prefix ? `${prefix}.${k}` : k))
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

  const translationLangs = LANGS.map((l) => l.v).filter((v) => v !== DEFAULT_LANG)
  let checked = 0

  for (const lang of translationLangs) {
    const file = path.join(I18N_DIR, `${lang}.js`)
    if (!existsSync(file)) continue // noch nicht übersetzt — kein Befund
    checked += 1

    const translation = await loadSite(lang)
    const ownKeys = new Set(keyPaths(translation))
    const expected = new Set([...baseKeys, ...requiredExtra])

    const missing = [...expected].filter((k) => !ownKeys.has(k)).sort()
    const extra = [...ownKeys].filter((k) => !expected.has(k)).sort()

    if (missing.length || extra.length) {
      findings.push({ lang, missing, extra })
    }
  }

  if (findings.length === 0) {
    const note = checked === 0
      ? '(noch keine Übersetzungsdateien vorhanden)'
      : `(${checked} Übersetzung${checked === 1 ? '' : 'en'} geprüft)`
    console.log(`i18n-Check: keine Abweichungen ${note}.`)
    process.exit(0)
  }

  console.error('i18n-Check: Abweichungen gefunden:\n')
  for (const { lang, missing, extra } of findings) {
    console.error(`  ${lang}.js`)
    for (const key of missing) console.error(`    fehlt:      ${key}`)
    for (const key of extra) console.error(`    überzählig: ${key}`)
  }
  console.error('')
  process.exit(1)
}

main()
