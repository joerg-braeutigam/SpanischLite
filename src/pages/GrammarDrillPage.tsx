import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SerEstarDrill } from "../components/SerEstarDrill";
import { SaberConocerDrill } from "../components/SaberConocerDrill";
import { PronounDrill } from "../components/PronounDrill";
import { GenderDrill } from "../components/GenderDrill";
import {
  getRandomSerEstarQuestions,
  getRandomSaberConocerQuestions,
  getRandomPronounQuestions,
  getRandomGenderQuestions,
} from "../data/grammarDrills";
import type {
  SerEstarQuestion,
  SaberConocerQuestion,
  PronounQuestion,
  GenderAgreementQuestion,
} from "../types";
import "./StudyPage.css";

type DrillType = "ser-estar" | "saber-conocer" | "pronoun" | "gender";

interface DrillConfig {
  title: string;
  icon: string;
  questions:
    | SerEstarQuestion[]
    | SaberConocerQuestion[]
    | PronounQuestion[]
    | GenderAgreementQuestion[];
}

function getDrillConfig(type: DrillType): DrillConfig {
  switch (type) {
    case "ser-estar":
      return {
        title: "Ser vs. Estar",
        icon: "⚖️",
        questions: getRandomSerEstarQuestions(10),
      };
    case "saber-conocer":
      return {
        title: "Saber vs. Conocer",
        icon: "🧠",
        questions: getRandomSaberConocerQuestions(10),
      };
    case "pronoun":
      return {
        title: "Pronomen",
        icon: "👤",
        questions: getRandomPronounQuestions(10),
      };
    case "gender":
      return {
        title: "Geschlecht & Zahl",
        icon: "🔤",
        questions: getRandomGenderQuestions(10),
      };
    default:
      return {
        title: "Drill",
        icon: "📝",
        questions: [],
      };
  }
}

export function GrammarDrillPage() {
  const navigate = useNavigate();
  const { type } = useParams<{ type: DrillType }>();
  const [config] = useState(() => getDrillConfig(type as DrillType));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const handleComplete = (correct: boolean) => {
    if (correct) {
      setCorrectCount((c) => c + 1);
    }

    if (currentIndex + 1 >= config.questions.length) {
      setCompleted(true);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  if (config.questions.length === 0) {
    return (
      <div className="study-page">
        <div className="loading">Keine Fragen verfügbar</div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="study-page">
        <div className="study-complete">
          <div className="complete-icon">{config.icon}</div>
          <h2>{config.title} beendet!</h2>
          <p>
            {correctCount} von {config.questions.length} richtig
          </p>
          <div className="complete-stats">
            <div className="stat-item">
              <span className="stat-value">
                {Math.round((correctCount / config.questions.length) * 100)}%
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

  const currentQuestion = config.questions[currentIndex];

  const renderDrill = () => {
    switch (type) {
      case "ser-estar":
        return (
          <SerEstarDrill
            key={currentIndex}
            question={currentQuestion as SerEstarQuestion}
            onComplete={handleComplete}
          />
        );
      case "saber-conocer":
        return (
          <SaberConocerDrill
            key={currentIndex}
            question={currentQuestion as SaberConocerQuestion}
            onComplete={handleComplete}
          />
        );
      case "pronoun":
        return (
          <PronounDrill
            key={currentIndex}
            question={currentQuestion as PronounQuestion}
            onComplete={handleComplete}
          />
        );
      case "gender":
        return (
          <GenderDrill
            key={currentIndex}
            question={currentQuestion as GenderAgreementQuestion}
            onComplete={handleComplete}
          />
        );
      default:
        return <div>Unknown drill type</div>;
    }
  };

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
            {config.icon} {currentIndex + 1} / {config.questions.length}
          </span>
        </div>
        <div className="header-spacer" />
      </header>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${(currentIndex / config.questions.length) * 100}%`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">{renderDrill()}</AnimatePresence>
    </div>
  );
}
