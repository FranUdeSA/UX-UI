import React, { useState } from 'react';
import { UxLawItem, EvidenceModalData } from '../types';
import { CheckCircle2, AlertTriangle, Clock, Maximize2, HelpCircle, Image as ImageIcon, MapPin, Edit3, Check, Upload, Trash2 } from 'lucide-react';

interface UxLawCardProps {
  law: UxLawItem;
  isEditMode: boolean;
  onUpdate: (updatedLaw: UxLawItem) => void;
  onOpenEvidence: (data: EvidenceModalData) => void;
}

export const UxLawCard: React.FC<UxLawCardProps> = ({
  law,
  isEditMode,
  onUpdate,
  onOpenEvidence
}) => {
  const [localEdit, setLocalEdit] = useState(false);
  const isEditing = isEditMode || localEdit;

  const isEvaluated = law.status !== 'pendiente';
  const isCumple = law.status === 'cumple';
  const isRompe = law.status === 'rompe';

  const handleCardClick = () => {
    if (isEditing) return;
    onOpenEvidence({
      isOpen: true,
      type: 'law',
      itemId: law.id,
      title: `${law.number}. ${law.name}`,
      subtitle: law.category,
      badgeLabel: isCumple ? 'Cumple la Ley' : isRompe ? 'Rompe la Ley' : 'Pendiente de Evaluación',
      badgeColor: isCumple
        ? 'bg-emerald-600 text-white'
        : isRompe
        ? 'bg-red-600 text-white'
        : 'bg-slate-600 text-white',
      imageSrc: law.evidenceImage,
      screenName: law.screenName || 'Pantalla no especificada',
      explanation: law.explanation || 'Análisis pendiente de documentación por el equipo.',
      guidingQuestion: law.guidingQuestion
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        onUpdate({ ...law, evidenceImage: base64 });
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
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-osde-subtle text-osde-blue font-black text-xs flex items-center justify-center border border-osde-border/50">
              #{law.number}
            </span>
            {law.category && (
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {law.category}
              </span>
            )}
          </div>

          {/* Status or Status Switcher */}
          <div className="flex items-center gap-1.5">
            {isEditing ? (
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => onUpdate({ ...law, status: 'cumple' })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    law.status === 'cumple' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  Cumple
                </button>
                <button
                  type="button"
                  onClick={() => onUpdate({ ...law, status: 'rompe' })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    law.status === 'rompe' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-600 hover:text-red-700'
                  }`}
                >
                  Rompe
                </button>
                <button
                  type="button"
                  onClick={() => onUpdate({ ...law, status: 'pendiente' })}
                  className={`px-2 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    law.status === 'pendiente' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Pendiente
                </button>
              </div>
            ) : (
              <>
                {isCumple && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Cumple</span>
                  </span>
                )}
                {isRompe && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-red-50 text-red-700 border border-red-200">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                    <span>Rompe</span>
                  </span>
                )}
                {!isEvaluated && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-500 border border-slate-200">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Pendiente</span>
                  </span>
                )}
                <button
                  onClick={() => setLocalEdit(!localEdit)}
                  className="p-1 rounded-lg text-slate-400 hover:text-osde-blue hover:bg-slate-100 transition-colors"
                  title="Editar esta ley"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>

        <h3 className="text-base font-extrabold text-slate-900 group-hover:text-osde-blue transition-colors">
          {law.name}
        </h3>

        {/* Guiding Question Box */}
        <div className="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 flex items-start gap-2">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-snug italic text-[11.5px]">{law.guidingQuestion}</p>
        </div>
      </div>

      {/* Evidence & Content */}
      <div className="p-5 pt-4 space-y-4 flex-1 flex flex-col">
        
        {/* Screen location */}
        <div>
          {isEditing ? (
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Pantalla o flujo analizado:
              </label>
              <input
                type="text"
                value={law.screenName}
                placeholder="ej: Flujo de solicitud de turnos médicos"
                onChange={(e) => onUpdate({ ...law, screenName: e.target.value })}
                className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
              />
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <MapPin className="w-3.5 h-3.5 text-osde-blue" />
              <span>
                {law.screenName ? (
                  <strong className="text-slate-800">{law.screenName}</strong>
                ) : (
                  <span className="italic text-slate-400">Punto de interfaz pendiente de indicar</span>
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
              {law.evidenceImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={law.evidenceImage}
                    alt={law.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => onUpdate({ ...law, evidenceImage: '' })}
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
            {law.evidenceImage ? (
              <img
                src={law.evidenceImage}
                alt={`Evidencia de ${law.name}`}
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
        <div className="space-y-1.5 flex-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Explicación (Qué pasa y por qué)
          </h4>
          {isEditing ? (
            <textarea
              rows={3}
              value={law.explanation}
              placeholder="Escribe 1-2 frases respondiendo la pregunta guía: qué pasa y por qué..."
              onChange={(e) => onUpdate({ ...law, explanation: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
            />
          ) : law.explanation ? (
            <p className="text-xs text-slate-700 leading-relaxed line-clamp-4">
              {law.explanation}
            </p>
          ) : (
            <p className="text-xs text-slate-400 italic bg-slate-50/70 p-2.5 rounded-lg border border-dashed border-slate-200">
              Espacio preparado para redactar el análisis del equipo (1-2 frases respondiendo qué pasa y por qué).
            </p>
          )}
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
              {isEvaluated ? 'Hallazgo documentado' : 'Sin documentar'}
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
