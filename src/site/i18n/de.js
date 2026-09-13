/**
 * Website-Texte auf Deutsch (de-CH). Kartentexte liegen getrennt in src/content/.
 * Weitere Sprache: Datei kopieren, Werte übersetzen, Schlüssel unverändert lassen.
 *
 * Blocktypen in `body`-Listen: `h2`, `h3`, `p`, `ul`, `dimList`, `faq`.
 * `dimList` und `faq` tragen kein `v` — sie ziehen ihre Einträge aus den
 * Kartendaten (dimList) bzw. aus dem `faq`-Feld derselben Seite (faq).
 *
 * Inline-Markup innerhalb von `p`- und `ul`-Werten (bewusst minimal, damit der
 * Fliesstext ein reiner String bleibt):
 *   - `` `code` ``        Inline-Code, z. B. ein localStorage-Schlüssel.
 *   - `[Text](url)`       externer Link mit fixer, sprachunabhängiger URL.
 *   - `[Text](path:key)`  interner Link auf eine andere Unterseite; `key` ist
 *                         ein Routenschlüssel (project/contact/privacy/terms/app),
 *                         die tatsächliche URL kommt pro Sprache aus routes.js.
 *
 * Platzhalter in geschweiften Klammern (z. B. `{n}`, `{mail}`) werden vor der
 * Anzeige durch Kartendaten oder Konstanten ersetzt und bleiben in jeder
 * Übersetzung an derselben Stelle stehen.
 */
export const site = {
  lang: 'de',
  htmlLang: 'de-CH',
  ogLocale: 'de_CH',

  chrome: {
    brand: 'Inner Development Guide',
    brandSub: 'im Schulalltag',
    homeAria: 'Zur Startseite',
    langAria: 'Sprache',
    footerAria: 'Fusszeile',
    footerAbout: 'Über das Projekt',
    footerLegal: 'Rechtliches',
    footerNote: 'Dieses Angebot ist inspiriert vom Inner Development Guide. Mehr unter',
  },

  notFound: {
    title: 'Seite nicht gefunden',
    lead: 'Dieser Pfad führt nirgendwohin.',
    backHome: 'Zur Startseite',
  },

  pages: {
    // home und app haben keine eigene Nav-Beschriftung, Lead oder Body: home
    // ist die Landingpage (eigener Hero-Text unter `landing`), app ist die
    // App-Route selbst. Nur documentTitle/description werden für den
    // <title>/<meta name="description"> der jeweiligen HTML-Datei gebraucht.
    home: {
      documentTitle: 'Inner Development Guide im Schulalltag — Zukunft gestalten in fünf Minuten',
      description: '25 Kompetenzen des Inner Development Guide 2.0 als digitale Reflexionskarten für Lehrpersonen: Fragen für dich und deine Klasse, Ideen für den Unterricht und Anknüpfung an den Lehrplan 21 — ohne Konto, offline nutzbar.',
    },

    app: {
      documentTitle: 'Reflexionskarten — Inner Development Guide im Schulalltag',
      description: '25 Kompetenzen des Inner Development Guide 2.0 als Reflexionskarten für den Unterricht — installierbar, offline, ohne Konto.',
    },

    project: {
      navLabel: 'Das Projekt',
      title: 'Das Projekt',
      documentTitle: 'Das Projekt — Inner Development Guide im Schulalltag',
      description: 'Der Inner Development Guide 2.0 als Reflexionskarten für den Schulalltag: 25 Kompetenzen, fünf Dimensionen, ohne Konto — für Lehrpersonen in der Schweiz.',
      lead: 'Ein digitales Kartenset, das den Inner Development Guide 2.0 in den Unterricht übersetzt — eine Karte, eine Frage, ein Einstieg.',
      body: [
        { t: 'h2', v: 'Worum es geht' },
        { t: 'p', v: 'Der Inner Development Guide 2.0 beschreibt 25 innere Fähigkeiten in fünf Dimensionen: Sein, Denken, Beziehungen, Zusammenarbeit und Handeln. Dieses Angebot macht sie für Lehrpersonen greifbar: als Karten, die sich umdrehen, merken und offline auf dem Gerät behalten lassen.' },
        { t: 'p', v: 'Vorne steht die Kompetenz. Hinten stehen zwei Fragen an dich selbst und zwei, die du unverändert in die Runde geben kannst — plus Ideen für den Unterricht, Anknüpfungspunkte an die Fachbereiche und eine Mini-Übung.' },
        { t: 'h2', v: 'Ohne Store, ohne Konto' },
        { t: 'p', v: 'Die App läuft im Browser und lässt sich auf den Startbildschirm legen. Gemerkte Karten und Einstellungen bleiben im Speicher dieses Geräts. Es gibt keine Anmeldung, und es wird nichts auf einen Server hochgeladen.' },
        { t: 'h2', v: 'Für den Schulalltag geschrieben' },
        { t: 'p', v: 'Die Namen und Beschreibungen der Kompetenzen stammen aus dem Inner Development Guide 2.0 (Version 7.2). Die Reflexionsfragen, Unterrichtsideen und Mini-Übungen sind eigens für diese App formuliert. Im Deutschen knüpfen sie an die Fachbereiche des Lehrplans 21 an.' },
        { t: 'p', v: 'Ausser Deutsch gibt es die Karten auf Englisch, Französisch, Spanisch, Italienisch und Schwedisch.' },
        { t: 'h2', v: 'Die fünf Dimensionen' },
        { t: 'dimList' },
        { t: 'h2', v: 'Häufige Fragen' },
        { t: 'faq' },
        { t: 'h2', v: 'Herkunft' },
        { t: 'p', v: 'Dieses Angebot ist inspiriert vom Inner Development Guide. Es ist kein offizielles Produkt der Herausgeber:innen des Rahmenwerks. Mehr unter [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). Ein verwandtes Angebot ist die [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch).' },
      ],
      faq: [
        {
          q: 'Was ist der Inner Development Guide im Schulalltag?',
          a: 'Ein kostenloses digitales Kartenset für Lehrpersonen: 25 Kompetenzen des Inner Development Guide 2.0 als umdrehbare Reflexionskarten — mit Fragen für dich und deine Klasse, Unterrichtsideen, Anknüpfung an den Lehrplan 21 und einer Mini-Übung.',
        },
        {
          q: 'Kostet das Angebot etwas?',
          a: 'Nein. Die Nutzung ist unentgeltlich. Es gibt keinen Store-Kauf und kein Abonnement.',
        },
        {
          q: 'Brauche ich ein Konto?',
          a: 'Nein. Es gibt keine Anmeldung. Gemerkte Karten und Einstellungen bleiben nur auf deinem Gerät.',
        },
        {
          q: 'Wie hängt das mit dem Lehrplan 21 zusammen?',
          a: 'Die deutschen Karten knüpfen an Fachbereiche des Lehrplans 21 an — etwa Ethik, Religionen, Gemeinschaft oder Natur, Mensch, Gesellschaft. Die Karten ersetzen den Lehrplan nicht; sie geben Impulse für den Unterricht.',
        },
        {
          q: 'Ist das ein offizielles Produkt des Rahmenwerks?',
          a: 'Nein. Dieses Angebot ist inspiriert vom Inner Development Guide. Namen und Beschreibungen der Kompetenzen stammen aus dem Inner Development Guide 2.0 (Version 7.2). Fragen, Unterrichtsideen und Mini-Übungen sind eigens für diese Website geschrieben.',
        },
        {
          q: 'Wie nutze ich eine Karte in fünf Minuten?',
          a: 'Eine Karte öffnen, eine Frage an dich selbst oder an die Klasse wählen, kurz ins Gespräch gehen. Wenn die Karte trägt, stehen dahinter Ideen, Anknüpfungspunkte und eine Mini-Übung.',
        },
      ],
    },

    contact: {
      navLabel: 'Kontakt',
      title: 'Kontakt',
      documentTitle: 'Kontakt — Inner Development Guide im Schulalltag',
      description: 'Frage, Hinweis oder Rückmeldung zum Inner Development Guide im Schulalltag — per E-Mail an guide@zukunftskompetenzchallenge.ch.',
      lead: 'Eine Frage zum Kartenset, ein Hinweis aus dem Unterricht oder der Wunsch, das Angebot im Kollegium zu teilen — schreib uns.',
      body: [
        { t: 'p', v: 'Die Nachricht öffnet dein Mailprogramm und geht an [{mail}](mailto:{mail}). Es gibt kein Formular-Konto und keinen Versand über unsere Server.' },
      ],
      form: {
        name: 'Name',
        email: 'E-Mail',
        message: 'Nachricht',
        submit: 'Nachricht senden',
        subject: 'Nachricht von',
        subjectFallback: 'der Website',
      },
    },

    privacy: {
      navLabel: 'Datenschutz',
      title: 'Datenschutz',
      documentTitle: 'Datenschutz — Inner Development Guide im Schulalltag',
      description: 'Wie der Inner Development Guide im Schulalltag Daten bearbeitet: lokal auf dem Gerät, ohne Konto, ohne Upload.',
      lead: 'Dieses Angebot kommt ohne Benutzerkonto aus. Was du merkst, bleibt auf deinem Gerät.',
      body: [
        { t: 'p', v: 'Stand: 13. September 2026' },
        { t: 'h2', v: 'Verantwortliche Stelle' },
        { t: 'p', v: 'Verantwortlich für die Datenbearbeitung auf dieser Website ist die herausgebende Person dieses Angebots. Erreichbar über die Seite [Kontakt](path:contact).' },
        { t: 'h2', v: 'Was diese Website nicht tut' },
        { t: 'p', v: 'Es gibt keine Registrierung, keine Analyse- oder Werbecookies und keinen Upload von Merklisten oder Einstellungen. Die App und die Landingpage speichern nichts auf unseren Servern.' },
        { t: 'h2', v: 'Daten auf deinem Gerät' },
        { t: 'p', v: 'Im Speicher des Browsers (`localStorage`) können liegen:' },
        { t: 'ul', v: [
          'gemerkte Karten',
          'Einstellungen wie Sprache oder Reihenfolge',
          'ob die kurze Einführung schon gesehen wurde',
        ] },
        { t: 'p', v: 'Die App nutzt den Schlüsselpräfix `idg-cards-`, der Stapel auf der Startseite `idg-demo-`. Ausprobieren auf der Startseite überschreibt deshalb keine Merkliste in der App. Du kannst diese Einträge jederzeit über die App («Merkliste leeren») oder indem du die Website-Daten im Browser löschst entfernen.' },
        { t: 'h2', v: 'Offline-Betrieb' },
        { t: 'p', v: 'Die App unter [/app/](/app/) kann einen Service Worker registrieren, damit Karten auch ohne Netz im Schulzimmer verfügbar sind. Dabei werden Programmdateien und Bilder in einem Cache dieses Browsers abgelegt — nicht auf einem Server unter unserem Namen.' },
        { t: 'h2', v: 'Teilen' },
        { t: 'p', v: 'Wenn du eine Karte teilst, nutzt das Gerät die Systemfunktion «Teilen» oder kopiert den Kartentext samt Link in die Zwischenablage. Wo das Gerät es unterstützt, wird auch ein Bild der Kartenfront mitgeschickt. Der Link öffnet genau diese Karte in der App. Wir empfangen weder Text noch Bild und erfahren nicht, an wen du sie sendest.' },
        { t: 'h2', v: 'Kontaktaufnahme' },
        { t: 'p', v: 'Das Formular auf der Kontaktseite öffnet dein eigenes Mailprogramm. Erst wenn du die Nachricht absendest, erhält die herausgebende Person Name, E-Mail und Text — über den Weg, den dein Mailanbieter vorsieht.' },
        { t: 'h2', v: 'Hosting und Serverprotokolle' },
        { t: 'p', v: 'Die Website wird über einen Webhost ausgeliefert. Der Host kann technische Protokolle (etwa Zeitpunkt, aufgerufene Adresse, gekürzte IP, Browserkennung) bearbeiten, soweit das für Betrieb, Sicherheit und Fehlerbehebung nötig ist. Dazu gelten die Angaben des jeweiligen Hosts.' },
        { t: 'h2', v: 'Externe Links' },
        { t: 'p', v: 'Links etwa auf [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org) führen zu Angeboten Dritter. Für deren Datenbearbeitung sind die jeweiligen Betreiber verantwortlich.' },
        { t: 'h2', v: 'Deine Rechte' },
        { t: 'p', v: 'Soweit das Schweizer Datenschutzgesetz greift, kannst du Auskunft, Berichtigung oder Löschung verlangen und eine Meldung an den Eidgenössischen Datenschutz- und Öffentlichkeitsbeauftragten (EDÖB) richten. Weil Merkliste und Einstellungen nur auf deinem Gerät liegen, löschst du sie am schnellsten selbst. Für alles, was uns per E-Mail erreicht, gilt die Kontaktseite.' },
      ],
      // kein precedenceNote im Deutschen — das bekommen nur die Übersetzungen.
    },

    terms: {
      navLabel: 'Nutzungsbedingungen',
      title: 'Nutzungsbedingungen',
      documentTitle: 'Nutzungsbedingungen — Inner Development Guide im Schulalltag',
      description: 'Bedingungen für die Nutzung der Reflexionskarten Inner Development Guide im Schulalltag.',
      lead: 'Das Kartenset ist für den Unterricht gedacht. Die Verantwortung für den Einsatz bleibt bei dir.',
      body: [
        { t: 'p', v: 'Stand: 13. September 2026' },
        { t: 'h2', v: 'Angebot' },
        { t: 'p', v: '«Inner Development Guide im Schulalltag» stellt Reflexionskarten zum Inner Development Guide 2.0 bereit: 25 Kompetenzen, Fragen für Lehrperson und Klasse, Ideen für den Unterricht und Mini-Übungen. Die Nutzung ist unentgeltlich.' },
        { t: 'h2', v: 'Wer nutzen darf' },
        { t: 'p', v: 'Lehrpersonen, Schulleitungen, Teams und alle, die das Kartenset in Bildung und Weiterbildung einsetzen wollen. Der Einsatz im Klassenzimmer, in der Vorbereitung und in der Aus- und Weiterbildung ist gestattet.' },
        { t: 'h2', v: 'Kein offizielles Rahmenwerk-Produkt' },
        { t: 'p', v: 'Dieses Angebot ist inspiriert vom Inner Development Guide. Es wird nicht von den Herausgeber:innen des Rahmenwerks herausgegeben und spricht nicht in deren Namen. Namen und Beschreibungen der Kompetenzen stammen aus dem Inner Development Guide 2.0 (Version 7.2). Fragen, Unterrichtsideen, Anknüpfungspunkte und Mini-Übungen stammen von diesem Angebot.' },
        { t: 'h2', v: 'Inhalte und Haftung' },
        { t: 'p', v: 'Die Karten sind Impulse, kein Lehrplan und keine Beratung. Ob eine Frage oder Übung in deine Klasse passt, entscheidest du. Wir übernehmen keine Gewähr für Vollständigkeit, Aktualität oder Eignung in einem bestimmten Unterricht und haften nicht für Entscheidungen, die auf diesem Angebot beruhen — soweit das Gesetz das zulässt.' },
        { t: 'h2', v: 'Daten auf dem Gerät' },
        { t: 'p', v: 'Gemerkte Karten und Einstellungen liegen im Browser dieses Geräts. Wer das Gerät teilt, teilt auch diese Einträge. Mehr dazu in der [Datenschutzerklärung](path:privacy).' },
        { t: 'h2', v: 'Weitergabe' },
        { t: 'p', v: 'Den Link auf die Website und die App darfst du weitergeben. Das Angebot selbst darfst du nicht als eigenes Produkt verkaufen oder so umbenennen, dass der Eindruck entsteht, es sei das offizielle Rahmenwerk.' },
        { t: 'h2', v: 'Änderungen' },
        { t: 'p', v: 'Inhalte, Funktionen und diese Bedingungen können sich ändern. Es besteht kein Anspruch darauf, dass das Angebot unverändert oder dauerhaft erreichbar bleibt.' },
        { t: 'h2', v: 'Kontakt' },
        { t: 'p', v: 'Fragen zu diesen Bedingungen: [Kontakt](path:contact).' },
      ],
      // kein precedenceNote im Deutschen — das bekommen nur die Übersetzungen.
    },
  },

  landing: {
    heroTitle: 'Zukunft gestalten.',
    heroTitleEm: 'In fünf Minuten.',
    heroLead: 'Der Inner Development Guide 2.0 beschreibt {n} Fähigkeiten, die wir brauchen, um Wandel zu gestalten. Dieses digitale Kartenset übersetzt sie in den Schulalltag.',
    cta: 'App öffnen',
    deckAria: 'Kartenstapel zum Ausprobieren',

    anatomy: {
      title: 'Was auf einer Karte steht',
      em: 'am Beispiel «{skillName}»',
      lead: 'Eine Karte, zwei Seiten. Vorne die Kompetenz, hinten die Fragen — und dahinter das Material für die Lektion.',
      front: 'Vorderseite',
      back: 'Rückseite',
      // n 1–2: Vorderseite (title ist Website-Text). n 3–5: Rückseite — die
      // Titel stammen dort aus den Kartendaten (ui.forMe/forStudents/ideas),
      // deshalb kein `title`-Feld; nur `desc` ist Website-Text.
      keys: [
        { n: 1, title: 'Dimension', desc: 'Zu welcher der fünf Dimensionen die Kompetenz gehört — die Farbe der Karte sagt es schon von weitem.' },
        { n: 2, title: 'Kompetenz', desc: 'Name und Beschreibung, wörtlich aus dem Framework übernommen.' },
        { n: 3, desc: 'Zwei Fragen an dich selbst — für die Vorbereitung, den Heimweg oder das Gespräch im Team.' },
        { n: 4, desc: 'Zwei Fragen, die du unverändert in die Runde geben kannst. Auf die Altersstufe hin formuliert.' },
        { n: 5, desc: '{sheetSub} — beim Beispiel etwa die Mini-Übung «{exerciseTitle}».' },
      ],
    },

    dims: {
      title: 'Fünf Dimensionen',
      em: '{n} Kompetenzen',
    },

    use: {
      title: 'Im Schulalltag',
      em: 'ohne Vorbereitung',
      cols: [
        { title: 'Eine Karte, fünf Minuten', desc: 'Für den Einstieg in eine Lektion, die Klassenstunde oder die eigene Vorbereitung am Morgen. Kein Programm, kein Ablaufplan — eine Frage genügt.' },
        { title: 'Für dich und für die Klasse', desc: 'Jede Karte trägt beides: zwei Fragen an dich selbst und zwei, die du unverändert in die Runde geben kannst.' },
        { title: 'Vom Impuls zur Lektion', desc: 'Wenn eine Karte trägt, steht dahinter mehr: Unterrichtsideen, Anknüpfungspunkte an die Fachbereiche und eine Mini-Übung.' },
      ],
    },

    install: {
      title: 'Auf dem Gerät',
      em: 'ohne Store, ohne Konto',
      heading: 'Zum Startbildschirm hinzufügen',
      body: 'In Safari über „Teilen“ und „Zum Home-Bildschirm“, in Chrome über das Menü und „App installieren“. Danach läuft alles offline. Gemerkte Karten bleiben auf dem Gerät und werden nirgends hochgeladen.',
    },
  },

  contentPages: {
    skillDescriptionSuffix: 'Reflexionskarten-Einstieg für Lehrpersonen im Inner Development Guide 2.0.',
    crumbHome: 'Startseite',
  },
}

export default site
