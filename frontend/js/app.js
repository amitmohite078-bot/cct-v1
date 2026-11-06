/**
 * AgroCloud AI - Main Application Orchestration
 */
class AgroCloudApp {
  constructor() {
    this.currentLat = 19.9975;
    this.currentLon = 73.7898;
    this.currentLocationName = "Detecting Farm Location...";
    this.analysisData = null;
    this.mapManager = null;
    this.suitabilityRenderer = null;
    this.modulesManager = null;
    this.currentLanguage = (window.kbvApp && window.kbvApp.currentLanguage) || "en";
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    if (this.analysisData && this.analysisData.environmental_data) {
      this.renderEnvironmentalCards(this.analysisData.environmental_data);
    }
    if (this.suitabilityRenderer) {
      this.suitabilityRenderer.setLanguage(lang);
    }
    if (this.modulesManager) {
      this.modulesManager.setLanguage(lang);
    }
  }

  localizeSoilClass(soilClass, lang) {
    if (!soilClass) return "";
    const l = lang || this.currentLanguage || "en";
    const dict = {
      "Red Sandy Loam (Alfisols)": {
        en: "Red Sandy Loam (Alfisols)",
        hi: "लाल बलुई दोमट मिट्टी (अल्फीसोल्स)",
        kn: "ಕೆಂಪು ಮರಳು ಮಿಶ್ರಿತ ಜೇಡಿಮಣ್ಣು (ಅಲ್ಫಿಸೋಲ್ಸ್)",
        te: "ఎర్ర ఇసుక నేల (ఆల్ఫిసోల్స్)",
        ta: "செம்மண் மணல் கலந்த வண்டல் (ஆல்பிசோல்ஸ்)",
        mr: "लाल वाळूयुक्त गाळाची माती (अल्फीसोल्स)",
        gu: "લાલ રેતાળ ગોરાડુ જમીન (અલ્ફિસોલ્સ)",
        bn: "লাল বেলে দোআঁশ মাটি (আলফিসোল)",
        ml: "ചുവന്ന മണൽ കലർന്ന പശിമരാശി മണ്ണ് (ആൽഫിസോൾസ്)",
        pa: "ਲਾਲ ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ (ਅਲਫੀਸੋਲਸ)",
        or: "ନାଲି ବାଲିଆ ଦୋରସା ମାଟି (ଆଲଫିସୋଲ୍ସ)"
      },
      "Black Cotton Soil (Vertisols)": {
        en: "Black Cotton Soil (Vertisols)",
        hi: "काली कपास मिट्टी (वर्टिसोल्स)",
        kn: "ಕಪ್ಪು ಹತ್ತಿ ಮಣ್ಣು (ವರ್ಟಿಸೋಲ್ಸ್)",
        te: "నల్ల రేగడి నేల (వెర్టిసోల్స్)",
        ta: "கரிசல் மண் (வெர்ட்டிசோல்ஸ்)",
        mr: "काळी कापसाची माती (व्हर्टिसोल्स)",
        gu: "કાળી કપાસની જમીન (વર્ટિસોલ્સ)",
        bn: "কালো তুলা মাটি (ভার্টিসোল)",
        ml: "കറുത്ത പരുത്തി മണ്ണ് (വെർട്ടിസോൾസ്)",
        pa: "ਕਾਲੀ ਕਪਾਹ ਮਿੱਟੀ (ਵਰਟੀਸੋਲਸ)",
        or: "କଳା କପା ମାଟି (ଭର୍ଟିସୋଲ୍ସ)"
      },
      "Alluvial Loam (Inceptisols)": {
        en: "Alluvial Loam (Inceptisols)",
        hi: "जलोढ़ दोमट मिट्टी (इन्सेप्टिसोल्स)",
        kn: "ಮೆಕ್ಕಲು ಜೇಡಿಮಣ್ಣು (ಇನ್ಸೆಪ್ಟಿಸೋಲ್ಸ್)",
        te: "ఒండ్రు నేల (ఇన్సెప్టిసోల్స్)",
        ta: "வண்டல் மண் (இன்செப்டிசோல்ஸ்)",
        mr: "गाळाची दोमट माती (इन्सेप्टिसोल्स)",
        gu: "કાંપવાળી ગોરાડુ જમીન (ઇન્સેપ્ટિસોલ્સ)",
        bn: "পলি দোআঁশ মাটি (ইনসেপটিসোল)",
        ml: "എക്കൽ പശിമരാശി മണ്ണ് (ഇൻസെപ്റ്റിസോൾസ്)",
        pa: "ਜਲੋਢ ਦੋਮਟ ਮਿੱਟੀ (ਇਨਸੈਪਟੀਸੋਲਸ)",
        or: "ପଟୁ ଦୋରସା ମାଟି (ଇନସେପ୍ଟିସୋଲ୍ସ)"
      },
      "Laterite Loam (Oxisols)": {
        en: "Laterite Loam (Oxisols)",
        hi: "लेटराइट दोमट मिट्टी (ऑक्सीसोल्स)",
        kn: "ಲ್ಯಾಟರೈಟ್ ಜೇಡಿಮಣ್ಣು (ಆಕ್ಸಿಸೋಲ್ಸ್)",
        te: "లేటరైట్ నేల (ఆక్సిసోల్స్)",
        ta: "செம்பாறை மண் (ஆக்ஸிசோல்ஸ்)",
        mr: "जांभा दोमट माती (ऑक्सिसोल्स)",
        gu: "લેટેરાઇટ ગોરાડુ જમીન (ઓક્સિસોલ્સ)",
        bn: "ল্যাটেরাইট দোআঁশ মাটি (অক্সিসোল)",
        ml: "ലാറ്ററൈറ്റ് പശിമരാശി മണ്ണ് (ഓക്സിസോൾസ്)",
        pa: "ਲੈਟਰਾਈਟ ਦੋਮਟ ਮਿੱਟੀ (ਆਕਸੀਸੋਲਸ)",
        or: "ଲେଟେରାଇଟ୍ ଦୋରସା ମାଟି (ଅକ୍ସିସୋଲ୍ସ)"
      },
      "Sandy Loam (Entisols)": {
        en: "Sandy Loam (Entisols)",
        hi: "बलुई दोमट मिट्टी (एन्टीसोल्स)",
        kn: "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು (ಎಂಟಿಸೋಲ್ಸ್)",
        te: "ఇసుక దోమటి నేల (ఎంటిసోల్స్)",
        ta: "மணல் கலந்த வண்டல் மண் (என்டிசோல்ஸ்)",
        mr: "वाळूयुक्त गाळाची माती (एन्टीसोल्स)",
        gu: "રેતાળ ગોરાડુ જમીન (એન્ટિસોલ્સ)",
        bn: "বেলে দোআঁশ মাটি (এনটিসোল)",
        ml: "മണൽ പശിമരാശി മണ്ണ് (എൻ്റിസോൾസ്)",
        pa: "ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ (ਐਂਟੀਸੋਲਸ)",
        or: "ବାଲିଆ ଦୋରସା ମାଟି (ଏଣ୍ଟିସୋଲ୍ସ)"
      }
    };
    for (const key in dict) {
      if (soilClass.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(soilClass.toLowerCase())) {
        return dict[key][l] || dict[key].en;
      }
    }
    return soilClass;
  }

  localizeSoilTexture(tex, lang) {
    if (!tex) return "";
    const l = lang || this.currentLanguage || "en";
    const dict = {
      "Sandy Clay Loam": {
        en: "Sandy Clay Loam",
        hi: "बलुई चिकनी दोमट",
        kn: "ಮರಳು ಜೇಡಿ ಮಣ್ಣು",
        te: "ఇసుక బంకమట్టి నేల",
        ta: "மணல் களிமண் வண்டல்",
        mr: "वाळूयुक्त चिकणमाती",
        gu: "રેતાળ માટીવાળી ગોરાડુ",
        bn: "বেলে এঁটেল দোআঁশ",
        ml: "മണൽ കളിമൺ പശിമരാശി",
        pa: "ਰੇਤਲੀ ਚਿਕਣੀ ਦੋਮਟ",
        or: "ବାଲିଆ ମଟାଳ ଦୋରସା"
      },
      "Clay Loam": {
        en: "Clay Loam",
        hi: "चिकनी दोमट",
        kn: "ಜೇಡಿ ಮಣ್ಣು",
        te: "బంకమట్టి నేల",
        ta: "களிமண் வண்டல்",
        mr: "चिकणमाती",
        gu: "માટીવાળી ગોરાડુ",
        bn: "এঁটেল দোআঁশ",
        ml: "കളിമൺ പശിമരാശി",
        pa: "ਚਿਕਣੀ ਦੋਮਟ",
        or: "ମଟାଳ ଦୋରସା"
      },
      "Sandy Loam": {
        en: "Sandy Loam",
        hi: "बलुई दोमट",
        kn: "ಮರಳು ಮಿಶ್ರಿತ ಮಣ್ಣು",
        te: "ఇసుక నేల",
        ta: "மணல் வண்டல்",
        mr: "वाळूयुक्त गाळ",
        gu: "રેતાળ ગોરાડુ",
        bn: "বেলে দোআঁশ",
        ml: "മണൽ പശിമരാശി",
        pa: "ਰੇਤਲੀ ਦੋਮਟ",
        or: "ବାଲିଆ ଦୋରସା"
      },
      "Loam": {
        en: "Loam",
        hi: "दोमट मिट्टी",
        kn: "ಮೆಕ್ಕಲು ಮಣ್ಣು",
        te: "దోమటి నేల",
        ta: "வண்டல் மண்",
        mr: "गाळाची माती",
        gu: "ગોરાડુ જમીન",
        bn: "দোআঁশ মাটি",
        ml: "പശിമരാശി മണ്ണ്",
        pa: "ਦੋਮਟ ਮਿੱਟੀ",
        or: "ଦୋରସା ମାଟି"
      },
      "Clay": {
        en: "Clay",
        hi: "चिकनी मिट्टी",
        kn: "ಭಾರೀ ಜೇಡಿಮಣ್ಣು",
        te: "బంకమట్టి",
        ta: "களிமண்",
        mr: "काळी चिकणमाती",
        gu: "ચીકણી માટી",
        bn: "এঁটেল মাটি",
        ml: "കളിമണ്ണ്",
        pa: "ਚਿਕਣੀ ਮਿੱਟੀ",
        or: "ମଟାଳ ମାଟି"
      },
      "Optimal Pedology": {
        en: "Optimal Pedology",
        hi: "इष्टतम मृदा संरचना",
        kn: "ಅತ್ಯುತ್ತಮ ಮಣ್ಣಿನ ರಚನೆ",
        te: "అనుకూల నేల నిర్మాణం",
        ta: "சிறந்த மண் கட்டமைப்பு",
        mr: "इष्टतम माती रचना",
        gu: "શ્રેષ્ઠ જમીન રચના",
        bn: "অনুকূল মৃত্তিকা গঠন",
        ml: "അനുയോജ്യമായ മണ്ണ് ഘടന",
        pa: "ਉੱਤਮ ਮਿੱਟੀ ਬਣਤਰ",
        or: "ଉତ୍ତମ ମୃତ୍ତିକା ଗଠନ"
      }
    };
    for (const key in dict) {
      if (tex.toLowerCase().includes(key.toLowerCase())) {
        return dict[key][l] || dict[key].en;
      }
    }
    return tex;
  }

  localizeDrainage(drn, lang) {
    if (!drn) return "";
    const l = lang || this.currentLanguage || "en";
    const dict = {
      "Well to Rapidly Drained": {
        en: "Well to Rapidly Drained",
        hi: "उत्तम से तीव्र जल निकासी",
        kn: "ಉತ್ತಮದಿಂದ ವೇಗದ ಒಳಚರಂಡಿ",
        te: "ఉత్తమ శీఘ్ర నీటి పారుదల",
        ta: "சிறந்த மற்றும் விரைவான வடிகால்",
        mr: "उत्तम ते वेगवान निचरा",
        gu: "ઉત્તમ અને ઝડપી ડ્રેનેજ",
        bn: "উত্তম ও দ্রুত নিষ্কাশন",
        ml: "മികച്ചതും വേഗത്തിലുള്ളതുമായ നീർവാർച്ച",
        pa: "ਵਧੀਆ ਅਤੇ ਤੇਜ਼ ਪਾਣੀ ਨਿਕਾਸ",
        or: "ଉତ୍ତମ ତଥା ଦ୍ରୁତ ଜଳ ନିଷ୍କାସନ"
      },
      "Well Drained": {
        en: "Well Drained",
        hi: "उत्तम जल निकासी",
        kn: "ಉತ್ತಮ ಒಳಚರಂಡಿ",
        te: "మంచి నీటి పారుదల",
        ta: "நல்ல வடிகால்",
        mr: "चांगला निचरा",
        gu: "સારી નિકાસ",
        bn: "উত্তম নিষ্কাশন",
        ml: "നല്ല നീർവാർച്ച",
        pa: "ਵਧੀਆ ਨਿਕਾਸ",
        or: "ଉତ୍ତମ ନିଷ୍କାସନ"
      },
      "Moderately Well Drained": {
        en: "Moderately Well Drained",
        hi: "मध्यम जल निकासी",
        kn: "ಮಧ್ಯಮ ಒಳಚರಂಡಿ",
        te: "మధ్యస్థ నీటి పారుదల",
        ta: "மிதமான வடிகால்",
        mr: "मध्यम निचरा",
        gu: "મધ્યમ નિકાસ",
        bn: "মাঝারি নিষ্কাশন",
        ml: "മിതമായ നീർവാർച്ച",
        pa: "ਮੱਧਮ ਨਿਕਾਸ",
        or: "ମଧ୍ୟମ ନିଷ୍କାସନ"
      },
      "Poorly Drained": {
        en: "Poorly Drained",
        hi: "खराब जल निकासी",
        kn: "ಕಳಪೆ ಒಳಚರಂಡಿ",
        te: "పేలవమైన నీటి పారుదల",
        ta: "மோசமான வடிகால்",
        mr: "कमी निचरा",
        gu: "નબળી નિકાસ",
        bn: "দুর্বল নিষ্কাশন",
        ml: "മോശം നീർവാർച്ച",
        pa: "ਮਾੜਾ ਨਿਕਾਸ",
        or: "ଦୁର୍ବଳ ନିଷ୍କାସନ"
      }
    };
    for (const key in dict) {
      if (drn.toLowerCase().includes(key.toLowerCase())) {
        return dict[key][l] || dict[key].en;
      }
    }
    return drn;
  }

  localizePhStatus(ph, lang) {
    const l = lang || this.currentLanguage || "en";
    if (ph < 6.0) {
      return {
        en: "Acidic", hi: "अम्लीय", kn: "ಆಮ್ಲೀಯ", te: "ఆమ్ల గుణం",
        ta: "அமிலத்தன்மை", mr: "आम्लयुक्त", gu: "એસિડિક", bn: "অম্লীয়",
        ml: "അമ്ലത്വം", pa: "ਤੇਜ਼ਾਬੀ", or: "ଅମ୍ଳୀୟ"
      }[l] || "Acidic";
    }
    if (ph > 7.8) {
      return {
        en: "Alkaline", hi: "क्षारीय", kn: "ಕ್ಷಾರೀಯ", te: "క్షార గుణం",
        ta: "காரத்தன்மை", mr: "अल्कधर्मी", gu: "આલ્કલાઇન", bn: "ক্ষারীয়",
        ml: "ക്ഷാരഗുണം", pa: "ਖਾਰਾ", or: "କ୍ଷାରୀୟ"
      }[l] || "Alkaline";
    }
    return {
      en: "Optimal Neutral", hi: "इष्टतम तटस्थ", kn: "ಅತ್ಯುತ್ತಮ ತಟಸ್ಥ", te: "అనుకూల తటస్థం",
      ta: "சரியான சமநிலை", mr: "इष्टतम तटस्थ", gu: "શ્રેષ્ઠ તટસ્થ", bn: "অনুকূল নিরপেক্ষ",
      ml: "അനുയോജ്യമായ ന്യൂട്രൽ", pa: "ਉੱਤਮ ਨਿਰਪੱਖ", or: "ଉତ୍ତମ ନିରପେକ୍ଷ"
    }[l] || "Optimal Neutral";
  }

  localizeNutrientStatus(status, lang) {
    if (!status) return "";
    const l = lang || this.currentLanguage || "en";
    const dict = {
      "Optimal": { en: "Optimal", hi: "इष्टतम", kn: "ಸೂಕ್ತ", te: "అనుకూలం", ta: "சிறந்தது", mr: "योग्य", gu: "શ્રેષ્ઠ", bn: "অনুকূল", ml: "അനുയോജ്യം", pa: "ਉੱਤਮ", or: "ଉତ୍ତମ" },
      "High": { en: "High", hi: "उच्च", kn: "ಹೆಚ್ಚು", te: "ఎక్కువ", ta: "அதிகம்", mr: "जास्त", gu: "વધુ", bn: "উচ্চ", ml: "കൂടിയത്", pa: "ਵੱਧ", or: "ଅଧିକ" },
      "Medium": { en: "Medium", hi: "मध्यम", kn: "ಮಧ್ಯಮ", te: "మధ్యస్థం", ta: "நடுத்தரம்", mr: "मध्यम", gu: "મધ્યમ", bn: "মাঝারি", ml: "മിതമായത്", pa: "ਦਰਮਿਆਨਾ", or: "ମଧ୍ୟମ" },
      "Low": { en: "Low", hi: "कम", kn: "ಕಡಿಮೆ", te: "తక్కువ", ta: "குறைவு", mr: "कमी", gu: "ઓછું", bn: "কম", ml: "കുറഞ്ഞത്", pa: "ਘੱਟ", or: "କମ୍" },
      "Deficient": { en: "Deficient", hi: "अपर्याप्त", kn: "ಕೊರತೆ", te: "లోపం", ta: "பற்றாக்குறை", mr: "तुटवडा", gu: "ખામીયુક્ત", bn: "ঘাটতি", ml: "കമ്മി", pa: "ਕਮੀ", or: "ଅଭାବ" }
    };
    for (const key in dict) {
      if (status.toLowerCase().includes(key.toLowerCase())) {
        return dict[key][l] || dict[key].en;
      }
    }
    return status;
  }

  async init() {
    try {
      // 1. Initialize Map Manager helper
      this.mapManager = new window.MapManager("kbvRiskMapContainer");

      // 2. Initialize Suitability Renderer
      this.suitabilityRenderer = new window.SuitabilityRenderer("cropSuitabilityContainer", (cropId) => {
        this.handleCropSelected(cropId);
      });
      window.suitabilityRenderer = this.suitabilityRenderer;

      // 3. Initialize Modules Manager
      this.modulesManager = new window.ModulesManager("integratedModulesContainer");
      window.modulesManager = this.modulesManager;

      // 4. Setup Event Listeners
      this.setupUIEventListeners();

      // 5. Automatically initiate exact location detection on startup!
      await this.detectAndInitializeLocation();
    } catch (err) {
      console.error("AgroCloudApp initialization error:", err);
      const statusEl = document.getElementById("analysisStatusText");
      if (statusEl) statusEl.textContent = "1 km × 1 km Analysis Ready";
    }
  }

  async detectAndInitializeLocation() {
    const titleEl = document.getElementById("locationTitleText");
    const statusEl = document.getElementById("analysisStatusText");
    if (titleEl) titleEl.textContent = "📍 Detecting your exact location...";
    if (statusEl) statusEl.textContent = "Requesting location permission... (Click 'Allow' in your browser)";

    this.showToast("📍 Requesting location permission... Please click 'Allow' in browser prompt", 4000);

    try {
      const loc = await this.mapManager.detectBrowserLocation();
      this.currentLat = loc.lat;
      this.currentLon = loc.lon;
      this.showToast(`✅ ${loc.source}`, 4500);
      await this.handleLocationChanged(loc.lat, loc.lon);
    } catch (err) {
      console.warn("Auto-detect failed or dismissed, falling back gracefully:", err);
      this.showToast("📍 Could not auto-detect exact GPS. You can search any village/city or click on map.", 5000);
      await this.handleLocationChanged(this.currentLat, this.currentLon);
    }
  }

  setupUIEventListeners() {
    // Tab switching
    document.querySelectorAll(".tab-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const tab = e.currentTarget.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Geolocation button with multi-stage fallback (GPS -> IP Network -> Manual Selection)
    const geoBtn = document.getElementById("detectLocationBtn");
    if (geoBtn) {
      geoBtn.addEventListener("click", async () => {
        const originalText = geoBtn.innerHTML;
        geoBtn.innerHTML = `⏳ Locating...`;
        geoBtn.disabled = true;

        try {
          const loc = await this.mapManager.detectBrowserLocation();
          this.showToast(`📍 Location detected: ${loc.source}`);
          await this.handleLocationChanged(loc.lat, loc.lon);
        } catch (err) {
          console.warn("Automated location failed, opening manual selection prompt:", err);
          this.showManualLocationPrompt(err.message);
        } finally {
          geoBtn.innerHTML = originalText;
          geoBtn.disabled = false;
        }
      });
    }

    // Layer Switcher Buttons
    document.querySelectorAll(".layer-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".layer-btn").forEach(b => b.classList.remove("active"));
        e.currentTarget.classList.add("active");
        const layer = e.currentTarget.getAttribute("data-layer");
        this.mapManager.setLayerMode(layer);
      });
    });

    // Search input & autocomplete
    const searchInput = document.getElementById("locationSearchInput");
    const dropdown = document.getElementById("searchDropdown");
    let debounceTimer = null;

    if (searchInput && dropdown) {
      searchInput.addEventListener("input", (e) => {
        clearTimeout(debounceTimer);
        const q = e.target.value.trim();
        if (q.length < 2) {
          dropdown.style.display = "none";
          return;
        }

        debounceTimer = setTimeout(async () => {
          const res = await window.ApiClient.searchLocation(q);
          const results = res.results || [];
          if (results.length > 0) {
            dropdown.innerHTML = results.map(r => `
              <div class="search-item" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${r.name}">
                📍 <b>${r.name.split(',')[0]}</b> <span style="font-size:0.75rem; color:#94a3b8;">${r.name.split(',').slice(1, 3).join(',')}</span>
              </div>
            `).join("");
            dropdown.style.display = "block";

            dropdown.querySelectorAll(".search-item").forEach(item => {
              item.addEventListener("click", (evt) => {
                const lat = parseFloat(evt.currentTarget.getAttribute("data-lat"));
                const lon = parseFloat(evt.currentTarget.getAttribute("data-lon"));
                const name = evt.currentTarget.getAttribute("data-name");
                searchInput.value = name;
                dropdown.style.display = "none";
                this.currentLocationName = name;
                this.handleLocationChanged(lat, lon);
              });
            });
          } else {
            dropdown.style.display = "none";
          }
        }, 300);
      });

      // Close dropdown when clicking outside
      document.addEventListener("click", (e) => {
        if (!e.target.closest(".nav-search-section")) {
          dropdown.style.display = "none";
        }
      });
    }

    // Preset selector change
    const presetSelect = document.getElementById("presetLocationSelect");
    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        const val = e.target.value;
        if (!val) return;
        const [latStr, lonStr] = val.split(",");
        const lat = parseFloat(latStr);
        const lon = parseFloat(lonStr);
        const name = e.target.options[e.target.selectedIndex].text;
        this.currentLocationName = name;
        if (searchInput) searchInput.value = name;
        this.handleLocationChanged(lat, lon);
      });
    }

    // Close modal handlers
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".modal-backdrop").forEach(m => m.classList.remove("open"));
      });
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) backdrop.classList.remove("open");
      });
    });
  }

  switchTab(tabId) {
    document.querySelectorAll(".tab-btn").forEach(btn => {
      if (btn.getAttribute("data-tab") === tabId) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    document.querySelectorAll(".tab-content").forEach(content => {
      if (content.id === `tab-${tabId}`) content.classList.add("active");
      else content.classList.remove("active");
    });

    if (this.mapManager && this.mapManager.map) {
      setTimeout(() => this.mapManager.map.invalidateSize(), 150);
    }
  }

  async handleLocationChanged(lat, lon) {
    this.currentLat = lat;
    this.currentLon = lon;
    
    // Reverse geocode location title
    const rev = await window.ApiClient.reverseGeocode(lat, lon);
    if (rev && rev.location_name) {
      this.currentLocationName = rev.location_name;
      if (window.kbvApp && typeof window.kbvApp.updateLocationDisplays === "function") {
        window.kbvApp.updateLocationDisplays(lat, lon, rev.location_name);
      }
      const titleEl = document.getElementById("locationTitleText");
      if (titleEl) {
        const parts = rev.location_name.split(",");
        titleEl.textContent = parts.slice(0, 3).join(",");
      }
      const searchInput = document.getElementById("locationSearchInput");
      if (searchInput && document.activeElement !== searchInput) {
        searchInput.value = rev.location_name;
      }
    }

    await this.runAnalysis(lat, lon);
  }

  async runAnalysis(lat, lon) {
    const indicatorEl = document.getElementById("analysisStatusText");
    if (indicatorEl) indicatorEl.textContent = "Analyzing 1 km² area...";

    // 1. Fetch geo-spatial and suitability data
    this.analysisData = await window.ApiClient.analyzeArea(lat, lon);

    if (indicatorEl) indicatorEl.textContent = `1 km × 1 km Grid Active (${this.analysisData.grid.area_hectares} ha)`;

    // 2. Update Map boundary via KBV UI controller
    if (window.kbvApp && typeof window.kbvApp.initOrUpdateRiskMap === "function") {
      window.kbvApp.initOrUpdateRiskMap(lat, lon);
    }

    // Sync active language from KBV App if available
    if (window.kbvApp && window.kbvApp.currentLanguage) {
      this.currentLanguage = window.kbvApp.currentLanguage;
      if (this.suitabilityRenderer) {
        this.suitabilityRenderer.currentLanguage = window.kbvApp.currentLanguage;
      }
      if (this.modulesManager) {
        this.modulesManager.currentLanguage = window.kbvApp.currentLanguage;
      }
    }

    // 3. Render Environmental Parameter Cards
    this.renderEnvironmentalCards(this.analysisData.environmental_data);

    // 4. Render Grid Metadata
    this.renderGridMetadata(this.analysisData.grid);

    // 5. Render Crop Recommendations
    this.suitabilityRenderer.render(this.analysisData.crop_suitability);

    // 6. Sync Top Recommended Crop to Integrated Modules
    const topCrop = (this.analysisData.crop_suitability.top_recommendations || [])[0];
    if (topCrop) {
      this.handleCropSelected(topCrop.id);
    }
  }

  renderGridMetadata(grid) {
    const coordsEl = document.getElementById("gridCoordsText");
    if (coordsEl) {
      coordsEl.innerHTML = `Centroid: <b>${grid.center.lat.toFixed(5)}, ${grid.center.lon.toFixed(5)}</b>`;
    }

    const bboxEl = document.getElementById("gridBboxDetails");
    if (bboxEl) {
      bboxEl.innerHTML = `
        <div style="font-size:0.75rem; color:#94a3b8; display:grid; grid-template-columns: repeat(2, 1fr); gap:6px;">
          <div>NW: ${grid.corners.north_west.lat.toFixed(4)}, ${grid.corners.north_west.lon.toFixed(4)}</div>
          <div>NE: ${grid.corners.north_east.lat.toFixed(4)}, ${grid.corners.north_east.lon.toFixed(4)}</div>
          <div>SW: ${grid.corners.south_west.lat.toFixed(4)}, ${grid.corners.south_west.lon.toFixed(4)}</div>
          <div>SE: ${grid.corners.south_east.lat.toFixed(4)}, ${grid.corners.south_east.lon.toFixed(4)}</div>
        </div>
      `;
    }
  }

  renderEnvironmentalCards(env) {
    if (!env) return;
    const { weather, soil, terrain } = env;
    const lang = this.currentLanguage || "en";

    // 1. Soil elements
    const soilClassEl = document.getElementById("soilClassValue");
    if (soilClassEl && soil) {
      soilClassEl.textContent = this.localizeSoilClass(soil.soil_classification, lang);
    }

    const soilTaxEl = document.getElementById("soilTaxonomyMeta");
    if (soilTaxEl && soil) {
      soilTaxEl.textContent = this.localizeSoilTexture(soil.texture_class || "Optimal Pedology", lang);
    }

    const soilPhEl = document.getElementById("soilPhValue");
    if (soilPhEl && soil) {
      const phStatus = this.localizePhStatus(soil.ph, lang);
      soilPhEl.textContent = `${soil.ph} pH (${phStatus})`;
    }

    const soilTexEl = document.getElementById("soilTextureValue");
    if (soilTexEl && soil) {
      const tex = this.localizeSoilTexture(soil.texture_class, lang);
      const drn = this.localizeDrainage(soil.drainage || "Well Drained", lang);
      soilTexEl.textContent = `${tex} (${drn})`;
    }

    const soilDrainEl = document.getElementById("soilDrainageValue");
    if (soilDrainEl && soil) {
      soilDrainEl.textContent = this.localizeDrainage(soil.drainage || "Well Drained", lang);
    }

    const soilNEl = document.getElementById("soilNValue");
    if (soilNEl && soil && soil.nutrients) {
      const nStat = this.localizeNutrientStatus(soil.nutrients.n_status, lang);
      soilNEl.textContent = `${soil.nutrients.nitrogen_kgha} kg/ha (${nStat})`;
    }

    const soilPEl = document.getElementById("soilPValue");
    if (soilPEl && soil && soil.nutrients) {
      const pStat = this.localizeNutrientStatus(soil.nutrients.p_status, lang);
      soilPEl.textContent = `${soil.nutrients.phosphorus_kgha} kg/ha (${pStat})`;
    }

    const soilKEl = document.getElementById("soilKValue");
    if (soilKEl && soil && soil.nutrients) {
      const kStat = this.localizeNutrientStatus(soil.nutrients.k_status, lang);
      soilKEl.textContent = `${soil.nutrients.potassium_kgha} kg/ha (${kStat})`;
    }

    const soilSocEl = document.getElementById("soilSocValue");
    if (soilSocEl && soil) {
      soilSocEl.textContent = `${soil.organic_carbon_pct}%`;
    }

    // 2. Weather elements
    const weatherTempEl = document.getElementById("weatherTempValue");
    if (weatherTempEl && weather) {
      const minLbl = {
        en: "Min", hi: "न्यूनतम", kn: "ಕನಿಷ್ಠ", te: "కనిష్ట", ta: "குறைந்தபட்ச",
        mr: "किमान", gu: "ન્યૂનતમ", bn: "নূন্যতম", ml: "കുറഞ്ഞത്", pa: "ਘੱਟੋ-ਘੱਟ", or: "ସର୍ବନିମ୍ନ"
      }[lang] || "Min";
      const maxLbl = {
        en: "Max", hi: "अधिकतम", kn: "ಗರಿಷ್ಠ", te: "గరిష్ట", ta: "அதிகபட்ச",
        mr: "कमाल", gu: "મહત્તમ", bn: "সর্বোচ্চ", ml: "കൂടിയത്", pa: "ਵੱਧ ਤੋਂ ਵੱਧ", or: "ସର୍ବାଧିକ"
      }[lang] || "Max";
      weatherTempEl.textContent = `${weather.current_temperature}°C (${minLbl} ${weather.minimum_temperature}°C / ${maxLbl} ${weather.maximum_temperature}°C)`;
    }

    const weatherHumidityEl = document.getElementById("weatherHumidityValue");
    if (weatherHumidityEl && weather) {
      weatherHumidityEl.textContent = `${weather.humidity}%`;
    }

    const weatherRainEl = document.getElementById("weatherRainfallValue");
    if (weatherRainEl && weather) {
      const mmUnit = {
        en: "mm", hi: "मिमी", kn: "ಮಿ.ಮೀ", te: "మి.మీ", ta: "மி.மீ",
        mr: "मिमी", gu: "મીમી", bn: "মিমি", ml: "മി.മീ", pa: "ਮਿਲੀਮੀਟਰ", or: "ମି.ମି"
      }[lang] || "mm";
      const fcLbl = {
        en: "7-Day Forecast:", hi: "7-दिवसीय पूर्वानुमान:", kn: "7-ದಿನಗಳ ಮುನ್ಸೂಚನೆ:",
        te: "7 రోజుల అంచనా:", ta: "7 நாள் முன்னறிவிப்பு:", mr: "7-दिवसीय अंदाज:",
        gu: "7-દિવસની આગાહી:", bn: "৭ দিনের পূর্বাভাস:", ml: "7 ദിവസത്തെ പ്രവചനം:",
        pa: "7-ਦਿਨਾਂ ਦੀ ਭਵਿੱਖਬਾਣੀ:", or: "୭ ଦିନର ପୂର୍ବାନୁମାନ:"
      }[lang] || "7-Day Forecast:";
      weatherRainEl.textContent = `${weather.annual_rainfall} ${mmUnit} (${fcLbl} ${weather.rainfall_forecast_7d || 0} ${mmUnit})`;
    }

    const weatherSolarEl = document.getElementById("weatherSolarValue");
    if (weatherSolarEl && weather) {
      weatherSolarEl.textContent = `${weather.solar_radiation} MJ/m²/d`;
    }

    // 3. Terrain elements
    const terrainElevEl = document.getElementById("terrainElevValue");
    if (terrainElevEl && terrain) {
      const aslUnit = {
        en: "m a.s.l.", hi: "मीटर (समुद्र तल)", kn: "ಮೀಟರ್ (ಸಮುದ್ರ ಮಟ್ಟದಿಂದ)",
        te: "మీటర్లు (సముద్ర మట్టం)", ta: "மீட்டர் (கடல் மட்டம்)", mr: "मीटर (समुद्र सपाटी)",
        gu: "મીટર (સમુદ્ર સપાટી)", bn: "মিটার (সমুদ্রপৃষ্ঠ)", ml: "മീറ്റർ (സമുദ്രനിരപ്പ്)",
        pa: "ਮੀਟਰ (ਸਮੁੰਦਰ ਤਲ)", or: "ମିଟର (ସମୁଦ୍ର ପତ୍ତନ)"
      }[lang] || "m a.s.l.";
      terrainElevEl.textContent = `${terrain.elevation_m} ${aslUnit}`;
    }

    const terrainSlopeEl = document.getElementById("terrainSlopeValue");
    if (terrainSlopeEl && terrain) {
      const slopeLbl = {
        en: "slope", hi: "ढलान", kn: "ಇಳಿಜಾರು", te: "వాలు", ta: "சரிவு",
        mr: "उतार", gu: "ઢોળાવ", bn: "ঢাল", ml: "ചരിവ്", pa: "ਢਲਾਣ", or: "ଢାଲୁ"
      }[lang] || "slope";
      terrainSlopeEl.textContent = `${terrain.slope_pct}% (${terrain.slope_degrees || 1.0}° ${slopeLbl})`;
    }

    const terrainRiskEl = document.getElementById("terrainRiskValue");
    if (terrainRiskEl && terrain) {
      const floodLbl = {
        en: "Flood:", hi: "बाढ़:", kn: "ಪ್ರವಾಹ:", te: "వరద:", ta: "வெள்ளம்:",
        mr: "पूर:", gu: "પૂર:", bn: "বন্যা:", ml: "വെള്ളപ്പൊക്കം:", pa: "ਹੜ੍ਹ:", or: "ବନ୍ୟା:"
      }[lang] || "Flood:";
      const droughtLbl = {
        en: "Drought:", hi: "सूखा:", kn: "ಬರಗಾಲ:", te: "కరువు:", ta: "வறட்சி:",
        mr: "दुष्काळ:", gu: "દુષ્કાળ:", bn: "খরা:", ml: "വരൾച്ച:", pa: "ਸੋਕਾ:", or: "ମରୁଡ଼ି:"
      }[lang] || "Drought:";
      const floodLevel = this.localizeNutrientStatus(terrain.flood_risk.level, lang);
      const droughtLevel = this.localizeNutrientStatus(terrain.drought_risk.level, lang);
      terrainRiskEl.textContent = `${floodLbl} ${floodLevel} | ${droughtLbl} ${droughtLevel}`;
    }
  }

  async handleCropSelected(cropId) {
    if (!this.analysisData) return;
    const allCrops = this.analysisData.crop_suitability.all_ranked_crops || this.analysisData.crop_suitability.top_recommendations;
    const cropObj = allCrops.find(c => c.id === cropId);
    const cropName = cropObj ? cropObj.name : cropId;

    const fieldContext = {
      ph: this.analysisData.environmental_data.soil.ph,
      texture: this.analysisData.environmental_data.soil.texture_class,
      temperature: this.analysisData.environmental_data.weather.average_temperature
    };

    this.modulesManager.setCrop(cropId, cropName, fieldContext);
    await this.modulesManager.loadModules(this.currentLat, this.currentLon);
  }

  openComparisonModal() {
    if (!this.analysisData) return;
    const top3 = (this.analysisData.crop_suitability.top_recommendations || []).slice(0, 3);
    this.suitabilityRenderer.renderComparisonModal(top3);
    const modal = document.getElementById("comparisonModal");
    if (modal) modal.classList.add("open");
  }

  openProvenanceModal() {
    if (!this.analysisData || !this.analysisData.data_provenance) return;
    const prov = this.analysisData.data_provenance;
    const reg = prov.provenance_registry || {};

    let rows = Object.values(reg).map(p => `
      <tr>
        <td style="font-weight:bold; color:#f0fdf4;">${p.name}</td>
        <td style="color:#10b981; font-weight:600;">${p.value} ${p.unit || ''}</td>
        <td style="color:#cbd5e1;">${p.source}</td>
        <td style="color:#94a3b8;">${p.spatial_resolution}</td>
        <td style="color:#94a3b8;">${p.observation_date}</td>
        <td><span style="background:rgba(16,185,129,0.2); color:#34d399; padding:2px 6px; border-radius:4px; font-weight:bold;">${p.confidence_pct}%</span></td>
        <td style="color:#e2e8f0; font-size:0.75rem;">${p.status}</td>
        <td style="color:#64748b; font-size:0.72rem;">${p.limitations}</td>
      </tr>
    `).join("");

    const body = document.getElementById("provenanceModalBody");
    if (body) {
      body.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding:12px; background:rgba(0,0,0,0.3); border-radius:8px;">
          <div>
            <div style="font-size:0.9rem; font-weight:bold; color:#a7f3d0;">Data Transparency & Scientific Audit Report</div>
            <div style="font-size:0.75rem; color:#94a3b8;">Full observational trail for 1 km × 1 km grid at Lat ${this.currentLat.toFixed(4)}, Lon ${this.currentLon.toFixed(4)}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:1.4rem; font-weight:800; color:#10b981;">${prov.overall_data_confidence_pct}%</div>
            <div style="font-size:0.7rem; color:#94a3b8;">Overall Data Confidence</div>
          </div>
        </div>

        <div style="overflow-x:auto;">
          <table class="provenance-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th>Observed Value</th>
                <th>Public Data Source</th>
                <th>Resolution</th>
                <th>Observation Date</th>
                <th>Confidence</th>
                <th>Data Status</th>
                <th>Limitations & Notes</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      `;
    }

    const modal = document.getElementById("provenanceModal");
    if (modal) modal.classList.add("open");
  }

  showToast(message, duration = 4000) {
    let toast = document.getElementById("appToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "appToast";
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #10b981;
        color: #064e3b;
        font-weight: 700;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        z-index: 9999;
        font-size: 0.88rem;
        transition: all 0.3s ease;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.display = "block";
    toast.style.opacity = "1";
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => { toast.style.display = "none"; }, 300);
    }, duration);
  }

  showManualLocationPrompt(reason) {
    let promptEl = document.getElementById("manualLocationPrompt");
    if (!promptEl) {
      promptEl = document.createElement("div");
      promptEl.id = "manualLocationPrompt";
      promptEl.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(18, 30, 23, 0.95);
        border: 1px solid #10b981;
        border-radius: 12px;
        padding: 16px 20px;
        z-index: 4000;
        max-width: 580px;
        width: 90%;
        box-shadow: 0 15px 35px rgba(0,0,0,0.6);
        backdrop-filter: blur(10px);
      `;
      document.body.appendChild(promptEl);
    }

    promptEl.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
        <div style="font-weight:bold; color:#a7f3d0; font-size:0.95rem;">📍 Manual Location Selection Active</div>
        <button style="background:none; border:none; color:#94a3b8; font-size:1.2rem; cursor:pointer;" onclick="document.getElementById('manualLocationPrompt').style.display='none'">&times;</button>
      </div>
      <div style="font-size:0.8rem; color:#cbd5e1; margin-bottom:12px; line-height:1.4;">
        ${reason || "GPS access was denied or device is in offline mode."}
        <br><b style="color:#10b981;">How to proceed:</b> Click anywhere on the map, drag the center pin, or select a preset agricultural region below:
      </div>
      <div style="display:flex; flex-wrap:wrap; gap:6px;">
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(19.9975, 73.7898, 'Nashik, Maharashtra')">Nashik (Maharashtra)</button>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(30.9010, 75.8573, 'Ludhiana, Punjab')">Ludhiana (Punjab)</button>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(12.5238, 76.8967, 'Mandya, Karnataka')">Mandya (Karnataka)</button>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(16.3067, 80.4365, 'Guntur, Andhra Pradesh')">Guntur (Andhra Pradesh)</button>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(22.7196, 75.8577, 'Indore, Madhya Pradesh')">Indore (Madhya Pradesh)</button>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:5px 10px;" onclick="window.app.selectPreset(25.3176, 82.9739, 'Varanasi, Uttar Pradesh')">Varanasi (Uttar Pradesh)</button>
      </div>
    `;
    promptEl.style.display = "block";
  }

  selectPreset(lat, lon, name) {
    const promptEl = document.getElementById("manualLocationPrompt");
    if (promptEl) promptEl.style.display = "none";
    this.currentLocationName = name;
    const searchInput = document.getElementById("locationSearchInput");
    if (searchInput) searchInput.value = name;
    this.handleLocationChanged(lat, lon);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  window.app = new AgroCloudApp();
  window.app.init();
});

