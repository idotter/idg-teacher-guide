import { describe, expect, it } from 'vitest'
import { LANG_IDS } from '../site/routes.js'
import { buildAllContentPages, buildContentPages } from './content-pages.js'

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
