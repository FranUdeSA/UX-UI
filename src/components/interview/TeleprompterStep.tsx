import React, { useState } from 'react';
import {
  HelpCircle,
  AlertCircle,
  GitFork,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  CheckSquare,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { InterviewQuestion, InterviewSection } from '../../types/interview';

interface TeleprompterStepProps {
  question: InterviewQuestion;
  section: InterviewSection;
  selectedBranch?: string;
  onSelectBranch: (questionId: string, branchId: string) => void;
  isCompactMode?: boolean;
  onPrevQuestion?: () => void;
  onNextQuestion?: () => void;
  isFirstStep?: boolean;
  isLastStep?: boolean;
}

export const TeleprompterStep: React.FC<TeleprompterStepProps> = ({
  question,
  section,
  selectedBranch,
  onSelectBranch,
  isCompactMode = false,
  onPrevQuestion,
  onNextQuestion,
  isFirstStep = false,
  isLastStep = false
}) => {
  const [showMethodology, setShowMethodology] = useState(false);
  const [showFiveWhys, setShowFiveWhys] = useState(true);

  // Determine active branch option if question has branching
  const activeBranchOption = question.branching?.options.find(
    (opt) => opt.id === (selectedBranch || question.branching?.options[0]?.id)
  );

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Main Question Card with Floating Navigation Affordances */}
      <div
        className={`relative group bg-white rounded-2xl border border-slate-200/90 shadow-osde-card transition-all ${
          isCompactMode ? 'p-4 sm:p-5 space-y-4' : 'p-5 sm:p-7 space-y-6'
        }`}
      >
        {/* Floating Left Arrow (Previous Question) */}
        {!isFirstStep && onPrevQuestion && (
          <button
            type="button"
            onClick={onPrevQuestion}
            className="absolute -left-3.5 sm:-left-5 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white text-slate-700 hover:text-osde-blue border-2 border-slate-300 shadow-xl flex items-center justify-center cursor-pointer"
            title="Pregunta anterior"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 -ml-0.5 text-slate-700 hover:text-osde-blue" />
          </button>
        )}

        {/* Floating Right Arrow (Next Question) */}
        {onNextQuestion && (
          <button
            type="button"
            onClick={onNextQuestion}
            className="absolute -right-3.5 sm:-right-5 top-1/2 -translate-y-1/2 z-30 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 transition-all duration-200 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-osde-blue text-white hover:bg-osde-light border-2 border-white shadow-xl flex items-center justify-center cursor-pointer"
            title={isLastStep ? 'Finalizar entrevista' : 'Siguiente pregunta'}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 -mr-0.5 text-white" />
          </button>
        )}

        {/* Header with Badges & Slides */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-osde-blue text-white font-mono font-black text-xs flex items-center justify-center shadow-xs">
              {question.code}
            </span>
            <div>
              <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                {question.title}
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                {section.title} (~{section.suggestedMinutes} min sugeridos)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {question.methodologySlides.map((slide, idx) => (
              <span
                key={idx}
                className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-osde-subtle text-osde-blue border border-osde-border/60"
              >
                {slide}
              </span>
            ))}
            <button
              type="button"
              onClick={() => setShowMethodology(!showMethodology)}
              className="text-[11px] font-bold text-slate-500 hover:text-osde-blue flex items-center gap-1 ml-1 px-2 py-0.5 rounded hover:bg-slate-100 transition-colors"
              title="Ver justificación metodológica de cátedra"
            >
              <BookOpen className="w-3.5 h-3.5 text-osde-blue" />
              <span>{showMethodology ? 'Ocultar Fundamento' : 'Fundamento UdeSA'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Methodology Insight */}
        {showMethodology && (
          <div className="p-4 rounded-xl bg-osde-subtle/50 border border-osde-border/80 text-xs text-slate-700 space-y-1.5 animate-fadeIn">
            <div className="flex items-center gap-1.5 font-bold text-osde-dark text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-osde-blue" />
              <span>Fundamentación Metodológica (Cátedra UX UdeSA)</span>
            </div>
            <p className="leading-relaxed text-slate-800 font-medium">
              {question.methodologyRationale}
            </p>
          </div>
        )}

        {/* Verbal Script Prompt for the Moderator */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-osde-blue uppercase tracking-wider">
            <span>Guión Verbal para el Moderador</span>
          </div>

          <div
            className={`rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/30 border-2 border-osde-border/70 text-slate-900 shadow-inner ${
              isCompactMode ? 'p-4' : 'p-5'
            }`}
          >
            <p
              className={`font-semibold leading-relaxed whitespace-pre-line tracking-tight ${
                isCompactMode ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
              }`}
            >
              {question.verbalScript}
            </p>
          </div>
        </div>

        {/* Dynamic Branching Selector (if any) */}
        {question.branching && (
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-200/80 space-y-3">
            <div className="flex items-center gap-2">
              <GitFork className="w-4 h-4 text-osde-blue" />
              <h4 className="text-xs font-bold text-osde-dark uppercase tracking-wider">
                {question.branching.conditionTitle}
              </h4>
            </div>

            {/* Branching Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {question.branching.options.map((opt) => {
                const isSelected = activeBranchOption?.id === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => onSelectBranch(question.id, opt.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-osde-blue text-white border-osde-blue shadow-md scale-[1.01]'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-osde-blue/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-black">{opt.label}</div>
                  </button>
                );
              })}
            </div>

            {/* Selected Branch Verbal Script */}
            {activeBranchOption && (
              <div className="mt-3 p-4 rounded-xl bg-white border border-osde-border/80 shadow-xs space-y-2 animate-fadeIn">
                <div className="text-[11px] font-bold text-osde-blue uppercase tracking-wider flex items-center gap-1">
                  <ChevronRight className="w-3.5 h-3.5" />
                  <span>Repregunta según camino elegido:</span>
                </div>
                <p className="text-sm font-bold text-slate-900 leading-relaxed whitespace-pre-line">
                  {activeBranchOption.script}
                </p>
                {activeBranchOption.deepDiveTip && (
                  <div className="text-xs text-slate-600 bg-amber-50/70 border border-amber-200 p-2 rounded-lg font-medium">
                    💡 {activeBranchOption.deepDiveTip}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Five Whys / Probing Triggers (if any) */}
        {question.fiveWhys && (
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <button
              type="button"
              onClick={() => setShowFiveWhys(!showFiveWhys)}
              className="w-full flex items-center justify-between text-xs font-black text-amber-950 uppercase tracking-wider text-left"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-600" />
                <span>{question.fiveWhys.context || 'Técnica de los 5 Porqués (Diapositivas 22 a 25)'}</span>
              </div>
              {showFiveWhys ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFiveWhys && (
              <ul className="space-y-1.5 pt-1 text-xs text-amber-950 font-medium">
                {question.fiveWhys.prompts.map((prompt, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-white/70 p-2 rounded-lg border border-amber-200/60">
                    <span className="font-bold text-amber-600 shrink-0">↳</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Moderator Anti-Bias Guidelines */}
        {question.moderatorRules && question.moderatorRules.length > 0 && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-slate-600">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Reglas para el Moderador (Evitar Inducción)</span>
            </div>
            <ul className="text-xs text-slate-700 space-y-1 pl-4 list-disc font-medium">
              {question.moderatorRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Observer Checklist (Contextual field notes) */}
        {question.observerChecklist && question.observerChecklist.length > 0 && (
          <div className="p-3.5 rounded-xl bg-blue-50/50 border border-blue-100 space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-osde-dark">
              <CheckSquare className="w-3.5 h-3.5 text-osde-blue" />
              <span>Guía interna para el Observador (Notas de Campo)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
              {question.observerChecklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-1.5 bg-white p-2 rounded-lg border border-slate-200/60 font-medium">
                  <span className="text-osde-blue font-bold">☑</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
