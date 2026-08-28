import React from 'react';
import { ShieldCheck, HeartPulse, Building2, Smartphone, Users, MapPin, Eye, CheckCircle2 } from 'lucide-react';

export const AboutSection: React.FC<{ onStartScreening: () => void }> = ({ onStartScreening }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="about-xai-section">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
          <HeartPulse className="w-3.5 h-3.5 text-teal-600" /> Rural Healthcare Mission
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Solving the Retinal Specialist Deficit in Bharat
        </h1>
        <p className="text-slate-600 text-sm mt-3 leading-relaxed">
          India is home to over 77 million diabetic patients, yet fewer than 25,000 ophthalmologists exist nationwide—with over 70% concentrated in tier-1 metropolitan cities. Netriksha empowers Primary Health Centre (PHC) frontline workers with explainable AI screening at the point of care.
        </p>
      </div>

      {/* 3 Impact Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Smartphone className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Low-Cost Hardware Agnostic</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Compatible with tabletop clinic fundus cameras (Forus 3nethra, Zeiss, Topcon) as well as handheld smartphone ophthalmoscope adapters (Remidio, MII RetCam, DIY 20D lens mounts).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">Zero-Blackbox Clinical Trust</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Traditional AI black-boxes face clinical skepticism. Netriksha overlays Grad-CAM heatmaps and specific lesion segmentations so visiting medical officers can visually corroborate every severity grade.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Building2 className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900">ABDM & e-Sanjeevani Triage</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Generates standardized FHIR/ABDM compliant referral records that integrate directly with Ayushman Bharat digital health IDs (ABHA) and e-Sanjeevani tele-consultation queues.
          </p>
        </div>
      </div>

      {/* Primary Health Centre Workflow Diagram */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-5 h-5 text-teal-400" /> Rural PHC to Tertiary Referral Loop
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-mono text-teal-400 font-bold">STAGE 1: VILLAGE / PHC</span>
            <div className="font-bold text-sm text-white">ASHA / Health Worker</div>
            <p className="text-slate-400 text-[11px]">Takes non-mydriatic fundus photo using smartphone or portable camera.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-mono text-teal-400 font-bold">STAGE 2: ON-DEVICE AI</span>
            <div className="font-bold text-sm text-white">Netriksha Edge Inference</div>
            <p className="text-slate-400 text-[11px]">Under 2 seconds: Image quality check, DR grading, Grad-CAM generation.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-mono text-teal-400 font-bold">STAGE 3: TELE-TRIAGE</span>
            <div className="font-bold text-sm text-white">Specialist Queue</div>
            <p className="text-slate-400 text-[11px]">High risk cases routed to District Hospital ophthalmologist for priority review.</p>
          </div>
          <div className="p-4 bg-slate-800 rounded-xl border border-slate-700 space-y-1">
            <span className="text-[10px] font-mono text-teal-400 font-bold">STAGE 4: INTERVENTION</span>
            <div className="font-bold text-sm text-white">Early Treatment</div>
            <p className="text-slate-400 text-[11px]">Timely Anti-VEGF injection or laser PRP preventing irreversible vision loss.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-blue-600 via-teal-600 to-teal-700 text-white rounded-2xl p-8 text-center space-y-4 shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-extrabold">Ready to Experience Explainable DR Screening?</h2>
        <p className="text-blue-100 text-sm max-w-xl mx-auto">
          Test real fundus presets from the APTOS 2019 and IDRiD clinical cohorts or upload your own retinal photography.
        </p>
        <button
          onClick={onStartScreening}
          className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
        >
          <Eye className="w-4 h-4 text-blue-600" />
          <span>Launch Screening Engine</span>
        </button>
      </div>

    </div>
  );
};
