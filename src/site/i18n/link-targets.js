/**
 * Linkziele aus den i18n-Textdaten: einsammeln und auf Renderbarkeit prüfen.
 *
 * Geteilt wie `key-paths.js`, statt zweimal zu stehen: `scripts/check-i18n.mjs`
 * bricht damit den Build, `i18n.test.js` zeigt damit, dass die Zusicherung
 * beisst.
 *
 * Geprüft wird genau das, was der Inline-Parser in `src/site/pages.jsx` kann:
 *
 *  - `path:key` löst er über `localizedPath(key, lang)` auf. Einen Schlüssel,
 *    den die Segment-Tabelle nicht kennt, beantwortet `localizedPath` still
 *    mit der Startseite — in einem Rechtstext liefe der Pflichtverweis auf die
 *    Datenschutzerklärung damit ins Leere, ohne Warnung.
 *  - Das Ziel liest er als `([^)]+)`. Eine Klammer im Ziel zerlegt den Link in
 *    einen halben `href` und ein verirrtes `)` im Fliesstext.
 *
 * Beides kommt in den heutigen Texten nicht vor. Diese Prüfung hält es so —
 * auch in der deutschen Referenzdatei, die sonst niemand gegenliest.
 */

// Erkennt `[Text](ziel)` — nur das Ziel (Klammerinhalt) ist hier relevant.
const LINK_TARGET_RE = /\[[^\]]*\]\(([^)]+)\)/g

/** Routenschlüssel ohne eigenes Pfadsegment; `localizedPath` kennt sie trotzdem. */
export const SEGMENTLESS_ROUTE_KEYS = ['home', 'app']

export function linkTargets(str) {
  if (typeof str !== 'string') return []
  const out = []
  let m
  LINK_TARGET_RE.lastIndex = 0
  while ((m = LINK_TARGET_RE.exec(str))) out.push(m[1])
  return out
}

/** Alle Linkziele eines verschachtelten Werts samt Fundort, in Fundreihenfolge. */
export function collectLinkTargetsAt(value, at = '') {
  if (typeof value === 'string') return linkTargets(value).map((target) => ({ at, target }))
  if (Array.isArray(value)) return value.flatMap((el, i) => collectLinkTargetsAt(el, `${at}[${i}]`))
  if (value && typeof value === 'object') {
    return Object.keys(value).flatMap((k) => collectLinkTargetsAt(value[k], at ? `${at}.${k}` : k))
  }
  return []
}

/** Nur die Ziele, in Fundreihenfolge — für den Vergleich Übersetzung gegen Deutsch. */
export function collectLinkTargets(value) {
  return collectLinkTargetsAt(value).map((hit) => hit.target)
}

/**
 * Befunde über alle Linkziele eines Sprachdatensatzes. `segments` ist die
 * Segment-Tabelle der betreffenden Sprache (`SEGMENTS[lang]`).
 * Leeres Array heisst: jedes Ziel ist so, wie der Parser es lesen kann.
 */
export function linkTargetFindings(value, segments) {
  const known = [...SEGMENTLESS_ROUTE_KEYS, ...Object.keys(segments || {})].sort()

  return collectLinkTargetsAt(value).flatMap(({ at, target }) => {
    if (target.includes('(')) {
      return [`${at}: '${target}' — Klammer im Ziel; der Parser liest bis zur ersten ')' und zerlegt den Link`]
    }
    if (target.startsWith('path:')) {
      const key = target.slice('path:'.length)
      if (!known.includes(key)) {
        return [`${at}: '${target}' — unbekannter Routenschlüssel; bekannt sind ${known.join(', ')}`]
      }
    }
    return []
  })
}
