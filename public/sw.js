/* Offline-Betrieb für die Kartenapp.
   Bilder und Manifest liegen unter stabilen Pfaden -> cache-first.
   HTML und die gehashten Vite-Bundles -> network-first mit Cache als
   Rückfallebene, damit ein Deploy nicht in einer alten Version hängen bleibt. */

const CACHE = 'idg-cards-v1'
const SHELL = ['/app/', '/manifest.webmanifest']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()))
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (e) => {
  const { request } = e
  if (request.method !== 'GET') return

  const url = new URL(request.url)
  if (url.origin !== self.location.origin) return

  const immutable = url.pathname.startsWith('/assets/')

  if (immutable) {
    e.respondWith(
      caches.match(request).then((hit) => hit || fetch(request).then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(request, copy)) }
        return res
      })),
    )
    return
  }

  e.respondWith(
    fetch(request)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(request, copy)) }
        return res
      })
      .catch(() => caches.match(request).then((hit) => hit || caches.match('/app/'))),
  )
})
