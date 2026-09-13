import React from 'react'
import { dimensionPath, skillPath } from '../seo/content-pages.js'

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
  const { skill, dim } = page
  return (
    <>
      <p>
        Dimension{' '}
        <a href={dimensionPath(dim.id)}>{dim.name}</a>
        {' '}— {dim.subtitle}
      </p>
      <h2>Reflexionskarten</h2>
      <p>
        Diese Kompetenz findest du als umdrehbare Karte in der App — mit Fragen für
        dich und deine Klasse, Ideen für den Unterricht und einer Mini-Übung.
      </p>
      <p>
        <a className="btn" href={`/app/?card=${encodeURIComponent(skill.id)}`}>
          Karte «{skill.name}» öffnen
        </a>
      </p>
      {skill.subjects?.length > 0 && (
        <>
          <h2>Anknüpfungspunkte</h2>
          <p>{skill.subjects.join(' · ')}</p>
        </>
      )}
      {skill.exercise?.title && (
        <>
          <h2>Mini-Übung</h2>
          <p>{skill.exercise.title}</p>
        </>
      )}
    </>
  )
}
