import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { buildContentRoutes, contentRouteFindings, HANDCRAFTED_INPUT_KEYS } from './content-routes.js'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..')

/* Diese Suite sichert genau das zu, was der Task-7-Auftrag als stillen
   Fehlerkanal benennt: `Object.fromEntries` in vite.config.js verschluckt
   kollidierende inputKeys ohne Fehler oder Warnung — ein späterer Eintrag
   überschreibt einfach den früheren. Jeder Test hier wurde einmal absichtlich
   gebrochen (durch Zurücksetzen von `inputKey` in content-routes.js auf
   `` `${segments[0]}-${segments[1]}` ``, siehe task-7-report.md) und ist dabei
   rot geworden. */
describe('buildContentRoutes', () => {
  const routes = buildContentRoutes()

  it('erzeugt genau 205 Stubs (180 Inhaltsseiten + 25 Unterseiten der fünf nichtdeutschen Sprachen)', () => {
    expect(routes).toHaveLength(205)
  })

  it('vergibt jedem Stub einen eindeutigen inputKey', () => {
    const keys = routes.map((r) => r.inputKey)
    expect(new Set(keys).size).toBe(keys.length)
  })

  it('kollidiert mit keinem handgepflegten Vite-Einstieg', () => {
    const keys = new Set(routes.map((r) => r.inputKey))
    for (const handcrafted of HANDCRAFTED_INPUT_KEYS) {
      expect(keys.has(handcrafted)).toBe(false)
    }
  })

  it('baut für alle fünf italienischen Dimensionsseiten verschiedene inputKeys (Regression: segments[0]-segments[1] kollidierte auf "it-dimensioni")', () => {
    const itDims = routes.filter((r) => r.lang === 'it' && r.routeKey === 'dimension')
    expect(itDims).toHaveLength(5)
    expect(new Set(itDims.map((r) => r.inputKey)).size).toBe(5)
  })

  it('baut für alle 25 italienischen Kompetenzseiten verschiedene inputKeys (Regression: kollidierte auf "it-competenze")', () => {
    const itSkills = routes.filter((r) => r.lang === 'it' && r.routeKey === 'skill')
    expect(itSkills).toHaveLength(25)
    expect(new Set(itSkills.map((r) => r.inputKey)).size).toBe(25)
  })

  it('gibt der Startseite einen eigenen, einsegmentigen inputKey statt "<lang>-undefined"', () => {
    const fr = routes.find((r) => r.path === '/fr/')
    expect(fr).toBeTruthy()
    expect(fr.inputKey).toBe('fr')
    expect(fr.inputKey).not.toContain('undefined')
  })

  it('erzeugt keine deutschen Unterseiten-Stubs (Startseite/Projekt/Kontakt/Datenschutz/AGB bleiben handgepflegt)', () => {
    const deNonContent = routes.filter((r) => r.lang === 'de' && r.routeKey !== 'dimension' && r.routeKey !== 'skill')
    expect(deNonContent).toEqual([])
  })

  it('erzeugt keine /app/-Route (sprachübergreifend eine einzige, handgepflegte Route)', () => {
    expect(routes.some((r) => r.path === '/app/')).toBe(false)
  })

  it('erzeugt für jede der fünf nichtdeutschen Sprachen genau 5 Unterseiten-Stubs', () => {
    for (const lang of ['en', 'fr', 'es', 'it', 'sv']) {
      const siteStubs = routes.filter((r) => r.lang === lang && r.routeKey !== 'dimension' && r.routeKey !== 'skill')
      expect(siteStubs).toHaveLength(5)
    }
  })

  /* Fix-Runde 1, Punkt 4: htmlLang/scriptSrc lebten vorher ungetestet im
     .mjs-Skript. Fehlerszenario aus dem Review: wer `routeKey === 'home'`
     versehentlich auf `'landing'` ändert, bekommt fünf kaputte Startseiten
     bei sonst grüner Suite — die erste Zusicherung hier fängt genau das. */
  it('lädt genau die fünf Startseiten über landing/main.jsx, alle übrigen 200 über page-main.jsx', () => {
    const landing = routes.filter((r) => r.scriptSrc === '/src/landing/main.jsx')
    const pageMain = routes.filter((r) => r.scriptSrc === '/src/site/page-main.jsx')
    expect(landing).toHaveLength(5)
    expect(pageMain).toHaveLength(200)
    expect(landing.every((r) => r.routeKey === 'home')).toBe(true)
    expect(landing.map((r) => r.path).sort()).toEqual(['/en/', '/es/', '/fr/', '/it/', '/sv/'])
  })

  it('trägt für jede Route das htmlLang ihrer Sprache', () => {
    const expected = { de: 'de-CH', en: 'en', fr: 'fr', es: 'es', it: 'it', sv: 'sv' }
    for (const route of routes) {
      expect(route.htmlLang).toBe(expected[route.lang])
    }
  })
})

/* Fix-Runde 1, Punkt 5: `HANDCRAFTED_INPUT_KEYS` spiegelt die sechs
   handgepflegten Einstiegsnamen aus `vite.config.js` von Hand. Dieser Test
   schliesst die Schleife: kommt in `vite.config.js` ein siebter Einstieg vor
   dem `...loadContentInputs(__dirname)`-Spread dazu, ohne dass die Konstante
   hier mitwächst, würde `...loadContentInputs` ihn (als letzter Eintrag im
   Objekt-Literal) still überschreiben können, falls ein generierter Stub
   je denselben Namen trüge — genau der Kanal, den `contentRouteFindings`
   eigentlich zumachen soll. */
describe('HANDCRAFTED_INPUT_KEYS bleibt synchron mit vite.config.js', () => {
  function handcraftedKeysFromViteConfig() {
    const src = readFileSync(join(REPO_ROOT, 'vite.config.js'), 'utf8')
    const match = src.match(/input:\s*\{([\s\S]*?)\.\.\.loadContentInputs/)
    if (!match) {
      throw new Error('vite.config.js: input-Block mit ...loadContentInputs nicht gefunden — Testannahme prüfen')
    }
    return [...match[1].matchAll(/^\s*([A-Za-z_][A-Za-z0-9_]*):/gm)].map((m) => m[1])
  }

  it('enthält genau die Einstiegsnamen, die vite.config.js von Hand vor dem Spread aus content-routes.json einträgt', () => {
    const fromViteConfig = handcraftedKeysFromViteConfig()
    expect(fromViteConfig.length).toBeGreaterThan(0)
    expect(new Set(fromViteConfig)).toEqual(new Set(HANDCRAFTED_INPUT_KEYS))
  })
})

describe('contentRouteFindings', () => {
  it('meldet nichts bei den echten Routen', () => {
    expect(contentRouteFindings(buildContentRoutes())).toEqual([])
  })

  it('meldet eine Kollision mit einem handgepflegten Einstieg', () => {
    const routes = [{ path: '/x/', html: 'x/index.html', inputKey: 'app', lang: 'en', routeKey: 'home' }]
    const findings = contentRouteFindings(routes)
    expect(findings).toHaveLength(1)
    expect(findings[0]).toContain('app')
  })

  it('meldet doppelte inputKeys', () => {
    const routes = [
      { path: '/a/', html: 'a/index.html', inputKey: 'dup', lang: 'en', routeKey: 'project' },
      { path: '/b/', html: 'b/index.html', inputKey: 'dup', lang: 'en', routeKey: 'contact' },
    ]
    const findings = contentRouteFindings(routes)
    expect(findings).toHaveLength(1)
    expect(findings[0]).toContain('dup')
  })
})
