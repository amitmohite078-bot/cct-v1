/**
 * AgroCloud AI - Integrated Modules Engine
 * Bridges Geo-Spatial Crop Suitability -> Disease Detection -> Irrigation Prediction -> Crop Doctor.
 */
class ModulesManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentCropId = "maize";
    this.currentCropName = "Maize (Corn)";
    this.activeSubtab = "irrigation"; // default to irrigation schedule in 1km panel
    this.modulesData = null;
    this.chatHistory = [];
    this.lastFieldContext = {};
    this.currentLanguage = "en";
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    if (this.modulesData) {
      this.render();
    }
  }

  setCrop(cropId, cropName, fieldContext = {}) {
    this.currentCropId = cropId;
    this.currentCropName = cropName;
    this.lastFieldContext = fieldContext;
  }

  async loadModules(latitude, longitude) {
    this.container.innerHTML = `<div style="padding:30px; text-align:center; color:#94a3b8;">Loading AgroCloud AI modules for ${this.currentCropName}...</div>`;
    const data = await window.ApiClient.getCropModules(this.currentCropId, latitude, longitude);
    if (data) {
      this.modulesData = data;
    } else {
      this.modulesData = this.getFallbackModules(this.currentCropId);
    }
    this.render();
  }

  render() {
    if (!this.modulesData) return;

    const TXT = {
      en: {
        dis: "🦠 Disease Detection",
        irr: "💧 Irrigation Schedule",
        doc: "🩺 AI Crop Doctor",
        conn: "Connected Crop",
        sync: "Synced with 1 km² Analysis",
        et0: "Reference ET (ET0)",
        etc: "Crop Demand (ETc)",
        next_irr: "Next Irrigation",
        threshold: "Moisture threshold triggered",
        sched_title: "Weather-Driven 7-Day Irrigation Schedule",
        day_col: "Forecast Day",
        etc_col: "Crop ETc",
        rain_col: "Rain",
        depletion_col: "Soil Depletion",
        status_col: "Moisture Status",
        water_col: "Recommended Water",
        advice_title: "💡 Water-Saving Agronomic Advice:",
        fao_meta: "FAO-56 Penman-Monteith"
      },
      hi: {
        dis: "🦠 रोग विश्लेषण",
        irr: "💧 सिंचाई अनुसूची",
        doc: "🩺 एआई फसल डॉक्टर",
        conn: "संबद्ध फसल",
        sync: "1 किमी² विश्लेषण से सिंक",
        et0: "संदर्भ वाष्पीकरण (ET0)",
        etc: "फसल जल मांग (ETc)",
        next_irr: "अगली सिंचाई",
        threshold: "नमी सीमा ट्रिगर हुई",
        sched_title: "मौसम-आधारित 7-दिवसीय सिंचाई अनुसूची",
        day_col: "पूर्वानुमान दिवस",
        etc_col: "फसल ETc",
        rain_col: "वर्षा",
        depletion_col: "मृदा नमी कमी",
        status_col: "नमी स्थिति",
        water_col: "अनुशंसित जल",
        advice_title: "💡 जल-बचत कृषि परामर्श:",
        fao_meta: "FAO-56 पेनमैन-मोंटिथ"
      },
      kn: {
        dis: "🦠 ರೋಗ ಪತ್ತೆ",
        irr: "💧 ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ",
        doc: "🩺 ಎಐ ಬೆಳೆ ವೈದ್ಯ",
        conn: "ಸಂಪರ್ಕಿತ ಬೆಳೆ",
        sync: "1 ಕಿಮೀ² ವಿಶ್ಲೇಷಣೆಗೆ ಸಿಂಕ್",
        et0: "ಉಲ್ಲೇಖ ಬಾಷ್ಪೀಕರಣ (ET0)",
        etc: "ಬೆಳೆಯ ನೀರಿನ ಬೇಡಿಕೆ (ETc)",
        next_irr: "ಮುಂದಿನ ನೀರಾವರಿ",
        threshold: "ತೇವಾಂಶ ಮಿತಿ ತಲುಪಿದೆ",
        sched_title: "ಹವಾಮಾನ ಆಧಾರಿತ 7-ದಿನಗಳ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ",
        day_col: "ಮುನ್ಸೂಚನೆ ದಿನ",
        etc_col: "ಬೆಳೆ ETc",
        rain_col: "ಮಳೆ",
        depletion_col: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಇಳಿಕೆ",
        status_col: "ತೇವಾಂಶ ಸ್ಥಿತಿ",
        water_col: "ಶಿಫಾರಸು ನೀರು",
        advice_title: "💡 ನೀರು ಉಳಿತಾಯದ ಕೃಷಿ ಸಲಹೆ:",
        fao_meta: "FAO-56 ಪೆನ್ಮನ್-ಮಾಂಟೀತ್"
      },
      mr: {
        dis: "🦠 रोग विश्लेषण",
        irr: "💧 सिंचन वेळापत्रक",
        doc: "🩺 एआई पीक डॉक्टर",
        conn: "संबंधित पीक",
        sync: "1 किमी² विश्लेषणासह सिंक",
        et0: "संदर्भ बाष्पीभवन (ET0)",
        etc: "पिकांची पाणी गरज (ETc)",
        next_irr: "पुढील सिंचन",
        threshold: "ओलावा मर्यादा गाठली",
        sched_title: "हवामान-आधारित 7-दिवसीय सिंचन वेळापत्रक",
        day_col: "अंदाज दिवस",
        etc_col: "पीक ETc",
        rain_col: "पाऊस",
        depletion_col: "मातीतील ओलावा घट",
        status_col: "ओलावा स्थिती",
        water_col: "शिफारस केलेले पाणी",
        advice_title: "💡 पाणी-बचत कृषी सल्ला:",
        fao_meta: "FAO-56 पेनमन-माँटिथ"
      },
      te: {
        dis: "🦠 వ్యాధి నిర్ధారణ",
        irr: "💧 నీటిపారుదల షెడ్యూల్",
        doc: "🩺 AI పంటల డాక్టర్",
        conn: "కనెక్ట్ చేయబడిన పంట",
        sync: "1 చ.కి.మీ విశ్లేషణతో సింక్ చేయబడింది",
        et0: "రిఫరెన్స్ ఆవిరి (ET0)",
        etc: "పంట నీటి అవసరం (ETc)",
        next_irr: "తదుపరి నీటిపారుదల",
        threshold: "తేమ పరిమితి చేరుకుంది",
        sched_title: "వాతావరణ ఆధారిత 7 రోజుల నీటిపారుదల షెడ్యూల్",
        day_col: "అంచనా రోజు",
        etc_col: "పంట ETc",
        rain_col: "వర్షం",
        depletion_col: "నేల తేమ క్షీణత",
        status_col: "తేమ స్థితి",
        water_col: "సిఫార్సు చేసిన నీరు",
        advice_title: "💡 నీటి ఆదా వ్యవసాయ సలహా:",
        fao_meta: "FAO-56 పెన్మ్యాన్-మాంటెత్"
      },
      ta: {
        dis: "🦠 நோய் கண்டறிதல்",
        irr: "💧 பாசன அட்டவணை",
        doc: "🩺 AI பயிர் மருத்துவர்",
        conn: "இணைக்கப்பட்ட பயிர்",
        sync: "1 ச.கி.மீ பகுப்பாய்வுடன் ஒத்திசைக்கப்பட்டது",
        et0: "குறிப்பு ஆவியாதல் (ET0)",
        etc: "பயிர் நீர் தேவை (ETc)",
        next_irr: "அடுத்த பாசனம்",
        threshold: "ஈரப்பதம் வரம்பு தூண்டப்பட்டது",
        sched_title: "வானிலை சார்ந்த 7 நாள் பாசன அட்டவணை",
        day_col: "முன்னறிவிப்பு நாள்",
        etc_col: "பயிர் ETc",
        rain_col: "மழை",
        depletion_col: "மண் ஈரப்பதம் குறைவு",
        status_col: "ஈரப்பதம் நிலை",
        water_col: "பரிந்துரைக்கப்பட்ட நீர்",
        advice_title: "💡 நீர் சேமிப்பு வேளாண் ஆலோசனை:",
        fao_meta: "FAO-56 பென்மேன்-மாண்டீத்"
      },
      gu: {
        dis: "🦠 રોગ નિદાન",
        irr: "💧 પિયત સમયપત્રક",
        doc: "🩺 AI પાક ડોક્ટર",
        conn: "જોડાયેલ પાક",
        sync: "1 ચો.કિમી વિશ્લેષણ સાથે સિંક થયેલ",
        et0: "સંદર્ભ બાષ્પીભવન (ET0)",
        etc: "પાક પાણીની જરૂરિયાત (ETc)",
        next_irr: "આગામી પિયત",
        threshold: "ભેજ મર્યાદા સક્રિય થઈ",
        sched_title: "હવામાન-આધારિત 7-દિવસીય પિયત સમયપત્રક",
        day_col: "આગાહી દિવસ",
        etc_col: "પાક ETc",
        rain_col: "વરસાદ",
        depletion_col: "જમીન ભેજ ઘટ",
        status_col: "ભેજ સ્થિતિ",
        water_col: "ભલામણ કરેલ પાણી",
        advice_title: "💡 જળ-બચત કૃષિ સલાહ:",
        fao_meta: "FAO-56 પેનમેન-મોન્ટેઇથ"
      },
      bn: {
        dis: "🦠 রোগ নির্ণয়",
        irr: "💧 সেচ সময়সূচী",
        doc: "🩺 এআই ফসল ডাক্তার",
        conn: "সংযুক্ত ফসল",
        sync: "১ বর্গ কিমি বিশ্লেষণের সাথে সিঙ্ক",
        et0: "রেফারেন্স বাষ্পীভবন (ET0)",
        etc: "ফসলের জলের চাহিদা (ETc)",
        next_irr: "পরবর্তী সেচ",
        threshold: "আর্দ্রতা সীমা ট্রিগার হয়েছে",
        sched_title: "আবহাওয়া-ভিত্তিক ৭ দিনের সেচ সময়সূচী",
        day_col: "পূর্বাভাস দিবস",
        etc_col: "ফসল ETc",
        rain_col: "বৃষ্টিপাত",
        depletion_col: "মাটির আর্দ্রতা হ্রাস",
        status_col: "আর্দ্রতার অবস্থা",
        water_col: "সুপারিশকৃত জল",
        advice_title: "💡 জল-সংরক্ষণ কৃষি পরামর্শ:",
        fao_meta: "FAO-56 পেনম্যান-মন্টিথ"
      },
      ml: {
        dis: "🦠 രോഗനിർണ്ണയം",
        irr: "💧 നനയ്ക്കൽ സമയക്രമം",
        doc: "🩺 AI വിള ഡോക്ടർ",
        conn: "തിരഞ്ഞെടുത്ത വിള",
        sync: "1 ച.കി.മീ വിശകലനവുമായി സമന്വയിപ്പിച്ചു",
        et0: "റഫറൻസ് ബാഷ്പീകരണം (ET0)",
        etc: "വിള ജല ആവശ്യകത (ETc)",
        next_irr: "അടുത്ത നനയ്ക്കൽ",
        threshold: "ഈർപ്പ പരിധി എത്തി",
        sched_title: "കാലാവസ്ഥാധിഷ്ഠിത 7 ദിവസത്തെ നനയ്ക്കൽ ഷെഡ്യൂൾ",
        day_col: "പ്രവചന ദിവസം",
        etc_col: "വിള ETc",
        rain_col: "മഴ",
        depletion_col: "മണ്ണ് ഈർപ്പ നഷ്ടം",
        status_col: "ഈർപ്പ നില",
        water_col: "ശുപാർശ ചെയ്യുന്ന വെള്ളം",
        advice_title: "💡 ജലസംരക്ഷണ കാർഷിക നിർദ്ദേശം:",
        fao_meta: "FAO-56 പെൻമാൻ-മോണ്ടെയ്ത്"
      },
      pa: {
        dis: "🦠 ਰੋਗ ਜਾਂਚ",
        irr: "💧 ਸਿੰਚਾਈ ਸ਼ਡਿਊਲ",
        doc: "🩺 AI ਫਸਲ ਡਾਕਟਰ",
        conn: "ਜੁੜੀ ਹੋਈ ਫਸਲ",
        sync: "1 ਵਰਗ ਕਿਮੀ ਵਿਸ਼ਲੇਸ਼ਣ ਨਾਲ ਸਿੰਕ ਕੀਤਾ",
        et0: "ਹਵਾਲਾ ਵਾਸ਼ਪੀਕਰਨ (ET0)",
        etc: "ਫਸਲ ਪਾਣੀ ਦੀ ਮੰਗ (ETc)",
        next_irr: "ਅਗਲੀ ਸਿੰਚਾਈ",
        threshold: "ਨਮੀ ਦੀ ਸੀਮਾ ਪੂਰੀ ਹੋਈ",
        sched_title: "ਮੌਸਮ-ਅਧਾਰਿਤ 7-ਦਿਨਾਂ ਦਾ ਸਿੰਚਾਈ ਸ਼ਡਿਊਲ",
        day_col: "ਭਵਿੱਖਬਾਣੀ ਦਿਨ",
        etc_col: "ਫਸਲ ETc",
        rain_col: "ਮੀਂਹ",
        depletion_col: "ਮਿੱਟੀ ਨਮੀ ਦੀ ਕਮੀ",
        status_col: "ਨਮੀ ਦੀ ਸਥਿਤੀ",
        water_col: "ਸਿਫਾਰਸ਼ ਕੀਤਾ ਪਾਣੀ",
        advice_title: "💡 ਪਾਣੀ ਦੀ ਬੱਚਤ ਲਈ ਖੇਤੀ ਸਲਾਹ:",
        fao_meta: "FAO-56 ਪੈਨਮੈਨ-ਮੋਂਟੀਥ"
      },
      or: {
        dis: "🦠 ରୋଗ ନିର୍ଣ୍ଣୟ",
        irr: "💧 ଜଳସେଚନ ସମୟସାରଣୀ",
        doc: "🩺 AI ଫସଲ ଡାକ୍ତର",
        conn: "ସଂଯୁକ୍ତ ଫସଲ",
        sync: "୧ ବର୍ଗ କିମି ବିଶ୍ଳେଷଣ ସହିତ ସିଙ୍କ୍",
        et0: "ରେଫରେନ୍ସ ବାଷ୍ପୀକରଣ (ET0)",
        etc: "ଫସଲ ଜଳ ଚାହିଦା (ETc)",
        next_irr: "ପରବର୍ତ୍ତୀ ଜଳସେଚନ",
        threshold: "ଆର୍ଦ୍ରତା ସୀମା ପହଞ୍ଚିଛି",
        sched_title: "ପାଣିପାଗ-ଭିତ୍ତିକ ୭-ଦିନର ଜଳସେଚନ ସମୟସାରଣୀ",
        day_col: "ପୂର୍ବାନୁମାନ ଦିନ",
        etc_col: "ଫସଲ ETc",
        rain_col: "ବର୍ଷା",
        depletion_col: "ମାଟି ଆର୍ଦ୍ରତା ହ୍ରାସ",
        status_col: "ଆର୍ଦ୍ରତା ସ୍ଥିତି",
        water_col: "ସୁପାରିଶ ଜଳ",
        advice_title: "💡 ଜଳ ସଞ୍ଚୟ କୃଷି ପରାମର୍ଶ:",
        fao_meta: "FAO-56 ପେନମ୍ୟାନ୍-ମଣ୍ଟିଥ୍"
      }
    }[this.currentLanguage] || {
      dis: "🦠 Disease Detection",
      irr: "💧 Irrigation Schedule",
      doc: "🩺 AI Crop Doctor",
      conn: "Connected Crop",
      sync: "Synced with 1 km² Analysis",
      et0: "Reference ET (ET0)",
      etc: "Crop Demand (ETc)",
      next_irr: "Next Irrigation",
      threshold: "Moisture threshold triggered",
      sched_title: "Weather-Driven 7-Day Irrigation Schedule",
      day_col: "Forecast Day",
      etc_col: "Crop ETc",
      rain_col: "Rain",
      depletion_col: "Soil Depletion",
      status_col: "Moisture Status",
      water_col: "Recommended Water",
      advice_title: "💡 Water-Saving Agronomic Advice:",
      fao_meta: "FAO-56 Penman-Monteith"
    };

    let displayCropName = this.currentCropName;
    if (window.suitabilityRenderer && typeof window.suitabilityRenderer.localizeCropName === "function") {
      displayCropName = window.suitabilityRenderer.localizeCropName({ id: this.currentCropId, name: this.currentCropName });
    }

    let subnavHtml = `
      <div style="background:rgba(0,0,0,0.3); border-radius:8px; padding:4px; display:flex; gap:4px; margin-bottom:16px;">
        <button class="btn ${this.activeSubtab === 'disease' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('disease')">
          ${TXT.dis}
        </button>
        <button class="btn ${this.activeSubtab === 'irrigation' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('irrigation')">
          ${TXT.irr}
        </button>
        <button class="btn ${this.activeSubtab === 'doctor' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('doctor')">
          ${TXT.doc}
        </button>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding:10px 14px; background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); border-radius:8px;">
        <div>
          <span style="font-size:0.72rem; color:#94a3b8; text-transform:uppercase;">${TXT.conn}</span>
          <div style="font-size:1rem; font-weight:bold; color:#10b981;">${displayCropName}</div>
        </div>
        <span style="font-size:0.72rem; background:rgba(16,185,129,0.25); color:#a7f3d0; padding:4px 8px; border-radius:4px; font-weight:600;">
          ${TXT.sync}
        </span>
      </div>
    `;

    let contentHtml = "";
    if (this.activeSubtab === "disease") {
      contentHtml = this.renderDiseaseSection();
    } else if (this.activeSubtab === "irrigation") {
      contentHtml = this.renderIrrigationSection();
    } else {
      contentHtml = this.renderDoctorSection();
    }

    this.container.innerHTML = subnavHtml + contentHtml;

    if (this.activeSubtab === "doctor") {
      this.bindChatEvents();
    }
  }

  setSubtab(tab) {
    this.activeSubtab = tab;
    this.render();
  }

  renderDiseaseSection() {
    const dis = this.modulesData.disease_detection_module;
    const diseases = dis.common_diseases_and_pests || [];

    let listHtml = diseases.map(d => `
      <div style="background:var(--bg-surface-elevated); border:1px solid var(--border-color); border-radius:10px; padding:14px; margin-bottom:12px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
          <div style="font-weight:bold; font-size:0.95rem; color:#f0fdf4;">${d.name}</div>
          <span style="font-size:0.65rem; background:rgba(239,68,68,0.2); color:#f87171; padding:2px 6px; border-radius:4px; font-weight:700;">${d.pathogen_type}</span>
        </div>
        <div style="font-size:0.78rem; color:#cbd5e1; margin-bottom:8px; line-height:1.4;">
          <b>Symptoms:</b> ${d.symptoms}
        </div>
        <div style="font-size:0.75rem; color:#fbbf24; margin-bottom:6px;">
          🌡 <b>Weather Trigger:</b> ${d.favorable_conditions}
        </div>
        <div style="background:rgba(0,0,0,0.25); border-radius:6px; padding:8px; margin-top:8px; font-size:0.75rem;">
          <div style="color:#34d399; margin-bottom:4px;">🌿 <b>Bio-Control:</b> ${d.organic_control}</div>
          <div style="color:#60a5fa; margin-bottom:4px;">🧪 <b>Chemical Remedy:</b> ${d.chemical_control}</div>
          <div style="color:#94a3b8;">🛡 <b>Prevention:</b> ${d.preventive_measures}</div>
        </div>
      </div>
    `).join("");

    return `
      <div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:10px;">
          <span class="param-section-title" style="margin-bottom:0;">Pathogen & Pest Diagnostic Protocol</span>
          <span style="font-size:0.75rem; color:#94a3b8;">${diseases.length} Major Threats Identified</span>
        </div>
        ${listHtml}
      </div>
    `;
  }

  renderIrrigationSection() {
    const irr = this.modulesData.irrigation_prediction_module;
    const schedule = irr.daily_forecast_schedule || [];
    const lang = this.currentLanguage || "en";

    const LBL = {
      en: {
        et0: "Reference ET (ET0)",
        etc: "Crop Demand (ETc)",
        next_irr: "Next Irrigation",
        threshold: "Moisture threshold triggered",
        sched_title: "Weather-Driven 7-Day Irrigation Schedule",
        day_col: "Forecast Day",
        etc_col: "Crop ETc",
        rain_col: "Rain",
        depletion_col: "Soil Depletion",
        status_col: "Moisture Status",
        water_col: "Recommended Water",
        advice_title: "💡 Water-Saving Agronomic Advice:",
        fao_meta: "FAO-56 Penman-Monteith",
        mm_day: "mm/day",
        drip_run: "hrs drip",
        today: "Today",
        tomorrow: "Tomorrow",
        day_prefix: "Day"
      },
      hi: {
        et0: "संदर्भ वाष्पीकरण (ET0)",
        etc: "फसल जल मांग (ETc)",
        next_irr: "अगली सिंचाई",
        threshold: "नमी सीमा ट्रिगर हुई",
        sched_title: "मौसम-आधारित 7-दिवसीय सिंचाई अनुसूची",
        day_col: "पूर्वानुमान दिवस",
        etc_col: "फसल ETc",
        rain_col: "वर्षा",
        depletion_col: "मृदा नमी कमी",
        status_col: "नमी स्थिति",
        water_col: "अनुशंसित जल",
        advice_title: "💡 जल-बचत कृषि परामर्श:",
        fao_meta: "FAO-56 पेनमैन-मोंटिथ",
        mm_day: "मिमी/दिन",
        drip_run: "घंटे ड्रिप",
        today: "आज",
        tomorrow: "कल",
        day_prefix: "दिन"
      },
      kn: {
        et0: "ಉಲ್ಲೇಖ ಬಾಷ್ಪೀಕರಣ (ET0)",
        etc: "ಬೆಳೆಯ ನೀರಿನ ಬೇಡಿಕೆ (ETc)",
        next_irr: "ಮುಂದಿನ ನೀರಾವರಿ",
        threshold: "ತೇವಾಂಶ ಮಿತಿ ತಲುಪಿದೆ",
        sched_title: "ಹವಾಮಾನ ಆಧಾರಿತ 7-ದಿನಗಳ ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ",
        day_col: "ಮುನ್ಸೂಚನೆ ದಿನ",
        etc_col: "ಬೆಳೆ ETc",
        rain_col: "ಮಳೆ",
        depletion_col: "ಮಣ್ಣಿನ ತೇವಾಂಶ ಇಳಿಕೆ",
        status_col: "ತೇವಾಂಶ ಸ್ಥಿತಿ",
        water_col: "ಶಿಫಾರಸು ನೀರು",
        advice_title: "💡 ನೀರು ಉಳಿತಾಯದ ಕೃಷಿ ಸಲಹೆ:",
        fao_meta: "FAO-56 ಪೆನ್ಮನ್-ಮಾಂಟೀತ್",
        mm_day: "ಮಿ.ಮೀ/ದಿನ",
        drip_run: "ಗಂಟೆ ಹನಿ ನೀರಾವರಿ",
        today: "ಇಂದು",
        tomorrow: "ನಾಳೆ",
        day_prefix: "ದಿನ"
      },
      mr: {
        et0: "संदर्भ बाष्पीभवन (ET0)",
        etc: "पिकांची पाणी गरज (ETc)",
        next_irr: "पुढील सिंचन",
        threshold: "ओलावा मर्यादा गाठली",
        sched_title: "हवामान-आधारित 7-दिवसीय सिंचन वेळापत्रक",
        day_col: "अंदाज दिवस",
        etc_col: "पीक ETc",
        rain_col: "पाऊस",
        depletion_col: "मातीतील ओलावा घट",
        status_col: "ओलावा स्थिती",
        water_col: "शिफारस केलेले पाणी",
        advice_title: "💡 पाणी-बचत कृषी सल्ला:",
        fao_meta: "FAO-56 पेनमन-माँटिथ",
        mm_day: "मिमी/दिवस",
        drip_run: "तास ठिबक",
        today: "आज",
        tomorrow: "उद्या",
        day_prefix: "दिवस"
      },
      te: {
        et0: "రిఫరెన్స్ ఆవిరి (ET0)", etc: "పంట నీటి అవసరం (ETc)", next_irr: "తదుపరి నీటిపారుదల",
        threshold: "తేమ పరిమితి చేరుకుంది", sched_title: "వాతావరణ ఆధారిత 7 రోజుల నీటిపారుదల షెడ్యూల్",
        day_col: "అంచనా రోజు", etc_col: "పంట ETc", rain_col: "వర్షం", depletion_col: "నేల తేమ క్షీణత",
        status_col: "తేమ స్థితి", water_col: "సిఫార్సు చేసిన నీరు", advice_title: "💡 నీటి ఆదా వ్యవసాయ సలహా:",
        fao_meta: "FAO-56 పెన్మ్యాన్-మాంటెత్", mm_day: "మి.మీ/రోజు", drip_run: "గంటలు డ్రిప్",
        today: "నేడు", tomorrow: "రేపు", day_prefix: "రోజు"
      },
      ta: {
        et0: "குறிப்பு ஆவியாதல் (ET0)", etc: "பயிர் நீர் தேவை (ETc)", next_irr: "அடுத்த பாசனம்",
        threshold: "ஈரப்பதம் வரம்பு தூண்டப்பட்டது", sched_title: "வானிலை சார்ந்த 7 நாள் பாசன அட்டவணை",
        day_col: "முன்னறிவிப்பு நாள்", etc_col: "பயிர் ETc", rain_col: "மழை", depletion_col: "மண் ஈரப்பதம் குறைவு",
        status_col: "ஈரப்பதம் நிலை", water_col: "பரிந்துரைக்கப்பட்ட நீர்", advice_title: "💡 நீர் சேமிப்பு வேளாண் ஆலோசனை:",
        fao_meta: "FAO-56 பென்மேன்-மாண்டீத்", mm_day: "மி.மீ/நாள்", drip_run: "மணி சொட்டுநீர்",
        today: "இன்று", tomorrow: "நாளை", day_prefix: "நாள்"
      },
      gu: {
        et0: "સંદર્ભ બાષ્પીભવન (ET0)", etc: "પાક પાણીની જરૂરિયાત (ETc)", next_irr: "આગામી પિયત",
        threshold: "ભેજ મર્યાદા સક્રિય થઈ", sched_title: "હવામાન-આધારિત 7-દિવસીય પિયત સમયપત્રક",
        day_col: "આગાહી દિવસ", etc_col: "પાક ETc", rain_col: "વરસાદ", depletion_col: "જમીન ભેજ ઘટ",
        status_col: "ભેજ સ્થિતિ", water_col: "ભલામણ કરેલ પાણી", advice_title: "💡 જળ-બચત કૃષિ સલાહ:",
        fao_meta: "FAO-56 પેનમેન-મોન્ટેઇથ", mm_day: "મીમી/દિવસ", drip_run: "કલાક ડ્રિપ",
        today: "આજે", tomorrow: "આવતીકાલે", day_prefix: "દિવસ"
      },
      bn: {
        et0: "রেফারেন্স বাষ্পীভবন (ET0)", etc: "ফসলের জলের চাহিদা (ETc)", next_irr: "পরবর্তী সেচ",
        threshold: "আর্দ্রতা সীমা ট্রিগার হয়েছে", sched_title: "আবহাওয়া-ভিত্তিক ৭ দিনের সেচ সময়সূচী",
        day_col: "পূর্বাভাস দিবস", etc_col: "ফসল ETc", rain_col: "বৃষ্টিপাত", depletion_col: "মাটির আর্দ্রতা হ্রাস",
        status_col: "আর্দ্রতার অবস্থা", water_col: "সুপারিশকৃত জল", advice_title: "💡 জল-সংরক্ষণ কৃষি পরামর্শ:",
        fao_meta: "FAO-56 পেনম্যান-মন্টিথ", mm_day: "মিমি/দিন", drip_run: "ঘণ্টা ড্রিপ",
        today: "আজ", tomorrow: "আগামীকাল", day_prefix: "দিন"
      },
      ml: {
        et0: "റഫറൻസ് ബാഷ്പീകരണം (ET0)", etc: "വിള ജല ആവശ്യകത (ETc)", next_irr: "അടുത്ത നനയ്ക്കൽ",
        threshold: "ഈർപ്പ പരിധി എത്തി", sched_title: "കാലാവസ്ഥാധിഷ്ഠിത 7 ദിവസത്തെ നനയ്ക്കൽ ഷെഡ്യൂൾ",
        day_col: "പ്രവചന ദിവസം", etc_col: "വിള ETc", rain_col: "മഴ", depletion_col: "മണ്ണ് ഈർപ്പ നഷ്ടം",
        status_col: "ഈർപ്പ നില", water_col: "ശുപാർശ ചെയ്യുന്ന വെള്ളം", advice_title: "💡 ജലസംരക്ഷണ കാർഷിക നിർദ്ദേശം:",
        fao_meta: "FAO-56 പെൻമാൻ-മോണ്ടെയ്ത്", mm_day: "മി.മീ/ദിവസം", drip_run: "മണിക്കൂർ തുള്ളിനന",
        today: "ഇന്ന്", tomorrow: "നാളെ", day_prefix: "ദിവസം"
      },
      pa: {
        et0: "ਹਵਾਲਾ ਵਾਸ਼ਪੀਕਰਨ (ET0)", etc: "ਫਸਲ ਪਾਣੀ ਦੀ ਮੰਗ (ETc)", next_irr: "ਅਗਲੀ ਸਿੰਚਾਈ",
        threshold: "ਨਮੀ ਦੀ ਸੀਮਾ ਪੂਰੀ ਹੋਈ", sched_title: "ਮੌਸਮ-ਅਧਾਰਿਤ 7-ਦਿਨਾਂ ਦਾ ਸਿੰਚਾਈ ਸ਼ਡਿਊਲ",
        day_col: "ਭਵਿੱਖਬਾਣੀ ਦਿਨ", etc_col: "ਫਸਲ ETc", rain_col: "ਮੀਂਹ", depletion_col: "ਮਿੱਟੀ ਨਮੀ ਦੀ ਕਮੀ",
        status_col: "ਨਮੀ ਦੀ ਸਥਿਤੀ", water_col: "ਸਿਫਾਰਸ਼ ਕੀਤਾ ਪਾਣੀ", advice_title: "💡 ਪਾਣੀ ਦੀ ਬੱਚਤ ਲਈ ਖੇਤੀ ਸਲਾਹ:",
        fao_meta: "FAO-56 ਪੈਨਮੈਨ-ਮੋਂਟੀਥ", mm_day: "ਮਿਲੀਮੀਟਰ/ਦਿਨ", drip_run: "ਘੰਟੇ ਤੁਪਕਾ ਸਿੰਚਾਈ",
        today: "ਅੱਜ", tomorrow: "ਕੱਲ੍ਹ", day_prefix: "ਦਿਨ"
      },
      or: {
        et0: "ରେଫରେନ୍ସ ବାଷ୍ପୀକରଣ (ET0)", etc: "ଫସଲ ଜଳ ଚାହିଦା (ETc)", next_irr: "ପରବର୍ତ୍ତୀ ଜଳସେଚନ",
        threshold: "ଆର୍ଦ୍ରତା ସୀମା ପହଞ୍ଚିଛି", sched_title: "ପାଣିପାଗ-ଭିତ୍ତିକ ୭-ଦିନର ଜଳସେଚନ ସମୟସାରଣୀ",
        day_col: "ପୂର୍ବାନୁମାନ ଦିନ", etc_col: "ଫସଲ ETc", rain_col: "ବର୍ଷା", depletion_col: "ମାଟି ଆର୍ଦ୍ରତା ହ୍ରାସ",
        status_col: "ଆର୍ଦ୍ରତା ସ୍ଥିତି", water_col: "ସୁପାରିଶ ଜଳ", advice_title: "💡 ଜଳ ସଞ୍ଚୟ କୃଷି ପରାମର୍ଶ:",
        fao_meta: "FAO-56 ପେନମ୍ୟାନ୍-ମଣ୍ଟିଥ୍", mm_day: "ମି.ମି/ଦିନ", drip_run: "ଘଣ୍ଟା ଡ୍ରିପ୍",
        today: "ଆଜି", tomorrow: "ଆସନ୍ତାକାଲି", day_prefix: "ଦିନ"
      }
    }[lang] || {
      et0: "Reference ET (ET0)",
      etc: "Crop Demand (ETc)",
      next_irr: "Next Irrigation",
      threshold: "Moisture threshold triggered",
      sched_title: "Weather-Driven 7-Day Irrigation Schedule",
      day_col: "Forecast Day",
      etc_col: "Crop ETc",
      rain_col: "Rain",
      depletion_col: "Soil Depletion",
      status_col: "Moisture Status",
      water_col: "Recommended Water",
      advice_title: "💡 Water-Saving Agronomic Advice:",
      fao_meta: "FAO-56 Penman-Monteith",
      mm_day: "mm/day",
      drip_run: "hrs drip",
      today: "Today",
      tomorrow: "Tomorrow",
      day_prefix: "Day"
    };

    const localizeDayName = (dayStr) => {
      if (!dayStr) return "";
      return dayStr
        .replace(/Day (\d+)/i, `${LBL.day_prefix} $1`)
        .replace(/Today/i, LBL.today)
        .replace(/Tomorrow/i, LBL.tomorrow);
    };

    const localizeStatus = (statusStr) => {
      if (!statusStr) return "";
      const s = statusStr.toLowerCase();
      if (s.includes("due")) {
        return {
          en: "Irrigation Due", hi: "सिंचाई आवश्यक", kn: "ನೀರಾವರಿ ಅಗತ್ಯ", te: "నీటిపారుదల అవసరం",
          ta: "பாசனம் தேவை", mr: "सिंचन आवश्यक", gu: "પિયત જરૂરી", bn: "সেচ প্রয়োজন",
          ml: "നനയ്ക്കൽ ആവശ്യമാണ്", pa: "ਸਿੰਚਾਈ ਦੀ ਲੋੜ", or: "ଜଳସେଚନ ଆବଶ୍ୟକ"
        }[lang] || "Irrigation Due";
      }
      if (s.includes("rain")) {
        return {
          en: "Rain Protected", hi: "वर्षा सुरक्षित", kn: "ಮಳೆ ಸಂರಕ್ಷಿತ", te: "వర్ష రక్షితం",
          ta: "மழை பாதுகாப்பு", mr: "पाऊस संरक्षित", gu: "વરસાદથી સુરક્ષિત", bn: "বৃষ্টিতে সংরক্ষিত",
          ml: "മഴ സംരക്ഷിതം", pa: "ਮੀਂਹ ਤੋਂ ਸੁਰੱਖਿਅਤ", or: "ବର୍ଷା ସୁରକ୍ଷିତ"
        }[lang] || "Rain Protected";
      }
      return {
        en: "Moisture Adequate", hi: "नमी पर्याप्त", kn: "ತೇವಾಂಶ ಸಮರ್ಪಕ", te: "తేమ సరిపడా ఉంది",
        ta: "போதுமான ஈரப்பதம்", mr: "ओलावा पुरेसा", gu: "પર્યાપ્ત ભેજ", bn: "পর্যাপ্ত আর্দ্রতা",
        ml: "മതിയായ ഈർപ്പം", pa: "ਲੋੜੀਂਦੀ ਨਮੀ", or: "ଯଥେଷ୍ଟ ଆର୍ଦ୍ରତା"
      }[lang] || "Moisture Adequate";
    };

    const localizeNextDue = (dueStr) => {
      if (!dueStr) return "";
      const s = dueStr.toLowerCase();
      if (s.includes("tomorrow")) {
        return {
          en: "Tomorrow", hi: "कल आवश्यक", kn: "ನಾಳೆ ಅಗತ್ಯ", te: "రేపు అవసరం",
          ta: "நாளை தேவை", mr: "उद्या आवश्यक", gu: "આવતીકાલે જરૂરી", bn: "আগামীকাল প্রয়োজন",
          ml: "നാളെ ആവശ്യമാണ്", pa: "ਕੱਲ੍ਹ ਲੋੜ ਹੈ", or: "ଆସନ୍ତାକାଲି ଆବଶ୍ୟକ"
        }[lang] || "Tomorrow";
      }
      if (s.includes("2 days")) {
        return {
          en: "Due in 2 days", hi: "2 दिनों में आवश्यक", kn: "2 ದಿನಗಳಲ್ಲಿ ಅಗತ್ಯ", te: "2 రోజుల్లో అవసరం",
          ta: "2 நாட்களில் தேவை", mr: "2 दिवसात आवश्यक", gu: "2 દિવસમાં જરૂરી", bn: "২ দিনে প্রয়োজন",
          ml: "2 ദിവസത്തിനുള്ളിൽ", pa: "2 ਦਿਨਾਂ ਵਿੱਚ ਲੋੜ", or: "୨ ଦିନରେ ଆବଶ୍ୟକ"
        }[lang] || "Due in 2 days";
      }
      if (s.includes("adequate")) {
        return {
          en: "Adequate moisture today", hi: "आज पर्याप्त नमी है", kn: "ಇಂದು ಸಾಕಷ್ಟು ತೇವಾಂಶವಿದೆ", te: "నేడు తగినంత తేమ ఉంది",
          ta: "இன்று போதுமான ஈரப்பதம்", mr: "आज पुरेसा ओलावा आहे", gu: "આજે પૂરતો ભેજ છે", bn: "আজ পর্যাপ্ত আর্দ্রতা আছে",
          ml: "ഇന്ന് ആവശ്യത്തിന് ഈർപ്പമുണ്ട്", pa: "ਅੱਜ ਲੋੜੀਂਦੀ ਨਮੀ ਹੈ", or: "ଆଜି ଯଥେଷ୍ଟ ଆର୍ଦ୍ରତା ଅଛି"
        }[lang] || "Adequate moisture today";
      }
      return dueStr;
    };

    let rowsHtml = schedule.map(day => `
      <tr>
        <td style="font-weight:600; text-align:left; padding:8px;">${localizeDayName(day.day)}</td>
        <td>${day.crop_etc_mm} mm</td>
        <td>${day.forecast_rain_mm} mm</td>
        <td>${day.soil_depletion_mm} mm</td>
        <td>
          <span class="${day.irrigation_recommended ? 'badge-due' : 'badge-ok'}">
            ${localizeStatus(day.status)}
          </span>
        </td>
        <td style="font-weight:bold; color:${day.irrigation_recommended ? '#6ee7b7' : '#94a3b8'}">
          ${day.irrigation_recommended ? `${day.irrigation_depth_mm} mm (${day.drip_run_hours} ${LBL.drip_run})` : '—'}
        </td>
      </tr>
    `).join("");

    const defaultTips = {
      en: [
        "Use drip irrigation in early mornings (6:00 - 8:30 AM) to cut evaporative loss by up to 35%.",
        "Apply organic straw or plastic mulching to preserve topsoil moisture and stabilize root temperature.",
        "Check 7-day rainfall forecast before initiating irrigation to prevent over-watering and nutrient leaching."
      ],
      hi: [
        "वाष्पीकरण हानि को 35% तक कम करने के लिए सुबह जल्दी (6:00 - 8:30 बजे) ड्रिप सिंचाई का उपयोग करें।",
        "मिट्टी की नमी बनाए रखने और जड़ों के तापमान को स्थिर करने के लिए जैविक पुआल या मल्चिंग का उपयोग करें।",
        "अधिक सिंचाई और पोषक तत्वों के रिसाव को रोकने के लिए सिंचाई शुरू करने से पहले 7-दिवसीय वर्षा पूर्वानुमान की जांच करें।"
      ],
      kn: [
        "ಬಾಷ್ಪೀಕರಣದ ನಷ್ಟವನ್ನು 35% ರಷ್ಟು ಕಡಿಮೆ ಮಾಡಲು ಮುಂಜಾನೆ (6:00 - 8:30) ಹನಿ ನೀರಾವರಿಯನ್ನು ಬಳಸಿ.",
        "ಮೇಲ್ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಸಂರಕ್ಷಿಸಲು ಮತ್ತು ಬೇರಿನ ತಾಪಮಾನವನ್ನು ಸ್ಥಿರಗೊಳಿಸಲು ಒಣ ಹುಲ್ಲು ಅಥವಾ ಮಲ್ಚಿಂಗ್ ಬಳಸಿ.",
        "ಹೆಚ್ಚುವರಿ ನೀರು ಮತ್ತು ಪೋಷಕಾಂಶಗಳ ಸೋರಿಕೆಯನ್ನು ತಡೆಗಟ್ಟಲು ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು 7-ದಿನಗಳ ಮಳೆ ಮುನ್ಸೂಚನೆಯನ್ನು ಪರಿಶೀಲಿಸಿ."
      ],
      mr: [
        "बाष्पीभवन नुकसान ३५% पर्यंत कमी करण्यासाठी सकाळी लवकर (६:०० ते ८:३०) ठिबक सिंचनाचा वापर करा.",
        "जमिनीतील ओलावा टिकवून ठेवण्यासाठी आणि मुळांचे तापमान स्थिर ठेवण्यासाठी सेंद्रिय पालापाचोळा किंवा मल्चिंग वापरा.",
        "जास्त पाणी आणि खतांचा निचरा रोखण्यासाठी सिंचन सुरू करण्यापूर्वी ७ दिवसांचा हवामान अंदाज तपासा."
      ],
      te: [
        "బాష్పీభవన నష్టాన్ని 35% వరకు తగ్గించడానికి ఉదయాన్నే (6:00 - 8:30) డ్రిప్ ఇరిగేషన్ ఉపయోగించండి.",
        "పై నేల తేమను కాపాడటానికి మరియు వేర్ల ఉష్ణోగ్రతను స్థిరీకరించడానికి సేంద్రీయ గడ్డి లేదా మల్చింగ్ ఉపయోగించండి.",
        "అధిక నీటిపారుదల మరియు పోషకాల నష్టాన్ని నివారించడానికి నీరు పెట్టే ముందు 7 రోజుల వర్ష సూచనను తనిఖీ చేయండి."
      ],
      ta: [
        "ஆவியாதல் இழப்பை 35% வரை குறைக்க அதிகாலையில் (6:00 - 8:30) சொட்டு நீர் பாசனத்தைப் பயன்படுத்தவும்.",
        "மேல்மண் ஈரப்பதத்தைப் பாதுகாக்கவும் வேர் வெப்பநிலையை சீராக்கவும் வைக்கோல் அல்லது மூடு பயிர்களைப் பயன்படுத்தவும்.",
        "அதிகப்படியான நீர்ப்பாசனம் மற்றும் ஊட்டச்சத்து கசிவைத் தடுக்க பாசனத்திற்கு முன் 7 நாள் மழை முன்னறிவிப்பை சரிபார்க்கவும்."
      ],
      gu: [
        "બાષ્પીભવન નુકસાન 35% સુધી ઘટાડવા સવારે વહેલા (6:00 - 8:30) ટપક સિંચાઈનો ઉપયોગ કરો.",
        "જમીનનો ભેજ જાળવવા અને મૂળનું તાપમાન સ્થિર રાખવા માટે જૈવિક કચરો અથવા મલ્ચિંગનો ઉપયોગ કરો.",
        "વધુ પડતા પિયત અને પોષક તત્વોના નિકાલને રોકવા માટે પિયત આપતા પહેલા 7 દિવસની વરસાદની આગાહી તપાસો."
      ],
      bn: [
        "বাষ্পীভবন ক্ষতি ৩৫% পর্যন্ত কমাতে খুব সকালে (৬:০০ - ৮:৩০) ড্রিপ সেচ ব্যবহার করুন।",
        "মাটির উপরিভাগের আর্দ্রতা রক্ষা করতে এবং শিকড়ের তাপমাত্রা স্থিতিশীল রাখতে জৈব খড় বা মালচিং ব্যবহার করুন।",
        "অতিরিক্ত সেচ এবং পুষ্টির ক্ষয় রোধ করতে সেচ शुरू করার আগে ৭ দিনের বৃষ্টিপাতের পূর্বাভাস পরীক্ষা করুন।"
      ],
      ml: [
        "ബാഷ്പീകരണ നഷ്ടം 35% വരെ കുറയ്ക്കുന്നതിന് അതിരാവിലെ (6:00 - 8:30) തുള്ളിനന ഉപയോഗിക്കുക.",
        "മേൽമണ്ണിലെ ഈർപ്പം നിലനിർത്താനും വേരുകളിലെ താപനില സ്ഥിരപ്പെടുത്താനും ഓർഗാനിക് വൈക്കോൽ അല്ലെങ്കിൽ പുതയിടൽ ഉപയോഗിക്കുക.",
        "അമിതമായ നനയ്ക്കലും പോഷകനഷ്ടവും തടയുന്നതിന് നനയ്ക്കുന്നതിന് മുമ്പ് 7 ദിവസത്തെ മഴ പ്രവചനം പരിശോധിക്കുക."
      ],
      pa: [
        "ਵਾਸ਼ਪੀਕਰਨ ਦੇ ਨੁਕਸਾਨ ਨੂੰ 35% ਤੱਕ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ ਜਲਦੀ (6:00 - 8:30) ਤੁਪਕਾ ਸਿੰਚਾਈ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
        "ਮਿੱਟੀ ਦੀ ਨਮੀ ਬਣਾਈ ਰੱਖਣ ਅਤੇ ਜੜ੍ਹਾਂ ਦੇ ਤਾਪਮਾਨ ਨੂੰ ਸਥਿਰ ਰੱਖਣ ਲਈ ਜੈਵਿਕ ਪਰਾਲੀ ਜਾਂ ਮਲਚਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
        "ਵੱਧ ਸਿੰਚਾਈ ਅਤੇ ਪੌਸ਼ਟਿਕ ਤੱਤਾਂ ਦੇ ਵਹਿਣ ਨੂੰ ਰੋਕਣ ਲਈ ਸਿੰਚਾਈ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ 7 ਦਿਨਾਂ ਦੇ ਮੀਂਹ ਦੀ ਭਵਿੱਖਬਾਣੀ ਦੀ ਜਾਂਚ ਕਰੋ।"
      ],
      or: [
        "ବାଷ୍ପୀକରଣ କ୍ଷତି ୩୫% ହ୍ରାସ କରିବାକୁ ସକାଳୁ (୬:୦୦ - ୮:୩୦) ଡ୍ରିପ୍ ଜଳସେଚନ ବ୍ୟବହାର କରନ୍ତୁ।",
        "ମାଟିର ଆର୍ଦ୍ରତା ରକ୍ଷା କରିବା ଏବଂ ଚେରର ତାପମାତ୍ରା ସ୍ଥିର ରଖିବାକୁ ଜୈବିକ ନଡ଼ା କିମ୍ବା ମଲଚିଂ ବ୍ୟବହାର କରନ୍ତୁ।",
        "ଅଧିକ ଜଳସେଚନ ଓ ପୋଷକ ତତ୍ତ୍ୱ ନଷ୍ଟ ନହେବା ପାଇଁ ଜଳସେଚନ ପୂର୍ବରୁ ୭ ଦିନର ବର୍ଷା ପୂର୍ବାନୁମାନ ଯାଞ୍ଚ କରନ୍ତୁ।"
      ]
    }[lang] || defaultTips.en;

    const tipsToUse = (irr.water_saving_tips && irr.water_saving_tips.length > 0 && lang === "en") ? irr.water_saving_tips : defaultTips;

    return `
      <div>
        <div class="param-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom:14px;">
          <div class="param-card">
            <div class="param-label">${LBL.et0}</div>
            <div class="param-value">${irr.daily_reference_et0_mm} <span class="param-unit">${LBL.mm_day}</span></div>
            <div class="param-meta">${LBL.fao_meta}</div>
          </div>
          <div class="param-card">
            <div class="param-label">${LBL.etc}</div>
            <div class="param-value">${irr.daily_crop_water_demand_etc_mm} <span class="param-unit">${LBL.mm_day}</span></div>
            <div class="param-meta">Kc = ${irr.crop_coefficient_kc}</div>
          </div>
          <div class="param-card">
            <div class="param-label">${LBL.next_irr}</div>
            <div class="param-value" style="color:#34d399; font-size:1rem;">${localizeNextDue(irr.next_irrigation_due)}</div>
            <div class="param-meta">${LBL.threshold}</div>
          </div>
        </div>

        <div class="param-section-title">${LBL.sched_title}</div>
        <div style="overflow-x:auto;">
          <table class="irrigation-table">
            <thead>
              <tr>
                <th style="text-align:left;">${LBL.day_col}</th>
                <th>${LBL.etc_col}</th>
                <th>${LBL.rain_col}</th>
                <th>${LBL.depletion_col}</th>
                <th>${LBL.status_col}</th>
                <th>${LBL.water_col}</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>
        </div>

        <div style="margin-top:14px; background:rgba(0,0,0,0.25); border-radius:8px; padding:12px; font-size:0.75rem;">
          <b style="color:#a7f3d0;">${LBL.advice_title}</b>
          <ul style="padding-left:16px; margin-top:6px; color:#cbd5e1; line-height:1.5;">
            ${tipsToUse.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  renderDoctorSection() {
    const doc = this.modulesData.crop_doctor_module;
    const amendments = doc.soil_amendments || [];
    const fertilizer = doc.fertilizer_schedule || [];

    let amendHtml = amendments.map(a => `
      <div style="margin-bottom:8px; font-size:0.78rem;">
        <b style="color:#fbbf24;">⚠ ${a.issue}:</b>
        <span style="color:#cbd5e1;"> ${a.remedy}</span>
      </div>
    `).join("");

    let fertHtml = fertilizer.map(f => `
      <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.05); font-size:0.78rem;">
        <b style="color:#34d399;">🌱 ${f.stage}:</b>
        <div style="color:#cbd5e1; margin-top:2px;">${f.details}</div>
      </div>
    `).join("");

    return `
      <div>
        <div style="background:rgba(16,185,129,0.12); border:1px solid rgba(16,185,129,0.3); border-radius:10px; padding:12px; margin-bottom:14px;">
          <div style="font-weight:bold; font-size:0.88rem; color:#a7f3d0; margin-bottom:4px;">🩺 Crop Doctor Prescription</div>
          <div style="font-size:0.78rem; color:#f0fdf4; line-height:1.45;">
            ${doc.crop_doctor_summary}
          </div>
        </div>

        <div class="param-section-title">Soil Conditioning & Amendments</div>
        <div style="background:var(--bg-surface-elevated); border:1px solid var(--border-color); border-radius:8px; padding:12px; margin-bottom:14px;">
          ${amendHtml}
        </div>

        <div class="param-section-title">STCR Precision Fertilizer Schedule</div>
        <div style="background:var(--bg-surface-elevated); border:1px solid var(--border-color); border-radius:8px; padding:12px; margin-bottom:14px;">
          ${fertHtml}
        </div>

        <div class="param-section-title">Ask the AI Crop Doctor</div>
        <div class="chat-window">
          <div class="chat-messages" id="cropDoctorChatMessages">
            <div class="chat-bubble bot">
              Hello! I am your AI Crop Doctor specialized in <b>${this.currentCropName}</b>. Ask me anything about fertilizer timing, seed treatment, pest scouting, or soil management for your 1 km² field!
            </div>
          </div>
          <div class="chat-input-bar">
            <input type="text" id="cropDoctorInput" placeholder="Ask about fertilizer, pest spray, irrigation timing..." />
            <button class="btn btn-primary" id="cropDoctorSendBtn" style="padding:6px 12px; margin-left:6px;">
              Send
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindChatEvents() {
    const input = document.getElementById("cropDoctorInput");
    const sendBtn = document.getElementById("cropDoctorSendBtn");
    const msgBox = document.getElementById("cropDoctorChatMessages");
    if (!input || !sendBtn) return;

    const sendMessage = async () => {
      const q = input.value.trim();
      if (!q) return;

      // Add user message
      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.textContent = q;
      msgBox.appendChild(userBubble);
      input.value = "";
      msgBox.scrollTop = msgBox.scrollHeight;

      // Add loading bot bubble
      const loadingBubble = document.createElement("div");
      loadingBubble.className = "chat-bubble bot";
      loadingBubble.textContent = "Analyzing agro-ecological conditions...";
      msgBox.appendChild(loadingBubble);
      msgBox.scrollTop = msgBox.scrollHeight;

      const resp = await window.ApiClient.chatCropDoctor(this.currentCropName, q, this.lastFieldContext);
      loadingBubble.textContent = resp.answer;
      msgBox.scrollTop = msgBox.scrollHeight;
    };

    sendBtn.onclick = sendMessage;
    input.onkeydown = (e) => {
      if (e.key === "Enter") sendMessage();
    };
  }

  getFallbackModules(cropId) {
    return {
      crop_id: cropId,
      crop_name: this.currentCropName,
      disease_detection_module: {
        common_diseases_and_pests: [
          {
            name: "Fall Armyworm (Spodoptera frugiperda)",
            pathogen_type: "Insect Pest",
            symptoms: "Shot holes in whorl leaves, frass deposits, defoliation.",
            favorable_conditions: "Warm humid temperatures (24-30°C).",
            organic_control: "Spray Neem oil (Azadirachtin 1500 ppm @ 5 ml/L) or Bt @ 2g/L.",
            chemical_control: "Chlorantraniliprole 18.5% SC @ 0.4 ml/L.",
            preventive_measures: "Pheromone traps @ 5/acre and intercropping with pulses."
          },
          {
            name: "Northern Corn Leaf Blight",
            pathogen_type: "Fungal",
            symptoms: "Cigar-shaped grayish lesions on leaves.",
            favorable_conditions: "Overcast skies and persistent dew.",
            organic_control: "Foliar spray of Trichoderma harzianum @ 5g/L.",
            chemical_control: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
            preventive_measures: "Crop rotation and clean stubble management."
          }
        ]
      },
      irrigation_prediction_module: {
        daily_reference_et0_mm: 4.8,
        daily_crop_water_demand_etc_mm: 5.76,
        crop_coefficient_kc: 1.2,
        next_irrigation_due: "Day 3",
        daily_forecast_schedule: [
          { day: "Day 1 (Today)", crop_etc_mm: 5.76, forecast_rain_mm: 2.0, soil_depletion_mm: 18.5, status: "Moisture Adequate", irrigation_recommended: false },
          { day: "Day 2", crop_etc_mm: 5.76, forecast_rain_mm: 0.0, soil_depletion_mm: 24.2, status: "Moisture Adequate", irrigation_recommended: false },
          { day: "Day 3", crop_etc_mm: 5.76, forecast_rain_mm: 0.0, soil_depletion_mm: 30.0, status: "Irrigation Due", irrigation_recommended: true, irrigation_depth_mm: 30.0, drip_run_hours: 3.8 },
          { day: "Day 4", crop_etc_mm: 5.76, forecast_rain_mm: 4.5, soil_depletion_mm: 5.7, status: "Rain Protected", irrigation_recommended: false },
          { day: "Day 5", crop_etc_mm: 5.76, forecast_rain_mm: 8.0, soil_depletion_mm: 0.0, status: "Rain Protected", irrigation_recommended: false },
          { day: "Day 6", crop_etc_mm: 5.76, forecast_rain_mm: 0.0, soil_depletion_mm: 5.8, status: "Moisture Adequate", irrigation_recommended: false },
          { day: "Day 7", crop_etc_mm: 5.76, forecast_rain_mm: 0.0, soil_depletion_mm: 11.5, status: "Moisture Adequate", irrigation_recommended: false }
        ],
        water_saving_tips: [
          "Irrigate between 5:00 PM and 8:00 PM to minimize evaporative losses",
          "Apply paddy straw mulch to conserve root-zone capillary water",
          "Maintain optimal drip emitter pressure at 1.0 to 1.5 bar"
        ]
      },
      crop_doctor_module: {
        crop_doctor_summary: `Your 1 km² area possesses fertile soil and favorable climate for ${this.currentCropName}. Follow balanced N-P-K scheduling and avoid prolonged water stagnation.`,
        soil_amendments: [
          { issue: "Optimal Soil Reaction (pH 7.4)", remedy: "Soil pH is favorable. Incorporate 8 tonnes/ha well-rotted farmyard manure." }
        ],
        fertilizer_schedule: [
          { stage: "Basal Application", details: "Apply 100% Phosphorus (DAP 50 kg/ha) and 25% Nitrogen (Urea 30 kg/ha)." },
          { stage: "Vegetative Knee-High (30 Days)", details: "Top dress 50% Nitrogen (Urea 60 kg/ha) with Zinc Sulfate 25 kg/ha." },
          { stage: "Tasseling / Flowering (55 Days)", details: "Top dress remaining 25% Nitrogen and 50% Potassium for grain filling." }
        ]
      }
    };
  }
}

window.ModulesManager = ModulesManager;

