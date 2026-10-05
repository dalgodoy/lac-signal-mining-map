import React, { useState, useMemo } from 'react';
import { Initiative } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { 
  Search, 
  MapPin, 
  ExternalLink, 
  Map as MapIcon, 
  Tag, 
  RotateCcw, 
  Grid, 
  List, 
  Building2, 
  Info
} from 'lucide-react';

interface DirectoryPageProps {
  initiatives: Initiative[];
  searchTerm: string;
  onSearchChange: (val: string) => void;
  selectedCountry: string;
  onCountryChange: (val: string) => void;
  selectedCategory: string;
  onCategoryChange: (val: string) => void;
  onResetFilters: () => void;
  onSelectInitiative: (initiative: Initiative) => void;
  onGoToMapWithInitiative: (initiative: Initiative) => void;
}

export const DirectoryPage: React.FC<DirectoryPageProps> = ({
  initiatives,
  searchTerm,
  onSearchChange,
  selectedCountry,
  onCountryChange,
  selectedCategory,
  onCategoryChange,
  onResetFilters,
  onSelectInitiative,
  onGoToMapWithInitiative,
}) => {
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortBy, setSortBy] = useState<'name' | 'country' | 'category'>('name');

  // Unique lists for filter dropdowns
  const countries = useMemo(() => {
    return Array.from(new Set(initiatives.map((i) => i.country).filter(Boolean))).sort();
  }, [initiatives]);

  const categories = useMemo(() => {
    return Array.from(new Set(initiatives.map((i) => i.category).filter(Boolean))).sort();
  }, [initiatives]);

  // Filter initiatives
  const filtered = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();
    return initiatives
      .filter((item) => {
        const matchesSearch =
          !query ||
          item.name.toLowerCase().includes(query) ||
          item.topic.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.country.toLowerCase().includes(query) ||
          (item.locationRaw && item.locationRaw.toLowerCase().includes(query));

        const matchesCountry =
          selectedCountry === 'all' || item.country.trim() === selectedCountry;
        const matchesCategory =
          selectedCategory === 'all' || item.category.trim() === selectedCategory;

        return matchesSearch && matchesCountry && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'country') return a.country.localeCompare(b.country);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        return a.name.localeCompare(b.name);
      });
  }, [initiatives, searchTerm, selectedCountry, selectedCategory, sortBy]);

  const hasActiveFilters = searchTerm !== '' || selectedCountry !== 'all' || selectedCategory !== 'all';

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
                <Building2 className="w-3.5 h-3.5" />
                <span>Community Directory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Computing Initiatives Directory
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Explore schools, conferences, symposia, and scientific societies across Latin America and the Caribbean.
              </p>
            </div>

            {/* View Mode Toggle & Counter */}
            <div className="flex items-center gap-3 self-start md:self-auto">
              <div className="bg-white border border-slate-200 p-1 rounded-xl shadow-2xs flex items-center">
                <button
                  onClick={() => setViewMode('cards')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'cards'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Card view"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === 'table'
                      ? 'bg-indigo-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="Table view"
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
              </div>

              <div className="bg-slate-900 text-white px-3 py-2 rounded-xl text-xs font-bold shadow-2xs whitespace-nowrap">
                <span>{filtered.length}</span>
                <span className="text-slate-400 font-normal ml-1">initiatives</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs mb-6 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search by institution, topic, country, author..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
              />
            </div>

            {/* Country */}
            <div>
              <select
                value={selectedCountry}
                onChange={(e) => onCountryChange(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">All countries ({countries.length})</option>
                {countries.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium text-slate-700 cursor-pointer"
              >
                <option value="all">All categories ({categories.length})</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-bar: Sort & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                Sort by:
              </span>
              <button
                onClick={() => setSortBy('name')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  sortBy === 'name' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Name
              </button>
              <button
                onClick={() => setSortBy('country')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  sortBy === 'country' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Country
              </button>
              <button
                onClick={() => setSortBy('category')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-colors cursor-pointer ${
                  sortBy === 'category' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Category
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1.5 text-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Display */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
            <Info className="w-12 h-12 text-slate-400 mx-auto mb-3 opacity-60" />
            <h3 className="text-base font-bold text-slate-900">No initiatives found</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              No results match the selected terms or filters. Try resetting the filters to view all initiatives.
            </p>
            <button
              onClick={onResetFilters}
              className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Show full catalog</span>
            </button>
          </div>
        ) : viewMode === 'cards' ? (
          /* Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item) => {
              const style = getCategoryStyle(item.category);
              return (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 hover:border-indigo-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                >
                  {/* Top color indicator line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${style.bg}`} />

                  <div>
                    {/* Header badges */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold ${style.bgLight} ${style.text} border ${style.border} uppercase tracking-wider`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{item.locationRaw || item.country}</span>
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-slate-900 text-base group-hover:text-indigo-600 transition-colors leading-snug">
                      {item.name}
                    </h3>

                    {/* Topic */}
                    {item.topic && (
                      <p className="text-xs font-semibold text-indigo-700 mt-1.5 flex items-center gap-1.5">
                        <Tag className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span className="line-clamp-1">{item.topic}</span>
                      </p>
                    )}

                    {/* Description */}
                    {item.description ? (
                      <p className="text-xs text-slate-600 mt-2.5 line-clamp-3 leading-relaxed">
                        {item.description}
                      </p>
                    ) : null}

                    {item.suggestedBy && (
                      <div className="mt-3 text-[11px] text-slate-400">
                        Suggested by: <span className="font-medium text-slate-600">{item.suggestedBy}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 hover:underline"
                        >
                          <span>Website</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">No link</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onGoToMapWithInitiative(item)}
                        className="p-2 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                        title="Locate on Map"
                      >
                        <MapIcon className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Map</span>
                      </button>

                      <button
                        onClick={() => onSelectInitiative(item)}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3.5 px-4">Initiative / Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Country / Location</th>
                    <th className="py-3.5 px-4">Topic / Area</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => {
                    const style = getCategoryStyle(item.category);
                    return (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          <div>{item.name}</div>
                          {item.url && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-indigo-600 hover:underline inline-flex items-center gap-1 mt-0.5"
                            >
                              <span className="truncate max-w-[200px]">{item.url}</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${style.bgLight} ${style.text} border ${style.border}`}>
                            {item.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-700 font-medium">
                          {item.locationRaw || item.country}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                          {item.topic}
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => onGoToMapWithInitiative(item)}
                              className="p-1.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 rounded-md transition-colors cursor-pointer"
                              title="Locate on Map"
                            >
                              <MapIcon className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onSelectInitiative(item)}
                              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-md font-bold transition-colors cursor-pointer"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
