import React from 'react';
import { ShieldCheck, CheckCircle2, Layers, Sparkles, Send, Eye, Cpu, Compass } from 'lucide-react';

export const FeatureCards: React.FC<{ onExploreFeature?: (featureId: string) => void }> = () => {
  const features = [
    {
      id: 'quality',
      icon: CheckCircle2,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
      title: 'Image Quality Check',
      badge: 'ResNet-18',
      desc: 'Instant pre-evaluation of retinal illumination, field focus, pupil alignment, and artifact blur to safeguard against false negatives in rural PHC field photography.'
    },
    {
      id: 'severity',
      icon: Layers,
      iconBg: 'bg-blue-50 text-blue-600 border-blue-200',
      title: 'DR Detection & Severity Grading',
      badge: 'APTOS 2019',
      desc: 'Multi-class international clinical consensus classification (No DR, Mild, Moderate, Severe, PDR) conforming strictly to ICDR gold standards with 94.8% sensitivity.'
    },
    {
      id: 'gradcam',
      icon: Sparkles,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200',
      title: 'Explainable AI & Grad-CAM',
      badge: 'IDRiD U-Net',
      desc: 'Generates transparent visual attention heatmaps and segments microaneurysms, hemorrhages, and hard exudates so village doctors can visually verify the AI decision.'
    },
    {
      id: 'referral',
      icon: Send,
      iconBg: 'bg-teal-50 text-teal-600 border-teal-200',
      title: 'Smart Tele-Referral Triage',
      badge: 'ABDM Tele-Health',
      desc: 'Automatically triages urgency (High/Medium/Low) and compiles standardized ABDM-ready tele-referral slips for seamless specialist review at District & Tertiary Hospitals.'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" id="features-section">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Cpu className="w-3.5 h-3.5 text-blue-600" /> Transparent Multi-Stage AI Pipeline
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Clinician-Centric Retinal Diagnostic Engine
        </h2>
        <p className="text-slate-600 text-sm mt-2 leading-relaxed">
          Engineered specifically for low-resource Indian Primary Health Centres (PHCs) to bridge the acute deficit of retinal specialists across rural and semi-urban communities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              id={`feature-card-${item.id}`}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.iconBg} group-hover:scale-105 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-teal-700 font-semibold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-600" /> Explainable Layer
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Module Active</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
