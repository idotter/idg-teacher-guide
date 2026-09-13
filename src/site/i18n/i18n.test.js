import { describe, expect, it } from 'vitest'
import { LANGS } from '../../content/langs.js'
import { SEGMENTS } from './segments.js'
import de from './de.js'

/** Rekursive Schlüsselpfade, Arrays als eine Einheit. */
function keyPaths(value, prefix = '') {
  if (Array.isArray(value) || value === null || typeof value !== 'object') return [prefix]
  return Object.keys(value).flatMap((k) => keyPaths(value[k], prefix ? `${prefix}.${k}` : k))
}

describe('deutsche i18n-Datei', () => {
  it('hat keine leeren Werte', () => {
    const empty = keyPaths(de).filter((p) => {
      const v = p.split('.').reduce((o, k) => o?.[k], de)
      return v === '' || (Array.isArray(v) && v.length === 0)
    })
    expect(empty).toEqual([])
  })
  it('führt alle vier Unterseiten', () => {
    expect(Object.keys(de.pages).sort()).toEqual(['contact', 'privacy', 'project', 'terms'])
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
