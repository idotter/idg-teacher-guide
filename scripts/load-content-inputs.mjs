/**
 * Liest scripts/content-routes.json und baut daraus die zusätzlichen
 * Rollup-Einstiege (`inputKey` → HTML-Pfad) für vite.config.js.
 *
 * Eigene Datei statt Inline-Code in vite.config.js, aus zwei Gründen:
 *  1. Ein Test kann die Zusicherung direkt prüfen, ohne den Bundler zu laden.
 *  2. Vorher fing ein leeres `catch { return {} }` jeden Fehler ab — fehlt
 *     oder zerbricht `content-routes.json`, baute Vite klaglos nur die sechs
 *     handgepflegten Einstiege und meldete Erfolg (205 fehlende HTML-Dateien,
 *     kein Hinweis darauf). Dieselbe Klasse stillen Schluckens, gegen die
 *     `generate-content-pages.mjs` inzwischen hart abbricht (siehe dort,
 *     `contentRouteFindings`) — hier jetzt ebenso: fehlende Datei, kaputtes
 *     JSON und eine leere Routenliste brechen laut ab statt leise 6 statt
 *     211 HTML-Dateien zu bauen (Fix-Runde 1, Punkt 6).
 */
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

export function loadContentInputs(rootDir, routesFile = 'scripts/content-routes.json') {
  const path = resolve(rootDir, routesFile)

  let raw
  try {
    raw = readFileSync(path, 'utf8')
  } catch {
    throw new Error(
      `vite.config.js: ${routesFile} fehlt (${path}). Erst \`npm run generate:content\` `
      + 'ausführen — das übernehmen `predev`/`prebuild` automatisch.',
    )
  }

  let routes
  try {
    routes = JSON.parse(raw)
  } catch (err) {
    throw new Error(`vite.config.js: ${routesFile} ist kein gültiges JSON (${err.message}).`)
  }

  if (!Array.isArray(routes) || routes.length === 0) {
    throw new Error(`vite.config.js: ${routesFile} ist leer oder kein Array — Content-Einstiege fehlen.`)
  }

  return Object.fromEntries(routes.map((route) => [route.inputKey, resolve(rootDir, route.html)]))
}
