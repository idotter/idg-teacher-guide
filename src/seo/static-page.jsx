import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { PageLayout } from '../site/Page.jsx'
import { pageFromPath } from '../site/pages.jsx'

/** Derselbe sichtbare Artikel wie in React — für Crawler ohne JavaScript. */
export function renderStaticPageHtml(pathname) {
  const page = pageFromPath(pathname)
  if (!page) return ''
  return renderToStaticMarkup(<PageLayout page={page} here={pathname} />)
}
