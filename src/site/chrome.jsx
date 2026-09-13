import React from 'react'
import { dimensions } from '../content/de.js'

export const FOOT_ABOUT = [
  { href: '/projekt/', label: 'Das Projekt' },
  { href: '/kontakt/', label: 'Kontakt' },
]

export const FOOT_LEGAL = [
  { href: '/datenschutz/', label: 'Datenschutz' },
  { href: '/nutzungsbedingungen/', label: 'Nutzungsbedingungen' },
]

export function pagePath(pathname = window.location.pathname) {
  const clean = pathname.replace(/\/+$/, '')
  return clean ? `${clean}/` : '/'
}

/* Das IDG-Zeichen: fünf Ringe, von innen nach aussen in der Reihenfolge der
   Dimensionen — Sein zuinnerst, Handeln zuäusserst, wie im Logo. Gezeichnet
   statt als Bild geladen: so stimmen die Farben immer mit den Daten überein
   und das Zeichen bleibt bei jeder Grösse scharf. */
export function RingMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ flex: 'none' }}>
      {dimensions.map((d, i) => (
        <circle key={d.id} cx="12" cy="12" r={3 + i * 1.95} stroke={d.color} strokeWidth="1.1" />
      ))}
    </svg>
  )
}

export function SiteHeader() {
  return (
    <header className="top">
      <div className="wrap top-in">
        <a className="top-mark" href="/" aria-label="Zur Startseite">
          <RingMark />
          <span className="top-words"><b>IDG</b><span>im Schulalltag</span></span>
        </a>
        <a className="btn btn-sm" href="/app/">App öffnen</a>
      </div>
    </header>
  )
}

function FootList({ items, here }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.href}>
          <a href={item.href} aria-current={here === item.href ? 'page' : undefined}>
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

export function SiteFooter() {
  const here = pagePath()
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <img src="/assets/inspired-by-idg.png" alt="Inspired by IDG" />
          <p>
            Dieses Angebot ist inspiriert vom Inner Development Guide. Mehr unter{' '}
            <a href="https://innerdevelopmentgoals.org" rel="noopener noreferrer">
              innerdevelopmentgoals.org
            </a>
          </p>
        </div>
        <nav className="foot-nav" aria-label="Fusszeile">
          <div className="foot-col">
            <h2>Über das Projekt</h2>
            <FootList items={FOOT_ABOUT} here={here} />
          </div>
          <div className="foot-col">
            <h2>Rechtliches</h2>
            <FootList items={FOOT_LEGAL} here={here} />
          </div>
        </nav>
      </div>
    </footer>
  )
}
