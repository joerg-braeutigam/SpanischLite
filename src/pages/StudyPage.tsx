import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { Flashcard } from "../components/Flashcard";
import type { SRSRating } from "../types";
import "./StudyPage.css";

export function StudyPage() {
  const navigate = useNavigate();
  const { getDailyQueue, getVocabulary, rateCard, startSession, endSession } =
    useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyQueue, setStudyQueue] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const { newCards, reviewCards } = getDailyQueue();
    const queue = [...newCards, ...reviewCards];

    if (queue.length === 0) {
      navigate("/");
      return;
    }

    setStudyQueue(queue);
    startSession(queue, "flashcard");

    return () => {
      endSession();
    };
  }, []);

  const currentVocabId = studyQueue[currentIndex];
  const currentVocab = currentVocabId ? getVocabulary(currentVocabId) : null;

  const handleRate = (rating: SRSRating) => {
    if (!currentVocabId) return;

    rateCard(rating);

    if (rating === "good" || rating === "easy") {
      setCorrectCount((c) => c + 1);
    }

    if (currentIndex + 1 >= studyQueue.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (completed) {
    return (
      <div className="study-page">
        <div className="study-complete">
          <div className="complete-icon">🎉</div>
          <h2>Session abgeschlossen!</h2>
          <p>
            {correctCount} von {studyQueue.length} richtig
          </p>
          <div className="complete-stats">
            <div className="stat-item">
              <span className="stat-value">
                {Math.round((correctCount / studyQueue.length) * 100)}%
              </span>
              <span className="stat-label">Erfolgsrate</span>
            </div>
          </div>
          <button className="home-btn" onClick={() => navigate("/")}>
            Zurück zur Startseite
          </button>
        </div>
      </div>
    );
  }

  if (!currentVocab) {
    return (
      <div className="study-page">
        <div className="loading">Laden...</div>
      </div>
    );
  }

  return (
    <div className="study-page">
      <header className="study-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <div className="progress-info">
          <span>
            {currentIndex + 1} / {studyQueue.length}
          </span>
        </div>
        <div className="header-spacer" />
      </header>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(currentIndex / studyQueue.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <Flashcard
          key={currentVocabId}
          vocabulary={currentVocab}
          onRate={handleRate}
        />
      </AnimatePresence>
    </div>
  );
}
