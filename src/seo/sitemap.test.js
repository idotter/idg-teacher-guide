import { describe, expect, it } from 'vitest'
import { LANG_IDS, localizedPath } from '../site/routes.js'
import { absoluteUrl } from './meta.js'
import { allIndexedPages, buildSitemapXml } from './sitemap.js'

const TODAY = '2026-09-13'

describe('allIndexedPages', () => {
  it('liefert genau 198 Seiten (33 je Sprache: Startseite + Projekt + Kontakt + 5 Dimensionen + 25 Kompetenzen)', () => {
    expect(allIndexedPages()).toHaveLength(198)
  })

  it('enthält ausschliesslich indexierte Seiten, nie /app/', () => {
    for (const page of allIndexedPages()) {
      expect(page.indexed).toBe(true)
      expect(page.path).not.toBe('/app/')
    }
  })
})

describe('buildSitemapXml', () => {
  const xml = buildSitemapXml(TODAY)

  it('trägt genau 198 <loc>-Einträge', () => {
    expect(xml.match(/<loc>/g) || []).toHaveLength(198)
  })

  it('trägt das xhtml-Namespace am Wurzelelement', () => {
    expect(xml).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
  })

  it('trägt für eine bekannte fremdsprachige Seite alle sechs hreflang-Alternates', () => {
    const url = absoluteUrl('/fr/competences/mut/')
    const block = xml.split('</url>').find((b) => b.includes(`<loc>${url}</loc>`))
    expect(block).toBeTruthy()
    for (const lang of LANG_IDS) {
      expect(block).toContain(`hreflang="${lang}"`)
    }
    expect(block.match(/<xhtml:link/g)).toHaveLength(6)
  })

  it('trägt für die deutsche Seite denselben Alternate-Satz wie für ihre Übersetzungen', () => {
    const url = absoluteUrl('/kompetenzen/mut/')
    const block = xml.split('</url>').find((b) => b.includes(`<loc>${url}</loc>`))
    expect(block).toContain(`hreflang="it" href="${absoluteUrl('/it/competenze/mut/')}"`)
  })

  it('führt genau 198 * 6 Alternates insgesamt (jede indexierte Seite trägt alle sechs Sprachen)', () => {
    expect(xml.match(/<xhtml:link/g) || []).toHaveLength(198 * 6)
  })

  it('enthält keine noindex-Seite (Datenschutz/AGB/App) — weder als <loc> noch als Alternate', () => {
    const noindexUrls = [
      ...LANG_IDS.map((lang) => absoluteUrl(localizedPath('privacy', lang))),
      ...LANG_IDS.map((lang) => absoluteUrl(localizedPath('terms', lang))),
      absoluteUrl('/app/'),
    ]
    for (const url of noindexUrls) {
      expect(xml).not.toContain(`<loc>${url}</loc>`)
      expect(xml).not.toContain(`href="${url}"`)
    }
  })
})
