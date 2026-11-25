"""
AgroNexus - Try & Error Plantation Advisor Engine
Analyzes any searched plantation / orchard / specialty crop against the live
1 km x 1 km soil, micro-climate, rainfall, and elevation profile, recommends
the best location-adapted cultivar/breed, and synthesizes a yield-maximizing
irrigation and row x column spacing plan.
"""
from typing import Dict, Any, List


PLANTATION_DATABASE: Dict[str, Dict[str, Any]] = {
    "mango": {
        "name": "Mango",
        "scientific_name": "Mangifera indica",
        "category": "Perennial Fruit Orchard",
        "ideal_ph": (5.5, 7.5),
        "ideal_temp": (22.0, 34.0),
        "ideal_rain": (650.0, 2200.0),
        "max_elev": 1100.0,
        "row_spacing_m": 5.0,
        "col_spacing_m": 5.0,
        "standard_spacing_note": "High-Density Planting (HDP) 5m × 5m (~161 trees/acre; traditional 10m × 10m = ~40 trees/acre)",
        "drippers_per_plant": 4,
        "emitter_lph": 8.0,
        "daily_liters_mature": 45.0,
        "irrigation_interval_days": 5,
        "irrigation_method": "Online Ring Dripper System (4 emitters/tree @ 8 LPH) with 10 cm organic mulch basin",
        "yield_boosting_plan": [
            "Flowering Induction (Oct–Dec): Withhold irrigation for 35–45 days before panicle emergence to induce uniform reproductive shoots instead of vegetative flush.",
            "Pea-to-Marble Stage Critical Hydration (Feb–Apr): Apply 100% ETo drip irrigation (40–55 L/tree/day) to slash immature fruit drop by up to 45%.",
            "Pre-Harvest Brix Boost: Cut irrigation 12–15 days prior to picking to elevate TSS sweetness and fruit shelf life.",
            "Canopy & Shoot Tip Pruning: Prune overcrowded center branches immediately after harvest so sunlight reaches inner spurs."
        ],
        "regional_breeds": {
            "coastal_humid": [
                {"name": "Alphonso (Hapus)", "yield": "4.5–6.0 T/acre", "trait": "Export-grade aromatic pulp, thrives in warm coastal laterite humidity", "rootstock": "Vellai Kolamban dwarfing / local sturdy seedling"},
                {"name": "Ratna", "yield": "5.5–7.0 T/acre", "trait": "Spongy-tissue resistant hybrid of Neelum × Alphonso; regular bearer", "rootstock": "Seedling rootstock with well-drained mound planting"}
            ],
            "southern_plateau": [
                {"name": "Banganapalle (Benishan)", "yield": "6.5–8.5 T/acre", "trait": "Large golden commercial fruit, strong heat tolerance on red sandy loam", "rootstock": "Nekkare / monoembryonic hardy seedling"},
                {"name": "Mallika", "yield": "6.0–7.5 T/acre", "trait": "Neelum × Dashehari high-TSS variety ideal for HDP irrigated plateaus", "rootstock": "Olour / Nekkare for salinity tolerance"},
                {"name": "Totapuri (Bangalora)", "yield": "8.0–10.5 T/acre", "trait": "Heavy regular pulp bearer for industrial & fresh markets", "rootstock": "Hardy regional seedling"}
            ],
            "western_deccan": [
                {"name": "Kesar", "yield": "6.0–8.0 T/acre", "trait": "Saffron-hued sweet pulp, handles warm black-cotton soils & summer heat", "rootstock": "Khajali / Rangpur-adapted seedling"},
                {"name": "Amrapali (HDP 5×5m)", "yield": "7.5–9.0 T/acre", "trait": "Compact dwarf regular bearer ideal for drip-irrigated high density", "rootstock": "Kurakkan / dwarf interstock"}
            ],
            "indo_gangetic": [
                {"name": "Dashehari", "yield": "6.0–7.5 T/acre", "trait": "Subtropical North-Indian benchmark flavor; cold-winter tolerant", "rootstock": "Moovandan / native vigorous alluvial stock"},
                {"name": "Amrapali (HDP)", "yield": "7.5–9.5 T/acre", "trait": "Dwarf regular-bearing variety thriving under Indo-Gangetic tube-well drip", "rootstock": "Alluvial hardy rootstock"},
                {"name": "Langra / Chausa", "yield": "5.5–7.0 T/acre", "trait": "Late-season juicy dessert cultivars suited to deep fertile loam", "rootstock": "Native alluvial stock"}
            ],
            "default": [
                {"name": "Mallika", "yield": "6.0–7.5 T/acre", "trait": "Wide agro-climatic adaptability and high TSS sweetness", "rootstock": "Regional hardy seedling"},
                {"name": "Amrapali (HDP)", "yield": "7.5–9.0 T/acre", "trait": "Dwarf canopy suited for drip-irrigated 5m × 5m high-density blocks", "rootstock": "Local vigorous seedling"}
            ]
        }
    },
    "banana": {
        "name": "Banana",
        "scientific_name": "Musa acuminata",
        "category": "High-Value Fruit Plantation",
        "ideal_ph": (6.0, 7.8),
        "ideal_temp": (20.0, 35.0),
        "ideal_rain": (900.0, 2600.0),
        "max_elev": 1200.0,
        "row_spacing_m": 1.8,
        "col_spacing_m": 1.5,
        "standard_spacing_note": "Precision 1.8m × 1.5m (~1,499 tissue-culture plants/acre)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 18.0,
        "irrigation_interval_days": 2,
        "irrigation_method": "Inline Drip Laterals with 2 drippers/plant (4 LPH) + 100% Soluble NPK Fertigation",
        "yield_boosting_plan": [
            "Zero Moisture Stress Policy: Shallow fibrous roots require frequent 2-day drip cycles; even 10% moisture deficit shrinks bunch weight by 15%.",
            "Fertigation Split: Inject 200g N + 250g K2O per plant over 30 weekly drip splits from week 4 to shooting.",
            "Bunch Management: Remove male bud 15 days after last hand opens and slip blue UV-stabilized bunch sleeves for clean export skin."
        ],
        "regional_breeds": {
            "western_deccan": [
                {"name": "Grand Naine (G-9 Tissue Culture)", "yield": "32–38 T/acre", "trait": "Export Cavendish cultivar with heavy cylindrical bunches & short crop cycle", "rootstock": "Virus-indexed Tissue Culture G-9"},
                {"name": "Shrimanti", "yield": "28–34 T/acre", "trait": "Hardy local Cavendish selection suited to warm black cotton soils", "rootstock": "Certified Tissue Culture"}
            ],
            "southern_plateau": [
                {"name": "Yelakki Bale (Ney Poovan)", "yield": "14–18 T/acre", "trait": "Premium Karnataka finger banana commanding 2.5x mandi price per kg", "rootstock": "Disease-free TC / healthy sword suckers"},
                {"name": "Grand Naine (G-9)", "yield": "30–36 T/acre", "trait": "Maximum tonnage per acre under precision drip fertigation", "rootstock": "Tissue Culture G-9"}
            ],
            "coastal_humid": [
                {"name": "Nendran", "yield": "18–22 T/acre", "trait": "Dual-purpose chips & culinary cultivar thriving in coastal monsoon rainfall", "rootstock": "Tissue Culture Nendran"},
                {"name": "Robusta", "yield": "26–32 T/acre", "trait": "Wind-tolerant semi-dwarf Cavendish suited to humid coastal winds", "rootstock": "Certified TC saplings"}
            ],
            "default": [
                {"name": "Grand Naine (G-9 Tissue Culture)", "yield": "30–36 T/acre", "trait": "Highest yielding uniform Cavendish cultivar across drip-irrigated belts", "rootstock": "Virus-indexed Tissue Culture"},
                {"name": "Robusta", "yield": "26–30 T/acre", "trait": "Wind-resilient high tonnage cultivar", "rootstock": "Tissue Culture"}
            ]
        }
    },
    "coconut": {
        "name": "Coconut",
        "scientific_name": "Cocos nucifera",
        "category": "Perennial Palm Plantation",
        "ideal_ph": (5.2, 8.0),
        "ideal_temp": (22.0, 35.0),
        "ideal_rain": (1000.0, 3200.0),
        "max_elev": 900.0,
        "row_spacing_m": 7.5,
        "col_spacing_m": 7.5,
        "standard_spacing_note": "Square Palm Grid 7.5m × 7.5m (~72 palms/acre, allows banana/turmeric intercrop)",
        "drippers_per_plant": 4,
        "emitter_lph": 4.0,
        "daily_liters_mature": 55.0,
        "irrigation_interval_days": 3,
        "irrigation_method": "Sub-Surface 4-Pit Micro-Tube Dripper at 1.0 m radius around bole + husk burial",
        "yield_boosting_plan": [
            "Active Summer Basin Drip: Supply 50–65 L/palm/day during Feb–May to prevent immature button-nut shedding.",
            "Husk & Coir Pith Moisture Bank: Bury 100 coconut husks/pit along drip trenches to store 4× water in summer.",
            "Boron & Potash Nutrition: Add 1.2 kg MOP + 50 g Borax per palm annually to stop barren nut formation."
        ],
        "regional_breeds": {
            "coastal_humid": [
                {"name": "West Coast Tall (WCT)", "yield": "85–110 nuts/palm/yr", "trait": "Coastal benchmark for high copra & virgin oil percentage", "rootstock": "Open-pollinated coastal mother palms"},
                {"name": "Chandrakalpa / Chowghat Orange Dwarf (COD)", "yield": "100–130 nuts/palm/yr", "trait": "Early bearing tender-coconut dwarf cultivar", "rootstock": "Selected COD mother palms"}
            ],
            "southern_plateau": [
                {"name": "Tiptur Tall × COD (T×D Hybrid)", "yield": "120–150 nuts/palm/yr", "trait": "Top plateau tender & copra hybrid with drought tolerance", "rootstock": "Hybrid seed garden certified"},
                {"name": "Arsikere Tall", "yield": "95–120 nuts/palm/yr", "trait": "Deep-rooted drought hardy Karnataka maidan variety", "rootstock": "Selected tall nursery palms"}
            ],
            "default": [
                {"name": "D×T / T×D Coconut Hybrid (Kera Sankara)", "yield": "115–145 nuts/palm/yr", "trait": "Bears in 3.5–4 years with superior button retention", "rootstock": "Certified F1 hybrid"},
                {"name": "East Coast Tall (ECT)", "yield": "90–115 nuts/palm/yr", "trait": "Broad adaptation across warm sandy & red loam plains", "rootstock": "Certified tall seedling"}
            ]
        }
    },
    "pomegranate": {
        "name": "Pomegranate",
        "scientific_name": "Punica granatum",
        "category": "Semi-Arid High-Value Orchard",
        "ideal_ph": (6.0, 8.2),
        "ideal_temp": (20.0, 36.0),
        "ideal_rain": (450.0, 1100.0),
        "max_elev": 1400.0,
        "row_spacing_m": 4.5,
        "col_spacing_m": 3.0,
        "standard_spacing_note": "Semi-Arid Orchard 4.5m × 3.0m (~300 plants/acre)",
        "drippers_per_plant": 4,
        "emitter_lph": 4.0,
        "daily_liters_mature": 24.0,
        "irrigation_interval_days": 3,
        "irrigation_method": "Double-Lateral Drip (4 drippers/bush @ 4 LPH) regulated cleanly by Bahar season",
        "yield_boosting_plan": [
            "Bahar Moisture Regulation: Give 30-day controlled stress before Hasta/Mrig Bahar pruning for synchronized flowering.",
            "Fruit Cracking Prevention: Never alternate between bone-dry soil and sudden heavy flooding; maintain steady 75% field capacity during aril filling.",
            "Ethrel + Micronutrient Spray: Foliar Calcium Nitrate + Boron during fruit set prevents sunburn & rind splitting."
        ],
        "regional_breeds": {
            "western_deccan": [
                {"name": "Bhagwa (Sinduri)", "yield": "8–11 T/acre", "trait": "Export leader with glossy dark-crimson arils & soft seeds; thrives in dry Deccan heat", "rootstock": "Air-layered / Tissue Culture Bhagwa"},
                {"name": "Super Bhagwa", "yield": "9–12 T/acre", "trait": "Larger uniform fruit weight (300–400g) & enhanced TSS", "rootstock": "Virus-indexed TC plant"}
            ],
            "southern_plateau": [
                {"name": "Bhagwa / Ruby", "yield": "8–10 T/acre", "trait": "Deep red interior & bacterial blight tolerant spacing under drip", "rootstock": "Tissue culture sapling"},
                {"name": "Ganesh", "yield": "7–9 T/acre", "trait": "Soft-seeded hardy table variety suited to red sandy loam", "rootstock": "Air-layered stem"}
            ],
            "default": [
                {"name": "Bhagwa", "yield": "8–11 T/acre", "trait": "India's top commercial export pomegranate with soft sweet arils", "rootstock": "Tissue Culture Bhagwa"},
                {"name": "Phule Arakta", "yield": "7–9 T/acre", "trait": "Early maturing sweet cultivar with lower cracking tendency", "rootstock": "Air-layered plant"}
            ]
        }
    },
    "grapes": {
        "name": "Grapes",
        "scientific_name": "Vitis vinifera",
        "category": "Trellis Vineyard",
        "ideal_ph": (6.2, 8.0),
        "ideal_temp": (18.0, 34.0),
        "ideal_rain": (450.0, 1050.0),
        "max_elev": 1300.0,
        "row_spacing_m": 3.0,
        "col_spacing_m": 1.8,
        "standard_spacing_note": "Y-Trellis Vineyard 3.0m × 1.8m (~749 vines/acre)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 14.0,
        "irrigation_interval_days": 2,
        "irrigation_method": "Sub-Surface / Inline Drip at 45 cm emitter interval with Dogridge rootstock",
        "yield_boosting_plan": [
            "Stage-Based ETo Coefficient: Maintain 60–75% ETo during shoot growth and raise to 100% ETo from veraison to berry enlargement.",
            "Salinity & Chloride Flush: Use Dogridge rootstock grafted vines in semi-arid belts to maintain Brix >19°.",
            "Bunch Thinning + GA3 Dipping: Restrict clusters to 35–40 per vine for jumbo export berry caliber."
        ],
        "regional_breeds": {
            "western_deccan": [
                {"name": "Thompson Seedless / Sonaka", "yield": "12–15 T/acre", "trait": "Nashik/Sangli global raisin & table benchmark", "rootstock": "Dogridge salt-tolerant rootstock"},
                {"name": "Sharad Seedless", "yield": "10–13 T/acre", "trait": "Crisp black seedless cultivar commanding premium export demand", "rootstock": "Dogridge / 110R"}
            ],
            "southern_plateau": [
                {"name": "Dilkhush / Anab-e-Shahi", "yield": "11–14 T/acre", "trait": "Thrives across Bengaluru–Hyderabad granite soils with good pergola ventilation", "rootstock": "Dogridge"},
                {"name": "Manik Chaman", "yield": "12–15 T/acre", "trait": "Elongated golden seedless berries with high sugar retention", "rootstock": "Dogridge"}
            ],
            "default": [
                {"name": "Thompson Seedless", "yield": "11–14 T/acre", "trait": "Versatile table & raisin cultivar", "rootstock": "Dogridge"},
                {"name": "Sharad Seedless", "yield": "10–13 T/acre", "trait": "Early crisp black table grape", "rootstock": "Dogridge"}
            ]
        }
    },
    "guava": {
        "name": "Guava",
        "scientific_name": "Psidium guajava",
        "category": "Meadow / Orchard Plantation",
        "ideal_ph": (5.5, 8.0),
        "ideal_temp": (18.0, 35.0),
        "ideal_rain": (600.0, 1800.0),
        "max_elev": 1400.0,
        "row_spacing_m": 3.0,
        "col_spacing_m": 2.0,
        "standard_spacing_note": "Ultra/High-Density 3.0m × 2.0m (~674 trees/acre)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 16.0,
        "irrigation_interval_days": 4,
        "irrigation_method": "Inline / Online Drip (2 emitters/tree @ 4 LPH) targeting Mrig & Hasta Bahar",
        "yield_boosting_plan": [
            "Shoot Bending + Pruning: Bend upright shoots in May and head back 50% growth to double winter (Ambe/Mrig) fruiting spurs.",
            "Wilt Guard: Avoid flood stagnation around collar zone; use basin drip + Trichoderma bio-drench twice a year.",
            "Winter Quality Over Rainy Season: Regulate May irrigation pause so main harvest shifts to pest-free sweet Nov–Jan Mrig crop."
        ],
        "regional_breeds": {
            "indo_gangetic": [
                {"name": "Allahabad Safeda", "yield": "12–16 T/acre", "trait": "Classic Gangetic sweet white pulp with soft seeds & cold winter aroma", "rootstock": "L-49 / Wilt-resistant clonal"},
                {"name": "Lalit / Shweta", "yield": "14–18 T/acre", "trait": "CISH Lucknow high-density pink & white heavy bearers", "rootstock": "Psidium friedrichsthalianum wilt guard"}
            ],
            "western_deccan": [
                {"name": "Lucknow-49 (Sardar)", "yield": "13–17 T/acre", "trait": "Heavy bearing semi-dwarf cultivar thriving in warm Deccan & black soil", "rootstock": "Clonal wedge-grafted"},
                {"name": "Taiwan Pink", "yield": "15–20 T/acre", "trait": "Crisp high-density all-season market leader under bag protection", "rootstock": "VNR / L-49 seedling"}
            ],
            "default": [
                {"name": "Taiwan Pink / VNR Bihi", "yield": "14–19 T/acre", "trait": "Precocious 1st-year fruiting under 3×2m drip-fed HDP", "rootstock": "Wilt-tolerant clonal stock"},
                {"name": "Lucknow-49 (Sardar)", "yield": "12–16 T/acre", "trait": "Robust all-India performer", "rootstock": "Hardy seedling"}
            ]
        }
    },
    "papaya": {
        "name": "Papaya",
        "scientific_name": "Carica papaya",
        "category": "Fast-Return Fruit Plantation",
        "ideal_ph": (6.0, 7.2),
        "ideal_temp": (22.0, 34.0),
        "ideal_rain": (800.0, 2000.0),
        "max_elev": 1000.0,
        "row_spacing_m": 2.0,
        "col_spacing_m": 2.0,
        "standard_spacing_note": "Raised-Bed Grid 2.0m × 2.0m (~1,012 plants/acre)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 14.0,
        "irrigation_interval_days": 2,
        "irrigation_method": "Raised-Bed 2-Lateral Drip keeping emitters 20 cm away from soft stem to stop collar rot",
        "yield_boosting_plan": [
            "Dry Collar Rule: Place drip emitters 20–25 cm away from the trunk on raised beds—never let standing water touch the collar.",
            "Continuous Weekly NPK Drip Feed: Supply balanced 19:19:19 + micronutrients weekly for uninterrupted flower-to-fruit stacking.",
            "Papaya Ring Spot Barrier: Plant 2 border rows of Maize/African marigold 30 days ahead to shield seedlings from aphid vectors."
        ],
        "regional_breeds": {
            "default": [
                {"name": "Red Lady 786 (Taiwan)", "yield": "35–45 T/acre", "trait": "100% gynodioecious (every plant fruits!) with red firm pulp & high transport life", "rootstock": "Protected Nursery Net-House seedlings"},
                {"name": "Pusa Nanha / Coorg Honey Dew", "yield": "28–35 T/acre", "trait": "Dwarf wind-tolerant bearing starting 45 cm above ground", "rootstock": "Well-drained raised-bed seed"},
                {"name": "Ice Berry / Pusa Delicious", "yield": "30–38 T/acre", "trait": "Sweet gynodioecious cultivar suited to warm alluvial & red loams", "rootstock": "Net-house raised"}
            ]
        }
    },
    "coffee": {
        "name": "Coffee",
        "scientific_name": "Coffea arabica / canephora",
        "category": "Shade-Grown Estate Plantation",
        "ideal_ph": (5.4, 6.5),
        "ideal_temp": (16.0, 27.0),
        "ideal_rain": (1400.0, 2800.0),
        "max_elev": 1700.0,
        "row_spacing_m": 2.4,
        "col_spacing_m": 2.4,
        "standard_spacing_note": "Contoured Estate Grid 2.4m × 2.4m (~702 bushes/acre under Silver Oak/Dadap shade)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 10.0,
        "irrigation_interval_days": 7,
        "irrigation_method": "Overhead Blossom/Backing Sprinkler (25–35 mm pulses) or Under-Shade Drip",
        "yield_boosting_plan": [
            "Critical Blossom Shower (Feb–Mar): If natural spring rain delays, trigger 30 mm overhead sprinkler irrigation once flower buds swell white to unlock uniform blossom!",
            "Backing Irrigation (18–25 days post-blossom): Follow up with 25 mm pulse for crisp berry set and zero pinhead drop.",
            "Shade Canopy Regulation: Maintain 45–50% filtered shade with Silver Oak & Pepper vine integration for double estate income."
        ],
        "regional_breeds": {
            "southern_plateau": [
                {"name": "Chandragiri (Arabica)", "yield": "0.65–0.85 T clean coffee/acre", "trait": "Rust-resistant bold bean Arabica ideal for 900–1300m Western Ghats estates", "rootstock": "Certified CCRI nursery"},
                {"name": "Selection 795 / Sln.9", "yield": "0.6–0.8 T/acre", "trait": "Cup-quality benchmark for Chikmagalur, Coorg & Wayanad", "rootstock": "CCRI clonal/seed"},
                {"name": "CxR (Congensis × Robusta)", "yield": "0.9–1.2 T/acre", "trait": "Top performer in warmer lower-elevation zones (<900m)", "rootstock": "Selected robusta stock"}
            ],
            "default": [
                {"name": "Selection 795 / Chandragiri (Arabica)", "yield": "0.65–0.85 T/acre", "trait": "High cup quality & leaf rust resilience above 800m under partial shade", "rootstock": "CCRI seed"},
                {"name": "CxR Robusta", "yield": "0.9–1.2 T/acre", "trait": "Heat-tolerant high yielder for elevations 300–850m", "rootstock": "Robusta clonal"}
            ]
        }
    },
    "turmeric": {
        "name": "Turmeric",
        "scientific_name": "Curcuma longa",
        "category": "High-Curcumin Spice Plantation",
        "ideal_ph": (5.5, 7.5),
        "ideal_temp": (20.0, 34.0),
        "ideal_rain": (1000.0, 2400.0),
        "max_elev": 1400.0,
        "row_spacing_m": 0.45,
        "col_spacing_m": 0.25,
        "standard_spacing_note": "Broad Raised Bed 0.45m × 0.25m (~35,972 rhizomes/acre)",
        "drippers_per_plant": 1,
        "emitter_lph": 2.0,
        "daily_liters_mature": 1.2,
        "irrigation_interval_days": 3,
        "irrigation_method": "Dual-Line Inline Drip Tape (40 cm lateral, 2 LPH @ 30 cm) on 15 cm raised beds",
        "yield_boosting_plan": [
            "Strict Drainage on Raised Beds: Stagnant water causes Pythium rhizome rot—never flood; drip 3-day cycles on raised beds.",
            "Peak Rhizome Bulking Irrigation (Days 120–210): Maintain 85% moisture capacity with 00:00:50 Potash fertigation for heavy bold fingers.",
            "Stop Water 25 Days Before Digging: Drying beds late strengthens golden curcumin recovery up to 5.5–6.5%."
        ],
        "regional_breeds": {
            "western_deccan": [
                {"name": "Salem / Sangli Deshi", "yield": "11–14 T fresh/acre", "trait": "High curcumin (4.8–5.5%) & bold bright-yellow fingers thriving on black soil drip beds", "rootstock": "Trichoderma-treated mother rhizomes"},
                {"name": "Waigaon", "yield": "10–13 T/acre", "trait": "GI-tagged aromatic Maharashtra turmeric with >6% curcumin", "rootstock": "Disease-free seed rhizomes"}
            ],
            "southern_plateau": [
                {"name": "IISR Pratibha / Erode", "yield": "13–16 T/acre", "trait": "Top high-curcumin (6.2%) release thriving on red sandy loam", "rootstock": "Healthy 30g finger seed"},
                {"name": "Salem", "yield": "12–14 T/acre", "trait": "High market acceptance across Erode/Nizamabad mandis", "rootstock": "Certified rhizome seed"}
            ],
            "default": [
                {"name": "IISR Pratibha", "yield": "13–16 T/acre", "trait": "Ultra-high curcumin (>6%) high-yielding ICAR cultivar", "rootstock": "Trichoderma-treated rhizomes"},
                {"name": "Salem", "yield": "11–14 T/acre", "trait": "All-India commercial favorite with bright polished finish", "rootstock": "Disease-free seed"}
            ]
        }
    },
    "dragon_fruit": {
        "name": "Dragon Fruit",
        "scientific_name": "Selenicereus undatus / costaricensis",
        "category": "Dryland Superfruit Trellis",
        "ideal_ph": (5.5, 7.5),
        "ideal_temp": (20.0, 38.0),
        "ideal_rain": (450.0, 1400.0),
        "max_elev": 1200.0,
        "row_spacing_m": 3.0,
        "col_spacing_m": 2.4,
        "standard_spacing_note": "RCC Pillar Grid 3.0m × 2.4m (4 stems/pillar = ~562 pillars / 2,248 vines/acre)",
        "drippers_per_plant": 2,
        "emitter_lph": 4.0,
        "daily_liters_mature": 6.0,
        "irrigation_interval_days": 4,
        "irrigation_method": "Base-Ring Drip (4–6 L/pillar/event) avoiding wet rot in cactus roots",
        "yield_boosting_plan": [
            "Micro-Drip Cactus Rhythm: Over-watering kills shallow CAM cactus roots; give shallow 6–8 L pulses every 4 days only in upper 20 cm soil.",
            "Night Bloom Window Hydration: Ensure gentle moisture during May–Nov 6–8 flowering waves to boost weight >450g/fruit.",
            "Shade/Heat Tip: Whitewash south stems or keep mulch at pillar base if peak summer exceeds 40°C."
        ],
        "regional_breeds": {
            "default": [
                {"name": "Jumbo Red (Red-Flesh High Brix)", "yield": "8–11 T/acre (Yr 3+)", "trait": "Self-pollinating vibrant crimson pulp preferred in Indian supermarkets", "rootstock": "Mature sun-hardened cladodes"},
                {"name": "C-23 / Moroccan Red", "yield": "9–12 T/acre", "trait": "Heat-tolerant red-skinned cultivar resistant to stem sunburn", "rootstock": "Certified stem cuttings"}
            ]
        }
    }
}

# Clean aliases for common user searches
PLANT_ALIASES = {
    "aam": "mango", "alphonso": "mango", "kesar": "mango", "hapus": "mango",
    "kela": "banana", "plantain": "banana",
    "nariyal": "coconut", "palm": "coconut",
    "anar": "pomegranate", "dalimb": "pomegranate", "bhagwa": "pomegranate",
    "angoor": "grapes", "grape": "grapes", "draksha": "grapes",
    "amrood": "guava", "peru": "guava",
    "papita": "papaya",
    "haldi": "turmeric",
    "dragon": "dragon_fruit", "dragonfruit": "dragon_fruit", "kamalam": "dragon_fruit",
    "arabica": "coffee", "robusta": "coffee"
}


def detect_indian_agro_region(lat: float, lon: float, elevation: float, rainfall: float) -> Dict[str, str]:
    """Determines macro agro-climatic bucket and readable region label from coordinates."""
    if lon <= 74.6 and 8.0 <= lat <= 20.5 and rainfall >= 1500:
        return {"zone_key": "coastal_humid", "zone_name": "West Coast / Konkan Humid Belt"}
    if elevation >= 750 and 8.0 <= lat <= 14.5:
        return {"zone_key": "southern_plateau", "zone_name": "Southern Highland & Ghats Belt"}
    if 8.0 <= lat <= 17.8 and lon >= 74.2:
        return {"zone_key": "southern_plateau", "zone_name": "Southern Plateau (KA / AP / TS / TN)"}
    if 17.8 < lat <= 23.2 and 68.5 <= lon <= 79.0:
        return {"zone_key": "western_deccan", "zone_name": "Western Deccan & Gujarat Agro Belt"}
    if lat >= 24.5 and 73.5 <= lon <= 88.0:
        return {"zone_key": "indo_gangetic", "zone_name": "Indo-Gangetic Alluvial Plains"}
    return {"zone_key": "default", "zone_name": "Indian Subtropical Agro Belt"}


def analyze_plantation_trial(
    plant_query: str,
    lat: float,
    lon: float,
    weather: Dict[str, Any],
    soil: Dict[str, Any],
    terrain: Dict[str, Any],
    farm_size_acres: float = 2.5
) -> Dict[str, Any]:
    """
    Analyzes any searched plantation / orchard / crop against the user's live
    geospatial weather, soil, and terrain, recommends location-best breeds,
    and generates a row x column + acre-scaled irrigation plan.
    """
    raw = (plant_query or "Mango").strip()
    norm = raw.lower().replace(" ", "_")
    plant_key = PLANT_ALIASES.get(norm)
    if not plant_key:
        for k in PLANTATION_DATABASE:
            if k in norm or norm in k:
                plant_key = k
                break

    temp = float(weather.get("average_temperature", 27.5))
    rainfall = float(weather.get("annual_rainfall", 880.0))
    eto = float(weather.get("et0", 4.6))
    ph = float(soil.get("ph", 6.8))
    texture = soil.get("texture_class", "Sandy Clay Loam")
    drainage = soil.get("drainage", "Well Drained")
    elevation = float(terrain.get("elevation_m", 550.0))
    slope = float(terrain.get("slope_pct", 1.8))

    zone_info = detect_indian_agro_region(lat, lon, elevation, rainfall)
    zkey = zone_info["zone_key"]

    profile = PLANTATION_DATABASE.get(plant_key)
    if not profile:
        # Intelligent synthetic plantation profile for arbitrary crop/tree searches (e.g., Citrus, Avocado, Bamboo, Cashew, Sapota)
        title = raw.title()
        profile = {
            "name": title,
            "scientific_name": f"{title} (Horticultural / Plantation Trial)",
            "category": "Custom Plantation Trial",
            "ideal_ph": (5.8, 7.6),
            "ideal_temp": (20.0, 33.0),
            "ideal_rain": (700.0, 2000.0),
            "max_elev": 1500.0,
            "row_spacing_m": 4.0,
            "col_spacing_m": 4.0,
            "standard_spacing_note": f"Balanced Orchard Grid 4.0m × 4.0m (~252 plants/acre) calibrated for {title}",
            "drippers_per_plant": 2,
            "emitter_lph": 4.0,
            "daily_liters_mature": 22.0,
            "irrigation_interval_days": 4,
            "irrigation_method": f"Dual-Emitter Online Drip (2 × 4 LPH/plant) calibrated to local {texture} infiltration",
            "yield_boosting_plan": [
                f"Micro-Climate Moisture Stabilization: Supply morning drip pulses aligned with local ETo ({eto:.1f} mm/day) to eliminate flowering/fruit-set stress.",
                f"Soil pH Buffering ({ph}): Add 4–5 tonnes/acre well-rotted FYM + Trichoderma enriched compost in root basins to maximize nutrient uptake.",
                "Mulching + Micronutrient Fertigation: Cover basin with 8 cm biomass mulch and split soluble NPK across active flush & fruit bulking."
            ],
            "regional_breeds": {
                zkey: [
                    {"name": f"Regional High-Yield {title} Selection ({zone_info['zone_name'].split(' ')[0]} Adapted)", "yield": "Commercial HDP Grade", "trait": f"Selected for local pH {ph} {texture} soil & {rainfall:.0f} mm rainfall band", "rootstock": "Certified clonal / grafted nursery stock"},
                    {"name": f"Dwarf High-Density {title} Cultivar", "yield": "+20–30% HDP yield potential", "trait": "Compact canopy responding strongly to drip fertigation", "rootstock": "Sturdy regional rootstock"}
                ]
            }
        }

    # Compute location compatibility score (0-100)
    ph_min, ph_max = profile["ideal_ph"]
    t_min, t_max = profile["ideal_temp"]
    r_min, r_max = profile["ideal_rain"]

    ph_score = 100.0 if ph_min <= ph <= ph_max else max(45.0, 100.0 - abs(ph - (ph_min if ph < ph_min else ph_max)) * 28.0)
    temp_score = 100.0 if t_min <= temp <= t_max else max(45.0, 100.0 - abs(temp - (t_min if temp < t_min else t_max)) * 5.0)
    rain_score = 100.0 if r_min <= rainfall <= r_max else (
        max(62.0, 100.0 - ((r_min - rainfall) / max(1.0, r_min)) * 45.0) if rainfall < r_min
        else max(68.0, 100.0 - ((rainfall - r_max) / max(1.0, r_max)) * 35.0)
    )
    drain_score = 95.0 if "Well" in drainage or "Moderate" in drainage else 72.0
    elev_score = 95.0 if elevation <= profile["max_elev"] else max(55.0, 95.0 - (elevation - profile["max_elev"]) / 40.0)

    overall_score = round(
        0.28 * ph_score + 0.27 * temp_score + 0.25 * rain_score + 0.12 * drain_score + 0.08 * elev_score,
        1
    )

    verdict = (
        "Highly Suitable (Prime Zone)" if overall_score >= 82
        else ("Suitable with Precision Drip & Mulching" if overall_score >= 68 else "Experimental / Marginal — Requires Protected Irrigation & Soil Buffering")
    )

    # Pick region-best breeds
    breeds_map = profile["regional_breeds"]
    recommended_breeds = breeds_map.get(zkey) or breeds_map.get("default") or next(iter(breeds_map.values()))

    # Spacing & Acreage Geometry Calculations
    acres = max(0.25, float(farm_size_acres))
    area_sq_m = round(acres * 4046.86, 1)
    row_m = float(profile["row_spacing_m"])
    col_m = float(profile["col_spacing_m"])
    plants_per_acre = round(4046.86 / (row_m * col_m))
    total_plants = round(area_sq_m / (row_m * col_m))

    # Calibrate daily water requirement to local weather temperature/rainfall
    climate_factor = 1.15 if temp >= 30.0 else (0.90 if temp <= 22.0 else 1.0)
    if rainfall >= 1500:
        climate_factor *= 0.85
    liters_per_plant_day = round(profile["daily_liters_mature"] * climate_factor, 1)
    interval_days = int(profile["irrigation_interval_days"])
    if "Sandy" in texture and interval_days > 2:
        interval_days = max(2, interval_days - 1)
    elif "Clay" in texture:
        interval_days = interval_days + 1

    liters_per_plant_event = round(liters_per_plant_day * interval_days, 1)
    total_liters_per_event = round(total_plants * liters_per_plant_event)
    emitter_total_lph = profile["drippers_per_plant"] * profile["emitter_lph"]
    drip_hours_per_event = round(liters_per_plant_event / max(1.0, emitter_total_lph), 2)

    # Dynamic climate/soil adaptation advice
    adaptation_notes: List[str] = list(profile["yield_boosting_plan"])
    if ph < ph_min:
        adaptation_notes.insert(0, f"Local soil pH is acidic ({ph}); apply agricultural lime @ 1.5–2.0 T/acre in planting pits to bring root-zone pH into the {ph_min}–{ph_max} optimal window.")
    elif ph > ph_max:
        adaptation_notes.insert(0, f"Local soil pH is alkaline ({ph}); mix Gypsum + FYM + Sulfur-rich compost in pits to buffer root-zone pH near {ph_max}.")
    if rainfall < r_min:
        adaptation_notes.insert(0, f"Annual rainfall ({rainfall:.0f} mm) is below monsoon rainfed needs ({r_min:.0f}+ mm); precision drip with 10 cm surface mulch is essential to achieve full yield.")

    return {
        "plant_name": profile["name"],
        "scientific_name": profile["scientific_name"],
        "category": profile["category"],
        "location_analysis": {
            "zone_name": zone_info["zone_name"],
            "zone_key": zkey,
            "coordinates": {"lat": lat, "lon": lon},
            "soil_texture": texture,
            "soil_ph": ph,
            "mean_temp_c": temp,
            "annual_rainfall_mm": rainfall,
            "elevation_m": elevation,
            "slope_pct": slope
        },
        "compatibility": {
            "overall_score": overall_score,
            "verdict": verdict,
            "ph_score": round(ph_score, 1),
            "temp_score": round(temp_score, 1),
            "rain_score": round(rain_score, 1),
            "drainage_score": round(drain_score, 1)
        },
        "recommended_breeds": recommended_breeds,
        "planting_geometry": {
            "farm_size_acres": acres,
            "area_sq_m": area_sq_m,
            "row_spacing_m": row_m,
            "col_spacing_m": col_m,
            "plants_per_acre": plants_per_acre,
            "total_plants": total_plants,
            "spacing_note": profile["standard_spacing_note"]
        },
        "irrigation_plan": {
            "method": profile["irrigation_method"],
            "drippers_per_plant": profile["drippers_per_plant"],
            "emitter_lph": profile["emitter_lph"],
            "liters_per_plant_day": liters_per_plant_day,
            "interval_days": interval_days,
            "liters_per_plant_event": liters_per_plant_event,
            "total_liters_per_event": total_liters_per_event,
            "drip_run_hours_per_event": drip_hours_per_event,
            "yield_boosting_steps": adaptation_notes
        }
    }

