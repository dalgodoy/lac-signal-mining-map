import React, { useState } from 'react';
import { Initiative, DataSourceState } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { StatsView } from './StatsView';
import { 
  Search, 
  Filter, 
  MapPin, 
  ExternalLink, 
  Navigation, 
  FileSpreadsheet, 
  RotateCcw, 
  Layers, 
  BarChart3, 
  Tag, 
  Info,
  X
} from 'lucide-react';

interface SidebarProps {
  initiatives: Initiative[];
  filteredInitiatives: Initiative[];
  selectedInitiative: Initiative | null;
  onSelectInitiative: (initiative: Initiative) => void;
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCountry: string;
  onCountryChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  onResetFilters: () => void;
  dataSource: DataSourceState;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  initiatives,
  filteredInitiatives,
  selectedInitiative,
  onSelectInitiative,
  searchTerm,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  dataSource,
  isOpenMobile,
  onCloseMobile,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'stats'>('list');

  // Extract unique countries and categories
  const countries = Array.from(new Set(initiatives.map((i) => i.country).filter(Boolean))).sort();
  const categories = Array.from(new Set(initiatives.map((i) => i.category).filter(Boolean))).sort();

  const hasActiveFilters = searchTerm !== '' || selectedCountry !== 'all' || selectedCategory !== 'all';

  return (
    <aside
      className={`w-full lg:w-[440px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0 z-30 transition-transform duration-300 transform h-full absolute lg:relative shadow-xl lg:shadow-none ${
        isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
    >
      {/* Search & Filter Header */}
      <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-white">
        {/* Search input with clear button */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por nombre, tema, país, autor..."
            className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filter Dropdowns */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              País / Región
            </label>
            <select
              value={selectedCountry}
              onChange={(e) => onCountryChange(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="all">Todos los países ({countries.length})</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full py-2 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700"
            >
              <option value="all">Todas las categorías</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters Reset Bar */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between pt-1 text-xs">
            <span className="text-slate-500 font-medium">
              Mostrando <strong className="text-slate-800">{filteredInitiatives.length}</strong> de {initiatives.length}
            </span>
            <button
              onClick={onResetFilters}
              className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 text-[11px]"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Limpiar filtros</span>
            </button>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 text-xs font-bold uppercase tracking-wider bg-slate-50/60 flex-shrink-0">
        <button
          onClick={() => setActiveTab('list')}
          className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'list'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Iniciativas ({filteredInitiatives.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`flex-1 py-3 text-center border-b-2 flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'stats'
              ? 'border-indigo-600 text-indigo-600 bg-white'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Estadísticas</span>
        </button>
      </div>

      {/* Dynamic Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {activeTab === 'list' ? (
          <>
            {filteredInitiatives.length === 0 ? (
              <div className="text-center py-16 px-4 text-slate-400">
                <Info className="w-10 h-10 mx-auto mb-3 opacity-40" />
                <p className="font-semibold text-slate-700 text-sm">No se encontraron iniciativas</p>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Prueba cambiando tus términos de búsqueda o limpiando los filtros seleccionados.
                </p>
                <button
                  onClick={onResetFilters}
                  className="mt-4 px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-colors inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restablecer filtros</span>
                </button>
              </div>
            ) : (
              filteredInitiatives.map((item) => {
                const style = getCategoryStyle(item.category);
                const isSelected = selectedInitiative?.id === item.id;

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectInitiative(item);
                      if (window.innerWidth < 1024) onCloseMobile();
                    }}
                    className={`bg-white border rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group shadow-2xs ${
                      isSelected
                        ? 'border-indigo-500 ring-2 ring-indigo-100 shadow-md'
                        : 'border-slate-200 hover:border-indigo-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Left category color stripe */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${style.bg}`} />

                    <div className="pl-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${style.bgLight} ${style.text} border ${style.border} uppercase tracking-wider`}>
                          {item.category}
                        </span>
                        <span
                          className="text-xs text-slate-500 flex items-center gap-1 font-semibold truncate max-w-[140px]"
                          title={item.locationRaw ? `${item.locationRaw} (${item.country})` : item.country}
                        >
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{item.locationRaw || item.country}</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 mt-2 text-sm group-hover:text-indigo-600 transition-colors leading-snug">
                        {item.name}
                      </h4>

                      {item.topic && item.topic !== 'General' && (
                        <p className="text-xs font-semibold text-indigo-600 mt-1 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          <span>{item.topic}</span>
                        </p>
                      )}

                      <p className="text-xs text-slate-600 mt-2 line-clamp-2 font-normal leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pl-2 pt-2.5 border-t border-slate-100">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Sitio Web</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Sin enlace directo</span>
                      )}

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectInitiative(item);
                          if (window.innerWidth < 1024) onCloseMobile();
                        }}
                        className="text-xs bg-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-700 font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Navigation className="w-3 h-3" />
                        <span>Ubicar</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        ) : (
          <StatsView
            initiatives={filteredInitiatives}
            onSelectCountryFilter={(country) => {
              onCountryChange(country);
              setActiveTab('list');
            }}
            onSelectCategoryFilter={(cat) => {
              onCategoryChange(cat);
              setActiveTab('list');
            }}
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col gap-1.5 flex-shrink-0">
        <div className="flex items-center gap-1.5 text-slate-700">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-bold text-[11px]">Sincronización en vivo</span>
        </div>
        <div className="text-[11px] text-slate-500 leading-tight">
          Los cambios realizados en la planilla de Google se reflejan de forma automática en el mapa.
        </div>
      </div>
    </aside>
  );
};
