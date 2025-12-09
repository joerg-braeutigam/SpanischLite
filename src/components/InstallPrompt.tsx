import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePWAInstall } from "../hooks/usePWAInstall";
import "./InstallPrompt.css";

export function InstallPrompt() {
  const { canInstall, isInstalled, isIOS, install } = usePWAInstall();
  const [dismissed, setDismissed] = useState(() => {
    const dismissedDate = localStorage.getItem("spanischLite_installDismissed");
    if (!dismissedDate) return false;
    // Show again after 3 days
    const daysSinceDismissed =
      (Date.now() - parseInt(dismissedDate)) / (1000 * 60 * 60 * 24);
    return daysSinceDismissed < 3;
  });
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(
      "spanischLite_installDismissed",
      Date.now().toString()
    );
  };

  const handleInstall = async () => {
    const success = await install();
    if (success) {
      setDismissed(true);
    }
  };

  // Don't show if already installed or dismissed
  if (isInstalled || dismissed) {
    return null;
  }

  // Show iOS-specific instructions
  if (isIOS) {
    return (
      <>
        <motion.div
          className="install-prompt"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <div className="install-content">
            <span className="install-icon">📲</span>
            <div className="install-text">
              <strong>App installieren</strong>
              <span>Für schnelleren Zugriff</span>
            </div>
          </div>
          <div className="install-actions">
            <button
              className="install-btn"
              onClick={() => setShowIOSInstructions(true)}
            >
              Wie?
            </button>
            <button className="dismiss-btn" onClick={handleDismiss}>
              ✕
            </button>
          </div>
        </motion.div>

        {/* iOS Instructions Modal */}
        <AnimatePresence>
          {showIOSInstructions && (
            <motion.div
              className="ios-modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowIOSInstructions(false)}
            >
              <motion.div
                className="ios-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3>App auf iPhone installieren</h3>
                <div className="ios-steps">
                  <div className="ios-step">
                    <span className="step-number">1</span>
                    <span className="step-text">
                      Tippe auf{" "}
                      <span className="share-icon">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                          <polyline points="16 6 12 2 8 6" />
                          <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                      </span>{" "}
                      (Teilen) unten
                    </span>
                  </div>
                  <div className="ios-step">
                    <span className="step-number">2</span>
                    <span className="step-text">
                      Scrolle und wähle "Zum Home-Bildschirm"
                    </span>
                  </div>
                  <div className="ios-step">
                    <span className="step-number">3</span>
                    <span className="step-text">Tippe auf "Hinzufügen"</span>
                  </div>
                </div>
                <button
                  className="ios-close-btn"
                  onClick={() => setShowIOSInstructions(false)}
                >
                  Verstanden
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // Show native install prompt for Android/Chrome
  if (canInstall) {
    return (
      <motion.div
        className="install-prompt"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
      >
        <div className="install-content">
          <span className="install-icon">📲</span>
          <div className="install-text">
            <strong>App installieren</strong>
            <span>Für schnelleren Zugriff</span>
          </div>
        </div>
        <div className="install-actions">
          <button className="install-btn" onClick={handleInstall}>
            Installieren
          </button>
          <button className="dismiss-btn" onClick={handleDismiss}>
            ✕
          </button>
        </div>
      </motion.div>
    );
  }

  return null;
}
