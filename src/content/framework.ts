export type DimensionId =
  | "sein"
  | "denken"
  | "beziehung"
  | "zusammenarbeit"
  | "handeln";

export type SkillId =
  | "innerer-kompass"
  | "integritaet-authentizitaet"
  | "offenheit-lernbereitschaft"
  | "selbsterkenntnis"
  | "gegenwaertigkeit"
  | "kritisches-denken"
  | "bewusstsein-komplexitaet"
  | "perspektivische-faehigkeiten"
  | "sinnstiftung"
  | "langfristige-orientierung"
  | "wertschaetzung"
  | "verbundenheit"
  | "bescheidenheit"
  | "einfuehlungsvermoegen"
  | "kommunikation"
  | "mitgestaltung"
  | "inklusive-denkweise"
  | "vertrauen"
  | "mobilisierung"
  | "mut"
  | "kreativitaet"
  | "optimismus"
  | "beharrlichkeit";

export interface LocalizedText {
  de: string;
  en: string;
}

export interface SkillDefinition {
  id: SkillId;
  dimensionId: DimensionId;
  name: LocalizedText;
  description: LocalizedText;
}

export interface DimensionDefinition {
  id: DimensionId;
  number: 1 | 2 | 3 | 4 | 5;
  name: LocalizedText;
  subtitle: LocalizedText;
  intro: LocalizedText;
  /** English framework key used in brand materials */
  enKey: "being" | "thinking" | "relating" | "collaborating" | "acting";
  skillIds: SkillId[];
}

/** Official IDG Framework — names and descriptions verbatim. Do not edit. */
export const DIMENSIONS: DimensionDefinition[] = [
  {
    id: "sein",
    number: 1,
    enKey: "being",
    name: { de: "Sein", en: "Being" },
    subtitle: {
      de: "Beziehung zu sich selbst",
      en: "Relationship to Self",
    },
    intro: {
      de: "Die Pflege unseres inneren Lebens und die Entwicklung und Vertiefung unserer Beziehung zu unseren Gedanken, Gefühlen und unserem Körper helfen uns, präsent, absichtsvoll und nicht reaktiv zu sein wenn wir mit Komplexität konfrontiert sind.",
      en: "Cultivating our inner life and developing and deepening our relationship to our thoughts, feelings and body help us be present, intentional and non-reactive when we face complexity.",
    },
    skillIds: [
      "innerer-kompass",
      "integritaet-authentizitaet",
      "offenheit-lernbereitschaft",
      "selbsterkenntnis",
      "gegenwaertigkeit",
    ],
  },
  {
    id: "denken",
    number: 2,
    enKey: "thinking",
    name: { de: "Denken", en: "Thinking" },
    subtitle: {
      de: "Kognitive Fertigkeiten",
      en: "Cognitive Skills",
    },
    intro: {
      de: "Das Entwickeln unserer kognitiven Fähigkeiten, indem wir verschiedene Perspektiven einnehmen, Informationen bewerten und die Welt als ein zusammenhängendes Ganzes begreifen, ist eine wesentliche Voraussetzung für kluge Entscheidungen.",
      en: "Developing our cognitive skills by taking different perspectives, evaluating information and making sense of the world as an interconnected whole is essential for wise decision-making.",
    },
    skillIds: [
      "kritisches-denken",
      "bewusstsein-komplexitaet",
      "perspektivische-faehigkeiten",
      "sinnstiftung",
      "langfristige-orientierung",
    ],
  },
  {
    id: "beziehung",
    number: 3,
    enKey: "relating",
    name: { de: "Beziehung", en: "Relating" },
    subtitle: {
      de: "Fürsorge für andere und die Welt",
      en: "Caring for Others and the World",
    },
    intro: {
      de: "Wertschätzung, Fürsorge und das Gefühl der Verbundenheit mit anderen, z. B. mit Nachbarn, künftigen Generationen oder der Biosphäre, helfen uns, gerechtere und nachhaltigere Systeme und Gesellschaften für alle zu schaffen.",
      en: "Appreciating, caring for and feeling connected to others, such as neighbours, future generations or the biosphere, helps us create more just and sustainable systems and societies for everyone.",
    },
    skillIds: [
      "wertschaetzung",
      "verbundenheit",
      "bescheidenheit",
      "einfuehlungsvermoegen",
    ],
  },
  {
    id: "zusammenarbeit",
    number: 4,
    enKey: "collaborating",
    name: { de: "Zusammenarbeit", en: "Collaborating" },
    subtitle: {
      de: "Soziale Kompetenzen",
      en: "Social Skills",
    },
    intro: {
      de: "Um bei gemeinsamen Anliegen voranzukommen, müssen wir unsere Fähigkeit entwickeln, Akteure mit unterschiedlichen Werten, Fähigkeiten und Kompetenzen einzubeziehen, ihnen Raum zu geben und mit ihnen zu kommunizieren.",
      en: "To make progress on shared concerns, we must develop our ability to include, make space for and communicate with stakeholders with different values, skills and competencies.",
    },
    skillIds: [
      "kommunikation",
      "mitgestaltung",
      "inklusive-denkweise",
      "vertrauen",
      "mobilisierung",
    ],
  },
  {
    id: "handeln",
    number: 5,
    enKey: "acting",
    name: { de: "Handeln", en: "Acting" },
    subtitle: {
      de: "Wandel vorantreiben",
      en: "Enabling Change",
    },
    intro: {
      de: "Eigenschaften wie Mut und Optimismus helfen uns, echte Handlungsfähigkeit zu erlangen, alte Muster zu durchbrechen, originelle Ideen zu entwickeln und in unsicheren Zeiten mit Ausdauer zu handeln.",
      en: "Qualities such as courage and optimism help us to acquire true agency, break old patterns, generate original ideas and act with persistence in uncertain times.",
    },
    skillIds: ["mut", "kreativitaet", "optimismus", "beharrlichkeit"],
  },
];

export const SKILLS: SkillDefinition[] = [
  {
    id: "innerer-kompass",
    dimensionId: "sein",
    name: { de: "Innerer Kompass", en: "Inner Compass" },
    description: {
      de: "Ein tief empfundenes Gefühl der Verantwortung und des Engagements für Werte und Ziele, die dem Wohl des Ganzen dienen.",
      en: "Having a deeply felt sense of responsibility and commitment to values and purposes that serve the greater good.",
    },
  },
  {
    id: "integritaet-authentizitaet",
    dimensionId: "sein",
    name: {
      de: "Integrität und Authentizität",
      en: "Integrity and Authenticity",
    },
    description: {
      de: "Die Verpflichtung und Fähigkeit, aufrichtig, ehrlich und integer zu handeln.",
      en: "A commitment and ability to act with sincerity, honesty and integrity.",
    },
  },
  {
    id: "offenheit-lernbereitschaft",
    dimensionId: "sein",
    name: {
      de: "Offenheit und Lernbereitschaft",
      en: "Openness and Learning Mindset",
    },
    description: {
      de: "Eine Grundhaltung der Neugier und die Bereitschaft, verletzlich zu sein, sich auf Veränderungen einzulassen und zu wachsen.",
      en: "Having a basic mindset of curiosity and a willingness to be vulnerable, embrace change and grow.",
    },
  },
  {
    id: "selbsterkenntnis",
    dimensionId: "sein",
    name: { de: "Selbsterkenntnis", en: "Self-awareness" },
    description: {
      de: "Fähigkeit, in reflektierendem Kontakt mit den eigenen Gedanken, Gefühlen und Wünschen zu sein; ein realistisches Selbstbild und Fähigkeit zur Selbstregulierung.",
      en: "Ability to be in reflective contact with one's thoughts, feelings and desires; having a realistic self-image and ability to regulate oneself.",
    },
  },
  {
    id: "gegenwaertigkeit",
    dimensionId: "sein",
    name: { de: "Gegenwärtigkeit", en: "Presence" },
    description: {
      de: "Die Fähigkeit, im Hier und Jetzt zu sein, ohne zu urteilen und in einem Zustand der offenen Präsenz.",
      en: "Ability to be in the here and now, without judgement and in a state of open presence.",
    },
  },
  {
    id: "kritisches-denken",
    dimensionId: "denken",
    name: { de: "Kritisches Denken", en: "Critical Thinking" },
    description: {
      de: "Fähigkeit, die Gültigkeit von Ansichten, Beweisen und Plänen kritisch zu überprüfen.",
      en: "Skills in critically reviewing the validity of views, evidence and plans.",
    },
  },
  {
    id: "bewusstsein-komplexitaet",
    dimensionId: "denken",
    name: {
      de: "Bewusstsein für Komplexität",
      en: "Complexity Awareness",
    },
    description: {
      de: "Verständnis für und Fähigkeiten im Umgang mit komplexen und systemischen Bedingungen und Kausalzusammenhängen.",
      en: "Understanding of and skills in working with complex and systemic conditions and causalities.",
    },
  },
  {
    id: "perspektivische-faehigkeiten",
    dimensionId: "denken",
    name: {
      de: "Perspektivische Fähigkeiten",
      en: "Perspective Skills",
    },
    description: {
      de: "Fähigkeiten zur Suche, zum Verständnis und zur aktiven Nutzung von Erkenntnissen aus unterschiedlichen Perspektiven.",
      en: "Skills in seeking, understanding and actively making use of insights from contrasting perspectives.",
    },
  },
  {
    id: "sinnstiftung",
    dimensionId: "denken",
    name: { de: "Sinnstiftung", en: "Sense-making" },
    description: {
      de: "Fähigkeiten, Muster zu erkennen, Unbekanntes zu strukturieren und Geschichten bewusst zu gestalten.",
      en: "Skills in seeing patterns, structuring the unknown and being able to consciously create stories.",
    },
  },
  {
    id: "langfristige-orientierung",
    dimensionId: "denken",
    name: {
      de: "Langfristige Orientierung und Visionen",
      en: "Long-term Orientation and Visioning",
    },
    description: {
      de: "Langfristige Orientierung und die Fähigkeit, Visionen in Bezug auf den größeren Kontext zu formulieren und aufrechtzuerhalten.",
      en: "Long-term orientation and ability to formulate and sustain commitment to visions relating to the larger context.",
    },
  },
  {
    id: "wertschaetzung",
    dimensionId: "beziehung",
    name: { de: "Wertschätzung", en: "Appreciation" },
    description: {
      de: "Mit einem grundlegenden Gefühl der Wertschätzung, Dankbarkeit und Freude auf andere und die Welt zugehen.",
      en: "Relating to others and to the world with a basic sense of appreciation, gratitude and joy.",
    },
  },
  {
    id: "verbundenheit",
    dimensionId: "beziehung",
    name: { de: "Verbundenheit", en: "Connectedness" },
    description: {
      de: "Ein ausgeprägtes Gefühl, mit einem größeren Ganzen verbunden zu sein und/oder Teil eines solchen zu sein, wie z. B. einer Gemeinschaft, der Menschheit oder einem globalen Ökosystem.",
      en: "Having a keen sense of being connected with and/or being a part of a larger whole, such as a community, humanity or global ecosystem.",
    },
  },
  {
    id: "bescheidenheit",
    dimensionId: "beziehung",
    name: { de: "Bescheidenheit", en: "Humility" },
    description: {
      de: "In der Lage sein, in Übereinstimmung mit den Bedürfnissen der Situation zu handeln, ohne sich um die eigene Wichtigkeit zu kümmern.",
      en: "Being able to act in accordance with the needs of the situation without concern for one's own importance.",
    },
  },
  {
    id: "einfuehlungsvermoegen",
    dimensionId: "beziehung",
    name: {
      de: "Einfühlungsvermögen und Mitgefühl",
      en: "Empathy and Compassion",
    },
    description: {
      de: "Die Fähigkeit, anderen, sich selbst und der Natur mit Freundlichkeit, Einfühlungsvermögen und Mitgefühl zu begegnen und das damit verbundene Leiden zu bewältigen.",
      en: "Ability to relate to others, oneself and nature with kindness, empathy and compassion and address related suffering.",
    },
  },
  {
    id: "kommunikation",
    dimensionId: "zusammenarbeit",
    name: {
      de: "Kommunikationsfähigkeiten",
      en: "Communication Skills",
    },
    description: {
      de: "Fähigkeit, anderen wirklich zuzuhören, einen echten Dialog zu fördern, die eigene Meinung gekonnt zu vertreten, Konflikte konstruktiv zu lösen und die Kommunikation an unterschiedliche Gruppen anzupassen.",
      en: "Ability to really listen to others, to foster genuine dialogue, to advocate own views skillfully, to manage conflicts constructively and to adapt communication to diverse groups.",
    },
  },
  {
    id: "mitgestaltung",
    dimensionId: "zusammenarbeit",
    name: {
      de: "Mitgestaltungsfähigkeiten",
      en: "Co-creation Skills",
    },
    description: {
      de: "Fähigkeiten und Motivation zum Aufbau, zur Entwicklung und zum Ermöglichen von Kooperationsbeziehungen mit verschiedenen Interessengruppen, gekennzeichnet durch psychologische Sicherheit und echter Ko-Kreation.",
      en: "Skills and motivation to build, develop and facilitate collaborative relationships with diverse stakeholders, characterized by psychological safety and genuine co-creation.",
    },
  },
  {
    id: "inklusive-denkweise",
    dimensionId: "zusammenarbeit",
    name: {
      de: "Inklusive Denkweise und interkulturelle Kompetenz",
      en: "Inclusive Mindset and Intercultural Competence",
    },
    description: {
      de: "Bereitschaft und Kompetenz, Vielfalt anzunehmen und Menschen und Kollektive mit unterschiedlichen Ansichten und Hintergründen einzubeziehen.",
      en: "Willingness and competence to embrace diversity and include people and collectives with different views and backgrounds.",
    },
  },
  {
    id: "vertrauen",
    dimensionId: "zusammenarbeit",
    name: { de: "Vertrauen", en: "Trust" },
    description: {
      de: "Fähigkeit, Vertrauen zu zeigen und vertrauensvolle Beziehungen aufzubauen und zu pflegen.",
      en: "Ability to show trust and to create and maintain trusting relationships.",
    },
  },
  {
    id: "mobilisierung",
    dimensionId: "zusammenarbeit",
    name: {
      de: "Fähigkeiten zur Mobilisierung",
      en: "Mobilization Skills",
    },
    description: {
      de: "Fähigkeit, andere zu inspirieren und zu mobilisieren, sich für gemeinsame Ziele einzusetzen.",
      en: "Ability to inspire and mobilize others to engage in shared purposes.",
    },
  },
  {
    id: "mut",
    dimensionId: "handeln",
    name: { de: "Mut", en: "Courage" },
    description: {
      de: "Die Fähigkeit, für Werte einzutreten, Entscheidungen zu treffen, entschlossen zu handeln und, wenn nötig, bestehende Strukturen und Ansichten in Frage zu stellen und aufzubrechen.",
      en: "Ability to stand up for values, make decisions, take decisive action and, if needed, challenge and disrupt existing structures and views.",
    },
  },
  {
    id: "kreativitaet",
    dimensionId: "handeln",
    name: { de: "Kreativität", en: "Creativity" },
    description: {
      de: "Fähigkeit, originelle Ideen zu entwickeln, innovativ zu sein und bereit, konventionelle Muster zu durchbrechen.",
      en: "Ability to generate and develop original ideas, innovate and be willing to disrupt conventional patterns.",
    },
  },
  {
    id: "optimismus",
    dimensionId: "handeln",
    name: { de: "Optimismus", en: "Optimism" },
    description: {
      de: "Fähigkeit, ein Gefühl der Hoffnung, eine positive Einstellung und Zuversicht an die Möglichkeit eines sinnhaften Wandels.",
      en: "Ability to sustain and communicate a sense of hope, positive attitude and confidence in the possibility of meaningful change.",
    },
  },
  {
    id: "beharrlichkeit",
    dimensionId: "handeln",
    name: { de: "Beharrlichkeit", en: "Perseverance" },
    description: {
      de: "Fähigkeit, das Engagement aufrechtzuerhalten und entschlossen und geduldig zu bleiben, auch wenn die Bemühungen lange Zeit brauchen, um Früchte zu tragen.",
      en: "Ability to sustain engagement and remain determined and patient even when efforts take a long time to bear fruit.",
    },
  },
];

export function getDimension(id: DimensionId): DimensionDefinition {
  const dim = DIMENSIONS.find((d) => d.id === id);
  if (!dim) throw new Error(`Unknown dimension: ${id}`);
  return dim;
}

export function getSkill(id: SkillId): SkillDefinition {
  const skill = SKILLS.find((s) => s.id === id);
  if (!skill) throw new Error(`Unknown skill: ${id}`);
  return skill;
}

export function getSkillsForDimension(dimensionId: DimensionId): SkillDefinition[] {
  return SKILLS.filter((s) => s.dimensionId === dimensionId);
}

export function getAdjacentSkillIds(
  skillId: SkillId,
  scope: "dimension" | "all" = "dimension",
): { prev: SkillId | null; next: SkillId | null } {
  const skill = getSkill(skillId);
  const list =
    scope === "all"
      ? SKILLS
      : getSkillsForDimension(skill.dimensionId);
  const idx = list.findIndex((s) => s.id === skillId);
  return {
    prev: idx > 0 ? list[idx - 1]!.id : null,
    next: idx < list.length - 1 ? list[idx + 1]!.id : null,
  };
}

export function pickRandomSkillId(): SkillId {
  const idx = Math.floor(Math.random() * SKILLS.length);
  return SKILLS[idx]!.id;
}
