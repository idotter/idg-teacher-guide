import { describe, expect, it } from 'vitest'
import { buildContentRoutes, contentRouteFindings, HANDCRAFTED_INPUT_KEYS } from './content-routes.js'

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
