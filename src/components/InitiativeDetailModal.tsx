import React from 'react';
import { Initiative } from '../types';
import { getCategoryStyle } from '../data/fallbackData';
import { X, ExternalLink, MapPin, Tag, HelpCircle, Navigation } from 'lucide-react';

interface InitiativeDetailModalProps {
  initiative: Initiative | null;
  onClose: () => void;
  onLocateOnMap: (initiative: Initiative) => void;
}

export const InitiativeDetailModal: React.FC<InitiativeDetailModalProps> = ({
  initiative,
  onClose,
  onLocateOnMap,
}) => {
  if (!initiative) return null;

  const style = getCategoryStyle(initiative.category);

  return (
    <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar with Category Accent */}
        <div className={`h-2.5 w-full ${style.bg}`} />

        <div className="p-6">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${style.bgLight} ${style.text} border ${style.border} uppercase tracking-wider`}>
                {initiative.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {initiative.country}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title */}
          <h2 className="text-xl font-extrabold text-slate-900 leading-snug mb-2">
            {initiative.name}
          </h2>

          {/* Topic Badge */}
          {initiative.topic && initiative.topic !== 'General' && (
            <div className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600 mb-4 bg-indigo-50/70 px-3 py-1.5 rounded-xl border border-indigo-100 inline-flex">
              <Tag className="w-3.5 h-3.5" />
              <span>{initiative.topic}</span>
            </div>
          )}

          {/* Description */}
          <div className="mb-5 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Descripción / Resumen
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {initiative.description}
            </p>
          </div>

          {/* Extra Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {initiative.potentialFollowUp && (
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Seguimiento</div>
                  <div className="text-xs font-semibold text-slate-800">{initiative.potentialFollowUp}</div>
                </div>
              </div>
            )}

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  {initiative.locationRaw ? 'Ubicación' : 'Ubicación aproximada'}
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {initiative.locationRaw
                    ? (initiative.locationRaw.toLowerCase().includes(initiative.country.toLowerCase())
                        ? initiative.locationRaw
                        : `${initiative.locationRaw}, ${initiative.country}`)
                    : initiative.cityName}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
            {initiative.url ? (
              <a
                href={initiative.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all"
              >
                <span>Visitar Sitio Oficial</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <span className="text-xs text-slate-400 italic">No incluye enlace web directo</span>
            )}

            <button
              onClick={() => {
                onLocateOnMap(initiative);
                onClose();
              }}
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Centrar en Mapa</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
