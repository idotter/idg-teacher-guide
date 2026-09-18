/**
 * Website texts in English (en). Card texts live separately in src/content/.
 *
 * Structure, key names and block types are identical to src/site/i18n/de.js —
 * the documentation of the block types, the inline markup and the placeholders
 * is there. German is the authoritative source; this file is a translation.
 *
 * Rule for the inline markup: the visible text is translated, the target never
 * is. `[Kontakt](path:contact)` becomes `[Contact](path:contact)` — `contact`
 * is a route key, not a word. URLs, localStorage keys and code in backticks
 * stay untouched.
 */
export const site = {
  lang: 'en',
  htmlLang: 'en',
  ogLocale: 'en_GB',

  chrome: {
    brand: 'Inner Development Guide',
    brandSub: 'in the classroom',
    homeAria: 'To the home page',
    langAria: 'Language',
    footerAria: 'Footer',
    footerAbout: 'About the project',
    footerLegal: 'Legal',
    footerNote: 'This work is inspired by the Inner Development Guide. More at',
  },

  notFound: {
    title: 'Page not found',
    lead: 'This path leads nowhere.',
    backHome: 'To the home page',
  },

  pages: {
    home: {
      documentTitle: 'Inner Development Guide in the classroom — shape the future in five minutes',
      description: '25 skills from the Inner Development Guide 2.0 as digital reflection cards for teachers: questions for you and your class, ideas for the classroom and links to Lehrplan 21, the curriculum of German-speaking Switzerland — no account, works offline.',
    },

    app: {
      documentTitle: 'IDG Guide for teachers',
      description: '25 skills from the Inner Development Guide 2.0 as reflection cards for the classroom — installable, offline, no account.',
    },

    project: {
      navLabel: 'The project',
      title: 'The project',
      documentTitle: 'The project — Inner Development Guide in the classroom',
      description: 'The Inner Development Guide 2.0 as reflection cards for everyday school life: 25 skills, five dimensions, no account — for teachers in Switzerland.',
      lead: 'A digital card set that translates the Inner Development Guide 2.0 into the classroom — one card, one question, one way in.',
      body: [
        { t: 'h2', v: 'What this is about' },
        { t: 'p', v: 'The Inner Development Guide 2.0 describes 25 inner abilities in five dimensions: Being, Thinking, Relating, Collaborating and Acting. This offering makes them tangible for teachers: as cards you can flip, save and keep on your device offline.' },
        { t: 'p', v: 'The front shows the skill. The back holds two questions for yourself and two you can put to the class word for word — plus ideas for the classroom, subject links and a mini-exercise.' },
        { t: 'h2', v: 'No store, no account' },
        { t: 'p', v: 'The app runs in the browser and can be added to the home screen. Saved cards and settings stay in the storage of this device. There is no sign-in, and nothing is uploaded to a server.' },
        { t: 'h2', v: 'Written for everyday school life' },
        { t: 'p', v: 'The names and descriptions of the skills come from the Inner Development Guide 2.0 (version 7.2). The reflection questions, classroom ideas and mini-exercises were written specifically for this app. In German they link to the subject areas of Lehrplan 21, the curriculum of German-speaking Switzerland.' },
        { t: 'p', v: 'Besides German, the cards are available in English, French, Spanish, Italian and Swedish.' },
        { t: 'h2', v: 'The five dimensions' },
        { t: 'dimList' },
        { t: 'h2', v: 'Frequently asked questions' },
        { t: 'faq' },
        { t: 'h2', v: 'Origin' },
        { t: 'p', v: 'This work is inspired by the Inner Development Guide. It is not an official product of the publishers of the framework. More at [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). A related offering is the [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch).' },
      ],
      faq: [
        {
          q: 'What is Inner Development Guide in the classroom?',
          a: 'A free digital card set for teachers: 25 skills from the Inner Development Guide 2.0 as reflection cards you can flip — with questions for you and your class, classroom ideas, links to Lehrplan 21 and a mini-exercise.',
        },
        {
          q: 'Does it cost anything?',
          a: 'No. Use is free of charge. There is no store purchase and no subscription.',
        },
        {
          q: 'Do I need an account?',
          a: 'No. There is no sign-in. Saved cards and settings stay on your device only.',
        },
        {
          q: 'How does this relate to Lehrplan 21?',
          a: 'The German cards link to subject areas of Lehrplan 21, the curriculum of German-speaking Switzerland — for example Ethics, Religions, Community or Nature, People, Society. The cards do not replace the curriculum; they offer impulses for the classroom.',
        },
        {
          q: 'Is this an official product of the framework?',
          a: 'No. This offering is inspired by the Inner Development Guide. Names and descriptions of the skills come from the Inner Development Guide 2.0 (version 7.2). Questions, classroom ideas and mini-exercises were written specifically for this website.',
        },
        {
          q: 'How do I use a card in five minutes?',
          a: 'Open a card, choose a question for yourself or for the class, and start a short conversation. If the card works, behind it there are ideas, subject links and a mini-exercise.',
        },
      ],
    },

    contact: {
      navLabel: 'Contact',
      title: 'Contact',
      documentTitle: 'Contact — Inner Development Guide in the classroom',
      description: 'A question, a tip or feedback on Inner Development Guide in the classroom — by email to guide@zukunftskompetenzchallenge.ch.',
      lead: 'A question about the card set, an observation from your lessons or the wish to share this with your team — write to us.',
      body: [
        { t: 'p', v: 'The message opens your own mail program and goes to [{mail}](mailto:{mail}). There is no form account and no delivery through our servers.' },
      ],
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Message',
        submit: 'Send message',
        subject: 'Message from',
        subjectFallback: 'the website',
      },
    },

    privacy: {
      precedenceNote: 'This is a translation for convenience. In case of any discrepancy, the German version prevails.',
      navLabel: 'Privacy',
      title: 'Privacy',
      documentTitle: 'Privacy — Inner Development Guide in the classroom',
      description: 'How Inner Development Guide in the classroom processes data: locally on the device, without an account, without upload.',
      lead: 'This offering works without a user account. What you save stays on your device.',
      body: [
        { t: 'p', v: 'Last updated: 18 September 2026' },
        { t: 'h2', v: 'Controller' },
        { t: 'p', v: 'The person publishing this offering is responsible for the processing of data on this website, and can be reached via the [Contact](path:contact) page.' },
        { t: 'h2', v: 'What this website does not do' },
        { t: 'p', v: 'There is no registration, there are no analytics or advertising cookies, and saved cards and settings are not uploaded. The app and the landing page store nothing of yours on our servers. The only thing we keep is an anonymous usage statistic with no personal reference, see below.' },
        { t: 'h2', v: 'Data on your device' },
        { t: 'p', v: 'The following may be held in the browser storage (`localStorage`):' },
        { t: 'ul', v: [
          'saved cards',
          'settings such as language or order',
          'whether the short introduction has already been seen',
        ] },
        { t: 'p', v: 'The app uses the key prefix `idg-cards-`, the deck on the home page uses `idg-demo-`. Trying out the cards on the home page therefore does not overwrite any saved cards in the app. You can remove these entries at any time through the app (“Clear saved cards”) or by deleting the website data in your browser.' },
        { t: 'h2', v: 'Offline use' },
        { t: 'p', v: 'The app at [/app/](/app/) can register a service worker so that cards are available in the classroom even without a network connection. Program files and images are stored in a cache of this browser — not on a server under our name.' },
        { t: 'h2', v: 'Sharing' },
        { t: 'p', v: 'When you share a card, the device uses the system “Share” function or copies the card text together with the link to the clipboard. Where the device supports it, an image of the card front is sent along as well. The link opens exactly this card in the app. We receive neither the text nor the image, and we do not learn whom you send it to.' },
        { t: 'h2', v: 'Getting in touch' },
        { t: 'p', v: 'The form on the contact page opens your own mail program. Only when you send the message does the publishing person receive your name, email address and text — by the route your mail provider provides.' },
        { t: 'h2', v: 'Anonymous usage statistics' },
        { t: 'p', v: 'To know whether this offer is being used, we count page views and two events in the app: when a card is flipped and when “In the classroom” is opened, each with card and language. For this we use Web Analytics from our host Vercel Inc. (USA). No cookies are set and nothing is stored in your browser. Transmitted are the time, the address requested without parameters, the referring page, country and region, operating system, browser and device type. The IP address is not stored; visits are grouped for 24 hours only, using a hash derived from the request. We only ever see totals and cannot recognise anyone. Details: [Vercel Web Analytics privacy](https://vercel.com/docs/analytics/privacy-policy).' },
        { t: 'h2', v: 'Hosting and server logs' },
        { t: 'p', v: 'The website is delivered through the web host Vercel Inc. (USA). The host may process technical logs (such as time, address requested, shortened IP address, browser identification) as far as this is necessary for operation, security and troubleshooting. The information provided by the respective host applies to this.' },
        { t: 'h2', v: 'External links' },
        { t: 'p', v: 'Links such as the one to [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org) lead to third-party offerings. The respective operators are responsible for their data processing.' },
        { t: 'h2', v: 'Your rights' },
        { t: 'p', v: 'As far as Swiss data protection law applies, you can request information, correction or deletion and can file a report with the Federal Data Protection and Information Commissioner (FDPIC). Because saved cards and settings are held on your device only, the quickest way to delete them is to do it yourself. For everything that reaches us by email, the contact page applies.' },
      ],
    },

    terms: {
      precedenceNote: 'This is a translation for convenience. In case of any discrepancy, the German version prevails.',
      navLabel: 'Terms of use',
      title: 'Terms of use',
      documentTitle: 'Terms of use — Inner Development Guide in the classroom',
      description: 'Conditions for using the reflection cards Inner Development Guide in the classroom.',
      lead: 'The card set is intended for the classroom. Responsibility for how it is used remains with you.',
      body: [
        { t: 'p', v: 'Last updated: 13 September 2026' },
        { t: 'h2', v: 'The offering' },
        { t: 'p', v: '“Inner Development Guide in the classroom” provides reflection cards on the Inner Development Guide 2.0: 25 skills, questions for the teacher and for the class, ideas for the classroom and mini-exercises. Use is free of charge.' },
        { t: 'h2', v: 'Who may use it' },
        { t: 'p', v: 'Teachers, school management, teams and everyone who wants to use the card set in education and continuing education. Use in the classroom, in lesson preparation and in initial and continuing teacher training is permitted.' },
        { t: 'h2', v: 'Not an official framework product' },
        { t: 'p', v: 'This offering is inspired by the Inner Development Guide. It is not published by the publishers of the framework and does not speak on their behalf. Names and descriptions of the skills come from the Inner Development Guide 2.0 (version 7.2). Questions, classroom ideas, subject links and mini-exercises come from this offering.' },
        { t: 'h2', v: 'Content and liability' },
        { t: 'p', v: 'The cards are impulses, not a curriculum and not advice. Whether a question or an exercise suits your class is for you to decide. We give no warranty as to completeness, currency or suitability for any particular lesson, and we are not liable for decisions based on this offering — as far as the law permits.' },
        { t: 'h2', v: 'Data on the device' },
        { t: 'p', v: 'Saved cards and settings are held in the browser of this device. Whoever shares the device also shares these entries. More on this in the [privacy policy](path:privacy).' },
        { t: 'h2', v: 'Passing it on' },
        { t: 'p', v: 'You may pass on the link to the website and the app. You may not sell the offering itself as your own product or rename it in such a way that the impression arises that it is the official framework.' },
        { t: 'h2', v: 'Changes' },
        { t: 'p', v: 'Content, features and these terms may change. There is no entitlement to the offering remaining unchanged or permanently available.' },
        { t: 'h2', v: 'Contact' },
        { t: 'p', v: 'Questions about these terms: [Contact](path:contact).' },
      ],
    },
  },

  landing: {
    heroTitle: 'Shape the future.',
    heroTitleEm: 'In five minutes.',
    heroLead: 'The Inner Development Guide 2.0 describes {n} abilities we need in order to shape change. This digital card set translates them into everyday school life.',
    cta: 'Open the app',
    deckAria: 'Card deck to try out',

    anatomy: {
      title: 'What is on a card',
      em: 'taking “{skillName}” as an example',
      lead: 'One card, two sides. The skill on the front, the questions on the back — and behind them the material for the lesson.',
      front: 'Front',
      back: 'Back',
      keys: [
        { n: 1, title: 'Dimension', desc: 'Which of the five dimensions the skill belongs to — the colour of the card says so from across the room.' },
        { n: 2, title: 'Skill', desc: 'Name and description, taken word for word from the framework.' },
        { n: 3, desc: 'Two questions for yourself — for lesson preparation, the way home or a conversation in the team.' },
        { n: 4, desc: 'Two questions you can put to the class word for word. Phrased for the age group.' },
        { n: 5, desc: '{sheetSub} — in this example the mini-exercise “{exerciseTitle}”.' },
      ],
    },

    dims: {
      title: 'Five dimensions',
      em: '{n} skills',
    },

    use: {
      title: 'In everyday school life',
      em: 'without preparation',
      cols: [
        { title: 'One card, five minutes', desc: 'For the start of a lesson, the class period or your own preparation in the morning. No programme, no schedule — one question is enough.' },
        { title: 'For you and for the class', desc: 'Every card carries both: two questions for yourself and two you can put to the class word for word.' },
        { title: 'From impulse to lesson', desc: 'When a card works, there is more behind it: classroom ideas, subject links and a mini-exercise.' },
      ],
    },

    install: {
      title: 'On the device',
      em: 'no store, no account',
      heading: 'Add to the home screen',
      body: 'In Safari via “Share” and “Add to Home Screen”, in Chrome via the menu and “Install app”. After that everything runs offline. Saved cards stay on the device and are not uploaded anywhere.',
    },

    noscript: {
      tagline: '25 skills as reflection cards for teachers.',
      intro: 'The Inner Development Guide 2.0 describes 25 inner abilities in five dimensions: Being, Thinking, Relating, Collaborating and Acting. This digital card set translates them into everyday school life — with reflection questions, classroom ideas and mini-exercises.',
      dimensionsLabel: 'Dimensions:',
    },
  },

  contentPages: {
    skillDescriptionSuffix: 'A reflection card as a way into the Inner Development Guide 2.0 for teachers.',
    crumbHome: 'Home',
    crumbsAriaLabel: 'Breadcrumb',
    dimensionPrefix: 'Dimension',
    dimensionHeading: 'Skills in “{dimName}”',
    openAppCta: 'Open the reflection cards',
    openCardCta: 'Open the “{skillName}” card',
    otherSkillsHeading: 'More skills in “{dimName}”',
  },
}

export default site
