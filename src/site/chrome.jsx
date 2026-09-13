import React, { useEffect, useRef, useState } from 'react'
import { dimensions } from '../content/de.js'
import { LANGS, readStoredLang, writeStoredLang } from '../content/langs.js'

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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {dimensions.map((d, i) => (
        <circle key={d.id} cx="12" cy="12" r={3 + i * 1.95} stroke={d.color} strokeWidth="1.1" />
      ))}
    </svg>
  )
}

function LangSwitcher({ lang, onChange }) {
  const [open, setOpen] = useState(false)
  const box = useRef(null)
  const current = LANGS.find((l) => l.v === lang) || LANGS[0]

  useEffect(() => {
    if (!open) return undefined
    const onDoc = (e) => {
      if (box.current && !box.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('pointerdown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <div className={`lang${open ? ' is-open' : ''}`} ref={box}>
      <button
        type="button"
        className="lang-btn"
        aria-label="Sprache"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-full">{current.label}</span>
        <span className="lang-short">{current.v}</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label="Sprache">
          {LANGS.map((o) => (
            <li key={o.v} role="option" aria-selected={o.v === lang}>
              <button type="button" onClick={() => { onChange(o.v); setOpen(false) }}>
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function SiteHeader({ lang: langProp, onLangChange } = {}) {
  const [langState, setLangState] = useState(readStoredLang)
  const lang = langProp ?? langState

  const changeLang = (next) => {
    writeStoredLang(next)
    setLangState(next)
    onLangChange?.(next)
  }

  return (
    <header className="top">
      <div className="wrap top-in">
        <a className="top-mark" href="/" aria-label="Zur Startseite">
          <RingMark />
          <span className="top-words"><b>Inner Development Guide</b><span>im Schulalltag</span></span>
        </a>
        <LangSwitcher lang={lang} onChange={changeLang} />
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

export function SiteFooter({ here: hereProp } = {}) {
  const here = hereProp ?? (typeof window !== 'undefined' ? pagePath() : '/')
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
