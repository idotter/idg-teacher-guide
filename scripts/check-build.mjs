#!/usr/bin/env node
/**
 * Prüft die gebaute Website (dist/) gegen die Mehrsprachigkeits-Spec. Läuft
 * nach `npm run build` (bzw. `npm run check:build`, das build voraussetzt).
 *
 * Sieben Prüfungen über alle HTML-Dateien in dist/:
 *
 *  1. `<html lang>` passt zur Route (htmlLangOf der Routensprache)
 *  2. genau ein `<link rel="canonical">`, und es zeigt auf die eigene URL
 *  3. indexierte Seiten haben genau 7 `hreflang`-Zeilen (6 Sprachen +
 *     x-default), `noindex`-Seiten keine
 *  4. `dist/sitemap.xml` enthält genau 198 `<loc>`, keine davon zeigt auf
 *     eine `noindex`-Seite (Datenschutz/Nutzungsbedingungen/App, alle Sprachen)
 *  5. keine Datei unter `dist/{en,fr,es,it,sv}/` enthält ein deutsches
 *     Kartenwort (`Reflexionsfragen`, `Lehrperson`, `Anknüpfungspunkte`) —
 *     der Brief nennt nur fr/es/it/sv, das deckt `dist/en/` nicht ab
 *     (Task 8, Teil A). Seit Task 9 (`seo/meta.js#webApplicationJsonLd`
 *     lokalisiert) kommt keines dieser Wörter mehr in JSON-LD vor — die
 *     Prüfung läuft darum über die volle Datei, ohne Ausschluss.
 *  6. jeder Pfad aus `scripts/content-routes.json` existiert als Datei
 *  7. keine Datei unter `dist/{en,fr,es,it,sv}/` enthält den deutschen
 *     Markennamen "im Schulalltag" — mit zwei benannten Ausnahmen:
 *     - `og:image:alt`/`twitter:image:alt` bleiben deutsch, weil sie ein
 *       tatsächlich deutschsprachiges Bild beschreiben (`/og-image.png`), das
 *       bewusst für alle Sprachen dasselbe ist (Task 8, Teil B Rest 1).
 *     - `<script type="application/ld+json">`-Blöcke: vier Felder benennen
 *       dort bewusst die Entität selbst statt die Seite (`WebSite.name`,
 *       `WebApplication.name`, `publisher.name`, das `Organization`-
 *       `mainEntity` der Kontaktseite) und bleiben darum weiterhin der feste,
 *       sprachübergreifende `SITE_NAME` (Task 6, siehe Kommentar in
 *       `site-info.js`). Die übrigen JSON-LD-Felder, die vor Task 9 ebenfalls
 *       fest Deutsch waren (`keywords`, `featureList`, `audience.audienceType`,
 *       `isPartOf.name`, `mainEntity.name` der Dimensionsseite), sind seither
 *       lokalisiert und stünden ohne den `SITE_NAME`-Ausschluss oben nicht
 *       mehr im Weg — sie bleiben aber Teil des Ausschlusses, weil dieser
 *       ganze `<script>`-Block übersprungen wird, nicht einzelne Felder darin.
 *
 * Verifiziert: nach diesen beiden Ausnahmen bleiben in keiner der 175
 * fremdsprachigen Dateien Treffer auf "im Schulalltag" übrig, und ganz ohne
 * JSON-LD-Ausschluss auch keine auf die drei Kartenwörter aus Prüfung 5
 * (siehe restsprachen-report.md).
 *
 * Rückgabecode 1 bei Befunden (Datei + Prüfungsname stehen in der Meldung),
 * sonst 0.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { absoluteUrl, htmlLangOf, pageFromHtmlFilename, SITE_URL } from '../src/seo/meta.js'
import { DEFAULT_LANG, LANG_IDS, localizedPath } from '../src/site/routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

// Die fünf nichtdeutschen Sprachen — Geltungsbereich von Prüfung 5 und 7.
const FOREIGN_LANGS = LANG_IDS.filter((lang) => lang !== DEFAULT_LANG)
const GERMAN_CARD_WORDS = ['Reflexionsfragen', 'Lehrperson', 'Anknüpfungspunkte']
const GERMAN_BRAND_PHRASE = 'im Schulalltag'

// Benannte Ausnahme zu Prüfung 7 (siehe Kopfkommentar): diese beiden
// Attribute dürfen den deutschen Markennamen tragen, weil sie das
// sprachübergreifend gleiche, deutschsprachige og-image.png beschreiben.
const CHECK7_EXEMPT_TAGS = [
  /<meta property="og:image:alt" content="[^"]*">/i,
  /<meta name="twitter:image:alt" content="[^"]*">/i,
]

const findings = []

function report(file, check, detail) {
  findings.push(`${file}: ${check} — ${detail}`)
}

/** Alle *.html unter `dir`, als zu `dir` relative, Slash-normierte Pfade. */
function findHtmlFiles(dir, base = dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name)
    if (statSync(full).isDirectory()) {
      findHtmlFiles(full, base, out)
    } else if (name.endsWith('.html')) {
      out.push(relative(base, full).split(sep).join('/'))
    }
  }
  return out
}

function isForeignPath(relPath) {
  return FOREIGN_LANGS.some((lang) => relPath === `${lang}/index.html` || relPath.startsWith(`${lang}/`))
}

/** Entfernt JSON-LD-Blöcke vor Prüfung 7 — siehe Kopfkommentar: dort benennen
 *  vier Felder (`WebSite.name`, `WebApplication.name`, `publisher.name`, das
 *  `Organization`-`mainEntity` der Kontaktseite) weiterhin bewusst
 *  sprachübergreifend den festen `SITE_NAME`. */
function stripJsonLd(html) {
  return html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '')
}

function stripCheck7Exemptions(html) {
  return CHECK7_EXEMPT_TAGS.reduce((out, re) => out.replace(re, ''), html)
}

function checkHtmlFile(relPath) {
  const html = readFileSync(join(DIST, relPath), 'utf8')
  const page = pageFromHtmlFilename(relPath)

  if (!page) {
    report(relPath, 'routing', 'keine Route für diese Datei gefunden (pageFromHtmlFilename lieferte null)')
    return
  }

  // Prüfung 1: <html lang> passt zur Route.
  const langMatch = html.match(/<html[^>]*\blang="([^"]*)"/i)
  const expectedHtmlLang = htmlLangOf(page.lang)
  if (!langMatch) {
    report(relPath, 'html-lang', 'kein <html lang="…"> gefunden')
  } else if (langMatch[1] !== expectedHtmlLang) {
    report(relPath, 'html-lang', `erwartet "${expectedHtmlLang}", gefunden "${langMatch[1]}"`)
  }

  // Prüfung 2: genau ein canonical, zeigt auf die eigene URL.
  const canonicals = [...html.matchAll(/<link rel="canonical" href="([^"]*)">/g)].map((m) => m[1])
  const expectedUrl = absoluteUrl(page.path)
  if (canonicals.length !== 1) {
    report(relPath, 'canonical', `erwartet genau 1, gefunden ${canonicals.length}`)
  } else if (canonicals[0] !== expectedUrl) {
    report(relPath, 'canonical', `zeigt auf "${canonicals[0]}", erwartet "${expectedUrl}"`)
  }

  // Prüfung 3: hreflang-Zeilen — 7 bei indexierten Seiten, 0 bei noindex.
  const hreflangs = [...html.matchAll(/<link rel="alternate" href="[^"]*" hreflang="([^"]*)">/g)]
  const expectedHreflangs = page.indexed ? 7 : 0
  if (hreflangs.length !== expectedHreflangs) {
    report(relPath, 'hreflang', `erwartet ${expectedHreflangs} (indexed=${page.indexed}), gefunden ${hreflangs.length}`)
  }

  const foreign = isForeignPath(relPath)
  if (foreign) {
    // Prüfung 5: keine deutschen Kartenwörter unter en/fr/es/it/sv — über die
    // volle Datei, JSON-LD eingeschlossen (siehe Kopfkommentar: keines dieser
    // Wörter steht seit Task 9 noch in JSON-LD).
    for (const word of GERMAN_CARD_WORDS) {
      if (html.includes(word)) {
        report(relPath, 'deutsches-kartenwort', `enthält "${word}"`)
      }
    }

    // Prüfung 7: kein deutscher Markenname unter en/fr/es/it/sv, ausser in
    // JSON-LD und og:image:alt/twitter:image:alt (siehe Kopfkommentar).
    const withoutJsonLd = stripJsonLd(html)
    if (stripCheck7Exemptions(withoutJsonLd).includes(GERMAN_BRAND_PHRASE)) {
      report(relPath, 'deutscher-markenname', `enthält "${GERMAN_BRAND_PHRASE}" ausserhalb von JSON-LD/og:image:alt/twitter:image:alt`)
    }
  }
}

function checkSitemap() {
  const path = join(DIST, 'sitemap.xml')
  if (!existsSync(path)) {
    report('sitemap.xml', 'sitemap-vorhanden', 'dist/sitemap.xml fehlt')
    return
  }
  const xml = readFileSync(path, 'utf8')
  const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1])

  if (locs.length !== 198) {
    report('sitemap.xml', 'sitemap-anzahl', `erwartet genau 198 <loc>, gefunden ${locs.length}`)
  }

  const noindexPaths = new Set(
    LANG_IDS.flatMap((lang) => [localizedPath('privacy', lang), localizedPath('terms', lang)])
      .concat(localizedPath('app', DEFAULT_LANG)),
  )
  for (const loc of locs) {
    const path_ = loc.startsWith(SITE_URL) ? loc.slice(SITE_URL.length) : loc
    if (noindexPaths.has(path_)) {
      report('sitemap.xml', 'sitemap-noindex', `<loc> "${loc}" gehört zu einer noindex-Seite`)
    }
  }
}

function checkContentRoutes() {
  const routesPath = join(__dirname, 'content-routes.json')
  if (!existsSync(routesPath)) {
    report('scripts/content-routes.json', 'content-routes-vorhanden', 'Datei fehlt — erst `npm run generate:content` ausführen')
    return
  }
  const routes = JSON.parse(readFileSync(routesPath, 'utf8'))
  for (const route of routes) {
    if (!existsSync(join(DIST, route.html))) {
      report(route.html, 'content-route-fehlt', `Pfad "${route.path}" aus content-routes.json hat keine Datei in dist/`)
    }
  }
}

function main() {
  if (!existsSync(DIST)) {
    console.error(`check-build: ${relative(ROOT, DIST)} fehlt — erst \`npm run build\` ausführen.`)
    process.exit(1)
  }

  const htmlFiles = findHtmlFiles(DIST).sort()
  for (const relPath of htmlFiles) {
    checkHtmlFile(relPath)
  }
  checkSitemap()
  checkContentRoutes()

  if (findings.length === 0) {
    console.log(`${htmlFiles.length} Routen geprüft, 0 Befunde`)
    process.exit(0)
  }

  console.error('check-build: Befunde gefunden:\n')
  for (const finding of findings) {
    console.error(`  ${finding}`)
  }
  console.error(`\n${htmlFiles.length} Routen geprüft, ${findings.length} Befund${findings.length === 1 ? '' : 'e'}`)
  process.exit(1)
}

main()
