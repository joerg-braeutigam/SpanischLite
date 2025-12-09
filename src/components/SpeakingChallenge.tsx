import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { Vocabulary } from "../types";
import {
  speakSpanish,
  listenForSpanish,
  stopListening,
  isSpeechRecognitionAvailable,
  type SpeechResult,
} from "../utils/audio";
import "./SpeakingChallenge.css";

interface SpeakingChallengeProps {
  vocabulary: Vocabulary;
  onComplete: (correct: boolean) => void;
}

type ChallengeState = "prompt" | "listening" | "feedback";

export function SpeakingChallenge({
  vocabulary,
  onComplete,
}: SpeakingChallengeProps) {
  const [state, setState] = useState<ChallengeState>("prompt");
  const [result, setResult] = useState<SpeechResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    setIsSupported(isSpeechRecognitionAvailable());
  }, []);

  const handleStartListening = async () => {
    if (!isSupported) {
      setError("Spracherkennung wird in diesem Browser nicht unterstützt.");
      return;
    }

    setState("listening");
    setError(null);
    setResult(null);

    try {
      const speechResult = await listenForSpanish(vocabulary.spanish);
      setResult(speechResult);
      setState("feedback");

      // Auto-play correct pronunciation if wrong
      if (!speechResult.isMatch) {
        setTimeout(() => {
          speakSpanish(vocabulary.spanish);
        }, 500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
      setState("prompt");
    }
  };

  const handleCancel = () => {
    stopListening();
    setState("prompt");
  };

  const handleContinue = () => {
    onComplete(result?.isMatch ?? false);
  };

  const handleRetry = () => {
    setState("prompt");
    setResult(null);
    setError(null);
  };

  const handlePlayCorrect = () => {
    speakSpanish(vocabulary.spanish);
  };

  if (!isSupported) {
    return (
      <div className="speaking-challenge">
        <div className="speaking-card not-supported">
          <span className="not-supported-icon">🎙️</span>
          <h3>Nicht unterstützt</h3>
          <p>
            Spracherkennung ist in diesem Browser nicht verfügbar. Bitte
            verwende Chrome, Safari oder Edge.
          </p>
          <button className="skip-btn" onClick={() => onComplete(false)}>
            Überspringen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="speaking-challenge">
      <AnimatePresence mode="wait">
        {state === "prompt" && (
          <motion.div
            key="prompt"
            className="speaking-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <span className="word-type">{vocabulary.wordType}</span>

            <div className="prompt-content">
              <p className="instruction">Sag dieses Wort auf Spanisch:</p>
              <h2 className="german-word">{vocabulary.german}</h2>
            </div>

            {error && <p className="error-message">{error}</p>}

            <button className="mic-button" onClick={handleStartListening}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
              </svg>
              <span>Tippen zum Sprechen</span>
            </button>

            <button
              className="hint-button"
              onClick={handlePlayCorrect}
              title="Aussprache anhören"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              <span>Hinweis anhören</span>
            </button>
          </motion.div>
        )}

        {state === "listening" && (
          <motion.div
            key="listening"
            className="speaking-card listening"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <div className="listening-animation">
              <div className="pulse-ring" />
              <div className="pulse-ring delay-1" />
              <div className="pulse-ring delay-2" />
              <div className="mic-icon-large">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                  <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                </svg>
              </div>
            </div>
            <p className="listening-text">Ich höre zu...</p>
            <button className="cancel-button" onClick={handleCancel}>
              Abbrechen
            </button>
          </motion.div>
        )}

        {state === "feedback" && result && (
          <motion.div
            key="feedback"
            className={`speaking-card feedback ${
              result.isMatch ? "correct" : "incorrect"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="feedback-icon">{result.isMatch ? "✓" : "✗"}</div>

            <h3 className="feedback-title">
              {result.isMatch ? "Richtig!" : "Nicht ganz..."}
            </h3>

            <div className="feedback-details">
              <div className="feedback-row">
                <span className="label">Du sagtest:</span>
                <span className="value spoken">"{result.transcript}"</span>
              </div>
              <div className="feedback-row">
                <span className="label">Erwartet:</span>
                <span className="value expected">{vocabulary.spanish}</span>
              </div>
              {result.confidence > 0 && (
                <div className="confidence">
                  Erkennungssicherheit: {Math.round(result.confidence * 100)}%
                </div>
              )}
            </div>

            <button className="play-correct-btn" onClick={handlePlayCorrect}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
              Korrekte Aussprache
            </button>

            <div className="feedback-actions">
              {!result.isMatch && (
                <button className="retry-btn" onClick={handleRetry}>
                  Nochmal versuchen
                </button>
              )}
              <button className="continue-btn" onClick={handleContinue}>
                Weiter
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
