import React, { useState } from 'react';
import { UxLawItem, NielsenHeuristicItem } from '../types';
import { publishDataToGithub } from '../utils/githubSync';
import { X, CloudUpload, Key, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  laws: UxLawItem[];
  heuristics: NielsenHeuristicItem[];
}

export const PublishModal: React.FC<PublishModalProps> = ({
  isOpen,
  onClose,
  laws,
  heuristics,
}) => {
  const [token, setToken] = useState<string>(() => localStorage.getItem('osde_github_token') || '');
  const [owner] = useState<string>('FranUdeSA');
  const [repo] = useState<string>('UX-UI');
  const [branch] = useState<string>('main');
  const [customMessage, setCustomMessage] = useState<string>('');
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token.trim()) {
      setErrorMessage('Por favor ingresa tu GitHub Personal Access Token.');
      setStatus('error');
      return;
    }

    // Guardar token en localStorage para futuros usos
    localStorage.setItem('osde_github_token', token.trim());
    setStatus('loading');
    setErrorMessage('');

    try {
      await publishDataToGithub({
        owner,
        repo,
        branch,
        token: token.trim(),
        laws,
        heuristics,
        commitMessage: customMessage.trim() || undefined,
      });

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Ocurrió un error al intentar publicar en GitHub.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-scaleUp">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-osde-blue text-white flex items-center justify-center shadow-sm">
              <CloudUpload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">
                Publicar Cambios en la Web
              </h3>
              <p className="text-xs text-slate-500">
                Guarda tus hallazgos directamente en GitHub para que se reflejen en Vercel.
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

        {/* Content */}
        <div className="p-6 space-y-4">
          
          {status === 'success' ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-slate-900">¡Cambios publicados con éxito!</h4>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto leading-relaxed">
                  Se generó un nuevo commit en el repositorio <strong>{owner}/{repo}</strong>. Vercel ya está reconstruyendo la web y en aproximadamente <strong>30 segundos</strong> todos verán los cambios actualizados.
                </p>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setStatus('idle');
                    onClose();
                  }}
                  className="px-5 py-2.5 bg-osde-blue text-white font-bold text-xs rounded-xl hover:bg-osde-dark transition-colors shadow-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePublish} className="space-y-4">
              
              {/* Token field */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-osde-blue" />
                    <span>GitHub Personal Access Token</span>
                  </label>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=repo&description=OSDE%20UX%20Evaluator"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-osde-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>¿Cómo obtenerlo? Clic aquí</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <input
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-osde-blue focus:outline-none"
                  required
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  Solo necesitas generarlo una vez. Quedará guardado en tu navegador de forma segura.
                </p>
              </div>

              {/* Commit message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Descripción del cambio (opcional):
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="ej: Agregado análisis de Ley de Fitts y Heurística 1"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-osde-blue focus:outline-none"
                />
              </div>

              {/* Repo info pill */}
              <div className="p-3 bg-osde-subtle/50 rounded-xl border border-osde-border/50 text-xs text-slate-600 flex items-center justify-between">
                <span>Repositorio destino:</span>
                <span className="font-mono font-bold text-osde-blue">{owner}/{repo} ({branch})</span>
              </div>

              {/* Error box */}
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <p>{errorMessage}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-osde-blue hover:bg-osde-dark text-white text-xs font-extrabold rounded-xl transition-colors shadow-sm disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Publicando en GitHub...</span>
                    </>
                  ) : (
                    <>
                      <CloudUpload className="w-4 h-4" />
                      <span>Publicar Cambios a GitHub y Vercel</span>
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
