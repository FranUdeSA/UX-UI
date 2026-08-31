import React, { useState } from 'react';
import { NielsenHeuristicItem, EvidenceModalData } from '../types';
import { severityLevelsMeta } from '../data/nielsenData';
import { Maximize2, MapPin, Image as ImageIcon, AlertCircle, Info, Edit3, Check, Upload, Trash2 } from 'lucide-react';

interface NielsenCardProps {
  heuristic: NielsenHeuristicItem;
  isEditMode: boolean;
  onUpdate: (updatedItem: NielsenHeuristicItem) => void;
  onOpenEvidence: (data: EvidenceModalData) => void;
}

export const NielsenCard: React.FC<NielsenCardProps> = ({
  heuristic,
  isEditMode,
  onUpdate,
  onOpenEvidence
}) => {
  const [localEdit, setLocalEdit] = useState(false);
  const isEditing = isEditMode || localEdit;

  const isEvaluated = heuristic.severity !== null;
  const sevMeta = isEvaluated && heuristic.severity !== null ? severityLevelsMeta[heuristic.severity] : null;

  const handleCardClick = () => {
    if (isEditing) return;
    onOpenEvidence({
      isOpen: true,
      type: 'heuristic',
      itemId: heuristic.id,
      title: `${heuristic.id}: ${heuristic.name}`,
      subtitle: heuristic.principleDescription,
      badgeLabel: sevMeta ? sevMeta.label : 'Pendiente de Severidad',
      badgeColor: sevMeta ? sevMeta.badgeColor : 'bg-slate-600 text-white',
      imageSrc: heuristic.evidenceImage,
      screenName: heuristic.screenName || 'Pantalla no especificada',
      explanation: heuristic.explanation || 'Análisis pendiente de documentación por el equipo.',
      userImpact: heuristic.userImpact || 'Impacto pendiente de documentar.',
      guidingQuestion: heuristic.principleDescription
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onUpdate({ ...heuristic, evidenceImage: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden group ${
      isEditing ? 'border-amber-400 ring-2 ring-amber-300/30 shadow-lg' : 'border-slate-200 shadow-osde-card hover:shadow-osde-hover'
    }`}>
      
      {/* Card Header */}
      <div className="p-5 pb-4 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          
          {/* Code badge */}
          <div className="flex items-center gap-2">
            <span className="w-9 h-7 rounded-lg bg-osde-blue text-white font-black text-xs flex items-center justify-center shadow-sm shadow-osde-blue/30">
              {heuristic.id}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Heurística #{heuristic.number}
            </span>
          </div>

          {/* Severity Badge or Selector */}
          <div className="flex items-center gap-1.5">
            {isEditing ? (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl flex-wrap">
                {([0, 1, 2, 3, 4] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => onUpdate({ ...heuristic, severity: lvl })}
                    className={`w-6 h-6 rounded-lg text-xs font-black transition-all ${
                      heuristic.severity === lvl
                        ? `${severityLevelsMeta[lvl].badgeColor} shadow-sm`
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                    title={severityLevelsMeta[lvl].label}
                  >
                    {lvl}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => onUpdate({ ...heuristic, severity: null })}
                  className={`px-1.5 h-6 rounded-lg text-[10px] font-bold transition-all ${
                    heuristic.severity === null ? 'bg-slate-700 text-white' : 'text-slate-500'
                  }`}
                  title="Sin evaluar"
                >
                  X
                </button>
              </div>
            ) : (
              <>
                {sevMeta ? (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border ${sevMeta.bgColor}`}>
                    <span className={`w-2 h-2 rounded-full ${sevMeta.dotColor}`} />
                    <span>{sevMeta.shortLabel}</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    <span>Pendiente</span>
                  </span>
                )}
                <button
                  onClick={() => setLocalEdit(!localEdit)}
                  className="p-1 rounded-lg text-slate-400 hover:text-osde-blue hover:bg-slate-100 transition-colors"
                  title="Editar esta heurística"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-osde-blue transition-colors">
          {heuristic.name}
        </h3>

        {/* Principle Definition Box */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-osde-subtle/50 border border-osde-border/40 text-xs text-slate-700 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-osde-blue shrink-0 mt-0.5" />
          <p className="leading-snug text-[11.5px]">{heuristic.principleDescription}</p>
        </div>
      </div>

      {/* Evidence & Content */}
      <div className="p-5 pt-4 space-y-4 flex-1 flex flex-col">
        
        {/* Screen location */}
        <div>
          {isEditing ? (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Punto o flujo analizado:
              </label>
              <input
                type="text"
                value={heuristic.screenName}
                placeholder="ej: Pantalla de Espera de Médico Virtual"
                onChange={(e) => onUpdate({ ...heuristic, screenName: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-osde-blue" />
              <span>
                {heuristic.screenName ? (
                  <strong className="text-slate-800">{heuristic.screenName}</strong>
                ) : (
                  <span className="italic text-slate-400">Punto o flujo pendiente de indicar</span>
                )}
              </span>
            </div>
          )}
        </div>

        {/* Screenshot / Evidence Preview or Uploader */}
        {isEditing ? (
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Captura de pantalla:
            </label>
            <div className="relative aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center">
              {heuristic.evidenceImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={heuristic.evidenceImage}
                    alt={heuristic.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdate({ ...heuristic, evidenceImage: '' })}
                    className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 shadow-md transition-colors"
                    title="Eliminar imagen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center gap-1.5 text-slate-500 hover:text-osde-blue transition-colors">
                  <Upload className="w-6 h-6 text-slate-400" />
                  <span className="text-xs font-bold">Subir captura desde tu PC</span>
                  <span className="text-[10px] text-slate-400">PNG, JPG o WebP</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={handleCardClick}
            className="relative aspect-[16/10] bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer group/img flex items-center justify-center"
          >
            {heuristic.evidenceImage ? (
              <img
                src={heuristic.evidenceImage}
                alt={`Evidencia de ${heuristic.id}`}
                className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
            ) : (
              <div className="text-center p-4 text-slate-400 flex flex-col items-center gap-1.5">
                <ImageIcon className="w-8 h-8 text-slate-300" />
                <span className="text-xs font-semibold">Captura de evidencia pendiente</span>
                <span className="text-[10px] text-slate-400">Clic para previsualizar</span>
              </div>
            )}

            <div className="absolute inset-0 bg-osde-dark/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-1.5 backdrop-blur-[2px]">
              <Maximize2 className="w-4 h-4" />
              <span>Ver detalle ampliado</span>
            </div>
          </div>
        )}

        {/* Written Analysis */}
        <div className="space-y-2 flex-1">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Diagnóstico (Qué pasa y por qué)
            </h4>
            {isEditing ? (
              <textarea
                rows={2}
                value={heuristic.explanation}
                placeholder="Explica qué pasa en la interfaz y por qué cumple o rompe la heurística..."
                onChange={(e) => onUpdate({ ...heuristic, explanation: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
              />
            ) : heuristic.explanation ? (
              <p className="text-xs text-slate-700 leading-relaxed line-clamp-3">
                {heuristic.explanation}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50/70 p-2 rounded-lg border border-dashed border-slate-200">
                Espacio preparado para redactar qué pasa en la app y por qué cumple o rompe la heurística.
              </p>
            )}
          </div>

          {/* User Impact Block */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-slate-400" />
              <span>Impacto en la persona usuaria</span>
            </h4>
            {isEditing ? (
              <textarea
                rows={2}
                value={heuristic.userImpact}
                placeholder="Detalla qué consecuencia directa o fricción genera en la persona usuaria..."
                onChange={(e) => onUpdate({ ...heuristic, userImpact: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
              />
            ) : heuristic.userImpact ? (
              <p className="text-xs text-slate-700 leading-relaxed line-clamp-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                {heuristic.userImpact}
              </p>
            ) : (
              <p className="text-xs text-slate-400 italic bg-slate-50/70 p-2 rounded-lg border border-dashed border-slate-200">
                Espacio para detallar la consecuencia directa del hallazgo en la experiencia de uso.
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Footer Action Button */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        {isEditing ? (
          <div className="w-full flex items-center justify-between">
            <span className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              Editando campo
            </span>
            <button
              type="button"
              onClick={() => setLocalEdit(false)}
              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 flex items-center gap-1 shadow-sm"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Listo</span>
            </button>
          </div>
        ) : (
          <>
            <span className="text-[11px] text-slate-500 font-medium">
              {isEvaluated ? 'Evaluación completada' : 'Pendiente de carga'}
            </span>
            <button
              onClick={handleCardClick}
              className="text-xs font-bold text-osde-blue hover:text-osde-dark inline-flex items-center gap-1"
            >
              <span>Examinar</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </>
        )}
      </div>

    </div>
  );
};
