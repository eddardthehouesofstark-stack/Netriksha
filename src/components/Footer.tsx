import React from 'react';
import { Eye, ShieldCheck, Heart, ExternalLink } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (tab: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 text-xs text-slate-500 py-10" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Main Footer Links Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-teal-500 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-sm tracking-tight">
                Netriksha
              </span>
              <p className="text-[11px] text-slate-400">Explainable DR Screening & Tele-Ophthalmology for Rural India</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-slate-600 font-semibold text-[11px]">
            <button onClick={() => onNavigate('home')} className="hover:text-blue-600 transition cursor-pointer">
              Home
            </button>
            <button onClick={() => onNavigate('screen')} className="hover:text-blue-600 transition cursor-pointer">
              Screen Patient
            </button>
            <button onClick={() => onNavigate('doctor')} className="hover:text-blue-600 transition cursor-pointer">
              Doctor Dashboard
            </button>
            <button onClick={() => onNavigate('pipeline')} className="hover:text-blue-600 transition cursor-pointer">
              AI Pipeline
            </button>
            <button onClick={() => onNavigate('about')} className="hover:text-blue-600 transition cursor-pointer">
              Rural Impact
            </button>
          </div>
        </div>

        {/* Clinical Disclaimer & Benchmarks */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>
            Trained and evaluated on <strong className="text-slate-600">APTOS 2019</strong> (Aravind Eye Hospital), <strong className="text-slate-600">IDRiD</strong>, and <strong className="text-slate-600">DRIVE</strong> benchmarks.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>SIH Hackathon Prototype Edition • ABDM Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
