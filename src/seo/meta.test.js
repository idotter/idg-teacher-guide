import { describe, expect, it } from 'vitest'
import { LANG_IDS } from '../site/routes.js'
import enSite from '../site/i18n/en.js'
import { htmlRouteMap, pagesFor, renderSeoHead } from './meta.js'

describe('htmlRouteMap', () => {
  it('deckt alle sechs Sprachen mal fünf Routen plus /app/ ab', () => {
    // home, project, contact, privacy, terms je Sprache + eine einzige /app/-Route
    expect(Object.keys(htmlRouteMap)).toHaveLength(LANG_IDS.length * 5 + 1)
  })

  it('bildet deutsche Pfade ohne Präfix ab', () => {
    expect(htmlRouteMap['index.html']).toBe('/')
    expect(htmlRouteMap['projekt/index.html']).toBe('/projekt/')
    expect(htmlRouteMap['kontakt/index.html']).toBe('/kontakt/')
    expect(htmlRouteMap['datenschutz/index.html']).toBe('/datenschutz/')
    expect(htmlRouteMap['nutzungsbedingungen/index.html']).toBe('/nutzungsbedingungen/')
  })

  it('bildet fremdsprachige Pfade mit Präfix und eigenem Segmentwort ab', () => {
    expect(htmlRouteMap['fr/index.html']).toBe('/fr/')
    expect(htmlRouteMap['fr/projet/index.html']).toBe('/fr/projet/')
    expect(htmlRouteMap['sv/villkor/index.html']).toBe('/sv/villkor/')
    expect(htmlRouteMap['es/contacto/index.html']).toBe('/es/contacto/')
  })

  it('führt /app/ genau einmal, ohne Sprachpräfix', () => {
    expect(htmlRouteMap['app/index.html']).toBe('/app/')
    expect(Object.values(htmlRouteMap).filter((path) => path === '/app/')).toHaveLength(1)
  })
})

describe('pagesFor', () => {
  it('liefert für jede Sprache sechs Seiten (home, project, contact, privacy, terms, app)', () => {
    for (const lang of LANG_IDS) {
      expect(Object.keys(pagesFor(lang))).toHaveLength(6)
    }
  })

  it('stempelt jede Seite mit der angefragten Sprache', () => {
    for (const lang of LANG_IDS) {
      for (const page of Object.values(pagesFor(lang))) {
        expect(page.lang).toBe(lang)
      }
    }
  })

  it('markiert privacy/terms/app als nicht indexiert, den Rest als indexiert', () => {
    const de = pagesFor('de')
    expect(de['/'].indexed).toBe(true)
    expect(de['/projekt/'].indexed).toBe(true)
    expect(de['/kontakt/'].indexed).toBe(true)
    expect(de['/datenschutz/'].indexed).toBe(false)
    expect(de['/nutzungsbedingungen/'].indexed).toBe(false)
    expect(de['/app/'].indexed).toBe(false)
  })

  it('deutsche Seiten bleiben unpräfixiert', () => {
    const keys = Object.keys(pagesFor('de'))
    expect(keys).toEqual(['/', '/projekt/', '/kontakt/', '/datenschutz/', '/nutzungsbedingungen/', '/app/'])
  })

  it('baut fremdsprachige Pfade mit dem passenden Segmentwort', () => {
    const fr = pagesFor('fr')
    expect(Object.keys(fr)).toEqual([
      '/fr/', '/fr/projet/', '/fr/contact/', '/fr/confidentialite/', '/fr/conditions/', '/app/',
    ])
  })

  it('/app/ ist für jede Sprache derselbe unpräfixierte Pfad', () => {
    for (const lang of LANG_IDS) {
      expect(pagesFor(lang)['/app/'].path).toBe('/app/')
    }
  })

  it('übernimmt Titel/Beschreibung wortgleich aus den Website-Texten der jeweiligen Sprache', () => {
    const en = pagesFor('en')
    expect(en['/en/project/'].title).toBe(enSite.pages.project.documentTitle)
    expect(en['/en/project/'].description).toBe(enSite.pages.project.description)
  })
})

/* Das ist die Funktion, um die sich Task 6 dreht: hreflang, Canonical,
   og:locale/language je Route-Sprache. Jeder Fall hier ist gegen eine
   Mutation der zugehörigen Zeile in meta.js gegengeprüft (siehe
   task-6-report.md, Abschnitt „Fix-Runde 1"). */
describe('renderSeoHead', () => {
  const SITE_URL = 'https://guide.zukunftskompetenzchallenge.ch'

  it('eine indexierte fremdsprachige Seite trägt alle sechs hreflang-Alternates plus x-default auf die deutsche Fassung', () => {
    const page = pagesFor('fr')['/fr/projet/']
    const head = renderSeoHead(page)

    const hreflangs = [...head.matchAll(/<link rel="alternate" href="([^"]+)" hreflang="([^"]+)">/g)]
      .map(([, href, hreflang]) => ({ href, hreflang }))

    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/projekt/`, hreflang: 'de' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/en/project/`, hreflang: 'en' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/fr/projet/`, hreflang: 'fr' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/es/proyecto/`, hreflang: 'es' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/it/progetto/`, hreflang: 'it' })
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/sv/projektet/`, hreflang: 'sv' })
    // x-default zeigt auf die deutsche Fassung, nicht auf die eigene Sprache.
    expect(hreflangs).toContainEqual({ href: `${SITE_URL}/projekt/`, hreflang: 'x-default' })
    expect(hreflangs).toHaveLength(7)
  })

  it('ihr Canonical ist die eigene Sprachfassung, nie die deutsche', () => {
    const page = pagesFor('fr')['/fr/projet/']
    const head = renderSeoHead(page)
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}/fr/projet/">`)
    expect(head).not.toContain(`<link rel="canonical" href="${SITE_URL}/projekt/">`)
  })

  it('/datenschutz/, /nutzungsbedingungen/ und /app/ tragen kein hreflang', () => {
    const de = pagesFor('de')
    for (const path of ['/datenschutz/', '/nutzungsbedingungen/', '/app/']) {
      const head = renderSeoHead(de[path])
      expect(head).not.toContain('hreflang=')
    }
  })

  it('og:locale und die Startseite selbst tragen ebenfalls die eigene Sprache', () => {
    const page = pagesFor('it')['/it/']
    const head = renderSeoHead(page)
    expect(head).toContain('<meta property="og:locale" content="it_IT">')
    expect(head).toContain(`<link rel="canonical" href="${SITE_URL}/it/">`)
  })
})
