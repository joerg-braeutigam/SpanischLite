import type { SRSCard, SRSRating } from "../types";

// Anki-like SM-2 algorithm implementation
const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export function createNewCard(vocabularyId: string): SRSCard {
  return {
    vocabularyId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReviewDate: new Date(),
  };
}

export function calculateNextReview(card: SRSCard, rating: SRSRating): SRSCard {
  const now = new Date();
  let { easeFactor, interval, repetitions } = card;

  switch (rating) {
    case "again":
      // Reset - card was forgotten
      repetitions = 0;
      interval = 0;
      easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.2);
      break;

    case "hard":
      // Increase interval slightly, decrease ease
      if (repetitions === 0) {
        interval = 1;
      } else {
        interval = Math.max(1, Math.round(interval * 1.2));
      }
      easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor - 0.15);
      repetitions += 1;
      break;

    case "good":
      // Normal progression
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      break;

    case "easy":
      // Fast progression, increase ease
      if (repetitions === 0) {
        interval = 4;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      repetitions += 1;
      break;
  }

  const nextReviewDate = new Date(now);
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    ...card,
    easeFactor,
    interval,
    repetitions,
    nextReviewDate,
    lastReviewDate: now,
  };
}

export function isDueForReview(card: SRSCard): boolean {
  return new Date() >= new Date(card.nextReviewDate);
}

export function getCardsForReview(
  cards: Map<string, SRSCard>,
  limit: number = 20
): string[] {
  const dueCards: { id: string; date: Date }[] = [];

  cards.forEach((card, id) => {
    if (isDueForReview(card)) {
      dueCards.push({ id, date: new Date(card.nextReviewDate) });
    }
  });

  // Sort by due date (oldest first)
  dueCards.sort((a, b) => a.date.getTime() - b.date.getTime());

  return dueCards.slice(0, limit).map((c) => c.id);
}

export function getNewCards(
  allVocabularyIds: string[],
  existingCards: Map<string, SRSCard>,
  limit: number = 10
): string[] {
  const newCards = allVocabularyIds.filter((id) => !existingCards.has(id));
  return newCards.slice(0, limit);
}

export function getDailyStudyQueue(
  allVocabularyIds: string[],
  cards: Map<string, SRSCard>,
  newCardLimit: number = 10,
  reviewLimit: number = 50
): { newCards: string[]; reviewCards: string[] } {
  const reviewCards = getCardsForReview(cards, reviewLimit);
  const newCards = getNewCards(allVocabularyIds, cards, newCardLimit);

  return { newCards, reviewCards };
}

// Statistics helpers
export function getCardStats(cards: Map<string, SRSCard>): {
  new: number;
  learning: number;
  review: number;
  mature: number;
} {
  let newCount = 0;
  let learning = 0;
  let review = 0;
  let mature = 0;

  cards.forEach((card) => {
    if (card.repetitions === 0) {
      newCount++;
    } else if (card.interval < 21) {
      learning++;
    } else if (card.interval >= 21) {
      mature++;
    }

    if (isDueForReview(card)) {
      review++;
    }
  });

  return { new: newCount, learning, review, mature };
}
