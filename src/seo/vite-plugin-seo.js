import { landingNoscriptHtml, pageFromHtmlFilename, renderSeoHead } from './meta.js'
import { renderStaticPageHtml } from './static-page.jsx'

const SKIP_STATIC_BODY = new Set(['/', '/app/'])

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
        if (page.path === '/') {
          out = out.replace('</body>', `  ${landingNoscriptHtml()}\n</body>`)
        } else if (!SKIP_STATIC_BODY.has(page.path)) {
          const markup = renderStaticPageHtml(page.path)
          if (markup) {
            out = out.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
          }
        }
        return out
      },
    },
  }
}
