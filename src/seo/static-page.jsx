import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import content from '../content/de.js'
import site from '../site/i18n/de.js'
import { PageLayout } from '../site/Page.jsx'
import { pageFromPath } from '../site/pages.jsx'

/** Derselbe sichtbare Artikel wie in React — für Crawler ohne JavaScript. */
// Noch fest Deutsch: die Sprache der Route zieht Task 6 ein.
export function renderStaticPageHtml(pathname) {
  const page = pageFromPath(pathname, site, content)
  if (!page) return ''
  return renderToStaticMarkup(<PageLayout page={page} here={pathname} site={site} />)
}
