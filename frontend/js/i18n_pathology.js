/**
 * AgroNexus - Multilingual Pathology, Disease Screening, STCR Doctor & Plantation I18n Pack
 * Attaches to window.AgroI18n across all 11 Indian languages:
 * en, hi, kn, te, ta, mr, gu, bn, ml, pa, or
 */
(function () {
  const A = window.AgroI18n;
  if (!A) return;

  const DISEASE_UI = {
    en: {
      drop_title: "Upload or Drag-and-Drop a Close-Up Crop Leaf Photo",
      drop_sub: "Minimum 224×224 px in natural daylight. Runs both offline in browser and via FastAPI.",
      drop_attached_sub: "{source} • Ready for spectral & lesion screening",
      crop_lbl: "Crop:",
      upload_leaf_btn: "Upload Leaf",
      rescreen_leaf_btn: "Re-Screen Leaf",
      clear_btn: "Clear",
      screening_running: "Running visual leaf screening... Evaluating sharpness, exposure, foliar cover, chlorosis, rust pustules, and necrotic spots.",
      screening_error: "Screening Error:",
      no_leaf_yet: "No leaf photo screened yet. Click Upload Leaf or Take Photo above (or drop a leaf photo here) to check quality, detect foliar lesion patterns, and view targeted management guidance.",
      badge_match: "SCREENING MATCH",
      badge_non_leaf: "NON-LEAF ABSTAINED",
      badge_quality_fail: "QUALITY CHECK FAILED",
      badge_abstained: "LOW CERTAINTY — ABSTAINED",
      badge_lesion: "VISUAL LESION PATTERN DETECTED",
      badge_healthy: "HEALTHY CANOPY INDICATED",
      cond_abstained: "Screening Abstained",
      cond_inconclusive: "Inconclusive Visual Match (Review Differential)",
      visual_score: "Visual Score",
      margin_lbl: "Margin:",
      m_resolution: "Resolution",
      m_sharpness: "Sharpness (Laplacian)",
      m_brightness: "Brightness",
      m_foliar: "Foliar Cover",
      m_lesion: "Lesion / Chlorosis Burden",
      diff_title: "Crop-Scoped Differential Visual Match",
      action_title: "Field Action & Extension Guidance ({crop})",
      lbl_symptoms: "Symptoms to Confirm:",
      lbl_triggers: "Favorable Weather:",
      lbl_bio: "Bio / Organic Option:",
      lbl_chemical: "Targeted Control (Verify with KVK):",
      lbl_prevention: "Prevention:",
      lbl_extension: "Extension Advisory:",
      extension_guidance_text: "Inspect 5-10 plants across the plot and confirm chemical dosage with your nearest Krishi Vigyan Kendra (KVK) before spraying.",
      method_lbl: "Method:",
      mode_browser: "In-Browser Visual Screening (Client-Side Canvas)",
      mode_backend: "FastAPI Backend Screening API",
      discuss_doctor_btn: "Discuss with AI Crop Doctor →",
      ref_guide_title: "Pathology & Pest Reference Guide — {crop}",
      healthy_foliage_tpl: "Healthy {crop} Foliage",
      healthy_canopy_type: "Healthy Canopy",
      limitations_text: "Visual screening provides probabilistic optical screening rather than clinical lab microscopy or trained PlantVillage CNN confirmation. Verify with your local KVK or agronomist.",
      err_resolution: "Image resolution {w}×{h} px is below minimum 224×224 px. Capture a closer leaf photo.",
      err_dark: "Image is underexposed (brightness {b}/255 < 25). Retake in natural daylight.",
      err_bright: "Image is washed out / overexposed (brightness {b}/255 > 235). Avoid harsh direct glare.",
      err_blur: "Image appears too blurry (Laplacian variance {v} < 4). Hold camera steady and focus on leaf.",
      err_non_leaf: "Abstained: insufficient plant foliage detected ({f}% < 2.5%). Frame a closeup of the crop leaf and retry.",
      err_overlap: "Visual patterns overlap between '{top}' ({p1}%) and '{alt}' ({p2}%). Review differential symptoms below or capture a sharper close-up photo.",
      doctor_disc_prompt: "I scanned a leaf photo showing {cond} on {crop}. What biological and field management steps are recommended?"
    },
    hi: {
      drop_title: "फसल की पत्ती का स्पष्ट फोटो अपलोड करें या यहाँ छोड़ें",
      drop_sub: "दिन की रोशनी में न्यूनतम 224×224 पिक्सेल। ब्राउज़र में ऑफ़लाइन व सर्वर दोनों पर कार्यशील।",
      drop_attached_sub: "{source} • पर्ण धब्बा और वर्णक्रमीय जांच के लिए तैयार",
      crop_lbl: "फसल:",
      upload_leaf_btn: "पत्ती अपलोड करें",
      rescreen_leaf_btn: "पुनः जांच करें",
      clear_btn: "साफ़ करें",
      screening_running: "पत्ती की दृश्य जांच जारी है... स्पष्टता, प्रकाश, हरियाली, रतुआ व धब्बों का मूल्यांकन हो रहा है।",
      screening_error: "जांच त्रुटि:",
      no_leaf_yet: "अभी कोई पत्ती जांच नहीं हुई है। ऊपर 'पत्ती अपलोड करें' या 'फ़ोटो खींचें' पर क्लिक करें।",
      badge_match: "जांच मिलान",
      badge_non_leaf: "गैर-पत्ती चित्र अस्वीकृत",
      badge_quality_fail: "चित्र गुणवत्ता अपर्याप्त",
      badge_abstained: "कम निश्चितता — संदिग्ध",
      badge_lesion: "रोग धब्बा लक्षण संभावित",
      badge_healthy: "स्वस्थ पर्ण संभावित",
      cond_abstained: "जांच रोकी गई",
      cond_inconclusive: "अस्पष्ट दृश्य मिलान (विकल्पों की समीक्षा करें)",
      visual_score: "दृश्य मिलान स्कोर",
      margin_lbl: "अंतर:",
      m_resolution: "रिज़ॉल्यूशन",
      m_sharpness: "स्पष्टता मान",
      m_brightness: "प्रकाश स्तर",
      m_foliar: "पर्ण आवरण",
      m_lesion: "धब्बा / पीलापन प्रतिशत",
      diff_title: "फसल-आधारित संभावित रोग तुलना",
      action_title: "खेत नियंत्रण एवं कृषि सलाह ({crop})",
      lbl_symptoms: "प्रमुख लक्षण:",
      lbl_triggers: "अनुकूल मौसम:",
      lbl_bio: "जैविक नियंत्रण:",
      lbl_chemical: "लक्षित नियंत्रण (केवीके सलाह सहित):",
      lbl_prevention: "बचाव उपाय:",
      lbl_extension: "कृषि विस्तार सलाह:",
      extension_guidance_text: "खेत के 5-10 पौधों की जांच करें और छिड़काव से पूर्व कृषि विज्ञान केंद्र या कृषि विशेषज्ञ से खुराक की पुष्टि करें।",
      method_lbl: "विधि:",
      mode_browser: "ब्राउज़र-आधारित दृश्य पत्ती जांच",
      mode_backend: "सर्वर दृश्य रोग जांच प्रणाली",
      discuss_doctor_btn: "एआई फसल डॉक्टर से चर्चा करें →",
      ref_guide_title: "रोग एवं कीट संदर्भ मार्गदर्शिका — {crop}",
      healthy_foliage_tpl: "स्वस्थ {crop} पत्तियाँ",
      healthy_canopy_type: "स्वस्थ पर्ण अवस्था",
      limitations_text: "यह दृश्य जांच प्रारंभिक पहचान सहायता है, प्रयोगशाला परीक्षण का विकल्प नहीं। अंतिम पुष्टि हेतु स्थानीय कृषि विशेषज्ञ से संपर्क करें।",
      err_resolution: "चित्र आकार {w}×{h} पिक्सेल न्यूनतम 224×224 से कम है। कृपया पत्ती का स्पष्ट पास का फोटो लें।",
      err_dark: "चित्र में प्रकाश बहुत कम है (चमक {b}/255 < 25)। दिन के उजाले में पुनः फोटो लें।",
      err_bright: "चित्र अत्यधिक चमकीला है (चमक {b}/255 > 235)। सीधी चकाचौंध से बचें।",
      err_blur: "चित्र धुंधला है (स्पष्टता {v} < 4)। कैमरा स्थिर रखकर पत्ती पर फोकस करें।",
      err_non_leaf: "जांच रोकी गई: चित्र में पर्याप्त हरी या पीली पत्ती ({f}% < 2.5%) नहीं मिली। कृपया फसल की पत्ती का नज़दीकी फोटो लें।",
      err_overlap: "'{top}' ({p1}%) और '{alt}' ({p2}%) के लक्षण आपस में मिलते हैं। नीचे संभावित लक्षण देखें या पास का स्पष्ट फोटो अपलोड करें।",
      doctor_disc_prompt: "मेरी {crop} की पत्ती की जांच में {cond} के संकेत मिले हैं। इसके लिए जैविक व खेत प्रबंधन उपाय बताएं।"
    },
    kn: {
      drop_title: "ಬೆಳೆ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ ಅಥವಾ ಇಲ್ಲಿ ಎಳೆಯಿರಿ",
      drop_sub: "ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಕನಿಷ್ಠ 224×224 ಪಿಕ್ಸೆಲ್. ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಆಫ್‌ಲೈನ್ ಮತ್ತು ಸರ್ವರ್‌ನಲ್ಲಿ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ.",
      drop_attached_sub: "{source} • ಎಲೆ ಮಚ್ಚೆ ಮತ್ತು ರೋಗ ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧ",
      crop_lbl: "ಬೆಳೆ:",
      upload_leaf_btn: "ಎಲೆ ಅಪ್‌ಲೋಡ್",
      rescreen_leaf_btn: "ಮರು-ಪರೀಕ್ಷಿಸಿ",
      clear_btn: "ತೆರವುಗೊಳಿಸಿ",
      screening_running: "ಎಲೆ ಚಿತ್ರ ವಿಶ್ಲೇಷಣೆ ನಡೆಯುತ್ತಿದೆ... ಸ್ಪಷ್ಟತೆ, ಬೆಳಕು ಮತ್ತು ರೋಗ ಮಚ್ಚೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ.",
      screening_error: "ಪರೀಕ್ಷಾ ದೋಷ:",
      no_leaf_yet: "ಇನ್ನೂ ಯಾವುದೇ ಎಲೆ ಪರೀಕ್ಷೆ ನಡೆದಿಲ್ಲ. ಮೇಲೆ 'ಎಲೆ ಅಪ್‌ಲೋಡ್' ಅಥವಾ 'ಫೋಟೋ ತೆಗೆಯಿರಿ' ಒತ್ತಿ.",
      badge_match: "ಪರೀಕ್ಷಾ ಹೊಂದಾಣಿಕೆ",
      badge_non_leaf: "ಎಲೆಯಲ್ಲದ ಚಿತ್ರ ತಿರಸ್ಕೃತ",
      badge_quality_fail: "ಚಿತ್ರ ಗುಣಮಟ್ಟ ಕಡಿಮೆ",
      badge_abstained: "ಕಡಿಮೆ ಖಚಿತತೆ — ತಡೆಹಿಡಿಯಲಾಗಿದೆ",
      badge_lesion: "ರೋಗ ಮಚ್ಚೆ ಲಕ್ಷಣ ಪತ್ತೆ",
      badge_healthy: "ಆರೋಗ್ಯಕರ ಎಲೆ",
      cond_abstained: "ಪರೀಕ್ಷೆ ತಡೆಹಿಡಿಯಲಾಗಿದೆ",
      cond_inconclusive: "ಅಸ್ಪಷ್ಟ ದೃಶ್ಯ ಹೊಂದಾಣಿಕೆ",
      visual_score: "ದೃಶ್ಯ ಅಂಕ",
      margin_lbl: "ವ್ಯತ್ಯಾಸ:",
      m_resolution: "ರೆಸಲ್ಯೂಶನ್",
      m_sharpness: "ಸ್ಪಷ್ಟತೆ",
      m_brightness: "ಬೆಳಕು",
      m_foliar: "ಎಲೆ ವ್ಯಾಪ್ತಿ",
      m_lesion: "ಮಚ್ಚೆ / ಹಳದಿ ಪ್ರಮಾಣ",
      diff_title: "ಸಂಭಾವ್ಯ ರೋಗಗಳ ತುಲನೆ",
      action_title: "ಕ್ಷೇತ್ರ ನಿರ್ವಹಣೆ ಮತ್ತು ಸಲಹೆ ({crop})",
      lbl_symptoms: "ಲಕ್ಷಣಗಳು:",
      lbl_triggers: "ಪೂರಕ ಹವಾಮಾನ:",
      lbl_bio: "ಜೈವಿಕ ನಿಯಂತ್ರಣ:",
      lbl_chemical: "ನಿಯಂತ್ರಣ ಕ್ರಮ (ತಜ್ಞರ ಸಲಹೆಯೊಂದಿಗೆ):",
      lbl_prevention: "ಮುನ್ನೆಚ್ಚರಿಕೆ:",
      lbl_extension: "ಕೃಷಿ ವಿಸ್ತರಣಾ ಸಲಹೆ:",
      extension_guidance_text: "ಹೊಲದ 5-10 ಗಿಡಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ ಮತ್ತು ಸಿಂಪಡಿಸುವ ಮೊದಲು ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರ ಅಥವಾ ತಜ್ಞರೊಂದಿಗೆ ದೃಢೀಕರಿಸಿ.",
      method_lbl: "ವಿಧಾನ:",
      mode_browser: "ಬ್ರೌಸರ್ ದೃಶ್ಯ ಎಲೆ ಪರೀಕ್ಷೆ",
      mode_backend: "ಸರ್ವರ್ ದೃಶ್ಯ ರೋಗ ಪರೀಕ್ಷೆ",
      discuss_doctor_btn: "ಬೆಳೆ ವೈದ್ಯರೊಂದಿಗೆ ಚರ್ಚಿಸಿ →",
      ref_guide_title: "ರೋಗ ಮತ್ತು ಕೀಟ ಮಾರ್ಗದರ್ಶಿ — {crop}",
      healthy_foliage_tpl: "ಆರೋಗ್ಯಕರ {crop} ಎಲೆಗಳು",
      healthy_canopy_type: "ಆರೋಗ್ಯಕರ ಬೆಳೆ",
      limitations_text: "ಇದು ಪ್ರಾಥಮಿಕ ದೃಶ್ಯ ಪರೀಕ್ಷೆಯಾಗಿದ್ದು ಪ್ರಯೋಗಾಲಯ ಪರೀಕ್ಷೆಗೆ ಪರ್ಯಾಯವಲ್ಲ. ದೃಢೀಕರಣಕ್ಕಾಗಿ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      err_resolution: "ಚಿತ್ರದ ಗಾತ್ರ {w}×{h} ಕನಿಷ್ಠ 224×224 ಪಿಕ್ಸೆಲ್‌ಗಿಂತ ಕಡಿಮೆಯಿದೆ.",
      err_dark: "ಚಿತ್ರ ತುಂಬಾ ಕತ್ತಲಾಗಿದೆ (ಬೆಳಕು {b}/255 < 25). ಹಗಲು ಬೆಳಕಿನಲ್ಲಿ ಮತ್ತೆ ತೆಗೆಯಿರಿ.",
      err_bright: "ಚಿತ್ರ ಹೆಚ್ಚು ಪ್ರಖರವಾಗಿದೆ (ಬೆಳಕು {b}/255 > 235).",
      err_blur: "ಚಿತ್ರ ಮಸುಕಾಗಿದೆ (ಸ್ಪಷ್ಟತೆ {v} < 4). ಕ್ಯಾಮೆರಾ ಸ್ಥಿರವಾಗಿ ಹಿಡಿದು ಫೋಟೋ ತೆಗೆಯಿರಿ.",
      err_non_leaf: "ಪರೀಕ್ಷೆ ನಿಲ್ಲಿಸಲಾಗಿದೆ: ಎಲೆಯ ಭಾಗ ಕಡಿಮೆಯಿದೆ ({f}% < 2.5%). ಹತ್ತಿರದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
      err_overlap: "'{top}' ({p1}%) ಮತ್ತು '{alt}' ({p2}%) ಲಕ್ಷಣಗಳು ಹೋಲುತ್ತವೆ. ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ನೋಡಿ ಅಥವಾ ಸ್ಪಷ್ಟ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.",
      doctor_disc_prompt: "ನನ್ನ {crop} ಎಲೆಯಲ್ಲಿ {cond} ಲಕ್ಷಣಗಳು ಕಂಡುಬಂದಿವೆ. ಜೈವಿಕ ಮತ್ತು ಕ್ಷೇತ್ರ ನಿರ್ವಹಣಾ ಕ್ರಮಗಳನ್ನು ತಿಳಿಸಿ."
    },
    mr: {
      drop_title: "पिकाच्या पानाचा स्पष्ट फोटो अपलोड करा किंवा येथे टाका",
      drop_sub: "दिवसाच्या प्रकाशात किमान 224×224 पिक्सेल. ऑफलाइन आणि सर्व्हर दोन्हीवर कार्यरत.",
      drop_attached_sub: "{source} • पान व ठिपके तपासणीसाठी तयार",
      crop_lbl: "पीक:", upload_leaf_btn: "पान अपलोड करा", rescreen_leaf_btn: "पुन्हा तपासा", clear_btn: "साफ करा",
      screening_running: "पानाची तपासणी सुरू आहे... स्पष्टता, प्रकाश, हिरवळ आणि डाग तपासले जात आहेत.",
      screening_error: "तपासणी त्रुटी:",
      no_leaf_yet: "अद्याप कोणताही फोटो तपासलेला नाही. वर 'पान अपलोड करा' किंवा 'फोटो काढा' क्लिक करा.",
      badge_match: "तपासणी जुळली", badge_non_leaf: "पान नसलेला फोटो नाकारला", badge_quality_fail: "फोटो गुणवत्ता अपुरी",
      badge_abstained: "कमी खात्री — अनिश्चित", badge_lesion: "रोग ठिपके आढळले", badge_healthy: "निरोगी पान",
      cond_abstained: "तपासणी थांबवली", cond_inconclusive: "अस्पष्ट जुळणी (पर्याय पहा)",
      visual_score: "तपासणी गुण", margin_lbl: "फरक:", m_resolution: "आकार", m_sharpness: "स्पष्टता",
      m_brightness: "प्रकाश", m_foliar: "पान भाग", m_lesion: "ठिपके / पिवळेपणा",
      diff_title: "पीक-निहाय संभाव्य रोग तुलना", action_title: "शेत व्यवस्थापन व उपाय ({crop})",
      lbl_symptoms: "प्रमुख लक्षणे:", lbl_triggers: "पोषक हवामान:", lbl_bio: "सेंद्रिय / जैविक उपाय:",
      lbl_chemical: "नियंत्रण उपाय (तज्ज्ञ सल्ल्याने):", lbl_prevention: "प्रतिबंधात्मक उपाय:", lbl_extension: "कृषी विस्तार सल्ला:",
      extension_guidance_text: "शेतातील 5-10 झाडे तपासा आणि फवारणीपूर्वी जवळच्या कृषी विज्ञान केंद्राचा सल्ला घ्या.",
      method_lbl: "पद्धत:", mode_browser: "ब्राउझर दृश्य तपासणी", mode_backend: "सर्व्हर दृश्य रोग तपासणी",
      discuss_doctor_btn: "एआय पीक डॉक्टरांशी बोला →", ref_guide_title: "रोग व कीड संदर्भ मार्गदर्शक — {crop}",
      healthy_foliage_tpl: "निरोगी {crop} पाने", healthy_canopy_type: "निरोगी पान",
      limitations_text: "ही प्राथमिक दृश्य तपासणी आहे, प्रयोगशाळा निदानाचा पर्याय नाही. खात्रीसाठी कृषी तज्ज्ञांना दाखवा.",
      err_resolution: "फोटोचा आकार {w}×{h} पिक्सेल किमान 224×224 पेक्षा लहान आहे.",
      err_dark: "फोटो खूप अंधुक आहे (प्रकाश {b}/255 < 25). उजेडात फोटो काढा.",
      err_bright: "फोटो अतिप्रकाशी आहे (प्रकाश {b}/255 > 235).",
      err_blur: "फोटो धूसर आहे (स्पष्टता {v} < 4). कॅमेरा स्थिर ठेवून फोटो काढा.",
      err_non_leaf: "तपासणी थांबवली: पानाचा भाग कमी आहे ({f}% < 2.5%). पानाचा जवळचा फोटो काढा.",
      err_overlap: "'{top}' ({p1}%) आणि '{alt}' ({p2}%) लक्षणे मिळतीजुळती आहेत. खालील तक्ता पहा.",
      doctor_disc_prompt: "माझ्या {crop} पानावर {cond} लक्षणे दिसली आहेत. यासाठी सेंद्रिय व व्यवस्थापन उपाय सांगा."
    },
    te: {
      drop_title: "ఆకు స్పష్టమైన ఫోటోను అప్‌లోడ్ చేయండి లేదా ఇక్కడ వేయండి",
      drop_sub: "పగటి వెలుతురులో కనీసం 224×224 పిక్సెల్స్.", drop_attached_sub: "{source} • ఆకు పరీక్షకు సిద్ధం",
      crop_lbl: "పంట:", upload_leaf_btn: "ఆకు అప్‌లోడ్", rescreen_leaf_btn: "మళ్లీ తనిఖీ", clear_btn: "క్లియర్",
      screening_running: "ఆకు దృశ్య పరీక్ష జరుగుతోంది...", screening_error: "పరీక్ష లోపం:",
      no_leaf_yet: "ఇంకా ఫోటో పరీక్షించబడలేదు. పైన 'ఆకు అప్‌లోడ్' లేదా 'ఫోటో తీయి' క్లిక్ చేయండి.",
      badge_match: "పరీక్ష సరిపోలిక", badge_non_leaf: "ఆకు కాని చిత్రం", badge_quality_fail: "నాణ్యత తక్కువ",
      badge_abstained: "తక్కువ ఖచ్చితత్వం", badge_lesion: "వ్యాధి మచ్చలు గుర్తించబడ్డాయి", badge_healthy: "ఆరోగ్యకరమైన ఆకు",
      cond_abstained: "పరీక్ష నిలిపివేయబడింది", cond_inconclusive: "అస్పష్టమైన సరిపోలిక",
      visual_score: "దృశ్య స్కోరు", margin_lbl: "తేడా:", m_resolution: "పరిమాణం", m_sharpness: "స్పష్టత",
      m_brightness: "వెలుతురు", m_foliar: "ఆకు విస్తీర్ణం", m_lesion: "మచ్చ / పసుపు శాతం",
      diff_title: "సంభావ్య వ్యాధుల పోలిక", action_title: "నివారణ & సలహా ({crop})",
      lbl_symptoms: "లక్షణాలు:", lbl_triggers: "వాతావరణ కారకాలు:", lbl_bio: "జీవ / సేంద్రీయ నియంత్రణ:",
      lbl_chemical: "నియంత్రణ (నిపుణుల సలహాతో):", lbl_prevention: "ముందస్తు జాగ్రత్తలు:", lbl_extension: "వ్యవసాయ సూచన:",
      extension_guidance_text: "పొలంలోని 5-10 మొక్కలను తనిఖీ చేసి పిచికారీకి ముందు కృషి విజ్ఞాన కేంద్రం సలహా తీసుకోండి.",
      method_lbl: "విధానం:", mode_browser: "బ్రౌజర్ దృశ్య పరీక్ష", mode_backend: "సర్వర్ దృశ్య పరీక్ష",
      discuss_doctor_btn: "AI పంట డాక్టర్‌తో చర్చించండి →", ref_guide_title: "వ్యాధి & చీడపీడల సూచిక — {crop}",
      healthy_foliage_tpl: "ఆరోగ్యకరమైన {crop} ఆకులు", healthy_canopy_type: "ఆరోగ్యకరమైన ఆకు",
      limitations_text: "ఇది ప్రాథమిక దృశ్య పరీక్ష మాత్రమే. నిర్ధారణ కోసం వ్యవసాయ శాస్త్రవేత్తను సంప్రదించండి.",
      err_resolution: "చిత్రం పరిమాణం {w}×{h} కనీసం 224×224 కంటే తక్కువగా ఉంది.",
      err_dark: "వెలుతురు చాలా తక్కువగా ఉంది ({b}/255 < 25).", err_bright: "వెలుతురు చాలా ఎక్కువగా ఉంది ({b}/255 > 235).",
      err_blur: "చిత్రం మసకగా ఉంది ({v} < 4). స్పష్టంగా ఫోటో తీయండి.",
      err_non_leaf: "ఆకు భాగం తక్కువగా ఉంది ({f}% < 2.5%). ఆకు దగ్గరి ఫోటో తీయండి.",
      err_overlap: "'{top}' ({p1}%) మరియు '{alt}' ({p2}%) లక్షణాలు దగ్గరగా ఉన్నాయి. క్రింది వివరాలు చూడండి.",
      doctor_disc_prompt: "నా {crop} ఆకుపై {cond} కనిపించింది. సేంద్రీయ మరియు పొలం నివారణ చర్యలు చెప్పండి."
    },
    ta: {
      drop_title: "பயிர் இலையின் தெளிவான படத்தைப் பதிவேற்றவும்",
      drop_sub: "பகல் வெளிச்சத்தில் குறைந்தது 224×224 பிக்சல்.", drop_attached_sub: "{source} • இலை ஆய்வுக்குத் தயார்",
      crop_lbl: "பயிர்:", upload_leaf_btn: "இலை பதிவேற்று", rescreen_leaf_btn: "மீண்டும் ஆய்வு", clear_btn: "அழி",
      screening_running: "இலை படம் ஆய்வு செய்யப்படுகிறது...", screening_error: "ஆய்வுப் பிழை:",
      no_leaf_yet: "இன்னும் இலைப் படம் ஆய்வு செய்யப்படவில்லை. மேலே படத்தைப் பதிவேற்றவும்.",
      badge_match: "ஆய்வு பொருத்தம்", badge_non_leaf: "இலை அல்லாத படம்", badge_quality_fail: "தரம் குறைவு",
      badge_abstained: "குறைந்த உறுதி", badge_lesion: "நோய் புள்ளிகள் கண்டறியப்பட்டன", badge_healthy: "ஆரோக்கியமான இலை",
      cond_abstained: "ஆய்வு நிறுத்தப்பட்டது", cond_inconclusive: "தெளிவற்ற பொருத்தம்",
      visual_score: "மதிப்பெண்", margin_lbl: "வேறுபாடு:", m_resolution: "தெளிவுத்திறன்", m_sharpness: "கூர்மை",
      m_brightness: "ஒளி அளவு", m_foliar: "இலை பரப்பு", m_lesion: "புள்ளி / மஞ்சள் அளவு",
      diff_title: "நோய் வாய்ப்பு ஒப்பீடு", action_title: "வயல் நடவடிக்கை & ஆலோசனை ({crop})",
      lbl_symptoms: "அறிகுறிகள்:", lbl_triggers: "சாதக வானிலை:", lbl_bio: "இயற்கை கட்டுப்பாடு:",
      lbl_chemical: "கட்டுப்பாடு (வேளாண் ஆலோசனையுடன்):", lbl_prevention: "தடுப்பு நடவடிக்கைகள்:", lbl_extension: "வேளாண் அறிவுரை:",
      extension_guidance_text: "வயலில் 5-10 செடிகளை ஆய்வு செய்து தெளிப்பதற்கு முன் வேளாண் அறிவியல் மையத்தை அணுகவும்.",
      method_lbl: "முறை:", mode_browser: "உலாவி இலை ஆய்வு", mode_backend: "சேவையக நோய் ஆய்வு",
      discuss_doctor_btn: "பயிர் மருத்துவரிடம் கேளுங்கள் →", ref_guide_title: "நோய் & பூச்சி வழிகாட்டி — {crop}",
      healthy_foliage_tpl: "ஆரோக்கியமான {crop} இலைகள்", healthy_canopy_type: "ஆரோக்கியமான பயிர்",
      limitations_text: "இது ஆரம்பகட்ட ஒளியியல் ஆய்வு மட்டுமே. உறுதிப்படுத்த வேளாண் அதிகாரியை அணுகவும்.",
      err_resolution: "பட அளவு {w}×{h} குறைந்தபட்ச 224×224 விடக் குறைவு.",
      err_dark: "வெளிச்சம் குறைவு ({b}/255 < 25).", err_bright: "வெளிச்சம் மிக அதிகம் ({b}/255 > 235).",
      err_blur: "படம் மங்கலாக உள்ளது ({v} < 4).",
      err_non_leaf: "இலைப் பகுதி போதவில்லை ({f}% < 2.5%). இலையின் அருகிலுள்ள படம் எடுக்கவும்.",
      err_overlap: "'{top}' ({p1}%) மற்றும் '{alt}' ({p2}%) அறிகுறிகள் ஒத்துப்போகின்றன.",
      doctor_disc_prompt: "எனது {crop} இலையில் {cond} அறிகுறி தெரிகிறது. இயற்கை மற்றும் வயல் கட்டுப்பாட்டு முறைகளைக் கூறவும்."
    },
    gu: {
      drop_title: "પાંદડાનો સ્પષ્ટ ફોટો અપલોડ કરો અથવા અહીં મૂકો",
      drop_sub: "દિવસના પ્રકાશમાં ઓછામાં ઓછું 224×224 પિક્સેલ.", drop_attached_sub: "{source} • તપાસ માટે તૈયાર",
      crop_lbl: "પાક:", upload_leaf_btn: "પાંદડું અપલોડ", rescreen_leaf_btn: "ફરી તપાસો", clear_btn: "સાફ કરો",
      screening_running: "પાંદડાની દ્રશ્ય તપાસ ચાલુ છે...", screening_error: "તપાસ ભૂલ:",
      no_leaf_yet: "હજુ કોઈ ફોટો તપાસાયો નથી. ઉપરથી ફોટો અપલોડ કરો.",
      badge_match: "તપાસ મેચ", badge_non_leaf: "પાંદડું ન હોવાથી રદ", badge_quality_fail: "ગુણવત્તા ઓછી",
      badge_abstained: "ઓછી ચોકસાઈ", badge_lesion: "રોગના ડાઘ જણાયા", badge_healthy: "તંદુરસ્ત પાંદડું",
      cond_abstained: "તપાસ અટકાવાઈ", cond_inconclusive: "અસ્પષ્ટ પરિણામ",
      visual_score: "સ્કોર", margin_lbl: "તફાવત:", m_resolution: "માપ", m_sharpness: "સ્પષ્ટતા",
      m_brightness: "પ્રકાશ", m_foliar: "પાંદડા વિસ્તાર", m_lesion: "ડાઘ / પીળાશ",
      diff_title: "સંભવિત રોગ તુલના", action_title: "ખેતર નિયંત્રણ અને સલાહ ({crop})",
      lbl_symptoms: "લક્ષણો:", lbl_triggers: "અનુકૂળ હવામાન:", lbl_bio: "જૈવિક ઉપાય:",
      lbl_chemical: "નિયંત્રણ (નિષ્ણાતની સલાહ મુજબ):", lbl_prevention: "બચાવ:", lbl_extension: "કૃષિ સલાહ:",
      extension_guidance_text: "ખેતરમાં 5-10 છોડ તપાસો અને છંટકાવ પહેલા કૃષિ વિજ્ઞાન કેન્દ્રનો સંપર્ક કરો.",
      method_lbl: "પદ્ધતિ:", mode_browser: "બ્રાઉઝર દ્રશ્ય તપાસ", mode_backend: "સર્વર રોગ તપાસ",
      discuss_doctor_btn: "પાક ડૉક્ટર સાથે ચર્ચા કરો →", ref_guide_title: "રોગ અને જીવાત માર્ગદર્શિકા — {crop}",
      healthy_foliage_tpl: "તંદુરસ્ત {crop} પાંદડાં", healthy_canopy_type: "તંદુરસ્ત પાક",
      limitations_text: "આ પ્રારંભિક દ્રશ્ય તપાસ છે. ચોક્કસ નિદાન માટે કૃષિ નિષ્ણાતની સલાહ લો.",
      err_resolution: "ફોટો {w}×{h} લઘુતમ 224×224 કરતાં નાનો છે.",
      err_dark: "પ્રકાશ ઓછો છે ({b}/255 < 25).", err_bright: "પ્રકાશ વધારે છે ({b}/255 > 235).",
      err_blur: "ફોટો ઝાંખો છે ({v} < 4).",
      err_non_leaf: "પાંદડાનો ભાગ ઓછો છે ({f}% < 2.5%). પાંદડાનો નજીકનો ફોટો લો.",
      err_overlap: "'{top}' ({p1}%) અને '{alt}' ({p2}%) લક્ષણો મળતા આવે છે.",
      doctor_disc_prompt: "મારા {crop} પાંદડા પર {cond} જણાયું છે. જૈવિક અને ખેતર નિયંત્રણ જણાવો."
    },
    bn: {
      drop_title: "ফসলের পাতার স্পষ্ট ছবি আপলোড করুন বা এখানে ছাড়ুন",
      drop_sub: "দিনের আলোতে ন্যূনতম ২২৪×২২৪ পিক্সেল।", drop_attached_sub: "{source} • পরীক্ষার জন্য প্রস্তুত",
      crop_lbl: "ফসল:", upload_leaf_btn: "পাতা আপলোড", rescreen_leaf_btn: "পুনরায় পরীক্ষা", clear_btn: "মুছুন",
      screening_running: "পাতার ছবি বিশ্লেষণ চলছে...", screening_error: "পরীক্ষা ত্রুটি:",
      no_leaf_yet: "এখনও কোনো পাতা পরীক্ষা করা হয়নি। উপরে ছবি আপলোড করুন।",
      badge_match: "পরীক্ষা মিল", badge_non_leaf: "পাতা নয় বলে বাতিল", badge_quality_fail: "মান কম",
      badge_abstained: "কম নিশ্চয়তা", badge_lesion: "রোগের দাগ শনাক্ত", badge_healthy: "সুস্থ পাতা",
      cond_abstained: "পরীক্ষা স্থগিত", cond_inconclusive: "অস্পষ্ট ফলাফল",
      visual_score: "দৃশ্যমান স্কোর", margin_lbl: "পার্থক্য:", m_resolution: "রেজোলিউশন", m_sharpness: "স্পষ্টতা",
      m_brightness: "আলো", m_foliar: "পাতার অংশ", m_lesion: "দাগ / হলদে ভাব",
      diff_title: "সম্ভাব্য রোগের তুলনা", action_title: "মাঠ পর্যায়ের ব্যবস্থা ({crop})",
      lbl_symptoms: "লক্ষণসমূহ:", lbl_triggers: "অনুকূল আবহাওয়া:", lbl_bio: "জৈব নিয়ন্ত্রণ:",
      lbl_chemical: "নিয়ন্ত্রণ ব্যবস্থা (বিশেষজ্ঞের পরামর্শে):", lbl_prevention: "প্রতিরোধ:", lbl_extension: "কৃষি পরামর্শ:",
      extension_guidance_text: "জমির ৫-১০টি গাছ পরীক্ষা করুন এবং স্প্রে করার আগে কৃষি বিজ্ঞান কেন্দ্রের পরামর্শ নিন।",
      method_lbl: "পদ্ধতি:", mode_browser: "ব্রাউজার দৃশ্যমান পরীক্ষা", mode_backend: "সার্ভার রোগ পরীক্ষা",
      discuss_doctor_btn: "ফসল ডাক্তারের সাথে কথা বলুন →", ref_guide_title: "রোগ ও পোকা নির্দেশিকা — {crop}",
      healthy_foliage_tpl: "সুস্থ {crop} পাতা", healthy_canopy_type: "সুস্থ গাছ",
      limitations_text: "এটি প্রাথমিক দৃশ্যমান পরীক্ষা মাত্র। নিশ্চিত হতে স্থানীয় কৃষি বিশেষজ্ঞের পরামর্শ নিন।",
      err_resolution: "ছবির মাপ {w}×{h} ন্যূনতম ২২৪×২২৪-এর কম।",
      err_dark: "আলো খুব কম ({b}/২৫৫ < ২৫)।", err_bright: "আলো অতিরিক্ত ({b}/২৫৫ > ২৩৫)।",
      err_blur: "ছবি অস্পষ্ট ({v} < ৪)।",
      err_non_leaf: "পর্যাপ্ত পাতা শনাক্ত হয়নি ({f}% < ২.৫%)। কাছ থেকে পাতার ছবি তুলুন।",
      err_overlap: "'{top}' ({p1}%) ও '{alt}' ({p2}%)-এর লক্ষণ কাছাকাছি।",
      doctor_disc_prompt: "আমার {crop} পাতায় {cond} দেখা গেছে। জৈব ও মাঠ ব্যবস্থা কী?"
    },
    ml: {
      drop_title: "ഇലയുടെ വ്യക്തമായ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക",
      drop_sub: "പകൽ വെളിച്ചത്തിൽ കുറഞ്ഞത് 224×224 പിക്സൽ.", drop_attached_sub: "{source} • പരിശോധനയ്ക്ക് തയ്യാർ",
      crop_lbl: "വിള:", upload_leaf_btn: "ഇല അപ്‌ലോഡ്", rescreen_leaf_btn: "വീണ്ടും പരിശോധിക്കുക", clear_btn: "നീക്കുക",
      screening_running: "ഇല പരിശോധന നടക്കുന്നു...", screening_error: "പരിശോധനാ പിശക്:",
      no_leaf_yet: "ഇതുവരെ ചിത്രം പരിശോധിച്ചിട്ടില്ല. മുകളിൽ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക.",
      badge_match: "പരിശോധനാ ഫലം", badge_non_leaf: "ഇലയല്ലാത്തതിനാൽ ഒഴിവാക്കി", badge_quality_fail: "ഗുണനിലവാരം കുറവ്",
      badge_abstained: "കുറഞ്ഞ ഉറപ്പ്", badge_lesion: "രോഗ ലക്ഷണങ്ങൾ കണ്ടെത്തി", badge_healthy: "ആരോഗ്യമുള്ള ഇല",
      cond_abstained: "പരിശോധന നിർത്തി", cond_inconclusive: "വ്യക്തമല്ലാത്ത ഫലം",
      visual_score: "സ്കോർ", margin_lbl: "വ്യത്യാസം:", m_resolution: "വലിപ്പം", m_sharpness: "വ്യക്തത",
      m_brightness: "പ്രകാശം", m_foliar: "ഇല ഭാഗം", m_lesion: "പാട് / മഞ്ഞളിപ്പ്",
      diff_title: "സാധ്യതയുള്ള രോഗങ്ങളുടെ താരതമ്യം", action_title: "നിയന്ത്രണ മാർഗ്ഗങ്ങൾ ({crop})",
      lbl_symptoms: "ലക്ഷണങ്ങൾ:", lbl_triggers: "അനുകൂല കാലാവസ്ഥ:", lbl_bio: "ജൈവ നിയന്ത്രണം:",
      lbl_chemical: "നിയന്ത്രണം (വിദഗ്ധ ഉപദേശത്തോടെ):", lbl_prevention: "പ്രതിരോധം:", lbl_extension: "കാർഷിക നിർദ്ദേശം:",
      extension_guidance_text: "തോട്ടത്തിലെ 5-10 ചെടികൾ പരിശോധിച്ച ശേഷം കൃഷി വിജ്ഞാൻ കേന്ദ്രവുമായി ബന്ധപ്പെട്ട് മരുന്ന് അളവ് ഉറപ്പാക്കുക.",
      method_lbl: "രീതി:", mode_browser: "ബ്രൗസർ ഇല പരിശോധന", mode_backend: "സെർവർ രോഗ പരിശോധന",
      discuss_doctor_btn: "വിള ഡോക്ടറോട് ചോദിക്കുക →", ref_guide_title: "രോഗവും കീടങ്ങളും — {crop}",
      healthy_foliage_tpl: "ആരോഗ്യമുള്ള {crop} ഇലകൾ", healthy_canopy_type: "ആരോഗ്യമുള്ള വിള",
      limitations_text: "ഇത് പ്രാഥമിക പരിശോധന മാത്രമാണ്. കൃത്യമായ സ്ഥിരീകരണത്തിന് കൃഷി ഓഫീസറെ സമീപിക്കുക.",
      err_resolution: "ചിത്ര വലിപ്പം {w}×{h} കുറഞ്ഞത് 224×224-നേക്കാൾ കുറവാണ്.",
      err_dark: "വെളിച്ചം കുറവാണ് ({b}/255 < 25).", err_bright: "വെളിച്ചം കൂടുതലാണ് ({b}/255 > 235).",
      err_blur: "ചിത്രം മങ്ങിയതാണ് ({v} < 4).",
      err_non_leaf: "ഇല ഭാഗം കുറവാണ് ({f}% < 2.5%). ഇലയുടെ അടുത്തുള്ള ഫോട്ടോ എടുക്കുക.",
      err_overlap: "'{top}' ({p1}%), '{alt}' ({p2}%) ലക്ഷണങ്ങൾ സമാനമാണ്.",
      doctor_disc_prompt: "എന്റെ {crop} ഇലയിൽ {cond} കണ്ടു. ജൈവ നിയന്ത്രണ മാർഗ്ഗങ്ങൾ എന്താണ്?"
    },
    pa: {
      drop_title: "ਫ਼ਸਲ ਦੇ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
      drop_sub: "ਦਿਨ ਦੀ ਰੌਸ਼ਨੀ ਵਿੱਚ ਘੱਟੋ-ਘੱਟ 224×224 ਪਿਕਸਲ।", drop_attached_sub: "{source} • ਜਾਂਚ ਲਈ ਤਿਆਰ",
      crop_lbl: "ਫ਼ਸਲ:", upload_leaf_btn: "ਪੱਤਾ ਅਪਲੋਡ", rescreen_leaf_btn: "ਮੁੜ-ਜਾਂਚ ਕਰੋ", clear_btn: "ਸਾਫ਼ ਕਰੋ",
      screening_running: "ਪੱਤੇ ਦੀ ਜਾਂਚ ਚੱਲ ਰਹੀ ਹੈ...", screening_error: "ਜਾਂਚ ਗਲਤੀ:",
      no_leaf_yet: "ਅਜੇ ਕੋਈ ਫੋਟੋ ਨਹੀਂ ਜਾਂਚੀ ਗਈ। ਉੱਪਰ ਪੱਤੇ ਦੀ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ।",
      badge_match: "ਜਾਂਚ ਮੇਲ", badge_non_leaf: "ਪੱਤਾ ਨਾ ਹੋਣ ਕਾਰਨ ਰੱਦ", badge_quality_fail: "ਗੁਣਵੱਤਾ ਘੱਟ",
      badge_abstained: "ਘੱਟ ਭਰੋਸਾ", badge_lesion: "ਰੋਗ ਦੇ ਧੱਬੇ ਮਿਲੇ", badge_healthy: "ਤੰਦਰੁਸਤ ਪੱਤਾ",
      cond_abstained: "ਜਾਂਚ ਰੋਕੀ ਗਈ", cond_inconclusive: "ਅਸਪਸ਼ਟ ਮੇਲ",
      visual_score: "ਜਾਂਚ ਅੰਕ", margin_lbl: "ਫ਼ਰਕ:", m_resolution: "ਆਕਾਰ", m_sharpness: "ਸਾਫ਼ਪਣ",
      m_brightness: "ਰੌਸ਼ਨੀ", m_foliar: "ਪੱਤਾ ਹਿੱਸਾ", m_lesion: "ਧੱਬੇ / ਪੀਲਾਪਣ",
      diff_title: "ਸੰਭਾਵਿਤ ਰੋਗਾਂ ਦੀ ਤੁਲਨਾ", action_title: "ਖੇਤ ਪ੍ਰਬੰਧਨ ਅਤੇ ਸਲਾਹ ({crop})",
      lbl_symptoms: "ਲੱਛਣ:", lbl_triggers: "ਮੌਸਮੀ ਕਾਰਨ:", lbl_bio: "ਜੈਵਿਕ ਇਲਾਜ:",
      lbl_chemical: "ਨਿਯੰਤਰਣ (ਮਾਹਿਰ ਦੀ ਸਲਾਹ ਨਾਲ):", lbl_prevention: "ਬਚਾਅ:", lbl_extension: "ਖੇਤੀ ਸਲਾਹ:",
      extension_guidance_text: "ਖੇਤ ਦੇ 5-10 ਬੂਟੇ ਜਾਂਚੋ ਅਤੇ ਛਿੜਕਾਅ ਤੋਂ ਪਹਿਲਾਂ ਕ੍ਰਿਸ਼ੀ ਵਿਗਿਆਨ ਕੇਂਦਰ ਤੋਂ ਮਾਤਰਾ ਪੱਕੀ ਕਰੋ।",
      method_lbl: "ਤਰੀਕਾ:", mode_browser: "ਬ੍ਰਾਊਜ਼ਰ ਪੱਤਾ ਜਾਂਚ", mode_backend: "ਸਰਵਰ ਰੋਗ ਜਾਂਚ",
      discuss_doctor_btn: "ਫ਼ਸਲ ਡਾਕਟਰ ਨਾਲ ਗੱਲ ਕਰੋ →", ref_guide_title: "ਰੋਗ ਤੇ ਕੀੜੇ ਗਾਈਡ — {crop}",
      healthy_foliage_tpl: "ਤੰਦਰੁਸਤ {crop} ਪੱਤੇ", healthy_canopy_type: "ਤੰਦਰੁਸਤ ਫ਼ਸਲ",
      limitations_text: "ਇਹ ਸ਼ੁਰੂਆਤੀ ਜਾਂਚ ਹੈ। ਪੱਕੀ ਪਛਾਣ ਲਈ ਖੇਤੀ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।",
      err_resolution: "ਫੋਟੋ ਆਕਾਰ {w}×{h} ਘੱਟੋ-ਘੱਟ 224×224 ਤੋਂ ਘੱਟ ਹੈ।",
      err_dark: "ਰੌਸ਼ਨੀ ਬਹੁਤ ਘੱਟ ਹੈ ({b}/255 < 25)।", err_bright: "ਰੌਸ਼ਨੀ ਬਹੁਤ ਜ਼ਿਆਦਾ ਹੈ ({b}/255 > 235)।",
      err_blur: "ਫੋਟੋ ਧੁੰਦਲੀ ਹੈ ({v} < 4)।",
      err_non_leaf: "ਪੱਤੇ ਦਾ ਹਿੱਸਾ ਘੱਟ ਹੈ ({f}% < 2.5%)। ਪੱਤੇ ਦੀ ਨੇੜਲੀ ਫੋਟੋ ਲਓ।",
      err_overlap: "'{top}' ({p1}%) ਅਤੇ '{alt}' ({p2}%) ਦੇ ਲੱਛਣ ਮਿਲਦੇ ਹਨ।",
      doctor_disc_prompt: "ਮੇਰੇ {crop} ਪੱਤੇ ਤੇ {cond} ਦਿਖਾਈ ਦਿੱਤਾ ਹੈ। ਜੈਵਿਕ ਤੇ ਖੇਤ ਇਲਾਜ ਦੱਸੋ।"
    },
    or: {
      drop_title: "ଫସଲ ପତ୍ରର ସ୍ପଷ୍ଟ ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ",
      drop_sub: "ଦିନ ଆଲୁଅରେ ସର୍ବନିମ୍ନ ୨୨୪×୨୨୪ ପିକ୍ସେଲ୍।", drop_attached_sub: "{source} • ପରୀକ୍ଷା ପାଇଁ ପ୍ରସ୍ତୁତ",
      crop_lbl: "ଫସଲ:", upload_leaf_btn: "ପତ୍ର ଅପଲୋଡ୍", rescreen_leaf_btn: "ପୁନଃ ପରୀକ୍ଷା", clear_btn: "ସଫା କରନ୍ତୁ",
      screening_running: "ପତ୍ର ପରୀକ୍ଷା ଚାଲିଛି...", screening_error: "ପରୀକ୍ଷା ତ୍ରୁଟି:",
      no_leaf_yet: "ଏପର୍ଯ୍ୟନ୍ତ କୌଣସି ଫଟୋ ପରୀକ୍ଷା ହୋଇନାହିଁ। ଉପରେ ପତ୍ର ଫଟୋ ଅପଲୋଡ୍ କରନ୍ତୁ।",
      badge_match: "ପରୀକ୍ଷା ମେଳ", badge_non_leaf: "ପତ୍ର ନୁହେଁ ବୋଲି ବାତିଲ୍", badge_quality_fail: "ମାନ କମ୍",
      badge_abstained: "କମ୍ ନିଶ୍ଚିତତା", badge_lesion: "ରୋଗ ଦାଗ ଚିହ୍ନଟ", badge_healthy: "ସୁସ୍ଥ ପତ୍ର",
      cond_abstained: "ପରୀକ୍ଷା ବନ୍ଦ", cond_inconclusive: "ଅସ୍ପଷ୍ଟ ଫଳାଫଳ",
      visual_score: "ଦୃଶ୍ୟ ସ୍କୋର୍", margin_lbl: "ପାର୍ଥକ୍ୟ:", m_resolution: "ଆକାର", m_sharpness: "ସ୍ପଷ୍ଟତା",
      m_brightness: "ଆଲୁଅ", m_foliar: "ପତ୍ର ଅଂଶ", m_lesion: "ଦାଗ / ହଳଦିଆ",
      diff_title: "ସମ୍ଭାବ୍ୟ ରୋଗ ତୁଳନା", action_title: "କ୍ଷେତ୍ର ପରିଚାଳନା ଓ ପରାମର୍ଶ ({crop})",
      lbl_symptoms: "ଲକ୍ଷଣ:", lbl_triggers: "ପାଣିପାଗ କାରଣ:", lbl_bio: "ଜୈବିକ ନିୟନ୍ତ୍ରଣ:",
      lbl_chemical: "ନିୟନ୍ତ୍ରଣ (ବିଶେଷଜ୍ଞ ପରାମର୍ଶ ସହ):", lbl_prevention: "ପ୍ରତିରୋଧ:", lbl_extension: "କୃଷି ପରାମର୍ଶ:",
      extension_guidance_text: "ଜମିର ୫-୧୦ଟି ଗଛ ଦେଖନ୍ତୁ ଏବଂ ସିଞ୍ଚନ ପୂର୍ବରୁ କୃଷି ବିଜ୍ଞାନ କେନ୍ଦ୍ର ସହ ପରାମର୍ଶ କରନ୍ତୁ।",
      method_lbl: "ପଦ୍ଧତି:", mode_browser: "ବ୍ରାଉଜର୍ ପତ୍ର ପରୀକ୍ଷା", mode_backend: "ସର୍ଭର୍ ରୋଗ ପରୀକ୍ଷା",
      discuss_doctor_btn: "ଫସଲ ଡାକ୍ତରଙ୍କୁ ପଚାରନ୍ତୁ →", ref_guide_title: "ରୋଗ ଓ କୀଟ ସୂଚିକା — {crop}",
      healthy_foliage_tpl: "ସୁସ୍ଥ {crop} ପତ୍ର", healthy_canopy_type: "ସୁସ୍ଥ ଫସଲ",
      limitations_text: "ଏହା ପ୍ରାଥମିକ ଦୃଶ୍ୟ ପରୀକ୍ଷା। ନିଶ୍ଚିତ ହେବା ପାଇଁ କୃଷି ବିଶେଷଜ୍ଞଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ।",
      err_resolution: "ଫଟୋ ଆକାର {w}×{h} ସର୍ବନିମ୍ନ ୨୨୪×୨୨୪ ଠାରୁ କମ୍ ଅଟେ।",
      err_dark: "ଆଲୁଅ ବହୁତ କମ୍ ({b}/୨୫୫ < ୨୫)।", err_bright: "ଆଲୁଅ ଅତ୍ୟଧିକ ({b}/୨୫୫ > ୨୩୫)।",
      err_blur: "ଫଟୋ ଅସ୍ପଷ୍ଟ ({v} < ୪)।",
      err_non_leaf: "ପତ୍ର ଅଂଶ କମ୍ ({f}% < ୨.୫%)। ପତ୍ରର ପାଖ ଫଟୋ ଉଠାନ୍ତୁ।",
      err_overlap: "'{top}' ({p1}%) ଓ '{alt}' ({p2}%) ଲକ୍ଷଣ ସମାନ ଦେଖାଯାଉଛି।",
      doctor_disc_prompt: "ମୋ {crop} ପତ୍ରରେ {cond} ଦେଖାଦେଇଛି। ଜୈବିକ ଓ କ୍ଷେତ୍ର ପ୍ରତିକାର କୁହନ୍ତୁ।"
    }
  };

  const PATHOGEN_TYPES = {
    fungal: {
      en: "Fungal", hi: "फफूंद जनित", kn: "ಶಿಲೀಂಧ್ರ", te: "శిలీంధ్ర", ta: "பூஞ்சை",
      mr: "बुरशीजन्य", gu: "ફૂગજન્ય", bn: "ছত্রাকজনিত", ml: "കുമിൾ", pa: "ਉੱਲੀ", or: "କବକ"
    },
    oomycete: {
      en: "Oomycete / Water Mold", hi: "जल-फफूंद", kn: "ನೀರು ಶಿಲೀಂಧ್ರ", te: "నీటి శిలీంధ్రం", ta: "நீர் பூஞ்சை",
      mr: "पाणथळ बुरशी", gu: "પાણીજન્ય ફૂગ", bn: "পানিবাহিত ছত্রাক", ml: "ജല കുമിൾ", pa: "ਪਾਣੀ ਵਾਲੀ ਉੱਲੀ", or: "ଜଳ କବକ"
    },
    viral: {
      en: "Viral (Whitefly Vector)", hi: "विषाणु (सफेद मक्खी)", kn: "ವೈರಸ್ (ಬಿಳಿನೊಣ)", te: "వైరస్ (తెల్లదోమ)", ta: "வைரஸ் (வெள்ளை ஈ)",
      mr: "विषाणू (पांढरी माशी)", gu: "વાયરસ (સફેદ માખી)", bn: "ভাইরাস (সাদা মাছি)", ml: "വൈറസ് (വെള്ളീച്ച)", pa: "ਵਾਇਰਸ (ਚਿੱਟੀ ਮੱਖੀ)", or: "ଭୂତାଣୁ (ଧଳା ମାଛି)"
    },
    bacterial: {
      en: "Bacterial", hi: "जीवाणु जनित", kn: "ಬ್ಯಾಕ್ಟೀರಿಯಾ", te: "బాక్టీరియా", ta: "பாக்டீரியா",
      mr: "जिवाणूजन्य", gu: "બેક્ટેરિયા", bn: "ব্যাকটেরিয়া", ml: "ബാക്ടീരിയ", pa: "ਬੈਕਟੀਰੀਆ", or: "ଜୀବାଣୁ"
    },
    pest: {
      en: "Pest / Insect Larva", hi: "कीट / इल्ली", kn: "ಕೀಟ / ಹುಳು", te: "పురుగు / లార్వా", ta: "பூச்சி / புழு",
      mr: "कीड / अळी", gu: "જીવાત / ઈયળ", bn: "পোকা / শুঁয়োপোকা", ml: "കീടം / പുഴു", pa: "ਕੀੜਾ / ਸੁੰਡੀ", or: "କୀଟ / ଶୁଆ"
    },
    healthy: {
      en: "Healthy Canopy", hi: "स्वस्थ अवस्था", kn: "ಆರೋಗ್ಯಕರ ಬೆಳೆ", te: "ఆరోగ్యకరమైన పంట", ta: "ஆரோக்கிய நிலை",
      mr: "निरोगी पीक", gu: "તંદુરસ્ત સ્થિતિ", bn: "সুস্থ ফসল", ml: "ആരോഗ്യ നില", pa: "ਤੰਦਰੁਸਤ ਹਾਲਤ", or: "ସୁସ୍ଥ ଅବସ୍ଥା"
    }
  };

  const DISEASE_NAMES = {
    tomato_early_blight: {
      en: "Early Blight", hi: "अगेती झुलसा", kn: "ಆರಂಭಿಕ ಅಂಗಮಾರಿ", te: "ముందస్తు ఆకుమాడు", ta: "ஆரம்ப கால கருகல்",
      mr: "लवकर येणारा करपा", gu: "આગોતરો સુકારો", bn: "আগাম ধ্বসা রোগ", ml: "ആദ്യകാല ഇലപ്പുള്ളി", pa: "ਅਗੇਤਾ ਝੁਲਸ ਰੋਗ", or: "ଆଗୁଆ ପତ୍ରପୋଡ଼ା"
    },
    tomato_late_blight: {
      en: "Late Blight", hi: "पछेती झुलसा", kn: "ತಡವಾದ ಅಂಗಮಾರಿ", te: "ఆలస్య ఆకుమాడు", ta: "தாமதமான கருகல்",
      mr: "उशिरा येणारा करपा", gu: "પાછોતરો સુકારો", bn: "নাবি ধ্বসা রোগ", ml: "വൈകിയുള്ള അഴുകൽ", pa: "ਪਛੇਤਾ ਝੁਲਸ ਰੋਗ", or: "ପଛୁଆ ପତ୍ରପୋଡ଼ା"
    },
    tomato_leaf_curl: {
      en: "Leaf Curl & Chlorosis", hi: "पत्ती मरोड़ व पीलापन", kn: "ಎಲೆ ಮುದುರು ಮತ್ತು ಹಳದಿ", te: "ఆకు ముడత & పసుపు", ta: "இலை சுருள் & மஞ்சள்",
      mr: "पर्णकुंचन व पिवळेपणा", gu: "પર્ણ વલન અને પીળાશ", bn: "পাতা কোঁকড়ানো ও হলুদ", ml: "ഇലച്ചുരുൾ & മഞ്ഞളിപ്പ്", pa: "ਪੱਤਾ ਮਰੋੜ ਤੇ ਪੀਲਾਪਣ", or: "ପତ୍ର କୁଞ୍ଚନ ଓ ହଳଦିଆ"
    },
    potato_late_blight: {
      en: "Potato Late Blight", hi: "आलू पछेती झुलसा", kn: "ಆಲೂಗಡ್ಡೆ ಅಂಗಮಾರಿ", te: "బంగాళాదుంప ఆకుమాడు", ta: "உருளை தாமதக் கருகல்",
      mr: "बटाटा उशिरा करपा", gu: "બટાકા પાછોતરો સુકારો", bn: "আলুর নাবি ধ্বসা", ml: "ഉരുളക്കിഴങ്ങ് ചീയൽ", pa: "ਆਲੂ ਪਛੇਤਾ ਝੁਲਸ", or: "ଆଳୁ ପଛୁଆ ପତ୍ରପୋଡ଼ା"
    },
    potato_early_blight: {
      en: "Potato Early Blight", hi: "आलू अगेती झुलसा", kn: "ಆಲೂಗಡ್ಡೆ ಆರಂಭಿಕ ಮಚ್ಚೆ", te: "బంగాళాదుంప ముందస్తు మచ్చ", ta: "உருளை ஆரம்பக் கருகல்",
      mr: "बटाटा लवकर करपा", gu: "બટાકા આગોતરો સુકારો", bn: "আলুর আগাম ধ্বসা", ml: "ഉരുളക്കിഴങ്ങ് ഇലപ്പുള്ളി", pa: "ਆਲੂ ਅਗੇਤਾ ਝੁਲਸ", or: "ଆଳୁ ଆଗୁଆ ପତ୍ରପୋଡ଼ା"
    },
    maize_northern_leaf_blight: {
      en: "Northern Corn Leaf Blight", hi: "मक्का उत्तरी पत्ती झुलसा", kn: "ಮೆಕ್ಕೆಜೋಳ ಎಲೆ ಅಂಗಮಾರಿ", te: "మొక్కజొన్న ఆకుమాడు", ta: "சோள இலைக் கருகல்",
      mr: "मका करपा रोग", gu: "મકાઈ પાનનો સુકારો", bn: "ভুট্টার পাতা পোড়া", ml: "ചോളം ഇലക്കരിച്ചിൽ", pa: "ਮੱਕੀ ਪੱਤਾ ਝੁਲਸ", or: "ମକା ପତ୍ରପୋଡ଼ା"
    },
    maize_common_rust: {
      en: "Common Rust", hi: "मक्का रतुआ रोग", kn: "ಮೆಕ್ಕೆಜೋಳ ತುಕ್ಕು ರೋಗ", te: "మొక్కజొన్న తుప్పు తెగులు", ta: "துரு நோய்",
      mr: "तांबेरा रोग", gu: "ગેરૂ રોગ", bn: "মরিচা রোগ", ml: "തുരുമ്പു രോഗം", pa: "ਕੁੰਗੀ ਰੋਗ", or: "କଳଙ୍କି ରୋଗ"
    },
    maize_fall_armyworm: {
      en: "Fall Armyworm", hi: "फॉल आर्मीवर्म इल्ली", kn: "ಸೈನಿಕ ಹುಳು", te: "కత్తెర పురుగు", ta: "படைப்புழு",
      mr: "लष्करी अळी", gu: "લશ્કરી ઈયળ", bn: "ফল আর্মিওয়ার্ম পোকা", ml: "പടയളിപ്പുഴു", pa: "ਫ਼ੌਜੀ ਸੁੰਡੀ", or: "ସୈନିକ ପୋକ"
    },
    rice_blast: {
      en: "Rice Blast", hi: "धान झोंका (ब्लास्ट) रोग", kn: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ", te: "వరి అగ్గి తెగులు", ta: "நெல் குலை நோய்",
      mr: "भात करपा रोग", gu: "ડાંગરનો કરમો", bn: "ধানের ব্লাস্ট রোগ", ml: "നെല്ല് കുലവാട്ടം", pa: "ਝੋਨੇ ਦਾ ਬਲਾਸਟ ਰੋਗ", or: "ଧାନ ମହିଷା ରୋଗ"
    },
    rice_bacterial_leaf_blight: {
      en: "Bacterial Leaf Blight", hi: "जीवाणु पत्ती झुलसा", kn: "ಬ್ಯಾಕ್ಟೀರಿಯಾ ಎಲೆ ಅಂಗಮಾರಿ", te: "బాక్టీరియా ఆకు ఎండు తెగులు", ta: "பாக்டீரியா இலை கருகல்",
      mr: "जिवाणूजन्य करपा", gu: "જીવાણુ પાન સુકારો", bn: "ব্যাকটেরিয়াজনিত পাতা পোড়া", ml: "ബാക്ടീരിയ ഇലക്കരിച്ചിൽ", pa: "ਬੈਕਟੀਰੀਆ ਪੱਤਾ ਝੁਲਸ", or: "ଜୀବାଣୁ ପତ୍ରପୋଡ଼ା"
    },
    wheat_yellow_rust: {
      en: "Yellow / Stripe Rust", hi: "पीला रतुआ रोग", kn: "ಹಳದಿ ತುಕ್ಕು ರೋಗ", te: "పసుపు తుప్పు తెగులు", ta: "மஞ்சள் துரு நோய்",
      mr: "पिवळा तांबेरा", gu: "પીળો ગેરૂ", bn: "হলুদ মরিচা রোগ", ml: "മഞ്ഞ തുരുമ്പ്", pa: "ਪੀਲੀ ਕੁੰਗੀ", or: "ହଳଦିଆ କଳଙ୍କି"
    },
    wheat_leaf_blight: {
      en: "Spot Blotch / Leaf Blight", hi: "पत्ती धब्बा व झुलसा", kn: "ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ಅಂಗಮಾರಿ", te: "ఆకు మచ్చ తెగులు", ta: "இலை புள்ளி கருகல்",
      mr: "पानावरील ठिपके व करपा", gu: "પાન ટપકાં અને સુકારો", bn: "পাতার দাগ ও পোড়া", ml: "ഇലപ്പുള്ളി രോഗം", pa: "ਪੱਤਾ ਧੱਬਾ ਤੇ ਝੁਲਸ", or: "ପତ୍ର ଦାଗ ଓ ପୋଡ଼ା"
    },
    cotton_leaf_spot_blight: {
      en: "Leaf Spot / Bacterial Blight", hi: "पत्ती धब्बा व जीवाणु झुलसा", kn: "ಎಲೆ ಚುಕ್ಕೆ ಮತ್ತು ಅಂಗಮಾರಿ", te: "ఆకు మచ్చ & బాక్టీరియా తెగులు", ta: "இலை புள்ளி நோய்",
      mr: "पानावरील ठिपके व करपा", gu: "પાનના ટપકાં", bn: "পাতার দাগ রোগ", ml: "ഇലപ്പുള്ളി രോഗം", pa: "ਪੱਤਾ ਧੱਬਾ ਰੋਗ", or: "ପତ୍ର ଦାଗ ରୋଗ"
    },
    cotton_leaf_curl_chlorosis: {
      en: "Leaf Curl & Mosaic", hi: "पत्ती मरोड़ व मोज़ेक", kn: "ಎಲೆ ಮುದುರು ರೋಗ", te: "ఆకు ముడత వైరస్", ta: "இலை சுருள் நோய்",
      mr: "पाने वाकडी होणे (पर्णकुंचन)", gu: "પર્ણ વલન વાયરસ", bn: "পাতা কোঁকড়ানো রোগ", ml: "ഇലച്ചുരുൾ രോഗം", pa: "ਪੱਤਾ ਮਰੋੜ ਰੋਗ", or: "ପତ୍ର କୁଞ୍ଚନ ରୋଗ"
    },
    cotton_pink_bollworm: {
      en: "Pink Bollworm", hi: "गुलाबी सुंडी", kn: "ಗುಲಾಬಿ ಕಾಯಿಕೊರಕ", te: "గులాబీ రంగు పురుగు", ta: "இளஞ்சிவப்பு காய்ப்புழு",
      mr: "गुलाबी बोंडअळी", gu: "ગુલાબી ઈયળ", bn: "গোলাপী বলওয়ার্ম", ml: "പിങ്ക് കായ്തുരപ്പൻ", pa: "ਗੁਲਾਬੀ ਸੁੰਡੀ", or: "ଗୋଲାପୀ କୀଟ"
    },
    onion_purple_blotch: {
      en: "Purple Blotch", hi: "बैंगनी धब्बा रोग", kn: "ನೇರಳೆ ಮಚ್ಚೆ ರೋಗ", te: "ఊదా మచ్చ తెగులు", ta: "ஊதா கறை நோய்",
      mr: "जांभळा करपा", gu: "જાંબલી ડાઘ રોગ", bn: "বেগুনি দাগ রোগ", ml: "പർപ്പിൾ ബ്ലോച്ച്", pa: "ਜਾਮਣੀ ਧੱਬਾ ਰੋਗ", or: "ବାଇଗଣୀ ଦାଗ"
    },
    onion_stemphylium_blight: {
      en: "Stemphylium Blight", hi: "स्टेमफिलियम झुलसा", kn: "ಕೊನೆ ಸುಡುವಿಕೆ ರೋಗ", te: "కొస ఎండు తెగులు", ta: "நுனி கருகல் நோய்",
      mr: "शेंडा करपा", gu: "ટપકાં અને સુકારો", bn: "আগা শুকানো রোগ", ml: "ഇലത്തുമ്പ് കരിച്ചിൽ", pa: "ਸਿਰਾ ਝੁਲਸ ਰੋਗ", or: "ଅଗ ପୋଡ଼ା ରୋଗ"
    },
    soybean_yellow_mosaic: {
      en: "Yellow Mosaic Virus", hi: "पीला मोज़ेक विषाणु", kn: "ಹಳದಿ ನಂಜು ರೋಗ", te: "పసుపు మొజాయిక్ వైరస్", ta: "மஞ்சள் தேமல் வைரஸ்",
      mr: "पिवळा मोझॅक विषाणू", gu: "પીળો મોઝેક વાયરસ", bn: "হলুদ মোজাইক ভাইরাস", ml: "മഞ്ഞ മൊസൈക്ക് വൈറസ്", pa: "ਪੀਲਾ ਮੋਜ਼ੇਕ ਵਾਇਰਸ", or: "ହଳଦିଆ ମୋଜାଇକ୍ ଭୂତାଣୁ"
    },
    soybean_rust: {
      en: "Soybean Rust", hi: "सोयाबीन रतुआ", kn: "ಸೋಯಾಬೀನ್ ತುಕ್ಕು ರೋಗ", te: "సోయా తుప్పు తెగులు", ta: "சோயா துரு நோய்",
      mr: "सोयाबीन तांबेरा", gu: "સોયાબીન ગેરૂ", bn: "সয়াবিন মরিচা", ml: "സോയ തുരുമ്പ്", pa: "ਸੋਇਆਬੀਨ ਕੁੰਗੀ", or: "ସୋୟାବିନ୍ କଳଙ୍କି"
    },
    groundnut_tikka: {
      en: "Tikka Leaf Spot", hi: "टिक्का पत्ती धब्बा", kn: "ತಿಕ್ಕಾ ಎಲೆ ಚುಕ್ಕೆ", te: "తిక్కా ఆకు మచ్చ", ta: "டிக்கா இலை புள்ளி",
      mr: "टिक्का पान ठिपका", gu: "ટીક્કા પાન ટપકાં", bn: "টিক্কা পাতা দাগ", ml: "ടിക്ക ഇലപ്പുള്ളി", pa: "ਟਿੱਕਾ ਪੱਤਾ ਧੱਬਾ", or: "ଟିକ୍କା ପତ୍ର ଦାଗ"
    },
    groundnut_rust: {
      en: "Groundnut Rust", hi: "मूंगफली रतुआ", kn: "ಕಡಲೆಕಾಯಿ ತುಕ್ಕು ರೋಗ", te: "వేరుశనగ తుప్పు తెగులు", ta: "நிலக்கடலை துரு நோய்",
      mr: "भुईमूग तांबेरा", gu: "મગફળી ગેરૂ", bn: "বাদাম মরিচা রোগ", ml: "നിലക്കടല തുരുമ്പ്", pa: "ਮੂੰਗਫਲੀ ਕੁੰਗੀ", or: "ଚିନାବାଦାମ କଳଙ୍କି"
    },
    ragi_blast: {
      en: "Ragi Blast", hi: "रागी ब्लास्ट रोग", kn: "ರಾಗಿ ಬೆಂಕಿ ರೋಗ", te: "రాగి అగ్గి తెగులు", ta: "கேழ்வரகு குலை நோய்",
      mr: "नाचणी करपा", gu: "રાગી બ્લાસ્ટ રોગ", bn: "রাগি ব্লাস্ট রোগ", ml: "റാഗി വാട്ടം", pa: "ਰਾਗੀ ਬਲਾਸਟ", or: "ମାଣ୍ଡିଆ ମହିଷା"
    },
    jowar_grain_mold_blight: {
      en: "Leaf Blight / Shoot Fly", hi: "पत्ती झुलसा व प्ररोह मक्खी", kn: "ಎಲೆ ಅಂಗಮಾರಿ ಮತ್ತು ಕಾಂಡ ನೊಣ", te: "ఆకుమాడు & కాండం ఈగ", ta: "இலைக் கருகல் & தண்டு ஈ",
      mr: "पान करपा व खोडमाशी", gu: "પાન સુકારો અને સાંઠાની માખી", bn: "পাতা পোড়া ও কান্ড মাছি", ml: "ഇലക്കരിച്ചിലും തണ്ടീച്ചയും", pa: "ਪੱਤਾ ਝੁਲਸ ਤੇ ਤਣਾ ਮੱਖੀ", or: "ପତ୍ରପୋଡ଼ା ଓ କାଣ୍ଡ ମାଛି"
    },
    sugarcane_red_rot: {
      en: "Sugarcane Red Rot", hi: "गन्ना लाल सड़न रोग", kn: "ಕಬ್ಬು ಕೆಂಪು ಕೊಳೆ ರೋಗ", te: "చెరకు ఎర్ర కుళ్ళు తెగులు", ta: "கரும்பு செவ்வழுகல் நோய்",
      mr: "ऊस तांबडा कुजवा", gu: "શેરડી લાલ સડો", bn: "আখের লাল পচা রোগ", ml: "കരിമ്പ് ചെഞ്ചീയൽ", pa: "ਗੰਨੇ ਦਾ ਰੱਤਾ ਰੋਗ", or: "ଆଖୁ ଲାଲ୍ ସଢ଼ା"
    },
    mustard_alternaria_blight: {
      en: "Alternaria Blight", hi: "अल्टरनेरिया झुलसा रोग", kn: "ಆಲ್ಟರ್ನೇರಿಯಾ ಎಲೆ ಚುಕ್ಕೆ", te: "ఆల్టర్నేరియా ఆకుమాడు", ta: "ஆல்டர்னேரியா கருகல்",
      mr: "अल्टरनेरिया करपा", gu: "અલ્ટરનેરિયા સુકારો", bn: "অল্টারনারিয়া ধ্বসা", ml: "ആൾട്ടർനേറിയ ഇലപ്പുള്ളി", pa: "ਅਲਟਰਨੇਰੀਆ ਝੁਲਸ", or: "ଅଲ୍ଟରନେରିଆ ପତ୍ରପୋଡ଼ା"
    }
  };

  // Visual-signature localized agronomy guidance (pure target language)
  const SIG_GUIDANCE = {
    gray_tan_spot: {
      hi: { sym: "पत्तियों पर भूरे-धूसर गोल या अंडाकार धब्बे और पीला घेरा।", trig: "नमी (>80%), ओस व हल्की बारिश (18–28°C)।", bio: "ट्राइकोडर्मा विरिडी / बैसिलस सबटिलिस @ 5 ग्राम/लीटर छिड़काव।", chem: "मैंकोजेब या एज़ोक्सीस्ट्रोबिन आधारित अनुशंसित फफूंदनाशक।", prev: "रोगरोधी बीज, फसल चक्र और खेत की स्वच्छता अपनाएँ।" },
      kn: { sym: "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು-ಬೂದು ಬಣ್ಣದ ಚುಕ್ಕೆಗಳು ಮತ್ತು ಹಳದಿ ವಲಯ.", trig: "ಹೆಚ್ಚಿನ ತೇವಾಂಶ (>80%) ಮತ್ತು ಮಂಜಿನ ವಾತಾವರಣ (18–28°C).", bio: "ಟ್ರೈಕೋಡರ್ಮಾ ಅಥವಾ ಸ್ಯೂಡೋಮೊನಾಸ್ @ 5 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.", chem: "ಮ್ಯಾಂಕೋಜೆಬ್ ಅಥವಾ ಅಝೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ ಶಿಲೀಂಧ್ರನಾಶಕ.", prev: "ರೋಗ ನಿರೋಧಕ ತಳಿ ಬಳಕೆ ಮತ್ತು ಬೆಳೆ ಪರಿವರ್ತನೆ." },
      mr: { sym: "पानांवर राखाडी-तपकिरी गोल ठिपके व भोवती पिवळे वलय.", trig: "जास्त आर्द्रता (>80%), दव व मध्यम तापमान (18–28°C).", bio: "ट्रायकोडर्मा किंवा सुडोमोनास @ 5 ग्रॅम/लिटर फवारणी.", chem: "मॅन्कोझेब किंवा ॲझोक्सिस्ट्रोबिन बुरशीनाशक.", prev: "रोगप्रतिकारक वाण, पीक फेरपालट आणि स्वच्छ शेती." },
      te: { sym: "ఆకులపై గోధుమ-బూడిద మచ్చలు మరియు పసుపు వలయం.", trig: "అధిక తేమ (>80%) మరియు పొగమంచు (18–28°C).", bio: "ట్రైకోడెర్మా లేదా సూడోమోనాస్ @ 5 గ్రా/లీటరు పిచికారీ.", chem: "మాంకోజెబ్ లేదా అజోక్సిస్ట్రోబిన్ సిఫార్సు మందు.", prev: "నిరోధక రకాలు మరియు పంట మార్పిడి." },
      ta: { sym: "இலைகளில் பழுப்பு-சாம்பல் புள்ளிகள் மற்றும் மஞ்சள் வளையம்.", trig: "அதிக ஈரப்பதம் (>80%) மற்றும் பனி (18–28°C).", bio: "டிரைக்கோடெர்மா அல்லது சூடோமோனாஸ் @ 5 கி/லி தெளிப்பு.", chem: "மான்கோசெப் அல்லது அசாக்ஸிஸ்ட்ரோபின் பூஞ்சாணக்கொல்லி.", prev: "எதிர்ப்பு ரக விதைகள் மற்றும் பயிர் சுழற்சி." },
      gu: { sym: "પાંદડા પર રાખોડી-ભૂરા ડાઘ અને ફરતે પીળો ઘેરાવો.", trig: "વધુ ભેજ (>80%) અને ઝાકળ (18–28°C).", bio: "ટ્રાઇકોડર્મા અથવા સ્યુડોમોનાસ @ 5 ગ્રામ/લિટર છંટકાવ.", chem: "મેન્કોઝેબ અથવા એઝોક્સીસ્ટ્રોબિન ફૂગનાશક.", prev: "રોગપ્રતિકારક જાતો અને પાક ફેરબદલી." },
      bn: { sym: "পাতায় ধূসর-বাদামী দাগ এবং চারপাশে হলুদ বলয়।", trig: "অতিরিক্ত আর্দ্রতা (>৮০%) ও কুয়াশা (১৮–২৮°C)।", bio: "ট্রাইকোডার্মা বা সিউডোমোনাস @ ৫ গ্রাম/লিটার স্প্রে।", chem: "ম্যানকোজেব বা অ্যাজোক্সিস্ট্রবিন ছত্রাকনাশক।", prev: "প্রতিরোধী জাত ব্যবহার ও শস্য আবর্তন।" },
      ml: { sym: "ഇലകളിൽ ചാര-തവിട്ട് നിറമുള്ള പുള്ളികളും മഞ്ഞ വലയവും.", trig: "കൂടിയ ഈർപ്പവും (>80%) മഞ്ഞും (18–28°C).", bio: "ട്രൈക്കോഡെർമ അല്ലെങ്കിൽ സ്യൂഡോമോണാസ് @ 5 ഗ്രാം/ലിറ്റർ തളിക്കുക.", chem: "മാൻകോസെബ് അല്ലെങ്കിൽ അസോക്സിസ്ട്രോബിൻ കുമിൾനാശിനി.", prev: "പ്രതിരോധശേഷിയുള്ള ഇനങ്ങളും വിളമാറ്റവും." },
      pa: { sym: "ਪੱਤਿਆਂ ਤੇ ਭੂਰੇ-ਸਲੇਟੀ ਧੱਬੇ ਅਤੇ ਆਲੇ-ਦੁਆਲੇ ਪੀਲਾ ਘੇਰਾ।", trig: "ਵੱਧ ਨਮੀ (>80%) ਅਤੇ ਤ੍ਰੇਲ ਵਾਲਾ ਮੌਸਮ (18–28°C)।", bio: "ਟ੍ਰਾਈਕੋਡਰਮਾ ਜਾਂ ਸੂਡੋਮੋਨਾਸ @ 5 ਗ੍ਰਾਮ/ਲੀਟਰ ਛਿੜਕਾਅ।", chem: "ਮੈਨਕੋਜ਼ੇਬ ਜਾਂ ਅਜ਼ੋਕਸੀਸਟ੍ਰੋਬਿਨ ਉੱਲੀਨਾਸ਼ਕ।", prev: "ਰੋਗ-ਰੋਧਕ ਬੀਜ ਅਤੇ ਫ਼ਸਲੀ ਚੱਕਰ ਅਪਣਾਓ।" },
      or: { sym: "ପତ୍ରରେ ପାଉଁଶିଆ-ମାଟିଆ ଦାଗ ଓ ହଳଦିଆ ଘେର।", trig: "ଅଧିକ ଆର୍ଦ୍ରତା (>୮୦%) ଓ କାକର (୧୮–୨୮°C)।", bio: "ଟ୍ରାଇକୋଡର୍ମା ବା ସୁଡୋମୋନାସ୍ @ ୫ ଗ୍ରାମ୍/ଲିଟର ସ୍ପ୍ରେ।", chem: "ମାଙ୍କୋଜେବ୍ ବା ଆଜୋକ୍ସିଷ୍ଟ୍ରୋବିନ୍ କବକନାଶକ।", prev: "ରୋଗ ପ୍ରତିରୋଧକ ବିହନ ଓ ଫସଲ ପର୍ଯ୍ୟାୟ।" }
    },
    fungal_blight_dark: {
      hi: { sym: "पत्तियों पर गहरे काले-भूरे पानी भीगे धब्बे जो तेजी से फैलते हैं।", trig: "ठंडी व नम रातें, भारी ओस या लगातार वर्षा (आर्द्रता >85%)।", bio: "कॉपर हाइड्रॉक्साइड @ 2 ग्राम/लीटर निवारक छिड़काव।", chem: "सिमोक्सानिल + मैंकोजेब या मेटालैक्सिल युक्त फफूंदनाशक।", prev: "जलभराव रोकें, शाम की सिंचाई टालें और संक्रमित पत्तियाँ नष्ट करें।" },
      kn: { sym: "ಎಲೆಗಳ ಮೇಲೆ ವೇಗವಾಗಿ ಹರಡುವ ಕಪ್ಪು-ಕಂದು ನೀರು ತುಂಬಿದ ಮಚ್ಚೆಗಳು.", trig: "ತಂಪಾದ ರಾತ್ರಿ, ಮಂಜು ಮತ್ತು ನಿರಂತರ ಮಳೆ (ತೇವಾಂಶ >85%).", bio: "ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ @ 2 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.", chem: "ಮೆಟಾಲಾಕ್ಸಿಲ್ + ಮ್ಯಾಂಕೋಜೆಬ್ ಶಿಲೀಂಧ್ರನಾಶಕ.", prev: "ನೀರು ನಿಲ್ಲದಂತೆ ನೋಡಿಕೊಳ್ಳಿ ಮತ್ತು ರೋಗಗ್ರಸ್ತ ಎಲೆಗಳನ್ನು ನಾಶಪಡಿಸಿ." },
      mr: { sym: "पानांवर झपाट्याने पसरणारे काळे-तपकिरी पाणथळ ठिपके.", trig: "थंड रात्री, धुके आणि सततचा पाऊस (आर्द्रता >85%).", bio: "कॉपर हायड्रॉक्साईड @ 2 ग्रॅम/लिटर प्रतिबंधात्मक फवारणी.", chem: "मेटॅलॅक्सिल + मॅन्कोझेब किंवा सायमॉक्सॅनिल बुरशीनाशक.", prev: "पाणी साचू देऊ नका आणि रोगट अवशेष नष्ट करा." },
      te: { sym: "ఆకులపై వేగంగా వ్యాపించే నలుపు-గోధుమ నీటి మచ్చలు.", trig: "చల్లని రాత్రులు, పొగమంచు మరియు నిరంతర వర్షాలు.", bio: "కాపర్ హైడ్రాక్సైడ్ @ 2 గ్రా/లీటరు పిచికారీ.", chem: "మెటలాక్సిల్ + మాంకోజెబ్ శిలీంధ్రనాಶిని.", prev: "పొలంలో నీరు నిల్వ ఉండకుండా చూడండి." },
      ta: { sym: "இலைகளில் விரைவாக பரவும் கரும்பழுப்பு நீர் கோர்த்த புள்ளிகள்.", trig: "குளிர்ந்த இரவு, பனி மற்றும் தொடர் மழை (>85% ஈரம்).", bio: "காப்பர் ஹைட்ராக்சைடு @ 2 கி/லி தெளிக்கவும்.", chem: "மெட்டாலாக்சில் + மான்கோசெப் பூஞ்சாணக்கொல்லி.", prev: "மாலைப் பாசனத்தைத் தவிர்க்கவும்; பாதிக்கப்பட்ட இலைகளை அழிக்கவும்." },
      gu: { sym: "પાંદડા પર ઝડપથી ફેલાતા કાળા-ભૂરા પાણી જેવા ડાઘ.", trig: "ઠંડી રાત, ધુમ્મસ અને સતત વરસાદ (ભેજ >85%).", bio: "કોપર હાઇડ્રોક્સાઇડ @ 2 ગ્રામ/લિટર છંટકાવ.", chem: "મેટાલેક્સિલ + મેન્કોઝેબ ફૂગનાશક.", prev: "ખેતરમાં પાણી ભરાવા ન દો અને રોગગ્રસ્ત પાન દૂર કરો." },
      bn: { sym: "পাতায় দ্রুত ছড়ানো কালো-বাদামী জলছাপের মতো দাগ।", trig: "ঠান্ডা রাত, কুয়াশা ও টানা বৃষ্টি (আর্দ্রতা >৮৫%)।", bio: "কপার হাইড্রোক্সাইড @ ২ গ্রাম/লিটার স্প্রে।", chem: "মেটালাক্সিল + ম্যানকোজেব ছত্রাকনাশক।", prev: "জল নিকাশী ঠিক রাখুন এবং আক্রান্ত পাতা নষ্ট করুন।" },
      ml: { sym: "ഇലകളിൽ വേഗത്തിൽ പടരുന്ന കറുത്ത-തവിട്ട് നിറത്തിലുള്ള പാടുകൾ.", trig: "തണുത്ത രാത്രികൾ, മഞ്ഞ്, തുടർച്ചയായ മഴ (>85%).", bio: "കോപ്പർ ഹൈഡ്രോക്സൈഡ് @ 2 ഗ്രാം/ലിറ്റർ തളിക്കുക.", chem: "മെറ്റാലാക്സിൽ + മാൻകോസെബ് കുമിൾനാശിനി.", prev: "വെള്ളക്കെട്ട് ഒഴിവാക്കുകയും രോഗബാധിത ഇലകൾ നശിപ്പിക്കുകയും ചെയ്യുക." },
      pa: { sym: "ਪੱਤਿਆਂ ਤੇ ਤੇਜ਼ੀ ਨਾਲ ਫੈਲਣ ਵਾਲੇ ਕਾਲੇ-ਭੂਰੇ ਪਾਣੀ ਵਰਗੇ ਧੱਬੇ।", trig: "ਠੰਢੀਆਂ ਰਾਤਾਂ, ਧੁੰਦ ਅਤੇ ਲਗਾਤਾਰ ਮੀਂਹ (ਨਮੀ >85%)।", bio: "ਕਾਪਰ ਹਾਈਡ੍ਰੋਕਸਾਈਡ @ 2 ਗ੍ਰਾਮ/ਲੀਟਰ ਛਿੜਕਾਅ।", chem: "ਮੈਟਾਲੈਕਸਿਲ + ਮੈਨਕੋਜ਼ੇਬ ਉੱਲੀਨਾਸ਼ਕ।", prev: "ਪਾਣੀ ਨਾ ਖੜ੍ਹਨ ਦਿਓ ਅਤੇ ਰੋਗੀ ਪੱਤੇ ਨਸ਼ਟ ਕਰੋ।" },
      or: { sym: "ପତ୍ରରେ ଶୀଘ୍ର ବ୍ୟାପୁଥିବା କଳା-ମାଟିଆ ପାଣିଆ ଦାଗ।", trig: "ଥଣ୍ଡା ରାତି, କୁହୁଡ଼ି ଓ ଲଗାତାର ବର୍ଷା (>୮୫%)।", bio: "କପର୍ ହାଇଡ୍ରୋକ୍ସାଇଡ୍ @ ୨ ଗ୍ରାମ୍/ଲିଟର ସ୍ପ୍ରେ।", chem: "ମେଟାଲାକ୍ସିଲ୍ + ମାଙ୍କୋଜେବ୍ କବକନାଶକ।", prev: "ଜଳ ନିଷ୍କାସନ କରନ୍ତୁ ଓ ରୋଗଗ୍ରସ୍ତ ପତ୍ର ନଷ୍ଟ କରନ୍ତୁ।" }
    },
    rust_pustule: {
      hi: { sym: "पत्तियों पर नारंगी-भूरे पाउडर जैसे रतुआ दाने।", trig: "ठंडी रातें, सुबह की ओस और बादल छाया मौसम।", bio: "घुलनशील गंधक 80% @ 3 ग्राम/लीटर छिड़काव।", chem: "प्रोपिकोनाज़ोल या टेबुकोनाज़ोल @ 1 मिली/लीटर।", prev: "संतुलित नाइट्रोजन दें व प्रतिरोधी किस्म चुनें।" },
      kn: { sym: "ಎಲೆಗಳ ಮೇಲೆ ಕಿತ್ತಳೆ-ಕಂದು ಬಣ್ಣದ ಪುಡಿ ತುಕ್ಕು ಗುಳ್ಳೆಗಳು.", trig: "ತಂಪಾದ ರಾತ್ರಿ ಮತ್ತು ಮುಂಜಾನೆಯ ಮಂಜು.", bio: "ನೀರಿನಲ್ಲಿ ಕರಗುವ ಗಂಧಕ @ 3 ಗ್ರಾಂ/ಲೀಟರ್ ಸಿಂಪಡಿಸಿ.", chem: "ಪ್ರೊಪಿಕೊನಾಜೋಲ್ ಅಥವಾ ಟೆಬುಕೊನಾಜೋಲ್ @ 1 ಮಿ.ಲೀ/ಲೀಟರ್.", prev: "ಸಮತೋಲಿತ ಸಾರಜನಕ ಮತ್ತು ನಿರೋಧಕ ತಳಿ ಬಳಸಿ." },
      mr: { sym: "पानांवर केशरी-तपकिरी पावडरसारखे तांबेरा पुरळ.", trig: "थंड रात्री, सकाळचे दव व ढगाळ हवामान.", bio: "पाण्यात विरघळणारे गंधक 80% @ 3 ग्रॅम/लिटर फवारा.", chem: "प्रोपिकोनॅझोल किंवा टेबुकॉनॅझोल @ 1 मिली/लिटर.", prev: "संतुलित नत्र वापर आणि प्रतिकारक वाण." },
      te: { sym: "ఆకులపై నారింజ-గోధుమ రంగు పొడి తుప్పు పొక్కులు.", trig: "చల్లని రాత్రులు మరియు ఉదయం మంచు.", bio: "గంధకం 80% @ 3 గ్రా/లీటరు పిచికారీ.", chem: "ప్రోపికోనజోల్ @ 1 మి.లీ/లీటరు.", prev: "సమతుల్య ఎరువులు మరియు నిరోధక విత్తనాలు." },
      ta: { sym: "இலைகளில் ஆரஞ்சு-பழுப்பு துருப் பொடி கொப்புளங்கள்.", trig: "குளிர்ந்த இரவு மற்றும் காலைப் பனி.", bio: "கந்தகம் 80% @ 3 கி/லி தெளிப்பு.", chem: "புரோப்பிகோனசோல் @ 1 மி.லி/லி.", prev: "சமச்சீர் உரமிடுதல் மற்றும் எதிர்ப்பு ரகம்." },
      gu: { sym: "પાંદડા પર નારંગી-ભૂરા રંગના પાવડર જેવા ગેરૂ ફોલ્લા.", trig: "ઠંડી રાત અને સવારનું ઝાકળ.", bio: "દ્રાવ્ય સલ્ફર 80% @ 3 ગ્રામ/લિટર છંટકાવ.", chem: "પ્રોપિકોનાઝોલ @ 1 મિલી/લિટર.", prev: "સંતુલિત નાઇટ્રોજન અને પ્રતિકારક બિયારણ." },
      bn: { sym: "পাতায় কমলা-বাদামী গুঁড়োর মতো মরিচা দাগ।", trig: "ঠান্ডা রাত ও সকালের শিশির।", bio: "দ্রবণীয় সালফার ৮০% @ ৩ গ্রাম/লিটার স্প্রে।", chem: "প্রোপিকোনাজল @ ১ মিলি/লিটার।", prev: "সুষম সার প্রয়োগ ও প্রতিরোধী জাত।" },
      ml: { sym: "ഇലകളിൽ ഓറഞ്ച്-തവിട്ട് നിറത്തിലുള്ള പൊടിപോലുള്ള തുരുമ്പ്.", trig: "തണുത്ത രാത്രിയും പ്രഭാത മഞ്ഞും.", bio: "സൾഫർ 80% @ 3 ഗ്രാം/ലിറ്റർ തളിക്കുക.", chem: "പ്രൊപ്പികൊണാസോൾ @ 1 മി.ലി/ലിറ്റർ.", prev: "സന്തുലിത വളപ്രയോഗവും പ്രതിരോധ ഇനങ്ങളും." },
      pa: { sym: "ਪੱਤਿਆਂ ਤੇ ਸੰਤਰੀ-ਭੂਰੇ ਪਾਊਡਰ ਵਰਗੇ ਕੁੰਗੀ ਦੇ ਦਾਣੇ।", trig: "ਠੰਢੀਆਂ ਰਾਤਾਂ ਅਤੇ ਸਵੇਰ ਦੀ ਤ੍ਰੇਲ।", bio: "ਘੁਲਣਸ਼ੀਲ ਸਲਫ਼ਰ 80% @ 3 ਗ੍ਰਾਮ/ਲੀਟਰ ਛਿੜਕਾਅ।", chem: "ਪ੍ਰੋਪੀਕੋਨਾਜ਼ੋਲ @ 1 ਮਿਲੀ/ਲੀਟਰ।", prev: "ਸੰਤੁਲਿਤ ਯੂਰੀਆ ਵਰਤੋਂ ਤੇ ਰੋਗ-ਰੋਧਕ ਕਿਸਮਾਂ।" },
      or: { sym: "ପତ୍ରରେ କମଳା-ମାଟିଆ ଗୁଣ୍ଡ ଭଳି କଳଙ୍କି ଦାଗ।", trig: "ଥଣ୍ଡା ରାତି ଓ ସକାଳ କାକର।", bio: "ଦ୍ରବଣୀୟ ସଲଫର୍ ୮୦% @ ୩ ଗ୍ରାମ୍/ଲିଟର ସ୍ପ୍ରେ।", chem: "ପ୍ରୋପିକୋନାଜୋଲ୍ @ ୧ ମିଲି/ଲିଟର।", prev: "ସନ୍ତୁଳିତ ସାର ଓ ପ୍ରତିରୋଧକ ବିହନ।" }
    },
    chlorosis_mosaic: {
      hi: { sym: "पत्तियों पर पीलापन, चितकबरे धब्बे और पत्तियों का ऊपर मुड़ना।", trig: "गर्म शुष्क मौसम जो सफेद मक्खी को बढ़ाता है।", bio: "पीले चिपचिपे ट्रैप @ 12/एकड़ और नीम तेल @ 3 मिली/लीटर।", chem: "सफेद मक्खी नियंत्रण हेतु अनुशंसित कीटनाशक (केवीके सलाह से)।", prev: "संक्रमित पौधे उखाड़कर नष्ट करें और जालीदार नर्सरी अपनाएँ।" },
      kn: { sym: "ಎಲೆಗಳು ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುವುದು, ಮಚ್ಚೆ ಮತ್ತು ಮುದುರುವುದು.", trig: "ಬಿಸಿ ಒಣ ಹವಾಮಾನ ಮತ್ತು ಬಿಳಿನೊಣದ ಹಾವಳಿ.", bio: "ಹಳದಿ ಅಂಟು ಬಲೆ @ 12/ಎಕರೆ ಮತ್ತು ಬೇವಿನ ಎಣ್ಣೆ @ 3 ಮಿ.ಲೀ/ಲೀಟರ್.", chem: "ಬಿಳಿನೊಣ ನಿಯಂತ್ರಣಕ್ಕೆ ಶಿಫಾರಸು ಕೀಟನಾಶಕ.", prev: "ಸೋಂಕಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಪಡಿಸಿ." },
      mr: { sym: "पाने पिवळी पडणे, पिवळे-हिरवे चट्टे व पाने मुरडणे.", trig: "उष्ण व कोरडे हवामान (पांढरी माशी प्रादुर्भाव).", bio: "पिवळे चिकट सापळे @ 12/एकर व निंबोळी तेल @ 3 मिली/लिटर.", chem: "पांढरी माशी नियंत्रणासाठी शिफारस कीटकनाशक.", prev: "रोगट रोपे उपटून नष्ट करा व मच्छरदाणी रोपवाटिका वापरा." },
      te: { sym: "ఆకులు పసుపు రంగులోకి మారడం, మచ్చలు మరియు ముడత.", trig: "వేడి పొడి వాతావరణంలో తెల్లదోమ ఉధృతి.", bio: "పసుపు జిగురు అట్టలు @ 12/ఎకరం & వేప నూనె @ 3 మి.లీ/లీ.", chem: "తెల్లదోమ నివారణకు సిఫార్సు మందులు.", prev: "వ్యాధి సోకిన మొక్కలను తీసివేయండి." },
      ta: { sym: "இலைகள் மஞ்சளாதல், தேமல் புள்ளிகள் மற்றும் இலை சுருள்.", trig: "வெப்பமான வறண்ட வானிலையில் வெள்ளை ஈ பெருக்கம்.", bio: "மஞ்சள் ஒட்டும் பொறி @ 12/ஏக்கர் & வேப்ப எண்ணெய் @ 3 மி.லி/லி.", chem: "வெள்ளை ஈ கட்டுப்பாட்டு பூச்சிக்கொல்லி.", prev: "பாதிக்கப்பட்ட செடிகளை அகற்றவும்." },
      gu: { sym: "પાંદડા પીળા પડવા, મોઝેક ધબ્બા અને પાન વળવા.", trig: "ગરમ સૂકું હવામાન અને સફેદ માખી.", bio: "પીળા ચીકણા પિંજરા @ 12/એકર અને લીંબોળી તેલ @ 3 મિલી/લિ.", chem: "સફેદ માખી નિયંત્રણ દવા.", prev: "રોગિષ્ઠ છોડ દૂર કરો અને નેટ નર્સરી વાપરો." },
      bn: { sym: "পাতায় উজ্জ্বল হলুদ-সবুজ ছোপ ও পাতা কুঁকড়ে যাওয়া।", trig: "গরম শুষ্ক আবহাওয়ায় সাদা মাছির বিস্তার।", bio: "হলুদ আঠালো ফাঁদ @ ১২/একর ও নিম তেল @ ৩ মিলি/লি।", chem: "সাদা মাছি দমনে অনুমোদিত কীটনাশক।", prev: "আক্রান্ত গাছ তুলে ফেলুন ও প্রতিরোধী জাত চাষ করুন।" },
      ml: { sym: "ഇലകളിൽ മഞ്ഞനിറം, മൊസൈക്ക് പാടുകൾ, ഇലച്ചുരുൾ.", trig: "വരണ്ട ചൂടുള്ള കാലാവസ്ഥയും വെള്ളീച്ചയും.", bio: "മഞ്ഞക്കെണി @ 12/ഏക്കർ, വേപ്പെണ്ണ @ 3 മി.ലി/ലി.", chem: "വെള്ളീച്ച നിയന്ത്രണത്തിന് കീടനാശിനി.", prev: "രോഗം ബാധിച്ച ചെടികൾ നശിപ്പിക്കുക." },
      pa: { sym: "ਪੱਤੇ ਪੀਲੇ ਪੈਣਾ, ਚਿੱਤਕਬਰੇ ਧੱਬੇ ਅਤੇ ਪੱਤਿਆਂ ਦਾ ਮੁੜਨਾ।", trig: "ਗਰਮ ਖੁਸ਼ਕ ਮੌਸਮ ਵਿੱਚ ਚਿੱਟੀ ਮੱਖੀ ਦਾ ਹਮਲਾ।", bio: "ਪੀਲੇ ਚਿਪਚਿਪੇ ਟਰੈਪ @ 12/ਏਕੜ ਅਤੇ ਨਿੰਮ ਦਾ ਤੇਲ @ 3 ਮਿਲੀ/ਲੀ।", chem: "ਚਿੱਟੀ ਮੱਖੀ ਰੋਕਥਾਮ ਲਈ ਸਿਫਾਰਸ਼ ਕੀਟਨਾਸ਼ਕ।", prev: "ਰੋਗੀ ਬੂਟੇ ਪੁੱਟ ਕੇ ਨਸ਼ਟ ਕਰੋ।" },
      or: { sym: "ପତ୍ର ହଳଦିଆ ପଡ଼ିବା, ଦାଗ ଓ ପତ୍ର କୁଞ୍ଚିଯିବା।", trig: "ଗରମ ଶୁଖିଲା ପାଣିପାଗରେ ଧଳା ମାଛି ବୃଦ୍ଧି।", bio: "ହଳଦିଆ ଅଠାଳିଆ ଯନ୍ତା @ ୧୨/ଏକର ଓ ନିମ୍ବ ତେଲ @ ୩ ମିଲି/ଲି।", chem: "ଧଳା ମାଛି ନିୟନ୍ତ୍ରଣ ପାଇଁ କୀଟନାଶକ।", prev: "ରୋଗାକ୍ରାନ୍ତ ଗଛ ଉପାଡ଼ି ନଷ୍ଟ କରନ୍ତୁ।" }
    },
    pest_foliar_damage: {
      hi: { sym: "पत्तियों में कटे-फटे छेद, गोभ में चूर्ण जैसा मल व तने को नुकसान।", trig: "गर्म मौसम व हल्की फुहारों के बीच का सूखा समय।", bio: "नीम तेल (1500 ppm @ 5 मिली/लीटर) या बी.टी. @ 2 ग्राम/लीटर।", chem: "क्लोरैंट्रानिलिप्रोल @ 0.4 मिली/लीटर (केवीके सलाह अनुसार)।", prev: "फेरोमोन ट्रैप @ 5/एकड़ लगाएँ व खेत की मेड़ें साफ रखें।" },
      kn: { sym: "ಎಲೆಗಳಲ್ಲಿ ತೂತುಗಳು, ಸುಳಿಯಲ್ಲಿ ಹುಳು ಹಿಕ್ಕೆ ಮತ್ತು ಕಾಂಡ ಹಾನಿ.", trig: "ಬಿಸಿ ಹವಾಮಾನ ಮತ್ತು ತುಂತುರು ಮಳೆ.", bio: "ಬೇವಿನ ಎಣ್ಣೆ @ 5 ಮಿ.ಲೀ/ಲೀಟರ್ ಅಥವಾ ಬಿಟಿ @ 2 ಗ್ರಾಂ/ಲೀಟರ್.", chem: "ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ @ 0.4 ಮಿ.ಲೀ/ಲೀಟರ್.", prev: "ಫೆರೋಮೋನ್ ಬಲೆಗಳು @ 5/ಎಕರೆ ಅಳವಡಿಸಿ." },
      mr: { sym: "पानांना मोठी छिद्रे, पोंग्यात विष्ठा आणि अंकुराचे नुकसान.", trig: "उष्ण हवामान व हलक्या सरींचा काळ.", bio: "निंबोळी अर्क @ 5 मिली/लिटर किंवा बी.टी. @ 2 ग्रॅम/लिटर.", chem: "क्लोरँट्रॅनिलिप्रोल @ 0.4 मिली/लिटर.", prev: "कामगंध सापळे @ 5/एकर लावा आणि मिश्र पीक घ्या." },
      te: { sym: "ఆకులలో రంధ్రాలు మరియు మొవ్వు దెబ్బతినడం.", trig: "వేడి వాతావరణం మరియు తేలికపాటి వర్షాలు.", bio: "వేప నూనె @ 5 మి.లీ/లీ లేదా బి.టి. @ 2 గ్రా/లీ.", chem: "క్లోరాంట్రానిలిప్రోల్ @ 0.4 మి.లీ/లీ.", prev: "లింగాకర్షక బుట్టలు @ 5/ఎకరాకు పెట్టండి." },
      ta: { sym: "இலைகளில் துளைகள் மற்றும் குருத்து சேதம்.", trig: "வெப்பமான வானிலை மற்றும் லேசான மழை.", bio: "வேப்ப எண்ணெய் @ 5 மி.லி/லி அல்லது பி.டி. @ 2 கி/லி.", chem: "குளோராண்ட்ரானிலிப்ரோல் @ 0.4 மி.லி/லி.", prev: "இனக்கவர்ச்சிப் பொறி @ 5/ஏக்கர் வைக்கவும்." },
      gu: { sym: "પાંદડામાં કાણા અને ડુંખને નુકસાન.", trig: "ગરમ હવામાન અને હળવો વરસાદ.", bio: "લીંબોળી તેલ @ 5 મિલી/લિ અથવા બી.ટી. @ 2 ગ્રામ/લિ.", chem: "ક્લોરાન્ટ્રાનિલિપ્રોલ @ 0.4 મિલી/લિ.", prev: "ફેરોમોન ટ્રેપ @ 5/એકર લગાવો." },
      bn: { sym: "পাতায় ছেঁড়া ছিদ্র এবং মাঝের কান্ডে ক্ষতি।", trig: "গরম আবহাওয়া ও হালকা বৃষ্টি।", bio: "নিম তেল @ ৫ মিলি/লি বা বি.টি. @ ২ গ্রাম/লি।", chem: "ক্লোরান্ট্রানিলিপ্রোল @ ০.৪ মিলি/লি।", prev: "ফেরোমন ফাঁদ @ ৫/একর স্থাপন করুন।" },
      ml: { sym: "ഇലകളിൽ ദ്വാരങ്ങളും നാമ്പുകൾക്ക് നാശവും.", trig: "ചൂടുള്ള കാലാവസ്ഥയും ചെറിയ മഴയും.", bio: "വേപ്പെണ്ണ @ 5 മി.ലി/ലി അല്ലെങ്കിൽ ബി.ടി. @ 2 ഗ്രാം/ലി.", chem: "ക്ലോറാൻട്രാനിലിപ്രോൾ @ 0.4 മി.ലി/ലി.", prev: "ഫെറോമോൻ കെണികൾ @ 5/ഏക്കർ സ്ഥാപിക്കുക." },
      pa: { sym: "ਪੱਤਿਆਂ ਵਿੱਚ ਛੇਕ ਅਤੇ ਗੋਭ ਨੂੰ ਨੁਕਸਾਨ।", trig: "ਗਰਮ ਮੌਸਮ ਤੇ ਹਲਕੀ ਬਾਰਿਸ਼।", bio: "ਨਿੰਮ ਦਾ ਤੇਲ @ 5 ਮਿਲੀ/ਲੀ ਜਾਂ ਬੀ.ਟੀ. @ 2 ਗ੍ਰਾਮ/ਲੀ।", chem: "ਕਲੋਰੈਂਟਰਾਨਿਲੀਪ੍ਰੋਲ @ 0.4 ਮਿਲੀ/ਲੀ।", prev: "ਫੈਰੋਮੋਨ ਟਰੈਪ @ 5/ਏਕੜ ਲਗਾਓ।" },
      or: { sym: "ପତ୍ରରେ କଣା ଓ ମଝି କଅଁଳ ନଷ୍ଟ ହେବା।", trig: "ଗରମ ପାଣିପାଗ ଓ ହାଲୁକା ବର୍ଷା।", bio: "ନିମ୍ବ ତେଲ @ ୫ ମିଲି/ଲି ବା ବି.ଟି. @ ୨ ଗ୍ରାମ୍/ଲି।", chem: "କ୍ଲୋରାଣ୍ଟ୍ରାନିଲିପ୍ରୋଲ୍ @ ୦.୪ ମିଲି/ଲି।", prev: "ଫେରୋମୋନ୍ ଯନ୍ତା @ ୫/ଏକର ଲଗାନ୍ତୁ।" }
    }
  };
  SIG_GUIDANCE.purple_blotch = SIG_GUIDANCE.fungal_blight_dark;

  A.DISEASE_UI = DISEASE_UI;
  A.PATHOGEN_TYPES = PATHOGEN_TYPES;
  A.DISEASE_NAMES = DISEASE_NAMES;

  A.dt = function (key, langOrVars = null, maybeVars = null) {
    let lang = A.getLang();
    let vars = null;
    if (typeof langOrVars === "string") {
      lang = langOrVars;
      vars = maybeVars;
    } else if (langOrVars && typeof langOrVars === "object") {
      vars = langOrVars;
    }
    const dict = DISEASE_UI[lang] || DISEASE_UI.en;
    let str = dict[key] !== undefined ? dict[key] : (DISEASE_UI.en[key] !== undefined ? DISEASE_UI.en[key] : key);
    if (vars) {
      Object.keys(vars).forEach((vk) => {
        str = str.replace(new RegExp(`\\{${vk}\\}`, "g"), String(vars[vk]));
      });
    }
    return str;
  };

  A.localizePathogenType = function (pt, lang = null) {
    const l = lang || A.getLang();
    if (l === "en") return pt || "Pathogen";
    const s = (pt || "").toLowerCase();
    if (s.includes("healthy")) return PATHOGEN_TYPES.healthy[l] || PATHOGEN_TYPES.healthy.en;
    if (s.includes("oomycete") || s.includes("water mold")) return PATHOGEN_TYPES.oomycete[l] || PATHOGEN_TYPES.oomycete.en;
    if (s.includes("viral")) return PATHOGEN_TYPES.viral[l] || PATHOGEN_TYPES.viral.en;
    if (s.includes("bact")) return PATHOGEN_TYPES.bacterial[l] || PATHOGEN_TYPES.bacterial.en;
    if (s.includes("pest") || s.includes("insect") || s.includes("larva") || s.includes("moth")) return PATHOGEN_TYPES.pest[l] || PATHOGEN_TYPES.pest.en;
    return PATHOGEN_TYPES.fungal[l] || PATHOGEN_TYPES.fungal.en;
  };

  A.localizeDiseaseName = function (diseaseId, rawName, cropNameLocalized, lang = null) {
    const l = lang || A.getLang();
    if (l === "en") return rawName || "";
    const id = (diseaseId || "").toLowerCase();
    if (id.endsWith("_healthy") || /healthy/i.test(rawName || "")) {
      return A.dt("healthy_foliage_tpl", l, { crop: cropNameLocalized || "" });
    }
    if (DISEASE_NAMES[id] && DISEASE_NAMES[id][l]) {
      return DISEASE_NAMES[id][l];
    }
    for (const k of Object.keys(DISEASE_NAMES)) {
      if (id.includes(k) || (rawName || "").toLowerCase().includes(k.replace(/_/g, " "))) {
        return DISEASE_NAMES[k][l];
      }
    }
    if (/leaf blight|rust/i.test(rawName || "")) return DISEASE_NAMES.wheat_leaf_blight[l];
    if (/rot|wilt/i.test(rawName || "")) return DISEASE_NAMES.sugarcane_red_rot[l];
    return DISEASE_NAMES.tomato_early_blight[l];
  };

  A.localizeDiseaseEntry = function (entry, cropId = "tomato", lang = null) {
    const l = lang || A.getLang();
    if (!entry || l === "en") return entry;
    const cName = A.cropName(cropId, l);
    const sig = entry.visual_signature || "fungal_blight_dark";
    const gMap = SIG_GUIDANCE[sig] || SIG_GUIDANCE.fungal_blight_dark;
    const g = gMap[l] || {};
    return {
      ...entry,
      name: A.localizeDiseaseName(entry.disease_id, entry.name, cName, l),
      pathogen_type: A.localizePathogenType(entry.pathogen_type, l),
      symptoms: g.sym || entry.symptoms,
      favorable_conditions: g.trig || entry.favorable_conditions,
      organic_control: g.bio || entry.organic_control,
      chemical_control: g.chem || entry.chemical_control,
      preventive_measures: g.prev || entry.preventive_measures
    };
  };

  A.localizeDoctorModule = function (doc, cropId, cropDisplayName, ph = 6.8, lang = null) {
    const l = lang || A.getLang();
    if (l === "en") return doc;
    const isAcid = ph < 6.0;
    const isAlk = ph > 7.8;

    const SUMMARIES = {
      hi: `आपका 1 किमी² खेत क्षेत्र ${cropDisplayName} की खेती के लिए अनुकूल मिट्टी व जलवायु रखता है। संतुलित पोषक तत्व (NPK) और उचित जल निकासी का पालन करें।`,
      kn: `ನಿಮ್ಮ 1 ಕಿಮೀ² ಪ್ರದೇಶವು ${cropDisplayName} ಬೆಳೆಗೆ ಉತ್ತಮ ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನವನ್ನು ಹೊಂದಿದೆ. ಸಮತೋಲಿತ ಗೊಬ್ಬರ ಮತ್ತು ನೀರು ನಿರ್ವಹಣೆ ಪಾಲಿಸಿ.`,
      mr: `तुमचे 1 किमी² शेत क्षेत्र ${cropDisplayName} पिकासाठी अनुकूल माती व हवामान देते. संतुलित खत व्यवस्थापन आणि उत्तम निचरा राखा.`,
      te: `మీ 1 చ.కి.మీ భూమిలో ${cropDisplayName} పంటకు అనుకూల నేల మరియు వాతావరణం ఉంది. సమతుల్య ఎరువులు మరియు నీటి నిల్వ నియంత్రణ పాటించండి.`,
      ta: `உங்கள் 1 ச.கி.மீ நிலம் ${cropDisplayName} பயிருக்கு ஏற்ற மண் மற்றும் காலநிலையைக் கொண்டுள்ளது. சமச்சீர் உரமிடுதல் மற்றும் வடிகால் அமைப்பைப் பின்பற்றவும்.`,
      gu: `તમારું 1 ચો.કિમી ખેતર ${cropDisplayName} પાક માટે અનુકૂળ જમીન અને હવામાન ધરાવે છે. સંતુલિત ખાતર અને સારો નિતાર જાળવો.`,
      bn: `আপনার ১ বর্গ কিমি জমি ${cropDisplayName} চাষের জন্য অনুকূল মাটি ও আবহাওয়া সম্পন্ন। সুষম সার ও সঠিক জল নিকাশী বজায় রাখুন।`,
      ml: `നിങ്ങളുടെ 1 ച.കി.മീ കൃഷിയിടം ${cropDisplayName} കൃഷിക്ക് അനുയോജ്യമായ മണ്ണും കാലാവസ്ഥയും ഉള്ളതാണ്. സമതുലിത വളപ്രയോഗവും നീർവാർച്ചയും ഉറപ്പാക്കുക.`,
      pa: `ਤੁਹਾਡਾ 1 ਵਰਗ ਕਿਮੀ ਖੇਤ ${cropDisplayName} ਦੀ ਖੇਤੀ ਲਈ ਢੁਕਵੀਂ ਮਿੱਟੀ ਤੇ ਮੌਸਮ ਰੱਖਦਾ ਹੈ। ਸੰਤੁਲਿਤ ਖਾਦ ਅਤੇ ਸਹੀ ਨਿਕਾਸ ਬਣਾਈ ਰੱਖੋ।`,
      or: `ଆପଣଙ୍କ ୧ ବର୍ଗ କିମି ଜମି ${cropDisplayName} ଚାଷ ପାଇଁ ଉପଯୁକ୍ତ ମାଟି ଓ ଜଳବାୟୁ ରଖିଛି। ସନ୍ତୁଳିତ ସାର ଓ ଜଳ ନିଷ୍କାସନ ବଜାୟ ରଖନ୍ତୁ।`
    };

    const AMEND = {
      hi: {
        issue: isAcid ? `अम्लीय मिट्टी (pH ${ph})` : isAlk ? `क्षारीय मिट्टी (pH ${ph})` : `संतुलित मृदा पीएच (${ph})`,
        remedy: isAcid ? "बुवाई से पहले 2 टन/हे. कृषि चूना (CaCO3) मिलाएँ।" : isAlk ? "जिप्सम 1.5 टन/हे. व हरी खाद का प्रयोग करें।" : "मिट्टी की उर्वरता हेतु 8–10 टन/हे. सड़ी गोबर की खाद (FYM) मिलाएँ।"
      },
      kn: {
        issue: isAcid ? `ಆಮ್ಲೀಯ ಮಣ್ಣು (pH ${ph})` : isAlk ? `ಕ್ಷಾರೀಯ ಮಣ್ಣು (pH ${ph})` : `ಸೂಕ್ತ ಮಣ್ಣಿನ ಪಿಎಚ್ (${ph})`,
        remedy: isAcid ? "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಎಕರೆಗೆ ಕೃಷಿ ಸುಣ್ಣ (CaCO3) ಸೇರಿಸಿ." : isAlk ? "ಜಿಪ್ಸಮ್ ಮತ್ತು ಹಸಿರೆಲೆ ಗೊಬ್ಬರ ಬಳಸಿ." : "ಮಣ್ಣಿನ ಆರೋಗ್ಯಕ್ಕೆ 8–10 ಟನ್/ಹೆ. ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಬೆರೆಸಿ."
      },
      mr: {
        issue: isAcid ? `आम्लयुक्त माती (pH ${ph})` : isAlk ? `अल्कधर्मी माती (pH ${ph})` : `योग्य माती सामू (${ph})`,
        remedy: isAcid ? "पेरणीपूर्वी कृषी चुना (CaCO3) वापरा." : isAlk ? "जिप्सम आणि हिरवळीचे खत वापरा." : "सेंद्रिय कर्बासाठी हेक्टरी 8–10 टन चांगले कुजलेले शेणखत मिसळा."
      },
      te: {
        issue: isAcid ? `ఆమ్ల నేల (pH ${ph})` : isAlk ? `క్షార నేల (pH ${ph})` : `అనుకూల నేల pH (${ph})`,
        remedy: isAcid ? "విత్తే ముందు వ్యవసాయ సున్నం కలపండి." : isAlk ? "జిప్సం మరియు పచ్చిరొట్ట ఎరువులు వేయండి." : "సేంద్రీయ బలం కోసం ఎకరానికి బాగా మాగిన పశువుల ఎరువు కలపండి."
      },
      ta: {
        issue: isAcid ? `அமில மண் (pH ${ph})` : isAlk ? `கார மண் (pH ${ph})` : `சரியான மண் pH (${ph})`,
        remedy: isAcid ? "விதைப்புக்கு முன் சுண்ணாம்பு (CaCO3) இடவும்." : isAlk ? "ஜிப்சம் மற்றும் பசுந்தாள் உரம் இடவும்." : "மண் வளத்திற்கு ஹெக்டேருக்கு 8–10 டன் தொழுஉரம் இடவும்."
      },
      gu: {
        issue: isAcid ? `એસિડિક જમીન (pH ${ph})` : isAlk ? `ક્ષારીય જમીન (pH ${ph})` : `અનુકૂળ જમીન pH (${ph})`,
        remedy: isAcid ? "વાવણી પહેલાં કૃષિ ચૂનો (CaCO3) ઉમેરો." : isAlk ? "જીપ્સમ અને લીલો પડવાશ કરો." : "જમીન સુધારણા માટે સારું કોહવાયેલું છાણિયું ખાતર ઉમેરો."
      },
      bn: {
        issue: isAcid ? `অম্লীয় মাটি (pH ${ph})` : isAlk ? `ক্ষারীয় মাটি (pH ${ph})` : `অনুকূল মাটির পিএইচ (${ph})`,
        remedy: isAcid ? "বপনের আগে কৃষি চুন প্রয়োগ করুন।" : isAlk ? "জিপসাম ও সবুজ সার ব্যবহার করুন।" : "জমিতে হেক্টর প্রতি ৮–১০ টন পচা গোবর সার প্রয়োগ করুন।"
      },
      ml: {
        issue: isAcid ? `അമ്ല മണ്ണ് (pH ${ph})` : isAlk ? `ക്ഷാര മണ്ണ് (pH ${ph})` : `അനുയോജ്യമായ മണ്ണ് pH (${ph})`,
        remedy: isAcid ? "വിത്ത് വിതയ്ക്കുന്നതിന് മുമ്പ് കുമ്മായം ചേർക്കുക." : isAlk ? "ജിപ്സവും പച്ചിലവളവും ചേർക്കുക." : "മണ്ണിന്റെ ഫലപുഷ്ടിക്കായി ചാണകപ്പൊടി ചേർക്കുക."
      },
      pa: {
        issue: isAcid ? `ਤੇਜ਼ਾਬੀ ਮਿੱਟੀ (pH ${ph})` : isAlk ? `ਖਾਰੀ ਮਿੱਟੀ (pH ${ph})` : `ਢੁਕਵਾਂ ਮਿੱਟੀ pH (${ph})`,
        remedy: isAcid ? "ਬਿਜਾਈ ਤੋਂ ਪਹਿਲਾਂ ਖੇਤੀ ਚੂਨਾ ਪਾਓ।" : isAlk ? "ਜਿਪਸਮ ਅਤੇ ਹਰੀ ਖਾਦ ਦੀ ਵਰਤੋਂ ਕਰੋ।" : "ਮਿੱਟੀ ਦੀ ਤਾਕਤ ਲਈ ਗਲੀ-ਸੜੀ ਰੂੜੀ ਖਾਦ ਮਿਲਾਓ।"
      },
      or: {
        issue: isAcid ? `ଅମ୍ଳୀୟ ମାଟି (pH ${ph})` : isAlk ? `କ୍ଷାରୀୟ ମାଟି (pH ${ph})` : `ଉପଯୁକ୍ତ ମାଟି pH (${ph})`,
        remedy: isAcid ? "ବୁଣିବା ପୂର୍ବରୁ ଚୂନ ପ୍ରୟୋଗ କରନ୍ତୁ।" : isAlk ? "ଜିପସମ୍ ଓ ସବୁଜ ସାର ବ୍ୟବହାର କରନ୍ତୁ।" : "ମାଟି ଉର୍ବରତା ପାଇଁ ଶଢ଼ା ଗୋବର ଖତ ମିଶାନ୍ତୁ।"
      }
    };

    const FERT = {
      hi: [
        { stage: "बेसल खुराक (बुवाई समय)", details: "संपूर्ण फास्फोरस, आधा पोटाश और 30% नाइट्रोजन बीज कतार के नीचे दें।" },
        { stage: "पहली टॉप ड्रेसिंग (30 दिन)", details: "वानस्पतिक बढ़वार पर 35% नाइट्रोजन और जिंक सल्फेट (25 किग्रा/हे.) डालें।" },
        { stage: "दूसरी टॉप ड्रेसिंग (फूल अवस्था)", details: "दाने व फल भरते समय शेष 35% नाइट्रोजन व पोटाश दें।" }
      ],
      kn: [
        { stage: "ಆರಂಭಿಕ ಗೊಬ್ಬರ (ಬಿತ್ತನೆ ವೇಳೆ)", details: "ಸಂಪೂರ್ಣ ರಂಜಕ, ಅರ್ಧ ಪೊಟ್ಯಾಷ್ ಮತ್ತು 30% ಸಾರಜನಕವನ್ನು ಸಾಲುಗಳಲ್ಲಿ ನೀಡಿ." },
        { stage: "ಮೊದಲ ಮೇಲುಗೊಬ್ಬರ (30 ದಿನ)", details: "ಬೆಳವಣಿಗೆ ಹಂತದಲ್ಲಿ 35% ಸಾರಜನಕ ಮತ್ತು ಸತುವಿನ ಸಲ್ಫೇಟ್ ನೀಡಿ." },
        { stage: "ಎರಡನೇ ಮೇಲುಗೊಬ್ಬರ (ಹೂವು ಹಂತ)", details: "ಕಾಳು ಕಟ್ಟುವ ಹಂತದಲ್ಲಿ ಉಳಿದ 35% ಸಾರಜನಕ ಮತ್ತು ಪೊಟ್ಯಾಷ್ ನೀಡಿ." }
      ],
      mr: [
        { stage: "पायाभूत खत (पेरणीवेळी)", details: "संपूर्ण स्फुरद, अर्धा पालाश आणि 30% नत्र बियाण्याच्या खाली द्या." },
        { stage: "पहिला हप्ता (30 दिवसांनी)", details: "वाढीच्या काळात 35% नत्र आणि झिंक सल्फेट (25 किलो/हे.) द्या." },
        { stage: "दुसरा हप्ता (फुलोरा अवस्था)", details: "दाणे भरण्याच्या वेळी उर्वरित 35% नत्र व पालाश द्या." }
      ],
      te: [
        { stage: "విత్తే సమయంలో (బేసల్)", details: "పూర్తి భాస్వరం, సగం పొటాష్ మరియు 30% నత్రజని వేయండి." },
        { stage: "మొదటి పైపాటు (30 రోజులు)", details: "పెరుగుదల దశలో 35% నత్రజని మరియు జింక్ సల్ఫేట్ వేయండి." },
        { stage: "రెండవ పైపాటు (పూత దశ)", details: "గింజ కట్టే సమయంలో మిగిలిన 35% నత్రజని & పొటాష్ వేయండి." }
      ],
      ta: {
        details: "",
        arr: [
          { stage: "அடியுரம் (விதைப்பு)", details: "முழு மணிச்சத்து, பாதி சாம்பல் சத்து மற்றும் 30% தழைச்சத்து இடவும்." },
          { stage: "முதல் மேலுரம் (30 நாள்)", details: "வளர்ச்சி நிலையில் 35% தழைச்சத்து மற்றும் ஜிங்க் சல்பேட் இடவும்." },
          { stage: "இரண்டாவது மேலுரம் (பூக்கும் நிலை)", details: "மணிகள் நிரம்பும்போது மீதமுள்ள தழைச்சத்து & சாம்பல் சத்து இடவும்." }
        ]
      },
      gu: [
        { stage: "પાયાનું ખાતર (વાવણી સમયે)", details: "સંપૂર્ણ ફોસ્ફરસ, અડધો પોટાશ અને 30% નાઇટ્રોજન આપો." },
        { stage: "પહેલો હપ્તો (30 દિવસે)", details: "વૃદ્ધિ સમયે 35% નાઇટ્રોજન અને ઝીંક સલ્ફેટ આપો." },
        { stage: "બીજો હપ્તો (ફૂલ અવસ્થા)", details: "દાણા ભરાય ત્યારે બાકીનો 35% નાઇટ્રોજન અને પોટાશ આપો." }
      ],
      bn: [
        { stage: "মূল সার (বপনের সময়)", details: "সম্পূর্ণ ফসফরাস, অর্ধেক পটাশ এবং ৩০% নাইট্রোজেন প্রয়োগ করুন।" },
        { stage: "প্রথম উপরি প্রয়োগ (৩০ দিন)", details: "বৃদ্ধির পর্যায়ে ৩৫% নাইট্রোজেন ও জিঙ্ক সালফেট দিন।" },
        { stage: "দ্বিতীয় উপরি প্রয়োগ (ফুল পর্যায়ে)", details: "দানা গঠনের সময় বাকি ৩৫% নাইট্রোজেন ও পটাশ দিন।" }
      ],
      ml: [
        { stage: "അടിവളം (നടീൽ സമയം)", details: "മുഴുവൻ ഫോസ്ഫറസും പകുതി പൊട്ടാഷും 30% നൈട്രജനും നൽകുക." },
        { stage: "ആദ്യ മേൽവളം (30 ദിവസം)", details: "വളർച്ചാ ഘട്ടത്തിൽ 35% നൈട്രജനും സിങ്ക് സൾഫേറ്റും നൽകുക." },
        { stage: "രണ്ടാം മേൽവളം (പൂവിടുന്ന ഘട്ടം)", details: "ബാക്കി 35% നൈട്രജനും പൊട്ടാഷും നൽകുക." }
      ],
      pa: [
        { stage: "ਬਿਜਾਈ ਸਮੇਂ ਦੀ ਖਾਦ", details: "ਪੂਰਾ ਫਾਸਫੋਰਸ, ਅੱਧਾ ਪੋਟਾਸ਼ ਅਤੇ 30% ਨਾਈਟ੍ਰੋਜਨ ਪਾਓ।" },
        { stage: "ਪਹਿਲੀ ਕਿਸ਼ਤ (30 ਦਿਨ)", details: "ਵਾਧੇ ਸਮੇਂ 35% ਨਾਈਟ੍ਰੋਜਨ ਅਤੇ ਜ਼ਿੰਕ ਸਲਫ਼ੇਟ ਪਾਓ।" },
        { stage: "ਦੂਜੀ ਕਿਸ਼ਤ (ਫੁੱਲ ਆਉਣ ਤੇ)", details: "ਦਾਣੇ ਭਰਨ ਵੇਲੇ ਬਾਕੀ 35% ਨਾਈਟ੍ਰੋਜਨ ਤੇ ਪੋਟਾਸ਼ ਪਾਓ।" }
      ],
      or: [
        { stage: "ମୂଳ ସାର (ବୁଣିବା ସମୟ)", details: "ସମ୍ପୂର୍ଣ୍ଣ ଫସଫରସ୍, ଅର୍ଦ୍ଧେକ ପଟାସ୍ ଓ ୩୦% ଯବକ୍ଷାରଜାନ ଦିଅନ୍ତୁ।" },
        { stage: "ପ୍ରଥମ ଉପରି ସାର (୩୦ ଦିନ)", details: "ବୃଦ୍ଧି ଅବସ୍ଥାରେ ୩୫% ଯବକ୍ଷାରଜାନ ଓ ଜିଙ୍କ୍ ସଲଫେଟ୍ ଦିଅନ୍ତୁ।" },
        { stage: "ଦ୍ୱିତୀୟ ଉପରି ସାର (ଫୁଲ ଅବସ୍ଥା)", details: "ଦାନା ପୂରଣ ବେଳେ ବାକି ୩୫% ଯବକ୍ଷାରଜାନ ଓ ପଟାସ୍ ଦିଅନ୍ତୁ।" }
      ]
    };

    const fertList = Array.isArray(FERT[l]) ? FERT[l] : (FERT[l]?.arr || doc.fertilizer_schedule);
    return {
      ...doc,
      crop_doctor_summary: SUMMARIES[l] || doc.crop_doctor_summary,
      soil_amendments: [AMEND[l] || doc.soil_amendments?.[0]].filter(Boolean),
      fertilizer_schedule: fertList
    };
  };

  A.localizePlantationTrial = function (r, lang = null) {
    const l = lang || A.getLang();
    if (!r || l === "en") return r;
    const score = Number(r?.compatibility?.overall_score ?? 78);
    const loc = r.location_analysis || {};
    const irr = r.irrigation_plan || {};
    const pName = A.cropName(r.plant_name, l);

    const VERDICTS = {
      hi: { hi: "अत्यधिक उपयुक्त (उत्तम क्षेत्र)", mid: "ड्रिप व मल्चिंग सहित उपयुक्त", low: "सामान्य — गड्ढे व ड्रिप उपचार आवश्यक" },
      kn: { hi: "ಅತ್ಯಂತ ಸೂಕ್ತ (ಪ್ರಮುಖ ವಲಯ)", mid: "ಹನಿ ನೀರಾವರಿ ಮತ್ತು ಮಲ್ಚಿಂಗ್‌ನೊಂದಿಗೆ ಸೂಕ್ತ", low: "ಮಧ್ಯಮ — ಗುಂಡಿ ತಯಾರಿ ಅಗತ್ಯ" },
      mr: { hi: "अत्यंत योग्य (प्रमुख पट्टा)", mid: "ठिबक व आच्छादनासह योग्य", low: "मध्यम — खड्डा व ठिबक सुधारणा आवश्यक" },
      te: { hi: "అత్యంత అనుకూలం (ప్రధాన ప్రాంతం)", mid: "డ్రిప్ & మల్చింగ్‌తో అనుకూలం", low: "సాధారణం — గుంతల తయారీ అవసరం" },
      ta: { hi: "மிகவும் உகந்தது (சிறந்த பகுதி)", mid: "சொட்டுநீர் மற்றும் மூடாக்குடன் உகந்தது", low: "மிதமானது — குழி சீரமைப்பு தேவை" },
      gu: { hi: "અત્યંત અનુકૂળ (મુખ્ય વિસ્તાર)", mid: "ટપક પિયત અને મલ્ચિંગ સાથે યોગ્ય", low: "મધ્યમ — ખાડા અને ખાતર સુધારણા જરૂરી" },
      bn: { hi: "অত্যন্ত উপযুক্ত অঞ্চল", mid: "ড্রিপ ও মালচিং সহ উপযুক্ত", low: "মাঝারি — গর্ত প্রস্তুত ও সেচ প্রয়োজন" },
      ml: { hi: "വളരെ അനുയോജ്യം", mid: "തുള്ളിനനയും പുതയിടലും ഉപയോഗിച്ച് അനുയോജ്യം", low: "മിതമായത് — കുഴി പരിപാലനം ആവശ്യമാണ്" },
      pa: { hi: "ਬਹੁਤ ਢੁਕਵਾਂ ਖੇਤਰ", mid: "ਤੁਪਕਾ ਸਿੰਚਾਈ ਤੇ ਪਰਾਲੀ ਸਮੇਤ ਢੁਕਵਾਂ", low: "ਦਰਮਿਆਨਾ — ਟੋਏ ਤੇ ਖਾਦ ਸੁਧਾਰ ਜ਼ਰੂਰੀ" },
      or: { hi: "ଅତ୍ୟନ୍ତ ଉପଯୁକ୍ତ ଅଞ୍ଚଳ", mid: "ଡ୍ରିପ୍ ଓ ମଲଚିଂ ସହିତ ଉପଯୁକ୍ତ", low: "ମଧ୍ୟମ — ଗାତ ପ୍ରସ୍ତୁତି ଓ ସେଚ ଆବଶ୍ୟକ" }
    }[l];

    const verdict = score >= 82 ? VERDICTS.hi : (score >= 68 ? VERDICTS.mid : VERDICTS.low);
    const ZONES = {
      hi: "भारतीय क्षेत्रीय कृषि पट्टी", kn: "ಭಾರತೀಯ ಪ್ರಾದೇಶಿಕ ಕೃಷಿ ವಲಯ", mr: "भारतीय प्रादेशिक कृषी विभाग",
      te: "భారతీయ ప్రాంతీయ వ్యవసాయ మండలం", ta: "இந்திய பிராந்திய வேளாண் மண்டலம்", gu: "ભારતીય પ્રાદેશિક કૃષિ વિસ્તાર",
      bn: "ভারতীয় আঞ্চলিক কৃষি অঞ্চল", ml: "ഭാരതീയ പ്രാദേശിക കാർഷിക മേഖല", pa: "ਭਾਰਤੀ ਖੇਤਰੀ ਖੇਤੀ ਜ਼ੋਨ", or: "ଭାରତୀୟ ଆଞ୍ଚଳିକ କୃଷି ଅଞ୍ଚଳ"
    };
    const METHODS = {
      hi: "ऑनलाइन ड्रिप सिंचाई प्रणाली व 10 सेमी जैविक मल्चिंग", kn: "ಹನಿ ನೀರಾವರಿ ಪದ್ಧತಿ ಮತ್ತು ಸಾವಯವ ಮಲ್ಚಿಂಗ್",
      mr: "ऑनलाईन ठिबक सिंचन व सेंद्रिय आच्छादन", te: "ఆన్‌లైన్ డ్రిప్ పద్ధతి & సేంద్రీయ మల్చింగ్",
      ta: "சொட்டுநீர் பாசனம் மற்றும் இயற்கை மூடாக்கு", gu: "ઓનલાઈન ટપક સિંચાઈ અને જૈવિક મલ્ચિંગ",
      bn: "অনলাইন ড্রিপ সেচ ব্যবস্থা ও জৈব মালচিং", ml: "ഓൺലൈൻ തുള്ളിനനയും ജൈവ പുതയിടലും",
      pa: "ਆਨਲਾਈਨ ਤੁਪਕਾ ਸਿੰਚਾਈ ਅਤੇ ਜੈਵਿਕ ਪਰਾਲੀ", or: "ଅନଲାଇନ୍ ଡ୍ରିପ୍ ଜଳସେଚନ ଓ ଜୈବିକ ମଲଚିଂ"
    };
    const STEPS = {
      hi: [
        "सुबह के समय ईटी0-आधारित ड्रिप सिंचाई दें ताकि वाष्पीकरण हानि कम हो।",
        "गड्ढे में 5 किग्रा कंपोस्ट व ट्राइकोडर्मा मिलाकर मजबूत जड़ विकास सुनिश्चित करें।",
        "8 सेमी जैविक मल्चिंग से मिट्टी की नमी 35% तक सुरक्षित रखें।"
      ],
      kn: [
        "ಆವಿಯಾಗುವ ನಷ್ಟ ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಗಿನ ಹನಿ ನೀರಾವರಿ ನೀಡಿ.",
        "ಪ್ರತಿ ಗುಂಡಿಗೆ 5 ಕೆಜಿ ಕಾಂಪೋಸ್ಟ್ ಮತ್ತು ಟ್ರೈಕೋಡರ್ಮಾ ಬೆರೆಸಿ.",
        "ಮಣ್ಣಿನ ತೇವಾಂಶ ಉಳಿಸಲು 8 ಸೆಂ.ಮೀ ಸಾವಯವ ಮಲ್ಚಿಂಗ್ ಹಾಕಿ."
      ],
      mr: [
        "बाष्पीभवन कमी करण्यासाठी सकाळी ठिबक सिंचन द्या.",
        "खड्ड्यात 5 किलो कंपोस्ट व ट्रायकोडर्मा मिसळा.",
        "जमिनीतील ओलावा टिकवण्यासाठी 8 सें.मी. सेंद्रिय आच्छादन करा."
      ],
      te: [
        "ఆవిరి నష్టాన్ని తగ్గించడానికి ఉదయం డ్రిప్ నీరు పెట్టండి.",
        "గుంతలో 5 కిలోల కంపోస్ట్ మరియు ట్రైకోడెర్మా కలపండి.",
        "తేమ నిలుపుదలకు 8 సెం.మీ సేంద్రీయ మల్చింగ్ వేయండి."
      ],
      ta: [
        "ஆவியாதலை குறைக்க காலையில் சொட்டுநீர் பாசனம் அளிக்கவும்.",
        "குழியில் 5 கிலோ மக்கிய உரம் மற்றும் டிரைக்கோடெர்மா கலக்கவும்.",
        "மண் ஈரப்பதத்தைக் காக்க 8 செ.மீ இயற்கை மூடாக்கு இடவும்."
      ],
      gu: [
        "બાષ્પીભવન ઘટાડવા માટે સવારે ટપક પિયત આપો.",
        "ખાડામાં 5 કિગ્રા કમ્પોસ્ટ અને ટ્રાઇકોડર્મા ભેળવો.",
        "ભેજ જાળવવા માટે 8 સેમી જૈવિક મલ્ચિંગ કરો."
      ],
      bn: [
        "বাষ্পীভবন কমাতে সকালে ড্রিপ সেচ দিন।",
        "গর্তে ৫ কেজি কম্পোস্ট ও ট্রাইকোডার্মা মেশান।",
        "আর্দ্রতা রক্ষায় ৮ সেমি জৈব মালচিং ব্যবহার করুন।"
      ],
      ml: [
        "ബാഷ്പീകരണം കുറയ്ക്കാൻ രാവിലെ തുള്ളിനന നൽകുക.",
        "കുഴിയിൽ 5 കിലോ കമ്പോസ്റ്റും ട്രൈക്കോഡെർമയും ചേർക്കുക.",
        "ഈർപ്പം നിലനിർത്താൻ 8 സെ.മീ ജൈവ പുതയിടുക."
      ],
      pa: [
        "ਭਾਫ਼ ਦਾ ਨੁਕਸਾਨ ਘਟਾਉਣ ਲਈ ਸਵੇਰੇ ਤੁਪਕਾ ਸਿੰਚਾਈ ਕਰੋ।",
        "ਟੋਏ ਵਿੱਚ 5 ਕਿਲੋ ਕੰਪੋਸਟ ਅਤੇ ਟ੍ਰਾਈਕੋਡਰਮਾ ਮਿਲਾਓ।",
        "ਨਮੀ ਬਚਾਉਣ ਲਈ 8 ਸੈਂਟੀਮੀਟਰ ਪਰਾਲੀ ਵਿਛਾਓ।"
      ],
      or: [
        "ବାଷ୍ପୀକରଣ କମାଇବାକୁ ସକାଳେ ଡ୍ରିପ୍ ଜଳସେଚନ ଦିଅନ୍ତୁ।",
        "ଗାତରେ ୫ କିଗ୍ରା କମ୍ପୋଷ୍ଟ ଓ ଟ୍ରਾਈକୋଡର୍ମା ମିଶାନ୍ତୁ।",
        "ଆର୍ଦ୍ରତା ରଖିବାକୁ ୮ ସେମି ଜୈବିକ ମଲଚିଂ କରନ୍ତୁ।"
      ]
    }[l];

    const BREED_NOTE = {
      hi: "उच्च उपज देने वाली क्षेत्रीय संस्तुत किस्म; ड्रिप के साथ उत्तम प्रदर्शन।",
      kn: "ಹೆಚ್ಚಿನ ಇಳುವರಿ ನೀಡುವ ಪ್ರಾದೇಶಿಕ ತಳಿ; ಹನಿ ನೀರಾವರಿಗೆ ಸೂಕ್ತ.",
      mr: "जास्त उत्पादन देणारी प्रादेशिक सुधारित जात; ठिबकसाठी योग्य.",
      te: "అధిక దిగుబడి ఇచ్చే ప్రాంతీయ రకం; డ్రిప్ పద్ధతికి అనుకూలం.",
      ta: "அதிக மகசூல் தரும் பிராந்திய ரகம்; சொட்டுநீருக்கு ஏற்றது.",
      gu: "વધુ ઉત્પાદન આપતી પ્રાદેશિક જાત; ટપક પિયત માટે ઉત્તમ.",
      bn: "অধিক ফলনশীল আঞ্চলিক জাত; ড্রিপ সেচের উপযোগী.",
      ml: "ഉയർന്ന വിളവ് നൽകുന്ന പ്രാദേശിക ഇനം; തുള്ളിനനയ്ക്ക് അനുയോജ്യം.",
      pa: "ਵੱਧ ਝਾੜ ਵਾਲੀ ਖੇਤਰੀ ਕਿਸਮ; ਤੁਪਕਾ ਸਿੰਚਾਈ ਲਈ ਢੁਕਵੀਂ।",
      or: "ଅଧିକ ଅମଳକ୍ଷମ ଆଞ୍ଚଳିକ କିସମ; ଡ୍ରିପ୍ ସେଚ ପାଇଁ ଉପଯୁକ୍ତ।"
    }[l];
    const STOCK_NOTE = {
      hi: "प्रमाणित कलमी / टिश्यू कल्चर पौध", kn: "ಪ್ರಮಾಣೀಕೃತ ಕಸಿ / ಅಂಗಾಂಶ ಕೃಷಿ ಸಸಿ",
      mr: "प्रमाणित कलमी / टिश्यू कल्चर रोपे", te: "ధృవీకరించిన అంటు / టిష్యూ కల్చర్ మొక్కలు",
      ta: "சான்றளிக்கப்பட்ட ஒட்டு / திசு வளர்ப்பு கன்று", gu: "પ્રમાણિત કલમી / ટીશ્યુ કલ્ચર રોપા",
      bn: "প্রত্যয়িত কলম / টিস্যু কালচার চারা", ml: "സാക്ഷ്യപ്പെടുത്തിയ ഗ്രാഫ്റ്റ് / ടിഷ്യു കൾച്ചർ തൈകൾ",
      pa: "ਪ੍ਰਮਾਣਿਤ ਕਲਮੀ / ਟਿਸ਼ੂ ਕਲਚਰ ਬੂਟੇ", or: "ପ୍ରମାଣିତ କଲମୀ / ଟିସ୍ୟୁ କଲଚର ଚାରା"
    }[l];

    const texRaw = String(loc.soil_texture || "Loam");
    const TEX_FALLBACK = {
      hi: "बलुई दोमट", kn: "ಮರಳು ಮಿಶ್ರಿತ ಜೇಡಿ", mr: "वाळूयुक्त गाळ", te: "ఇసుక గరప నేల",
      ta: "மணல் வண்டல்", gu: "રેતાળ ગોરાડુ", bn: "বেলে দোআঁশ", ml: "മണൽ പശിമരാശി", pa: "ਰੇਤਲੀ ਦੋਮਟ", or: "ବାଲିଆ ଦୋରସା"
    }[l];
    const locTexture = (window.app && typeof window.app.localizeSoilTexture === "function")
      ? window.app.localizeSoilTexture(texRaw, l)
      : (TEX_FALLBACK || texRaw);

    return {
      ...r,
      plant_name: pName,
      location_analysis: {
        ...loc,
        zone_name: ZONES[l] || loc.zone_name,
        soil_texture: locTexture
      },
      compatibility: {
        ...r.compatibility,
        verdict
      },
      recommended_breeds: (r.recommended_breeds || []).map((b) => ({
        ...b,
        yield: A.localizeUnitsInRange(
          String(b.yield || "").replace(/(?:Tonnes?|T)\s*\/\s*acre/gi, A.t("ton_acre_unit", l)),
          l
        ),
        trait: BREED_NOTE,
        rootstock: STOCK_NOTE
      })),
      irrigation_plan: {
        ...irr,
        method: METHODS[l] || irr.method,
        yield_boosting_steps: STEPS || irr.yield_boosting_steps
      }
    };
  };
})();
