// Verb conjugation data for Latin American Spanish
// Includes common verbs with their conjugations and example sentences

export interface VerbConjugation {
  infinitive: string;
  german: string;
  type: "regular-ar" | "regular-er" | "regular-ir" | "irregular";
  conjugations: {
    yo: string;
    tú: string;
    "él/ella/usted": string;
    nosotros: string;
    "ellos/ustedes": string;
  };
  exampleSentences: {
    pronoun: string;
    sentence: string; // with ___ for blank
    answer: string;
    germanTranslation: string;
  }[];
}

export const verbConjugations: VerbConjugation[] = [
  // SER - to be (permanent)
  {
    infinitive: "ser",
    german: "sein (dauerhaft)",
    type: "irregular",
    conjugations: {
      yo: "soy",
      tú: "eres",
      "él/ella/usted": "es",
      nosotros: "somos",
      "ellos/ustedes": "son",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ estudiante.",
        answer: "soy",
        germanTranslation: "Ich bin Student.",
      },
      {
        pronoun: "tú",
        sentence: "Tú ___ muy inteligente.",
        answer: "eres",
        germanTranslation: "Du bist sehr intelligent.",
      },
      {
        pronoun: "él",
        sentence: "Él ___ de México.",
        answer: "es",
        germanTranslation: "Er ist aus Mexiko.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ amigos.",
        answer: "somos",
        germanTranslation: "Wir sind Freunde.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ profesores.",
        answer: "son",
        germanTranslation: "Sie sind Lehrer.",
      },
    ],
  },
  // ESTAR - to be (temporary)
  {
    infinitive: "estar",
    german: "sein (Zustand)",
    type: "irregular",
    conjugations: {
      yo: "estoy",
      tú: "estás",
      "él/ella/usted": "está",
      nosotros: "estamos",
      "ellos/ustedes": "están",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ cansado.",
        answer: "estoy",
        germanTranslation: "Ich bin müde.",
      },
      {
        pronoun: "tú",
        sentence: "¿Cómo ___ tú?",
        answer: "estás",
        germanTranslation: "Wie geht es dir?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ en casa.",
        answer: "está",
        germanTranslation: "Sie ist zu Hause.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ contentos.",
        answer: "estamos",
        germanTranslation: "Wir sind zufrieden.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ listos?",
        answer: "están",
        germanTranslation: "Seid ihr bereit?",
      },
    ],
  },
  // TENER - to have
  {
    infinitive: "tener",
    german: "haben",
    type: "irregular",
    conjugations: {
      yo: "tengo",
      tú: "tienes",
      "él/ella/usted": "tiene",
      nosotros: "tenemos",
      "ellos/ustedes": "tienen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ un perro.",
        answer: "tengo",
        germanTranslation: "Ich habe einen Hund.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ hambre?",
        answer: "tienes",
        germanTranslation: "Hast du Hunger?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ veinte años.",
        answer: "tiene",
        germanTranslation: "Er ist zwanzig Jahre alt.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ tiempo.",
        answer: "tenemos",
        germanTranslation: "Wir haben Zeit.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ mucho dinero.",
        answer: "tienen",
        germanTranslation: "Sie haben viel Geld.",
      },
    ],
  },
  // IR - to go
  {
    infinitive: "ir",
    german: "gehen",
    type: "irregular",
    conjugations: {
      yo: "voy",
      tú: "vas",
      "él/ella/usted": "va",
      nosotros: "vamos",
      "ellos/ustedes": "van",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ al trabajo.",
        answer: "voy",
        germanTranslation: "Ich gehe zur Arbeit.",
      },
      {
        pronoun: "tú",
        sentence: "¿A dónde ___ tú?",
        answer: "vas",
        germanTranslation: "Wohin gehst du?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ a la escuela.",
        answer: "va",
        germanTranslation: "Sie geht zur Schule.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ de vacaciones.",
        answer: "vamos",
        germanTranslation: "Wir fahren in den Urlaub.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ al cine?",
        answer: "van",
        germanTranslation: "Geht ihr ins Kino?",
      },
    ],
  },
  // HACER - to do/make
  {
    infinitive: "hacer",
    german: "machen/tun",
    type: "irregular",
    conjugations: {
      yo: "hago",
      tú: "haces",
      "él/ella/usted": "hace",
      nosotros: "hacemos",
      "ellos/ustedes": "hacen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ la tarea.",
        answer: "hago",
        germanTranslation: "Ich mache die Hausaufgaben.",
      },
      {
        pronoun: "tú",
        sentence: "¿Qué ___ tú?",
        answer: "haces",
        germanTranslation: "Was machst du?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ ejercicio.",
        answer: "hace",
        germanTranslation: "Er macht Sport.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ una fiesta.",
        answer: "hacemos",
        germanTranslation: "Wir machen eine Party.",
      },
      {
        pronoun: "ellos",
        sentence: "¿Qué ___ ellos?",
        answer: "hacen",
        germanTranslation: "Was machen sie?",
      },
    ],
  },
  // QUERER - to want
  {
    infinitive: "querer",
    german: "wollen/lieben",
    type: "irregular",
    conjugations: {
      yo: "quiero",
      tú: "quieres",
      "él/ella/usted": "quiere",
      nosotros: "queremos",
      "ellos/ustedes": "quieren",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ comer.",
        answer: "quiero",
        germanTranslation: "Ich will essen.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ venir?",
        answer: "quieres",
        germanTranslation: "Willst du kommen?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ un café.",
        answer: "quiere",
        germanTranslation: "Sie möchte einen Kaffee.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ viajar.",
        answer: "queremos",
        germanTranslation: "Wir wollen reisen.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ ayudar.",
        answer: "quieren",
        germanTranslation: "Sie wollen helfen.",
      },
    ],
  },
  // PODER - to be able to
  {
    infinitive: "poder",
    german: "können",
    type: "irregular",
    conjugations: {
      yo: "puedo",
      tú: "puedes",
      "él/ella/usted": "puede",
      nosotros: "podemos",
      "ellos/ustedes": "pueden",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ hablar español.",
        answer: "puedo",
        germanTranslation: "Ich kann Spanisch sprechen.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ ayudarme?",
        answer: "puedes",
        germanTranslation: "Kannst du mir helfen?",
      },
      {
        pronoun: "él",
        sentence: "Él no ___ venir.",
        answer: "puede",
        germanTranslation: "Er kann nicht kommen.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ hacerlo.",
        answer: "podemos",
        germanTranslation: "Wir können es machen.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ esperar?",
        answer: "pueden",
        germanTranslation: "Könnt ihr warten?",
      },
    ],
  },
  // SABER - to know (facts)
  {
    infinitive: "saber",
    german: "wissen",
    type: "irregular",
    conjugations: {
      yo: "sé",
      tú: "sabes",
      "él/ella/usted": "sabe",
      nosotros: "sabemos",
      "ellos/ustedes": "saben",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ la respuesta.",
        answer: "sé",
        germanTranslation: "Ich weiß die Antwort.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ dónde está?",
        answer: "sabes",
        germanTranslation: "Weißt du, wo es ist?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ cocinar.",
        answer: "sabe",
        germanTranslation: "Sie kann kochen.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros no ___ nada.",
        answer: "sabemos",
        germanTranslation: "Wir wissen nichts.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ la verdad.",
        answer: "saben",
        germanTranslation: "Sie wissen die Wahrheit.",
      },
    ],
  },
  // CONOCER - to know (people/places)
  {
    infinitive: "conocer",
    german: "kennen",
    type: "irregular",
    conjugations: {
      yo: "conozco",
      tú: "conoces",
      "él/ella/usted": "conoce",
      nosotros: "conocemos",
      "ellos/ustedes": "conocen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ a tu hermano.",
        answer: "conozco",
        germanTranslation: "Ich kenne deinen Bruder.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ este lugar?",
        answer: "conoces",
        germanTranslation: "Kennst du diesen Ort?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ a María.",
        answer: "conoce",
        germanTranslation: "Er kennt María.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ la ciudad.",
        answer: "conocemos",
        germanTranslation: "Wir kennen die Stadt.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ al profesor?",
        answer: "conocen",
        germanTranslation: "Kennt ihr den Lehrer?",
      },
    ],
  },
  // HABLAR - to speak (regular -ar)
  {
    infinitive: "hablar",
    german: "sprechen",
    type: "regular-ar",
    conjugations: {
      yo: "hablo",
      tú: "hablas",
      "él/ella/usted": "habla",
      nosotros: "hablamos",
      "ellos/ustedes": "hablan",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ español.",
        answer: "hablo",
        germanTranslation: "Ich spreche Spanisch.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ inglés?",
        answer: "hablas",
        germanTranslation: "Sprichst du Englisch?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ muy rápido.",
        answer: "habla",
        germanTranslation: "Sie spricht sehr schnell.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ alemán.",
        answer: "hablamos",
        germanTranslation: "Wir sprechen Deutsch.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ tres idiomas.",
        answer: "hablan",
        germanTranslation: "Sie sprechen drei Sprachen.",
      },
    ],
  },
  // COMER - to eat (regular -er)
  {
    infinitive: "comer",
    german: "essen",
    type: "regular-er",
    conjugations: {
      yo: "como",
      tú: "comes",
      "él/ella/usted": "come",
      nosotros: "comemos",
      "ellos/ustedes": "comen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ una manzana.",
        answer: "como",
        germanTranslation: "Ich esse einen Apfel.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ carne?",
        answer: "comes",
        germanTranslation: "Isst du Fleisch?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ mucho.",
        answer: "come",
        germanTranslation: "Er isst viel.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ a las dos.",
        answer: "comemos",
        germanTranslation: "Wir essen um zwei.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ aquí?",
        answer: "comen",
        germanTranslation: "Esst ihr hier?",
      },
    ],
  },
  // VIVIR - to live (regular -ir)
  {
    infinitive: "vivir",
    german: "leben/wohnen",
    type: "regular-ir",
    conjugations: {
      yo: "vivo",
      tú: "vives",
      "él/ella/usted": "vive",
      nosotros: "vivimos",
      "ellos/ustedes": "viven",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ en Lima.",
        answer: "vivo",
        germanTranslation: "Ich wohne in Lima.",
      },
      {
        pronoun: "tú",
        sentence: "¿Dónde ___ tú?",
        answer: "vives",
        germanTranslation: "Wo wohnst du?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ con su familia.",
        answer: "vive",
        germanTranslation: "Sie lebt mit ihrer Familie.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ en un apartamento.",
        answer: "vivimos",
        germanTranslation: "Wir wohnen in einer Wohnung.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ cerca.",
        answer: "viven",
        germanTranslation: "Sie wohnen in der Nähe.",
      },
    ],
  },
  // TRABAJAR - to work
  {
    infinitive: "trabajar",
    german: "arbeiten",
    type: "regular-ar",
    conjugations: {
      yo: "trabajo",
      tú: "trabajas",
      "él/ella/usted": "trabaja",
      nosotros: "trabajamos",
      "ellos/ustedes": "trabajan",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ en una oficina.",
        answer: "trabajo",
        germanTranslation: "Ich arbeite in einem Büro.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ mucho?",
        answer: "trabajas",
        germanTranslation: "Arbeitest du viel?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ de noche.",
        answer: "trabaja",
        germanTranslation: "Er arbeitet nachts.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ juntos.",
        answer: "trabajamos",
        germanTranslation: "Wir arbeiten zusammen.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ los sábados?",
        answer: "trabajan",
        germanTranslation: "Arbeitet ihr samstags?",
      },
    ],
  },
  // NECESITAR - to need
  {
    infinitive: "necesitar",
    german: "brauchen",
    type: "regular-ar",
    conjugations: {
      yo: "necesito",
      tú: "necesitas",
      "él/ella/usted": "necesita",
      nosotros: "necesitamos",
      "ellos/ustedes": "necesitan",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ ayuda.",
        answer: "necesito",
        germanTranslation: "Ich brauche Hilfe.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ algo?",
        answer: "necesitas",
        germanTranslation: "Brauchst du etwas?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ descansar.",
        answer: "necesita",
        germanTranslation: "Sie muss sich ausruhen.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ más tiempo.",
        answer: "necesitamos",
        germanTranslation: "Wir brauchen mehr Zeit.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ dinero.",
        answer: "necesitan",
        germanTranslation: "Sie brauchen Geld.",
      },
    ],
  },
  // PENSAR - to think
  {
    infinitive: "pensar",
    german: "denken",
    type: "irregular",
    conjugations: {
      yo: "pienso",
      tú: "piensas",
      "él/ella/usted": "piensa",
      nosotros: "pensamos",
      "ellos/ustedes": "piensan",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ que es verdad.",
        answer: "pienso",
        germanTranslation: "Ich denke, es ist wahr.",
      },
      {
        pronoun: "tú",
        sentence: "¿Qué ___ tú?",
        answer: "piensas",
        germanTranslation: "Was denkst du?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ en su familia.",
        answer: "piensa",
        germanTranslation: "Er denkt an seine Familie.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ lo mismo.",
        answer: "pensamos",
        germanTranslation: "Wir denken das Gleiche.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ ir?",
        answer: "piensan",
        germanTranslation: "Denkt ihr daran zu gehen?",
      },
    ],
  },
  // DECIR - to say/tell
  {
    infinitive: "decir",
    german: "sagen",
    type: "irregular",
    conjugations: {
      yo: "digo",
      tú: "dices",
      "él/ella/usted": "dice",
      nosotros: "decimos",
      "ellos/ustedes": "dicen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ la verdad.",
        answer: "digo",
        germanTranslation: "Ich sage die Wahrheit.",
      },
      {
        pronoun: "tú",
        sentence: "¿Qué ___ tú?",
        answer: "dices",
        germanTranslation: "Was sagst du?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ que sí.",
        answer: "dice",
        germanTranslation: "Sie sagt ja.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ adiós.",
        answer: "decimos",
        germanTranslation: "Wir sagen auf Wiedersehen.",
      },
      {
        pronoun: "ellos",
        sentence: "¿Qué ___ ellos?",
        answer: "dicen",
        germanTranslation: "Was sagen sie?",
      },
    ],
  },
  // VENIR - to come
  {
    infinitive: "venir",
    german: "kommen",
    type: "irregular",
    conjugations: {
      yo: "vengo",
      tú: "vienes",
      "él/ella/usted": "viene",
      nosotros: "venimos",
      "ellos/ustedes": "vienen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ de Perú.",
        answer: "vengo",
        germanTranslation: "Ich komme aus Peru.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ a la fiesta?",
        answer: "vienes",
        germanTranslation: "Kommst du zur Party?",
      },
      {
        pronoun: "él",
        sentence: "Él ___ mañana.",
        answer: "viene",
        germanTranslation: "Er kommt morgen.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ de lejos.",
        answer: "venimos",
        germanTranslation: "Wir kommen von weit her.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ conmigo?",
        answer: "vienen",
        germanTranslation: "Kommt ihr mit mir?",
      },
    ],
  },
  // DAR - to give
  {
    infinitive: "dar",
    german: "geben",
    type: "irregular",
    conjugations: {
      yo: "doy",
      tú: "das",
      "él/ella/usted": "da",
      nosotros: "damos",
      "ellos/ustedes": "dan",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo te ___ un regalo.",
        answer: "doy",
        germanTranslation: "Ich gebe dir ein Geschenk.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú me ___ el libro?",
        answer: "das",
        germanTranslation: "Gibst du mir das Buch?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ clases.",
        answer: "da",
        germanTranslation: "Sie gibt Unterricht.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ gracias.",
        answer: "damos",
        germanTranslation: "Wir danken.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos ___ buenas noticias.",
        answer: "dan",
        germanTranslation: "Sie geben gute Nachrichten.",
      },
    ],
  },
  // VER - to see
  {
    infinitive: "ver",
    german: "sehen",
    type: "irregular",
    conjugations: {
      yo: "veo",
      tú: "ves",
      "él/ella/usted": "ve",
      nosotros: "vemos",
      "ellos/ustedes": "ven",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ la televisión.",
        answer: "veo",
        germanTranslation: "Ich sehe fern.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ eso?",
        answer: "ves",
        germanTranslation: "Siehst du das?",
      },
      {
        pronoun: "él",
        sentence: "Él no ___ bien.",
        answer: "ve",
        germanTranslation: "Er sieht nicht gut.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ una película.",
        answer: "vemos",
        germanTranslation: "Wir sehen einen Film.",
      },
      {
        pronoun: "ustedes",
        sentence: "¿Ustedes ___ a María?",
        answer: "ven",
        germanTranslation: "Seht ihr María?",
      },
    ],
  },
  // DORMIR - to sleep
  {
    infinitive: "dormir",
    german: "schlafen",
    type: "irregular",
    conjugations: {
      yo: "duermo",
      tú: "duermes",
      "él/ella/usted": "duerme",
      nosotros: "dormimos",
      "ellos/ustedes": "duermen",
    },
    exampleSentences: [
      {
        pronoun: "yo",
        sentence: "Yo ___ ocho horas.",
        answer: "duermo",
        germanTranslation: "Ich schlafe acht Stunden.",
      },
      {
        pronoun: "tú",
        sentence: "¿Tú ___ bien?",
        answer: "duermes",
        germanTranslation: "Schläfst du gut?",
      },
      {
        pronoun: "ella",
        sentence: "Ella ___ mucho.",
        answer: "duerme",
        germanTranslation: "Sie schläft viel.",
      },
      {
        pronoun: "nosotros",
        sentence: "Nosotros ___ tarde.",
        answer: "dormimos",
        germanTranslation: "Wir schlafen spät.",
      },
      {
        pronoun: "ellos",
        sentence: "Ellos no ___ nunca.",
        answer: "duermen",
        germanTranslation: "Sie schlafen nie.",
      },
    ],
  },
];

// Get a random conjugation exercise
export function getRandomVerbExercise(): {
  verb: VerbConjugation;
  exercise: VerbConjugation["exampleSentences"][0];
} {
  const verb =
    verbConjugations[Math.floor(Math.random() * verbConjugations.length)];
  const exercise =
    verb.exampleSentences[
      Math.floor(Math.random() * verb.exampleSentences.length)
    ];
  return { verb, exercise };
}

// Get exercises for a specific verb
export function getExercisesForVerb(
  infinitive: string
): VerbConjugation | undefined {
  return verbConjugations.find((v) => v.infinitive === infinitive);
}

// Get a set of random exercises (avoiding duplicates)
export function getVerbExerciseSet(count: number = 10): {
  verb: VerbConjugation;
  exercise: VerbConjugation["exampleSentences"][0];
}[] {
  const exercises: {
    verb: VerbConjugation;
    exercise: VerbConjugation["exampleSentences"][0];
  }[] = [];
  const usedKeys = new Set<string>();

  while (
    exercises.length < count &&
    usedKeys.size < verbConjugations.length * 5
  ) {
    const { verb, exercise } = getRandomVerbExercise();
    const key = `${verb.infinitive}-${exercise.pronoun}`;

    if (!usedKeys.has(key)) {
      usedKeys.add(key);
      exercises.push({ verb, exercise });
    }
  }

  return exercises;
}
