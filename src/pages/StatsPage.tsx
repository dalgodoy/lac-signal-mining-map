import React, { useMemo } from 'react';
import { Initiative } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { 
  BarChart3, 
  Globe, 
  Award, 
  GraduationCap, 
  Users, 
  Layers, 
  ArrowRight,
  Cpu,
  Calendar
} from 'lucide-react';

interface StatsPageProps {
  initiatives: Initiative[];
  onFilterByCountry: (country: string) => void;
  onFilterByCategory: (category: string) => void;
  onGoToDirectory: () => void;
}

export const StatsPage: React.FC<StatsPageProps> = ({
  initiatives,
  onFilterByCountry,
  onFilterByCategory,
  onGoToDirectory,
}) => {
  const total = initiatives.length;

  const stats = useMemo(() => {
    const categoryCounts: Record<string, number> = {};
    const countryCounts: Record<string, number> = {};
    const topicKeywords: Record<string, number> = {};

    let schoolsCount = 0;
    let regionalConfCount = 0;
    let nationalConfCount = 0;
    let societiesCount = 0;
    let oneTimeCount = 0;

    initiatives.forEach((item) => {
      // Category
      const cat = (item.category || 'General').trim();
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;

      const lowerCat = cat.toLowerCase();
      if (lowerCat.includes('school') || lowerCat.includes('escuela')) schoolsCount++;
      else if (lowerCat.includes('regional')) regionalConfCount++;
      else if (lowerCat.includes('national') || lowerCat.includes('nacional')) nationalConfCount++;
      else if (lowerCat.includes('society') || lowerCat.includes('sociedad')) societiesCount++;
      else if (lowerCat.includes('one-time') || lowerCat.includes('non-recurrent')) oneTimeCount++;

      // Country
      const country = (item.country || 'Undefined').trim();
      countryCounts[country] = (countryCounts[country] || 0) + 1;

      // Topic words
      if (item.topic && item.topic !== 'General') {
        const words = item.topic.split(/[,/&+\s]+/).map(w => w.trim()).filter(w => w.length > 2);
        words.forEach(w => {
          const norm = w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
          if (!['And', 'The', 'Del', 'Los', 'Las', 'Para', 'Con', 'Una', 'Por'].includes(norm)) {
            topicKeywords[norm] = (topicKeywords[norm] || 0) + 1;
          }
        });
      }
    });

    const sortedCategories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
    const sortedCountries = Object.entries(countryCounts).sort((a, b) => b[1] - a[1]);
    const topKeywords = Object.entries(topicKeywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 14);

    return {
      categoryCounts,
      countryCounts,
      sortedCategories,
      sortedCountries,
      schoolsCount,
      regionalConfCount,
      nationalConfCount,
      societiesCount,
      oneTimeCount,
      topKeywords,
      totalCountries: Object.keys(countryCounts).length,
    };
  }, [initiatives]);

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytical Overview</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Computing Initiatives in LATAM & Caribbean
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Key ecosystem metrics: distribution by country, category breakdown, research schools, and scientific societies across the region.
          </p>
        </div>

        {/* Top 5 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Initiatives</span>
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Layers className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{total}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Total registered</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Countries</span>
              <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{stats.totalCountries}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Countries & areas</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Societies</span>
              <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{stats.societiesCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Scientific societies</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Schools</span>
              <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
                <GraduationCap className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{stats.schoolsCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Training schools</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">One-time Events</span>
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 mt-2">{stats.oneTimeCount}</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Special editions</p>
          </div>
        </div>

        {/* Charts & Distributions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Category Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Distribution by Category
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-400">Click to filter</span>
              </div>

              <div className="space-y-3.5">
                {stats.sortedCategories.map(([cat, count]) => {
                  const percent = Math.round((count / total) * 100);
                  const style = getCategoryStyle(cat);
                  return (
                    <div
                      key={cat}
                      onClick={() => onFilterByCategory(cat)}
                      className="p-3 bg-slate-50/70 hover:bg-indigo-50/50 rounded-xl border border-slate-150 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between text-xs font-bold mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${style.bg}`} />
                          <span className="text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {cat}
                          </span>
                        </div>
                        <span className="text-slate-600">
                          {count} ({percent}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
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

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Filter directly in the directory</span>
              <button
                onClick={onGoToDirectory}
                className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Go to Directory</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Country Distribution */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Initiatives by Country or Region
                  </h3>
                </div>
                <span className="text-xs font-semibold text-slate-400">Click to filter</span>
              </div>

              <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                {stats.sortedCountries.map(([country, count]) => {
                  const percent = Math.round((count / total) * 100);
                  return (
                    <div
                      key={country}
                      onClick={() => onFilterByCountry(country)}
                      className="p-2.5 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all cursor-pointer flex items-center justify-between text-xs group"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-indigo-600">
                        {country}
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden hidden sm:block">
                          <div
                            className="h-full bg-indigo-600 transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-lg min-w-[32px] text-center">
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">{stats.totalCountries} countries represented</span>
              <button
                onClick={onGoToDirectory}
                className="text-indigo-600 hover:text-indigo-800 font-bold inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View all in table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Topics & Emerging Areas Cloud */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <Cpu className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              Focus Areas & Regional Highlights
            </h3>
          </div>
          <p className="text-xs text-slate-500 mb-4">
            Most frequent topics and subject keywords identified across registered initiatives.
          </p>

          <div className="flex flex-wrap gap-2">
            {stats.topKeywords.map(([kw, count], idx) => (
              <span
                key={kw}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-transform hover:scale-105 cursor-default ${
                  idx < 3
                    ? 'bg-indigo-600 text-white text-xs shadow-2xs'
                    : idx < 7
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs'
                    : 'bg-slate-100 text-slate-700 text-xs'
                }`}
              >
                <span>{kw}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                  idx < 3 ? 'bg-indigo-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
