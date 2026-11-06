"""
AgroCloud AI - AI Crop Doctor & Agronomist Advisory Module
Provides personalized, scientifically grounded agronomic counsel for the selected crop,
calibrated to the exact 1 km x 1 km edaphic and meteorological parameters.
"""
from typing import Dict, Any, List
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

    # Base recommendation adjustments
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

def answer_crop_doctor_question(crop_name: str, question: str, field_data: Dict[str, Any]) -> str:
    """Answers farmer questions contextually."""
    q = question.lower()
    ph = field_data.get("ph", 7.0)
    texture = field_data.get("texture", "Loam")
    temp = field_data.get("temperature", 27.0)
    
    if "fertilizer" in q or "urea" in q or "npk" in q:
        return (
            f"For {crop_name} on your {texture} soil, a balanced 120:60:40 N:P:K kg/ha ratio is recommended. "
            f"Apply all Phosphorus (DAP or SSP) as basal at sowing. Split Urea into 3 equal doses: at sowing, "
            f"at 30 days (knee-high/tillering), and at flowering. Because soil pH is {ph}, avoid surface broadcasting urea in hot sunshine to prevent ammonia volatilization."
        )
    elif "water" in q or "irrigation" in q or "rain" in q:
        return (
            f"At current ambient temperatures around {temp}°C, {crop_name} requires irrigation every 6 to 9 days "
            f"depending on whether rain falls. Critical moisture-sensitive stages are flowering and grain development. "
            f"Never allow waterlogging in {texture} soil, as standing water for >24 hours starves root systems of oxygen."
        )
    elif "pest" in q or "disease" in q or "spray" in q or "insect" in q:
        return (
            f"For pest and disease control in {crop_name}, conduct weekly field scouting. Look under lower leaves for "
            f"egg masses or early rust pustules. For organic control, spray Neem Seed Kernel Extract (5% NSKE) or Azadirachtin 1500 ppm @ 5ml/L. "
            f"If chemical control is necessary, use systemic fungicides/insecticides strictly according to label dosages and observe the withholding period."
        )
    elif "sow" in q or "plant" in q or "seed" in q:
        return (
            f"Ensure seeds are certified and certified germinable (>85%). Treat seeds with Trichoderma harzianum @ 5g/kg seed. "
            f"Sow at a uniform depth of 3 to 5 cm into moist soil. Maintain appropriate row-to-row spacing (e.g. 60 cm x 20 cm for maize) "
            f"to ensure optimal plant population and light interception."
        )
    else:
        return (
            f"Regarding '{question}': In your 1 km² area with {texture} soil and {temp}°C temperature, {crop_name} "
            f"requires balanced nutrient stewardship, proactive pest monitoring, and proper soil aeration. "
            f"Make sure to follow the recommended irrigation schedule and soil amendments to maximize yield potential."
        )

