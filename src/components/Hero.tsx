import React from 'react';
import { ArrowRight, Activity, ShieldCheck, Sparkles, Eye, CheckCircle2, Zap, HeartPulse, Building2 } from 'lucide-react';

interface HeroProps {
  onStartScreening: () => void;
  onExploreDoctor: () => void;
  onViewPipeline: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartScreening, onExploreDoctor, onViewPipeline }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50 to-white pt-12 pb-16 border-b border-slate-200/60">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-blue-400/10 via-teal-400/10 to-indigo-400/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Trust & Initiative Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border border-teal-300 text-teal-900 text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>AI for Rural Healthcare • Ayushman Bharat Digital Mission (ABDM) Ready</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] sm:leading-[1.15]">
            AI-Powered Early Detection for{' '}
            <span className="bg-gradient-to-r from-blue-700 via-teal-600 to-teal-500 bg-clip-text text-transparent">
              Diabetic Retinopathy
            </span>
          </h1>

          {/* Value proposition subtext */}
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between <strong className="text-slate-900 font-semibold">77+ million diabetic individuals</strong> and scarce retinal specialists in rural India with Grad-CAM visual heatmaps, automated severity grading, and instant tele-triage.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <button
              id="hero-cta-start-screening"
              onClick={onStartScreening}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-150 active:scale-98 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Screening</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-cta-doctor-portal"
              onClick={onExploreDoctor}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm shadow-xs transition-all active:scale-98 cursor-pointer"
            >
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Doctor Triage Portal</span>
            </button>

            <button
              id="hero-cta-pipeline-info"
              onClick={onViewPipeline}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Explore AI Pipeline</span>
            </button>
          </div>

          {/* Live Quick Clinical Metrics Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            {[
              {
                label: 'Clinical Sensitivity',
                val: '94.8%',
                sub: 'Zero Miss High-Risk',
                icon: HeartPulse,
                color: 'text-blue-700',
                bg: 'bg-blue-50/70 border-blue-200'
              },
              {
                label: 'Inference Latency',
                val: '< 1.8s',
                sub: 'Edge PHC Optimized',
                icon: Zap,
                color: 'text-teal-700',
                bg: 'bg-teal-50/70 border-teal-200'
              },
              {
                label: 'Explainability XAI',
                val: 'Grad-CAM',
                sub: 'Lesion Pixel Masks',
                icon: Eye,
                color: 'text-indigo-700',
                bg: 'bg-indigo-50/70 border-indigo-200'
              },
              {
                label: 'ICDR Guideline',
                val: 'Class 0-4',
                sub: 'Standardized Severity',
                icon: CheckCircle2,
                color: 'text-emerald-700',
                bg: 'bg-emerald-50/70 border-emerald-200'
              }
            ].map((stat, idx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border text-center ${stat.bg} shadow-xs hover:shadow-sm transition-all`}
                >
                  <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                    <StatIcon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{stat.label}</span>
                  </div>
                  <div className={`text-2xl sm:text-3xl font-black ${stat.color} tracking-tight`}>
                    {stat.val}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium mt-0.5">{stat.sub}</div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
