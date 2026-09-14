/**
 * Sitemap-XML aus allen indexierten Seiten aller sechs Sprachen, mit
 * `xhtml:link`-Alternates auf die Übersetzungen jeder Seite. Reine Funktion,
 * getrennt von scripts/generate-seo-files.mjs (das nur noch nach
 * `public/sitemap.xml` schreibt), damit ein Test Eintragszahl,
 * noindex-Ausschluss und Alternates prüfen kann, ohne die Datei anzufassen.
 *
 * Alternates kommen aus `translationsOf` (src/site/routes.js), nicht aus
 * einer eigenen Sprachschleife: dieselbe Funktion baut schon die
 * hreflang-Links in `seo/meta.js#renderSeoHead` — zwei eigene
 * Alternate-Listen liefen sonst leicht auseinander.
 */
import { LANG_IDS, translationsOf } from '../site/routes.js'
import { absoluteUrl, indexedPages } from './meta.js'

/** Alle indexierten Seiten aller sechs Sprachen (Startseite, Projekt,
 *  Kontakt, Dimensionen, Kompetenzen) — nie Datenschutz, Nutzungsbedingungen
 *  oder /app/: die sind in jeder Sprache `indexed: false`. */
export function allIndexedPages() {
  return LANG_IDS.flatMap((lang) => indexedPages(lang))
}

function alternateLinksXml(pathname) {
  return translationsOf(pathname)
    .map((t) => `\n    <xhtml:link rel="alternate" hreflang="${t.lang}" href="${absoluteUrl(t.path)}"/>`)
    .join('')
}

export function buildSitemapXml(today) {
  const urls = allIndexedPages()
    .map((page) => `  <url>
    <loc>${absoluteUrl(page.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.sitemapChangefreq}</changefreq>
    <priority>${page.sitemapPriority.toFixed(1)}</priority>${alternateLinksXml(page.path)}
  </url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>
`
}
