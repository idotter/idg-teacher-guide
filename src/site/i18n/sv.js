/**
 * Webbplatsens texter på svenska (sv). Korttexterna ligger separat i
 * src/content/.
 *
 * Struktur, nyckelnamn och blocktyper är identiska med src/site/i18n/de.js —
 * där finns dokumentationen av blocktyperna, den inbyggda märkningen och
 * platshållarna. Tyskan är den gällande källan; den här filen är en
 * översättning.
 *
 * Regel för märkningen i löptexten: den synliga texten översätts, aldrig
 * målet. `[Kontakt](path:contact)` blir `[Kontakt](path:contact)` — `contact`
 * är en ruttnyckel, inte ett ord. URL:er, localStorage-nycklar och kod inom
 * bakåtcitattecken lämnas orörda.
 */
export const site = {
  lang: 'sv',
  htmlLang: 'sv',
  ogLocale: 'sv_SE',

  chrome: {
    brand: 'Inner Development Guide',
    brandSub: 'i skolvardagen',
    homeAria: 'Till startsidan',
    langAria: 'Språk',
    footerAria: 'Sidfot',
    footerAbout: 'Om projektet',
    footerLegal: 'Juridisk information',
    footerNote: 'Det här arbetet är inspirerat av Inner Development Guide. Mer på',
  },

  notFound: {
    title: 'Sidan hittades inte',
    lead: 'Den här vägen leder ingenstans.',
    backHome: 'Till startsidan',
  },

  pages: {
    home: {
      documentTitle: 'Inner Development Guide i skolvardagen — forma framtiden på fem minuter',
      description: '25 förmågor ur Inner Development Guide 2.0 som digitala reflektionskort för lärare: frågor för dig och din klass, idéer för undervisningen och kopplingar till Lehrplan 21 — utan konto och användbara offline.',
    },

    app: {
      documentTitle: 'Reflektionskort — Inner Development Guide i skolvardagen',
      description: '25 förmågor ur Inner Development Guide 2.0 som reflektionskort för undervisningen — installerbara, offline, utan konto.',
    },

    project: {
      navLabel: 'Projektet',
      title: 'Projektet',
      documentTitle: 'Projektet — Inner Development Guide i skolvardagen',
      description: 'Inner Development Guide 2.0 som reflektionskort för skolvardagen: 25 förmågor, fem dimensioner, utan konto — för lärare i Schweiz.',
      lead: 'En digital kortlek som översätter Inner Development Guide 2.0 till undervisningen: ett kort, en fråga, en ingång.',
      body: [
        { t: 'h2', v: 'Vad det handlar om' },
        { t: 'p', v: 'Inner Development Guide 2.0 beskriver 25 inre förmågor i fem dimensioner: Vara, Tänka, Relatera, Samarbeta och Agera. Det här erbjudandet gör dem gripbara för lärare: som kort som går att vända, spara och behålla offline på enheten.' },
        { t: 'p', v: 'På framsidan står förmågan. På baksidan står två frågor till dig själv och två som du kan ställa till klassen precis som de är — plus idéer för undervisningen, ämneskopplingar och en miniövning.' },
        { t: 'h2', v: 'Utan butik, utan konto' },
        { t: 'p', v: 'Appen körs i webbläsaren och kan läggas på hemskärmen. Sparade kort och inställningar stannar i den här enhetens minne. Det finns ingen inloggning, och ingenting laddas upp till en server.' },
        { t: 'h2', v: 'Skrivet för skolvardagen' },
        { t: 'p', v: 'Förmågornas namn och beskrivningar kommer från Inner Development Guide 2.0 (version 7.2). Reflektionsfrågorna, undervisningsidéerna och miniövningarna är skrivna särskilt för den här appen. På tyska knyter de an till ämnesområdena i Lehrplan 21, läroplanen i den tyskspråkiga delen av Schweiz.' },
        { t: 'p', v: 'Förutom på tyska finns korten på engelska, franska, spanska, italienska och svenska.' },
        { t: 'h2', v: 'De fem dimensionerna' },
        { t: 'dimList' },
        { t: 'h2', v: 'Vanliga frågor' },
        { t: 'faq' },
        { t: 'h2', v: 'Ursprung' },
        { t: 'p', v: 'Det här arbetet är inspirerat av Inner Development Guide. Det är inte en officiell produkt från dem som ger ut ramverket. Mer på [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). Ett besläktat erbjudande är [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch).' },
      ],
      faq: [
        {
          q: 'Vad är Inner Development Guide i skolvardagen?',
          a: 'En kostnadsfri digital kortlek för lärare: 25 förmågor ur Inner Development Guide 2.0 som reflektionskort att vända — med frågor för dig och din klass, undervisningsidéer, kopplingar till Lehrplan 21 och en miniövning.',
        },
        {
          q: 'Kostar det något?',
          a: 'Nej. Användningen är kostnadsfri. Det finns varken något köp i en butik eller någon prenumeration.',
        },
        {
          q: 'Behöver jag ett konto?',
          a: 'Nej. Det finns ingen inloggning. Sparade kort och inställningar stannar bara på din enhet.',
        },
        {
          q: 'Hur hänger det ihop med Lehrplan 21?',
          a: 'De tyska korten knyter an till ämnesområden i Lehrplan 21, läroplanen i den tyskspråkiga delen av Schweiz — till exempel Etik, religioner, gemenskap eller Natur, människa, samhälle. Korten ersätter inte läroplanen; de ger impulser till undervisningen.',
        },
        {
          q: 'Är det här en officiell produkt från ramverket?',
          a: 'Nej. Det här arbetet är inspirerat av Inner Development Guide. Förmågornas namn och beskrivningar kommer från Inner Development Guide 2.0 (version 7.2). Frågor, undervisningsidéer och miniövningar är skrivna särskilt för den här webbplatsen.',
        },
        {
          q: 'Hur använder jag ett kort på fem minuter?',
          a: 'Öppna ett kort, välj en fråga till dig själv eller till klassen och inled ett kort samtal. Om kortet bär finns det idéer, ämneskopplingar och en miniövning bakom det.',
        },
      ],
    },

    contact: {
      navLabel: 'Kontakt',
      title: 'Kontakt',
      documentTitle: 'Kontakt — Inner Development Guide i skolvardagen',
      description: 'En fråga, ett tips eller en återkoppling om Inner Development Guide i skolvardagen — via e-post till guide@zukunftskompetenzchallenge.ch.',
      lead: 'En fråga om kortleken, en iakttagelse från undervisningen eller en önskan att dela erbjudandet i kollegiet — skriv till oss.',
      body: [
        { t: 'p', v: 'Meddelandet öppnar ditt eget e-postprogram och går till [{mail}](mailto:{mail}). Det finns varken något formulärkonto eller något utskick via våra servrar.' },
      ],
      form: {
        name: 'Namn',
        email: 'E-post',
        message: 'Meddelande',
        submit: 'Skicka meddelandet',
        subject: 'Meddelande från',
        subjectFallback: 'webbplatsen',
      },
    },

    privacy: {
      precedenceNote: 'Denna översättning tillhandahålls i informationssyfte. Vid avvikelser gäller den tyska versionen.',
      navLabel: 'Integritet',
      title: 'Dataskydd',
      documentTitle: 'Dataskydd — Inner Development Guide i skolvardagen',
      description: 'Så behandlar Inner Development Guide i skolvardagen data: lokalt på enheten, utan konto, utan uppladdning.',
      lead: 'Det här erbjudandet fungerar utan användarkonto. Det du sparar stannar på din enhet.',
      body: [
        { t: 'p', v: 'Uppdaterad: 13 september 2026' },
        { t: 'h2', v: 'Personuppgiftsansvarig' },
        { t: 'p', v: 'Ansvarig för databehandlingen på den här webbplatsen är den person som ger ut erbjudandet. Den personen nås via sidan [Kontakt](path:contact).' },
        { t: 'h2', v: 'Vad den här webbplatsen inte gör' },
        { t: 'p', v: 'Det finns ingen registrering, inga analys- eller reklamcookies och ingen uppladdning av sparade kort eller inställningar. Appen och startsidan lagrar ingenting på våra servrar.' },
        { t: 'h2', v: 'Data på din enhet' },
        { t: 'p', v: 'I webbläsarens minne (`localStorage`) kan följande ligga:' },
        { t: 'ul', v: [
          'sparade kort',
          'inställningar som språk eller ordning',
          'om den korta introduktionen redan har visats',
        ] },
        { t: 'p', v: 'Appen använder nyckelprefixet `idg-cards-`, kortleken på startsidan `idg-demo-`. Att prova korten på startsidan skriver därför inte över några sparade kort i appen. Du kan när som helst ta bort de här posterna via appen (”Töm sparade”) eller genom att radera webbplatsdata i din webbläsare.' },
        { t: 'h2', v: 'Offlineanvändning' },
        { t: 'p', v: 'Appen på [/app/](/app/) kan registrera en service worker så att korten är tillgängliga i klassrummet även utan nät. Programfiler och bilder läggs då i en cache i den här webbläsaren — inte på en server i vårt namn.' },
        { t: 'h2', v: 'Dela' },
        { t: 'p', v: 'När du delar ett kort använder enheten systemfunktionen ”Dela” eller kopierar korttexten tillsammans med länken till urklipp. Där enheten stöder det skickas också en bild av kortets framsida med. Länken öppnar exakt det kortet i appen. Vi tar emot varken texten eller bilden och får inte veta vem du skickar den till.' },
        { t: 'h2', v: 'Att ta kontakt' },
        { t: 'p', v: 'Formuläret på kontaktsidan öppnar ditt eget e-postprogram. Först när du skickar meddelandet får den utgivande personen ditt namn, din e-postadress och din text — på den väg som din e-postleverantör erbjuder.' },
        { t: 'h2', v: 'Webbhotell och serverloggar' },
        { t: 'p', v: 'Webbplatsen levereras via ett webbhotell. Webbhotellet kan behandla tekniska loggar (till exempel tidpunkt, anropad adress, förkortad IP-adress, webbläsarkännetecken) i den mån det behövs för drift, säkerhet och felsökning. För detta gäller uppgifterna från respektive webbhotell.' },
        { t: 'h2', v: 'Externa länkar' },
        { t: 'p', v: 'Länkar, till exempel till [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org), leder till tredje parts erbjudanden. För deras databehandling ansvarar respektive aktör.' },
        { t: 'h2', v: 'Dina rättigheter' },
        { t: 'p', v: 'I den mån den schweiziska dataskyddslagen gäller kan du begära tillgång till, rättelse av eller radering av dina uppgifter och vända dig till Federala dataskydds- och offentlighetsombudsmannen (EDÖB). Eftersom sparade kort och inställningar bara ligger på din enhet raderar du dem snabbast själv. För allt som når oss via e-post gäller kontaktsidan.' },
      ],
    },

    terms: {
      precedenceNote: 'Denna översättning tillhandahålls i informationssyfte. Vid avvikelser gäller den tyska versionen.',
      navLabel: 'Användarvillkor',
      title: 'Användarvillkor',
      documentTitle: 'Användarvillkor — Inner Development Guide i skolvardagen',
      description: 'Villkor för användningen av reflektionskorten Inner Development Guide i skolvardagen.',
      lead: 'Kortleken är tänkt för undervisningen. Ansvaret för hur den används ligger hos dig.',
      body: [
        { t: 'p', v: 'Uppdaterad: 13 september 2026' },
        { t: 'h2', v: 'Erbjudandet' },
        { t: 'p', v: '”Inner Development Guide i skolvardagen” tillhandahåller reflektionskort till Inner Development Guide 2.0: 25 förmågor, frågor för läraren och för klassen, idéer för undervisningen och miniövningar. Användningen är kostnadsfri.' },
        { t: 'h2', v: 'Vem som får använda det' },
        { t: 'p', v: 'Lärare, skolledningar, arbetslag och alla som vill använda kortleken i utbildning och fortbildning. Användning i klassrummet, i planeringen och i grund- och fortbildning är tillåten.' },
        { t: 'h2', v: 'Ingen officiell produkt från ramverket' },
        { t: 'p', v: 'Det här arbetet är inspirerat av Inner Development Guide. Det ges inte ut av dem som ger ut ramverket och talar inte i deras namn. Förmågornas namn och beskrivningar kommer från Inner Development Guide 2.0 (version 7.2). Frågor, undervisningsidéer, ämneskopplingar och miniövningar kommer från det här erbjudandet.' },
        { t: 'h2', v: 'Innehåll och ansvar' },
        { t: 'p', v: 'Korten är impulser, ingen läroplan och ingen rådgivning. Du avgör själv om en fråga eller en övning passar din klass. Vi lämnar ingen garanti för fullständighet, aktualitet eller lämplighet i en viss undervisning och ansvarar inte för beslut som grundar sig på det här erbjudandet — i den mån lagen tillåter det.' },
        { t: 'h2', v: 'Data på enheten' },
        { t: 'p', v: 'Sparade kort och inställningar ligger i den här enhetens webbläsare. Den som delar enheten delar också de posterna. Mer om det i [integritetspolicyn](path:privacy).' },
        { t: 'h2', v: 'Vidarespridning' },
        { t: 'p', v: 'Du får sprida länken till webbplatsen och appen vidare. Du får inte sälja själva erbjudandet som din egen produkt eller döpa om det så att intrycket uppstår att det är det officiella ramverket.' },
        { t: 'h2', v: 'Ändringar' },
        { t: 'p', v: 'Innehåll, funktioner och de här villkoren kan ändras. Det finns ingen rätt att kräva att erbjudandet förblir oförändrat eller varaktigt tillgängligt.' },
        { t: 'h2', v: 'Kontakt' },
        { t: 'p', v: 'Frågor om de här villkoren: [Kontakt](path:contact).' },
      ],
    },
  },

  landing: {
    heroTitle: 'Forma framtiden.',
    heroTitleEm: 'På fem minuter.',
    heroLead: 'Inner Development Guide 2.0 beskriver {n} förmågor som vi behöver för att kunna forma förändring. Den här digitala kortleken översätter dem till skolvardagen.',
    cta: 'Öppna appen',
    deckAria: 'Kortlek att prova',

    anatomy: {
      title: 'Vad som står på ett kort',
      em: 'med exemplet ”{skillName}”',
      lead: 'Ett kort, två sidor. Förmågan på framsidan, frågorna på baksidan — och bakom dem materialet för lektionen.',
      front: 'Framsida',
      back: 'Baksida',
      keys: [
        { n: 1, title: 'Dimension', desc: 'Vilken av de fem dimensionerna förmågan hör till — kortets färg säger det redan på håll.' },
        { n: 2, title: 'Förmåga', desc: 'Namn och beskrivning, ordagrant hämtade från ramverket.' },
        { n: 3, desc: 'Två frågor till dig själv — för planeringen, för vägen hem eller för samtalet i arbetslaget.' },
        { n: 4, desc: 'Två frågor som du kan ställa till klassen precis som de är. Formulerade för åldersgruppen.' },
        { n: 5, desc: '{sheetSub} — i exemplet till exempel miniövningen ”{exerciseTitle}”.' },
      ],
    },

    dims: {
      title: 'Fem dimensioner',
      em: '{n} förmågor',
    },

    use: {
      title: 'I skolvardagen',
      em: 'utan förberedelse',
      cols: [
        { title: 'Ett kort, fem minuter', desc: 'För att inleda en lektion, för klassens tid eller för din egen planering på morgonen. Inget program, ingen körplan — en fråga räcker.' },
        { title: 'För dig och för klassen', desc: 'Varje kort bär båda delarna: två frågor till dig själv och två som du kan ställa till klassen precis som de är.' },
        { title: 'Från impuls till lektion', desc: 'När ett kort bär finns det mer bakom det: undervisningsidéer, ämneskopplingar och en miniövning.' },
      ],
    },

    install: {
      title: 'På enheten',
      em: 'utan butik, utan konto',
      heading: 'Lägg till på hemskärmen',
      body: 'I Safari via ”Dela” och ”Lägg till på hemskärmen”, i Chrome via menyn och ”Installera app”. Därefter fungerar allt offline. Sparade kort stannar på enheten och laddas inte upp någonstans.',
    },

    noscript: {
      tagline: '25 förmågor som reflektionskort för lärare.',
      intro: 'Inner Development Guide 2.0 beskriver 25 inre förmågor i fem dimensioner: Vara, Tänka, Relatera, Samarbeta och Agera. Den här digitala kortleken översätter dem till skolvardagen — med reflektionsfrågor, idéer för undervisningen och miniövningar.',
      dimensionsLabel: 'Dimensioner:',
    },
  },

  contentPages: {
    skillDescriptionSuffix: 'Ett reflektionskort som ingång till Inner Development Guide 2.0 för lärare.',
    crumbHome: 'Startsida',
    crumbsAriaLabel: 'Brödsmulor',
    dimensionPrefix: 'Dimension',
    dimensionHeading: 'Förmågor inom ”{dimName}”',
    openAppCta: 'Öppna reflektionskorten',
    openCardCta: 'Öppna kortet ”{skillName}”',
    otherSkillsHeading: 'Fler förmågor inom ”{dimName}”',
  },

  // Strukturerad data (JSON-LD) — se kommentaren i i18n/de.js. `keywords`
  // utelämnar medvetet ”Lehrplan 21”: brödtexten på samma förmågesidor
  // begränsar den kopplingen till tyska (se `educationalFramework` i
  // seo/meta.js), ett nyckelord här skulle motsäga det.
  seo: {
    audienceType: 'Lärare i Schweiz',
    keywords: 'Inner Development Guide, Inner Development Goals, IDG, reflektionskort, undervisning, lärare, framtidskompetenser',
    featureList: [
      '25 reflektionskort om förmågor ur Inner Development Guide',
      'Frågor för läraren och för klassen',
      'Undervisningsidéer och miniövningar',
      'Fungerar offline som en installerbar webbapp',
      'Sex språk: tyska, engelska, franska, spanska, italienska och svenska',
    ],
  },
}

export default site
