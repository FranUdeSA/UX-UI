import React, { useState } from 'react';
import { EvidenceModalData } from '../types';
import { X, ZoomIn, ZoomOut, RotateCcw, MapPin, HelpCircle, AlertCircle, Image as ImageIcon } from 'lucide-react';

interface EvidenceModalProps {
  data: EvidenceModalData | null;
  onClose: () => void;
}

export const EvidenceModal: React.FC<EvidenceModalProps> = ({ data, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!data || !data.isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-5xl h-[90vh] max-h-[850px] shadow-2xl border border-slate-200 flex flex-col overflow-hidden relative animate-scaleUp">
        
        {/* Top Modal Bar */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-black ${data.badgeColor || 'bg-slate-700 text-white'}`}>
              {data.badgeLabel || data.type.toUpperCase()}
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {data.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {data.subtitle || 'Evidencia y Diagnóstico UX/UI - App OSDE'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Content: Split Grid (Left: Image Zoom Viewer, Right: Analysis Sidebar) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-slate-100">
          
          {/* Left: Interactive Image Viewport */}
          <div className="lg:col-span-7 bg-slate-900 flex flex-col relative overflow-hidden">
            
            {/* Zoom Controls Bar */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-slate-800/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-slate-700 text-white text-xs">
              <button
                onClick={handleZoomOut}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
                title="Alejar"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="font-mono text-[11px] px-1">{Math.round(zoomLevel * 100)}%</span>
              <button
                onClick={handleZoomIn}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
                title="Acercar"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-px h-3 bg-slate-600 mx-1" />
              <button
                onClick={handleResetZoom}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
                title="Restablecer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-6 overflow-auto">
              {data.imageSrc ? (
                <div
                  className="transition-transform duration-200 ease-out origin-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={data.imageSrc}
                    alt={data.title}
                    className="max-h-[65vh] w-auto object-contain rounded-lg shadow-2xl border border-slate-700"
                    onError={(e) => {
                      const target = e.target as HTMLElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              ) : (
                <div className="text-center p-8 text-slate-400 flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-500">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-200">Captura no cargada aún</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Puedes subir la captura directamente usando el botón <strong>Activar Modo Edición</strong> en la tarjeta.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Detailed Structured Finding Sidebar */}
          <div className="lg:col-span-5 bg-white p-6 overflow-y-auto space-y-5 border-t lg:border-t-0 lg:border-l border-slate-200">
            
            {/* Screen location */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-osde-blue" />
                <span>Ubicación / Flujo en la App</span>
              </div>
              <p className="text-xs font-bold text-slate-800">
                {data.screenName}
              </p>
            </div>

            {/* Principle or Guiding Question */}
            {data.guidingQuestion && (
              <div className="p-3 bg-osde-subtle/50 rounded-xl border border-osde-border/40 text-xs text-slate-700">
                <div className="text-[11px] font-bold uppercase tracking-wider text-osde-blue mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Principio / Pregunta Guía</span>
                </div>
                <p className="italic leading-snug">{data.guidingQuestion}</p>
              </div>
            )}

            {/* Diagnostic / Explanation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Explicación del Hallazgo
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50/70 p-3.5 rounded-xl border border-slate-200">
                {data.explanation}
              </p>
            </div>

            {/* User Impact (for Nielsen Heuristics) */}
            {data.userImpact && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Impacto en la Persona Usuaria</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/70">
                  {data.userImpact}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-bold text-xs transition-colors"
              >
                Cerrar Visor
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
