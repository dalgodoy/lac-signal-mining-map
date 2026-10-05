import React from 'react';
import { 
  Info, 
  ServerOff, 
  Zap, 
  ShieldCheck, 
  FileSpreadsheet, 
  ExternalLink, 
  Globe, 
  Heart, 
  Layers, 
  Code2, 
  CheckCircle2,
  FolderGit2
} from 'lucide-react';
import { DEFAULT_SHEET_URL } from '../data/fallbackData';

interface AboutPageProps {
  onGoToMap: () => void;
  onGoToDirectory: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onGoToMap,
  onGoToDirectory,
}) => {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold mb-2">
            <Info className="w-3.5 h-3.5" />
            <span>Página Estática • Acerca del Proyecto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Mapa de Iniciativas de Computación en LATAM & Caribe
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Un catálogo visual, abierto y colaborativo para visibilizar, articular y fortalecer el ecosistema científico, educativo y tecnológico de las ciencias de la computación en América Latina y el Caribe.
          </p>
        </div>

        {/* Why Static Pages Section */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
              <ServerOff className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Arquitectura de Páginas Estáticas (Sin Procesamiento en Servidor)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Este sitio web fue diseñado siguiendo el paradigma de <strong>aplicación estática autónoma (JAMstack / Static Web Pages)</strong>. A diferencia de las plataformas tradicionales que requieren servidores dinámicos, bases de datos SQL propietarias o procesamiento en la nube, esta plataforma ofrece ventajas técnicas directas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-2.5">
                <Zap className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Rendimiento Inmediato</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Todo el código HTML, JS y CSS se sirve estáticamente desde cualquier CDN. No hay demoras por "cold-starts", cuellos de botella ni latencia de servidor.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center mb-2.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Seguridad & Privacidad</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Al no haber backend ni base de datos expuesta, la superficie de ataque es cero. Las búsquedas, filtros y vistas se procesan exclusivamente en tu navegador.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2.5">
                <FolderGit2 className="w-4 h-4" />
              </div>
              <h4 className="text-xs font-bold text-slate-900">Despliegue Universal</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                Los archivos resultantes se pueden alojar sin costo en GitHub Pages, Cloudflare Pages, Netlify, Vercel, o cualquier servidor web básico (Apache/Nginx).
              </p>
            </div>
          </div>
        </div>

        {/* Methodology & Data Source */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Origen de Datos y Metodología Colaborativa
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            La información se recopila a partir de un esfuerzo comunitario impulsado por investigadores, docentes y líderes de comunidades científicas en América Latina. La fuente de datos principal es una planilla colaborativa pública en Google Sheets:
          </p>

          <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-indigo-900">Planilla de Google Sheets Comunitaria</div>
              <div className="text-[11px] text-indigo-700 mt-0.5">
                Cualquier persona puede consultar las iniciativas o solicitar la inclusión de nuevos eventos y escuelas.
              </div>
            </div>
            <a
              href={DEFAULT_SHEET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Abrir Planilla en Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tipologías de iniciativas incluidas:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Schools:</strong> Escuelas estacionales, de posgrado o supercomputación.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Regional Conferences:</strong> Congresos y simposios de alcance regional (IEEE, CLEI).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>National Conferences:</strong> Jornadas y congresos de cada país (JAIIO, JCC, CCC, MICAI).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Societies:</strong> Sociedades científicas y asociaciones de computación (SADIO, SBC, SCCC, SPC, etc.).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Nav CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-lg font-black tracking-tight">
              ¿Listo para explorar las iniciativas?
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-md">
              Navega en el mapa interactivo o revisa el directorio con fichas detalladas y enlaces a los sitios oficiales.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onGoToMap}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              Explorar Mapa
            </button>
            <button
              onClick={onGoToDirectory}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs font-bold transition-all"
            >
              Ver Directorio
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
