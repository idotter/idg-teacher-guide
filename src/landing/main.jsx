import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import './landing.css'
import Landing from './Landing.jsx'
import { pagePath } from '../site/chrome.jsx'
import { loadLangModules } from '../site/lang-modules.js'

/* Erst die Sprachdateien, dann mounten — wie bei den Unterseiten. */
const here = pagePath()

loadLangModules(here).then(({ site, content }) => {
  createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Landing site={site} content={content} here={here} />
    </React.StrictMode>,
  )
})
