/**
 * Die fünf Ringfarben des Logos (`RingMark` in `chrome.jsx`), von innen nach
 * aussen in der Reihenfolge der Dimensionen — Sein zuinnerst, Handeln
 * zuäusserst, wie im Logo.
 *
 * Eigene, winzige Datei aus demselben Grund wie `src/site/i18n/segments.js`:
 * `chrome.jsx` wird von jeder Seite statisch geladen (Header/Footer), egal in
 * welcher Sprache. Ein statischer Import einer der sechs `src/content/*.js`
 * — wie zuvor `../content/de.js`, nur für diese fünf Werte — zöge den
 * kompletten Kartensatz einer Sprache (29 KB) in jedes Sprachbundle, weil
 * `chrome.jsx` Teil des gemeinsamen, immer geladenen Kerns ist.
 *
 * Die Farben sind sprachneutral und in allen sechs Kartendateien identisch
 * (geprüft in `ring-colors.test.js`); die Kartendaten selbst behalten ihr
 * eigenes `color`-Feld, weil die App (`src/app/`) daran hängt.
 */
export const RING_COLORS = [
  { id: 'being', color: '#D4B88C' },
  { id: 'thinking', color: '#E585A1' },
  { id: 'relating', color: '#EF4136' },
  { id: 'collaborating', color: '#FF7E2A' },
  { id: 'acting', color: '#661A30' },
]
