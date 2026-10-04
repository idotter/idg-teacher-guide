import { beforeEach, describe, expect, it, vi } from 'vitest'

const {
  BEFORE_SEND_NAME,
  UMAMI_DOMAIN,
  UMAMI_SRC,
  UMAMI_WEBSITE_ID,
  initAnalytics,
  sanitizeEvent,
  trackCardFlip,
  trackTeachingOpen,
  umamiScriptHtml,
} = await import('./analytics.js')

const ORIGIN = `https://${UMAMI_DOMAIN}`
const calls = []

function fakeWindow({ hostname = UMAMI_DOMAIN, href = `${ORIGIN}/app/?card=mut` } = {}) {
  const scripts = []
  const document = {
    head: {
      appendChild(node) { scripts.push(node) },
    },
    querySelector(sel) {
      if (!sel.includes(UMAMI_WEBSITE_ID)) return null
      return scripts.find((s) => s.dataset.websiteId === UMAMI_WEBSITE_ID) ?? null
    },
    createElement() {
      return { defer: false, src: '', dataset: {} }
    },
  }
  return { location: { hostname, href }, document, scripts }
}

beforeEach(() => { calls.length = 0 })

describe('sanitizeEvent', () => {
  it('entfernt Query und Hash aus der gemeldeten Adresse', () => {
    const out = sanitizeEvent({ url: `${ORIGIN}/app/?card=resilienz#oben` }, { standalone: false })
    expect(out.url).toBe(`${ORIGIN}/app/`)
  })
  it('meldet Starts der installierten App unter /app/standalone/', () => {
    const out = sanitizeEvent({ url: `${ORIGIN}/app/` }, { standalone: true })
    expect(out.url).toBe(`${ORIGIN}/app/standalone/`)
  })
  it('lässt andere Pfade auch im Standalone-Modus unverändert', () => {
    expect(sanitizeEvent({ url: `${ORIGIN}/kompetenzen/mut/` }, { standalone: true }).url)
      .toBe(`${ORIGIN}/kompetenzen/mut/`)
    expect(sanitizeEvent({ url: `${ORIGIN}/` }, { standalone: true }).url).toBe(`${ORIGIN}/`)
  })
  it('entfernt Query auch aus der verweisenden Seite', () => {
    const out = sanitizeEvent({
      url: `${ORIGIN}/app/`,
      referrer: 'https://example.org/start?utm_source=mail',
    })
    expect(out.referrer).toBe('https://example.org/start')
  })
  it('behält einen pfadförmigen Referrer ohne Origin', () => {
    const out = sanitizeEvent({ url: `${ORIGIN}/`, referrer: '/projekt/?x=1' })
    expect(out.referrer).toBe('/projekt/')
  })
})

describe('trackCardFlip', () => {
  it('meldet «Karte gedreht» mit Karte, Sprache und Ort', () => {
    vi.stubGlobal('window', { umami: { track: (...args) => calls.push(args) } })
    trackCardFlip({ id: 'resilienz', lang: 'fr', embedded: false })
    expect(calls).toEqual([['Karte gedreht', { karte: 'resilienz', sprache: 'fr', ort: 'app' }]])
    vi.unstubAllGlobals()
  })
  it('unterscheidet den Demo-Stapel der Startseite', () => {
    vi.stubGlobal('window', { umami: { track: (...args) => calls.push(args) } })
    trackCardFlip({ id: 'mut', lang: 'de', embedded: true })
    expect(calls[0][1].ort).toBe('landing')
    vi.unstubAllGlobals()
  })
})

describe('trackTeachingOpen', () => {
  it('meldet «Unterricht geöffnet» mit Karte, Sprache und Ort', () => {
    vi.stubGlobal('window', { umami: { track: (...args) => calls.push(args) } })
    trackTeachingOpen({ id: 'praesenz', lang: 'de', embedded: false })
    expect(calls).toEqual([['Unterricht geöffnet', { karte: 'praesenz', sprache: 'de', ort: 'app' }]])
    vi.unstubAllGlobals()
  })
})

describe('umamiScriptHtml', () => {
  it('ist das klassische defer-Tag mit dieser Website-ID', () => {
    const html = umamiScriptHtml()
    expect(html).toContain(`defer src="${UMAMI_SRC}"`)
    expect(html).toContain(`data-website-id="${UMAMI_WEBSITE_ID}"`)
    expect(html).toContain(`data-domains="${UMAMI_DOMAIN}"`)
    expect(html).toContain(`data-before-send="${BEFORE_SEND_NAME}"`)
    expect(html).not.toContain('type="module"')
  })
})

describe('initAnalytics', () => {
  it('hängt das Umami-Skript mit Website-ID und Bereinigung an', () => {
    const win = fakeWindow()
    let standalone = false
    initAnalytics({ prod: true, win, isStandalone: () => standalone })
    expect(win.scripts).toHaveLength(1)
    const script = win.scripts[0]
    expect(script.src).toBe(UMAMI_SRC)
    expect(script.defer).toBe(true)
    expect(script.dataset.websiteId).toBe(UMAMI_WEBSITE_ID)
    expect(script.dataset.domains).toBe(UMAMI_DOMAIN)
    expect(script.dataset.excludeSearch).toBe('true')
    expect(script.dataset.excludeHash).toBe('true')
    expect(script.dataset.beforeSend).toBe(BEFORE_SEND_NAME)
    expect(win[BEFORE_SEND_NAME]('event', { url: `${ORIGIN}/app/?card=mut` }).url).toBe(`${ORIGIN}/app/`)
    standalone = true
    expect(win[BEFORE_SEND_NAME]('event', { url: `${ORIGIN}/app/` }).url).toBe(`${ORIGIN}/app/standalone/`)
  })
  it('lädt das Skript nur einmal', () => {
    const win = fakeWindow()
    initAnalytics({ prod: true, win, isStandalone: () => false })
    initAnalytics({ prod: true, win, isStandalone: () => false })
    expect(win.scripts).toHaveLength(1)
  })
  it('lädt auf anderen Hosts nichts', () => {
    const win = fakeWindow({ hostname: 'localhost' })
    initAnalytics({ prod: true, win, isStandalone: () => false })
    expect(win.scripts).toHaveLength(0)
    expect(win.umami).toBeUndefined()
  })
  it('loggt lokal statt das Skript zu laden', () => {
    const debug = vi.spyOn(console, 'debug').mockImplementation(() => {})
    const win = fakeWindow({ href: `${ORIGIN}/app/?card=mut` })
    initAnalytics({ prod: false, win, isStandalone: () => true })
    expect(win.scripts).toHaveLength(0)
    expect(debug).toHaveBeenCalledWith('[umami] pageview', `${ORIGIN}/app/standalone/`)
    win.umami.track('Karte gedreht', { karte: 'mut' })
    expect(debug).toHaveBeenCalledWith('[umami]', 'Karte gedreht', { karte: 'mut' })
    debug.mockRestore()
  })
})
