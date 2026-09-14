import React from 'react'
import { localizedPath } from './routes.js'

/* Ersetzt {platzhalter} in einem contentPages-Text — dieselbe Regel wie in
   pages.jsx/Landing.jsx, hier bewusst eine eigene, kleine Kopie statt eines
   gemeinsamen Imports: diese Datei soll nicht an deren Bundle hängen. */
function fill(text, vars) {
  return text.replace(/\{(\w+)\}/g, (whole, name) => (name in vars ? vars[name] : whole))
}

export function Crumbs({ items, ariaLabel }) {
  if (!items?.length) return null
  return (
    <nav className="crumbs" aria-label={ariaLabel}>
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
   `pages.jsx`/`lang-modules.js`) statt fest aus `content/de.js`; die
   sichtbaren Beschriftungen dieser Datei selbst (Knöpfe, Überschriften,
   Brotkrumen-aria-label) kommen aus `site.contentPages` — sonst stünden auf
   `/it/competenze/mut/` deutsche Beschriftungen im vorgerenderten Rumpf. */
export function dimensionPageBody(page, site) {
  const { dim, dimSkills, lang } = page
  const cp = site.contentPages
  return (
    <>
      <p>{dim.intro}</p>
      <h2>{fill(cp.dimensionHeading, { dimName: dim.name })}</h2>
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
        <a className="btn" href="/app/">{cp.openAppCta}</a>
      </p>
    </>
  )
}

export function skillPageBody(page, site, ui) {
  const { skill, dim, dimSkills, lang } = page
  const cp = site.contentPages
  const siblings = (dimSkills || []).filter((item) => item.id !== skill.id)

  return (
    <>
      <p>
        {cp.dimensionPrefix}{' '}
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
          {fill(cp.openCardCta, { skillName: skill.name })}
        </a>
      </p>

      {siblings.length > 0 && (
        <>
          <h2>{fill(cp.otherSkillsHeading, { dimName: dim.name })}</h2>
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
