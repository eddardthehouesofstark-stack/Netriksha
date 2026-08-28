import React from 'react';
import { Eye, CheckCircle2, RefreshCw, Sparkles, Cpu, Layers, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { PatientCase } from '../types';

interface AIProcessingProps {
  step: number;
  patient: PatientCase;
  onSkip?: () => void;
}

export const AIProcessing: React.FC<AIProcessingProps> = ({ step, patient, onSkip }) => {
  const steps = [
    {
      id: 'quality',
      title: 'Checking fundus image quality & illumination',
      module: 'Quality-CheckNet (ResNet-18 Backbone)',
      dataset: 'ISO 10940 Retinal Standards',
      desc: 'Evaluating illumination uniformity, foveal center alignment, and motion blur artifacts.'
    },
    {
      id: 'dr_class',
      title: 'Detecting DR severity grade (ICDR Class 0-4)',
      module: 'APTOS 2019 DR Classifier (EfficientNet-B4)',
      dataset: 'Aravind Eye Hospital Cohort (3,662 fundus)',
      desc: 'Extracting deep global retinal features and computing multi-class softmax probability distribution.'
    },
    {
      id: 'lesions',
      title: 'Segmenting microaneurysms, hemorrhages & exudates',
      module: 'IDRiD Lesion Segmenter (Attention U-Net)',
      dataset: 'Indian Diabetic Retinopathy Dataset',
      desc: 'Localizing focal microaneurysms, blot hemorrhages, and waxy hard exudate clusters.'
    },
    {
      id: 'vessels',
      title: 'Extracting retinal blood vessel caliber & tortuosity',
      module: 'DRIVE Retinal Vessel Morphological Extractor',
      dataset: 'DRIVE Vasculature Benchmark',
      desc: 'Quantifying arteriolar-to-venular ratio (AVR) and detecting early ischemic caliber constriction.'
    },
    {
      id: 'gradcam',
      title: 'Generating Grad-CAM & Score-CAM pathological heatmaps',
      module: 'Explainability XAI Layer (Gradient-Weighted Activation)',
      dataset: 'Zero-Blackbox Interpretability',
      desc: 'Computing visual attribution gradients to map neural decisions directly to optical pathology.'
    },
    {
      id: 'triage',
      title: 'Synthesizing clinical report & tele-ophthalmology referral',
      module: 'Clinical Rule Engine & ABDM Triage',
      dataset: 'National DR Screening Protocol',
      desc: 'Consolidating findings, assigning triage urgency, and formulating specialist referral note.'
    }
  ];

  const currentPercent = Math.min(Math.round(((step + 1) / steps.length) * 100), 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12" id="ai-processing-screen">
      
      {/* Central Visual Scanning Radar Container */}
      <div className="text-center mb-8">
        <div className="relative w-32 h-32 mx-auto mb-6">
          
          {/* Glowing Animated Outer Rings */}
          <div className="absolute inset-0 rounded-full border-4 border-teal-500/20 animate-ping pointer-events-none" />
          <div className="absolute -inset-2 rounded-full border-2 border-dashed border-blue-500/30 animate-spin" style={{ animationDuration: '10s' }} />
          
          {/* Central Eye / Retinal Lens Preview */}
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-teal-400 shadow-xl shadow-teal-500/20 bg-slate-950 flex items-center justify-center">
            <img
              src={patient.image}
              alt="Scanning retina"
              className="w-full h-full object-cover opacity-60 filter contrast-125"
            />
            {/* Animated Laser Scanning Bar */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-teal-400 to-transparent shadow-[0_0_12px_#2dd4bf] animate-scanline" />
            <div className="absolute inset-0 bg-teal-900/20 mix-blend-color" />
            <div className="absolute bottom-2 text-[9px] font-mono font-bold text-teal-300 bg-black/70 px-1.5 py-0.5 rounded">
              AI INFERENCE
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
          <Cpu className="w-3.5 h-3.5 text-blue-600 animate-pulse" /> Multi-Task Neural Execution
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Analyzing Retinal Architecture
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-lg mx-auto">
          Patient: <strong className="text-slate-900">{patient.name}</strong> ({patient.id}) • {patient.eyeExamined} • {patient.location}
        </p>

        {/* Global Progress Bar */}
        <div className="max-w-md mx-auto mt-5">
          <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
            <span>Pipeline Execution</span>
            <span className="font-mono text-blue-600 font-bold">{currentPercent}% Completed</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-teal-500 to-teal-400 transition-all duration-500 rounded-full"
              style={{ width: `${currentPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step by step modular progress cards */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const isPending = idx > step;

          return (
            <div
              key={s.id}
              className={`p-3.5 rounded-xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-blue-50/80 border-blue-300 shadow-xs ring-1 ring-blue-400/30'
                  : isDone
                  ? 'bg-slate-50/70 border-slate-200'
                  : 'bg-white/40 border-slate-100 opacity-60'
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div className="shrink-0 mt-0.5 sm:mt-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-[11px] font-bold">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-xs sm:text-sm font-bold ${
                      isCurrent ? 'text-blue-900' : isDone ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {s.title}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-200/70 text-slate-700">
                      {s.module}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{s.desc}</p>
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0 text-right sm:text-right pl-9 sm:pl-0">
                {isDone && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                    <CheckCircle2 className="w-3 h-3 text-teal-600" /> PASSED
                  </span>
                )}
                {isCurrent && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100/80 px-2.5 py-1 rounded-md border border-blue-300 animate-pulse">
                    <Zap className="w-3 h-3 text-blue-600" /> INFERRING...
                  </span>
                )}
                {isPending && (
                  <span className="text-[11px] font-medium text-slate-400 px-2 py-1">
                    Queued
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Instant Skip CTA if presenter wants to jump */}
      {onSkip && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onSkip}
            className="text-xs font-semibold text-slate-500 hover:text-blue-600 transition flex items-center gap-1 cursor-pointer"
          >
            <span>Skip simulation & view results</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
