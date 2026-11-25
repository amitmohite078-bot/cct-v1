/**
 * KBV Precision-Ag Custom Vector Icon Registry
 * Crisp 24x24 monoline SVG icons using currentColor to match Cloud Dancer 2026 tokens.
 */
(function () {
  const S = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.85" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"';

  const PATHS = {
    // Brand & Core Navigation
    brand_leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.8-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
    map: '<polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/>',
    crops: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8Z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2Z"/>',
    soil: '<path d="M10 2v7.31l-4.95 8.5A2 2 0 0 0 6.78 21h10.44a2 2 0 0 0 1.73-3.19L14 9.31V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/>',
    water: '<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>',
    mandi: '<path d="M6 3h12"/><path d="M6 8h12"/><path d="M6 13l8.5 8"/><path d="M6 13h3a4 4 0 0 0 0-5"/>',
    doctor: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>',

    // Distinct Botanical Crop Silhouettes
    crop_tomato: '<path d="M12 7c-4.5 0-8 3-8 7.5C4 18.8 7.5 21 12 21s8-2.2 8-6.5C20 10 16.5 7 12 7Z"/><path d="M12 7V3"/><path d="M9 6.5c1.5.5 3 .5 3-1 0 1.5 1.5 1.5 3 1"/>',
    crop_rice: '<path d="M12 21V9"/><path d="M12 9c0-3 3-5 6-5"/><path d="M14 5.5l1.5 1.5"/><path d="M17 4.2l1.2 1.8"/><path d="M12 13l-3-2"/><path d="M12 16l3-2"/>',
    crop_wheat: '<path d="M12 22V3"/><path d="M12 7L8.5 4.5"/><path d="M12 7l3.5-2.5"/><path d="M12 11l-3.5-2.5"/><path d="M12 11l3.5-2.5"/><path d="M12 15l-3.5-2.5"/><path d="M12 15l3.5-2.5"/>',
    crop_maize: '<path d="M12 3c2.4 0 4 2.5 4 7.5 0 3.5-1.5 6.5-4 8.5-2.5-2-4-5-4-8.5C8 5.5 9.6 3 12 3Z"/><path d="M7 11c0 5 2 8.5 5 10"/><path d="M17 11c0 5-2 8.5-5 10"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="8.5" y1="12" x2="15.5" y2="12"/>',
    crop_cotton: '<circle cx="12" cy="8" r="3"/><circle cx="8.5" cy="12.5" r="2.8"/><circle cx="15.5" cy="12.5" r="2.8"/><path d="M7 16c1.5 2.5 3.5 3.5 5 3.5s3.5-1 5-3.5"/><line x1="12" y1="19.5" x2="12" y2="22"/>',
    crop_soybean: '<path d="M5 17c2-7 8-12 14-12-1 6-6 12-14 12Z"/><circle cx="9.5" cy="13.5" r="1.3"/><circle cx="13" cy="10.8" r="1.3"/><circle cx="16.2" cy="8.2" r="1.1"/>',
    crop_onion: '<path d="M12 3v3"/><path d="M10 4l2-1 2 1"/><path d="M12 6c-4.5 2-6.5 5.5-6.5 9a6.5 6.5 0 0 0 13 0c0-3.5-2-7-6.5-9Z"/><path d="M12 6c-1.8 2.8-2.2 6.2-1.5 11.8"/><path d="M12 6c1.8 2.8 2.2 6.2 1.5 11.8"/>',
    crop_groundnut: '<path d="M8.5 5.5a3.5 3.5 0 0 1 5.7-.9c1.3 1.4.8 3.2-.2 4.6a2.5 2.5 0 0 0 0 3.2c1.2 1.5 1.8 3.6.3 5.2a3.8 3.8 0 0 1-5.5.2c-1.3-1.4-.9-3.4.1-4.8a2.5 2.5 0 0 0 0-3.2c-1-1.4-1.6-3.1-.4-4.3Z"/>',
    crop_sugarcane: '<line x1="10" y1="3" x2="10" y2="21"/><line x1="14" y1="3" x2="14" y2="21"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="9" y1="14" x2="15" y2="14"/><path d="M14 6l5-2"/><path d="M10 11L5 9"/>',

    // Action, Telemetry & Utility Icons
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8"/><path d="M3.6 15h16.8"/><path d="M12 3a14 14 0 0 1 0 18"/><path d="M12 3a14 14 0 0 0 0 18"/>',
    doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    gps: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>',
    search: '<circle cx="11" cy="11" r="7"/><line x1="20" y1="20" x2="16.2" y2="16.2"/>',
    bolt: '<polygon points="13 2 4 14 12 14 11 22 20 10 12 10 13 2"/>',
    satellite: '<path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/>',
    mountain: '<path d="m8 3 4 8 5-5 5 15H2L8 3z"/>',
    microscope: '<path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/>',
    scale: '<line x1="12" y1="3" x2="12" y2="20"/><line x1="6" y1="20" x2="18" y2="20"/><path d="M5 7h14"/><path d="m5 7-2.5 5h5L5 7Z"/><path d="m19 7-2.5 5h5L19 7Z"/>',
    weather: '<path d="M12 2v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="M15.95 11.95a4 4 0 1 0-6.83-2.5"/><path d="M17.5 19H7a4 4 0 0 1 0-8 4.5 4.5 0 0 1 8.8-1A3.5 3.5 0 0 1 17.5 19Z"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="m21 16-5-5-6 6-2-2-5 5"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
    clock: '<circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15.5 14"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    bulb: '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    refresh: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    bank: '<path d="M3 21h18"/><path d="M3 10h18"/><path d="M5 6l7-3 7 3"/><path d="M4 10v11"/><path d="M20 10v11"/><path d="M8 14v3"/><path d="M12 14v3"/><path d="M16 14v3"/>',
    tractor: '<path d="M4 11V7a1 1 0 0 1 1-1h6l2 5"/><circle cx="7" cy="17" r="4"/><circle cx="18" cy="18" r="2.5"/><path d="M11 17h4.5"/><path d="M13 11h5l2 3v3"/><line x1="16" y1="6" x2="16" y2="11"/>',
    speaker: '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>',
    stop: '<rect x="6" y="6" width="12" height="12" rx="2"/>',
    stethoscope: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/>',
    pest: '<path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3 3 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.5 13H2"/><path d="M22 13h-4.5"/>',
    rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
  };

  function cropKeyToIcon(cropId) {
    const id = (cropId || "").toLowerCase();
    if (id.includes("tomato")) return "crop_tomato";
    if (id.includes("rice")) return "crop_rice";
    if (id.includes("wheat")) return "crop_wheat";
    if (id.includes("maize")) return "crop_maize";
    if (id.includes("cotton")) return "crop_cotton";
    if (id.includes("soybean") || id.includes("pulses")) return "crop_soybean";
    if (id.includes("onion")) return "crop_onion";
    if (id.includes("groundnut")) return "crop_groundnut";
    if (id.includes("sugarcane")) return "crop_sugarcane";
    return "crops";
  }

  function kbvIcon(name, size = 15, extraClass = "") {
    const p = PATHS[name] || PATHS.crops;
    return `<svg class="kbv-svg ${extraClass}" width="${size}" height="${size}" ${S}>${p}</svg>`;
  }

  function hydrateKbvIcons(root = document) {
    root.querySelectorAll("[data-icon]").forEach((el) => {
      const name = el.getAttribute("data-icon");
      const size = parseInt(el.getAttribute("data-size") || "15", 10);
      el.innerHTML = kbvIcon(name, size);
    });
  }

  window.KBV_ICONS = PATHS;
  window.kbvIcon = kbvIcon;
  window.kbvCropIcon = cropKeyToIcon;
  window.hydrateKbvIcons = hydrateKbvIcons;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => hydrateKbvIcons());
  } else {
    hydrateKbvIcons();
  }
})();

