import React, { useState } from 'react'
import { contentPageFromPath } from '../seo/content-pages.js'
import { CONTACT_MAIL } from '../seo/meta.js'
import {
  dimensionCrumbs,
  dimensionPageBody,
  skillCrumbs,
  skillPageBody,
} from './content-page-bodies.jsx'
import { langFromPath, localizedPath, routeKeyFromPath } from './routes.js'

export { CONTACT_MAIL }

/* Inline-Markup der Textdaten (src/site/i18n/<lang>.js):
     `code`              → <code>
     [Text](https://…)   → externer Link, mit rel="noopener noreferrer"
     [Text](/app/)       → Link auf einen festen Pfad
     [Text](path:key)    → interner Link, Pfad je Sprache aus routes.js
   Der Parser liefert React-Elemente, nie HTML-Strings: die Texte führen
   Guillemets, Halbgeviertstriche und Doppelpunkte mitten im Wort
   («Herausgeber:innen»), die als Markup missdeutet würden. Ein Escape für
   wörtliche Backticks oder Klammern gibt es nicht — kein Text braucht ihn. */
const INLINE = /`([^`]+)`|\[([^\]]+)\]\(([^)]+)\)/g

/** Ersetzt {platzhalter} — auch innerhalb einer URL, siehe [{mail}](mailto:{mail}). */
function fill(text, vars) {
  return text.replace(/\{(\w+)\}/g, (whole, name) => (name in vars ? vars[name] : whole))
}

function hrefFor(target, lang) {
  return target.startsWith('path:') ? localizedPath(target.slice(5), lang) : target
}

/** Fliesstext eines Absatzes, Listeneintrags oder einer FAQ-Antwort. */
export function inline(text, lang, vars = {}) {
  const out = []
  let last = 0
  let hit
  INLINE.lastIndex = 0
  while ((hit = INLINE.exec(text)) !== null) {
    if (hit.index > last) out.push(fill(text.slice(last, hit.index), vars))
    const [whole, code, label, target] = hit
    if (code !== undefined) {
      out.push(<code key={out.length}>{fill(code, vars)}</code>)
    } else {
      const href = hrefFor(fill(target, vars), lang)
      out.push(
        <a
          key={out.length}
          href={href}
          rel={/^https?:\/\//i.test(href) ? 'noopener noreferrer' : undefined}
        >
          {fill(label, vars)}
        </a>,
      )
    }
    last = hit.index + whole.length
  }
  if (last < text.length) out.push(fill(text.slice(last), vars))
  return out
}

/* Überschriften bleiben roh: sie tragen kein Inline-Markup, und eine Klammer
   in einem Titel soll ein Titel bleiben. */
function Blocks({ blocks, lang, vars, dimensions, faq }) {
  return blocks.map((b, i) => {
    if (b.t === 'h2') return <h2 key={i}>{b.v}</h2>
    if (b.t === 'h3') return <h3 key={i}>{b.v}</h3>
    if (b.t === 'p') return <p key={i}>{inline(b.v, lang, vars)}</p>
    if (b.t === 'ul') {
      return (
        <ul key={i}>
          {b.v.map((li, j) => <li key={j}>{inline(li, lang, vars)}</li>)}
        </ul>
      )
    }
    if (b.t === 'dimList') {
      return (
        <ul key={i}>
          {dimensions.map((dim) => (
            <li key={dim.id}>
              <a href={localizedPath('dimension', lang, dim.id)}>{dim.name}</a>
              {' — '}
              {dim.subtitle}
            </li>
          ))}
        </ul>
      )
    }
    if (b.t === 'faq') {
      return faq.map((item, j) => (
        <React.Fragment key={`${i}-${j}`}>
          <h3>{item.q}</h3>
          <p>{inline(item.a, lang, vars)}</p>
        </React.Fragment>
      ))
    }
    return null
  })
}

function ContactForm({ labels }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`${labels.subject} ${name || labels.subjectFallback}`)
    const body = encodeURIComponent(
      `${labels.name}: ${name}\n${labels.email}: ${email}\n\n${message}`,
    )
    window.location.href = `mailto:${CONTACT_MAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="field">
        <span>{labels.name}</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>{labels.email}</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label className="field">
        <span>{labels.message}</span>
        <textarea
          name="message"
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </label>
      <button className="btn" type="submit">{labels.submit}</button>
    </form>
  )
}

/* Dimensions- und Kompetenzseiten kommen weiter aus den Kartendaten; ihre
   Sprachumstellung ist Task 6. */
function contentPage(pathname) {
  const page = contentPageFromPath(pathname)
  if (!page) return null
  return {
    title: page.title,
    documentTitle: page.documentTitle,
    description: page.description,
    lead: page.kind === 'dimension' ? page.dim.subtitle : page.skill.desc,
    crumbs: page.kind === 'dimension' ? dimensionCrumbs(page) : skillCrumbs(page),
    body: page.kind === 'dimension' ? dimensionPageBody(page) : skillPageBody(page),
  }
}

/**
 * `site` sind die Website-Texte der Route-Sprache, `content` ihre Kartendaten.
 * Beide lädt Page.jsx; hier wird nur gerendert.
 */
export function pageFromPath(pathname, site, content) {
  const lang = langFromPath(pathname)
  const { key } = routeKeyFromPath(pathname)

  if (key === 'dimension' || key === 'skill') return contentPage(pathname)

  const page = site.pages[key]
  // home und app tragen nur Metatexte: die Startseite ist die Landingpage,
  // /app/ die App selbst. Beide rendert nicht diese Datei.
  if (!page?.body) return null

  return {
    title: page.title,
    documentTitle: page.documentTitle,
    description: page.description,
    lead: page.lead,
    body: (
      <>
        {page.precedenceNote && <p className="note">{page.precedenceNote}</p>}
        <Blocks
          blocks={page.body}
          lang={lang}
          vars={{ mail: CONTACT_MAIL }}
          dimensions={content.dimensions}
          faq={page.faq || []}
        />
        {key === 'contact' && <ContactForm labels={page.form} />}
      </>
    ),
  }
}
