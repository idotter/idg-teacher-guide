import { beforeEach, describe, expect, it, vi } from 'vitest'

const calls = { inject: [], track: [] }
vi.mock('@vercel/analytics', () => ({
  inject: (props) => calls.inject.push(props),
  track: (name, props) => calls.track.push([name, props]),
}))

const { initAnalytics, sanitizeEvent, trackCardFlip, trackTeachingOpen } = await import('./analytics.js')

const ORIGIN = 'https://guide.zukunftskompetenzchallenge.ch'
const view = (path) => ({ type: 'pageview', url: `${ORIGIN}${path}` })

beforeEach(() => { calls.inject.length = 0; calls.track.length = 0 })

describe('sanitizeEvent', () => {
  it('entfernt Query-Parameter aus der gemeldeten Adresse', () => {
    const out = sanitizeEvent(view('/app/?card=resilienz'), { standalone: false })
    expect(out.url).toBe(`${ORIGIN}/app/`)
    expect(out.type).toBe('pageview')
  })
  it('meldet Starts der installierten App unter /app/standalone/', () => {
    const out = sanitizeEvent(view('/app/'), { standalone: true })
    expect(out.url).toBe(`${ORIGIN}/app/standalone/`)
  })
  it('lässt andere Pfade auch im Standalone-Modus unverändert', () => {
    expect(sanitizeEvent(view('/kompetenzen/mut/'), { standalone: true }).url).toBe(`${ORIGIN}/kompetenzen/mut/`)
    expect(sanitizeEvent(view('/'), { standalone: true }).url).toBe(`${ORIGIN}/`)
  })
  it('behandelt eigene Events gleich wie Seitenaufrufe', () => {
    const out = sanitizeEvent({ type: 'event', url: `${ORIGIN}/app/?card=mut` }, { standalone: true })
    expect(out).toEqual({ type: 'event', url: `${ORIGIN}/app/standalone/` })
  })
})

describe('trackCardFlip', () => {
  it('meldet «Karte gedreht» mit Karte, Sprache und Ort', () => {
    trackCardFlip({ id: 'resilienz', lang: 'fr', embedded: false })
    expect(calls.track).toEqual([['Karte gedreht', { karte: 'resilienz', sprache: 'fr', ort: 'app' }]])
  })
  it('unterscheidet den Demo-Stapel der Startseite', () => {
    trackCardFlip({ id: 'mut', lang: 'de', embedded: true })
    expect(calls.track[0][1].ort).toBe('landing')
  })
})

describe('trackTeachingOpen', () => {
  it('meldet «Unterricht geöffnet» mit Karte, Sprache und Ort', () => {
    trackTeachingOpen({ id: 'praesenz', lang: 'de', embedded: false })
    expect(calls.track).toEqual([['Unterricht geöffnet', { karte: 'praesenz', sprache: 'de', ort: 'app' }]])
  })
})

describe('initAnalytics', () => {
  it('lädt das Skript einmal mit einem beforeSend, das Adressen bereinigt', () => {
    initAnalytics({ isStandalone: () => true })
    expect(calls.inject).toHaveLength(1)
    const { beforeSend } = calls.inject[0]
    expect(beforeSend(view('/app/?card=mut'))).toEqual(view('/app/standalone/'))
  })
  it('fragt den Standalone-Modus erst beim Senden ab, nicht beim Laden', () => {
    let standalone = false
    initAnalytics({ isStandalone: () => standalone })
    const { beforeSend } = calls.inject[0]
    expect(beforeSend(view('/app/')).url).toBe(`${ORIGIN}/app/`)
    standalone = true
    expect(beforeSend(view('/app/')).url).toBe(`${ORIGIN}/app/standalone/`)
  })
})
