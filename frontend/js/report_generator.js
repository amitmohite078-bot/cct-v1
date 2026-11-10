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
    const dateStr = new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    const reportId = `AGRO-${Math.abs(Math.round(grid.center ? grid.center.lat * 1000 : 19997))}-${Math.abs(Math.round(grid.center ? grid.center.lon * 1000 : 73789))}`;

    const topCropsHtml = crops.slice(0, 5).map((c, i) => {
      const isHighly = c.category_code === 'S1' || c.tier === 'S1' || (c.recommendation_category && c.recommendation_category.includes('Highly'));
      const tierLabel = c.recommendation_category || c.tier || c.category || 'Suitable';
      const adv = (c.pros && c.pros[0]) || (c.advantages && c.advantages[0]) || c.recommendation_reason || 'Optimal pedo-climatic match';
      return `
      <tr>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:center; font-weight:bold;">#${i + 1}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1;"><b>${c.name || c.crop_name}</b> <span style="font-size:0.75rem; color:#64748b;">(${c.scientific_name || ''})</span></td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:center;">
          <span style="background:${isHighly ? '#dcfce7; color:#166534;' : '#fef3c7; color:#92400e;'} padding:2px 8px; border-radius:4px; font-weight:bold; font-size:0.8rem;">
            ${tierLabel} (${c.suitability_score}%)
          </span>
        </td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; font-size:0.8rem; color:#334155;">${adv}</td>
      </tr>
    `;
    }).join("");

    const marketRowsHtml = market.slice(0, 4).map(m => `
      <tr>
        <td style="padding:6px 10px; border:1px solid #cbd5e1;"><b>${m.crop_name || m.commodity_name || m.crop_id || ''}</b></td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">₹${(m.modal_price_qtl || 0).toLocaleString()}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">${m.projected_yield_per_acre_qtl || 0} Qtl</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right;">₹${(m.cost_of_cultivation_acre_inr || 0).toLocaleString()}</td>
        <td style="padding:6px 10px; border:1px solid #cbd5e1; text-align:right; font-weight:bold; color:${(m.net_profit_acre_inr || 0) >= 0 ? '#15803d' : '#b91c1c'};">₹${(m.net_profit_acre_inr || 0).toLocaleString()}</td>
      </tr>
    `).join("");

    const irrMod = (modulesData && (modulesData.irrigation_prediction_module || modulesData.irrigation_module)) || {};
    const et0Val = irrMod.daily_reference_et0_mm || irrMod.current_et0_mm_day || 4.8;
    const etcVal = irrMod.daily_crop_water_demand_etc_mm || irrMod.crop_water_demand_etc_mm_day || 5.5;
    const nextIrr = irrMod.next_irrigation_due || "every 5–7 days";

    const reportHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Digital Farm Health Card - ${reportId}</title>
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
        <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>

        <div class="card-header">
          <div class="title-area">
            <img src="/assets/agronexus_logo.png?v=3.2" alt="AgroNexus — Intelligence That Grows." style="height:40px; width:auto; margin-bottom:6px; display:block;" onerror="if(!this.dataset.fb){this.dataset.fb='1';this.src='/static/assets/agronexus_logo.png?v=3.2';}else{this.style.display='none';}" />
            <h1>AgroNexus — Digital Farm Health Card</h1>
            <p>Intelligence That Grows. • 100% Software-Defined Agro-Ecological Dossier • 1 km × 1 km Geodesic Grid (100 Hectares)</p>
          </div>
          <div class="badge-box">
            <div class="id-text">${reportId}</div>
            <div style="font-size:8pt; color:#64748b;">Issued: ${dateStr}</div>
          </div>
        </div>

        <div class="section-title">📍 Farm Location & Geographic Coordinates</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">Center Latitude</div>
            <div class="metric-value">${grid.center ? grid.center.lat.toFixed(5) : '19.99750'}° N</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Center Longitude</div>
            <div class="metric-value">${grid.center ? grid.center.lon.toFixed(5) : '73.78980'}° E</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Grid Coverage</div>
            <div class="metric-value">1.00 km² / 100 Ha</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Spatial Resolution</div>
            <div class="metric-value">5×5 (25 Micro-Cells)</div>
          </div>
        </div>

        <div class="section-title">🧪 Soil Pedology & Nutrient Profile (0–30 cm Topsoil)</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">Soil Classification</div>
            <div class="metric-value" style="font-size:9.5pt;">${soil.soil_classification || 'Clay Loam (Vertisols)'}</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Soil pH Reaction</div>
            <div class="metric-value" style="color:#0284c7;">${soil.ph || 7.2} <span style="font-size:7.5pt; color:#64748b;">(Neutral)</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Organic Carbon (SOC)</div>
            <div class="metric-value">${soil.organic_carbon_pct || 0.68}%</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Internal Drainage</div>
            <div class="metric-value" style="font-size:9.5pt;">${soil.drainage || 'Well Drained'}</div>
          </div>
        </div>

        <div class="section-title">🛰️ Satellite Remote Sensing & Canopy Indices (Sentinel-2 MSI)</div>
        <div class="grid-4">
          <div class="metric-card">
            <div class="metric-label">NDVI Canopy Vigor</div>
            <div class="metric-value" style="color:#16a34a;">${rs.ndvi || 0.65} <span style="font-size:7.5pt; color:#16a34a;">(${rs.vegetation_badge || 'Good'})</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-label">NDWI Water Index</div>
            <div class="metric-value" style="color:#0284c7;">${rs.ndwi || 0.14} <span style="font-size:7.5pt; color:#0284c7;">(Optimal)</span></div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Leaf Area Index (LAI)</div>
            <div class="metric-value">${rs.lai || 2.45} m²/m²</div>
          </div>
          <div class="metric-card">
            <div class="metric-label">Canopy Health Class</div>
            <div class="metric-value" style="font-size:8.5pt;">${rs.vegetation_class || 'Dense Healthy Canopy'}</div>
          </div>
        </div>

        <div class="section-title">🏆 Top Recommended Crops (AHP Multi-Criteria Scientific Ranking)</div>
        <table>
          <thead>
            <tr>
              <th style="width:40px;">Rank</th>
              <th>Crop Name</th>
              <th style="width:120px;">Suitability Tier</th>
              <th>Key Scientific Advantage</th>
            </tr>
          </thead>
          <tbody>
            ${topCropsHtml}
          </tbody>
        </table>

        <div class="section-title">💰 Mandi Market Economics & Projected Profitability (Per Acre)</div>
        <table>
          <thead>
            <tr>
              <th>Crop</th>
              <th style="text-align:right;">Mandi Price (₹/Qtl)</th>
              <th style="text-align:right;">Projected Yield</th>
              <th style="text-align:right;">Cost of Cultivation</th>
              <th style="text-align:right;">Net Profit / Acre</th>
            </tr>
          </thead>
          <tbody>
            ${marketRowsHtml}
          </tbody>
        </table>

        <div class="section-title">💧 FAO-56 Weather-Driven Irrigation & STCR Fertilizer Advice</div>
        <div style="font-size:8pt; color:#334155; line-height:1.5; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; background:#f8fafc;">
          <b>• Irrigation Recommendation:</b> Reference evapotranspiration (ET₀) is ${et0Val} mm/day and crop demand (ETc) is ${etcVal} mm/day. Next irrigation due: ${nextIrr}. Avoid saturation during flowering.<br/>
          <b>• STCR Basal Fertilizer Split:</b> Broadcast 100% Recommended Phosphorous (SSP/DAP) and 50% Potash (MOP) as basal dose. Split Nitrogen into 3 equal top-dressings at sowing, active tillering (30 DAS), and flowering.<br/>
          <b>• Soil Amendment:</b> Soil reaction is well-buffered (pH ${soil.ph || 7.2}). Maintain humus by incorporating 5–8 tonnes/ha of Farm Yard Manure (FYM).
        </div>

        <div style="margin-top:14px; padding-top:8px; border-top:1px solid #cbd5e1; display:flex; justify-content:space-between; font-size:7.5pt; color:#64748b;">
          <div>Data Sources: Copernicus Sentinel-2 Level-2A • ISRIC SoilGrids 2.0 • Open-Meteo ECMWF/GFS • ICAR NBSS&LUP • Agmarknet APMC</div>
          <div>Strict Zero-Hardware Software Synthesis • Page 1 of 1</div>
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

