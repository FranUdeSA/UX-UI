import React from 'react';
import { severityLevelsMeta } from '../data/nielsenData';
import { X, Info, HelpCircle } from 'lucide-react';

interface QuickScaleGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickScaleGuide: React.FC<QuickScaleGuideProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-osde-subtle text-osde-blue flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">
              Escala de Severidad de Nielsen (0 a 4)
            </h3>
            <p className="text-xs text-slate-500">
              Criterio estándar internacional para clasificar la gravedad de los problemas de usabilidad.
            </p>
          </div>
        </div>

        {/* Severity list */}
        <div className="space-y-3 mt-4">
          {([0, 1, 2, 3, 4] as const).map((sev) => {
            const meta = severityLevelsMeta[sev];
            return (
              <div
                key={sev}
                className={`p-3.5 rounded-xl border flex items-start gap-3.5 ${meta.bgColor}`}
              >
                <div className="mt-0.5">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-black ${meta.badgeColor}`}>
                    {sev}
                  </span>
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-black">{meta.label}</h4>
                  <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{meta.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-osde-blue" />
            <span>Referencia: Jakob Nielsen, Usability Severity Ratings (NN/g)</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-osde-blue text-white rounded-xl font-bold hover:bg-osde-dark transition-colors"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
