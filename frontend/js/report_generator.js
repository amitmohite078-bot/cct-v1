/**
 * AgroCloud AI - Digital Soil & Farm Health Card PDF Report Generator
 * Generates an official, publication-quality A4 printable dossier and soil health card.
 */
class FarmReportGenerator {
  generateReport(analysisData, modulesData = null) {
    if (!analysisData) {
      const lat = (window.kbvApp && window.kbvApp.currentLat) || 12.9571;
      const lon = (window.kbvApp && window.kbvApp.currentLon) || 77.5325;
      if (window.ApiClient && typeof window.ApiClient.fallbackAnalyze === "function") {
        analysisData = window.ApiClient.fallbackAnalyze(lat, lon);
      }
    }
    if (!analysisData) {
      alert("Unable to generate report: map data is still loading.");
      return;
    }

    const env = analysisData.environmental_data || {};
    const weather = env.weather || {};
    const soil = env.soil || {};
    const terrain = env.terrain || {};
    const rs = env.remote_sensing || {};
    const grid = analysisData.grid || {};
    const cs = analysisData.crop_suitability || {};
    const crops = cs.all_ranked_crops || cs.top_recommendations || cs.ranked_crops || [];
    const marketRaw = analysisData.market_profitability;
    const market = Array.isArray(marketRaw) ? marketRaw : ((marketRaw && marketRaw.ranked_profitability) || []);
    const lang = (window.AgroI18n && window.AgroI18n.getLang()) || (window.kbvApp && window.kbvApp.currentLanguage) || "en";
    const T = (k, v) => (window.AgroI18n && window.AgroI18n.t(k, lang, v)) || k;
    const locId = (window.AgroI18n && window.AgroI18n.LOCALES[lang]) || "en-IN";
    const dateStr = new Date().toLocaleDateString(locId, {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const reportId = `AGRO-${Math.abs(Math.round(grid.center ? grid.center.lat * 1000 : 19997))}-${Math.abs(Math.round(grid.center ? grid.center.lon * 1000 : 73789))}`;

    const TIER_MAP = {
      high: { en: "Highly Suitable", hi: "अत्यधिक उपयुक्त", kn: "ಅತ್ಯಂತ ಸೂಕ್ತ", te: "అత్యంత అనుకూలం", ta: "மிகவும் உகந்தது", mr: "अत्यंत योग्य", gu: "અત્યંત અનુકૂળ", bn: "অত্যন্ত উপযুক্ত", ml: "വളരെ അനുയോജ്യം", pa: "ਬਹੁਤ ਢੁਕਵਾਂ", or: "ଅତ୍ୟନ୍ତ ଉପଯୁକ୍ତ" },
      mod: { en: "Moderately Suitable", hi: "मध्यम उपयुक्त", kn: "ಮಧ್ಯಮ ಸೂಕ್ತ", te: "మధ్యస్థ అనుకూలం", ta: "மிதமான உகந்தது", mr: "मध्यम योग्य", gu: "મધ્યમ અનુકૂળ", bn: "মাঝারি উপযুক্ত", ml: "മിതമായി അനുയോജ്യം", pa: "ਦਰਮਿਆਨਾ ਢੁਕਵਾਂ", or: "ମଧ୍ୟମ ଉପଯୁକ୍ତ" }
    };

    const topCropsHtml = crops.slice(0, 5).map((c, i) => {
      const catRaw = c.recommendation_category || c.suitability_category || c.tier || c.category || "";
      const isHighly = c.category_code === 'S1' || c.tier === 'S1' || /highly/i.test(catRaw);
      const cName = (window.AgroI18n && window.AgroI18n.cropName(c.id || c.name || c.crop_name, lang)) || (c.name || c.crop_name);
      const tierLabel = (window.suitabilityRenderer && window.suitabilityRenderer.localizeRecommendation(catRaw))
        || (isHighly ? (TIER_MAP.high[lang] || TIER_MAP.high.en) : (TIER_MAP.mod[lang] || TIER_MAP.mod.en));
      const sum = (window.AgroI18n && lang !== "en") ? window.AgroI18n.localizeCropSummary(c, lang) : { pros: c.pros };
      const adv = (sum.pros && sum.pros[0]) || (c.advantages && c.advantages[0]) || c.recommendation_reason || '';
      return `
      <tr>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">#${i + 1}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1;"><b>${cName}</b></td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:center;">
          <span style="background:${isHighly ? '#dcfce7; color:#166534;' : '#fef3c7; color:#92400e;'} padding:2px 8px; border-radius:4px; font-weight:bold; font-size:0.8rem;">
            ${tierLabel} (${c.suitability_score}%)
          </span>
        </td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; font-size:0.8rem; color:#334155;">${adv}</td>
      </tr>
    `;
    }).join("");

    const qtlWord = (window.AgroI18n && window.AgroI18n.t("qtl_acre_unit", lang).split("/")[0].trim()) || "Qtl";
    const marketRowsHtml = market.slice(0, 4).map(m => {
      const mName = (window.AgroI18n && window.AgroI18n.cropName(m.crop_id || m.crop_name || m.commodity_name, lang)) || (m.crop_name || m.commodity_name || m.crop_id || '');
      return `
      <tr>
        <td style="padding:6px 10px; border:1px solid #cbd5e1;"><b>${mName}</b></td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">₹${(m.modal_price_qtl || 0).toLocaleString()}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">${m.projected_yield_per_acre_qtl || 0} ${qtlWord}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">₹${(m.cost_of_cultivation_acre_inr || 0).toLocaleString()}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right; font-weight:bold; color:${(m.net_profit_acre_inr || 0) >= 0 ? '#15803d' : '#b91c1c'};">₹${(m.net_profit_acre_inr || 0).toLocaleString()}</td>
      </tr>
    `;
    }).join("");

    const irrMod = (modulesData && (modulesData.irrigation_prediction_module || modulesData.irrigation_module)) || {};
    const et0Val = irrMod.daily_reference_et0_mm || irrMod.current_et0_mm_day || 4.8;
    const etcVal = irrMod.daily_crop_water_demand_etc_mm || irrMod.crop_water_demand_etc_mm_day || 5.5;
    const nextIrr = irrMod.next_irrigation_due || "every 5–7 days";

    const logoUrl = (typeof window !== "undefined" && window.location && window.location.protocol && window.location.protocol.startsWith("http"))
      ? new URL("assets/agronexus_logo.png?v=3.2", window.location.href).href
      : "assets/agronexus_logo.png?v=3.2";

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>${T("rep_title")} - ${reportId}</title>
        <meta charset="utf-8" />
        <style>
          @page {
            size: A4;
            margin: 12mm 15mm;
          }
          body {
            font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            padding: 0;
            font-size: 10pt;
            line-height: 1.4;
          }
          .card-header {
            border-bottom: 3px solid #166534;
            padding-bottom: 10px;
            margin-bottom: 14px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .title-area h1 {
            margin: 0;
            color: #166534;
            font-size: 16pt;
            letter-spacing: -0.3px;
          }
          .title-area p {
            margin: 2px 0 0 0;
            color: #475569;
            font-size: 8.5pt;
          }
          .badge-box {
            text-align: right;
            border-left: 2px solid #e2e8f0;
            padding-left: 14px;
          }
          .badge-box .id-text {
            font-family: monospace;
            font-weight: bold;
            color: #0f172a;
            font-size: 10pt;
          }
          .section-title {
            background: #f1f5f9;
            border-left: 4px solid #166534;
            padding: 4px 8px;
            font-weight: bold;
            font-size: 9.5pt;
            color: #1e293b;
            margin: 12px 0 6px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .grid-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }
          .grid-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 10px;
          }
          .grid-4 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 8px;
          }
          .metric-card {
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 8px 10px;
            background: #f8fafc;
          }
          .metric-label {
            font-size: 7.5pt;
            color: #64748b;
            text-transform: uppercase;
            font-weight: 600;
          }
          .metric-value {
            font-size: 11pt;
            font-weight: bold;
            color: #0f172a;
            margin-top: 2px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
            font-size: 8.5pt;
          }
          th {
            background: #e2e8f0;
            color: #1e293b;
            padding: 6px 10px;
            border: 1px solid #cbd5e1;
            font-size: 8pt;
            text-transform: uppercase;
          }
          .print-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #166534;
            color: white;
            padding: 12px 24px;
            font-weight: bold;
            border-radius: 30px;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(0,0,0,0.25);
            font-size: 14px;
          }
          @media print {
            .print-btn { display: none; }
          }
        </style>
      </head>
      <body>
        <button class="print-btn" onclick="window.print()">${T("rep_print_btn")}</button>

        <div class="card-header">
          <div class="title-area">
            <img src="${logoUrl}" alt="AgroNexus" style="height:40px; width:auto; margin-bottom:6px; display:block;" onerror="this.style.display='none';" />
            <h1>${T("rep_title")}</h1>
            <p>${T("rep_sub")}</p>
          </div>
          <div class="badge-box">
            <div class="id-text">${reportId}</div>
            <div style="font-size:8pt; color:#64748b;">${T("rep_issued")} ${dateStr}</div>
          </div>
        </div>

        <div class="section-title">${T("rep_sec_loc")}</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">${T("rep_lat")}</div>
            <div class="metric-value">${grid.center ? grid.center.lat.toFixed(5) : '19.99750'}° N</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rep_lon")}</div>
            <div class="metric-value">${grid.center ? grid.center.lon.toFixed(5) : '73.78980'}° E</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rep_cov")}</div>
            <div class="metric-value">${T("area_badge_text")}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rep_res")}</div>
            <div class="metric-value">5×5 (25)</div>
          </div>
        </div>

        <div class="section-title">${T("rep_sec_soil")}</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">${T("rep_soil_class")}</div>
            <div class="metric-value" style="font-size:9.5pt;">${(window.app && window.app.localizeSoilClass(soil.soil_classification, lang)) || soil.soil_classification || ''}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rep_soil_ph")}</div>
            <div class="metric-value" style="color:#0284c7;">${soil.ph || 7.2} <span style="font-size:7.5pt; color:#64748b;">(${(window.app && window.app.localizePhStatus(soil.ph || 7.2, lang)) || ''})</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rep_soc")}</div>
            <div class="metric-value">${soil.organic_carbon_pct || 0.68}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("drainage_class_label")}</div>
            <div class="metric-value" style="font-size:9.5pt;">${(window.app && window.app.localizeDrainage(soil.drainage || 'Well Drained', lang)) || soil.drainage || ''}</div>
          </div>
        </div>

        <div class="section-title">${T("layer_sat")}</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">${T("snap_ndvi")}</div>
            <div class="metric-value" style="color:#16a34a;">${rs.ndvi || 0.65} <span style="font-size:7.5pt; color:#16a34a;">(${(window.AgroI18n && window.AgroI18n.vegBadge(rs.vegetation_badge || 'Good', lang)) || ''})</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("sat_ndwi")}</div>
            <div class="metric-value" style="color:#0284c7;">${rs.ndwi || 0.14}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("rainfall_label")}</div>
            <div class="metric-value">${weather.annual_rainfall || 880} ${T("mm_unit")}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">${T("temp_label")}</div>
            <div class="metric-value" style="font-size:8.5pt;">${weather.average_temperature || 26.5}°C</div>
          </div>
        </div>

        <div class="section-title">${T("rep_sec_crops")}</div>
        <table>
          <thead>
            <tr>
              <th style="width:40px;">#</th>
              <th>${T("rep_col_crop")}</th>
              <th style="width:140px;">${T("rep_col_tier")}</th>
              <th>${T("rep_col_reason")}</th>
            </tr>
          </thead>
          <tbody>
            ${topCropsHtml}
          </tbody>
        </table>

        <div class="section-title">${T("rep_sec_mandi")}</div>
        <table>
          <thead>
            <tr>
              <th>${T("rep_col_crop")}</th>
              <th style="text-align:right;">${T("rep_col_rate")}</th>
              <th style="text-align:right;">${T("rep_col_yield")}</th>
              <th style="text-align:right;">${T("rep_col_cost")}</th>
              <th style="text-align:right;">${T("rep_col_profit")}</th>
            </tr>
          </thead>
          <tbody>
            ${marketRowsHtml}
          </tbody>
        </table>

        <div class="section-title">${T("rep_sec_irr")}</div>
        <div style="font-size:8pt; color:#334155; line-height:1.5; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; background:#f8fafc;">
          <b>• ET₀:</b> ${et0Val} ${T("mm_unit")} &nbsp;|&nbsp; <b>ETc:</b> ${etcVal} ${T("mm_unit")} &nbsp;|&nbsp; <b>${T("stcr_fert_sched")}:</b> ${(window.AgroI18n && window.AgroI18n.localizeDoctorModule({}, 'tomato', '', soil.ph || 7.2, lang).crop_doctor_summary) || ''}
        </div>
      </body>
      </html>
    `;

    const printWin = window.open("", "_blank");
    if (printWin) {
      printWin.document.open();
      printWin.document.write(reportHtml);
      printWin.document.close();
    } else {
      alert("Pop-up blocked. Please allow pop-ups for this site to view and download the PDF Health Card.");
    }
  }
}

window.farmReportGenerator = new FarmReportGenerator();

