/**
 * Rekursive Schlüsselpfade einer i18n-Datenstruktur, Arrays als eine Einheit
 * behandelt (ein Array ist ein Blatt, kein Container). Gemeinsam genutzt von
 * `i18n.test.js` (Vollständigkeit der deutschen Datei) und
 * `scripts/check-i18n.mjs` (Schlüsselgleichheit über alle Sprachen) — vorher
 * an beiden Stellen wortgleich dupliziert.
 */
export function keyPaths(value, prefix = '') {
  if (Array.isArray(value) || value === null || typeof value !== 'object') return [prefix]
  return Object.keys(value).flatMap((k) => keyPaths(value[k], prefix ? `${prefix}.${k}` : k))
}
