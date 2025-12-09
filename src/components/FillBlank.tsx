import { motion } from "framer-motion";
import { useState } from "react";
import type { Vocabulary } from "../types";
import { speakSpanish } from "../utils/audio";
import "./FillBlank.css";

interface FillBlankProps {
  vocabulary: Vocabulary;
  onComplete: (correct: boolean) => void;
}

export function FillBlank({ vocabulary, onComplete }: FillBlankProps) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Get a context sentence and create a blank
  const context = vocabulary.contexts[0];
  const spanishWord = vocabulary.spanish.replace(/^(el|la|los|las)\s+/i, "");

  // Create sentence with blank
  const sentenceWithBlank =
    context?.spanish.replace(new RegExp(`\\b${spanishWord}\\b`, "i"), "___") ||
    `Ich brauche ___.`;

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;

    const userAnswer = normalizeString(input);
    const correctAnswer = normalizeString(spanishWord);

    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);

    if (context) {
      speakSpanish(context.spanish);
    }
  };

  const handleContinue = () => {
    onComplete(isCorrect);
    setInput("");
    setSubmitted(false);
  };

  if (!context) {
    // Fallback if no context available
    return (
      <div className="fill-blank">
        <p>Kein Kontext verfügbar für dieses Wort.</p>
        <button onClick={() => onComplete(false)}>Überspringen</button>
      </div>
    );
  }

  return (
    <motion.div
      className="fill-blank"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="fill-header">
        <span className="exercise-type">Lückentext</span>
        <h2 className="german-hint">{vocabulary.german}</h2>
      </div>

      <div className="sentence-container">
        <p className="sentence">{sentenceWithBlank}</p>
        <p className="german-translation">{context.german}</p>
      </div>

      <form onSubmit={handleSubmit} className="fill-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Fehlendes Wort..."
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={submitted}
          className={submitted ? (isCorrect ? "correct" : "incorrect") : ""}
        />

        {!submitted && (
          <button type="submit" className="submit-btn" disabled={!input.trim()}>
            Prüfen
          </button>
        )}
      </form>

      {submitted && (
        <motion.div
          className={`result ${isCorrect ? "correct" : "incorrect"}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="result-icon">{isCorrect ? "✓" : "✕"}</div>
          <div className="result-content">
            <p className="result-label">
              {isCorrect ? "Perfekt!" : "Richtige Antwort:"}
            </p>
            <p className="correct-answer">{spanishWord}</p>
            <p className="full-sentence">{context.spanish}</p>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Weiter
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
