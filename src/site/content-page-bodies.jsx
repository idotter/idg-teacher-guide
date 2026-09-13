import React from 'react'
import { ui } from '../content/de.js'
import { dimensionPath, skillPath } from '../seo/content-pages.js'

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

export function dimensionCrumbs(page) {
  return [
    { href: '/', label: 'Startseite' },
    { label: page.dim.name },
  ]
}

export function skillCrumbs(page) {
  return [
    { href: '/', label: 'Startseite' },
    { href: dimensionPath(page.dim.id), label: page.dim.name },
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

export function dimensionPageBody(page) {
  const { dim, dimSkills } = page
  return (
    <>
      <p>{dim.intro}</p>
      <h2>Kompetenzen in «{dim.name}»</h2>
      <ul>
        {dimSkills.map((skill) => (
          <li key={skill.id}>
            <a href={skillPath(skill.id)}>{skill.name}</a>
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

export function skillPageBody(page) {
  const { skill, dim, dimSkills } = page
  const siblings = (dimSkills || []).filter((item) => item.id !== skill.id)

  return (
    <>
      <p>
        Dimension{' '}
        <a href={dimensionPath(dim.id)}>{dim.name}</a>
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
                <a href={skillPath(item.id)}>{item.name}</a>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}
