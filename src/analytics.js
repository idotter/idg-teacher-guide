/* Anonyme Nutzungsstatistik über Umami Cloud.

   Keine Cookies, nichts im Browser abgelegt. Umami fasst Besuche über einen
   Hash aus Website, Browserkennung und einem Salz zusammen, das zu
   Monatsbeginn wechselt. Die IP dient nur der Ortsbestimmung und wird nicht
   gespeichert. Gemeldet werden Seitenaufrufe sowie zwei eigene Events —
   «Karte gedreht» und «Unterricht geöffnet», je mit Karten-ID, Sprache und
   Ort (App oder Demo-Stapel der Startseite).

   Der Hash kommt nie mit (`data-exclude-hash` und noch einmal in `beforeSend`).
   Von der Query bleiben nur die Kampagnenkennungen utm_source, utm_medium,
   utm_campaign, utm_content und utm_term — Umami liest sie aus der Adresse.
   `data-exclude-search` bleibt deshalb aus: es würde die Kennungen streichen,
   bevor `beforeSend` sie sieht. Alles andere, insbesondere `?card=`, fällt
   weg. Starts der installierten App laufen unter
   /app/standalone/, damit sich Installationen von Browserbesuchen
   unterscheiden lassen. Gesendet wird nur auf der Produktions-Domain; lokal
   loggt die Konsole. Das Skript-Tag steht im gebauten HTML: Umami bricht ab,
   wenn `document.currentScript` leer ist, und das ist es bei einem nachträglich
   eingefügten Tag. Der Service Worker braucht nichts davon zu wissen:
   das Skript kommt von cloud.umami.is, die Meldungen sind POSTs dorthin.
   Offline geht nichts raus. */

export const UMAMI_SRC = 'https://cloud.umami.is/script.js'
export const UMAMI_WEBSITE_ID = 'a66fa4d1-df03-40b2-912b-d106dfebb6aa'
export const UMAMI_DOMAIN = 'guide.zukunftskompetenzchallenge.ch'
export const BEFORE_SEND_NAME = 'idgUmamiBeforeSend'

/** Klassisches defer-Tag, wie von Umami vorgegeben. Kein type=module:
    sonst ist document.currentScript leer und das Skript tut nichts. */
export function umamiScriptHtml() {
  return `<script defer src="${UMAMI_SRC}" data-website-id="${UMAMI_WEBSITE_ID}" data-domains="${UMAMI_DOMAIN}" data-exclude-hash="true" data-before-send="${BEFORE_SEND_NAME}"></script>`
}

const APP_PATH = '/app/'
const STANDALONE_PATH = '/app/standalone/'
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']

function parsed(raw, base) {
  const url = new URL(raw, base)
  return { url, absolute: /^https?:\/\//i.test(raw) }
}

function format(url, absolute) {
  return absolute ? url.toString() : `${url.pathname}${url.search}`
}

/** Hash weg. Query nur behalten, wenn sie eine der fünf Kampagnenkennungen ist. */
function keepUtm(url) {
  const kept = new URLSearchParams()
  for (const [key, value] of url.searchParams) {
    const canon = key.toLowerCase()
    if (!value || !UTM_KEYS.includes(canon) || kept.has(canon)) continue
    kept.set(canon, value)
  }
  const ordered = new URLSearchParams()
  for (const key of UTM_KEYS) {
    if (kept.has(key)) ordered.set(key, kept.get(key))
  }
  url.search = ordered.toString()
  url.hash = ''
}

function stripQuery(url) {
  url.search = ''
  url.hash = ''
}

/** Reine Funktion: nur UTM-Parameter an der Adresse, Referrer ohne Query, Standalone markieren. */
export function sanitizeEvent(event, { standalone = false, base = `https://${UMAMI_DOMAIN}` } = {}) {
  if (!event || typeof event !== 'object') return event
  const next = { ...event }
  if (typeof event.url === 'string' && event.url) {
    const { url, absolute } = parsed(event.url, base)
    keepUtm(url)
    if (standalone && url.pathname === APP_PATH) url.pathname = STANDALONE_PATH
    next.url = format(url, absolute)
  }
  if (typeof event.referrer === 'string' && event.referrer) {
    try {
      const { url, absolute } = parsed(event.referrer, base)
      stripQuery(url)
      next.referrer = format(url, absolute)
    } catch { /* Referrer unparsebar: Original behalten */ }
  }
  return next
}

/** Läuft die Seite als installierte PWA (Startbildschirm), nicht im Browser-Tab? */
export function detectStandalone() {
  if (typeof window === 'undefined') return false
  try {
    return !!(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone)
  } catch { return false }
}

function standaloneNow(isStandalone) {
  try { return !!isStandalone() } catch { return false }
}

/** Einmal pro Seite aufrufen. Ausserhalb der Produktions-Domain wird nichts geladen. */
export function initAnalytics({
  isStandalone = detectStandalone,
  win = typeof window !== 'undefined' ? window : undefined,
  prod = import.meta.env.PROD,
} = {}) {
  if (!win?.document?.head) return

  const send = (type, payload) => sanitizeEvent(payload, { standalone: standaloneNow(isStandalone) })
  win[BEFORE_SEND_NAME] = send

  const hostname = win.location?.hostname
  if (!prod || hostname !== UMAMI_DOMAIN) {
    if (!prod && !win.umami) {
      const page = send('event', { url: win.location?.href || '' })
      console.debug('[umami] pageview', page?.url || '')
      win.umami = {
        track: (name, data) => console.debug('[umami]', name, data),
      }
    }
    return
  }

  if (win.document.querySelector(`script[data-website-id="${UMAMI_WEBSITE_ID}"]`)) return

  const script = win.document.createElement('script')
  script.defer = true
  script.src = UMAMI_SRC
  script.dataset.websiteId = UMAMI_WEBSITE_ID
  script.dataset.domains = UMAMI_DOMAIN
  script.dataset.excludeHash = 'true'
  script.dataset.beforeSend = BEFORE_SEND_NAME
  win.document.head.appendChild(script)
}

const where = (embedded) => (embedded ? 'landing' : 'app')

function track(name, data) {
  const umami = typeof window !== 'undefined' ? window.umami : undefined
  if (typeof umami?.track === 'function') umami.track(name, data)
}

/** Karte auf die Rückseite gedreht — erst dann gilt sie als angeschaut. */
export function trackCardFlip({ id, lang, embedded }) {
  track('Karte gedreht', { karte: id, sprache: lang, ort: where(embedded) })
}

/** Sheet «Im Unterricht» geöffnet. */
export function trackTeachingOpen({ id, lang, embedded }) {
  track('Unterricht geöffnet', { karte: id, sprache: lang, ort: where(embedded) })
}
