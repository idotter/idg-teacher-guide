## Learned User Preferences

- Diese Seite auf Vercel hosten, dort wo bereits `zukunftskompetenzchallenge.ch` liegt — nicht über Hostinger.
- Im sichtbaren Text das Angebot als Inner Development Guide bezeichnen, nicht als Inner Development Goals; der Attribution-Link bleibt `innerdevelopmentgoals.org`.
- Die Landingpage visuell schlank halten: keine Kompetenzzahlen auf den Dimensionsbändern, keine Kartennummern und keine dekorativen Icons, die dem Text Platz nehmen.
- Hero-Copy führt mit dem Ziel («Zukunft gestalten»), die fünf Minuten stehen als zweite Zeile.

## Learned Workspace Facts

- Vite/React-PWA mit zwei Einstiegen: Landing unter `/`, installierbare App unter `/app/`; kein Backend, Persistenz nur in `localStorage`.
- Geplante Produktions-URL: `guide.zukunftskompetenzchallenge.ch`.
- Die Challenge-Hauptseite läuft bereits auf Vercel; die DNS-Zone von `zukunftskompetenzchallenge.ch` liegt bei Metanet.
- Als eigenes Vercel-Projekt deployen, nicht in das bestehende Challenge-Projekt mischen (eigene Rewrites/APIs).
- Der Hero-Stapel startet mit der Karte «Kritisches Denken» (`t1`); die Reihenfolge von `only` in `IdgCards` steuert die Startkarte.
- Eigenes IDG-Designsystem unter `src/ds`, kein daisyUI.
- Verwandtes Challenge-Repo: `/Users/marc/Dev/zukunftskompetenzwebseite/zukunftskompetenzchallenge`.
- Footer-Navigation: Über das Projekt (Das Projekt, Kontakt) und Rechtliches (Datenschutz, Nutzungsbedingungen); keine Roadmap- oder Spenden-Links — die vier Links sind eigene Seiten.
- Inhalt: 23 Kompetenzen in fünf Dimensionen (Sein, Denken, Beziehung, Zusammenarbeit, Handeln); Framework-Texte aus den IDG, Pädagogik eigens; DE mit Lehrplan-21-Anknüpfungen.
