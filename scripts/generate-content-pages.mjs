/**
 * Erzeugt HTML-Einstiege für alle generierten Routen: Dimensions- und
 * Kompetenzseiten aller sechs Sprachen sowie die Unterseiten (Startseite,
 * Projekt, Kontakt, Datenschutz, Nutzungsbedingungen) der fünf
 * nichtdeutschen Sprachen. Die sechs deutschen Einstiege (index.html,
 * projekt/, kontakt/, datenschutz/, nutzungsbedingungen/, app/) sind
 * handgepflegt und bleiben unangetastet.
 *
 * Welche Stubs das sind, welchen Rollup-Einstiegsnamen (`inputKey`), welches
 * `<html lang>` und welchen JS-Einstieg (`scriptSrc`) sie bekommen,
 * entscheidet die reine Funktion `buildContentRoutes` in
 * `src/seo/content-routes.js` — hier wird nur noch geschrieben. (Vorher
 * importierte dieses Skript dafür selbst alle sechs `site/i18n/<lang>.js`
 * und hielt eine eigene `SITE_BY_LANG`-Kopie — die vierte im Repo neben
 * `content-pages.js`, `meta.js`, `vite-plugin-seo.js`. Fix-Runde 1, Punkt 4.)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildContentRoutes, contentRouteFindings } from '../src/seo/content-routes.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function pageHtml(htmlLang, scriptSrc) {
  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#FAF7F5">
  <link rel="icon" type="image/png" sizes="64x64" href="/assets/icons/favicon-64.png">
  <link rel="apple-touch-icon" href="/assets/icons/apple-touch-icon.png">
</head>
<body>
  <div id="root"></div>
  <script type="module" src="${scriptSrc}"></script>
</body>
</html>
`
}

async function main() {
  const routes = buildContentRoutes()

  // Kollisionen zwischen Rollup-Input-Namen verschlucken sich in
  // vite.config.js still (spätere Objekt-Einträge überschreiben frühere) —
  // hier stattdessen ein harter Fehler, bevor überhaupt geschrieben wird.
  const findings = contentRouteFindings(routes)
  if (findings.length) {
    throw new Error(`generate-content-pages: inputKey-Kollisionen gefunden:\n  ${findings.join('\n  ')}`)
  }

  for (const route of routes) {
    const dir = join(ROOT, dirname(route.html))
    await mkdir(dir, { recursive: true })
    await writeFile(join(ROOT, route.html), pageHtml(route.htmlLang, route.scriptSrc))
  }

  await writeFile(
    join(__dirname, 'content-routes.json'),
    `${JSON.stringify(routes, null, 2)}\n`,
  )
  console.log(`Generated ${routes.length} content page HTML entries`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
