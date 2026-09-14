import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'
import { loadContentInputs } from './load-content-inputs.mjs'

/* Vorher fing ein leeres `catch { return {} }` in vite.config.js jeden
   Fehler ab: fehlt scripts/content-routes.json oder ist es kaputt, baute
   Vite klaglos nur die sechs handgepflegten Einstiege und meldete Erfolg
   (205 fehlende HTML-Dateien, kein Hinweis). Diese Suite sichert zu, dass
   genau das jetzt laut abbricht (Fix-Runde 1, Punkt 6). Jeder Fall wurde
   einmal durch Rückbau auf das alte `catch { return {} }` absichtlich rot
   gemacht, siehe task-7-report.md. */

function withTempRoot(fn) {
  const dir = mkdtempSync(join(tmpdir(), 'load-content-inputs-'))
  try {
    return fn(dir)
  } finally {
    rmSync(dir, { recursive: true, force: true })
  }
}

describe('loadContentInputs', () => {
  it('baut ein inputKey→Pfad-Objekt aus einer gültigen Routenliste', () => {
    withTempRoot((dir) => {
      writeFileSync(join(dir, 'routes.json'), JSON.stringify([
        { inputKey: 'en', html: 'en/index.html' },
        { inputKey: 'fr-projet', html: 'fr/projet/index.html' },
      ]))
      const result = loadContentInputs(dir, 'routes.json')
      expect(Object.keys(result)).toEqual(['en', 'fr-projet'])
      expect(result.en).toBe(join(dir, 'en/index.html'))
      expect(result['fr-projet']).toBe(join(dir, 'fr/projet/index.html'))
    })
  })

  it('bricht hart ab, wenn die Datei fehlt, statt still {} zurückzugeben', () => {
    withTempRoot((dir) => {
      expect(() => loadContentInputs(dir, 'nope.json')).toThrow(/fehlt/)
    })
  })

  it('bricht hart ab bei kaputtem JSON', () => {
    withTempRoot((dir) => {
      writeFileSync(join(dir, 'routes.json'), '{ dies ist kein JSON')
      expect(() => loadContentInputs(dir, 'routes.json')).toThrow(/JSON/)
    })
  })

  it('bricht hart ab bei einer leeren Routenliste', () => {
    withTempRoot((dir) => {
      writeFileSync(join(dir, 'routes.json'), '[]')
      expect(() => loadContentInputs(dir, 'routes.json')).toThrow(/leer/)
    })
  })

  it('bricht hart ab, wenn die Datei kein Array ist (z. B. ein Objekt)', () => {
    withTempRoot((dir) => {
      writeFileSync(join(dir, 'routes.json'), '{"oops": true}')
      expect(() => loadContentInputs(dir, 'routes.json')).toThrow(/leer|kein Array/)
    })
  })

  it('funktioniert gegen die echte scripts/content-routes.json, sobald generate:content gelaufen ist', () => {
    // Best-effort: existiert die Datei nicht (frischer Checkout ohne
    // vorherigen generate:content-Lauf), überspringt dieser Test sich selbst
    // statt fälschlich rot zu werden — die vier Tests oben decken das
    // Fehlerverhalten bereits ab.
    try {
      const result = loadContentInputs(process.cwd())
      expect(Object.keys(result).length).toBeGreaterThan(0)
    } catch (err) {
      if (!/fehlt/.test(err.message)) throw err
    }
  })
})
