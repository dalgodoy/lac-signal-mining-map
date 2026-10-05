import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Initiative } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { applyJitter } from '../data/geoCoordinates';
import { RotateCcw, Layers, ZoomIn, ZoomOut, Check } from 'lucide-react';

interface InteractiveMapProps {
  initiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onSelectInitiative: (init: Initiative) => void;
  onResetView: () => void;
}

type MapTheme = 'topo' | 'osm' | 'satellite';

const MAP_THEMES: Record<
  MapTheme,
  { name: string; description: string; url: string; attribution: string; maxZoom: number }
> = {
  topo: {
    name: 'Topographic',
    description: 'Physical relief and terrain',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; World Topo Map',
    maxZoom: 19,
  },
  osm: {
    name: 'OpenStreetMap',
    description: 'Open collaborative map',
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a>',
    maxZoom: 19,
  },
  satellite: {
    name: 'Satellite',
    description: 'High-resolution imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; Esri &mdash; Earthstar Geographics',
    maxZoom: 18,
  },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  initiatives,
  selectedInitiative,
  onSelectInitiative,
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const markersMapRef = useRef<Map<string, { marker: L.Marker; lat: number; lng: number }>>(new Map());

  const [selectedTheme, setSelectedTheme] = useState<MapTheme>('topo');
  const [isLayerMenuOpen, setIsLayerMenuOpen] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [-12.0, -65.0],
      zoom: 3.5,
      zoomControl: false,
      attributionControl: true,
      minZoom: 2.5,
      maxZoom: 19,
    });

    // Default Tile Layer: Topographic (Free, no key required)
    const currentTheme = MAP_THEMES.topo;
    const tileLayer = L.tileLayer(currentTheme.url, {
      maxZoom: currentTheme.maxZoom,
      attribution: currentTheme.attribution,
    }).addTo(map);
    tileLayerRef.current = tileLayer;

    const markersLayer = L.layerGroup().addTo(map);
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Change base map layer when selectedTheme changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const theme = MAP_THEMES[selectedTheme];
    const newTileLayer = L.tileLayer(theme.url, {
      maxZoom: theme.maxZoom,
      attribution: theme.attribution,
    }).addTo(map);

    // Ensure tile layer sits behind markers
    newTileLayer.bringToBack();
    tileLayerRef.current = newTileLayer;
  }, [selectedTheme]);

  // Update Markers when initiatives change
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    if (!map || !markersLayer) return;

    markersLayer.clearLayers();
    markersMapRef.current.clear();

    // Group items by country coordinates to calculate proper jitter
    const locationCounts: Record<string, number> = {};
    initiatives.forEach((item) => {
      const key = `${item.lat.toFixed(3)},${item.lng.toFixed(3)}`;
      locationCounts[key] = (locationCounts[key] || 0) + 1;
    });

    const locationIndexes: Record<string, number> = {};

    initiatives.forEach((item) => {
      const coordKey = `${item.lat.toFixed(3)},${item.lng.toFixed(3)}`;
      const indexInLoc = locationIndexes[coordKey] || 0;
      locationIndexes[coordKey] = indexInLoc + 1;

      const [jitterLat, jitterLng] = applyJitter(
        item.lat,
        item.lng,
        indexInLoc,
        locationCounts[coordKey] || 1
      );

      const style = getCategoryStyle(item.category);

      // Custom divIcon with Tailwind classes
      const iconHtml = `
        <div class="group relative cursor-pointer transform transition-all duration-300 hover:scale-125">
          <div class="w-8 h-8 rounded-full ${style.bg} flex items-center justify-center text-white shadow-lg border-2 border-white ring-2 ${style.ring}">
            <span class="text-[11px] font-black">${item.category.charAt(0).toUpperCase()}</span>
          </div>
          <div class="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center shadow-xs border border-slate-200">
            <div class="w-2 h-2 rounded-full ${style.bg}"></div>
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-leaflet-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([jitterLat, jitterLng], { icon: customIcon });

      const displayLocation = item.locationRaw
        ? (item.locationRaw.toLowerCase().includes(item.country.toLowerCase())
            ? item.locationRaw
            : `${item.locationRaw}, ${item.country}`)
        : item.country;

      const popupHtml = `
        <div class="p-4 max-w-[290px] font-sans text-slate-800">
          <div class="flex items-center justify-between gap-2 mb-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${style.bgLight} ${style.text} border ${style.border} uppercase tracking-wider">
              ${item.category}
            </span>
            <span class="text-[11px] text-slate-500 font-semibold flex items-center gap-1 truncate max-w-[150px]" title="${displayLocation}">
              📍 ${displayLocation}
            </span>
          </div>
          
          <h4 class="font-extrabold text-slate-900 text-sm leading-snug mb-1">
            ${item.name}
          </h4>

          ${item.topic && item.topic !== 'General' ? `
            <p class="text-xs font-bold text-indigo-600 mb-2">
              ${item.topic}
            </p>
          ` : ''}

          <p class="text-xs text-slate-600 font-normal leading-relaxed mb-3 line-clamp-3">
            ${item.description}
          </p>

          <div class="flex items-center justify-between pt-2 border-t border-slate-100 mt-2">
            ${item.url ? `
              <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-xs text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 hover:underline">
                <span>Website</span>
                <span>↗</span>
              </a>
            ` : '<span class="text-[11px] text-slate-400 italic">No link available</span>'}
            
            <button id="popup-detail-btn-${item.id}" class="text-xs bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer">
              View details
            </button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 320,
        className: 'custom-map-popup',
      });

      marker.on('popupopen', () => {
        const btn = document.getElementById(`popup-detail-btn-${item.id}`);
        if (btn) {
          btn.onclick = () => onSelectInitiative(item);
        }
      });

      marker.on('click', () => {
        onSelectInitiative(item);
      });

      marker.addTo(markersLayer);
      markersMapRef.current.set(item.id, { marker, lat: jitterLat, lng: jitterLng });
    });
  }, [initiatives, onSelectInitiative]);

  // Handle zooming when an initiative is selected
  useEffect(() => {
    if (!selectedInitiative || !mapInstanceRef.current) return;
    const entry = markersMapRef.current.get(selectedInitiative.id);
    if (entry) {
      mapInstanceRef.current.flyTo([entry.lat, entry.lng], 8, {
        duration: 1.2,
      });
      entry.marker.openPopup();
    }
  }, [selectedInitiative]);

  const handleResetMap = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.flyTo([-12.0, -65.0], 3.5, { duration: 1.0 });
  };

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomIn();
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.zoomOut();
  };

  return (
    <div className="relative w-full h-full bg-slate-100 overflow-hidden">
      {/* Map canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" id="leaflet-map-canvas" />

      {/* Floating Map Controls */}
      <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2 shadow-sm">
        {/* Reset View */}
        <button
          onClick={handleResetMap}
          title="Reset view to Latin America & Caribbean"
          className="p-2.5 bg-white hover:bg-slate-50 text-slate-700 rounded-xl shadow-md border border-slate-200 transition-all flex items-center justify-center hover:text-indigo-600 group cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-45" />
        </button>

        {/* Layer Switcher Toggle */}
        <div className="relative">
          <button
            onClick={() => setIsLayerMenuOpen(!isLayerMenuOpen)}
            title="Change map style"
            className={`p-2.5 rounded-xl shadow-md border transition-all flex items-center justify-center cursor-pointer ${
              isLayerMenuOpen
                ? 'bg-indigo-600 text-white border-indigo-700'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:text-indigo-600'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>

          {/* Layer Selector Dropdown */}
          {isLayerMenuOpen && (
            <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-[500] animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                <div className="text-xs font-bold text-slate-800">Map Style</div>
                <div className="text-[10px] text-slate-500 font-medium flex items-center gap-1">
                  Base Tile Layers
                </div>
              </div>
              <div className="space-y-1">
                {(Object.keys(MAP_THEMES) as MapTheme[]).map((themeKey) => {
                  const theme = MAP_THEMES[themeKey];
                  const isSelected = selectedTheme === themeKey;
                  return (
                    <button
                      key={themeKey}
                      onClick={() => {
                        setSelectedTheme(themeKey);
                        setIsLayerMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                          : 'hover:bg-slate-50 text-slate-700 font-medium'
                      }`}
                    >
                      <div>
                        <div>{theme.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">
                          {theme.description}
                        </div>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Zoom Controls */}
        <div className="flex flex-col bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <button
            onClick={handleZoomIn}
            title="Zoom in"
            className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors border-b border-slate-100 flex items-center justify-center hover:text-indigo-600 cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            title="Zoom out"
            className="p-2.5 hover:bg-slate-50 text-slate-700 transition-colors flex items-center justify-center hover:text-indigo-600 cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Legend on bottom left of map */}
      <div className="hidden sm:flex absolute bottom-4 left-4 z-[400] bg-white/95 backdrop-blur-xs px-3.5 py-2.5 rounded-xl border border-slate-200 shadow-md flex-wrap items-center gap-3 text-xs font-medium text-slate-700">
        <div className="flex items-center gap-1.5 font-bold text-slate-900 pr-1 border-r border-slate-200">
          <Layers className="w-3.5 h-3.5 text-indigo-600" />
          <span>Categories:</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-100"></span>
          <span>School</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 ring-2 ring-rose-100"></span>
          <span>Regional Conf.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100"></span>
          <span>National Conf.</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 ring-2 ring-indigo-100"></span>
          <span>Society</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500 ring-2 ring-purple-100"></span>
          <span>One-time Event</span>
        </div>
      </div>
    </div>
  );
};
