/**
 * Sitenweite Konstanten ohne Sprachabhängigkeit — bewusst in einer eigenen,
 * nebenwirkungsfreien Datei statt in `seo/meta.js`: meta.js importiert seit
 * Task 6 alle sechs Sprachdateien statisch (für `pagesFor`/`jsonLdForPage`)
 * und darf deshalb nie ins Client-Bundle geraten. `src/site/pages.jsx`
 * braucht `CONTACT_MAIL`/`SITE_NAME` aber zur Laufzeit (Kontaktformular,
 * Dokumenttitel der Inhaltsseiten) — ein Import aus `meta.js` zöge dort
 * sämtliche Website-Texte aller Sprachen mit ins Bundle der Unterseiten.
 * `meta.js` und `content-pages.js` reexportieren/importieren von hier.
 */
export const SITE_NAME = 'Inner Development Guide im Schulalltag'
export const CONTACT_MAIL = 'guide@zukunftskompetenzchallenge.ch'
