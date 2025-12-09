// Text-to-Speech utility for Latin American Spanish pronunciation

let synth: SpeechSynthesis | null = null;
let spanishVoice: SpeechSynthesisVoice | null = null;

export function initializeAudio(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    synth = window.speechSynthesis;
    loadVoices();

    // Chrome loads voices asynchronously
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }
}

function loadVoices(): void {
  if (!synth) return;

  const voices = synth.getVoices();

  // Log available Spanish voices for debugging
  const spanishVoices = voices.filter((v) => v.lang.startsWith("es"));
  console.log(
    "Available Spanish voices:",
    spanishVoices.map((v) => `${v.name} (${v.lang})`)
  );

  // Check if user has a preferred voice stored
  const storedVoice = localStorage.getItem("spanischLite_preferredVoice");
  if (storedVoice) {
    const preferred = voices.find((v) => v.name === storedVoice);
    if (preferred) {
      spanishVoice = preferred;
      console.log(
        `✅ Using stored preferred voice: ${preferred.name} (${preferred.lang})`
      );
      return;
    }
  }

  // Priority 1: Prefer specific high-quality voices by name
  const preferredNames = ["Paulina", "Mónica"];
  for (const name of preferredNames) {
    const voice = voices.find(
      (v) => v.name.includes(name) && v.lang.startsWith("es")
    );
    if (voice) {
      spanishVoice = voice;
      console.log(`✅ Using preferred voice: ${voice.name} (${voice.lang})`);
      return;
    }
  }

  // Priority 2: Prefer Latin American Spanish locales
  const preferredLocales = [
    "es-419", // Latin America generic
    "es-PE", // Peru
    "es-MX", // Mexico
    "es-AR", // Argentina
    "es-CO", // Colombia
    "es-CL", // Chile
    "es-US", // US Spanish (often LatAm)
    "es-ES", // Spain (fallback)
    "es", // Generic Spanish
  ];

  for (const locale of preferredLocales) {
    const voice = voices.find((v) =>
      v.lang.toLowerCase().startsWith(locale.toLowerCase())
    );
    if (voice) {
      spanishVoice = voice;
      console.log(`Using Spanish voice: ${voice.name} (${voice.lang})`);
      break;
    }
  }

  // Fallback to any Spanish voice
  if (!spanishVoice) {
    spanishVoice = voices.find((v) => v.lang.startsWith("es")) || null;
  }
}

export function speakSpanish(text: string, rate: number = 0.9): Promise<void> {
  return new Promise((resolve, reject) => {
    // Ensure synth is initialized
    if (
      !synth &&
      typeof window !== "undefined" &&
      "speechSynthesis" in window
    ) {
      synth = window.speechSynthesis;
      loadVoices();
    }

    if (!synth) {
      console.error("Speech synthesis not available");
      reject(new Error("Speech synthesis not available"));
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    // Try to use the selected voice, or find one dynamically
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    } else {
      // Try to find a Spanish voice on the fly
      const voices = synth.getVoices();
      const esVoice = voices.find((v) => v.lang.startsWith("es"));
      if (esVoice) {
        utterance.voice = esVoice;
      }
    }

    utterance.lang = "es-MX"; // Peruvian Spanish (Latin American)
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;

    utterance.onend = () => {
      console.log("Speech finished:", text);
      resolve();
    };
    utterance.onerror = (event) => {
      console.error("Speech error:", event.error);
      reject(event.error);
    };

    console.log("Speaking:", text);
    synth.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if (synth) {
    synth.cancel();
  }
}

export function isAudioAvailable(): boolean {
  return synth !== null && spanishVoice !== null;
}

// Get list of available Spanish voices for settings dropdown
export function getAvailableSpanishVoices(): { name: string; lang: string }[] {
  if (!synth) return [];
  return synth
    .getVoices()
    .filter((v) => v.lang.startsWith("es"))
    .map((v) => ({ name: v.name, lang: v.lang }));
}

// Set preferred voice by name
export function setPreferredVoice(voiceName: string): void {
  localStorage.setItem("spanischLite_preferredVoice", voiceName);
  // Reload voices to apply the new preference
  loadVoices();
}

// Get current voice name
export function getCurrentVoiceName(): string | null {
  return spanishVoice?.name || null;
}

// ============================================
// Speech Recognition (Speech-to-Text)
// ============================================

// Define types for Web Speech API (not always available in TypeScript)
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

let recognition: SpeechRecognition | null = null;

export function isSpeechRecognitionAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
  );
}

export function initializeSpeechRecognition(): boolean {
  if (!isSpeechRecognitionAvailable()) {
    console.warn("Speech Recognition not available in this browser");
    return false;
  }

  const SpeechRecognitionConstructor =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  recognition = new SpeechRecognitionConstructor();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "es-MX"; // Peruvian Spanish (Latin American)

  return true;
}

export interface SpeechResult {
  transcript: string;
  confidence: number;
  isMatch: boolean;
}

export function listenForSpanish(expectedWord: string): Promise<SpeechResult> {
  return new Promise((resolve, reject) => {
    // Always create fresh recognition instance to avoid stale state
    if (!isSpeechRecognitionAvailable()) {
      reject(new Error("Speech Recognition nicht verfügbar"));
      return;
    }

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const rec = new SpeechRecognitionConstructor();
    rec.continuous = false;
    rec.interimResults = true; // Show interim results for better feedback
    rec.lang = "es"; // Generic Spanish - works better across browsers

    let hasResult = false;

    rec.onstart = () => {
      console.log("🎤 Speech recognition started");
      console.log("   Language:", rec.lang);
      console.log("   Listening for:", expectedWord);
    };

    rec.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0];
      const transcript = result[0].transcript;

      console.log(
        "🔊 Heard:",
        transcript,
        result.isFinal ? "(final)" : "(interim)"
      );

      // Only process final results
      if (result.isFinal) {
        hasResult = true;
        const transcriptLower = transcript.toLowerCase().trim();
        const expected = expectedWord.toLowerCase().trim();

        console.log(
          "✅ Final result:",
          transcript,
          "| Expected:",
          expectedWord
        );

        // Check for match (exact or close enough)
        const isMatch = compareSpanishWords(transcriptLower, expected);

        resolve({
          transcript: transcript,
          confidence: result[0].confidence,
          isMatch,
        });
      }
    };

    rec.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "no-speech") {
        reject(new Error("Keine Sprache erkannt. Bitte sprich lauter."));
      } else if (event.error === "not-allowed") {
        reject(
          new Error("Mikrofon-Zugriff verweigert. Bitte erlaube den Zugriff.")
        );
      } else if (event.error === "aborted") {
        reject(new Error("Aufnahme abgebrochen."));
      } else {
        reject(new Error(`Fehler: ${event.error}`));
      }
    };

    rec.onend = () => {
      console.log("Speech recognition ended, hasResult:", hasResult);
      if (!hasResult) {
        reject(new Error("Keine Sprache erkannt. Bitte versuche es erneut."));
      }
    };

    try {
      rec.start();
      console.log("Speech recognition starting...");
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      reject(new Error("Spracherkennung konnte nicht gestartet werden"));
    }
  });
}

export function stopListening(): void {
  if (recognition) {
    recognition.abort();
  }
}

// Compare Spanish words with tolerance for common variations
function compareSpanishWords(spoken: string, expected: string): boolean {
  // Exact match
  if (spoken === expected) return true;

  // Normalize: remove accents for comparison
  const normalizeAccents = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const spokenNorm = normalizeAccents(spoken);
  const expectedNorm = normalizeAccents(expected);

  if (spokenNorm === expectedNorm) return true;

  // Check if spoken contains expected or vice versa
  if (spokenNorm.includes(expectedNorm) || expectedNorm.includes(spokenNorm)) {
    return true;
  }

  // Levenshtein distance for fuzzy matching
  const distance = levenshteinDistance(spokenNorm, expectedNorm);
  const maxLen = Math.max(spokenNorm.length, expectedNorm.length);
  const similarity = 1 - distance / maxLen;

  // Accept if 80% similar
  return similarity >= 0.8;
}

// Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}
