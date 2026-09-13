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
 *
 * `SITE_NAME` bleibt der feste, sprachübergreifende Produktname für JSON-LD
 * (`og:site_name`, `WebApplication.name` u. Ä. in `seo/meta.js`) — das ist
 * eine bewusste Design-Entscheidung aus Task 6. Für sichtbaren Text wie den
 * `<title>` einer Inhaltsseite oder den Noscript-Block der Startseite ist er
 * aber falsch: `pageLabel`/`landingNoscriptHtml` sollen den lokalisierten
 * Markennamen zeigen (`chrome.brand` + `chrome.brandSub` der Route-Sprache),
 * sonst trägt z. B. `/fr/dimensions/being/` einen deutschen Titelanhang neben
 * einem `<title>`, das für `/fr/projet/` korrekt "Inner Development Guide en
 * classe" zeigt (Fix-Runde 1, Punkt 1+3). `siteBrand` baut genau diesen
 * String; für Deutsch ist er wortgleich mit `SITE_NAME` (geprüft in
 * `site-info.test.js`), darum bleibt `pageLabel(name)` ohne zweites Argument
 * unverändert deutsch.
 */
export const SITE_NAME = 'Inner Development Guide im Schulalltag'
export const CONTACT_MAIL = 'guide@zukunftskompetenzchallenge.ch'

/** Lokalisierter Markenname einer Sprache — `chrome.brand` + `chrome.brandSub`
 *  des übergebenen `site`-Objekts (`site/i18n/<lang>.js`). */
export function siteBrand(site) {
  return `${site.chrome.brand} ${site.chrome.brandSub}`
}

export function pageLabel(name, brand = SITE_NAME) {
  return `${name} — ${brand}`
}

export function dimensionPageDescription(dim) {
  return `${dim.subtitle}. ${dim.intro.slice(0, 140).trim()}…`
}

export function skillPageDescription(skill, descriptionSuffix) {
  return `${skill.desc} ${descriptionSuffix}`
}
