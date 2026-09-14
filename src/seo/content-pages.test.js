import { describe, expect, it } from 'vitest'
import { LANG_IDS } from '../site/routes.js'
import deSite from '../site/i18n/de.js'
import enSite from '../site/i18n/en.js'
import frSite from '../site/i18n/fr.js'
import esSite from '../site/i18n/es.js'
import itSite from '../site/i18n/it.js'
import svSite from '../site/i18n/sv.js'
import { buildAllContentPages, buildContentPages } from './content-pages.js'

const SITE_BY_LANG = { de: deSite, en: enSite, fr: frSite, es: esSite, it: itSite, sv: svSite }

describe('buildContentPages', () => {
  it('liefert dieselbe Anzahl Seiten für jede Sprache (5 Dimensionen + 25 Kompetenzen)', () => {
    for (const lang of LANG_IDS) {
      expect(buildContentPages(lang)).toHaveLength(30)
    }
  })

  it('baut Pfade mit dem Segmentwort der jeweiligen Sprache', () => {
    const it_ = buildContentPages('it').find((p) => p.kind === 'skill' && p.id === 'mut')
    expect(it_.path).toBe('/it/competenze/mut/')
    const de = buildContentPages('de').find((p) => p.kind === 'skill' && p.id === 'mut')
    expect(de.path).toBe('/kompetenzen/mut/')
  })

  it('default ist Deutsch (bestehende Aufrufer ohne Sprachparameter)', () => {
    expect(buildContentPages()).toEqual(buildContentPages('de'))
  })

  it('trägt die eigene Sprache auf jeder Seite', () => {
    for (const page of buildContentPages('fr')) {
      expect(page.lang).toBe('fr')
    }
  })
})

describe('buildAllContentPages', () => {
  it('liefert alle sechs Sprachen zusammen', () => {
    expect(buildAllContentPages()).toHaveLength(LANG_IDS.length * 30)
  })
})

/* Fix-Runde 1, Punkt 3: `pageLabel` hängte bisher das feste, deutsche
   `SITE_NAME` an jeden Dimensions-/Kompetenztitel — Review-Fund:
   "Coraggio — Inner Development Guide im Schulalltag" (it), während die
   Unterseiten derselben Sprache korrekt "… — Inner Development Guide in
   classe" heissen. Jetzt kommt der lokalisierte Markenname (`chrome.brand` +
   `chrome.brandSub` der Route-Sprache) aus `siteBrand`, derselben Ableitung
   wie im noscript-Block (Punkt 1). */
describe('documentTitle trägt den lokalisierten Markennamen, nicht das feste SITE_NAME', () => {
  it('bleibt für Deutsch wortgleich mit dem bisherigen Titel (Regression)', () => {
    const page = buildContentPages('de').find((p) => p.kind === 'skill' && p.id === 'mut')
    expect(page.documentTitle).toBe('Mut — Inner Development Guide im Schulalltag')
  })

  it('nutzt für Italienisch den italienischen Markennamen statt SITE_NAME (der gemeldete Fund)', () => {
    const page = buildContentPages('it').find((p) => p.kind === 'skill' && p.id === 'mut')
    expect(page.documentTitle).toBe('Coraggio — Inner Development Guide in classe')
    expect(page.documentTitle).not.toContain('im Schulalltag')
  })

  it('gilt für jede Sprache und für Dimensions- wie Kompetenzseiten', () => {
    for (const lang of LANG_IDS) {
      const site = SITE_BY_LANG[lang]
      const expectedBrand = `${site.chrome.brand} ${site.chrome.brandSub}`
      for (const page of buildContentPages(lang)) {
        expect(page.documentTitle).toBe(`${page.title} — ${expectedBrand}`)
      }
    }
  })
})
