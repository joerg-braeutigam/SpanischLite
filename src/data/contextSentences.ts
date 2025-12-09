import type { ContextSentence } from "../types";

// Default context sentences for common vocabulary
// These provide meaningful learning context even without CSV-embedded contexts

const verbContexts: Record<string, ContextSentence[]> = {
  ser: [
    { spanish: "Yo soy estudiante.", german: "Ich bin Student." },
    {
      spanish: "Ella es muy inteligente.",
      german: "Sie ist sehr intelligent.",
    },
  ],
  estar: [
    { spanish: "¿Cómo estás?", german: "Wie geht es dir?" },
    {
      spanish: "El libro está en la mesa.",
      german: "Das Buch ist auf dem Tisch.",
    },
  ],
  tener: [
    { spanish: "Tengo dos hermanos.", german: "Ich habe zwei Brüder." },
    { spanish: "¿Tienes tiempo?", german: "Hast du Zeit?" },
  ],
  hacer: [
    { spanish: "¿Qué haces?", german: "Was machst du?" },
    {
      spanish: "Voy a hacer la tarea.",
      german: "Ich werde die Hausaufgaben machen.",
    },
  ],
  ir: [
    { spanish: "Voy al supermercado.", german: "Ich gehe zum Supermarkt." },
    { spanish: "¿Adónde vas?", german: "Wohin gehst du?" },
  ],
  poder: [
    { spanish: "¿Puedes ayudarme?", german: "Kannst du mir helfen?" },
    { spanish: "No puedo ir mañana.", german: "Ich kann morgen nicht gehen." },
  ],
  decir: [
    { spanish: "¿Qué dijiste?", german: "Was hast du gesagt?" },
    { spanish: "Dice que viene.", german: "Er sagt, dass er kommt." },
  ],
  haber: [
    { spanish: "He comido.", german: "Ich habe gegessen." },
    {
      spanish: "Hay muchas personas aquí.",
      german: "Es gibt viele Leute hier.",
    },
  ],
  ver: [
    { spanish: "¿Viste la película?", german: "Hast du den Film gesehen?" },
    { spanish: "No veo nada.", german: "Ich sehe nichts." },
  ],
  querer: [
    { spanish: "Quiero un café.", german: "Ich möchte einen Kaffee." },
    { spanish: "Te quiero mucho.", german: "Ich liebe dich sehr." },
  ],
  saber: [
    { spanish: "No sé la respuesta.", german: "Ich weiß die Antwort nicht." },
    { spanish: "¿Sabes cocinar?", german: "Kannst du kochen?" },
  ],
  llegar: [
    { spanish: "¿A qué hora llegas?", german: "Um wie viel Uhr kommst du an?" },
    {
      spanish: "El tren llega a las diez.",
      german: "Der Zug kommt um zehn an.",
    },
  ],
  pasar: [
    { spanish: "¿Qué pasó?", german: "Was ist passiert?" },
    { spanish: "Pasa por aquí.", german: "Komm hier vorbei." },
  ],
  hablar: [
    { spanish: "¿Hablas español?", german: "Sprichst du Spanisch?" },
    { spanish: "Hablamos mañana.", german: "Wir sprechen morgen." },
  ],
  conocer: [
    { spanish: "¿Conoces a mi hermano?", german: "Kennst du meinen Bruder?" },
    {
      spanish: "Quiero conocer México.",
      german: "Ich möchte Mexiko kennenlernen.",
    },
  ],
};

const nounContexts: Record<string, ContextSentence[]> = {
  "el tiempo": [
    { spanish: "No tengo tiempo.", german: "Ich habe keine Zeit." },
    {
      spanish: "El tiempo está loco hoy.",
      german: "Das Wetter ist heute verrückt.",
    },
  ],
  "el año": [
    {
      spanish: "Este año viajo a España.",
      german: "Dieses Jahr reise ich nach Spanien.",
    },
    {
      spanish: "El año pasado estudié mucho.",
      german: "Letztes Jahr habe ich viel gelernt.",
    },
  ],
  "la persona": [
    {
      spanish: "Es una buena persona.",
      german: "Er/Sie ist ein guter Mensch.",
    },
    {
      spanish: "Hay muchas personas aquí.",
      german: "Es gibt viele Leute hier.",
    },
  ],
  "el día": [
    { spanish: "¿Qué día es hoy?", german: "Welcher Tag ist heute?" },
    { spanish: "Fue un buen día.", german: "Es war ein guter Tag." },
  ],
  "la vez": [
    { spanish: "Una vez más, por favor.", german: "Noch einmal, bitte." },
    { spanish: "A veces llueve.", german: "Manchmal regnet es." },
  ],
  "el hombre": [
    {
      spanish: "El hombre camina por la calle.",
      german: "Der Mann geht die Straße entlang.",
    },
    {
      spanish: "Ese hombre es mi padre.",
      german: "Dieser Mann ist mein Vater.",
    },
  ],
  "el mundo": [
    { spanish: "Es el mejor del mundo.", german: "Er ist der Beste der Welt." },
    {
      spanish: "Quiero viajar por el mundo.",
      german: "Ich möchte die Welt bereisen.",
    },
  ],
  "la mujer": [
    { spanish: "La mujer lee un libro.", german: "Die Frau liest ein Buch." },
    { spanish: "Esa mujer es doctora.", german: "Diese Frau ist Ärztin." },
  ],
  "la vida": [
    { spanish: "La vida es bella.", german: "Das Leben ist schön." },
    { spanish: "Así es la vida.", german: "So ist das Leben." },
  ],
  "la casa": [
    { spanish: "Voy a casa.", german: "Ich gehe nach Hause." },
    { spanish: "Mi casa es tu casa.", german: "Mein Haus ist dein Haus." },
  ],
  "el país": [
    {
      spanish: "México es un país grande.",
      german: "Mexiko ist ein großes Land.",
    },
    { spanish: "¿De qué país eres?", german: "Aus welchem Land kommst du?" },
  ],
  "la ciudad": [
    {
      spanish: "Vivo en una ciudad grande.",
      german: "Ich lebe in einer großen Stadt.",
    },
    {
      spanish: "La ciudad es muy bonita.",
      german: "Die Stadt ist sehr schön.",
    },
  ],
  "la mano": [
    { spanish: "Dame la mano.", german: "Gib mir die Hand." },
    {
      spanish: "Tengo algo en la mano.",
      german: "Ich habe etwas in der Hand.",
    },
  ],
  "el problema": [
    { spanish: "No hay problema.", german: "Kein Problem." },
    { spanish: "Tenemos un problema.", german: "Wir haben ein Problem." },
  ],
  "el trabajo": [
    { spanish: "Tengo mucho trabajo.", german: "Ich habe viel Arbeit." },
    { spanish: "¿Cómo está tu trabajo?", german: "Wie läuft deine Arbeit?" },
  ],
};

const adjectiveContexts: Record<string, ContextSentence[]> = {
  nuevo: [
    { spanish: "Tengo un coche nuevo.", german: "Ich habe ein neues Auto." },
    { spanish: "Es una idea nueva.", german: "Es ist eine neue Idee." },
  ],
  grande: [
    { spanish: "La casa es muy grande.", german: "Das Haus ist sehr groß." },
    { spanish: "Es un gran amigo.", german: "Er ist ein großartiger Freund." },
  ],
  bueno: [
    { spanish: "Es un buen libro.", german: "Es ist ein gutes Buch." },
    { spanish: "El tiempo está bueno.", german: "Das Wetter ist gut." },
  ],
  malo: [
    { spanish: "Hace mal tiempo.", german: "Das Wetter ist schlecht." },
    { spanish: "No es malo.", german: "Es ist nicht schlecht." },
  ],
  pequeño: [
    {
      spanish: "Vivo en un apartamento pequeño.",
      german: "Ich wohne in einer kleinen Wohnung.",
    },
    { spanish: "El niño es muy pequeño.", german: "Das Kind ist sehr klein." },
  ],
  importante: [
    { spanish: "Es muy importante.", german: "Es ist sehr wichtig." },
    {
      spanish: "Tengo algo importante que decir.",
      german: "Ich habe etwas Wichtiges zu sagen.",
    },
  ],
  difícil: [
    { spanish: "El examen fue difícil.", german: "Die Prüfung war schwierig." },
    {
      spanish: "Es difícil de entender.",
      german: "Es ist schwer zu verstehen.",
    },
  ],
  fácil: [
    { spanish: "Es muy fácil.", german: "Es ist sehr einfach." },
    { spanish: "La tarea es fácil.", german: "Die Aufgabe ist leicht." },
  ],
  bonito: [
    { spanish: "Qué bonito día.", german: "Was für ein schöner Tag." },
    { spanish: "Tu casa es muy bonita.", german: "Dein Haus ist sehr hübsch." },
  ],
  largo: [
    { spanish: "El viaje fue largo.", german: "Die Reise war lang." },
    { spanish: "Tiene el pelo largo.", german: "Sie hat lange Haare." },
  ],
};

const adverbContexts: Record<string, ContextSentence[]> = {
  muy: [
    { spanish: "Es muy bueno.", german: "Es ist sehr gut." },
    { spanish: "Estoy muy cansado.", german: "Ich bin sehr müde." },
  ],
  más: [
    { spanish: "Quiero más café.", german: "Ich möchte mehr Kaffee." },
    {
      spanish: "Es más difícil de lo que pensé.",
      german: "Es ist schwieriger als ich dachte.",
    },
  ],
  ya: [
    { spanish: "Ya lo sé.", german: "Das weiß ich schon." },
    { spanish: "Ya viene.", german: "Er kommt gleich." },
  ],
  también: [
    { spanish: "Yo también quiero ir.", german: "Ich möchte auch gehen." },
    { spanish: "A mí también me gusta.", german: "Mir gefällt es auch." },
  ],
  siempre: [
    { spanish: "Siempre llego tarde.", german: "Ich komme immer zu spät." },
    { spanish: "Siempre te querré.", german: "Ich werde dich immer lieben." },
  ],
  ahora: [
    { spanish: "Ahora mismo voy.", german: "Ich komme sofort." },
    { spanish: "¿Qué hacemos ahora?", german: "Was machen wir jetzt?" },
  ],
  nunca: [
    { spanish: "Nunca he estado ahí.", german: "Ich war noch nie dort." },
    { spanish: "Nunca digas nunca.", german: "Sag niemals nie." },
  ],
  bien: [
    { spanish: "Estoy bien, gracias.", german: "Mir geht es gut, danke." },
    { spanish: "Lo hiciste muy bien.", german: "Du hast es sehr gut gemacht." },
  ],
  todavía: [
    {
      spanish: "Todavía no he comido.",
      german: "Ich habe noch nicht gegessen.",
    },
    { spanish: "¿Todavía estás aquí?", german: "Bist du noch hier?" },
  ],
  después: [
    { spanish: "Te llamo después.", german: "Ich rufe dich später an." },
    { spanish: "Después de comer.", german: "Nach dem Essen." },
  ],
};

const funktionswortContexts: Record<string, ContextSentence[]> = {
  de: [
    { spanish: "Soy de México.", german: "Ich bin aus Mexiko." },
    { spanish: "Un vaso de agua.", german: "Ein Glas Wasser." },
  ],
  que: [
    { spanish: "Creo que sí.", german: "Ich glaube schon." },
    { spanish: "El libro que leo.", german: "Das Buch, das ich lese." },
  ],
  en: [
    { spanish: "Vivo en España.", german: "Ich lebe in Spanien." },
    { spanish: "Está en la mesa.", german: "Es ist auf dem Tisch." },
  ],
  y: [
    { spanish: "Tú y yo.", german: "Du und ich." },
    { spanish: "Café y pan.", german: "Kaffee und Brot." },
  ],
  a: [
    { spanish: "Voy a casa.", german: "Ich gehe nach Hause." },
    { spanish: "Le doy el libro a ella.", german: "Ich gebe ihr das Buch." },
  ],
  no: [
    { spanish: "No entiendo.", german: "Ich verstehe nicht." },
    { spanish: "No hay problema.", german: "Kein Problem." },
  ],
  por: [
    { spanish: "Gracias por todo.", german: "Danke für alles." },
    { spanish: "Camino por el parque.", german: "Ich gehe durch den Park." },
  ],
  para: [
    { spanish: "Es para ti.", german: "Es ist für dich." },
    { spanish: "Estudio para aprender.", german: "Ich lerne, um zu lernen." },
  ],
  con: [
    { spanish: "Voy con mis amigos.", german: "Ich gehe mit meinen Freunden." },
    { spanish: "Café con leche.", german: "Kaffee mit Milch." },
  ],
  pero: [
    {
      spanish: "Quiero ir, pero no puedo.",
      german: "Ich will gehen, aber ich kann nicht.",
    },
    {
      spanish: "Es difícil, pero posible.",
      german: "Es ist schwierig, aber möglich.",
    },
  ],
};

export function getContextsForWord(
  word: string,
  category: string
): ContextSentence[] {
  const normalizedWord = word.toLowerCase().trim();

  switch (category) {
    case "verben":
      return verbContexts[normalizedWord] || [];
    case "substantive":
      return nounContexts[normalizedWord] || [];
    case "adjektive":
      return adjectiveContexts[normalizedWord] || [];
    case "adverbien":
      return adverbContexts[normalizedWord] || [];
    case "funktionswoerter":
      return funktionswortContexts[normalizedWord] || [];
    default:
      return [];
  }
}

export function generateGenericContext(
  spanish: string,
  german: string
): ContextSentence[] {
  // Generate simple context sentences if no predefined ones exist
  return [
    {
      spanish: `Necesito ${spanish.toLowerCase()}.`,
      german: `Ich brauche ${german.toLowerCase()}.`,
    },
    {
      spanish: `¿Dónde está ${spanish.toLowerCase()}?`,
      german: `Wo ist ${german.toLowerCase()}?`,
    },
  ];
}
