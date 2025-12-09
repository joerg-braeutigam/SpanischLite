import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { VerbConjugation } from "../data/verbConjugations";
import { speakSpanish } from "../utils/audio";
import "./VerbConjugationDrill.css";

interface VerbConjugationDrillProps {
  verb: VerbConjugation;
  exercise: VerbConjugation["exampleSentences"][0];
  onComplete: (correct: boolean) => void;
}

export function VerbConjugationDrill({
  verb,
  exercise,
  onComplete,
}: VerbConjugationDrillProps) {
  const [userInput, setUserInput] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus();
  }, []);

  const normalizeAnswer = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, ""); // Remove accents for comparison
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showResult) {
      onComplete(isCorrect);
      return;
    }

    const userNormalized = normalizeAnswer(userInput);
    const answerNormalized = normalizeAnswer(exercise.answer);
    const correct = userNormalized === answerNormalized;

    setIsCorrect(correct);
    setShowResult(true);

    // Speak the complete sentence
    const completeSentence = exercise.sentence.replace("___", exercise.answer);
    speakSpanish(completeSentence);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
  };

  // Split sentence around the blank
  const parts = exercise.sentence.split("___");

  return (
    <motion.div
      className="verb-drill"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="verb-drill-card">
        {/* Verb Info */}
        <div className="verb-info">
          <span className="verb-infinitive">{verb.infinitive}</span>
          <span className="verb-german">{verb.german}</span>
        </div>

        {/* Pronoun Hint */}
        <div className="pronoun-hint">
          <span className="pronoun">{exercise.pronoun}</span>
        </div>

        {/* Sentence with blank */}
        <div className="sentence-container">
          <p className="sentence">
            <span className="sentence-part">{parts[0]}</span>
            {!showResult ? (
              <input
                ref={inputRef}
                type="text"
                className="verb-input"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="..."
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
                disabled={showResult}
              />
            ) : (
              <span
                className={`answer-display ${
                  isCorrect ? "correct" : "incorrect"
                }`}
              >
                {isCorrect ? exercise.answer : userInput || "—"}
              </span>
            )}
            <span className="sentence-part">{parts[1]}</span>
          </p>
        </div>

        {/* German Translation */}
        <p className="german-translation">{exercise.germanTranslation}</p>

        {/* Result Feedback */}
        {showResult && (
          <motion.div
            className={`result-feedback ${isCorrect ? "correct" : "incorrect"}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {isCorrect ? (
              <>
                <span className="result-icon">✓</span>
                <span className="result-text">Richtig!</span>
              </>
            ) : (
              <>
                <span className="result-icon">✗</span>
                <div className="result-details">
                  <span className="result-text">Die richtige Antwort:</span>
                  <span className="correct-answer">{exercise.answer}</span>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Conjugation Table (shown after answer) */}
        {showResult && !isCorrect && (
          <motion.div
            className="conjugation-table"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <h4>Konjugation von "{verb.infinitive}":</h4>
            <div className="conjugation-grid">
              <div className="conj-row">
                <span className="conj-pronoun">yo</span>
                <span className="conj-form">{verb.conjugations.yo}</span>
              </div>
              <div className="conj-row">
                <span className="conj-pronoun">tú</span>
                <span className="conj-form">{verb.conjugations.tú}</span>
              </div>
              <div className="conj-row">
                <span className="conj-pronoun">él/ella</span>
                <span className="conj-form">
                  {verb.conjugations["él/ella/usted"]}
                </span>
              </div>
              <div className="conj-row">
                <span className="conj-pronoun">nosotros</span>
                <span className="conj-form">{verb.conjugations.nosotros}</span>
              </div>
              <div className="conj-row">
                <span className="conj-pronoun">ellos</span>
                <span className="conj-form">
                  {verb.conjugations["ellos/ustedes"]}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <form onSubmit={handleSubmit} className="action-form">
          {!showResult ? (
            <button
              type="submit"
              className="submit-btn"
              disabled={userInput.trim().length === 0}
            >
              Prüfen
            </button>
          ) : (
            <button
              type="button"
              className="continue-btn"
              onClick={handleContinue}
            >
              Weiter
            </button>
          )}
        </form>
      </div>
    </motion.div>
  );
}
