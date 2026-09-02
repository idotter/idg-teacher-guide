import type { SkillId } from "./framework";

export interface TeacherBack {
  forYou: string[];
  forClass: string[];
  inLesson: string[];
}

export type TeacherBacks = Record<SkillId, TeacherBack>;

/** Original teacher-facing card backs (German). Du-form toward the teacher. */
export const TEACHER_BACKS_DE: TeacherBacks = {
  "innerer-kompass": {
    forYou: [
      "Welche Werte willst du in dieser Klasse sichtbar leben — auch wenn niemand zuschaut?",
      "Wo handelst du gegen deinen inneren Kompass, weil Stundenplan, Prüfung oder Kollegium es «so wollen»?",
      "Wann hast du zuletzt einer Klasse klar gesagt, wofür du als Lehrperson stehst?",
    ],
    forClass: [
      "Wofür lohnt es sich in unserer Klasse einzustehen, auch wenn es unbequem ist?",
      "Welche Ziele dienen nur uns — und welche einem grösseren Ganzen (Klasse, Schule, Umwelt)?",
      "Woran merken wir, dass wir von unseren Werten abweichen?",
    ],
    inLesson: [
      "8-Minuten-Wertekompass zu Stundenbeginn: eine Situation, drei Optionen — welche passt zu unseren Klassenwerten?",
      "Im Sachtext markieren: Wessen Wohl steht im Zentrum? Was würde sich ändern, wenn wir das «Ganze» mitdenken?",
      "Klassenrat: eine Regel wählen und prüfen — dient sie dem Wohl aller oder nur der Lautesten?",
    ],
  },
  "integritaet-authentizitaet": {
    forYou: [
      "Wo spielst du vor der Klasse eine Rolle, die sich nicht stimmig anfühlt?",
      "Wann hast du zuletzt einen Fehler vor Schüler:innen zugegeben — und was ist danach passiert?",
      "Welche Erwartung (Note, Quietschen, «perfekte Stunde») bringt dich dazu, unehrlich zu werden?",
    ],
    forClass: [
      "Wann fühlt sich «ehrlich sein» in der Schule riskant an — und warum?",
      "Was unterscheidet «nett sein» von «aufrichtig sein» in unserer Klasse?",
      "Wie merken wir, wenn jemand etwas sagt, das er oder sie nicht meint?",
    ],
    inLesson: [
      "Fehlerkonferenz (5 Min.): Lehrperson teilt einen eigenen Unterrichtsfehler; Klasse benennt, was das für Vertrauen bedeutet.",
      "Rollenspiel «Zwei Versionen»: dieselbe Aussage einmal glatt, einmal ehrlich — Wirkung vergleichen.",
      "Im Deutschunterricht: Figuranalayse — wo handelt die Figur integer, wo nicht, und mit welchem Preis?",
    ],
  },
  "offenheit-lernbereitschaft": {
    forYou: [
      "Welche Feedback-Art von Schüler:innen oder Kolleg:innen fällt dir am schwersten anzunehmen?",
      "Wo bleibst du bei einer Methode, weil sie «immer so war» — obwohl sie nicht mehr trägt?",
      "Wann hast du zuletzt vor der Klasse gesagt: «Das weiss ich nicht — lass uns nachschauen»?",
    ],
    forClass: [
      "Wann ist «Ich weiss es schon» ein Schutzschild — und wann echte Sicherheit?",
      "Was hilft dir, dich auf etwas Neues einzulassen, auch wenn es unsicher wirkt?",
      "Wie gehen wir in der Klasse mit «Ich habe es nicht verstanden» um?",
    ],
    inLesson: [
      "Exit-Ticket «Eine Frage, die ich noch habe» statt «Was habe ich gelernt» — Neugier sichtbar machen.",
      "Methodenwechsel mitteilen: «Heute probiere ich etwas aus — ich brauche euer ehrliches Feedback.»",
      "NMG/ETH: «Was hat meine Meinung zu X verändert?» — kurze Pair-Share-Runde.",
    ],
  },
  selbsterkenntnis: {
    forYou: [
      "Welche Emotionen zeigen sich bei dir im Unterricht am schnellsten — und wie wirken sie auf die Klasse?",
      "Wann reagierst du eher auf dein Bild von einer Schülerin/einem Schüler als auf die Person vor dir?",
      "Welches Muster (Kontrolle, Ironie, Rückzug) kennst du an dir in stressigen Stunden?",
    ],
    forClass: [
      "Woran merkst du, dass du gestresst, wütend oder unsicher bist — bevor es «rausplatzt»?",
      "Was brauchst du von dir selbst, um nach einem Streit wieder klar denken zu können?",
      "Welche Geschichte erzählst du dir oft über dich als Lernende:r — und stimmt sie noch?",
    ],
    inLesson: [
      "1-Minuten-Körpercheck vor einer Prüfung: Atmung, Schultern, Gedanken — ohne Bewertung.",
      "Reflexionsjournal (3 Sätze): «Was hat mich heute getriggert? Was brauchte ich wirklich?»",
      "Nach Gruppenarbeit: Ampel für die eigene Rolle (Zuhörer:in / Antreiber:in / Vermittler:in) benennen.",
    ],
  },
  gegenwaertigkeit: {
    forYou: [
      "In welchen Momenten bist du körperlich im Zimmer, aber gedanklich schon bei der nächsten Stunde?",
      "Was hilft dir, nach einer schwierigen Pause wieder «hier» zu landen?",
      "Wann urteilst du über eine Situation, bevor du sie wirklich wahrgenommen hast?",
    ],
    forClass: [
      "Was zieht deine Aufmerksamkeit am häufigsten aus dem Hier und Jetzt?",
      "Wann gelingt es der Klasse, gemeinsam «präsent» zu sein — und woran merkt man das?",
      "Wie unterscheidet sich Zuhören von «warten, bis ich reden darf»?",
    ],
    inLesson: [
      "Ankommensritual (60 Sek.): Augen optional zu, drei bewusste Atemzüge, ein Geräusch im Raum benennen.",
      "Handy-/Kopf-Parkplatz: vor wichtigen Gesprächen kurz «Ablenkung nennen und ablegen».",
      "Im Text: eine Passage laut lesen und danach nur beschreiben, was da stand — ohne Meinung.",
    ],
  },
  "kritisches-denken": {
    forYou: [
      "Welche Behauptung im Unterricht nimmst du zu schnell als «gesetzt» hin?",
      "Wo nutzt du Autorität («Weil ich es sage»), obwohl ein Argument stärker wäre?",
      "Welche Quelle empfiehlst du — und hast du sie zuletzt selbst kritisch geprüft?",
    ],
    forClass: [
      "Woran erkennt ihr eine starke Begründung — und woran eine schwache?",
      "Welche Aussage in diesem Thema klingt überzeugend, ist aber kaum belegt?",
      "Wann ist «kritisch sein» hilfreich, und wann nur «dagegen sein»?",
    ],
    inLesson: [
      "Behauptung–Beweis–Gegenbeweis (10 Min.): eine Schlagzeile in drei Spalten zerlegen.",
      "«Wer fehlt?»-Frage: Welche Stimme oder welches Datum fehlt in diesem Text/Video?",
      "Mathe/NMG: Ergebnis prüfen lassen — «Könnte das realistisch sein? Warum (nicht)?»",
    ],
  },
  "bewusstsein-komplexitaet": {
    forYou: [
      "Wo vereinfachst du ein Thema so stark, dass wichtige Zusammenhänge verloren gehen?",
      "Welche «einfache Lösung» verkaufst du der Klasse, obwohl du die Nebenwirkungen kennst?",
      "Wann lohnt es sich, Unsicherheit auszuhalten statt sofort eine klare Antwort zu liefern?",
    ],
    forClass: [
      "Welche Folgen hat unsere Entscheidung — für wen, wann, und was sehen wir vielleicht nicht?",
      "Wo hängen in diesem Thema mehrere Ursachen zusammen statt «einer Schuld»?",
      "Was wäre eine zu einfache Erklärung für dieses Problem?",
    ],
    inLesson: [
      "Ursachen-Netz (12 Min.): Problem in die Mitte, Pfeile für Wirkungen und Rückwirkungen.",
      "«Wenn–dann–aber»: drei Sätze zu einer Massnahme schreiben, inklusive Nebenwirkung.",
      "RZG/NMG: lokale Entscheidung (Schulhof, Verkehr) und ihre unsichtbaren Folgen sammeln.",
    ],
  },
  "perspektivische-faehigkeiten": {
    forYou: [
      "Welche Perspektive in der Klasse hörst du selten — und warum?",
      "Wann bist du so von deiner Didaktik überzeugt, dass Gegenstimmen «stören» statt informieren?",
      "Wie holst du aktiv Sichtweisen ein, die deiner eigenen widersprechen?",
    ],
    forClass: [
      "Wie würde dieselbe Situation aus Sicht von X aussehen?",
      "Was ändert sich an deiner Meinung, wenn du die stärkste Gegenposition ernst nimmst?",
      "Welche Perspektive fehlt in unserem Gespräch noch völlig?",
    ],
    inLesson: [
      "Perspektivwechsel-Stuhl: 4 Minuten aus einer anderen Rolle sprechen (Figur, Stakeholder, Generation).",
      "Texte in Paaren: «Ich fasse deine Position zusammen, bevor ich widerspreche.»",
      "Geschichte/ETH: Ereignis aus zwei Quellen lesen und Unterschiede benennen, ohne sofort zu werten.",
    ],
  },
  sinnstiftung: {
    forYou: [
      "Welche Geschichte erzählst du über «diese Klasse» — und hilft sie oder schränkt sie ein?",
      "Wo gibst du Stoff weiter, ohne den Sinn für die Lernenden sichtbar zu machen?",
      "Wann strukturierst du Chaos zu früh — und wann lässt du Muster erst entstehen?",
    ],
    forClass: [
      "Welches Muster erkennt ihr in diesen Beispielen / in unserem Klassenalltag?",
      "Welche Geschichte über uns als Klasse wollen wir bewusst weiterschreiben?",
      "Was bleibt unklar — und wie könnten wir es ordnen, ohne es zu verfälschen?",
    ],
    inLesson: [
      "Storyboard (10 Min.): «Was ist passiert → warum → was bedeutet das für uns?» zu einem aktuellen Thema.",
      "Begriffscluster: Karten legen, bis ein Muster sichtbar wird — dann einen Titel geben.",
      "Deutsch: zwei Enden einer Geschichte entwerfen und prüfen, welche Werte sie transportieren.",
    ],
  },
  "langfristige-orientierung": {
    forYou: [
      "Welche kurzfristige Note/Disziplin-Logik steht deiner langfristigen Vision für die Klasse im Weg?",
      "Was soll von deinem Unterricht in fünf Jahren noch wirken — Haltung, Wissen, Beziehung?",
      "Wo planst du von Prüfung zu Prüfung statt von einer gemeinsamen Vision her?",
    ],
    forClass: [
      "Wenn wir in einem Jahr auf diese Klasse zurückblicken — worauf wollen wir stolz sein?",
      "Welche Entscheidung von heute wirkt noch, wenn wir die Schule verlassen haben?",
      "Was ist «schnell fertig» — und was ist «nachhaltig gut»?",
    ],
    inLesson: [
      "Zukunftsbrief (8 Min.): an das Ich in 3 Jahren — welche Fähigkeit baue ich jetzt auf?",
      "Projektwoche: Meilensteine rückwärts planen (Ziel → Zwischenschritte → heutiger 15-Min-Schritt).",
      "Klimathema/ETH: «Kosten jetzt vs. Kosten später» an einem konkreten Beispiel vergleichen.",
    ],
  },
  wertschaetzung: {
    forYou: [
      "Wen in der Klasse siehst du vor allem über Defizite — und was würdest du verlieren, wenn du Stärken suchst?",
      "Wie oft bedankst du dich konkret (für was genau) statt allgemein («brav»)?",
      "Was an dieser Klasse freut dich wirklich — und hörst die Klasse das jemals?",
    ],
    forClass: [
      "Wofür bist du heute in dieser Klasse dankbar — konkret, nicht allgemein?",
      "Wen hast du zuletzt übersehen, obwohl er oder sie etwas Wichtiges beigetragen hat?",
      "Wie fühlt sich echte Wertschätzung an — im Unterschied zu leerem Lob?",
    ],
    inLesson: [
      "Stärken-Blitzlicht (5 Min.): jede:r nennt eine Beobachtung zu einer anderen Person («Ich habe gesehen, dass…»).",
      "Dankbarkeitsrunde im Klassenrat: drei konkrete Beiträge der Woche.",
      "Im Feedback: Feedback-Sandwich ersetzen durch «Wirkung + Wunsch + Wertschätzung einer konkreten Handlung».",
    ],
  },
  verbundenheit: {
    forYou: [
      "Wann fühlst du dich mit dieser Klasse als «Wir» — und wann als einsame Insel vor der Tafel?",
      "Wie verbindest du den Stoff mit der Lebenswelt ausserhalb des Klassenzimmers?",
      "Welche Brücke zur Schule, Nachbarschaft oder Natur baust du bewusst — und welche vernachlässigst du?",
    ],
    forClass: [
      "Wann spüren wir, dass wir mehr sind als 25 Einzelpersonen?",
      "Wozu gehören wir ausserhalb der Klasse — und wie wirkt das hier hinein?",
      "Was verbindet uns mit Menschen, die wir nie treffen (andere Länder, künftige Generationen)?",
    ],
    inLesson: [
      "Gemeinsames «Wir-Protokoll»: eine Entscheidung der Klasse und ihre Wirkung auf andere festhalten.",
      "NMG: Lieferkette eines Alltagsprodukts — wer ist unsichtbar mit uns verbunden?",
      "Pause bewusst gestalten: 5 Minuten Draussen, ein Naturdetail teilen.",
    ],
  },
  bescheidenheit: {
    forYou: [
      "Wo brauchst du Anerkennung von der Klasse oder dem Kollegium, obwohl die Situation etwas anderes braucht?",
      "Wann hältst du dich zurück — und wann nimmst du Raum, der anderen gehören könnte?",
      "Wie gehst du damit um, wenn eine Schülerin/ein Schüler dich fachlich überholt?",
    ],
    forClass: [
      "Wann ist Zurücktreten stark — und wann ist es Vermeiden?",
      "Wie teilen wir Sichtbarkeit und Redezeit fair, ohne jemanden «klein» zu machen?",
      "Was braucht die Situation jetzt — nicht: was brauche ich, um gut dazustehen?",
    ],
    inLesson: [
      "Redezeit-Token: wer schon zweimal gesprochen hat, gibt zuerst weiter.",
      "«Helping without starring»: Hilfe leisten, ohne die Lösung vorwegzunehmen oder sich zu profilieren.",
      "Gruppenarbeit: Rolle «Prozesswächter:in» statt «Chef:in» — Fokus auf Bedarf der Gruppe.",
    ],
  },
  einfuehlungsvermoegen: {
    forYou: [
      "Bei wem fällt dir Mitgefühl leicht — und bei wem merkst du innere Distanz?",
      "Wie unterscheidest du Mitleid («Arme:r…») von Mitgefühl (Zugewandtheit + Handlungsraum)?",
      "Wann schützt dich Härte — und wann verhärtet sie die Klasse?",
    ],
    forClass: [
      "Was könnte die andere Person gerade brauchen — statt was sie «verdient»?",
      "Wie können wir Leiden ernst nehmen, ohne jemanden zu bemitleiden oder zu retten?",
      "Wann fällt es uns schwer, freundlich zu uns selbst zu sein?",
    ],
    inLesson: [
      "Perspektiv-Brief (10 Min.): aus Sicht einer betroffenen Figur/Person schreiben, Gefühle benennen.",
      "Konflikt-Nachgespräch: «Was hast du gebraucht? Was habe ich gebraucht?» statt Schuldsuche.",
      "Naturbezug: eine Pflanze/ein Tier beobachten und Bedürfnisse ableiten — ohne zu vermenschlichen.",
    ],
  },
  kommunikation: {
    forYou: [
      "Wann hörst du zu, um zu antworten — statt um zu verstehen?",
      "Welche Konflikte in der Klasse «moderierst» du weg, statt sie konstruktiv zu führen?",
      "Wie passt du deine Sprache an — und wo bleibst du in Fachjargon hängen?",
    ],
    forClass: [
      "Was brauchst du, um dich gehört zu fühlen?",
      "Wie sagen wir «Ich sehe das anders», ohne die andere Person anzugreifen?",
      "Wann eskaliert ein Gespräch bei uns — und was könnte früher stoppen?",
    ],
    inLesson: [
      "Aktives Zuhören (6 Min.): A spricht 90 Sek., B spiegelt, A korrigiert, dann Rollenwechsel.",
      "Ich-Botschaften üben an einem echten Klassenkonflikt (ohne Namen zu nennen).",
      "Debattenformat mit «Stahlmann»-Regel: Gegenposition zuerst möglichst stark wiedergeben.",
    ],
  },
  mitgestaltung: {
    forYou: [
      "Wo lädst du Schüler:innen zur Mitgestaltung ein — und wo ist «Mitbestimmung» nur Dekoration?",
      "Welche Entscheidung könntest du diese Woche wirklich teilen, ohne die Verantwortung abzugeben?",
      "Wie schaffst du psychologische Sicherheit, damit auch leise Stimmen Ideen riskieren?",
    ],
    forClass: [
      "Wann fühlt sich Zusammenarbeit lebendig an — und wann wie «Arbeitsteilung ohne Beziehung»?",
      "Was brauchen wir, damit Ideen ausgesprochen werden dürfen, auch wenn sie noch unfertig sind?",
      "Wie entscheiden wir gemeinsam, ohne dass die Lautesten gewinnen?",
    ],
    inLesson: [
      "Mini-Co-Design (12 Min.): Lernziel steht, Weg wählen die Gruppen — Kriterien vorher klären.",
      "Klassenrat mit echter Entscheidung (eine Regel, ein Ritual, ein Raumdetail).",
      "Projekt: Stakeholder-Karte — wen müssen wir einbeziehen, bevor wir «fertig» planen?",
    ],
  },
  "inklusive-denkweise": {
    forYou: [
      "Wen meinst du unbewusst mit «wir» — und wer fällt aus diesem «wir» heraus?",
      "Welche Beispiele, Namen und Bilder in deinem Material spiegeln Vielfalt — und welche nicht?",
      "Wann fühlst du dich durch eine andere Lebenswelt herausgefordert statt bereichert?",
    ],
    forClass: [
      "Was bedeutet «dazugehören» in unserer Klasse — und wer entscheidet das?",
      "Wie können unterschiedliche Meinungen da sein, ohne dass jemand «falsch» ist?",
      "Welche Geschichten oder Sprachen fehlen bei uns noch?",
    ],
    inLesson: [
      "Material-Check (8 Min.): Wer kommt in Text/Bild vor? Wer fehlt? Eine Ergänzung beschaffen.",
      "«Normen sichtbar machen»: ungeschriebene Regeln der Klasse sammeln und auf Ausschluss prüfen.",
      "Interkulturelles Pairing: dieselbe Aufgabe aus zwei kulturellen Bezügen lösen und vergleichen.",
    ],
  },
  vertrauen: {
    forYou: [
      "Wo forderst du Vertrauen ein, ohne selbst transparent zu sein?",
      "Welche Kontrolle kannst du diese Woche bewusst abgeben — und was brauchst du dafür?",
      "Wie reparierst du Vertrauen, nachdem du es (oder die Klasse es) verletzt hast?",
    ],
    forClass: [
      "Woran merken wir, dass wir uns in der Gruppe vertrauen können?",
      "Was zerstört Vertrauen bei uns am schnellsten — und wie flickt man es?",
      "Wann ist Misstrauen Schutz — und wann bremst es uns unnötig?",
    ],
    inLesson: [
      "Vertrauensvertrag für Gruppenarbeit: 3 konkrete Verhaltensweisen, Check-in nach 15 Min.",
      "Transparenz-Minute der Lehrperson: Bewertungskriterien und Unsicherheiten offenlegen.",
      "Peer-Feedback mit «Vertrauensregel»: nur Beobachtungen, keine Charakterurteile.",
    ],
  },
  mobilisierung: {
    forYou: [
      "Wofür begeisterst du die Klasse echt — und wo «motivierst» du nur mit Notendruck?",
      "Welche gemeinsame Sache könnte diese Klasse tragen, die grösser ist als der nächste Test?",
      "Wen erreichst du mit deinem Stil nicht — und wen könntest du als Mit-Mobilisierer:in gewinnen?",
    ],
    forClass: [
      "Was würde uns als Klasse wirklich in Bewegung bringen — nicht nur «müssen»?",
      "Wie laden wir andere ein, mitzumachen, ohne zu drängen oder zu shamen?",
      "Welches Ziel ist stark genug, dass auch Unsichere mitkommen wollen?",
    ],
    inLesson: [
      "Elevator-Pitch (5 Min.): ein Anliegen in 60 Sekunden so erzählen, dass andere mitwollen.",
      "Aktionskarte: kleines, konkretes «nächstes Verhalten» statt grosses Manifest.",
      "Klassencampagne: ein Schul-Thema wählen, Rollen verteilen, erste 10-Min-Aktion heute.",
    ],
  },
  mut: {
    forYou: [
      "Welche unangenehme Wahrheit in dieser Klasse/Schule vermeidest du — und was kostet das?",
      "Wann hast du zuletzt eine Entscheidung getroffen, die gegen den Strom ging, aber zu deinen Werten passte?",
      "Wo verwechselst du Mut mit Härte — und wo brauchst du eher sanfte Klarheit?",
    ],
    forClass: [
      "Wann brauchte es Mut, etwas zu sagen oder zu tun — und was hat geholfen?",
      "Welche Regel oder Meinung in unserem Umfeld dürften wir höflich hinterfragen?",
      "Was ist der Unterschied zwischen mutig und rücksichtslos?",
    ],
    inLesson: [
      "Mut-Mikroschritt: eine Person übt, eine schwierige Frage zu stellen — Klasse unterstützt mit Stille und Respekt.",
      "Fallvignette: «Was wäre hier die mutige und die bequeme Option?» diskutieren.",
      "ETH/Klassenrat: eine bestehende Praxis der Schule prüfen — Argumente, Risiken, Alternativen.",
    ],
  },
  kreativitaet: {
    forYou: [
      "Wo verlangst du «die eine richtige Lösung», obwohl mehrere Wege tragen würden?",
      "Welche konventionelle Stundenstruktur könntest du diese Woche bewusst durchbrechen?",
      "Wie belohnst du originelle Ideen — auch wenn sie noch unfertig oder riskant sind?",
    ],
    forClass: [
      "Welche Idee wirkt zuerst «seltsam» — und könnte trotzdem hilfreich sein?",
      "Was hält uns davon ab, Neues auszuprobieren (Angst vor Note, Lächerlichkeit, Zeit)?",
      "Wie unterscheiden wir «kreativ» von «beliebig»?",
    ],
    inLesson: [
      "Crazy-8 (8 Min.): acht skizzenhafte Lösungen zum gleichen Problem, dann eine weiterentwickeln.",
      "Constraint-Spiel: Aufgabe mit einer absurden Einschränkung lösen — Flexibilität trainieren.",
      "Umkehrung: «Wie würden wir dieses Problem absichtlich verschlimmern?» — dann invertieren.",
    ],
  },
  optimismus: {
    forYou: [
      "Welche Erzählung über «diese Generation» oder «diese Klasse» raubt dir Hoffnung — und ist sie fair?",
      "Wie kommunizierst du Ernst ohne Fatalismus?",
      "Wo kannst du kleine Fortschritte feiern, ohne Erfolge zu übertreiben?",
    ],
    forClass: [
      "Was gibt euch trotz schwieriger Nachrichten Grund zur Zuversicht — konkret, nicht kitschig?",
      "Welche Veränderung ist bei uns schon gelungen, die früher unmöglich wirkte?",
      "Wie bleibt Hoffnung aktiv (Handeln), statt passiv («wird schon»)?",
    ],
    inLesson: [
      "«Problem → Handlungsspielraum»: zu einem schweren Thema drei Hebel auf Klassen-/Schulebene finden.",
      "Fortschrittsprotokoll: Was ist seit letztem Monat besser geworden? Evidenz sammeln.",
      "Zukunftsvision (positiv & realistisch) zeichnen/schreiben — dann einen heutigen Schritt ableiten.",
    ],
  },
  beharrlichkeit: {
    forYou: [
      "Welche langfristige Entwicklung bei einer Schülerin/einem Schüler gibst du zu früh auf?",
      "Wo wechselst du die Strategie zu schnell — und wo bleibst du stur bei einer, die nicht wirkt?",
      "Wie modellierst du Geduld, ohne Passivität zu predigen?",
    ],
    forClass: [
      "Wann habt ihr etwas geschafft, das lange gedauert hat — was hat euch gehalten?",
      "Wie unterscheidet sich Beharrlichkeit von «immer weiter machen, obwohl es schadet»?",
      "Was brauchen wir als Klasse, um bei einem Vorhaben dranzubleiben?",
    ],
    inLesson: [
      "Lernkurve sichtbar: Fehler/Versuch-Protokoll über 3 Stunden zum gleichen Skill.",
      "Mikro-Commitment: «Heute 12 Minuten dranbleiben» statt «bis es fertig ist».",
      "Projekt: Meilenstein-Check mit ehrlichem «Was stockt?» und einem konkreten nächsten Schritt.",
    ],
  },
};

/** Matching English teacher backs for the EN locale. */
export const TEACHER_BACKS_EN: TeacherBacks = {
  "innerer-kompass": {
    forYou: [
      "Which values do you want to live visibly in this class — even when no one is watching?",
      "Where do you act against your inner compass because the timetable, exam or staffroom «requires» it?",
      "When did you last tell a class clearly what you stand for as a teacher?",
    ],
    forClass: [
      "What is worth standing up for in our class, even when it is uncomfortable?",
      "Which goals serve only us — and which serve a larger whole (class, school, environment)?",
      "How do we notice when we drift away from our values?",
    ],
    inLesson: [
      "8-minute values compass at the start: one situation, three options — which fits our class values?",
      "In a nonfiction text, mark: whose wellbeing is centred? What changes if we include the «whole»?",
      "Class council: pick one rule and check — does it serve everyone or only the loudest?",
    ],
  },
  "integritaet-authentizitaet": {
    forYou: [
      "Where do you play a role in front of the class that does not feel true?",
      "When did you last admit a mistake to students — and what happened afterwards?",
      "Which expectation (grades, silence, the «perfect lesson») pushes you toward dishonesty?",
    ],
    forClass: [
      "When does being honest feel risky at school — and why?",
      "What is the difference between being «nice» and being sincere in our class?",
      "How do we notice when someone says something they do not mean?",
    ],
    inLesson: [
      "5-minute error conference: you share a teaching mistake; the class names what it means for trust.",
      "Role-play «two versions»: the same statement polished vs honest — compare the effect.",
      "In language arts: analyse a character — where do they act with integrity, and at what cost?",
    ],
  },
  "offenheit-lernbereitschaft": {
    forYou: [
      "Which kind of feedback from students or colleagues is hardest for you to take in?",
      "Where do you stick with a method because «it has always been that way» — even when it no longer works?",
      "When did you last say in front of the class: «I do not know — let's look it up»?",
    ],
    forClass: [
      "When is «I already know» a shield — and when is it real confidence?",
      "What helps you try something new even when it feels uncertain?",
      "How do we treat «I did not understand» in this class?",
    ],
    inLesson: [
      "Exit ticket «one question I still have» instead of «what I learned» — make curiosity visible.",
      "Announce a method change: «I am trying something today — I need your honest feedback.»",
      "Short pair-share: «What changed my mind about X?»",
    ],
  },
  selbsterkenntnis: {
    forYou: [
      "Which emotions show up fastest in your teaching — and how do they affect the class?",
      "When do you react to your image of a student rather than the person in front of you?",
      "Which pattern (control, irony, withdrawal) do you know in yourself during stressful lessons?",
    ],
    forClass: [
      "How do you notice you are stressed, angry or unsure — before it spills out?",
      "What do you need from yourself to think clearly again after a conflict?",
      "What story do you often tell yourself as a learner — and is it still true?",
    ],
    inLesson: [
      "1-minute body check before a test: breath, shoulders, thoughts — no judgement.",
      "3-sentence journal: «What triggered me today? What did I actually need?»",
      "After group work: name your role (listener / driver / mediator).",
    ],
  },
  gegenwaertigkeit: {
    forYou: [
      "When are you physically in the room but already thinking about the next lesson?",
      "What helps you land «here» again after a difficult break?",
      "When do you judge a situation before you have really perceived it?",
    ],
    forClass: [
      "What most often pulls your attention out of the here and now?",
      "When does the class manage to be present together — and how can you tell?",
      "How is listening different from waiting for your turn to speak?",
    ],
    inLesson: [
      "60-second arrival ritual: optional closed eyes, three breaths, name one sound in the room.",
      "Distraction parking: before key conversations, name and set aside one distraction.",
      "Read a passage aloud, then only describe what it said — no opinion yet.",
    ],
  },
  "kritisches-denken": {
    forYou: [
      "Which claim in your teaching do you accept too quickly as given?",
      "Where do you use authority («because I say so») when an argument would be stronger?",
      "Which source do you recommend — and when did you last check it critically yourself?",
    ],
    forClass: [
      "How do you recognise a strong reason — and a weak one?",
      "Which statement on this topic sounds convincing but is barely evidenced?",
      "When is being critical helpful, and when is it just being against?",
    ],
    inLesson: [
      "Claim–evidence–counter (10 min): take a headline apart in three columns.",
      "«Who is missing?» — which voice or data is absent from this text/video?",
      "Sanity-check an answer: «Could this be realistic? Why (not)?»",
    ],
  },
  "bewusstsein-komplexitaet": {
    forYou: [
      "Where do you simplify a topic so much that important links disappear?",
      "Which «simple solution» do you sell the class even though you know the side effects?",
      "When is it better to stay with uncertainty than to rush a clear answer?",
    ],
    forClass: [
      "What consequences does our decision have — for whom, when, and what might we not see?",
      "Where do several causes connect in this topic instead of one «guilty» party?",
      "What would be an overly simple explanation of this problem?",
    ],
    inLesson: [
      "Cause web (12 min): problem in the centre, arrows for effects and feedback loops.",
      "«If–then–but»: write three sentences about a measure, including a side effect.",
      "Map a local decision (schoolyard, traffic) and its invisible consequences.",
    ],
  },
  "perspektivische-faehigkeiten": {
    forYou: [
      "Which perspective in the class do you rarely hear — and why?",
      "When are you so convinced of your approach that opposing views feel like interference?",
      "How do you actively invite views that contradict your own?",
    ],
    forClass: [
      "How would the same situation look from X's point of view?",
      "What changes in your opinion when you take the strongest opposing view seriously?",
      "Which perspective is still completely missing from our conversation?",
    ],
    inLesson: [
      "Perspective chair: speak for 4 minutes from another role (character, stakeholder, generation).",
      "Pair work: «I summarise your position before I disagree.»",
      "Read one event from two sources and name differences before judging.",
    ],
  },
  sinnstiftung: {
    forYou: [
      "What story do you tell about «this class» — and does it help or limit?",
      "Where do you pass on content without making the purpose visible to learners?",
      "When do you structure chaos too early — and when do you let patterns emerge?",
    ],
    forClass: [
      "What pattern do you notice in these examples / in our class life?",
      "Which story about us as a class do we want to keep writing on purpose?",
      "What is still unclear — and how could we organise it without distorting it?",
    ],
    inLesson: [
      "Storyboard (10 min): «What happened → why → what it means for us» on a current topic.",
      "Concept cluster: lay cards until a pattern appears — then give it a title.",
      "Write two endings to a story and check which values each ending carries.",
    ],
  },
  "langfristige-orientierung": {
    forYou: [
      "Which short-term grade/discipline logic blocks your long-term vision for the class?",
      "What should still matter from your teaching in five years — stance, knowledge, relationship?",
      "Where do you plan from test to test instead of from a shared vision?",
    ],
    forClass: [
      "If we look back in a year — what do we want to be proud of?",
      "Which decision today will still matter when we leave school?",
      "What is «done quickly» — and what is «sustainably good»?",
    ],
    inLesson: [
      "Future letter (8 min): to myself in 3 years — which skill am I building now?",
      "Plan milestones backwards (goal → steps → today's 15-minute move).",
      "Compare «cost now vs cost later» on a concrete climate or ethics example.",
    ],
  },
  wertschaetzung: {
    forYou: [
      "Whom in the class do you mostly see through deficits — and what would you gain by looking for strengths?",
      "How often do you thank someone specifically (for what exactly) instead of vaguely («good job»)?",
      "What about this class truly delights you — and do they ever hear it?",
    ],
    forClass: [
      "What are you grateful for in this class today — concrete, not general?",
      "Whom have you overlooked recently even though they contributed something important?",
      "How does real appreciation feel — compared with empty praise?",
    ],
    inLesson: [
      "Strength spotlight (5 min): each person names one observation of another («I noticed that…»).",
      "Gratitude round in class council: three concrete contributions of the week.",
      "Replace vague praise with «impact + wish + appreciation of one concrete action».",
    ],
  },
  verbundenheit: {
    forYou: [
      "When do you feel like a «we» with this class — and when like an island at the board?",
      "How do you connect content to life beyond the classroom?",
      "Which bridge to school, neighbourhood or nature do you build on purpose — and which do you neglect?",
    ],
    forClass: [
      "When do we sense we are more than 25 separate people?",
      "What do we belong to outside this class — and how does that enter the room?",
      "What connects us to people we never meet (other countries, future generations)?",
    ],
    inLesson: [
      "Shared «we protocol»: record one class decision and its effect on others.",
      "Trace the supply chain of an everyday product — who is invisibly connected to us?",
      "5 minutes outside: share one nature detail you noticed.",
    ],
  },
  bescheidenheit: {
    forYou: [
      "Where do you need recognition from the class or colleagues even when the situation needs something else?",
      "When do you step back — and when do you take space that could belong to others?",
      "How do you respond when a student outpaces you on content?",
    ],
    forClass: [
      "When is stepping back strength — and when is it avoidance?",
      "How do we share visibility and speaking time fairly without shrinking anyone?",
      "What does the situation need now — not: what do I need to look good?",
    ],
    inLesson: [
      "Speaking tokens: if you have spoken twice, pass first.",
      "Help without starring: support without taking over the solution or the spotlight.",
      "Group role «process guardian» instead of «boss» — focus on the group's needs.",
    ],
  },
  einfuehlungsvermoegen: {
    forYou: [
      "With whom is compassion easy for you — and with whom do you feel distance?",
      "How do you distinguish pity from compassion (care plus agency)?",
      "When does hardness protect you — and when does it harden the class?",
    ],
    forClass: [
      "What might the other person need right now — instead of what they «deserve»?",
      "How can we take suffering seriously without pitying or rescuing someone?",
      "When is it hard for us to be kind to ourselves?",
    ],
    inLesson: [
      "Perspective letter (10 min): write from an affected person's view and name feelings.",
      "After conflict: «What did you need? What did I need?» instead of blame.",
      "Observe a plant or animal and infer needs — without over-humanising.",
    ],
  },
  kommunikation: {
    forYou: [
      "When do you listen to reply rather than to understand?",
      "Which conflicts do you smooth over instead of facilitating constructively?",
      "How do you adapt your language — and where do you stay stuck in jargon?",
    ],
    forClass: [
      "What do you need to feel heard?",
      "How do we say «I see it differently» without attacking the other person?",
      "When do conversations escalate here — and what could stop that earlier?",
    ],
    inLesson: [
      "Active listening (6 min): A speaks 90 sec, B mirrors, A corrects, then switch.",
      "Practise I-statements on a real class conflict (no names).",
      "Debate with steelmanning: restate the opposing view as strongly as possible first.",
    ],
  },
  mitgestaltung: {
    forYou: [
      "Where do you invite co-creation — and where is «student voice» only decoration?",
      "Which decision could you truly share this week without abandoning responsibility?",
      "How do you create psychological safety so quiet voices risk ideas too?",
    ],
    forClass: [
      "When does collaboration feel alive — and when like task-splitting without relationship?",
      "What do we need so unfinished ideas can be spoken aloud?",
      "How do we decide together without the loudest winning?",
    ],
    inLesson: [
      "Mini co-design (12 min): learning goal fixed, path chosen by groups — criteria first.",
      "Class council with a real decision (one rule, ritual or room detail).",
      "Stakeholder map before finishing a plan: whom must we include?",
    ],
  },
  "inklusive-denkweise": {
    forYou: [
      "Whom do you unconsciously mean by «we» — and who falls outside that we?",
      "Which examples, names and images in your materials reflect diversity — and which do not?",
      "When does another lifeworld challenge you rather than enrich you?",
    ],
    forClass: [
      "What does belonging mean in our class — and who decides?",
      "How can different opinions exist without anyone being «wrong»?",
      "Which stories or languages are still missing here?",
    ],
    inLesson: [
      "Material check (8 min): who appears in text/image? Who is missing? Add one source.",
      "Make norms visible: list unwritten class rules and check for exclusion.",
      "Solve the same task from two cultural references and compare.",
    ],
  },
  vertrauen: {
    forYou: [
      "Where do you demand trust without being transparent yourself?",
      "Which control can you consciously release this week — and what do you need for that?",
      "How do you repair trust after you (or the class) have broken it?",
    ],
    forClass: [
      "How do we notice we can trust each other in a group?",
      "What destroys trust fastest here — and how do we mend it?",
      "When is distrust protection — and when does it slow us down unnecessarily?",
    ],
    inLesson: [
      "Trust agreement for group work: 3 concrete behaviours, check-in after 15 min.",
      "Teacher transparency minute: open grading criteria and uncertainties.",
      "Peer feedback rule: observations only, no character judgements.",
    ],
  },
  mobilisierung: {
    forYou: [
      "What do you truly inspire the class about — and where do you only «motivate» with grades?",
      "What shared cause could this class carry that is larger than the next test?",
      "Whom does your style not reach — and whom could you win as a co-mobiliser?",
    ],
    forClass: [
      "What would truly move us as a class — not just what we «have to» do?",
      "How do we invite others without pushing or shaming?",
      "Which goal is strong enough that even unsure people want to join?",
    ],
    inLesson: [
      "Elevator pitch (5 min): tell a cause in 60 seconds so others want in.",
      "Action card: one small next behaviour instead of a big manifesto.",
      "Class campaign: pick a school topic, assign roles, take a first 10-minute action today.",
    ],
  },
  mut: {
    forYou: [
      "Which uncomfortable truth in this class/school are you avoiding — and what does that cost?",
      "When did you last decide against the current because it matched your values?",
      "Where do you confuse courage with hardness — and where do you need gentle clarity?",
    ],
    forClass: [
      "When did it take courage to say or do something — and what helped?",
      "Which rule or opinion around us could we politely question?",
      "What is the difference between courageous and reckless?",
    ],
    inLesson: [
      "Courage micro-step: one person practises asking a hard question — class holds respectful silence.",
      "Case vignette: discuss the brave vs the convenient option.",
      "Examine one school practice — arguments, risks, alternatives.",
    ],
  },
  kreativitaet: {
    forYou: [
      "Where do you demand «the one right solution» when several paths would work?",
      "Which conventional lesson structure could you deliberately break this week?",
      "How do you reward original ideas — even when they are unfinished or risky?",
    ],
    forClass: [
      "Which idea seems «weird» at first — and might still help?",
      "What stops us from trying new things (grades, ridicule, time)?",
      "How do we tell creative from arbitrary?",
    ],
    inLesson: [
      "Crazy-8 (8 min): eight rough solutions to one problem, then develop one.",
      "Constraint game: solve the task with one absurd limit — train flexibility.",
      "Inversion: «How would we make this problem worse?» — then flip it.",
    ],
  },
  optimismus: {
    forYou: [
      "Which story about «this generation» or «this class» steals your hope — and is it fair?",
      "How do you communicate seriousness without fatalism?",
      "Where can you celebrate small progress without exaggerating success?",
    ],
    forClass: [
      "What gives you confidence despite hard news — concrete, not sugary?",
      "What change has already succeeded here that once seemed impossible?",
      "How does hope stay active (action) instead of passive («it will be fine»)?",
    ],
    inLesson: [
      "Problem → agency: find three levers at class/school level for a heavy topic.",
      "Progress log: what has improved since last month? Gather evidence.",
      "Draw/write a realistic positive future — then derive one step for today.",
    ],
  },
  beharrlichkeit: {
    forYou: [
      "Which long-term development in a student do you give up on too early?",
      "Where do you switch strategy too fast — and where do you stubbornly stick to one that fails?",
      "How do you model patience without preaching passivity?",
    ],
    forClass: [
      "When did you finish something that took a long time — what kept you going?",
      "How is perseverance different from «keeping going even when it harms»?",
      "What do we need as a class to stay with a project?",
    ],
    inLesson: [
      "Make the learning curve visible: attempt/error log over 3 lessons on one skill.",
      "Micro-commitment: «12 minutes today» instead of «until it is done».",
      "Milestone check: honest «what is stuck?» plus one concrete next step.",
    ],
  },
};

export function getTeacherBack(skillId: SkillId, locale: "de" | "en"): TeacherBack {
  return locale === "en" ? TEACHER_BACKS_EN[skillId] : TEACHER_BACKS_DE[skillId];
}
