/**
 * Sitenweite Konstanten und Ableitungsregeln ohne Sprachabhängigkeit —
 * bewusst in einer eigenen Datei statt in `seo/meta.js`: `meta.js` importiert
 * seit Task 6 alle sechs Sprachbäume (`site/i18n/*`) statisch und ist damit
 * reiner Build-Code. Client-Code (`src/site/pages.jsx`) soll diesen Baum
 * weder anfassen müssen noch sich darauf verlassen müssen, dass Rollups
 * Tree-Shaking ihn bei jeder Änderung zuverlässig wieder herausschüttelt —
 * eine eigene, nachweislich nebenwirkungsfreie Datei macht die Trennung
 * durch die Modulgrenze selbst sichtbar, statt sie dem Bundler zu
 * überlassen.
 *
 * `pageLabel`/`dimensionPageDescription`/`skillPageDescription` sind die
 * einzige Quelle für Titel/Beschreibung einer Inhaltsseite: `content-pages.js`
 * braucht sie beim Build (SEO-`<title>`/`<meta name="description">`),
 * `site/pages.jsx` beim Rendern (`document.title` bei der Hydration, siehe
 * `site/Page.jsx`). Stünden sie an zwei Stellen, liefe eine Änderung am
 * Trennzeichen nur auf einer Seite still auseinander.
 */
export const SITE_NAME = 'Inner Development Guide im Schulalltag'
export const CONTACT_MAIL = 'guide@zukunftskompetenzchallenge.ch'

export function pageLabel(name) {
  return `${name} — ${SITE_NAME}`
}

export function dimensionPageDescription(dim) {
  return `${dim.subtitle}. ${dim.intro.slice(0, 140).trim()}…`
}

export function skillPageDescription(skill, descriptionSuffix) {
  return `${skill.desc} ${descriptionSuffix}`
}
