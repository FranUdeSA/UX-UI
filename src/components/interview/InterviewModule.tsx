import React, { useState, useEffect, useRef } from 'react';
import {
  interviewScriptSections,
  defaultInterviewSessions
} from '../../data/interviewScriptData';
import { InterviewSession, InterviewTimestampMarker } from '../../types/interview';
import { LiveStopwatch } from './LiveStopwatch';
import { TeleprompterStep } from './TeleprompterStep';
import { QuickTimestampBar } from './QuickTimestampBar';
import { TactiqCrossReferenceModal } from './TactiqCrossReferenceModal';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

const STORAGE_INTERVIEWS_KEY = 'osde_interview_sessions_v2';

export const InterviewModule: React.FC = () => {
  // Load sessions from localStorage or default
  const [sessions, setSessions] = useState<InterviewSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_INTERVIEWS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return defaultInterviewSessions;
  });

  const [activeSessionId, setActiveSessionId] = useState<string>('entrevista-1');
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const [isCompactMode, setIsCompactMode] = useState<boolean>(false);
  const [isSummaryOpen, setIsSummaryOpen] = useState<boolean>(false);

  // Timer states
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const timerRef = useRef<number | null>(null);

  // Active session
  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];
  const currentSection = interviewScriptSections[activeSectionIndex] || interviewScriptSections[0];
  const currentQuestion =
    currentSection.questions[activeQuestionIndex] || currentSection.questions[0];

  // Save sessions to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_INTERVIEWS_KEY, JSON.stringify(sessions));
    } catch {
      // ignore
    }
  }, [sessions]);

  // Sync elapsed seconds when changing session
  useEffect(() => {
    setIsRunning(false);
    setElapsedSeconds(currentSession.elapsedSeconds || 0);
    // Find section/question if stored
    const secIdx = interviewScriptSections.findIndex(
      (s) => s.id === currentSession.currentSectionId
    );
    if (secIdx !== -1) {
      setActiveSectionIndex(secIdx);
      const qIdx = interviewScriptSections[secIdx].questions.findIndex(
        (q) => q.id === currentSession.currentQuestionId
      );
      if (qIdx !== -1) setActiveQuestionIndex(qIdx);
      else setActiveQuestionIndex(0);
    } else {
      setActiveSectionIndex(0);
      setActiveQuestionIndex(0);
    }
  }, [activeSessionId]);

  // Timer interval handling
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setElapsedSeconds((prev) => {
          const next = prev + 1;
          // Update in session state periodically
          setSessions((all) =>
            all.map((s) =>
              s.id === currentSession.id
                ? { ...s, elapsedSeconds: next, status: 'en_curso' }
                : s
            )
          );
          return next;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentSession.id]);

  const handleToggleTimer = () => {
    setIsRunning((prev) => !prev);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    setSessions((all) =>
      all.map((s) => (s.id === currentSession.id ? { ...s, elapsedSeconds: 0 } : s))
    );
  };

  // Branching selection update
  const handleSelectBranch = (questionId: string, branchId: string) => {
    setSessions((all) =>
      all.map((s) =>
        s.id === currentSession.id
          ? {
              ...s,
              branchSelections: { ...s.branchSelections, [questionId]: branchId }
            }
          : s
      )
    );
  };

  // Marker adding
  const handleAddMarker = (newMarker: InterviewTimestampMarker) => {
    setSessions((all) =>
      all.map((s) =>
        s.id === currentSession.id
          ? { ...s, markers: [...s.markers, newMarker] }
          : s
      )
    );
  };

  const handleRemoveMarker = (markerId: string) => {
    setSessions((all) =>
      all.map((s) =>
        s.id === currentSession.id
          ? { ...s, markers: s.markers.filter((m) => m.id !== markerId) }
          : s
      )
    );
  };

  const handleUpdateCurrentSession = (updated: InterviewSession) => {
    setSessions((all) => all.map((s) => (s.id === updated.id ? updated : s)));
  };

  // Stepper navigation
  const handleNextQuestion = () => {
    if (activeQuestionIndex < currentSection.questions.length - 1) {
      const nextQIdx = activeQuestionIndex + 1;
      setActiveQuestionIndex(nextQIdx);
      updateSessionProgress(activeSectionIndex, nextQIdx);
    } else if (activeSectionIndex < interviewScriptSections.length - 1) {
      const nextSecIdx = activeSectionIndex + 1;
      setActiveSectionIndex(nextSecIdx);
      setActiveQuestionIndex(0);
      updateSessionProgress(nextSecIdx, 0);
    } else {
      // Completed interview!
      setIsRunning(false);
      setSessions((all) =>
        all.map((s) => (s.id === currentSession.id ? { ...s, status: 'completada' } : s))
      );
      setIsSummaryOpen(true);
    }
  };

  const handlePrevQuestion = () => {
    if (activeQuestionIndex > 0) {
      const prevQIdx = activeQuestionIndex - 1;
      setActiveQuestionIndex(prevQIdx);
      updateSessionProgress(activeSectionIndex, prevQIdx);
    } else if (activeSectionIndex > 0) {
      const prevSecIdx = activeSectionIndex - 1;
      const prevQuestions = interviewScriptSections[prevSecIdx].questions;
      setActiveSectionIndex(prevSecIdx);
      setActiveQuestionIndex(prevQuestions.length - 1);
      updateSessionProgress(prevSecIdx, prevQuestions.length - 1);
    }
  };

  const updateSessionProgress = (secIdx: number, qIdx: number) => {
    const sec = interviewScriptSections[secIdx];
    const q = sec?.questions[qIdx];
    if (sec && q) {
      setSessions((all) =>
        all.map((s) =>
          s.id === currentSession.id
            ? { ...s, currentSectionId: sec.id, currentQuestionId: q.id }
            : s
        )
      );
    }
  };

  const isFirstStep = activeSectionIndex === 0 && activeQuestionIndex === 0;
  const isLastStep =
    activeSectionIndex === interviewScriptSections.length - 1 &&
    activeQuestionIndex === currentSection.questions.length - 1;

  return (
    <div className={`space-y-6 ${isCompactMode ? 'max-w-4xl mx-auto' : 'max-w-7xl mx-auto'}`}>
      {/* Top Banner: Session Switcher & Mode Toggle */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-osde-card p-4 sm:p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-osde-blue text-white flex items-center justify-center font-black text-sm shadow-xs">
              UX
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  Copiloto de Entrevistas Semiestructuradas
                </h2>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-osde-subtle text-osde-blue border border-osde-border/50">
                  UdeSA • OSDE
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Dupla de investigación: <strong className="text-slate-700">{currentSession.interviewers.join(' & ')}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Split-screen Zoom Toggle */}
            <button
              type="button"
              onClick={() => setIsCompactMode(!isCompactMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isCompactMode
                  ? 'bg-blue-50 text-osde-blue border-blue-200 shadow-inner'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
              }`}
              title={
                isCompactMode
                  ? 'Volver a ancho completo'
                  : 'Modo Split-Screen: Reduce márgenes para ubicar junto a la ventana de Zoom'
              }
            >
              {isCompactMode ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isCompactMode ? 'Modo Zoom Activo' : 'Modo Split-Screen Zoom'}</span>
            </button>

            {/* View Summary / Tactiq Sync */}
            <button
              type="button"
              onClick={() => setIsSummaryOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-osde-blue hover:bg-osde-light transition-colors shadow-xs"
            >
              <FileCheck className="w-3.5 h-3.5" />
              <span>Ficha & Tactiq</span>
            </button>
          </div>
        </div>

        {/* 8 Sessions Selector Tabs */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
            <span>Seleccionar Entrevista (8 sesiones en total)</span>
            <span>Completadas: {sessions.filter((s) => s.status === 'completada').length}/8</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2">
            {sessions.map((sess) => {
              const isSelected = sess.id === activeSessionId;
              const isDone = sess.status === 'completada';
              const isInProgress = sess.status === 'en_curso';

              return (
                <button
                  key={sess.id}
                  type="button"
                  onClick={() => setActiveSessionId(sess.id)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'bg-osde-blue text-white border-osde-blue shadow-sm ring-2 ring-osde-blue/30 scale-[1.02]'
                      : isDone
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950 hover:bg-emerald-100/50'
                      : isInProgress
                      ? 'bg-amber-50/60 border-amber-200 text-amber-950 hover:bg-amber-100/50'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-black text-xs">P0{sess.number}</span>
                    {isDone ? (
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
                    ) : (
                      <span className={`text-[9px] font-bold ${isSelected ? 'text-blue-100' : 'text-slate-400'}`}>
                        {sess.markers.length > 0 ? `${sess.markers.length} 🏷️` : ''}
                      </span>
                    )}
                  </div>
                  <div className={`text-[10px] font-medium truncate mt-0.5 ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                    {sess.participantCode.replace('Participante ', 'P')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section Progress Stepper */}
        <div className="pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {interviewScriptSections.map((sec, idx) => {
              const isCurrent = idx === activeSectionIndex;
              const isPast = idx < activeSectionIndex;

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => {
                    setActiveSectionIndex(idx);
                    setActiveQuestionIndex(0);
                    updateSessionProgress(idx, 0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                    isCurrent
                      ? 'bg-osde-subtle text-osde-blue border border-osde-border shadow-xs'
                      : isPast
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-mono ${
                      isCurrent
                        ? 'bg-osde-blue text-white'
                        : isPast
                        ? 'bg-slate-300 text-slate-700'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span>{sec.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stopwatch & Timing Controller */}
      <LiveStopwatch
        isRunning={isRunning}
        elapsedSeconds={elapsedSeconds}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        currentSection={currentSection}
        totalSuggestedMinutes={20}
      />

      {/* Main Teleprompter Display */}
      <TeleprompterStep
        question={currentQuestion}
        section={currentSection}
        selectedBranch={currentSession.branchSelections[currentQuestion.id]}
        onSelectBranch={handleSelectBranch}
        isCompactMode={isCompactMode}
        onPrevQuestion={handlePrevQuestion}
        onNextQuestion={handleNextQuestion}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />

      {/* Fixed Timestamp Marker Bar for Tactiq */}
      <QuickTimestampBar
        elapsedSeconds={elapsedSeconds}
        currentQuestionCode={currentQuestion.code}
        markers={currentSession.markers}
        onAddMarker={handleAddMarker}
        onRemoveMarker={handleRemoveMarker}
      />

      {/* Bottom Step Navigation Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={handlePrevQuestion}
          disabled={isFirstStep}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all border ${
            isFirstStep
              ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border-slate-200'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-xs'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Pregunta Anterior</span>
        </button>

        <div className="text-xs font-bold text-slate-500">
          Bloque {activeSectionIndex + 1} de {interviewScriptSections.length} • Pregunta {activeQuestionIndex + 1} de {currentSection.questions.length}
        </div>

        <button
          type="button"
          onClick={handleNextQuestion}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black text-white bg-osde-blue hover:bg-osde-light transition-all shadow-md shadow-osde-blue/20"
        >
          <span>{isLastStep ? 'Finalizar Entrevista' : 'Siguiente Pregunta'}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Cross-Reference & Summary Modal */}
      <TactiqCrossReferenceModal
        isOpen={isSummaryOpen}
        onClose={() => setIsSummaryOpen(false)}
        session={currentSession}
        onUpdateSession={handleUpdateCurrentSession}
      />
    </div>
  );
};
