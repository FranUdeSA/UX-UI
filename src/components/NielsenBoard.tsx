import React, { useState, useMemo } from 'react';
import { NielsenHeuristicItem, EvidenceModalData } from '../types';
import { NielsenCard } from './NielsenCard';
import { QuickScaleGuide } from './QuickScaleGuide';
import { Search, Filter, HelpCircle, Layers } from 'lucide-react';

interface NielsenBoardProps {
  heuristics: NielsenHeuristicItem[];
  isEditMode: boolean;
  onUpdateHeuristic: (updatedItem: NielsenHeuristicItem) => void;
  onOpenEvidence: (data: EvidenceModalData) => void;
}

export const NielsenBoard: React.FC<NielsenBoardProps> = ({
  heuristics,
  isEditMode,
  onUpdateHeuristic,
  onOpenEvidence
}) => {
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  // Filtering logic
  const filteredHeuristics = useMemo(() => {
    return heuristics.filter((item) => {
      let matchesSeverity = true;
      if (filterSeverity === 'pending') {
        matchesSeverity = item.severity === null;
      } else if (filterSeverity !== 'all') {
        matchesSeverity = item.severity === Number(filterSeverity);
      }

      const matchesSearch =
        searchQuery.trim() === '' ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.explanation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userImpact.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.screenName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSeverity && matchesSearch;
    });
  }, [heuristics, filterSeverity, searchQuery]);

  const countAll = heuristics.length;
  const countEvaluadas = heuristics.filter((h) => h.severity !== null).length;
  const countPending = heuristics.filter((h) => h.severity === null).length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Scale Guide Modal */}
      <QuickScaleGuide isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />

      {/* Header of Board */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-osde-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-osde-blue bg-osde-subtle px-2.5 py-0.5 rounded-full border border-osde-border/50">
                Tablero 2
              </span>
              <span className="text-xs font-semibold text-slate-500">
                10 Heurísticas de Jakob Nielsen
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Evaluación Heurística Exhaustiva (H1 a H10)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Evaluación de las 10 heurísticas completas sobre la app OSDE con escala de severidad 0 a 4, evidencia fotográfica y diagnóstico del impacto en la persona usuaria.
            </p>
          </div>

          {/* Scale reference button & status */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-osde-subtle text-osde-blue hover:bg-osde-blue hover:text-white font-bold text-xs border border-osde-border/60 transition-colors shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Ver Guía de Severidad (0-4)</span>
            </button>
            <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700">
              {countEvaluadas} / 10 Evaluadas
            </div>
          </div>
        </div>

        {/* Search & Severity Filter Bar */}
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Severity Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setFilterSeverity('all')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === 'all'
                  ? 'bg-osde-blue text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Todas</span>
              <span>({countAll})</span>
            </button>

            <button
              onClick={() => setFilterSeverity('0')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === '0'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span>0 - Cumple</span>
              <span>({heuristics.filter((h) => h.severity === 0).length})</span>
            </button>

            <button
              onClick={() => setFilterSeverity('1')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === '1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
              }`}
            >
              <span>1 - Cosmético</span>
              <span>({heuristics.filter((h) => h.severity === 1).length})</span>
            </button>

            <button
              onClick={() => setFilterSeverity('2')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === '2'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span>2 - Menor</span>
              <span>({heuristics.filter((h) => h.severity === 2).length})</span>
            </button>

            <button
              onClick={() => setFilterSeverity('3')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === '3'
                  ? 'bg-orange-600 text-white shadow-sm'
                  : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-200'
              }`}
            >
              <span>3 - Mayor</span>
              <span>({heuristics.filter((h) => h.severity === 3).length})</span>
            </button>

            <button
              onClick={() => setFilterSeverity('4')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterSeverity === '4'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'bg-red-50 text-red-800 hover:bg-red-100 border border-red-200'
              }`}
            >
              <span>4 - Catástrofe</span>
              <span>({heuristics.filter((h) => h.severity === 4).length})</span>
            </button>

            {countPending > 0 && (
              <button
                onClick={() => setFilterSeverity('pending')}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filterSeverity === 'pending'
                    ? 'bg-slate-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>Pendientes</span>
                <span>({countPending})</span>
              </button>
            )}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar heurística o hallazgo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-osde-blue/20 focus:border-osde-blue transition-all"
            />
          </div>

        </div>
      </div>

      {/* Grid of Heuristic Cards */}
      {filteredHeuristics.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHeuristics.map((item) => (
            <NielsenCard
              key={item.id}
              heuristic={item}
              isEditMode={isEditMode}
              onUpdate={onUpdateHeuristic}
              onOpenEvidence={onOpenEvidence}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-osde-card">
          <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No se encontraron heurísticas con los filtros seleccionados</h3>
          <p className="text-xs text-slate-500 mt-1">Prueba cambiando el filtro de severidad o la búsqueda.</p>
        </div>
      )}

    </div>
  );
};
