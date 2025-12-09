import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useStore } from "./store/useStore";
import { HomePage } from "./pages/HomePage";
import { StudyPage } from "./pages/StudyPage";
import { TypingPage } from "./pages/TypingPage";
import { SpeakingPage } from "./pages/SpeakingPage";
import { FillBlankPage } from "./pages/FillBlankPage";
import { GrammarDrillPage } from "./pages/GrammarDrillPage";
import { SettingsPage } from "./pages/SettingsPage";
import "./App.css";

function AppContent() {
  const { initialize, isLoading, error } = useStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-spinner" />
          <p>Lade Vokabeln...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-screen">
        <div className="error-content">
          <span className="error-icon">⚠️</span>
          <h2>Fehler beim Laden</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Erneut versuchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/study" element={<StudyPage />} />
      <Route path="/typing" element={<TypingPage />} />
      <Route path="/speaking" element={<SpeakingPage />} />
      <Route path="/fill-blank" element={<FillBlankPage />} />
      <Route path="/drill/:type" element={<GrammarDrillPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
