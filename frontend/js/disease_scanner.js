/**
 * AgroNexus - Client-Side & API Crop Leaf Disease Screening Engine (Software-Only)
 * Works seamlessly both on static hosts (GitHub Pages via HTML5 Canvas pixel/spectral
 * analysis) and via FastAPI POST /api/integration/disease/screen when backend is active.
 */
(function () {
  const MAX_UPLOAD_BYTES = 8 * 1024 * 1024;
  const MIN_DIMENSION_PX = 224;
  const ANALYSIS_MAX_SIDE_PX = 256;
  const MIN_BRIGHTNESS = 25.0;
  const MAX_BRIGHTNESS = 235.0;
  const MIN_BLUR_VARIANCE = 4.0;
  const MIN_FOLIAR_PCT = 2.5;
  const CONFIDENCE_ABSTAIN_THRESHOLD = 0.48;
  const MARGIN_ABSTAIN_THRESHOLD = 0.08;

  const CLIENT_DISEASE_CATALOG = {
    tomato: [
      {
        disease_id: "tomato_early_blight",
        name: "Early Blight (Alternaria solani)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Concentric dark brown rings ('target board' pattern) on older lower leaves, followed by leaf yellowing and defoliation.",
        favorable_conditions: "Warm temperatures (24-29°C) with alternating wet and dry periods.",
        organic_control: "Spray Bacillus subtilis @ 5 ml/L or Trichoderma @ 5 g/L mixed with bio-potassium soap.",
        chemical_control: "Chlorothalonil 75% WP @ 2 g/L or Azoxystrobin 23% SC @ 1 ml/L.",
        preventive_measures: "Mulch beds to prevent soil splashing; stake plants and prune lower sucker branches."
      },
      {
        disease_id: "tomato_late_blight",
        name: "Late Blight (Phytophthora infestans)",
        pathogen_type: "Oomycete / Water Mold",
        visual_signature: "fungal_blight_dark",
        symptoms: "Irregular water-soaked dark brown-black lesions on leaf margins and stems with pale white downy growth underneath.",
        favorable_conditions: "Cool nights (12-20°C), fog, heavy dew or continuous rain (RH >90%).",
        organic_control: "Preventive foliar spray of Copper Hydroxide 53.8% DF @ 2 g/L or potassium bicarbonate.",
        chemical_control: "Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g/L or Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L.",
        preventive_measures: "Ensure wide row aeration; avoid evening overhead irrigation; destroy infected plant debris."
      },
      {
        disease_id: "tomato_leaf_curl",
        name: "Tomato Leaf Curl & Chlorosis (ToLCV / Septoria Halo)",
        pathogen_type: "Viral (Vector: Whitefly)",
        visual_signature: "chlorosis_mosaic",
        symptoms: "Pronounced interveinal leaf yellowing, upward curling of leaf margins, stunted apical shoots.",
        favorable_conditions: "Warm dry spells (26-34°C) favoring whitefly vector populations.",
        organic_control: "Install yellow sticky traps @ 12/acre; spray Neem oil (Azadirachtin 1500 ppm @ 3 ml/L).",
        chemical_control: "Imidacloprid 17.8% SL @ 0.4 ml/L or Thiamethoxam 25% WG @ 0.3 g/L for vector control.",
        preventive_measures: "Use insect-proof net nurseries; rogue infected seedlings early; grow resistant hybrids (Arka Rakshak)."
      }
    ],
    potato: [
      {
        disease_id: "potato_late_blight",
        name: "Potato Late Blight (Phytophthora infestans)",
        pathogen_type: "Oomycete / Water Mold",
        visual_signature: "fungal_blight_dark",
        symptoms: "Dark olive-brown to black water-soaked patches rapidly expanding across leaflets with pale border.",
        favorable_conditions: "Cool, humid cloudy weather (12-21°C, RH >90%).",
        organic_control: "Preventive Copper Oxychloride 50% WP @ 2.5 g/L spray before canopy closure.",
        chemical_control: "Cymoxanil 8% + Mancozeb 64% WP @ 2.5 g/L or Dimethomorph + Mancozeb.",
        preventive_measures: "Plant certified disease-free seed tubers; earth up ridges well."
      },
      {
        disease_id: "potato_early_blight",
        name: "Potato Early Blight (Alternaria solani)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Dry angular tan-brown concentric rings bounded by leaf veins with surrounding chlorotic halo.",
        favorable_conditions: "Warm fluctuating moisture (22-30°C) on stressed canopies.",
        organic_control: "Trichoderma viride / Bacillus subtilis foliar spray @ 5 g/L.",
        chemical_control: "Mancozeb 75% WP @ 2 g/L or Azoxystrobin 23% SC @ 1 ml/L.",
        preventive_measures: "Balanced NPK fertilization; avoid nitrogen deficiency and moisture shock."
      }
    ],
    maize: [
      {
        disease_id: "maize_northern_leaf_blight",
        name: "Northern Corn Leaf Blight (Exserohilum turcicum)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Long, elliptical grayish-green or tan lesions on lower leaves progressing upwards, creating burnt appearance.",
        favorable_conditions: "Moderate temperatures (18-27°C) with persistent leaf wetness and high RH (>85%).",
        organic_control: "Foliar spray of Trichoderma harzianum @ 5 g/L and copper oxychloride @ 2.5 g/L.",
        chemical_control: "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L.",
        preventive_measures: "Crop rotation with non-host pulses; destroy infected stubbles."
      },
      {
        disease_id: "maize_common_rust",
        name: "Common Rust (Puccinia sorghi)",
        pathogen_type: "Fungal",
        visual_signature: "rust_pustule",
        symptoms: "Small, powdery golden-brown to cinnamon pustules on both upper and lower leaf surfaces.",
        favorable_conditions: "Cool nights (16-22°C), humid mornings with dew, overcast skies.",
        organic_control: "Spray wettable sulfur 80% WP @ 3 g/L.",
        chemical_control: "Propiconazole 25% EC @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L.",
        preventive_measures: "Balanced nitrogen nutrition; avoid excess urea."
      },
      {
        disease_id: "maize_fall_armyworm",
        name: "Fall Armyworm (Spodoptera frugiperda)",
        pathogen_type: "Pest / Insect Larva",
        visual_signature: "pest_foliar_damage",
        symptoms: "Ragged holes in leaves, sawdust-like frass inside whorls, damaged emerging tassels.",
        favorable_conditions: "Warm temperatures (24-30°C), dry spells followed by light showers.",
        organic_control: "Neem oil (Azadirachtin 1500 ppm @ 5 ml/L) or Bacillus thuringiensis (Bt @ 2 g/L) into whorls.",
        chemical_control: "Spinetoram 11.7% SC @ 0.5 ml/L or Chlorantraniliprole 18.5% SC @ 0.4 ml/L.",
        preventive_measures: "Pheromone traps @ 5/acre; intercrop legumes."
      }
    ],
    rice: [
      {
        disease_id: "rice_blast",
        name: "Rice Blast (Magnaporthe oryzae)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Spindle-shaped diamond lesions with grayish centers and brown margins on leaves; neck rot on panicles.",
        favorable_conditions: "High RH (>90%), nighttime dew, overcast weather, excess nitrogen.",
        organic_control: "Pseudomonas fluorescens seed treatment @ 10 g/kg; foliar spray @ 2.5 kg/ha.",
        chemical_control: "Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L.",
        preventive_measures: "Split nitrogen top dressings; avoid continuous deep standing water."
      },
      {
        disease_id: "rice_bacterial_leaf_blight",
        name: "Bacterial Leaf Blight (Xanthomonas oryzae)",
        pathogen_type: "Bacterial",
        visual_signature: "chlorosis_mosaic",
        symptoms: "Wavy yellowish-white water-soaked lesions along leaf margins from tips downward; straw-colored curling.",
        favorable_conditions: "Wind-driven monsoon rains, warm days (25-34°C), flooded fields.",
        organic_control: "Fresh cow dung slurry supernatant (20%) or Neem oil (3%).",
        chemical_control: "Streptocycline (6 g) + Copper Oxychloride 50% WP (250 g) in 200 L water/acre.",
        preventive_measures: "Maintain field drainage channels; avoid leaf clipping damage."
      }
    ],
    wheat: [
      {
        disease_id: "wheat_yellow_rust",
        name: "Yellow / Stripe Rust (Puccinia striiformis)",
        pathogen_type: "Fungal",
        visual_signature: "rust_pustule",
        symptoms: "Bright yellow-orange pustules arranged in linear stripes between leaf veins.",
        favorable_conditions: "Cool humid weather (10-18°C), fog and morning dew.",
        organic_control: "Bio-spray with Trichoderma viride @ 5 g/L.",
        chemical_control: "Propiconazole 25% EC @ 1 ml/L or Tebuconazole 25% WG @ 1 g/L.",
        preventive_measures: "Grow resistant varieties (HD-2967, DBW-187)."
      },
      {
        disease_id: "wheat_leaf_blight",
        name: "Spot Blotch / Leaf Blight (Bipolaris sorokiniana)",
        pathogen_type: "Fungal",
        visual_signature: "fungal_blight_dark",
        symptoms: "Dark brown oblong spots coalescing into irregular necrotic blighted areas across blades.",
        favorable_conditions: "Warm humid late-winter conditions (22-30°C).",
        organic_control: "Trichoderma harzianum seed bio-priming @ 5 g/kg.",
        chemical_control: "Azoxystrobin + Propiconazole spray @ 1 ml/L.",
        preventive_measures: "Timely sowing and balanced potash nutrition."
      }
    ],
    cotton: [
      {
        disease_id: "cotton_leaf_spot_blight",
        name: "Alternaria Leaf Spot / Bacterial Blight",
        pathogen_type: "Fungal / Bacterial",
        visual_signature: "fungal_blight_dark",
        symptoms: "Circular brown necrotic target spots or angular water-soaked lesions along veins.",
        favorable_conditions: "Warm monsoon spells (26-34°C) with persistent leaf wetness.",
        organic_control: "Pseudomonas fluorescens @ 10 g/L foliar spray.",
        chemical_control: "Copper Oxychloride 50% WP @ 2.5 g/L or Mancozeb @ 2 g/L.",
        preventive_measures: "Acid-delinted certified seed and balanced spacing."
      },
      {
        disease_id: "cotton_leaf_curl_chlorosis",
        name: "Cotton Leaf Curl & Mosaic (CLCuV / Aphid Stress)",
        pathogen_type: "Viral (Whitefly Vector)",
        visual_signature: "chlorosis_mosaic",
        symptoms: "Leaf yellowing, vein thickening, upward or downward cupping of young leaves.",
        favorable_conditions: "Hot dry weather favoring whitefly build-up.",
        organic_control: "Yellow sticky traps @ 10/acre and Neem oil @ 3 ml/L.",
        chemical_control: "Flonicamid 50% WG @ 0.3 g/L or Diafenthiuron 50% WP @ 1 g/L.",
        preventive_measures: "Remove weed hosts around field bunds."
      }
    ],
    onion: [
      {
        disease_id: "onion_purple_blotch",
        name: "Purple Blotch (Alternaria porri)",
        pathogen_type: "Fungal",
        visual_signature: "purple_blotch",
        symptoms: "Small water-soaked lesions turning purple-brown with concentric rings; leaves break at lesion site.",
        favorable_conditions: "Warm humid conditions (25-30°C, RH >80%).",
        organic_control: "Garlic bulb extract (5%) or NSKE 5% spray.",
        chemical_control: "Difenoconazole 25% EC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L.",
        preventive_measures: "Raise drainage beds; avoid evening sprinkler irrigation."
      },
      {
        disease_id: "onion_stemphylium_blight",
        name: "Stemphylium Blight & Tip Burn",
        pathogen_type: "Fungal",
        visual_signature: "chlorosis_mosaic",
        symptoms: "Yellow-to-tan elongated streaks starting at leaf tips turning dark olive-brown.",
        favorable_conditions: "Morning dew and moderate warmth (20-28°C).",
        organic_control: "Pseudomonas fluorescens @ 5 g/L.",
        chemical_control: "Tebuconazole 25.9% EC @ 1 ml/L.",
        preventive_measures: "Balanced drip fertigation."
      }
    ],
    soybean: [
      {
        disease_id: "soybean_yellow_mosaic",
        name: "Yellow Mosaic Virus (MYMV)",
        pathogen_type: "Viral (Whitefly Vector)",
        visual_signature: "chlorosis_mosaic",
        symptoms: "Bright yellow and green mosaic patches on leaves, stunted growth, reduced pod fill.",
        favorable_conditions: "Hot dry weather (28-36°C) boosting whiteflies.",
        organic_control: "Yellow sticky traps @ 15/acre; Neem oil @ 5 ml/L.",
        chemical_control: "Thiamethoxam 25% WG @ 0.3 g/L or Acetamiprid 20% SP @ 0.4 g/L.",
        preventive_measures: "Rogue infected plants early; cultivate JS-20-29."
      },
      {
        disease_id: "soybean_rust",
        name: "Soybean Asian Rust (Phakopsora pachyrhizi)",
        pathogen_type: "Fungal",
        visual_signature: "rust_pustule",
        symptoms: "Small tan to reddish-brown rust pustules mainly on undersides with premature yellowing.",
        favorable_conditions: "Humid overcast rainy weeks (18-28°C).",
        organic_control: "Wettable sulfur 80% WP @ 3 g/L early spray.",
        chemical_control: "Hexaconazole 5% EC @ 1 ml/L or Azoxystrobin + Tebuconazole.",
        preventive_measures: "Early sowing and field scouting at flowering."
      }
    ],
    groundnut: [
      {
        disease_id: "groundnut_tikka",
        name: "Tikka Leaf Spot (Cercospora personata)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Circular dark necrotic spots surrounded by bright yellow halo on older leaves.",
        favorable_conditions: "Prolonged high humidity (RH >85%) and 24-28°C.",
        organic_control: "Pseudomonas fluorescens @ 10 g/L or Neem oil 1500 ppm @ 3 ml/L.",
        chemical_control: "Mancozeb 75% WP @ 2 g/L or Carbendazim 50% WP @ 1 g/L.",
        preventive_measures: "Trichoderma seed treatment @ 10 g/kg seed."
      },
      {
        disease_id: "groundnut_rust",
        name: "Groundnut Rust (Puccinia arachidis)",
        pathogen_type: "Fungal",
        visual_signature: "rust_pustule",
        symptoms: "Orange-red pustules erupting on lower leaf surfaces causing necrosis and pod shrink.",
        favorable_conditions: "Warm rainy periods with morning dew.",
        organic_control: "Trichoderma viride / Sulfur 80% WP spray.",
        chemical_control: "Chlorothalonil 75% WP @ 2 g/L or Tebuconazole 25% EC @ 1 ml/L.",
        preventive_measures: "Intercrop pearl millet; clear volunteer groundnut plants."
      }
    ],
    ragi: [
      {
        disease_id: "ragi_blast",
        name: "Ragi Blast (Pyricularia grisea)",
        pathogen_type: "Fungal",
        visual_signature: "gray_tan_spot",
        symptoms: "Spindle-shaped grayish-center lesions on leaves; neck infection causes chaffy earheads.",
        favorable_conditions: "High humidity (>90%) with cloudy drizzles.",
        organic_control: "Pseudomonas fluorescens seed treatment @ 10 g/kg; foliar spray @ 2 g/L.",
        chemical_control: "Tricyclazole 75% WP @ 0.6 g/L or Kitazin 48% EC @ 2 ml/L.",
        preventive_measures: "Grow blast-tolerant GPU-28 / ML-365 varieties."
      }
    ],
    jowar: [
      {
        disease_id: "jowar_grain_mold_blight",
        name: "Sorghum Leaf Blight / Shoot Fly Damage",
        pathogen_type: "Fungal / Pest Complex",
        visual_signature: "pest_foliar_damage",
        symptoms: "Reddish-tan elongated foliar blotches or central deadheart / chewed whorls in seedlings.",
        favorable_conditions: "Warm humid monsoon sowing windows (25-32°C).",
        organic_control: "NSKE 5% spray @ 5 ml/L or Trichoderma foliar treatment.",
        chemical_control: "Mancozeb 75% WP @ 2 g/L for blight; Thiamethoxam seed dressing.",
        preventive_measures: "Sow early on monsoon onset; rogue deadhearts."
      }
    ],
    sugarcane: [
      {
        disease_id: "sugarcane_red_rot",
        name: "Red Rot (Colletotrichum falcatum)",
        pathogen_type: "Fungal",
        visual_signature: "rust_pustule",
        symptoms: "Yellowing/drying of 3rd-4th leaves; reddish lesions along midrib and internal stalk reddening.",
        favorable_conditions: "Waterlogged fields, infected seed setts.",
        organic_control: "Dip setts in Trichoderma viride slurry @ 5 g/L before planting.",
        chemical_control: "Sett treatment with Carbendazim 50% WP @ 1 g/L.",
        preventive_measures: "Use disease-free nursery setts; avoid infected ratoon fields."
      }
    ],
    mustard: [
      {
        disease_id: "mustard_alternaria_blight",
        name: "Alternaria Blight (Alternaria brassicae)",
        pathogen_type: "Fungal",
        visual_signature: "fungal_blight_dark",
        symptoms: "Concentric dark brown target spots on leaves and siliquae with surrounding yellow halo.",
        favorable_conditions: "Cool humid winter mornings (14-24°C) with fog.",
        organic_control: "Trichoderma + Pseudomonas spray during early pod set.",
        chemical_control: "Mancozeb 75% WP @ 2 g/L or Iprodione + Carbendazim.",
        preventive_measures: "Timely mid-October sowing and balanced sulfur nutrition."
      }
    ]
  };

  const CROP_OPTIONS = [
    { id: "tomato", label: "Tomato" },
    { id: "potato", label: "Potato" },
    { id: "maize", label: "Maize" },
    { id: "rice", label: "Rice (Paddy)" },
    { id: "wheat", label: "Wheat" },
    { id: "cotton", label: "Cotton" },
    { id: "onion", label: "Onion" },
    { id: "soybean", label: "Soybean" },
    { id: "groundnut", label: "Groundnut" },
    { id: "ragi", label: "Finger Millet (Ragi)" },
    { id: "jowar", label: "Sorghum (Jowar)" },
    { id: "sugarcane", label: "Sugarcane" },
    { id: "mustard", label: "Mustard" },
    { id: "pulses_gram", label: "Pulses (Chickpea / Tur / Moong)" }
  ];

  function normalizeCropId(cropId) {
    const base = (cropId || "tomato").toString().trim().toLowerCase() || "tomato";
    if (base.includes("pulse")) return "soybean";
    if (base.includes("paddy")) return "rice";
    return base;
  }

  function inferVisualSignature(entry) {
    if (entry && entry.visual_signature) return entry.visual_signature;
    const text = `${entry?.disease_id || ""} ${entry?.name || ""} ${entry?.symptoms || ""}`.toLowerCase();
    if (/rust|pustule|cinnamon/.test(text)) return "rust_pustule";
    if (/yellow mosaic|yellowing|mosaic|curl|chlorosis/.test(text)) return "chlorosis_mosaic";
    if (/purple|blotch/.test(text)) return "purple_blotch";
    if (/armyworm|shoot fly|bollworm|holes|deadheart/.test(text)) return "pest_foliar_damage";
    if (/blast|diamond|grayish|elliptical|tan lesion|tikka|target board/.test(text)) return "gray_tan_spot";
    return "fungal_blight_dark";
  }

  function getCatalogForCrop(cropId) {
    const key = normalizeCropId(cropId);
    let list = CLIENT_DISEASE_CATALOG[key];
    // Merge backend-loaded crop diseases if currently matching crop
    const modDiseases = window.modulesManager?.modulesData?.crop_id?.toLowerCase() === (cropId || "").toLowerCase()
      ? window.modulesManager?.modulesData?.disease_detection_module?.common_diseases_and_pests
      : null;
    if (Array.isArray(modDiseases) && modDiseases.length > 0 && !list) {
      list = modDiseases;
    }
    if (!list || list.length === 0) {
      list = CLIENT_DISEASE_CATALOG.maize;
    }
    return list.map((d, idx) => ({
      ...d,
      disease_id: d.disease_id || `${key}_cond_${idx}`,
      visual_signature: inferVisualSignature(d)
    }));
  }

  function escapeHtml(str) {
    return String(str ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function dataUrlToBlob(dataUrl) {
    const parts = dataUrl.split(",");
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const bin = atob(parts[1] || "");
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: mime });
  }

  function loadImageElement(dataUrl) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Could not decode image file in browser."));
      img.src = dataUrl;
    });
  }

  function extractCanvasMetrics(img) {
    const width = img.naturalWidth || img.width || 0;
    const height = img.naturalHeight || img.height || 0;
    const maxSide = Math.max(width, height, 1);
    const scale = Math.min(1, ANALYSIS_MAX_SIDE_PX / maxSide);
    const w = Math.max(1, Math.round(width * scale));
    const h = Math.max(1, Math.round(height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);

    const n = w * h;
    const gray = new Float32Array(n);
    const lesionFlags = new Uint8Array(n);

    let sumGray = 0;
    let greenCnt = 0;
    let chlorosisCnt = 0;
    let rustCnt = 0;
    let darkCnt = 0;
    let grayTanCnt = 0;

    for (let i = 0, p = 0; i < n; i++, p += 4) {
      const r = data[p];
      const g = data[p + 1];
      const b = data[p + 2];
      const y = 0.299 * r + 0.587 * g + 0.114 * b;
      gray[i] = y;
      sumGray += y;

      const exg = 2.0 * g - r - b;
      if (exg > 22.0 && g > r * 1.07 && g > b * 1.12 && y > 22.0) {
        greenCnt++;
      } else if (
        r > 110.0 &&
        g > 110.0 &&
        g >= r * 0.86 &&
        (g - b) > 45.0 &&
        b < g * 0.72 &&
        Math.abs(r - g) < 50.0
      ) {
        chlorosisCnt++;
        lesionFlags[i] = 1;
      } else if (r > 105.0 && r > g * 1.24 && g > b * 1.22 && y < 205.0) {
        rustCnt++;
        lesionFlags[i] = 1;
      } else if (y < 105.0 && y > 14.0 && r >= b * 1.03) {
        darkCnt++;
        lesionFlags[i] = 1;
      } else if (
        y >= 105.0 &&
        y <= 192.0 &&
        Math.abs(r - g) < 28.0 &&
        Math.abs(g - b) < 32.0 &&
        r >= b * 0.96
      ) {
        grayTanCnt++;
        lesionFlags[i] = 1;
      }
    }

    // 4-neighbor Laplacian variance for sharpness
    let lapSum = 0;
    let lapSqSum = 0;
    let lapCnt = 0;
    if (w >= 3 && h >= 3) {
      for (let row = 1; row < h - 1; row++) {
        const idxBase = row * w;
        for (let col = 1; col < w - 1; col++) {
          const idx = idxBase + col;
          const lap =
            -4.0 * gray[idx] +
            gray[idx - w] +
            gray[idx + w] +
            gray[idx - 1] +
            gray[idx + 1];
          lapSum += lap;
          lapSqSum += lap * lap;
          lapCnt++;
        }
      }
    }
    const lapMean = lapCnt ? lapSum / lapCnt : 0;
    const blurVariance = lapCnt ? Math.max(0, lapSqSum / lapCnt - lapMean * lapMean) : 0;

    // Spatial lesion boundary density
    let hTrans = 0;
    let vTrans = 0;
    const hTotal = Math.max(1, h * Math.max(0, w - 1));
    const vTotal = Math.max(1, Math.max(0, h - 1) * w);
    for (let row = 0; row < h; row++) {
      const base = row * w;
      for (let col = 0; col < w - 1; col++) {
        if (lesionFlags[base + col] !== lesionFlags[base + col + 1]) hTrans++;
      }
    }
    for (let row = 0; row < h - 1; row++) {
      const base = row * w;
      for (let col = 0; col < w; col++) {
        if (lesionFlags[base + col] !== lesionFlags[base + w + col]) vTrans++;
      }
    }
    const spotContrast = hTrans / hTotal + vTrans / vTotal;

    const totalPx = Math.max(1, n);
    const greenPct = (100.0 * greenCnt) / totalPx;
    const chlorosisPct = (100.0 * chlorosisCnt) / totalPx;
    const rustPct = (100.0 * rustCnt) / totalPx;
    const darkPct = (100.0 * darkCnt) / totalPx;
    const grayTanPct = (100.0 * grayTanCnt) / totalPx;
    const foliarPct = greenPct + chlorosisPct;

    const plantArea = greenPct + chlorosisPct + rustPct + darkPct + grayTanPct;
    const denom = Math.max(plantArea, 1.0);
    const healthyRatio = greenPct / denom;
    const chlorosisRatio = chlorosisPct / denom;
    const rustRatio = rustPct / denom;
    const darkRatio = darkPct / denom;
    const grayTanRatio = grayTanPct / denom;
    const lesionRatio = Math.min(1.0, chlorosisRatio + rustRatio + darkRatio + grayTanRatio);

    return {
      width,
      height,
      mean_brightness: +(sumGray / totalPx).toFixed(2),
      blur_variance: +blurVariance.toFixed(2),
      foliar_coverage_pct: +foliarPct.toFixed(2),
      green_pct: +greenPct.toFixed(2),
      chlorosis_pct: +chlorosisPct.toFixed(2),
      rust_pct: +rustPct.toFixed(2),
      dark_necrosis_pct: +darkPct.toFixed(2),
      gray_tan_pct: +grayTanPct.toFixed(2),
      lesion_burden_pct: +(lesionRatio * 100.0).toFixed(2),
      healthyRatio,
      chlorosisRatio,
      rustRatio,
      darkRatio,
      grayTanRatio,
      lesionRatio,
      spot_contrast: +spotContrast.toFixed(4)
    };
  }

  function scoreSignature(sig, m) {
    const { healthyRatio: h, chlorosisRatio: ch, rustRatio: ru, darkRatio: dk, grayTanRatio: gt, lesionRatio: les, spot_contrast: sc } = m;
    if (sig === "healthy") {
      const excessGreen = Math.max(0.0, h - 0.85) / 0.15;
      return 3.2 * excessGreen - 12.0 * les - 10.0 * Math.min(sc, 0.25);
    }
    const emptyPenalty = (2.0 * Math.max(0.0, 0.07 - les)) / 0.07;
    if (sig === "rust_pustule") {
      return 14.0 * ru + 3.0 * ch + 1.5 * dk + 5.0 * Math.min(sc, 0.2) - emptyPenalty;
    }
    if (sig === "chlorosis_mosaic") {
      return 12.0 * ch + 2.0 * gt + 3.5 * Math.min(sc, 0.2) - emptyPenalty;
    }
    if (sig === "gray_tan_spot") {
      return 12.0 * gt + 4.0 * dk + 2.5 * ch + 6.0 * Math.min(sc, 0.2) - emptyPenalty;
    }
    if (sig === "purple_blotch") {
      return 11.0 * dk + 4.0 * ru + 3.0 * ch + 5.0 * Math.min(sc, 0.2) - emptyPenalty;
    }
    if (sig === "pest_foliar_damage") {
      return 9.0 * Math.min(sc, 0.25) + 7.5 * gt + 6.5 * dk + 2.5 * ch - emptyPenalty;
    }
    return 12.0 * dk + 4.0 * gt + 3.0 * ch + 5.0 * Math.min(sc, 0.2) - emptyPenalty;
  }

  function softmax(scores, temp = 0.85) {
    const scaled = scores.map((s) => s / Math.max(temp, 1e-6));
    const maxS = Math.max(...scaled);
    const exps = scaled.map((s) => Math.exp(s - maxS));
    const total = exps.reduce((a, b) => a + b, 0) || 1;
    return exps.map((e) => e / total);
  }

  function buildRejectedResult(status, reason, rawCropId, metrics, filename, sourceMode) {
    const normCrop = normalizeCropId(rawCropId);
    const displayCrop = (rawCropId || "tomato").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      status,
      abstained: true,
      abstention_reason: reason,
      crop_id: normCrop,
      crop_name: displayCrop,
      predicted_condition: "Screening Abstained",
      predicted_disease_id: null,
      is_healthy: false,
      confidence: 0.0,
      confidence_pct: 0.0,
      margin: 0.0,
      image_quality: {
        ...metrics,
        passed: false,
        rejection_reason: reason
      },
      class_probabilities: [],
      recommended_actions: null,
      crop_disease_catalog: getCatalogForCrop(rawCropId),
      model_provenance: {
        method: "Client-Side Spectral-Texture & Crop-Scoped Foliar Screening Heuristic (v1.0)",
        model_type: "Browser HTML5 Canvas HSV/ExG + Laplacian sharpness + crop differential",
        source_mode: sourceMode,
        limitations:
          "Visual screening provides probabilistic optical screening rather than clinical lab microscopy or trained PlantVillage CNN confirmation. Verify with your local KVK or agronomist.",
        filename: filename || "leaf_photo.jpg"
      }
    };
  }

  async function analyzeCanvasLocally(dataUrl, cropId, filename) {
    const img = await loadImageElement(dataUrl);
    const m = extractCanvasMetrics(img);
    const rawCrop = (cropId || "tomato").toString().trim().toLowerCase() || "tomato";
    const displayCrop = rawCrop.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    const sourceMode = "In-Browser Visual Screening (Client-Side Canvas)";

    if (Math.min(m.width, m.height) < MIN_DIMENSION_PX) {
      return buildRejectedResult(
        "QUALITY_REJECTED",
        `Image resolution ${m.width}×${m.height} px is below minimum ${MIN_DIMENSION_PX}×${MIN_DIMENSION_PX} px. Capture a closer leaf photo.`,
        rawCrop,
        m,
        filename,
        sourceMode
      );
    }
    if (m.mean_brightness < MIN_BRIGHTNESS) {
      return buildRejectedResult(
        "QUALITY_REJECTED",
        `Image is underexposed (brightness ${m.mean_brightness}/255 < ${MIN_BRIGHTNESS}). Retake in natural daylight.`,
        rawCrop,
        m,
        filename,
        sourceMode
      );
    }
    if (m.mean_brightness > MAX_BRIGHTNESS) {
      return buildRejectedResult(
        "QUALITY_REJECTED",
        `Image is overexposed (brightness ${m.mean_brightness}/255 > ${MAX_BRIGHTNESS}). Avoid harsh direct glare.`,
        rawCrop,
        m,
        filename,
        sourceMode
      );
    }
    if (m.blur_variance < MIN_BLUR_VARIANCE) {
      return buildRejectedResult(
        "QUALITY_REJECTED",
        `Image appears too blurry (Laplacian variance ${m.blur_variance} < ${MIN_BLUR_VARIANCE}). Hold camera steady and focus on leaf.`,
        rawCrop,
        m,
        filename,
        sourceMode
      );
    }
    if (m.foliar_coverage_pct < MIN_FOLIAR_PCT) {
      return buildRejectedResult(
        "ABSTAINED_NON_LEAF",
        `Abstained: insufficient plant foliage detected (${m.foliar_coverage_pct}% < ${MIN_FOLIAR_PCT}%). Frame a closeup of the crop leaf and retry.`,
        rawCrop,
        m,
        filename,
        sourceMode
      );
    }

    const catalog = getCatalogForCrop(rawCrop);
    const candidates = [
      {
        id: `${normalizeCropId(rawCrop)}_healthy`,
        name: `Healthy ${displayCrop} Foliage`,
        pathogen_type: "Healthy Canopy",
        visual_signature: "healthy",
        entry: null
      },
      ...catalog.map((d, idx) => ({
        id: d.disease_id || `${rawCrop}_disease_${idx}`,
        name: d.name,
        pathogen_type: d.pathogen_type || "Pathogen",
        visual_signature: inferVisualSignature(d),
        entry: d
      }))
    ];

    const scores = candidates.map((c) => scoreSignature(c.visual_signature, m));
    const probs = softmax(scores);
    const ranked = candidates
      .map((c, idx) => ({
        id: c.id,
        name: c.name,
        pathogen_type: c.pathogen_type,
        visual_signature: c.visual_signature,
        probability: +probs[idx].toFixed(4),
        probability_pct: +(probs[idx] * 100.0).toFixed(1),
        entry: c.entry
      }))
      .sort((a, b) => b.probability - a.probability);

    const top = ranked[0];
    const second = ranked[1]?.probability || 0;
    const margin = +(top.probability - second).toFixed(4);
    const abstained = top.probability < CONFIDENCE_ABSTAIN_THRESHOLD || margin < MARGIN_ABSTAIN_THRESHOLD;
    const status = abstained ? "ABSTAINED_UNCERTAIN" : "SCREENING_COMPLETE";
    const isHealthy = top.visual_signature === "healthy";
    const refEntry = top.entry || catalog[0] || null;

    return {
      status,
      abstained,
      abstention_reason: abstained
        ? `Visual patterns overlap between '${top.name}' (${top.probability_pct}%) and '${ranked[1]?.name || "alternative"}' (${ranked[1]?.probability_pct || 0}%). Review differential symptoms below or capture a sharper close-up lesion photo.`
        : null,
      crop_id: normalizeCropId(rawCrop),
      crop_name: displayCrop,
      predicted_condition: abstained ? "Inconclusive Visual Match (Review Differential)" : top.name,
      predicted_disease_id: isHealthy || abstained ? null : top.id,
      is_healthy: isHealthy && !abstained,
      confidence: top.probability,
      confidence_pct: top.probability_pct,
      margin,
      image_quality: {
        ...m,
        passed: true,
        rejection_reason: null
      },
      class_probabilities: ranked.map(({ entry, ...rest }) => rest),
      recommended_actions: refEntry
        ? {
            symptoms: refEntry.symptoms || "",
            favorable_conditions: refEntry.favorable_conditions || "",
            organic_control: refEntry.organic_control || "",
            chemical_control: refEntry.chemical_control || "",
            preventive_measures: refEntry.preventive_measures || "",
            extension_guidance:
              "Inspect 5-10 plants across the plot and confirm chemical dosage with your nearest Krishi Vigyan Kendra (KVK) before spraying."
          }
        : null,
      crop_disease_catalog: catalog,
      model_provenance: {
        method: "Client-Side Spectral-Texture & Crop-Scoped Foliar Screening Heuristic (v1.0)",
        model_type: "Browser HTML5 Canvas HSV/ExG + Laplacian sharpness + crop differential",
        source_mode: sourceMode,
        limitations:
          "Visual screening provides probabilistic optical screening rather than clinical lab microscopy or trained PlantVillage CNN confirmation. Verify with your local KVK or agronomist.",
        filename: filename || "leaf_photo.jpg"
      }
    };
  }

  class DiseaseScannerManager {
    constructor() {
      this.lastResult = null;
      this.isAnalyzing = false;
      this.errorMessage = null;
    }

    getSelectedCrop() {
      const selectEl = document.getElementById("kbvDiseaseCropSelect");
      if (selectEl && selectEl.value) return selectEl.value;
      if (window.kbvApp?.selectedCrop) return window.kbvApp.selectedCrop;
      if (window.modulesManager?.currentCropId) return window.modulesManager.currentCropId;
      return "tomato";
    }

    async analyzeImage(mediaObj, explicitCropId = null) {
      if (!mediaObj || !mediaObj.dataUrl) {
        this.lastResult = null;
        this.render();
        return null;
      }

      const cropId = explicitCropId || this.getSelectedCrop();
      this.isAnalyzing = true;
      this.errorMessage = null;
      this.render();

      try {
        const isStatic =
          typeof window !== "undefined" &&
          (/github\.io$/i.test(window.location.hostname || "") ||
            window.location.protocol === "file:");

        let result = null;

        if (!isStatic) {
          try {
            const blob = dataUrlToBlob(mediaObj.dataUrl);
            if (blob.size > MAX_UPLOAD_BYTES) {
              throw new Error("Image exceeds 8 MB maximum upload limit.");
            }
            const formData = new FormData();
            formData.append("image", blob, mediaObj.name || "leaf_photo.jpg");
            formData.append("crop_id", cropId);
            const lat = window.kbvApp?.currentLat || window.app?.currentLat;
            const lon = window.kbvApp?.currentLon || window.app?.currentLon;
            if (lat != null && lon != null) {
              formData.append("latitude", String(lat));
              formData.append("longitude", String(lon));
            }
            const controller = new AbortController();
            const timer = setTimeout(() => controller.abort(), 4500);
            const apiBase = window.location.origin;
            const resp = await fetch(`${apiBase}/api/integration/disease/screen`, {
              method: "POST",
              body: formData,
              signal: controller.signal
            });
            clearTimeout(timer);
            if (resp.ok) {
              result = await resp.json();
              if (result && result.model_provenance) {
                result.model_provenance.source_mode = "FastAPI Backend Screening API (/api/integration/disease/screen)";
              }
            } else if (resp.status === 413 || resp.status === 422) {
              const errJson = await resp.json().catch(() => ({}));
              throw new Error(errJson.detail || `Server rejected image (HTTP ${resp.status}).`);
            }
          } catch (netErr) {
            if (netErr && /exceeds 8 MB|HTTP 413|HTTP 422|Unsupported/i.test(netErr.message || "")) {
              throw netErr;
            }
            // Fall through cleanly to local Canvas screening if backend is unavailable
          }
        }

        if (!result) {
          result = await analyzeCanvasLocally(mediaObj.dataUrl, cropId, mediaObj.name);
        }

        this.lastResult = result;
        this.isAnalyzing = false;
        this.render();
        if (window.kbvMedia && typeof window.kbvMedia.syncPreviews === "function") {
          window.kbvMedia.syncPreviews();
        }
        return result;
      } catch (err) {
        this.isAnalyzing = false;
        this.errorMessage = err?.message || "Unable to screen the uploaded image.";
        this.render();
        return null;
      }
    }

    render() {
      const container = document.getElementById("kbvDedicatedDiseaseContainer");
      if (!container) return;

      const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");
      const media = window.kbvMedia?.currentImage || null;
      const activeCrop = this.getSelectedCrop();
      const catalog = (this.lastResult && Array.isArray(this.lastResult.crop_disease_catalog) && this.lastResult.crop_disease_catalog.length)
        ? this.lastResult.crop_disease_catalog
        : getCatalogForCrop(activeCrop);

      const cropOptionsHtml = CROP_OPTIONS.map(
        (opt) =>
          `<option value="${escapeHtml(opt.id)}" ${normalizeCropId(activeCrop) === normalizeCropId(opt.id) || activeCrop === opt.id ? "selected" : ""}>${escapeHtml(opt.label)}</option>`
      ).join("");

      const uploadBoxHtml = `
        <div id="kbvDiseaseDropZone"
          style="background:#F0EEE9; border:1.5px dashed rgba(45,90,39,0.4); border-radius:12px; padding:16px; margin-bottom:14px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:12px; min-width:220px; flex:1;">
              ${media
                ? `<img src="${escapeHtml(media.dataUrl)}" alt="Selected leaf photo" style="width:74px; height:74px; object-fit:cover; border-radius:10px; border:2px solid #2D5A27; flex-shrink:0;" />`
                : `<div style="width:64px; height:64px; border-radius:10px; background:rgba(45,90,39,0.1); display:flex; align-items:center; justify-content:center; color:#2D5A27; flex-shrink:0;">${ic("image", 26)}</div>`
              }
              <div>
                <div style="font-size:0.86rem; font-weight:700; color:#1A2412;">
                  ${media ? escapeHtml(media.name) : "Upload or Drag-and-Drop a Close-Up Crop Leaf Photo"}
                </div>
                <div style="font-size:0.74rem; color:#4F5E46; margin-top:3px;">
                  ${media
                    ? `${escapeHtml(media.source)} • Ready for spectral &amp; lesion screening`
                    : "Minimum 224×224 px in natural daylight. Runs both offline in your browser and on FastAPI server."}
                </div>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <label for="kbvDiseaseCropSelect" style="font-size:0.74rem; font-weight:700; color:#1A2412;">Crop:</label>
              <select id="kbvDiseaseCropSelect"
                style="padding:7px 10px; border-radius:8px; border:1px solid rgba(45,90,39,0.3); background:#FFFFFF; color:#1A2412; font-size:0.78rem; font-weight:600;">
                ${cropOptionsHtml}
              </select>
              <button type="button" class="btn btn-secondary" style="padding:7px 12px; font-size:0.76rem; display:inline-flex; align-items:center; gap:5px;"
                onclick="window.kbvMedia && window.kbvMedia.pickImage()">
                ${ic("image", 14)} Upload Leaf
              </button>
              <button type="button" class="btn btn-secondary" style="padding:7px 12px; font-size:0.76rem; display:inline-flex; align-items:center; gap:5px;"
                onclick="window.kbvMedia && window.kbvMedia.openCamera()">
                ${ic("camera", 14)} Take Photo
              </button>
              ${media
                ? `<button type="button" class="btn btn-primary" style="padding:7px 14px; font-size:0.76rem; font-weight:700; display:inline-flex; align-items:center; gap:5px;"
                    onclick="window.diseaseScanner.analyzeImage(window.kbvMedia.currentImage)">
                    ${ic("microscope", 14)} Re-Screen Leaf
                  </button>
                  <button type="button" class="btn btn-secondary" style="padding:7px 10px; font-size:0.76rem; display:inline-flex; align-items:center; gap:4px;"
                    onclick="window.kbvMedia && window.kbvMedia.clearImage()">
                    ${ic("close", 13)} Clear
                  </button>`
                : ""
              }
            </div>
          </div>
        </div>
      `;

      let screeningHtml = "";
      if (this.isAnalyzing) {
        screeningHtml = `
          <div style="padding:18px; border-radius:10px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); font-size:0.82rem; color:#1A2412; margin-bottom:14px;">
            <b>Running visual leaf screening...</b> Evaluating sharpness, exposure, foliar coverage, chlorosis, rust pustules, and necrotic spots.
          </div>
        `;
      } else if (this.errorMessage) {
        screeningHtml = `
          <div style="padding:14px; border-radius:10px; background:rgba(185,28,28,0.08); border:1px solid #dc2626; color:#7f1d1d; font-size:0.8rem; margin-bottom:14px;">
            <b>Screening Error:</b> ${escapeHtml(this.errorMessage)}
          </div>
        `;
      } else if (this.lastResult) {
        const res = this.lastResult;
        const q = res.image_quality || {};
        const passed = q.passed !== false;

        let bannerBg = "rgba(45,90,39,0.09)";
        let bannerBorder = "rgba(45,90,39,0.35)";
        let badgeColor = "#2D5A27";
        let badgeLabel = "SCREENING MATCH";

        if (res.status === "QUALITY_REJECTED" || res.status === "ABSTAINED_NON_LEAF") {
          bannerBg = "rgba(185,28,28,0.08)";
          bannerBorder = "#dc2626";
          badgeColor = "#991b1b";
          badgeLabel = res.status === "ABSTAINED_NON_LEAF" ? "NON-LEAF ABSTAINED" : "QUALITY CHECK FAILED";
        } else if (res.abstained) {
          bannerBg = "rgba(217,119,6,0.1)";
          bannerBorder = "#d97706";
          badgeColor = "#b45309";
          badgeLabel = "LOW CERTAINTY — ABSTAINED";
        } else if (!res.is_healthy) {
          bannerBg = "rgba(180,83,9,0.09)";
          bannerBorder = "#b45309";
          badgeColor = "#9a3412";
          badgeLabel = "VISUAL LESION PATTERN DETECTED";
        } else {
          badgeLabel = "HEALTHY CANOPY INDICATED";
        }

        const probBarsHtml = (res.class_probabilities || [])
          .map((item, idx) => {
            const pct = Number(item.probability_pct || 0).toFixed(1);
            const barColor = item.visual_signature === "healthy" ? "#2D5A27" : idx === 0 ? "#B45309" : "#64748B";
            return `
              <div style="margin-bottom:8px;">
                <div style="display:flex; justify-content:space-between; font-size:0.76rem; margin-bottom:3px;">
                  <span style="font-weight:700; color:#1A2412;">${escapeHtml(item.name)} <span style="font-weight:500; color:#4F5E46;">(${escapeHtml(item.pathogen_type)})</span></span>
                  <span style="font-weight:700; color:${barColor};">${pct}%</span>
                </div>
                <div style="height:7px; border-radius:999px; background:rgba(0,0,0,0.08); overflow:hidden;">
                  <div style="width:${Math.min(100, Math.max(2, Number(pct)))}%; height:100%; background:${barColor}; border-radius:999px;"></div>
                </div>
              </div>
            `;
          })
          .join("");

        const rec = res.recommended_actions;
        const recHtml = rec
          ? `
            <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.2); border-radius:10px; padding:12px; margin-top:12px; font-size:0.78rem; color:#1A2412;">
              <div style="font-weight:700; color:#2D5A27; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
                ${ic("stethoscope", 15)} Field Action &amp; Extension Guidance (${escapeHtml(res.crop_name)})
              </div>
              <div style="margin-bottom:4px;"><b>Symptoms to Confirm:</b> ${escapeHtml(rec.symptoms)}</div>
              <div style="margin-bottom:4px;"><b>Favorable Weather:</b> ${escapeHtml(rec.favorable_conditions)}</div>
              <div style="margin-bottom:4px;"><b>Bio / Organic Option:</b> ${escapeHtml(rec.organic_control)}</div>
              <div style="margin-bottom:4px;"><b>Targeted Control (Verify with KVK):</b> ${escapeHtml(rec.chemical_control)}</div>
              <div style="margin-bottom:6px;"><b>Prevention:</b> ${escapeHtml(rec.preventive_measures)}</div>
              <div style="padding:7px 9px; border-radius:6px; background:#F0EEE9; color:#33402B; font-size:0.73rem;">
                <b>Extension Advisory:</b> ${escapeHtml(rec.extension_guidance)}
              </div>
            </div>
          `
          : "";

        screeningHtml = `
          <div style="background:${bannerBg}; border:1px solid ${bannerBorder}; border-radius:12px; padding:14px; margin-bottom:14px;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
              <div>
                <span style="display:inline-block; padding:2px 8px; border-radius:999px; font-size:0.68rem; font-weight:800; letter-spacing:0.04em; background:${badgeColor}; color:#FFFFFF; margin-bottom:5px;">
                  ${badgeLabel}
                </span>
                <div style="font-size:1.05rem; font-weight:800; color:#1A2412;">
                  ${escapeHtml(res.predicted_condition)}
                </div>
                ${res.abstention_reason ? `<div style="font-size:0.78rem; color:#7c2d12; margin-top:4px; line-height:1.45;">${escapeHtml(res.abstention_reason)}</div>` : ""}
              </div>
              <div style="text-align:right; min-width:130px;">
                <div style="font-size:0.72rem; color:#4F5E46; font-weight:600;">Visual Score</div>
                <div style="font-size:1.35rem; font-weight:800; color:${badgeColor};">${res.confidence_pct ? `${Number(res.confidence_pct).toFixed(1)}%` : "Abstained"}</div>
                ${passed ? `<div style="font-size:0.7rem; color:#4F5E46;">Margin: +${(Number(res.margin || 0) * 100).toFixed(1)}%</div>` : ""}
              </div>
            </div>

            <!-- Quality & Spectral Telemetry Strip -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:8px; margin-bottom:12px;">
              <div style="background:rgba(255,255,255,0.85); padding:7px 9px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); font-size:0.72rem;">
                <div style="color:#4F5E46;">Resolution</div>
                <div style="font-weight:700; color:#1A2412;">${q.width || 0}×${q.height || 0} px</div>
              </div>
              <div style="background:rgba(255,255,255,0.85); padding:7px 9px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); font-size:0.72rem;">
                <div style="color:#4F5E46;">Sharpness (Laplacian)</div>
                <div style="font-weight:700; color:#1A2412;">${q.blur_variance ?? 0}</div>
              </div>
              <div style="background:rgba(255,255,255,0.85); padding:7px 9px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); font-size:0.72rem;">
                <div style="color:#4F5E46;">Brightness</div>
                <div style="font-weight:700; color:#1A2412;">${q.mean_brightness ?? 0} / 255</div>
              </div>
              <div style="background:rgba(255,255,255,0.85); padding:7px 9px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); font-size:0.72rem;">
                <div style="color:#4F5E46;">Foliar Cover</div>
                <div style="font-weight:700; color:#1A2412;">${q.foliar_coverage_pct ?? 0}%</div>
              </div>
              <div style="background:rgba(255,255,255,0.85); padding:7px 9px; border-radius:8px; border:1px solid rgba(0,0,0,0.08); font-size:0.72rem;">
                <div style="color:#4F5E46;">Lesion / Chlorosis Burden</div>
                <div style="font-weight:700; color:#1A2412;">${q.lesion_burden_pct ?? 0}%</div>
              </div>
            </div>

            ${probBarsHtml ? `<div style="background:rgba(255,255,255,0.9); border-radius:10px; padding:11px; border:1px solid rgba(0,0,0,0.08);"><div style="font-size:0.75rem; font-weight:700; color:#1A2412; margin-bottom:8px;">Crop-Scoped Differential Visual Match</div>${probBarsHtml}</div>` : ""}

            ${recHtml}

            <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-top:10px; font-size:0.7rem; color:#4F5E46;">
              <span><b>Method:</b> ${escapeHtml(res.model_provenance?.source_mode || res.model_provenance?.method)}</span>
              <button type="button" class="btn btn-primary" style="padding:5px 12px; font-size:0.74rem; display:inline-flex; align-items:center; gap:5px;"
                onclick="window.diseaseScanner.sendToDoctor()">
                ${ic("doctor", 13)} Discuss with AI Crop Doctor →
              </button>
            </div>
            <div style="font-size:0.69rem; color:#4F5E46; margin-top:5px;">
              ${escapeHtml(res.model_provenance?.limitations || "")}
            </div>
          </div>
        `;
      } else {
        screeningHtml = `
          <div style="padding:12px 14px; border-radius:10px; background:rgba(45,90,39,0.06); border:1px solid rgba(45,90,39,0.2); font-size:0.78rem; color:#33402B; margin-bottom:14px;">
            <b>No leaf photo screened yet.</b> Click <b>Upload Leaf</b> or <b>Take Photo</b> above (or drop a leaf photo here) to check quality, detect foliar lesion patterns, and view targeted management guidance.
          </div>
        `;
      }

      const catalogCardsHtml = catalog
        .map(
          (d) => `
          <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.18); border-radius:10px; padding:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:5px; flex-wrap:wrap;">
              <b style="font-size:0.84rem; color:#1A2412;">${escapeHtml(d.name)}</b>
              <span style="font-size:0.68rem; font-weight:700; padding:2px 7px; border-radius:999px; background:rgba(45,90,39,0.12); color:#2D5A27;">${escapeHtml(d.pathogen_type || "Pathogen")}</span>
            </div>
            <div style="font-size:0.75rem; color:#33402B; margin-bottom:4px;"><b>Symptoms:</b> ${escapeHtml(d.symptoms)}</div>
            <div style="font-size:0.74rem; color:#4F5E46; margin-bottom:4px;"><b>Triggers:</b> ${escapeHtml(d.favorable_conditions)}</div>
            <div style="font-size:0.74rem; color:#2D5A27; margin-bottom:3px;"><b>Bio-Control:</b> ${escapeHtml(d.organic_control)}</div>
            <div style="font-size:0.74rem; color:#7c2d12;"><b>Extension / Chemical:</b> ${escapeHtml(d.chemical_control)}</div>
          </div>
        `
        )
        .join("");

      container.innerHTML = `
        ${uploadBoxHtml}
        ${screeningHtml}
        <div class="param-section-title" style="margin-top:4px;">Pathology &amp; Pest Reference Guide — ${escapeHtml(activeCrop.replace(/_/g, " ").toUpperCase())}</div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:10px;">
          ${catalogCardsHtml}
        </div>
      `;

      // Bind crop selector & drag-and-drop listeners
      const selectEl = document.getElementById("kbvDiseaseCropSelect");
      if (selectEl) {
        selectEl.addEventListener("change", (e) => {
          const val = e.target.value;
          if (window.kbvApp && typeof window.kbvApp.setCropSelection === "function") {
            window.kbvApp.setCropSelection(val);
          }
          if (window.kbvMedia?.currentImage) {
            this.analyzeImage(window.kbvMedia.currentImage, val);
          } else {
            this.render();
          }
        });
      }

      const dropZone = document.getElementById("kbvDiseaseDropZone");
      if (dropZone) {
        dropZone.addEventListener("dragover", (e) => {
          e.preventDefault();
          dropZone.style.borderColor = "#2D5A27";
          dropZone.style.background = "#E6EBE2";
        });
        dropZone.addEventListener("dragleave", () => {
          dropZone.style.borderColor = "rgba(45,90,39,0.4)";
          dropZone.style.background = "#F0EEE9";
        });
        dropZone.addEventListener("drop", (e) => {
          e.preventDefault();
          dropZone.style.borderColor = "rgba(45,90,39,0.4)";
          dropZone.style.background = "#F0EEE9";
          const file = e.dataTransfer?.files?.[0];
          if (file && window.kbvMedia && typeof window.kbvMedia.handleFile === "function") {
            window.kbvMedia.handleFile(file, "Dropped Photo");
          }
        });
      }
    }

    sendToDoctor() {
      const res = this.lastResult;
      if (window.kbvApp && typeof window.kbvApp.switchDashboardTab === "function") {
        window.kbvApp.switchDashboardTab("doctor");
      }
      if (res && window.modulesManager && typeof window.modulesManager.fillDoctorQuestion === "function") {
        setTimeout(() => {
          const cond = res.abstained
            ? `possible foliar symptoms on ${res.crop_name}`
            : `${res.predicted_condition} on ${res.crop_name}`;
          window.modulesManager.fillDoctorQuestion(
            `I scanned a leaf photo showing ${cond}. What biological and field management steps are recommended?`
          );
        }, 120);
      }
    }
  }

  window.diseaseScanner = new DiseaseScannerManager();
  window.DiseaseScannerUtils = {
    analyzeCanvasLocally,
    extractCanvasMetrics,
    scoreSignature,
    getCatalogForCrop,
    inferVisualSignature,
    CLIENT_DISEASE_CATALOG
  };
})();
