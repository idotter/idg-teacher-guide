import { describe, expect, it } from 'vitest'
import { LANG_IDS } from '../site/routes.js'
import { htmlRouteMap, pagesFor } from './meta.js'

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
    expect(htmlRouteMap['it/competenze/index.html']).toBeUndefined() // kein Routenschlüssel, nur Inhaltsseiten
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

  it('übernimmt Titel/Beschreibung aus den Website-Texten der jeweiligen Sprache', () => {
    const en = pagesFor('en')
    expect(en['/en/project/'].title).toContain('project')
    expect(en['/en/project/'].title).not.toContain('Projekt')
  })
})
