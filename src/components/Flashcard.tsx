import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import type { Vocabulary, SRSRating } from "../types";
import { speakSpanish } from "../utils/audio";
import "./Flashcard.css";

interface FlashcardProps {
  vocabulary: Vocabulary;
  onRate: (rating: SRSRating) => void;
  showContextFirst?: boolean;
}

export function Flashcard({
  vocabulary,
  onRate,
  showContextFirst = false,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSpeak = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    try {
      await speakSpanish(vocabulary.spanish);
    } catch (error) {
      console.error("Audio error:", error);
    }
    setIsPlaying(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Auto-play audio when showing Spanish side
      handleSpeak();
    }
  };

  const frontContent = showContextFirst
    ? vocabulary.german
    : vocabulary.spanish;
  const backContent = showContextFirst ? vocabulary.spanish : vocabulary.german;

  return (
    <div className="flashcard-container">
      <motion.div
        className="flashcard-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.3 }}
      >
        <div
          className={`flashcard ${isFlipped ? "flipped" : ""}`}
          onClick={handleFlip}
        >
          {/* Front */}
          <div className="flashcard-face flashcard-front">
            <span className="word-type">{vocabulary.wordType}</span>
            <h2 className="word">{frontContent}</h2>
            <p className="hint">Tippen zum Umdrehen</p>
          </div>

          {/* Back */}
          <div className="flashcard-face flashcard-back">
            <span className="word-type">{vocabulary.wordType}</span>
            <h2 className="word">{backContent}</h2>

            <button
              className={`audio-button ${isPlaying ? "playing" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
              }}
              aria-label="Aussprache anhören"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="11,5 6,9 2,9 2,15 6,15 11,19" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            </button>

            {vocabulary.contexts.length > 0 && (
              <div className="contexts">
                {vocabulary.contexts.map((ctx, i) => (
                  <div key={i} className="context">
                    <p className="context-spanish">{ctx.spanish}</p>
                    <p className="context-german">{ctx.german}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isFlipped && (
          <motion.div
            className="rating-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button
              className="rating-btn again"
              onClick={() => onRate("again")}
            >
              <span className="rating-icon">✕</span>
              <span className="rating-label">Nochmal</span>
            </button>
            <button className="rating-btn hard" onClick={() => onRate("hard")}>
              <span className="rating-icon">−</span>
              <span className="rating-label">Schwer</span>
            </button>
            <button className="rating-btn good" onClick={() => onRate("good")}>
              <span className="rating-icon">✓</span>
              <span className="rating-label">Gut</span>
            </button>
            <button className="rating-btn easy" onClick={() => onRate("easy")}>
              <span className="rating-icon">★</span>
              <span className="rating-label">Einfach</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
