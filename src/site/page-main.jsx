import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import '../landing/landing.css'
import Page from './Page.jsx'
import { pagePath } from './chrome.jsx'
import { loadLangModules } from './lang-modules.js'

/* Erst die Sprachdateien, dann mounten: React leert den Container beim ersten
   Commit, und der Rumpf aus dem Build soll bis dahin stehen bleiben. */
const here = pagePath()

loadLangModules(here).then(({ site, content }) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Page site={site} content={content} here={here} />
    </React.StrictMode>,
  )
})
