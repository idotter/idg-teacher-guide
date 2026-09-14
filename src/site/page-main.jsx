import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import '../landing/landing.css'
import Page from './Page.jsx'
import { pagePath } from './chrome.jsx'
import { loadLangModules } from './lang-modules.js'
import { LOAD_FAILURE_STRIP_TEXT } from './load-failure-text.js'

/* Erst die Sprachdateien, dann mounten: React leert den Container beim ersten
   Commit, und der Rumpf aus dem Build soll bis dahin stehen bleiben. */
const here = pagePath()

/* Scheitert das Laden, bleibt hier — anders als auf der Startseite — der
   vorgerenderte Rumpf stehen: der Text ist lesbar, tot sind nur die
   Bedienelemente. Deshalb ein Streifen über der Seite statt einer
   Ersatzseite, und derselbe Grundsatz wie dort: kein weiterer Abruf, Stile
   am Element, weil das Stylesheet mitgescheitert sein kann.

   Zweisprachig wie die Rückfallebene der Startseite (`landing/main.jsx`) —
   dieselbe Begründung: die Übersetzung selbst ist ja gerade nicht ladbar, und
   ohne sie wüsste eine nicht-deutschsprachige Person nicht, was der deutsche
   Text bedeutet. Text und Reload-Label kommen aus `load-failure-text.js`,
   einer eigenen Datei ohne DOM-Zugriff — dieser Einstieg selbst lädt beim
   Import sofort `window.location` (`pagePath()`) und ist darum unter Vitest
   nicht importierbar, der Text allein schon.

   Das Kontaktformular wird zugleich stillgelegt. Ohne React trägt es keinen
   Absende-Handler und auch kein `action`; ein Klick auf «Nachricht senden»
   lüde die Seite mit Name, E-Mail und Text in der Adresszeile neu. Verhindern
   ist eindeutig besser als das — senden kann es in diesem Zustand ohnehin
   nicht. */
function showLoadFailure(err) {
  console.error('Sprachmodule konnten nicht geladen werden.', err)
  const root = document.getElementById('root')
  if (!root) return

  const strip = document.createElement('div')
  strip.setAttribute('role', 'status')
  strip.style.cssText = 'margin:0;padding:10px 24px;text-align:center;'
    + 'font:400 14px/1.5 system-ui,-apple-system,sans-serif;color:#000;'
    + 'background:#FAF7F5;border-bottom:1px solid rgba(0,0,0,.12)'

  const de = document.createElement('p')
  de.style.cssText = 'margin:0'
  de.textContent = `${LOAD_FAILURE_STRIP_TEXT.de} `

  const again = document.createElement('button')
  again.type = 'button'
  again.textContent = LOAD_FAILURE_STRIP_TEXT.reload
  again.style.cssText = 'font:inherit;text-decoration:underline;border:0;padding:0;'
    + 'background:none;color:inherit;cursor:pointer'
  again.addEventListener('click', () => window.location.reload())
  de.append(again)

  const en = document.createElement('p')
  en.style.cssText = 'margin:2px 0 0;opacity:.6;font-size:12px'
  en.textContent = LOAD_FAILURE_STRIP_TEXT.en

  strip.append(de, en)
  root.prepend(strip)
  document.querySelector('.contact-form')?.addEventListener('submit', (e) => e.preventDefault())
}

loadLangModules(here)
  .then(({ site, content }) => {
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Page site={site} content={content} here={here} />
      </React.StrictMode>,
    )
  })
  .catch(showLoadFailure)
