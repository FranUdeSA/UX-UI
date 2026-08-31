import React from 'react';
import { UxLawItem, NielsenHeuristicItem, ActiveTab } from '../types';
import { severityLevelsMeta } from '../data/nielsenData';
import { Scale, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, Layers } from 'lucide-react';

interface DashboardOverviewProps {
  laws: UxLawItem[];
  heuristics: NielsenHeuristicItem[];
  setActiveTab: (tab: ActiveTab) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  laws,
  heuristics,
  setActiveTab
}) => {
  // Calculations for UX Laws
  const evaluatedLaws = laws.filter((l) => l.status !== 'pendiente');
  const cumpleLaws = laws.filter((l) => l.status === 'cumple');
  const rompeLaws = laws.filter((l) => l.status === 'rompe');

  // Calculations for Nielsen Heuristics
  const evaluatedHeuristics = heuristics.filter((h) => h.severity !== null);
  const severityCounts = {
    0: heuristics.filter((h) => h.severity === 0).length,
    1: heuristics.filter((h) => h.severity === 1).length,
    2: heuristics.filter((h) => h.severity === 2).length,
    3: heuristics.filter((h) => h.severity === 3).length,
    4: heuristics.filter((h) => h.severity === 4).length,
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Welcome & Academic Context */}
      <div className="bg-gradient-to-r from-osde-blue via-[#1730C4] to-[#0A1666] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Subtle decorative smile curve reminiscent of OSDE brand */}
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-10 translate-y-10">
          <svg width="350" height="350" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="8" strokeDasharray="140 140" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-blue-100 mb-4 border border-white/20">
            <span>Universidad de San Andrés</span>
            <span>•</span>
            <span>Cátedra UX/UI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            Artefacto de Evaluación Heurística y Leyes UX
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed mb-6">
            Herramienta interactiva para documentar, analizar y consultar la evaluación de experiencia de usuario sobre la aplicación móvil oficial de <strong>OSDE</strong>.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('laws')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-osde-blue font-bold text-sm hover:bg-blue-50 transition-colors shadow-sm"
            >
              <Scale className="w-4 h-4" />
              <span>Ver Tablero de Leyes UX</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('nielsen')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors border border-white/20 backdrop-blur-sm"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Ver Heurísticas de Nielsen</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI & Summary Scorecards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Cobertura Heurísticas */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-osde-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Heurísticas Nielsen</span>
            <div className="w-8 h-8 rounded-lg bg-osde-subtle text-osde-blue flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{evaluatedHeuristics.length}</span>
              <span className="text-sm font-semibold text-slate-500">/ 10 evaluadas</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-osde-blue h-full rounded-full transition-all duration-500"
                style={{ width: `${(evaluatedHeuristics.length / 10) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <span className="font-semibold text-slate-700">Requisito:</span> Las 10 heurísticas completas
          </p>
        </div>

        {/* Card 2: Cobertura Leyes UX */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-osde-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Leyes UX</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Scale className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{evaluatedLaws.length}</span>
              <span className="text-sm font-semibold text-slate-500">/ 14 leyes</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${(evaluatedLaws.length / 14) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3 flex items-center gap-1">
            <span className="font-semibold text-slate-700">Piso sugerido:</span> Al menos 8 documentadas
          </p>
        </div>

        {/* Card 3: Balance Leyes (Cumple vs Rompe) */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-osde-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Balance Leyes UX</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div className="bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100 text-center">
              <div className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Cumple</span>
              </div>
              <div className="text-xl font-extrabold text-emerald-800 mt-0.5">{cumpleLaws.length}</div>
            </div>
            <div className="bg-red-50/70 p-2.5 rounded-xl border border-red-100 text-center">
              <div className="text-xs font-bold text-red-700 flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Rompe</span>
              </div>
              <div className="text-xl font-extrabold text-red-800 mt-0.5">{rompeLaws.length}</div>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            {laws.length - evaluatedLaws.length} pendientes de clasificación
          </p>
        </div>

        {/* Card 4: Hallazgos Críticos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-osde-card flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Severidad Crítica</span>
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-red-600">
                {severityCounts[3] + severityCounts[4]}
              </span>
              <span className="text-sm font-semibold text-slate-500">puntos críticos</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {severityCounts[4]} Catástrofes (Sev 4) • {severityCounts[3]} Mayores (Sev 3)
            </p>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            {severityCounts[2]} menores • {severityCounts[1]} cosméticos • {severityCounts[0]} sin problema
          </p>
        </div>

      </div>

      {/* Nielsen Severity Distribution Bar */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-osde-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span>Distribución por Escala de Severidad de Nielsen (0 a 4)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Desglose cuantitativo del diagnóstico heurístico realizado sobre la app.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('nielsen')}
            className="text-xs font-bold text-osde-blue hover:underline inline-flex items-center gap-1"
          >
            <span>Explorar heurísticas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Severity Progress Segments */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {([0, 1, 2, 3, 4] as const).map((sev) => {
            const meta = severityLevelsMeta[sev];
            const count = severityCounts[sev];
            return (
              <div
                key={sev}
                className={`p-3.5 rounded-xl border transition-all ${meta.bgColor}`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold">{meta.shortLabel}</span>
                  <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor}`} />
                </div>
                <div className="text-2xl font-black">{count}</div>
                <p className="text-[11px] opacity-80 mt-1 line-clamp-2">{meta.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pedagogical Guidelines / Reference Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Leyes UX Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-osde-blue font-bold text-sm mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Lineamientos: Tablero de Leyes UX</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">
              Ficha de referencia de 14 leyes
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed space-y-1">
              Recorrido de las navegaciones principales de la app OSDE usando las leyes como checklist. Por cada ley documentada se registra: nombre de la ley, si <strong>cumple o rompe</strong>, captura del punto exacto y explicación breve respondiendo la pregunta guía (qué pasa y por qué).
            </p>
          </div>
          <button
            onClick={() => setActiveTab('laws')}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-osde-blue hover:text-osde-dark"
          >
            <span>Ir al Tablero 1: Leyes UX</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Heurísticas Box */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-osde-blue font-bold text-sm mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Lineamientos: Tablero de Heurísticas de Nielsen</span>
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-2">
              Evaluación de las 10 heurísticas (sin excepción)
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed space-y-1">
              Estándar de evaluación heurística completa. Por cada una se consigna: nombre de la heurística, <strong>severidad (0-4)</strong>, captura del punto de dolor ($\ge 1$) o del caso de éxito ($0$), explicación y el <strong>impacto concreto en la persona usuaria</strong>.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('nielsen')}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-osde-blue hover:text-osde-dark"
          >
            <span>Ir al Tablero 2: Heurísticas Nielsen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
