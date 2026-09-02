import React from 'react';
import { Play, Pause, RotateCcw, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { InterviewSection } from '../../types/interview';

interface LiveStopwatchProps {
  isRunning: boolean;
  elapsedSeconds: number;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  currentSection: InterviewSection;
  totalSuggestedMinutes?: number;
}

export const LiveStopwatch: React.FC<LiveStopwatchProps> = ({
  isRunning,
  elapsedSeconds,
  onToggleTimer,
  onResetTimer,
  currentSection,
  totalSuggestedMinutes = 20
}) => {
  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalMaxSeconds = totalSuggestedMinutes * 60;
  const progressPercent = Math.min(100, Math.round((elapsedSeconds / totalMaxSeconds) * 100));

  // Visual status
  const isOverTime = elapsedSeconds > totalMaxSeconds;
  const isApproachingTime = elapsedSeconds > totalMaxSeconds - 180 && !isOverTime; // last 3 mins

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 sm:p-4 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Stopwatch Display */}
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
              isOverTime
                ? 'bg-rose-100 text-rose-600'
                : isApproachingTime
                ? 'bg-amber-100 text-amber-600'
                : isRunning
                ? 'bg-emerald-100 text-emerald-600 animate-pulse'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            <Clock className="w-5 h-5" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black tracking-tight font-mono text-slate-900">
                {formatTime(elapsedSeconds)}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                / {totalSuggestedMinutes}:00 min
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium">
              {isOverTime ? (
                <span className="text-rose-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Tiempo sugerido excedido
                </span>
              ) : isApproachingTime ? (
                <span className="text-amber-600 font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Tramo final de entrevista
                </span>
              ) : isRunning ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> En curso • {currentSection.shortTitle} (~{currentSection.suggestedMinutes}m)
                </span>
              ) : (
                <span className="text-slate-500">Pausado • {currentSection.shortTitle}</span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTimer}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 ring-2 ring-amber-400/40'
                : 'bg-osde-blue hover:bg-osde-light text-white shadow-osde-blue/20'
            }`}
            title={isRunning ? 'Pausar cronómetro' : 'Iniciar cronómetro de entrevista'}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{elapsedSeconds === 0 ? 'Iniciar Entrevista' : 'Reanudar'}</span>
              </>
            )}
          </button>

          {elapsedSeconds > 0 && (
            <button
              type="button"
              onClick={onResetTimer}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            isOverTime ? 'bg-rose-500' : isApproachingTime ? 'bg-amber-500' : 'bg-osde-blue'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
};
