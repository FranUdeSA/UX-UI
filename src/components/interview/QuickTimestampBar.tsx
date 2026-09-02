import React, { useState, useEffect } from 'react';
import { Zap, MessageSquareQuote, LogOut, Lightbulb, X, Tag } from 'lucide-react';
import { InterviewTimestampMarker, MarkerType } from '../../types/interview';

interface QuickTimestampBarProps {
  elapsedSeconds: number;
  currentQuestionCode: string;
  markers: InterviewTimestampMarker[];
  onAddMarker: (marker: InterviewTimestampMarker) => void;
  onRemoveMarker: (id: string) => void;
}

export const QuickTimestampBar: React.FC<QuickTimestampBarProps> = ({
  elapsedSeconds,
  currentQuestionCode,
  markers,
  onAddMarker,
  onRemoveMarker
}) => {
  const [quickNote, setQuickNote] = useState('');

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrigger = (type: MarkerType, label: string) => {
    const newMarker: InterviewTimestampMarker = {
      id: `mark_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      timeSeconds: elapsedSeconds,
      timeFormatted: formatTime(elapsedSeconds),
      type,
      label,
      note: quickNote.trim() ? quickNote.trim() : undefined,
      questionRef: currentQuestionCode
    };
    onAddMarker(newMarker);
    setQuickNote('');
  };

  // Keyboard shortcuts 1, 2, 3, 4 (only if user is not typing in an input/textarea)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement?.tagName || '').toLowerCase();
      if (activeTag === 'input' || activeTag === 'textarea') return;

      if (e.key === '1') handleTrigger('pain', 'Punto de Dolor / Fricción');
      if (e.key === '2') handleTrigger('quote', 'Cita Destacada / Cita de Oro');
      if (e.key === '3') handleTrigger('dropoff', 'Quiebre de Canal (Drop-off)');
      if (e.key === '4') handleTrigger('idea', 'Sugerencia / Idea');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [elapsedSeconds, currentQuestionCode, quickNote]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-osde-card p-3 sm:p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-osde-subtle text-osde-blue">
            <Tag className="w-4 h-4" />
          </span>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Botonera de Timestamps para Tactiq
            </h4>
            <p className="text-[11px] text-slate-500">
              1-clic para registrar el minuto exacto sin tener que tipear durante el Zoom.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
          Atajos: Teclas 1, 2, 3 y 4
        </span>
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {/* Button 1: Pain Point */}
        <button
          type="button"
          onClick={() => handleTrigger('pain', 'Punto de Dolor / Fricción')}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-rose-200 bg-rose-50/70 hover:bg-rose-100/90 text-rose-800 font-bold text-xs transition-all text-left shadow-sm group active:scale-[0.98]"
          title="Presiona '1' o haz clic para marcar un punto de dolor"
        >
          <div className="w-7 h-7 rounded-lg bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Zap className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1 bg-rose-200/80 rounded font-black text-rose-900">1</span>
              <span className="truncate">Punto de Dolor</span>
            </div>
            <div className="text-[10px] font-normal text-rose-600/90 truncate">Fricción o traba</div>
          </div>
        </button>

        {/* Button 2: Gold Quote */}
        <button
          type="button"
          onClick={() => handleTrigger('quote', 'Cita Destacada / Cita de Oro')}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-amber-200 bg-amber-50/70 hover:bg-amber-100/90 text-amber-900 font-bold text-xs transition-all text-left shadow-sm group active:scale-[0.98]"
          title="Presiona '2' o haz clic para marcar una cita textual clave"
        >
          <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <MessageSquareQuote className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1 bg-amber-200/80 rounded font-black text-amber-950">2</span>
              <span className="truncate">Cita de Oro</span>
            </div>
            <div className="text-[10px] font-normal text-amber-700/90 truncate">Frase memorable</div>
          </div>
        </button>

        {/* Button 3: Channel Drop-off */}
        <button
          type="button"
          onClick={() => handleTrigger('dropoff', 'Quiebre de Canal (Drop-off)')}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-purple-200 bg-purple-50/70 hover:bg-purple-100/90 text-purple-900 font-bold text-xs transition-all text-left shadow-sm group active:scale-[0.98]"
          title="Presiona '3' o haz clic para marcar un abandono o quiebre de canal"
        >
          <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <LogOut className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1 bg-purple-200/80 rounded font-black text-purple-950">3</span>
              <span className="truncate">Quiebre Canal</span>
            </div>
            <div className="text-[10px] font-normal text-purple-600/90 truncate">Abandono a otra vía</div>
          </div>
        </button>

        {/* Button 4: Idea / Suggestion */}
        <button
          type="button"
          onClick={() => handleTrigger('idea', 'Sugerencia / Idea')}
          className="flex items-center gap-2 p-2.5 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100/90 text-blue-900 font-bold text-xs transition-all text-left shadow-sm group active:scale-[0.98]"
          title="Presiona '4' o haz clic para marcar una propuesta del afiliado"
        >
          <div className="w-7 h-7 rounded-lg bg-osde-blue text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="overflow-hidden">
            <div className="flex items-center gap-1">
              <span className="text-[10px] px-1 bg-blue-200/80 rounded font-black text-blue-950">4</span>
              <span className="truncate">Sugerencia</span>
            </div>
            <div className="text-[10px] font-normal text-blue-600/90 truncate">Idea del afiliado</div>
          </div>
        </button>
      </div>

      {/* Optional Quick Keyword input */}
      <div className="flex items-center gap-2 pt-1">
        <input
          type="text"
          value={quickNote}
          onChange={(e) => setQuickNote(e.target.value)}
          placeholder="Palabra clave opcional antes de marcar (ej: 'token vencido', 'mala señal')..."
          className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-osde-blue"
        />
        {quickNote && (
          <button
            type="button"
            onClick={() => setQuickNote('')}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Recent Markers Log (Horizontal Scroll) */}
      {markers.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Marcas registradas ({markers.length})
            </span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 max-h-24">
            {markers.slice().reverse().map((m) => {
              const badgeColors =
                m.type === 'pain'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : m.type === 'quote'
                  ? 'bg-amber-50 text-amber-800 border-amber-200'
                  : m.type === 'dropoff'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : 'bg-blue-50 text-blue-700 border-blue-200';

              return (
                <div
                  key={m.id}
                  className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-medium shadow-2xs ${badgeColors}`}
                >
                  <span className="font-mono font-black text-[11px]">{m.timeFormatted}</span>
                  <span className="text-[11px] font-bold">• {m.questionRef}</span>
                  {m.note && <span className="text-[10px] italic truncate max-w-[120px]">"{m.note}"</span>}
                  <button
                    type="button"
                    onClick={() => onRemoveMarker(m.id)}
                    className="opacity-50 hover:opacity-100 p-0.5 rounded transition-opacity ml-1"
                    title="Eliminar esta marca"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
