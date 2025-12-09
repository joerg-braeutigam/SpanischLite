import { motion } from "framer-motion";
import { useState } from "react";
import type { SerEstarQuestion } from "../types";
import { speakSpanish } from "../utils/audio";
import "./GrammarDrill.css";

interface SerEstarDrillProps {
  question: SerEstarQuestion;
  onComplete: (correct: boolean) => void;
}

export function SerEstarDrill({ question, onComplete }: SerEstarDrillProps) {
  const [selected, setSelected] = useState<"ser" | "estar" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (choice: "ser" | "estar") => {
    if (submitted) return;
    setSelected(choice);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);

    const fullSentence = question.sentence.replace(
      "___",
      question.conjugatedAnswer
    );
    speakSpanish(fullSentence);
  };

  const handleContinue = () => {
    onComplete(selected === question.correctAnswer);
    setSelected(null);
    setSubmitted(false);
  };

  const isCorrect = selected === question.correctAnswer;

  return (
    <motion.div
      className="grammar-drill"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="drill-header">
        <span className="drill-type ser-estar">Ser vs. Estar</span>
        <h2 className="drill-title">Wähle das richtige Verb</h2>
      </div>

      <div className="sentence-box">
        <p className="drill-sentence">{question.sentence}</p>
      </div>

      <div className="choice-buttons">
        <button
          className={`choice-btn ${selected === "ser" ? "selected" : ""} ${
            submitted && "ser" === question.correctAnswer ? "correct" : ""
          } ${
            submitted && selected === "ser" && !isCorrect ? "incorrect" : ""
          }`}
          onClick={() => handleSelect("ser")}
          disabled={submitted}
        >
          <span className="choice-verb">SER</span>
          <span className="choice-hint">Dauerhaft</span>
        </button>
        <button
          className={`choice-btn ${selected === "estar" ? "selected" : ""} ${
            submitted && "estar" === question.correctAnswer ? "correct" : ""
          } ${
            submitted && selected === "estar" && !isCorrect ? "incorrect" : ""
          }`}
          onClick={() => handleSelect("estar")}
          disabled={submitted}
        >
          <span className="choice-verb">ESTAR</span>
          <span className="choice-hint">Zustand/Ort</span>
        </button>
      </div>

      {!submitted && selected && (
        <motion.button
          className="check-btn"
          onClick={handleSubmit}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Prüfen
        </motion.button>
      )}

      {submitted && (
        <motion.div
          className={`result ${isCorrect ? "correct" : "incorrect"}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="result-icon">{isCorrect ? "✓" : "✕"}</div>
          <div className="result-content">
            <p className="correct-sentence">
              {question.sentence.replace("___", question.conjugatedAnswer)}
            </p>
            <p className="explanation">{question.explanation}</p>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Weiter
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
