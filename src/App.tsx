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
import { TeamFooter } from './components/TeamFooter';
import { InterviewModule } from './components/interview/InterviewModule';
import { Sparkles } from 'lucide-react';

const STORAGE_LAWS_KEY = 'osde_ux_laws_v1';
const STORAGE_HEURISTICS_KEY = 'osde_nielsen_heuristics_v1';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
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
      // handle storage quota if large base64 images
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
      />

      {/* Edit Mode Alert Banner */}
      {isEditMode && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between border-b border-amber-600 animate-fadeIn">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>
                <strong>Modo Edición Activo:</strong> Puedes cambiar estados, severidades, escribir diagnósticos y subir capturas directamente desde las tarjetas. Todo se guarda automáticamente.
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

        {activeTab === 'interview' && (
          <InterviewModule />
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
      </main>

      {/* Lightbox / Evidence Modal */}
      <EvidenceModal data={modalData} onClose={handleCloseModal} />

      {/* Export / Sync Code Modal */}
      <ExportDataModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        laws={laws}
        heuristics={heuristics}
        onResetToDefault={handleResetToDefault}
      />

      {/* Persistent Academic & Team Footer */}
      <TeamFooter />
    </div>
  );
};
