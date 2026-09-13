import React from 'react'
import { localizedPath } from './routes.js'

export function Crumbs({ items }) {
  if (!items?.length) return null
  return (
    <nav className="crumbs" aria-label="Brotkrumen">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`}>
              {last || !item.href
                ? <span aria-current={last ? 'page' : undefined}>{item.label}</span>
                : <a href={item.href}>{item.label}</a>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* `site.contentPages.crumbHome` statt festem 'Startseite': crumbHome ist
   ausschliesslich für diese Inhaltsseiten gedacht (Dimensionen/Kompetenzen) —
   die Unterseiten (/projekt/, /kontakt/, …) tragen laut Task 4 gar keine
   sichtbaren Brotkrumen. */
export function dimensionCrumbs(page, site) {
  return [
    { href: localizedPath('home', page.lang), label: site.contentPages.crumbHome },
    { label: page.dim.name },
  ]
}

export function skillCrumbs(page, site) {
  return [
    { href: localizedPath('home', page.lang), label: site.contentPages.crumbHome },
    { href: localizedPath('dimension', page.lang, page.dim.id), label: page.dim.name },
    { label: page.skill.name },
  ]
}

function QuestionList({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/* `ui` kommt vom Aufrufer (die Kartendaten der Route-Sprache aus
   `pages.jsx`/`lang-modules.js`) statt fest aus `content/de.js` — sonst
   stünden auf `/it/competenze/mut/` deutsche Beschriftungen im
   vorgerenderten Rumpf. */
export function dimensionPageBody(page) {
  const { dim, dimSkills, lang } = page
  return (
    <>
      <p>{dim.intro}</p>
      <h2>Kompetenzen in «{dim.name}»</h2>
      <ul>
        {dimSkills.map((skill) => (
          <li key={skill.id}>
            <a href={localizedPath('skill', lang, skill.id)}>{skill.name}</a>
            {' — '}
            {skill.desc}
          </li>
        ))}
      </ul>
      <p>
        <a className="btn" href="/app/">Reflexionskarten öffnen</a>
      </p>
    </>
  )
}

export function skillPageBody(page, ui) {
  const { skill, dim, dimSkills, lang } = page
  const siblings = (dimSkills || []).filter((item) => item.id !== skill.id)

  return (
    <>
      <p>
        Dimension{' '}
        <a href={localizedPath('dimension', lang, dim.id)}>{dim.name}</a>
        {' '}— {dim.subtitle}
      </p>

      {skill.teacher?.length > 0 && (
        <>
          <h2>{ui.forMe}</h2>
          <QuestionList items={skill.teacher} />
        </>
      )}

      {skill.students?.length > 0 && (
        <>
          <h2>{ui.forStudents}</h2>
          <QuestionList items={skill.students} />
        </>
      )}

      {skill.ideas?.length > 0 && (
        <>
          <h2>{ui.ideas}</h2>
          <QuestionList items={skill.ideas} />
        </>
      )}

      {skill.subjects?.length > 0 && (
        <>
          <h2>{ui.subjects}</h2>
          <p>{skill.subjects.join(' · ')}</p>
        </>
      )}

      {skill.exercise?.title && (
        <>
          <h2>{ui.exercise}</h2>
          <p><strong>{skill.exercise.title}</strong></p>
          {skill.exercise.text && <p>{skill.exercise.text}</p>}
        </>
      )}

      <p>
        <a className="btn" href={`/app/?card=${encodeURIComponent(skill.id)}`}>
          Karte «{skill.name}» öffnen
        </a>
      </p>

      {siblings.length > 0 && (
        <>
          <h2>Weitere Kompetenzen in «{dim.name}»</h2>
          <ul>
            {siblings.map((item) => (
              <li key={item.id}>
                <a href={localizedPath('skill', lang, item.id)}>{item.name}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
