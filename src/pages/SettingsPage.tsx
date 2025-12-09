import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useStore } from "../store/useStore";
import { useRegisterSW } from "virtual:pwa-register/react";
import {
  getAvailableSpanishVoices,
  setPreferredVoice,
  getCurrentVoiceName,
  speakSpanish,
} from "../utils/audio";
import "./SettingsPage.css";

export function SettingsPage() {
  const navigate = useNavigate();
  const { settings, updateSettings, stats, vocabularies, srsCards } =
    useStore();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<
    { name: string; lang: string }[]
  >([]);
  const [currentVoice, setCurrentVoice] = useState<string | null>(null);

  // Load available voices on mount
  useEffect(() => {
    const loadVoiceOptions = () => {
      const voices = getAvailableSpanishVoices();
      setAvailableVoices(voices);
      setCurrentVoice(getCurrentVoiceName());
    };

    // Voices may load asynchronously
    loadVoiceOptions();
    if (typeof speechSynthesis !== "undefined") {
      speechSynthesis.onvoiceschanged = loadVoiceOptions;
    }
  }, []);

  const handleVoiceChange = (voiceName: string) => {
    setPreferredVoice(voiceName);
    setCurrentVoice(voiceName);
    // Play a sample to demo the new voice
    speakSpanish("Hola, ¿cómo estás?");
  };

  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl, r) {
      console.log("SW registered:", swUrl);
      // Check for updates every hour
      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    },
    onRegisterError(error) {
      console.error("SW registration error:", error);
    },
  });

  const handleCheckUpdate = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
      if (needRefresh) {
        if (confirm("Eine neue Version ist verfügbar. Jetzt aktualisieren?")) {
          updateServiceWorker(true);
        }
      } else {
        alert("Du hast bereits die neueste Version!");
      }
    } catch (error) {
      console.error("Update check failed:", error);
      alert("Update-Prüfung fehlgeschlagen");
    }
  };

  const handleResetProgress = () => {
    localStorage.clear();
    window.location.reload();
  };

  const learnedCards = Array.from(srsCards.values()).filter(
    (c) => c.repetitions > 0
  ).length;

  return (
    <div className="settings-page">
      <header className="settings-header">
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
        <h1>Einstellungen</h1>
        <div className="header-spacer" />
      </header>

      <div className="settings-content">
        {/* Statistics */}
        <section className="settings-section">
          <h3 className="section-title">Statistiken</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-value">{stats.totalCardsStudied}</span>
              <span className="stat-label">Karten gelernt</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{stats.streak}</span>
              <span className="stat-label">Tage Streak</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{learnedCards}</span>
              <span className="stat-label">Fortschritt</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">
                {stats.totalCardsStudied > 0
                  ? Math.round(
                      (stats.totalCorrect / stats.totalCardsStudied) * 100
                    )
                  : 0}
                %
              </span>
              <span className="stat-label">Erfolgsrate</span>
            </div>
          </div>
        </section>

        {/* Daily Goals */}
        <section className="settings-section">
          <h3 className="section-title">Tagesziele</h3>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Neue Karten pro Tag</span>
              <span className="setting-value">{settings.dailyNewCards}</span>
            </div>
            <input
              type="range"
              min="5"
              max="50"
              step="5"
              value={settings.dailyNewCards}
              onChange={(e) =>
                updateSettings({ dailyNewCards: parseInt(e.target.value) })
              }
            />
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <span className="setting-label">Wiederholungen pro Tag</span>
              <span className="setting-value">{settings.dailyReviewCards}</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={settings.dailyReviewCards}
              onChange={(e) =>
                updateSettings({ dailyReviewCards: parseInt(e.target.value) })
              }
            />
          </div>
        </section>

        {/* Audio Settings */}
        <section className="settings-section">
          <h3 className="section-title">Audio</h3>

          <div className="setting-toggle">
            <span className="setting-label">Aussprache aktiviert</span>
            <label className="toggle">
              <input
                type="checkbox"
                checked={settings.audioEnabled}
                onChange={(e) =>
                  updateSettings({ audioEnabled: e.target.checked })
                }
              />
              <span className="toggle-slider" />
            </label>
          </div>

          {settings.audioEnabled && availableVoices.length > 0 && (
            <div className="setting-item voice-select">
              <div className="setting-info">
                <span className="setting-label">Stimme</span>
                <span className="setting-value">
                  {currentVoice || "Standard"}
                </span>
              </div>
              <select
                value={currentVoice || ""}
                onChange={(e) => handleVoiceChange(e.target.value)}
                className="voice-dropdown"
              >
                {availableVoices.map((voice) => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </section>

        {/* App Info */}
        <section className="settings-section">
          <h3 className="section-title">App</h3>

          <div className="info-item">
            <span>Vokabeln geladen</span>
            <span className="info-value">{vocabularies.length}</span>
          </div>

          <motion.button
            className="update-btn"
            onClick={handleCheckUpdate}
            whileTap={{ scale: 0.98 }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 12a9 9 0 11-6.219-8.56" />
              <polyline points="21 3 21 9 15 9" />
            </svg>
            Nach Updates suchen
          </motion.button>

          {needRefresh && (
            <motion.button
              className="install-update-btn"
              onClick={() => updateServiceWorker(true)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✨ Neue Version installieren
            </motion.button>
          )}
        </section>

        {/* Danger Zone */}
        <section className="settings-section danger">
          <h3 className="section-title">Daten</h3>

          {!showResetConfirm ? (
            <button
              className="reset-btn"
              onClick={() => setShowResetConfirm(true)}
            >
              Fortschritt zurücksetzen
            </button>
          ) : (
            <div className="confirm-reset">
              <p>Bist du sicher? Alle Daten werden gelöscht!</p>
              <div className="confirm-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setShowResetConfirm(false)}
                >
                  Abbrechen
                </button>
                <button className="confirm-btn" onClick={handleResetProgress}>
                  Ja, löschen
                </button>
              </div>
            </div>
          )}
        </section>

        <footer className="settings-footer">
          <p>SpanischLite v1.0.0</p>
          <p>LatAm SRS Edition</p>
        </footer>
      </div>
    </div>
  );
}
