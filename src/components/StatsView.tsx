import React from 'react';
import { Initiative } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { Globe, Award, PieChart, Layers } from 'lucide-react';

interface StatsViewProps {
  initiatives: Initiative[];
  onSelectCountryFilter: (country: string) => void;
  onSelectCategoryFilter: (category: string) => void;
}

export const StatsView: React.FC<StatsViewProps> = ({
  initiatives,
  onSelectCountryFilter,
  onSelectCategoryFilter,
}) => {
  const total = initiatives.length;

  if (total === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        <PieChart className="w-10 h-10 mx-auto mb-2 opacity-50" />
        <p className="text-sm font-medium">No data available with current filters.</p>
      </div>
    );
  }

  // Category counts
  const categoryCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};

  initiatives.forEach((item) => {
    const cat = (item.category || 'General').trim();
    const c = (item.country || 'Undefined').trim();
    categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    countryCounts[c] = (countryCounts[c] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-6 pb-6">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>Countries</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {Object.keys(countryCounts).length}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Across LATAM & Caribbean</div>
        </div>

        <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-xl">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-3.5 h-3.5 text-emerald-600" />
            <span>Initiatives</span>
          </div>
          <div className="text-2xl font-black text-slate-900">
            {total}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">Events, schools & societies</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-indigo-600" />
            <span>By Category</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click to filter</span>
        </div>

        <div className="space-y-2.5">
          {sortedCategories.map(([category, count]) => {
            const percent = Math.round((count / total) * 100);
            const style = getCategoryStyle(category);

            return (
              <div
                key={category}
                onClick={() => onSelectCategoryFilter(category)}
                className="p-2.5 rounded-xl border border-slate-150 bg-white hover:border-indigo-300 hover:shadow-2xs transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.bg}`}></span>
                    <span className="group-hover:text-indigo-600 transition-colors">{category}</span>
                  </div>
                  <span className="text-slate-500 font-bold">
                    {count} <span className="font-normal text-slate-400">({percent}%)</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${style.bg} transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Country Breakdown */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-indigo-600" />
            <span>By Country / Region</span>
          </h3>
          <span className="text-xs text-slate-400 font-medium">Click to filter</span>
        </div>

        <div className="space-y-2">
          {sortedCountries.map(([country, count]) => {
            const percent = Math.round((count / total) * 100);

            return (
              <div
                key={country}
                onClick={() => onSelectCountryFilter(country)}
                className="p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between text-xs group"
              >
                <span className="font-semibold text-slate-700 group-hover:text-indigo-600">
                  {country}
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md min-w-[28px] text-center">
                    {count}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
