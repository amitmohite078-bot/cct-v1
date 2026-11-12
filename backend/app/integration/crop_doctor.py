"""
AgroCloud AI - AI Crop Doctor & Multilingual Agronomist Advisory Module
Provides personalized, scientifically grounded agronomic counsel for the selected crop,
calibrated to the exact 1 km x 1 km edaphic, meteorological, and remote sensing parameters.
Supports multilingual voice & text queries in Hindi, Marathi, Telugu, Tamil, Kannada, Gujarati, and English.
"""
from typing import Dict, Any, List, Optional
from app.models.crop_catalogue import CROPS_DATABASE

def generate_crop_doctor_advisory(
    crop_id: str,
    weather: Dict[str, Any],
    soil: Dict[str, Any],
    terrain: Dict[str, Any]
) -> Dict[str, Any]:
    """
    Synthesizes comprehensive agronomic guidelines tailored to the farmer's specific field parameters.
    """
    crop = CROPS_DATABASE.get(crop_id, CROPS_DATABASE.get("maize"))
    ph = soil.get("ph", 7.0)
    texture = soil.get("texture_class", "Loam")
    nutrients = soil.get("nutrients", {})
    avg_temp = weather.get("average_temperature", 26.0)
    annual_rf = weather.get("annual_rainfall", 800.0)
    slope = terrain.get("slope_pct", 1.5)

    # 1. Soil Amendment Advisory
    soil_amendments = []
    if ph < 5.8:
        soil_amendments.append({
            "issue": f"Soil is moderately acidic (pH {ph})",
            "remedy": "Apply Agricultural Limestone (CaCO3) @ 2.5 tonnes/hectare or Dolomite 3-4 weeks prior to sowing to raise pH and supply Calcium/Magnesium."
        })
    elif ph > 8.0:
        soil_amendments.append({
            "issue": f"Soil is moderately alkaline/sodic (pH {ph})",
            "remedy": "Incorporate Agricultural Gypsum (CaSO4·2H2O) @ 1.5–2.0 tonnes/hectare with deep ploughing and leaching, along with green manuring (Dhaincha/Sesbania)."
        })
    else:
        soil_amendments.append({
            "issue": f"Optimal Soil pH ({ph})",
            "remedy": "Soil reaction is well-buffered. Maintain organic humus by incorporating Farm Yard Manure (FYM) @ 10 tonnes/hectare."
        })

    if soil.get("organic_carbon_pct", 0.5) < 0.5:
        soil_amendments.append({
            "issue": "Low Soil Organic Carbon (<0.5%)",
            "remedy": "Broadcast well-decomposed compost or vermicompost @ 5 tonnes/hectare; practice stubble retention rather than burning."
        })

    # 2. Precision Fertilizer Schedule (Soil Test Crop Response - STCR)
    n_status = nutrients.get("n_status", "Medium")
    p_status = nutrients.get("p_status", "Medium")
    k_status = nutrients.get("k_status", "Medium")

    n_adj = "+25% (Soil N is Low)" if n_status == "Low" else ("-20% (Soil N is High)" if n_status == "High" else "100% Recommended Dose")
    p_adj = "+25% (Soil P is Low)" if p_status == "Low" else ("-20% (Soil P is High)" if p_status == "High" else "100% Recommended Dose")
    k_adj = "+25% (Soil K is Low)" if k_status == "Low" else ("-20% (Soil K is High)" if k_status == "High" else "100% Recommended Dose")

    fertilizer_schedule = [
        {
            "stage": "Basal Application (At Sowing)",
            "details": f"Apply 100% of Phosphorus, 50% of Potassium, and 25-33% of Nitrogen. P recommendation: {p_adj}, K: {k_adj}."
        },
        {
            "stage": "First Top Dressing (Vegetative / Knee-High / Active Tillering)",
            "details": f"Top dress 33% Nitrogen along with Micronutrient Zinc Sulfate (ZnSO4 @ 25 kg/ha) if deficiency observed. N adjustment: {n_adj}."
        },
        {
            "stage": "Second Top Dressing (Panicle Initiation / Tasseling / Flowering)",
            "details": "Top dress remaining 33% Nitrogen and 50% Potassium to enhance grain filling and test weight."
        }
    ]

    # 3. Agronomic Best Practices
    agronomy_tips = [
        f"Recommended Sowing Window: {', '.join(crop['seasons'])} when soil moisture is at field capacity.",
        f"Soil Preparation: Current slope is {slope}%. {'Practice contour ploughing and bunding across the slope.' if slope > 2.5 else 'Laser land leveling is recommended for uniform irrigation.'}",
        "Seed Treatment: Treat seed with Trichoderma viride @ 4 g/kg + Rhizobium/Azotobacter @ 10 g/kg seed to prevent seed-borne pathogens and promote atmospheric nitrogen fixation.",
        f"Irrigation Planning: Local annual rainfall is {annual_rf} mm. Supplement with micro-irrigation at critical flowering and grain-filling stages."
    ]

    return {
        "crop_name": crop["name"],
        "scientific_name": crop["scientific_name"],
        "field_snapshot": {
            "soil_ph": ph,
            "soil_texture": texture,
            "mean_temperature_c": avg_temp,
            "terrain_slope_pct": slope
        },
        "soil_amendments": soil_amendments,
        "fertilizer_schedule": fertilizer_schedule,
        "agronomy_guidelines": agronomy_tips,
        "crop_doctor_summary": (
            f"Doctor's Verdict: {crop['name']} is well suited for your 1 km² area. "
            f"The local {texture} soil and {avg_temp}°C climate will provide strong vegetative vigor. "
            f"Pay close attention to {crop['challenges'][0]}."
        )
    }

def answer_crop_doctor_question(
    crop_name: str,
    question: str,
    field_data: Dict[str, Any],
    lang: str = "en"
) -> Dict[str, Any]:
    """
    Answers farmer questions contextually with multi-language support.
    Returns both the response text and detected language metadata for Text-to-Speech audio readout.
    """
    q = question.lower()
    ph = field_data.get("ph", 7.0)
    texture = field_data.get("texture", "Loam")
    temp = field_data.get("temperature", 27.0)
    
    # Auto-detect language if Devanagari or other Indic scripts are present
    if any('\u0900' <= char <= '\u097F' for char in question):
        if lang not in ["hi", "mr"]:
            # Distinguish Marathi vs Hindi keywords
            lang = "mr" if any(w in q for w in ["पाणी", "खत", "पिक", "कसे", "काय", "माती", "लागवड", "फवारणी"]) else "hi"
    elif any('\u0C00' <= char <= '\u0C7F' for char in question):
        lang = "te"
    elif any('\u0B80' <= char <= '\u0BFF' for char in question):
        lang = "ta"
    elif any('\u0C80' <= char <= '\u0CFF' for char in question):
        lang = "kn"
    elif any('\u0A80' <= char <= '\u0AFF' for char in question):
        lang = "gu"

    # Category matching
    is_fert = any(w in q for w in ["fertilizer", "urea", "npk", "खाद", "खत", "उर्वरक", "यूरिया", "ఎరువులు", "உரங்கள்", "ಗೊಬ್ಬರ", "ખાતર"])
    is_water = any(w in q for w in ["water", "irrigation", "rain", "पानी", "पाणी", "सिंचाई", "ओलिता", "నీరు", "பாசனம்", "ನೀರು", "પાણી"])
    is_pest = any(w in q for w in ["pest", "disease", "spray", "insect", "कीड़ा", "कीटक", "रोग", "फवारणी", "छिड़काव", "తెగులు", "பூச்சி", "ಕೀಟ", "રોગ"])
    is_sow = any(w in q for w in ["sow", "plant", "seed", "बुवाई", "पेरणी", "लागवड", "बीज", "విత్తనం", "விதை", "ಬೀಜ", "વાવણી"])

    # --- HINDI RESPONSES ---
    if lang == "hi":
        if is_fert:
            ans = f"{crop_name} के लिए आपकी {texture} मिट्टी में NPK (120:60:40 kg/ha) की संतुलित मात्रा डालें। बुवाई के समय पूरा फास्फोरस (DAP/SSP) और 50% पोटाश डालें। यूरिया को 3 भागों में बांटकर दें (बुवाई, 30 दिन बाद और फूल आने पर)। मिट्टी का pH {ph} होने से तेज धूप में यूरिया न छिड़कें।"
        elif is_water:
            ans = f"{crop_name} को वर्तमान {temp}°C तापमान में हर 6-8 दिन में सिंचाई की आवश्यकता होती है। फूल और दाना बनते समय पानी की कमी न होने दें। {texture} मिट्टी में 24 घंटे से ज्यादा पानी जमा न रहने दें ताकि जड़ें सड़ने से बच सकें।"
        elif is_pest:
            ans = f"{crop_name} में कीट व फफूंद नियंत्रण के लिए हफ्ते में एक बार निरीक्षण करें। जैविक उपाय हेतु 5% नीम तेल (1500 ppm @ 5 ml/लीटर) का छिड़काव करें। गंभीर प्रकोप होने पर अनुशंसित फफूंदनाशक का लेबल देखकर ही उपयोग करें।"
        elif is_sow:
            ans = f"प्रमाणित बीजों का ही चयन करें। बुवाई से पूर्व ट्राइकोडर्मा (5 ग्राम/किग्रा) से बीजोपचार अवश्य करें। बीज को 3 से 5 सेमी गहराई पर नमी वाली मिट्टी में बोएं ताकि 90% से अधिक अंकुरण मिल सके।"
        else:
            ans = f"आपके 1 km² क्षेत्र ({texture} मिट्टी, {temp}°C तापमान) में {crop_name} की खेती के लिए अनुशंसित खाद व समय पर सिंचाई का पालन करें ताकि अधिकतम पैदावार मिल सके।"

    # --- MARATHI RESPONSES ---
    elif lang == "mr":
        if is_fert:
            ans = f"{crop_name} पिकासाठी तुमच्या {texture} मातीमध्ये रासायनिक खतांचा संतुलित वापर (NPK 120:60:40 किलो/हेक्टर) करा. पेरणीच्या वेळी संपूर्ण फॉस्फरस आणि निम्मे पोटॅश द्या. युरियाचे तीन समान हप्ते करा (पेरणीवेळी, 30 दिवसांनी आणि फुलधारणेच्या वेळी). मातीचा pH {ph} असल्याने उन्हात युरिया टाकू नका."
        elif is_water:
            ans = f"{temp}°C तापमानात {crop_name} पिकाला साधारणतः 7 ते 9 दिवसांच्या अंतराने पाण्याची गरज असते. फुलधारणा आणि दाणे भरण्याच्या काळात पाणी तोडू नका. {texture} जमिनीत पाणी साचून राहणार नाही याची काळजी घ्या."
        elif is_pest:
            ans = f"{crop_name} वरील किडींच्या नियंत्रणासाठी दर आठवड्याला पाहणी करा. सेंद्रिय नियंत्रणासाठी निंबोळी अर्क 5% किंवा निम तेल (1500 ppm @ 5 मिली/लिटर) फवारा. जास्त प्रादुर्भाव असल्यास योग्य कीटकनाशकाची फवारणी तज्ज्ञांच्या सल्ल्याने करा."
        elif is_sow:
            ans = f"पेरणीपूर्वी बियाणास ट्रायकोडर्मा (5 ग्रॅम प्रति किलो) चोळावे. पेरणी योग्य ओलावा असताना 3 ते 5 सेमी खोलीवर करावी आणि योग्य अंतर राखावे."
        else:
            ans = f"तुमच्या 1 km² शेतातील {texture} जमीन आणि {temp}°C हवामानामध्ये {crop_name} पिकासाठी खत व्यवस्थापन आणि पाणी नियोजन वेळेवर केल्यास चांगले उत्पादन मिळेल."

    # --- TELUGU RESPONSES ---
    elif lang == "te":
        if is_fert:
            ans = f"{crop_name} పంటకు మీ {texture} నేలలో సమతుల్య NPK ఎరువులు వాడండి. భాస్వరం మరియు పొటాష్ విత్తే సమయంలో, యూరియాను మూడు దఫాలుగా వేయండి. నేల pH {ph} ఉన్నందున ఎండలో యూరియా చల్లవద్దు."
        elif is_water:
            ans = f"{temp}°C ఉష్ణోగ్రత వద్ద {crop_name} కు 7-8 రోజులకు ఒకసారి నీరు అందించాలి. పూత మరియు గింజ కట్టే దశలలో నీటి ఎద్దడి రాకుండా చూసుకోండి."
        elif is_pest:
            ans = f"{crop_name} లో తెగుళ్ళ నివారణకు వేప నూనె (5 ml/లీటరు) పిచికారీ చేయండి. తీవ్రత ఎక్కువగా ఉంటే సిఫార్సు చేసిన పురుగుమందు వాడండి."
        else:
            ans = f"మీ 1 km² పొలంలో {crop_name} మంచి దిగుబడి కోసం సకాలంలో నీటి యాజమాన్యం మరియు సిఫార్సు చేసిన ఎరువులు వేయండి."

    # --- TAMIL RESPONSES ---
    elif lang == "ta":
        ans = f"{crop_name} பயிருக்கு உங்கள் {texture} மண்ணில் ({temp}°C வெப்பநிலை) பரிந்துரைக்கப்பட்ட NPK உரங்களை வழங்கி, பூக்கும் தருணத்தில் சீரான பாசனம் கொடுங்கள். இயற்கை முறையில் வேப்ப எண்ணெய் (5 மி.லி/லிட்டர்) தெளிக்கவும்."

    # --- KANNADA RESPONSES ---
    elif lang == "kn":
        ans = f"{crop_name} ಬೆಳೆಗೆ ನಿಮ್ಮ {texture} ಮಣ್ಣಿನಲ್ಲಿ ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ (NPK) ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ನೀರಾವರಿ ಒದಗಿಸಿ. ಕೀಟ ಬಾಧೆಗೆ ಬೇವಿನ ಎಣ್ಣೆ (5 ml/ಲೀಟರ್) ಸಿಂಪಡಿಸಿ."

    # --- GUJARATI RESPONSES ---
    elif lang == "gu":
        ans = f"{crop_name} પાક માટે તમારી {texture} જમીનમાં સંતુલિત ખાતર (NPK) વાપરો અને {temp}°C તાપમાન મુજબ દર 7-8 દિવસે પિયત આપો. જીવાત નિયંત્રણ માટે લીંબોળીનું તેલ છાંટો."

    # --- BENGALI RESPONSES ---
    elif lang == "bn":
        ans = f"{crop_name} ফসলের জন্য আপনার {texture} মাটিতে সুষম NPK সার প্রয়োগ করুন এবং {temp}°C তাপমাত্রায় প্রতি ৭-৮ দিন অন্তর সেচ দিন। পোকামাকড় নিয়ন্ত্রণে নিম তেল (৫ মিলি/লিটার) স্প্রে করুন।"

    # --- MALAYALAM RESPONSES ---
    elif lang == "ml":
        ans = f"{crop_name} വിളയ്ക്കായി നിങ്ങളുടെ {texture} മണ്ണിൽ സമതുലിതമായ NPK വളപ്രയോഗം നടത്തുക. {temp}°C താപനിലയിൽ 7-8 ദിവസത്തിലൊരിക്കൽ നനയ്ക്കുക. കീടനിയന്ത്രണത്തിനായി വേപ്പെണ്ണ (5 മില്ലി/ലിറ്റർ) തളിക്കുക."

    # --- PUNJABI RESPONSES ---
    elif lang == "pa":
        ans = f"{crop_name} ਫ਼ਸਲ ਲਈ ਆਪਣੀ {texture} ਮਿੱਟੀ ਵਿੱਚ ਸੰਤੁਲਿਤ NPK ਖਾਦ ਪਾਓ ਅਤੇ {temp}°C ਤਾਪਮਾਨ ਵਿੱਚ ਹਰ 7-8 ਦਿਨਾਂ ਬਾਅਦ ਸਿੰਚਾਈ ਕਰੋ। ਕੀੜਿਆਂ ਦੀ ਰੋਕਥਾਮ ਲਈ ਨਿੰਮ ਦਾ ਤੇਲ (5 ਮਿਲੀ/ਲੀਟਰ) ਛਿੜਕੋ।"

    # --- ODIA RESPONSES ---
    elif lang == "or":
        ans = f"{crop_name} ଫସଲ ପାଇଁ ଆପଣଙ୍କ {texture} ମାଟିରେ ସନ୍ତୁଳିତ NPK ସାର ଦିଅନ୍ତୁ ଏବଂ {temp}°C ତାପମାତ୍ରାରେ ପ୍ରତି ୭-୮ ଦିନରେ ଜଳସେଚନ କରନ୍ତୁ। କୀଟ ନିୟନ୍ତ୍ରଣ ପାଇଁ ନିମ୍ବ ତେଲ (୫ ମିଲି/ଲିଟର) ସ୍ପ୍ରେ କରନ୍ତୁ।"

    # --- ENGLISH (DEFAULT) RESPONSES ---
    else:
        lang = "en"
        if is_fert:
            ans = (
                f"For {crop_name} on your {texture} soil, a balanced 120:60:40 N:P:K kg/ha fertilizer ratio is recommended. "
                f"Apply all Phosphorus (DAP or SSP) as basal at sowing. Split Nitrogen (Urea) into 3 equal doses: at sowing, "
                f"at 30 days (vegetative/tillering), and at flowering. With soil pH at {ph}, avoid surface broadcasting urea in hot sun."
            )
        elif is_water:
            ans = (
                f"At current ambient temperatures around {temp}°C, {crop_name} requires irrigation every 6 to 9 days. "
                f"Critical moisture-sensitive stages are flowering and grain development. "
                f"Never allow prolonged waterlogging in {texture} soil as roots require oxygenation."
            )
        elif is_pest:
            ans = (
                f"For pest and disease control in {crop_name}, conduct weekly field scouting. Look under lower leaves for "
                f"early symptoms. For organic control, spray Neem Seed Kernel Extract (5% NSKE) or Azadirachtin 1500 ppm @ 5ml/L. "
                f"If chemical control is necessary, use systemic fungicides according to label dosages."
            )
        elif is_sow:
            ans = (
                f"Ensure seeds are certified germinable (>85%). Treat seeds with Trichoderma harzianum @ 5g/kg seed. "
                f"Sow at a uniform depth of 3 to 5 cm into moist soil with recommended row-to-row spacing."
            )
        else:
            ans = (
                f"Regarding '{question}': In your 1 km² area with {texture} soil and {temp}°C temperature, {crop_name} "
                f"requires balanced nutrient stewardship, proactive pest monitoring, and proper soil aeration to maximize yield potential."
            )

    return {
        "crop_name": crop_name,
        "question": question,
        "answer": ans,
        "language": lang,
        "speech_lang_code": {
            "hi": "hi-IN",
            "mr": "mr-IN",
            "te": "te-IN",
            "ta": "ta-IN",
            "kn": "kn-IN",
            "gu": "gu-IN",
            "bn": "bn-IN",
            "ml": "ml-IN",
            "pa": "pa-IN",
            "or": "or-IN",
            "en": "en-IN"
        }.get(lang, "en-IN")
    }
