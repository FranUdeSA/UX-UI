import React from 'react';
import { ActiveTab } from '../types';
import { LayoutDashboard, Scale, ShieldCheck, Edit3, Eye, DownloadCloud, MessageSquare } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  lawsCount: { evaluated: number; total: number };
  nielsenCount: { evaluated: number; total: number };
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  lawsCount,
  nielsenCount,
  isEditMode,
  setIsEditMode,
  onOpenExport
}) => {
  const tabs = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Resumen Ejecutivo',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'interview' as ActiveTab,
      label: 'Copiloto de Entrevistas UX',
      icon: MessageSquare,
      badge: '8 sesiones'
    },
    {
      id: 'laws' as ActiveTab,
      label: 'Tablero 1: Leyes UX',
      icon: Scale,
      badge: `${lawsCount.evaluated}/${lawsCount.total}`
    },
    {
      id: 'nielsen' as ActiveTab,
      label: 'Tablero 2: Heurísticas Nielsen',
      icon: ShieldCheck,
      badge: `${nielsenCount.evaluated}/${nielsenCount.total}`
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Top utility bar with OSDE branding and UdeSA context */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo OSDE + Title */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-24 h-10 flex items-center text-osde-blue" title="Manual de Marca OSDE - Pantone Dark Blue C">
                <img 
                  src="./osde-logo.svg" 
                  alt="OSDE" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <div className="h-8 w-px bg-slate-200" />
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-osde-subtle text-osde-blue border border-osde-border/50">
                  UdeSA • UX/UI
                </span>
                <span className="text-xs text-slate-500 hidden sm:inline-block">
                  Proyecto Integrador
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                Evaluación Heurística y Leyes UX <span className="text-osde-blue">App OSDE</span>
              </h1>
            </div>
          </div>

          {/* Edit Mode Toggle & Export Button */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Edit Mode Toggle */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border shadow-sm ${
                isEditMode
                  ? 'bg-amber-500 text-white border-amber-600 ring-2 ring-amber-400/40 animate-pulse'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300'
              }`}
              title={isEditMode ? 'Haz clic para ver la vista de presentación' : 'Haz clic para editar textos y subir imágenes'}
            >
              {isEditMode ? <Edit3 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isEditMode ? 'Modo Edición Activado' : 'Activar Modo Edición'}</span>
            </button>

            {/* Export Code / Sync */}
            <button
              onClick={onOpenExport}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
              title="Exportar código TypeScript o sincronizar archivos"
            >
              <DownloadCloud className="w-3.5 h-3.5 text-osde-blue" />
              <span>Exportar</span>
            </button>

          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex space-x-1 sm:space-x-4 border-t border-slate-100 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-osde-blue text-white shadow-sm shadow-osde-blue/20'
                    : 'text-slate-600 hover:text-osde-blue hover:bg-osde-subtle/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-osde-subtle'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
