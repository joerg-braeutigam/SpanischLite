import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { getCardStats } from "../utils/srs";
import { UpdateBanner } from "../components/UpdateBanner";
import { InstallPrompt } from "../components/InstallPrompt";
import "./HomePage.css";

export function HomePage() {
  const navigate = useNavigate();
  const { vocabularies, srsCards, getDailyQueue, stats } = useStore();

  const { newCards, reviewCards } = getDailyQueue();
  const cardStats = getCardStats(srsCards);
  const totalCards = newCards.length + reviewCards.length;

  const modules = [
    {
      id: "verb-drill",
      title: "Verben üben",
      subtitle: "Konjugation trainieren",
      icon: "🔄",
      color: "#007AFF",
      path: "/verb-drill",
    },
    {
      id: "typing",
      title: "Schreibübung",
      subtitle: "Rechtschreibung trainieren",
      icon: "✏️",
      color: "#34C759",
      path: "/typing",
    },
    {
      id: "speaking",
      title: "Sprechübung",
      subtitle: "Aussprache trainieren",
      icon: "🎙️",
      color: "#FF2D55",
      path: "/speaking",
    },
    {
      id: "fill-blank",
      title: "Lückentext",
      subtitle: "Kontext verstehen",
      icon: "📝",
      color: "#FF9500",
      path: "/fill-blank",
    },
  ];

  const grammarDrills = [
    {
      id: "ser-estar",
      title: "Ser vs. Estar",
      subtitle: "Sein (dauerhaft vs. Zustand)",
      icon: "⚖️",
      color: "#FF3B30",
      path: "/drill/ser-estar",
    },
    {
      id: "saber-conocer",
      title: "Saber vs. Conocer",
      subtitle: "Wissen vs. Kennen",
      icon: "🧠",
      color: "#5856D6",
      path: "/drill/saber-conocer",
    },
    {
      id: "pronoun",
      title: "Pronomen",
      subtitle: "lo/la/le, me/mi, se...",
      icon: "👤",
      color: "#AF52DE",
      path: "/drill/pronoun",
    },
    {
      id: "gender",
      title: "Geschlecht & Zahl",
      subtitle: "Adjektiv-Anpassung",
      icon: "🔤",
      color: "#00C7BE",
      path: "/drill/gender",
    },
  ];

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>SpanischLite</h1>
        <p className="subtitle">LatAm SRS Edition</p>
      </header>

      {/* Update Banner */}
      <UpdateBanner />

      {/* Stats Bar */}
      <motion.div
        className="stats-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="stat">
          <span className="stat-value">{stats.streak}</span>
          <span className="stat-label">🔥 Streak</span>
        </div>
        <div className="stat">
          <span className="stat-value">{vocabularies.length}</span>
          <span className="stat-label">📖 Wörter</span>
        </div>
        <div className="stat">
          <span className="stat-value">{cardStats.mature}</span>
          <span className="stat-label">✨ Gelernt</span>
        </div>
        <div className="stat">
          <span className="stat-value">{cardStats.review}</span>
          <span className="stat-label">🔄 Fällig</span>
        </div>
      </motion.div>

      {/* Daily Study */}
      {totalCards > 0 && (
        <motion.div
          className="daily-study"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate("/study")}
        >
          <div className="daily-content">
            <h2>Tägliche Übung</h2>
            <p>
              {newCards.length} neue + {reviewCards.length} Wiederholungen
            </p>
          </div>
          <div className="daily-action">
            <span className="start-icon">▶</span>
          </div>
        </motion.div>
      )}

      {/* Learning Modules */}
      <section className="module-section">
        <h3 className="section-title">Lernmodus</h3>
        <div className="module-grid">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              className="module-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => navigate(module.path)}
              style={{ "--accent-color": module.color } as React.CSSProperties}
            >
              <span className="module-icon">{module.icon}</span>
              <h4 className="module-title">{module.title}</h4>
              <p className="module-subtitle">{module.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Grammar Drills */}
      <section className="module-section">
        <h3 className="section-title">Grammatik-Drills</h3>
        <div className="drill-list">
          {grammarDrills.map((drill, index) => (
            <motion.div
              key={drill.id}
              className="drill-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => navigate(drill.path)}
              style={{ "--accent-color": drill.color } as React.CSSProperties}
            >
              <span className="drill-icon">{drill.icon}</span>
              <div className="drill-content">
                <h4 className="drill-title">{drill.title}</h4>
                <p className="drill-subtitle">{drill.subtitle}</p>
              </div>
              <span className="drill-arrow">›</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Settings */}
      <section className="module-section">
        <motion.div
          className="settings-link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/settings")}
        >
          <span className="settings-icon">⚙️</span>
          <span>Einstellungen</span>
          <span className="drill-arrow">›</span>
        </motion.div>
      </section>

      {/* Install Prompt */}
      <InstallPrompt />
    </div>
  );
}
