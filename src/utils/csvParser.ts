import Papa from "papaparse";
import type { Vocabulary, WordCategory, ContextSentence } from "../types";
import {
  getContextsForWord,
  generateGenericContext,
} from "../data/contextSentences";

interface RawVerbRow {
  Rang: string;
  Spanisch: string;
  Deutsch: string;
  Wortart: string;
  Kontext1_ES?: string;
  Kontext1_DE?: string;
  Kontext2_ES?: string;
  Kontext2_DE?: string;
}

interface RawSubstantivRow {
  Rang: string;
  "Spanisch (mit Artikel)": string;
  Deutsch: string;
  Wortart: string;
  Kontext1_ES?: string;
  Kontext1_DE?: string;
  Kontext2_ES?: string;
  Kontext2_DE?: string;
}

interface RawAdjektivRow {
  Rang: string;
  "Spanisch (M. Singular)": string;
  Deutsch: string;
  Wortart: string;
  Kontext1_ES?: string;
  Kontext1_DE?: string;
  Kontext2_ES?: string;
  Kontext2_DE?: string;
}

interface RawAdverbRow {
  Rang: string;
  Spanisch: string;
  Deutsch: string;
  Kategorie: string;
  Kontext1_ES?: string;
  Kontext1_DE?: string;
  Kontext2_ES?: string;
  Kontext2_DE?: string;
}

interface RawFunktionswortRow {
  Rang: string;
  Spanisch: string;
  Deutsch: string;
  Wortart: string;
  Kontext1_ES?: string;
  Kontext1_DE?: string;
  Kontext2_ES?: string;
  Kontext2_DE?: string;
}

interface RawPronomenRow {
  Deutsch: string;
  "Subjekt (Nominativ)": string;
  "Direktes Objekt (Akkusativ)": string;
  "Indirektes Objekt (Dativ)": string;
  "Reflexivpronomen (Sich)": string;
}

function parseContexts(
  row: Record<string, string | undefined>
): ContextSentence[] {
  const contexts: ContextSentence[] = [];

  if (row.Kontext1_ES && row.Kontext1_DE) {
    contexts.push({
      spanish: row.Kontext1_ES,
      german: row.Kontext1_DE,
    });
  }

  if (row.Kontext2_ES && row.Kontext2_DE) {
    contexts.push({
      spanish: row.Kontext2_ES,
      german: row.Kontext2_DE,
    });
  }

  return contexts;
}

function getContextsWithFallback(
  row: Record<string, string | undefined>,
  spanish: string,
  german: string,
  category: string
): ContextSentence[] {
  // First try to get contexts from CSV
  const csvContexts = parseContexts(row);
  if (csvContexts.length > 0) {
    return csvContexts;
  }

  // Then try predefined contexts
  const predefinedContexts = getContextsForWord(spanish, category);
  if (predefinedContexts.length > 0) {
    return predefinedContexts;
  }

  // Finally, generate generic contexts
  return generateGenericContext(spanish, german);
}

function extractGender(wordType: string): "maskulin" | "feminin" | undefined {
  if (wordType.includes("(m)") || wordType.includes("männlich"))
    return "maskulin";
  if (wordType.includes("(f)") || wordType.includes("weiblich"))
    return "feminin";
  return undefined;
}

export async function parseCSVFile<T>(url: string): Promise<T[]> {
  const response = await fetch(url);
  const text = await response.text();

  return new Promise((resolve, reject) => {
    Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
      error: (error: Error) => {
        reject(error);
      },
    });
  });
}

export async function loadVerben(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawVerbRow>("/data/verben.csv");

  return rows.map((row, index) => ({
    id: `verben-${index + 1}`,
    spanish: row.Spanisch,
    german: row.Deutsch,
    category: "verben" as WordCategory,
    wordType: row.Wortart,
    rank: parseInt(row.Rang) || index + 1,
    contexts: getContextsWithFallback(
      row as unknown as Record<string, string | undefined>,
      row.Spanisch,
      row.Deutsch,
      "verben"
    ),
  }));
}

export async function loadSubstantive(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawSubstantivRow>("/data/substantive.csv");

  return rows.map((row, index) => ({
    id: `substantive-${index + 1}`,
    spanish: row["Spanisch (mit Artikel)"],
    german: row.Deutsch,
    category: "substantive" as WordCategory,
    wordType: row.Wortart,
    rank: parseInt(row.Rang) || index + 1,
    gender: extractGender(row.Wortart),
    contexts: getContextsWithFallback(
      row as unknown as Record<string, string | undefined>,
      row["Spanisch (mit Artikel)"],
      row.Deutsch,
      "substantive"
    ),
  }));
}

export async function loadAdjektive(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawAdjektivRow>("/data/adjektive.csv");

  return rows.map((row, index) => ({
    id: `adjektive-${index + 1}`,
    spanish: row["Spanisch (M. Singular)"],
    german: row.Deutsch,
    category: "adjektive" as WordCategory,
    wordType: row.Wortart,
    rank: parseInt(row.Rang) || index + 1,
    contexts: getContextsWithFallback(
      row as unknown as Record<string, string | undefined>,
      row["Spanisch (M. Singular)"],
      row.Deutsch,
      "adjektive"
    ),
  }));
}

export async function loadAdverbien(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawAdverbRow>("/data/adverbien.csv");

  return rows.map((row, index) => ({
    id: `adverbien-${index + 1}`,
    spanish: row.Spanisch,
    german: row.Deutsch,
    category: "adverbien" as WordCategory,
    wordType: row.Kategorie,
    rank: parseInt(row.Rang) || index + 1,
    contexts: getContextsWithFallback(
      row as unknown as Record<string, string | undefined>,
      row.Spanisch,
      row.Deutsch,
      "adverbien"
    ),
  }));
}

export async function loadFunktionswoerter(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawFunktionswortRow>(
    "/data/funktionswoerter.csv"
  );

  return rows.map((row, index) => ({
    id: `funktionswoerter-${index + 1}`,
    spanish: row.Spanisch,
    german: row.Deutsch,
    category: "funktionswoerter" as WordCategory,
    wordType: row.Wortart,
    rank: parseInt(row.Rang) || index + 1,
    contexts: getContextsWithFallback(
      row as unknown as Record<string, string | undefined>,
      row.Spanisch,
      row.Deutsch,
      "funktionswoerter"
    ),
  }));
}

export async function loadPronomen(): Promise<Vocabulary[]> {
  const rows = await parseCSVFile<RawPronomenRow>("/data/pronomen.csv");

  const vocabularies: Vocabulary[] = [];

  rows.forEach((row, index) => {
    // Create entries for each pronoun type
    if (row["Subjekt (Nominativ)"]) {
      vocabularies.push({
        id: `pronomen-subjekt-${index + 1}`,
        spanish: row["Subjekt (Nominativ)"],
        german: `${row.Deutsch} (Subjekt)`,
        category: "pronomen" as WordCategory,
        wordType: "Subjektpronomen",
        rank: index + 1,
        contexts: [],
      });
    }

    if (row["Direktes Objekt (Akkusativ)"]) {
      vocabularies.push({
        id: `pronomen-akkusativ-${index + 1}`,
        spanish: row["Direktes Objekt (Akkusativ)"],
        german: `${row.Deutsch} (direktes Objekt)`,
        category: "pronomen" as WordCategory,
        wordType: "Akkusativpronomen",
        rank: index + 1,
        contexts: [],
      });
    }
  });

  return vocabularies;
}

export async function loadAllVocabularies(): Promise<Vocabulary[]> {
  const [
    verben,
    substantive,
    adjektive,
    adverbien,
    funktionswoerter,
    pronomen,
  ] = await Promise.all([
    loadVerben(),
    loadSubstantive(),
    loadAdjektive(),
    loadAdverbien(),
    loadFunktionswoerter(),
    loadPronomen(),
  ]);

  return [
    ...verben,
    ...substantive,
    ...adjektive,
    ...adverbien,
    ...funktionswoerter,
    ...pronomen,
  ];
}
