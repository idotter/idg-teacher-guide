/**
 * Text für den Hinweisstreifen in `page-main.jsx`, wenn die Sprachmodule
 * nicht geladen werden konnten. Zweisprachig (Deutsch + Englisch) wie die
 * Rückfallebene der Startseite (`landing/main.jsx`) — die Übersetzung selbst
 * ist ja gerade nicht ladbar, deshalb Deutsch und Englisch fest im Bundle
 * statt aus den i18n-Dateien (siehe Kommentar dort).
 *
 * Eigene, DOM-freie Datei statt der Text direkt in `page-main.jsx`: dieser
 * Einstieg lädt beim Import sofort `pagePath()` (`window.location`) und ist
 * darum unter Vitest (Node, kein `window`/`document`) nicht importierbar —
 * der Text allein, ohne die Mount-Seiteneffekte, ist es.
 */
export const LOAD_FAILURE_STRIP_TEXT = {
  de: 'Diese Seite ist gerade nur zum Lesen — Teile konnten nicht geladen werden.',
  en: 'This page is read-only for now — some parts failed to load.',
  reload: 'Neu laden · Reload',
}
