import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import './landing.css'
import Landing from './LandingApp.jsx'
import { pagePath } from '../site/chrome.jsx'
import { loadLangModules } from '../site/lang-modules.js'
import { initAnalytics } from '../analytics.js'

initAnalytics()

/* Erst die Sprachdateien, dann mounten — wie bei den Unterseiten. */
const here = pagePath()

/* Die Startseite trägt einen vorgerenderten Rumpf in `#root` (SEO-Plugin).
   Der bleibt stehen, wenn die Sprachmodule nicht laden — sonst wäre die
   Seite wieder weiss. Die Meldung kommt obendrauf, nicht an die Stelle des
   Textes.

   Fehlt der Rumpf (älteres HTML), ist die Meldung die ganze Seite. Sie kommt
   ohne weiteren Abruf aus und trägt auch dann, wenn gar kein Netz da ist.
   Ein stiller Neuladeversuch hilft nur bei veraltetem HTML, und genau dort
   hilft auch der Knopf. Scheitert er, stünde sonst wieder eine weisse Seite
   da, diesmal ohne Erklärung. Nachladen der deutschen Fassung wäre keine
   Rückfallebene: das bräuchte genau den Abruf, der eben misslungen ist.

   Reiner DOM mit Stilen am Element: das Stylesheet liegt in einem eigenen
   Chunk und kann am selben Netzfehler gescheitert sein. */
function showLoadFailure(err) {
  console.error('Sprachmodule konnten nicht geladen werden.', err)
  const root = document.getElementById('root')
  if (!root) return

  const hasPrerender = root.childElementCount > 0
  const box = document.createElement('div')
  box.setAttribute('role', 'alert')
  box.style.cssText = 'max-width:32rem;margin:' + (hasPrerender ? '24px' : '18vh') + ' auto 0;padding:0 24px;text-align:center;'
    + 'font:400 16px/1.55 system-ui,-apple-system,sans-serif;color:#000'

  const de = document.createElement('p')
  de.textContent = 'Die Seite konnte nicht vollständig geladen werden. '
    + 'Bitte die Verbindung prüfen und neu laden.'

  const en = document.createElement('p')
  en.textContent = 'This page could not be loaded. Please check your connection and reload.'
  en.style.cssText = 'opacity:.6;font-size:14px'

  const again = document.createElement('button')
  again.type = 'button'
  again.textContent = 'Neu laden · Reload'
  again.style.cssText = 'font:inherit;padding:10px 22px;border:0;border-radius:999px;'
    + 'background:#000;color:#fff;cursor:pointer'
  again.addEventListener('click', () => window.location.reload())

  box.append(de, again, en)
  if (hasPrerender) root.prepend(box)
  else root.replaceChildren(box)
}

loadLangModules(here)
  .then(({ site, content }) => {
    createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Landing site={site} content={content} here={here} />
      </React.StrictMode>,
    )
  })
  .catch(showLoadFailure)
