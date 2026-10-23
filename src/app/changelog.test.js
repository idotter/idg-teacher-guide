import { describe, expect, it } from 'vitest'
import { CHANGELOG, newsLines, pendingNews } from './changelog.js'

const entries = [
  { id: 'c', items: { de: ['neu'], en: ['new'] } },
  { id: 'b', items: { de: ['mittel'] } },
  { id: 'a', items: { de: ['alt'] } },
]

describe('pendingNews', () => {
  it('liefert ohne gespeicherten Wert alle Einträge', () => {
    expect(pendingNews(entries, null)).toEqual(entries)
    expect(pendingNews(entries, undefined)).toEqual(entries)
  })

  it('liefert nichts, wenn der neuste Eintrag schon gesehen wurde', () => {
    expect(pendingNews(entries, 'c')).toEqual([])
  })

  it('liefert nur Einträge, die neuer sind als der gesehene', () => {
    expect(pendingNews(entries, 'b')).toEqual([entries[0]])
    expect(pendingNews(entries, 'a')).toEqual([entries[0], entries[1]])
  })

  it('liefert bei unbekannter id alle Einträge', () => {
    expect(pendingNews(entries, 'weg')).toEqual(entries)
  })

  it('verändert die Quelle nicht', () => {
    const copy = entries.slice()
    pendingNews(entries, null)
    expect(entries).toEqual(copy)
    expect(pendingNews([], null)).toEqual([])
    expect(pendingNews(null, null)).toEqual([])
  })
})

describe('newsLines', () => {
  it('fällt auf Deutsch zurück', () => {
    expect(newsLines(entries[1], 'fr')).toEqual(['mittel'])
    expect(newsLines(entries[0], 'en')).toEqual(['new'])
  })
})

describe('CHANGELOG', () => {
  it('hat in jedem Eintrag alle sechs Sprachen', () => {
    for (const entry of CHANGELOG) {
      for (const lang of ['de', 'en', 'fr', 'es', 'it', 'sv']) {
        const lines = entry.items[lang]
        expect(Array.isArray(lines) && lines.length > 0, entry.id + ' ' + lang).toBe(true)
      }
    }
  })
})
