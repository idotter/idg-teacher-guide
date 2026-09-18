import { inject, track } from '@vercel/analytics'

/* Anonyme Nutzungsstatistik über Vercel Web Analytics.

   Keine Cookies, nichts im Browser abgelegt: Vercel erkennt Besucher über
   einen Hash aus dem Request, der nach 24 Stunden verfällt. Gemeldet werden
   Seitenaufrufe sowie zwei eigene Events — «Karte gedreht» und «Unterricht
   geöffnet», je mit Karten-ID, Sprache und Ort (App oder Demo-Stapel der
   Startseite). Die Events wertet Vercel nur im Pro-Plan aus; Seitenaufrufe
   laufen auf jedem Plan.

   Query-Parameter kommen nie mit. `?card=` wäre harmlos, aber so bleibt die
   Adresse aggregierbar. Starts der installierten App laufen unter
   /app/standalone/, damit sich Installationen von Browserbesuchen
   unterscheiden lassen. Der Service Worker braucht nichts davon zu wissen:
   das Skript ist same-origin und läuft network-first, die Meldungen sind
   POSTs, die er nicht anfasst. Offline geht nichts raus. */

const APP_PATH = '/app/'
const STANDALONE_PATH = '/app/standalone/'

/** Reine Funktion: Query und Hash weg, Standalone-Start der App markieren. */
export function sanitizeEvent(event, { standalone = false } = {}) {
  const url = new URL(event.url)
  url.search = ''
  url.hash = ''
  if (standalone && url.pathname === APP_PATH) url.pathname = STANDALONE_PATH
  return { ...event, url: url.toString() }
}

/** Läuft die Seite als installierte PWA (Startbildschirm), nicht im Browser-Tab? */
export function detectStandalone() {
  if (typeof window === 'undefined') return false
  try {
    return !!(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone)
  } catch { return false }
}

/** Einmal pro Seite aufrufen. Im Dev-Modus loggt das Skript nur in die Konsole. */
export function initAnalytics({ isStandalone = detectStandalone } = {}) {
  inject({
    mode: import.meta.env.PROD ? 'production' : 'development',
    beforeSend: (event) => sanitizeEvent(event, { standalone: isStandalone() }),
  })
}

const where = (embedded) => (embedded ? 'landing' : 'app')

/** Karte auf die Rückseite gedreht — erst dann gilt sie als angeschaut. */
export function trackCardFlip({ id, lang, embedded }) {
  track('Karte gedreht', { karte: id, sprache: lang, ort: where(embedded) })
}

/** Sheet «Im Unterricht» geöffnet. */
export function trackTeachingOpen({ id, lang, embedded }) {
  track('Unterricht geöffnet', { karte: id, sprache: lang, ort: where(embedded) })
}
