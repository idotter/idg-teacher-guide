import { describe, expect, it } from 'vitest'
import { keyPaths } from '../site/i18n/key-paths.js'
import de from './de.js'
import en from './en.js'
import fr from './fr.js'
import es from './es.js'
// Italienisch bewusst unter anderem Namen importiert: `it` ist bereits die
// Testfunktion von vitest, ein `import it from './it.js'` würde sie
// überdecken (wie in site/i18n/i18n.test.js).
import itContent from './it.js'
import sv from './sv.js'

/* Dieselbe Zusicherung läuft in `scripts/check-i18n.mjs` und bricht dort den
   Build (Task 9, Teil C). Hier noch einmal als Vitest-Test — die anderen
   i18n-Zusicherungen (src/site/i18n/i18n.test.js) laufen ebenfalls doppelt,
   aus demselben Grund: ein Test kann zeigen, dass er beisst, ein
   Build-Skript nicht.

   Vor Task 9 gab es für `content/<lang>.js#ui` keinen automatischen
   Schlüsselabgleich über die sechs Sprachen — anders als für site/i18n/*.
   Die vier neuen Tour-Schlüssel (tourStep1Title …, siehe IdgCards.jsx)
   hätten in einer Übersetzung fehlen können, ohne dass ein Test das
   bemerkt hätte. */
describe('content/<lang>.js#ui — Schlüssel über alle sechs Sprachen', () => {
  const ALL = { de, en, fr, es, it: itContent, sv }
  const reference = keyPaths(de.ui).sort()

  for (const [lang, data] of Object.entries(ALL)) {
    it(`${lang} hat dieselben ui-Schlüssel wie Deutsch`, () => {
      expect(keyPaths(data.ui).sort()).toEqual(reference)
    })
  }
})
