import React, { useState } from 'react';
import { 
  FileText, 
  RefreshCw, 
  Sparkles, 
  Eye, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  Info, 
  ChevronRight, 
  Share2, 
  Sliders, 
  Maximize2,
  Send,
  Zap,
  Building2
} from 'lucide-react';
import { PatientCase, ViewMode, HeatmapColorMap, LesionPoint } from '../types';
import { ClinicalReportModal } from './ClinicalReportModal';

interface ResultsDashboardProps {
  patient: PatientCase;
  onReset: () => void;
  onGoToDoctor: () => void;
  onApproveReferral?: (patientId: string) => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  patient,
  onReset,
  onGoToDoctor,
  onApproveReferral
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('gradcam');
  const [colorMap, setColorMap] = useState<HeatmapColorMap>('turbo');
  const [heatmapOpacity, setHeatmapOpacity] = useState<number>(85);
  const [splitPosition, setSplitPosition] = useState<number>(50); // 0 to 100
  const [selectedLesion, setSelectedLesion] = useState<LesionPoint | null>(null);
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  const isHighRisk = patient.riskLevel === 'High';
  const isMediumRisk = patient.riskLevel === 'Medium';
  const isNormal = patient.riskLevel === 'Normal';

  // Heatmap styling filter classes based on colormap
  const getHeatmapFilter = () => {
    switch (colorMap) {
      case 'jet':
        return 'hue-rotate-180 saturate-200 contrast-150';
      case 'inferno':
        return 'hue-rotate-270 saturate-200 contrast-125 brightness-110';
      case 'spectral':
        return 'invert hue-rotate-90 saturate-150 contrast-150';
      case 'turbo':
      default:
        return 'hue-rotate-90 saturate-200 contrast-125';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6" id="results-dashboard">
      
      {/* Top Triage Alert Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className={`p-3 rounded-xl shrink-0 ${
            isHighRisk 
              ? 'bg-red-50 text-red-600 border border-red-200' 
              : isMediumRisk 
              ? 'bg-amber-50 text-amber-600 border border-amber-200' 
              : isNormal 
              ? 'bg-teal-50 text-teal-600 border border-teal-200'
              : 'bg-blue-50 text-blue-600 border border-blue-200'
          }`}>
            {isHighRisk ? (
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            ) : isNormal ? (
              <CheckCircle2 className="w-6 h-6" />
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Screening Result: {patient.drSeverity}
              </h1>
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                isHighRisk 
                  ? 'bg-red-100 text-red-700 border border-red-200' 
                  : isMediumRisk 
                  ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                  : isNormal
                  ? 'bg-teal-100 text-teal-700 border border-teal-200'
                  : 'bg-blue-100 text-blue-700 border border-blue-200'
              }`}>
                {patient.riskLevel} Risk Tier
              </span>
              <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                ICDR Grade {patient.stage} / 4
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-1">
              Patient: <strong className="text-slate-900">{patient.name}</strong> • Age: {patient.age} Y • ID: {patient.id} • {patient.eyeExamined} • {patient.location}
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            id="generate-clinical-report-button"
            onClick={() => setShowReportModal(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition active:scale-98 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-teal-400" />
            <span>Generate Clinical Report (PDF)</span>
          </button>

          <button
            id="new-screening-button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold px-3 py-2.5 rounded-xl transition cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>New Screening</span>
          </button>
        </div>
      </div>

      {/* 3-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* ========================================================
            COLUMN 1: Original Fundus Retina
           ======================================================== */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-blue-600" /> 1. Original Fundus Retina
              </h2>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                Quality: {patient.quality}
              </span>
            </div>

            {/* Fundus image viewport */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-950 group">
              <img
                src={patient.image}
                alt="Original Fundus"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 text-[10px] text-white/90 bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded font-mono">
                {patient.eyeExamined}
              </div>
              <div className="absolute bottom-2 right-2 text-[10px] text-teal-300 bg-black/70 px-2 py-0.5 rounded font-mono">
                45° Optical Sensor
              </div>
            </div>

            <p className="text-[11px] text-slate-500">
              High-resolution digital ophthalmoscope optical capture. Optic disc and foveal zones intact for classification.
            </p>
          </div>

          {/* Optical & Physical Metrics */}
          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-2 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Vessel Density Ratio:</span>
              <strong className="text-slate-900 font-mono">{patient.vesselDensity}</strong>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Vasculature Tortuosity:</span>
              <span className="text-slate-900 font-medium text-[11px]">{patient.vesselTortuosity}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">Foveal Avascular Zone:</span>
              <span className="text-slate-900 font-medium text-[11px]">{patient.fovealZoneIntegrity}</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 2: AI Visualization / Explainable Grad-CAM Heatmap
           ======================================================== */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-600" /> 2. Explainable XAI Heatmap
              </h2>
              
              {/* View Mode Switcher */}
              <div className="flex text-[11px] bg-slate-100 p-0.5 rounded-lg">
                <button
                  onClick={() => setViewMode('gradcam')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    viewMode === 'gradcam' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Grad-CAM
                </button>
                <button
                  onClick={() => setViewMode('lesions')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    viewMode === 'lesions' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Lesions
                </button>
                <button
                  onClick={() => setViewMode('vessels')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    viewMode === 'vessels' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Vessels
                </button>
                <button
                  onClick={() => setViewMode('split')}
                  className={`px-2 py-0.5 rounded-md font-bold transition ${
                    viewMode === 'split' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Split
                </button>
              </div>
            </div>

            {/* Main Interactive AI Canvas */}
            <div className="relative rounded-xl overflow-hidden border border-slate-200 aspect-square bg-slate-950 select-none">
              
              {/* Underlying Base Image */}
              <img
                src={patient.image}
                alt="Heatmap underlying"
                className="w-full h-full object-cover"
              />

              {/* Mode: Grad-CAM Heatmap Layer */}
              {viewMode === 'gradcam' && (
                <div 
                  className="absolute inset-0 transition-opacity duration-300 mix-blend-screen pointer-events-none"
                  style={{ opacity: heatmapOpacity / 100 }}
                >
                  <img
                    src={patient.image}
                    alt="Grad-cam overlay"
                    className={`w-full h-full object-cover ${getHeatmapFilter()}`}
                  />
                  {/* Artificial Heatmap Activation Hotspots mapped to lesions */}
                  {patient.lesions.map((lesion) => (
                    <div
                      key={lesion.id}
                      className="absolute rounded-full blur-lg pointer-events-none animate-pulse"
                      style={{
                        left: `${lesion.xPercent - lesion.radiusPercent}%`,
                        top: `${lesion.yPercent - lesion.radiusPercent}%`,
                        width: `${lesion.radiusPercent * 2}%`,
                        height: `${lesion.radiusPercent * 2}%`,
                        backgroundColor: lesion.severity === 'critical' ? 'rgba(239, 68, 68, 0.7)' : 'rgba(245, 158, 11, 0.65)'
                      }}
                    />
                  ))}
                  {/* Global macular attention halo */}
                  <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-red-500/30 rounded-full blur-2xl pointer-events-none" />
                </div>
              )}

              {/* Mode: Lesion Markers Layer */}
              {(viewMode === 'lesions' || viewMode === 'gradcam') && (
                <div className="absolute inset-0 pointer-events-auto">
                  {patient.lesions.map((lesion) => (
                    <button
                      key={lesion.id}
                      onClick={() => setSelectedLesion(lesion)}
                      title={`${lesion.type}: ${lesion.description}`}
                      className={`absolute rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125 focus:outline-hidden ${
                        lesion.severity === 'critical'
                          ? 'border-red-400 bg-red-500/30 shadow-[0_0_8px_#ef4444]'
                          : 'border-amber-400 bg-amber-500/30 shadow-[0_0_6px_#f59e0b]'
                      } ${selectedLesion?.id === lesion.id ? 'ring-2 ring-white scale-125' : ''}`}
                      style={{
                        left: `${lesion.xPercent}%`,
                        top: `${lesion.yPercent}%`,
                        width: `${Math.max(lesion.radiusPercent * 2, 20)}px`,
                        height: `${Math.max(lesion.radiusPercent * 2, 20)}px`,
                      }}
                    >
                      <span className="sr-only">{lesion.type}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Mode: Retinal Vasculature Segmentation Mask */}
              {viewMode === 'vessels' && (
                <div className="absolute inset-0 bg-slate-900/90 mix-blend-hard-light flex items-center justify-center pointer-events-none">
                  <img
                    src={patient.image}
                    alt="Vessel Mask"
                    className="w-full h-full object-cover invert contrast-200 brightness-75 hue-rotate-180 opacity-80"
                  />
                  <div className="absolute inset-0 bg-teal-500/20 mix-blend-color-dodge" />
                </div>
              )}

              {/* Mode: Split Comparison View */}
              {viewMode === 'split' && (
                <div className="absolute inset-0 pointer-events-none">
                  {/* Right side Grad-CAM overlay clipped */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 0 0 ${splitPosition}%)` }}
                  >
                    <img
                      src={patient.image}
                      alt="Split Gradcam"
                      className={`w-full h-full object-cover ${getHeatmapFilter()} mix-blend-screen`}
                    />
                    <div className="absolute top-2 right-2 text-[9px] font-bold text-white bg-red-600 px-1.5 py-0.5 rounded font-mono">
                      Grad-CAM
                    </div>
                  </div>
                  {/* Left side original badge */}
                  <div className="absolute top-2 left-2 text-[9px] font-bold text-white bg-slate-800/80 px-1.5 py-0.5 rounded font-mono">
                    Original
                  </div>
                  {/* Split bar line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_#ffffff]"
                    style={{ left: `${splitPosition}%` }}
                  />
                </div>
              )}

              {/* Viewport footer legend badge */}
              <div className="absolute bottom-2 left-2 text-[10px] text-white/95 bg-black/80 backdrop-blur-xs px-2 py-0.5 rounded font-mono border border-white/10">
                {viewMode === 'gradcam' && 'Score-CAM Attention (EfficientNet-B4)'}
                {viewMode === 'lesions' && 'IDRiD Lesion Segmentation Overlay'}
                {viewMode === 'vessels' && 'DRIVE Retinal Vasculature Caliber'}
                {viewMode === 'split' && `Split Comparison (${splitPosition}%)`}
              </div>
            </div>

            {/* Interactive Control Sliders */}
            <div className="space-y-2 pt-1">
              {viewMode === 'gradcam' && (
                <div className="flex items-center justify-between gap-3 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <span className="font-semibold text-slate-700">Heatmap Opacity:</span>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={heatmapOpacity}
                    onChange={(e) => setHeatmapOpacity(Number(e.target.value))}
                    className="flex-1 accent-teal-600 cursor-pointer h-1.5"
                  />
                  <span className="font-mono font-bold text-slate-800">{heatmapOpacity}%</span>
                </div>
              )}

              {viewMode === 'split' && (
                <div className="flex items-center justify-between gap-3 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-200/60">
                  <span className="font-semibold text-slate-700">Split Slider:</span>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={splitPosition}
                    onChange={(e) => setSplitPosition(Number(e.target.value))}
                    className="flex-1 accent-blue-600 cursor-pointer h-1.5"
                  />
                  <span className="font-mono font-bold text-slate-800">{splitPosition}%</span>
                </div>
              )}

              {/* Colormap Selector */}
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="font-medium">Colormap:</span>
                <div className="flex gap-1 font-mono text-[10px]">
                  {(['turbo', 'jet', 'inferno', 'spectral'] as HeatmapColorMap[]).map((cm) => (
                    <button
                      key={cm}
                      onClick={() => setColorMap(cm)}
                      className={`px-2 py-0.5 rounded capitalize transition ${
                        colorMap === cm
                          ? 'bg-teal-600 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Selected Lesion / Attribution Summary Card */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            {selectedLesion ? (
              <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-blue-900 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-blue-600" /> {selectedLesion.type}
                  </span>
                  <button 
                    onClick={() => setSelectedLesion(null)}
                    className="text-[10px] text-blue-700 font-bold hover:underline"
                  >
                    Clear
                  </button>
                </div>
                <p className="text-slate-700 text-[11px]">{selectedLesion.description}</p>
                <div className="text-[10px] text-slate-500 font-mono">
                  Coordinates: X: {selectedLesion.xPercent}% | Y: {selectedLesion.yPercent}%
                </div>
              </div>
            ) : (
              <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl text-xs text-teal-900">
                <span className="font-bold block mb-0.5 text-teal-950 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-700" /> XAI Attribution Summary:
                </span>
                <p className="text-[11px] leading-relaxed text-teal-900">
                  {patient.stage === 0
                    ? 'Model attributions confirm physiological foveal contour and clean vascular arcades without microvascular leakage.'
                    : 'Attribution is heavily concentrated along temporal perimacular hard exudates and microaneurysmal capillary micro-lesions.'}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            COLUMN 3: AI Clinical Results & Tele-Triage
           ======================================================== */}
        <div className="lg:col-span-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            
            {/* Header & Confidence */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-600" /> 3. AI Clinical Results
              </h2>
              <div className="text-right">
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Confidence: {patient.confidence}%
                </span>
              </div>
            </div>

            {/* Severity & Risk Card */}
            <div className={`p-4 rounded-xl border space-y-2 ${
              isHighRisk 
                ? 'bg-red-50/70 border-red-200' 
                : isMediumRisk 
                ? 'bg-amber-50/70 border-amber-200' 
                : isNormal
                ? 'bg-teal-50/70 border-teal-200'
                : 'bg-blue-50/70 border-blue-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  DR Severity Grade
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  isHighRisk 
                    ? 'bg-red-200/80 text-red-900' 
                    : isMediumRisk 
                    ? 'bg-amber-200/80 text-amber-900' 
                    : 'bg-teal-200/80 text-teal-900'
                }`}>
                  {patient.riskLevel} Risk
                </span>
              </div>
              <div className="text-lg font-black text-slate-900">
                {patient.drSeverity}
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    isHighRisk ? 'bg-red-600' : isMediumRisk ? 'bg-amber-500' : 'bg-teal-500'
                  }`} 
                  style={{ width: `${patient.confidence}%` }}
                />
              </div>
            </div>

            {/* Detected Findings Chips */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="text-xs font-bold text-slate-700 mb-2">
                Detected Lesions & Retinal Abnormality:
              </div>
              <div className="space-y-1.5">
                {patient.findings.map((finding, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-800 bg-white p-2 rounded-lg border border-slate-200 shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0" />
                    <span className="font-medium text-[11px]">{finding}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Automated Recommendation Box */}
            <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
              isHighRisk 
                ? 'bg-red-50 border-red-200 text-red-950' 
                : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-amber-900 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Clinical Action Plan:
              </div>
              <p className="font-medium text-[11px]">
                {patient.recommendation}
              </p>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={onGoToDoctor}
              className="w-full text-center text-xs font-bold text-blue-700 hover:text-blue-800 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Inspect in Doctor Triage Portal →</span>
            </button>

            {onApproveReferral && isHighRisk && (
              <button
                onClick={() => onApproveReferral(patient.id)}
                className="w-full text-center text-xs font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 py-2.5 rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Fast-Track Tertiary Referral ({patient.referralHospital || 'District Eye Hospital'})</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Clinical Report Modal */}
      {showReportModal && (
        <ClinicalReportModal
          patient={patient}
          onClose={() => setShowReportModal(false)}
          onApproveReferral={onApproveReferral}
        />
      )}

    </div>
  );
};
