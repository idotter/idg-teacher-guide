/**
 * Pfadsegmente je Sprache. Bewusst eine eigene, winzige Datei: der Routing-Kern
 * braucht sie im Client, die Volltext-Dateien daneben aber nicht — läge die
 * Tabelle dort, zöge jeder Seitenaufruf alle sechs Textdateien ins Bundle.
 *
 * Slugs sind absichtlich ASCII (competences, formagor): akzentfreie Pfade
 * ersparen Prozent-Kodierung in Links, Sitemap und Analytics.
 */
export const SEGMENTS = {
  de: { project: 'projekt', contact: 'kontakt', privacy: 'datenschutz',
        terms: 'nutzungsbedingungen', dimension: 'dimensionen', skill: 'kompetenzen' },
  en: { project: 'project', contact: 'contact', privacy: 'privacy',
        terms: 'terms', dimension: 'dimensions', skill: 'skills' },
  fr: { project: 'projet', contact: 'contact', privacy: 'confidentialite',
        terms: 'conditions', dimension: 'dimensions', skill: 'competences' },
  es: { project: 'proyecto', contact: 'contacto', privacy: 'privacidad',
        terms: 'condiciones', dimension: 'dimensiones', skill: 'competencias' },
  it: { project: 'progetto', contact: 'contatti', privacy: 'privacy',
        terms: 'condizioni', dimension: 'dimensioni', skill: 'competenze' },
  sv: { project: 'projektet', contact: 'kontakt', privacy: 'integritet',
        terms: 'villkor', dimension: 'dimensioner', skill: 'formagor' },
}

/** Seiten ohne Sprachpräfix und ohne Übersetzung. */
export const UNPREFIXED = new Set(['app'])
