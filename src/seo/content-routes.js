/**
 * Reine Bauvorschrift für scripts/content-routes.json: welche HTML-Stubs für
 * welche Sprache mit welchem Rollup-Einstiegsnamen (`inputKey`), welchem
 * `<html lang>` und welchem JS-Einstieg (`scriptSrc`) erzeugt werden.
 * Getrennt von scripts/generate-content-pages.mjs (das nur noch
 * Verzeichnisse anlegt und schreibt), damit ein Test Anzahl, Eindeutigkeit
 * und Kollisionsfreiheit der inputKeys sowie `htmlLang`/`scriptSrc` prüfen
 * kann, ohne Dateien anzufassen.
 *
 * Erzeugt werden:
 *  - Dimensions- und Kompetenzseiten aller sechs Sprachen (`buildAllContentPages`)
 *  - die Unterseiten (Startseite/Projekt/Kontakt/Datenschutz/Nutzungsbedingungen)
 *    der fünf nichtdeutschen Sprachen (`pagesFor(lang)`, `/app/` ausgenommen)
 *
 * Nicht erzeugt: die sechs deutschen Einstiege (index.html, projekt/,
 * kontakt/, datenschutz/, nutzungsbedingungen/, app/) — die sind handgepflegt,
 * `/app/` zusätzlich sprachübergreifend eine einzige Route.
 */
import { buildAllContentPages } from './content-pages.js'
import { htmlLangOf, pagesFor } from './meta.js'
import { DEFAULT_LANG, LANG_IDS, routeKeyFromPath } from '../site/routes.js'

/** JS-Einstieg eines Stubs: die Startseite jeder Sprache lädt die
 *  Landingpage-Bundle, jede andere generierte Seite (Unterseite, Dimension,
 *  Kompetenz) den Seitenrumpf von `src/site/page-main.jsx` — genau wie die
 *  handgepflegten Einstiege. */
const LANDING_SCRIPT = '/src/landing/main.jsx'
const PAGE_SCRIPT = '/src/site/page-main.jsx'

/** Rollup-Einstiegsnamen, die vite.config.js von Hand vergibt — kein
 *  generierter inputKey darf damit zusammenfallen. */
export const HANDCRAFTED_INPUT_KEYS = [
  'landing', 'app', 'projekt', 'kontakt', 'datenschutz', 'nutzungsbedingungen',
]

function segmentsOf(pathname) {
  return pathname.replace(/^\/|\/$/g, '').split('/')
}

/** {path, lang} aller zu generierenden Stubs, ohne Rollup-/Dateidetails. */
function stubsToGenerate() {
  const contentStubs = buildAllContentPages().map((page) => ({ path: page.path, lang: page.lang }))

  const siteStubs = LANG_IDS
    .filter((lang) => lang !== DEFAULT_LANG)
    .flatMap((lang) => Object.values(pagesFor(lang))
      .filter((page) => page.path !== '/app/')
      .map((page) => ({ path: page.path, lang })))

  return [...contentStubs, ...siteStubs]
}

/**
 * {path, html, inputKey, lang, routeKey, htmlLang, scriptSrc} je Stub.
 *
 * `inputKey` aus **allen** Pfadsegmenten (`segments.join('-')`), nicht nur
 * den ersten zweien: eine Startseite hat nur ein Segment (`/fr/` → `fr`,
 * nicht `fr-undefined`), und bei drei Segmenten (Sprache/Rubrik/ID) kollidiert
 * sonst jede der fünf bzw. 25 Seiten einer Sprache auf denselben Schlüssel
 * (`it-dimensioni` für alle fünf italienischen Dimensionsseiten). Für die
 * bestehenden zweisegmentigen deutschen Pfade (`dimensionen/mut` u. Ä.)
 * ändert sich dadurch nichts — `segments.join('-')` und das alte
 * `${segments[0]}-${segments[1]}` ergeben dort denselben String.
 *
 * `htmlLang`/`scriptSrc` stehen hier statt in `scripts/generate-content-pages.mjs`,
 * damit dieses Skript keine eigene, vierte Kopie von `SITE_BY_LANG` braucht
 * (die gibt es schon in `content-pages.js`, `meta.js`, `vite-plugin-seo.js`)
 * und ein Test beide Felder direkt an den reinen Routen prüfen kann, ohne
 * Dateien zu schreiben (Fix-Runde 1, Punkt 4).
 */
export function buildContentRoutes() {
  return stubsToGenerate().map((stub) => {
    const segments = segmentsOf(stub.path)
    const { key: routeKey } = routeKeyFromPath(stub.path)
    return {
      path: stub.path,
      html: [...segments, 'index.html'].join('/'),
      inputKey: segments.join('-'),
      lang: stub.lang,
      routeKey,
      htmlLang: htmlLangOf(stub.lang),
      scriptSrc: routeKey === 'home' ? LANDING_SCRIPT : PAGE_SCRIPT,
    }
  })
}

/**
 * Befunde über eine Liste von Routen: doppelte inputKeys und Kollisionen mit
 * den handgepflegten Vite-Einstiegen. Leeres Array heisst: alles eindeutig.
 * Kollisionen zwischen Rollup-Input-Namen verschlucken sich sonst still —
 * der spätere Eintrag überschreibt den früheren in `Object.fromEntries`,
 * ohne Fehler oder Warnung.
 */
export function contentRouteFindings(routes) {
  const findings = []
  const seen = new Map()

  for (const route of routes) {
    if (HANDCRAFTED_INPUT_KEYS.includes(route.inputKey)) {
      findings.push(`inputKey '${route.inputKey}' (${route.path}) kollidiert mit einem handgepflegten Vite-Einstieg`)
    }
    if (seen.has(route.inputKey)) {
      findings.push(`inputKey '${route.inputKey}' ist nicht eindeutig: ${seen.get(route.inputKey)} und ${route.path}`)
    } else {
      seen.set(route.inputKey, route.path)
    }
  }

  return findings
}
