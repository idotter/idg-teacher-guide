import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { LandingView, staticHeroDeck } from '../landing/Landing.jsx'

/** Sichtbarer Startseiten-Rumpf für Crawler ohne JavaScript.
 *  Der interaktive Stapel kommt erst mit dem Client; hier steht dieselbe
 *  Kartenfront als Text im HTML. */
export function renderLandingHtml(pathname, site, content) {
  return renderToStaticMarkup(
    <LandingView
      site={site}
      content={content}
      here={pathname}
      deck={staticHeroDeck(content, site.landing.deckAria)}
    />,
  )
}
