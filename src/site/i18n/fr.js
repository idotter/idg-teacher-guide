/**
 * Textes du site en français (fr). Les textes des cartes sont séparés, dans
 * src/content/.
 *
 * La structure, les noms de clés et les types de blocs sont identiques à
 * src/site/i18n/de.js — la documentation des types de blocs, du balisage en
 * ligne et des variables se trouve là-bas. L'allemand fait foi ; ce fichier
 * est une traduction.
 *
 * Règle pour le balisage en ligne : le texte visible est traduit, jamais la
 * cible. `[Kontakt](path:contact)` devient `[Contact](path:contact)` —
 * `contact` est une clé de route, pas un mot. Les URL, les clés localStorage
 * et le code entre accents graves restent inchangés.
 *
 * Les chaînes sont entre guillemets doubles : le français est riche en
 * apostrophes.
 */
export const site = {
  lang: "fr",
  htmlLang: "fr",
  ogLocale: "fr_CH",

  chrome: {
    brand: "Inner Development Guide",
    brandSub: "en classe",
    homeAria: "Vers la page d'accueil",
    langAria: "Langue",
    footerAria: "Pied de page",
    footerAbout: "À propos du projet",
    footerLegal: "Mentions légales",
    footerNote: "Ce travail s'inspire du Inner Development Guide. Plus d'informations sur",
  },

  notFound: {
    title: "Page introuvable",
    lead: "Ce chemin ne mène nulle part.",
    backHome: "Vers la page d'accueil",
  },

  pages: {
    home: {
      documentTitle: "Inner Development Guide en classe — façonner l'avenir en cinq minutes",
      description: "25 capacités du Inner Development Guide 2.0 sous forme de cartes de réflexion numériques pour les enseignantes et enseignants : des questions pour vous et pour votre classe, des idées pour le cours et des liens avec le Lehrplan 21 — sans compte, utilisable hors ligne.",
    },

    app: {
      documentTitle: "Cartes de réflexion — Inner Development Guide en classe",
      description: "25 capacités du Inner Development Guide 2.0 sous forme de cartes de réflexion pour le cours — installable, hors ligne, sans compte.",
    },

    project: {
      navLabel: "Le projet",
      title: "Le projet",
      documentTitle: "Le projet — Inner Development Guide en classe",
      description: "Le Inner Development Guide 2.0 sous forme de cartes de réflexion pour le quotidien scolaire : 25 capacités, cinq dimensions, sans compte — pour les enseignantes et enseignants en Suisse.",
      lead: "Un jeu de cartes numérique qui traduit le Inner Development Guide 2.0 dans le quotidien de la classe — une carte, une question, une porte d'entrée.",
      body: [
        { t: "h2", v: "De quoi il s'agit" },
        { t: "p", v: "Le Inner Development Guide 2.0 décrit 25 capacités intérieures réparties en cinq dimensions : Être, Penser, Interagir, Coopérer et Agir. Cette offre les rend concrètes pour les enseignantes et enseignants : sous forme de cartes que l'on retourne, que l'on garde et qui restent hors ligne sur l'appareil." },
        { t: "p", v: "Au recto, la capacité. Au verso, deux questions pour vous-même et deux que vous pouvez poser telles quelles à la classe — plus des idées pour le cours, des liens disciplinaires et un mini-exercice." },
        { t: "h2", v: "Sans store, sans compte" },
        { t: "p", v: "L'application fonctionne dans le navigateur et peut être ajoutée à l'écran d'accueil. Les cartes gardées et les réglages restent dans la mémoire de cet appareil. Il n'y a pas d'inscription et rien n'est téléversé sur un serveur." },
        { t: "h2", v: "Écrit pour le quotidien scolaire" },
        { t: "p", v: "Les noms et les descriptions des capacités proviennent du Inner Development Guide 2.0 (version 7.2). Les questions de réflexion, les idées pour le cours et les mini-exercices ont été rédigés spécialement pour cette application. En allemand, ils renvoient aux domaines disciplinaires du Lehrplan 21, le plan d'études suisse alémanique." },
        { t: "p", v: "Outre l'allemand, les cartes existent en anglais, en français, en espagnol, en italien et en suédois." },
        { t: "h2", v: "Les cinq dimensions" },
        { t: "dimList" },
        { t: "h2", v: "Questions fréquentes" },
        { t: "faq" },
        { t: "h2", v: "Origine" },
        { t: "p", v: "Ce travail s'inspire du Inner Development Guide. Il n'est pas un produit officiel des éditrices et éditeurs du cadre de référence. Plus d'informations sur [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). Une offre apparentée est la [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch)." },
      ],
      faq: [
        {
          q: "Qu'est-ce que Inner Development Guide en classe ?",
          a: "Un jeu de cartes numérique et gratuit pour les enseignantes et enseignants : 25 capacités du Inner Development Guide 2.0 sous forme de cartes de réflexion que l'on retourne — avec des questions pour vous et pour votre classe, des idées pour le cours, des liens avec le Lehrplan 21 et un mini-exercice.",
        },
        {
          q: "L'offre est-elle payante ?",
          a: "Non. L'utilisation est gratuite. Il n'y a ni achat sur un store ni abonnement.",
        },
        {
          q: "Ai-je besoin d'un compte ?",
          a: "Non. Il n'y a pas d'inscription. Les cartes gardées et les réglages restent uniquement sur votre appareil.",
        },
        {
          q: "Quel est le lien avec le Lehrplan 21 ?",
          a: "Les cartes allemandes renvoient à des domaines disciplinaires du Lehrplan 21 — par exemple Éthique, religions, communauté ou Nature, être humain, société. Les cartes ne remplacent pas le plan d'études ; elles donnent des impulsions pour le cours.",
        },
        {
          q: "Est-ce un produit officiel du cadre de référence ?",
          a: "Non. Ce travail s'inspire du Inner Development Guide. Les noms et les descriptions des capacités proviennent du Inner Development Guide 2.0 (version 7.2). Les questions, les idées pour le cours et les mini-exercices ont été écrits spécialement pour ce site.",
        },
        {
          q: "Comment utiliser une carte en cinq minutes ?",
          a: "Ouvrir une carte, choisir une question pour vous-même ou pour la classe, engager brièvement la discussion. Si la carte porte, il y a derrière elle des idées, des liens disciplinaires et un mini-exercice.",
        },
      ],
    },

    contact: {
      navLabel: "Contact",
      title: "Contact",
      documentTitle: "Contact — Inner Development Guide en classe",
      description: "Une question, une remarque ou un retour sur Inner Development Guide en classe — par courriel à guide@zukunftskompetenzchallenge.ch.",
      lead: "Une question sur le jeu de cartes, une observation faite en classe ou l'envie de partager l'offre dans votre équipe — écrivez-nous.",
      body: [
        { t: "p", v: "Le message ouvre votre programme de messagerie et part à [{mail}](mailto:{mail}). Il n'y a pas de compte de formulaire ni d'envoi par nos serveurs." },
      ],
      form: {
        name: "Nom",
        email: "Courriel",
        message: "Message",
        submit: "Envoyer le message",
        subject: "Message de",
        subjectFallback: "le site",
      },
    },

    privacy: {
      precedenceNote: "Cette traduction est fournie à titre indicatif. En cas de divergence, la version allemande fait foi.",
      navLabel: "Confidentialité",
      title: "Protection des données",
      documentTitle: "Protection des données — Inner Development Guide en classe",
      description: "Comment Inner Development Guide en classe traite les données : localement sur l'appareil, sans compte, sans téléversement.",
      lead: "Cette offre fonctionne sans compte d'utilisateur. Ce que vous gardez reste sur votre appareil.",
      body: [
        { t: "p", v: "Mise à jour : 13 septembre 2026" },
        { t: "h2", v: "Responsable du traitement" },
        { t: "p", v: "La personne qui édite cette offre est responsable du traitement des données sur ce site. Elle est joignable via la page [Contact](path:contact)." },
        { t: "h2", v: "Ce que ce site ne fait pas" },
        { t: "p", v: "Il n'y a pas d'inscription, pas de cookies d'analyse ou de publicité et aucun téléversement des favoris ou des réglages. L'application et la page d'accueil n'enregistrent rien sur nos serveurs." },
        { t: "h2", v: "Données sur votre appareil" },
        { t: "p", v: "La mémoire du navigateur (`localStorage`) peut contenir :" },
        { t: "ul", v: [
          "les cartes gardées",
          "des réglages comme la langue ou l'ordre",
          "si la courte introduction a déjà été vue",
        ] },
        { t: "p", v: "L'application utilise le préfixe de clé `idg-cards-`, le jeu de la page d'accueil `idg-demo-`. Essayer les cartes sur la page d'accueil n'écrase donc aucun favori dans l'application. Vous pouvez supprimer ces entrées à tout moment via l'application (« Vider les favoris ») ou en effaçant les données du site dans votre navigateur." },
        { t: "h2", v: "Fonctionnement hors ligne" },
        { t: "p", v: "L'application sous [/app/](/app/) peut enregistrer un service worker afin que les cartes soient disponibles en classe même sans réseau. Des fichiers de programme et des images sont alors déposés dans un cache de ce navigateur — pas sur un serveur à notre nom." },
        { t: "h2", v: "Partage" },
        { t: "p", v: "Lorsque vous partagez une carte, l'appareil utilise la fonction système « Partager » ou copie le texte de la carte et le lien dans le presse-papiers. Là où l'appareil le permet, une image du recto de la carte est également jointe. Le lien ouvre exactement cette carte dans l'application. Nous ne recevons ni le texte ni l'image et nous ne savons pas à qui vous les envoyez." },
        { t: "h2", v: "Prise de contact" },
        { t: "p", v: "Le formulaire de la page de contact ouvre votre propre programme de messagerie. Ce n'est qu'au moment où vous envoyez le message que la personne qui édite l'offre reçoit votre nom, votre adresse électronique et votre texte — par la voie prévue par votre fournisseur de messagerie." },
        { t: "h2", v: "Hébergement et journaux du serveur" },
        { t: "p", v: "Le site est diffusé par un hébergeur web. L'hébergeur peut traiter des journaux techniques (par exemple l'heure, l'adresse appelée, l'adresse IP raccourcie, l'identifiant du navigateur), dans la mesure où cela est nécessaire à l'exploitation, à la sécurité et au dépannage. Les indications de l'hébergeur concerné s'appliquent à ce traitement." },
        { t: "h2", v: "Liens externes" },
        { t: "p", v: "Les liens vers par exemple [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org) mènent à des offres de tiers. Leurs exploitants respectifs sont responsables de leur traitement des données." },
        { t: "h2", v: "Vos droits" },
        { t: "p", v: "Dans la mesure où la loi suisse sur la protection des données s'applique, vous pouvez demander l'accès, la rectification ou l'effacement de vos données et vous adresser au Préposé fédéral à la protection des données et à la transparence (PFPDT). Comme les favoris et les réglages ne se trouvent que sur votre appareil, le plus rapide est de les supprimer vous-même. Pour tout ce qui nous parvient par courriel, la page de contact s'applique." },
      ],
    },

    terms: {
      precedenceNote: "Cette traduction est fournie à titre indicatif. En cas de divergence, la version allemande fait foi.",
      navLabel: "Conditions d'utilisation",
      title: "Conditions d'utilisation",
      documentTitle: "Conditions d'utilisation — Inner Development Guide en classe",
      description: "Conditions d'utilisation des cartes de réflexion Inner Development Guide en classe.",
      lead: "Le jeu de cartes est conçu pour le cours. La responsabilité de son utilisation vous incombe.",
      body: [
        { t: "p", v: "Mise à jour : 13 septembre 2026" },
        { t: "h2", v: "L'offre" },
        { t: "p", v: "« Inner Development Guide en classe » met à disposition des cartes de réflexion sur le Inner Development Guide 2.0 : 25 capacités, des questions pour l'enseignante ou l'enseignant et pour la classe, des idées pour le cours et des mini-exercices. L'utilisation est gratuite." },
        { t: "h2", v: "Qui peut l'utiliser" },
        { t: "p", v: "Les enseignantes et enseignants, les directions d'école, les équipes et toutes les personnes qui souhaitent utiliser le jeu de cartes dans la formation et la formation continue. L'utilisation en classe, dans la préparation des cours ainsi qu'en formation initiale et continue est autorisée." },
        { t: "h2", v: "Pas un produit officiel du cadre de référence" },
        { t: "p", v: "Ce travail s'inspire du Inner Development Guide. Il n'est pas édité par les éditrices et éditeurs du cadre de référence et ne s'exprime pas en leur nom. Les noms et les descriptions des capacités proviennent du Inner Development Guide 2.0 (version 7.2). Les questions, les idées pour le cours, les liens disciplinaires et les mini-exercices proviennent de cette offre." },
        { t: "h2", v: "Contenus et responsabilité" },
        { t: "p", v: "Les cartes sont des impulsions, ni un plan d'études ni un conseil. C'est vous qui décidez si une question ou un exercice convient à votre classe. Nous ne garantissons ni l'exhaustivité, ni l'actualité, ni l'adéquation à un cours donné et déclinons toute responsabilité pour les décisions fondées sur cette offre — dans les limites permises par la loi." },
        { t: "h2", v: "Données sur l'appareil" },
        { t: "p", v: "Les cartes gardées et les réglages se trouvent dans le navigateur de cet appareil. Qui partage l'appareil partage aussi ces entrées. Plus d'informations dans la [politique de confidentialité](path:privacy)." },
        { t: "h2", v: "Diffusion" },
        { t: "p", v: "Vous pouvez transmettre le lien vers le site et vers l'application. Vous ne pouvez pas vendre l'offre elle-même comme votre propre produit ni la renommer de manière à donner l'impression qu'il s'agit du cadre de référence officiel." },
        { t: "h2", v: "Modifications" },
        { t: "p", v: "Les contenus, les fonctions et ces conditions peuvent changer. Il n'existe aucun droit à ce que l'offre reste inchangée ou accessible durablement." },
        { t: "h2", v: "Contact" },
        { t: "p", v: "Questions sur ces conditions : [Contact](path:contact)." },
      ],
    },
  },

  landing: {
    heroTitle: "Façonner l'avenir.",
    heroTitleEm: "En cinq minutes.",
    heroLead: "Le Inner Development Guide 2.0 décrit {n} capacités dont nous avons besoin pour façonner le changement. Ce jeu de cartes numérique les traduit dans le quotidien scolaire.",
    cta: "Ouvrir l'application",
    deckAria: "Jeu de cartes à essayer",

    anatomy: {
      title: "Ce qu'il y a sur une carte",
      em: "avec l'exemple « {skillName} »",
      lead: "Une carte, deux faces. Au recto la capacité, au verso les questions — et derrière, le matériel pour la leçon.",
      front: "Recto",
      back: "Verso",
      keys: [
        { n: 1, title: "Dimension", desc: "À laquelle des cinq dimensions la capacité appartient — la couleur de la carte le dit déjà de loin." },
        { n: 2, title: "Capacité", desc: "Nom et description, repris tels quels du cadre de référence." },
        { n: 3, desc: "Deux questions pour vous-même — pour la préparation, le trajet du retour ou la discussion en équipe." },
        { n: 4, desc: "Deux questions que vous pouvez poser telles quelles à la classe. Formulées pour le degré scolaire." },
        { n: 5, desc: "{sheetSub} — dans cet exemple, le mini-exercice « {exerciseTitle} »." },
      ],
    },

    dims: {
      title: "Cinq dimensions",
      em: "{n} capacités",
    },

    use: {
      title: "Dans le quotidien scolaire",
      em: "sans préparation",
      cols: [
        { title: "Une carte, cinq minutes", desc: "Pour entrer dans une leçon, pour l'heure de classe ou pour votre propre préparation le matin. Pas de programme, pas de déroulé — une question suffit." },
        { title: "Pour vous et pour la classe", desc: "Chaque carte porte les deux : deux questions pour vous-même et deux que vous pouvez poser telles quelles à la classe." },
        { title: "De l'impulsion à la leçon", desc: "Si une carte porte, il y a davantage derrière : des idées pour le cours, des liens disciplinaires et un mini-exercice." },
      ],
    },

    install: {
      title: "Sur l'appareil",
      em: "sans store, sans compte",
      heading: "Ajouter à l'écran d'accueil",
      body: "Dans Safari via « Partager » puis « Sur l'écran d'accueil », dans Chrome via le menu et « Installer l'application ». Ensuite, tout fonctionne hors ligne. Les cartes gardées restent sur l'appareil et ne sont téléversées nulle part.",
    },
  },

  contentPages: {
    skillDescriptionSuffix: "Une carte de réflexion comme porte d'entrée dans le Inner Development Guide 2.0 pour les enseignantes et enseignants.",
    crumbHome: "Accueil",
  },
}

export default site
