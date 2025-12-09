import { motion } from "framer-motion";
import { useState } from "react";
import type { SaberConocerQuestion } from "../types";
import { speakSpanish } from "../utils/audio";
import "./GrammarDrill.css";

interface SaberConocerDrillProps {
  question: SaberConocerQuestion;
  onComplete: (correct: boolean) => void;
}

export function SaberConocerDrill({
  question,
  onComplete,
}: SaberConocerDrillProps) {
  const [selected, setSelected] = useState<"saber" | "conocer" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (choice: "saber" | "conocer") => {
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
        <span className="drill-type saber-conocer">Saber vs. Conocer</span>
        <h2 className="drill-title">Wähle das richtige Verb</h2>
      </div>

      <div className="sentence-box">
        <p className="drill-sentence">{question.sentence}</p>
      </div>

      <div className="choice-buttons">
        <button
          className={`choice-btn ${selected === "saber" ? "selected" : ""} ${
            submitted && "saber" === question.correctAnswer ? "correct" : ""
          } ${
            submitted && selected === "saber" && !isCorrect ? "incorrect" : ""
          }`}
          onClick={() => handleSelect("saber")}
          disabled={submitted}
        >
          <span className="choice-verb">SABER</span>
          <span className="choice-hint">Wissen/Können</span>
        </button>
        <button
          className={`choice-btn ${selected === "conocer" ? "selected" : ""} ${
            submitted && "conocer" === question.correctAnswer ? "correct" : ""
          } ${
            submitted && selected === "conocer" && !isCorrect ? "incorrect" : ""
          }`}
          onClick={() => handleSelect("conocer")}
          disabled={submitted}
        >
          <span className="choice-verb">CONOCER</span>
          <span className="choice-hint">Kennen/Bekanntschaft</span>
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
