import { create } from "zustand";
import type {
  Vocabulary,
  SRSCard,
  DrillSession,
  AppSettings,
  StudyStats,
  SRSRating,
} from "../types";
import { loadAllVocabularies } from "../utils/csvParser";
import {
  createNewCard,
  calculateNextReview,
  getDailyStudyQueue,
} from "../utils/srs";
import {
  loadSRSCards,
  saveSRSCards,
  loadSettings,
  saveSettings,
  loadStats,
  updateStudyStats,
} from "../utils/storage";
import { initializeAudio } from "../utils/audio";

interface AppStore {
  // State
  vocabularies: Vocabulary[];
  srsCards: Map<string, SRSCard>;
  currentSession: DrillSession | null;
  settings: AppSettings;
  stats: StudyStats;
  isLoading: boolean;
  error: string | null;

  // Actions
  initialize: () => Promise<void>;
  startSession: (vocabularyIds: string[], type: DrillSession["type"]) => void;
  endSession: () => void;
  rateCard: (rating: SRSRating) => void;
  nextCard: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  getVocabulary: (id: string) => Vocabulary | undefined;
  getDailyQueue: () => { newCards: string[]; reviewCards: string[] };
  recordAnswer: (correct: boolean) => void;
}

export const useStore = create<AppStore>((set, get) => ({
  vocabularies: [],
  srsCards: new Map(),
  currentSession: null,
  settings: loadSettings(),
  stats: loadStats(),
  isLoading: true,
  error: null,

  initialize: async () => {
    try {
      set({ isLoading: true, error: null });

      // Initialize audio
      initializeAudio();

      // Load vocabularies from CSV files
      const vocabularies = await loadAllVocabularies();

      // Load SRS cards from storage
      const srsCards = loadSRSCards();

      // Load stats
      const stats = loadStats();

      set({
        vocabularies,
        srsCards,
        stats,
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to initialize:", error);
      set({
        error:
          error instanceof Error
            ? error.message
            : "Fehler beim Laden der Daten",
        isLoading: false,
      });
    }
  },

  startSession: (vocabularyIds, type) => {
    const session: DrillSession = {
      type,
      cards: vocabularyIds,
      currentIndex: 0,
      correct: 0,
      incorrect: 0,
      startedAt: new Date(),
    };
    set({ currentSession: session });
  },

  endSession: () => {
    set({ currentSession: null });
  },

  rateCard: (rating) => {
    const { currentSession, srsCards, vocabularies } = get();
    if (!currentSession) return;

    const vocabId = currentSession.cards[currentSession.currentIndex];
    let card = srsCards.get(vocabId);

    if (!card) {
      // Create new card if it doesn't exist
      const vocab = vocabularies.find((v) => v.id === vocabId);
      if (vocab) {
        card = createNewCard(vocabId);
      } else {
        return;
      }
    }

    const updatedCard = calculateNextReview(card, rating);
    const newCards = new Map(srsCards);
    newCards.set(vocabId, updatedCard);

    saveSRSCards(newCards);
    set({ srsCards: newCards });
  },

  nextCard: () => {
    const { currentSession } = get();
    if (!currentSession) return;

    const nextIndex = currentSession.currentIndex + 1;

    if (nextIndex >= currentSession.cards.length) {
      // Session complete
      set({ currentSession: null });
    } else {
      set({
        currentSession: {
          ...currentSession,
          currentIndex: nextIndex,
        },
      });
    }
  },

  updateSettings: (newSettings) => {
    const settings = { ...get().settings, ...newSettings };
    saveSettings(settings);
    set({ settings });
  },

  getVocabulary: (id) => {
    return get().vocabularies.find((v) => v.id === id);
  },

  getDailyQueue: () => {
    const { vocabularies, srsCards, settings } = get();
    const allIds = vocabularies.map((v) => v.id);
    return getDailyStudyQueue(
      allIds,
      srsCards,
      settings.dailyNewCards,
      settings.dailyReviewCards
    );
  },

  recordAnswer: (correct) => {
    const { currentSession } = get();
    if (!currentSession) return;

    const stats = updateStudyStats(correct);

    set({
      stats,
      currentSession: {
        ...currentSession,
        correct: currentSession.correct + (correct ? 1 : 0),
        incorrect: currentSession.incorrect + (correct ? 0 : 1),
      },
    });
  },
}));
