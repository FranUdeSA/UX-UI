import React from 'react';
import { teamData } from '../data/teamData';
import { Users, GraduationCap, Palette } from 'lucide-react';

export const TeamFooter: React.FC = () => {
  return (
    <footer className="mt-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Academic Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-osde-blue font-extrabold text-sm">
              <GraduationCap className="w-5 h-5" />
              <span>{teamData.university}</span>
            </div>
            <h4 className="text-base font-extrabold text-slate-900">
              {teamData.course}
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              {teamData.project}. Herramienta diseñada para documentar la auditoría de usabilidad y leyes UX sobre la app de salud líder en Argentina.
            </p>
          </div>

          {/* Column 2: Team Members (4) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 text-osde-blue" />
              <span>Integrantes del Equipo (4)</span>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {teamData.members.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-800"
                >
                  <span className="w-5 h-5 rounded-full bg-osde-subtle text-osde-blue text-[10px] font-black flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Brand & Design System Tokens */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-700 font-bold text-xs uppercase tracking-wider">
              <Palette className="w-4 h-4 text-osde-blue" />
              <span>Manual de Identidad OSDE</span>
            </div>
            <div className="p-3.5 rounded-xl bg-osde-subtle/40 border border-osde-border/60 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700">Azul Principal OSDE:</span>
                <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold">
                  <span className="w-3.5 h-3.5 rounded-full bg-[#1226AA] border border-white shadow-sm inline-block" />
                  <span>#1226AA</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-slate-500 text-[11px]">
                <span>Norma cromática:</span>
                <span className="font-semibold text-slate-700">{teamData.brand.pantone}</span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1 border-t border-osde-border/40">
                {teamData.brand.description}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div>
            © 2026 UdeSA UX/UI • Artefacto interactivo desplegado en Vercel
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-500 font-medium">Desarrollado para evaluación académica</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
