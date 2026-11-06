/**
 * AgroCloud AI - Leaflet Map & Geo-Spatial Boundary Manager
 */
class MapManager {
  constructor(containerId) {
    this.containerId = containerId;
    this.map = null;
    this.marker = null;
    this.gridPolygon = null;
    this.subgridLayerGroup = null;
    this.currentTileLayer = null;
    this.activeLayerMode = "satellite"; // "satellite", "osm", "suitability", "soil", "elevation"
    this.lastAnalysisData = null;
    this.onLocationChangeCallback = null;
    
    // Standard Tile Providers
    this.tileProviders = {
      satellite: L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
        attribution: "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
        maxZoom: 19
      }),
      osm: L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19
      }),
      carto: L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{y}/{x}{r}.png", {
        attribution: "&copy; CartoDB",
        maxZoom: 19
      })
    };
  }

  init(initialLat = 19.9975, initialLon = 73.7898) {
    const el = document.getElementById(this.containerId);
    if (!el) {
      console.log(`Map container #${this.containerId} not currently in DOM.`);
      return;
    }

    if (typeof L === "undefined") {
      console.warn("Leaflet library not yet loaded. Rendering interactive vector map canvas.");
      this.renderFallbackCanvas(initialLat, initialLon);
      return;
    }

    if (el._leaflet_id) {
      return;
    }

    try {
      this.map = L.map(this.containerId, {
        center: [initialLat, initialLon],
        zoom: 14,
        zoomControl: true
      });

      this.currentTileLayer = this.tileProviders.satellite;
      this.currentTileLayer.addTo(this.map);

      this.subgridLayerGroup = L.layerGroup().addTo(this.map);

      // Centroid marker with drag capability
      const centerIcon = L.divIcon({
        className: "custom-center-marker",
        html: `<div style="background:#10b981; width:22px; height:22px; border-radius:50%; border:3px solid #ffffff; box-shadow:0 0 14px rgba(16,185,129,0.9); display:flex; align-items:center; justify-content:center; color:#064e3b; font-size:10px; font-weight:bold;">★</div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11]
      });

      this.marker = L.marker([initialLat, initialLon], {
        icon: centerIcon,
        draggable: true
      }).addTo(this.map);

      // Drag end listener
      this.marker.on("dragend", (e) => {
        const pos = e.target.getLatLng();
        if (this.onLocationChangeCallback) {
          this.onLocationChangeCallback(pos.lat, pos.lng);
        }
      });

      // Map click listener to select new 1km area
      this.map.on("click", (e) => {
        const { lat, lng } = e.latlng;
        this.marker.setLatLng([lat, lng]);
        if (this.onLocationChangeCallback) {
          this.onLocationChangeCallback(lat, lng);
        }
      });

      // Add scale control
      L.control.scale({ imperial: false, metric: true, maxWidth: 200 }).addTo(this.map);

      // Invalidate size to ensure full container fill
      setTimeout(() => {
        if (this.map) this.map.invalidateSize();
      }, 250);
    } catch (err) {
      console.warn("Leaflet initialization failed, falling back to vector canvas:", err);
      this.renderFallbackCanvas(initialLat, initialLon);
    }
  }

  renderFallbackCanvas(lat, lon, analysisData = null) {
    const el = document.getElementById(this.containerId);
    if (!el) return;

    const data = analysisData || this.lastAnalysisData;
    const subcells = (data && data.grid && data.grid.subgrid_cells) ? data.grid.subgrid_cells : [];

    let cellsHtml = "";
    if (subcells.length > 0) {
      cellsHtml = subcells.map(c => `
        <div style="background:rgba(16,185,129,0.18); border:1px solid rgba(52,211,153,0.3); border-radius:4px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.7rem; color:#a7f3d0; cursor:pointer;" onclick="alert('Sub-cell ${c.cell_id}\\nCenter: ${c.center.lat.toFixed(5)}, ${c.center.lon.toFixed(5)}\\nArea: 200m x 200m (4 ha)')">
          <span>${c.cell_id}</span>
          <span style="font-size:0.6rem; color:#34d399;">200m</span>
        </div>
      `).join("");
    } else {
      // 5x5 default grid cells
      for (let i = 0; i < 25; i++) {
        cellsHtml += `
          <div style="background:rgba(16,185,129,0.18); border:1px solid rgba(52,211,153,0.3); border-radius:4px; display:flex; flex-direction:column; align-items:center; justify-content:center; font-size:0.7rem; color:#a7f3d0;">
            <span>Cell ${i+1}</span>
            <span style="font-size:0.6rem; color:#34d399;">200m</span>
          </div>
        `;
      }
    }

    el.innerHTML = `
      <div style="width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#0b150f; position:relative; overflow:hidden; padding:20px;">
        <div style="position:absolute; top:16px; left:20px; background:rgba(18,30,23,0.9); border:1px solid #10b981; border-radius:8px; padding:8px 14px; font-size:0.82rem; color:#a7f3d0; z-index:100;">
          📍 <b>Interactive 1 km × 1 km Geographical Analysis Grid</b><br>
          Centroid: ${lat.toFixed(5)}, ${lon.toFixed(5)} &bull; Area: 1.00 km² (100 hectares)
        </div>

        <div style="width:80%; max-width:550px; aspect-ratio:1; border:3px dashed #10b981; border-radius:12px; background:rgba(16,185,129,0.06); padding:10px; display:grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr); gap:6px; box-shadow:0 0 30px rgba(16,185,129,0.2); position:relative;">
          ${cellsHtml}
          <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:32px; height:32px; background:#10b981; border:3px solid #ffffff; border-radius:50%; box-shadow:0 0 16px rgba(16,185,129,1); display:flex; align-items:center; justify-content:center; color:#064e3b; font-weight:bold; font-size:14px; pointer-events:none;">
            ★
          </div>
        </div>

        <div style="margin-top:14px; font-size:0.75rem; color:#94a3b8; text-align:center;">
          Showing true 1 km × 1 km geodesic boundary (500m N, S, E, W from centroid).<br>
          Click any preset or enter village/city in the search bar above to re-center.
        </div>
      </div>
    `;
  }

  setOnLocationChange(callback) {
    this.onLocationChangeCallback = callback;
  }

  updateGrid(analysisData) {
    this.lastAnalysisData = analysisData;
    const { grid, environmental_data, crop_suitability } = analysisData;
    const center = grid.center;

    if (!this.map) {
      this.renderFallbackCanvas(center.lat, center.lon, analysisData);
      return;
    }

    // Pan map to center smoothly
    this.map.setView([center.lat, center.lon], 15, { animate: true });
    this.marker.setLatLng([center.lat, center.lon]);

    // Clear existing polygon and subgrids
    if (this.gridPolygon) {
      this.map.removeLayer(this.gridPolygon);
    }
    this.subgridLayerGroup.clearLayers();

    // 1. Draw Outer 1 km x 1 km Boundary Polygon
    const corners = [
      [grid.corners.north_west.lat, grid.corners.north_west.lon],
      [grid.corners.north_east.lat, grid.corners.north_east.lon],
      [grid.corners.south_east.lat, grid.corners.south_east.lon],
      [grid.corners.south_west.lat, grid.corners.south_west.lon]
    ];

    this.gridPolygon = L.polygon(corners, {
      color: "#10b981",
      weight: 3,
      dashArray: "6, 6",
      fillColor: "#10b981",
      fillOpacity: 0.08
    }).addTo(this.map);

    this.gridPolygon.bindTooltip(
      `<b>1 km × 1 km Analysis Grid</b><br>Area: ${grid.area_km2} km² (${grid.area_hectares} ha / ${grid.area_acres} acres)<br>N-S: ${grid.dimensions.north_south_meters}m | E-W: ${grid.dimensions.east_west_meters}m`,
      { permanent: false, direction: "top", className: "grid-boundary-tooltip" }
    );

    // 2. Render Sub-Grid Cells (5x5 = 25 Micro-Cells)
    this.renderSubgridLayers();
  }

  setLayerMode(mode) {
    this.activeLayerMode = mode;
    
    // Switch base tile layer if needed
    if (mode === "osm" && this.currentTileLayer !== this.tileProviders.osm) {
      this.map.removeLayer(this.currentTileLayer);
      this.currentTileLayer = this.tileProviders.osm;
      this.currentTileLayer.addTo(this.map);
    } else if (mode !== "osm" && this.currentTileLayer !== this.tileProviders.satellite) {
      this.map.removeLayer(this.currentTileLayer);
      this.currentTileLayer = this.tileProviders.satellite;
      this.currentTileLayer.addTo(this.map);
    }

    if (this.lastAnalysisData) {
      this.renderSubgridLayers();
    }
  }

  renderSubgridLayers() {
    this.subgridLayerGroup.clearLayers();
    if (!this.lastAnalysisData) return;

    const data = this.lastAnalysisData;
    const cells = data.grid.subgrid_cells || [];
    const heatmapData = (data.crop_suitability && data.crop_suitability.top_crop_subgrid_heatmap)
      ? data.crop_suitability.top_crop_subgrid_heatmap.cells : [];
    
    const heatMapLookup = {};
    heatmapData.forEach(h => heatMapLookup[h.cell_id] = h);

    const soilSubcells = (data.environmental_data && data.environmental_data.soil.subgrid_analysis) || [];
    const soilLookup = {};
    soilSubcells.forEach(s => soilLookup[s.cell_id] = s);

    const terrainSubcells = (data.environmental_data && data.environmental_data.terrain.subgrid_elevations) || [];
    const terrainLookup = {};
    terrainSubcells.forEach(t => terrainLookup[t.cell_id] = t);

    cells.forEach(cell => {
      const b = cell.bounds;
      const cellBounds = [[b.south, b.west], [b.north, b.east]];
      
      let fillColor = "transparent";
      let fillOpacity = 0.12;
      let popupContent = `<b>Sub-Cell ${cell.cell_id}</b> (200m × 200m = 4 ha)<br>`;

      const hInfo = heatMapLookup[cell.cell_id] || {};
      const sInfo = soilLookup[cell.cell_id] || {};
      const tInfo = terrainLookup[cell.cell_id] || {};

      const score = hInfo.suitability_score || 80.0;
      const ph = sInfo.ph || data.environmental_data.soil.ph;
      const clay = sInfo.clay_pct || data.environmental_data.soil.texture_fractions.clay_pct;
      const elev = tInfo.elevation_m || data.environmental_data.terrain.elevation_m;
      const slope = tInfo.slope_pct || data.environmental_data.terrain.slope_pct;

      if (this.activeLayerMode === "suitability") {
        // Color interpolation for crop suitability (Red <50, Amber 50-74, Green >=75)
        fillOpacity = 0.45;
        if (score >= 85) fillColor = "#10b981"; // Bright Green
        else if (score >= 75) fillColor = "#34d399"; // Green
        else if (score >= 65) fillColor = "#f59e0b"; // Gold
        else if (score >= 50) fillColor = "#fbbf24"; // Amber
        else fillColor = "#ef4444"; // Red
        
        popupContent += `
          <b>Top Crop Suitability:</b> ${score}/100<br>
          <b>Sub-cell pH:</b> ${ph}<br>
          <b>Clay Content:</b> ${clay}%<br>
          <b>Elevation:</b> ${elev}m (Slope: ${slope}%)
        `;
      } else if (this.activeLayerMode === "soil") {
        // Soil pH & texture gradient
        fillOpacity = 0.45;
        if (ph < 6.0) fillColor = "#f97316"; // Acidic orange
        else if (ph <= 7.8) fillColor = "#06b6d4"; // Optimum cyan/teal
        else fillColor = "#8b5cf6"; // Alkaline purple
        
        popupContent += `
          <b>Soil Classification:</b> ${data.environmental_data.soil.soil_classification}<br>
          <b>Sub-cell pH:</b> ${ph} (${ph < 6.0 ? 'Acidic' : (ph > 7.8 ? 'Alkaline' : 'Optimal Neutral')})<br>
          <b>Clay:</b> ${clay}% | <b>Texture:</b> ${sInfo.texture_class || 'Clay Loam'}<br>
          <b>Drainage:</b> ${data.environmental_data.soil.drainage}
        `;
      } else if (this.activeLayerMode === "elevation") {
        // Topography elevation and slope
        fillOpacity = 0.40;
        if (slope < 1.5) fillColor = "#3b82f6"; // Flat plain
        else if (slope < 4.0) fillColor = "#10b981"; // Gentle slope
        else fillColor = "#eab308"; // Undulating slope

        popupContent += `
          <b>Elevation:</b> ${elev} meters a.s.l.<br>
          <b>Local Slope:</b> ${slope}% (${slope < 2.0 ? 'Mechanization Optimal' : 'Requires Contouring'})<br>
          <b>Flood Hazard:</b> ${data.environmental_data.terrain.flood_risk.level}<br>
          <b>Land Cover:</b> ${data.environmental_data.terrain.land_cover}
        `;
      } else {
        // Standard Satellite / OSM outline
        fillColor = "#10b981";
        fillOpacity = 0.08;
        popupContent += `
          <b>Center:</b> ${cell.center.lat.toFixed(5)}, ${cell.center.lon.toFixed(5)}<br>
          <b>Micro-Elevation:</b> ${elev}m | <b>Slope:</b> ${slope}%<br>
          <b>Soil pH:</b> ${ph} | <b>Clay:</b> ${clay}%
        `;
      }

      const rect = L.rectangle(cellBounds, {
        color: "#34d399",
        weight: 1,
        opacity: 0.6,
        fillColor: fillColor,
        fillOpacity: fillOpacity
      });

      rect.bindPopup(popupContent);
      this.subgridLayerGroup.addLayer(rect);
    });
  }

  async detectBrowserLocation() {
    // 1. First attempt: High-Precision GPS / Wi-Fi Position (Real Device Hardware)
    if (navigator.geolocation) {
      try {
        console.log("Requesting high-accuracy geolocation from browser...");
        const pos = await this._getGpsPosition({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0
        });
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const acc = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : null;
        
        if (this.marker) this.marker.setLatLng([lat, lon]);
        if (this.map) this.map.setView([lat, lon], 16);
        
        return {
          lat,
          lon,
          accuracy: acc,
          source: acc ? `Exact GPS / Device Location (±${acc}m accuracy)` : "Exact Device Location"
        };
      } catch (gpsError) {
        console.warn("High-accuracy GPS request failed, trying standard device location...", gpsError);
        
        // 1b. Try standard accuracy if high-accuracy timed out
        try {
          const pos = await this._getGpsPosition({
            enableHighAccuracy: false,
            timeout: 8000,
            maximumAge: 0
          });
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          if (this.marker) this.marker.setLatLng([lat, lon]);
          if (this.map) this.map.setView([lat, lon], 15);
          return { lat, lon, source: "Standard Device Location" };
        } catch (stdError) {
          console.warn("Standard browser geolocation failed:", stdError);
        }
      }
    }

    // 2. Second attempt: Network IP-based Geolocation (works seamlessly on desktop & file:// protocol)
    if (window.ApiClient && typeof window.ApiClient.getIpLocation === "function") {
      try {
        const ipLoc = await window.ApiClient.getIpLocation();
        if (ipLoc && ipLoc.latitude && ipLoc.longitude) {
          const lat = ipLoc.latitude;
          const lon = ipLoc.longitude;
          if (this.marker) this.marker.setLatLng([lat, lon]);
          if (this.map) this.map.setView([lat, lon], 14);
          return { lat, lon, source: ipLoc.source || `Network Location (${ipLoc.location_name || 'Detected Area'})` };
        }
      } catch (err) {
        console.warn("ApiClient IP location failed:", err);
      }
    }

    try {
      console.log("Attempting direct network IP geolocation fallback...");
      let ipRes = await fetch("https://get.geojs.io/v1/ip/geo.json", { cache: "no-cache" });
      if (!ipRes.ok) {
        ipRes = await fetch("https://ipapi.co/json/");
      }
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        const lat = parseFloat(ipData.latitude);
        const lon = parseFloat(ipData.longitude);
        if (!isNaN(lat) && !isNaN(lon)) {
          if (this.marker) this.marker.setLatLng([lat, lon]);
          if (this.map) this.map.setView([lat, lon], 14);
          const placeDesc = [ipData.city, ipData.region, ipData.country].filter(Boolean).join(", ");
          return { lat, lon, source: `Network IP Location (${placeDesc || 'Detected Region'})` };
        }
      }
    } catch (ipError) {
      console.warn("Network IP geolocation fallback failed:", ipError);
    }

    // 3. If all automated methods fail, trigger manual selection mode
    throw new Error("Location permission was denied or device is offline. Please click your farm location on the map or search your village/city.");
  }

  _getGpsPosition(options) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  }
}

window.MapManager = MapManager;

