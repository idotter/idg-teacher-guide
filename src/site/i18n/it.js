/**
 * Testi del sito in italiano (it). I testi delle carte sono separati, in
 * src/content/.
 *
 * Struttura, nomi delle chiavi e tipi di blocco sono identici a
 * src/site/i18n/de.js — lì si trova la documentazione dei tipi di blocco, del
 * markup in linea e dei segnaposto. Il tedesco è la fonte vincolante; questo
 * file è una traduzione.
 *
 * Regola del markup in linea: si traduce il testo visibile, mai la
 * destinazione. `[Kontakt](path:contact)` diventa `[Contatti](path:contact)` —
 * `contact` è una chiave di rotta, non una parola. URL, chiavi localStorage e
 * codice fra apici inversi restano invariati.
 *
 * Le stringhe usano le virgolette doppie: l'italiano è ricco di apostrofi.
 */
export const site = {
  lang: "it",
  htmlLang: "it",
  ogLocale: "it_IT",

  chrome: {
    brand: "Inner Development Guide",
    brandSub: "in classe",
    homeAria: "Vai alla pagina iniziale",
    langAria: "Lingua",
    footerAria: "Piè di pagina",
    footerAbout: "Il progetto",
    footerLegal: "Note legali",
    footerNote: "Questo lavoro si ispira all'Inner Development Guide. Maggiori informazioni su",
  },

  notFound: {
    title: "Pagina non trovata",
    lead: "Questo percorso non porta da nessuna parte.",
    backHome: "Vai alla pagina iniziale",
  },

  pages: {
    home: {
      documentTitle: "Inner Development Guide in classe — dare forma al futuro in cinque minuti",
      description: "25 competenze dell'Inner Development Guide 2.0 come carte di riflessione digitali per gli insegnanti: domande per te e per la tua classe, idee per la lezione e collegamenti al Lehrplan 21 — senza account e utilizzabili offline.",
    },

    app: {
      documentTitle: "IDG Guide per insegnanti",
      description: "25 competenze dell'Inner Development Guide 2.0 come carte di riflessione per la lezione — installabili, offline, senza account.",
    },

    project: {
      navLabel: "Il progetto",
      title: "Il progetto",
      documentTitle: "Il progetto — Inner Development Guide in classe",
      description: "L'Inner Development Guide 2.0 come carte di riflessione per la vita scolastica quotidiana: 25 competenze, cinque dimensioni, senza account — per insegnanti in Svizzera.",
      lead: "Un set di carte digitale che traduce l'Inner Development Guide 2.0 nella lezione: una carta, una domanda, un punto di partenza.",
      body: [
        { t: "h2", v: "Di che cosa si tratta" },
        { t: "p", v: "L'Inner Development Guide 2.0 descrive 25 capacità interiori in cinque dimensioni: Essere, Pensare, Relazionarsi, Collaborare e Agire. Questa proposta le rende concrete per gli insegnanti: come carte che si girano, si salvano e restano offline sul dispositivo." },
        { t: "p", v: "Davanti c'è la competenza. Dietro ci sono due domande per te e due che puoi rivolgere alla classe così come sono, oltre a idee per la lezione, collegamenti disciplinari e un miniesercizio." },
        { t: "h2", v: "Senza store, senza account" },
        { t: "p", v: "L'app funziona nel browser e si può aggiungere alla schermata iniziale. Le carte salvate e le impostazioni restano nella memoria di questo dispositivo. Non c'è registrazione e non viene caricato nulla su un server." },
        { t: "h2", v: "Scritto per la vita scolastica quotidiana" },
        { t: "p", v: "I nomi e le descrizioni delle competenze provengono dall'Inner Development Guide 2.0 (versione 7.2). Le domande di riflessione, le idee per la lezione e i miniesercizi sono stati formulati appositamente per questa app. In tedesco si collegano alle aree disciplinari del Lehrplan 21, il piano di studio della Svizzera tedesca." },
        { t: "p", v: "Oltre che in tedesco, le carte esistono in inglese, francese, spagnolo, italiano e svedese." },
        { t: "h2", v: "Le cinque dimensioni" },
        { t: "dimList" },
        { t: "h2", v: "Domande frequenti" },
        { t: "faq" },
        { t: "h2", v: "Origine" },
        { t: "p", v: "Questo lavoro si ispira all'Inner Development Guide. Non è un prodotto ufficiale di chi pubblica il quadro di riferimento. Maggiori informazioni su [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). Una proposta affine è la [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch)." },
      ],
      faq: [
        {
          q: "Che cos'è Inner Development Guide in classe?",
          a: "Un set di carte digitale e gratuito per gli insegnanti: 25 competenze dell'Inner Development Guide 2.0 come carte di riflessione da girare, con domande per te e per la tua classe, idee per la lezione, collegamenti al Lehrplan 21 e un miniesercizio.",
        },
        {
          q: "La proposta ha un costo?",
          a: "No. L'utilizzo è gratuito. Non ci sono acquisti in uno store né abbonamenti.",
        },
        {
          q: "Serve un account?",
          a: "No. Non c'è registrazione. Le carte salvate e le impostazioni restano solo sul tuo dispositivo.",
        },
        {
          q: "Che rapporto c'è con il Lehrplan 21?",
          a: "Le carte in tedesco si collegano ad aree disciplinari del Lehrplan 21, il piano di studio della Svizzera tedesca, per esempio Etica, religioni, comunità oppure Natura, uomo, società. Le carte non sostituiscono il piano di studio: danno impulsi per la lezione.",
        },
        {
          q: "È un prodotto ufficiale del quadro di riferimento?",
          a: "No. Questo lavoro si ispira all'Inner Development Guide. I nomi e le descrizioni delle competenze provengono dall'Inner Development Guide 2.0 (versione 7.2). Domande, idee per la lezione e miniesercizi sono stati scritti appositamente per questo sito.",
        },
        {
          q: "Come uso una carta in cinque minuti?",
          a: "Apri una carta, scegli una domanda per te o per la classe e avvia un breve scambio. Se la carta funziona, dietro ci sono idee, collegamenti disciplinari e un miniesercizio.",
        },
      ],
    },

    contact: {
      navLabel: "Contatti",
      title: "Contatti",
      documentTitle: "Contatti — Inner Development Guide in classe",
      description: "Una domanda, una segnalazione o un riscontro su Inner Development Guide in classe — per e-mail a guide@zukunftskompetenzchallenge.ch.",
      lead: "Una domanda sul set di carte, un'osservazione nata in classe o la voglia di condividere la proposta con il collegio docenti: scrivici.",
      body: [
        { t: "p", v: "Il messaggio apre il tuo programma di posta e arriva a [{mail}](mailto:{mail}). Non esiste un account del modulo né un invio attraverso i nostri server." },
      ],
      form: {
        name: "Nome",
        email: "E-mail",
        message: "Messaggio",
        submit: "Invia il messaggio",
        subject: "Messaggio da",
        subjectFallback: "il sito",
      },
    },

    privacy: {
      precedenceNote: "Questa traduzione è fornita a titolo informativo. In caso di divergenza prevale la versione tedesca.",
      navLabel: "Privacy",
      title: "Protezione dei dati",
      documentTitle: "Protezione dei dati — Inner Development Guide in classe",
      description: "Come Inner Development Guide in classe tratta i dati: in locale sul dispositivo, senza account, senza caricamenti.",
      lead: "Questa proposta funziona senza account utente. Ciò che salvi resta sul tuo dispositivo.",
      body: [
        { t: "p", v: "Ultimo aggiornamento: 13 settembre 2026" },
        { t: "h2", v: "Titolare del trattamento" },
        { t: "p", v: "Il titolare del trattamento dei dati su questo sito è la persona che pubblica questa proposta. È raggiungibile tramite la pagina [Contatti](path:contact)." },
        { t: "h2", v: "Che cosa questo sito non fa" },
        { t: "p", v: "Non c'è registrazione, non ci sono cookie di analisi o pubblicitari e non vengono caricate le carte salvate né le impostazioni. L'app e la pagina iniziale non memorizzano nulla sui nostri server." },
        { t: "h2", v: "Dati sul tuo dispositivo" },
        { t: "p", v: "Nella memoria del browser (`localStorage`) possono trovarsi:" },
        { t: "ul", v: [
          "le carte salvate",
          "impostazioni come la lingua o l'ordine",
          "se la breve introduzione è già stata vista",
        ] },
        { t: "p", v: "L'app usa il prefisso di chiave `idg-cards-`, il mazzo della pagina iniziale `idg-demo-`. Provare le carte sulla pagina iniziale non sovrascrive quindi nessuna carta salvata nell'app. Puoi rimuovere queste voci in qualsiasi momento dall'app («Svuota le salvate») oppure cancellando i dati del sito nel browser." },
        { t: "h2", v: "Funzionamento offline" },
        { t: "p", v: "L'app all'indirizzo [/app/](/app/) può registrare un service worker, così le carte restano disponibili in aula anche senza rete. Vengono così depositati file di programma e immagini in una cache di questo browser, non su un server a nostro nome." },
        { t: "h2", v: "Condivisione" },
        { t: "p", v: "Quando condividi una carta, il dispositivo usa la funzione di sistema «Condividi» oppure copia il testo della carta insieme al link negli appunti. Dove il dispositivo lo supporta viene inviata anche un'immagine del fronte della carta. Il link apre esattamente quella carta nell'app. Non riceviamo né il testo né l'immagine e non sappiamo a chi la invii." },
        { t: "h2", v: "Come contattarci" },
        { t: "p", v: "Il modulo della pagina dei contatti apre il tuo programma di posta. Solo quando invii il messaggio la persona che pubblica la proposta riceve nome, indirizzo e-mail e testo, per la via prevista dal tuo fornitore di posta." },
        { t: "h2", v: "Hosting e registri del server" },
        { t: "p", v: "Il sito viene distribuito tramite un fornitore di hosting. Il fornitore può trattare registri tecnici (per esempio momento, indirizzo richiamato, indirizzo IP abbreviato, identificativo del browser) nella misura necessaria a funzionamento, sicurezza e risoluzione dei problemi. Valgono in proposito le indicazioni del fornitore interessato." },
        { t: "h2", v: "Link esterni" },
        { t: "p", v: "Link come quello a [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org) portano a offerte di terzi. Del loro trattamento dei dati sono responsabili i rispettivi gestori." },
        { t: "h2", v: "I tuoi diritti" },
        { t: "p", v: "Nella misura in cui si applica la legge svizzera sulla protezione dei dati, puoi chiedere accesso, rettifica o cancellazione e rivolgere una segnalazione all'Incaricato federale della protezione dei dati e della trasparenza (IFPDT). Poiché le carte salvate e le impostazioni si trovano solo sul tuo dispositivo, il modo più rapido è cancellarle tu stesso. Per tutto ciò che ci raggiunge via e-mail vale la pagina dei contatti." },
      ],
    },

    terms: {
      precedenceNote: "Questa traduzione è fornita a titolo informativo. In caso di divergenza prevale la versione tedesca.",
      navLabel: "Condizioni d'uso",
      title: "Condizioni d'uso",
      documentTitle: "Condizioni d'uso — Inner Development Guide in classe",
      description: "Condizioni per l'utilizzo delle carte di riflessione Inner Development Guide in classe.",
      lead: "Il set di carte è pensato per la lezione. La responsabilità del suo impiego resta tua.",
      body: [
        { t: "p", v: "Ultimo aggiornamento: 13 settembre 2026" },
        { t: "h2", v: "La proposta" },
        { t: "p", v: "«Inner Development Guide in classe» mette a disposizione carte di riflessione sull'Inner Development Guide 2.0: 25 competenze, domande per l'insegnante e per la classe, idee per la lezione e miniesercizi. L'utilizzo è gratuito." },
        { t: "h2", v: "Chi può usarlo" },
        { t: "p", v: "Insegnanti, direzioni scolastiche, team e tutte le persone che vogliono impiegare il set di carte nella formazione e nella formazione continua. L'impiego in aula, nella preparazione delle lezioni e nella formazione di base e continua è consentito." },
        { t: "h2", v: "Non è un prodotto ufficiale del quadro di riferimento" },
        { t: "p", v: "Questo lavoro si ispira all'Inner Development Guide. Non è pubblicato da chi pubblica il quadro di riferimento e non parla a suo nome. I nomi e le descrizioni delle competenze provengono dall'Inner Development Guide 2.0 (versione 7.2). Domande, idee per la lezione, collegamenti disciplinari e miniesercizi provengono da questa proposta." },
        { t: "h2", v: "Contenuti e responsabilità" },
        { t: "p", v: "Le carte sono impulsi, non un piano di studio e non una consulenza. Sei tu a decidere se una domanda o un esercizio è adatto alla tua classe. Non garantiamo completezza, attualità o idoneità a una determinata lezione e non rispondiamo delle decisioni fondate su questa proposta, nella misura in cui la legge lo consente." },
        { t: "h2", v: "Dati sul dispositivo" },
        { t: "p", v: "Le carte salvate e le impostazioni si trovano nel browser di questo dispositivo. Chi condivide il dispositivo condivide anche queste voci. Maggiori informazioni nell'[informativa sulla protezione dei dati](path:privacy)." },
        { t: "h2", v: "Diffusione" },
        { t: "p", v: "Puoi diffondere il link al sito e all'app. Non puoi vendere la proposta stessa come prodotto tuo né rinominarla in modo da dare l'impressione che si tratti del quadro di riferimento ufficiale." },
        { t: "h2", v: "Modifiche" },
        { t: "p", v: "Contenuti, funzioni e queste condizioni possono cambiare. Non sussiste alcun diritto a che la proposta resti invariata o permanentemente raggiungibile." },
        { t: "h2", v: "Contatti" },
        { t: "p", v: "Domande su queste condizioni: [Contatti](path:contact)." },
      ],
    },
  },

  landing: {
    heroTitle: "Dare forma al futuro.",
    heroTitleEm: "In cinque minuti.",
    heroLead: "L'Inner Development Guide 2.0 descrive {n} capacità che ci servono per dare forma al cambiamento. Questo set di carte digitale le traduce nella vita scolastica quotidiana.",
    cta: "Apri l'app",
    deckAria: "Mazzo di carte da provare",

    anatomy: {
      title: "Che cosa c'è su una carta",
      em: "con l'esempio «{skillName}»",
      lead: "Una carta, due lati. Davanti la competenza, dietro le domande — e più in là il materiale per la lezione.",
      front: "Fronte",
      back: "Retro",
      keys: [
        { n: 1, title: "Dimensione", desc: "A quale delle cinque dimensioni appartiene la competenza: il colore della carta lo dice già da lontano." },
        { n: 2, title: "Competenza", desc: "Nome e descrizione, ripresi alla lettera dal quadro di riferimento." },
        { n: 3, desc: "Due domande per te: per la preparazione, per la strada di casa o per il confronto nel team." },
        { n: 4, desc: "Due domande che puoi rivolgere alla classe così come sono. Formulate per la fascia d'età." },
        { n: 5, desc: "{sheetSub} — nell'esempio, il miniesercizio «{exerciseTitle}»." },
      ],
    },

    dims: {
      title: "Cinque dimensioni",
      em: "{n} competenze",
    },

    use: {
      title: "Nella vita scolastica",
      em: "senza preparazione",
      cols: [
        { title: "Una carta, cinque minuti", desc: "Per iniziare una lezione, per l'ora di classe o per la tua preparazione al mattino. Nessun programma, nessuna scaletta: basta una domanda." },
        { title: "Per te e per la classe", desc: "Ogni carta porta entrambe le cose: due domande per te e due che puoi rivolgere alla classe così come sono." },
        { title: "Dall'impulso alla lezione", desc: "Se una carta funziona, dietro c'è di più: idee per la lezione, collegamenti disciplinari e un miniesercizio." },
      ],
    },

    install: {
      title: "Sul dispositivo",
      em: "senza store, senza account",
      heading: "Aggiungi alla schermata iniziale",
      body: "In Safari con «Condividi» e «Aggiungi a Home», in Chrome dal menu con «Installa app». Dopodiché tutto funziona offline. Le carte salvate restano sul dispositivo e non vengono caricate da nessuna parte.",
    },

    noscript: {
      tagline: "25 competenze come carte di riflessione per insegnanti.",
      intro: "L'Inner Development Guide 2.0 descrive 25 capacità interiori in cinque dimensioni: Essere, Pensare, Relazionarsi, Collaborare e Agire. Questo set di carte digitale le traduce nella vita scolastica quotidiana — con domande di riflessione, idee per la lezione e miniesercizi.",
      dimensionsLabel: "Dimensioni:",
    },
  },

  contentPages: {
    skillDescriptionSuffix: "Una carta di riflessione come porta d'ingresso all'Inner Development Guide 2.0 per gli insegnanti.",
    crumbHome: "Pagina iniziale",
    crumbsAriaLabel: 'Percorso di navigazione',
    dimensionPrefix: 'Dimensione',
    dimensionHeading: 'Competenze in «{dimName}»',
    openAppCta: 'Apri le carte di riflessione',
    openCardCta: 'Apri la carta «{skillName}»',
    otherSkillsHeading: 'Altre competenze in «{dimName}»',
  },
}

export default site
