import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import IdgCards from './IdgCards.jsx'
import { initAnalytics } from '../analytics.js'

initAnalytics()

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
// im Schulzimmer verfügbar sein.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { /* ohne SW läuft die App weiterhin online */ })
  })
}
