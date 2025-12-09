import { motion } from "framer-motion";
import { useState } from "react";
import type { PronounQuestion } from "../types";
import { speakSpanish } from "../utils/audio";
import "./GrammarDrill.css";

interface PronounDrillProps {
  question: PronounQuestion;
  onComplete: (correct: boolean) => void;
}

export function PronounDrill({ question, onComplete }: PronounDrillProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (choice: string) => {
    if (submitted) return;
    setSelected(choice);
  };

  const handleSubmit = () => {
    if (!selected || submitted) return;
    setSubmitted(true);

    const fullSentence = question.sentence.replace(
      "___",
      question.correctAnswer
    );
    speakSpanish(fullSentence);
  };

  const handleContinue = () => {
    onComplete(selected === question.correctAnswer);
    setSelected(null);
    setSubmitted(false);
  };

  const isCorrect = selected === question.correctAnswer;

  const typeLabels: Record<string, string> = {
    direct: "Direktes Objekt",
    indirect: "Indirektes Objekt",
    reflexive: "Reflexiv",
    possessive: "Possessiv",
  };

  return (
    <motion.div
      className="grammar-drill"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="drill-header">
        <span className="drill-type pronoun">Pronomen</span>
        <h2 className="drill-title">Wähle das richtige Pronomen</h2>
      </div>

      <div className="sentence-box">
        <p className="drill-sentence">{question.sentence}</p>
      </div>

      <div className="choice-buttons pronoun-choices">
        {question.options.map((option) => (
          <button
            key={option}
            className={`choice-btn ${selected === option ? "selected" : ""} ${
              submitted && option === question.correctAnswer ? "correct" : ""
            } ${
              submitted && selected === option && !isCorrect ? "incorrect" : ""
            }`}
            onClick={() => handleSelect(option)}
            disabled={submitted}
          >
            <span className="choice-verb">{option}</span>
          </button>
        ))}
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
              {question.sentence.replace("___", question.correctAnswer)}
            </p>
            <p className="pronoun-type">{typeLabels[question.type]}</p>
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
