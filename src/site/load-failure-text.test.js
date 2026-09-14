import { describe, expect, it } from 'vitest'
import { LOAD_FAILURE_STRIP_TEXT } from './load-failure-text.js'

/* Vor Task 9 war der Hinweisstreifen in page-main.jsx fest Deutsch — auf
   /sv/villkor/ läge dann ein deutscher Streifen über schwedischem Text.
   Jetzt ist er zweisprachig (Deutsch + Englisch) wie die Rückfallebene der
   Startseite (landing/main.jsx). Diese Datei trägt nur den Text, ohne
   DOM-Zugriff, damit er ohne jsdom testbar ist — page-main.jsx selbst lädt
   beim Import sofort `window.location` und ist darum unter Vitest nicht
   importierbar. */
describe('LOAD_FAILURE_STRIP_TEXT', () => {
  it('trägt einen deutschen Satz', () => {
    expect(LOAD_FAILURE_STRIP_TEXT.de).toMatch(/nicht geladen/)
  })

  it('trägt einen eigenständigen englischen Satz, nicht eine Kopie des deutschen', () => {
    expect(LOAD_FAILURE_STRIP_TEXT.en).toMatch(/failed to load|could not/i)
    expect(LOAD_FAILURE_STRIP_TEXT.en).not.toBe(LOAD_FAILURE_STRIP_TEXT.de)
  })

  it('das Reload-Label ist zweisprachig, wie auf der Startseite ("Neu laden · Reload")', () => {
    expect(LOAD_FAILURE_STRIP_TEXT.reload).toBe('Neu laden · Reload')
  })
})
