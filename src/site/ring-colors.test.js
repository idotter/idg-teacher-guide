import { describe, expect, it } from 'vitest'
import { RING_COLORS } from './ring-colors.js'
import de from '../content/de.js'
import en from '../content/en.js'
import fr from '../content/fr.js'
import es from '../content/es.js'
// Italienisch bewusst unter anderem Namen importiert: `it` ist bereits die
// Testfunktion von vitest, ein `import it from '../content/it.js'` würde sie
// überdecken (siehe derselbe Kommentar in i18n.test.js).
import itContent from '../content/it.js'
import sv from '../content/sv.js'

/* RING_COLORS dupliziert bewusst fünf Werte aus den Kartendaten (siehe
   Kommentar dort). Dieser Test schliesst genau die Lücke, die die Dopplung
   aufreisst: driftet eine der sechs Sprachdateien von RING_COLORS auseinander
   — falsche Farbe oder falsche Reihenfolge —, schlägt er an. */
const CONTENTS = { de, en, fr, es, it: itContent, sv }

describe('RING_COLORS', () => {
  for (const [lang, content] of Object.entries(CONTENTS)) {
    it(`stimmt mit den Dimensionsfarben von ${lang} überein`, () => {
      const byId = Object.fromEntries(content.dimensions.map((d) => [d.id, d.color]))
      for (const ring of RING_COLORS) {
        expect(byId[ring.id]).toBe(ring.color)
      }
    })
  }

  it('nennt dieselben IDs in derselben Reihenfolge wie die Kartendaten', () => {
    expect(RING_COLORS.map((r) => r.id)).toEqual(de.dimensions.map((d) => d.id))
  })
})
