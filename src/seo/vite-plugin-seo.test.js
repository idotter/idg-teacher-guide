import { describe, expect, it } from 'vitest'
import { UMAMI_WEBSITE_ID } from '../analytics.js'
import { injectSeoPlugin } from './vite-plugin-seo.js'

const html = '<!DOCTYPE html><html><head></head><body><div id="root"></div></body></html>'
const plugin = injectSeoPlugin()
const run = (ctx) => plugin.transformIndexHtml.handler(html, ctx)

describe('Umami-Tag im HTML', () => {
  it('schreibt das Skript im Build in den Kopf', () => {
    const out = run({ filename: '/repo/index.html' })
    expect(out).toContain('defer src="https://cloud.umami.is/script.js"')
    expect(out).toContain(`data-website-id="${UMAMI_WEBSITE_ID}"`)
    expect(out.indexOf('cloud.umami.is')).toBeLessThan(out.indexOf('</head>'))
  })
  it('lässt das Skript im Dev-Server weg', () => {
    const out = run({ filename: '/repo/app/index.html', server: {} })
    expect(out).not.toContain('cloud.umami.is')
  })
})
