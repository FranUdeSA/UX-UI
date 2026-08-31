import React, { useState } from 'react';
import { UxLawItem, NielsenHeuristicItem } from '../types';
import { X, Copy, Check, Download, RotateCcw, Code2 } from 'lucide-react';

interface ExportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  laws: UxLawItem[];
  heuristics: NielsenHeuristicItem[];
  onResetToDefault: () => void;
}

export const ExportDataModal: React.FC<ExportDataModalProps> = ({
  isOpen,
  onClose,
  laws,
  heuristics,
  onResetToDefault
}) => {
  const [activeTab, setActiveTab] = useState<'laws' | 'heuristics'>('laws');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const lawsCode = `import { UxLawItem } from '../types';\n\nexport const uxLawsData: UxLawItem[] = ${JSON.stringify(
    laws,
    null,
    2
  )};\n`;

  const heuristicsCode = `import { NielsenHeuristicItem } from '../types';\n\nexport const nielsenHeuristicsData: NielsenHeuristicItem[] = ${JSON.stringify(
    heuristics,
    null,
    2
  )};\n\nexport { severityLevelsMeta } from './nielsenData';\n`;

  const currentCode = activeTab === 'laws' ? lawsCode : heuristicsCode;
  const currentFileName = activeTab === 'laws' ? 'uxLawsData.ts' : 'nielsenData.ts';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([currentCode], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-osde-subtle text-osde-blue flex items-center justify-center font-bold">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Sincronizar y Exportar Datos
              </h3>
              <p className="text-xs text-slate-500">
                Tus cambios se guardan automáticamente en tu navegador. Desde aquí puedes copiar el código para guardarlo en el archivo fuente.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex border-b border-slate-200 bg-slate-100/70 px-6 pt-3 gap-3">
          <button
            onClick={() => setActiveTab('laws')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl border-t border-x transition-all ${
              activeTab === 'laws'
                ? 'bg-white border-slate-200 text-osde-blue shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tablero 1: uxLawsData.ts
          </button>
          <button
            onClick={() => setActiveTab('heuristics')}
            className={`px-4 py-2 text-xs font-bold rounded-t-xl border-t border-x transition-all ${
              activeTab === 'heuristics'
                ? 'bg-white border-slate-200 text-osde-blue shadow-sm'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Tablero 2: nielsenData.ts
          </button>
        </div>

        {/* Code Preview */}
        <div className="flex-1 p-6 overflow-y-auto bg-slate-900 text-slate-200 font-mono text-xs">
          <pre className="whitespace-pre-wrap">{currentCode}</pre>
        </div>

        {/* Action Toolbar */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('¿Seguro que deseas restablecer los datos a los valores originales en blanco?')) {
                onResetToDefault();
                onClose();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Todo</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 text-slate-800 hover:bg-slate-300 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Copiado!' : 'Copiar Código'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-osde-blue text-white hover:bg-osde-dark transition-colors shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Archivo</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
