import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PageLayout } from '../site/Page.jsx'
import { pageFromPath } from '../site/pages.jsx'

/** Derselbe sichtbare Artikel wie in React — für Crawler ohne JavaScript.
 *  `site`/`content` kommen vom Aufrufer, in der Sprache der Route: weicht die
 *  Hydration von der vorgerenderten Sprache ab, flackert die Seite beim Laden. */
export function renderStaticPageHtml(pathname, site, content) {
  const page = pageFromPath(pathname, site, content)
  if (!page) return ''
  return renderToStaticMarkup(<PageLayout page={page} here={pathname} site={site} />)
}
