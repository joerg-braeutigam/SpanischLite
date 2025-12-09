import type {
  SerEstarQuestion,
  SaberConocerQuestion,
  PronounQuestion,
  GenderAgreementQuestion,
} from "../types";

// Ser vs Estar Drill Data
export const serEstarQuestions: SerEstarQuestion[] = [
  {
    sentence: "Yo ___ médico.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "soy",
    explanation: "Profesiones erfordern 'ser' (dauerhafte Eigenschaft).",
  },
  {
    sentence: "La sopa ___ caliente.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "está",
    explanation: "Zustände (heiß/kalt) erfordern 'estar' (temporärer Zustand).",
  },
  {
    sentence: "Nosotros ___ en la biblioteca.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "estamos",
    explanation: "Ortsangaben erfordern 'estar'.",
  },
  {
    sentence: "Ella ___ muy inteligente.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Persönlichkeitseigenschaften erfordern 'ser'.",
  },
  {
    sentence: "El café ___ frío.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "está",
    explanation:
      "Der Kaffee ist normalerweise heiß, aber jetzt kalt (Zustand).",
  },
  {
    sentence: "Mi hermano ___ alto.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Körperliche Merkmale erfordern 'ser'.",
  },
  {
    sentence: "¿Cómo ___ tú? (Befinden)",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "estás",
    explanation: "Fragen nach dem Befinden verwenden 'estar'.",
  },
  {
    sentence: "La fiesta ___ en mi casa.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Ereignisse (stattfinden) verwenden 'ser'.",
  },
  {
    sentence: "Yo ___ cansado después del trabajo.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "estoy",
    explanation: "Müdigkeit ist ein temporärer Zustand = 'estar'.",
  },
  {
    sentence: "María ___ de México.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Herkunft erfordert 'ser'.",
  },
  {
    sentence: "Los estudiantes ___ listos para el examen.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "están",
    explanation: "'Listo' mit 'estar' = bereit (Zustand). Mit 'ser' = schlau.",
  },
  {
    sentence: "Esta manzana ___ verde.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "está",
    explanation:
      "Der Apfel ist unreif (temporärer Zustand). Mit 'ser' wäre es die Sorte.",
  },
  {
    sentence: "Hoy ___ lunes.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Datum und Wochentage verwenden 'ser'.",
  },
  {
    sentence: "Ella ___ muy guapa hoy.",
    blank: "___",
    correctAnswer: "estar",
    conjugatedAnswer: "está",
    explanation: "Sie sieht heute besonders gut aus (temporär/subjektiv).",
  },
  {
    sentence: "El libro ___ de Juan.",
    blank: "___",
    correctAnswer: "ser",
    conjugatedAnswer: "es",
    explanation: "Besitz erfordert 'ser'.",
  },
];

// Saber vs Conocer Drill Data
export const saberConocerQuestions: SaberConocerQuestion[] = [
  {
    sentence: "Yo ___ hablar español.",
    blank: "___",
    correctAnswer: "saber",
    conjugatedAnswer: "sé",
    explanation: "'Saber' für Fähigkeiten (können/wissen wie).",
  },
  {
    sentence: "¿Tú ___ a María?",
    blank: "___",
    correctAnswer: "conocer",
    conjugatedAnswer: "conoces",
    explanation: "'Conocer' für Personen (kennen/bekannt sein mit).",
  },
  {
    sentence: "Nosotros no ___ la respuesta.",
    blank: "___",
    correctAnswer: "saber",
    conjugatedAnswer: "sabemos",
    explanation: "'Saber' für Fakten und Informationen.",
  },
  {
    sentence: "Ella ___ bien la ciudad de Buenos Aires.",
    blank: "___",
    correctAnswer: "conocer",
    conjugatedAnswer: "conoce",
    explanation: "'Conocer' für Orte (vertraut sein mit).",
  },
  {
    sentence: "¿___ usted dónde está la estación?",
    blank: "___",
    correctAnswer: "saber",
    conjugatedAnswer: "Sabe",
    explanation: "'Saber' für Wissen/Informationen.",
  },
  {
    sentence: "Yo quiero ___ a tu familia.",
    blank: "___",
    correctAnswer: "conocer",
    conjugatedAnswer: "conocer",
    explanation: "'Conocer' = kennenlernen (neue Bekanntschaft).",
  },
  {
    sentence: "Él ___ cocinar muy bien.",
    blank: "___",
    correctAnswer: "saber",
    conjugatedAnswer: "sabe",
    explanation: "'Saber' + Infinitiv = können (Fähigkeit).",
  },
  {
    sentence: "¿___ este restaurante?",
    blank: "___",
    correctAnswer: "conocer",
    conjugatedAnswer: "Conoces",
    explanation: "'Conocer' für Orte und Etablissements.",
  },
  {
    sentence: "No ___ qué hora es.",
    blank: "___",
    correctAnswer: "saber",
    conjugatedAnswer: "sé",
    explanation: "'Saber' für Informationen (Uhrzeit).",
  },
  {
    sentence: "Ellos ___ las obras de García Márquez.",
    blank: "___",
    correctAnswer: "conocer",
    conjugatedAnswer: "conocen",
    explanation: "'Conocer' für Werke, Bücher, Kunst (vertraut sein).",
  },
];

// Pronoun Drill Data
export const pronounQuestions: PronounQuestion[] = [
  {
    sentence: "Yo ___ veo todos los días.",
    options: ["lo", "le", "la", "me"],
    correctAnswer: "lo",
    type: "direct",
    explanation: "'Lo' = ihn (direktes Objekt, männlich).",
  },
  {
    sentence: "___ doy el libro a María.",
    options: ["La", "Le", "Lo", "Se"],
    correctAnswer: "Le",
    type: "indirect",
    explanation: "'Le' = ihr (indirektes Objekt).",
  },
  {
    sentence: "Ella ___ lava las manos.",
    options: ["se", "le", "la", "me"],
    correctAnswer: "se",
    type: "reflexive",
    explanation: "'Se' = sich (reflexiv, sie wäscht sich).",
  },
  {
    sentence: "Es ___ coche. (mein)",
    options: ["mi", "me", "mío", "yo"],
    correctAnswer: "mi",
    type: "possessive",
    explanation: "'Mi' = mein (Possessivpronomen vor dem Nomen).",
  },
  {
    sentence: "¿___ ayudas con la tarea?",
    options: ["Me", "Mi", "Yo", "Le"],
    correctAnswer: "Me",
    type: "direct",
    explanation: "'Me' = mich/mir (1. Person Singular Objektpronomen).",
  },
  {
    sentence: "___ llamo todos los días.",
    options: ["La", "Le", "Lo", "Se"],
    correctAnswer: "La",
    type: "direct",
    explanation: "'La' = sie (direktes Objekt, weiblich).",
  },
  {
    sentence: "Nosotros ___ levantamos temprano.",
    options: ["nos", "les", "se", "me"],
    correctAnswer: "nos",
    type: "reflexive",
    explanation: "'Nos' = uns (reflexiv, wir stehen auf).",
  },
  {
    sentence: "___ hermana está en casa. (deine)",
    options: ["Tu", "Te", "Ti", "Tú"],
    correctAnswer: "Tu",
    type: "possessive",
    explanation: "'Tu' (ohne Akzent) = dein/deine (Possessivpronomen).",
  },
  {
    sentence: "¿Puedes dar___ el libro?",
    options: ["me", "mi", "yo", "le"],
    correctAnswer: "me",
    type: "indirect",
    explanation: "'Me' = mir (indirektes Objekt, angehängt an Infinitiv).",
  },
  {
    sentence: "___ conozco muy bien.",
    options: ["Te", "Tu", "Ti", "Tú"],
    correctAnswer: "Te",
    type: "direct",
    explanation: "'Te' = dich (direktes Objekt, 2. Person).",
  },
];

// Gender Agreement Drill Data
export const genderAgreementQuestions: GenderAgreementQuestion[] = [
  {
    noun: "la casa",
    nounGender: "feminin",
    nounNumber: "singular",
    adjective: "blanco",
    correctForm: "blanca",
    sentence: "La casa ___",
  },
  {
    noun: "los libros",
    nounGender: "maskulin",
    nounNumber: "plural",
    adjective: "interesante",
    correctForm: "interesantes",
    sentence: "Los libros ___",
  },
  {
    noun: "las mujeres",
    nounGender: "feminin",
    nounNumber: "plural",
    adjective: "alto",
    correctForm: "altas",
    sentence: "Las mujeres ___",
  },
  {
    noun: "el problema",
    nounGender: "maskulin",
    nounNumber: "singular",
    adjective: "difícil",
    correctForm: "difícil",
    sentence: "El problema ___",
  },
  {
    noun: "la mano",
    nounGender: "feminin",
    nounNumber: "singular",
    adjective: "pequeño",
    correctForm: "pequeña",
    sentence: "La mano ___",
  },
  {
    noun: "los días",
    nounGender: "maskulin",
    nounNumber: "plural",
    adjective: "largo",
    correctForm: "largos",
    sentence: "Los días ___",
  },
  {
    noun: "las ciudades",
    nounGender: "feminin",
    nounNumber: "plural",
    adjective: "grande",
    correctForm: "grandes",
    sentence: "Las ciudades ___",
  },
  {
    noun: "el agua",
    nounGender: "feminin",
    nounNumber: "singular",
    adjective: "frío",
    correctForm: "fría",
    sentence: "El agua ___",
  },
  {
    noun: "los países",
    nounGender: "maskulin",
    nounNumber: "plural",
    adjective: "hermoso",
    correctForm: "hermosos",
    sentence: "Los países ___",
  },
  {
    noun: "la canción",
    nounGender: "feminin",
    nounNumber: "singular",
    adjective: "nuevo",
    correctForm: "nueva",
    sentence: "La canción ___",
  },
];

// Helper to shuffle array
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Get random questions
export function getRandomSerEstarQuestions(
  count: number = 5
): SerEstarQuestion[] {
  return shuffleArray(serEstarQuestions).slice(0, count);
}

export function getRandomSaberConocerQuestions(
  count: number = 5
): SaberConocerQuestion[] {
  return shuffleArray(saberConocerQuestions).slice(0, count);
}

export function getRandomPronounQuestions(
  count: number = 5
): PronounQuestion[] {
  return shuffleArray(pronounQuestions).slice(0, count);
}

export function getRandomGenderQuestions(
  count: number = 5
): GenderAgreementQuestion[] {
  return shuffleArray(genderAgreementQuestions).slice(0, count);
}
