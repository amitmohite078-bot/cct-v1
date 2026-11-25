package com.agrocloud.disease;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * Cultural Integrated Pest Management (IPM) Advisory Provider
 * Strict Rule: Never prescribes synthetic pesticides or chemical dosages.
 * Directs farmers to certified local extension services.
 */
@Component
public class IpmAdvisoryProvider {

    private static final Map<String, List<String>> CULTURAL_ADVICE = Map.of(
        "Tomato___Early_Blight", List.of(
            "Prune and safely destroy lower infected leaves showing concentric dark rings to prevent upward spore dispersal.",
            "Water directly at the base (drip irrigation) rather than overhead sprinkling to keep leaf surfaces dry.",
            "Mulch around the base of plants with clean straw or plastic to prevent rain-splash from soil-borne fungi.",
            "Practice at least a 2-to-3 year crop rotation with non-solanaceous crops (avoid planting following potato, pepper, or eggplant).",
            "Consult your district Agricultural Extension Office (e.g., KVK/ICAR or University Extension) for certified regional management."
        ),
        "Tomato___Late_Blight", List.of(
            "Late blight (Phytophthora infestans) spreads aggressively under cool, humid, wet conditions. Inspect surrounding rows immediately.",
            "Promptly bag and remove heavily blighted plants from the field during dry hours; do not add diseased foliage to open compost.",
            "Ensure wide row spacing to maximize canopy ventilation and sunlight penetration.",
            "Immediately notify your local agricultural extension officer or cooperative agronomist for containment protocols."
        ),
        "Tomato___Septoria_Leaf_Spot", List.of(
            "Remove initial infected leaves showing small circular lesions with dark margins.",
            "Disinfect pruning shears between plants using a 10% bleach or 70% alcohol solution.",
            "Avoid cultivating or walking through the field while foliage is wet to halt mechanical spore transmission.",
            "Consult local extension authorities for resistant variety recommendations for your district."
        ),
        "Tomato___Bacterial_Spot", List.of(
            "Bacterial spot is seed- and water-borne. Ensure future seed stock is certified disease-free.",
            "Eliminate solanaceous weeds (such as black nightshade) which act as wild bacterial reservoirs around the field edges.",
            "Avoid overhead irrigation and work in the field only when foliage is completely dry.",
            "Contact your regional government agronomy clinic for lab-confirmed identification."
        ),
        "Tomato___Healthy", List.of(
            "Foliage exhibits vigorous, healthy characteristics without prominent foliar blighting or spots.",
            "Maintain balanced nitrogen and potassium fertilization; excessive vegetative nitrogen can promote disease susceptibility.",
            "Continue periodic visual scouting once a week, particularly after extended rain events."
        ),
        "Potato___Early_Blight", List.of(
            "Prune senescing lower leaves showing dark target spots.",
            "Maintain optimal soil moisture and balanced plant nutrition to prevent early vine stress.",
            "Allow tubers to fully mature and skin-set before harvesting to prevent wound infection during storage.",
            "Consult your regional agronomic advisor for certified seed and rotation guidelines."
        ),
        "Potato___Late_Blight", List.of(
            "Late blight is a critical emergency for potato crops. Immediate field containment is essential.",
            "Destroy cull piles and volunteer potatoes near the field which serve as primary overwintering sources.",
            "Hill soil well over potato ridges to prevent swimming zoospores from washing down to tubers.",
            "Contact your district agricultural officer immediately for district-level blight warning alerts."
        ),
        "Potato___Healthy", List.of(
            "Potato foliage appears healthy and free of acute foliar blight symptoms.",
            "Keep potato hills well mounded and scout fields weekly for early disease onset."
        )
    );

    public List<String> getAdvice(String diseaseClass) {
        if (diseaseClass == null) return List.of("Consult your local agricultural extension service for on-site diagnosis.");
        return CULTURAL_ADVICE.getOrDefault(diseaseClass, List.of(
            "Maintain sanitary field practices, ensure canopy airflow, and avoid working when leaves are wet.",
            "Take representative leaf samples to your nearest certified agricultural extension clinic or university lab for professional diagnosis."
        ));
    }
}

