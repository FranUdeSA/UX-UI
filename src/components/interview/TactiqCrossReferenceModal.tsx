import React, { useState } from 'react';
import {
  X,
  FileText,
  Copy,
  Check,
  Zap,
  MessageSquareQuote,
  LogOut,
  Lightbulb,
  Clock,
  UserCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { InterviewSession, ArchetypeProfile, MarkerType } from '../../types/interview';

interface TactiqCrossReferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: InterviewSession;
  onUpdateSession: (updated: InterviewSession) => void;
}

export const TactiqCrossReferenceModal: React.FC<TactiqCrossReferenceModalProps> = ({
  isOpen,
  onClose,
  session,
  onUpdateSession
}) => {
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<MarkerType | 'all'>('all');
  const [notes, setNotes] = useState(session.generalNotes || '');
  const [archetype, setArchetype] = useState<ArchetypeProfile>(session.archetype || 'sin_definir');

  if (!isOpen) return null;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleArchetypeChange = (newArch: ArchetypeProfile) => {
    setArchetype(newArch);
    onUpdateSession({
      ...session,
      archetype: newArch,
      generalNotes: notes
    });
  };

  const handleSaveNotes = () => {
    onUpdateSession({
      ...session,
      generalNotes: notes,
      archetype
    });
  };

  const filteredMarkers =
    filterType === 'all'
      ? session.markers
      : session.markers.filter((m) => m.type === filterType);

  const painCount = session.markers.filter((m) => m.type === 'pain').length;
  const quoteCount = session.markers.filter((m) => m.type === 'quote').length;
  const dropoffCount = session.markers.filter((m) => m.type === 'dropoff').length;
  const ideaCount = session.markers.filter((m) => m.type === 'idea').length;

  const generateReportText = () => {
    let report = `# Ficha de Entrevista UX: ${session.title}\n`;
    report += `- **Participante**: ${session.participantCode}\n`;
    report += `- **Dupla Entrevistadora**: ${session.interviewers.join(' & ')}\n`;
    report += `- **Fecha**: ${session.date}\n`;
    report += `- **Duración Total**: ${formatTime(session.elapsedSeconds)} min\n`;
    report += `- **Arquetipo Calibrado**: ${
      archetype === 'preventivo_esporadico'
        ? 'Preventivo / Esporádico (baja frecuencia)'
        : archetype === 'intensivo_cronico'
        ? 'Intensivo / Crónico (alta frecuencia o tratamientos)'
        : 'Sin definir'
    }\n\n`;

    report += `## Resumen de Marcas de Tiempo para Tactiq\n`;
    if (session.markers.length === 0) {
      report += `(No se registraron marcas durante la llamada)\n\n`;
    } else {
      session.markers.forEach((m) => {
        report += `- **[${m.timeFormatted}]** (${m.questionRef}) [${m.label}]${
          m.note ? `: "${m.note}"` : ''
        }\n`;
      });
      report += `\n`;
    }

    if (notes.trim()) {
      report += `## Notas y Conclusiones de la Dupla\n${notes.trim()}\n\n`;
    }

    report += `*Generado con el Copiloto de Entrevistas UX - UdeSA / OSDE*`;
    return report;
  };

  const handleCopyReport = () => {
    handleSaveNotes();
    const text = generateReportText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-osde-subtle text-osde-blue flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Ficha de Entrevista & Cruce con Tactiq
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {session.title} • {session.participantCode}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          {/* Metadata Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <Clock className="w-3 h-3 text-osde-blue" />
                <span>Duración Real</span>
              </div>
              <div className="text-lg font-black text-slate-900 font-mono">
                {formatTime(session.elapsedSeconds)}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <UserCheck className="w-3 h-3 text-osde-blue" />
                <span>Dupla</span>
              </div>
              <div className="text-xs font-bold text-slate-800 truncate" title={session.interviewers.join(', ')}>
                {session.interviewers[0]?.split(' ')[0]} & {session.interviewers[1]?.split(' ')[0] || 'Investigador'}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <Calendar className="w-3 h-3 text-osde-blue" />
                <span>Fecha</span>
              </div>
              <div className="text-xs font-bold text-slate-800">
                {session.date}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                <Layers className="w-3 h-3 text-osde-blue" />
                <span>Marcas Totales</span>
              </div>
              <div className="text-lg font-black text-slate-900">
                {session.markers.length}
              </div>
            </div>
          </div>

          {/* Archetype Profiling from P3 */}
          <div className="p-4 rounded-2xl bg-blue-50/40 border border-osde-border/80 space-y-2">
            <label className="text-xs font-black text-osde-dark uppercase tracking-wider block">
              Calibración del Arquetipo (Según Frecuencia en P3)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleArchetypeChange('preventivo_esporadico')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  archetype === 'preventivo_esporadico'
                    ? 'bg-osde-blue text-white border-osde-blue shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-osde-blue/50'
                }`}
              >
                <div className="text-xs font-bold">🌱 Usuario Preventivo / Esporádico</div>
                <div className={`text-[11px] ${archetype === 'preventivo_esporadico' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Consultas 1 a 2 veces al año, controles de rutina o farmacia ocasional.
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleArchetypeChange('intensivo_cronico')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  archetype === 'intensivo_cronico'
                    ? 'bg-osde-blue text-white border-osde-blue shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-osde-blue/50'
                }`}
              >
                <div className="text-xs font-bold">⚡ Usuario Intensivo / Crónico</div>
                <div className={`text-[11px] ${archetype === 'intensivo_cronico' ? 'text-blue-100' : 'text-slate-500'}`}>
                  Uso frecuente mensual, tratamientos continuos, especialistas o grupo familiar.
                </div>
              </button>
            </div>
          </div>

          {/* Timestamps Index for Tactiq */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                  Índice de Marcas para Buscar en Tactiq
                </h4>
                <span className="text-[11px] text-slate-500">
                  (Ve directo al minuto indicado en tu transcripción)
                </span>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setFilterType('all')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    filterType === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Todos ({session.markers.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('pain')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    filterType === 'pain'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  Dolores ({painCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('quote')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    filterType === 'quote'
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  Citas ({quoteCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('dropoff')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    filterType === 'dropoff'
                      ? 'bg-purple-600 text-white'
                      : 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                  }`}
                >
                  Quiebres ({dropoffCount})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterType('idea')}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-colors ${
                    filterType === 'idea'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                  }`}
                >
                  Ideas ({ideaCount})
                </button>
              </div>
            </div>

            {/* Markers List */}
            {filteredMarkers.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-400">
                No se registraron marcas en esta categoría durante la llamada.
              </div>
            ) : (
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {filteredMarkers.map((m) => {
                  const isPain = m.type === 'pain';
                  const isQuote = m.type === 'quote';
                  const isDropoff = m.type === 'dropoff';

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                        isPain
                          ? 'bg-rose-50/60 border-rose-200/80 text-rose-900'
                          : isQuote
                          ? 'bg-amber-50/60 border-amber-200/80 text-amber-950'
                          : isDropoff
                          ? 'bg-purple-50/60 border-purple-200/80 text-purple-900'
                          : 'bg-blue-50/60 border-blue-200/80 text-blue-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono font-black text-sm px-2 py-0.5 rounded-lg bg-white shadow-2xs">
                          {m.timeFormatted}
                        </span>
                        <div className="w-5 h-5 rounded flex items-center justify-center shrink-0">
                          {isPain && <Zap className="w-4 h-4 text-rose-600" />}
                          {isQuote && <MessageSquareQuote className="w-4 h-4 text-amber-600" />}
                          {isDropoff && <LogOut className="w-4 h-4 text-purple-600" />}
                          {!isPain && !isQuote && !isDropoff && <Lightbulb className="w-4 h-4 text-osde-blue" />}
                        </div>
                        <div>
                          <div className="font-bold flex items-center gap-1.5">
                            <span>{m.label}</span>
                            <span className="text-[10px] text-slate-500 font-semibold">• {m.questionRef}</span>
                          </div>
                          {m.note && (
                            <div className="text-[11px] text-slate-600 italic">
                              "{m.note}"
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-[10px] font-bold text-slate-400 shrink-0">
                        Minuto Tactiq
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* General Notes & Observations Field */}
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block">
              Notas y Conclusiones de la Dupla
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={handleSaveNotes}
              placeholder="Escribe impresiones generales, hallazgos clave o puntos a destacar en el informe..."
              className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-osde-blue resize-none"
            />
          </div>
        </div>

        {/* Modal Footer with Single Copy Action */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900 rounded-xl transition-colors"
          >
            Cerrar
          </button>

          <button
            type="button"
            onClick={handleCopyReport}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-osde-blue hover:bg-osde-light text-white shadow-osde-blue/20'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Ficha Copiada al Portapapeles!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar Ficha de la Entrevista</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
