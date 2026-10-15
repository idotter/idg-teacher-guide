// Inhalte der Instagram-Karussells. Bilder erzeugen: node scripts/generate-instagram.mjs
// Farben: Dimensions-ID (being, thinking, relating, collaborating, acting) oder Hex-Wert.

const GUIDE = 'guide.zukunftskompetenzchallenge.ch'
const CHALLENGE = 'zukunftskompetenzchallenge.ch'

export const posts = [
  {
    id: '1-ki-kann-vieles',
    slides: [
      { type: 'cover', color: 'relating', kicker: 'Zukunftskompetenzen', title: 'KI kann vieles. Das hier nicht.', sub: 'Fünf innere Fähigkeiten, die Kinder in einer Welt mit KI brauchen.' },
      { type: 'text', color: 'relating', title: 'KI schreibt einen Aufsatz in **Sekunden.**', body: ['Wissen abzurufen und Texte zu produzieren wird billig.', 'Wertvoll wird, was keine Maschine für uns übernehmen kann.'] },
      { type: 'list', title: 'Was bleibt menschlich?', items: [
        { color: 'being', label: 'Sein', text: 'Bei sich bleiben, wenn der Bildschirm ständig etwas will.' },
        { color: 'thinking', label: 'Denken', text: 'Eine Antwort prüfen, statt sie zu übernehmen.' },
        { color: 'relating', label: 'Beziehungen', text: 'Zuhören, mitfühlen, verzeihen.' },
        { color: 'collaborating', label: 'Zusammenarbeit', text: 'Gemeinsam eine Lösung finden, die für alle trägt.' },
        { color: 'acting', label: 'Handeln', text: 'Mut haben, etwas anzupacken – auch ohne Garantie.' },
      ] },
      { type: 'dims', title: '25 Kompetenzen in fünf Dimensionen' },
      { type: 'text', color: 'thinking', kicker: 'Für deinen Unterricht', title: 'Fünf Minuten. **Ohne Vorbereitung.**', body: ['25 Karten mit Fragen für dich, Fragen für deine Klasse und einer Mini-Übung.', 'Mit Anknüpfungspunkten an den Lehrplan 21.'] },
      { type: 'cta', title: 'Kostenlos, ohne Konto, auch offline.', body: ['Als App auf dem Handy oder als Kartenset zum Ausdrucken. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '2-praesenz',
    slides: [
      { type: 'cover', color: 'being', glyph: 'praesenz', kicker: 'Karte der Woche', title: 'Präsenz', sub: 'Wann warst du heute wirklich da?' },
      { type: 'card', skill: 'praesenz', caption: 'Dimension Sein · Unser inneres Leben kultivieren' },
      { type: 'questions', skill: 'praesenz', kicker: 'Für mich', questions: [
        'Wie oft bin ich während der Lektion mit den Gedanken schon bei der nächsten?',
        'Wann habe ich heute wirklich zugehört – ohne die Antwort schon zu kennen?',
      ] },
      { type: 'questions', skill: 'praesenz', kicker: 'Für meine Klasse', questions: [
        'Wann warst du zuletzt so vertieft, dass du die Zeit vergessen hast?',
        'Was hörst du gerade, wenn du eine Minute ganz still bist?',
      ] },
      { type: 'exercise', skill: 'praesenz' },
      { type: 'text', color: 'being', kicker: 'Im Unterricht', title: 'Die **Stille Minute** als Ritual.', body: ['Nach jeder Pause eine Minute, in der die ganze Klasse still ist und nur hört.', 'Passt zu Musik, Bewegung und Sport, Bildnerischem Gestalten und NMG.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Speichere den Beitrag für deine nächste Lektion. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '3-kritisches-denken',
    slides: [
      { type: 'cover', color: 'thinking', glyph: 'kritisches-denken', kicker: 'Karte der Woche', title: 'Woher weisst du, dass das stimmt?', sub: 'Kritisches Denken in Zeiten von KI' },
      { type: 'text', color: 'thinking', title: 'Ein KI-Chatbot klingt **immer sicher.**', body: ['Auch dann, wenn er falsch liegt.', 'Kinder brauchen darum eine Haltung: **erst prüfen, dann glauben.**'] },
      { type: 'card', skill: 'kritisches-denken', caption: 'Dimension Denken · Unsere komplexe Welt verstehen' },
      { type: 'questions', skill: 'kritisches-denken', kicker: 'Für meine Klasse', questions: [
        'Woher weisst du, dass das stimmt?',
        'Wer hat ein Interesse daran, dass du das glaubst?',
      ] },
      { type: 'exercise', skill: 'kritisches-denken' },
      { type: 'text', color: 'thinking', kicker: 'Tipp', title: 'Nimm eine KI-Antwort als **Behauptung.**', body: ['Die Klasse prüft sie mit den drei Fragen. Wo stimmt sie, wo nicht, was fehlt?', 'Passt zu Medien und Informatik, Deutsch, RZG und Natur und Technik.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Teile den Beitrag mit deinem Kollegium. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '4-lehrplan-21',
    slides: [
      { type: 'cover', color: 'collaborating', kicker: 'Lehrplan 21', title: 'Kein neuer Lehrplan nötig.', sub: 'Innere Fähigkeiten stehen schon drin. Sie heissen nur anders.' },
      { type: 'list', kicker: 'Überfachliche Kompetenzen', title: 'Das verlangt der Lehrplan 21', items: [
        { color: 'being', label: 'Personale Kompetenzen', text: 'Selbstreflexion, Selbstständigkeit, Eigenständigkeit' },
        { color: 'relating', label: 'Soziale Kompetenzen', text: 'Dialog- und Kooperationsfähigkeit, Konfliktfähigkeit, Umgang mit Vielfalt' },
        { color: 'thinking', label: 'Methodische Kompetenzen', text: 'Informationen nutzen, Aufgaben und Probleme lösen' },
      ] },
      { type: 'list', kicker: 'Und dazu', title: 'Querschnitt und Module', items: [
        { color: 'acting', label: 'Bildung für Nachhaltige Entwicklung', text: 'Zusammenhänge verstehen, Zukunft mitgestalten' },
        { color: 'thinking', label: 'Medien und Informatik', text: 'Medien verstehen und verantwortungsvoll nutzen' },
        { color: 'collaborating', label: 'Ethik, Religionen, Gemeinschaft', text: 'Werte klären, Zusammenleben gestalten' },
      ] },
      { type: 'text', color: 'collaborating', title: 'Der Lehrplan sagt **was.** Die Karten zeigen **wie.**', body: ['Jede der 25 Karten nennt Anknüpfungspunkte an die Fachbereiche – von NMG bis Bewegung und Sport.', 'Integrieren statt addieren.'] },
      { type: 'card', skill: 'gemeinsam-gestalten', caption: 'Vorne die Kompetenz. Hinten Fragen, Ideen und eine Mini-Übung.' },
      { type: 'cta', title: 'Zukunft gestalten. In fünf Minuten.', body: ['Kostenlos und ohne Konto. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '5-challenge',
    slides: [
      { type: 'cover', color: 'acting', kicker: 'Zukunftskompetenz-Challenge', title: 'Sechs Wochen. Eine Mail pro Woche.', sub: 'Der kostenlose Kurs für Lehrpersonen der Volksschule.' },
      { type: 'list', title: 'Dein Weg in sechs Wochen', items: [
        { color: '#000', label: 'Woche 1 · Zukunftskompetenzen', text: 'BNE, Lehrplan 21 und der Inner Development Guide' },
        { color: 'being', label: 'Woche 2 · Sein' },
        { color: 'thinking', label: 'Woche 3 · Denken' },
        { color: 'relating', label: 'Woche 4 · Beziehungen' },
        { color: 'collaborating', label: 'Woche 5 · Zusammenarbeit' },
        { color: 'acting', label: 'Woche 6 · Handeln' },
      ] },
      { type: 'text', color: 'acting', title: 'Rund **60 Minuten** pro Woche.', body: ['Impulse lesen, kleine Übungen ausprobieren, im eigenen Unterricht anwenden.', 'Auf Wunsch mit Teilnahmebestätigung für dein Weiterbildungsportfolio.'] },
      { type: 'text', color: 'thinking', title: 'Und danach? Der Guide **begleitet dich weiter.**', body: ['25 Karten für jeden Schultag – als App auf dem Handy oder zum Ausdrucken.'] },
      { type: 'cta', title: 'Jetzt kostenlos anmelden.', body: ['Jederzeit abbestellbar. Link in der Bio.'], links: [CHALLENGE, GUIDE] },
    ],
  },
  {
    id: '6-resilienz',
    slides: [
      { type: 'cover', color: 'acting', glyph: 'resilienz', kicker: 'Karte der Woche', title: 'Ich kann das noch nicht.', sub: 'Resilienz: ein kleines Wort mit grosser Wirkung' },
      { type: 'card', skill: 'resilienz', caption: 'Dimension Handeln · Veränderungen einleiten und ermöglichen' },
      { type: 'exercise', skill: 'resilienz' },
      { type: 'questions', skill: 'resilienz', kicker: 'Für meine Klasse', questions: [
        'Was kannst du heute, das du früher nicht konntest? Wie hast du es gelernt?',
        'Was machst du, wenn etwas zum dritten Mal nicht klappt – weitermachen oder anders versuchen?',
      ] },
      { type: 'questions', skill: 'resilienz', kicker: 'Für mich', questions: [
        'Welches Kind gebe ich innerlich schon ein wenig auf – und was würde es brauchen, dranzubleiben?',
      ] },
      { type: 'text', color: 'acting', kicker: 'Im Unterricht', title: 'Lernfortschritt **sichtbar** machen.', body: ['Arbeiten von September und Juni nebeneinanderlegen.', 'Passt zu Mathematik, Musik, Bewegung und Sport sowie Natur und Technik.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Speichere den Beitrag für deine nächste Lektion. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '7-empathie',
    slides: [
      { type: 'cover', color: 'relating', glyph: 'empathie-und-mitgefuehl', kicker: 'Karte der Woche', title: 'Was steckt dahinter?', sub: 'Empathie und Mitgefühl im Schulalltag' },
      { type: 'questions', skill: 'empathie-und-mitgefuehl', kicker: 'Für mich', questions: [
        'Welches Verhalten in meiner Klasse nervt mich – und welches Bedürfnis könnte dahinterstecken?',
        'Wie gehe ich mit mir selbst um, wenn eine Lektion misslingt?',
      ] },
      { type: 'card', skill: 'empathie-und-mitgefuehl', caption: 'Dimension Beziehungen · Fürsorge für andere und die Welt' },
      { type: 'questions', skill: 'empathie-und-mitgefuehl', kicker: 'Für meine Klasse', questions: [
        'Woran merkst du, dass es jemandem nicht gut geht?',
        'Was tut dir gut, wenn du traurig bist – und könnte das auch anderen helfen?',
      ] },
      { type: 'exercise', skill: 'empathie-und-mitgefuehl' },
      { type: 'text', color: 'relating', kicker: 'Im Unterricht', title: 'Mehr Wörter für **Gefühle.**', body: ['Bilder oder Szenen beschreiben und differenzierte Gefühlswörter sammeln.', 'In Konflikten schreiben beide Seiten auf, was die andere wohl gefühlt hat.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Teile den Beitrag mit deinem Kollegium. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '8-systemisches-denken',
    slides: [
      { type: 'cover', color: 'thinking', glyph: 'systemisches-denken', kicker: 'Karte der Woche', title: 'Und dann?', sub: 'Systemisches Denken mit einer einzigen Frage' },
      { type: 'text', color: 'thinking', title: 'Nichts passiert **für sich allein.**', body: ['Klassenlärm, Plastik, Streit in der Pause: Hinter vielen Problemen stecken viele Ursachen.', 'Systemisches Denken heisst, Zusammenhänge zu sehen und den Hebel zu finden.'] },
      { type: 'card', skill: 'systemisches-denken', caption: 'Dimension Denken · Unsere komplexe Welt verstehen' },
      { type: 'exercise', skill: 'systemisches-denken' },
      { type: 'questions', skill: 'systemisches-denken', kicker: 'Für meine Klasse', questions: [
        'Was passiert alles, wenn eine Sache passiert?',
        'Welches Muster erkennst du hier – und wo hast du es schon einmal gesehen?',
      ] },
      { type: 'text', color: 'thinking', kicker: 'Im Unterricht', title: '**Wirkungsnetz** statt Zusammenfassung.', body: ['Ein Thema in die Mitte, Ursachen und Folgen als Pfeile.', 'Zusammenhänge zeichnen, nicht auflisten.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Speichere den Beitrag für deine nächste Lektion. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '9-wertschaetzung',
    slides: [
      { type: 'cover', color: 'relating', glyph: 'wertschaetzung', kicker: 'Karte der Woche', title: 'Drei gute Dinge', sub: 'Wertschätzung als tägliches Ritual' },
      { type: 'questions', skill: 'wertschaetzung', kicker: 'Für mich', questions: [
        'Wem in meiner Klasse habe ich diese Woche noch nichts Anerkennendes gesagt?',
        'Wofür bin ich in meinem Beruf dankbar – auch an schwierigen Tagen?',
      ] },
      { type: 'card', skill: 'wertschaetzung', caption: 'Dimension Beziehungen · Fürsorge für andere und die Welt' },
      { type: 'exercise', skill: 'wertschaetzung' },
      { type: 'questions', skill: 'wertschaetzung', kicker: 'Für meine Klasse', questions: [
        'Wer hat dir heute geholfen, ohne dass es auffiel?',
        'Was nimmst du als selbstverständlich, das eigentlich besonders ist?',
      ] },
      { type: 'text', color: 'relating', kicker: 'Im Unterricht', title: 'Die **warme Dusche.**', body: ['Eine Person sitzt in der Mitte, alle nennen etwas, das sie an ihr schätzen.', 'Oder eine Dankbarkeitswand im Klassenzimmer, jede Woche ergänzt.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Markiere eine Kollegin oder einen Kollegen, die oder den du schätzt.'], links: [GUIDE] },
    ],
  },
  {
    id: '10-mut',
    slides: [
      { type: 'cover', color: 'acting', glyph: 'mut', kicker: 'Karte der Woche', title: 'Kleiner Mut', sub: 'Keine Heldentaten. Kleine mutige Momente.' },
      { type: 'questions', skill: 'mut', kicker: 'Für mich', questions: [
        'Was würde ich in meinem Unterricht ändern, wenn ich keine Angst vor Kritik hätte?',
        'Wann habe ich zuletzt im Kollegium widersprochen?',
      ] },
      { type: 'card', skill: 'mut', caption: 'Dimension Handeln · Veränderungen einleiten und ermöglichen' },
      { type: 'questions', skill: 'mut', kicker: 'Für meine Klasse', questions: [
        'Wann hast du dich getraut, etwas zu sagen, obwohl es schwierig war?',
        'Was ist der Unterschied zwischen mutig und leichtsinnig?',
      ] },
      { type: 'exercise', skill: 'mut' },
      { type: 'text', color: 'acting', kicker: 'Im Unterricht', title: 'Zivilcourage **üben.**', body: ['Im Rollenspiel: Was sage ich, wenn jemand ausgelacht wird?', 'Passt zu ERG, Deutsch, Theater sowie Bewegung und Sport.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Speichere den Beitrag für deine nächste Lektion. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '11-wochenplan',
    slides: [
      { type: 'cover', color: 'collaborating', kicker: 'Wochenplan', title: 'Fünf Tage, fünf Minuten.', sub: 'Eine Mini-Übung pro Dimension, ohne Vorbereitung.' },
      { type: 'list', title: 'Deine Woche', items: [
        { color: 'being', label: 'Montag · Innenwetter', text: 'Drei Atemzüge, dann das eigene Wetter in einem Wort.' },
        { color: 'thinking', label: 'Dienstag · Drei Fragen an eine Behauptung', text: 'Woher stammt sie? Was spricht dagegen? Was müssten wir wissen?' },
        { color: 'relating', label: 'Mittwoch · Drei gute Dinge', text: 'Aufschreiben, was heute gut war, und eines davon teilen.' },
        { color: 'collaborating', label: 'Donnerstag · Spiegeln', text: 'Zuhören und zusammenfassen: «Ich habe verstanden, dass …»' },
        { color: 'acting', label: 'Freitag · Trotzdem', text: 'Auf eine Sorge mit einem Satz antworten, der mit «Trotzdem …» beginnt.' },
      ] },
      { type: 'text', color: 'collaborating', title: 'Mehr als Stift und Papier **braucht es nicht.**', body: ['Jede Übung dauert rund fünf Minuten und passt an den Anfang einer Lektion oder Klassenstunde.', 'Nach ein paar Wochen werden daraus Rituale.'] },
      { type: 'cta', title: 'Speichere dir den Wochenplan.', body: ['Alle 25 Mini-Übungen findest du im Guide. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '12-zuerst-fuer-dich',
    slides: [
      { type: 'cover', color: 'being', kicker: 'Für Lehrpersonen', title: 'Zuerst für dich.', sub: 'Jede Karte beginnt mit zwei Fragen an dich, nicht an die Klasse.' },
      { type: 'text', color: 'being', title: 'Haltung ist **ansteckend.**', body: ['Wie du mit Stress, Fehlern und Unsicherheit umgehst, lernt deine Klasse mit.', 'Darum richten sich auf jeder Karte zwei Fragen an dich selbst.'] },
      { type: 'list', title: 'Für den Heimweg', items: [
        { color: 'being', label: 'Innerer Kompass', text: 'Wofür bin ich Lehrperson geworden? Wie viel davon war diese Woche spürbar?' },
        { color: 'thinking', label: 'Perspektivische Fähigkeiten', text: 'Wie sieht meine Lektion aus der Perspektive des stillsten Kindes aus?' },
        { color: 'relating', label: 'Demut und Bescheidenheit', text: 'Wie viel spreche ich in einer Lektion, wie viel die Klasse?' },
        { color: 'collaborating', label: 'Kommunizieren', text: 'Wie viele meiner Fragen im Unterricht sind echte Fragen, auf die ich die Antwort nicht kenne?' },
        { color: 'acting', label: 'Hoffnung und Optimismus', text: 'Was gibt mir Hoffnung in meinem Beruf?' },
      ] },
      { type: 'text', color: 'being', title: 'Eine Frage **reicht.**', body: ['Für den Morgen, den Heimweg oder das Gespräch im Team.', 'Du musst sie niemandem beantworten, nur dir selbst.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Für dich und deine Klasse. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '13-so-funktioniert-es',
    slides: [
      { type: 'cover', color: 'thinking', kicker: 'Kurz erklärt', title: 'So nutzt du den Guide.', sub: '25 Karten, eine App, kein Konto.' },
      { type: 'card', skill: 'innerer-kompass', caption: 'Vorne: die Kompetenz und was sie bedeutet.' },
      { type: 'list', title: 'Hinten auf jeder Karte', items: [
        { color: 'being', label: 'Für mich', text: 'Zwei Fragen an dich als Lehrperson' },
        { color: 'thinking', label: 'Für meine Klasse', text: 'Zwei Fragen für das Gespräch mit der Klasse' },
        { color: 'relating', label: 'Im Unterricht', text: 'Ideen und Anknüpfungspunkte an die Fachbereiche' },
        { color: 'collaborating', label: 'Mini-Übung', text: 'Fünf Minuten, ohne Vorbereitung' },
      ] },
      { type: 'list', title: 'Praktisch im Alltag', items: [
        { color: 'being', label: 'Karte des Tages', text: 'Jeden Tag eine neue Karte als Impuls' },
        { color: 'thinking', label: 'Merkliste', text: 'Karten speichern, die dich begleiten sollen' },
        { color: 'relating', label: 'Offline', text: 'Funktioniert auch ohne Internet' },
        { color: 'collaborating', label: 'Teilen', text: 'Eine Karte direkt ans Kollegium schicken' },
        { color: 'acting', label: 'Sechs Sprachen', text: 'Für Klassen mit vielen Sprachen' },
      ] },
      { type: 'text', color: 'thinking', title: 'Auf den **Home-Bildschirm.**', body: ['Im Browser öffnen und «Zum Home-Bildschirm» wählen. Schon ist der Guide eine App.', 'Ohne Anmeldung und ohne Konto.'] },
      { type: 'cta', title: 'Probier es aus.', body: ['Kostenlos. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '14-sitzungsimpuls',
    slides: [
      { type: 'cover', color: 'collaborating', kicker: 'Sitzungsimpuls', title: '20 Minuten fürs Kollegium.', sub: 'Eine Karte. Kein Vorwissen nötig.' },
      { type: 'list', title: 'Die ersten 10 Minuten', items: [
        { color: 'being', label: '2 Min. · Ankommen', text: 'Karte zeigen und die Beschreibung vorlesen.' },
        { color: 'thinking', label: '3 Min. · Mini-Übung', text: 'Alle machen sie so, wie später die Klasse.' },
        { color: 'relating', label: '5 Min. · Stille Reflexion', text: 'Die zwei Fragen für die Lehrperson, still notieren.' },
      ] },
      { type: 'list', title: 'Die zweiten 10 Minuten', items: [
        { color: 'collaborating', label: '6 Min. · Zu zweit', text: 'Drei Minuten erzählen, drei Minuten nur zuhören. Dann wechseln.' },
        { color: 'acting', label: '3 Min. · Plenum', text: '«Was nehme ich mit?» Nur sammeln, nicht diskutieren.' },
        { color: '#000', label: '1 Min. · Transfer', text: 'Wer will, probiert die Übung diese Woche in der Klasse.' },
      ] },
      { type: 'text', color: 'collaborating', kicker: 'Tipp', title: 'Mit der Karte **Präsenz** starten.', body: ['Die Übung «Fünf Sinne» funktioniert in jeder Gruppe.', 'Niemand muss etwas Persönliches erzählen.'] },
      { type: 'cta', title: 'Teile den Beitrag mit deiner Schulleitung.', body: ['Alle 25 Karten kostenlos. Link in der Bio.'], links: [GUIDE] },
    ],
  },
  {
    id: '15-ki-generation',
    slides: [
      { type: 'cover', color: 'thinking', kicker: 'Für deine Klasse', title: 'Fünf Fragen, die keine KI beantwortet.', sub: 'Aus den Karten des Inner Development Guide' },
      { type: 'list', title: 'Frag deine Klasse', items: [
        { color: 'thinking', label: 'Kritisches Denken', text: 'Woher weisst du, dass das stimmt?' },
        { color: 'being', label: 'Innerer Kompass', text: 'Woran merkst du, dass etwas für dich richtig oder falsch ist?' },
        { color: 'being', label: 'Präsenz', text: 'Wann warst du zuletzt so vertieft, dass du die Zeit vergessen hast?' },
        { color: 'collaborating', label: 'Kommunizieren', text: 'Woran merkst du, dass dir jemand wirklich zuhört?' },
        { color: 'acting', label: 'Proaktiv Handeln', text: 'Was könntest du schon morgen tun, ohne dass jemand es dir aufträgt?' },
      ] },
      { type: 'text', color: 'thinking', title: 'Die Antwort liegt **bei jedem Kind.**', body: ['Diese Fragen lassen sich nicht nachschlagen.', 'Gut als Einstieg in eine Klassenstunde oder in Medien und Informatik.'] },
      { type: 'cta', title: 'Alle 25 Karten kostenlos.', body: ['Speichere den Beitrag für deine nächste Klassenstunde. Link in der Bio.'], links: [GUIDE] },
    ],
  },
]
