"""
AgroCloud AI - Integrated Disease Detection & Diagnostic Module
Provides crop-specific disease and pest diagnostics for recommended crops,
including symptomatology, environmental triggers, bio-control, and chemical treatments.
"""
from typing import Dict, Any, List

CROP_DISEASES: Dict[str, List[Dict[str, Any]]] = {
    "maize": [
        {
            "disease_id": "maize_fall_armyworm",
            "name": "Fall Armyworm (Spodoptera frugiperda)",
            "pathogen_type": "Pest / Insect Larva",
            "symptoms": "Ragged holes in leaves, heavy sawdust-like frass inside whorls, damaged emerging tassels.",
            "favorable_conditions": "Warm temperatures (24-30°C), dry spells followed by light showers.",
            "organic_control": "Apply Neem oil (Azadirachtin 1500 ppm @ 5 ml/L) or Bacillus thuringiensis (Bt @ 2 g/L) directly into whorls.",
            "chemical_control": "Spinetoram 11.7% SC @ 0.5 ml/L or Chlorantraniliprole 18.5% SC @ 0.4 ml/L.",
            "preventive_measures": "Erect pheromone traps @ 5/acre, maintain clean border rows, plant companion legume crops (desmodium)."
        },
        {
            "disease_id": "maize_northern_leaf_blight",
            "name": "Northern Corn Leaf Blight (Exserohilum turcicum)",
            "pathogen_type": "Fungal",
            "symptoms": "Long, elliptical grayish-green or tan lesions on lower leaves progressing upwards, creating burnt appearance.",
            "favorable_conditions": "Moderate temperatures (18-27°C) with persistent leaf wetness and high relative humidity (>85%).",
            "organic_control": "Foliar spray of Trichoderma harzianum @ 5 g/L and copper oxychloride @ 2.5 g/L at first sign of lesions.",
            "chemical_control": "Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L.",
            "preventive_measures": "Crop rotation with non-host pulses, destruction of infected stubbles after harvest, use resistant hybrid cultivars."
        },
        {
            "disease_id": "maize_common_rust",
            "name": "Common Rust (Puccinia sorghi)",
            "pathogen_type": "Fungal",
            "symptoms": "Small, powdery golden-brown to cinnamon pustules on both upper and lower leaf surfaces.",
            "favorable_conditions": "Cool nights (16-22°C), humid mornings with dew, overcast skies.",
            "organic_control": "Spray wettable sulfur 80% WP @ 3 g/L.",
            "chemical_control": "Propiconazole 25% EC @ 1 ml/L or Tebuconazole 25.9% EC @ 1 ml/L.",
            "preventive_measures": "Ensure balanced nitrogen nutrition; avoid excess urea which promotes succulent vegetative growth vulnerable to spores."
        }
    ],
    "rice": [
        {
            "disease_id": "rice_blast",
            "name": "Rice Blast (Magnaporthe oryzae)",
            "pathogen_type": "Fungal",
            "symptoms": "Spindle-shaped diamond lesions with grayish centers and brown margins on leaves; rotting of panicle neck (neck blast).",
            "favorable_conditions": "High relative humidity (>90%), nighttime dew formation, cloudy overcast weather, excess nitrogen fertilizer.",
            "organic_control": "Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed; foliar spray @ 2.5 kg/ha.",
            "chemical_control": "Tricyclazole 75% WP @ 0.6 g/L or Isoprothiolane 40% EC @ 1.5 ml/L.",
            "preventive_measures": "Split nitrogen application into 3-4 top dressings; avoid continuous stagnant water during outbreak."
        },
        {
            "disease_id": "rice_bacterial_leaf_blight",
            "name": "Bacterial Leaf Blight (Xanthomonas oryzae)",
            "pathogen_type": "Bacterial",
            "symptoms": "Wavy, yellowish-white water-soaked lesions along leaf margins from tips downward; leaves turn straw-colored and curl.",
            "favorable_conditions": "Wind-driven heavy monsoon rains, warm days (25-34°C), flooded fields.",
            "organic_control": "Spray fresh cow dung slurry supernatant (20%) mixed with neem oil (3%).",
            "chemical_control": "Streptocycline (90:10) @ 6 g + Copper Oxychloride 50% WP @ 250 g in 200 L water per acre.",
            "preventive_measures": "Clip seedling tips before transplanting; maintain field drainage channels."
        }
    ],
    "wheat": [
        {
            "disease_id": "wheat_yellow_rust",
            "name": "Yellow / Stripe Rust (Puccinia striiformis)",
            "pathogen_type": "Fungal",
            "symptoms": "Bright yellow pustules arranged in linear stripes between leaf veins, producing yellow powdery mass.",
            "favorable_conditions": "Cool humid weather (10-18°C), persistent fog and morning dew.",
            "organic_control": "Bio-spray with Trichoderma viride @ 5 g/L with cow urine solution (10%).",
            "chemical_control": "Propiconazole 25% EC (Tilt) @ 1 ml/L or Tebuconazole 25% WG @ 1 g/L.",
            "preventive_measures": "Grow resistant cultivars (e.g., HD-2967, DBW-187); avoid late sowing."
        }
    ],
    "cotton": [
        {
            "disease_id": "cotton_pink_bollworm",
            "name": "Pink Bollworm (Pectinophora gossypiella)",
            "pathogen_type": "Pest / Moth Larva",
            "symptoms": "Rosetted flowers, premature boll opening, damaged locules, stained lint, circular exit holes in mature bolls.",
            "favorable_conditions": "Continuous warm weather (26-34°C) with sporadic rainfall.",
            "organic_control": "Install pheromone traps @ 8/acre for monitoring; release Trichogramma egg parasitoids @ 60,000/acre.",
            "chemical_control": "Profenofos 50% EC @ 2 ml/L or Emamectin benzoate 5% SG @ 0.5 g/L.",
            "preventive_measures": "Terminate crop by December; avoid ratoon cotton cultivation."
        }
    ],
    "tomato": [
        {
            "disease_id": "tomato_early_blight",
            "name": "Early Blight (Alternaria solani)",
            "pathogen_type": "Fungal",
            "symptoms": "Concentric dark brown rings ('target board' pattern) on older lower leaves, followed by leaf yellowing and defoliation.",
            "favorable_conditions": "Warm temperatures (24-29°C) with alternating wet and dry periods.",
            "organic_control": "Spray Bacillus subtilis @ 5 ml/L or Trichoderma @ 5 g/L mixed with bio-potassium soap.",
            "chemical_control": "Chlorothalonil 75% WP @ 2 g/L or Azoxystrobin 23% SC @ 1 ml/L.",
            "preventive_measures": "Mulch beds to prevent soil splashing; stake plants and prune lower sucker branches."
        }
    ],
    "onion": [
        {
            "disease_id": "onion_purple_blotch",
            "name": "Purple Blotch (Alternaria porri)",
            "pathogen_type": "Fungal",
            "symptoms": "Small water-soaked lesions that turn purple-brown with concentric rings; leaves break at lesion site.",
            "favorable_conditions": "Warm humid conditions (25-30°C, RH >80%) with intermittent rain.",
            "organic_control": "Spray garlic bulb extract (5%) or Neem seed kernel extract (NSKE 5%).",
            "chemical_control": "Difenoconazole 25% EC @ 1 ml/L or Mancozeb 75% WP @ 2.5 g/L.",
            "preventive_measures": "Maintain spacing for air circulation; avoid overhead sprinkler irrigation."
        }
    ],
    "soybean": [
        {
            "disease_id": "soybean_yellow_mosaic",
            "name": "Yellow Mosaic Virus (MYMV)",
            "pathogen_type": "Viral (Vector: Whitefly)",
            "symptoms": "Bright yellow and green mosaic patches on leaves, stunted growth, reduced pod filling.",
            "favorable_conditions": "Hot dry weather (28-36°C) favoring rapid whitefly vector multiplication.",
            "organic_control": "Install yellow sticky traps @ 15/acre; spray Neem oil @ 5 ml/L.",
            "chemical_control": "Thiamethoxam 25% WG @ 0.3 g/L or Acetamiprid 20% SP @ 0.4 g/L to control whitefly vector.",
            "preventive_measures": "Rogue out infected plants early; cultivate tolerant varieties like JS-20-29, JS-20-34."
        }
    ],
    "groundnut": [
        {
            "disease_id": "groundnut_tikka",
            "name": "Tikka Leaf Spot (Cercospora personata)",
            "pathogen_type": "Fungal",
            "symptoms": "Circular dark necrotic spots surrounded by bright yellow halo on older leaves, causing defoliation.",
            "favorable_conditions": "Prolonged high humidity (RH >85%) and temperatures between 24-28°C.",
            "organic_control": "Foliar spray with Pseudomonas fluorescens @ 10 g/L or Neem oil 1500 ppm @ 3 ml/L.",
            "chemical_control": "Mancozeb 75% WP @ 2 g/L or Carbendazim 50% WP @ 1 g/L.",
            "preventive_measures": "Seed treatment with Trichoderma harzianum @ 10 g/kg seed; crop rotation."
        }
    ],
    "ragi": [
        {
            "disease_id": "ragi_blast",
            "name": "Ragi Blast (Pyricularia grisea)",
            "pathogen_type": "Fungal",
            "symptoms": "Spindle-shaped lesions on leaves; neck infection causes earheads to break and chaffy grains.",
            "favorable_conditions": "High humidity (>90%) with cloudy weather and intermittent drizzles.",
            "organic_control": "Seed treatment with Pseudomonas fluorescens @ 10 g/kg; foliar spray @ 2 g/L.",
            "chemical_control": "Kitazin 48% EC @ 2 ml/L or Tricyclazole 75% WP @ 0.6 g/L.",
            "preventive_measures": "Grow blast-tolerant varieties like GPU-28, ML-365; balanced nitrogen fertilization."
        }
    ]
}

def get_crop_diseases(crop_id: str) -> List[Dict[str, Any]]:
    """Returns disease diagnostics for the selected crop."""
    # Normalize crop_id
    base_id = crop_id.lower()
    if "pulse" in base_id:
        base_id = "soybean" # Closest legume proxy if specific pulse entry missing
    return CROP_DISEASES.get(base_id, CROP_DISEASES.get("maize", []))

