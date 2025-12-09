import { motion } from "framer-motion";
import { useState } from "react";
import type { Vocabulary } from "../types";
import { speakSpanish } from "../utils/audio";
import "./TypingChallenge.css";

interface TypingChallengeProps {
  vocabulary: Vocabulary;
  onComplete: (correct: boolean) => void;
}

export function TypingChallenge({
  vocabulary,
  onComplete,
}: TypingChallengeProps) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove diacritics for comparison
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) return;

    // Get the base Spanish word (without article for nouns)
    const spanishWord = vocabulary.spanish.replace(/^(el|la|los|las)\s+/i, "");
    const userAnswer = normalizeString(input);
    const correctAnswer = normalizeString(spanishWord);

    const correct =
      userAnswer === correctAnswer ||
      normalizeString(vocabulary.spanish) === userAnswer;

    setIsCorrect(correct);
    setSubmitted(true);
    speakSpanish(vocabulary.spanish);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
    setInput("");
    setSubmitted(false);
  };

  return (
    <motion.div
      className="typing-challenge"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="challenge-header">
        <span className="word-type">{vocabulary.wordType}</span>
        <h2 className="german-word">{vocabulary.german}</h2>
        <p className="instruction">Schreibe das spanische Wort</p>
      </div>

      <form onSubmit={handleSubmit} className="typing-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Spanisch eingeben..."
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
              {isCorrect ? "Richtig!" : "Nicht ganz..."}
            </p>
            <p className="correct-answer">{vocabulary.spanish}</p>

            {vocabulary.contexts.length > 0 && (
              <div className="result-context">
                <p className="context-spanish">
                  {vocabulary.contexts[0].spanish}
                </p>
                <p className="context-german">
                  {vocabulary.contexts[0].german}
                </p>
              </div>
            )}
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Weiter
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
