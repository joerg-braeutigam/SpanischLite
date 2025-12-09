import type { SRSCard, AppSettings, StudyStats } from "../types";

const STORAGE_KEYS = {
  SRS_CARDS: "spanischLite_srsCards",
  SETTINGS: "spanischLite_settings",
  STATS: "spanischLite_stats",
};

// SRS Cards
export function saveSRSCards(cards: Map<string, SRSCard>): void {
  try {
    const data = JSON.stringify(Array.from(cards.entries()));
    localStorage.setItem(STORAGE_KEYS.SRS_CARDS, data);
  } catch (error) {
    console.error("Failed to save SRS cards:", error);
  }
}

export function loadSRSCards(): Map<string, SRSCard> {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SRS_CARDS);
    if (!data) return new Map();

    const entries: [string, SRSCard][] = JSON.parse(data);

    // Convert date strings back to Date objects
    return new Map(
      entries.map(([id, card]) => [
        id,
        {
          ...card,
          nextReviewDate: new Date(card.nextReviewDate),
          lastReviewDate: card.lastReviewDate
            ? new Date(card.lastReviewDate)
            : undefined,
        },
      ])
    );
  } catch (error) {
    console.error("Failed to load SRS cards:", error);
    return new Map();
  }
}

// Settings
export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error("Failed to save settings:", error);
  }
}

export function loadSettings(): AppSettings {
  const defaultSettings: AppSettings = {
    dailyNewCards: 10,
    dailyReviewCards: 50,
    audioEnabled: true,
    hapticFeedback: true,
    theme: "auto",
  };

  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return defaultSettings;
    return { ...defaultSettings, ...JSON.parse(data) };
  } catch (error) {
    console.error("Failed to load settings:", error);
    return defaultSettings;
  }
}

// Statistics
export function saveStats(stats: StudyStats): void {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (error) {
    console.error("Failed to save stats:", error);
  }
}

export function loadStats(): StudyStats {
  const defaultStats: StudyStats = {
    totalCardsStudied: 0,
    totalCorrect: 0,
    totalIncorrect: 0,
    streak: 0,
    lastStudyDate: null,
    cardsPerDay: {},
  };

  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    if (!data) return defaultStats;

    const parsed = JSON.parse(data);
    return {
      ...defaultStats,
      ...parsed,
      lastStudyDate: parsed.lastStudyDate
        ? new Date(parsed.lastStudyDate)
        : null,
    };
  } catch (error) {
    console.error("Failed to load stats:", error);
    return defaultStats;
  }
}

export function updateStudyStats(correct: boolean): StudyStats {
  const stats = loadStats();
  const today = new Date().toISOString().split("T")[0];

  stats.totalCardsStudied += 1;
  if (correct) {
    stats.totalCorrect += 1;
  } else {
    stats.totalIncorrect += 1;
  }

  // Update streak
  const lastDate = stats.lastStudyDate;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];

  if (!lastDate || lastDate.toISOString().split("T")[0] === yesterdayStr) {
    stats.streak += 1;
  } else if (lastDate.toISOString().split("T")[0] !== today) {
    stats.streak = 1;
  }

  stats.lastStudyDate = new Date();
  stats.cardsPerDay[today] = (stats.cardsPerDay[today] || 0) + 1;

  saveStats(stats);
  return stats;
}
