/**
 * KBV (Know Before Visit) - Full Responsive Website UI/UX Controller
 * Implements the AI-Powered Disease & Pest Analysis + 1 km² Geo-Spatial Engine
 * Supports 100% Comprehensive English, Hindi, Kannada, and Marathi Localization
 */

const KBV_TRANSLATIONS = {
  en: {
    brand_sub: "Know Before Visit",
    brand_tagline: "1 km² Geo-Spatial Crop Suitability, Remote Sensing & Mandi Intelligence",
    nav_welcome: "1. Welcome",
    nav_choose: "2. Choose Analysis",
    nav_upload: "3. Field Setup",
    nav_result: "4. Live Farm Dashboard & 1 km² Map",
    nav_loc_sync: "📍 Location Syncing...",
    hero_title_1: "Know Before",
    hero_title_2: "Visit",
    hero_desc: "1 km × 1 km Geo-Spatial Crop Suitability, FAO-56 Irrigation & Mandi Market Intelligence.",
    select_lang: "Select Language",
    continue_btn: "🚀 Enter Live Farm Dashboard →",
    choose_analysis: "Choose Analysis",
    choose_sub: "What would you like to inspect in your field?",
    back_welcome: "← Back to Welcome",
    back_options: "← Back to Options",
    new_scan: "← New Scan",
    disease_title: "Disease Analysis",
    disease_desc: "Detect crop fungal and bacterial diseases from leaf or plant photos with scientific AI confidence.",
    pest_title: "Pestegator",
    pest_desc: "Detect and identify destructive crop pests, larvae, and insects with targeted IPM bio-controls.",
    geospatial_title: "1 km² Crop Suitability",
    geospatial_desc: "Analyze true 1 km × 1 km geodesic boundary soil, weather, terrain & rank the 5 most suitable crops.",
    start_diagnosis: "Start Diagnosis →",
    inspect_pests: "Inspect Pests →",
    view_1km: "View 1 km² Area →",
        irrigation_plan_title: "Smart Irrigation Plan",
    irrigation_plan_desc: "Weather-driven 7-day FAO-56 irrigation schedule, daily crop water demand (ETc), and moisture threshold balance.",
    view_irrigation_btn: "View Irrigation Plan →",
    produce_estimate_title: "Top Crops & Estimated Produce",
    produce_estimate_desc: "Calculate expected metric tonnes of produce per 1 km² (100 Hectares) and per hectare based on your exact field location.",
    view_produce_btn: "Calculate Produce →",
    step_upload: "1. Upload Plant Photo",
    step_details: "2. Crop & Field Details",
    step_analyze: "3. Run AI Diagnostics",
    screen3_desc: "Upload a crop leaf photo and synchronize your 1 km² farm area for multi-module intelligence.",
    upload_title: "Upload Plant Image",
    upload_sub: "Take a photo or choose from gallery (PNG, JPG, JPEG)",
    camera_btn: "📷 Camera",
    gallery_btn: "🖼️ Gallery",
    sample_chips_label: "Or click a sample infected leaf:",
    crop_type_label: "Crop Type *",
    growth_stage_label: "Growth Stage *",
    location_label: "Your Location (for 1 km² analysis)",
    use_curr_loc: "🎯 Use Current Location",
    locating: "⏳ Locating...",
    loc_hint: "📍 Click to synchronize your exact farm coordinates",
    analyze_btn: "Analyze Plant & 1 km² Area →",
    result_title: "Disease Diagnostic & 1 km² Geo-Spatial Result",
    screen4_desc: "AI diagnostic confidence profile, scientific IPM remedies, and 1 km² geodesic risk mapping.",
    save_report_btn: "📥 Save Diagnostic Report",
    severity_label: "Severity",
    affected_area_label: "Analysis Area",
    desc_label: "Disease Description",
    rec_actions_label: "Recommended Actions & Scientific Remedies",
    view_map_btn: "Explore 1 km² Crop Recommendations ↓",
    risk_map_title: "1 km² Area Risk Map & Geodesic Boundary (Your Exact Location)",
    area_badge_text: "Area: 1.00 km² • 100 Hectares (247.1 Acres)",
    high_risk: "High Risk Zone (32%)",
    mod_risk: "Moderate Risk Zone (45%)",
    low_risk: "Low Risk Zone (23%)",
    agro_title: "Integrated 1 km² Crop Suitability & Weather-Driven Advisory",
    agro_sub: "Connecting your disease diagnosis to regional soil pedology (ISRIC SoilGrids), climate, and FAO-56 irrigation demands.",
    panel_crops: "🌿 Top Suitable Crops (Ranked by AHP Score)",
    panel_soil_weather: "🧪 1 km² Soil & Micro-Climate Profile",
    panel_irrigation: "💧 FAO-56 Weather-Driven Irrigation",
        field_loc_label: "Field Location:",
    soil_class_label: "Soil Classification:",
    soil_ph_label: "Soil pH (0-30cm):",
    soil_texture_label: "Soil Texture:",
    temp_label: "Temperature:",
    elev_slope_label: "Elevation / Slope:",
    confidence_label: "Confidence:",
    crop_label_prefix: "Crop:",
    severity_high: "High",
    severity_mod: "Moderate",
    crops: {
      tomato: "Tomato",
      rice: "Rice (Paddy)",
      wheat: "Wheat",
      maize: "Maize (Corn)",
      cotton: "Cotton",
      soybean: "Soybean",
      onion: "Onion",
      groundnut: "Groundnut"
    },
    stages: {
      vegetative: "Vegetative (Leaf Growth)",
      flowering: "Flowering / Tasseling",
      fruiting: "Fruiting / Grain Fill",
      maturity: "Ripening & Harvest Maturity"
    },
    sample_chips: {
      tomato: "🍅 Tomato Early Blight",
      rice: "🌾 Rice Blast",
      wheat: "🌾 Wheat Rust",
      maize: "🌽 Maize Blight",
      cotton: "☁️ Cotton Leaf Curl",
      soybean: "🌱 Soybean Rust",
      onion: "🧅 Onion Blotch",
      groundnut: "🥜 Groundnut Tikka"
    }
  },
  hi: {
    brand_sub: "विजिट से पहले जानें",
    brand_tagline: "एआई फसल रोग, कीट निदान एवं 1 किमी² भू-स्थानिक विश्लेषण इंजन",
    nav_welcome: "1. स्वागत",
    nav_choose: "2. विश्लेषण चुनें",
    nav_upload: "3. फोटो अपलोड",
    nav_result: "4. परिणाम एवं 1 किमी² नक्शा",
    nav_loc_sync: "📍 स्थान सिंक हो रहा है...",
    hero_title_1: "विजिट से पहले",
    hero_title_2: "जानें",
    hero_desc: "1 किमी × 1 किमी भौगोलिक क्षेत्र में बेहतर खेती के लिए एआई-संचालित रोग एवं कीट विश्लेषण।",
    select_lang: "भाषा चुनें",
    continue_btn: "🚀 लाइव खेत डैशबोर्ड खोलें →",
    choose_analysis: "विश्लेषण चुनें",
    choose_sub: "आप अपने खेत में क्या जांचना चाहते हैं?",
    back_welcome: "← स्वागत पर वापस",
    back_options: "← विकल्पों पर वापस",
    new_scan: "← नया स्कैन",
    disease_title: "रोग विश्लेषण",
    disease_desc: "पत्ती या पौधे की फोटो से फसल के कवक और जीवाणु रोगों की वैज्ञानिक एआई पहचान करें।",
    pest_title: "पेस्टिगेटर (कीट पहचान)",
    pest_desc: "फसल के हानिकारक कीटों, सूंडियों की पहचान और समन्वित कीट प्रबंधन (IPM) जैविक उपचार।",
    geospatial_title: "1 किमी² फसल उपयुक्तता",
    geospatial_desc: "1 किमी² मिट्टी, मौसम, इलाके का विश्लेषण और शीर्ष 5 सबसे उपयुक्त फसलों की रैंकिंग।",
    start_diagnosis: "निदान शुरू करें →",
    inspect_pests: "कीट जांचें →",
    view_1km: "1 किमी² क्षेत्र देखें →",
        irrigation_plan_title: "स्मार्ट सिंचाई योजना",
    irrigation_plan_desc: "मौसम-आधारित 7-दिवसीय FAO-56 सिंचाई अनुसूची, दैनिक फसल जल मांग (ETc) और नमी संतुलन परामर्श।",
    view_irrigation_btn: "सिंचाई योजना देखें →",
    produce_estimate_title: "प्रमुख फसलें एवं अनुमानित उत्पादन",
    produce_estimate_desc: "अपने सटीक खेत स्थान और मिट्टी के आधार पर प्रति हेक्टेयर एवं 1 किमी² (100 हेक्टेयर) अनुमानित मीट्रिक टन उत्पादन की गणना करें।",
    view_produce_btn: "अनुमानित उत्पादन देखें →",
    step_upload: "1. फोटो अपलोड करें",
    step_details: "2. फसल एवं खेत विवरण",
    step_analyze: "3. एआई विश्लेषण करें",
    screen3_desc: "फसल की पत्ती की फोटो अपलोड करें और अपने 1 किमी² खेत क्षेत्र को एआई विश्लेषण से जोड़ें।",
    upload_title: "पौधे की फोटो अपलोड करें",
    upload_sub: "कैमरे से फोटो लें या गैलरी से चुनें (PNG, JPG, JPEG)",
    camera_btn: "📷 कैमरा",
    gallery_btn: "🖼️ गैलरी",
    sample_chips_label: "या इनमें से किसी संक्रमित पत्ती पर क्लिक करें:",
    crop_type_label: "फसल का प्रकार *",
    growth_stage_label: "विकास अवस्था *",
    location_label: "आपका स्थान (1 किमी² ग्रिड हेतु)",
    use_curr_loc: "🎯 वर्तमान स्थान का उपयोग करें",
    locating: "⏳ स्थान खोज रहे हैं...",
    loc_hint: "📍 अपने सटीक खेत के निर्देशांक सिंक करने के लिए क्लिक करें",
    analyze_btn: "पौधे और 1 किमी² क्षेत्र का विश्लेषण करें →",
    result_title: "रोग निदान एवं 1 किमी² भू-स्थानिक परिणाम",
    screen4_desc: "एआई रोग निदान विश्वास स्तर, वैज्ञानिक उपचार एवं 1 किमी² जोखिम मानचित्र।",
    save_report_btn: "📥 रिपोर्ट सहेजें",
    severity_label: "गंभीरता",
    affected_area_label: "विश्लेषण क्षेत्र",
    desc_label: "रोग का वैज्ञानिक विवरण",
    rec_actions_label: "अनुशंसित कार्रवाई एवं वैज्ञानिक उपचार",
    view_map_btn: "1 किमी² फसल सिफारिशें देखें ↓",
    risk_map_title: "1 किमी² क्षेत्र जोखिम मानचित्र (आपका सटीक स्थान)",
    area_badge_text: "क्षेत्र: 1.00 किमी² • 100 हेक्टेयर (247.1 एकड़)",
    high_risk: "उच्च जोखिम क्षेत्र (32%)",
    mod_risk: "मध्यम जोखिम क्षेत्र (45%)",
    low_risk: "निम्न जोखिम क्षेत्र (23%)",
    agro_title: "एकीकृत 1 किमी² फसल उपयुक्तता एवं मौसम-आधारित सलाह",
    agro_sub: "आपके रोग निदान को क्षेत्रीय मिट्टी (ISRIC SoilGrids), मौसम और एफएओ-56 सिंचाई से जोड़ना।",
    panel_crops: "🌿 शीर्ष उपयुक्त फसलें (AHP स्कोर द्वारा रैंक)",
    panel_soil_weather: "🧪 1 किमी² मिट्टी एवं सूक्ष्म जलवायु प्रोफ़ाइल",
    panel_irrigation: "💧 एफएओ-56 मौसम-संचालित सिंचाई अनुसूची",
        field_loc_label: "खेत का स्थान:",
    soil_class_label: "मृदा वर्गीकरण:",
    soil_ph_label: "मृदा पीएच (0-30 सेमी):",
    soil_texture_label: "मृदा बनावट:",
    temp_label: "तापमान:",
    elev_slope_label: "ऊंचाई / ढलान:",
    confidence_label: "विश्वास स्तर:",
    crop_label_prefix: "फसल:",
    severity_high: "उच्च (High)",
    severity_mod: "मध्यम (Moderate)",
    crops: {
      tomato: "टमाटर (Tomato)",
      rice: "धान / चावल (Rice)",
      wheat: "गेहूं (Wheat)",
      maize: "मक्का (Maize)",
      cotton: "कपास (Cotton)",
      soybean: "सोयाबीन (Soybean)",
      onion: "प्याज (Onion)",
      groundnut: "मूंगफली (Groundnut)"
    },
    stages: {
      vegetative: "वानस्पतिक (पत्ती विकास)",
      flowering: "फूल / मंजर अवस्था",
      fruiting: "फल / दाना भराव",
      maturity: "परिपक्वता एवं कटाई"
    },
    sample_chips: {
      tomato: "🍅 टमाटर अगेती झुलसा",
      rice: "🌾 धान ब्लास्ट (झोंका)",
      wheat: "🌾 गेहूं पीला रतुआ",
      maize: "🌽 मक्का लीफ ब्लाइट",
      cotton: "☁️ कपास पत्ती मरोड़",
      soybean: "🌱 सोयाबीन रतुआ",
      onion: "🧅 प्याज बैंगनी धब्बा",
      groundnut: "🥜 मूंगफली टिक्का रोग"
    }
  },
  kn: {
    brand_sub: "ಭೇಟಿಗೂ ಮುನ್ನ ತಿಳಿಯಿರಿ",
    brand_tagline: "ಎಐ ಬೆಳೆ ರೋಗ, ಕೀಟ ಪತ್ತೆ ಮತ್ತು 1 ಕಿಮೀ² ಭೂ-ಸ್ಥಳೀಯ ವಿಶ್ಲೇಷಣೆ ಎಂಜಿನ್",
    nav_welcome: "1. ಸ್ವಾಗತ",
    nav_choose: "2. ವಿಶ್ಲೇಷಣೆ ಆಯ್ಕೆ",
    nav_upload: "3. ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
    nav_result: "4. ಫಲಿತಾಂಶ ಮತ್ತು 1 ಕಿಮೀ² ನಕ್ಷೆ",
    nav_loc_sync: "📍 ಸ್ಥಳ ಸಿಂಕ್ ಆಗುತ್ತಿದೆ...",
    hero_title_1: "ಭೇಟಿಗೂ ಮುನ್ನ",
    hero_title_2: "ತಿಳಿಯಿರಿ",
    hero_desc: "1 ಕಿಮೀ × 1 ಕಿಮೀ ಭೌಗೋಳಿಕ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಉತ್ತಮ ಕೃಷಿಗಾಗಿ ಎಐ-ಚಾಲಿತ ಬೆಳೆ ರೋಗ ಮತ್ತು ಕೀಟ ವಿಶ್ಲೇಷಣೆ.",
    select_lang: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    continue_btn: "🚀 ಲೈವ್ ಫಾರ್ಮ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ →",
    choose_analysis: "ವಿಶ್ಲೇಷಣೆ ಆಯ್ಕೆಮಾಡಿ",
    choose_sub: "ನಿಮ್ಮ ಜಮೀನಿನಲ್ಲಿ ಏನನ್ನು ಪರೀಕ್ಷಿಸಲು ಬಯಸುತ್ತೀರಿ?",
    back_welcome: "← ಸ್ವಾಗತಕ್ಕೆ ಹಿಂತಿರುಗಿ",
    back_options: "← ಆಯ್ಕೆಗಳಿಗೆ ಹಿಂತಿರುಗಿ",
    new_scan: "← ಹೊಸ ಸ್ಕ್ಯಾನ್",
    disease_title: "ರೋಗ ವಿಶ್ಲೇಷಣೆ",
    disease_desc: "ಎಲೆ ಅಥವಾ ಸಸ್ಯದ ಚಿತ್ರಗಳಿಂದ ಬೆಳೆ ರೋಗಗಳನ್ನು ಎಐ ನಿಖರತೆಯೊಂದಿಗೆ ಪತ್ತೆಹಚ್ಚಿ.",
    pest_title: "ಪೆಸ್ಟಿಕೇಟರ್ (ಕೀಟ ಶೋಧನೆ)",
    pest_desc: "ಬೆಳೆ ಕೀಟಗಳು, ಹುಳುಗಳನ್ನು ಗುರುತಿಸಿ ಮತ್ತು ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣೆ (IPM) ಪರಿಹಾರ ಪಡೆಯಿರಿ.",
    geospatial_title: "1 ಕಿಮೀ² ಬೆಳೆ ಸೂಕ್ತತೆ",
    geospatial_desc: "1 ಕಿಮೀ² ಮಣ್ಣು, ಹವಾಮಾನ ಮತ್ತು ಪ್ರದೇಶಕ್ಕೆ ಅತ್ಯಂತ ಸೂಕ್ತವಾದ 5 ಬೆಳೆಗಳ ಶ್ರೇಯಾಂಕ.",
    start_diagnosis: "ರೋಗ ನಿರ್ಣಯ ಪ್ರಾರಂಭಿಸಿ →",
    inspect_pests: "ಕೀಟಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ →",
    view_1km: "1 ಕಿಮೀ² ಪ್ರದೇಶ ನೋಡಿ →",
        irrigation_plan_title: "ಸ್ಮಾರ್ಟ್ ನೀರಾವರಿ ಯೋಜನೆ",
    irrigation_plan_desc: "ಹವಾಮಾನ-ಆಧಾರಿತ 7-ದಿನಗಳ FAO-56 ನೀರಾವರಿ ವೇಳಾಪಟ್ಟಿ, ದೈನಂದಿನ ನೀರಿನ ಬೇಡಿಕೆ (ETc) ಮತ್ತು ಮಣ್ಣಿನ ತೇವಾಂಶ ನಿರ್ವಹಣೆ.",
    view_irrigation_btn: "ನೀರಾವರಿ ಯೋಜನೆ ವೀಕ್ಷಿಸಿ →",
    produce_estimate_title: "ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು & ಅಂದಾಜು ಇಳುವರಿ",
    produce_estimate_desc: "ನಿಮ್ಮ ನಿರ್ದಿಷ್ಟ ಜಮೀನಿನ ಸ್ಥಳ ಮತ್ತು ಮಣ್ಣಿನ ಪ್ರಕಾರಕ್ಕೆ ತಕ್ಕಂತೆ ಪ್ರತಿ ಹೆಕ್ಟೇರ್‌ಗೆ ಮತ್ತು 1 ಕಿಮೀ² (100 ಹೆಕ್ಟೇರ್) ವ್ಯಾಪ್ತಿಗೆ ಅಂದಾಜು ಮೆಟ್ರಿಕ್ ಟನ್ ಇಳುವರಿಯನ್ನು ಲೆಕ್ಕಹಾಕಿ.",
    view_produce_btn: "ಇಳುವರಿ ಲೆಕ್ಕಹಾಕಿ →",
    step_upload: "1. ಫೋಟೋ ಅಪ್‌ಲೋಡ್",
    step_details: "2. ಬೆಳೆ ಹಾಗೂ ಜಮೀನಿನ ವಿವರ",
    step_analyze: "3. ಎಐ ವಿಶ್ಲೇಷಣೆ",
    screen3_desc: "ಬೆಳೆಯ ಎಲೆಯ ಫೋಟೋವನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಮತ್ತು ನಿಮ್ಮ 1 ಕಿಮೀ² ಜಮೀನನ್ನು ವಿಶ್ಲೇಷಿಸಿ.",
    upload_title: "ಸಸ್ಯದ ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
    upload_sub: "ಕ್ಯಾಮೆರಾದಿಂದ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ",
    camera_btn: "📷 ಕ್ಯಾಮೆರಾ",
    gallery_btn: "🖼️ ಗ್ಯಾಲರಿ",
    sample_chips_label: "ಅಥವಾ ಮಾದರಿ ರೋಗಗ್ರಸ್ತ ಎಲೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ:",
    crop_type_label: "ಬೆಳೆಯ ವಿಧ *",
    growth_stage_label: "ಬೆಳವಣಿಗೆಯ ಹಂತ *",
    location_label: "ನಿಮ್ಮ ಸ್ಥಳ (1 ಕಿಮೀ² ವಿಶ್ಲೇಷಣೆಗೆ)",
    use_curr_loc: "🎯 ಪ್ರಸ್ತುತ ಸ್ಥಳ ಬಳಸಿ",
    locating: "⏳ ಸ್ಥಳ ಪತ್ತೆಹಚ್ಚಲಾಗುತ್ತಿದೆ...",
    loc_hint: "📍 ನಿಮ್ಮ ನಿಖರವಾದ ಜಮೀನಿನ ಸ್ಥಳವನ್ನು ಸಿಂಕ್ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ",
    analyze_btn: "ಸಸ್ಯ ಮತ್ತು 1 ಕಿಮೀ² ಪ್ರದೇಶ ವಿಶ್ಲೇಷಿಸಿ →",
    result_title: "ರೋಗ ಫಲಿತಾಂಶ ಮತ್ತು 1 ಕಿಮೀ² ನಕ್ಷೆ",
    screen4_desc: "ಎಐ ರೋಗ ನಿರ್ಣಯ ಪ್ರೊಫೈಲ್, ವೈಜ್ಞಾನಿಕ ಐಪಿಎಂ ಪರಿಹಾರಗಳು ಮತ್ತು 1 ಕಿಮೀ² ಅಪಾಯದ ನಕ್ಷೆ.",
    save_report_btn: "📥 ವರದಿ ಉಳಿಸಿ",
    severity_label: "ತೀವ್ರತೆ",
    affected_area_label: "ಬಾಧಿತ ಪ್ರದೇಶ",
    desc_label: "ರೋಗದ ವಿವರಣೆ",
    rec_actions_label: "ಶಿಫಾರಸು ಮಾಡಿದ ಕ್ರಮಗಳು ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಪರಿಹಾರಗಳು",
    view_map_btn: "1 ಕಿಮೀ² ಬೆಳೆ ಶಿಫಾರಸುಗಳನ್ನು ನೋಡಿ ↓",
    risk_map_title: "1 ಕಿಮೀ² ಪ್ರದೇಶದ ಅಪಾಯದ ನಕ್ಷೆ (ನಿಮ್ಮ ನಿಖರ ಸ್ಥಳ)",
    area_badge_text: "ವಿಸ್ತೀರ್ಣ: 1.00 ಕಿಮೀ² • 100 ಹೆಕ್ಟೇರ್ (247.1 ಎಕರೆ)",
    high_risk: "ಹೆಚ್ಚಿನ ಅಪಾಯದ ವಲಯ (32%)",
    mod_risk: "ಮಧ್ಯಮ ಅಪಾಯದ ವಲಯ (45%)",
    low_risk: "ಕಡಿಮೆ ಅಪಾಯದ ವಲಯ (23%)",
    agro_title: "ಸಂಯೋಜಿತ 1 ಕಿಮೀ² ಬೆಳೆ ಸೂಕ್ತತೆ ಮತ್ತು ಹವಾಮಾನ ಆಧಾರಿತ ಸಲಹೆ",
    agro_sub: "ನಿಮ್ಮ ರೋಗ ವಿಶ್ಲೇಷಣೆಯನ್ನು ಪ್ರಾದೇಶಿಕ ಮಣ್ಣು (ISRIC SoilGrids), ಹವಾಮಾನ ಮತ್ತು ಎಫ್‌ಎಒ-56 ನೀರಾವರಿಗೆ ಲಿಂಕ್ ಮಾಡುವುದು.",
    panel_crops: "🌿 ಅತ್ಯುತ್ತಮ ಬೆಳೆಗಳು (AHP ಸ್ಕೋರ್ ಪ್ರಕಾರ)",
    panel_soil_weather: "🧪 1 ಕಿಮೀ² ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ವಿವರ",
    panel_irrigation: "💧 ಎಫ್‌ಎಒ-56 ಹವಾಮಾನ ಆಧಾರಿತ ನೀರಾವರಿ",
        field_loc_label: "ಜಮೀನಿನ ಸ್ಥಳ:",
    soil_class_label: "ಮಣ್ಣಿನ ವರ್ಗೀಕರಣ:",
    soil_ph_label: "ಮಣ್ಣಿನ ಪಿಎಚ್ (0-30 ಸೆಂ.ಮೀ):",
    soil_texture_label: "ಮಣ್ಣಿನ ರಚನೆ:",
    temp_label: "ತಾಪಮಾನ:",
    elev_slope_label: "ಎತ್ತರ / ಇಳಿಜಾರು:",
    confidence_label: "ವಿಶ್ವಾಸಾರ್ಹತೆ:",
    crop_label_prefix: "ಬೆಳೆ:",
    severity_high: "ಹೆಚ್ಚಿನ (High)",
    severity_mod: "ಮಧ್ಯಮ (Moderate)",
    crops: {
      tomato: "ಟೊಮೆಟೊ (Tomato)",
      rice: "ಭತ್ತ / ಅಕ್ಕಿ (Rice)",
      wheat: "ಗೋಧಿ (Wheat)",
      maize: "ಮೆಕ್ಕೆಜೋಳ (Maize)",
      cotton: "ಹತ್ತಿ (Cotton)",
      soybean: "ಸೋಯಾಬೀನ್ (Soybean)",
      onion: "ಈರುಳ್ಳಿ (Onion)",
      groundnut: "ಕಡಲೆಕಾಯಿ (Groundnut)"
    },
    stages: {
      vegetative: "ಸಸ್ಯಕ ಬೆಳವಣಿಗೆ (ಎಲೆಗಳ ಬೆಳವಣಿಗೆ)",
      flowering: "ಹೂಬಿಡುವ ಹಂತ",
      fruiting: "ಕಾಯಿ / ಧಾನ್ಯ ತುಂಬುವಿಕೆ",
      maturity: "ಮಾಗುವಿಕೆ ಮತ್ತು ಕೊಯ್ಲು"
    },
    sample_chips: {
      tomato: "🍅 ಟೊಮೆಟೊ ಅಂಗಮಾರಿ",
      rice: "🌾 ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್)",
      wheat: "🌾 ಗೋಧಿ ಹಳದಿ ತುಕ್ಕು",
      maize: "🌽 ಮೆಕ್ಕೆಜೋಳ ಎಲೆ ರೋಗ",
      cotton: "☁️ ಹತ್ತಿ ಎಲೆ ಮುರುಟು",
      soybean: "🌱 ಸೋಯಾಬೀನ್ ತುಕ್ಕು",
      onion: "🧅 ಈರುಳ್ಳಿ ನೇರಳೆ ಮಚ್ಚೆ",
      groundnut: "🥜 ಕಡಲೆಕಾಯಿ ತಿಕ್ಕಾ ರೋಗ"
    }
  },
  mr: {
    brand_sub: "भेट देण्यापूर्वी जाणून घ्या",
    brand_tagline: "एआय पीक रोग, कीड निदान आणि 1 किमी² भू-स्थानिक विश्लेषण इंजिन",
    nav_welcome: "1. स्वागत",
    nav_choose: "2. विश्लेषण निवडा",
    nav_upload: "3. फोटो अपलोड",
    nav_result: "4. निकाल व 1 किमी² नकाशा",
    nav_loc_sync: "📍 स्थान सिंक होत आहे...",
    hero_title_1: "भेट देण्यापूर्वी",
    hero_title_2: "जाणून घ्या",
    hero_desc: "1 किमी × 1 किमी भौगोलिक क्षेत्रात उत्तम शेतीसाठी एआय-आधारित रोग आणि कीड विश्लेषण.",
    select_lang: "भाषा निवडा",
    continue_btn: "🚀 थेट शेत डॅशबोर्ड उघडा →",
    choose_analysis: "विश्लेषण निवडा",
    choose_sub: "तुम्हाला तुमच्या शेतात काय तपासायचे आहे?",
    back_welcome: "← परत स्वागताकडे",
    back_options: "← पर्यायांकडे परत",
    new_scan: "← नवीन स्कॅन",
    disease_title: "रोग विश्लेषण",
    disease_desc: "पाने किंवा रोपांच्या फोटोवरून पिकांचे बुरशीजन्य व जिवाणूजन्य रोग एआय अचूकतेने ओळखा.",
    pest_title: "पेस्टिगेटर (कीड ओळख)",
    pest_desc: "पिकांवरील नुकसानकारक किडींची ओळख आणि एकात्मिक कीड व्यवस्थापन (IPM) उपाय.",
    geospatial_title: "1 किमी² पीक उपयुक्तता",
    geospatial_desc: "1 किमी² माती, हवामान आणि जमिनीनुसार सर्वाधिक उपयुक्त 5 पिकांचे विश्लेषण.",
    start_diagnosis: "निदान सुरू करा →",
    inspect_pests: "कीड तपासा →",
    view_1km: "1 किमी² क्षेत्र पहा →",
        irrigation_plan_title: "स्मार्ट सिंचन नियोजन",
    irrigation_plan_desc: "हवामान-आधारित 7-दिवसीय FAO-56 सिंचन वेळापत्रक, दैनंदिन पिकांची पाणी गरज (ETc) व ओलावा सल्ला.",
    view_irrigation_btn: "सिंचन नियोजन पहा →",
    produce_estimate_title: "प्रमुख पिके व अंदाजे उत्पादन",
    produce_estimate_desc: "तुमच्या शेताचे स्थान व मातीच्या आधारे प्रति हेक्टर आणि 1 किमी² (100 हेक्टर) क्षेत्रात अंदाजे मेट्रिक टन उत्पादनाची गणना करा.",
    view_produce_btn: "उत्पादन मोजा →",
    step_upload: "1. फोटो अपलोड करा",
    step_details: "2. पीक व शेताचा तपशील",
    step_analyze: "3. एआय विश्लेषण",
    screen3_desc: "पिकाच्या पानाचा फोटो अपलोड करा आणि तुमचे 1 किमी² शेत एआय विश्लेषणाशी जोडा.",
    upload_title: "रोपाचा फोटो अपलोड करा",
    upload_sub: "कॅमेऱ्याने फोटो काढा किंवा गॅलरीतून निवडा (PNG, JPG, JPEG)",
    camera_btn: "📷 कॅमेरा",
    gallery_btn: "🖼️ गॅलरी",
    sample_chips_label: "किंवा यापैकी एका बाधित पानावर क्लिक करा:",
    crop_type_label: "पिकाचा प्रकार *",
    growth_stage_label: "वाढीची अवस्था *",
    location_label: "तुमचे स्थान (1 किमी² विश्लेषणासाठी)",
    use_curr_loc: "🎯 सध्याचे स्थान वापरा",
    locating: "⏳ स्थान शोधत आहे...",
    loc_hint: "📍 तुमच्या अचूक शेताचे निर्देशांक सिंक करण्यासाठी क्लिक करा",
    analyze_btn: "रोप व 1 किमी² क्षेत्राचे विश्लेषण करा →",
    result_title: "रोग निदान आणि 1 किमी² भू-स्थानिक निकाल",
    screen4_desc: "एआय रोग निदान आत्मविश्वास पातळी, वैज्ञानिक उपाय आणि 1 किमी² जोखीम नकाशा.",
    save_report_btn: "📥 अहवाल जतन करा",
    severity_label: "तीव्रता",
    affected_area_label: "विश्लेषण क्षेत्र",
    desc_label: "रोगाचे वैज्ञानिक वर्णन",
    rec_actions_label: "शिफारस केलेल्या कृती आणि वैज्ञानिक उपाय",
    view_map_btn: "1 किमी² पीक शिफارसी पहा ↓",
    risk_map_title: "1 किमी² क्षेत्र जोखीम नकाशा (तुमचे अचूक स्थान)",
    area_badge_text: "क्षेत्र: 1.00 किमी² • 100 हेक्टर (247.1 एकर)",
    high_risk: "उच्च जोखीम क्षेत्र (32%)",
    mod_risk: "मध्यम जोखीम क्षेत्र (45%)",
    low_risk: "कमी जोखीम क्षेत्र (23%)",
    agro_title: "एकीकृत 1 किमी² पीक उपयुक्तता आणि हवामान-आधारित सल्ला",
    agro_sub: "तुमच्या रोग निदानाला प्रादेशिक माती (ISRIC SoilGrids), हवामान आणि एफएओ-56 सिंचनाशी जोडणे.",
    panel_crops: "🌿 सर्वाधिक योग्य पिके (AHP स्कोअरनुसार)",
    panel_soil_weather: "🧪 1 किमी² माती व सूक्ष्म हवामान प्रोफाइल",
    panel_irrigation: "💧 एफएओ-56 हवामान-आधारित सिंचन वेळापत्रक",
        field_loc_label: "शेताचे ठिकाण:",
    soil_class_label: "मातीचे वर्गीकरण:",
    soil_ph_label: "मातीचा पीएच (0-30 सेमी):",
    soil_texture_label: "मातीची पोत:",
    temp_label: "तापमान:",
    elev_slope_label: "उंची / उतार:",
    confidence_label: "आत्मविश्वास:",
    crop_label_prefix: "पीक:",
    severity_high: "उच्च (High)",
    severity_mod: "मध्यम (Moderate)",
    crops: {
      tomato: "टोमॅटो (Tomato)",
      rice: "भात / धान (Rice)",
      wheat: "गहू (Wheat)",
      maize: "मका (Maize)",
      cotton: "कापूस (Cotton)",
      soybean: "सोयाबीन (Soybean)",
      onion: "कांदा (Onion)",
      groundnut: "भुईमूग (Groundnut)"
    },
    stages: {
      vegetative: "शाकीय वाढ (पाने वाढ)",
      flowering: "फुलोरा अवस्था",
      fruiting: "फळ / दाणे भरणे",
      maturity: "पक्वता आणि काढणी"
    },
    sample_chips: {
      tomato: "🍅 टोमॅटो करपा रोग",
      rice: "🌾 भात तांबेरा / ब्लास्ट",
      wheat: "🌾 गहू पिवळा तांबेरा",
      maize: "🌽 मका तुडतुडे व करपा",
      cotton: "☁️ कापूस पाने चुरडणे",
      soybean: "🌱 सोयाबीन तांबेरा",
      onion: "🧅 कांदा जांभळा करपा",
      groundnut: "🥜 भुईमूग टिक्का रोग"
    }
  },
  te: {
    brand_sub: "భేటీకి ముందే తెలుసుకోండి",
    brand_tagline: "AI పంట వ్యాధి, చీడపీడల నిర్ధారణ & 1 చ.కి.మీ భౌగోళిక విశ్లేషణ ఇంజిన్",
        hero_desc: "1 కి.మీ × 1 కి.మీ భౌగోళిక విశ్లేషణ పరిధిలో మెరుగైన వ్యవసాయం కోసం AI ఆధారిత వ్యాధి & తెగుళ్ల విశ్లేషణ.",
    select_lang: "భాషను ఎంచుకోండి",
    continue_btn: "🚀 లైవ్ ఫార్మ్ డ్యాష్‌బోర్డ్‌ను తెరవండి →",
    choose_analysis: "విశ్లేషణను ఎంచుకోండి",
    choose_sub: "మీ పొలంలో దేనిని పరిశీలించాలనుకుంటున్నారు?",
    back_welcome: "← స్వాగతానికి తిరిగి వెళ్లండి",
    back_options: "← ఎంపికలకు తిరిగి వెళ్లండి",
    new_scan: "← కొత్త స్కాన్",
    disease_title: "వ్యాధి విశ్లేషణ",
    disease_desc: "ఆకు లేదా మొక్కల ఫోటోల నుండి పంట శిలీంధ్ర, బ్యాక్టీరియా వ్యాధులను AI తో ఖచ్చితంగా గుర్తించండి.",
    pest_title: "పెస్టిగేటర్ (కీటకాల పరిశీలన)",
    pest_desc: "పంట చీడపీడలు, పురుగులను గుర్తించి సమగ్ర సస్యరక్షణ (IPM) సిఫార్సులను పొందండి.",
    geospatial_title: "1 చ.కి.మీ పంట అనుకూలత",
    geospatial_desc: "1 చ.కి.మీ మట్టి, వాతావరణాన్ని విశ్లేషించి అత్యంత అనువైన 5 పంటల ర్యాంకింగ్ పొందండి.",
    start_diagnosis: "రోగనిర్ధారణ ప్రారంభించండి →",
    inspect_pests: "కీటకాలను పరిశీలించండి →",
    view_1km: "1 చ.కి.మీ ప్రాంతం చూడండి →",
        irrigation_plan_title: "స్మార్ట్ నీటిపారుదల ప్రణాళిక",
    irrigation_plan_desc: "వాతావరణ ఆధారిత 7 రోజుల FAO-56 నీటిపారుదల షెడ్యూల్, రోజువారీ పంట నీటి అవసరం (ETc) మరియు తేమ నిర్వహణ.",
    view_irrigation_btn: "నీటిపారుదల ప్రణాళిక చూడండి →",
    produce_estimate_title: "అనుకూల పంటలు & అంచనా ఉత్పత్తి",
    produce_estimate_desc: "మీ ఖచ్చితమైన పొలం స్థానం మరియు నేల ఆధారంగా హెక్టారుకు మరియు 1 చ.కి.మీ (100 హెక్టార్లు) అంచనా మెట్రిక్ టన్నుల ఉత్పత్తిని లెక్కించండి.",
    view_produce_btn: "ఉత్పత్తిని లెక్కించండి →",
    step_upload: "1. మొక్క ఫోటో అప్‌లోడ్",
    step_details: "2. పంట & పొలం వివరాలు",
    step_analyze: "3. AI నిర్ధారణ చేయండి",
    screen3_desc: "ఆకు ఫోటోను అప్‌లోడ్ చేయండి మరియు మీ 1 చ.కి.మీ పొలాన్ని విశ్లేషించండి.",
    upload_title: "మొక్క చిత్రాన్ని అప్‌లోడ్ చేయండి",
    upload_sub: "కెమెరాతో ఫోటో తీయండి లేదా గ్యాలరీ నుండి ఎంచుకోండి (PNG, JPG, JPEG)",
    camera_btn: "📷 కెమెరా",
    gallery_btn: "🖼️ గ్యాలరీ",
    sample_chips_label: "లేదా నమూనా సోకిన ఆకును ఎంచుకోండి:",
    crop_type_label: "పంట రకం *",
    growth_stage_label: "పెరుగుదల దశ *",
    location_label: "మీ స్థానం (1 చ.కి.మీ విశ్లేషణ కోసం)",
    use_curr_loc: "🎯 ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
    locating: "⏳ స్థానం గుర్తిస్తోంది...",
    loc_hint: "📍 ఖచ్చితమైన పొలం అక్షాంశ రేఖాంశాలను సమన్వయం చేయండి",
    analyze_btn: "మొక్క & 1 చ.కి.మీ ప్రాంతాన్ని విశ్లేషించండి →",
    result_title: "వ్యాధి నిర్ధారణ & 1 చ.కి.మీ ఫలితం",
    screen4_desc: "AI వ్యాధి నిర్ధారణ ప్రొఫైల్, శాస్త్రీయ IPM నివారణలు మరియు 1 చ.కి.మీ రిస్క్ మ్యాప్.",
    save_report_btn: "📥 నివేదికను సేవ్ చేయండి",
    severity_label: "తీవ్రత",
    affected_area_label: "విశ్లేషణ ప్రాంతం",
    desc_label: "వ్యాధి వివరణ",
    rec_actions_label: "సిఫార్సు చేసిన చర్యలు & శాస్త్రీయ నివారణలు",
    view_map_btn: "1 చ.కి.మీ పంట సిఫార్సులను చూడండి ↓",
    risk_map_title: "1 చ.కి.మీ రిస్క్ మ్యాప్ (మీ ఖచ్చితమైన స్థానం)",
    area_badge_text: "విస్తీర్ణం: 1.00 చ.కి.మీ • 100 హెక్టార్లు (247.1 ఎకరాలు)",
    high_risk: "అధిక రిస్క్ జోన్ (32%)",
    mod_risk: "మధ్యస్థ రిస్క్ జోన్ (45%)",
    low_risk: "తక్కువ రిస్క్ జోన్ (23%)",
    agro_title: "సమీకృత 1 చ.కి.మీ పంట అనుకూలత & వాతావరణ సలహా",
    agro_sub: "మీ వ్యాధి నిర్ధారణను ప్రాంతీయ నేల (SoilGrids), వాతావరణం, FAO-56 నీటిపారుదలకు అనుసంధానించడం.",
    panel_crops: "🌿 అత్యంత అనుకూలమైన పంటలు (AHP స్కోరు)",
    panel_soil_weather: "🧪 1 చ.కి.మీ మట్టి & సూక్ష్మ వాతావరణ ప్రొఫైల్",
    panel_irrigation: "💧 FAO-56 వాతావరణ ఆధారిత నీటిపారుదల",
        field_loc_label: "పొలం స్థానం:",
    soil_class_label: "నేల వర్గీకరణ:",
    soil_ph_label: "నేల pH (0-30 సెం.మీ):",
    soil_texture_label: "నేల ఆకృతి:",
    temp_label: "ఉష్ణోగ్రత:",
    elev_slope_label: "ఎత్తు / వాలు:",
    confidence_label: "విశ్వసనీయత:",
    crop_label_prefix: "పంట:",
    severity_high: "అధిక (High)",
    severity_mod: "మధ్యస్థ (Moderate)",
    crops: {
      tomato: "టమోటా (Tomato)",
      rice: "వరి / బియ్యం (Rice)",
      wheat: "గోధుమ (Wheat)",
      maize: "మొక్కజొన్న (Maize)",
      cotton: "పత్తి (Cotton)",
      soybean: "సోయాబీన్ (Soybean)",
      onion: "ఉల్లిపాయ (Onion)",
      groundnut: "వేరుశనగ (Groundnut)"
    },
    stages: {
      vegetative: "శాకీయ పెరుగుదల (ఆకుల పెరుగుదల)",
      flowering: "పూత దశ",
      fruiting: "కాయ / గింజ నిండే దశ",
      maturity: "పక్వత & కోత దశ"
    },
    sample_chips: {
      tomato: "🍅 టమోటా ఎర్లీ బ్లైట్",
      rice: "🌾 వరి అగ్గి తెగులు (బ్లాస్ట్)",
      wheat: "🌾 గోధుమ కుంకుమ తెగులు",
      maize: "🌽 మొక్కజొన్న ఆకు ఎండు తెగులు",
      cotton: "☁️ పత్తి ఆకు ముడత",
      soybean: "🌱 సోయాబీన్ రస్ట్",
      onion: "🧅 ఉల్లి ఊదా మచ్చ తెగులు",
      groundnut: "🥜 వేరుశనగ టిక్కా తెగులు"
    }
  },
  ta: {
    brand_sub: "பார்வையிடும் முன் அறிக",
    brand_tagline: "AI பயிர் நோய், பூச்சி கண்டறிதல் & 1 கிமீ² புவிசார் பகுப்பாய்வு இயந்திரம்",
        hero_desc: "1 கி.மீ × 1 கி.மீ புவியியல் பரப்பளவில் சிறந்த விவசாயத்திற்கான AI நோய் மற்றும் பூச்சி பகுப்பாய்வு.",
    select_lang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    continue_btn: "🚀 நேரடி பண்ணை டாஷ்போர்டைத் திறக்கவும் →",
    choose_analysis: "பகுப்பாய்வைத் தேர்ந்தெடுக்கவும்",
    choose_sub: "உங்கள் வயலில் எதை ஆய்வு செய்ய விரும்புகிறீர்கள்?",
    back_welcome: "← முகப்புக்குத் திரும்புக",
    back_options: "← தேர்வுகளுக்குத் திரும்புக",
    new_scan: "← புதிய ஸ்கேன்",
    disease_title: "நோய் பகுப்பாய்வு",
    disease_desc: "இலை அல்லது தாவர புகைப்படங்களிலிருந்து பூஞ்சை, பாக்டீரியா நோய்களை AI துல்லியத்துடன் கண்டறியவும்.",
    pest_title: "பூச்சி ஆய்வாளர் (Pestegator)",
    pest_desc: "பயிர் பூச்சிகள், புழுக்களைக் கண்டறிந்து ஒருங்கிணைந்த பயிர் பாதுகாப்பு (IPM) வழிகாட்டலைப் பெறுங்கள்.",
    geospatial_title: "1 கிமீ² பயிர் பொருத்தம்",
    geospatial_desc: "1 கிமீ² மண் மற்றும் வானிலையைப் பகுப்பாய்ந்து மிகவும் பொருத்தமான 5 பயிர்களை வரிசைப்படுத்துங்கள்.",
    start_diagnosis: "நோய் கண்டறிதலைத் தொடங்கவும் →",
    inspect_pests: "பூச்சிகளை ஆய்வு செய்யவும் →",
    view_1km: "1 கிமீ² பகுதியைப் பார்க்கவும் →",
        irrigation_plan_title: "ஸ்மார்ட் பாசனத் திட்டம்",
    irrigation_plan_desc: "வானிலை சார்ந்த 7 நாள் FAO-56 பாசன அட்டவணை, தினசரி பயிர் நீர் தேவை (ETc) மற்றும் ஈரப்பதம் சமநிலை.",
    view_irrigation_btn: "பாசனத் திட்டத்தைக் காண்க →",
    produce_estimate_title: "சிறந்த பயிர்கள் & மதிப்பிடப்பட்ட மகசூல்",
    produce_estimate_desc: "உங்கள் வயல் அமைவிடம் மற்றும் மண்ணின் அடிப்படையில் ஹெக்டேருக்கு மற்றும் 1 ச.கி.மீ (100 ஹெக்டேர்) மதிப்பிடப்பட்ட மெட்ரிக் டன் உற்பத்தியைக் கணக்கிடுங்கள்.",
    view_produce_btn: "உற்பத்தியைக் கணக்கிடுங்கள் →",
    step_upload: "1. தாவர புகைப்படம் பதிவேற்று",
    step_details: "2. பயிர் & வயல் விவரங்கள்",
    step_analyze: "3. AI பரிசோதனை",
    screen3_desc: "இலை புகைப்படத்தைப் பதிவேற்றி உங்கள் 1 கிமீ² பண்ணை நிலத்தை ஆய்வு செய்யுங்கள்.",
    upload_title: "தாவரப் படத்தை பதிவேற்றவும்",
    upload_sub: "புகைப்படம் எடுக்கவும் அல்லது கேலரியில் இருந்து தேர்வு செய்யவும் (PNG, JPG, JPEG)",
    camera_btn: "📷 கேமரா",
    gallery_btn: "🖼️ கேலரி",
    sample_chips_label: "அல்லது மாதிரி பாதிக்கப்பட்ட இலையைத் தேர்வுசெய்க:",
    crop_type_label: "பயிர் வகை *",
    growth_stage_label: "வளர்ச்சி நிலை *",
    location_label: "உங்கள் இருப்பிடம் (1 கிமீ² பகுப்பாய்விற்கு)",
    use_curr_loc: "🎯 தற்போதைய இருப்பிடத்தைப் பயன்படுத்தவும்",
    locating: "⏳ இருப்பிடம் கண்டறியப்படுகிறது...",
    loc_hint: "📍 உங்கள் வயலின் துல்லியமான ஆயங்களை இணைக்கவும்",
    analyze_btn: "தாவரம் & 1 கிமீ² பகுதியை பகுப்பாய்வு செய்க →",
    result_title: "நோய் கண்டறிதல் & 1 கிமீ² முடிவு",
    screen4_desc: "AI நோய் கண்டறிதல் சுயவிவரம், அறிவியல் IPM தீர்வுகள் மற்றும் 1 கிமீ² இடர் வரைபடம்.",
    save_report_btn: "📥 அறிக்கையை சேமிக்கவும்",
    severity_label: "தீவிரம்",
    affected_area_label: "பகுப்பாய்வு பகுதி",
    desc_label: "நோய் விளக்கம்",
    rec_actions_label: "பரிந்துரைக்கப்பட்ட நடவடிக்கைகள் & தீர்வுகள்",
    view_map_btn: "1 கிமீ² பயிர் பரிந்துரைகளை ஆராய்க ↓",
    risk_map_title: "1 கிமீ² இடர் வரைபடம் (உங்கள் துல்லியமான இருப்பிடம்)",
    area_badge_text: "பரப்பளவு: 1.00 கிமீ² • 100 ஹெக்டேர் (247.1 ஏக்கர்)",
    high_risk: "அதிக இடர் மண்டலம் (32%)",
    mod_risk: "நடுத்தர இடர் மண்டலம் (45%)",
    low_risk: "குறைந்த இடர் மண்டலம் (23%)",
    agro_title: "ஒருங்கிணைந்த 1 கிமீ² பயிர் பொருத்தம் & வானிலை ஆலோசனை",
    agro_sub: "உங்கள் நோய் கண்டறிதலை பிராந்திய மண் (SoilGrids), வானிலை, FAO-56 பாசனத் தேவைகளுடன் இணைத்தல்.",
    panel_crops: "🌿 மிகவும் பொருத்தமான பயிர்கள் (AHP மதிப்பெண்)",
    panel_soil_weather: "🧪 1 கிமீ² மண் & மைக்ரோ-காலநிலை சுயவிவரம்",
    panel_irrigation: "💧 FAO-56 வானிலை சார்ந்த நீர்ப்பாசனம்",
        field_loc_label: "வயல் அமைவிடம்:",
    soil_class_label: "மண் வகைப்பாடு:",
    soil_ph_label: "மண் pH (0-30 செ.மீ):",
    soil_texture_label: "மண் அமைப்பு:",
    temp_label: "வெப்பநிலை:",
    elev_slope_label: "உயரம் / சாய்வு:",
    confidence_label: "நம்பகத்தன்மை:",
    crop_label_prefix: "பயிர்:",
    severity_high: "அதிக (High)",
    severity_mod: "நடுத்தர (Moderate)",
    crops: {
      tomato: "தக்காளி (Tomato)",
      rice: "நெல் / அரிசி (Rice)",
      wheat: "கோதுமை (Wheat)",
      maize: "மக்காச்சோளம் (Maize)",
      cotton: "பருத்தி (Cotton)",
      soybean: "சோயாபீன் (Soybean)",
      onion: "வெங்காயம் (Onion)",
      groundnut: "நிலக்கடலை (Groundnut)"
    },
    stages: {
      vegetative: "வளர்ச்சி நிலை (இலை வளர்ச்சி)",
      flowering: "பூக்கும் நிலை",
      fruiting: "காய் / தானியம் முதிரும் நிலை",
      maturity: "முதிர்ச்சி & அறுவடை"
    },
    sample_chips: {
      tomato: "🍅 தக்காளி முன்கூட்டிய கருகல்",
      rice: "🌾 நெல் குலை நோய் (பிளாஸ்ட்)",
      wheat: "🌾 கோதுமை மஞ்சள் துரு",
      maize: "🌽 மக்காச்சோள இலை கருகல்",
      cotton: "☁️ பருத்தி இலை சுருள்",
      soybean: "🌱 சோயாபீன் துரு நோய்",
      onion: "🧅 வெங்காய ஊதா புள்ளி",
      groundnut: "🥜 நிலக்கடலை டிக்கா நோய்"
    }
  },
  gu: {
    brand_sub: "મુલાકાત પહેલાં જાણો",
    brand_tagline: "AI પાક રોગ, જીવાત નિદાન અને 1 કિમી² ભૌગોલિક એન્જિન",
        hero_desc: "1 કિમી × 1 કિમી ભૌગોલિક ક્ષેત્રમાં બહેતર ખેતી માટે AI આધારિત રોગ અને જીવાત વિશ્લેષણ.",
    select_lang: "ભાષા પસંદ કરો",
    continue_btn: "🚀 લાઇવ ફાર્મ ડેશબોર્ડ ખોલો →",
    choose_analysis: "વિશ્લેષણ પસંદ કરો",
    choose_sub: "તમે તમારા ખેતરમાં શું તપાસવા માંગો છો?",
    back_welcome: "← સ્વાગત પર પાછા જાઓ",
    back_options: "← વિકલ્પો પર પાછા જાઓ",
    new_scan: "← નવું સ્કેન",
    disease_title: "રોગ વિશ્લેષણ",
    disease_desc: "પાંદડા અથવા છોડના ફોટામાંથી પાકના રોગોનું AI સચોટતા સાથે નિદાન કરો.",
    pest_title: "જીવાત નિરીક્ષક (Pestegator)",
    pest_desc: "પાકની જીવાતો અને ઇયળોને ઓળખો અને લક્ષિત IPM જૈવિક નિયંત્રણ મેળવો.",
    geospatial_title: "1 કિમી² પાક અનુકૂળતા",
    geospatial_desc: "1 કિમી² જમીન અને હવામાનનું વિશ્લેષણ કરો અને 5 સૌથી યોગ્ય પાકોનું રેન્કિંગ મેળવો.",
    start_diagnosis: "નિદાન શરૂ કરો →",
    inspect_pests: "જીવાતો તપાસો →",
    view_1km: "1 કિમી² વિસ્તાર જુઓ →",
        irrigation_plan_title: "સ્માર્ટ પિયત આયોજન",
    irrigation_plan_desc: "હવામાન-આધારિત 7-દિવસીય FAO-56 પિયત સમયપત્રક, દૈનિક પાક પાણીની જરૂરિયાત (ETc) અને ભેજ સલાહ.",
    view_irrigation_btn: "પિયત આયોજન જુઓ →",
    produce_estimate_title: "યોગ્ય પાકો અને અંદાજિત ઉત્પાદન",
    produce_estimate_desc: "તમારા ખેતરના ચોક્કસ સ્થાન અને જમીનને આધારે પ્રતિ હેક્ટર અને 1 ચો.કિમી (100 હેક્ટર) દીઠ અંદાજિત મેટ્રિક ટન ઉત્પાદનની ગણતરી કરો.",
    view_produce_btn: "ઉત્પાદન ગણો →",
    step_upload: "1. છોડનો ફોટો અપલોડ",
    step_details: "2. પાક અને ખેતરની વિગત",
    step_analyze: "3. AI વિશ્લેષણ",
    screen3_desc: "છોડના પાંદડાનો ફોટો અપલોડ કરો અને તમારું 1 કિમી² ખેતર વિશ્લેષણ સાથે જોડો.",
    upload_title: "છોડની તસવીર અપલોડ કરો",
    upload_sub: "કેમેરાથી ફોટો લો અથવા ગેલેરીમાંથી પસંદ કરો (PNG, JPG, JPEG)",
    camera_btn: "📷 કેમેરા",
    gallery_btn: "🖼️ ગેલેરી",
    sample_chips_label: "અથવા નમૂના પાંદડા પસંદ કરો:",
    crop_type_label: "પાકનો પ્રકાર *",
    growth_stage_label: "વિકાસનો તબક્કો *",
    location_label: "તમારું સ્થાન (1 કિમી² વિશ્લેષણ માટે)",
    use_curr_loc: "🎯 વર્તમાન સ્થાન વાપરો",
    locating: "⏳ સ્થાન શોધી રહ્યું છે...",
    loc_hint: "📍 તમારા ખેતરના ચોક્કસ સંકલનને સમન્વયિત કરો",
    analyze_btn: "છોડ અને 1 કિમી² વિસ્તારનું વિશ્લેષણ કરો →",
    result_title: "રોગ નિદાન અને 1 કિમી² પરિણામ",
    screen4_desc: "AI રોગ નિદાન પ્રોફાઇલ, વૈજ્ઞાનિક IPM ઉપાયો અને 1 કિમી² જોખમ નકશો.",
    save_report_btn: "📥 રિપોર્ટ સાચવો",
    severity_label: "તીવ્રતા",
    affected_area_label: "વિશ્લેષણ વિસ્તાર",
    desc_label: "રોગનું વર્ણન",
    rec_actions_label: "ભલામણ કરેલ પગલાં અને ઉપાયો",
    view_map_btn: "1 કિમી² પાક ભલામણો જુઓ ↓",
    risk_map_title: "1 કિમી² જોખમ નકશો (તમારું ચોક્કસ સ્થાન)",
    area_badge_text: "વિસ્તાર: 1.00 કિમી² • 100 હેક્ટર (247.1 એકર)",
    high_risk: "ઉચ્ચ જોખમ ક્ષેત્ર (32%)",
    mod_risk: "મધ્યમ જોખમ ક્ષેત્ર (45%)",
    low_risk: "ઓછું જોખમ ક્ષેત્ર (23%)",
    agro_title: "સંકલિત 1 કિમી² પાક અનુકૂળતા અને હવામાન સલાહ",
    agro_sub: "તમારા રોગ નિદાનને પ્રાદેશિક જમીન (SoilGrids), હવામાન અને FAO-56 સિંચાઈ સાથે જોડો.",
    panel_crops: "🌿 સૌથી અનુકૂળ પાકો (AHP સ્કોર)",
    panel_soil_weather: "🧪 1 કિમી² જમીન અને સૂક્ષ્મ-આબોહવા પ્રોફાઇલ",
    panel_irrigation: "💧 FAO-56 હવામાન-આધારિત સિંચાઈ",
        field_loc_label: "ખેતરનું સ્થાન:",
    soil_class_label: "જમીનનું વર્ગીકરણ:",
    soil_ph_label: "જમીન pH (0-30 સેમી):",
    soil_texture_label: "જમીનનું બંધારણ:",
    temp_label: "તાપમાન:",
    elev_slope_label: "ઊંચાઈ / ઢોળાવ:",
    confidence_label: "વિશ્વાસ:",
    crop_label_prefix: "પાક:",
    severity_high: "ઉચ્ચ (High)",
    severity_mod: "મધ્યમ (Moderate)",
    crops: {
      tomato: "ટામેટાં (Tomato)",
      rice: "ડાંગર / ચોખા (Rice)",
      wheat: "ઘઉં (Wheat)",
      maize: "મકાઈ (Maize)",
      cotton: "કપાસ (Cotton)",
      soybean: "સોયાબીન (Soybean)",
      onion: "ડુંગળી (Onion)",
      groundnut: "મગફળી (Groundnut)"
    },
    stages: {
      vegetative: "વાનસ્પતિક વૃદ્ધિ (પાંદડા વૃદ્ધિ)",
      flowering: "ફૂલ આવવાનો તબક્કો",
      fruiting: "ફળ / દાણા ભરાવાનો તબક્કો",
      maturity: "પાકવાની અને લણણીની અવસ્થા"
    },
    sample_chips: {
      tomato: "🍅 ટામેટાં અગેતી સુકારો",
      rice: "🌾 ડાંગર બ્લાસ્ટ રોગ",
      wheat: "🌾 ઘઉં પીળો ગેરુ",
      maize: "🌽 મકાઈ પાંદડાનો સુકારો",
      cotton: "☁️ કપાસ પાન વળવું",
      soybean: "🌱 સોયાબીન ગેરુ રોગ",
      onion: "🧅 ડુંગળી જાંબલી ધબ્બા",
      groundnut: "🥜 મગફળી ટીક્કા રોગ"
    }
  },
  bn: {
    brand_sub: "পরিদর্শনের আগে জানুন",
    brand_tagline: "AI শস্য রোগ, পোকা নির্ণয় ও ১ বর্গকিমি ভৌগোলিক ইঞ্জিন",
        hero_desc: "১ কিমি × ১ কিমি ভৌগোলিক এলাকায় উন্নত চাষের জন্য AI চালিত রোগ এবং পোকা বিশ্লেষণ।",
    select_lang: "ভাষা নির্বাচন করুন",
    continue_btn: "🚀 লাইভ ফার্ম ড্যাশবোর্ড খুলুন →",
    choose_analysis: "বিশ্লেষণ নির্বাচন করুন",
    choose_sub: "আপনি আপনার জমিতে কী পরীক্ষা করতে চান?",
    back_welcome: "← হোমপেজে ফিরে যান",
    back_options: "← বিকল্পে ফিরে যান",
    new_scan: "← নতুন স্ক্যান",
    disease_title: "রোগ বিশ্লেষণ",
    disease_desc: "পাতার ছবি থেকে ফসলের ছত্রাক ও ব্যাকটেরিয়া ঘটিত রোগ AI নির্ভুলতায় নির্ণয় করুন।",
    pest_title: "কীটপতঙ্গ নিরীক্ষক (Pestegator)",
    pest_desc: "ফসলের ক্ষতিকারক পোকা শনাক্ত করুন এবং সুনির্দিষ্ট জৈব নিয়ন্ত্রণ ব্যবস্থা জানুন।",
    geospatial_title: "১ বর্গকিমি শস্য উপযোগিতা",
    geospatial_desc: "১ বর্গকিমি মাটির উর্বরতা ও আবহাওয়া বিশ্লেষণ করে ৫টি সর্বাধিক উপযোগী ফসল জানুন।",
    start_diagnosis: "রোগ নির্ণয় শুরু করুন →",
    inspect_pests: "পোকা পরীক্ষা করুন →",
    view_1km: "১ বর্গকিমি এলাকা দেখুন →",
        irrigation_plan_title: "স্মার্ট সেচ পরিকল্পনা",
    irrigation_plan_desc: "আবহাওয়া-ভিত্তিক ৭ দিনের FAO-56 সেচ সময়সূচী, দৈনিক ফসলের জলের চাহিদা (ETc) এবং আর্দ্রতা ভারসাম্য।",
    view_irrigation_btn: "সেচ পরিকল্পনা দেখুন →",
    produce_estimate_title: "উপযুক্ত ফসল ও আনুমানিক উৎপাদন",
    produce_estimate_desc: "আপনার জমির অবস্থান ও মাটির ভিত্তিতে হেক্টর প্রতি এবং ১ বর্গ কিমি (১০০ হেক্টর) এলাকায় আনুমানিক মেট্রিক টন উৎপাদনের হিসাব করুন।",
    view_produce_btn: "উৎপাদন গণনা করুন →",
    step_upload: "১. গাছের ছবি আপলোড",
    step_details: "২. ফসল ও জমির বিবরণ",
    step_analyze: "৩. AI রোগ নির্ণয়",
    screen3_desc: "গাছের পাতার ছবি আপলোড করুন এবং আপনার ১ বর্গকিমি জমি বিশ্লেষণ করুন।",
    upload_title: "গাছের ছবি আপলোড করুন",
    upload_sub: "ক্যামেরা দিয়ে ছবি তুলুন বা গ্যালারি থেকে নির্বাচন করুন (PNG, JPG, JPEG)",
    camera_btn: "📷 ক্যামেরা",
    gallery_btn: "🖼️ গ্যালারি",
    sample_chips_label: "অথবা আক্রান্ত পাতার নমুনা নির্বাচন করুন:",
    crop_type_label: "ফসলের ধরন *",
    growth_stage_label: "বৃদ্ধির পর্যায় *",
    location_label: "আপনার অবস্থান (১ বর্গকিমি বিশ্লেষণের জন্য)",
    use_curr_loc: "🎯 বর্তমান অবস্থান ব্যবহার করুন",
    locating: "⏳ অবস্থান শনাক্ত হচ্ছে...",
    loc_hint: "📍 আপনার জমির সঠিক অবস্থান সিঙ্ক করুন",
    analyze_btn: "গাছ ও ১ বর্গকিমি এলাকা বিশ্লেষণ করুন →",
    result_title: "রোগ নির্ণয় ও ১ বর্গকিমি ফলাফল",
    screen4_desc: "AI রোগ নির্ণয় প্রোফাইল, বৈজ্ঞানিক IPM প্রতিকার এবং ১ বর্গকিমি ঝুঁকি মানচিত্র।",
    save_report_btn: "📥 রিপোর্ট সংরক্ষণ করুন",
    severity_label: "তীব্রতা",
    affected_area_label: "বিশ্লেষণ এলাকা",
    desc_label: "রোগের বিবরণ",
    rec_actions_label: "সুপারিশকৃত পদক্ষেপ ও বৈজ্ঞানিক প্রতিকার",
    view_map_btn: "১ বর্গকিমি শস্য সুপারিশ দেখুন ↓",
    risk_map_title: "১ বর্গকিমি ঝুঁকি মানচিত্র (আপনার সঠিক অবস্থান)",
    area_badge_text: "ক্ষেত্রফল: ১.০০ বর্গকিমি • ১০০ হেক্টর (২৪৭.১ একর)",
    high_risk: "উচ্চ ঝুঁকি এলাকা (৩২%)",
    mod_risk: "মাঝারি ঝুঁকি এলাকা (৪৫%)",
    low_risk: "কম ঝুঁকি এলাকা (২৩%)",
    agro_title: "সমন্বিত ১ বর্গকিমি শস্য উপযোগিতা ও আবহাওয়া পরামর্শ",
    agro_sub: "রোগ নির্ণয়কে আঞ্চলিক মাটি (SoilGrids), আবহাওয়া ও FAO-56 সেচ চাহিদার সাথে সমন্বয় করা।",
    panel_crops: "🌿 শীর্ষ উপযোগী ফসল (AHP স্কোর)",
    panel_soil_weather: "🧪 ১ বর্গকিমি মাটি ও আবহাওয়া প্রোফাইল",
    panel_irrigation: "💧 FAO-56 আবহাওয়া-ভিত্তিক সেচ পরামর্শ",
        field_loc_label: "জমির অবস্থান:",
    soil_class_label: "মাটির শ্রেণীবিভাগ:",
    soil_ph_label: "মাটির পিএইচ (০-৩০ সেমি):",
    soil_texture_label: "মাটির গঠন:",
    temp_label: "তাপমাত্রা:",
    elev_slope_label: "উচ্চতা / ঢাল:",
    confidence_label: "নির্ভরযোগ্যতা:",
    crop_label_prefix: "ফসল:",
    severity_high: "উচ্চ (High)",
    severity_mod: "মাঝারি (Moderate)",
    crops: {
      tomato: "টমেটো (Tomato)",
      rice: "ধান / চাল (Rice)",
      wheat: "গম (Wheat)",
      maize: "ভুট্টা (Maize)",
      cotton: "তুলা (Cotton)",
      soybean: "সয়াবিন (Soybean)",
      onion: "পেঁয়াজ (Onion)",
      groundnut: "চীনাবাদাম (Groundnut)"
    },
    stages: {
      vegetative: "অঙ্গজ বৃদ্ধি (পাতা বৃদ্ধি)",
      flowering: "ফুল ফোটার পর্যায়",
      fruiting: "ফল / দানা ধরার পর্যায়",
      maturity: "পাকা ও ফসল তোলার পর্যায়"
    },
    sample_chips: {
      tomato: "🍅 টমেটো আগাম ধ্বসা",
      rice: "🌾 ধানের ব্লাস্ট রোগ",
      wheat: "🌾 গমের হলুদ মরিচা",
      maize: "🌽 ভুট্টার পাতা ধ্বসা",
      cotton: "☁️ তুলার পাতা কোঁকড়ানো",
      soybean: "🌱 সয়াবিন মরিচা রোগ",
      onion: "🧅 পেঁয়াজের বেগুনি দাগ",
      groundnut: "🥜 চিনাবাদাম টিক্কা রোগ"
    }
  },
  ml: {
    brand_sub: "സന്ദർശിക്കുന്നതിന് മുമ്പ് അറിയുക",
    brand_tagline: "AI വിള രോഗം, കീട നിർണ്ണയം & 1 ച.കി.മീ ഭൂവിവര വിശകലന എഞ്ചിൻ",
        hero_desc: "1 കി.മീ × 1 കി.മീ ഭൂമിശാസ്ത്രപരമായ പരിധിയിൽ മികച്ച കൃഷിക്കായി AI അധിഷ്ഠിത രോഗ, കീട വിശകലനം.",
    select_lang: "ഭാഷ തിരഞ്ഞെടുക്കുക",
    continue_btn: "🚀 ലൈവ് ഫാം ഡാഷ്‌ബോർഡ് തുറക്കുക →",
    choose_analysis: "വിശകലനം തിരഞ്ഞെടുക്കുക",
    choose_sub: "നിങ്ങളുടെ തോട്ടത്തിൽ എന്താണ് പരിശോധിക്കേണ്ടത്?",
    back_welcome: "← സ്വാഗതത്തിലേക്ക് മടങ്ങുക",
    back_options: "← ഓപ്ഷനുകളിലേക്ക് മടങ്ങുക",
    new_scan: "← പുതിയ സ്കാൻ",
    disease_title: "രോഗ വിശകലനം",
    disease_desc: "ഇലകളുടെ ഫോട്ടോകളിൽ നിന്ന് വിള രോഗങ്ങൾ AI കൃത്യതയോടെ കണ്ടെത്തുക.",
    pest_title: "കീട നിരീക്ഷകൻ (Pestegator)",
    pest_desc: "വിള കീടങ്ങളെയും പുഴുക്കളെയും തിരിച്ചറിഞ്ഞ് സസ്യസംരക്ഷണ നിർദ്ദേശങ്ങൾ നേടുക.",
    geospatial_title: "1 ച.കി.മീ വിള അനുയോജ്യത",
    geospatial_desc: "1 ച.കി.മീ മണ്ണും കാലാവസ്ഥയും പരിശോധിച്ച് ഏറ്റവും അനുയോജ്യമായ 5 വിളകൾ കണ്ടെത്തുക.",
    start_diagnosis: "രോഗനിർണ്ണയം ആരംഭിക്കുക →",
    inspect_pests: "കീടങ്ങളെ പരിശോധിക്കുക →",
    view_1km: "1 ച.കി.മീ പ്രദേശം കാണുക →",
        irrigation_plan_title: "സ്മാർട്ട് നനയ്ക്കൽ പദ്ധതി",
    irrigation_plan_desc: "കാലാവസ്ഥാധിഷ്ഠിത 7 ദിവസത്തെ FAO-56 നനയ്ക്കൽ ഷെഡ്യൂൾ, ദൈനംദിന വിള ജല ആവശ്യകത (ETc), ഈർപ്പ സന്തുലനം.",
    view_irrigation_btn: "നനയ്ക്കൽ പദ്ധതി കാണുക →",
    produce_estimate_title: "അനുയോജ്യമായ വിളകളും ഉത്പാദനവും",
    produce_estimate_desc: "നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ സ്ഥാനവും മണ്ണും അടിസ്ഥാനമാക്കി ഹെക്ടറിനും 1 ച.കി.മീറ്ററിനും (100 ഹെക്ടർ) കണക്കാക്കിയ മെട്രിക് ടൺ ഉത്പാദനം കണക്കാക്കുക.",
    view_produce_btn: "ഉത്പാദനം കണക്കാക്കുക →",
    step_upload: "1. സസ്യ ഫോട്ടോ അപ്‌ലോഡ്",
    step_details: "2. വിള & തോട്ടം വിവരങ്ങൾ",
    step_analyze: "3. AI പരിശോധന",
    screen3_desc: "ഇല ഫോട്ടോ അപ്‌ലോഡ് ചെയ്ത് നിങ്ങളുടെ 1 ച.കി.മീ കൃഷിയിടം വിശകലനം ചെയ്യുക.",
    upload_title: "സസ്യ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക",
    upload_sub: "ക്യാമറ ഉപയോഗിച്ച് ഫോട്ടോ എടുക്കുക അല്ലെങ്കിൽ ഗാലറിയിൽ നിന്ന് തിരഞ്ഞെടുക്കുക",
    camera_btn: "📷 ക്യാമറ",
    gallery_btn: "🖼️ ഗാലറി",
    sample_chips_label: "അല്ലെങ്കിൽ രോഗബാധിതമായ ഇലയുടെ മാതൃക തിരഞ്ഞെടുക്കുക:",
    crop_type_label: "വിള തരം *",
    growth_stage_label: "വളർച്ചാ ഘട്ടം *",
    location_label: "നിങ്ങളുടെ സ്ഥാനം (1 ച.കി.മീ വിശകലനത്തിന്)",
    use_curr_loc: "🎯 നിലവിലെ സ്ഥാനം ഉപയോഗിക്കുക",
    locating: "⏳ സ്ഥാനം കണ്ടെത്തുന്നു...",
    loc_hint: "📍 നിങ്ങളുടെ കൃഷിയിടത്തിന്റെ കൃത്യമായ സ്ഥാനം സമന്വയിപ്പിക്കുക",
    analyze_btn: "സസ്യവും 1 ച.കി.മീ പ്രദേശവും വിശകലനം ചെയ്യുക →",
    result_title: "രോഗനിർണ്ണയവും 1 ച.കി.മീ ഫലവും",
    screen4_desc: "AI രോഗനിർണ്ണയ പ്രൊഫൈൽ, ശാസ്ത്രീയ IPM പരിഹാരങ്ങൾ, 1 ച.കി.മീ അപകടസാധ്യതാ മാപ്പ്.",
    save_report_btn: "📥 റിപ്പോർട്ട് സംരക്ഷിക്കുക",
    severity_label: "തീവ്രത",
    affected_area_label: "വിശകലന പ്രദേശം",
    desc_label: "രോഗ വിവരണം",
    rec_actions_label: "ശുപാർശ ചെയ്യുന്ന നടപടികളും പരിഹാരങ്ങളും",
    view_map_btn: "1 ച.കി.മീ വിള ശുപാർശകൾ കാണുക ↓",
    risk_map_title: "1 ച.കി.മീ അപകടസാധ്യതാ മാപ്പ് (നിങ്ങളുടെ കൃത്യമായ സ്ഥാനം)",
    area_badge_text: "വിസ്തീർണ്ണം: 1.00 ച.കി.മീ • 100 ഹെക്ടർ (247.1 ഏക്കർ)",
    high_risk: "ഉയർന്ന അപകട മേഖല (32%)",
    mod_risk: "മിതമായ അപകട മേഖല (45%)",
    low_risk: "കുറഞ്ഞ അപകട മേഖല (23%)",
    agro_title: "സംയോജിത 1 ച.കി.മീ വിള അനുയോജ്യത & കാലാവസ്ഥാ നിർദ്ദേശം",
    agro_sub: "നിങ്ങളുടെ രോഗനിർണ്ണയം മണ്ണിന്റെ സ്വഭാവം, കാലാവസ്ഥ, FAO-56 ജലസേചന ആവശ്യങ്ങളുമായി ബന്ധിപ്പിക്കുന്നു.",
    panel_crops: "🌿 ഏറ്റവും അനുയോജ്യമായ വിളകൾ (AHP സ്കോർ)",
    panel_soil_weather: "🧪 1 ച.കി.മീ മണ്ണും സൂക്ഷ്മ കാലാവസ്ഥാ പ്രൊഫൈലും",
    panel_irrigation: "💧 FAO-56 കാലാവസ്ഥാ അധിഷ്ഠിത ജലസേചനം",
        field_loc_label: "പാടത്തിന്റെ സ്ഥാനം:",
    soil_class_label: "മണ്ണ് വർഗ്ഗീകരണം:",
    soil_ph_label: "മണ്ണ് pH (0-30 സെ.മീ):",
    soil_texture_label: "മണ്ണിന്റെ ഘടന:",
    temp_label: "താപനില:",
    elev_slope_label: "ഉയരം / ചരിവ്:",
    confidence_label: "വിശ്വാസ്യത:",
    crop_label_prefix: "വിള:",
    severity_high: "ഉയർന്ന (High)",
    severity_mod: "മിതമായ (Moderate)",
    crops: {
      tomato: "തക്കാളി (Tomato)",
      rice: "നെല്ല് / അരി (Rice)",
      wheat: "ഗോതമ്പ് (Wheat)",
      maize: "മക്കച്ചോളം (Maize)",
      cotton: "പരുത്തി (Cotton)",
      soybean: "സോയാബീൻ (Soybean)",
      onion: "സവാള (Onion)",
      groundnut: "നിലക്കടല (Groundnut)"
    },
    stages: {
      vegetative: "കായിക വളർച്ച (ഇല വളർച്ച)",
      flowering: "പൂവിടുന്ന ഘട്ടം",
      fruiting: "കായ് / ധാന്യം നിറയുന്ന ഘട്ടം",
      maturity: "വിളവെടുപ്പ് ഘട്ടം"
    },
    sample_chips: {
      tomato: "🍅 തക്കാളി കരിഞ്ഞുണങ്ങൽ",
      rice: "🌾 നെല്ല് ബ്ലാസ്റ്റ് രോഗം",
      wheat: "🌾 ഗോതമ്പ് മഞ്ഞ തുരുമ്പ്",
      maize: "🌽 ചോളം ഇല കരിച്ചിൽ",
      cotton: "☁️ പരുത്തി ഇലച്ചുരുൾ",
      soybean: "🌱 സോയാബീൻ തുരുമ്പ് രോഗം",
      onion: "🧅 ഉള്ളി പർപ്പിൾ പുള്ളി",
      groundnut: "🥜 നിലക്കടല തിക്ക രോഗം"
    }
  },
  pa: {
    brand_sub: "ਦੌਰੇ ਤੋਂ ਪਹਿਲਾਂ ਜਾਣੋ",
    brand_tagline: "AI ਫ਼ਸਲ ਰੋਗ, ਕੀੜੇ ਦੀ ਪਛਾਣ ਅਤੇ 1 ਕਿਲੋਮੀਟਰ² ਭੂਗੋਲਿਕ ਇੰਜਣ",
        hero_desc: "1 ਕਿਮੀ × 1 ਕਿਮੀ ਭੂਗੋਲਿਕ ਖੇਤਰ ਵਿੱਚ ਬਿਹਤਰ ਖੇਤੀ ਲਈ AI ਅਧਾਰਿਤ ਬਿਮਾਰੀ ਅਤੇ ਕੀੜਿਆਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ।",
    select_lang: "ਭਾਸ਼ਾ ਚੁਣੋ",
    continue_btn: "🚀 ਲਾਈਵ ਫਾਰਮ ਡੈਸ਼ਬੋਰਡ ਖੋਲ੍ਹੋ →",
    choose_analysis: "ਵਿਸ਼ਲੇਸ਼ਣ ਚੁਣੋ",
    choose_sub: "ਤੁਸੀਂ ਆਪਣੇ ਖੇਤ ਵਿੱਚ ਕੀ ਜਾਂਚਣਾ ਚਾਹੁੰਦੇ ਹੋ?",
    back_welcome: "← ਵਾਪਸ ਸੁਆਗਤ 'ਤੇ",
    back_options: "← ਵਾਪਸ ਵਿਕਲਪਾਂ 'ਤੇ",
    new_scan: "← ਨਵਾਂ ਸਕੈਨ",
    disease_title: "ਰੋਗ ਵਿਸ਼ਲੇਸ਼ਣ",
    disease_desc: "ਪੱਤਿਆਂ ਦੀਆਂ ਫੋਟੋਆਂ ਤੋਂ ਫ਼ਸਲੀ ਉੱਲੀ ਅਤੇ ਬੈਕਟੀਰੀਆ ਰੋਗਾਂ ਦਾ AI ਨਾਲ ਸਹੀ ਨਿਦਾਨ ਕਰੋ।",
    pest_title: "ਕੀੜਾ ਨਿਰੀਖਕ (Pestegator)",
    pest_desc: "ਫ਼ਸਲੀ ਕੀੜਿਆਂ ਦੀ ਪਛਾਣ ਕਰੋ ਅਤੇ ਲਕਸ਼ਿਤ IPM ਜੈਵਿਕ ਕੰਟਰੋਲ ਪ੍ਰਾਪਤ ਕਰੋ।",
    geospatial_title: "1 ਕਿਲੋਮੀਟਰ² ਫ਼ਸਲ ਅਨੁਕੂਲਤਾ",
    geospatial_desc: "1 ਕਿਲੋਮੀਟਰ² ਮਿੱਟੀ ਅਤੇ ਮੌਸਮ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ ਅਤੇ 5 ਸਭ ਤੋਂ ਢੁਕਵੀਆਂ ਫ਼ਸਲਾਂ ਜਾਣੋ।",
    start_diagnosis: "ਨਿਦਾਨ ਸ਼ੁਰੂ ਕਰੋ →",
    inspect_pests: "ਕੀੜਿਆਂ ਦੀ ਜਾਂਚ ਕਰੋ →",
    view_1km: "1 ਕਿਲੋਮੀਟਰ² ਖੇਤਰ ਦੇਖੋ →",
        irrigation_plan_title: "ਸਮਾਰਟ ਸਿੰਚਾਈ ਯੋਜਨਾ",
    irrigation_plan_desc: "ਮੌਸਮ-ਅਧਾਰਿਤ 7-ਦਿਨਾਂ ਦਾ FAO-56 ਸਿੰਚਾਈ ਸ਼ਡਿਊਲ, ਰੋਜ਼ਾਨਾ ਫਸਲ ਪਾਣੀ ਦੀ ਮੰਗ (ETc) ਅਤੇ ਨਮੀ ਸੰਤੁਲਨ।",
    view_irrigation_btn: "ਸਿੰਚਾਈ ਯੋਜਨਾ ਵੇਖੋ →",
    produce_estimate_title: "ਮੁੱਖ ਫਸਲਾਂ ਅਤੇ ਅੰਦਾਜ਼ਨ ਉਤਪਾਦਨ",
    produce_estimate_desc: "ਆਪਣੇ ਖੇਤ ਦੀ ਸਥਿਤੀ ਅਤੇ ਮਿੱਟੀ ਦੇ ਆਧਾਰ 'ਤੇ ਪ੍ਰਤੀ ਹੈਕਟੇਅਰ ਅਤੇ 1 ਵਰਗ ਕਿਮੀ (100 ਹੈਕਟੇਅਰ) ਅੰਦਾਜ਼ਨ ਮੀਟ੍ਰਿਕ ਟਨ ਉਤਪਾਦਨ ਦੀ ਗਣਨਾ ਕਰੋ।",
    view_produce_btn: "ਉਤਪਾਦਨ ਗਿਣੋ →",
    step_upload: "1. ਪੌਦੇ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ",
    step_details: "2. ਫ਼ਸਲ ਅਤੇ ਖੇਤ ਦੇ ਵੇਰਵੇ",
    step_analyze: "3. AI ਨਿਦਾਨ ਕਰੋ",
    screen3_desc: "ਪੌਦੇ ਦੇ ਪੱਤੇ ਦੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ ਅਤੇ ਆਪਣੇ 1 ਕਿਲੋਮੀਟਰ² ਖੇਤ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ।",
    upload_title: "ਪੌਦੇ ਦੀ ਤਸਵੀਰ ਅੱਪਲੋਡ ਕਰੋ",
    upload_sub: "ਕੈਮਰੇ ਨਾਲ ਫੋਟੋ ਖਿੱਚੋ ਜਾਂ ਗੈਲਰੀ ਵਿੱਚੋਂ ਚੁਣੋ (PNG, JPG, JPEG)",
    camera_btn: "📷 ਕੈਮਰਾ",
    gallery_btn: "🖼️ ਗੈਲਰੀ",
    sample_chips_label: "ਜਾਂ ਨਮੂਨਾ ਪੱਤਾ ਚੁਣੋ:",
    crop_type_label: "ਫ਼ਸਲ ਦੀ ਕਿਸਮ *",
    growth_stage_label: "ਵਿਕਾਸ ਦਾ ਪੜਾਅ *",
    location_label: "ਤੁਹਾਡਾ ਸਥਾਨ (1 ਕਿਲੋਮੀਟਰ² ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ)",
    use_curr_loc: "🎯 ਮੌਜੂਦਾ ਸਥਾਨ ਵਰਤੋ",
    locating: "⏳ ਸਥਾਨ ਲੱਭ ਰਿਹਾ ਹੈ...",
    loc_hint: "📍 ਆਪਣੇ ਖੇਤ ਦੇ ਸਹੀ ਨਿਰਦੇਸ਼ਾਂਕ ਨੂੰ ਸਿੰਕ ਕਰੋ",
    analyze_btn: "ਪੌਦਾ ਅਤੇ 1 ਕਿਲੋਮੀਟਰ² ਖੇਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ →",
    result_title: "ਰੋਗ ਨਿਦਾਨ ਅਤੇ 1 ਕਿਲੋਮੀਟਰ² ਨਤੀਜਾ",
    screen4_desc: "AI ਰੋਗ ਨਿਦਾਨ ਪ੍ਰੋਫਾਈਲ, ਵਿਗਿਆਨਕ IPM ਉਪਾਅ ਅਤੇ 1 ਕਿਲੋਮੀਟਰ² ਜੋਖਮ ਨਕਸ਼ਾ।",
    save_report_btn: "📥 ਰਿਪੋਰਟ ਸੁਰੱਖਿਅਤ ਕਰੋ",
    severity_label: "ਗੰਭੀਰਤਾ",
    affected_area_label: "ਵਿਸ਼ਲੇਸ਼ਣ ਖੇਤਰ",
    desc_label: "ਰੋਗ ਦਾ ਵੇਰਵਾ",
    rec_actions_label: "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੇ ਕਦਮ ਅਤੇ ਵਿਗਿਆਨਕ ਉਪਾਅ",
    view_map_btn: "1 ਕਿਲੋਮੀਟਰ² ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼ਾਂ ਦੇਖੋ ↓",
    risk_map_title: "1 ਕਿਲੋਮੀਟਰ² ਜੋਖਮ ਨਕਸ਼ਾ (ਤੁਹਾਡਾ ਸਹੀ ਸਥਾਨ)",
    area_badge_text: "ਖੇਤਰਫਲ: 1.00 ਕਿਲੋਮੀਟਰ² • 100 ਹੈਕਟੇਅਰ (247.1 ਏਕੜ)",
    high_risk: "ਉੱਚ ਜੋਖਮ ਖੇਤਰ (32%)",
    mod_risk: "ਦਰਮਿਆਨਾ ਜੋਖਮ ਖੇਤਰ (45%)",
    low_risk: "ਘੱਟ ਜੋਖਮ ਖੇਤਰ (23%)",
    agro_title: "ਸੰਯੁਕਤ 1 ਕਿਲੋਮੀਟਰ² ਫ਼ਸਲ ਅਨੁਕੂਲਤਾ ਅਤੇ ਮੌਸਮ ਸਲਾਹ",
    agro_sub: "ਤੁਹਾਡੇ ਰੋਗ ਨਿਦਾਨ ਨੂੰ ਖੇਤਰੀ ਮਿੱਟੀ (SoilGrids), ਮੌਸਮ ਅਤੇ FAO-56 ਸਿੰਚਾਈ ਲੋੜਾਂ ਨਾਲ ਜੋੜਨਾ।",
    panel_crops: "🌿 ਸਭ ਤੋਂ ਅਨੁਕੂਲ ਫ਼ਸਲਾਂ (AHP ਸਕੋਰ)",
    panel_soil_weather: "🧪 1 ਕਿਲੋਮੀਟਰ² ਮਿੱਟੀ ਅਤੇ ਮਾਈਕ੍ਰੋ-ਜਲਵਾਯੂ ਪ੍ਰੋਫਾਈਲ",
    panel_irrigation: "💧 FAO-56 ਮੌਸਮ-ਅਧਾਰਤ ਸਿੰਚਾਈ",
        field_loc_label: "ਖੇਤ ਦੀ ਸਥਿਤੀ:",
    soil_class_label: "ਮਿੱਟੀ ਦਾ ਵਰਗੀਕਰਨ:",
    soil_ph_label: "ਮਿੱਟੀ pH (0-30 ਸੈਂਟੀਮੀਟਰ):",
    soil_texture_label: "ਮਿੱਟੀ ਦੀ ਬਣਤਰ:",
    temp_label: "ਤਾਪਮਾਨ:",
    elev_slope_label: "ਉਚਾਈ / ਢਲਾਣ:",
    confidence_label: "ਵਿਸ਼ਵਾਸ:",
    crop_label_prefix: "ਫ਼ਸਲ:",
    severity_high: "ਉੱਚ (High)",
    severity_mod: "ਦਰਮਿਆਨਾ (Moderate)",
    crops: {
      tomato: "ਟਮਾਟਰ (Tomato)",
      rice: "ਝੋਨਾ / ਚੌਲ (Rice)",
      wheat: "ਕਣਕ (Wheat)",
      maize: "ਮੱਕੀ (Maize)",
      cotton: "ਨਰਮਾ / ਕਪਾਹ (Cotton)",
      soybean: "ਸੋਇਆਬੀਨ (Soybean)",
      onion: "ਗੰਢਾ / ਪਿਆਜ਼ (Onion)",
      groundnut: "ਮੂੰਗਫਲੀ (Groundnut)"
    },
    stages: {
      vegetative: "ਬਨਸਪਤੀ ਵਾਧਾ (ਪੱਤਿਆਂ ਦਾ ਵਾਧਾ)",
      flowering: "ਫੁੱਲ ਪੈਣ ਦਾ ਪੜਾਅ",
      fruiting: "ਫਲ / ਦਾਣਾ ਭਰਨ ਦਾ ਪੜਾਅ",
      maturity: "ਪੱਕਣ ਅਤੇ ਕਟਾਈ ਦਾ ਪੜਾਅ"
    },
    sample_chips: {
      tomato: "🍅 ਟਮਾਟਰ ਝੁਲਸ ਰੋਗ",
      rice: "🌾 ਝੋਨਾ ਬਲਾਸਟ ਰੋਗ",
      wheat: "🌾 ਕਣਕ ਪੀਲੀ ਕੁੰਗੀ",
      maize: "🌽 ਮੱਕੀ ਪੱਤਾ ਝੁਲਸ",
      cotton: "☁️ ਕਪਾਹ ਪੱਤਾ ਮਰੋੜ",
      soybean: "🌱 ਸੋਇਆਬੀਨ ਕੁੰਗੀ ਰੋਗ",
      onion: "🧅 ਪਿਆਜ਼ ਜਾਮਣੀ ਧੱਬਾ",
      groundnut: "🥜 ਮੂੰਗਫਲੀ ਟਿੱਕਾ ਰੋਗ"
    }
  },
  or: {
    brand_sub: "ପରିଦର୍ଶନ ପୂର୍ବରୁ ଜାଣନ୍ତୁ",
    brand_tagline: "AI ଫସଲ ରୋଗ, କୀଟ ଚିହ୍ନଟ ଏବଂ ୧ ବର୍ଗ କିମି ଭୌଗୋଳିକ ଇଞ୍ଜିନ",
        hero_desc: "୧ କିମି × ୧ କିମି ଭୌଗୋଳିକ କ୍ଷେତ୍ରରେ ଉନ୍ନତ ଚାଷ ପାଇଁ AI ଚାଳିତ ରୋଗ ଏବଂ କୀଟ ବିଶ୍ଳେଷଣ।",
    select_lang: "ଭାଷା ଚୟନ କରନ୍ତୁ",
    continue_btn: "🚀 ଲାଇଭ୍ ଫାର୍ମ ଡ୍ୟାସବୋର୍ଡ ଖୋଲନ୍ତୁ →",
    choose_analysis: "ବିଶ୍ଳେଷଣ ଚୟନ କରନ୍ତୁ",
    choose_sub: "ଆପଣ ନିଜ ଜମିରେ କଣ ପରୀକ୍ଷା କରିବାକୁ ଚାହାଁନ୍ତି?",
    back_welcome: "← ସ୍ୱାଗତକୁ ଫେରନ୍ତୁ",
    back_options: "← ବିକଳ୍ପକୁ ଫେରନ୍ତୁ",
    new_scan: "← ନୂତନ ସ୍କାନ",
    disease_title: "ରୋଗ ବିଶ୍ଳେଷଣ",
    disease_desc: "ପତ୍ରର ଫଟୋରୁ ଫସଲର କବକ ଏବଂ ଜୀବାଣୁ ଜନିତ ରୋଗ AI ସଠିକତାର ସହିତ ଚିହ୍ନଟ କରନ୍ତୁ।",
    pest_title: "କୀଟ ନିରୀକ୍ଷକ (Pestegator)",
    pest_desc: "ଫସଲର କ୍ଷତିକାରକ କୀଟ ଚିହ୍ନଟ କରନ୍ତୁ ଏବଂ ଜୈବିକ ନିୟନ୍ତ୍ରଣ ପଦ୍ଧତି ଜାଣନ୍ତୁ।",
    geospatial_title: "୧ ବର୍ଗ କିମି ଫସଲ ଉପଯୋଗିତା",
    geospatial_desc: "୧ ବର୍ଗ କିମି ମାଟି ଏବଂ ପାଣିପାଗ ବିଶ୍ଳେଷଣ କରି ୫ଟି ସର୍ବାଧିକ ଉପଯୁକ୍ତ ଫସଲ ଜାଣନ୍ତୁ।",
    start_diagnosis: "ରୋଗ ନିର୍ଣ୍ଣୟ ଆରମ୍ଭ କରନ୍ତୁ →",
    inspect_pests: "କୀଟ ପରୀକ୍ଷା କରନ୍ତୁ →",
    view_1km: "୧ ବର୍ଗ କିମି ଅଞ୍ଚଳ ଦେଖନ୍ତୁ →",
        irrigation_plan_title: "ସ୍ମାର୍ଟ ଜଳସେଚନ ଯୋଜନା",
    irrigation_plan_desc: "ପାଣିପାଗ-ଭିତ୍ତିକ ୭-ଦିନର FAO-56 ଜଳସେଚନ ସମୟସାରଣୀ, ଦୈନିକ ଫସଲ ଜଳ ଚାହିଦା (ETc) ଏବଂ ଆର୍ଦ୍ରତା ପରିଚାଳନା।",
    view_irrigation_btn: "ଜଳସେଚନ ଯୋଜନା ଦେଖନ୍ତୁ →",
    produce_estimate_title: "ଉପଯୁକ୍ତ ଫସଲ ଏବଂ ଆନୁମାନିକ ଉତ୍ପାଦନ",
    produce_estimate_desc: "ଆପଣଙ୍କ ଜମିର ଅବସ୍ଥିତି ଏବଂ ମାଟି ଆଧାରରେ ହେକ୍ଟର ପ୍ରତି ଏବଂ ୧ ବର୍ଗ କିମି (୧୦୦ ହେକ୍ଟର) ଆନୁମାନିକ ମେଟ୍ରିକ ଟନ୍ ଉତ୍ପାଦନ ଗଣନା କରନ୍ତୁ।",
    view_produce_btn: "ଉତ୍ପାଦନ ଗଣନା କରନ୍ତୁ →",
    step_upload: "୧. ଗଛର ଫଟୋ ଅପଲୋଡ",
    step_details: "୨. ଫସଲ ଏବଂ ଜମିର ବିବରଣୀ",
    step_analyze: "୩. AI ନିର୍ଣ୍ଣୟ କରନ୍ତୁ",
    screen3_desc: "ପତ୍ରର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ ଏବଂ ଆପଣଙ୍କର ୧ ବର୍ଗ କିମି ଜମି ବିଶ୍ଳେଷଣ କରନ୍ତୁ।",
    upload_title: "ଗଛର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ",
    upload_sub: "କ୍ୟାମେରାରୁ ଫଟୋ ଉଠାନ୍ତୁ କିମ୍ବା ଗ୍ୟାଲେରୀରୁ ବାଛନ୍ତୁ (PNG, JPG, JPEG)",
    camera_btn: "📷 କ୍ୟାମେରା",
    gallery_btn: "🖼️ ଗ୍ୟାଲେରୀ",
    sample_chips_label: "କିମ୍ବା ନମୁନା ପତ୍ର ଚୟନ କରନ୍ତୁ:",
    crop_type_label: "ଫସଲର ପ୍ରକାର *",
    growth_stage_label: "ବୃଦ୍ଧିର ପର୍ଯ୍ୟାୟ *",
    location_label: "ଆପଣଙ୍କ ସ୍ଥାନ (୧ ବର୍ଗ କିମି ବିଶ୍ଳେଷଣ ପାଇଁ)",
    use_curr_loc: "🎯 ବର୍ତ୍ତମାନର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
    locating: "⏳ ସ୍ଥାନ ଚିହ୍ନଟ ହେଉଛି...",
    loc_hint: "📍 ଆପଣଙ୍କ ଜମିର ସଠିକ ସ୍ଥାନ ସିଙ୍କ କରନ୍ତୁ",
    analyze_btn: "ଗଛ ଏବଂ ୧ ବର୍ଗ କିମି ଅଞ୍ଚଳ ବିଶ୍ଳେଷଣ କରନ୍ତୁ →",
    result_title: "ରୋଗ ନିର୍ଣ୍ଣୟ ଏବଂ ୧ ବର୍ଗ କିମି ଫଳାଫଳ",
    screen4_desc: "AI ରୋଗ ନିର୍ଣ୍ଣୟ ପ୍ରୋଫାଇଲ, ବୈଜ୍ଞାନିକ IPM ଉପଚାର ଏବଂ ୧ ବର୍ଗ କିମି ବିପଦ ମାନଚିତ୍ର।",
    save_report_btn: "📥 ରିପୋର୍ଟ ସଂରକ୍ଷଣ କରନ୍ତୁ",
    severity_label: "ତୀବ୍ରତା",
    affected_area_label: "ବିଶ୍ଳେଷଣ ଅଞ୍ଚଳ",
    desc_label: "ରୋଗ ବିବରଣୀ",
    rec_actions_label: "ପରାମର୍ଶିତ ପଦକ୍ଷେପ ଏବଂ ବୈଜ୍ଞାନିକ ଉପଚାର",
    view_map_btn: "୧ ବର୍ଗ କିମି ଫସଲ ସୁପାରିଶ ଦେଖନ୍ତୁ ↓",
    risk_map_title: "୧ ବର୍ଗ କିମି ବିପଦ ମାନଚିତ୍ର (ଆପଣଙ୍କ ସଠିକ ସ୍ଥାନ)",
    area_badge_text: "କ୍ଷେତ୍ରଫଳ: ୧.୦୦ ବର୍ଗ କିମି • ୧୦୦ ହେକ୍ଟର (୨୪୭.୧ ଏକର)",
    high_risk: "ଉଚ୍ଚ ବିପଦ ଅଞ୍ଚଳ (୩୨%)",
    mod_risk: "ମଧ୍ୟମ ବିପଦ ଅଞ୍ଚଳ (୪୫%)",
    low_risk: "କମ ବିପଦ ଅଞ୍ଚଳ (୨୩%)",
    agro_title: "ସମନ୍ୱିତ ୧ ବର୍ଗ କିମି ଫସଲ ଉପଯୋଗିତା ଏବଂ ପାଣିପାଗ ପରାମର୍ଶ",
    agro_sub: "ରୋଗ ନିର୍ଣ୍ଣୟକୁ ଆଞ୍ଚଳିକ ମାଟି (SoilGrids), ପାଣିପାଗ ଏବଂ FAO-56 ଜଳସେଚନ ଆବଶ୍ୟକତା ସହିତ ଯୋଡିବା।",
    panel_crops: "🌿 ସର୍ବୋତ୍ତମ ଉପଯୁକ୍ତ ଫସଲ (AHP ସ୍କୋର)",
    panel_soil_weather: "🧪 ୧ ବର୍ଗ କିମି ମାଟି ଏବଂ ପାଣିପାଗ ପ୍ରୋଫାଇଲ",
    panel_irrigation: "💧 FAO-56 ପାଣିପାଗ-ଆଧାରିତ ଜଳସେଚନ",
        field_loc_label: "ଜମିର ଅବସ୍ଥିତି:",
    soil_class_label: "ମାଟିର ଶ୍ରେଣୀବିଭାଗ:",
    soil_ph_label: "ମାଟିର pH (୦-୩୦ ସେମି):",
    soil_texture_label: "ମାଟିର ଗଠନ:",
    temp_label: "ତାପମାତ୍ରା:",
    elev_slope_label: "ଉଚ୍ଚତା / ଢାଳୁ:",
    confidence_label: "ବିଶ୍ୱାସନୀୟତା:",
    crop_label_prefix: "ଫସଲ:",
    severity_high: "ଉଚ୍ଚ (High)",
    severity_mod: "ମଧ୍ୟମ (Moderate)",
    crops: {
      tomato: "ଟମାଟୋ (Tomato)",
      rice: "ଧାନ / ଚାଉଳ (Rice)",
      wheat: "ଗହମ (Wheat)",
      maize: "ମକା (Maize)",
      cotton: "କପା (Cotton)",
      soybean: "ସୋୟାବିନ (Soybean)",
      onion: "ପିଆଜ (Onion)",
      groundnut: "ଚିନାବାଦାମ (Groundnut)"
    },
    stages: {
      vegetative: "ଅଙ୍ଗଜ ବୃଦ୍ଧି (ପତ୍ର ବୃଦ୍ଧି)",
      flowering: "ଫୁଲ ଫୁଟିବା ପର୍ଯ୍ୟାୟ",
      fruiting: "ଫଳ / ଦାନା ଭରିବା ପର୍ଯ୍ୟାୟ",
      maturity: "ପାଚିବା ଏବଂ ଅମଳ ପର୍ଯ୍ୟାୟ"
    },
    sample_chips: {
      tomato: "🍅 ଟମାଟୋ ଆଗୁଆ ଝାଉଁଳା",
      rice: "🌾 ଧାନ ବ୍ଲାଷ୍ଟ ରୋଗ",
      wheat: "🌾 ଗହମ ହଳଦିଆ କଳଙ୍କ",
      maize: "🌽 ମକା ପତ୍ର ଝାଉଁଳା",
      cotton: "☁️ କପା ପତ୍ର କୁଞ୍ଚନ",
      soybean: "🌱 ସୋୟାବିନ କଳଙ୍କ ରୋଗ",
      onion: "🧅 ପିଆଜ ବାଇଗଣୀ ଦାଗ",
      groundnut: "🥜 ଚିନାବାଦାମ ଟିକ୍କା ରୋଗ"
    }
  }
};

const MULTILINGUAL_DISEASE_DATA = {
  tomato: {
    image: "https://images.unsplash.com/photo-1592417817098-8f3d6910985c?auto=format&fit=crop&w=600&q=80",
    confidence: 94,
    en: {
      crop: "Tomato",
      disease: "Early Blight",
      pathogen: "Alternaria solani (Fungal)",
      severity: "High",
      description: "Early blight is a fungal disease that causes brown spots with concentric target-board rings on leaves, leading to chlorosis, early defoliation, and reduced fruit yield.",
      actions: [
        "Remove and destroy infected lower leaves immediately to reduce fungal spore load.",
        "Spray recommended protective fungicide: Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L.",
        "Maintain 60cm × 45cm plant spacing to promote airflow and rapid canopy drying.",
        "Avoid overhead sprinkler irrigation; strictly use drip irrigation to keep foliage dry."
      ]
    },
    hi: {
      crop: "टमाटर (Tomato)",
      disease: "अगेती झुलसा (Early Blight)",
      pathogen: "Alternaria solani (कवक)",
      severity: "उच्च (High)",
      description: "अगेती झुलसा एक गंभीर फफूंद जनित रोग है। पत्तियों पर भूरे-काले संकेंद्री छल्लेदार (Target-board) धब्बे बनते हैं, जिससे पत्तियां पीली पड़कर झड़ने लगती हैं और उपज में भारी गिरावट आती है।",
      actions: [
        "रोगग्रस्त निचली पत्तियों को तुरंत तोड़कर खेत से दूर नष्ट करें ताकि बीजाणु न फैलें।",
        "अनुशंसित सुरक्षात्मक कवकनाशी: मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर या एज़ोक्सीस्ट्रोबिन + डाइफेनोकोनाज़ोल @ 1 मिली/लीटर का छिड़काव करें।",
        "पौधों के बीच 60 सेमी × 45 सेमी की उचित दूरी रखें जिससे हवा और धूप का आवागमन बना रहे।",
        "फव्वारा सिंचाई से बचें; केवल ड्रिप (टपक) सिंचाई का उपयोग करें ताकि पत्तियां सूखी रहें।"
      ]
    },
    kn: {
      crop: "ಟೊಮೆಟೊ (Tomato)",
      disease: "ಮುಂಚಿನ ಅಂಗಮಾರಿ ರೋಗ (Early Blight)",
      pathogen: "Alternaria solani (ಶಿಲೀಂಧ್ರ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಇದು ಅಪಾಯಕಾರಿ ಶಿಲೀಂಧ್ರ ರೋಗವಾಗಿದ್ದು, ಎಲೆಗಳ ಮೇಲೆ ಕಂದು-ಕಪ್ಪು ಸಾಂದ್ರ ಉಂಗುರದಂತಹ (Target-board) ಕಲೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ. ಎಲೆಗಳು ಹಳದಿಯಾಗಿ ಉದುರಿ ಇಳುವರಿ ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
      actions: [
        "ರೋಗಪೀಡಿತ ಕೆಳಗಿನ ಎಲೆಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಜಮೀನಿನಿಂದ ದೂರ ನಾಶಪಡಿಸಿ.",
        "ಶಿಫಾರಸು ಮಾಡಿದ ಶಿಲೀಂಧ್ರನಾಶಕ: ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಅಥವಾ ಅಜಾಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ + ಡೈಫೆನೊಕೊನಾಜೋಲ್ @ 1 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಸಾಕಷ್ಟು ಗಾಳಿ ಮತ್ತು ಬೆಳಕಿಗಾಗಿ ಸಸ್ಯಗಳ ನಡುವೆ 60 ಸೆಂ.ಮೀ × 45 ಸೆಂ.ಮೀ ಅಂತರವನ್ನು ಕಾಪಾಡಿಕೊಳ್ಳಿ.",
        "ಮೇಲ್ಮೈ ಚಿಮುಕಿಸುವ ನೀರಾವರಿ ತಪ್ಪಿಸಿ; ಎಲೆಗಳನ್ನು ಒಣಗಿಸಲು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಹನಿ ನೀರಾವರಿ ಬಳಸಿ."
      ]
    },
    te: {
      crop: "టమోటా (Tomato)",
      disease: "ముందస్తు ఆకుమచ్చ తెగులు (Early Blight)",
      pathogen: "Alternaria solani (శిలీంధ్రం)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకులపై గుండ్రని ముదురు గోధుమ రంగు వలయాల వంటి మచ్చలు ఏర్పడి ఆకులు ఎండి రాలిపోతాయి మరియు దిగుబడి తగ్గుతుంది.",
      actions: [
        "వ్యాధి సోకిన కింది ఆకులను వెంటనే తొలగించి నాశనం చేయండి.",
        "మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీ లేదా డైఫెనోకోనజోల్ @ 1 మి.లీ/లీ స్ప్రే చేయండి.",
        "మొక్కల మధ్య 60 సెం.మీ × 45 సెం.మీ దూరం పాటించండి.",
        "స్ప్రింక్లర్ నీటిపారుదల నివారించి డ్రిప్ మాత్రమే వాడండి."
      ]
    },
    ta: {
      crop: "தக்காளி (Tomato)",
      disease: "முன் பருவ கருகல் நோய் (Early Blight)",
      pathogen: "Alternaria solani (பூஞ்சை)",
      severity: "அதிகம் (High)",
      description: "இலைகளில் வட்ட வடிவ பழுப்பு நிற வளைய புள்ளிகள் தோன்றி இலைகள் உதிர்ந்து காய் உற்பத்தி குறைகிறது.",
      actions: [
        "பாதிக்கப்பட்ட கீழ் இலைகளை உடனே அகற்றி அழிக்கவும்.",
        "மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் அல்லது டைபனோகோனசோல் @ 1 மி.லி/லிட்டர் தெளிக்கவும்.",
        "செடிகளுக்கு இடையே 60 செ.மீ × 45 செ.மீ இடைவெளி பராமரிக்கவும்.",
        "சொட்டு நீர் பாசனத்தை மட்டுமே பயன்படுத்தவும்."
      ]
    },
    mr: {
      crop: "टोमॅटो (Tomato)",
      disease: "लवकर येणारा करपा (Early Blight)",
      pathogen: "Alternaria solani (बुरशी)",
      severity: "उच्च (High)",
      description: "हा एक घातक बुरशीजन्य रोग असून पानांवर गोलाकार वलय असलेले तपकिरी-काळे ठिपके पडतात. यामुळे पाने पिवळी पडून गळतात आणि झाडाची वाढ खुंटून उत्पादनात मोठी घट होते.",
      actions: [
        "रोगट खालची पाने ताबडतोब खुडून शेताबाहेर नेऊन नष्ट करा जेणेकरून बुरशीचे बीजाणू पसरणार नाहीत.",
        "शिफारस केलेले बुरशीनाशक: मॅन्कोझेब 75% WP @ 2.5 ग्रॅम/लिटर किंवा ॲझोक्सीस्ट्रोबिन + डायफेनोकोनॅझोल @ 1 मिली/लिटर फवारा.",
        "हवा खेळती राहण्यासाठी रोपांमध्ये 60 सेमी × 45 सेमी योग्य अंतर ठेवा.",
        "तुषार सिंचन टाळा; पानांवर ओलावा साचू नये म्हणून केवळ ठिबक सिंचनाचा वापर करा."
      ]
    },
    gu: {
      crop: "ટામેટાં (Tomato)",
      disease: "અગેતી સુકારો (Early Blight)",
      pathogen: "Alternaria solani (ફૂગ)",
      severity: "ઉચ્ચ (High)",
      description: "પાન પર કથ્થઈ રંગના કેન્દ્રિત વલયાકાર ગોળ ટપકાં પડે છે અને પાન સુકાઈને ખરી પડે છે.",
      actions: [
        "રોગગ્રસ્ત પાંદડાં તોડીને ખેતર બહાર નાશ કરો.",
        "મેન્કોઝેબ 75% WP @ 2.5 ગ્રામ/લીટર અથવા ડાયફેનોકોનાઝોલ @ 1 મિલી/લીટર છાંટો.",
        "છોડ વચ્ચે યોગ્ય અંતર જાળવો.",
        "ટપક પદ્ધતિથી જ પિયત આપો."
      ]
    },
    bn: {
      crop: "টমেটো (Tomato)",
      disease: "আগেতি ধসা রোগ (Early Blight)",
      pathogen: "Alternaria solani (ছত্রাক)",
      severity: "উচ্চ (High)",
      description: "পাতায় বাদামী রঙের বলয়াকৃতির দাগ পড়ে, পাতা শুকিয়ে ঝরে যায় এবং ফলন ক্ষতিগ্রস্ত হয়।",
      actions: [
        "আক্রান্ত পাতাগুলি তুলে পুড়িয়ে ফেলুন।",
        "ম্যানকোজেব ৭৫% ডব্লিউপি @ ২.৫ গ্রাম/লিটার জলে গুলে স্প্রে করুন।",
        "গাছের মাঝে ৬০ সেমি × ৪৫ সেমি ফাঁকা রাখুন।",
        "ড্রিপ সেচ ব্যবহার করুন, উপরিভাগে জল ছেটাবেন না।"
      ]
    },
    ml: {
      crop: "തക്കാളി (Tomato)",
      disease: "ഏർലി ബ്ലൈറ്റ് (Early Blight)",
      pathogen: "Alternaria solani (കുമിൾ)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകളിൽ കേന്ദ്രീകൃത വളയങ്ങളോടുകൂടിയ തവിട്ടുനിറത്തിലുള്ള പാടുകൾ പ്രത്യക്ഷപ്പെട്ട് ഇലകൾ കൊഴിയുന്നു.",
      actions: [
        "ബാധിച്ച ഇലകൾ പറിച്ചു നശിപ്പിക്കുക.",
        "മാങ്കോസെബ് 75% WP @ 2.5 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "ചെടികൾ തമ്മിൽ 60 × 45 സെ.മീ അകലം പാലിക്കുക.",
        "തുള്ളിനന മാത്രം നൽകുക."
      ]
    },
    pa: {
      crop: "ਟਮਾਟਰ (Tomato)",
      disease: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ (Early Blight)",
      pathogen: "Alternaria solani (ਉੱਲੀ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਗੋਲ ਚੱਕਰਦਾਰ ਭੂਰੇ ਧੱਬੇ ਬਣਦੇ ਹਨ ਜਿਸ ਨਾਲ ਪੱਤੇ ਸੁੱਕ ਕੇ ਝੜ ਜਾਂਦੇ ਹਨ।",
      actions: [
        "ਬਿਮਾਰੀ ਵਾਲੇ ਪੱਤਿਆਂ ਨੂੰ ਤੋੜ ਕੇ ਖੇਤ ਤੋਂ ਦੂਰ ਨਸ਼ਟ ਕਰੋ।",
        "ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ/ਲਿਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।",
        "ਬੂਟਿਆਂ ਵਿੱਚ 60 ਸੈ.ਮੀ × 45 ਸੈ.ਮੀ ਦੀ ਵਿੱਥ ਰੱਖੋ।",
        "ਫੁਹਾਰਾ ਸਿੰਚਾਈ ਨਾ ਕਰੋ, ਸਿਰਫ਼ ਤੁਪਕਾ ਸਿੰਚਾਈ ਵਰਤੋ।"
      ]
    },
    or: {
      crop: "ଟମାଟୋ (Tomato)",
      disease: "ଆଗୁଆ ଝାଉଁଳା ରୋଗ (Early Blight)",
      pathogen: "Alternaria solani (କବକ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ର ଉପରେ ଗୋଲାକାର ମାଟିଆ ରଙ୍ଗର ଦାଗ ସୃଷ୍ଟି ହୋଇ ପତ୍ର ଝଡ଼ିଯାଏ ଏବଂ ଫସଲ ନଷ୍ଟ ହୁଏ।",
      actions: [
        "ରୋଗାକ୍ରାନ୍ତ ପତ୍ରଗୁଡ଼ିକୁ ତୁରନ୍ତ ଛିଣ୍ଡାଇ ନଷ୍ଟ କରନ୍ତୁ।",
        "ମାଙ୍କୋଜେବ୍ ୭୫% WP @ ୨.୫ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଗଛ ମଧ୍ୟରେ ୬୦ ସେମି × ୪୫ ସେମି ବ୍ୟବଧାନ ରଖନ୍ତୁ।",
        "କେବଳ ଡ୍ରିପ୍ ଜଳସେଚନ ବ୍ୟବହାର କରନ୍ତୁ।"
      ]
    }
  },
  rice: {
    image: "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=600&q=80",
    confidence: 93,
    en: {
      crop: "Rice (Paddy)",
      disease: "Rice Blast Disease",
      pathogen: "Magnaporthe oryzae (Fungal)",
      severity: "High",
      description: "Rice blast causes spindle-shaped diamond lesions with grey-white centers and brown margins on leaf blades and neck nodes, causing severe grain sterility.",
      actions: [
        "Apply Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L at first appearance of leaf lesions.",
        "Avoid excessive top-dressing of urea nitrogen; split nitrogen into 3 equal applications.",
        "Maintain 2-3 cm shallow water layer rather than continuous deep submersion.",
        "Burn or compost infected stubble post-harvest to prevent spore carryover."
      ]
    },
    hi: {
      crop: "धान / चावल (Rice)",
      disease: "धान का झोंका रोग (Rice Blast)",
      pathogen: "Magnaporthe oryzae (कवक)",
      severity: "उच्च (High)",
      description: "धान का ब्लास्ट रोग पत्तियों पर आंख या नाव के आकार के धब्बे बनाता है, जिनका केंद्र धूसर और किनारे भूरे होते हैं। इससे बाली का आधार सड़ जाता है और दाने नहीं बनते।",
      actions: [
        "पत्तियों पर लक्षण दिखते ही ट्राइसाइक्लाजोल 75% WP @ 0.6 ग्राम/लीटर या आइसोप्रोपियोलेन 40% EC @ 1.5 मिली/लीटर का छिड़काव करें।",
        "यूरिया की अत्यधिक खुराक से बचें; नाइट्रोजन को 3 बराबर भागों में बांटकर दें।",
        "खेत में लगातार गहरा पानी न भरें; 2-3 सेमी उथला पानी रखें।",
        "कटाई के बाद संक्रमित ठूंठों को नष्ट करें।"
      ]
    },
    kn: {
      crop: "ಭತ್ತ (Rice)",
      disease: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ / ಬ್ಲಾಸ್ಟ್",
      pathogen: "Magnaporthe oryzae (ಶಿಲೀಂಧ್ರ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ ಬೂದು ಬಣ್ಣದ ಕಲೆಗಳು ಮತ್ತು ಕಂದು ಅಂಚುಗಳು ಉಂಟಾಗುತ್ತವೆ. ಕುತ್ತಿಗೆ ಕೊಳೆತ ಉಂಟಾಗಿ ಧಾನ್ಯಗಳು ಜೊಳ್ಳಾಗುತ್ತವೆ.",
      actions: [
        "ಲಕ್ಷಣ ಕಂಡ ತಕ್ಷಣ ಟ್ರೈಸೈಕ್ಲಾಜೋಲ್ 75% WP @ 0.6 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಹೆಚ್ಚು ಯೂರಿಯಾ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ; ಸಾರಜನಕವನ್ನು 3 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
        "ನಿರಂತರ ಆಳವಾದ ನೀರು ನಿಲ್ಲಿಸಬೇಡಿ; 2-3 ಸೆಂ.ಮೀ ಆಳ ಸಾಕು.",
        "ಕೊಯ್ಲಿನ ನಂತರ ರೋಗಗ್ರಸ್ತ ಕೂಳೆಯನ್ನು ನಾಶಪಡಿಸಿ."
      ]
    },
    te: {
      crop: "వరి (Rice)",
      disease: "వరి అగ్గి తెగులు (Rice Blast)",
      pathogen: "Magnaporthe oryzae (శిలీంధ్రం)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకులపై నూలుకండె ఆకారంలో బూడిద రంగు కేంద్రం మరియు గోధుమ రంగు అంచులు గల మచ్చలు ఏర్పడతాయి.",
      actions: [
        "ట్రైసైక్లాజోల్ 75% WP @ 0.6 గ్రా/లీ లేదా ఐసోప్రోథియోలేన్ @ 1.5 మి.లీ/లీ పిచికారీ చేయండి.",
        "యూరియా అధికంగా వాడవద్దు; నత్రజనిని విడతల వారీగా అందించండి.",
        "పొలంలో 2-3 సెం.మీ తక్కువ నీటి మట్టాన్ని ఉంచండి.",
        "కోత తర్వాత మోడులను కాల్చండి లేదా దున్నేయండి."
      ]
    },
    ta: {
      crop: "நெல் (Rice)",
      disease: "நெல் குலை நோய் (Rice Blast)",
      pathogen: "Magnaporthe oryzae (பூஞ்சை)",
      severity: "அதிகம் (High)",
      description: "இலைகளில் கண் போன்ற வடிவத்தில் சாம்பல் நிற மையமும் பழுப்பு நிற விளிம்பும் கொண்ட புள்ளிகள் உருவாகும்.",
      actions: [
        "ட்ரைசைக்ளசோல் 75% WP @ 0.6 கிராம்/லிட்டர் தெளிக்கவும்.",
        "அதிகப்படியான யூரியாவைத் தவிர்க்கவும்; தழைச்சத்தை பிரித்து இடவும்.",
        "வயலில் 2-3 செ.மீ குறைவான நீர் மட்டத்தை பராமரிக்கவும்.",
        "அறுவடைக்கு பின் தாளடிகளை அழிக்கவும்."
      ]
    },
    mr: {
      crop: "भात (Rice)",
      disease: "भातावरील करपा / ब्लास्ट",
      pathogen: "Magnaporthe oryzae (बुरशी)",
      severity: "उच्च (High)",
      description: "पानांवर डोळ्याच्या आकाराचे करड्या रंगाचे ठिपके पडतात. लोंबीच्या मानेवर प्रादुर्भाव झाल्यास दाणे भरत नाहीत व लोंब्या पांढऱ्या पडतात.",
      actions: [
        "लक्षणे दिसताच ट्रायसायक्लॅझोल 75% WP @ 0.6 ग्रॅम/लिटर फवारा.",
        "युरियाचा अतिवापर टाळा; नत्र खताचे हप्ते पाडून द्या.",
        "शेतात सतत पाणी साचू न देता नियंत्रित पाणी ठेवा.",
        "काढणीनंतर पिकाचे अवशेष नष्ट करा."
      ]
    },
    gu: {
      crop: "ડાંગર (Rice)",
      disease: "ડાંગરનો કરપો / બ્લાસ્ટ",
      pathogen: "Magnaporthe oryzae (ફૂગ)",
      severity: "ઉચ્ચ (High)",
      description: "પાન પર ત્રાક આકારના વચ્ચેથી રાખોડી અને કિનારીએ કથ્થઈ રંગના ડાઘ પડે છે.",
      actions: [
        "ટ્રાયસાઇક્લાઝોલ 75% WP @ 0.6 ગ્રામ/લીટર છાંટો.",
        "યુરિયાનો વધુ પડતો ઉપયોગ ટાળો.",
        "ખેતરમાં 2-3 સેમી છીછરું પાણી જાળવો.",
        "કાપણી પછી જમીન ઊંડી ખેડો."
      ]
    },
    bn: {
      crop: "ধান (Rice)",
      disease: "ধানের ব্লাস্ট রোগ (Rice Blast)",
      pathogen: "Magnaporthe oryzae (ছত্রাক)",
      severity: "উচ্চ (High)",
      description: "পাতায় চোখের মতো বা নৌকাকৃতির বাদামী দাগ পড়ে এবং ধানের শিষ চিটা হয়ে যায়।",
      actions: [
        "ট্রাইসাইক্লাজোল ৭৫% ডব্লিউপি @ ০.৬ গ্রাম/লিটার স্প্রে করুন।",
        "অতিরিক্ত ইউরিয়া সার প্রয়োগ করবেন না।",
        "জমিতে ২-৩ সেমি নিয়ন্ত্রিত জল রাখুন।",
        "ফসল কাটার পর নাড়া পুড়িয়ে দিন।"
      ]
    },
    ml: {
      crop: "നെല്ല് (Rice)",
      disease: "നെല്ലിലെ ബ്ലാസ്റ്റ് രോഗം (Rice Blast)",
      pathogen: "Magnaporthe oryzae (കുമിൾ)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകളിൽ കണ്ണ് ആകൃതിയിലുള്ള തവിട്ടുപാടുകൾ രൂപപ്പെടുകയും ധാന്യങ്ങൾ പതിരാവുകയും ചെയ്യുന്നു.",
      actions: [
        "ട്രൈസൈക്ലാസോൾ 75% WP @ 0.6 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "യൂറിയയുടെ അളവ് നിയന്ത്രിക്കുക.",
        "2-3 സെ.മീ ആഴത്തിൽ മാത്രം വെള്ളം നിർത്തുക.",
        "കൊയ്ത്തിന് ശേഷം വൈക്കോൽ അവശിഷ്ടങ്ങൾ നശിപ്പിക്കുക."
      ]
    },
    pa: {
      crop: "ਝੋਨਾ (Rice)",
      disease: "ਝੋਨੇ ਦਾ ਝੁਲਸ ਰੋਗ / ਬਲਾਸਟ",
      pathogen: "Magnaporthe oryzae (ਉੱਲੀ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਤੱਕੜੀ ਵਰਗੇ ਭੂਰੇ ਕਿਨਾਰਿਆਂ ਵਾਲੇ ਧੱਬੇ ਬਣਦੇ ਹਨ ਅਤੇ ਮੁੰਜਰਾਂ ਚਿੱਟੀਆਂ ਪੈ ਜਾਂਦੀਆਂ ਹਨ।",
      actions: [
        "ਟ੍ਰਾਈਸਾਈਕਲਾਜ਼ੋਲ 75% WP @ 0.6 ਗ੍ਰਾਮ/ਲਿਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।",
        "ਯੂਰੀਆ ਦੀ ਜ਼ਿਆਦਾ ਵਰਤੋਂ ਤੋਂ ਬਚੋ।",
        "ਖੇਤ ਵਿੱਚ 2-3 ਸੈ.ਮੀ ਪਾਣੀ ਰੱਖੋ।",
        "ਕਟਾਈ ਉਪਰੰਤ ਮੁੱਢਾਂ ਨੂੰ ਨਸ਼ਟ ਕਰੋ।"
      ]
    },
    or: {
      crop: "ଧାନ (Rice)",
      disease: "ଧାନ ବ୍ଲାଷ୍ଟ ରୋଗ (Rice Blast)",
      pathogen: "Magnaporthe oryzae (କବକ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ରରେ ଆଖି ଆକୃତିର ମାଟିଆ ଦାଗ ହୁଏ ଏବଂ କେଣ୍ଡା ଶୁଖି ଅଗାଡ଼ି ହୋଇଯାଏ।",
      actions: [
        "ଟ୍ରାଇସାଇକ୍ଲାଜୋଲ୍ ୭୫% WP @ ୦.୬ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଅଧିକ ୟୁରିଆ ପ୍ରୟୋଗ କରନ୍ତୁ ନାହିଁ।",
        "ଜମିରେ ୨-୩ ସେମି ପାଣି ରଖନ୍ତୁ।",
        "ଅମଳ ପରେ ନଡ଼ା କୁଟା ନଷ୍ଟ କରନ୍ତୁ।"
      ]
    }
  },
  wheat: {
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80",
    confidence: 93,
    en: {
      crop: "Wheat",
      disease: "Stripe / Yellow Rust",
      pathogen: "Puccinia striiformis (Fungal)",
      severity: "High",
      description: "Yellow-orange powdery pustules arranged in characteristic narrow parallel stripes along leaf veins, reducing grain filling and test weight.",
      actions: [
        "Spray Propiconazole 25% EC (Tilt) @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L upon seeing initial pustules.",
        "Avoid excess nitrogen fertilizer during boot and heading stages.",
        "Monitor canopy humidity and irrigate in early morning to prevent night dew stagnation.",
        "Plant rust-resistant cultivars in subsequent rabi season."
      ]
    },
    hi: {
      crop: "गेहूं (Wheat)",
      disease: "पीला रतुआ (Yellow Rust)",
      pathogen: "Puccinia striiformis (कवक)",
      severity: "उच्च (High)",
      description: "पत्तियों की नसों के समानांतर पीले-नारंगी पाउडर जैसी धारियां बन जाती हैं। छूने पर हाथ में हल्दी जैसा पीला पाउडर लगता है और दाने पतले रह जाते हैं।",
      actions: [
        "लक्षण दिखते ही प्रोपिकोनाज़ोल 25% EC (टिल्ट) @ 1 मिली/लीटर या टेबुकोनाज़ोल @ 1 मिली/लीटर का छिड़काव करें।",
        "बालियां निकलते समय अत्यधिक नाइट्रोजन (यूरिया) न दें।",
        "खेत में सुबह के समय सिंचाई करें ताकि रात में पत्तियों पर ओस न जमे।",
        "प्रतिरोधी किस्मों की बुवाई करें।"
      ]
    },
    kn: {
      crop: "ಗೋಧಿ (Wheat)",
      disease: "ಹಳದಿ ತುಕ್ಕು ರೋಗ (Yellow Rust)",
      pathogen: "Puccinia striiformis (ಶಿಲೀಂಧ್ರ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಎಲೆಗಳ ಮೇಲೆ ಹಳದಿ-ಕಿತ್ತಳೆ ಪುಡಿಯ ಗೆರೆಗಳು ಮೂಡುತ್ತವೆ. ಕೈಯಿಂದ ಮುಟ್ಟಿದರೆ ಅರಿಶಿನದಂತಹ ಪುಡಿ ಅಂಟಿಕೊಳ್ಳುತ್ತದೆ.",
      actions: [
        "ಪ್ರೊಪಿಕೊನಾಜೋಲ್ 25% EC @ 1 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಹೆಚ್ಚಿನ ಸಾರಜನಕ ರಸಗೊಬ್ಬರ ಹಾಕಬೇಡಿ.",
        "ಮುಂಜಾನೆ ನೀರಾವರಿ ಮಾಡಿ.",
        "ತುಕ್ಕು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ."
      ]
    },
    te: {
      crop: "గోధుమ (Wheat)",
      disease: "పసుపు కుంకుమ తెగులు (Yellow Rust)",
      pathogen: "Puccinia striiformis (శిలీంధ్రం)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకులపై పసుపు-నారింజ రంగు పొడి వంటి చారలు ఏర్పడతాయి. గింజలు సరిగా పాలు పోసుకోవు.",
      actions: [
        "ప్రొపికోనాజోల్ 25% EC @ 1 మి.లీ/లీ స్ప్రే చేయండి.",
        "అధిక నత్రజని ఎరువులు వేయకండి.",
        "ఉదయాన్నే నీరు పెట్టండి.",
        "తెగులు తట్టుకునే రకాలను నాటండి."
      ]
    },
    ta: {
      crop: "கோதுமை (Wheat)",
      disease: "மஞ்சள் துரு நோய் (Yellow Rust)",
      pathogen: "Puccinia striiformis (பூஞ்சை)",
      severity: "அதிகம் (High)",
      description: "இலை நரம்புகளுக்கு இணையாக மஞ்சள்-ஆரஞ்சு நிற பொடி போன்ற கோடுகள் தோன்றும்.",
      actions: [
        "புரோபிகோனசோல் 25% EC @ 1 மி.லி/லிட்டர் தெளிக்கவும்.",
        "அதிகப்படியான தழைச்சத்தை தவிர்க்கவும்.",
        "அதிகாலை வேளையில் பாசனம் செய்யவும்.",
        "எதிர்ப்புத் திறன் கொண்ட ரகங்களை பயிரிடவும்."
      ]
    },
    mr: {
      crop: "गहू (Wheat)",
      disease: "पिवळा तांबेरा (Yellow Rust)",
      pathogen: "Puccinia striiformis (बुरशी)",
      severity: "उच्च (High)",
      description: "पानांवर पिवळ्या-केशरी रंगाच्या पावडरसारख्या लांबट पट्ट्या दिसतात. हाताला हळदीसारखा रंग लागतो व दाणे बारीक राहतात.",
      actions: [
        "प्रोपीकोनाझोल 25% EC @ 1 मिली/लिटर फवारा.",
        "नत्राचा अतिवापर टाळा.",
        "सकाळी पाणी द्या जेणेकरून पानांवर दव साचणार नाही.",
        "तांबेरा प्रतिकारक वाण पेरा."
      ]
    },
    gu: {
      crop: "ઘઉં (Wheat)",
      disease: "પીળો ગેરુ (Yellow Rust)",
      pathogen: "Puccinia striiformis (ફૂગ)",
      severity: "ઉચ્ચ (High)",
      description: "પાન પર નસોની સમાંતર પીળા-નારંગી પાવડરની પટ્ટીઓ બને છે અને દાણા પાતળા રહે છે.",
      actions: [
        "પ્રોપિકોનાઝોલ 25% EC @ 1 મિલી/લીટર છાંટો.",
        "વધારે નાઇટ્રોજન ન આપો.",
        "સવારના સમયે પિયત આપો.",
        "ગેરુ પ્રતિરોધક જાતો વાવો."
      ]
    },
    bn: {
      crop: "গম (Wheat)",
      disease: "হলদে মরিচা রোগ (Yellow Rust)",
      pathogen: "Puccinia striiformis (ছত্রাক)",
      severity: "উচ্চ (High)",
      description: "পাতায় সমান্তরালভাবে হলুদ গুঁড়োর মতো দাগ পড়ে এবং গমের দানা অপুষ্ট থেকে যায়।",
      actions: [
        "প্রোপিকোনাজল ২৫% ইসি @ ১ মিলি/লিটার স্প্রে করুন।",
        "অতিরিক্ত ইউরিয়া সার দেবেন না।",
        "ভোরের দিকে সেচ দিন।",
        "মরিচা প্রতিরোধী জাত চাষ করুন।"
      ]
    },
    ml: {
      crop: "ഗോതമ്പ് (Wheat)",
      disease: "മഞ്ഞ തുരുമ്പ് രോഗം (Yellow Rust)",
      pathogen: "Puccinia striiformis (കുമിൾ)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകളിൽ മഞ്ഞ-ഓറഞ്ച് പൊടി വരകൾ കാണപ്പെടുന്നു. ധാന്യങ്ങളുടെ തൂക്കം കുറയുന്നു.",
      actions: [
        "പ്രൊപ്പിക്കൊണസോൾ 25% EC @ 1 മില്ലി/ലിറ്റർ തളിക്കുക.",
        "നൈട്രജൻ വളം അധികം നൽകരുത്.",
        "രാവിലെ നനയ്ക്കുക.",
        "പ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ തിരഞ്ഞെടുക്കുക."
      ]
    },
    pa: {
      crop: "ਕਣਕ (Wheat)",
      disease: "ਪੀਲੀ ਕੁੰਗੀ (Yellow Rust)",
      pathogen: "Puccinia striiformis (ਉੱਲੀ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਹਲਦੀ ਵਰਗੀਆਂ ਪੀਲੀਆਂ ਲੰਮੀਆਂ ਧਾਰੀਆਂ ਬਣ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਦਾਣੇ ਪਤਲੇ ਰਹਿ ਜਾਂਦੇ ਹਨ।",
      actions: [
        "ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ 25% EC (ਟਿਲਟ) @ 1 ਮਿਲੀ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਨਾਈਟ੍ਰੋਜਨ ਦੀ ਲੋੜ ਤੋਂ ਵੱਧ ਵਰਤੋਂ ਨਾ ਕਰੋ।",
        "ਸਵੇਰ ਵੇਲੇ ਪਾਣੀ ਲਗਾਓ।",
        "ਕੁੰਗੀ ਰੋਧਕ ਕਿਸਮਾਂ ਹੀ ਬੀਜੋ।"
      ]
    },
    or: {
      crop: "ଗହମ (Wheat)",
      disease: "ହଳଦିଆ କଳଙ୍କ ରୋଗ (Yellow Rust)",
      pathogen: "Puccinia striiformis (କବକ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ର ଶିରା ସହିତ ହଳଦିଆ ପାଉଡର ଗାର ପଡ଼ିଯାଏ ଏବଂ ଗହମ ଦାନା ପତଳା ହୋଇଯାଏ।",
      actions: [
        "ପ୍ରୋପିକୋନାଜୋଲ୍ ୨୫% EC @ ୧ ମିଲି/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଅଧିକ ଯବକ୍ଷାରଜାନ ଦିଅନ୍ତୁ ନାହିଁ।",
        "ସକାଳେ ଜଳସେଚନ କରନ୍ତୁ।",
        "ରୋଗ ପ୍ରତିରୋଧୀ କିସମ ଚାଷ କରନ୍ତୁ।"
      ]
    }
  },
  maize: {
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80",
    confidence: 91,
    en: {
      crop: "Maize (Corn)",
      disease: "Maydis Leaf Blight",
      pathogen: "Bipolaris maydis (Fungal)",
      severity: "Moderate",
      description: "Elongated buff-colored spindle lesions bounded by leaf veins that coalesce, scorching leaves during warm humid weather.",
      actions: [
        "Spray Mancozeb 75% WP @ 2.5 g/L or Azoxystrobin @ 1 ml/L at first sign of lower leaf lesions.",
        "Maintain balanced N-P-K nutrition with adequate Potash.",
        "Ensure field drainage to prevent prolonged humidity.",
        "Practice crop rotation with non-cereal crops."
      ]
    },
    hi: {
      crop: "मक्का (Maize)",
      disease: "पर्ण झुलसा रोग (Leaf Blight)",
      pathogen: "Bipolaris maydis (कवक)",
      severity: "मध्यम (Moderate)",
      description: "पत्तियों पर नसों के बीच लंबे भूरे-धूसर धब्बे बनते हैं जो आपस में मिलकर पूरी पत्ती को झुलसा देते हैं।",
      actions: [
        "मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर या एज़ोक्सीस्ट्रोबिन @ 1 मिली/लीटर का छिड़काव करें।",
        "संतुलित पोटाश खाद का प्रयोग करें।",
        "खेत में पानी की समुचित निकासी रखें।",
        "फसल चक्र अपनाएं।"
      ]
    },
    kn: {
      crop: "ಮೆಕ್ಕೆಜೋಳ (Maize)",
      disease: "ಎಲೆ ಅಂಗಮಾರಿ ರೋಗ (Leaf Blight)",
      pathogen: "Bipolaris maydis (ಶಿಲೀಂಧ್ರ)",
      severity: "ಮಧ್ಯಮ (Moderate)",
      description: "ಎಲೆಗಳ ಮೇಲೆ ಉದ್ದನೆಯ ಬೂದು-ಕಂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳು ಮೂಡಿ ಎಲೆಗಳು ಸುಟ್ಟಂತೆ ಕಾಣುತ್ತವೆ.",
      actions: [
        "ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ಸಮತೋಲನವಾಗಿ ನೀಡಿ.",
        "ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ಇರಲಿ.",
        "ಬೆಳೆ ಪರಿವರ್ತನೆ ಮಾಡಿ."
      ]
    },
    te: {
      crop: "మొక్కజొన్న (Maize)",
      disease: "ఆకుమచ్చ / ఎండాకు తెగులు (Leaf Blight)",
      pathogen: "Bipolaris maydis (శిలీంధ్రం)",
      severity: "మధ్యస్థం (Moderate)",
      description: "ఆకులపై పొడవాటి బూడిద-గోధుమ రంగు మచ్చలు ఏర్పడి ఆకులు ఎండిపోతాయి.",
      actions: [
        "మాంకోజెబ్ @ 2.5 గ్రా/లీ లేదా అజాక్సిస్ట్రోబిన్ @ 1 మి.లీ/లీ స్ప్రే చేయండి.",
        "సరిపడా పొటాష్ ఎరువును వేయండి.",
        "పొలంలో నీరు నిల్వకుండా చూసుకోండి.",
        "పంట మార్పిడి పాటించండి."
      ]
    },
    ta: {
      crop: "மக்காச்சோளம் (Maize)",
      disease: "இலை கருகல் நோய் (Leaf Blight)",
      pathogen: "Bipolaris maydis (பூஞ்சை)",
      severity: "நடுத்தரம் (Moderate)",
      description: "இலை நரம்புகளுக்கு இடையே நீண்ட சாம்பல்-பழுப்பு நிற புள்ளிகள் தோன்றி இலைகள் கருகும்.",
      actions: [
        "மேன்கோசெப் 75% WP @ 2.5 கிராம்/லிட்டர் தெளிக்கவும்.",
        "பொட்டாஷ் உரத்தை சீராக இடவும்.",
        "வடிகால் வசதி செய்து நீர் தேங்குவதை தவிர்க்கவும்.",
        "பயிர் சுழற்சி முறையை பின்பற்றவும்."
      ]
    },
    mr: {
      crop: "मका (Maize)",
      disease: "पानावरील करपा (Leaf Blight)",
      pathogen: "Bipolaris maydis (बुरशी)",
      severity: "मध्यम (Moderate)",
      description: "पानांवर लांबट राखाडी-तपकिरी रंगाचे डाग पडून पाने जळाल्यासारखी दिसतात.",
      actions: [
        "मॅन्कोझेब 75% WP @ 2.5 ग्रॅम/लिटर फवारा.",
        "पोटॅश खताचा योग्य वापर करा.",
        "पाण्याचा उत्तम निचरा ठेवा.",
        "पीक फेરબદલ करा."
      ]
    },
    gu: {
      crop: "મકાઈ (Maize)",
      disease: "પાનનો સુકારો (Leaf Blight)",
      pathogen: "Bipolaris maydis (ફૂગ)",
      severity: "મધ્યમ (Moderate)",
      description: "પાન પર લાંબા ભૂખરા ડાઘા પડીને આખા પાંદડાં બળી જાય છે.",
      actions: [
        "મેન્કોઝેબ 75% WP @ 2.5 ગ્રામ/લીટર છાંટો.",
        "પોટાશ ખાતર આપો.",
        "પાણીનો નિકાલ સુનિશ્ચિત કરો.",
        "પાકની ફેરબદલી કરો."
      ]
    },
    bn: {
      crop: "ভুট্টা (Maize)",
      disease: "পাতা ধসা রোগ (Leaf Blight)",
      pathogen: "Bipolaris maydis (ছত্রাক)",
      severity: "মাঝারি (Moderate)",
      description: "পাতায় লম্বাটে ধূসর-বাদামী দাগ পড়ে এবং পাতা পুড়ে যাওয়ার মতো দেখায়।",
      actions: [
        "ম্যানকোজেব ৭৫% ডব্লিউপি @ ২.৫ গ্রাম/লিটার স্প্রে করুন।",
        "সুষম পটাশ সার প্রয়োগ করুন।",
        "জল নিষ্কাশন ব্যবস্থা ভালো রাখুন।",
        "শস্য পর্যায়ক্রম অনুসরণ করুন।"
      ]
    },
    ml: {
      crop: "മക്കച്ചോളം (Maize)",
      disease: "ഇല കരിച്ചിൽ (Leaf Blight)",
      pathogen: "Bipolaris maydis (കുമിൾ)",
      severity: "മിതമായത് (Moderate)",
      description: "ഇലകളിൽ നീളത്തിലുള്ള ചാര-തവിട്ട് പാടുകൾ ഉണ്ടാകുകയും ഇലകൾ ഉണങ്ങുകയും ചെയ്യുന്നു.",
      actions: [
        "മാങ്കോസെബ് @ 2.5 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "പൊട്ടാഷ് വളം ശരിയായ അളവിൽ നൽകുക.",
        "നീർവാർച്ച ഉറപ്പാക്കുക.",
        "വിള പരിക്രമണം നടത്തുക."
      ]
    },
    pa: {
      crop: "ਮੱਕੀ (Maize)",
      disease: "ਪੱਤਾ ਝੁਲਸ ਰੋਗ (Leaf Blight)",
      pathogen: "Bipolaris maydis (ਉੱਲੀ)",
      severity: "ਦਰਮਿਆਨਾ (Moderate)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਲੰਮੇ ਭੂਰੇ-ਸਲੇਟੀ ਧੱਬੇ ਬਣਦੇ ਹਨ ਜਿਸ ਨਾਲ ਪੱਤੇ ਸੜੇ ਹੋਏ ਦਿਖਾਈ ਦਿੰਦੇ ਹਨ।",
      actions: [
        "ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਪੋਟਾਸ਼ ਖਾਦ ਸੰਤੁਲਿਤ ਪਾਓ।",
        "ਪਾਣੀ ਦੀ ਨਿਕਾਸੀ ਦਾ ਪ੍ਰਬੰਧ ਰੱਖੋ।",
        "ਫ਼ਸਲੀ ਚੱਕਰ ਅਪਣਾਓ।"
      ]
    },
    or: {
      crop: "ମକା (Maize)",
      disease: "ପତ୍ର ଝାଉଁଳା ରୋଗ (Leaf Blight)",
      pathogen: "Bipolaris maydis (କବକ)",
      severity: "ମଧ୍ୟମ (Moderate)",
      description: "ପତ୍ରରେ ଲମ୍ବା ଧୂସର-ମାଟିଆ ଦାଗ ହୋଇ ପତ୍ର ପୋଡ଼ିଗଲା ପରି ଦେଖାଯାଏ।",
      actions: [
        "ମାଙ୍କୋଜେବ୍ @ ୨.୫ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ପୋଟାସ୍ ସାର ସନ୍ତୁଳିତ ଦିଅନ୍ତୁ।",
        "ପାଣି ନିଷ୍କାସନ ସୁନିଶ୍ଚିତ କରନ୍ତୁ।",
        "ଫସଲ ପର୍ଯ୍ୟାୟ ଅନୁସରଣ କରନ୍ତୁ।"
      ]
    }
  },
  cotton: {
    image: "https://images.unsplash.com/photo-1594904351111-a072f80b1a71?auto=format&fit=crop&w=600&q=80",
    confidence: 90,
    en: {
      crop: "Cotton",
      disease: "Cotton Leaf Curl Virus (CLCuV)",
      pathogen: "Begomovirus (Whitefly Vector)",
      severity: "High",
      description: "Thickening of veins, upward/downward leaf curling, and enations (leaf-like outgrowths) transmitted by whitefly (Bemisia tabaci).",
      actions: [
        "Control whitefly vector: Spray Diafenthiuron 50% WP @ 1 g/L or Pyriproxyfen 10% EC @ 2 ml/L.",
        "Eradicate weed hosts (Abutilon, Sida) along field borders.",
        "Install yellow sticky traps @ 10-15 per acre.",
        "Uproot and bury severely infected stunted plants."
      ]
    },
    hi: {
      crop: "कपास (Cotton)",
      disease: "पत्ता मरोड़ रोग (Leaf Curl Virus)",
      pathogen: "Begomovirus (सफेद मक्खी द्वारा प्रसारित)",
      severity: "उच्च (High)",
      description: "पत्तियां ऊपर या नीचे की ओर मुड़ जाती हैं, नसें मोटी हो जाती हैं और पत्तियों के नीचे छोटी पत्ती जैसी गांठें निकल आती हैं। यह सफेद मक्खी से फैलता है।",
      actions: [
        "सफेद मक्खी की रोकथाम हेतु डायफेन्थियूरॉन 50% WP @ 1 ग्राम/लीटर या पाइरीप्रॉक्सीफेन @ 2 मिली/लीटर का छिड़काव करें।",
        "मेड़ों से खरपतवार नष्ट करें।",
        "खेत में 10-15 पीले चिपचिपे कार्ड प्रति एकड़ लगाएं।",
        "गंभीर रूप से प्रभावित पौधों को उखाड़कर नष्ट करें।"
      ]
    },
    kn: {
      crop: "ಹತ್ತಿ (Cotton)",
      disease: "ಎಲೆ ಸುರುಟು ವೈರಸ್ (Leaf Curl Virus)",
      pathogen: "Begomovirus (ಬಿಳಿ ನೊಣ ಹರಡುತ್ತದೆ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಎಲೆಗಳು ಸುರುಟಿಕೊಳ್ಳುತ್ತವೆ, ನಾಳಗಳು ದಪ್ಪವಾಗುತ್ತವೆ ಮತ್ತು ಎಲೆಗಳ ಕೆಳಗೆ ಸಣ್ಣ ಬೆಳವಣಿಗೆಗಳು ಕಂಡುಬರುತ್ತವೆ.",
      actions: [
        "ಬಿಳಿ ನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಡಯಾಫೆಂಥಿಯುರಾನ್ 50% WP @ 1 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಬದುಗಳ ಮೇಲಿನ ಕಳೆ ಕೀಳಿಸಿ.",
        "ಎಕರೆಗೆ 10-15 ಹಳದಿ ಜಿಗುಟು ಬಲೆಗಳನ್ನು ಅಳವಡಿಸಿ.",
        "ತೀವ್ರ ಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಪಡಿಸಿ."
      ]
    },
    te: {
      crop: "పత్తి (Cotton)",
      disease: "ఆకు ముడత వైరస్ (Leaf Curl Virus)",
      pathogen: "Begomovirus (తెల్లదోమ ద్వారా వ్యాప్తి)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకులు పైకి లేదా కిందకి ముడుచుకుపోతాయి, ఈనెలు లావవుతాయి. తెల్లదోమ ద్వారా ఈ వైరస్ వేగంగా వ్యాపిస్తుంది.",
      actions: [
        "తెల్లదోమ నివారణకు డయాఫెంథియురాన్ 50% WP @ 1 గ్రా/లీ స్ప్రే చేయండి.",
        "గట్లపై ఉన్న కలుపు మొక్కలను తొలగించండి.",
        "ఎకరానికి 10-15 పసుపు జిగురు అట్టలను ఏర్పాటు చేయండి.",
        "తీవ్రంగా సోకిన మొక్కలను పీకి నాశనం చేయండి."
      ]
    },
    ta: {
      crop: "பருத்தி (Cotton)",
      disease: "இலை சுருள் நோய் (Leaf Curl Virus)",
      pathogen: "Begomovirus (வெள்ளையீ மூலம் பரவும்)",
      severity: "அதிகம் (High)",
      description: "இலைகள் மேல்நோக்கி அல்லது கீழ்நோக்கி சுருண்டு, நரம்புகள் தடித்து காணப்படும். வெள்ளையீக்கள் மூலம் பரவுகிறது.",
      actions: [
        "வெள்ளையீயை கட்டுப்படுத்த டயாபெந்தியூரான் @ 1 கிராம்/லிட்டர் தெளிக்கவும்.",
        "வரப்புகளில் உள்ள களைகளை அகற்றவும்.",
        "ஏக்கருக்கு 10-15 மஞ்சள் நிற ஒட்டும் பொறிகளை வைக்கவும்.",
        "பாதிக்கப்பட்ட செடிகளை பிடுங்கி அழிக்கவும்."
      ]
    },
    mr: {
      crop: "कापूस (Cotton)",
      disease: "चुरडा-मुरडा (Leaf Curl Virus)",
      pathogen: "Begomovirus (पांढऱ्या माशीमुळे प्रसार)",
      severity: "उच्च (High)",
      description: "पाने वर किंवा खाली वळतात, शिरा जाड होतात आणि झाडांची वाढ खुंटते. पांढऱ्या माशीमुळे हा रोग पसरतो.",
      actions: [
        "पांढऱ्या माशीच्या नियंत्रणासाठी डायफेंथियूरॉन 50% WP @ 1 ग्रॅम/लिटर फवारा.",
        "बांधावरील तण नष्ट करा.",
        "एकरामध्ये 10-15 पिवळे चिकट सापळे लावा.",
        "रोगट झाडे उपटून जाळा."
      ]
    },
    gu: {
      crop: "કપાસ (Cotton)",
      disease: "પાનનો કોકડવા (Leaf Curl Virus)",
      pathogen: "Begomovirus (સફેદ માખી દ્વારા ફેલાય)",
      severity: "ઉચ્ચ (High)",
      description: "પાન ઉપર કે નીચે તરફ વળી જાય છે, નસો જાડી બને છે. સફેદ માખી દ્વારા ઝડપથી ફેલાય છે.",
      actions: [
        "સફેદ માખી નિયંત્રણ માટે ડાયફેન્થિયુરોન @ 1 ગ્રામ/લીટર છાંટો.",
        "શેઢા-પાળા પરથી નીંદણ દૂર કરો.",
        "એકરે 10-15 પીળા ચીકણા ટ્રેપ લગાવો.",
        "વધુ રોગગ્રસ્ત છોડ ઉપાડીને બાળી નાખો."
      ]
    },
    bn: {
      crop: "তুলা (Cotton)",
      disease: "পাতা কোঁকড়ানো ভাইরাস (Leaf Curl Virus)",
      pathogen: "Begomovirus (সাদা মাছি বাহিত)",
      severity: "উচ্চ (High)",
      description: "পাতাগুলি কুঁকড়ে যায় এবং পাতার শিরা মোটা হয়ে যায়। সাদা মাছির মাধ্যমে এই রোগ ছড়ায়।",
      actions: [
        "সাদা মাছি দমনে ডায়াফেন্থিউরন ৫০% ডব্লিউপি @ ১ গ্রাম/লিটার স্প্রে করুন।",
        "আইলের আগাছা পরিষ্কার করুন।",
        "বিঘা প্রতি ৫-৭টি হলুদ ফাঁদ ব্যবহার করুন।",
        "আক্রান্ত গাছ তুলে ধ্বংস করুন।"
      ]
    },
    ml: {
      crop: "പരുത്തി (Cotton)",
      disease: "ഇലച്ചുരുൾ രോഗം (Leaf Curl Virus)",
      pathogen: "Begomovirus (വെള്ളീച്ച പരത്തുന്നത്)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകൾ മുകളിലേക്കോ താഴേക്കോ ചുരുളുന്നു, ഞരമ്പുകൾ കട്ടിയാകുന്നു. വെള്ളീച്ചയാണ് രോഗവാഹി.",
      actions: [
        "വെള്ളീച്ചയെ നിയന്ത്രിക്കാൻ ഡയാഫെന്തിയുറോൺ @ 1 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "വരമ്പിലെ കളകൾ നശിപ്പിക്കുക.",
        "മഞ്ഞ കെണികൾ സ്ഥാപിക്കുക.",
        "രോഗം ബാധിച്ച ചെടികൾ വേരോടെ പിഴുതു നശിപ്പിക്കുക."
      ]
    },
    pa: {
      crop: "ਨਰਮਾ (Cotton)",
      disease: "ਪੱਤਾ ਮਰੋੜ ਰੋਗ (Leaf Curl Virus)",
      pathogen: "Begomovirus (ਚਿੱਟੀ ਮੱਖੀ ਰਾਹੀਂ ਫੈਲਦਾ ਹੈ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤੇ ਉੱਪਰ ਜਾਂ ਹੇਠਾਂ ਵੱਲ ਮੁੜ ਜਾਂਦੇ ਹਨ ਅਤੇ ਨਾੜੀਆਂ ਮੋਟੀਆਂ ਹੋ ਜਾਂਦੀਆਂ ਹਨ। ਚਿੱਟੀ ਮੱਖੀ ਇਸਦਾ ਮੁੱਖ ਵਾਹਕ ਹੈ।",
      actions: [
        "ਚਿੱਟੀ ਮੱਖੀ ਦੀ ਰੋਕਥਾਮ ਲਈ ਡਾਇਆਫੈਂਥੀਯੂਰੋਨ @ 1 ਗ੍ਰਾਮ/ਲਿਟਰ ਦਾ ਛਿੜਕਾਅ ਕਰੋ।",
        "ਵੱਟਾਂ ਤੋਂ ਨਦੀਨ ਨਸ਼ਟ ਕਰੋ।",
        "ਪ੍ਰਤੀ ਏਕੜ 10-15 ਪੀਲੇ ਕਾਰਡ ਲਗਾਓ।",
        "ਰੋਗੀ ਬੂਟਿਆਂ ਨੂੰ ਪੁੱਟ ਕੇ ਦੱਬ ਦਿਓ।"
      ]
    },
    or: {
      crop: "କପା (Cotton)",
      disease: "ପତ୍ର କୁଞ୍ଚନ ରୋଗ (Leaf Curl Virus)",
      pathogen: "Begomovirus (ଧଳା ମାଛି ଦ୍ୱାରା ବ୍ୟାପେ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ର ଉପର ବା ତଳକୁ କୁଞ୍ଚିତ ହୋଇଯାଏ ଏବଂ ଶିରାଗୁଡ଼ିକ ମୋଟା ହୋଇଯାଏ। ଧଳା ମାଛି ଏହାର ବାହକ।",
      actions: [
        "ଧଳା ମାଛି ଦମନ ପାଇଁ ଡାୟାଫେନ୍ଥିୟୁରନ୍ @ ୧ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ହିଡ଼ରୁ ଘାସ ସଫା କରନ୍ତୁ।",
        "ଏକର ପିଛା ୧୦-୧୫ଟି ହଳଦିଆ ଫାନ୍ଦ ଲଗାନ୍ତୁ।",
        "ଅଧିକ ଆକ୍ରାନ୍ତ ଗଛ ଉପାଡ଼ି ନଷ୍ଟ କରନ୍ତୁ।"
      ]
    }
  },
  soybean: {
    image: "https://images.unsplash.com/photo-1599818817290-7c65d63f9d50?auto=format&fit=crop&w=600&q=80",
    confidence: 92,
    en: {
      crop: "Soybean",
      disease: "Asian Soybean Rust",
      pathogen: "Phakopsora pachyrhizi (Fungal)",
      severity: "High",
      description: "Minute tan-to-brown lesions with volcanic raised pustules on lower leaf surfaces, causing severe premature defoliation during pod-fill.",
      actions: [
        "Spray Hexaconazole 5% EC @ 1 ml/L or Propiconazole 25% EC @ 1 ml/L at first appearance of lower leaf lesions.",
        "Maintain 45cm row spacing for canopy aeration.",
        "Avoid spraying during dew stagnation.",
        "Apply seed treatment prior to sowing in endemic areas."
      ]
    },
    hi: {
      crop: "सोयाबीन (Soybean)",
      disease: "सोयाबीन गेरूआ / रतुआ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (कवक)",
      severity: "उच्च (High)",
      description: "पत्तियों की निचली सतह पर हल्के भूरे रंग के छोटे-छोटे उभरे हुए फफोले बनते हैं। पत्तियां समय से पहले पीली होकर गिर जाती हैं और फलियां खाली रह जाती हैं।",
      actions: [
        "हेक्साकोनाज़ोल 5% EC @ 1 मिली/लीटर या प्रोपिकोनाज़ोल @ 1 मिली/लीटर का छिड़काव करें।",
        "पंक्तियों के बीच 45 सेमी की दूरी रखें।",
        "ओस सूखने के बाद ही छिड़काव करें।",
        "बुवाई से पहले बीज उपचार करें।"
      ]
    },
    kn: {
      crop: "ಸೋಯಾಬೀನ್ (Soybean)",
      disease: "ಸೋಯಾಬೀನ್ ತುಕ್ಕು ರೋಗ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (ಶಿಲೀಂಧ್ರ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಎಲೆಗಳ ಕೆಳಭಾಗದಲ್ಲಿ ಸಣ್ಣ ಕಂದು ಬಣ್ಣದ ಗುಳ್ಳೆಗಳು ಮೂಡಿ ಎಲೆಗಳು ಅಕಾಲಿಕವಾಗಿ ಉದುರುತ್ತವೆ.",
      actions: [
        "ಹೆಕ್ಸಾಕೊನಾಜೋಲ್ 5% EC @ 1 ಮಿಲಿ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಸಾಲುಗಳ ನಡುವೆ 45 ಸೆಂ.ಮೀ ಅಂತರವಿರಲಿ.",
        "ಇಬ್ಬನಿ ಆವರಿಸಿದಾಗ ಸಿಂಪಡಿಸಬೇಡಿ.",
        "ಬೀಜೋಪಚಾರ ಕಡ್ಡಾಯವಾಗಿ ಮಾಡಿ."
      ]
    },
    te: {
      crop: "సోయాబీన్ (Soybean)",
      disease: "సోయాబీన్ తుప్పు తెగులు (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (శిలీంధ్రం)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకుల కింది భాగంలో చిన్న గోధుమ రంగు పొక్కులు ఏర్పడతాయి. కాయలు నిండే సమయంలో ఆకులు రాలిపోతాయి.",
      actions: [
        "హెక్సాకోనాజోల్ @ 1 మి.లీ/లీ లేదా ప్రొపికోనాజోల్ @ 1 మి.లీ/లీ స్ప్రే చేయండి.",
        "వరుసల మధ్య 45 సెం.మీ దూరం పాటించండి.",
        "మంచు ఉన్నప్పుడు మందులు చల్లవద్దు.",
        "విత్తన శుద్ధి తప్పక చేయండి."
      ]
    },
    ta: {
      crop: "சோயாபீன் (Soybean)",
      disease: "சோயாபீன் துரு நோய் (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (பூஞ்சை)",
      severity: "அதிகம் (High)",
      description: "இலையின் அடிப்பகுதியில் சிறிய பழுப்பு நிற கொப்புளங்கள் தோன்றி இலைகள் முன்கூட்டியே உதிரும்.",
      actions: [
        "ஹெக்சாகோனசோல் 5% EC @ 1 மி.லி/லிட்டர் தெளிக்கவும்.",
        "வரிசைக்கு வரிசை 45 செ.மீ இடைவெளி விடவும்.",
        "பனி இருக்கும் வேளையில் தெளிக்க வேண்டாம்.",
        "விதை நேர்த்தி செய்து விதைக்கவும்."
      ]
    },
    mr: {
      crop: "सोयाबीन (Soybean)",
      disease: "सोयाबीन तांबेरा (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (बुरशी)",
      severity: "उच्च (High)",
      description: "पानांच्या खालच्या बाजूवर बारीक तांबूस-तपकिरी रंगाचे पुरळ उठतात. शेंगा भरण्याच्या काळात पाने गळाल्यामुळे दाणे भरत नाहीत.",
      actions: [
        "हेक्साकोनाझोल 5% EC @ 1 मिली/लिटर किंवा प्रोपिकोनाझोल @ 1 मिली/लिटर फवारा.",
        "ओळींमध्ये 45 सेमी योग्य अंतर ठेवा.",
        "दव असताना फवारणी करणे टाळा.",
        "पेरणीपूर्वी बीजप्रक्रिया करा."
      ]
    },
    gu: {
      crop: "સોયાબીન (Soybean)",
      disease: "સોયાબીન ગેરુ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (ફૂગ)",
      severity: "ઉચ્ચ (High)",
      description: "પાનની નીચેની સપાટી પર ઝીણા કથ્થઈ રંગના ફોલ્લા બને છે અને પાન ખરી પડે છે.",
      actions: [
        "હેક્સાકોનાઝોલ 5% EC @ 1 મિલી/લીટર છાંટો.",
        "45 સેમીનું અંતર રાખો.",
        "ઝાકળ હોય ત્યારે છંટકાવ ન કરવો.",
        "બીજ માવજત અવશ્ય આપો."
      ]
    },
    bn: {
      crop: "সয়াবিন (Soybean)",
      disease: "সয়াবিনের মরিচা রোগ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (ছত্রাক)",
      severity: "উচ্চ (High)",
      description: "পাতার নিচে বাদামী ফোস্কার মতো দাগ পড়ে এবং অকালে পাতা ঝরে ফলন কমে যায়।",
      actions: [
        "হেক্সাকোনাজল ৫% ইসি @ ১ মিলি/লিটার স্প্রে করুন।",
        "সারির মাঝে ৪৫ সেমি দূরত্ব বজায় রাখুন।",
        "কুয়াশা বা শিশির ভেজা অবস্থায় স্প্রে করবেন না।",
        "বীজ শোধন করে বপন করুন।"
      ]
    },
    ml: {
      crop: "സോയാബീൻ (Soybean)",
      disease: "സോയാബീൻ തുരുമ്പ് രോഗം (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (കുമിൾ)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകളുടെ അടിഭാഗത്ത് തവിട്ട് കുമിളകൾ പ്രത്യക്ഷപ്പെട്ട് ഇലകൾ കൊഴിയുന്നു.",
      actions: [
        "ഹെക്സാകൊണസോൾ @ 1 മില്ലി/ലിറ്റർ തളിക്കുക.",
        "വരികൾ തമ്മിൽ 45 സെ.മീ അകലം നൽകുക.",
        "മഞ്ഞുതുള്ളികൾ ഉള്ളപ്പോൾ തളിക്കരുത്.",
        "വിത്തുചികിത്സ നടത്തുക."
      ]
    },
    pa: {
      crop: "ਸੋਇਆਬੀਨ (Soybean)",
      disease: "ਸੋਇਆਬੀਨ ਕੁੰਗੀ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (ਉੱਲੀ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤਿਆਂ ਦੇ ਹੇਠਲੇ ਪਾਸੇ ਛੋਟੇ-ਛੋਟੇ ਭੂਰੇ ਛਾਲੇ ਬਣਦੇ ਹਨ ਅਤੇ ਪੱਤੇ ਸਮੇਂ ਤੋਂ ਪਹਿਲਾਂ ਝੜ ਜਾਂਦੇ ਹਨ।",
      actions: [
        "ਹੈਕਸਾਕੋਨਾਜ਼ੋਲ 5% EC @ 1 ਮਿਲੀ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਲਾਈਨਾਂ ਵਿਚਕਾਰ 45 ਸੈ.ਮੀ ਵਿੱਥ ਰੱਖੋ।",
        "ਤ੍ਰੇਲ ਵੇਲੇ ਛਿੜਕਾਅ ਨਾ ਕਰੋ।",
        "ਬੀਜ ਸੋਧ ਕਰਕੇ ਹੀ ਬੀਜੋ।"
      ]
    },
    or: {
      crop: "ସୋୟାବିନ (Soybean)",
      disease: "ସୋୟାବିନ କଳଙ୍କ ରୋଗ (Soybean Rust)",
      pathogen: "Phakopsora pachyrhizi (କବକ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ରର ତଳ ପାଖରେ ଛୋଟ ଛୋଟ ମାଟିଆ ଫୋଟକା ଦେଖାଦିଏ ଏବଂ ପତ୍ର ଝଡ଼ିଯାଏ।",
      actions: [
        "ହେକ୍ସାକୋନାଜୋଲ୍ @ ୧ ମିଲି/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଧାଡ଼ି ମଧ୍ୟରେ ୪୫ ସେମି ବ୍ୟବଧାନ ରଖନ୍ତୁ।",
        "କୁହୁଡ଼ି ସମୟରେ ସିଞ୍ଚନ କରନ୍ତୁ ନାହିଁ।",
        "ବିହନ ବିଶୋଧନ କରନ୍ତୁ।"
      ]
    }
  },
  onion: {
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80",
    confidence: 90,
    en: {
      crop: "Onion",
      disease: "Purple Blotch",
      pathogen: "Alternaria porri (Fungal)",
      severity: "Moderate",
      description: "Water-soaked lesions on leaves and seed stalks that turn brown-purple with concentric rings and yellow margins, causing foliage collapse.",
      actions: [
        "Spray Mancozeb 75% WP @ 2.5 g/L mixed with Sandovit sticker @ 0.5 ml/L.",
        "Alternatively apply Difenoconazole 25% EC @ 1 ml/L for systemic curative action.",
        "Maintain raised beds for good drainage and prevent waterlogging around bulbs.",
        "Destroy and burn crop residue after harvest."
      ]
    },
    hi: {
      crop: "प्याज (Onion)",
      disease: "बैंगनी धब्बा रोग (Purple Blotch)",
      pathogen: "Alternaria porri (कवक)",
      severity: "मध्यम (Moderate)",
      description: "पत्तियों और डंठलों पर पानी से भीगे जैसे धब्बे बनते हैं जो बाद में बैंगनी-भूरे हो जाते हैं, जिससे पत्तियां बीच से मुड़कर सूख जाती हैं।",
      actions: [
        "मैंकोजेब 75% WP @ 2.5 ग्राम/लीटर के साथ स्टीकर (चिपचिपा पदार्थ) मिलाकर छिड़कें।",
        "डाइफेनोकोनाज़ोल 25% EC @ 1 मिली/लीटर का छिड़काव करें।",
        "खेत में पानी न भरने दें; मेड़ों पर रोपाई करें।",
        "फसल अवशेष नष्ट करें।"
      ]
    },
    kn: {
      crop: "ಈರುಳ್ಳಿ (Onion)",
      disease: "ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ (Purple Blotch)",
      pathogen: "Alternaria porri (ಶಿಲೀಂಧ್ರ)",
      severity: "ಮಧ್ಯಮ (Moderate)",
      description: "ಎಲೆಗಳ ಮೇಲೆ ನೀರಿನಿಂದ ನೆನೆದಂತಹ ನೇರಳೆ-ಕಂದು ಮಚ್ಚೆಗಳು ಉಂಟಾಗಿ ಎಲೆಗಳು ಒಣಗುತ್ತವೆ.",
      actions: [
        "ಮ್ಯಾಂಕೋಜೆಬ್ 75% WP @ 2.5 ಗ್ರಾಂ/ಲೀಟರ್ ಜೊತೆಗೆ ಸ್ಟಿಕ್ಕರ್ ಬೆರೆಸಿ ಸಿಂಪಡಿಸಿ.",
        "ಡೈಫೆನೊಕೊನಾಜೋಲ್ 25% EC @ 1 ಮಿಲಿ/ಲೀಟರ್ ಬಳಸಿ.",
        "ಉತ್ತಮ ಬಸಿಗಾಲುವೆ ವ್ಯವಸ್ಥೆ ಮಾಡಿ.",
        "ಪೀಡಿತ ಅವಶೇಷಗಳನ್ನು ಸುಟ್ಟುಹಾಕಿ."
      ]
    },
    te: {
      crop: "ఉల్లి (Onion)",
      disease: "ఊదా మచ్చ తెగులు (Purple Blotch)",
      pathogen: "Alternaria porri (శిలీంధ్రం)",
      severity: "మధ్యస్థం (Moderate)",
      description: "ఆకులపై ఊదా రంగు మచ్చలు ఏర్పడి ఆకులు మధ్యలో విరిగి ఎండిపోతాయి.",
      actions: [
        "మాంకోజెబ్ 75% WP @ 2.5 గ్రా/లీ స్టిక్కర్ కలిపి పిచికారీ చేయండి.",
        "డైఫెనోకోనజోల్ 25% EC @ 1 మి.లీ/లీ వాడండి.",
        "ఎత్తు మడులపై సాగు చేసి నీరు నిల్వకుండా చూడండి.",
        "పంట అవశేషాలను నాశనం చేయండి."
      ]
    },
    ta: {
      crop: "வெங்காயம் (Onion)",
      disease: "ஊதா கருகல் நோய் (Purple Blotch)",
      pathogen: "Alternaria porri (பூஞ்சை)",
      severity: "நடுத்தரம் (Moderate)",
      description: "இலைகளில் நீர்க்கசிவு போன்ற ஊதா-பழுப்பு நிற புள்ளிகள் தோன்றி இலைகள் சாய்ந்து கருகும்.",
      actions: [
        "மேன்கோசெப் @ 2.5 கிராம்/லிட்டர் ஒட்டுபசையுடன் கலந்து தெளிக்கவும்.",
        "டைபனோகோனசோல் @ 1 மி.லி/லிட்டர் தெளிக்கவும்.",
        "மேட்டுப்பாத்திகளில் நடவு செய்து நீர் தேங்குவதை தடுக்கவும்.",
        "பயிர் கழிவுகளை எரிக்கவும்."
      ]
    },
    mr: {
      crop: "कांदा (Onion)",
      disease: "जांभळा करपा (Purple Blotch)",
      pathogen: "Alternaria porri (बुरशी)",
      severity: "मध्यम (Moderate)",
      description: "पानांवर सुरुवातीला पांढुरके व नंतर मध्यभागी जांभळे चट्टे पडतात. पाने वाळून कांद्याचा आकार लहान राहतो.",
      actions: [
        "मॅन्कोझेब 75% WP @ 2.5 ग्रॅम/लिटर अधिक स्टीकर मिसळून फवारा.",
        "डायफेनोकोनॅझोल 25% EC @ 1 मिली/लिटर फवारा.",
        "गादी वाफ्यावर लागवड करून पाण्याचा निचरा करा.",
        "रोगट पाने नष्ट करा."
      ]
    },
    gu: {
      crop: "ડુંગળી (Onion)",
      disease: "જાંબલી સુકારો (Purple Blotch)",
      pathogen: "Alternaria porri (ફૂગ)",
      severity: "મધ્યમ (Moderate)",
      description: "પાન પર જાંબલી-કથ્થઈ રંગના લંબગોળ ડાઘા પડે છે અને પાન વચ્ચેથી વળીને સુકાઈ જાય છે.",
      actions: [
        "મેન્કોઝેબ 75% WP @ 2.5 ગ્રામ/લીટર સ્ટીકર સાથે છાંટો.",
        "ડાયફેનોકોનાઝોલ @ 1 મિલી/લીટર છાંટો.",
        "ગાદી ક્યારા પર વાવેતર કરો.",
        "રોગગ્રસ્ત અવશેષો બાળી નાખો."
      ]
    },
    bn: {
      crop: "পেঁয়াজ (Onion)",
      disease: "বেগুনি দাগ রোগ (Purple Blotch)",
      pathogen: "Alternaria porri (ছত্রাক)",
      severity: "মাঝারি (Moderate)",
      description: "পাতায় জলছাপের মতো বেগুনি-বাদামী দাগ পড়ে এবং পাতা ঢলে পড়ে শুকিয়ে যায়।",
      actions: [
        "ম্যানকোজেব ৭৫% ডব্লিউপি @ ২.৫ গ্রাম/লিটার স্টিকার সহ স্প্রে করুন।",
        "ডাইফেনোকোনাজল @ ১ মিলি/লিটার স্প্রে করুন।",
        "উঁচু জমিতে চাষ করে জল নিকাশের ব্যবস্থা করুন।",
        "আক্রান্ত অংশ নষ্ট করুন।"
      ]
    },
    ml: {
      crop: "സവാള (Onion)",
      disease: "പർപ്പിൾ ബ്ലോട്ട് (Purple Blotch)",
      pathogen: "Alternaria porri (കുമിൾ)",
      severity: "മിതമായത് (Moderate)",
      description: "ഇലകളിൽ പർപ്പിൾ-തവിട്ട് പാടുകൾ ഉണ്ടാകുകയും ഇലകൾ ഒടിഞ്ഞു വീഴുകയും ചെയ്യുന്നു.",
      actions: [
        "മാങ്കോസെബ് @ 2.5 ഗ്രാം/ലിറ്റർ പശ ചേർത്ത് തളിക്കുക.",
        "ഡൈഫെനൊകൊണസോൾ @ 1 മില്ലി/ലിറ്റർ തളിക്കുക.",
        "നീർവാർച്ച ഉറപ്പാക്കാൻ ഉയർന്ന വാരങ്ങളിൽ നടുക.",
        "രോഗബാധിത അവശിഷ്ടങ്ങൾ നശിപ്പിക്കുക."
      ]
    },
    pa: {
      crop: "ਪਿਆਜ਼ (Onion)",
      disease: "ਜਾਮਣੀ ਧੱਬਾ ਰੋਗ (Purple Blotch)",
      pathogen: "Alternaria porri (ਉੱਲੀ)",
      severity: "ਦਰਮਿਆਨਾ (Moderate)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਜਾਮਣੀ-ਭੂਰੇ ਧੱਬੇ ਬਣਦੇ ਹਨ ਜਿਸ ਨਾਲ ਪੱਤੇ ਵਿਚਕਾਰੋਂ ਮੁੜ ਕੇ ਸੁੱਕ ਜਾਂਦੇ ਹਨ।",
      actions: [
        "ਮੈਨਕੋਜ਼ੇਬ 75% WP @ 2.5 ਗ੍ਰਾਮ/ਲਿਟਰ ਸਟਿੱਕਰ ਨਾਲ ਮਿਲਾ ਕੇ ਛਿੜਕੋ।",
        "ਡਾਈਫੇਨੋਕੋਨਾਜ਼ੋਲ @ 1 ਮਿਲੀ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਉੱਚੀਆਂ ਵੱਟਾਂ 'ਤੇ ਲਗਾਈ ਕਰੋ।",
        "ਰੋਗੀ ਪੱਤੇ ਨਸ਼ਟ ਕਰੋ।"
      ]
    },
    or: {
      crop: "ପିଆଜ (Onion)",
      disease: "ବାଇଗଣୀ ଦାଗ ରୋଗ (Purple Blotch)",
      pathogen: "Alternaria porri (କବକ)",
      severity: "ମଧ୍ୟମ (Moderate)",
      description: "ପତ୍ରରେ ବାଇଗଣୀ-ମାଟିଆ ଦାଗ ହୁଏ ଏବଂ ପତ୍ର ମଝିରୁ ଭାଙ୍ଗି ଶୁଖିଯାଏ।",
      actions: [
        "ମାଙ୍କୋଜେବ୍ @ ୨.୫ ଗ୍ରାମ୍/ଲିଟର ଷ୍ଟିକର ମିଶାଇ ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଡାଇଫେନୋକୋନାଜୋଲ୍ @ ୧ ମିଲି/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଡେଙ୍ଗା ମଡ଼ାରେ ଚାଷ କରି ଜଳ ନିଷ୍କାସନ କରନ୍ତୁ।",
        "ରୋଗାକ୍ରାନ୍ତ ପତ୍ର ନଷ୍ଟ କରନ୍ତୁ।"
      ]
    }
  },
  groundnut: {
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    confidence: 92,
    en: {
      crop: "Groundnut (Peanut)",
      disease: "Tikka Leaf Spot",
      pathogen: "Cercospora personata (Fungal)",
      severity: "High",
      description: "Dark-brown to black circular spots without yellow halo on both leaf surfaces, leading to severe defoliation and undersized pods.",
      actions: [
        "Spray Carbendazim 12% + Mancozeb 63% WP (Saaf) @ 2 g/L upon first detection.",
        "Apply Chlorothalonil 75% WP @ 2 g/L as preventive barrier.",
        "Incorporate Trichoderma viride enriched farmyard manure in the soil.",
        "Avoid water stress during pegging and pod formation."
      ]
    },
    hi: {
      crop: "मूंगफली (Groundnut)",
      disease: "टिक्का रोग (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (कवक)",
      severity: "उच्च (High)",
      description: "पत्तियों की दोनों सतहों पर गहरे भूरे-काले गोल धब्बे बनते हैं, जिससे पत्तियां तेजी से झड़ती हैं और फलियां छोटी रह जाती हैं।",
      actions: [
        "कार्बेंडाजिम 12% + मैंकोजेब 63% WP (साफ) @ 2 ग्राम/लीटर का छिड़काव करें।",
        "क्लोरोथैलोनिल 75% WP @ 2 ग्राम/लीटर का छिड़काव करें।",
        "खेत में ट्राइकोडर्मा युक्त गोबर की खाद डालें।",
        "सुइयां बनते समय नमी बनाए रखें।"
      ]
    },
    kn: {
      crop: "ಕಡಲೆಕಾಯಿ (Groundnut)",
      disease: "ತಿಕ್ಕಾ ಎಲೆಚುಕ್ಕೆ ರೋಗ (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (ಶಿಲೀಂಧ್ರ)",
      severity: "ಹೆಚ್ಚಿನ (High)",
      description: "ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು-ಕಂದು ಬಣ್ಣದ ದುಂಡಗಿನ ಮಚ್ಚೆಗಳು ಉಂಟಾಗಿ ಎಲೆಗಳು ಉದುರಿ ಕಾಯಿಗಳ ಇಳುವರಿ ಕಡಿಮೆಯಾಗುತ್ತದೆ.",
      actions: [
        "ಕಾರ್ಬೆಂಡಾಜಿಮ್ + ಮ್ಯಾಂಕೋಜೆಬ್ (ಸಾಫ್) @ 2 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.",
        "ಕ್ಲೋರೋಥಲೋನಿಲ್ 75% WP @ 2 ಗ್ರಾಂ/ಲೀಟರ್ ಬಳಸಿ.",
        "ಟ್ರೈಕೋಡರ್ಮಾ ಬೆರೆಸಿದ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಬಳಸಿ.",
        "ಕಾಯಿ ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ನೀರಿನ ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ."
      ]
    },
    te: {
      crop: "వేరుశనగ (Groundnut)",
      disease: "తిక్కా ఆకుమచ్చ తెగులు (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (శిలీంధ్రం)",
      severity: "తీవ్రమైనది (High)",
      description: "ఆకుల రెండు వైపులా ముదురు గోధుమ-నలుపు రంగు గుండ్రని మచ్చలు ఏర్పడి ఆకులు రాలిపోతాయి.",
      actions: [
        "కార్బెండజిమ్ + మాంకోజెబ్ (సాఫ్) @ 2 గ్రా/లీ స్ప్రే చేయండి.",
        "క్లోరోథలోనిల్ 75% WP @ 2 గ్రా/లీ పిచికారీ చేయండి.",
        "ట్రైకోడెర్మ కలిపిన పశువుల ఎరువును భూమిలో వేయండి.",
        "ఊడలు దిగే దశలో తగినంత తేమను ఉంచండి."
      ]
    },
    ta: {
      crop: "நிலக்கடலை (Groundnut)",
      disease: "டிக்கா இலைப்புள்ளி நோய் (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (பூஞ்சை)",
      severity: "அதிகம் (High)",
      description: "இலைகளின் இருபுறமும் கரும்பழுப்பு வட்ட புள்ளிகள் தோன்றி இலைகள் உதிர்ந்து காய் திரட்சி குறையும்.",
      actions: [
        "கார்பெண்டாசிம் + மேன்கோசெப் (சாஃப்) @ 2 கிராம்/லிட்டர் தெளிக்கவும்.",
        "குளோரோதலோனில் @ 2 கிராம்/லிட்டர் தெளிக்கவும்.",
        "டிரைக்கோடெர்மா கலந்த தொழுவுரத்தை மண்ணில் இடவும்.",
        "ஊசி இறங்கும் பருவத்தில் நீர் பற்றாக்குறை ஏற்படாமல் பார்க்கவும்."
      ]
    },
    mr: {
      crop: "भुईमूग (Groundnut)",
      disease: "टिक्का रोग (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (बुरशी)",
      severity: "उच्च (High)",
      description: "पानांवर काळे-तपकिरी गोलाकार ठिपके पडतात. पाने गळाल्यामुळे आऱ्या कमी सुटतात आणि शेंगा पोचट राहतात.",
      actions: [
        "कार्बेन्डाझिम 12% + मॅन्कोझेब 63% WP (साफ) @ 2 ग्रॅम/लिटर फवारा.",
        "क्लोरोथॅलोनिल 75% WP @ 2 ग्रॅम/लिटर फवारा.",
        "ट्रायकोडर्मायुक्त शेणखताचा वापर करा.",
        "आऱ्या सुटताना जमिनीत ओलावा ठेवा."
      ]
    },
    gu: {
      crop: "મગફળી (Groundnut)",
      disease: "ટીક્કા રોગ (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (ફૂગ)",
      severity: "ઉચ્ચ (High)",
      description: "પાન પર ઘેરા કાળા-કથ્થઈ ગોળાકાર ટપકાં પડે છે અને પાન ખરી જતાં ડોડવા ઓછા બેસે છે.",
      actions: [
        "કાર્બેન્ડાઝીમ + મેન્કોઝેબ @ 2 ગ્રામ/લીટર છાંટો.",
        "ક્લોરોથેલોનીલ 75% WP @ 2 ગ્રામ/લીટર છાંટો.",
        "ટ્રાઇકોડર્મા યુક્ત છાણિયું ખાતર આપો.",
        "સુયા બેસવાની અવસ્થાએ ભેજ જાળવી રાખો."
      ]
    },
    bn: {
      crop: "চীনাবাদাম (Groundnut)",
      disease: "টিক্কা রোগ (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (ছত্রাক)",
      severity: "উচ্চ (High)",
      description: "পাতায় ঘন বাদামী-কালো রঙের গোলাকার দাগ পড়ে এবং পাতা ঝরে গিয়ে বাদামের ফলন ব্যাহত হয়।",
      actions: [
        "কার্বেন্ডাজিম + ম্যানকোজেব @ ২ গ্রাম/লিটার স্প্রে করুন।",
        "ক্লোরোথ্যালোনিল ৭৫% ডব্লিউপি @ ২ গ্রাম/লিটার স্প্রে করুন।",
        "ট্রাইকোডার্মা মিশ্রিত গোবর সার প্রয়োগ করুন।",
        "সুঁই নামার সময় জমিতে পর্যাপ্ত আর্দ্রতা রাখুন।"
      ]
    },
    ml: {
      crop: "നിലക്കടല (Groundnut)",
      disease: "തിക്ക ഇലപ്പുള്ളി രോഗം (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (കുമിൾ)",
      severity: "കൂടിയത് (High)",
      description: "ഇലകളിൽ ഇരുണ്ട തവിട്ടുനിറത്തിലുള്ള പാടുകൾ ഉണ്ടാകുകയും ഇലകൾ കൊഴിഞ്ഞ് കായ്കളുടെ വലിപ്പം കുറയുകയും ചെയ്യുന്നു.",
      actions: [
        "കാർബെൻഡാസിം + മാങ്കോസെബ് @ 2 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "ക്ലോറോതലോനിൽ @ 2 ഗ്രാം/ലിറ്റർ തളിക്കുക.",
        "ട്രൈക്കോഡെർമ ചേർത്ത ചാണകപ്പൊടി മണ്ണിൽ ചേർക്കുക.",
        "കായ് പിടിക്കുന്ന ഘട്ടത്തിൽ ജലക്ഷാമം ഒഴിവാക്കുക."
      ]
    },
    pa: {
      crop: "ਮੂੰਗਫਲੀ (Groundnut)",
      disease: "ਟਿੱਕਾ ਰੋਗ (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (ਉੱਲੀ)",
      severity: "ਉੱਚ (High)",
      description: "ਪੱਤਿਆਂ 'ਤੇ ਗੂੜ੍ਹੇ ਭੂਰੇ-ਕਾਲੇ ਗੋਲ ਧੱਬੇ ਬਣਦੇ ਹਨ ਜਿਸ ਨਾਲ ਪੱਤੇ ਝੜ ਜਾਂਦੇ ਹਨ ਅਤੇ ਦਾਣੇ ਛੋਟੇ ਰਹਿ ਜਾਂਦੇ ਹਨ।",
      actions: [
        "ਕਾਰਬੈਂਡਾਜ਼ਿਮ + ਮੈਨਕੋਜ਼ੇਬ (ਸਾਫ਼) @ 2 ਗ੍ਰਾਮ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਕਲੋਰੋਥੈਲੋਨਿਲ @ 2 ਗ੍ਰਾਮ/ਲਿਟਰ ਛਿੜਕੋ।",
        "ਟ੍ਰਾਈਕੋਡਰਮਾ ਰਲੀ ਰੂੜੀ ਖਾਦ ਪਾਓ।",
        "ਸੂਈਆਂ ਬਣਨ ਸਮੇਂ ਨਮੀ ਬਣਾਈ ਰੱਖੋ।"
      ]
    },
    or: {
      crop: "ଚିନାବାଦାମ (Groundnut)",
      disease: "ଟିକ୍କା ରୋଗ (Tikka Leaf Spot)",
      pathogen: "Cercospora personata (କବକ)",
      severity: "ଉଚ୍ଚ (High)",
      description: "ପତ୍ରର ଉଭୟ ପାଖରେ ଗାଢ଼ ମାଟିଆ-କଳା ଗୋଲାକାର ଦାଗ ହୁଏ ଏବଂ ପତ୍ର ଝଡ଼ିଯାଏ।",
      actions: [
        "କାର୍ବେଣ୍ଡାଜିମ୍ + ମାଙ୍କୋଜେବ୍ (ସାଫ୍) @ ୨ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "କ୍ଲୋରୋଥାଲୋନିଲ୍ @ ୨ ଗ୍ରାମ୍/ଲିଟର ସିଞ୍ଚନ କରନ୍ତୁ।",
        "ଟ୍ରାଇକୋଡର୍ମା ମିଶ୍ରିତ ଖତ ପ୍ରୟୋଗ କରନ୍ତୁ।",
        "ଛୁଇଁ ବାହାରିବା ସମୟରେ ପର୍ଯ୍ୟାପ୍ତ ଓଦା ରଖନ୍ତୁ।"
      ]
    }
  }
};

window.switchMapLayer = function(mode, btnEl) {
  if (btnEl) {
    document.querySelectorAll('.kbv-layer-btn').forEach(b => {
      b.style.background = '#FFFFFF';
      b.style.borderColor = 'rgba(45,90,39,0.2)';
      b.style.color = '#4F5E46';
    });
    if (mode === 'ndvi') {
      btnEl.style.background = 'rgba(45,90,39,0.16)';
      btnEl.style.borderColor = '#2D5A27';
      btnEl.style.color = '#1A2412';
    } else if (mode === 'ndwi') {
      btnEl.style.background = 'rgba(2,132,199,0.15)';
      btnEl.style.borderColor = '#0284c7';
      btnEl.style.color = '#0c4a6e';
    } else {
      btnEl.style.background = 'rgba(45,90,39,0.14)';
      btnEl.style.borderColor = '#2D5A27';
      btnEl.style.color = '#1A2412';
    }
  }
  if (window.kbvApp && typeof window.kbvApp.setMapLayerMode === "function") {
    window.kbvApp.setMapLayerMode(mode);
  }
  if (window.app && window.app.mapManager && typeof window.app.mapManager.setLayerMode === "function") {
    window.app.mapManager.setLayerMode(mode);
  }
};

class KBVApp {
  constructor() {
    this.currentScreen = 1;
    this.activeDashboardTab = "map";
    this.currentLanguage = "en";
    this.selectedCrop = "tomato";
    this.selectedStage = "vegetative";
    this.analysisMode = "disease"; // "disease" or "pest"
    this.uploadedImageSrc = MULTILINGUAL_DISEASE_DATA.tomato.image;
    this.analysisResult = this.getLocalizedResult("tomato", "en");
    this.riskMap = null;
    this.riskLayers = null;
  }

  getLocalizedResult(cropKey, lang) {
    const cropData = MULTILINGUAL_DISEASE_DATA[cropKey] || MULTILINGUAL_DISEASE_DATA.tomato;
    const langData = cropData[lang] || cropData.en;
    return {
      crop: langData.crop,
      disease: langData.disease,
      pathogen: langData.pathogen,
      confidence: cropData.confidence || 94,
      severity: langData.severity,
      affectedArea: "1.0 km²",
      image: cropData.image,
      description: langData.description,
      actions: langData.actions
    };
  }

  async init() {
    console.log("Initializing KBV Full Website UI...");
    this.currentLat = (window.app && window.app.currentLat) || 12.9571;
    this.currentLon = (window.app && window.app.currentLon) || 77.5325;
    this.currentLocationName = (window.app && window.app.currentLocationName) || "Bengaluru Urban, Karnataka, India";

    this.setupEventListeners();
    this.applyTranslations();
    this.updateLocationDisplays(this.currentLat, this.currentLon, this.currentLocationName);

    // Initial first page: Select Language (Screen 1)
    this.goToScreen(1);

    // Initial auto-detect browser location or reverse geocode
    setTimeout(async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              const lat = pos.coords.latitude;
              const lon = pos.coords.longitude;
              this.currentLat = lat;
              this.currentLon = lon;
              if (window.ApiClient) {
                const rev = await window.ApiClient.reverseGeocode(lat, lon);
                if (rev && rev.location_name) {
                  this.currentLocationName = rev.location_name.split(",").slice(0, 3).join(",");
                }
              }
              this.updateLocationDisplays(this.currentLat, this.currentLon, this.currentLocationName);
              if (window.app) {
                window.app.currentLat = this.currentLat;
                window.app.currentLon = this.currentLon;
                window.app.currentLocationName = this.currentLocationName;
              }
            },
            (err) => {
              console.log("GPS auto-detect skipped, using default farm location:", err.message);
            },
            { timeout: 5000, maximumAge: 60000 }
          );
        }
      } catch (e) {
        console.warn("Init location detection notice:", e);
      }
    }, 500);
  }

  setupEventListeners() {
    // 1. Language option clicks in Screen 1
    document.querySelectorAll(".kbv-lang-option").forEach(el => {
      el.addEventListener("click", () => {
        document.querySelectorAll(".kbv-lang-option").forEach(o => o.classList.remove("active"));
        el.classList.add("active");
        const lang = el.getAttribute("data-lang");
        this.setLanguage(lang);
      });
      el.addEventListener("dblclick", () => {
        const lang = el.getAttribute("data-lang");
        this.setLanguage(lang);
        this.goToScreen(4);
      });
    });

    // 2. Language dropdown in website navbar
    const navLangSelect = document.getElementById("kbvNavLangSelect");
    if (navLangSelect) {
      navLangSelect.addEventListener("change", (e) => {
        this.setLanguage(e.target.value);
        document.querySelectorAll(".kbv-lang-option").forEach(o => {
          if (o.getAttribute("data-lang") === e.target.value) o.classList.add("active");
          else o.classList.remove("active");
        });
      });
    }

    // 3. Screen 1 Continue Button -> Proceeds directly to Live Farm Dashboard (Screen 4)
    // (Inline onclick already calls window.kbvApp.goToScreen(4))

    // 4. Back buttons
    document.querySelectorAll(".kbv-back-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = parseInt(btn.getAttribute("data-back-target") || (this.currentScreen - 1));
        this.goToScreen(Math.max(1, target));
      });
    });

    // 5. Website Header Page Tabs
    document.querySelectorAll(".kbv-nav-tab[data-page]").forEach(tab => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-page");
        if (target) this.goToScreen(target);
      });
    });
    document.querySelectorAll(".kbv-web-tab[data-screen]").forEach(tab => {
      tab.addEventListener("click", () => {
        const target = parseInt(tab.getAttribute("data-screen"));
        if (target) this.goToScreen(target);
      });
    });

    // 6. Crop quick chips (sync active visual state)
    document.querySelectorAll(".kbv-crop-chip").forEach(el => {
      if (el.getAttribute("onclick")) return;
      el.addEventListener("click", () => {
        const crop = el.getAttribute("data-crop");
        if (crop) this.setCropSelection(crop);
      });
    });

    // Dashboard Direct Controls: Location Search
    const dashLocInput = document.getElementById("kbvDashLocSearchInput");
    const dashLocDropdown = document.getElementById("kbvDashLocSearchDropdown");
    let dashLocTimer = null;
    if (dashLocInput && dashLocDropdown) {
      dashLocInput.addEventListener("input", (e) => {
        clearTimeout(dashLocTimer);
        const q = e.target.value.trim();
        if (q.length < 2) {
          dashLocDropdown.style.display = "none";
          return;
        }
        dashLocTimer = setTimeout(async () => {
          try {
            const res = await window.ApiClient.searchLocation(q);
            const results = (res && res.results) || [];
            if (results.length > 0) {
              dashLocDropdown.innerHTML = results.map(r => `
                <div class="kbv-search-item" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${r.name}">
                  ${typeof window.kbvIcon === "function" ? window.kbvIcon("pin", 13) : ""} <b>${r.name.split(',')[0]}</b> <span style="font-size:0.75rem; color:#4F5E46;">${r.name.split(',').slice(1, 4).join(',')}</span>
                </div>
              `).join("");
              dashLocDropdown.style.display = "block";
              dashLocDropdown.querySelectorAll(".kbv-search-item").forEach(item => {
                item.addEventListener("click", async (evt) => {
                  const lat = parseFloat(evt.currentTarget.getAttribute("data-lat"));
                  const lon = parseFloat(evt.currentTarget.getAttribute("data-lon"));
                  const name = evt.currentTarget.getAttribute("data-name");
                  dashLocInput.value = name.split(",").slice(0, 3).join(",");
                  dashLocDropdown.style.display = "none";
                  await this.selectFarmLocation(lat, lon, name);
                });
              });
            } else {
              dashLocDropdown.style.display = "none";
            }
          } catch (err) {
            console.warn("Dashboard search error:", err);
          }
        }, 300);
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest("#kbvDashLocSearchInput") && !e.target.closest("#kbvDashLocSearchDropdown")) {
          dashLocDropdown.style.display = "none";
        }
      });
    }

    // 14. Location Search Input with Autocomplete in Screen 3
    const locSearchInput = document.getElementById("kbvLocSearchInput");
    const locSearchDropdown = document.getElementById("kbvLocSearchDropdown");
    let locDebounceTimer = null;

    if (locSearchInput && locSearchDropdown) {
      locSearchInput.addEventListener("input", (e) => {
        clearTimeout(locDebounceTimer);
        const q = e.target.value.trim();
        if (q.length < 2) {
          locSearchDropdown.style.display = "none";
          return;
        }

        locDebounceTimer = setTimeout(async () => {
          try {
            const res = await window.ApiClient.searchLocation(q);
            const results = (res && res.results) || [];
            if (results.length > 0) {
              locSearchDropdown.innerHTML = results.map(r => `
                <div class="kbv-search-item" data-lat="${r.latitude}" data-lon="${r.longitude}" data-name="${r.name}">
                  ${typeof window.kbvIcon === "function" ? window.kbvIcon("pin", 13) : ""} <b>${r.name.split(',')[0]}</b> <span style="font-size:0.75rem; color:#4F5E46;">${r.name.split(',').slice(1, 4).join(',')}</span>
                </div>
              `).join("");
              locSearchDropdown.style.display = "block";

              locSearchDropdown.querySelectorAll(".kbv-search-item").forEach(item => {
                item.addEventListener("click", async (evt) => {
                  const lat = parseFloat(evt.currentTarget.getAttribute("data-lat"));
                  const lon = parseFloat(evt.currentTarget.getAttribute("data-lon"));
                  const name = evt.currentTarget.getAttribute("data-name");
                  locSearchInput.value = name.split(",").slice(0, 3).join(",");
                  locSearchDropdown.style.display = "none";
                  await this.selectFarmLocation(lat, lon, name);
                });
              });
            } else {
              locSearchDropdown.style.display = "none";
            }
          } catch (err) {
            console.warn("Search error:", err);
          }
        }, 300);
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest("#kbvLocSearchInput") && !e.target.closest("#kbvLocSearchDropdown")) {
          locSearchDropdown.style.display = "none";
        }
      });
    }
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    const navSelect = document.getElementById("kbvNavLangSelect");
    if (navSelect) navSelect.value = lang;
    
    // Apply translations across DOM
    this.applyTranslations();

    // Notify suitability renderer and modules manager if present
    if (window.suitabilityRenderer && typeof window.suitabilityRenderer.setLanguage === "function") {
      window.suitabilityRenderer.setLanguage(lang);
    }
    if (window.modulesManager && typeof window.modulesManager.setLanguage === "function") {
      window.modulesManager.setLanguage(lang);
    }
    if (window.app && typeof window.app.setLanguage === "function") {
      window.app.setLanguage(lang);
    }

    // Update risk legend text
    this.updateRiskLegend();
  }

  applyTranslations() {
    const t = KBV_TRANSLATIONS[this.currentLanguage] || KBV_TRANSLATIONS.en;
    
    // 1. Text elements with data-i18n (strip leading emojis so crisp SVG icons stay clean)
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (t[key]) {
        el.textContent = String(t[key]).replace(/^[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+\s*/u, "");
      }
    });

    const MANDI_PANEL_TITLES = {
      en: "APMC Mandi Market Prices & Profitability Calculator",
      hi: "एपीएमसी मंडी बाज़ार भाव और लाभप्रदता कैलकुलेटर",
      kn: "ಎಪಿಎಂಸಿ ಮಂಡಿ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಮತ್ತು ಲಾಭದಾಯಕತೆ ಕ್ಯಾಲ್ಕುಲೇಟರ್",
      mr: "एपीएमसी मंडी बाजारभाव आणि नफा कॅल्क्युलेटर",
      te: "ఏపీఎంసీ మండి మార్కెట్ ధరలు & లాభదాయకత క్యాలిక్యులేటర్",
      ta: "ஏபிஎம்சி மண்டி சந்தை விலை & லாபக் கணிப்பான்",
      gu: "એપીએમસી મંડી બજાર ભાવ અને નફા કેલ્ક્યુલેટર",
      bn: "এপিএমসি মান্ডি বাজার দর ও লাভের ক্যালকুলেটর",
      ml: "എപിഎംസി മണ്ഡി വിപണി വിലയും ലാഭ കണക്കുകൂട്ടലും",
      pa: "ਏਪੀਐਮਸੀ ਮੰਡੀ ਬਾਜ਼ਾਰ ਭਾਅ ਅਤੇ ਮੁਨਾਫ਼ਾ ਕੈਲਕੁਲੇਟਰ",
      or: "ଏପିଏମସି ମଣ୍ଡି ବଜାର ଦର ଏବଂ ଲାଭ କ୍ୟାଲକୁଲେଟର"
    };
    const mandiTitleEl = document.querySelector('[data-i18n="panel_mandi"]');
    if (mandiTitleEl) {
      mandiTitleEl.textContent = MANDI_PANEL_TITLES[this.currentLanguage] || MANDI_PANEL_TITLES.en;
    }

    // 2. Hero Title (preserve AgroNexus identity cleanly)
    const heroTitle = document.getElementById("kbvHeroTitle");
    if (heroTitle) {
      heroTitle.innerHTML = `Agro<span class="kbv-highlight">Nexus</span>`;
    }

    // 3. Localize Dashboard Crop Selector Options
    const dashCropSelect = document.getElementById("kbvDashCropSelect");
    if (dashCropSelect && dashCropSelect.options && t.crops) {
      Array.from(dashCropSelect.options).forEach(opt => {
        if (t.crops[opt.value]) {
          opt.textContent = t.crops[opt.value];
        }
      });
    }

    // 7. Localize 1 km² soil/weather profile (live data or comprehensive 11-language placeholders)
    if (window.app && window.app.analysisData) {
      if (typeof window.app.renderEnvironmentalCards === "function") {
        window.app.renderEnvironmentalCards(window.app.analysisData.environmental_data);
      }
    } else {
      const lang = this.currentLanguage || "en";
      const soilClassEl = document.getElementById("soilClassValue");
      if (soilClassEl) {
        soilClassEl.textContent = {
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
        }[lang] || "Red Sandy Loam (Alfisols)";
      }

      const soilPhEl = document.getElementById("soilPhValue");
      if (soilPhEl) {
        soilPhEl.textContent = {
          en: "6.8 pH (Optimal Neutral)",
          hi: "6.8 pH (इष्टतम तटस्थ)",
          kn: "6.8 pH (ಅತ್ಯುತ್ತಮ ತಟಸ್ಥ)",
          te: "6.8 pH (అనుకూల తటస్థం)",
          ta: "6.8 pH (உகந்த நடுநிலை)",
          mr: "6.8 pH (इष्टतम तटस्थ)",
          gu: "6.8 pH (શ્રેષ્ઠ તટસ્થ)",
          bn: "6.8 pH (অনুকূল নিরপেক্ষ)",
          ml: "6.8 pH (അനുയോജ്യമായ ന്യൂട്രൽ)",
          pa: "6.8 pH (ਅਨੁਕੂਲ ਨਿਰਪੱਖ)",
          or: "6.8 pH (ଅନୁକୂଳ ତଟସ୍ଥ)"
        }[lang] || "6.8 pH (Optimal Neutral)";
      }

      const soilTexEl = document.getElementById("soilTextureValue");
      if (soilTexEl) {
        soilTexEl.textContent = {
          en: "Sandy Clay Loam (Well Drained)",
          hi: "बलुई चिकनी दोमट (उत्तम जल निकासी)",
          kn: "ಮರಳು ಜೇಡಿ ಮಣ್ಣು (ಉತ್ತಮ ಒಳಚರಂಡಿ)",
          te: "ఇసుక బంకమట్టి నేల (మంచి నీటి పారుదల)",
          ta: "மணல் களிமண் வண்டல் (நல்ல வடிகால்)",
          mr: "वाळूयुक्त चिकणमाती (उत्तम निचरा)",
          gu: "રેતાળ માટીવાળી ગોરાડુ (સારી નિતાર)",
          bn: "বেলে এঁটেল দোআঁশ (উত্তম নিকাশী)",
          ml: "മണൽ കളിമൺ പശിമരാശി (നല്ല ഡ്രെയിനേജ്)",
          pa: "ਰੇਤਲੀ ਚੀਕਣੀ ਦੋਮਟ (ਵਧੀਆ ਨਿਕਾਸ)",
          or: "ବାଲିଆ କାଦୁଅ ଦୋରସା (ଉତ୍ତମ ଜଳ ନିଷ୍କାସନ)"
        }[lang] || "Sandy Clay Loam (Well Drained)";
      }

      const weatherTempEl = document.getElementById("weatherTempValue");
      if (weatherTempEl) {
        weatherTempEl.textContent = {
          en: "28.5°C (Min 22°C / Max 33°C)",
          hi: "28.5°C (न्यूनतम 22°C / अधिकतम 33°C)",
          kn: "28.5°C (ಕನಿಷ್ಠ 22°C / ಗರಿಷ್ಠ 33°C)",
          te: "28.5°C (కనిష్టం 22°C / గరిష్టం 33°C)",
          ta: "28.5°C (குறைந்தபட்சம் 22°C / அதிகபட்சம் 33°C)",
          mr: "28.5°C (किमान 22°C / कमाल 33°C)",
          gu: "28.5°C (ન્યૂનતમ 22°C / મહત્તમ 33°C)",
          bn: "28.5°C (নূন্যতম 22°C / সর্বোচ্চ 33°C)",
          ml: "28.5°C (കുറഞ്ഞത് 22°C / കൂടിയത് 33°C)",
          pa: "28.5°C (ਘੱਟੋ-ਘੱਟ 22°C / ਵੱਧ ਤੋਂ ਵੱਧ 33°C)",
          or: "28.5°C (ସର୍ବନିମ୍ନ 22°C / ସର୍ବାଧିକ 33°C)"
        }[lang] || "28.5°C (Min 22°C / Max 33°C)";
      }

      const elevEl = document.getElementById("terrainElevValue");
      if (elevEl) {
        elevEl.textContent = {
          en: "920m a.s.l.",
          hi: "920 मीटर (समुद्र तल)",
          kn: "920 ಮೀಟರ್ (ಸಮುದ್ರ ಮಟ್ಟದಿಂದ)",
          te: "920 మీటర్లు (సముద్ర మట్టం)",
          ta: "920 மீட்டர் (கடல் மட்டம்)",
          mr: "920 मीटर (समुद्र सपाटी)",
          gu: "920 મીટર (સમુદ્ર સપાટી)",
          bn: "৯২০ মিটার (সমুদ্রপৃষ্ঠ)",
          ml: "920 മീറ്റർ (സമുദ്രനിരപ്പ്)",
          pa: "920 ਮੀਟਰ (ਸਮੁੰਦਰ ਤਲ)",
          or: "୯୨୦ ମିଟର (ସମୁଦ୍ର ପତ୍ତନ)"
        }[lang] || "920m a.s.l.";
      }

      const slopeEl = document.getElementById("terrainSlopeValue");
      if (slopeEl) {
        slopeEl.textContent = {
          en: "1.8% (Gentle Slope)",
          hi: "1.8% (हल्की ढलान)",
          kn: "1.8% (ಸೌಮ್ಯ ಇಳಿಜಾರು)",
          te: "1.8% (సాధారణ వాలు)",
          ta: "1.8% (லேசான சரிவு)",
          mr: "1.8% (मंद उतार)",
          gu: "1.8% (હળવો ઢોળાવ)",
          bn: "1.8% (মৃদু ঢাল)",
          ml: "1.8% (സൗമ്യമായ ചരിവ്)",
          pa: "1.8% (ਹਲਕੀ ਢਲਾਣ)",
          or: "1.8% (ସାଧାରଣ ଢାଲୁ)"
        }[lang] || "1.8%";
      }
    }
  }

  updateRiskLegend() {
    const t = KBV_TRANSLATIONS[this.currentLanguage] || KBV_TRANSLATIONS.en;
    const highEl = document.getElementById("kbvHighRiskLegend");
    const modEl = document.getElementById("kbvModRiskLegend");
    const lowEl = document.getElementById("kbvLowRiskLegend");
    if (highEl) highEl.textContent = t.high_risk;
    if (modEl) modEl.textContent = t.mod_risk;
    if (lowEl) lowEl.textContent = t.low_risk;
  }

  goToScreen(screenNum) {
    // If user requests Screen 2 or 3, redirect directly to Screen 4 (Dashboard)
    if (screenNum === 2 || screenNum === 3) {
      screenNum = 4;
    }
    this.currentScreen = screenNum;
    this.updateScreenVisibility();

    // Scroll window smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // If opening Screen 4 (Live Farm Dashboard), initialize risk map and trigger workflow
    if (screenNum === 4) {
      setTimeout(() => {
        const lat = (window.app && window.app.currentLat) || this.currentLat || 12.9571;
        const lon = (window.app && window.app.currentLon) || this.currentLon || 77.5325;
        this.initOrUpdateRiskMap(lat, lon);
      }, 120);

      // Trigger analysis workflow if not already run
      if (!this.analysisResult) {
        setTimeout(async () => {
          try {
            await this.runAnalysisWorkflow();
          } catch (e) {
            console.warn("Auto-analysis notice:", e);
          }
        }, 200);
      }
    }
  }

  updateScreenVisibility() {
    const s1 = document.getElementById("kbvScreen1");
    const s2 = document.getElementById("kbvScreen2");
    const s3 = document.getElementById("kbvScreen3");
    const s4 = document.getElementById("kbvScreen4");
    const headerNav = document.getElementById("kbvHeaderFeatureNav");
    const dashTabs = document.getElementById("kbvDashboardTabs");

    if (this.currentScreen === 1) {
      // Screen 1: Dedicated Select Language Page
      if (s1) s1.style.display = "block";
      if (s2) s2.style.display = "none";
      if (s3) s3.style.display = "none";
      if (s4) s4.style.display = "none";
      if (headerNav) headerNav.style.display = "none";
      if (dashTabs) dashTabs.style.display = "none";
    } else {
      // Screen 4: Refined KBV Heritage Editorial Dashboard
      if (s1) s1.style.display = "none";
      if (s2) s2.style.display = "none";
      if (s3) s3.style.display = "none";
      if (s4) s4.style.display = "block";
      if (headerNav) headerNav.style.display = "flex";
      if (dashTabs) dashTabs.style.display = "flex";
      this.switchDashboardTab(this.activeDashboardTab || "map");
    }
  }

  switchDashboardTab(tabName) {
    this.activeDashboardTab = tabName || "map";
    document.querySelectorAll("#kbvDashboardTabs .kbv-nav-tab").forEach(btn => {
      if (btn.getAttribute("data-tab-view") === this.activeDashboardTab) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    document.querySelectorAll(".kbv-editorial-tab-panel").forEach(panel => {
      if (panel.id === `kbvTab_${this.activeDashboardTab}`) {
        panel.classList.add("active");
      } else {
        panel.classList.remove("active");
      }
    });

    if (this.activeDashboardTab === "map") {
      setTimeout(() => {
        if (this.riskMap) this.riskMap.invalidateSize();
      }, 80);
    } else if (["irrigation", "mandi", "doctor"].includes(this.activeDashboardTab)) {
      if (window.modulesManager) {
        if (window.modulesManager.modulesData) {
          window.modulesManager.render();
        } else {
          const lat = this.currentLat || (window.app && window.app.currentLat) || 12.9571;
          const lon = this.currentLon || (window.app && window.app.currentLon) || 77.5325;
          window.modulesManager.loadModules(lat, lon).catch(e => console.warn("Tab module load notice:", e));
        }
      }
    }
  }

  setCropSelection(cropKey) {
    this.selectedCrop = cropKey;
    const dashCropSelect = document.getElementById("kbvDashCropSelect");
    if (dashCropSelect) dashCropSelect.value = cropKey;

    document.querySelectorAll(".kbv-crop-chip").forEach(el => {
      const isMatch = el.getAttribute("data-crop") === cropKey;
      el.classList.toggle("active", isMatch);
      el.style.background = "";
      el.style.borderColor = "";
      el.style.color = "";
    });

    // Dynamically synchronize Mandi Market Price, Irrigation & AI Crop Doctor Modules
    if (window.modulesManager) {
      const cropName = cropKey.charAt(0).toUpperCase() + cropKey.slice(1);
      const lat = this.currentLat || (window.app && window.app.currentLat) || 12.9571;
      const lon = this.currentLon || (window.app && window.app.currentLon) || 77.5325;
      const env = (window.app && window.app.analysisData && window.app.analysisData.environmental_data) || {};
      const ctx = {
        lat,
        lon,
        locationName: this.currentLocationName
      };
      if (env.soil) {
        ctx.ph = env.soil.ph;
        ctx.texture = env.soil.texture_class;
      }
      if (env.weather) {
        ctx.temperature = env.weather.average_temperature;
      }
      window.modulesManager.setCrop(cropKey, cropName, ctx);
      window.modulesManager.loadModules(lat, lon).catch(e => console.warn("Module sync notice:", e));
    }
  }

  setUploadedImage(imageSrc) {
    this.uploadedImageSrc = imageSrc;
    const preview = document.getElementById("kbvUploadPreview");
    if (preview) {
      preview.src = imageSrc;
      preview.style.display = "block";
    }
  }

  async detectLocationForAnalysis() {
    const locBtn = document.getElementById("kbvUseLocationBtn");
    const dashLocBtn = document.getElementById("kbvDashUseLocBtn");
    const dashOrigHtml = dashLocBtn ? dashLocBtn.innerHTML : "";
    const t = KBV_TRANSLATIONS[this.currentLanguage] || KBV_TRANSLATIONS.en;
    
    if (locBtn) {
      locBtn.innerHTML = `<span>${t.locating}</span>`;
      locBtn.disabled = true;
    }
    if (dashLocBtn) {
      dashLocBtn.innerHTML = `<span>${t.locating}</span>`;
      dashLocBtn.disabled = true;
    }

    try {
      let lat = this.currentLat || 12.9571;
      let lon = this.currentLon || 77.5325;
      let locDesc = this.currentLocationName || "Bengaluru, Karnataka";

      if (window.app && window.app.mapManager) {
        try {
          const loc = await window.app.mapManager.detectBrowserLocation();
          lat = loc.lat;
          lon = loc.lon;
          locDesc = loc.source;
        } catch (e) {
          console.warn("Location detect notice:", e);
        }
      }

      if (window.ApiClient) {
        const rev = await window.ApiClient.reverseGeocode(lat, lon);
        if (rev && rev.location_name) {
          locDesc = rev.location_name.split(",").slice(0, 3).join(",");
        }
      }

      this.currentLat = lat;
      this.currentLon = lon;
      this.currentLocationName = locDesc;
      this.updateLocationDisplays(lat, lon, locDesc);
      this.initOrUpdateRiskMap(lat, lon);

      if (window.app) {
        window.app.currentLat = lat;
        window.app.currentLon = lon;
        window.app.currentLocationName = locDesc;
        await window.app.runAnalysis(lat, lon);
      }

      this.showToast(`Location synchronized: ${locDesc}`, 4000);
    } catch (err) {
      console.warn("Location error:", err);
      this.showToast("Using agricultural coordinate grid.", 3000);
    } finally {
      if (locBtn) {
        locBtn.innerHTML = `<span>${t.use_curr_loc}</span>`;
        locBtn.disabled = false;
      }
      if (dashLocBtn) {
        const gpsIc = typeof window.kbvIcon === "function" ? window.kbvIcon("gps", 15) : "";
        dashLocBtn.innerHTML = dashOrigHtml || `${gpsIc} <span>Detect GPS</span>`;
        dashLocBtn.disabled = false;
      }
    }
  }

  async runAnalysisWorkflow() {
    const dashAnalyzeBtn = document.getElementById("kbvDashAnalyzeBtn");
    const origBtnHtml = dashAnalyzeBtn ? dashAnalyzeBtn.innerHTML : "";
    if (dashAnalyzeBtn) {
      dashAnalyzeBtn.innerHTML = `Analyzing...`;
      dashAnalyzeBtn.disabled = true;
    }

    try {
      const cropKey = this.selectedCrop || "tomato";
      const lat = (window.app && window.app.currentLat) || this.currentLat || 12.9571;
      const lon = (window.app && window.app.currentLon) || this.currentLon || 77.5325;

      // Run 1 km² Geo-Spatial Analysis and populate pedology, climate, remote sensing, and top crops
      if (window.app && window.app.runAnalysis) {
        try {
          if (typeof window.app.setLanguage === "function") {
            window.app.setLanguage(this.currentLanguage);
          }
          await window.app.runAnalysis(lat, lon);
          if (typeof window.app.handleCropSelected === "function") {
            await window.app.handleCropSelected(cropKey);
          }
        } catch (err) {
          console.warn("Geospatial analysis call notice:", err);
        }
      }

      if (window.app && window.app.analysisData) {
        window.lastAnalysisData = window.app.analysisData;
      }
      this.analysisResult = { crop: cropKey, timestamp: Date.now() };
    } catch (workflowErr) {
      console.error("Workflow execution notice:", workflowErr);
    } finally {
      if (dashAnalyzeBtn) {
        const boltIc = typeof window.kbvIcon === "function" ? window.kbvIcon("bolt", 14) : "";
        dashAnalyzeBtn.innerHTML = origBtnHtml || `${boltIc} <span>Analyze</span>`;
        dashAnalyzeBtn.disabled = false;
      }
      this.goToScreen(4);
    }
  }

  renderAnalysisResult() {
    // Legacy disease card removed; dashboard updates via AgroCloudApp & ModulesManager.
  }

  initOrUpdateRiskMap(lat, lon) {
    const container = document.getElementById("kbvRiskMapContainer");
    if (!container) return;

    lat = lat || (window.app && window.app.currentLat) || 12.9571;
    lon = lon || (window.app && window.app.currentLon) || 77.5325;

    // Check if Leaflet is loaded
    if (typeof L === "undefined") {
      console.warn("Leaflet library not ready yet.");
      return;
    }

    try {
      // If already initialized on this container, just pan and refresh
      if (this.riskMap) {
        this.riskMap.setView([lat, lon], 15);
      } else {
        // If DOM node has a previous leaflet id from another instance, clean it safely
        if (container._leaflet_id) {
          try {
            container._leaflet_id = null;
            container.innerHTML = "";
          } catch (e) {
            console.warn("Leaflet container reset:", e);
          }
        }

        this.riskMap = L.map("kbvRiskMapContainer", {
          center: [lat, lon],
          zoom: 15,
          zoomControl: true,
          attributionControl: false
        });

        // 1. Modern High-Resolution Google Hybrid Satellite Layer (Updated imagery + village/road labels)
        const googleHybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          attribution: '&copy; Google Maps'
        });

        // 2. Google Street Map Layer (Modern high-contrast roads and landmarks)
        const googleStreets = L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
          attribution: '&copy; Google Maps'
        });

        // 3. ESRI Clarity World Imagery (Alternative satellite view)
        const esriSat = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 19,
          attribution: '&copy; Esri World Imagery'
        });

        // 4. CartoDB Modern Voyager
        const cartoVoyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png', {
          maxZoom: 19,
          attribution: '&copy; CartoDB Voyager'
        });

        // Add Google Hybrid as primary default
        googleHybrid.addTo(this.riskMap);

        // Modern layer selector control
        L.control.layers({
          "🛰️ Google Satellite + Labels (Updated)": googleHybrid,
          "🗺️ Google Street & Roads": googleStreets,
          "🌍 Esri Satellite Clarity": esriSat,
          "🏙️ CartoDB Voyager": cartoVoyager
        }, null, { position: "topright" }).addTo(this.riskMap);
      }

      // Clear previous vector layers
      if (this.riskLayers) {
        this.riskMap.removeLayer(this.riskLayers);
      }
      this.riskLayers = L.layerGroup().addTo(this.riskMap);

      // A. Calculate true 1.00 km x 1.00 km geodesic boundary polygon
      const deltaLat = 500 / 111320;
      const deltaLon = 500 / (111320 * Math.cos(lat * Math.PI / 180));
      const nw = [lat + deltaLat, lon - deltaLon];
      const ne = [lat + deltaLat, lon + deltaLon];
      const se = [lat - deltaLat, lon + deltaLon];
      const sw = [lat - deltaLat, lon - deltaLon];

      L.polygon([nw, ne, se, sw], {
        color: '#FFFFFF',
        weight: 2.5,
        dashArray: '6, 6',
        fillColor: '#2D5A27',
        fillOpacity: 0.08
      }).addTo(this.riskLayers).bindTooltip("1.0 km × 1.0 km Geodesic Boundary (100 Hectares / 247.1 Acres)", { permanent: false });

      // B. 3 Concentric Risk Zones (500m Low Risk, 350m Moderate Risk, 180m High Risk)
      L.circle([lat, lon], {
        radius: 500,
        color: '#2D5A27',
        weight: 2,
        fillColor: '#6B9433',
        fillOpacity: 0.22
      }).addTo(this.riskLayers);

      L.circle([lat, lon], {
        radius: 350,
        color: '#D97706',
        weight: 2,
        fillColor: '#D97706',
        fillOpacity: 0.32
      }).addTo(this.riskLayers);

      L.circle([lat, lon], {
        radius: 180,
        color: '#B91C1C',
        weight: 2,
        fillColor: '#B91C1C',
        fillOpacity: 0.45
      }).addTo(this.riskLayers);

      // C. Centroid Farm Marker Pin
      const pinSvg = typeof window.kbvIcon === "function" ? window.kbvIcon("pin", 13) : "";
      const centerIcon = L.divIcon({
        className: 'kbv-map-pin',
        html: `<div style="background:#2D5A27; width:24px; height:24px; border-radius:50%; border:3px solid #F0EEE9; box-shadow:0 0 16px rgba(45,90,39,0.75); display:flex; align-items:center; justify-content:center; color:#FFFFFF;">${pinSvg}</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      const locTitle = this.currentLocationName || "Your Field Location";
      L.marker([lat, lon], { icon: centerIcon })
        .addTo(this.riskLayers)
        .bindPopup(`<div style="font-family:sans-serif; min-width:180px;"><b style="color:#2D5A27; font-size:13px;">${locTitle}</b><br><span style="font-size:11px; color:#4F5E46;">${lat.toFixed(5)}°N, ${lon.toFixed(5)}°E</span><br><span style="display:inline-block; margin-top:4px; background:#F0EEE9; padding:2px 6px; border-radius:4px; font-size:11px; font-weight:bold; color:#2D5A27;">1 km² Active Analysis Grid</span></div>`)
        .openPopup();

      // D. Multiple invalidateSize timeouts to ensure tiles render perfectly even with CSS transitions
      setTimeout(() => { if (this.riskMap) this.riskMap.invalidateSize(); }, 60);
      setTimeout(() => { if (this.riskMap) this.riskMap.invalidateSize(); }, 200);
      setTimeout(() => { if (this.riskMap) this.riskMap.invalidateSize(); }, 500);

      // E. Update dynamic legend percentages
      this.updateRiskLegend();
    } catch (err) {
      console.error("Leaflet risk map error:", err);
    }
  }

  updateLocationDisplays(lat, lon, name) {
    this.currentLocationName = name;
    
    // Screen 3 Location Card elements
    const locNameEl = document.getElementById("kbvFetchedLocationName");
    if (locNameEl) locNameEl.textContent = name;
    
    const locCoordsEl = document.getElementById("kbvFetchedCoords");
    if (locCoordsEl) locCoordsEl.textContent = `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E • 100 Hectares (247.1 Acres)`;
    
    const locDisplay = document.getElementById("kbvLocationDisplay");
    if (locDisplay) locDisplay.textContent = `📍 ${name} (${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E)`;
    
    const statusPill = document.getElementById("kbvLocStatusPill");
    if (statusPill) {
      statusPill.textContent = "Synced";
      statusPill.style.background = "rgba(45,90,39,0.12)";
      statusPill.style.color = "#2D5A27";
    }

    // Dedicated Pages Location Labels
    const s4LocText = document.getElementById("kbvScreen4LocationText");
    if (s4LocText) s4LocText.textContent = name;
    
    const s4CoordsText = document.getElementById("kbvScreen4CoordsText");
    if (s4CoordsText) s4CoordsText.textContent = `${lat.toFixed(4)}°N, ${lon.toFixed(4)}°E • 100 Hectares (247.1 Acres)`;
    
    const soilLoc = document.getElementById("kbvSoilLocName");
    if (soilLoc) soilLoc.textContent = name;

    ["kbvCropsLocLabel", "kbvSoilLocLabel", "kbvIrrigationLocLabel", "kbvMandiLocLabel", "kbvDoctorLocLabel"].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = name;
    });

    const mapTitle = document.getElementById("kbvMapTitleText");
    if (mapTitle) {
      const t = KBV_TRANSLATIONS[this.currentLanguage] || KBV_TRANSLATIONS.en;
      mapTitle.textContent = `${t.risk_map_title || '1 km² Area Risk Map'} — ${name}`;
    }
  }

  async selectFarmLocation(lat, lon, name) {
    this.currentLat = lat;
    this.currentLon = lon;
    this.currentLocationName = name;
    if (window.app) {
      window.app.currentLat = lat;
      window.app.currentLon = lon;
      window.app.currentLocationName = name;
      await window.app.handleLocationChanged(lat, lon);
    }
    this.updateLocationDisplays(lat, lon, name);
    this.initOrUpdateRiskMap(lat, lon);

    // Synchronize Mandi Market & Modules to newly selected location
    if (window.modulesManager) {
      const cropKey = this.selectedCrop || "tomato";
      const cropName = cropKey.charAt(0).toUpperCase() + cropKey.slice(1);
      window.modulesManager.setCrop(cropKey, cropName, { lat, lon, locationName: name });
      window.modulesManager.loadModules(lat, lon).catch(e => console.warn("Module loc sync notice:", e));
    }
    this.showToast(`📍 Farm Location set to: ${name}`, 4000);
  }

  setMapLayerMode(mode) {
    this.currentMapMode = mode;
    if (!this.riskMap || !this.riskLayers) return;

    this.riskLayers.clearLayers();

    const lat = this.currentLat || (window.app && window.app.currentLat) || 12.9571;
    const lon = this.currentLon || (window.app && window.app.currentLon) || 77.5325;
    const deltaLat = 500 / 111320;
    const deltaLon = 500 / (111320 * Math.cos(lat * Math.PI / 180));
    const nw = [lat + deltaLat, lon - deltaLon];
    const ne = [lat + deltaLat, lon + deltaLon];
    const se = [lat - deltaLat, lon + deltaLon];
    const sw = [lat - deltaLat, lon - deltaLon];

    // 1. Geodesic 1km square boundary outline
    L.polygon([nw, ne, se, sw], {
      color: '#FFFFFF',
      weight: 2.5,
      dashArray: '6, 6',
      fillColor: 'transparent'
    }).addTo(this.riskLayers).bindTooltip("1.0 km × 1.0 km Geodesic Boundary", { permanent: false });

    // 2. Render 5x5 sub-cells if mode is ndvi, ndwi, soil, elevation
    if (mode === "ndvi" || mode === "ndwi" || mode === "soil" || mode === "elevation") {
      const env = (window.app && window.app.analysisData && window.app.analysisData.environmental_data) || {};
      const rs = env.remote_sensing || {};
      const soilData = env.soil || {};
      const terrainData = env.terrain || {};
      const subNdvi = rs.subgrid_ndvi || [];
      const subNdwi = rs.subgrid_ndwi || [];
      const subSoil = soilData.subgrid_analysis || [];
      const subTerrain = terrainData.subgrid_elevations || [];

      for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
          const idx = (r * 5) + c;
          const c_s = lat - deltaLat + (r * (2 * deltaLat / 5));
          const c_n = c_s + (2 * deltaLat / 5);
          const c_w = lon - deltaLon + (c * (2 * deltaLon / 5));
          const c_e = c_w + (2 * deltaLon / 5);

          let fillColor = "#16a34a";
          let fillOpacity = 0.52;
          let popupText = "";

          if (mode === "ndvi") {
            const ndviVal = (subNdvi[idx] && subNdvi[idx].ndvi !== undefined) ? subNdvi[idx].ndvi : +(0.55 + (Math.sin(idx * 1.5) * 0.18)).toFixed(2);
            fillColor = ndviVal >= 0.65 ? "#16a34a" : (ndviVal >= 0.45 ? "#65a30d" : (ndviVal >= 0.25 ? "#ca8a04" : "#dc2626"));
            popupText = `<b>Sentinel-2 NDVI: ${ndviVal}</b><br>Canopy Vigor: ${ndviVal >= 0.65 ? 'Dense Healthy' : (ndviVal >= 0.45 ? 'Moderate' : 'Stressed')}<br>Cell: ${r+1}, ${c+1} (4 Hectares)`;
          } else if (mode === "ndwi") {
            const ndwiVal = (subNdwi[idx] && subNdwi[idx].ndwi !== undefined) ? subNdwi[idx].ndwi : +(0.12 + (Math.cos(idx * 1.2) * 0.12)).toFixed(2);
            fillColor = ndwiVal >= 0.20 ? "#0284c7" : (ndwiVal >= 0.0 ? "#0d9488" : (ndwiVal >= -0.20 ? "#d97706" : "#b91c1c"));
            popupText = `<b>Sentinel-2 NDWI: ${ndwiVal}</b><br>Moisture: ${ndwiVal >= 0.15 ? 'Optimal Hydration' : (ndwiVal >= 0.0 ? 'Mild Deficit' : 'Moisture Stress')}<br>Cell: ${r+1}, ${c+1} (4 Hectares)`;
          } else if (mode === "soil") {
            const sCell = subSoil[idx] || {};
            const phVal = sCell.ph !== undefined ? sCell.ph : +((soilData.ph || 6.8) + ((r - 2) * 0.08) - ((c - 2) * 0.04)).toFixed(2);
            const tex = sCell.texture_class || soilData.texture_class || "Clay Loam";
            const drain = soilData.drainage || "Well Drained";
            fillColor = phVal < 6.0 ? "#f97316" : (phVal <= 7.8 ? "#06b6d4" : "#8b5cf6");
            popupText = `<b>Soil pH: ${phVal}</b><br>Texture: ${tex} (${drain})<br>Cell: ${r+1}, ${c+1}`;
          } else {
            const tCell = subTerrain[idx] || {};
            const slopeVal = tCell.slope_pct !== undefined ? tCell.slope_pct : +((terrainData.slope_pct || 1.4) + (r * 0.15)).toFixed(2);
            const elevVal = tCell.elevation_m !== undefined ? tCell.elevation_m : Math.round((terrainData.elevation_m || 520) + (r * 3));
            fillColor = slopeVal < 2.0 ? "#10b981" : (slopeVal < 4.5 ? "#3b82f6" : "#eab308");
            popupText = `<b>Slope Gradient: ${slopeVal}%</b><br>Micro-Elevation: ${elevVal}m<br>Cell: ${r+1}, ${c+1}`;
          }

          const cellBounds = [[c_s, c_w], [c_n, c_e]];
          L.rectangle(cellBounds, {
            color: '#F0EEE9',
            weight: 1,
            fillColor: fillColor,
            fillOpacity: fillOpacity
          }).addTo(this.riskLayers).bindPopup(popupText);
        }
      }
    } else {
      // Default: Concentric risk zones
      L.circle([lat, lon], { radius: 500, color: '#2D5A27', weight: 2, fillColor: '#6B9433', fillOpacity: 0.22 }).addTo(this.riskLayers);
      L.circle([lat, lon], { radius: 350, color: '#D97706', weight: 2, fillColor: '#D97706', fillOpacity: 0.32 }).addTo(this.riskLayers);
      L.circle([lat, lon], { radius: 180, color: '#B91C1C', weight: 2, fillColor: '#B91C1C', fillOpacity: 0.45 }).addTo(this.riskLayers);
    }

    // Centroid Pin
    const pinSvg = typeof window.kbvIcon === "function" ? window.kbvIcon("pin", 13) : "";
    const centerIcon = L.divIcon({
      className: 'kbv-map-pin',
      html: `<div style="background:#2D5A27; width:24px; height:24px; border-radius:50%; border:3px solid #F0EEE9; box-shadow:0 0 16px rgba(45,90,39,0.75); display:flex; align-items:center; justify-content:center; color:#FFFFFF;">${pinSvg}</div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
    L.marker([lat, lon], { icon: centerIcon })
      .addTo(this.riskLayers)
      .bindPopup(`<b style="color:#2D5A27;">${this.currentLocationName || 'Field Location'}</b><br>${lat.toFixed(5)}°N, ${lon.toFixed(5)}°E`);

    this.showToast(`Active Map Layer: ${mode.toUpperCase()}`, 2500);
  }

    openNdviMap() {
    this.goToScreen(4);
    this.switchDashboardTab("map");
    setTimeout(() => {
      const ndviBtn = document.getElementById("layerBtnNdvi");
      if (typeof window.switchMapLayer === "function") {
        window.switchMapLayer("ndvi", ndviBtn);
      }
    }, 200);
  }

  openNdwiMap() {
    this.goToScreen(4);
    this.switchDashboardTab("map");
    setTimeout(() => {
      const ndwiBtn = document.getElementById("layerBtnNdwi");
      if (typeof window.switchMapLayer === "function") {
        window.switchMapLayer("ndwi", ndwiBtn);
      }
    }, 200);
  }

  async openMandiProfit() {
    this.goToScreen(4);
    const lat = (window.app && window.app.currentLat) || this.currentLat || 12.9571;
    const lon = (window.app && window.app.currentLon) || this.currentLon || 77.5325;
    if (window.app && !window.app.analysisData) {
      await window.app.runAnalysis(lat, lon);
    }
    this.switchDashboardTab("mandi");
  }

  async openVoiceDoctor() {
    this.goToScreen(4);
    const lat = (window.app && window.app.currentLat) || this.currentLat || 12.9571;
    const lon = (window.app && window.app.currentLon) || this.currentLon || 77.5325;
    if (window.app && !window.app.analysisData) {
      await window.app.runAnalysis(lat, lon);
    }
    this.switchDashboardTab("doctor");
  }

  downloadHealthCard() {
    this.saveReport();
  }

  saveReport() {
    let analysisData = (window.app && (window.app.analysisData || window.app.lastAnalysisData)) || window.lastAnalysisData;
    const modulesData = window.modulesManager ? window.modulesManager.modulesData : null;
    const lat = (window.app && window.app.currentLat) || this.currentLat || 12.9571;
    const lon = (window.app && window.app.currentLon) || this.currentLon || 77.5325;

    if (!analysisData && window.ApiClient && typeof window.ApiClient.fallbackAnalyze === "function") {
      analysisData = window.ApiClient.fallbackAnalyze(lat, lon);
      window.lastAnalysisData = analysisData;
    }

    if (window.farmReportGenerator && analysisData) {
      window.farmReportGenerator.generateReport(analysisData, modulesData);
      this.showToast("📄 Digital Farm Health Card PDF ready for print/download!", 4000);
      return;
    }
    const cropName = (this.selectedCrop || "tomato").toUpperCase();
    const soil = (analysisData && analysisData.environmental_data && analysisData.environmental_data.soil) || {};
    const reportText = `
======================================================
  AGROCLOUD AI - KBV 1 KM² FARM HEALTH REPORT
======================================================
Generated: ${new Date().toLocaleString()}
Selected Crop: ${cropName}
Soil Classification: ${soil.soil_classification || "Regional Soil Profile"}
Soil pH: ${soil.ph || "N/A"}
Analysis Boundary: 1.0 km² Geodesic Area (100 Hectares / 247.1 Acres)
Target Coordinates: ${lat}°N, ${lon}°E
======================================================
100% Software-Based • No IoT / Hardware Sensors Required
AgroCloud AI Geospatial Pedology & Climatology Engine
======================================================
    `.trim();

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KBV_${cropName}_Farm_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);

    this.showToast("📄 Report downloaded successfully!", 3500);
  }

  showToast(message, duration = 3000) {
    const toast = document.getElementById("kbvToast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, duration);
  }
}

window.KBVApp = KBVApp;

/**
 * Shared image upload & camera capture controller for Field Map & AI Crop Doctor.
 */
window.kbvMedia = {
  currentImage: null,
  _stream: null,
  _bound: false,

  _ensureBound() {
    if (this._bound) return;
    this._bound = true;

    const handleFile = (file, sourceLabel) => {
      if (!file || !file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.setImage(ev.target.result, file.name || "field_photo.jpg", sourceLabel);
      };
      reader.readAsDataURL(file);
    };

    const fileInput = document.getElementById("kbvFieldImageInput");
    if (fileInput) {
      fileInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) handleFile(e.target.files[0], "Uploaded Image");
        e.target.value = "";
      });
    }

    const camInput = document.getElementById("kbvFieldCameraInput");
    if (camInput) {
      camInput.addEventListener("change", (e) => {
        if (e.target.files && e.target.files[0]) handleFile(e.target.files[0], "Camera Photo");
        e.target.value = "";
      });
    }

    const closeBtn = document.getElementById("cameraModalCloseBtn");
    if (closeBtn) closeBtn.onclick = () => this.closeCamera();

    const snapBtn = document.getElementById("kbvCaptureSnapBtn");
    if (snapBtn) snapBtn.onclick = () => this.captureFrame();

    const fallbackBtn = document.getElementById("kbvCameraFallbackFileBtn");
    if (fallbackBtn) {
      fallbackBtn.onclick = () => {
        this.closeCamera();
        this.pickImage();
      };
    }
  },

  pickImage() {
    this._ensureBound();
    const input = document.getElementById("kbvFieldImageInput");
    if (input) input.click();
  },

  async openCamera() {
    this._ensureBound();
    const modal = document.getElementById("cameraCaptureModal");
    const video = document.getElementById("kbvCameraVideo");
    const errEl = document.getElementById("kbvCameraErrorNotice");
    const snapBtn = document.getElementById("kbvCaptureSnapBtn");

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !modal || !video) {
      const camInput = document.getElementById("kbvFieldCameraInput");
      if (camInput) camInput.click();
      return;
    }

    if (errEl) {
      errEl.style.display = "none";
      errEl.textContent = "";
    }
    if (snapBtn) snapBtn.disabled = false;
    modal.classList.add("open");

    try {
      this._stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false });
      video.srcObject = this._stream;
    } catch (err) {
      if (snapBtn) snapBtn.disabled = true;
      if (errEl) {
        errEl.style.display = "block";
        errEl.textContent = "Camera unavailable or permission denied. Click 'Choose Image File Instead' below to upload a photo.";
      }
    }
  },

  captureFrame() {
    const video = document.getElementById("kbvCameraVideo");
    const canvas = document.getElementById("kbvCameraCanvas");
    if (!video || !canvas || !video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.88);
    this.closeCamera();
    this.setImage(dataUrl, `camera_${Date.now()}.jpg`, "Camera Snapshot");
  },

  closeCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((t) => t.stop());
      this._stream = null;
    }
    const video = document.getElementById("kbvCameraVideo");
    if (video) video.srcObject = null;
    const modal = document.getElementById("cameraCaptureModal");
    if (modal) modal.classList.remove("open");
  },

  setImage(dataUrl, name, source) {
    this.currentImage = { dataUrl, name, source };
    this.syncPreviews();
    if (window.kbvApp && typeof window.kbvApp.showToast === "function") {
      window.kbvApp.showToast(`📷 ${source} attached: ${name}`, 3000);
    }
  },

  clearImage() {
    this.currentImage = null;
    this.syncPreviews();
  },

  syncPreviews() {
    const img = this.currentImage;
    const bar = document.getElementById("kbvAttachedMediaBar");
    const thumb = document.getElementById("kbvAttachedMediaThumb");
    const title = document.getElementById("kbvAttachedMediaTitle");
    const meta = document.getElementById("kbvAttachedMediaMeta");

    if (bar && thumb && title && meta) {
      if (img) {
        thumb.src = img.dataUrl;
        title.textContent = img.name;
        meta.textContent = `${img.source} • Attached for AI Crop Doctor`;
        bar.style.display = "flex";
      } else {
        bar.style.display = "none";
      }
    }

    const docPrev = document.getElementById("doctorPendingImagePreview");
    const docThumb = document.getElementById("doctorPendingImageThumb");
    const docName = document.getElementById("doctorPendingImageName");
    if (docPrev && docThumb && docName) {
      if (img) {
        docThumb.src = img.dataUrl;
        docName.textContent = `${img.name} (${img.source})`;
        docPrev.style.display = "flex";
      } else {
        docPrev.style.display = "none";
      }
    }
  }
};
