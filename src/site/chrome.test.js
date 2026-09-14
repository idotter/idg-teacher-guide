import { describe, expect, it } from 'vitest'
import { langSwitchTarget } from './chrome.jsx'
import { localizedPath } from './routes.js'

/* Kernfunktion des Sprachwählers: er muss auf die Übersetzung derselben
   Seite zielen, nicht auf die Startseite. Vormals nur in einem Klick-Handler
   verankert und deshalb ungetestet — eine Mutation, die immer auf die
   Startseite springt, liess bisher keinen Test anschlagen. */
describe('langSwitchTarget', () => {
  it('zielt auf dieselbe Seite in der Zielsprache', () => {
    expect(langSwitchTarget('/fr/competences/mut/', 'it')).toBe('/it/competenze/mut/')
  })

  it('zielt auf dieselbe Dimensionsseite in der Zielsprache', () => {
    expect(langSwitchTarget('/es/dimensiones/acting/', 'de')).toBe('/dimensionen/acting/')
  })

  /* Rückfallebene: /app/ trägt keine Übersetzung (UNPREFIXED), also landet
     der Wechsel auf der Startseite der Zielsprache statt auf einer
     nichtexistenten Seite. */
  it('fällt für /app/ auf die Startseite der Zielsprache zurück', () => {
    expect(langSwitchTarget('/app/', 'it')).toBe(localizedPath('home', 'it'))
    expect(langSwitchTarget('/app/', 'it')).toBe('/it/')
  })

  /* Rückfallebene: ein unbekannter Pfad trägt ebenfalls keine Übersetzung. */
  it('fällt für einen unbekannten Pfad auf die Startseite der Zielsprache zurück', () => {
    expect(langSwitchTarget('/gibtsnicht/', 'fr')).toBe('/fr/')
  })
})
