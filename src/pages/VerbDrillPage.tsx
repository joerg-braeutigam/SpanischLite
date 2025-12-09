import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { VerbConjugationDrill } from "../components/VerbConjugationDrill";
import { getVerbExerciseSet } from "../data/verbConjugations";
import type { VerbConjugation } from "../data/verbConjugations";
import "./VerbDrillPage.css";

interface ExerciseItem {
  verb: VerbConjugation;
  exercise: VerbConjugation["exampleSentences"][0];
}

const EXERCISES_PER_SESSION = 10;

export function VerbDrillPage() {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState<ExerciseItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate exercise set
    const exerciseSet = getVerbExerciseSet(EXERCISES_PER_SESSION);
    setExercises(exerciseSet);
    setIsLoading(false);
  }, []);

  const handleComplete = (correct: boolean) => {
    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    const newExercises = getVerbExerciseSet(EXERCISES_PER_SESSION);
    setExercises(newExercises);
    setCurrentIndex(0);
    setCorrectCount(0);
    setIsComplete(false);
  };

  if (isLoading) {
    return (
      <div className="verb-drill-page">
        <div className="loading-state">Lade Übungen...</div>
      </div>
    );
  }

  if (isComplete) {
    const percentage = Math.round((correctCount / exercises.length) * 100);
    let emoji = "🌟";
    let message = "Ausgezeichnet!";

    if (percentage < 50) {
      emoji = "💪";
      message = "Weiter üben!";
    } else if (percentage < 70) {
      emoji = "👍";
      message = "Gut gemacht!";
    } else if (percentage < 90) {
      emoji = "🎉";
      message = "Sehr gut!";
    }

    return (
      <motion.div
        className="verb-drill-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="completion-screen">
          <motion.div
            className="completion-emoji"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
          >
            {emoji}
          </motion.div>

          <h1 className="completion-title">{message}</h1>

          <div className="completion-stats">
            <div className="stat-item">
              <span className="stat-value">{correctCount}</span>
              <span className="stat-label">Richtig</span>
            </div>
            <div className="stat-divider">/</div>
            <div className="stat-item">
              <span className="stat-value">{exercises.length}</span>
              <span className="stat-label">Gesamt</span>
            </div>
          </div>

          <div className="completion-percentage">
            <div
              className="percentage-bar"
              style={{ width: `${percentage}%` }}
            />
            <span className="percentage-text">{percentage}%</span>
          </div>

          <div className="completion-actions">
            <button className="action-btn primary" onClick={handleRestart}>
              🔄 Nochmal üben
            </button>
            <button
              className="action-btn secondary"
              onClick={() => navigate("/")}
            >
              🏠 Zurück
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const currentExercise = exercises[currentIndex];

  return (
    <div className="verb-drill-page">
      {/* Header */}
      <div className="drill-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Zurück
        </button>
        <h1 className="drill-title">Verben üben</h1>
        <div className="progress-indicator">
          {currentIndex + 1} / {exercises.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-container">
        <div
          className="progress-bar-fill"
          style={{ width: `${(currentIndex / exercises.length) * 100}%` }}
        />
      </div>

      {/* Exercise */}
      <div className="exercise-container">
        <AnimatePresence mode="wait">
          <VerbConjugationDrill
            key={currentIndex}
            verb={currentExercise.verb}
            exercise={currentExercise.exercise}
            onComplete={handleComplete}
          />
        </AnimatePresence>
      </div>

      {/* Score indicator */}
      <div className="score-indicator">
        <span className="score-correct">✓ {correctCount}</span>
        <span className="score-incorrect">✗ {currentIndex - correctCount}</span>
      </div>
    </div>
  );
}
