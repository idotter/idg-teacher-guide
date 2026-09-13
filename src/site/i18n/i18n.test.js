import { describe, expect, it } from 'vitest'
import { LANGS } from '../../content/langs.js'
import { keyPaths } from './key-paths.js'
import { linkTargetFindings } from './link-targets.js'
import { SEGMENTS } from './segments.js'
import de from './de.js'
import en from './en.js'
import fr from './fr.js'
import es from './es.js'
// Italienisch bewusst unter anderem Namen importiert: `it` ist bereits die
// Testfunktion von vitest, ein `import it from './it.js'` würde sie überdecken.
import itSite from './it.js'
import sv from './sv.js'

const ALL = { de, en, fr, es, it: itSite, sv }

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

/* Dieselbe Zusicherung läuft in `scripts/check-i18n.mjs` und bricht dort den
   Build. Hier steht sie noch einmal, weil ein Test zeigen kann, dass sie
   beisst: ein absichtlich kaputtes Ziel muss einen Befund auslösen. */
describe('Linkziele', () => {
  const body = (v) => ({ pages: { terms: { body: [{ t: 'p', v }] } } })

  for (const [lang, data] of Object.entries(ALL)) {
    it(`${lang} hat nur auflösbare, klammerfreie Linkziele`, () => {
      expect(linkTargetFindings(data, SEGMENTS[lang])).toEqual([])
    })
  }

  it('meldet einen Routenschlüssel, den die Segment-Tabelle nicht kennt', () => {
    const broken = body('Mehr in der [Datenschutzerklärung](path:datenschutz).')
    const findings = linkTargetFindings(broken, SEGMENTS.de)
    expect(findings).toHaveLength(1)
    expect(findings[0]).toContain('path:datenschutz')
    expect(findings[0]).toContain('pages.terms.body[0].v')
    // Gegenprobe: der richtige Schlüssel ist unauffällig.
    expect(linkTargetFindings(body('… [Datenschutzerklärung](path:privacy).'), SEGMENTS.de)).toEqual([])
  })

  it('meldet eine Klammer im Ziel', () => {
    const broken = body('Siehe [Bern](https://de.wikipedia.org/wiki/Bern_(Stadt)).')
    const findings = linkTargetFindings(broken, SEGMENTS.de)
    expect(findings).toHaveLength(1)
    expect(findings[0]).toContain('Klammer im Ziel')
    // Eine Klammer im sichtbaren Text ist dagegen in Ordnung.
    expect(linkTargetFindings(body('Siehe [Bern (Stadt)](https://example.org/bern).'), SEGMENTS.de)).toEqual([])
  })

  it('prüft auch verschachtelte Listen und die Vorrangklausel', () => {
    const broken = {
      pages: {
        privacy: {
          precedenceNote: 'Vorrang: [Impressum](path:impressum).',
          body: [{ t: 'ul', v: ['… [Kontakt](path:kontakt) …'] }],
        },
      },
    }
    expect(linkTargetFindings(broken, SEGMENTS.de)).toHaveLength(2)
  })
})
