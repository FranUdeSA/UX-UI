import React, { useState, useEffect } from 'react';
import { ActiveTab, EvidenceModalData, UxLawItem, NielsenHeuristicItem } from './types';
import { uxLawsData as defaultLaws } from './data/uxLawsData';
import { nielsenHeuristicsData as defaultHeuristics } from './data/nielsenData';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { UxLawsBoard } from './components/UxLawsBoard';
import { NielsenBoard } from './components/NielsenBoard';
import { EvidenceModal } from './components/EvidenceModal';
import { ExportDataModal } from './components/ExportDataModal';
import { PublishModal } from './components/PublishModal';
import { TeamFooter } from './components/TeamFooter';
import { teamData } from './data/teamData';
import { Users, GraduationCap, Sparkles } from 'lucide-react';

const STORAGE_LAWS_KEY = 'osde_ux_laws_v1';
const STORAGE_HEURISTICS_KEY = 'osde_nielsen_heuristics_v1';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isPublishOpen, setIsPublishOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<EvidenceModalData | null>(null);

  // Initialize laws from localStorage or default
  const [laws, setLaws] = useState<UxLawItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LAWS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultLaws;
  });

  // Initialize heuristics from localStorage or default
  const [heuristics, setHeuristics] = useState<NielsenHeuristicItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_HEURISTICS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultHeuristics;
  });

  // Save to localStorage whenever laws change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LAWS_KEY, JSON.stringify(laws));
    } catch {
      // handle storage quota
    }
  }, [laws]);

  // Save to localStorage whenever heuristics change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HEURISTICS_KEY, JSON.stringify(heuristics));
    } catch {
      // handle storage quota
    }
  }, [heuristics]);

  // Update handlers
  const handleUpdateLaw = (updatedLaw: UxLawItem) => {
    setLaws((prev) => prev.map((l) => (l.id === updatedLaw.id ? updatedLaw : l)));
  };

  const handleUpdateHeuristic = (updatedItem: NielsenHeuristicItem) => {
    setHeuristics((prev) => prev.map((h) => (h.id === updatedItem.id ? updatedItem : h)));
  };

  const handleResetToDefault = () => {
    setLaws(defaultLaws);
    setHeuristics(defaultHeuristics);
    localStorage.removeItem(STORAGE_LAWS_KEY);
    localStorage.removeItem(STORAGE_HEURISTICS_KEY);
  };

  const evaluatedLawsCount = laws.filter((l) => l.status !== 'pendiente').length;
  const evaluatedNielsenCount = heuristics.filter((h) => h.severity !== null).length;

  const handleOpenEvidence = (data: EvidenceModalData) => {
    setModalData(data);
  };

  const handleCloseModal = () => {
    setModalData(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        lawsCount={{ evaluated: evaluatedLawsCount, total: laws.length }}
        nielsenCount={{ evaluated: evaluatedNielsenCount, total: heuristics.length }}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPublish={() => setIsPublishOpen(true)}
      />

      {/* Edit Mode Alert Banner */}
      {isEditMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-amber-600 animate-fadeIn">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Modo Edición Activo:</strong> Puedes cambiar estados, severidades, escribir diagnósticos y subir capturas. Cuando termines, haz clic en <strong>Publicar Cambios</strong> para sincronizarlo con Vercel.
              </span>
            </div>
            <button
              onClick={() => setIsEditMode(false)}
              className="px-3 py-1 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors shrink-0 ml-4"
            >
              Cerrar Edición
            </button>
          </div>
        </div>
      )}

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            laws={laws}
            heuristics={heuristics}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'laws' && (
          <UxLawsBoard
            laws={laws}
            isEditMode={isEditMode}
            onUpdateLaw={handleUpdateLaw}
            onOpenEvidence={handleOpenEvidence}
          />
        )}

        {activeTab === 'nielsen' && (
          <NielsenBoard
            heuristics={heuristics}
            isEditMode={isEditMode}
            onUpdateHeuristic={handleUpdateHeuristic}
            onOpenEvidence={handleOpenEvidence}
          />
        )}

        {activeTab === 'team' && (
          <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
            {/* Team View Card */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-osde-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-osde-subtle text-osde-blue flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">
                    Ficha Técnica y Equipo de Trabajo
                  </h2>
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                    {teamData.university} • {teamData.course}
                  </p>
                </div>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {teamData.members.map((name, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-3"
                  >
                    <span className="w-8 h-8 rounded-lg bg-osde-blue text-white font-black text-xs flex items-center justify-center shadow-sm">
                      0{i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{name}</div>
                      <div className="text-[11px] text-slate-500 font-medium">Estudiante UX/UI • UdeSA</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Project Guidelines Box */}
              <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-osde-blue" />
                  <span>Objetivos Pedagógicos y Metodología</span>
                </h3>
                <div className="p-4 rounded-xl bg-osde-subtle/40 border border-osde-border/60 text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    • <strong>Auditoría Heurística de Jakob Nielsen</strong>: Evaluación de las 10 heurísticas en su totalidad con graduación de severidad de 0 a 4 y estimación del impacto en la persona usuaria.
                  </p>
                  <p>
                    • <strong>Checklist de 14 Leyes UX</strong>: Diagnóstico visual y funcional de los flujos principales de la app móvil de OSDE identificando puntos de cumplimiento y quiebre de leyes.
                  </p>
                  <p>
                    • <strong>Despliegue y Accesibilidad</strong>: Artefacto web navegable listo para producción y despliegue continuo en Vercel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Lightbox / Evidence Modal */}
      <EvidenceModal data={modalData} onClose={handleCloseModal} />

      {/* Export Code Modal */}
      <ExportDataModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        laws={laws}
        heuristics={heuristics}
        onResetToDefault={handleResetToDefault}
      />

      {/* Direct Publish to GitHub Modal (Option 2) */}
      <PublishModal
        isOpen={isPublishOpen}
        onClose={() => setIsPublishOpen(false)}
        laws={laws}
        heuristics={heuristics}
      />

      {/* Persistent Academic & Team Footer */}
      <TeamFooter />
    </div>
  );
};
