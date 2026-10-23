import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import IdgCards from './IdgCards.jsx'
import { initAnalytics } from '../analytics.js'
import { CHANGELOG } from './changelog.js'

initAnalytics()

const UPDATE_READY = 'idg:update-ready'

// `/app/?update=test` spielt ein Update nach: zuerst das Banner, nach dem
// nächsten Neuladen die Neuigkeiten. Der Parameter verschwindet sofort aus der URL.
const UPDATE_TEST = 'idg-update-test'
try {
  const params = new URLSearchParams(window.location.search)
  if (params.get('update') === 'test') {
    params.delete('update')
    const qs = params.toString()
    window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash)
    localStorage.setItem('idg-cards-onboarded', 'true')
    localStorage.setItem('idg-cards-seenNews', JSON.stringify(CHANGELOG[0]?.id ?? null))
    sessionStorage.setItem(UPDATE_TEST, '1')
    window.addEventListener('load', () => {
      setTimeout(() => window.dispatchEvent(new Event(UPDATE_READY)), 1500)
    })
  } else if (sessionStorage.getItem(UPDATE_TEST)) {
    sessionStorage.removeItem(UPDATE_TEST)
    localStorage.setItem('idg-cards-seenNews', JSON.stringify('test'))
  }
} catch { /* Privatmodus o. Ä. */ }

// Standalone-PWA: die Vorgaben aus den data-props von
// "IDG Karten v3 organisch.dc.html".
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <IdgCards
      variant="farbe"
      flipAxis="y"
      showNumbers={false}
      back="liste"
      depth="schatten"
      radius="weich"
      ui="minimal"
      lang="de"
    />
  </React.StrictMode>,
)

// Service Worker für Offline-Betrieb — die Karten sollen auch ohne Netz
// im Schulzimmer verfügbar sein. Ein neues sw.js (andere Build-ID) übernimmt
// sofort; die offene App lädt erst neu, wenn jemand das Banner antippt.
const UPDATE_EVERY_MS = 60 * 60 * 1000

if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller
  if (hadController) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.dispatchEvent(new Event(UPDATE_READY))
    })
  }
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((reg) => {
      const check = () => { reg.update().catch(() => { /* nächster Versuch beim nächsten Vordergrund */ }) }
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') check()
      })
      setInterval(check, UPDATE_EVERY_MS)
    }).catch(() => { /* ohne SW läuft die App weiterhin online */ })
  })
}
