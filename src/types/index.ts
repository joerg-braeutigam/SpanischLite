// Vocabulary Types
export type WordCategory =
  | "verben"
  | "substantive"
  | "adjektive"
  | "adverbien"
  | "pronomen"
  | "funktionswoerter";

export interface Vocabulary {
  id: string;
  spanish: string;
  german: string;
  category: WordCategory;
  wordType: string;
  rank: number;
  gender?: "maskulin" | "feminin" | "neutral";
  contexts: ContextSentence[];
}

export interface ContextSentence {
  spanish: string;
  german: string;
  audioUrl?: string;
}

// SRS Types
export interface SRSCard {
  vocabularyId: string;
  easeFactor: number; // 2.5 default, min 1.3
  interval: number; // in days
  repetitions: number;
  nextReviewDate: Date;
  lastReviewDate?: Date;
}

export type SRSRating = "again" | "hard" | "good" | "easy";

// Drill Types
export type DrillType =
  | "flashcard"
  | "typing"
  | "fill-blank"
  | "ser-estar"
  | "saber-conocer"
  | "pronoun"
  | "gender-agreement";

export interface DrillSession {
  type: DrillType;
  cards: string[]; // vocabulary IDs
  currentIndex: number;
  correct: number;
  incorrect: number;
  startedAt: Date;
}

export interface DrillResult {
  vocabularyId: string;
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
  timeSpent: number; // in ms
}

// Grammar Drill specific types
export interface SerEstarQuestion {
  sentence: string;
  blank: string;
  correctAnswer: "ser" | "estar";
  conjugatedAnswer: string;
  explanation: string;
}

export interface SaberConocerQuestion {
  sentence: string;
  blank: string;
  correctAnswer: "saber" | "conocer";
  conjugatedAnswer: string;
  explanation: string;
}

export interface PronounQuestion {
  sentence: string;
  options: string[];
  correctAnswer: string;
  type: "direct" | "indirect" | "reflexive" | "possessive";
  explanation: string;
}

export interface GenderAgreementQuestion {
  noun: string;
  nounGender: "maskulin" | "feminin";
  nounNumber: "singular" | "plural";
  adjective: string;
  correctForm: string;
  sentence: string;
}

// App State
export interface AppState {
  vocabularies: Vocabulary[];
  srsCards: Map<string, SRSCard>;
  currentSession: DrillSession | null;
  settings: AppSettings;
  isLoading: boolean;
  error: string | null;
}

export interface AppSettings {
  dailyNewCards: number;
  dailyReviewCards: number;
  audioEnabled: boolean;
  hapticFeedback: boolean;
  theme: "light" | "dark" | "auto";
}

// Statistics
export interface StudyStats {
  totalCardsStudied: number;
  totalCorrect: number;
  totalIncorrect: number;
  streak: number;
  lastStudyDate: Date | null;
  cardsPerDay: Record<string, number>;
}
