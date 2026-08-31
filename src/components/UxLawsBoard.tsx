import React, { useState, useMemo } from 'react';
import { UxLawItem, EvidenceModalData, LawStatus } from '../types';
import { UxLawCard } from './UxLawCard';
import { Search, Filter, CheckCircle2, AlertTriangle, Clock, Layers, Info } from 'lucide-react';

interface UxLawsBoardProps {
  laws: UxLawItem[];
  isEditMode: boolean;
  onUpdateLaw: (updatedLaw: UxLawItem) => void;
  onOpenEvidence: (data: EvidenceModalData) => void;
}

export const UxLawsBoard: React.FC<UxLawsBoardProps> = ({
  laws,
  isEditMode,
  onUpdateLaw,
  onOpenEvidence
}) => {
  const [filterStatus, setFilterStatus] = useState<LawStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtering logic
  const filteredLaws = useMemo(() => {
    return laws.filter((law) => {
      const matchesStatus = filterStatus === 'all' || law.status === filterStatus;
      const matchesSearch =
        searchQuery.trim() === '' ||
        law.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (law.category && law.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        law.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.screenName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [laws, filterStatus, searchQuery]);

  const countAll = laws.length;
  const countCumple = laws.filter((l) => l.status === 'cumple').length;
  const countRompe = laws.filter((l) => l.status === 'rompe').length;
  const countPendiente = laws.filter((l) => l.status === 'pendiente').length;
  const countEvaluadas = countCumple + countRompe;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header of Board with Academic Requirements Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-osde-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-osde-blue bg-osde-subtle px-2.5 py-0.5 rounded-full border border-osde-border/50">
                Tablero 1
              </span>
              <span className="text-xs font-semibold text-slate-500">
                14 Leyes de la Ficha de Referencia
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Evaluación de Leyes UX sobre la App OSDE
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Recorrido sistemático de los flujos de navegación principales. Muestra para cada ley documentada el hallazgo, si cumple o rompe, la evidencia visual y el análisis fundamentado.
            </p>
          </div>

          {/* Academic benchmark badge */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center gap-3 shrink-0">
            <Info className="w-5 h-5 text-osde-blue shrink-0" />
            <div className="text-xs">
              <div className="font-bold text-slate-800">
                Cobertura: {countEvaluadas} / 14 leyes
              </div>
              <div className="text-slate-500">
                {countEvaluadas >= 8 ? (
                  <span className="text-emerald-600 font-semibold">✓ Piso sugerido ($\ge 8$) alcanzado</span>
                ) : (
                  <span className="text-amber-600 font-semibold">Sugerencia mínima: documentar 8 leyes</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Status Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setFilterStatus('all')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'all'
                  ? 'bg-osde-blue text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas</span>
              <span className="opacity-80">({countAll})</span>
            </button>

            <button
              onClick={() => setFilterStatus('cumple')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'cumple'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Cumple</span>
              <span>({countCumple})</span>
            </button>

            <button
              onClick={() => setFilterStatus('rompe')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'rompe'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Rompe</span>
              <span>({countRompe})</span>
            </button>

            <button
              onClick={() => setFilterStatus('pendiente')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterStatus === 'pendiente'
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Pendientes</span>
              <span>({countPendiente})</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar ley o palabra clave..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-osde-blue/20 focus:border-osde-blue transition-all"
            />
          </div>

        </div>
      </div>

      {/* Grid of Law Cards */}
      {filteredLaws.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLaws.map((law) => (
            <UxLawCard
              key={law.id}
              law={law}
              isEditMode={isEditMode}
              onUpdate={onUpdateLaw}
              onOpenEvidence={onOpenEvidence}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-osde-card">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron leyes con los filtros aplicados</h3>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando el filtro de estado o la búsqueda.</p>
        </div>
      )}

    </div>
  );
};
