/**
 * Textos del sitio en español (es). Los textos de las cartas están aparte, en
 * src/content/.
 *
 * La estructura, los nombres de las claves y los tipos de bloque son idénticos
 * a src/site/i18n/de.js — allí está la documentación de los tipos de bloque,
 * del marcado en línea y de los marcadores de posición. El alemán es la fuente
 * vinculante; este archivo es una traducción.
 *
 * Regla del marcado en línea: se traduce el texto visible, nunca el destino.
 * `[Kontakt](path:contact)` pasa a ser `[Contacto](path:contact)` — `contact`
 * es una clave de ruta, no una palabra. Las URL, las claves de localStorage y
 * el código entre acentos graves quedan intactos.
 */
export const site = {
  lang: 'es',
  htmlLang: 'es',
  ogLocale: 'es_ES',

  chrome: {
    brand: 'Inner Development Guide',
    brandSub: 'en el aula',
    homeAria: 'Ir a la página de inicio',
    langAria: 'Idioma',
    footerAria: 'Pie de página',
    footerAbout: 'Sobre el proyecto',
    footerLegal: 'Aviso legal',
    footerNote: 'Este trabajo se inspira en el Inner Development Guide. Más información en',
  },

  notFound: {
    title: 'Página no encontrada',
    lead: 'Esta ruta no lleva a ninguna parte.',
    backHome: 'Ir a la página de inicio',
  },

  pages: {
    home: {
      documentTitle: 'Inner Development Guide en el aula — dar forma al futuro en cinco minutos',
      description: '25 habilidades del Inner Development Guide 2.0 como cartas de reflexión digitales para el profesorado: preguntas para ti y para tu clase, ideas para el aula y vínculos con el Lehrplan 21 — sin cuenta y con uso sin conexión.',
    },

    app: {
      documentTitle: 'Cartas de reflexión — Inner Development Guide en el aula',
      description: '25 habilidades del Inner Development Guide 2.0 como cartas de reflexión para el aula — instalable, sin conexión, sin cuenta.',
    },

    project: {
      navLabel: 'El proyecto',
      title: 'El proyecto',
      documentTitle: 'El proyecto — Inner Development Guide en el aula',
      description: 'El Inner Development Guide 2.0 como cartas de reflexión para el día a día escolar: 25 habilidades, cinco dimensiones, sin cuenta — para docentes en Suiza.',
      lead: 'Un juego de cartas digital que traduce el Inner Development Guide 2.0 al aula: una carta, una pregunta, un punto de partida.',
      body: [
        { t: 'h2', v: 'De qué se trata' },
        { t: 'p', v: 'El Inner Development Guide 2.0 describe 25 habilidades interiores en cinco dimensiones: Ser, Pensar, Relacionarse, Colaborar y Actuar. Esta propuesta las hace tangibles para el profesorado: como cartas que se giran, se guardan y permanecen sin conexión en el dispositivo.' },
        { t: 'p', v: 'Delante está la habilidad. Detrás hay dos preguntas para ti y dos que puedes plantear tal cual a la clase, además de ideas para el aula, vínculos con las materias y un miniejercicio.' },
        { t: 'h2', v: 'Sin tienda, sin cuenta' },
        { t: 'p', v: 'La aplicación funciona en el navegador y se puede añadir a la pantalla de inicio. Las cartas guardadas y los ajustes permanecen en la memoria de este dispositivo. No hay registro y no se sube nada a ningún servidor.' },
        { t: 'h2', v: 'Escrito para el día a día escolar' },
        { t: 'p', v: 'Los nombres y las descripciones de las habilidades proceden del Inner Development Guide 2.0 (versión 7.2). Las preguntas de reflexión, las ideas para el aula y los miniejercicios se han redactado expresamente para esta aplicación. En alemán enlazan con las áreas del Lehrplan 21, el plan de estudios de la Suiza de habla alemana.' },
        { t: 'p', v: 'Además de en alemán, las cartas están disponibles en inglés, francés, español, italiano y sueco.' },
        { t: 'h2', v: 'Las cinco dimensiones' },
        { t: 'dimList' },
        { t: 'h2', v: 'Preguntas frecuentes' },
        { t: 'faq' },
        { t: 'h2', v: 'Origen' },
        { t: 'p', v: 'Este trabajo se inspira en el Inner Development Guide. No es un producto oficial de quienes editan el marco de referencia. Más información en [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org). Una propuesta emparentada es la [Zukunftskompetenz-Challenge](https://zukunftskompetenzchallenge.ch).' },
      ],
      faq: [
        {
          q: '¿Qué es Inner Development Guide en el aula?',
          a: 'Un juego de cartas digital y gratuito para el profesorado: 25 habilidades del Inner Development Guide 2.0 como cartas de reflexión que se giran, con preguntas para ti y para tu clase, ideas para el aula, vínculos con el Lehrplan 21 y un miniejercicio.',
        },
        {
          q: '¿Tiene algún coste?',
          a: 'No. El uso es gratuito. No hay compra en ninguna tienda ni suscripción.',
        },
        {
          q: '¿Necesito una cuenta?',
          a: 'No. No hay registro. Las cartas guardadas y los ajustes permanecen solo en tu dispositivo.',
        },
        {
          q: '¿Qué relación tiene con el Lehrplan 21?',
          a: 'Las cartas en alemán enlazan con áreas del Lehrplan 21, el plan de estudios de la Suiza de habla alemana, por ejemplo Ética, religiones, comunidad o Naturaleza, ser humano, sociedad. Las cartas no sustituyen al plan de estudios; ofrecen impulsos para el aula.',
        },
        {
          q: '¿Es un producto oficial del marco de referencia?',
          a: 'No. Este trabajo se inspira en el Inner Development Guide. Los nombres y las descripciones de las habilidades proceden del Inner Development Guide 2.0 (versión 7.2). Las preguntas, las ideas para el aula y los miniejercicios se han escrito expresamente para este sitio.',
        },
        {
          q: '¿Cómo uso una carta en cinco minutos?',
          a: 'Abre una carta, elige una pregunta para ti o para la clase y entra brevemente en conversación. Si la carta funciona, detrás hay ideas, vínculos con las materias y un miniejercicio.',
        },
      ],
    },

    contact: {
      navLabel: 'Contacto',
      title: 'Contacto',
      documentTitle: 'Contacto — Inner Development Guide en el aula',
      description: 'Una pregunta, un aviso o un comentario sobre Inner Development Guide en el aula — por correo electrónico a guide@zukunftskompetenzchallenge.ch.',
      lead: 'Una pregunta sobre el juego de cartas, una observación de tus clases o las ganas de compartir la propuesta con tu claustro: escríbenos.',
      body: [
        { t: 'p', v: 'El mensaje abre tu programa de correo y se envía a [{mail}](mailto:{mail}). No hay cuenta de formulario ni envío a través de nuestros servidores.' },
      ],
      form: {
        name: 'Nombre',
        email: 'Correo electrónico',
        message: 'Mensaje',
        submit: 'Enviar mensaje',
        subject: 'Mensaje de',
        subjectFallback: 'el sitio web',
      },
    },

    privacy: {
      precedenceNote: 'Esta traducción se ofrece a título informativo. En caso de discrepancia, prevalece la versión alemana.',
      navLabel: 'Privacidad',
      title: 'Protección de datos',
      documentTitle: 'Protección de datos — Inner Development Guide en el aula',
      description: 'Cómo trata los datos Inner Development Guide en el aula: de forma local en el dispositivo, sin cuenta y sin subidas.',
      lead: 'Esta propuesta funciona sin cuenta de usuario. Lo que guardas permanece en tu dispositivo.',
      body: [
        { t: 'p', v: 'Última actualización: 13 de septiembre de 2026' },
        { t: 'h2', v: 'Responsable del tratamiento' },
        { t: 'p', v: 'La persona que edita esta propuesta es responsable del tratamiento de datos en este sitio web. Se la puede contactar a través de la página [Contacto](path:contact).' },
        { t: 'h2', v: 'Lo que este sitio no hace' },
        { t: 'p', v: 'No hay registro, no hay cookies de análisis ni de publicidad y no se suben las cartas guardadas ni los ajustes. La aplicación y la página de inicio no almacenan nada en nuestros servidores.' },
        { t: 'h2', v: 'Datos en tu dispositivo' },
        { t: 'p', v: 'En la memoria del navegador (`localStorage`) puede haber:' },
        { t: 'ul', v: [
          'cartas guardadas',
          'ajustes como el idioma o el orden',
          'si ya se ha visto la breve introducción',
        ] },
        { t: 'p', v: 'La aplicación usa el prefijo de clave `idg-cards-` y el mazo de la página de inicio, `idg-demo-`. Por eso, probar las cartas en la página de inicio no sobrescribe ninguna carta guardada en la aplicación. Puedes eliminar estas entradas en cualquier momento desde la aplicación («Vaciar las guardadas») o borrando los datos del sitio en tu navegador.' },
        { t: 'h2', v: 'Funcionamiento sin conexión' },
        { t: 'p', v: 'La aplicación en [/app/](/app/) puede registrar un service worker para que las cartas estén disponibles en el aula incluso sin red. Con ello se guardan archivos de programa e imágenes en una caché de este navegador, no en un servidor a nuestro nombre.' },
        { t: 'h2', v: 'Compartir' },
        { t: 'p', v: 'Cuando compartes una carta, el dispositivo utiliza la función del sistema «Compartir» o copia el texto de la carta junto con el enlace en el portapapeles. Donde el dispositivo lo admite, se envía además una imagen del anverso de la carta. El enlace abre exactamente esa carta en la aplicación. No recibimos ni el texto ni la imagen y no sabemos a quién se los envías.' },
        { t: 'h2', v: 'Contacto' },
        { t: 'p', v: 'El formulario de la página de contacto abre tu propio programa de correo. Solo cuando envías el mensaje, la persona que edita la propuesta recibe tu nombre, tu correo electrónico y tu texto, por la vía que prevea tu proveedor de correo.' },
        { t: 'h2', v: 'Alojamiento y registros del servidor' },
        { t: 'p', v: 'El sitio web se sirve a través de un proveedor de alojamiento. El proveedor puede tratar registros técnicos (por ejemplo el momento, la dirección solicitada, la dirección IP abreviada o la identificación del navegador) en la medida en que sea necesario para el funcionamiento, la seguridad y la resolución de errores. A ello se aplican las indicaciones del proveedor correspondiente.' },
        { t: 'h2', v: 'Enlaces externos' },
        { t: 'p', v: 'Los enlaces, por ejemplo a [innerdevelopmentgoals.org](https://innerdevelopmentgoals.org), llevan a ofertas de terceros. De su tratamiento de datos son responsables quienes las gestionan.' },
        { t: 'h2', v: 'Tus derechos' },
        { t: 'p', v: 'En la medida en que sea aplicable la ley suiza de protección de datos, puedes solicitar acceso, rectificación o supresión y dirigir una comunicación al Encargado Federal de Protección de Datos y Transparencia (EDÖB). Como las cartas guardadas y los ajustes están únicamente en tu dispositivo, la vía más rápida es que los borres tú. Para todo lo que nos llegue por correo electrónico, rige la página de contacto.' },
      ],
    },

    terms: {
      precedenceNote: 'Esta traducción se ofrece a título informativo. En caso de discrepancia, prevalece la versión alemana.',
      navLabel: 'Condiciones de uso',
      title: 'Condiciones de uso',
      documentTitle: 'Condiciones de uso — Inner Development Guide en el aula',
      description: 'Condiciones para el uso de las cartas de reflexión Inner Development Guide en el aula.',
      lead: 'El juego de cartas está pensado para el aula. La responsabilidad de su uso es tuya.',
      body: [
        { t: 'p', v: 'Última actualización: 13 de septiembre de 2026' },
        { t: 'h2', v: 'La propuesta' },
        { t: 'p', v: '«Inner Development Guide en el aula» pone a disposición cartas de reflexión sobre el Inner Development Guide 2.0: 25 habilidades, preguntas para el profesorado y para la clase, ideas para el aula y miniejercicios. El uso es gratuito.' },
        { t: 'h2', v: 'Quién puede usarlo' },
        { t: 'p', v: 'Docentes, direcciones de centro, equipos y todas las personas que quieran emplear el juego de cartas en la educación y la formación continua. Se permite su uso en el aula, en la preparación de clases y en la formación inicial y continua.' },
        { t: 'h2', v: 'No es un producto oficial del marco de referencia' },
        { t: 'p', v: 'Este trabajo se inspira en el Inner Development Guide. No lo editan quienes publican el marco de referencia ni habla en su nombre. Los nombres y las descripciones de las habilidades proceden del Inner Development Guide 2.0 (versión 7.2). Las preguntas, las ideas para el aula, los vínculos con las materias y los miniejercicios proceden de esta propuesta.' },
        { t: 'h2', v: 'Contenidos y responsabilidad' },
        { t: 'p', v: 'Las cartas son impulsos, no un plan de estudios ni un asesoramiento. Eres tú quien decide si una pregunta o un ejercicio encaja en tu clase. No asumimos garantía alguna sobre la exhaustividad, la actualidad o la idoneidad para una clase concreta y no respondemos por las decisiones que se basen en esta propuesta, en la medida en que la ley lo permita.' },
        { t: 'h2', v: 'Datos en el dispositivo' },
        { t: 'p', v: 'Las cartas guardadas y los ajustes están en el navegador de este dispositivo. Quien comparte el dispositivo comparte también esas entradas. Más información en la [política de privacidad](path:privacy).' },
        { t: 'h2', v: 'Difusión' },
        { t: 'p', v: 'Puedes difundir el enlace al sitio web y a la aplicación. No puedes vender la propuesta como producto propio ni renombrarla de manera que dé la impresión de ser el marco de referencia oficial.' },
        { t: 'h2', v: 'Cambios' },
        { t: 'p', v: 'Los contenidos, las funciones y estas condiciones pueden cambiar. No existe derecho a que la propuesta permanezca inalterada ni disponible de forma permanente.' },
        { t: 'h2', v: 'Contacto' },
        { t: 'p', v: 'Preguntas sobre estas condiciones: [Contacto](path:contact).' },
      ],
    },
  },

  landing: {
    heroTitle: 'Dar forma al futuro.',
    heroTitleEm: 'En cinco minutos.',
    heroLead: 'El Inner Development Guide 2.0 describe {n} habilidades que necesitamos para dar forma al cambio. Este juego de cartas digital las traduce al día a día escolar.',
    cta: 'Abrir la aplicación',
    deckAria: 'Mazo de cartas para probar',

    anatomy: {
      title: 'Qué hay en una carta',
      em: 'con el ejemplo «{skillName}»',
      lead: 'Una carta, dos caras. Delante la habilidad, detrás las preguntas, y tras ellas el material para la clase.',
      front: 'Anverso',
      back: 'Reverso',
      keys: [
        { n: 1, title: 'Dimensión', desc: 'A cuál de las cinco dimensiones pertenece la habilidad; el color de la carta ya lo dice desde lejos.' },
        { n: 2, title: 'Habilidad', desc: 'Nombre y descripción, tomados literalmente del marco de referencia.' },
        { n: 3, desc: 'Dos preguntas para ti: para la preparación, para el camino de vuelta o para la conversación en el equipo.' },
        { n: 4, desc: 'Dos preguntas que puedes plantear tal cual a la clase. Formuladas según la edad del alumnado.' },
        { n: 5, desc: '{sheetSub}; en este ejemplo, el miniejercicio «{exerciseTitle}».' },
      ],
    },

    dims: {
      title: 'Cinco dimensiones',
      em: '{n} habilidades',
    },

    use: {
      title: 'En el día a día escolar',
      em: 'sin preparación',
      cols: [
        { title: 'Una carta, cinco minutos', desc: 'Para empezar una clase, para la tutoría o para tu propia preparación por la mañana. Sin programa ni guion: basta con una pregunta.' },
        { title: 'Para ti y para la clase', desc: 'Cada carta lleva las dos cosas: dos preguntas para ti y dos que puedes plantear tal cual a la clase.' },
        { title: 'Del impulso a la clase', desc: 'Si una carta funciona, detrás hay más: ideas para el aula, vínculos con las materias y un miniejercicio.' },
      ],
    },

    install: {
      title: 'En el dispositivo',
      em: 'sin tienda, sin cuenta',
      heading: 'Añadir a la pantalla de inicio',
      body: 'En Safari, con «Compartir» y «Añadir a pantalla de inicio»; en Chrome, desde el menú y «Instalar aplicación». Después todo funciona sin conexión. Las cartas guardadas permanecen en el dispositivo y no se suben a ningún sitio.',
    },

    noscript: {
      tagline: '25 habilidades como cartas de reflexión para docentes.',
      intro: 'El Inner Development Guide 2.0 describe 25 habilidades interiores en cinco dimensiones: Ser, Pensar, Relacionarse, Colaborar y Actuar. Este juego de cartas digital las traduce al día a día escolar — con preguntas de reflexión, ideas para el aula y miniejercicios.',
      dimensionsLabel: 'Dimensiones:',
    },
  },

  contentPages: {
    skillDescriptionSuffix: 'Una carta de reflexión como punto de partida en el Inner Development Guide 2.0 para el profesorado.',
    crumbHome: 'Inicio',
    crumbsAriaLabel: 'Ruta de navegación',
    dimensionPrefix: 'Dimensión',
    dimensionHeading: 'Habilidades en «{dimName}»',
    openAppCta: 'Abrir las cartas de reflexión',
    openCardCta: 'Abrir la carta «{skillName}»',
    otherSkillsHeading: 'Más habilidades en «{dimName}»',
  },

  // Datos estructurados (JSON-LD) — ver el comentario en i18n/de.js.
  // `keywords` omite «Lehrplan 21» a propósito: el texto de estas mismas
  // páginas de habilidades limita ese vínculo al alemán (ver
  // `educationalFramework` en seo/meta.js), una palabra clave aquí lo
  // contradiría.
  seo: {
    audienceType: 'Docentes en Suiza',
    keywords: 'Inner Development Guide, Inner Development Goals, IDG, cartas de reflexión, aula, profesorado, competencias de futuro',
    featureList: [
      '25 cartas de reflexión sobre las habilidades del Inner Development Guide',
      'Preguntas para el profesorado y para la clase',
      'Ideas para el aula y miniejercicios',
      'Funciona sin conexión como aplicación web instalable',
      'Seis idiomas: alemán, inglés, francés, español, italiano y sueco',
    ],
  },
}

export default site
