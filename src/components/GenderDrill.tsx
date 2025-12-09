import { motion } from "framer-motion";
import { useState } from "react";
import type { GenderAgreementQuestion } from "../types";
import { speakSpanish } from "../utils/audio";
import "./GrammarDrill.css";

interface GenderDrillProps {
  question: GenderAgreementQuestion;
  onComplete: (correct: boolean) => void;
}

export function GenderDrill({ question, onComplete }: GenderDrillProps) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const normalizeString = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted || !input.trim()) return;

    const userAnswer = normalizeString(input);
    const correctAnswer = normalizeString(question.correctForm);

    const correct = userAnswer === correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);

    const fullSentence = `${question.sentence.replace(
      "___",
      question.correctForm
    )}`;
    speakSpanish(fullSentence);
  };

  const handleContinue = () => {
    onComplete(isCorrect);
    setInput("");
    setSubmitted(false);
    setIsCorrect(false);
  };

  const genderLabel =
    question.nounGender === "maskulin" ? "männlich" : "weiblich";
  const numberLabel =
    question.nounNumber === "singular" ? "Singular" : "Plural";

  return (
    <motion.div
      className="grammar-drill"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -300 }}
    >
      <div className="drill-header">
        <span className="drill-type gender">Geschlecht & Zahl</span>
        <h2 className="drill-title">Passe das Adjektiv an</h2>
      </div>

      <div className="sentence-box">
        <p className="drill-sentence">{question.sentence}</p>
        <div className="gender-info">
          <span className="gender-tag">{genderLabel}</span>
          <span className="gender-tag">{numberLabel}</span>
        </div>
      </div>

      <div className="adjective-info">
        <p>
          Grundform: <strong>{question.adjective}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="gender-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Angepasstes Adjektiv..."
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={submitted}
          className={submitted ? (isCorrect ? "correct" : "incorrect") : ""}
        />

        {!submitted && (
          <button type="submit" className="check-btn" disabled={!input.trim()}>
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
            <p className="correct-sentence">
              {question.sentence.replace("___", question.correctForm)}
            </p>
            <p className="explanation">
              {question.adjective} → {question.correctForm}({genderLabel},{" "}
              {numberLabel})
            </p>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Weiter
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
