import React from 'react'
import { langFromPath } from '../site/routes.js'
import HeroDeck from './HeroDeck.jsx'
import { LandingView, heroDeckOf } from './Landing.jsx'

export default function Landing({ site, content, here }) {
  const lang = langFromPath(here)
  return (
    <LandingView
      site={site}
      content={content}
      here={here}
      deck={<HeroDeck lang={lang} deck={heroDeckOf(content)} label={site.landing.deckAria} />}
    />
  )
}
