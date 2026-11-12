/**
 * AgroNexus - Multilingual Speech-to-Speech Voice Assistant
 * Integrates Web Speech API (SpeechRecognition & SpeechSynthesis) cleanly across
 * Chrome, Edge, Safari, and mobile browsers with async voice resolution and chunked playback.
 */
class VoiceAssistant {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.autoReadEnabled = true;
    this.currentLang = "en-IN";
    this._cachedVoices = [];
    this._activeUtterances = [];
    this._speakSessionId = 0;

    this.supportedLanguages = {
      en: { code: "en-IN", name: "English (India)" },
      hi: { code: "hi-IN", name: "हिन्दी (Hindi)" },
      mr: { code: "mr-IN", name: "मराठी (Marathi)" },
      te: { code: "te-IN", name: "తెలుగు (Telugu)" },
      ta: { code: "ta-IN", name: "தமிழ் (Tamil)" },
      kn: { code: "kn-IN", name: "ಕನ್ನಡ (Kannada)" },
      gu: { code: "gu-IN", name: "ગુજરાતી (Gujarati)" },
      bn: { code: "bn-IN", name: "বাংলা (Bengali)" },
      ml: { code: "ml-IN", name: "മലയാളം (Malayalam)" },
      pa: { code: "pa-IN", name: "ਪੰਜਾਬੀ (Punjabi)" },
      or: { code: "or-IN", name: "ଓଡ଼ିଆ (Odia)" }
    };

    this.initRecognition();
    this.initVoices();
  }

  initVoices() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const loadVoices = () => {
      try {
        const list = window.speechSynthesis.getVoices();
        if (list && list.length > 0) {
          this._cachedVoices = list;
        }
      } catch (e) { }
    };
    loadVoices();
    if ("onvoiceschanged" in window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  initRecognition() {
    if (typeof window === "undefined") return;
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
    } else if (typeof langKey === "string" && langKey.includes("-")) {
      this.currentLang = langKey;
    }
    if (this.recognition) {
      this.recognition.lang = this.currentLang;
    }
  }

  _pickBestVoice(targetLangCode) {
    const voices = (this._cachedVoices && this._cachedVoices.length > 0)
      ? this._cachedVoices
      : (("speechSynthesis" in window) ? window.speechSynthesis.getVoices() : []);
    if (!voices || voices.length === 0) return null;

    const norm = (targetLangCode || this.currentLang || "en-IN").toLowerCase();
    const prefix = norm.slice(0, 2);

    // 1. Exact locale match (prefer Google/Microsoft natural voices if multiple)
    const exactMatches = voices.filter(v => (v.lang || "").toLowerCase().replace("_", "-") === norm);
    if (exactMatches.length > 0) {
      return exactMatches.find(v => /natural|google|microsoft/i.test(v.name)) || exactMatches[0];
    }

    // 2. Same base language prefix (e.g. "hi" -> "hi-IN")
    const prefixMatches = voices.filter(v => (v.lang || "").toLowerCase().startsWith(prefix));
    if (prefixMatches.length > 0) {
      return prefixMatches.find(v => /natural|google|microsoft/i.test(v.name)) || prefixMatches[0];
    }

    // 3. Shared Devanagari script fallback (Marathi uses Hindi TTS voice cleanly on Windows/Chrome when mr-IN isn't installed)
    if (prefix === "mr") {
      const hiVoice = voices.find(v => (v.lang || "").toLowerCase().startsWith("hi"));
      if (hiVoice) return hiVoice;
    }

    return null;
  }

  _splitSpeechChunks(text, maxLen = 175) {
    const clean = (text || "")
      .replace(/<[^>]*>?/gm, " ")
      .replace(/[*#_`]/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (!clean) return [];

    // Split along sentence boundaries (. ! ? । newline) while keeping chunks under maxLen
    const sentences = clean.split(/(?<=[.!?।])\s+/);
    const chunks = [];
    let buf = "";

    for (const part of sentences) {
      if ((buf + " " + part).trim().length <= maxLen) {
        buf = (buf + " " + part).trim();
      } else {
        if (buf) chunks.push(buf);
        if (part.length <= maxLen) {
          buf = part;
        } else {
          const words = part.split(" ");
          buf = "";
          for (const w of words) {
            if ((buf + " " + w).trim().length > maxLen) {
              if (buf) chunks.push(buf);
              buf = w;
            } else {
              buf = (buf + " " + w).trim();
            }
          }
        }
      }
    }
    if (buf) chunks.push(buf);
    return chunks;
  }

  startListening(onResult, onStatusChange, onError) {
    if (!this.recognition) {
      if (onError) onError("Voice input requires Google Chrome, Microsoft Edge, or Safari over HTTPS or localhost.");
      return;
    }

    if (this.isListening) {
      this.stopListening();
      return;
    }

    // Stop active TTS output before opening the microphone so speaker audio isn't captured
    this.stopSpeaking();
    this.recognition.lang = this.currentLang;

    this.recognition.onstart = () => {
      this.isListening = true;
      if (onStatusChange) onStatusChange(true);
    };

    this.recognition.onresult = (event) => {
      const transcript = (event.results && event.results[0] && event.results[0][0] && event.results[0][0].transcript) || "";
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      if (transcript.trim() && onResult) onResult(transcript.trim());
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      let errMsg = `Voice error: ${event.error}`;
      if (event.error === "not-allowed" || event.error === "service-not-allowed") {
        errMsg = "Microphone permission blocked. Allow mic access in your browser address bar to use Voice input.";
      } else if (event.error === "no-speech") {
        errMsg = "No speech detected. Speak clearly near your microphone and try again.";
      } else if (event.error === "network") {
        errMsg = "Speech recognition service unreachable offline. You can type or click a quick prompt instead.";
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
      // Recover cleanly from InvalidStateError if an earlier session lingered
      try { this.recognition.abort(); } catch (_) { }
      this.isListening = false;
      if (onStatusChange) onStatusChange(false);
      setTimeout(() => {
        try {
          this.recognition.start();
        } catch (retryErr) {
          console.error("Speech recognition start failed:", retryErr);
          if (onError) onError("Could not start microphone. Please check browser mic permissions.");
        }
      }, 120);
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try { this.recognition.stop(); } catch (e) { }
      this.isListening = false;
    }
  }

  speak(text, langCode = null, callbacks = {}) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("SpeechSynthesis not supported on this browser.");
      if (callbacks.onError) callbacks.onError("Text-to-Speech is not supported on this browser.");
      return false;
    }

    const sessionId = ++this._speakSessionId;
    this.stopSpeaking(false);

    const chunks = this._splitSpeechChunks(text, 175);
    if (chunks.length === 0) return false;

    const targetLang = langCode || this.currentLang || "en-IN";

    // Delay slightly after cancel() because Chrome/Edge drop immediate synchronous speak() calls
    setTimeout(() => {
      if (sessionId !== this._speakSessionId) return;

      try { window.speechSynthesis.resume(); } catch (e) { }

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) this._cachedVoices = voices;
      const matchedVoice = this._pickBestVoice(targetLang);

      let idx = 0;
      const speakNext = () => {
        if (sessionId !== this._speakSessionId || idx >= chunks.length) {
          this.isSpeaking = false;
          this._activeUtterances = [];
          if (callbacks.onEnd) callbacks.onEnd();
          return;
        }

        const utterance = new SpeechSynthesisUtterance(chunks[idx]);
        utterance.lang = (matchedVoice && matchedVoice.lang) ? matchedVoice.lang : targetLang;
        utterance.rate = 0.96;
        utterance.pitch = 1.0;
        if (matchedVoice) utterance.voice = matchedVoice;

        utterance.onstart = () => {
          this.isSpeaking = true;
          if (idx === 0 && callbacks.onStart) callbacks.onStart();
        };

        utterance.onend = () => {
          idx += 1;
          speakNext();
        };

        utterance.onerror = (ev) => {
          // Ignore intentional cancellations triggered by a newer speak()/stop() call
          if (ev && (ev.error === "canceled" || ev.error === "interrupted")) {
            this.isSpeaking = false;
            return;
          }
          this.isSpeaking = false;
          this._activeUtterances = [];
          if (callbacks.onError) callbacks.onError("Audio playback unavailable on this device voice pack.");
        };

        // Hold strong reference so Chromium doesn't GC utterance mid-playback
        this._activeUtterances.push(utterance);
        window.speechSynthesis.speak(utterance);
      };

      speakNext();
    }, 60);

    return true;
  }

  stopSpeaking(bumpSession = true) {
    if (bumpSession) this._speakSessionId += 1;
    this.isSpeaking = false;
    this._activeUtterances = [];
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch (e) { }
    }
  }
}

window.voiceAssistant = new VoiceAssistant();
