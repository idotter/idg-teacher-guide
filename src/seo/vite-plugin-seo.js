import { landingNoscriptHtml, pageFromHtmlFilename, renderSeoHead } from './meta.js'
import { renderStaticPageHtml } from './static-page.jsx'
import { langFromPath, routeKeyFromPath } from '../site/routes.js'

import deSite from '../site/i18n/de.js'
import enSite from '../site/i18n/en.js'
import frSite from '../site/i18n/fr.js'
import esSite from '../site/i18n/es.js'
import itSite from '../site/i18n/it.js'
import svSite from '../site/i18n/sv.js'

import deContent from '../content/de.js'
import enContent from '../content/en.js'
import frContent from '../content/fr.js'
import esContent from '../content/es.js'
import itContent from '../content/it.js'
import svContent from '../content/sv.js'

// Statisch statt über `site/lang-modules.js`: dieses Plugin läuft nur im
// Build (Node, Teil der Vite-Konfiguration), nie im Client — ein dynamischer
// Import bräuchte hier keine Bundle-Splitting-Vorteile, würde die
// Konfigurations-Bündelung von Vite aber unnötig verkomplizieren.
const SITE_BY_LANG = { de: deSite, en: enSite, fr: frSite, es: esSite, it: itSite, sv: svSite }
const CONTENT_BY_LANG = { de: deContent, en: enContent, fr: frContent, es: esContent, it: itContent, sv: svContent }

/** Entfernt manuell gepflegte SEO-Tags — das Plugin ist die einzige Quelle. */
function stripExistingSeo(html) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="language"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="geo\.region"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="alternate"[^>]*llms\.txt[^>]*>\s*/gi, '')
    .replace(/<meta\s+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi, '')
    .replace(/<noscript>[\s\S]*?<\/noscript>\s*/gi, '')
}

export function injectSeoPlugin() {
  return {
    name: 'inject-seo',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const page = pageFromHtmlFilename(ctx.filename)
        if (!page) return html

        const cleaned = stripExistingSeo(html)
        const seoHead = renderSeoHead(page)
        let out = cleaned.replace('</head>', `  ${seoHead}\n</head>`)

        const { key } = routeKeyFromPath(page.path)
        if (key === 'home') {
          out = out.replace('</body>', `  ${landingNoscriptHtml(page.lang)}\n</body>`)
        } else if (key !== 'app') {
          const lang = langFromPath(page.path)
          const markup = renderStaticPageHtml(page.path, SITE_BY_LANG[lang], CONTENT_BY_LANG[lang])
          if (markup) {
            out = out.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
          }
        }
        return out
      },
    },
  }
}
