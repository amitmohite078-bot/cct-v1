/**
 * AgroCloud AI - Crop Suitability UI Renderer & Comparison Engine
 * Comprehensive Multilingual Support for 11 Indian Languages:
 * English (en), Hindi (hi), Kannada (kn), Telugu (te), Tamil (ta), Marathi (mr),
 * Gujarati (gu), Bengali (bn), Malayalam (ml), Punjabi (pa), Odia (or)
 */

const SUITABILITY_CROP_NAMES = {
  rice: {
    en: "Rice (Paddy)", hi: "धान / चावल (Rice)", kn: "ಭತ್ತ / ಅಕ್ಕಿ (Rice)",
    te: "వరి / బియ్యం (Rice)", ta: "நெல் / அரிசி (Rice)", mr: "भात / तांदूळ (Rice)",
    gu: "ડાંગર / ચોખા (Rice)", bn: "ধান / চাল (Rice)", ml: "നെല്ല് / അരി (Rice)",
    pa: "ਝੋਨਾ / ਚੌਲ (Rice)", or: "ଧାନ / ଚାଉଳ (Rice)"
  },
  wheat: {
    en: "Wheat", hi: "गेहूं (Wheat)", kn: "ಗೋಧಿ (Wheat)",
    te: "గోధుమ (Wheat)", ta: "கோதுமை (Wheat)", mr: "गहू (Wheat)",
    gu: "ઘઉં (Wheat)", bn: "গম (Wheat)", ml: "ഗോതമ്പ് (Wheat)",
    pa: "ਕਣਕ (Wheat)", or: "ଗହମ (Wheat)"
  },
  maize: {
    en: "Maize (Corn)", hi: "मक्का (Maize)", kn: "ಮೆಕ್ಕೆಜೋಳ (Maize)",
    te: "మొక్కజొన్న (Maize)", ta: "மக்காச்சோளம் (Maize)", mr: "मका (Maize)",
    gu: "મકાઈ (Maize)", bn: "ভুট্টা (Maize)", ml: "മക്കച്ചോളം (Maize)",
    pa: "ਮੱਕੀ (Maize)", or: "ମକା (Maize)"
  },
  sorghum: {
    en: "Sorghum (Jowar)", hi: "ज्वार (Jowar)", kn: "ಜೋಳ (Jowar)",
    te: "జొన్నలు (Jowar)", ta: "சோளம் (Jowar)", mr: "ज्वारी (Jowar)",
    gu: "જુવાર (Jowar)", bn: "জোয়ার (Jowar)", ml: "ചോളം (Jowar)",
    pa: "ਜਵਾਰ (Jowar)", or: "ଜୁଆର (Jowar)"
  },
  pearl_millet: {
    en: "Pearl Millet (Bajra)", hi: "बाजरा (Bajra)", kn: "ಸಜ್ಜೆ (Bajra)",
    te: "సజ్జలు (Bajra)", ta: "கம்பு (Bajra)", mr: "बाजरी (Bajra)",
    gu: "બાજરી (Bajra)", bn: "বাজরা (Bajra)", ml: "കമ്പ് (Bajra)",
    pa: "ਬਾਜਰਾ (Bajra)", or: "ବାଜରା (Bajra)"
  },
  finger_millet: {
    en: "Finger Millet (Ragi)", hi: "रागी / मडुआ (Finger Millet)", kn: "ರಾಗಿ (Finger Millet)",
    te: "రాగులు (Finger Millet)", ta: "கேழ்வரகு (Ragi)", mr: "नाचणी / रागी (Finger Millet)",
    gu: "નાગલી / રાગી (Ragi)", bn: "মারুয়া / রাগি (Ragi)", ml: "കൂവരക് / റಾಗಿ (Ragi)",
    pa: "ਰਾਗੀ (Ragi)", or: "ମାଣ୍ଡିଆ (Ragi)"
  },
  chickpea: {
    en: "Chickpea (Gram)", hi: "चना (Chickpea)", kn: "ಕಡಲೆ (Gram)",
    te: "శనగలు (Gram)", ta: "கொண்டைக்கடலை (Gram)", mr: "हरभरा (चना)",
    gu: "ચણા (Gram)", bn: "ছোলা (Gram)", ml: "കടല (Gram)",
    pa: "ਛੋਲੇ (Gram)", or: "ବୁଟ (Gram)"
  },
  pigeon_pea: {
    en: "Pigeon Pea (Tur/Arhar)", hi: "अरहर / तुअर (Tur)", kn: "ತೊಗರಿ (Tur)",
    te: "కందులు (Tur)", ta: "துவரை (Tur)", mr: "तूर (Pigeon Pea)",
    gu: "તુવેર (Tur)", bn: "অড়হর ডাল (Tur)", ml: "തുവര (Tur)",
    pa: "ਅਰਹਰ (Tur)", or: "ହରଡ଼ (Tur)"
  },
  soybean: {
    en: "Soybean", hi: "सोयाबीन (Soybean)", kn: "ಸೋಯಾಬೀನ್ (Soybean)",
    te: "సోయాబీన్ (Soybean)", ta: "சோயாபீன் (Soybean)", mr: "सोयाबीन (Soybean)",
    gu: "સોયાબીન (Soybean)", bn: "সয়াবিন (Soybean)", ml: "സോയാബീൻ (Soybean)",
    pa: "ਸੋਇਆਬੀਨ (Soybean)", or: "ସୋୟାବିନ (Soybean)"
  },
  groundnut: {
    en: "Groundnut (Peanut)", hi: "मूंगफली (Groundnut)", kn: "ಕಡಲೆಕಾಯಿ (Groundnut)",
    te: "వేరుశనగ (Groundnut)", ta: "நிலக்கடலை (Groundnut)", mr: "भुईमूग (Groundnut)",
    gu: "મગફળી (Groundnut)", bn: "চীনাবাদাম (Groundnut)", ml: "നിലക്കടല (Groundnut)",
    pa: "ਮੂੰਗਫਲੀ (Groundnut)", or: "ଚିନାବାଦାମ (Groundnut)"
  },
  cotton: {
    en: "Cotton", hi: "कपास (Cotton)", kn: "ಹತ್ತಿ (Cotton)",
    te: "పత్తి (Cotton)", ta: "பருத்தி (Cotton)", mr: "कापूस (Cotton)",
    gu: "કપાસ (Cotton)", bn: "তুলা (Cotton)", ml: "പരുത്തി (Cotton)",
    pa: "ਨਰਮਾ / ਕਪਾਹ (Cotton)", or: "କପା (Cotton)"
  },
  sugarcane: {
    en: "Sugarcane", hi: "गन्ना (Sugarcane)", kn: "ಕಬ್ಬು (Sugarcane)",
    te: "చెరకు (Sugarcane)", ta: "கரும்பு (Sugarcane)", mr: "ऊस (Sugarcane)",
    gu: "શેરડી (Sugarcane)", bn: "আখ (Sugarcane)", ml: "കരിമ്പ് (Sugarcane)",
    pa: "ਗੰਨਾ (Sugarcane)", or: "ଆଖୁ (Sugarcane)"
  },
  potato: {
    en: "Potato", hi: "आलू (Potato)", kn: "ಆಲೂಗಡ್ಡೆ (Potato)",
    te: "బంగాళాదుంప (Potato)", ta: "உருளைக்கிழங்கு (Potato)", mr: "बटाटा (Potato)",
    gu: "બટાકા (Potato)", bn: "আলু (Potato)", ml: "ഉരുളക്കിഴങ്ങ് (Potato)",
    pa: "ਆਲੂ (Potato)", or: "ଆଳୁ (Potato)"
  },
  tomato: {
    en: "Tomato", hi: "टमाटर (Tomato)", kn: "ಟೊಮೆಟೊ (Tomato)",
    te: "టమోటా (Tomato)", ta: "தக்காளி (Tomato)", mr: "टोमॅटो (Tomato)",
    gu: "ટામેટાં (Tomato)", bn: "টমেটো (Tomato)", ml: "തക്കാളി (Tomato)",
    pa: "ਟਮਾਟਰ (Tomato)", or: "ଟମାଟୋ (Tomato)"
  },
  onion: {
    en: "Onion", hi: "प्याज (Onion)", kn: "ಈರುಳ್ಳಿ (Onion)",
    te: "ఉల్లిపాయ (Onion)", ta: "வெங்காயம் (Onion)", mr: "कांदा (Onion)",
    gu: "ડુંગળી (Onion)", bn: "পেঁয়াজ (Onion)", ml: "സവാള (Onion)",
    pa: "ਗੰਢਾ / ਪਿਆਜ਼ (Onion)", or: "ପିଆଜ (Onion)"
  }
};

const SUITABILITY_CATEGORIES = {
  "Cereal / Grain": {
    en: "Cereal / Grain", hi: "अनाज / खाद्यान्न", kn: "ಧಾನ್ಯ / ಸಿರಿಧಾನ್ಯ",
    te: "ధాన్యం / తృణధాన్యం", ta: "தானியம்", mr: "धान्य / तृणधान्य",
    gu: "અનાજ", bn: "দানাশস্য", ml: "ധാന്യം", pa: "ਅਨਾਜ", or: "ଦାନାଶସ୍ୟ"
  },
  "Cereal / Coarse Grain": {
    en: "Cereal / Coarse Grain", hi: "मोटा अनाज", kn: "ಸಿರಿಧಾನ್ಯ",
    te: "చిరుధాన్యాలు", ta: "சிறு தானியம்", mr: "भरड धान्य",
    gu: "જાડું અનાજ", bn: "মোটা শস্য", ml: "പരുക്കൻ ധാന്യം", pa: "ਮੋਟਾ ਅਨਾਜ", or: "ମୋଟା ଶସ୍ୟ"
  },
  "Cereal / Millet": {
    en: "Cereal / Millet", hi: "सिरी धान्य / मिलेट", kn: "ಸಿರಿಧಾನ್ಯ / ರಾಗಿ",
    te: "చిరుధాన్యాలు", ta: "திணை வகைகள்", mr: "तृणधान्य",
    gu: "મિલેટ / બાજરી", bn: "বাজরা জাতীয়", ml: "മില്ലറ്റ്", pa: "ਮਿਲਟ", or: "ମାଣ୍ଡିଆ ଜାତୀୟ"
  },
  "Oilseed": {
    en: "Oilseed", hi: "तिलहन फसल", kn: "ಎಣ್ಣೆಕಾಳು ಬೆಳೆ",
    te: "నూనెగింజలు", ta: "எண்ணெய் வித்து", mr: "गळीत धान्य",
    gu: "તેલીબિયાં પાક", bn: "তৈলবীজ", ml: "എണ്ണക്കുരു", pa: "ਤੇਲ ਬੀਜ", or: "ତୈଳବୀଜ"
  },
  "Vegetable": {
    en: "Vegetable", hi: "सब्जी", kn: "ತರಕಾರಿ",
    te: "కూరగాయ", ta: "காய்கறி", mr: "भाजीपाला",
    gu: "શાકભાજી", bn: "সবজি", ml: "പച്ചക്കറി", pa: "ਸਬਜ਼ੀ", or: "ପନିପରିବା"
  },
  "Pulse / Legume": {
    en: "Pulse / Legume", hi: "दलहन", kn: "ದ್ವಿದಳ ಧಾನ್ಯ",
    te: "పప్పుధాన్యాలు", ta: "பருப்பு வகை", mr: "कडधान्य",
    gu: "કઠોળ", bn: "ডালশস্য", ml: "പയറുവർഗ്ഗങ്ങൾ", pa: "ਦਾਲਾਂ", or: "ଡାଲି ଜାତୀୟ"
  },
  "Cash Crop / Fiber": {
    en: "Cash Crop / Fiber", hi: "नकदी / रेशा फसल", kn: "ವಾಣಿಜ್ಯ / ನಾರು ಬೆಳೆ",
    te: "వాణిజ్య / పీచు పంట", ta: "பணப்பயிர் / நார்", mr: "नगदी / धागा पीक",
    gu: "રોકડિયો / રેસા પાક", bn: "অর্থকরী আঁশ ফসল", ml: "നാണ്യവിള / നാര്", pa: "ਨਕਦੀ / ਰੇਸ਼ਾ ਫ਼ਸਲ", or: "ନଗଦ / ତନ୍ତୁ ଫସଲ"
  },
  "Cash Crop / Sugar": {
    en: "Cash Crop / Sugar", hi: "नकदी / शर्करा फसल", kn: "ವಾಣಿಜ್ಯ / ಸಕ್ಕರೆ ಬೆಳೆ",
    te: "వాణిజ్య / చక్కెర పంట", ta: "பணப்பயிர் / சர்க்கரை", mr: "नगदी / साखर पीक",
    gu: "રોકડિયો / ખાંડ પાક", bn: "অর্থকরী চিনি ফসল", ml: "നാണ്യവിള / പഞ്ചസാര", pa: "ਨਕਦੀ / ਖੰਡ ਫ਼ਸਲ", or: "ନଗଦ / ଚିନି ଫସଲ"
  },
  "Tuber": {
    en: "Tuber", hi: "कंदमूल फसल", kn: "ಗೆಡ್ಡೆ ಬೆಳೆ",
    te: "దుంప పంట", ta: "கிழங்கு வகை", mr: "कंदपीक",
    gu: "કંદમૂળ પાક", bn: "কন্দ জাতীয়", ml: "കിഴങ്ങുവർഗ്ഗം", pa: "ਕੰਦਮੂਲ ਫ਼ਸਲ", or: "କନ୍ଦମୂଳ ଫସଲ"
  }
};

const SUITABILITY_RECOMMENDATIONS = {
  "Highly Suitable": {
    en: "Highly Suitable", hi: "अत्यधिक उपयुक्त", kn: "ಅತ್ಯಂತ ಸೂಕ್ತ",
    te: "అత్యంత అనుకూలం", ta: "மிகவும் பொருத்தமானது", mr: "अत्यंत योग्य",
    gu: "ખૂબ જ અનુકૂળ", bn: "অত্যন্ত উপযুক্ত", ml: "വളരെ അനുയോജ്യമായത്",
    pa: "ਬਹੁਤ ਢੁਕਵੀਂ", or: "ଅତ୍ୟନ୍ତ ଉପଯୁକ୍ତ"
  },
  "Moderately Suitable": {
    en: "Moderately Suitable", hi: "मध्यम उपयुक्त", kn: "ಮಧ್ಯಮ ಸೂಕ್ತ",
    te: "మధ్యస్థ అనుకూలం", ta: "மிதமான பொருத்தம்", mr: "मध्यम योग्य",
    gu: "મધ્યમ અનુકૂળ", bn: "মাঝারি উপযুক্ত", ml: "മിതമായ അനുയോജ്യത",
    pa: "ਦਰਮਿਆਨੀ ਢੁਕਵੀਂ", or: "ମଧ୍ୟମ ଉପଯୁକ୍ତ"
  },
  "Marginally Suitable": {
    en: "Marginally Suitable", hi: "सीमांत उपयुक्त", kn: "ಸ್ವಲ್ಪ ಸೂಕ್ತ",
    te: "స్వల్ప అనుకూలం", ta: "குறைந்த பொருத்தம்", mr: "किमान योग्य",
    gu: "ઓછું અનુકૂળ", bn: "সামান্য উপযুক্ত", ml: "കുറഞ്ഞ അനുയോജ്യത",
    pa: "ਸੀਮਾਂਤ ਢੁਕਵੀਂ", or: "ସାମାନ୍ୟ ଉପଯୁକ୍ତ"
  },
  "Not Suitable": {
    en: "Not Suitable", hi: "उपयुक्त नहीं", kn: "ಸೂಕ್ತವಲ್ಲ",
    te: "అనుకూలం కాదు", ta: "பொருத்தமற்றது", mr: "अयोग्य",
    gu: "અનુકૂળ નથી", bn: "উপযুক্ত নয়", ml: "യോജിച്ചതല്ല",
    pa: "ਢੁਕਵੀਂ ਨਹੀਂ", or: "ଉପଯୁକ୍ତ ନୁହେଁ"
  }
};

const SUITABILITY_SEASONS = {
  "Kharif": {
    en: "Kharif (Monsoon)", hi: "खरीफ (मानसून)", kn: "ಖಾರಿಫ್ (ಮುಂಗಾರು)",
    te: "ఖరీఫ్ (వర్షాకాలం)", ta: "காரீப் (பருவமழை)", mr: "खरीप (पावसाळा)",
    gu: "ચોમાસું (ખરીફ)", bn: "খরিফ (বর্ষাকাল)", ml: "ഖാരിഫ് (മഴക്കാലം)",
    pa: "ਸਾਉਣੀ / ਖ਼ਰੀਫ਼", or: "ଖରିଫ (ବର୍ଷା)"
  },
  "Kharif (Monsoon)": {
    en: "Kharif (Monsoon)", hi: "खरीफ (मानसून)", kn: "ಖಾರಿಫ್ (ಮುಂಗಾರು)",
    te: "ఖరీఫ్ (వర్షాకాలం)", ta: "காரீப் (பருவமழை)", mr: "खरीप (पावसाळा)",
    gu: "ચોમાસું (ખરીફ)", bn: "খরিফ (বর্ষাকাল)", ml: "ഖാരിഫ് (മഴക്കാലം)",
    pa: "ਸਾਉਣੀ / ਖ਼ਰੀਫ਼", or: "ଖରିଫ (ବର୍ଷା)"
  },
  "Rabi": {
    en: "Rabi (Winter)", hi: "रबी (शीतकालीन)", kn: "ರಬಿ (ಹಿಂಗಾರು)",
    te: "రబీ (శీతాకాలం)", ta: "ரபி (குளிர்காலம்)", mr: "रब्बी (हिवाळी)",
    gu: "શિયાળુ (રવી)", bn: "রবি (শীতকাল)", ml: "റബി (ശീതകാലം)",
    pa: "ਹਾੜੀ / ਰਬੀ", or: "ରବି (ଶୀତ)"
  },
  "Rabi (Winter)": {
    en: "Rabi (Winter)", hi: "रबी (शीतकालीन)", kn: "ರಬಿ (ಹಿಂಗಾರು)",
    te: "రబీ (శీతాకాలం)", ta: "ரபி (குளிர்காலம்)", mr: "रब्बी (हिवाळी)",
    gu: "શિયાળુ (રવી)", bn: "রবি (শীতকাল)", ml: "റബി (ശീതകാലം)",
    pa: "ਹਾੜੀ / ਰਬੀ", or: "ରବି (ଶୀତ)"
  },
  "Zaid": {
    en: "Zaid (Summer)", hi: "जायद (ग्रीष्मकालीन)", kn: "ಜೈದ್ (ಬೇಸಿಗೆ)",
    te: "జాయెద్ (వేసవి)", ta: "சையத் (கோடைகாலம்)", mr: "उन्हाळी (झायेद)",
    gu: "ઉનાળુ (જાયદ)", bn: "জায়েদ (গ্রীষ্মকাল)", ml: "സെയ്ദ് (വേനൽക്കാലം)",
    pa: "ਜ਼ਾਇਦ (ਗਰਮੀ)", or: "ଜାଏଦ (ଖରା)"
  },
  "Zaid (Summer)": {
    en: "Zaid (Summer)", hi: "जायद (ग्रीष्मकालीन)", kn: "ಜೈದ್ (ಬೇಸಿಗೆ)",
    te: "జాయెద్ (వేసవి)", ta: "சையத் (கோடைகாலம்)", mr: "उन्हाळी (झायेद)",
    gu: "ઉનાળુ (જાયદ)", bn: "জায়েদ (গ্রীষ্মকাল)", ml: "സെയ്ദ് (വേനൽക്കാലം)",
    pa: "ਜ਼ਾਇਦ (ਗਰਮੀ)", or: "ଜାଏଦ (ଖରା)"
  },
  "Year-Round (Kharif/Rabi)": {
    en: "Year-Round (Kharif/Rabi)", hi: "वर्षभर (खरीफ/रबी)", kn: "ವರ್ಷಪೂರ್ತಿ (ಖಾರಿಫ್/ರಬಿ)",
    te: "సంవత్సరం పొడవునా", ta: "ஆண்டு முழுவதும்", mr: "वर्षभर (खरीप/रब्बी)",
    gu: "આખું વર્ષ", bn: "সারা বছর", ml: "വർഷം മുഴുവൻ", pa: "ਸਾਰਾ ਸਾਲ", or: "ବର୍ଷ ସାରା"
  },
  "Year-Round": {
    en: "Year-Round", hi: "वर्षभर", kn: "ವರ್ಷಪೂರ್ತಿ",
    te: "సంవత్సరం పొడవునా", ta: "ஆண்டு முழுவதும்", mr: "वर्षभर",
    gu: "આખું વર્ષ", bn: "সারা বছর", ml: "വർഷം മുഴുവൻ", pa: "ਸਾਰਾ ਸਾਲ", or: "ବର୍ଷ ସାରା"
  }
};

const SUITABILITY_LIMITING_FACTORS = {
  blast: {
    en: "Blast Disease Control", hi: "झोंका रोग नियंत्रण (Blast Disease)", kn: "ಬೆಂಕಿ ರೋಗ ನಿಯಂತ್ರಣ (Blast Disease)",
    te: "అగ్గి తెగులు నియంత్రణ (Blast)", ta: "குலை நோய் கட்டுப்பாடு (Blast)", mr: "करपा रोग नियंत्रण (Blast Disease)",
    gu: "બ્લાસ્ટ રોગ નિયંત્રણ", bn: "ব্লাস্ট রোগ নিয়ন্ত্রণ", ml: "ബ്ലാസ്റ്റ് രോഗ നിയന്ത്രണം",
    pa: "ਬਲਾਸਟ ਰੋਗ ਨਿਯੰਤਰਣ", or: "ବ୍ଲାଷ୍ଟ ରୋଗ ନିୟନ୍ତ୍ରଣ"
  },
  peg: {
    en: "Peg Penetration Resistance", hi: "पेग प्रवेश प्रतिरोध (Peg Penetration)", kn: "ಕಾಯಿ ಇಳಿಯುವಿಕೆ ಪ್ರತಿರೋಧ (Peg Penetration)",
    te: "ఊడలు దిగే నిరోధం", ta: "விழுது இறங்கும் எதிர்ப்பு", mr: "आऱ्या जमिनीत जाण्यास अडथळा",
    gu: "સૂયા બેસવામાં અવરોધ", bn: "শিকড় অনুপ্রবেশে বাধা", ml: "വേരൂന്നൽ പ്രതിരോധം",
    pa: "ਪੈੱਗ ਪ੍ਰਵੇਸ਼ ਪ੍ਰਤੀਰੋਧ", or: "ମୂଳ ପ୍ରବେଶ ପ୍ରତିରୋଧ"
  },
  borer: {
    en: "Fruit Borer & Leaf Curl Virus", hi: "फल छेदक एवं पत्ती मरोड़ विषाणु", kn: "ಕಾಯಿ ಕೊರೆಯುವ ಹುಳು & ಎಲೆ ಮುದುರು ರೋಗ",
    te: "కాయ తొలుచు పురుగు & ఆకు ముడత", ta: "காய் துளைப்பான் & இலை சுருள்", mr: "फळ पोखरणारी अळी व पर्णकुंचन विषाणू",
    gu: "ફળ કોરી ખાનાર ઈયળ અને પર્ણ વલન", bn: "ফল ছিদ্রকারী পোকা ও পাতা কোঁকড়ানো", ml: "കായ് തുരപ്പനും ഇലച്ചുരുളും",
    pa: "ਫਲ ਛੇਦਕ ਅਤੇ ਪੱਤਾ ਮਰੋੜ", or: "ଫଳ ବିନ୍ଧା ପୋକ ଏବଂ ପତ୍ର କୁଞ୍ଚନ"
  },
  leach: {
    en: "Nutrient Leaching in Sandy Soil", hi: "बलुई मिट्टी में पोषक तत्वों का रिसाव", kn: "ಮರಳು ಮಣ್ಣಿನಲ್ಲಿ ಪೋಷಕಾಂಶಗಳ ಸೋರಿಕೆ",
    te: "ఇసుక నేలలో పోషకాల లీచింగ్", ta: "மணல் மண்ணில் ஊட்டச்சத்து கசிவு", mr: "वाळूयुक्त मातीत पोषणद्रव्यांचा निचरा",
    gu: "રેતાળ જમીનમાં પોષક તત્વોનો બગાડ", bn: "বেলে মাটিতে পুষ্টি উপাদানের ক্ষয়", ml: "മണൽമണ്ണിൽ പോഷക ചോർച്ച",
    pa: "ਰੇਤਲੀ ਮਿੱਟੀ ਵਿੱਚ ਪੋਸ਼ਕ ਤੱਤਾਂ ਦਾ ਵਹਾਅ", or: "ବାଲିଆ ମାଟିରେ ପୋଷକ ତତ୍ତ୍ୱ କ୍ଷୟ"
  },
  water: {
    en: "High Water Requirement", hi: "अत्यधिक जल आवश्यकता", kn: "ಹೆಚ್ಚಿನ ನೀರಿನ ಅವಶ್ಯಕತೆ",
    te: "అధిక నీటి అవసరం", ta: "அதிக நீர் தேவை", mr: "जास्त पाण्याची आवश्यकता",
    gu: "વધુ પાણીની જરૂરિયાત", bn: "উচ্চ জল চাহিদা", ml: "കൂടിയ ജലാവശ്യകത",
    pa: "ਵੱਧ ਪਾਣੀ ਦੀ ਲੋੜ", or: "ଅଧିକ ଜଳ ଆବଶ୍ୟକତା"
  },
  heat: {
    en: "Terminal Heat Stress", hi: "अंतिम तापीय तनाव", kn: "ಕೊನೆಯ ಹಂತದ ಉಷ್ಣತೆಯ ಒತ್ತಡ",
    te: "ఆఖరి దశ ఉష్ణోగ్రత ఒత్తిడి", ta: "கடைசி கட்ட வெப்ப அழுத்தம்", mr: "उष्णतेचा ताण",
    gu: "પાછળની અવસ્થાએ ગરમીનો તણાવ", bn: "পরবর্তী পর্যায়ের তাপমাত্রা চাপ", ml: "താപ സമ്മർദ്ദം",
    pa: "ਤਾਪਮਾਨ ਤਣਾਅ", or: "ଶେଷ ପର୍ଯ୍ୟାୟ ତାପମାତ୍ରା ଚାପ"
  },
  drainage: {
    en: "Drainage & Waterlogging", hi: "जलभराव एवं खराब निकासी", kn: "ಕಳಪೆ ಒಳಚರಂಡಿ ಮತ್ತು ನೀರು ನಿಲ್ಲುವಿಕೆ",
    te: "మురుగునీటి నిల్వ సమస్య", ta: "வடிகால் & நீர் தேங்குதல்", mr: "पाणी साचणे आणि निचरा अडथळा",
    gu: "પાણી ભરાવ અને નિકાલ સમસ્યા", bn: "জল নিষ্কাশন ও জলাবদ্ধতা", ml: "നീർവാർച്ച കുറവ്",
    pa: "ਜਲ ਨਿਕਾਸੀ ਦੀ ਸਮੱਸਿਆ", or: "ଜଳ ନିଷ୍କାସନ ସମସ୍ୟା"
  },
  carbon: {
    en: "Low Soil Organic Carbon", hi: "कम मृदा जैविक कार्बन", kn: "ಕಡಿಮೆ ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲ",
    te: "నేలలో సేంద్రీయ కర్బనం తక్కువ", ta: "குறைந்த கரிம கார்பன்", mr: "कमी सेंद्रिय कर्ब",
    gu: "જમીનમાં ઓછો સેન્દ્રીય કાર્બન", bn: "মাটিতে কম জৈব কার্বন", ml: "കുറഞ്ഞ ജൈവ കാർബൺ",
    pa: "ਘੱਟ ਜੈਵਿਕ ਕਾਰਬਨ", or: "କମ ଜୈବିକ ଅଙ୍ଗାରକାମ୍ଳ"
  },
  ph: {
    en: "Soil pH Limiting Range", hi: "मृदा पीएच सीमा", kn: "ಮಣ್ಣಿನ ಪಿಎಚ್ ಮಿತಿ",
    te: "నేల pH పరిమితి", ta: "மண் pH வரம்பு", mr: "माती सामू मर्यादा",
    gu: "જમીન pH મર્યાદા", bn: "মাটির পিএইচ সীমাবদ্ধতা", ml: "മണ്ണ് pH പരിധി",
    pa: "ਮਿੱਟੀ pH ਸੀਮਾ", or: "ମାଟି pH ସୀମା"
  }
};

class SuitabilityRenderer {
  constructor(containerId, onSelectCropCallback) {
    this.container = document.getElementById(containerId);
    this.onSelectCropCallback = onSelectCropCallback;
    this.selectedCropId = null;
    this.rankedCrops = [];
    this.radarChart = null;
    this.currentLanguage = (window.kbvApp && window.kbvApp.currentLanguage) || "en";
    this.lastData = null;
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    if (this.lastData) {
      this.render(this.lastData);
    }
  }

  localizeCropName(crop) {
    const lang = this.currentLanguage || "en";
    if (crop.id && SUITABILITY_CROP_NAMES[crop.id] && SUITABILITY_CROP_NAMES[crop.id][lang]) {
      return SUITABILITY_CROP_NAMES[crop.id][lang];
    }
    const nameLower = (crop.name || "").toLowerCase();
    for (const id in SUITABILITY_CROP_NAMES) {
      if (nameLower.includes(id) || (crop.id && crop.id.includes(id))) {
        return SUITABILITY_CROP_NAMES[id][lang] || crop.name;
      }
    }
    return crop.name;
  }

  localizeCategory(cat) {
    const lang = this.currentLanguage || "en";
    if (!cat) return "";
    return (SUITABILITY_CATEGORIES[cat] && SUITABILITY_CATEGORIES[cat][lang]) || cat;
  }

  localizeRecommendation(rec) {
    const lang = this.currentLanguage || "en";
    if (!rec) return "Suitable";
    return (SUITABILITY_RECOMMENDATIONS[rec] && SUITABILITY_RECOMMENDATIONS[rec][lang]) || rec;
  }

  localizeSeason(season) {
    const lang = this.currentLanguage || "en";
    if (!season) return "";
    for (const key in SUITABILITY_SEASONS) {
      if (season.toLowerCase().includes(key.toLowerCase())) {
        return SUITABILITY_SEASONS[key][lang] || season;
      }
    }
    return season;
  }

  localizeDuration(durationStr) {
    const lang = this.currentLanguage || "en";
    if (!durationStr) return "";
    const unit = {
      en: "days", hi: "दिन", kn: "ದಿನಗಳು", te: "రోజులు", ta: "நாட்கள்",
      mr: "दिवस", gu: "દિવસો", bn: "দিন", ml: "ദിവസങ്ങൾ", pa: "ਦਿਨ", or: "ଦିନ"
    }[lang] || "days";
    return durationStr.replace(/\bdays?\b/gi, unit);
  }

  localizeWater(waterStr) {
    const lang = this.currentLanguage || "en";
    if (!waterStr) return "";
    const unit = {
      en: "mm", hi: "मिमी", kn: "ಮಿ.ಮೀ", te: "మి.మీ", ta: "மி.மீ",
      mr: "मिमी", gu: "મીમી", bn: "মিমি", ml: "മി.മീ", pa: "ਮਿਲੀਮੀਟਰ", or: "ମିମି"
    }[lang] || "mm";
    return waterStr.replace(/\bmm\b/gi, unit);
  }

  localizeLimitingFactor(factorStr) {
    const lang = this.currentLanguage || "en";
    if (!factorStr) return "";
    const s = factorStr.toLowerCase();
    for (const key in SUITABILITY_LIMITING_FACTORS) {
      if (s.includes(key)) {
        return SUITABILITY_LIMITING_FACTORS[key][lang] || factorStr;
      }
    }
    return factorStr;
  }

  render(cropSuitabilityData) {
    if (!cropSuitabilityData || !cropSuitabilityData.top_recommendations) {
      const emptyMsg = {
        en: "No crop recommendations available. Run analysis first.",
        hi: "कोई फसल अनुशंसा उपलब्ध नहीं है। पहले विश्लेषण चलाएं।",
        kn: "ಯಾವುದೇ ಬೆಳೆ ಶಿಫಾರಸುಗಳು ಲಭ್ಯವಿಲ್ಲ. ಮೊದಲು ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ.",
        te: "పంట సిఫార్సులు అందుబాటులో లేవు. ముందుగా విశ్లేషణను అమలు చేయండి.",
        ta: "பயிர் பரிந்துரைகள் இல்லை. முதலில் பகுப்பாய்வு செய்யுங்கள்.",
        mr: "कोणतीही पीक शिफारस उपलब्ध नाही. प्रथम विश्लेषण चालवा.",
        gu: "કોઈ પાક ભલામણ ઉપલબ્ધ નથી. પ્રથમ વિશ્લેષણ ચલાવો.",
        bn: "কোন ফসলের সুপারিশ উপলব্ধ নেই। প্রথমে বিশ্লেষণ চালান।",
        ml: "വിള ശുപാർശകൾ ലഭ്യമല്ല. ആദ്യം വിശകലനം നടത്തുക.",
        pa: "ਕੋਈ ਫ਼ਸਲ ਸਿਫ਼ਾਰਸ਼ ਉਪਲਬਧ ਨਹੀਂ। ਪਹਿਲਾਂ ਵਿਸ਼ਲੇਸ਼ਣ ਚਲਾਓ।",
        or: "କୌଣସି ଫସଲ ସୁପାରିଶ ଉପଲବ୍ଧ ନାହିଁ। ପ୍ରଥମେ ବିଶ୍ଳେଷଣ କରନ୍ତୁ।"
      }[this.currentLanguage] || "No crop recommendations available. Run analysis first.";
      this.container.innerHTML = `<div class="empty-state">${emptyMsg}</div>`;
      return;
    }
    this.lastData = cropSuitabilityData;

    const LBL = {
      en: {
        season: "Season", evaluated: "Evaluated", crops: "crops", compare: "⚖ Compare Crops",
        soil: "Soil", climate: "Climate", water: "Water", terrain: "Terrain", season_bar: "Season",
        duration: "Duration", limiting: "Limiting Factor:", select: "Select Crop →",
        active: "✓ Active Crop for Modules", click_to_select: "Click to Select & Diagnose",
                est_produce_acre: "Estimated Produce (Per Acre)", total_1km_produce: "1 km² Area (247.1 Acres)",

      },
      hi: {
        season: "मौसम", evaluated: "मूल्यांकन", crops: "फसलें", compare: "⚖ फसल तुलना",
        soil: "मृदा", climate: "जलवायु", water: "जल", terrain: "भूभाग", season_bar: "मौसम",
        duration: "अवधि", limiting: "सीमित कारक:", select: "फसल चुनें →",
        active: "✓ सक्रिय फसल (मॉड्यूल से संबद्ध)", click_to_select: "चुनने और निदान के लिए क्लिक करें",
                est_produce_acre: "अनुमानित उत्पादन (प्रति एकड़)", total_1km_produce: "1 किमी² कुल उपज (247.1 एकड़)",

      },
      kn: {
        season: "ಋತು", evaluated: "ಮೌಲ್ಯಮಾಪನ", crops: "ಬೆಳೆಗಳು", compare: "⚖ ಬೆಳೆ ಹೋಲಿಕೆ",
        soil: "ಮಣ್ಣು", climate: "ಹವಾಮಾನ", water: "ನೀರು", terrain: "ಭೂಪ್ರದೇಶ", season_bar: "ಋತು",
        duration: "ಅವಧಿ", limiting: "ಮಿತಿ ಅಂಶ:", select: "ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ →",
        active: "✓ ಸಕ್ರಿಯ ಬೆಳೆ (ವಿಭಾಗಗಳಿಗೆ ಜೋಡಿಸಲಾಗಿದೆ)", click_to_select: "ಆಯ್ಕೆ ಮತ್ತು ರೋಗ ಪತ್ತೆಗಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ",
                est_produce_acre: "ಅಂದಾಜು ಉತ್ಪಾದನೆ (ಪ್ರತಿ ಎಕರೆಗೆ)", total_1km_produce: "1 ಕಿಮೀ² ಒಟ್ಟು ಇಳುವರಿ (247.1 ಎಕರೆ)",

      },
      te: {
        season: "సీజన్", evaluated: "మూల్యాంకనం", crops: "పంటలు", compare: "⚖ పంటల పోలిక",
        soil: "నేల", climate: "వాతావరణం", water: "నీరు", terrain: "భూభాగం", season_bar: "సీజన్",
        duration: "వ్యవధి", limiting: "పరిమిత కారకం:", select: "పంట ఎంచుకోండి →",
        active: "✓ యాక్టివ్ పంట (మాడ్యూల్స్‌కు లింక్ చేయబడింది)", click_to_select: "ఎంచుకోవడానికి క్లిక్ చేయండి",
                est_produce_acre: "అంచనా దిగుబడి (ప్రతి ఎకరాకు)", total_1km_produce: "1 చ.కి.మీ మొత్తం ఉత్పత్తి (247.1 ఎకరాలు)",

      },
      ta: {
        season: "பருவம்", evaluated: "மதிப்பீடு", crops: "பயிர்கள்", compare: "⚖ பயிர் ஒப்பீடு",
        soil: "மண்", climate: "காலநிலை", water: "நீர்", terrain: "நிலப்பரப்பு", season_bar: "பருவம்",
        duration: "கால அளவு", limiting: "கட்டுப்படுத்தும் காரணி:", select: "பயிர் தேர்வு →",
        active: "✓ செயலில் உள்ள பயிர்", click_to_select: "தேர்வு செய்ய கிளிக் செய்க",
                est_produce_acre: "மதிப்பிடப்பட்ட மகசூல் (ஏக்கருக்கு)", total_1km_produce: "1 ச.கி.மீ மொத்த உற்பத்தி (247.1 ஏக்கர்)",

      },
      mr: {
        season: "हंगाम", evaluated: "मूल्यांकन", crops: "पिके", compare: "⚖ पिकांची तुलना",
        soil: "माती", climate: "हवामान", water: "पाणी", terrain: "जमीन", season_bar: "हंगाम",
        duration: "कालावधी", limiting: "मर्यादित घटक:", select: "पीक निवडा →",
        active: "✓ सक्रिय पीक (मॉड्यूलशी जोडलेले)", click_to_select: "निवडण्यासाठी क्लिक करा",
                est_produce_acre: "अंदाजे उत्पादन (प्रति एकर)", total_1km_produce: "1 किमी² एकूण उत्पादन (247.1 एकर)",

      },
      gu: {
        season: "હવામાન / ઋતુ", evaluated: "મૂલ્યાંકન", crops: "પાકો", compare: "⚖ પાક સરખામણી",
        soil: "જમીન", climate: "હવામાન", water: "પાણી", terrain: "જમીન ઢોળાવ", season_bar: "ઋતુ",
        duration: "સમયગાળો", limiting: "મર્યાદિત પરિબળ:", select: "પાક પસંદ કરો →",
        active: "✓ સક્રિય પાક", click_to_select: "પસંદ કરવા ક્લિક કરો",
                est_produce_acre: "અંદાજિત ઉત્પાદન (પ્રતિ એકર)", total_1km_produce: "1 ચો.કિમી કુલ ઉત્પાદન (247.1 એકર)",

      },
      bn: {
        season: "মৌসুম", evaluated: "মূল্যায়ন", crops: "ফসল", compare: "⚖ ফসল তুলনা",
        soil: "মাটি", climate: "আবহাওয়া", water: "জল", terrain: "ভূপ্রকৃতি", season_bar: "মৌসুম",
        duration: "সময়কাল", limiting: "সীমাবদ্ধকারী উপাদান:", select: "ফসল নির্বাচন করুন →",
        active: "✓ সক্রিয় ফসল", click_to_select: "নির্বাচন করতে ক্লিক করুন",
                est_produce_acre: "আনুমানিক ফলন (প্রতি একর)", total_1km_produce: "১ বর্গ কিমি মোট ফলন (২৪৭.১ একর)",

      },
      ml: {
        season: "കാലം", evaluated: "വിലയിരുത്തൽ", crops: "വിളകൾ", compare: "⚖ വിള താരതമ്യം",
        soil: "മണ്ണ്", climate: "കാലാവസ്ഥ", water: "ജലം", terrain: "ഭൂപ്രകൃതി", season_bar: "കാലം",
        duration: "കാലാവധി", limiting: "പരിമിതപ്പെടുത്തുന്ന ഘടകം:", select: "വിള തിരഞ്ഞെടുക്കുക →",
        active: "✓ സജീവ വിള", click_to_select: "തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക",
                est_produce_acre: "കണക്കാക്കിയ വിളവ് (ഏക്കറിന്)", total_1km_produce: "1 ച.കി.മീ മൊത്തം ഉത്പാദനം (247.1 ഏക്കർ)",

      },
      pa: {
        season: "ਮੌਸਮ", evaluated: "ਮੁਲਾਂਕਣ", crops: "ਫ਼ਸਲਾਂ", compare: "⚖ ਫ਼ਸਲ ਤੁਲਨਾ",
        soil: "ਮਿੱਟੀ", climate: "ਜਲਵਾਯੂ", water: "ਪਾਣੀ", terrain: "ਜ਼ਮੀਨ", season_bar: "ਮੌਸਮ",
        duration: "ਮਿਆਦ", limiting: "ਸੀਮਤ ਕਾਰਕ:", select: "ਫ਼ਸਲ ਚੁਣੋ →",
        active: "✓ ਸਰਗਰਮ ਫ਼ਸਲ", click_to_select: "ਚੁਣਨ ਲਈ ਕਲਿੱਕ ਕਰੋ",
                est_produce_acre: "ਅੰਦਾਜ਼ਨ ਝਾੜ (ਪ੍ਰਤੀ ਏਕੜ)", total_1km_produce: "1 ਵਰਗ ਕਿਮੀ ਕੁੱਲ ਉਤਪਾਦਨ (247.1 ਏਕੜ)",

      },
      or: {
        season: "ଋତୁ", evaluated: "ମୂଲ୍ୟାଙ୍କନ", crops: "ଫସଲ", compare: "⚖ ଫସଲ ତୁଳନା",
        soil: "ମାଟି", climate: "ଜଳବାୟୁ", water: "ଜଳ", terrain: "ଭୂଭାଗ", season_bar: "ଋତୁ",
        duration: "ଅବଧି", limiting: "ସୀମିତ କାରକ:", select: "ଫସଲ ଚୟନ କରନ୍ତୁ →",
        active: "✓ ସକ୍ରିୟ ଫସଲ", click_to_select: "ଚୟନ କରିବାକୁ କ୍ଲିକ କରନ୍ତୁ",
                est_produce_acre: "ଆନୁମାନିକ ଅମଳ (ଏକର ପିଛା)", total_1km_produce: "୧ ବର୍ଗ କିମି ମୋଟ ଅମଳ (୨୪୭.୧ ଏକର)",

      }
    }[this.currentLanguage] || {
      season: "Season", evaluated: "Evaluated", crops: "crops", compare: "⚖ Compare Crops",
      soil: "Soil", climate: "Climate", water: "Water", terrain: "Terrain", season_bar: "Season",
      duration: "Duration", limiting: "Limiting Factor:", select: "Select Crop →",
      active: "✓ Active Crop for Modules", click_to_select: "Click to Select & Diagnose"
    };

    this.rankedCrops = cropSuitabilityData.all_ranked_crops || cropSuitabilityData.top_recommendations;
    const top5 = cropSuitabilityData.top_recommendations;
    
    if (!this.selectedCropId && top5.length > 0) {
      this.selectedCropId = top5[0].id;
    }

    const activeSeasonLocalized = this.localizeSeason(cropSuitabilityData.active_season || "Kharif");

    const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");

    let html = `
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:8px;">
        <span style="font-size:0.82rem; color:#4F5E46;">
          ${LBL.season}: <b style="color:#2D5A27;">${activeSeasonLocalized}</b> | 
          ${LBL.evaluated}: <b style="color:#1A2412;">${cropSuitabilityData.total_crops_evaluated || 15}</b> ${LBL.crops}
        </span>
        <button class="btn btn-secondary" style="font-size:0.75rem; padding:4px 10px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.28); color:#2D5A27; border-radius:6px; cursor:pointer; display:inline-flex; align-items:center; gap:5px;" onclick="window.app.openComparisonModal()">
          ${ic("scale", 13)} ${(LBL.compare || "").replace(/^⚖\s*/, "")}
        </button>
      </div>
    `;

    top5.forEach((crop, idx) => {
      const isSelected = crop.id === this.selectedCropId;
      const score = crop.suitability_score;
      const fb = crop.factor_breakdown || { soil_suitability: 80, climate_suitability: 80, rainfall_water_suitability: 80, terrain_suitability: 80, growing_season_suitability: 80 };
      const cropIcoName = typeof window.kbvCropIcon === "function" ? window.kbvCropIcon(crop.id) : "crops";

      const cropLocalizedName = this.localizeCropName(crop);
      const categoryLocalized = this.localizeCategory(crop.category);
      const recommendationLocalized = this.localizeRecommendation(crop.recommendation_category);
      const seasonLocalized = this.localizeSeason(crop.recommended_planting_season);
      const durationLocalized = this.localizeDuration(crop.expected_growing_duration);
      const waterLocalized = this.localizeWater(crop.water_requirement);
      const limitingFactorLocalized = crop.limiting_factor ? this.localizeLimitingFactor(crop.limiting_factor.factor) : "";

      html += `
        <div class="crop-card ${isSelected ? 'selected' : ''}" data-crop-id="${crop.id}" onclick="window.suitabilityRenderer.selectCrop('${crop.id}')" style="background:#FFFFFF; border:1.5px solid ${isSelected ? '#2D5A27' : 'rgba(45,90,39,0.18)'}; border-radius:14px; padding:16px; margin-bottom:12px; cursor:pointer; transition:all 0.2s ease;">
          <div class="crop-header" style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:34px; height:34px; border-radius:10px; background:rgba(45,90,39,0.1); border:1px solid rgba(45,90,39,0.22); color:#2D5A27; display:flex; align-items:center; justify-content:center; flex-shrink:0;">${ic(cropIcoName, 18)}</div>
              <div>
                <div class="crop-title" style="font-size:1.05rem; font-weight:800; color:#1A2412;">#${idx + 1} ${cropLocalizedName}</div>
                <div class="crop-scientific" style="font-size:0.75rem; color:#4F5E46;">${crop.scientific_name || ''} &bull; ${categoryLocalized}</div>
              </div>
            </div>
            <div style="background:rgba(45,90,39,0.1); border:1px solid #2D5A27; padding:4px 10px; border-radius:8px; text-align:right;">
              <span style="font-size:1.15rem; font-weight:900; color:#2D5A27; display:block; line-height:1;">${score}</span>
              <span style="font-size:0.65rem; font-weight:700; color:#4F5E46; text-transform:uppercase;">${recommendationLocalized}</span>
            </div>
          </div>

          <div class="crop-specs-row" style="display:flex; gap:14px; font-size:0.75rem; color:#1A2412; margin-bottom:10px; flex-wrap:wrap; align-items:center;">
            <span style="display:inline-flex; align-items:center; gap:4px; color:#2D5A27;">${ic("calendar", 13)} <b style="color:#4F5E46;">${LBL.season}:</b> <span style="color:#1A2412;">${seasonLocalized}</span></span>
            <span style="display:inline-flex; align-items:center; gap:4px; color:#2D5A27;">${ic("clock", 13)} <b style="color:#4F5E46;">${LBL.duration}:</b> <span style="color:#1A2412;">${durationLocalized}</span></span>
            <span style="display:inline-flex; align-items:center; gap:4px; color:#2D5A27;">${ic("water", 13)} <b style="color:#4F5E46;">${LBL.water}:</b> <span style="color:#1A2412;">${waterLocalized}</span></span>
          </div>

          <!-- Factor Breakdown Mini-bars -->
          <div class="factor-bars-mini" style="display:grid; grid-template-columns:repeat(5, 1fr); gap:6px; margin-bottom:10px;">
            <div class="factor-bar-col">
              <div style="height:4px; background:rgba(45,90,39,0.16); border-radius:2px; overflow:hidden;"><div style="height:100%; width:${fb.soil_suitability}%; background:linear-gradient(90deg, #2D5A27, #6B9433);"></div></div>
              <div style="font-size:0.68rem; color:#4F5E46; margin-top:2px; font-weight:600;">${LBL.soil} ${Math.round(fb.soil_suitability)}</div>
            </div>
            <div class="factor-bar-col">
              <div style="height:4px; background:rgba(45,90,39,0.16); border-radius:2px; overflow:hidden;"><div style="height:100%; width:${fb.climate_suitability}%; background:linear-gradient(90deg, #2D5A27, #6B9433);"></div></div>
              <div style="font-size:0.68rem; color:#4F5E46; margin-top:2px; font-weight:600;">${LBL.climate} ${Math.round(fb.climate_suitability)}</div>
            </div>
            <div class="factor-bar-col">
              <div style="height:4px; background:rgba(45,90,39,0.16); border-radius:2px; overflow:hidden;"><div style="height:100%; width:${fb.rainfall_water_suitability}%; background:linear-gradient(90deg, #2D5A27, #6B9433);"></div></div>
              <div style="font-size:0.68rem; color:#4F5E46; margin-top:2px; font-weight:600;">${LBL.water} ${Math.round(fb.rainfall_water_suitability)}</div>
            </div>
            <div class="factor-bar-col">
              <div style="height:4px; background:rgba(45,90,39,0.16); border-radius:2px; overflow:hidden;"><div style="height:100%; width:${fb.terrain_suitability}%; background:linear-gradient(90deg, #2D5A27, #6B9433);"></div></div>
              <div style="font-size:0.68rem; color:#4F5E46; margin-top:2px; font-weight:600;">${LBL.terrain} ${Math.round(fb.terrain_suitability)}</div>
            </div>
            <div class="factor-bar-col">
              <div style="height:4px; background:rgba(45,90,39,0.16); border-radius:2px; overflow:hidden;"><div style="height:100%; width:${fb.growing_season_suitability}%; background:linear-gradient(90deg, #2D5A27, #6B9433);"></div></div>
              <div style="font-size:0.68rem; color:#4F5E46; margin-top:2px; font-weight:600;">${LBL.season_bar} ${Math.round(fb.growing_season_suitability)}</div>
            </div>
          </div>

          <div style="font-size:0.75rem; color:#33402B; margin-top:6px; line-height:1.4;">
            ${crop.explanation ? crop.explanation.substring(0, 190) + '...' : ''}
          </div>

          ${crop.limiting_factor ? `
            <div style="font-size:0.72rem; color:#7C2D12; background:rgba(217,119,6,0.12); border:1px solid rgba(217,119,6,0.3); padding:4px 8px; border-radius:6px; margin-top:8px; display:flex; align-items:center; gap:6px;">
              <span style="color:#B45309; display:inline-flex;">${ic("alert", 13)}</span> <b style="color:#7C2D12;">${LBL.limiting}</b> ${limitingFactorLocalized} (${crop.limiting_factor.score}/100)
            </div>
          ` : ''}

          ${crop.estimated_produce ? `
            <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); border-radius:12px; padding:12px 14px; margin-top:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                <!-- Per Acre Main Highlight -->
                <div style="display:flex; align-items:center; gap:10px;">
                  <div style="width:36px; height:36px; border-radius:10px; background:rgba(45,90,39,0.14); border:1px solid rgba(45,90,39,0.35); color:#2D5A27; display:flex; align-items:center; justify-content:center;">${ic(cropIcoName, 18)}</div>
                  <div>
                    <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase; letter-spacing:0.04em;">${LBL.est_produce_acre || 'Estimated Produce (Per Acre)'}</div>
                    <div style="font-size:1.08rem; font-weight:900; color:#1A2412; line-height:1.2;">
                      ${crop.estimated_produce.yield_ton_per_acre_range || ((crop.estimated_produce.yield_ton_per_ha_avg / 2.471).toFixed(2) + ' Tonnes / Acre')}
                    </div>
                    ${crop.estimated_produce.yield_quintals_per_acre_range ? `
                      <div style="font-size:0.72rem; color:#2D5A27; font-weight:700; margin-top:2px;">
                        ${crop.estimated_produce.yield_quintals_per_acre_range}
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- 1 km² / Per Hectare Reference -->
                <div style="text-align:right;">
                  <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase; letter-spacing:0.04em;">${LBL.total_1km_produce || '1 km² Total (247.1 Acres)'}</div>
                  <div style="font-size:0.98rem; font-weight:900; color:#2D5A27; line-height:1.2;">
                    ${crop.estimated_produce.total_produce_1km2_ton_range}
                  </div>
                  <div style="font-size:0.70rem; color:#4F5E46; margin-top:2px;">
                    ${crop.estimated_produce.yield_ton_per_ha_range}
                  </div>
                </div>
              </div>
            </div>
          ` : ''}

          <div class="crop-card-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; padding-top:10px; border-top:1px solid rgba(45,90,39,0.14);">
            <span style="font-size:0.72rem; color:${isSelected ? '#2D5A27' : '#4F5E46'}; font-weight:600; display:inline-flex; align-items:center; gap:5px;">
              ${isSelected ? `${ic("check", 13)} ${(LBL.active || "").replace(/^✓\s*/, "")}` : LBL.click_to_select}
            </span>
            <button class="btn btn-primary" style="font-size:0.75rem; padding:6px 14px; color:#FFFFFF; border-radius:8px; font-weight:700; cursor:pointer;" onclick="event.stopPropagation(); window.suitabilityRenderer.activateAndOpenModules('${crop.id}')">
              ${LBL.select}
            </button>
          </div>
        </div>
      `;
    });

    this.container.innerHTML = html;
  }

  selectCrop(cropId) {
    this.selectedCropId = cropId;
    document.querySelectorAll(".crop-card").forEach(c => {
      if (c.getAttribute("data-crop-id") === cropId) {
        c.classList.add("selected");
        c.style.borderColor = "#2D5A27";
      } else {
        c.classList.remove("selected");
        c.style.borderColor = "rgba(45,90,39,0.18)";
      }
    });
    if (this.onSelectCropCallback) {
      this.onSelectCropCallback(cropId);
    }
  }

  activateAndOpenModules(cropId) {
    this.selectCrop(cropId);
    const dashCropSelect = document.getElementById("kbvDashCropSelect");
    if (dashCropSelect) {
      for (const opt of dashCropSelect.options) {
        if (opt.value === cropId) {
          dashCropSelect.value = cropId;
          break;
        }
      }
    }
    if (window.kbvApp) {
      window.kbvApp.selectedCrop = cropId;
      if (typeof window.kbvApp.switchDashboardTab === "function") {
        window.kbvApp.switchDashboardTab("irrigation");
        return;
      }
    }
    const modContainer = document.getElementById("kbvDedicatedIrrigationContainer") || document.getElementById("integratedModulesContainer");
    if (modContainer) {
      modContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  renderComparisonModal(cropsToCompare) {
    const modalBody = document.getElementById("comparisonModalBody");
    if (!modalBody) return;

    const lang = this.currentLanguage || "en";
    const LBL = {
      en: { req2: "Select at least 2 crops to compare.", param: "Agronomic Parameter", water: "Water Requirement", dur: "Growing Duration", season: "Optimal Season", limit: "Limiting Factor", pros: "Key Agronomic Advantages", chal: "Primary Challenges & Pests" },
      hi: { req2: "तुलना के लिए कम से कम 2 फसलें चुनें।", param: "कृषि मापदंड", water: "जल आवश्यकता", dur: "विकास अवधि", season: "अनुकूल मौसम", limit: "सीमित कारक", pros: "प्रमुख कृषि लाभ", chal: "प्रमुख चुनौतियाँ एवं कीट" },
      kn: { req2: "ಹೋಲಿಸಲು ಕನಿಷ್ಠ 2 ಬೆಳೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.", param: "ಕೃಷಿ ನಿಯತಾಂಕ", water: "ನೀರಿನ ಅವಶ್ಯಕತೆ", dur: "ಬೆಳವಣಿಗೆಯ ಅವಧಿ", season: "ಸೂಕ್ತ ಋತು", limit: "ಮಿತಿ ಅಂಶ", pros: "ಪ್ರಮುಖ ಕೃಷಿ ಪ್ರಯೋಜನಗಳು", chal: "ಪ್ರಮುಖ ಸವಾಲುಗಳು ಮತ್ತು ಕೀಟಗಳು" },
      te: { req2: "పోల్చడానికి కనీసం 2 పంటలను ఎంచుకోండి.", param: "వ్యవసాయ పరామితి", water: "నీటి అవసరం", dur: "పెరుగుదల కాలం", season: "అనుకూల సీజన్", limit: "పరిమిత కారకం", pros: "కీలక ప్రయోజనాలు", chal: "ప్రధాన సవాళ్లు & తెగుళ్లు" },
      ta: { req2: "ஒப்பிட குறைந்தது 2 பயிர்களைத் தேர்ந்தெடுக்கவும்.", param: "விவசாய அளவுரு", water: "நீர் தேவை", dur: "வளரும் காலம்", season: "உகந்த பருவம்", limit: "கட்டுப்படுத்தும் காரணி", pros: "முக்கிய நன்மைகள்", chal: "முக்கிய சவால்கள் & பூச்சிகள்" },
      mr: { req2: "तुलना करण्यासाठी किमान २ पिके निवडा.", param: "कृषी घटक", water: "पाणी आवश्यकता", dur: "वाढीचा कालावधी", season: "योग्य हंगाम", limit: "मर्यादित घटक", pros: "प्रमुख कृषी फायदे", chal: "मुख्य आव्हाने आणि किडी" },
      gu: { req2: "સરખામણી માટે ઓછામાં ઓછા 2 પાક પસંદ કરો.", param: "કૃષિ પરિમાણ", water: "પાણીની જરૂરિયાત", dur: "વિકાસ સમયગાળો", season: "અનુકૂળ ઋતુ", limit: "મર્યાદિત પરિબળ", pros: "મુખ્ય ફાયદા", chal: "મુખ્ય પડકારો અને જીવાતો" },
      bn: { req2: "তুলনা করতে কমপক্ষে ২টি ফসল নির্বাচন করুন।", param: "কৃষি পরামিতি", water: "জল চাহিদা", dur: "বৃদ্ধির সময়কাল", season: "অনুকূল মৌসুম", limit: "সীমাবদ্ধকারী উপাদান", pros: "প্রধান সুবিধা", chal: "প্রধান চ্যালেঞ্জ ও পোকা" },
      ml: { req2: "താരതമ്യം ചെയ്യാൻ കുറഞ്ഞത് 2 വിളകൾ തിരഞ്ഞെടുക്കുക.", param: "കാർഷിക ഘടകം", water: "ജലാവശ്യകത", dur: "വളർച്ചാ കാലം", season: "അനുയോജ്യമായ കാലം", limit: "പരിമിതപ്പെടുത്തുന്ന ഘടകം", pros: "പ്രധാന നേട്ടങ്ങൾ", chal: "പ്രധാന വെല്ലുവിളികൾ" },
      pa: { req2: "ਤੁਲਨਾ ਕਰਨ ਲਈ ਘੱਟੋ-ਘੱਟ 2 ਫ਼ਸਲਾਂ ਚੁਣੋ।", param: "ਖੇਤੀਬਾੜੀ ਪੈਰਾਮੀਟਰ", water: "ਪਾਣੀ ਦੀ ਲੋੜ", dur: "ਵਾਧੇ ਦੀ ਮਿਆਦ", season: "ਅਨੁਕੂਲ ਮੌਸਮ", limit: "ਸੀਮਤ ਕਾਰਕ", pros: "ਮੁੱਖ ਫਾਇਦੇ", chal: "ਮੁੱਖ ਚੁਣੌਤੀਆਂ ਅਤੇ ਕੀੜੇ" },
      or: { req2: "ତୁଳନା କରିବାକୁ ଅତି କମରେ ୨ଟି ଫସଲ ବାଛନ୍ତୁ।", param: "କୃଷି ପାରାମିଟର", water: "ଜଳ ଆବଶ୍ୟକତା", dur: "ବୃଦ୍ଧି ଅବଧି", season: "ଅନୁକୂଳ ଋତୁ", limit: "ସୀମିତ କାରକ", pros: "ପ୍ରମୁଖ ଲାଭ", chal: "ପ୍ରମୁଖ ଆହ୍ୱାନ ଏବଂ କୀଟ" }
    }[lang] || { req2: "Select at least 2 crops to compare.", param: "Agronomic Parameter", water: "Water Requirement", dur: "Growing Duration", season: "Optimal Season", limit: "Limiting Factor", pros: "Key Agronomic Advantages", chal: "Primary Challenges & Pests" };

    if (!cropsToCompare || cropsToCompare.length < 2) {
      modalBody.innerHTML = `<div style="padding:20px; text-align:center; color:#a5a79b;">${LBL.req2}</div>`;
      return;
    }

    let headerCols = cropsToCompare.map(c => `
      <th style="text-align:center; padding:12px; border-bottom:1px solid rgba(45,90,39,0.2);">
        <div style="font-size:1rem; font-weight:bold; color:#1A2412;">${this.localizeCropName(c)}</div>
        <div style="font-size:0.75rem; color:#4F5E46;">${c.scientific_name || ''}</div>
        <div style="font-size:1.2rem; font-weight:800; color:#2D5A27; margin-top:4px;">${c.suitability_score}/100</div>
      </th>
    `).join("");

    let waterCols = cropsToCompare.map(c => `<td style="text-align:center; padding:10px; color:#1A2412;">${this.localizeWater(c.water_requirement)}</td>`).join("");
    let durationCols = cropsToCompare.map(c => `<td style="text-align:center; padding:10px; color:#1A2412;">${this.localizeDuration(c.expected_growing_duration)}</td>`).join("");
    let seasonCols = cropsToCompare.map(c => `<td style="text-align:center; padding:10px; color:#1A2412;">${this.localizeSeason(c.recommended_planting_season)}</td>`).join("");
    let limitCols = cropsToCompare.map(c => `<td style="text-align:center; padding:10px; color:#7C2D12; font-size:0.75rem;">${c.limiting_factor ? this.localizeLimitingFactor(c.limiting_factor.factor) : 'None'}</td>`).join("");
    let prosCols = cropsToCompare.map(c => `<td style="padding:10px; font-size:0.75rem; vertical-align:top; color:#1A2412;"><ul style="padding-left:14px;">${(c.pros || []).map(p => `<li>${p}</li>`).join('')}</ul></td>`).join("");
    let challengesCols = cropsToCompare.map(c => `<td style="padding:10px; font-size:0.75rem; vertical-align:top; color:#4F5E46;"><ul style="padding-left:14px; color:#4F5E46;">${(c.potential_cultivation_challenges || []).slice(0, 2).map(ch => `<li>${ch}</li>`).join('')}</ul></td>`).join("");

    modalBody.innerHTML = `
      <div id="comparisonRadarWrapper" style="margin-bottom:20px; height:260px; max-width:480px; margin-left:auto; margin-right:auto; display:${typeof Chart === 'undefined' ? 'none' : 'block'};">
        <canvas id="comparisonRadarCanvas"></canvas>
      </div>

      <table style="width:100%; border-collapse:collapse; font-size:0.82rem;">
        <thead>
          <tr style="background:#F0EEE9; border-bottom:1.5px solid rgba(45,90,39,0.22);">
            <th style="padding:12px; text-align:left; color:#2D5A27;">${LBL.param}</th>
            ${headerCols}
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.water}</td>${waterCols}</tr>
          <tr style="background:#F0EEE9;"><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.dur}</td>${durationCols}</tr>
          <tr><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.season}</td>${seasonCols}</tr>
          <tr style="background:#F0EEE9;"><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.limit}</td>${limitCols}</tr>
          <tr><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.pros}</td>${prosCols}</tr>
          <tr style="background:#F0EEE9;"><td style="padding:10px; font-weight:bold; color:#2D5A27;">${LBL.chal}</td>${challengesCols}</tr>
        </tbody>
      </table>
    `;

    setTimeout(() => {
      const ctx = document.getElementById("comparisonRadarCanvas");
      if (!ctx || typeof Chart === "undefined") return;

      const colors = ["#2D5A27", "#6B9433", "#0284c7", "#B45309"];
      const datasets = cropsToCompare.map((c, i) => {
        const fb = c.factor_breakdown || {};
        return {
          label: this.localizeCropName(c),
          data: [
            fb.soil_suitability || 80,
            fb.climate_suitability || 80,
            fb.rainfall_water_suitability || 80,
            fb.terrain_suitability || 80,
            fb.growing_season_suitability || 80
          ],
          borderColor: colors[i % colors.length],
          backgroundColor: colors[i % colors.length] + "44",
          borderWidth: 2,
          pointRadius: 3
        };
      });

      const chartLabels = {
        en: ["Soil", "Climate", "Water", "Terrain", "Season"],
        hi: ["मृदा", "जलवायु", "जल", "भूभाग", "मौसम"],
        kn: ["ಮಣ್ಣು", "ಹವಾಮಾನ", "ನೀರು", "ಭೂಪ್ರದೇಶ", "ಋತು"],
        te: ["నేల", "వాతావరణం", "నీరు", "భూభాగం", "సీజన్"],
        ta: ["மண்", "காலநிலை", "நீர்", "நிலப்பரப்பு", "பருவம்"],
        mr: ["माती", "हवामान", "पाणी", "जमीन", "हंगाम"],
        gu: ["જમીન", "હવામાન", "પાણી", "ઢોળાવ", "ઋતુ"],
        bn: ["মাটি", "আবহাওয়া", "জল", "ভূপ্রকৃতি", "মৌসুম"],
        ml: ["മണ്ണ്", "കാലാവസ്ഥ", "ജലം", "ഭൂപ്രകൃതി", "കാലം"],
        pa: ["ਮਿੱਟੀ", "ਜਲਵਾਯੂ", "ਪਾਣੀ", "ਜ਼ਮੀਨ", "ਮੌਸਮ"],
        or: ["ମାଟି", "ଜଳବାୟୁ", "ଜଳ", "ଭୂଭାଗ", "ଋତୁ"]
      }[lang] || ["Soil", "Climate", "Water", "Terrain", "Season"];

      if (this.radarChart) this.radarChart.destroy();
      this.radarChart = new Chart(ctx, {
        type: "radar",
        data: {
          labels: chartLabels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: "rgba(45,90,39,0.2)" },
              grid: { color: "rgba(45,90,39,0.2)" },
              pointLabels: { color: "#1A2412", font: { size: 11, weight: "bold" } },
              ticks: { display: false, min: 0, max: 100 }
            }
          },
          plugins: {
            legend: { labels: { color: "#1A2412", font: { size: 11 } } }
          }
        }
      });
    }, 50);
  }
}

window.SuitabilityRenderer = SuitabilityRenderer;
