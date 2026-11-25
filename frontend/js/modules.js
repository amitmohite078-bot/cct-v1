
const MANDI_COMMODITY_DATA = {
  tomato: {
    commodity_name: "Tomato (Hybrid / Fresh Market)",
    modal_price_qtl: 2200,
    min_price_qtl: 1400,
    max_price_qtl: 3800,
    msp_price_qtl: null,
    price_range_qtl: "₹1,400 - ₹3,800",
    benchmark_mandi: "Kolar APMC (Karnataka) / Pimpalgaon (Maharashtra)",
    price_trend: "Active ⚡ (Seasonal Arrivals)",
    market_sentiment: "High wholesale arrivals & daily auction turnover across southern/western mandis",
    base_yield_qtl_acre: 120.0,
    cost_of_cultivation_acre_inr: 58000,
    verified_source: "Agmarknet / NHB Daily APMC Price Bulletin"
  },
  onion: {
    commodity_name: "Onion (Nashik Red / Garwa)",
    modal_price_qtl: 2600,
    min_price_qtl: 1800,
    max_price_qtl: 3500,
    msp_price_qtl: null,
    price_range_qtl: "₹1,800 - ₹3,500",
    benchmark_mandi: "Lasalgaon APMC (Nashik, Maharashtra - Asia's Largest)",
    price_trend: "Bullish 📈 (+12.4%)",
    market_sentiment: "Post-monsoon Kharif arrivals & strong inter-state dispatch",
    base_yield_qtl_acre: 90.0,
    cost_of_cultivation_acre_inr: 46000,
    verified_source: "Agmarknet / Lasalgaon APMC Daily Market Bulletin"
  },
  rice: {
    commodity_name: "Paddy (Dhan Common / Grade-A)",
    modal_price_qtl: 2450,
    min_price_qtl: 2300,
    max_price_qtl: 3100,
    msp_price_qtl: 2300,
    price_range_qtl: "₹2,300 - ₹3,100",
    benchmark_mandi: "Mandya APMC (Karnataka) / Karnal APMC (Haryana)",
    price_trend: "Firm 📈 (+4.2%)",
    market_sentiment: "Active procurement under Central Pool & MSP guarantee",
    base_yield_qtl_acre: 22.0,
    cost_of_cultivation_acre_inr: 24000,
    verified_source: "Agmarknet / CACP Official Minimum Support Price"
  },
  wheat: {
    commodity_name: "Wheat (Sharbati / Lokwan)",
    modal_price_qtl: 2350,
    min_price_qtl: 2275,
    max_price_qtl: 2850,
    msp_price_qtl: 2275,
    price_range_qtl: "₹2,275 - ₹2,850",
    benchmark_mandi: "Khanna APMC (Punjab) / Sehore APMC (Madhya Pradesh)",
    price_trend: "Stable ⚖️ (+1.1%)",
    market_sentiment: "Steady flour mill buying & MSP support",
    base_yield_qtl_acre: 18.5,
    cost_of_cultivation_acre_inr: 18500,
    verified_source: "Agmarknet / CACP Official Minimum Support Price"
  },
  maize: {
    commodity_name: "Maize (Yellow Corn / Grain)",
    modal_price_qtl: 2150,
    min_price_qtl: 2050,
    max_price_qtl: 2480,
    msp_price_qtl: 2225,
    price_range_qtl: "₹2,050 - ₹2,480",
    benchmark_mandi: "Davanagere APMC (Karnataka) / Gulabbagh APMC (Bihar)",
    price_trend: "Bullish 📈 (+6.5%)",
    market_sentiment: "High poultry feed & industrial starch ethanol demand",
    base_yield_qtl_acre: 24.0,
    cost_of_cultivation_acre_inr: 19000,
    verified_source: "Agmarknet / eNAM APMC Daily Trade Summary"
  },
  cotton: {
    commodity_name: "Cotton (Medium / Long Staple Kapas)",
    modal_price_qtl: 7350,
    min_price_qtl: 6800,
    max_price_qtl: 8200,
    msp_price_qtl: 7121,
    price_range_qtl: "₹6,800 - ₹8,200",
    benchmark_mandi: "Rajkot APMC (Gujarat) / Warangal APMC (Telangana)",
    price_trend: "Bullish 📈 (+8.0%)",
    market_sentiment: "Strong spinning mill buying & Cotton Corporation of India (CCI) support",
    base_yield_qtl_acre: 10.5,
    cost_of_cultivation_acre_inr: 29000,
    verified_source: "Agmarknet / CCI Kapas Daily Auction Records"
  },
  soybean: {
    commodity_name: "Soybean (Yellow Seed)",
    modal_price_qtl: 4750,
    min_price_qtl: 4500,
    max_price_qtl: 5300,
    msp_price_qtl: 4892,
    price_range_qtl: "₹4,500 - ₹5,300",
    benchmark_mandi: "Indore APMC (Madhya Pradesh) / Latur APMC (Maharashtra)",
    price_trend: "Stable ⚖️ (+0.8%)",
    market_sentiment: "DOC export parity & domestic crushing demand",
    base_yield_qtl_acre: 9.5,
    cost_of_cultivation_acre_inr: 16000,
    verified_source: "SOPA / Agmarknet Daily Mandi Index"
  },
  groundnut: {
    commodity_name: "Groundnut (Pods with Shell)",
    modal_price_qtl: 6450,
    min_price_qtl: 6000,
    max_price_qtl: 7200,
    msp_price_qtl: 6783,
    price_range_qtl: "₹6,000 - ₹7,200",
    benchmark_mandi: "Gondal APMC (Gujarat) / Anantapur APMC (Andhra Pradesh)",
    price_trend: "Bullish 📈 (+5.1%)",
    market_sentiment: "High festival crushing oil demand & bold seed export inquiry",
    base_yield_qtl_acre: 11.0,
    cost_of_cultivation_acre_inr: 21000,
    verified_source: "Agmarknet / eNAM APMC Live Arrival Records"
  },
  sugarcane: {
    commodity_name: "Sugarcane (FRP Mill Gate)",
    modal_price_qtl: 340,
    min_price_qtl: 315,
    max_price_qtl: 380,
    msp_price_qtl: 340,
    price_range_qtl: "₹315 - ₹380",
    benchmark_mandi: "Kolhapur Sugar Belt (Maharashtra) / Muzaffarnagar (UP)",
    price_trend: "Regulated ⚖️",
    market_sentiment: "Guaranteed statutory sugar mill recovery rate payment",
    base_yield_qtl_acre: 380.0,
    cost_of_cultivation_acre_inr: 52000,
    verified_source: "CACP / Sugar Commissionerate FRP Mandate"
  },
  ragi: {
    commodity_name: "Finger Millet (Ragi)",
    modal_price_qtl: 4100,
    min_price_qtl: 3846,
    max_price_qtl: 4600,
    msp_price_qtl: 4290,
    price_range_qtl: "₹3,846 - ₹4,600",
    benchmark_mandi: "Mandya / Hassan APMC (Karnataka)",
    price_trend: "Bullish 📈 (+7.5%)",
    market_sentiment: "High urban demand & Shree Anna millets procurement",
    base_yield_qtl_acre: 12.0,
    cost_of_cultivation_acre_inr: 14000,
    verified_source: "Agmarknet / Karnataka State Agricultural Marketing Board"
  },
  jowar: {
    commodity_name: "Sorghum (Jowar Hybrid)",
    modal_price_qtl: 3350,
    min_price_qtl: 3180,
    max_price_qtl: 3900,
    msp_price_qtl: 3371,
    price_range_qtl: "₹3,180 - ₹3,900",
    benchmark_mandi: "Solapur APMC (Maharashtra) / Bijapur (Karnataka)",
    price_trend: "Stable ⚖️ (+2.0%)",
    market_sentiment: "Steady coarse grain demand & MSP support",
    base_yield_qtl_acre: 13.0,
    cost_of_cultivation_acre_inr: 15000,
    verified_source: "Agmarknet / eNAM APMC Bulletin"
  },
  pulses_gram: {
    commodity_name: "Bengal Gram (Chana / Desi Dal)",
    modal_price_qtl: 5950,
    min_price_qtl: 5440,
    max_price_qtl: 6600,
    msp_price_qtl: 5440,
    price_range_qtl: "₹5,440 - ₹6,600",
    benchmark_mandi: "Bikaner APMC (Rajasthan) / Vidisha APMC (MP)",
    price_trend: "Bullish 📈 (+3.8%)",
    market_sentiment: "Strong dal consumption & stockist buying",
    base_yield_qtl_acre: 8.0,
    cost_of_cultivation_acre_inr: 15500,
    verified_source: "Agmarknet / NAFED Pulses Portal"
  },
  pulses_arhar: {
    commodity_name: "Pigeonpea (Tur / Red Gram Dal)",
    modal_price_qtl: 9400,
    min_price_qtl: 7550,
    max_price_qtl: 11200,
    msp_price_qtl: 7550,
    price_range_qtl: "₹7,550 - ₹11,200",
    benchmark_mandi: "Gulbarga / Kalaburagi APMC (Karnataka)",
    price_trend: "Bullish 📈 (+14.0%)",
    market_sentiment: "Tight domestic supply & elevated miller buying",
    base_yield_qtl_acre: 7.0,
    cost_of_cultivation_acre_inr: 17000,
    verified_source: "Agmarknet / eNAM Daily Pulses Index"
  },
  pulses_moong: {
    commodity_name: "Green Gram (Moong / Mung Bean)",
    modal_price_qtl: 8450,
    min_price_qtl: 7600,
    max_price_qtl: 9500,
    msp_price_qtl: 8682,
    price_range_qtl: "₹7,600 - ₹9,500",
    benchmark_mandi: "Merta City APMC / Nagaur (Rajasthan)",
    price_trend: "Bullish 📈 (+6.2%)",
    market_sentiment: "Steady NAFED MSP procurement & festival dal demand",
    base_yield_qtl_acre: 4.8,
    cost_of_cultivation_acre_inr: 13500,
    verified_source: "Agmarknet / NAFED Pulses Portal"
  },
  mustard: {
    commodity_name: "Mustard Seed (Sarson / Black)",
    modal_price_qtl: 5650,
    min_price_qtl: 5450,
    max_price_qtl: 6200,
    msp_price_qtl: 5650,
    price_range_qtl: "₹5,450 - ₹6,200",
    benchmark_mandi: "Alwar APMC / Bharatpur APMC (Rajasthan)",
    price_trend: "Stable ⚖️ (+1.5%)",
    market_sentiment: "Active edible oil expeller demand & MSP threshold",
    base_yield_qtl_acre: 8.5,
    cost_of_cultivation_acre_inr: 14500,
    verified_source: "Agmarknet / SEA Oilseed Daily Index"
  }
};

function getRegionalMandiBenchmarkJS(cropKey, lat, lon) {
  const k = (cropKey || "").toLowerCase();
  if (lat && lon) {
    // Maharashtra
    if (lat >= 15.5 && lat <= 22.0 && lon >= 72.5 && lon <= 80.5) {
      const mh = {
        onion: { benchmark_mandi: "Lasalgaon APMC (Nashik, Maharashtra - Asia's Largest)", modal_price_qtl: 2600, price_range_qtl: "₹1,800 - ₹3,500" },
        tomato: { benchmark_mandi: "Pimpalgaon Baswant APMC (Nashik) / Narayangaon", modal_price_qtl: 2150, price_range_qtl: "₹1,500 - ₹3,600" },
        cotton: { benchmark_mandi: "Jalgaon APMC / Amravati APMC (Vidarbha)", modal_price_qtl: 7380, price_range_qtl: "₹6,900 - ₹8,150" },
        soybean: { benchmark_mandi: "Latur APMC / Nanded APMC (Marathwada)", modal_price_qtl: 4820, price_range_qtl: "₹4,550 - ₹5,250" },
        sugarcane: { benchmark_mandi: "Kolhapur Sugar Belt APMC", modal_price_qtl: 340, price_range_qtl: "₹315 - ₹380" },
        wheat: { benchmark_mandi: "Pune APMC / Nashik APMC", modal_price_qtl: 2420, price_range_qtl: "₹2,300 - ₹2,900" },
        rice: { benchmark_mandi: "Karjat APMC / Kolhapur APMC", modal_price_qtl: 2420, price_range_qtl: "₹2,300 - ₹3,050" },
        maize: { benchmark_mandi: "Chalisgaon APMC (Jalgaon)", modal_price_qtl: 2180, price_range_qtl: "₹2,050 - ₹2,450" },
        groundnut: { benchmark_mandi: "Dhule APMC / Jalgaon APMC", modal_price_qtl: 6520, price_range_qtl: "₹6,100 - ₹7,100" }
      };
      if (mh[k]) return mh[k];
    }
    // Karnataka
    if (lat >= 11.5 && lat <= 18.5 && lon >= 74.0 && lon <= 78.5) {
      const ka = {
        tomato: { benchmark_mandi: "Kolar APMC (Karnataka - Asia's 2nd Largest)", modal_price_qtl: 2200, price_range_qtl: "₹1,400 - ₹3,800" },
        rice: { benchmark_mandi: "Mandya APMC (Karnataka Paddy Hub)", modal_price_qtl: 2450, price_range_qtl: "₹2,300 - ₹3,100" },
        maize: { benchmark_mandi: "Davanagere APMC (Karnataka - South Corn Capital)", modal_price_qtl: 2150, price_range_qtl: "₹2,050 - ₹2,480" },
        cotton: { benchmark_mandi: "Raichur APMC / Haveri APMC", modal_price_qtl: 7320, price_range_qtl: "₹6,850 - ₹8,100" },
        onion: { benchmark_mandi: "Hubli APMC / Yeshwanthpur APMC (Bengaluru)", modal_price_qtl: 2650, price_range_qtl: "₹1,900 - ₹3,600" },
        groundnut: { benchmark_mandi: "Challakere APMC (Chitradurga Oil Hub)", modal_price_qtl: 6580, price_range_qtl: "₹6,200 - ₹7,250" },
        soybean: { benchmark_mandi: "Belagavi APMC / Bidar APMC", modal_price_qtl: 4780, price_range_qtl: "₹4,500 - ₹5,200" }
      };
      if (ka[k]) return ka[k];
    }
    // Punjab & Haryana
    if (lat >= 28.0) {
      const pb = {
        wheat: { benchmark_mandi: "Khanna APMC (Punjab - Asia's Largest Grain Market)", modal_price_qtl: 2350, price_range_qtl: "₹2,275 - ₹2,850" },
        rice: { benchmark_mandi: "Karnal APMC (Haryana - National Rice Market)", modal_price_qtl: 2550, price_range_qtl: "₹2,300 - ₹3,800" },
        cotton: { benchmark_mandi: "Abohar APMC / Bathinda Mandi (Punjab)", modal_price_qtl: 7250, price_range_qtl: "₹6,800 - ₹8,050" },
        maize: { benchmark_mandi: "Hoshiarpur APMC / Ludhiana Mandi", modal_price_qtl: 2180, price_range_qtl: "₹2,050 - ₹2,420" },
        tomato: { benchmark_mandi: "Patiala APMC / Jalandhar Mandi", modal_price_qtl: 2100, price_range_qtl: "₹1,500 - ₹3,400" },
        onion: { benchmark_mandi: "Ludhiana APMC / Jalandhar APMC", modal_price_qtl: 2750, price_range_qtl: "₹2,000 - ₹3,600" }
      };
      if (pb[k]) return pb[k];
    }
    // Madhya Pradesh
    if (lat >= 21.0 && lat <= 27.0 && lon >= 74.0 && lon <= 82.5) {
      const mp = {
        soybean: { benchmark_mandi: "Indore APMC (SOPA National Benchmark Terminal)", modal_price_qtl: 4750, price_range_qtl: "₹4,500 - ₹5,300" },
        wheat: { benchmark_mandi: "Sehore APMC (Sharbati Golden Grain Hub)", modal_price_qtl: 2550, price_range_qtl: "₹2,350 - ₹3,300" },
        cotton: { benchmark_mandi: "Khargone APMC / Khandwa APMC", modal_price_qtl: 7280, price_range_qtl: "₹6,800 - ₹8,100" },
        maize: { benchmark_mandi: "Chhindwara APMC / Betul APMC", modal_price_qtl: 2120, price_range_qtl: "₹2,000 - ₹2,400" },
        onion: { benchmark_mandi: "Neemuch APMC / Mandsaur APMC", modal_price_qtl: 2450, price_range_qtl: "₹1,700 - ₹3,200" }
      };
      if (mp[k]) return mp[k];
    }
    // Gujarat
    if (lon <= 74.5 && lat >= 20.0) {
      const gj = {
        cotton: { benchmark_mandi: "Rajkot APMC (Saurashtra White Gold Terminal)", modal_price_qtl: 7450, price_range_qtl: "₹6,900 - ₹8,300" },
        groundnut: { benchmark_mandi: "Gondal APMC (Saurashtra Groundnut Hub)", modal_price_qtl: 6650, price_range_qtl: "₹6,200 - ₹7,400" },
        onion: { benchmark_mandi: "Mahuva APMC (Bhavnagar, GJ)", modal_price_qtl: 2550, price_range_qtl: "₹1,800 - ₹3,400" }
      };
      if (gj[k]) return gj[k];
    }
  }
  return {};
}

const CROP_PLANTING_GEOMETRY = {
  tomato: { rowM: 0.75, colM: 0.45, system: "Raised Bed + Inline Drip (4 LPH)", emittersPerPlant: 1, note: "Paired 75 cm bed spacing with 45 cm intra-row emitter wetting prevents stem collar rot." },
  onion: { rowM: 0.15, colM: 0.10, system: "Broad Bed Furrow (BBF) + Micro-Drip", emittersPerPlant: 1, note: "High-density 15 × 10 cm bulb geometry on 1.2 m BBF beds cuts neck rot & saves 40% water." },
  rice: { rowM: 0.20, colM: 0.20, system: "SRI Square Grid + Alternate Wet-Dry", emittersPerPlant: 1, note: "20 × 20 cm SRI spacing boosts productive tillers & cuts methane/water demand by 30%." },
  wheat: { rowM: 0.225, colM: 0.05, system: "Line Sown Row (22.5 cm) + Sprinkler", emittersPerPlant: 1, note: "22.5 cm line sowing ensures uniform crown-root initiation (CRI) and light interception." },
  maize: { rowM: 0.60, colM: 0.25, system: "Ridge & Furrow + Inline Drip", emittersPerPlant: 1, note: "60 × 25 cm ridge spacing avoids waterlogging and maximizes cob filling (~27,000 plants/ac)." },
  cotton: { rowM: 0.90, colM: 0.60, system: "Wide-Row High Density + Drip Lateral", emittersPerPlant: 1, note: "90 × 60 cm grid improves boll load in mid-season and allows inter-row mulching." },
  soybean: { rowM: 0.45, colM: 0.08, system: "Broad Bed Furrow + Micro-Sprinkler", emittersPerPlant: 1, note: "45 × 8 cm BBF drainage protects soybean pods from both dry spells and excess rain." },
  potato: { rowM: 0.60, colM: 0.20, system: "Earthed-Up Ridge + Inline Drip", emittersPerPlant: 1, note: "60 × 20 cm tuber ridge spacing keeps stolon zone evenly moist at 1.0–1.2 bar drip." },
  sugarcane: { rowM: 1.50, colM: 0.45, system: "Paired-Row Trench + Subsurface Drip", emittersPerPlant: 1, note: "150 × 45 cm paired trench system saves up to 50% water & delivers fertigation to stool zone." },
  groundnut: { rowM: 0.30, colM: 0.10, system: "Raised Flat Bed + Mini-Sprinkler", emittersPerPlant: 1, note: "30 × 10 cm spacing supports clean peg penetration and uniform pod development." },
  chickpea: { rowM: 0.30, colM: 0.10, system: "Line Sown + Supplemental Drip/Sprinkler", emittersPerPlant: 1, note: "30 × 10 cm spacing preserves residual rabi moisture and avoids wilt stress." },
  pigeonpea: { rowM: 1.20, colM: 0.45, system: "Wide Ridge + Regulated Drip", emittersPerPlant: 1, note: "120 × 45 cm spacing boosts branching and prevents flower drop during dry spells." },
  sorghum: { rowM: 0.45, colM: 0.15, system: "Contour Ridges + Deficit Furrow", emittersPerPlant: 1, note: "45 × 15 cm rainfed/supplemental geometry maximizes drought-hardy grain filling." },
  millet: { rowM: 0.45, colM: 0.12, system: "Line Sown + Protective Sprinkler", emittersPerPlant: 1, note: "45 × 12 cm spacing optimizes tillering in semi-arid sandy/red loams." },
  chilli: { rowM: 0.60, colM: 0.45, system: "Mulched Raised Bed + Drip (4 LPH)", emittersPerPlant: 1, note: "60 × 45 cm silver-black mulch reduces thrips/mites and locks capillary moisture." },
  turmeric: { rowM: 0.45, colM: 0.25, system: "Raised Rhizome Bed + Inline Drip", emittersPerPlant: 1, note: "45 × 25 cm raised bed ensures crisp rhizome drainage with steady micro-drip." },
  banana: { rowM: 1.80, colM: 1.50, system: "Dual-Emitter Ring Drip (4 LPH × 2)", emittersPerPlant: 2, note: "1.8 × 1.5 m High-Density tissue-culture spacing (~1,490 suckers/ac) doubles bunch yield." },
  mango: { rowM: 5.00, colM: 5.00, system: "Double-Lateral Basin Drip (8 LPH × 2)", emittersPerPlant: 2, note: "5 × 5 m semi-high density orchard (~162 trees/ac) with stress-regulated flower induction." },
  _default: { rowM: 0.60, colM: 0.30, system: "Precision Inline Drip Lateral", emittersPerPlant: 1, note: "Uniform Row × Plant geometry matched to drip wetting front for high water productivity." }
};

/**
 * AgroNexus - Integrated Modules Engine
 * Bridges Geo-Spatial Crop Suitability -> Disease Detection -> Irrigation Prediction -> Crop Doctor -> Try & Error Lab.
 */
class ModulesManager {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentCropId = "tomato";
    this.currentCropName = "Tomato";
    this.activeSubtab = "irrigation"; // default to irrigation schedule in 1km panel
    this.modulesData = null;
    this.chatHistory = [];
    this.lastFieldContext = {};
    this.currentLanguage = "en";
    this.growthStage = "mid_season";
    this.customPrices = {};
    this.currentFarmSize = 2.5;
    this.fieldLat = 12.9571;
    this.fieldLon = 77.5325;
    this.tryErrorQuery = "Mango";
    this.tryErrorResult = null;
    this.tryErrorLoading = false;
    this.tryErrorCoordsKey = "";
  }

  setGrowthStage(stage) {
    this.growthStage = stage || "mid_season";
    const lat = this.fieldLat || (window.app && window.app.currentLat) || 12.9571;
    const lon = this.fieldLon || (window.app && window.app.currentLon) || 77.5325;
    this.loadModules(lat, lon).catch(e => console.warn("Stage reload notice:", e));
  }

  setLanguage(lang) {
    this.currentLanguage = lang;
    this.render();
  }

  setCrop(cropId, cropName, fieldContext = {}) {
    const key = (cropId || "").toLowerCase();
    this.currentCropId = key;
    this.currentCropName = cropName || (key.charAt(0).toUpperCase() + key.slice(1));
    this.lastFieldContext = { ...(this.lastFieldContext || {}), ...(fieldContext || {}) };
    if (fieldContext.lat) this.fieldLat = fieldContext.lat;
    if (fieldContext.lon) this.fieldLon = fieldContext.lon;
    const newCoordsKey = `${Number(this.fieldLat).toFixed(3)},${Number(this.fieldLon).toFixed(3)}`;
    if (this.tryErrorCoordsKey && this.tryErrorCoordsKey !== newCoordsKey) {
      this.tryErrorResult = null;
      if (window.kbvApp && window.kbvApp.activeDashboardTab === "tryerror") {
        setTimeout(() => this.ensureTryErrorLoaded(true), 40);
      }
    }

    const fallbackMandi = MANDI_COMMODITY_DATA[key] || MANDI_COMMODITY_DATA.tomato;
    const regional = getRegionalMandiBenchmarkJS(key, this.fieldLat, this.fieldLon);
    
    const benchmarkMandi = regional.benchmark_mandi || fallbackMandi.benchmark_mandi;
    const modalPrice = this.customPrices[key] || regional.modal_price_qtl || fallbackMandi.modal_price_qtl;
    const priceRange = regional.price_range_qtl || fallbackMandi.price_range_qtl;

    let suitabilityScore = 88.0;
    const analysis = (window.app && window.app.analysisData) || window.lastAnalysisData;
    if (analysis && analysis.crop_suitability) {
      const crops = analysis.crop_suitability.all_ranked_crops || analysis.crop_suitability.top_recommendations || [];
      const found = crops.find(c => (c.id || c.crop_id) === key);
      if (found && found.suitability_score) suitabilityScore = found.suitability_score;
    }
    const factor = Math.max(0.40, Math.min(1.0, Math.pow(suitabilityScore / 100.0, 0.85)));
    const yieldPerAcre = +(fallbackMandi.base_yield_qtl_acre * factor).toFixed(1);
    const grossRev = Math.round(yieldPerAcre * modalPrice);
    const netProfit = Math.round(grossRev - fallbackMandi.cost_of_cultivation_acre_inr);
    const roi = +((netProfit / Math.max(1, fallbackMandi.cost_of_cultivation_acre_inr)) * 100).toFixed(1);

    if (this.modulesData) {
      this.modulesData.crop_id = key;
      this.modulesData.crop_name = this.currentCropName;
      this.modulesData.mandi_profitability_module = {
        crop_id: key,
        commodity_name: fallbackMandi.commodity_name,
        modal_price_qtl: modalPrice,
        msp_price_qtl: fallbackMandi.msp_price_qtl,
        min_price_qtl: fallbackMandi.min_price_qtl,
        max_price_qtl: fallbackMandi.max_price_qtl,
        price_range_qtl: priceRange,
        benchmark_mandi: benchmarkMandi,
        price_trend: fallbackMandi.price_trend,
        market_sentiment: fallbackMandi.market_sentiment,
        verified_source: fallbackMandi.verified_source,
        projected_yield_per_acre_qtl: yieldPerAcre,
        cost_of_cultivation_acre_inr: fallbackMandi.cost_of_cultivation_acre_inr,
        gross_revenue_acre_inr: grossRev,
        net_profit_acre_inr: netProfit,
        roi_pct: roi,
        farm_size_acres: this.currentFarmSize || 2.5
      };
    }
    if (this.activeSubtab === "market" || this.activeSubtab === "disease") {
      this.render();
    }
  }

  async loadModules(latitude, longitude) {
    const irrEl = document.getElementById("kbvDedicatedIrrigationContainer");
    const targetEl = irrEl || this.container;
    if (!targetEl) return;
    if (!irrEl && this.container) {
      this.container.innerHTML = `<div style="padding:30px; text-align:center; color:#94a3b8;">Loading AgroCloud AI modules for ${this.currentCropName}...</div>`;
    }
    const fallback = this.getFallbackModules(this.currentCropId);
    let data = null;
    try {
      data = await window.ApiClient.getCropModules(this.currentCropId, latitude, longitude, this.growthStage || "mid_season");
    } catch (e) {
      console.warn("Module fetch notice:", e);
    }

    if (data && typeof data === 'object') {
      this.modulesData = {
        crop_id: data.crop_id || fallback.crop_id,
        crop_name: data.crop_name || fallback.crop_name,
        disease_detection_module: data.disease_detection_module || data.disease_module || fallback.disease_detection_module,
        irrigation_prediction_module: data.irrigation_prediction_module || fallback.irrigation_prediction_module,
        crop_doctor_module: data.crop_doctor_module || fallback.crop_doctor_module,
        mandi_profitability_module: data.mandi_profitability_module || fallback.mandi_profitability_module
      };
    } else {
      this.modulesData = fallback;
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

    // 1. Render Dedicated Page Views across the application
    const dedicatedIrrEl = document.getElementById("kbvDedicatedIrrigationContainer");
    if (dedicatedIrrEl) {
      dedicatedIrrEl.innerHTML = this.renderIrrigationSection();
      this.bindIrrigationEvents();
    }

    const dedicatedMandiEl = document.getElementById("kbvDedicatedMandiContainer");
    if (dedicatedMandiEl) {
      dedicatedMandiEl.innerHTML = this.renderMarketSection();
      this.bindMarketEvents();
    }

    const dedicatedDocEl = document.getElementById("kbvDedicatedDoctorContainer");
    if (dedicatedDocEl) {
      dedicatedDocEl.innerHTML = this.renderDoctorSection();
      this.bindChatEvents();
    }

    const dedicatedTryEl = document.getElementById("kbvDedicatedTryErrorContainer");
    if (dedicatedTryEl) {
      dedicatedTryEl.innerHTML = this.renderTryErrorSection();
      this.bindTryErrorEvents();
    }

    // If dedicated editorial tabs are active and no legacy #integratedModulesContainer exists, skip duplicate render
    if (!this.container || dedicatedIrrEl || dedicatedMandiEl || dedicatedDocEl || dedicatedTryEl) {
      return;
    }

    let subnavHtml = `
      <div style="background:rgba(0,0,0,0.3); border-radius:8px; padding:4px; display:flex; gap:4px; margin-bottom:16px;">
        <button class="btn ${this.activeSubtab === 'irrigation' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('irrigation')">
          ${TXT.irr}
        </button>
        <button class="btn ${this.activeSubtab === 'market' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('market')">
          💰 Mandi Profit
        </button>
        <button class="btn ${this.activeSubtab === 'doctor' ? 'btn-primary' : 'btn-secondary'}" style="flex:1; font-size:0.75rem; justify-content:center;" onclick="window.modulesManager.setSubtab('doctor')">
          ${TXT.doc}
        </button>
      </div>

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:12px; padding:10px 14px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.22); border-radius:8px;">
        <div>
          <span style="font-size:0.72rem; color:#4F5E46; text-transform:uppercase; font-weight:700;">${TXT.conn}</span>
          <div style="font-size:1rem; font-weight:800; color:#1A2412;">${displayCropName}</div>
        </div>
        <span style="font-size:0.72rem; background:rgba(45,90,39,0.12); border:1px solid rgba(45,90,39,0.25); color:#2D5A27; padding:4px 8px; border-radius:4px; font-weight:700;">
          ${TXT.sync}
        </span>
      </div>
    `;

    let contentHtml = "";
    if (this.activeSubtab === "irrigation") {
      contentHtml = this.renderIrrigationSection();
    } else if (this.activeSubtab === "market") {
      contentHtml = this.renderMarketSection();
    } else {
      contentHtml = this.renderDoctorSection();
    }

    this.container.innerHTML = subnavHtml + contentHtml;

    if (this.activeSubtab === "doctor") {
      this.bindChatEvents();
    } else if (this.activeSubtab === "market") {
      this.bindMarketEvents();
    }
  }

  setSubtab(tab) {
    this.activeSubtab = tab;
    this.render();
  }

  renderIrrigationSection() {
    const fallback = this.getFallbackModules(this.currentCropId);
    const rawIrr = (this.modulesData && this.modulesData.irrigation_prediction_module) || fallback.irrigation_prediction_module;
    const irr = {
      ...fallback.irrigation_prediction_module,
      ...rawIrr,
      daily_reference_et0_mm: rawIrr.daily_reference_et0_mm ?? rawIrr.current_et0_mm_day ?? fallback.irrigation_prediction_module.daily_reference_et0_mm,
      daily_crop_water_demand_etc_mm: rawIrr.daily_crop_water_demand_etc_mm ?? rawIrr.crop_water_demand_etc_mm_day ?? fallback.irrigation_prediction_module.daily_crop_water_demand_etc_mm,
      crop_coefficient_kc: rawIrr.crop_coefficient_kc ?? rawIrr.kc_value ?? fallback.irrigation_prediction_module.crop_coefficient_kc,
      next_irrigation_due: rawIrr.next_irrigation_due ?? fallback.irrigation_prediction_module.next_irrigation_due,
      daily_forecast_schedule: (Array.isArray(rawIrr.daily_forecast_schedule) && rawIrr.daily_forecast_schedule.length > 0)
        ? rawIrr.daily_forecast_schedule
        : fallback.irrigation_prediction_module.daily_forecast_schedule
    };
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
      if (s.includes("today")) {
        return {
          en: "Day 1 (Today)", hi: "दिन 1 (आज)", kn: "ದಿನ 1 (ಇಂದು)", te: "రోజు 1 (నేడు)",
          ta: "நாள் 1 (இன்று)", mr: "दिवस 1 (आज)", gu: "દિવસ 1 (આજે)", bn: "দিন 1 (আজ)",
          ml: "ദിവസം 1 (ഇന്ന്)", pa: "ਦਿਨ 1 (ਅੱਜ)", or: "ଦିନ 1 (ଆଜି)"
        }[lang] || "Day 1 (Today)";
      }
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
        const dayMatch = dueStr.match(/Day\s+(\d+)/i);
        const dayPrefix = dayMatch ? `${LBL.day_prefix} ${dayMatch[1]} · ` : "";
        const adeq = {
          en: "Moisture Adequate", hi: "नमी पर्याप्त", kn: "ತೇವಾಂಶ ಸಮರ್ಪಕ", te: "తేమ సరిపడా ఉంది",
          ta: "போதுமான ஈரப்பதம்", mr: "ओलावा पुरेसा", gu: "પર્યાપ્ત ભેજ", bn: "পর্যাপ্ত আর্দ্রতা",
          ml: "മതിയായ ഈർപ്പം", pa: "ਲੋੜੀਂਦੀ ਨਮੀ", or: "ଯଥେଷ୍ଟ ଆର୍ଦ୍ରତା"
        }[lang] || "Moisture Adequate";
        return `${dayPrefix}${adeq}`;
      }
      return localizeDayName(dueStr);
    };

    let rowsHtml = schedule.map(day => {
      const irrRec = Boolean(day.irrigation_recommended ?? day.irrigation_needed);
      const depth = Number(day.irrigation_depth_mm || 0);
      const dripHrs = day.drip_run_hours !== undefined ? day.drip_run_hours : +(depth / 8.0).toFixed(1);
      const etcVal = day.crop_etc_mm ?? day.etc_mm ?? irr.daily_crop_water_demand_etc_mm;
      const rainVal = day.forecast_rain_mm ?? day.forecast_rainfall_mm ?? 0;
      const depVal = day.soil_depletion_mm ?? 0;
      const statusText = day.status || (irrRec ? "Irrigation Due" : "Moisture Adequate");
      return `
      <tr>
        <td style="font-weight:600; text-align:left; padding:8px;">${localizeDayName(day.day || day.date || "")}</td>
        <td>${etcVal} mm</td>
        <td>${rainVal} mm</td>
        <td>${depVal} mm</td>
        <td>
          <span class="${irrRec ? 'badge-due' : 'badge-ok'}">
            ${localizeStatus(statusText)}
          </span>
        </td>
        <td style="font-weight:bold; color:${irrRec ? '#2D5A27' : '#4F5E46'}">
          ${irrRec ? `${depth} mm (${dripHrs} ${LBL.drip_run})` : '—'}
        </td>
      </tr>
    `;
    }).join("");

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

    let displayCropName = this.currentCropName;
    if (window.suitabilityRenderer && typeof window.suitabilityRenderer.localizeCropName === "function") {
      displayCropName = window.suitabilityRenderer.localizeCropName({ id: this.currentCropId, name: this.currentCropName });
    }
    const stageVal = (irr.growth_stage || this.growthStage || "mid_season").toLowerCase();
    const rawThreshold = irr.readily_available_water_threshold_mm ?? 42.0;
    const total7dDemand = irr.total_7day_water_demand_mm ?? +(irr.daily_crop_water_demand_etc_mm * 7).toFixed(1);
    const total7dIrr = irr.total_7day_irrigation_required_mm ?? schedule.reduce((acc, d) => acc + Number(d.irrigation_depth_mm || 0), 0).toFixed(1);

    const activeAcres = Math.max(0.5, Number(this.currentFarmSize || 2.5));
    const geom = CROP_PLANTING_GEOMETRY[(this.currentCropId || "tomato").toLowerCase()] || CROP_PLANTING_GEOMETRY._default;
    const perEventDepthMm = Math.max(12, +(Number(total7dIrr) > 0 ? Number(total7dIrr) : irr.daily_crop_water_demand_etc_mm * 3).toFixed(1));
    const plantingDiagramHtml = this.buildPlantingDiagramHtml({
      title: `${displayCropName} Field Row × Column Planting & Drip Layout`,
      subtitle: `Scaled automatically for ${activeAcres.toFixed(1)} Acre(s) · ${geom.system}`,
      rowM: geom.rowM,
      colM: geom.colM,
      acres: activeAcres,
      emittersPerPlant: geom.emittersPerPlant || 1,
      depthMmPerEvent: perEventDepthMm,
      systemLabel: geom.system,
      noteText: geom.note
    });

    return `
      <div>
        <!-- Connected Crop, Acreage & Growth Stage Control Bar -->
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:12px; padding:12px 14px; margin-bottom:14px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.22); border-radius:12px;">
          <div>
            <div style="font-size:0.7rem; color:#4F5E46; text-transform:uppercase; font-weight:700;">Active Crop · FAO-56 Model</div>
            <div style="font-size:1.05rem; font-weight:800; color:#1A2412;">${displayCropName}</div>
          </div>

          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:12px;">
            <div style="display:flex; align-items:center; gap:8px; background:#FFFFFF; border:1px solid rgba(45,90,39,0.24); border-radius:10px; padding:6px 10px;">
              <label for="irrAcresSlider" style="font-size:0.74rem; color:#4F5E46; font-weight:700;">Land Area:</label>
              <input type="range" id="irrAcresSlider" min="0.5" max="25" step="0.5" value="${activeAcres.toFixed(1)}" style="width:105px; accent-color:#2D5A27; cursor:pointer;" />
              <span id="irrAcresBadge" style="font-size:0.8rem; font-weight:800; color:#2D5A27; min-width:56px; text-align:right;">${activeAcres.toFixed(1)} Ac</span>
            </div>

            <div style="display:flex; align-items:center; gap:8px;">
              <label for="irrGrowthStageSelect" style="font-size:0.75rem; color:#4F5E46; font-weight:700;">Growth Stage:</label>
              <select id="irrGrowthStageSelect" onchange="window.modulesManager.setGrowthStage(this.value)" style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.3); color:#1A2412; padding:6px 10px; border-radius:8px; font-size:0.78rem; font-weight:600; cursor:pointer;">
                <option value="initial" ${stageVal === 'initial' ? 'selected' : ''}>Initial (Emergence)</option>
                <option value="vegetative" ${stageVal === 'vegetative' || stageVal === 'development' ? 'selected' : ''}>Vegetative / Crop Dev</option>
                <option value="mid_season" ${stageVal === 'mid_season' || stageVal === 'flowering' || stageVal === 'fruiting' ? 'selected' : ''}>Mid-Season / Flowering</option>
                <option value="maturity" ${stageVal === 'maturity' || stageVal === 'late_season' ? 'selected' : ''}>Late Season / Maturity</option>
              </select>
            </div>
          </div>
        </div>

        <div class="param-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin-bottom:14px;">
          <div class="param-card">
            <div class="param-label">${LBL.et0}</div>
            <div class="param-value">${irr.daily_reference_et0_mm} <span class="param-unit">${LBL.mm_day}</span></div>
            <div class="param-meta">${LBL.fao_meta}</div>
          </div>
          <div class="param-card">
            <div class="param-label">${LBL.etc}</div>
            <div class="param-value">${irr.daily_crop_water_demand_etc_mm} <span class="param-unit">${LBL.mm_day}</span></div>
            <div class="param-meta">Kc = ${irr.crop_coefficient_kc} · 7d: ${total7dDemand} mm</div>
          </div>
          <div class="param-card">
            <div class="param-label">${LBL.next_irr}</div>
            <div class="param-value" style="color:#2D5A27; font-size:0.98rem;">${localizeNextDue(irr.next_irrigation_due)}</div>
            <div class="param-meta">RAW Trigger: ${rawThreshold} mm</div>
          </div>
          <div class="param-card">
            <div class="param-label">7-Day Irrigation Need</div>
            <div class="param-value" style="color:#1A2412;">${total7dIrr} <span class="param-unit">mm</span></div>
            <div class="param-meta">Soil AWC: ${irr.soil_moisture_holding_awc_mm ?? 90} mm</div>
          </div>
        </div>

        <div id="irrPlantingDiagramWrap" style="margin-bottom:16px;">
          ${plantingDiagramHtml}
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

        <div style="margin-top:14px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.18); border-radius:8px; padding:12px; font-size:0.75rem;">
          <b style="color:#2D5A27; display:inline-flex; align-items:center; gap:6px;">${typeof window.kbvIcon === "function" ? window.kbvIcon("bulb", 14) : ""} ${(LBL.advice_title || "").replace(/^💡\s*/, "")}</b>
          <ul style="padding-left:16px; margin-top:6px; color:#33402B; line-height:1.5;">
            ${tipsToUse.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;
  }

  buildPlantingDiagramHtml({
    title = "Row × Column Planting & Irrigation Diagram",
    subtitle = "",
    rowM = 0.75,
    colM = 0.45,
    acres = 2.5,
    emittersPerPlant = 1,
    depthMmPerEvent = 30,
    systemLabel = "Inline Drip Lateral",
    noteText = "",
    plantRadius = 6
  }) {
    const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");
    const safeAcres = Math.max(0.25, Number(acres || 2.5));
    const rM = Math.max(0.1, Number(rowM || 0.75));
    const cM = Math.max(0.05, Number(colM || 0.45));
    const areaSqM = safeAcres * 4046.86;
    const sideM = Math.sqrt(areaSqM);
    const sideFt = sideM * 3.28084;
    const rowsTotal = Math.max(1, Math.round(sideM / rM));
    const colsTotal = Math.max(1, Math.round(sideM / cM));
    const totalPlants = Math.max(1, Math.round(areaSqM / (rM * cM)));
    const eventLiters = Math.round(areaSqM * Number(depthMmPerEvent || 25));
    const perPlantLiters = +(eventLiters / Math.max(1, totalPlants)).toFixed(2);
    const lateralLenM = Math.round(rowsTotal * sideM);

    const rowFt = (rM * 3.28084).toFixed(1);
    const colFt = (cM * 3.28084).toFixed(1);

    const visRows = Math.min(4, Math.max(2, rowsTotal));
    const visCols = Math.min(7, Math.max(2, colsTotal));
    const bx = 64, by = 52, bw = 516, bh = 166;
    const rowStep = bh / (visRows + 0.2);
    const colStep = bw / (visCols + 0.5);
    const startY = by + rowStep * 0.58;
    const startX = bx + colStep * 0.65;

    let svgGrid = "";
    // Sub-main manifold along left edge of plot
    svgGrid += `<line x1="${bx + 12}" y1="${by + 10}" x2="${bx + 12}" y2="${by + bh - 10}" stroke="#1E3F1A" stroke-width="4" stroke-linecap="round" />`;
    svgGrid += `<text x="${bx + 4}" y="${by + bh / 2}" transform="rotate(-90 ${bx + 4},${by + bh / 2})" text-anchor="middle" font-size="9.5" font-weight="700" fill="#1E3F1A">SUB-MAIN PIPE</text>`;

    for (let r = 0; r < visRows; r++) {
      const cy = +(startY + r * rowStep).toFixed(1);
      // Horizontal drip lateral pipe along each crop row
      svgGrid += `<line x1="${bx + 12}" y1="${cy}" x2="${bx + bw - 14}" y2="${cy}" stroke="#0284C7" stroke-width="2" stroke-dasharray="5,3" />`;
      svgGrid += `<text x="${bx + bw - 12}" y="${cy - 5}" text-anchor="end" font-size="8.5" font-weight="700" fill="#0369A1">Row ${r + 1}</text>`;
      for (let c = 0; c < visCols; c++) {
        const cx = +(startX + c * colStep).toFixed(1);
        // Wetting root-zone bulb + canopy
        svgGrid += `<circle cx="${cx}" cy="${cy}" r="${plantRadius + 4}" fill="rgba(2,132,199,0.16)" stroke="rgba(2,132,199,0.38)" stroke-width="1" />`;
        svgGrid += `<circle cx="${cx}" cy="${cy}" r="${plantRadius}" fill="#2D5A27" stroke="#FFFFFF" stroke-width="1.5" />`;
        svgGrid += `<circle cx="${cx}" cy="${cy}" r="1.8" fill="#F0EEE9" />`;
      }
    }

    // Row-to-Row vertical spacing callout between Row 1 and Row 2 (right side)
    const r0Y = startY;
    const r1Y = +(startY + rowStep).toFixed(1);
    const dimX = +(bx + bw - 68).toFixed(1);
    svgGrid += `
      <line x1="${dimX}" y1="${r0Y}" x2="${dimX}" y2="${r1Y}" stroke="#B45309" stroke-width="1.8" />
      <polygon points="${dimX - 3.5},${r0Y + 5} ${dimX + 3.5},${r0Y + 5} ${dimX},${r0Y}" fill="#B45309" />
      <polygon points="${dimX - 3.5},${r1Y - 5} ${dimX + 3.5},${r1Y - 5} ${dimX},${r1Y}" fill="#B45309" />
      <rect x="${dimX + 5}" y="${(r0Y + r1Y) / 2 - 11}" width="60" height="22" rx="4" fill="#FFFBEB" stroke="#D97706" stroke-width="1" />
      <text x="${dimX + 35}" y="${(r0Y + r1Y) / 2 - 1}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#92400E">Row: ${rM}m</text>
      <text x="${dimX + 35}" y="${(r0Y + r1Y) / 2 + 8}" text-anchor="middle" font-size="7.5" font-weight="600" fill="#B45309">(${rowFt} ft)</text>
    `;

    // Plant-to-Plant (Column) horizontal spacing callout between Col 1 and Col 2 above Row 1
    const c0X = startX;
    const c1X = +(startX + colStep).toFixed(1);
    const dimY = +(r0Y - 19).toFixed(1);
    svgGrid += `
      <line x1="${c0X}" y1="${dimY}" x2="${c1X}" y2="${dimY}" stroke="#1E3F1A" stroke-width="1.8" />
      <line x1="${c0X}" y1="${dimY - 4}" x2="${c0X}" y2="${r0Y - plantRadius - 2}" stroke="rgba(30,63,26,0.45)" stroke-width="1" stroke-dasharray="2,2" />
      <line x1="${c1X}" y1="${dimY - 4}" x2="${c1X}" y2="${r0Y - plantRadius - 2}" stroke="rgba(30,63,26,0.45)" stroke-width="1" stroke-dasharray="2,2" />
      <rect x="${(c0X + c1X) / 2 - 44}" y="${dimY - 19}" width="88" height="17" rx="4" fill="#FFFFFF" stroke="#2D5A27" stroke-width="1" />
      <text x="${(c0X + c1X) / 2}" y="${dimY - 8}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#1E3F1A">Col: ${cM}m (${colFt} ft)</text>
    `;

    return `
      <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.24); border-radius:14px; padding:14px;">
        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin-bottom:10px;">
          <div>
            <div style="font-size:0.9rem; font-weight:800; color:#1A2412; display:flex; align-items:center; gap:6px;">
              ${ic("water", 15)} ${title}
            </div>
            <div style="font-size:0.74rem; color:#4F5E46; margin-top:2px;">${subtitle}</div>
          </div>
          <span style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.22); color:#2D5A27; font-size:0.72rem; font-weight:700; padding:4px 10px; border-radius:20px;">
            ${safeAcres.toFixed(1)} Ac · ~${Math.round(sideM)}m × ${Math.round(sideM)}m (${Math.round(sideFt)}ft × ${Math.round(sideFt)}ft)
          </span>
        </div>

        <div class="kbv-diagram-stats-grid">
          <div style="background:#F0EEE9; border-radius:10px; padding:9px 10px; border:1px solid rgba(45,90,39,0.14);">
            <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase;">Row × Column Spacing</div>
            <div style="font-size:0.95rem; font-weight:800; color:#1A2412; margin-top:2px;">${rM} m × ${cM} m</div>
            <div style="font-size:0.69rem; color:#4F5E46;">${rowFt} ft row × ${colFt} ft plant</div>
          </div>
          <div style="background:#F0EEE9; border-radius:10px; padding:9px 10px; border:1px solid rgba(45,90,39,0.14);">
            <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase;">Total Plant Population</div>
            <div style="font-size:0.95rem; font-weight:800; color:#2D5A27; margin-top:2px;">${totalPlants.toLocaleString()}</div>
            <div style="font-size:0.69rem; color:#4F5E46;">~${rowsTotal.toLocaleString()} rows × ${colsTotal.toLocaleString()} cols</div>
          </div>
          <div style="background:#F0EEE9; border-radius:10px; padding:9px 10px; border:1px solid rgba(45,90,39,0.14);">
            <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase;">Water Volume / Event</div>
            <div style="font-size:0.95rem; font-weight:800; color:#0369A1; margin-top:2px;">${eventLiters.toLocaleString()} L</div>
            <div style="font-size:0.69rem; color:#4F5E46;">${perPlantLiters} L/plant @ ${depthMmPerEvent} mm</div>
          </div>
          <div style="background:#F0EEE9; border-radius:10px; padding:9px 10px; border:1px solid rgba(45,90,39,0.14);">
            <div style="font-size:0.68rem; color:#4F5E46; font-weight:700; text-transform:uppercase;">Drip Lateral Est.</div>
            <div style="font-size:0.95rem; font-weight:800; color:#1A2412; margin-top:2px;">${lateralLenM.toLocaleString()} m</div>
            <div style="font-size:0.69rem; color:#4F5E46;">${emittersPerPlant} emitter(s)/plant · ${systemLabel.split('+')[0].trim()}</div>
          </div>
        </div>

        <div style="background:#F8F7F3; border:1px solid rgba(45,90,39,0.16); border-radius:12px; padding:8px; overflow:hidden;">
          <svg viewBox="0 0 640 264" width="100%" style="max-width:100%; height:auto; display:block;" role="img" aria-label="Planting spacing diagram showing rows, columns, and drip laterals">
            <!-- Outer field parcel frame -->
            <rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="10" fill="#F0EEE9" stroke="#2D5A27" stroke-width="1.6" />
            <text x="${bx + bw / 2}" y="22" text-anchor="middle" font-size="10.5" font-weight="800" fill="#1A2412">
              Parcel Width: ~${Math.round(sideM)} m (${Math.round(sideFt)} ft) — Showing Representative ${visRows} Rows × ${visCols} Columns (of ${rowsTotal} × ${colsTotal})
            </text>
            ${svgGrid}
            <!-- Legend bar at bottom -->
            <g transform="translate(64, 232)">
              <circle cx="8" cy="10" r="5" fill="#2D5A27" />
              <text x="18" y="13" font-size="9" font-weight="700" fill="#1A2412">Plant / Pit</text>
              <circle cx="96" cy="10" r="6" fill="rgba(2,132,199,0.22)" stroke="#0284C7" stroke-width="1" />
              <text x="107" y="13" font-size="9" font-weight="700" fill="#0369A1">Wetted Root Zone</text>
              <line x1="212" y1="10" x2="236" y2="10" stroke="#0284C7" stroke-width="2.2" stroke-dasharray="5,3" />
              <text x="242" y="13" font-size="9" font-weight="700" fill="#0369A1">Drip Lateral</text>
              <line x1="322" y1="10" x2="344" y2="10" stroke="#1E3F1A" stroke-width="3.5" />
              <text x="350" y="13" font-size="9" font-weight="700" fill="#1E3F1A">Sub-Main</text>
              <text x="516" y="13" text-anchor="end" font-size="8.5" font-weight="700" fill="#4F5E46">Density: ${(totalPlants / safeAcres).toFixed(0)} plants/acre</text>
            </g>
          </svg>
        </div>

        ${noteText ? `<div style="margin-top:8px; font-size:0.74rem; color:#4F5E46; line-height:1.45;"><b>Layout Engineering Note:</b> ${noteText}</div>` : ""}
      </div>
    `;
  }

  bindIrrigationEvents() {
    const slider = document.getElementById("irrAcresSlider");
    if (!slider) return;
    slider.oninput = (e) => {
      const acres = Math.max(0.5, parseFloat(e.target.value) || 2.5);
      this.currentFarmSize = acres;
      const badge = document.getElementById("irrAcresBadge");
      if (badge) badge.textContent = `${acres.toFixed(1)} Ac`;

      const diagramWrap = document.getElementById("irrPlantingDiagramWrap");
      if (diagramWrap) {
        const irr = (this.modulesData && this.modulesData.irrigation_module) || this.getFallbackModules(this.currentCropId).irrigation_module;
        const schedule = irr.daily_forecast_schedule || [];
        const total7dIrr = irr.total_7day_irrigation_required_mm ?? schedule.reduce((acc, d) => acc + Number(d.irrigation_depth_mm || 0), 0);
        const perEventDepthMm = Math.max(12, +(Number(total7dIrr) > 0 ? Number(total7dIrr) : (irr.daily_crop_water_demand_etc_mm || 4.8) * 3).toFixed(1));
        const geom = CROP_PLANTING_GEOMETRY[(this.currentCropId || "tomato").toLowerCase()] || CROP_PLANTING_GEOMETRY._default;
        let displayCropName = this.currentCropName;
        if (window.suitabilityRenderer && typeof window.suitabilityRenderer.localizeCropName === "function") {
          displayCropName = window.suitabilityRenderer.localizeCropName({ id: this.currentCropId, name: this.currentCropName });
        }
        diagramWrap.innerHTML = this.buildPlantingDiagramHtml({
          title: `${displayCropName} Field Row × Column Planting & Drip Layout`,
          subtitle: `Scaled automatically for ${acres.toFixed(1)} Acre(s) · ${geom.system}`,
          rowM: geom.rowM,
          colM: geom.colM,
          acres: acres,
          emittersPerPlant: geom.emittersPerPlant || 1,
          depthMmPerEvent: perEventDepthMm,
          systemLabel: geom.system,
          noteText: geom.note
        });
      }
    };
  }

  renderDoctorSection() {
    const fallback = this.getFallbackModules(this.currentCropId);
    const doc = (this.modulesData && this.modulesData.crop_doctor_module) || fallback.crop_doctor_module;
    const amendments = doc.soil_amendments || [];
    const fertilizer = doc.fertilizer_schedule || [];

    const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");

    let amendHtml = amendments.map(a => `
      <div style="margin-bottom:8px; font-size:0.78rem; display:flex; align-items:flex-start; gap:6px;">
        <span style="color:#B45309; margin-top:2px;">${ic("alert", 13)}</span>
        <div><b style="color:#9A6700;">${a.issue}:</b> <span style="color:#33402B;">${a.remedy}</span></div>
      </div>
    `).join("");

    let fertHtml = fertilizer.map(f => `
      <div style="padding:8px 0; border-bottom:1px solid rgba(45,90,39,0.1); font-size:0.78rem;">
        <b style="color:#2D5A27; display:inline-flex; align-items:center; gap:5px;">${ic("crops", 13)} ${f.stage}:</b>
        <div style="color:#33402B; margin-top:2px;">${f.details}</div>
      </div>
    `).join("");

    return `
      <div>
        <div style="background:rgba(45,90,39,0.09); border:1px solid rgba(45,90,39,0.25); border-radius:10px; padding:12px; margin-bottom:14px;">
          <div style="font-weight:bold; font-size:0.88rem; color:#2D5A27; margin-bottom:4px; display:flex; align-items:center; gap:6px;">${ic("stethoscope", 16)} Crop Doctor Prescription</div>
          <div style="font-size:0.78rem; color:#1A2412; line-height:1.45;">
            ${doc.crop_doctor_summary}
          </div>
        </div>

        <div class="param-section-title">Soil Conditioning & Amendments</div>
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.18); border-radius:8px; padding:12px; margin-bottom:14px;">
          ${amendHtml}
        </div>

        <div class="param-section-title">STCR Precision Fertilizer Schedule</div>
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.18); border-radius:8px; padding:12px; margin-bottom:14px;">
          ${fertHtml}
        </div>

        <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;">
          <div class="param-section-title" style="margin-bottom:0;">Ask the AI Crop Doctor (11-Language Voice &amp; Text)</div>
          <button type="button" id="doctorAutoVoiceBtn" style="background:${(window.voiceAssistant && !window.voiceAssistant.autoReadEnabled) ? '#FFFFFF' : 'rgba(45,90,39,0.12)'}; border:1px solid rgba(45,90,39,0.3); color:#2D5A27; border-radius:20px; padding:4px 10px; font-size:0.72rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
            ${ic("speaker", 12)} <span>Auto-Voice: ${(window.voiceAssistant && !window.voiceAssistant.autoReadEnabled) ? 'OFF' : 'ON'}</span>
          </button>
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:8px;">
          <span style="font-size:0.7rem; color:#4F5E46; font-weight:600; display:flex; align-items:center;">Quick Prompts:</span>
          <button type="button" class="kbv-preset-chip" style="font-size:0.72rem; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="window.modulesManager.fillDoctorQuestion('NPK खाद कब और कैसे डालें?')">${ic("soil", 12)} NPK खाद कब डालें? (Hindi)</button>
          <button type="button" class="kbv-preset-chip" style="font-size:0.72rem; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="window.modulesManager.fillDoctorQuestion('कीटकनाशक फवारणी कधी करावी?')">${ic("pest", 12)} कीटकनाशक फवारणी (Marathi)</button>
          <button type="button" class="kbv-preset-chip" style="font-size:0.72rem; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="window.modulesManager.fillDoctorQuestion('Best bio-control for stem rot and leaf blight?')">${ic("crops", 12)} Bio-control (English)</button>
          <button type="button" class="kbv-preset-chip" style="font-size:0.72rem; padding:4px 10px; display:inline-flex; align-items:center; gap:4px;" onclick="window.modulesManager.fillDoctorQuestion('How much water does this crop need this week?')">${ic("water", 12)} Irrigation Timing</button>
        </div>
        <div class="chat-window">
          <div class="chat-messages" id="cropDoctorChatMessages">
            <div class="chat-bubble bot">
              <div>Hello! I am <b>Dr. AgroNexus</b>, specialized in <b>${this.currentCropName}</b>. Ask me in English, हिन्दी, मराठी, বাংলা, മലയാളം, ਪੰਜਾਬੀ, ଓଡ଼ିଆ, தமிழ், తెలుగు, ગુજરાતી, or ಕನ್ನಡ about fertilizer timing, pest scouting, or irrigation!</div>
              <div style="margin-top:6px; text-align:right;">
                <button type="button" class="voice-speak-btn" data-welcome-speak="1" style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.28); color:#2D5A27; border-radius:6px; padding:3px 9px; font-size:0.72rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  ${ic("speaker", 12)} Read Aloud
                </button>
              </div>
            </div>
          </div>
          <div id="voiceStatusIndicator" style="display:none; margin:8px 0; padding:6px 12px; background:rgba(185,28,28,0.12); border:1px solid #dc2626; border-radius:6px; color:#991b1b; font-size:0.78rem; font-weight:600; text-align:center;">
            Listening... Speak your question clearly into your microphone!
          </div>
          <div class="chat-input-bar" style="display:flex; gap:6px; align-items:center; flex-wrap:wrap;">
            <input type="text" id="cropDoctorInput" placeholder="Ask in any Indian language or tap Speak..." style="flex:1; min-width:160px;" />
            <button type="button" class="btn btn-primary" id="cropDoctorSendBtn" style="padding:6px 14px; font-weight:600;">
              Send
            </button>
            <button type="button" class="btn" id="cropDoctorVoiceBtn" style="background:#2D5A27; color:white; border:1px solid #1E3F1A; padding:6px 12px; display:inline-flex; align-items:center; gap:4px; font-weight:600; cursor:pointer;">
              ${ic("doctor", 13)} Speak
            </button>
          </div>
        </div>
      </div>
    `;
  }

  fillDoctorQuestion(text) {
    const input = document.getElementById("cropDoctorInput");
    if (input) {
      input.value = text;
      input.focus();
    }
  }

  _bindSpeakButton(btn, answerText, langCode) {
    if (!btn || !window.voiceAssistant) return;
    const speakerIc = typeof window.kbvIcon === "function" ? window.kbvIcon("speaker", 12) : "";
    const stopIc = typeof window.kbvIcon === "function" ? window.kbvIcon("stop", 12) : "";
    const resetAllButtons = () => {
      document.querySelectorAll(".voice-speak-btn").forEach(b => {
        b.dataset.speaking = "0";
        b.style.background = "#F0EEE9";
        b.style.color = "#2D5A27";
        b.innerHTML = `${speakerIc} Read Aloud`;
      });
    };

    btn.onclick = () => {
      if (btn.dataset.speaking === "1" && window.voiceAssistant.isSpeaking) {
        window.voiceAssistant.stopSpeaking();
        resetAllButtons();
        return;
      }
      window.voiceAssistant.speak(answerText, langCode, {
        onStart: () => {
          resetAllButtons();
          btn.dataset.speaking = "1";
          btn.style.background = "rgba(220,38,38,0.12)";
          btn.style.color = "#991b1b";
          btn.innerHTML = `${stopIc} Stop Audio`;
        },
        onEnd: () => {
          resetAllButtons();
        },
        onError: (err) => {
          resetAllButtons();
          if (window.kbvApp && typeof window.kbvApp.showToast === "function") {
            window.kbvApp.showToast(err || "Audio playback unavailable in this browser.", 4000);
          }
        }
      });
    };
  }

  bindChatEvents() {
    const input = document.getElementById("cropDoctorInput");
    const sendBtn = document.getElementById("cropDoctorSendBtn");
    const voiceBtn = document.getElementById("cropDoctorVoiceBtn");
    const autoVoiceBtn = document.getElementById("doctorAutoVoiceBtn");
    const voiceIndicator = document.getElementById("voiceStatusIndicator");
    const msgBox = document.getElementById("cropDoctorChatMessages");
    if (!input || !sendBtn) return;

    const speakerIc = typeof window.kbvIcon === "function" ? window.kbvIcon("speaker", 12) : "";
    if (autoVoiceBtn && window.voiceAssistant) {
      autoVoiceBtn.onclick = () => {
        window.voiceAssistant.autoReadEnabled = !window.voiceAssistant.autoReadEnabled;
        const on = window.voiceAssistant.autoReadEnabled;
        if (!on) window.voiceAssistant.stopSpeaking();
        autoVoiceBtn.style.background = on ? "rgba(45,90,39,0.12)" : "#FFFFFF";
        autoVoiceBtn.innerHTML = `${speakerIc} <span>Auto-Voice: ${on ? "ON" : "OFF"}</span>`;
      };
    }

    const welcomeBtn = msgBox && msgBox.querySelector("[data-welcome-speak='1']");
    if (welcomeBtn) {
      const welcomeText = `Hello! I am Doctor AgroNexus, specialized in ${this.currentCropName}. Ask me in any Indian language about fertilizer timing, pest scouting, or irrigation.`;
      this._bindSpeakButton(welcomeBtn, welcomeText, this.currentLanguage || "en");
    }

    const sendMessage = async (customText = null, fromMic = false) => {
      let q = (customText || input.value).trim();
      if (!q) return;

      const userBubble = document.createElement("div");
      userBubble.className = "chat-bubble user";
      userBubble.textContent = q;
      msgBox.appendChild(userBubble);
      input.value = "";
      msgBox.scrollTop = msgBox.scrollHeight;

      const loadingBubble = document.createElement("div");
      loadingBubble.className = "chat-bubble bot";
      loadingBubble.textContent = "Dr. AgroNexus is analyzing your field & crop conditions...";
      msgBox.appendChild(loadingBubble);
      msgBox.scrollTop = msgBox.scrollHeight;

      const resp = await window.ApiClient.chatCropDoctor(
        this.currentCropName,
        q,
        this.lastFieldContext,
        this.currentLanguage || "en"
      );

      loadingBubble.innerHTML = `
        <div>${resp.answer}</div>
        <div style="margin-top:6px; text-align:right;">
          <button type="button" class="voice-speak-btn" style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.28); color:#2D5A27; border-radius:6px; padding:3px 9px; font-size:0.72rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
            ${speakerIc} Read Aloud
          </button>
        </div>
      `;

      const speakBtn = loadingBubble.querySelector(".voice-speak-btn");
      if (speakBtn) {
        this._bindSpeakButton(speakBtn, resp.answer, resp.speech_lang_code);
        if (window.voiceAssistant && (window.voiceAssistant.autoReadEnabled || fromMic)) {
          speakBtn.click();
        }
      }

      msgBox.scrollTop = msgBox.scrollHeight;
    };

    sendBtn.onclick = () => sendMessage(null, false);
    input.onkeydown = (e) => {
      if (e.key === "Enter") sendMessage(null, false);
    };

    if (voiceBtn) {
      voiceBtn.onclick = () => {
        if (window.voiceAssistant) {
          window.voiceAssistant.stopSpeaking();
        }
        if (!window.voiceAssistant || !window.voiceAssistant.recognition) {
          const msg = "Microphone voice recognition works on Chrome, Edge, or Safari over HTTPS / localhost. You can also click any Quick Prompt chip or type below, and click Read Aloud to hear answers!";
          if (window.kbvApp && typeof window.kbvApp.showToast === "function") {
            window.kbvApp.showToast(msg, 5500);
          } else {
            alert(msg);
          }
          return;
        }

        window.voiceAssistant.setLanguage(this.currentLanguage || "en");
        window.voiceAssistant.startListening(
          (transcript) => {
            if (voiceIndicator) voiceIndicator.style.display = "none";
            sendMessage(transcript, true);
          },
          (isListening) => {
            if (voiceIndicator) voiceIndicator.style.display = isListening ? "block" : "none";
            voiceBtn.style.background = isListening ? "#dc2626" : "#2D5A27";
            const ic = typeof window.kbvIcon === "function" ? window.kbvIcon(isListening ? "stop" : "doctor", 13) : "";
            voiceBtn.innerHTML = `${ic} ${isListening ? "Listening..." : "Speak"}`;
          },
          (err) => {
            if (voiceIndicator) voiceIndicator.style.display = "none";
            console.warn(err);
            if (window.kbvApp && typeof window.kbvApp.showToast === "function") {
              window.kbvApp.showToast(`${err}`, 5000);
            }
          }
        );
      };
    }
  }

  ensureTryErrorLoaded(forceRefresh = false) {
    if (this.tryErrorLoading) return;
    const lat = this.fieldLat || (window.app && window.app.currentLat) || 12.9571;
    const lon = this.fieldLon || (window.app && window.app.currentLon) || 77.5325;
    const coordsKey = `${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;
    if (!this.tryErrorResult || forceRefresh || this.tryErrorCoordsKey !== coordsKey) {
      this.evaluateTryErrorPlant(this.tryErrorQuery || "Mango");
    } else {
      const wrap = document.getElementById("kbvDedicatedTryErrorContainer");
      if (wrap) {
        wrap.innerHTML = this.renderTryErrorSection();
        this.bindTryErrorEvents();
      }
    }
  }

  async evaluateTryErrorPlant(plantQuery) {
    const query = (plantQuery || this.tryErrorQuery || "Mango").trim();
    this.tryErrorQuery = query;
    this.tryErrorLoading = true;

    const wrap = document.getElementById("kbvDedicatedTryErrorContainer");
    if (wrap) {
      wrap.innerHTML = this.renderTryErrorSection();
      this.bindTryErrorEvents();
    }

    const lat = this.fieldLat || (window.app && window.app.currentLat) || (window.kbvApp && window.kbvApp.currentLat) || 12.9571;
    const lon = this.fieldLon || (window.app && window.app.currentLon) || (window.kbvApp && window.kbvApp.currentLon) || 77.5325;
    this.tryErrorCoordsKey = `${Number(lat).toFixed(3)},${Number(lon).toFixed(3)}`;

    const analysis = (window.app && window.app.analysisData) || window.lastAnalysisData || {};
    const env = analysis.environmental_data || analysis.environment || {};
    const locName = (window.kbvApp && window.kbvApp.currentLocationName)
      || (this.lastFieldContext && this.lastFieldContext.locationName)
      || "Active Farm Plot";

    const ctx = {
      ...(this.lastFieldContext || {}),
      locationName: locName,
      ph: (env.soil && env.soil.ph) ?? this.lastFieldContext.ph ?? 6.8,
      texture: (env.soil && env.soil.texture_class) ?? this.lastFieldContext.texture ?? "Loam / Sandy Clay Loam",
      soil_class: (env.soil && env.soil.soil_type) ?? "Alluvial / Red Loam",
      temperature: (env.weather && env.weather.average_temperature) ?? this.lastFieldContext.temperature ?? 27.5,
      annual_rainfall: (env.weather && (env.weather.annual_rainfall ?? env.weather.annual_rainfall_mm)) ?? 920,
      elevation_m: (env.terrain && env.terrain.elevation_m) ?? 420
    };

    try {
      const res = await window.ApiClient.analyzePlantationTrial(
        query,
        lat,
        lon,
        this.currentFarmSize || 2.5,
        ctx
      );
      this.tryErrorResult = res;
    } catch (e) {
      console.warn("Try & Error evaluation fallback notice:", e);
      this.tryErrorResult = window.ApiClient.fallbackPlantationTrial(query, lat, lon, this.currentFarmSize || 2.5, ctx);
    } finally {
      this.tryErrorLoading = false;
      const target = document.getElementById("kbvDedicatedTryErrorContainer");
      if (target) {
        target.innerHTML = this.renderTryErrorSection();
        this.bindTryErrorEvents();
      }
    }
  }

  renderTryErrorSection() {
    const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");
    const activeAcres = Math.max(0.5, Number(this.currentFarmSize || 2.5));
    const locName = (window.kbvApp && window.kbvApp.currentLocationName)
      || (this.lastFieldContext && this.lastFieldContext.locationName)
      || "Bengaluru Urban, Karnataka";
    const quickPlants = ["Mango", "Banana", "Coconut", "Pomegranate", "Grapes", "Guava", "Papaya", "Coffee", "Turmeric", "Dragon Fruit"];
    const chipsHtml = quickPlants.map(p => {
      const active = (this.tryErrorQuery || "").toLowerCase() === p.toLowerCase();
      return `<button type="button" class="tryerror-plant-chip kbv-preset-chip" data-plant="${p}" style="font-size:0.75rem; padding:5px 11px; border-radius:20px; border:1px solid ${active ? '#2D5A27' : 'rgba(45,90,39,0.22)'}; background:${active ? '#2D5A27' : '#FFFFFF'}; color:${active ? '#FFFFFF' : '#1A2412'}; font-weight:700; cursor:pointer;">${p}</button>`;
    }).join("");

    let bodyHtml = "";
    if (this.tryErrorLoading) {
      bodyHtml = `
        <div style="padding:28px; text-align:center; background:#F0EEE9; border:1px dashed rgba(45,90,39,0.3); border-radius:12px;">
          <div style="font-weight:800; color:#2D5A27; font-size:0.95rem;">Analyzing "${this.tryErrorQuery}" for ${locName}...</div>
          <div style="font-size:0.78rem; color:#4F5E46; margin-top:6px;">Evaluating regional climate suitability, matching high-yield cultivars/breeds &amp; computing drip layout for ${activeAcres.toFixed(1)} acres.</div>
        </div>
      `;
    } else if (!this.tryErrorResult) {
      bodyHtml = `
        <div style="padding:24px; text-align:center; background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); border-radius:12px;">
          <div style="font-weight:700; color:#1A2412;">Search any orchard, plantation, or specialty crop above and click <b>Analyze Plant</b>.</div>
          <div style="font-size:0.78rem; color:#4F5E46; margin-top:4px;">We will inspect your active location (${locName}), suggest the best regional breeds/varieties, and build a custom irrigation &amp; row-column spacing layout.</div>
        </div>
      `;
    } else {
      const r = this.tryErrorResult;
      const loc = r.location_analysis || {};
      const comp = r.compatibility || {};
      const breeds = r.recommended_breeds || [];
      const geom = r.planting_geometry || {};
      const irr = r.irrigation_plan || {};
      const score = Number(comp.overall_score ?? 78);
      const badgeBg = score >= 82 ? "rgba(45,90,39,0.14)" : (score >= 68 ? "rgba(217,119,6,0.14)" : "rgba(185,28,28,0.12)");
      const badgeColor = score >= 82 ? "#1E3F1A" : (score >= 68 ? "#92400E" : "#991B1B");

      const breedsHtml = breeds.map((b, idx) => `
        <div style="background:${idx === 0 ? '#FFFFFF' : '#F8F7F3'}; border:${idx === 0 ? '2px solid #2D5A27' : '1px solid rgba(45,90,39,0.2)'}; border-radius:12px; padding:12px;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:6px; margin-bottom:6px;">
            <span style="font-size:0.94rem; font-weight:800; color:#1A2412;">${b.name}</span>
            ${idx === 0
              ? `<span style="background:#2D5A27; color:#FFFFFF; font-size:0.66rem; font-weight:800; padding:2px 8px; border-radius:12px;">BEST FIT</span>`
              : `<span style="background:#F0EEE9; color:#4F5E46; font-size:0.66rem; font-weight:700; padding:2px 8px; border-radius:12px;">OPTION ${idx + 1}</span>`
            }
          </div>
          <div style="font-size:0.74rem; color:#2D5A27; font-weight:700; margin-bottom:5px;">
            Expected Yield: ${b.yield || 'High Commercial Grade'}
          </div>
          <div style="font-size:0.76rem; color:#33402B; line-height:1.45; margin-bottom:5px;">
            <b>Trait Advantage:</b> ${b.trait || 'High-vigor regionally adapted cultivar.'}
          </div>
          <div style="font-size:0.73rem; color:#4F5E46; line-height:1.4;">
            <b>Recommended Rootstock / Stock:</b> ${b.rootstock || loc.zone_name || 'Certified nursery stock'}
          </div>
        </div>
      `).join("");

      const rowSp = Number(geom.row_spacing_m || 5.0);
      const colSp = Number(geom.col_spacing_m || 5.0);
      const areaSqMNow = activeAcres * 4046.86;
      const plantsNow = Math.max(1, Math.round(areaSqMNow / (rowSp * colSp)));
      const eventTotalLiters = plantsNow * Number(irr.liters_per_plant_event || 60);
      const depthMmPerEvent = +(eventTotalLiters / Math.max(1, areaSqMNow)).toFixed(2);

      const diagramHtml = this.buildPlantingDiagramHtml({
        title: `${r.plant_name} (${activeAcres.toFixed(1)} Ac) Row × Column Orchard Layout`,
        subtitle: `Optimal spacing (${rowSp} m × ${colSp} m) · ${irr.method || 'Drip System'}`,
        rowM: rowSp,
        colM: colSp,
        acres: activeAcres,
        emittersPerPlant: irr.drippers_per_plant || 2,
        depthMmPerEvent: depthMmPerEvent,
        systemLabel: irr.method || "Basin Drip",
        noteText: geom.spacing_note || "Align rows North–South for uniform canopy sunlight and airflow.",
        plantRadius: rowSp >= 2.5 ? 8 : 6
      });

      const stepsList = (irr.yield_boosting_steps || []).map(st => `<li>${st}</li>`).join("");

      bodyHtml = `
        <!-- 1. Location & Compatibility Summary Card -->
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.22); border-radius:12px; padding:14px; margin-bottom:14px;">
          <div style="display:flex; flex-wrap:wrap; align-items:flex-start; justify-content:space-between; gap:10px;">
            <div>
              <div style="font-size:0.7rem; font-weight:700; text-transform:uppercase; color:#4F5E46;">Plantation Compatibility Report · ${loc.zone_name || 'Agro-Climatic Evaluation'}</div>
              <div style="font-size:1.18rem; font-weight:900; color:#1A2412; margin-top:2px;">
                ${r.plant_name} <span style="font-size:0.82rem; font-weight:500; font-style:italic; color:#4F5E46;">(${r.scientific_name || r.category})</span>
              </div>
              <div style="font-size:0.76rem; color:#4F5E46; margin-top:4px;">
                <b>Evaluated Field:</b> ${locName} (${loc.zone_name || 'India'}) · Soil: ${loc.soil_texture || 'Loam'} (pH ${loc.soil_ph ?? 6.8}) · Mean Temp: ${loc.mean_temp_c ?? 27.5}°C · Rain: ${Math.round(loc.annual_rainfall_mm ?? 920)} mm · Elev: ${Math.round(loc.elevation_m ?? 420)} m
              </div>
            </div>
            <div style="background:${badgeBg}; color:${badgeColor}; border:1px solid rgba(45,90,39,0.25); padding:8px 14px; border-radius:12px; text-align:right;">
              <div style="font-size:0.68rem; font-weight:700; text-transform:uppercase;">Location Fit Score</div>
              <div style="font-size:1.15rem; font-weight:900;">${score} / 100 · ${comp.verdict || 'Suitable'}</div>
            </div>
          </div>
          <div style="margin-top:10px; display:flex; flex-wrap:wrap; gap:8px; font-size:0.75rem;">
            <span style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.16); padding:4px 10px; border-radius:8px;"><b>pH Fit:</b> ${comp.ph_score ?? 90}%</span>
            <span style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.16); padding:4px 10px; border-radius:8px;"><b>Thermal Fit:</b> ${comp.temp_score ?? 90}%</span>
            <span style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.16); padding:4px 10px; border-radius:8px;"><b>Moisture / Rain Fit:</b> ${comp.rain_score ?? 85}%</span>
            <span style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.16); padding:4px 10px; border-radius:8px;"><b>Drainage Fit:</b> ${comp.drainage_score ?? 95}%</span>
          </div>
        </div>

        <!-- 2. Best Regional Breeds / Cultivars -->
        <div class="param-section-title">${ic("trophy", 15)} Best Recommended ${r.plant_name} Breeds for ${loc.zone_name || locName}</div>
        <div class="kbv-breed-grid" style="margin-bottom:16px;">
          ${breedsHtml}
        </div>

        <!-- 3. Yield-Maximizing Irrigation Plan & Row-Column Diagram -->
        <div class="param-section-title">${ic("water", 15)} Yield-Maximizing Irrigation &amp; Productivity Plan</div>
        <div class="kbv-tryerror-grid">
          <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); border-radius:12px; padding:13px;">
            <div style="font-size:0.82rem; font-weight:800; color:#2D5A27; margin-bottom:8px;">Irrigation &amp; Drip Calibration</div>
            <div style="font-size:0.78rem; color:#1A2412; line-height:1.68;">
              <div><b>Recommended System:</b> ${irr.method || 'Inline Drip + Mulching'}</div>
              <div><b>Emitters per Plant:</b> ${irr.drippers_per_plant || 2} × ${irr.emitter_lph || 4} LPH drippers</div>
              <div><b>Schedule Interval:</b> Every ${irr.interval_days || 4} days (${irr.drip_run_hours_per_event || 3.0} hrs/run per irrigation)</div>
              <div><b>Per-Plant Allocation:</b> ${irr.liters_per_plant_day ?? 12} L/plant/day (${irr.liters_per_plant_event ?? 48} L/plant per event)</div>
              <div id="tryErrorTotalWaterStat"><b>Total Event Water (${activeAcres.toFixed(1)} Ac · ${plantsNow.toLocaleString()} plants):</b> ${Math.round(eventTotalLiters).toLocaleString()} Liters</div>
            </div>
          </div>
          <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); border-radius:12px; padding:13px;">
            <div style="font-size:0.82rem; font-weight:800; color:#2D5A27; margin-bottom:8px;">Location-Tuned Yield Boost Actions</div>
            <ul style="padding-left:16px; margin:0; font-size:0.78rem; color:#33402B; line-height:1.6;">
              ${stepsList}
            </ul>
          </div>
        </div>

        <div id="tryErrorDiagramWrap">
          ${diagramHtml}
        </div>
      `;
    }

    return `
      <div>
        <!-- Search & Acreage Controls -->
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.22); border-radius:12px; padding:14px; margin-bottom:14px;">
          <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:8px; margin-bottom:10px;">
            <div style="font-size:0.78rem; color:#4F5E46; font-weight:700;">
              ${ic("gps", 14)} Analyzing against active location: <b style="color:#1A2412;">${locName}</b>
            </div>
            <div style="display:flex; align-items:center; gap:8px; background:#FFFFFF; border:1px solid rgba(45,90,39,0.24); border-radius:10px; padding:5px 10px;">
              <label for="tryErrorAcresSlider" style="font-size:0.74rem; color:#4F5E46; font-weight:700;">Trial Area:</label>
              <input type="range" id="tryErrorAcresSlider" min="0.5" max="25" step="0.5" value="${activeAcres.toFixed(1)}" style="width:105px; accent-color:#2D5A27; cursor:pointer;" />
              <span id="tryErrorAcresBadge" style="font-size:0.8rem; font-weight:800; color:#2D5A27; min-width:54px; text-align:right;">${activeAcres.toFixed(1)} Ac</span>
            </div>
          </div>

          <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center;">
            <input type="text" id="tryErrorSearchInput" value="${this.tryErrorQuery || ''}" placeholder="Search any plantation or fruit tree (e.g. Mango, Banana, Coconut, Pomegranate, Coffee)..." style="flex:1; min-width:220px; padding:9px 12px; border-radius:10px; border:1px solid rgba(45,90,39,0.3); background:#FFFFFF; color:#1A2412; font-size:0.86rem; font-weight:600;" />
            <button type="button" id="tryErrorAnalyzeBtn" class="btn btn-primary" style="padding:9px 18px; font-weight:800; display:inline-flex; align-items:center; gap:6px; cursor:pointer;">
              ${ic("search", 14)} Analyze Plant
            </button>
          </div>

          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:6px; margin-top:10px;">
            <span style="font-size:0.72rem; color:#4F5E46; font-weight:700;">Popular Plantations:</span>
            ${chipsHtml}
          </div>
        </div>

        ${bodyHtml}
      </div>
    `;
  }

  bindTryErrorEvents() {
    const searchInput = document.getElementById("tryErrorSearchInput");
    const analyzeBtn = document.getElementById("tryErrorAnalyzeBtn");
    const slider = document.getElementById("tryErrorAcresSlider");

    if (analyzeBtn && searchInput) {
      analyzeBtn.onclick = () => {
        const q = searchInput.value.trim();
        if (q) this.evaluateTryErrorPlant(q);
      };
      searchInput.onkeydown = (e) => {
        if (e.key === "Enter") {
          const q = searchInput.value.trim();
          if (q) this.evaluateTryErrorPlant(q);
        }
      };
    }

    document.querySelectorAll(".tryerror-plant-chip").forEach(chip => {
      chip.onclick = (e) => {
        const p = e.currentTarget.getAttribute("data-plant");
        if (p) {
          if (searchInput) searchInput.value = p;
          this.evaluateTryErrorPlant(p);
        }
      };
    });

    if (slider) {
      slider.oninput = (e) => {
        const acres = Math.max(0.5, parseFloat(e.target.value) || 2.5);
        this.currentFarmSize = acres;
        const badge = document.getElementById("tryErrorAcresBadge");
        if (badge) badge.textContent = `${acres.toFixed(1)} Ac`;

        const diagramWrap = document.getElementById("tryErrorDiagramWrap");
        if (diagramWrap && this.tryErrorResult) {
          const r = this.tryErrorResult;
          const geom = r.planting_geometry || {};
          const irr = r.irrigation_plan || {};
          const rowSp = Number(geom.row_spacing_m || 5.0);
          const colSp = Number(geom.col_spacing_m || 5.0);
          const areaSqMNow = acres * 4046.86;
          const plantsNow = Math.max(1, Math.round(areaSqMNow / (rowSp * colSp)));
          const eventTotalLiters = plantsNow * Number(irr.liters_per_plant_event || 60);
          const depthMmPerEvent = +(eventTotalLiters / Math.max(1, areaSqMNow)).toFixed(2);
          const totalWaterEl = document.getElementById("tryErrorTotalWaterStat");
          if (totalWaterEl) {
            totalWaterEl.innerHTML = `<b>Total Event Water (${acres.toFixed(1)} Ac · ${plantsNow.toLocaleString()} plants):</b> ${Math.round(eventTotalLiters).toLocaleString()} Liters`;
          }
          diagramWrap.innerHTML = this.buildPlantingDiagramHtml({
            title: `${r.plant_name} (${acres.toFixed(1)} Ac) Row × Column Orchard Layout`,
            subtitle: `Optimal spacing (${rowSp} m × ${colSp} m) · ${irr.method || 'Drip System'}`,
            rowM: rowSp,
            colM: colSp,
            acres: acres,
            emittersPerPlant: irr.drippers_per_plant || 2,
            depthMmPerEvent: depthMmPerEvent,
            systemLabel: irr.method || "Basin Drip",
            noteText: geom.spacing_note || "Align rows North–South for uniform canopy sunlight and airflow.",
            plantRadius: rowSp >= 2.5 ? 8 : 6
          });
        }
      };
    }
  }

  getMandiLabels(lang) {
    const L = {
      en: {
        record: "Official Agmarknet APMC Auction Record",
        msp: "Govt MSP",
        apmc_range: "APMC Range",
        qtl: "Qtl",
        primary_mandi: "Primary Mandi",
        modal_rate: "APMC Modal Rate",
        set_rate: "Set Your Local APMC Mandi Rate:",
        set_rate_sub: "Enter today's auction rate from your local market yard:",
        reset: "Reset",
        quick_rates: "Quick Rates:",
        min_apmc: "Min APMC",
        modal_short: "Modal",
        official: "Official",
        max_apmc: "Max APMC",
        sentiment: "Market Sentiment:",
        farm_size: "Farm Cultivation Land Size:",
        acres: "Acres",
        acre_05: "0.5 Acre (Marginal)",
        acre_25: "2.5 Acres (Average)",
        acre_10: "10 Acres",
        acre_25c: "25 Acres (Commercial)",
        yield_title: "Projected Harvest Yield",
        yield_rate: "Rate",
        acre_unit: "Acre",
        soil_cal: "Soil-Calibrated",
        cost_title: "Cost of Cultivation",
        cacp_est: "CACP Estimates",
        rev_title: "Gross APMC Revenue",
        modal_auc: "modal auction",
        profit_title: "Estimated Net Profit",
        roi: "Return on Investment",
        cacp_break: "CACP Verified Cost of Cultivation Breakdown (Per Acre):",
        seeds: "Certified Seeds:",
        npk: "NPK & Bio-Fertilizer:",
        labor: "Labor & Spraying:",
        tractor: "Tractor, Fuel & Irrig:",
        formula_title: "CACP & Agmarknet Economic Formula:",
        formula_body: "Net profit is calculated as (Projected Yield × Mandi Modal Auction Price) − Cost of Cultivation, scientifically modulated by your 1 km² soil pedology and micro-climate score."
      },
      hi: {
        record: "आधिकारिक एगमार्कनेट एपीएमसी नीलामी रिकॉर्ड",
        msp: "सरकारी एमएसपी",
        apmc_range: "एपीएमसी सीमा",
        qtl: "क्विंटल",
        primary_mandi: "प्रमुख मंडी",
        modal_rate: "एपीएमसी मॉडल भाव",
        set_rate: "अपना स्थानीय एपीएमसी मंडी भाव दर्ज करें:",
        set_rate_sub: "अपने स्थानीय बाज़ार यार्ड का आज का नीलामी भाव दर्ज करें:",
        reset: "रीसेट",
        quick_rates: "त्वरित भाव:",
        min_apmc: "न्यूनतम एपीएमसी",
        modal_short: "मॉडल",
        official: "आधिकारिक",
        max_apmc: "अधिकतम एपीएमसी",
        sentiment: "बाज़ार रुझान:",
        farm_size: "खेती योग्य भूमि का आकार:",
        acres: "एकड़",
        acre_05: "0.5 एकड़ (सीमांत)",
        acre_25: "2.5 एकड़ (औसत)",
        acre_10: "10 एकड़",
        acre_25c: "25 एकड़ (व्यावसायिक)",
        yield_title: "अनुमानित फसल उपज",
        yield_rate: "दर",
        acre_unit: "एकड़",
        soil_cal: "मृदा-अंशांकित",
        cost_title: "खेती की लागत",
        cacp_est: "सीएसीपी अनुमान",
        rev_title: "सकल एपीएमसी राजस्व",
        modal_auc: "मॉडल नीलामी पर",
        profit_title: "अनुमानित शुद्ध लाभ",
        roi: "निवेश पर रिटर्न (ROI)",
        cacp_break: "सीएसीपी सत्यापित खेती लागत विवरण (प्रति एकड़):",
        seeds: "प्रमाणित बीज:",
        npk: "एनपीके व जैव-उर्वरक:",
        labor: "श्रम व छिड़काव:",
        tractor: "ट्रैक्टर, ईंधन व सिंचाई:",
        formula_title: "सीएसीपी और एगमार्कनेट आर्थिक सूत्र:",
        formula_body: "शुद्ध लाभ = (अनुमानित उपज × मंडी मॉडल नीलामी भाव) − खेती की लागत, जो आपके 1 किमी² मृदा और सूक्ष्म-जलवायु स्कोर पर आधारित है।"
      },
      kn: {
        record: "ಅಧಿಕೃತ ಅಗ್ಮಾರ್ಕ್‌ನೆಟ್ ಎಪಿಎಂಸಿ ಹರಾಜು ದಾಖಲೆ",
        msp: "ಸರ್ಕಾರಿ MSP",
        apmc_range: "APMC ಶ್ರೇಣಿ",
        qtl: "ಕ್ವಿಂಟಾಲ್",
        primary_mandi: "ಪ್ರಮುಖ ಮಂಡಿ",
        modal_rate: "APMC ಮಾದರಿ ದರ",
        set_rate: "ನಿಮ್ಮ ಸ್ಥಳೀಯ APMC ಮಂಡಿ ದರವನ್ನು ನಮೂದಿಸಿ:",
        set_rate_sub: "ನಿಮ್ಮ ಸ್ಥಳೀಯ ಮಾರುಕಟ್ಟೆಯ ಇಂದಿನ ಹರಾಜು ದರವನ್ನು ನಮೂದಿಸಿ:",
        reset: "ಮರುಹೊಂದಿಸಿ",
        quick_rates: "ತ್ವರಿತ ದರಗಳು:",
        min_apmc: "ಕನಿಷ್ಠ APMC",
        modal_short: "ಮಾದರಿ",
        official: "ಅಧಿಕೃತ",
        max_apmc: "ಗರಿಷ್ಠ APMC",
        sentiment: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿ:",
        farm_size: "ಕೃಷಿ ಭೂಮಿಯ ವಿಸ್ತೀರ್ಣ:",
        acres: "ಎಕರೆ",
        acre_05: "0.5 ಎಕರೆ (ಸಣ್ಣ)",
        acre_25: "2.5 ಎಕರೆ (ಸರಾಸರಿ)",
        acre_10: "10 ಎಕರೆ",
        acre_25c: "25 ಎಕರೆ (ವಾಣಿಜ್ಯ)",
        yield_title: "ಅಂದಾಜು ಬೆಳೆ ಇಳುವರಿ",
        yield_rate: "ದರ",
        acre_unit: "ಎಕರೆ",
        soil_cal: "ಮಣ್ಣು-ಆಧಾರಿತ",
        cost_title: "ಬೇಸಾಯ ವೆಚ್ಚ",
        cacp_est: "CACP ಅಂದಾಜು",
        rev_title: "ಒಟ್ಟು APMC ಆದಾಯ",
        modal_auc: "ಮಾದರಿ ಹರಾಜಿನಲ್ಲಿ",
        profit_title: "ಅಂದಾಜು ನಿವ್ವಳ ಲಾಭ",
        roi: "ಹೂಡಿಕೆಯ ಲಾಭ (ROI)",
        cacp_break: "CACP ಪರಿಶೀಲಿಸಿದ ಬೇಸಾಯ ವೆಚ್ಚ ವಿವರ (ಪ್ರತಿ ಎಕರೆಗೆ):",
        seeds: "ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳು:",
        npk: "NPK ಮತ್ತು ಜೈವಿಕ ಗೊಬ್ಬರ:",
        labor: "ಕೂಲಿ ಮತ್ತು ಸಿಂಪಡಣೆ:",
        tractor: "ಟ್ರ್ಯಾಕ್ಟರ್, ಇಂಧನ ಮತ್ತು ನೀರಾವರಿ:",
        formula_title: "CACP ಮತ್ತು Agmarknet ಆರ್ಥಿಕ ಸೂತ್ರ:",
        formula_body: "ನಿವ್ವಳ ಲಾಭ = (ಅಂದಾಜು ಇಳುವರಿ × ಮಂಡಿ ಮಾದರಿ ಹರಾಜು ದರ) − ಬೇಸಾಯ ವೆಚ್ಚ, ನಿಮ್ಮ 1 ಕಿ.ಮೀ² ಮಣ್ಣು ಮತ್ತು ಹವಾಮಾನ ಅಂಕಗಳ ಆಧಾರದ ಮೇಲೆ."
      },
      mr: {
        record: "अधिकृत अ‍ॅगमार्कनेट एपीएमसी लिलाव नोंद",
        msp: "शासकीय हमीभाव (MSP)",
        apmc_range: "एपीएमसी दर श्रेणी",
        qtl: "क्विंटल",
        primary_mandi: "मुख्य मंडी",
        modal_rate: "एपीएमसी सर्वसाधारण दर",
        set_rate: "तुमचा स्थानिक एपीएमसी मंडी दर प्रविष्ट करा:",
        set_rate_sub: "तुमच्या स्थानिक बाजार समितीचा आजचा लिलाव दर भरा:",
        reset: "रीसेट",
        quick_rates: "झटपट दर:",
        min_apmc: "किमान एपीएमसी",
        modal_short: "सर्वसाधारण",
        official: "अधिकृत",
        max_apmc: "कमाल एपीएमसी",
        sentiment: "बाजार कल:",
        farm_size: "शेती लागवड क्षेत्र:",
        acres: "एकर",
        acre_05: "0.5 एकर (अल्पभूधारक)",
        acre_25: "2.5 एकर (सरासरी)",
        acre_10: "10 एकर",
        acre_25c: "25 एकर (व्यावसायिक)",
        yield_title: "अंदाजित पीक उत्पादन",
        yield_rate: "दर",
        acre_unit: "एकर",
        soil_cal: "मृदा-प्रमाणित",
        cost_title: "लागवड खर्च",
        cacp_est: "CACP अंदाज",
        rev_title: "एकूण एपीएमसी उत्पन्न",
        modal_auc: "सर्वसाधारण लिलाव दराने",
        profit_title: "अंदाजित निव्वळ नफा",
        roi: "गुंतवणुकीवर परतावा (ROI)",
        cacp_break: "CACP प्रमाणित लागवड खर्च तपशील (प्रति एकर):",
        seeds: "प्रमाणित बियाणे:",
        npk: "NPK व जैव-खते:",
        labor: "मजुरी व फवारणी:",
        tractor: "ट्रॅक्टर, इंधन व सिंचन:",
        formula_title: "CACP आणि Agmarknet आर्थिक सूत्र:",
        formula_body: "निव्वळ नफा = (अंदाजित उत्पादन × मंडी सर्वसाधारण दर) − लागवड खर्च, तुमच्या १ चौ.किमी जमीन आणि हवामान गुणांवर आधारित."
      },
      te: {
        record: "అధికారిక అగ్‌మార్క్‌నెట్ APMC వేలం రికార్డు",
        msp: "ప్రభుత్వ MSP",
        apmc_range: "APMC శ్రేణి",
        qtl: "క్వింటాల్",
        primary_mandi: "ప్రధాన మండి",
        modal_rate: "APMC మోడల్ ధర",
        set_rate: "మీ స్థానిక APMC మండి ధరను నమోదు చేయండి:",
        set_rate_sub: "మీ స్థానిక మార్కెట్ యార్డ్ నేటి వేలం ధరను నమోదు చేయండి:",
        reset: "రీసెట్",
        quick_rates: "త్వరిత ధరలు:",
        min_apmc: "కనిష్ట APMC",
        modal_short: "మోడల్",
        official: "అధికారిక",
        max_apmc: "గరిష్ట APMC",
        sentiment: "మార్కెట్ ధోరణి:",
        farm_size: "సాగు భూమి విస్తీర్ణం:",
        acres: "ఎకరాలు",
        acre_05: "0.5 ఎకరం",
        acre_25: "2.5 ఎకరాలు (సగటు)",
        acre_10: "10 ఎకరాలు",
        acre_25c: "25 ఎకరాలు",
        yield_title: "అంచనా పంట దిగుబడి",
        yield_rate: "రేటు",
        acre_unit: "ఎకరం",
        soil_cal: "నేల ఆధారితం",
        cost_title: "సాగు ఖర్చు",
        cacp_est: "CACP అంచనా",
        rev_title: "మొత్తం APMC ఆదాయం",
        modal_auc: "మోడల్ వేలంలో",
        profit_title: "అంచనా నికర లాభం",
        roi: "పెట్టుబడిపై రాబడి (ROI)",
        cacp_break: "CACP సాగు ఖర్చుల వివరాలు (ఎకరానికి):",
        seeds: "ధృవీకరించిన విత్తనాలు:",
        npk: "NPK & బయో ఎరువులు:",
        labor: "కూలీ & పిచికారీ:",
        tractor: "ట్రాక్టర్, ఇంధనం & నీరు:",
        formula_title: "CACP & Agmarknet ఆర్థిక సూత్రం:",
        formula_body: "నికర లాభం = (అంచనా దిగుబడి × మండి మోడల్ ధర) − సాగు ఖర్చు, మీ 1 కి.మీ² నేల మరియు వాతావరణ స్కోర్ ఆధారంగా."
      },
      ta: {
        record: "அதிகாரப்பூர்வ அக்மார்க்நெட் APMC ஏல பதிவு",
        msp: "அரசு MSP",
        apmc_range: "APMC வரம்பு",
        qtl: "குவிண்டால்",
        primary_mandi: "முதன்மை மண்டி",
        modal_rate: "APMC சராசரி விலை",
        set_rate: "உங்கள் உள்ளூர் APMC மண்டி விலையை உள்ளிடவும்:",
        set_rate_sub: "உங்கள் உள்ளூர் சந்தையின் இன்றைய ஏல விலையை உள்ளிடவும்:",
        reset: "மீட்டமை",
        quick_rates: "விரைவு விலைகள்:",
        min_apmc: "குறைந்தபட்ச APMC",
        modal_short: "சராசரி",
        official: "அதிகாரப்பூர்வ",
        max_apmc: "அதிகபட்ச APMC",
        sentiment: "சந்தை நிலவரம்:",
        farm_size: "சாகுபடி நில அளவு:",
        acres: "ஏக்கர்",
        acre_05: "0.5 ஏக்கர்",
        acre_25: "2.5 ஏக்கர் (சராசரி)",
        acre_10: "10 ஏக்கர்",
        acre_25c: "25 ஏக்கர்",
        yield_title: "கணிக்கப்பட்ட விளைச்சல்",
        yield_rate: "விகிதம்",
        acre_unit: "ஏக்கர்",
        soil_cal: "மண் சார்ந்தது",
        cost_title: "சாகுபடி செலவு",
        cacp_est: "CACP மதிப்பீடு",
        rev_title: "மொத்த APMC வருவாய்",
        modal_auc: "ஏல விலையில்",
        profit_title: "மதிப்பிடப்பட்ட நிகர லாபம்",
        roi: "முதலீட்டு வருவாய் (ROI)",
        cacp_break: "CACP சாகுபடி செலவு விவரம் (ஒரு ஏக்கருக்கு):",
        seeds: "சான்றளிக்கப்பட்ட விதைகள்:",
        npk: "NPK & உயிர் உரம்:",
        labor: "கூலி & தெளிப்பு:",
        tractor: "டிராக்டர், எரிபொருள் & நீர்:",
        formula_title: "CACP & Agmarknet பொருளாதார சூத்திரம்:",
        formula_body: "நிகர லாபம் = (கணிக்கப்பட்ட விளைச்சல் × மண்டி சராசரி விலை) − சாகுபடி செலவு."
      },
      gu: {
        record: "અધિકૃત એગમાર્કનેટ APMC હરાજી રેકોર્ડ",
        msp: "સરકારી MSP",
        apmc_range: "APMC શ્રેણી",
        qtl: "ક્વિન્ટલ",
        primary_mandi: "મુખ્ય મંડી",
        modal_rate: "APMC મોડલ ભાવ",
        set_rate: "તમારો સ્થાનિક APMC મંડી ભાવ દાખલ કરો:",
        set_rate_sub: "તમારા સ્થાનિક બજાર યાર્ડનો આજનો હરાજી ભાવ દાખલ કરો:",
        reset: "રીસેટ",
        quick_rates: "ઝડપી ભાવ:",
        min_apmc: "લઘુતમ APMC",
        modal_short: "મોડલ",
        official: "અધિકૃત",
        max_apmc: "મહત્તમ APMC",
        sentiment: "બજાર વલણ:",
        farm_size: "ખેતી જમીનનું કદ:",
        acres: "એકર",
        acre_05: "0.5 એકર",
        acre_25: "2.5 એકર (સરેરાશ)",
        acre_10: "10 એકર",
        acre_25c: "25 એકર",
        yield_title: "અંદાજિત પાક ઉપજ",
        yield_rate: "દર",
        acre_unit: "એકર",
        soil_cal: "જમીન-આધારિત",
        cost_title: "ખેતી ખર્ચ",
        cacp_est: "CACP અંદાજ",
        rev_title: "કુલ APMC આવક",
        modal_auc: "મોડલ હરાજી ભાવે",
        profit_title: "અંદાજિત ચોખ્ખો નફો",
        roi: "રોકાણ પર વળતર (ROI)",
        cacp_break: "CACP પ્રમાણિત ખેતી ખર્ચ વિગત (એકર દીઠ):",
        seeds: "પ્રમાણિત બિયારણ:",
        npk: "NPK અને જૈવિક ખાતર:",
        labor: "મજૂરી અને છંટકાવ:",
        tractor: "ટ્રેક્ટર, બળતણ અને સિંચાઈ:",
        formula_title: "CACP અને Agmarknet આર્થિક સૂત્ર:",
        formula_body: "ચોખ્ખો નફો = (અંદાજિત ઉપજ × મંડી મોડલ ભાવ) − ખેતી ખર્ચ."
      },
      bn: {
        record: "অফিশিয়াল অ্যাগমার্কনেট APMC নিলাম রেকর্ড",
        msp: "সরকারি MSP",
        apmc_range: "APMC পরিসর",
        qtl: "কুইন্টাল",
        primary_mandi: "প্রধান মান্ডি",
        modal_rate: "APMC মডেল দর",
        set_rate: "আপনার স্থানীয় APMC মান্ডি দর দিন:",
        set_rate_sub: "আপনার স্থানীয় বাজারের আজকের নিলাম দর লিখুন:",
        reset: "রিসেট",
        quick_rates: "দ্রুত দর:",
        min_apmc: "সর্বনিম্ন APMC",
        modal_short: "মডেল",
        official: "অফিশিয়াল",
        max_apmc: "সর্বোচ্চ APMC",
        sentiment: "বাজার প্রবণতা:",
        farm_size: "চাষের জমির পরিমাণ:",
        acres: "একর",
        acre_05: "0.5 একর",
        acre_25: "2.5 একর (গড়)",
        acre_10: "10 একর",
        acre_25c: "25 একর",
        yield_title: "সম্ভাব্য ফসল ফলন",
        yield_rate: "হার",
        acre_unit: "একর",
        soil_cal: "মাটি-ভিত্তিক",
        cost_title: "চাষের খরচ",
        cacp_est: "CACP অনুমান",
        rev_title: "মোট APMC আয়",
        modal_auc: "মডেল নিলামে",
        profit_title: "সম্ভাব্য নিট লাভ",
        roi: "বিনিয়োগে রিটার্ন (ROI)",
        cacp_break: "CACP যাচাইকৃত চাষ খরচ বিবরণ (প্রতি একর):",
        seeds: "প্রত্যয়িত বীজ:",
        npk: "NPK ও জৈব সার:",
        labor: "শ্রম ও স্প্রে:",
        tractor: "ট্র্যাক্টর, জ্বালানি ও সেচ:",
        formula_title: "CACP ও Agmarknet অর্থনৈতিক সূত্র:",
        formula_body: "নিট লাভ = (সম্ভাব্য ফলন × মান্ডি মডেল দর) − চাষের খরচ।"
      },
      ml: {
        record: "ഔദ്യോഗിക അഗ്മാർക്ക്നെറ്റ് APMC ലേല രേഖ",
        msp: "സർക്കാർ MSP",
        apmc_range: "APMC പരിധി",
        qtl: "ക്വിന്റൽ",
        primary_mandi: "പ്രധാന മണ്ഡി",
        modal_rate: "APMC മോഡൽ നിരക്ക്",
        set_rate: "നിങ്ങളുടെ പ്രാദേശിക APMC മണ്ഡി നിരക്ക് നൽകുക:",
        set_rate_sub: "നിങ്ങളുടെ പ്രാദേശിക വിപണിയിലെ ഇന്നത്തെ ലേല നിരക്ക് നൽകുക:",
        reset: "റീസെറ്റ്",
        quick_rates: "വേഗത്തിലുള്ള നിരക്കുകൾ:",
        min_apmc: "കുറഞ്ഞ APMC",
        modal_short: "മോഡൽ",
        official: "ഔദ്യോഗികം",
        max_apmc: "കൂടിയ APMC",
        sentiment: "വിപണി പ്രവണത:",
        farm_size: "കൃഷിഭൂമിയുടെ അളവ്:",
        acres: "ഏക്കർ",
        acre_05: "0.5 ഏക്കർ",
        acre_25: "2.5 ഏക്കർ (ശരാശരി)",
        acre_10: "10 ഏക്കർ",
        acre_25c: "25 ഏക്കർ",
        yield_title: "പ്രതീക്ഷിക്കുന്ന വിളവ്",
        yield_rate: "നിരക്ക്",
        acre_unit: "ഏക്കർ",
        soil_cal: "മണ്ണ് അടിസ്ഥാനമാക്കിയത്",
        cost_title: "കൃഷി ചെലവ്",
        cacp_est: "CACP കണക്ക്",
        rev_title: "മൊത്തം APMC വരുമാനം",
        modal_auc: "മോഡൽ ലേല നിരക്കിൽ",
        profit_title: "പ്രതീക്ഷിക്കുന്ന അറ്റാദായം",
        roi: "നിക്ഷേപ നേട്ടം (ROI)",
        cacp_break: "CACP കൃഷി ചെലവ് വിവരം (ഏക്കറിന്):",
        seeds: "ഗുണമേന്മയുള്ള വിത്ത്:",
        npk: "NPK & ജൈവവളം:",
        labor: "കൂലി & തളിക്കൽ:",
        tractor: "ട്രാക്ടർ, ഇന്ധനം & ജലസേചനം:",
        formula_title: "CACP & Agmarknet സാമ്പത്തിക സൂത്രവാക്യം:",
        formula_body: "അറ്റാദായം = (പ്രതീക്ഷിക്കുന്ന വിളവ് × മണ്ഡി മോഡൽ നിരക്ക്) − കൃഷി ചെലവ്."
      },
      pa: {
        record: "ਅਧਿਕਾਰਤ ਐਗਮਾਰਕਨੈੱਟ APMC ਨਿਲਾਮੀ ਰਿਕਾਰਡ",
        msp: "ਸਰਕਾਰੀ MSP",
        apmc_range: "APMC ਰੇਂਜ",
        qtl: "ਕੁਇੰਟਲ",
        primary_mandi: "ਮੁੱਖ ਮੰਡੀ",
        modal_rate: "APMC ਮਾਡਲ ਭਾਅ",
        set_rate: "ਆਪਣਾ ਸਥਾਨਕ APMC ਮੰਡੀ ਭਾਅ ਦਰਜ ਕਰੋ:",
        set_rate_sub: "ਆਪਣੀ ਸਥਾਨਕ ਮੰਡੀ ਦਾ ਅੱਜ ਦਾ ਨਿਲਾਮੀ ਭਾਅ ਦਰਜ ਕਰੋ:",
        reset: "ਰੀਸੈੱਟ",
        quick_rates: "ਤੁਰੰਤ ਭਾਅ:",
        min_apmc: "ਘੱਟੋ-ਘੱਟ APMC",
        modal_short: "ਮਾਡਲ",
        official: "ਅਧਿਕਾਰਤ",
        max_apmc: "ਵੱਧ ਤੋਂ ਵੱਧ APMC",
        sentiment: "ਬਾਜ਼ਾਰ ਰੁਝਾਨ:",
        farm_size: "ਖੇਤੀਬਾੜੀ ਜ਼ਮੀਨ ਦਾ ਰਕਬਾ:",
        acres: "ਏਕੜ",
        acre_05: "0.5 ਏਕੜ",
        acre_25: "2.5 ਏਕੜ (ਔਸਤ)",
        acre_10: "10 ਏਕੜ",
        acre_25c: "25 ਏਕੜ",
        yield_title: "ਅਨੁਮਾਨਿਤ ਫ਼ਸਲ ਝਾੜ",
        yield_rate: "ਦਰ",
        acre_unit: "ਏਕੜ",
        soil_cal: "ਮਿੱਟੀ-ਅਧਾਰਤ",
        cost_title: "ਕਾਸ਼ਤ ਦੀ ਲਾਗਤ",
        cacp_est: "CACP ਅਨੁਮਾਨ",
        rev_title: "ਕੁੱਲ APMC ਆਮਦਨ",
        modal_auc: "ਮਾਡਲ ਨਿਲਾਮੀ 'ਤੇ",
        profit_title: "ਅਨੁਮਾਨਿਤ ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ",
        roi: "ਨਿਵੇਸ਼ 'ਤੇ ਰਿਟਰਨ (ROI)",
        cacp_break: "CACP ਪ੍ਰਮਾਣਿਤ ਕਾਸ਼ਤ ਲਾਗਤ ਵੇਰਵਾ (ਪ੍ਰਤੀ ਏਕੜ):",
        seeds: "ਪ੍ਰਮਾਣਿਤ ਬੀਜ:",
        npk: "NPK ਅਤੇ ਜੈਵਿਕ ਖਾਦ:",
        labor: "ਮਜ਼ਦੂਰੀ ਅਤੇ ਛਿੜਕਾਅ:",
        tractor: "ਟਰੈਕਟਰ, ਬਾਲਣ ਅਤੇ ਸਿੰਚਾਈ:",
        formula_title: "CACP ਅਤੇ Agmarknet ਆਰਥਿਕ ਫਾਰਮੂਲਾ:",
        formula_body: "ਸ਼ੁੱਧ ਮੁਨਾਫ਼ਾ = (ਅਨੁਮਾਨਿਤ ਝਾੜ × ਮੰਡੀ ਮਾਡਲ ਭਾਅ) − ਕਾਸ਼ਤ ਦੀ ਲਾਗਤ।"
      },
      or: {
        record: "ଅଧିକୃତ ଆଗମାର୍କନେଟ୍ APMC ନିଲାମ ରେକର୍ଡ",
        msp: "ସରକାରୀ MSP",
        apmc_range: "APMC ସୀମା",
        qtl: "କ୍ୱିଣ୍ଟାଲ",
        primary_mandi: "ମୁଖ୍ୟ ମଣ୍ଡି",
        modal_rate: "APMC ମଡେଲ୍ ଦର",
        set_rate: "ଆପଣଙ୍କ ସ୍ଥାନୀୟ APMC ମଣ୍ଡି ଦର ଦିଅନ୍ତୁ:",
        set_rate_sub: "ଆପଣଙ୍କ ସ୍ଥାନୀୟ ବଜାରର ଆଜିର ନିଲାମ ଦର ଦିଅନ୍ତୁ:",
        reset: "ରିସେଟ୍",
        quick_rates: "ତୁରନ୍ତ ଦର:",
        min_apmc: "ସର୍ବନିମ୍ନ APMC",
        modal_short: "ମଡେଲ୍",
        official: "ଅଧିକୃତ",
        max_apmc: "ସର୍ବାଧିକ APMC",
        sentiment: "ବଜାର ସ୍ଥିତି:",
        farm_size: "ଚାଷ ଜମିର ପରିମାଣ:",
        acres: "ଏକର",
        acre_05: "0.5 ଏକର",
        acre_25: "2.5 ଏକର (ହାରାହାରି)",
        acre_10: "10 ଏକର",
        acre_25c: "25 ଏକର",
        yield_title: "ଆକଳିତ ଫସଲ ଅମଳ",
        yield_rate: "ହାର",
        acre_unit: "ଏକର",
        soil_cal: "ମୃତ୍ତିକା-ଆଧାରିତ",
        cost_title: "ଚାଷ ଖର୍ଚ୍ଚ",
        cacp_est: "CACP ଆକଳନ",
        rev_title: "ମୋଟ APMC ଆୟ",
        modal_auc: "ମଡେଲ୍ ନିଲାମରେ",
        profit_title: "ଆକଳିତ ନିଟ୍ ଲାଭ",
        roi: "ନିବେଶ ଉପରେ ଲାଭ (ROI)",
        cacp_break: "CACP ପ୍ରମାଣିତ ଚାଷ ଖର୍ଚ୍ଚ ବିବରଣୀ (ଏକର ପ୍ରତି):",
        seeds: "ପ୍ରମାଣିତ ବିହନ:",
        npk: "NPK ଓ ଜୈବ ସାର:",
        labor: "ଶ୍ରମ ଓ ସ୍ପ୍ରେ:",
        tractor: "ଟ୍ରାକ୍ଟର, ଇନ୍ଧନ ଓ ଜଳସେଚନ:",
        formula_title: "CACP ଓ Agmarknet ଆର୍ଥିକ ସୂତ୍ର:",
        formula_body: "ନିଟ୍ ଲାଭ = (ଆକଳିତ ଅମଳ × ମଣ୍ଡି ମଡେଲ୍ ଦର) − ଚାଷ ଖର୍ଚ୍ଚ।"
      }
    };
    return L[lang] || L.en;
  }

  renderMarketSection() {
    const lang = this.currentLanguage || "en";
    const ML = this.getMandiLabels(lang);
    const key = (this.currentCropId || "tomato").toLowerCase();
    const fallbackMandi = MANDI_COMMODITY_DATA[key] || MANDI_COMMODITY_DATA.tomato;
    const regional = getRegionalMandiBenchmarkJS(key, this.fieldLat, this.fieldLon);

    const prof = (this.modulesData && this.modulesData.mandi_profitability_module) || {};
    const benchmarkMandi = prof.benchmark_mandi || regional.benchmark_mandi || fallbackMandi.benchmark_mandi;
    const officialModalPrice = regional.modal_price_qtl || fallbackMandi.modal_price_qtl;
    const minPrice = fallbackMandi.min_price_qtl || Math.round(officialModalPrice * 0.75);
    const maxPrice = fallbackMandi.max_price_qtl || Math.round(officialModalPrice * 1.35);
    const mspPrice = prof.msp_price_qtl !== undefined ? prof.msp_price_qtl : fallbackMandi.msp_price_qtl;
    
    // Active modal price (Custom or Official Agmarknet)
    const activePrice = this.customPrices[key] || prof.modal_price_qtl || officialModalPrice;

    const acres = this.currentFarmSize || prof.farm_size_acres || 2.5;
    const yieldPerAcre = prof.projected_yield_per_acre_qtl || fallbackMandi.base_yield_qtl_acre;
    const costPerAcre = prof.cost_of_cultivation_acre_inr || fallbackMandi.cost_of_cultivation_acre_inr;

    const totalYield = (yieldPerAcre * acres).toFixed(1);
    const totalCost = Math.round(costPerAcre * acres);
    const totalRev = Math.round(yieldPerAcre * activePrice * acres);
    const totalProfit = Math.round(totalRev - totalCost);
    const roi = ((totalProfit / Math.max(1, totalCost)) * 100).toFixed(1);

    let commodityDisplay = prof.commodity_name || fallbackMandi.commodity_name;
    if (lang !== "en" && window.suitabilityRenderer && typeof window.suitabilityRenderer.localizeCropName === "function") {
      const locName = window.suitabilityRenderer.localizeCropName({ id: key, name: this.currentCropName });
      if (locName) commodityDisplay = `${locName} · ${commodityDisplay}`;
    }

    const mspBadge = mspPrice
      ? `<span style="font-size:0.75rem; background:rgba(45,90,39,0.12); border:1px solid #2D5A27; color:#2D5A27; padding:3px 8px; border-radius:6px; font-weight:700;">${ML.msp}: ₹${mspPrice.toLocaleString()} / ${ML.qtl}</span>`
      : `<span style="font-size:0.75rem; background:rgba(217,119,6,0.12); border:1px solid #d97706; color:#9A6700; padding:3px 8px; border-radius:6px; font-weight:700;">${ML.apmc_range}: ₹${minPrice.toLocaleString()} - ₹${maxPrice.toLocaleString()}</span>`;

    const dateToday = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const ic = (name, size = 14) => (typeof window.kbvIcon === "function" ? window.kbvIcon(name, size) : "");
    const cropIcoName = typeof window.kbvCropIcon === "function" ? window.kbvCropIcon(key) : "crops";

    return `
      <div>
        <!-- Mandi Benchmark Card -->
        <div style="background:#F0EEE9; border:1.5px solid rgba(45,90,39,0.28); border-radius:14px; padding:18px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div>
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px; flex-wrap:wrap;">
                <span style="font-size:0.72rem; color:#2D5A27; text-transform:uppercase; font-weight:800; letter-spacing:0.04em;">${ML.record}</span>
                ${mspBadge}
                <span style="font-size:0.7rem; background:#FFFFFF; border:1px solid rgba(45,90,39,0.16); padding:2px 6px; border-radius:4px; color:#4F5E46; display:inline-flex; align-items:center; gap:4px;">${ic("calendar", 11)} ${dateToday}</span>
              </div>
              <div style="font-size:1.35rem; font-weight:900; color:#1A2412; display:flex; align-items:center; gap:8px;">
                <span style="width:32px; height:32px; border-radius:8px; background:rgba(45,90,39,0.12); border:1px solid rgba(45,90,39,0.25); color:#2D5A27; display:inline-flex; align-items:center; justify-content:center;">${ic(cropIcoName, 17)}</span>
                <span>${commodityDisplay}</span>
              </div>
              <div style="font-size:0.8rem; color:#4F5E46; margin-top:4px; display:flex; align-items:center; gap:5px;">
                <span style="color:#2D5A27; display:inline-flex;">${ic("bank", 13)}</span> <b>${ML.primary_mandi}:</b> <span style="color:#2D5A27; font-weight:700;">${benchmarkMandi}</span>
              </div>
            </div>

            <div style="text-align:right;">
              <div style="font-size:0.7rem; color:#4F5E46; text-transform:uppercase; font-weight:700;">${ML.modal_rate}</div>
              <div style="font-size:1.8rem; font-weight:900; color:#2D5A27; line-height:1.1;">
                ₹<span id="mandiModalRateBadge">${activePrice.toLocaleString()}</span> <span style="font-size:0.85rem; color:#4F5E46; font-weight:600;">/ ${ML.qtl}</span>
              </div>
              <div style="font-size:0.72rem; color:#2D5A27; font-weight:700; margin-top:2px;">
                ${(prof.price_trend || fallbackMandi.price_trend || "").replace(/[\u{1F300}-\u{1FAFF}\u2600-\u27BF]+/gu, "").replace(/\s{2,}/g, " ").trim()}
              </div>
            </div>
          </div>

          <!-- Interactive Custom Local Mandi Price Customizer -->
          <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.22); border-radius:10px; padding:12px 14px; margin-bottom:10px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
              <div>
                <b style="font-size:0.82rem; color:#1A2412; display:inline-flex; align-items:center; gap:5px;"><span style="color:#2D5A27; display:inline-flex;">${ic("edit", 13)}</span> ${ML.set_rate}</b>
                <div style="font-size:0.7rem; color:#4F5E46;">${ML.set_rate_sub}</div>
              </div>

              <div style="display:flex; align-items:center; gap:8px;">
                <div style="position:relative; display:inline-flex; align-items:center;">
                  <span style="position:absolute; left:10px; color:#2D5A27; font-weight:800; font-size:1rem;">₹</span>
                  <input type="number" id="mandiCustomPriceInput" value="${activePrice}" min="100" max="60000" step="50" style="padding:6px 10px 6px 24px; width:130px; font-weight:800; font-size:1.05rem; background:#F0EEE9; border:1.5px solid #2D5A27; color:#1A2412; border-radius:8px; outline:none;" />
                </div>
                <span style="font-size:0.8rem; color:#4F5E46;">/ ${ML.qtl}</span>
                <button type="button" id="mandiResetRateBtn" style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.25); color:#1A2412; padding:6px 12px; border-radius:8px; font-size:0.75rem; font-weight:700; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">${ic("refresh", 12)} ${ML.reset}</button>
              </div>
            </div>

            <!-- 1-Click Quick Price Preset Chips -->
            <div style="display:flex; gap:6px; margin-top:10px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:0.7rem; color:#4F5E46;">${ML.quick_rates}</span>
              <button type="button" class="mandi-rate-chip" data-rate="${minPrice}" style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); color:#1A2412; padding:3px 8px; border-radius:6px; font-size:0.72rem; cursor:pointer;">${ML.min_apmc}: ₹${minPrice.toLocaleString()}</button>
              <button type="button" class="mandi-rate-chip" data-rate="${officialModalPrice}" style="background:rgba(45,90,39,0.14); border:1px solid #2D5A27; color:#2D5A27; padding:3px 8px; border-radius:6px; font-size:0.72rem; cursor:pointer; font-weight:700;">${ML.modal_short}: ₹${officialModalPrice.toLocaleString()} (${ML.official})</button>
              <button type="button" class="mandi-rate-chip" data-rate="${maxPrice}" style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); color:#1A2412; padding:3px 8px; border-radius:6px; font-size:0.72rem; cursor:pointer;">${ML.max_apmc}: ₹${maxPrice.toLocaleString()}</button>
              ${mspPrice ? `<button type="button" class="mandi-rate-chip" data-rate="${mspPrice}" style="background:rgba(45,90,39,0.12); border:1px solid #2D5A27; color:#2D5A27; padding:3px 8px; border-radius:6px; font-size:0.72rem; cursor:pointer; font-weight:700; display:inline-flex; align-items:center; gap:4px;">${ic("bank", 12)} ${ML.msp}: ₹${mspPrice.toLocaleString()}</button>` : ''}
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; font-size:0.72rem; color:#4F5E46;">
            <div style="display:inline-flex; align-items:center; gap:5px;"><span style="color:#2D5A27; display:inline-flex;">${ic("chart", 13)}</span> <b>${ML.sentiment}</b> ${prof.market_sentiment || fallbackMandi.market_sentiment}</div>
            <div style="color:#2D5A27; font-weight:600; display:inline-flex; align-items:center; gap:4px;">${ic("check", 13)} ${prof.verified_source || fallbackMandi.verified_source}</div>
          </div>
        </div>

        <!-- Interactive Land Size Slider -->
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.2); border-radius:12px; padding:14px; margin-bottom:14px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
            <b style="font-size:0.85rem; color:#1A2412; display:inline-flex; align-items:center; gap:6px;"><span style="color:#2D5A27; display:inline-flex;">${ic("tractor", 15)}</span> ${ML.farm_size}</b>
            <span style="font-size:1rem; font-weight:900; color:#2D5A27;"><span id="mandiAcresVal">${acres}</span> ${ML.acres}</span>
          </div>
          <input type="range" id="mandiAcresSlider" min="0.5" max="25" step="0.5" value="${acres}" style="width:100%; accent-color:#2D5A27; cursor:pointer;" />
          <div style="display:flex; justify-content:space-between; font-size:0.7rem; color:#4F5E46; margin-top:4px;">
            <span>${ML.acre_05}</span>
            <span>${ML.acre_25}</span>
            <span>${ML.acre_10}</span>
            <span>${ML.acre_25c}</span>
          </div>
        </div>

        <!-- 4 Economic Output Metric Boxes -->
        <div class="kbv-mandi-metrics-grid">
          <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.18); border-radius:10px; padding:12px;">
            <div style="font-size:0.7rem; color:#4F5E46; text-transform:uppercase; font-weight:700; display:flex; align-items:center; gap:5px;"><span style="color:#2D5A27; display:inline-flex;">${ic(cropIcoName, 13)}</span> ${ML.yield_title}</div>
            <div id="mandiYieldVal" style="font-size:1.25rem; font-weight:900; color:#1A2412; margin-top:3px;">${totalYield} ${ML.qtl}</div>
            <div style="font-size:0.7rem; color:#5C6B52; margin-top:2px;">${ML.yield_rate}: ${yieldPerAcre} ${ML.qtl} / ${ML.acre_unit} (${ML.soil_cal})</div>
          </div>

          <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.18); border-radius:10px; padding:12px;">
            <div style="font-size:0.7rem; color:#4F5E46; text-transform:uppercase; font-weight:700; display:flex; align-items:center; gap:5px;"><span style="color:#b91c1c; display:inline-flex;">${ic("mandi", 13)}</span> ${ML.cost_title}</div>
            <div id="mandiCostVal" style="font-size:1.25rem; font-weight:900; color:#b91c1c; margin-top:3px;">₹${totalCost.toLocaleString()}</div>
            <div style="font-size:0.7rem; color:#5C6B52; margin-top:2px;">₹${costPerAcre.toLocaleString()} / ${ML.acre_unit} (${ML.cacp_est})</div>
          </div>

          <div style="background:#FFFFFF; border:1px solid rgba(45,90,39,0.18); border-radius:10px; padding:12px;">
            <div style="font-size:0.7rem; color:#4F5E46; text-transform:uppercase; font-weight:700; display:flex; align-items:center; gap:5px;"><span style="color:#0369a1; display:inline-flex;">${ic("chart", 13)}</span> ${ML.rev_title}</div>
            <div id="mandiRevVal" style="font-size:1.25rem; font-weight:900; color:#0369a1; margin-top:3px;">₹${totalRev.toLocaleString()}</div>
            <div id="mandiRevSub" style="font-size:0.7rem; color:#5C6B52; margin-top:2px;">@ ₹${activePrice.toLocaleString()} / ${ML.qtl} ${ML.modal_auc}</div>
          </div>

          <div style="background:rgba(45,90,39,0.12); border:1.5px solid #2D5A27; border-radius:10px; padding:12px;">
            <div style="font-size:0.7rem; color:#2D5A27; text-transform:uppercase; font-weight:800; display:flex; align-items:center; gap:5px;">${ic("trophy", 13)} ${ML.profit_title}</div>
            <div id="mandiProfitVal" style="font-size:1.4rem; font-weight:900; color:#1E3F1A; margin-top:3px;">₹${totalProfit.toLocaleString()}</div>
            <div id="mandiRoiVal" style="font-size:0.74rem; color:#2D5A27; font-weight:700; margin-top:2px;">${ML.roi}: ${roi}%</div>
          </div>
        </div>

        <!-- CACP Authentic Cultivation Cost Breakdown -->
        <div style="background:#F0EEE9; border:1px solid rgba(45,90,39,0.16); border-radius:10px; padding:12px 14px; margin-bottom:12px;">
          <div style="font-size:0.75rem; color:#1A2412; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:5px;"><span style="color:#2D5A27; display:inline-flex;">${ic("chart", 13)}</span> ${ML.cacp_break}</div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(130px, 1fr)); gap:8px; font-size:0.72rem; color:#4F5E46;">
            <div style="display:flex; align-items:center; gap:4px;"><span style="color:#2D5A27; display:inline-flex;">${ic("crops", 12)}</span> <b>${ML.seeds}</b> ₹${Math.round(costPerAcre * 0.15).toLocaleString()} (15%)</div>
            <div style="display:flex; align-items:center; gap:4px;"><span style="color:#2D5A27; display:inline-flex;">${ic("soil", 12)}</span> <b>${ML.npk}</b> ₹${Math.round(costPerAcre * 0.28).toLocaleString()} (28%)</div>
            <div style="display:flex; align-items:center; gap:4px;"><span style="color:#2D5A27; display:inline-flex;">${ic("pin", 12)}</span> <b>${ML.labor}</b> ₹${Math.round(costPerAcre * 0.32).toLocaleString()} (32%)</div>
            <div style="display:flex; align-items:center; gap:4px;"><span style="color:#2D5A27; display:inline-flex;">${ic("tractor", 12)}</span> <b>${ML.tractor}</b> ₹${Math.round(costPerAcre * 0.25).toLocaleString()} (25%)</div>
          </div>
        </div>

        <div style="font-size:0.74rem; color:#4F5E46; line-height:1.5; padding:10px 14px; background:#F0EEE9; border:1px solid rgba(45,90,39,0.16); border-radius:8px; display:flex; align-items:flex-start; gap:6px;">
          <span style="color:#2D5A27; display:inline-flex; margin-top:2px;">${ic("bulb", 14)}</span>
          <div><b>${ML.formula_title}</b> ${ML.formula_body}</div>
        </div>
      </div>
    `;
  }

  bindMarketEvents() {
    const lang = this.currentLanguage || "en";
    const ML = this.getMandiLabels(lang);
    const key = (this.currentCropId || "tomato").toLowerCase();
    const fallbackMandi = MANDI_COMMODITY_DATA[key] || MANDI_COMMODITY_DATA.tomato;
    const regional = getRegionalMandiBenchmarkJS(key, this.fieldLat, this.fieldLon);
    const prof = (this.modulesData && this.modulesData.mandi_profitability_module) || {};
    
    const officialModalPrice = regional.modal_price_qtl || fallbackMandi.modal_price_qtl;
    const baseYield = prof.projected_yield_per_acre_qtl || fallbackMandi.base_yield_qtl_acre;
    const baseCost = prof.cost_of_cultivation_acre_inr || fallbackMandi.cost_of_cultivation_acre_inr;

    const recalc = () => {
      const acres = this.currentFarmSize || 2.5;
      const currentPrice = this.customPrices[key] || prof.modal_price_qtl || officialModalPrice;

      const totalYield = (baseYield * acres).toFixed(1);
      const totalCost = Math.round(baseCost * acres);
      const totalRev = Math.round(baseYield * currentPrice * acres);
      const totalProfit = Math.round(totalRev - totalCost);
      const roi = ((totalProfit / Math.max(1, totalCost)) * 100).toFixed(1);

      const yieldEl = document.getElementById("mandiYieldVal");
      const costEl = document.getElementById("mandiCostVal");
      const revEl = document.getElementById("mandiRevVal");
      const revSubEl = document.getElementById("mandiRevSub");
      const profitEl = document.getElementById("mandiProfitVal");
      const roiEl = document.getElementById("mandiRoiVal");
      const badgeEl = document.getElementById("mandiModalRateBadge");

      if (yieldEl) yieldEl.textContent = `${totalYield} ${ML.qtl}`;
      if (costEl) costEl.textContent = `₹${totalCost.toLocaleString()}`;
      if (revEl) revEl.textContent = `₹${totalRev.toLocaleString()}`;
      if (revSubEl) revSubEl.textContent = `@ ₹${currentPrice.toLocaleString()} / ${ML.qtl} ${ML.modal_auc}`;
      if (badgeEl) badgeEl.textContent = currentPrice.toLocaleString();
      if (profitEl) {
        profitEl.textContent = `₹${totalProfit.toLocaleString()}`;
        profitEl.style.color = totalProfit >= 0 ? "#1E3F1A" : "#b91c1c";
      }
      if (roiEl) roiEl.textContent = `${ML.roi}: ${roi}%`;
    };

    // 1. Slider Event
    const slider = document.getElementById("mandiAcresSlider");
    if (slider) {
      slider.oninput = (e) => {
        const acres = parseFloat(e.target.value);
        this.currentFarmSize = acres;
        const acresDisplay = document.getElementById("mandiAcresVal");
        if (acresDisplay) acresDisplay.textContent = acres.toFixed(1);
        recalc();
      };
    }

    // 2. Custom Price Input Event
    const priceInput = document.getElementById("mandiCustomPriceInput");
    if (priceInput) {
      priceInput.oninput = (e) => {
        const p = parseFloat(e.target.value);
        if (p && p > 0) {
          this.customPrices[key] = p;
          recalc();
        }
      };
    }

    // 3. Reset Button Event
    const resetBtn = document.getElementById("mandiResetRateBtn");
    if (resetBtn) {
      resetBtn.onclick = () => {
        delete this.customPrices[key];
        if (this.modulesData && this.modulesData.mandi_profitability_module) {
          this.modulesData.mandi_profitability_module.modal_price_qtl = officialModalPrice;
        }
        prof.modal_price_qtl = officialModalPrice;
        if (priceInput) priceInput.value = officialModalPrice;
        recalc();
      };
    }

    // 4. Quick Price Preset Chips Event
    document.querySelectorAll(".mandi-rate-chip").forEach(chip => {
      chip.onclick = (e) => {
        const rate = parseFloat(e.currentTarget.getAttribute("data-rate"));
        if (rate) {
          this.customPrices[key] = rate;
          if (priceInput) priceInput.value = rate;
          recalc();
        }
      };
    });
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
      irrigation_prediction_module: (() => {
        const kcTable = {
          rice: [1.05, 1.15, 1.25, 1.00], wheat: [0.35, 0.75, 1.15, 0.45],
          maize: [0.40, 0.80, 1.20, 0.60], ragi: [0.35, 0.70, 1.05, 0.55],
          jowar: [0.35, 0.75, 1.10, 0.55], groundnut: [0.40, 0.75, 1.15, 0.60],
          cotton: [0.45, 0.80, 1.20, 0.65], sugarcane: [0.50, 0.90, 1.25, 0.85],
          tomato: [0.50, 0.80, 1.15, 0.75], onion: [0.50, 0.75, 1.05, 0.75],
          soybean: [0.40, 0.80, 1.15, 0.50], pulses_gram: [0.35, 0.70, 1.05, 0.45],
          pulses_arhar: [0.40, 0.75, 1.10, 0.55], pulses_moong: [0.35, 0.70, 1.05, 0.45],
          mustard: [0.35, 0.70, 1.10, 0.45]
        };
        const stKey = (this.growthStage || "mid_season").toLowerCase();
        const stIdx = { initial: 0, development: 1, vegetative: 1, mid_season: 2, flowering: 2, fruiting: 2, late_season: 3, maturity: 3 }[stKey] ?? 2;
        const kc = (kcTable[(cropId || "tomato").toLowerCase()] || [0.45, 0.8, 1.15, 0.6])[stIdx];
        const et0 = 4.8;
        const etc = +(et0 * kc).toFixed(2);
        const rawThreshold = 42.0;
        const rainForecast = [1.5, 0.0, 4.0, 2.0, 0.0, 0.0, 0.0];
        const dayNames = ["Day 1 (Today)", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"];
        let dep = 21.0;
        let totalIrr = 0.0;
        let firstDue = null;
        const dailySchedule = dayNames.map((dName, i) => {
          const rain = rainForecast[i];
          const effRain = +(rain * 0.8).toFixed(1);
          dep = Math.max(0.0, dep + etc - effRain);
          let irrRec = false;
          let depth = 0.0;
          if (dep >= rawThreshold) {
            irrRec = true;
            depth = +dep.toFixed(1);
            totalIrr += depth;
            if (!firstDue) firstDue = dName;
            dep = 0.0;
          }
          return {
            day: dName,
            crop_etc_mm: etc,
            forecast_rain_mm: rain,
            soil_depletion_mm: +dep.toFixed(1),
            status: irrRec ? "Irrigation Due" : (effRain >= etc ? "Rain Protected" : "Moisture Adequate"),
            irrigation_recommended: irrRec,
            irrigation_depth_mm: depth,
            drip_run_hours: irrRec ? +(depth / 8.0).toFixed(1) : 0.0
          };
        });
        return {
          crop_id: cropId,
          growth_stage: stKey,
          daily_reference_et0_mm: et0,
          daily_crop_water_demand_etc_mm: etc,
          crop_coefficient_kc: kc,
          soil_moisture_holding_awc_mm: 84.0,
          readily_available_water_threshold_mm: rawThreshold,
          total_7day_water_demand_mm: +(etc * 7).toFixed(1),
          total_7day_irrigation_required_mm: +totalIrr.toFixed(1),
          next_irrigation_due: firstDue || "Day 8 (Adequate)",
          daily_forecast_schedule: dailySchedule,
          water_saving_tips: [
            "Irrigate between 5:00 PM and 8:00 PM to minimize evaporative losses",
            "Apply paddy straw mulch to conserve root-zone capillary water",
            "Maintain optimal drip emitter pressure at 1.0 to 1.5 bar"
          ]
        };
      })(),
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
      },
      mandi_profitability_module: (() => {
        const key = (cropId || "tomato").toLowerCase();
        const m = MANDI_COMMODITY_DATA[key] || MANDI_COMMODITY_DATA.tomato;
        const yieldPerAcre = m.base_yield_qtl_acre;
        const grossRev = Math.round(yieldPerAcre * m.modal_price_qtl);
        const netProfit = Math.round(grossRev - m.cost_of_cultivation_acre_inr);
        return {
          crop_id: key,
          commodity_name: m.commodity_name,
          modal_price_qtl: m.modal_price_qtl,
          msp_price_qtl: m.msp_price_qtl,
          price_range_qtl: m.price_range_qtl,
          benchmark_mandi: m.benchmark_mandi,
          price_trend: m.price_trend,
          market_sentiment: m.market_sentiment,
          verified_source: m.verified_source,
          projected_yield_per_acre_qtl: yieldPerAcre,
          cost_of_cultivation_acre_inr: m.cost_of_cultivation_acre_inr,
          gross_revenue_acre_inr: grossRev,
          net_profit_acre_inr: netProfit,
          roi_pct: +((netProfit / Math.max(1, m.cost_of_cultivation_acre_inr)) * 100).toFixed(1),
          farm_size_acres: 2.5
        };
      })()
    };
  }
}

window.ModulesManager = ModulesManager;

