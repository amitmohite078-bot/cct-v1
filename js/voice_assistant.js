/**
 * AgroCloud AI - Multilingual Speech-to-Speech Voice Assistant
 * Integrates Web Speech API (SpeechRecognition & SpeechSynthesis)
 * Supports Indian regional languages: Hindi, Marathi, Telugu, Tamil, Kannada, Gujarati, and English.
 */
class VoiceAssistant {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.currentLang = "en-IN";
    this.supportedLanguages = {
      "en": { code: "en-IN", name: "English (India)" },
      "hi": { code: "hi-IN", name: "हिन्दी (Hindi)" },
      "mr": { code: "mr-IN", name: "मराठी (Marathi)" },
      "te": { code: "te-IN", name: "తెలుగు (Telugu)" },
      "ta": { code: "ta-IN", name: "தமிழ் (Tamil)" },
      "kn": { code: "kn-IN", name: "ಕನ್ನಡ (Kannada)" },
      "gu": { code: "gu-IN", name: "ગુજરાતી (Gujarati)" }
    };

    this.initRecognition();
  }

  initRecognition() {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      this.recognition = new SpeechRec();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
    } else {
      console.warn("SpeechRecognition API not natively supported on this browser.");
    }
  }

  setLanguage(langKey) {
    if (this.supportedLanguages[langKey]) {
      this.currentLang = this.supportedLanguages[langKey].code;
    }
    if (this.recognition) {
      this.recognition.lang = this.currentLang;
    }
  }

  startListening(onResult, onStatusChange, onError) {
    if (!this.recognition) {
      if (onError) onError("Microphone speech recognition is not supported in this browser. Please use Google Chrome, Edge, or Safari.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    this.recognition.lang = this.currentLang;

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStatusChange) onStatusChange(true);
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      if (onResult) onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      let errMsg = `Speech error: ${event.error}`;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        const host = (typeof window !== "undefined" && window.location && window.location.host) || "127.0.0.1:8001";
        errMsg = `Microphone access blocked. Note: Running on http://${host} is required for Web Speech API in Chrome/Edge.`;
      } else if (event.error === "no-speech") {
        errMsg = "No speech detected. Please speak clearly into your microphone.";
      }
      if (onError) onError(errMsg);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.error("Speech recognition start failed:", e);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, langCode = null) {
    if (!('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis not supported in this browser.");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any ongoing speech

    const cleanText = text.replace(/<[^>]*>?/gm, '').replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langCode || this.currentLang;
    utterance.rate = 0.95; // Slightly slower for clear agrarian comprehension
    utterance.pitch = 1.0;

    // Pick best matching native voice if available
    const voices = window.speechSynthesis.getVoices();
    const targetLangPrefix = (langCode || this.currentLang).slice(0, 2);
    const matchedVoice = voices.find(v => v.lang.startsWith(targetLangPrefix));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }

    window.speechSynthesis.speak(utterance);
  }

  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

window.voiceAssistant = new VoiceAssistant();

