import { describe, expect, it } from 'vitest'
import { tourSteps } from './IdgCards.jsx'
import deContent from '../content/de.js'
import itContent from '../content/it.js'

/* Vor Task 9 war TOUR_STEPS eine Modul-Konstante mit fest deutschem Titel
   (`t`) und Text (`x`) — auf einer Karte in italienischer Sprache lief die
   Einführungstour trotzdem auf Deutsch. Jetzt baut `tourSteps(ui)` die vier
   Schritte aus `content/<lang>.js#ui`; nur die Symbole (`o`) bleiben fest. */
describe('tourSteps', () => {
  it('baut vier Schritte, jeder mit Titel, Text und Symbol', () => {
    const steps = tourSteps(deContent.ui)
    expect(steps).toHaveLength(4)
    for (const step of steps) {
      expect(typeof step.t).toBe('string')
      expect(step.t.length).toBeGreaterThan(0)
      expect(typeof step.x).toBe('string')
      expect(step.x.length).toBeGreaterThan(0)
      expect(step.o).toBeTruthy()
    }
  })

  it('trägt für Deutsch wortgleich die bisherigen, fest deutschen Texte (keine Regression)', () => {
    const steps = tourSteps(deContent.ui)
    expect(steps[0]).toMatchObject({
      t: 'Karte umdrehen',
      x: 'Tippe auf die Karte: Vorne die Fähigkeit, hinten Reflexionsfragen für dich und deine Klasse.',
    })
    expect(steps[3]).toMatchObject({
      t: 'Alles andere im Menü',
      x: 'Hinter den Ringen oben rechts findest du Dimensionen, Merkliste, Reihenfolge und Einstellungen.',
    })
  })

  it('trägt für Italienisch die italienischen Tour-Texte, nicht die deutschen', () => {
    const steps = tourSteps(itContent.ui)
    expect(steps[0].t).toBe(itContent.ui.tourStep1Title)
    expect(steps[0].t).toBe('Girare la carta')
    expect(steps[0].t).not.toBe('Karte umdrehen')
    expect(steps[0].x).not.toContain('Fähigkeit')
  })

  it('die vier Symbole (o) sind für jede Sprache dieselben, sprachneutralen Icons', () => {
    const deSteps = tourSteps(deContent.ui)
    const itSteps = tourSteps(itContent.ui)
    for (let i = 0; i < 4; i++) {
      expect(deSteps[i].o).toBe(itSteps[i].o)
    }
  })
})
