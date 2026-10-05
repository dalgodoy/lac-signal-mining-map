import React, { useState } from 'react';
import { Initiative, DataSourceState } from '../types';
import Papa from 'papaparse';
import { 
  Download, 
  Upload, 
  FileSpreadsheet, 
  FileJson, 
  RefreshCw, 
  Check, 
  Copy, 
  HardDrive, 
  ServerOff, 
  ShieldCheck, 
  Database,
  ExternalLink,
  Table as TableIcon
} from 'lucide-react';
import { parseRawCsvToInitiatives } from '../services/sheetsService';
import { STATIC_INITIATIVES } from '../data/staticInitiativesData';

interface DataExportPageProps {
  initiatives: Initiative[];
  dataSource: DataSourceState;
  onRefreshSheet: () => void;
  onSetCustomInitiatives: (data: Initiative[], sourceLabel: string) => void;
  onResetToStatic: () => void;
}

export const DataExportPage: React.FC<DataExportPageProps> = ({
  initiatives,
  dataSource,
  onRefreshSheet,
  onSetCustomInitiatives,
  onResetToStatic,
}) => {
  const [copied, setCopied] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState(dataSource.sheetUrl);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Client-side JSON download
  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(initiatives, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iniciativas-computacion-latam-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Client-side CSV download
  const handleDownloadCsv = () => {
    const csvData = initiatives.map((item) => ({
      'País / Sub-región': item.country,
      'Institución / Grupo / Evento': item.name,
      'Tópico Principal': item.topic,
      'Tipo de Iniciativa': item.category,
      'Enlace / Sitio Web': item.url,
      'Ubicación': item.locationRaw || item.cityName,
      'Descripción / Resumen': item.description,
      'Sugerido Por': item.suggestedBy || '',
      'Latitud': item.lat,
      'Longitud': item.lng,
    }));

    const csvStr = Papa.unparse(csvData);
    const blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `iniciativas-computacion-latam-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Copy JSON to clipboard
  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(initiatives, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  // Client-side CSV file upload (Zero server, runs purely via browser FileReader)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        try {
          const parsed = parseRawCsvToInitiatives(content);
          if (parsed.length > 0) {
            onSetCustomInitiatives(parsed, `Archivo local: ${file.name}`);
            setImportStatus(`Cargadas ${parsed.length} iniciativas con éxito desde archivo local.`);
          } else {
            setImportStatus('El archivo se leyó pero no se encontraron filas con el formato esperado.');
          }
        } catch (err: any) {
          setImportStatus(`Error al procesar CSV: ${err.message}`);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 min-h-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Page Header */}
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <ServerOff className="w-3.5 h-3.5 text-emerald-600" />
            <span>Página Estática • Procesamiento 100% en Cliente (Sin Servidor)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Gestión de Datos y Exportación Estática
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Toda la información se procesa localmente en la memoria de tu navegador web. Puedes exportar el dataset completo en formato abierto o cargar tu propia planilla sin enviar nada a servidores externos.
          </p>
        </div>

        {/* Serverless Architecture Guarantee Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Sitio Web Estático & Privacidad Garantizada
              </h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-xl">
                Esta aplicación no posee backend ni base de datos centralizada propia. Todas las transformaciones, cálculos analíticos y filtros se ejecutan exclusivamente en tu cliente (navegador).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onResetToStatic}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
              title="Restaurar a los datos estáticos precargados"
            >
              <HardDrive className="w-3.5 h-3.5 text-slate-500" />
              <span>Cargar Snapshot Estático</span>
            </button>
          </div>
        </div>

        {/* Export & Import Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Export Options */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Descargar Datos en Formatos Abiertos
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Descarga la base completa ({initiatives.length} iniciativas) con coordenadas geográficas normalizadas para análisis en R, Python, GIS o Excel.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleDownloadCsv}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg group-hover:scale-105 transition-transform">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    Descargar CSV
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Compatible con Excel & Pandas</div>
                </div>
              </button>

              <button
                onClick={handleDownloadJson}
                className="p-4 rounded-xl border border-slate-200 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/30 transition-all text-left flex items-start gap-3 group"
              >
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-lg group-hover:scale-105 transition-transform">
                  <FileJson className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600">
                    Descargar JSON
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Estructura completa tipada</div>
                </div>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={handleCopyJson}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>¡Copiado al portapapeles!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>Copiar JSON completo al portapapeles</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Import / Custom Source */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Importar CSV en el Navegador
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Carga tu propio archivo CSV de iniciativas. Se parsea directamente en tu navegador con PapaParse sin subirlo a ningún servidor.
            </p>

            {/* Drop / Select File Box */}
            <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-5 text-center transition-colors bg-slate-50/50">
              <input
                type="file"
                accept=".csv,text/csv"
                onChange={handleFileUpload}
                id="csv-file-input"
                className="hidden"
              />
              <label
                htmlFor="csv-file-input"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <Upload className="w-8 h-8 text-indigo-500 mb-2" />
                <span className="text-xs font-bold text-slate-800">
                  Haz clic para seleccionar un archivo CSV
                </span>
                <span className="text-[11px] text-slate-400 mt-1">
                  Mapea automáticamente columnas como país, institución, tópico y enlace
                </span>
              </label>
            </div>

            {importStatus && (
              <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-800 rounded-xl text-xs font-medium">
                {importStatus}
              </div>
            )}

            {/* Google Sheets Sync Box */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-800">Sincronización con Google Sheets</div>
                <div className="text-[11px] text-slate-500">
                  {dataSource.lastFetched ? `Última sincronización: ${dataSource.lastFetched.toLocaleTimeString()}` : 'Snapshot estático activo'}
                </div>
              </div>
              <button
                onClick={onRefreshSheet}
                disabled={dataSource.status === 'loading'}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${dataSource.status === 'loading' ? 'animate-spin' : ''}`} />
                <span>Re-sincronizar</span>
              </button>
            </div>
          </div>

        </div>

        {/* Raw Dataset Preview Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TableIcon className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Visualización de Datos Crudos ({initiatives.length} registros)
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Datos renderizados de forma 100% estática
            </span>
          </div>

          <div className="overflow-x-auto max-h-[350px]">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px] sticky top-0">
                <tr>
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Nombre / Iniciativa</th>
                  <th className="py-3 px-4">País</th>
                  <th className="py-3 px-4">Categoría</th>
                  <th className="py-3 px-4">Tópico</th>
                  <th className="py-3 px-4">Coords (Lat, Lng)</th>
                  <th className="py-3 px-4">Enlace</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {initiatives.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-400">{idx + 1}</td>
                    <td className="py-2.5 px-4 font-bold text-slate-800">{item.name}</td>
                    <td className="py-2.5 px-4 text-slate-600">{item.country}</td>
                    <td className="py-2.5 px-4">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-2.5 px-4 text-slate-600 truncate max-w-[200px]">{item.topic}</td>
                    <td className="py-2.5 px-4 font-mono text-[11px] text-slate-500">
                      {item.lat.toFixed(3)}, {item.lng.toFixed(3)}
                    </td>
                    <td className="py-2.5 px-4">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline inline-flex items-center gap-1 font-semibold"
                        >
                          <span>Visitar</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
