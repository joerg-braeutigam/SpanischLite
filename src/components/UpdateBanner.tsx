import { motion } from "framer-motion";
import { useRegisterSW } from "virtual:pwa-register/react";
import "./UpdateBanner.css";

export function UpdateBanner() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_, r) {
      // Check for updates every hour
      r &&
        setInterval(() => {
          r.update();
        }, 60 * 60 * 1000);
    },
  });

  if (!needRefresh) {
    return null;
  }

  return (
    <motion.div
      className="update-banner"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="update-content">
        <span className="update-icon">✨</span>
        <span className="update-text">Neue Version verfügbar!</span>
      </div>
      <button className="update-btn" onClick={() => updateServiceWorker(true)}>
        Aktualisieren
      </button>
    </motion.div>
  );
}
