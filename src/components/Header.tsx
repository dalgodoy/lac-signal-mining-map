import React, { useState } from 'react';
import { DataSourceState, PageView } from '../types';
import { 
  MapPin, 
  RefreshCw, 
  AlertCircle,
  Map as MapIcon,
  ListFilter,
  BarChart3,
  HardDrive,
  Info,
  ServerOff,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  dataSource: DataSourceState;
  onRefresh: () => void;
  filteredCount: number;
  totalCount: number;
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

export const Header: React.FC<HeaderProps> = ({
  dataSource,
  onRefresh,
  filteredCount,
  totalCount,
  activePage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatLastSync = (date: Date | null) => {
    if (!date) return 'Snapshot Estático';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const navItems: { id: PageView; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'map', label: 'Mapa Interactivo', icon: MapIcon },
    { id: 'directory', label: 'Directorio', icon: ListFilter },
    { id: 'stats', label: 'Estadísticas', icon: BarChart3 },
    { id: 'data', label: 'Datos & Exportar', icon: HardDrive },
    { id: 'about', label: 'Acerca de', icon: Info },
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs flex-shrink-0">
      <div className="px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* App Branding */}
        <div className="flex items-center gap-3">
          <div 
            onClick={() => handleNavClick('map')} 
            className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-2.5 rounded-xl shadow-xs flex items-center justify-center cursor-pointer hover:opacity-95 transition-opacity"
          >
            <MapPin className="w-5 h-5" />
          </div>
          <div className="cursor-pointer" onClick={() => handleNavClick('map')}>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                LATAM & Caribe
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                Computación
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Iniciativas, Escuelas y Sociedades</span>
              <span className="hidden lg:inline text-slate-300">•</span>
              <span className="hidden lg:inline-flex items-center gap-1 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                <ServerOff className="w-2.5 h-2.5" />
                Sitio 100% Estático (Sin Servidor)
              </span>
            </div>
          </div>
        </div>

        {/* Center Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Action & Sync Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Live Sheet Status Pill */}
          <div 
            className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold select-none"
            title={dataSource.status === 'error' ? dataSource.errorMessage : 'Datos sincronizados en cliente'}
          >
            {dataSource.status === 'loading' ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                <span className="text-slate-700">Actualizando...</span>
              </>
            ) : dataSource.status === 'error' ? (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700 font-medium">Snapshot local</span>
              </>
            ) : (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700 font-medium hidden lg:inline">Google Sheets</span>
                <span className="text-[11px] text-slate-400 font-normal">({formatLastSync(dataSource.lastFetched)})</span>
              </>
            )}
          </div>

          {/* Sync Button */}
          <button
            onClick={onRefresh}
            disabled={dataSource.status === 'loading'}
            className="flex items-center gap-1.5 bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-2xs transition-all disabled:opacity-60 cursor-pointer"
            title="Sincronizar planilla en el navegador"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${dataSource.status === 'loading' ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Actualizar</span>
          </button>

          {/* Total Initiatives Badge */}
          <div className="flex items-center gap-1 bg-slate-900 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-2xs">
            <span>{filteredCount}</span>
            {filteredCount !== totalCount && (
              <span className="text-slate-400 text-[10px]">/{totalCount}</span>
            )}
            <span className="text-[11px] font-normal text-slate-300">items</span>
          </div>

          {/* Mobile Navigation Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="Menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-bold bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200 mb-2">
            <ServerOff className="w-3.5 h-3.5" />
            <span>Páginas estáticas sin procesamiento en servidor</span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
