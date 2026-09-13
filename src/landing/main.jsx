import React from 'react'
import { createRoot } from 'react-dom/client'
import '../ds/styles.css'
import './landing.css'
import Landing from './Landing.jsx'
import { pagePath } from '../site/chrome.jsx'
import { loadLangModules } from '../site/lang-modules.js'

/* Erst die Sprachdateien, dann mounten — wie bei den Unterseiten. */
const here = pagePath()

/* Die Startseite trägt keinen vorgerenderten Rumpf: `#root` ist im gebauten
   HTML leer, gefüllt wird er erst beim Mount. Seit die Texte je Sprache
   nachgeladen werden, müssen dafür drei Abrufe gelingen statt einem — bei
   veraltetem HTML aus Cache oder CDN, beim ersten Besuch ohne Netz oder bei
   einem Abbruch mitten im Laden bliebe sonst eine weisse Seite ohne ein Wort.
   Der Service Worker fängt das nicht ab; er ist cache-first für Dateien, die
   schon einmal geholt wurden.

   Die Rückfallebene ist deshalb eine Meldung und kein automatischer
   Neuladeversuch:
     - Sie kommt ohne jeden weiteren Abruf aus und trägt auch dann, wenn gar
       kein Netz da ist — der Fall, in dem ein Neuladen nichts ausrichtet.
     - Ein stiller Neuladeversuch hilft nur bei veraltetem HTML, und genau
       dort hilft auch der Knopf unten. Scheitert er, steht wieder eine weisse
       Seite da, diesmal ohne Erklärung, und niemand sieht, dass etwas kaputt
       ist.
   Nachladen der deutschen Fassung wäre keine Rückfallebene: das bräuchte
   genau den Abruf, der eben misslungen ist.

   Reiner DOM mit Stilen am Element: das Stylesheet liegt in einem eigenen
   Chunk und kann am selben Netzfehler gescheitert sein. */
function showLoadFailure(err) {
  console.error('Sprachmodule konnten nicht geladen werden.', err)
  const root = document.getElementById('root')
  if (!root) return

  const box = document.createElement('div')
  box.setAttribute('role', 'alert')
  box.style.cssText = 'max-width:32rem;margin:18vh auto 0;padding:0 24px;text-align:center;'
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
  root.replaceChildren(box)
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
