import { describe, expect, it } from 'vitest'
import { LANGS } from '../../content/langs.js'
import { keyPaths } from './key-paths.js'
import { SEGMENTS } from './segments.js'
import de from './de.js'
import en from './en.js'
import fr from './fr.js'
import es from './es.js'

const ALL = { de, en, fr, es }

describe('deutsche i18n-Datei', () => {
  it('hat keine leeren Werte', () => {
    const empty = keyPaths(de).filter((p) => {
      const v = p.split('.').reduce((o, k) => o?.[k], de)
      return v === '' || (Array.isArray(v) && v.length === 0)
    })
    expect(empty).toEqual([])
  })
  it('führt alle sechs Seiten', () => {
    expect(Object.keys(de.pages).sort()).toEqual(['app', 'contact', 'home', 'privacy', 'project', 'terms'])
  })
  it('hat für jede Sprache vollständige Segmente', () => {
    const keys = Object.keys(SEGMENTS.de).sort()
    for (const { v } of LANGS) expect(Object.keys(SEGMENTS[v]).sort()).toEqual(keys)
  })
  it('trägt im Deutschen keine Vorrangklausel', () => {
    expect(de.pages.privacy.precedenceNote).toBeUndefined()
    expect(de.pages.terms.precedenceNote).toBeUndefined()
  })
})

describe('alle i18n-Dateien', () => {
  const reference = keyPaths(de).sort()
  for (const [lang, data] of Object.entries(ALL)) {
    it(`${lang} hat dieselben Schlüssel wie Deutsch`, () => {
      const own = keyPaths(data).sort().filter((p) => p !== 'pages.privacy.precedenceNote' && p !== 'pages.terms.precedenceNote')
      expect(own).toEqual(reference.filter((p) => !p.endsWith('precedenceNote')))
    })
    it(`${lang} deklariert sich selbst`, () => {
      expect(data.lang).toBe(lang)
    })
  }
  for (const lang of Object.keys(ALL).filter((l) => l !== 'de')) {
    it(`${lang} trägt die Vorrangklausel in beiden Rechtstexten`, () => {
      expect(ALL[lang].pages.privacy.precedenceNote).toBeTruthy()
      expect(ALL[lang].pages.terms.precedenceNote).toBeTruthy()
    })
  }
})
