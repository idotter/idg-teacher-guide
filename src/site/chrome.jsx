import React, { useEffect, useRef, useState } from 'react'
import { RING_COLORS } from './ring-colors.js'
import { LANGS, writeStoredLang } from '../content/langs.js'
import { langFromPath, localizedPath, translationsOf } from './routes.js'

/* Die Fusszeilenspalten hängen an der Sprache: der Pfad kommt aus routes.js,
   die Beschriftung aus derselben Sprachdatei wie die Seite darüber. Deshalb
   Funktionen statt Konstanten. */
export function footAbout(site, lang) {
  return [
    { href: localizedPath('project', lang), label: site.pages.project.navLabel },
    { href: localizedPath('contact', lang), label: site.pages.contact.navLabel },
  ]
}

export function footLegal(site, lang) {
  return [
    { href: localizedPath('privacy', lang), label: site.pages.privacy.navLabel },
    { href: localizedPath('terms', lang), label: site.pages.terms.navLabel },
  ]
}

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
      {RING_COLORS.map((d, i) => (
        <circle key={d.id} cx="12" cy="12" r={3 + i * 1.95} stroke={d.color} strokeWidth="1.1" />
      ))}
    </svg>
  )
}

function LangSwitcher({ lang, label, onChange }) {
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
        aria-label={label}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-full">{current.label}</span>
        <span className="lang-short">{current.v}</span>
      </button>
      {open && (
        <ul className="lang-menu" role="listbox" aria-label={label}>
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

/* Der Wähler ist Navigation, keine Einstellung: er führt auf dieselbe Seite
   in der Zielsprache. Gibt es sie dort nicht (unbekannter Pfad, App), führt
   er auf die Startseite der Zielsprache. Reine Funktion, ausgelagert aus dem
   Klick-Handler unten, damit die Zielberechnung ohne DOM/window testbar ist. */
export function langSwitchTarget(here, next) {
  const target = translationsOf(here).find((t) => t.lang === next)
  return target ? target.path : localizedPath('home', next)
}

/* Die angezeigte Sprache kommt aus dem Pfad, nicht aus dem Speicher — sonst
   zeigte der Wähler etwas anderes an als die Seite darunter. */
export function SiteHeader({ site, here = '/' }) {
  const lang = langFromPath(here)
  const { chrome } = site

  /* `writeStoredLang` bleibt trotzdem, damit /app/ — die einzige Route ohne
     Präfix — derselben Wahl folgt. */
  const changeLang = (next) => {
    writeStoredLang(next)
    window.location.assign(langSwitchTarget(here, next))
  }

  return (
    <header className="top">
      <div className="wrap top-in">
        <a className="top-mark" href={localizedPath('home', lang)} aria-label={chrome.homeAria}>
          <RingMark />
          <span className="top-words"><b>{chrome.brand}</b><span>{chrome.brandSub}</span></span>
        </a>
        <LangSwitcher lang={lang} label={chrome.langAria} onChange={changeLang} />
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

export function SiteFooter({ site, here: hereProp } = {}) {
  const here = hereProp ?? (typeof window !== 'undefined' ? pagePath() : '/')
  const lang = langFromPath(here)
  const { chrome } = site

  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <div className="foot-brand">
          <img src="/assets/inspired-by-idg.png" alt="Inspired by IDG" />
          <p>
            {chrome.footerNote}{' '}
            <a href="https://innerdevelopmentgoals.org" rel="noopener noreferrer">
              innerdevelopmentgoals.org
            </a>
          </p>
        </div>
        <nav className="foot-nav" aria-label={chrome.footerAria}>
          <div className="foot-col">
            <h2>{chrome.footerAbout}</h2>
            <FootList items={footAbout(site, lang)} here={here} />
          </div>
          <div className="foot-col">
            <h2>{chrome.footerLegal}</h2>
            <FootList items={footLegal(site, lang)} here={here} />
          </div>
        </nav>
      </div>
    </footer>
  )
}
