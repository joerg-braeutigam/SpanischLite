import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useStore } from "../store/useStore";
import { TypingChallenge } from "../components/TypingChallenge";
import "./StudyPage.css";

export function TypingPage() {
  const navigate = useNavigate();
  const { vocabularies, recordAnswer } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [studyQueue, setStudyQueue] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    // Get random selection of vocabularies for typing practice
    const shuffled = [...vocabularies]
      .sort(() => Math.random() - 0.5)
      .slice(0, 10)
      .map((v) => v.id);

    setStudyQueue(shuffled);
  }, [vocabularies]);

  const currentVocabId = studyQueue[currentIndex];
  const currentVocab = vocabularies.find((v) => v.id === currentVocabId);

  const handleComplete = (correct: boolean) => {
    recordAnswer(correct);

    if (correct) {
      setCorrectCount((c) => c + 1);
    }

    if (currentIndex + 1 >= studyQueue.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (studyQueue.length === 0) {
    return (
      <div className="study-page">
        <div className="loading">Laden...</div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="study-page">
        <div className="study-complete">
          <div className="complete-icon">✏️</div>
          <h2>Schreibübung beendet!</h2>
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
        <TypingChallenge
          key={currentVocabId}
          vocabulary={currentVocab}
          onComplete={handleComplete}
        />
      </AnimatePresence>
    </div>
  );
}
