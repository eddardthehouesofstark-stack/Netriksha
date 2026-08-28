import React, { useState } from 'react';
import { 
  Database, 
  Layers, 
  Cpu, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  FileCode2,
  Share2
} from 'lucide-react';
import { DATASET_SPECIFICATIONS, FASTAPI_CODE_SNIPPET } from '../data/sampleData';

export const DatasetPipeline: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [activeCodeTab, setActiveCodeTab] = useState<'fastapi' | 'curl' | 'response'>('fastapi');

  const handleCopy = () => {
    navigator.clipboard.writeText(FASTAPI_CODE_SNIPPET);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const curlSnippet = `curl -X POST "https://api.drishtiai.in/api/v1/screen-retina" \\
  -H "Authorization: Bearer ABDM_TOKEN_KEY" \\
  -F "patient_id=PT-8942" \\
  -F "patient_name=Ramesh Patel" \\
  -F "diabetes_years=12" \\
  -F "eye_examined=OS" \\
  -F "file=@fundus_left_eye.png;type=image/png"`;

  const jsonSnippet = `{
  "patient_id": "PT-8942",
  "dr_severity": "Moderate NPDR",
  "icdr_stage": 2,
  "confidence": 91.4,
  "quality_score": 98.2,
  "risk_level": "Medium",
  "findings": [
    "Microaneurysms (Inferotemporal quadrant)",
    "Hard Exudates (Foveal avascular zone margin)",
    "Dot & Blot Hemorrhages"
  ],
  "recommendation": "Refer to District Hospital Ophthalmologist within 3-4 weeks. Optimize HbA1c control.",
  "vessel_density": "Normal (14.2%)",
  "gradcam_heatmap_base64": "data:image/png;base64,iVBORw0KGgo...",
  "processing_time_ms": 1420.5
}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="dataset-pipeline-view">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Database className="w-3.5 h-3.5 text-teal-600" /> Multi-Cohort Benchmark Integration
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Explainable Multi-Dataset AI Pipeline
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
          Netriksha ensembles three foundational retinal benchmarks to ensure zero-blackbox interpretability and high generalization across heterogeneous Indian demographic cohorts and field camera optics.
        </p>
      </div>

      {/* 3 Core Benchmark Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DATASET_SPECIFICATIONS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                  {item.badge}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Res: {item.inputResolution}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-2">{item.dataset}</h2>
              <p className="text-xs font-bold text-blue-700 mt-0.5">{item.role}</p>
              
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {item.desc}
              </p>

              {/* Target Classes List */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <div className="text-[11px] font-bold text-slate-700 mb-2">Target Biomarker Classes:</div>
                <div className="flex flex-wrap gap-1.5">
                  {item.classes.map((cls, i) => (
                    <span key={i} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                      {cls}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="grid grid-cols-3 gap-2 text-center bg-slate-50 p-2 rounded-xl border border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Sensitivity</div>
                  <strong className="text-slate-900 font-mono text-xs">{item.sensitivity}</strong>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Specificity</div>
                  <strong className="text-slate-900 font-mono text-xs">{item.specificity}</strong>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">AUC-ROC</div>
                  <strong className="text-blue-700 font-mono text-xs">{item.aucScore}</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1">
                <span>Architecture:</span>
                <strong className="text-slate-800 text-[10px] truncate max-w-[170px]">{item.model}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Neural Flow Pipeline Visualizer */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Cpu className="w-4 h-4" /> Sequential XAI Pipeline Architecture
            </div>
            <h2 className="text-xl font-bold text-white mt-1">End-to-End Retinal Tele-Diagnostic Flow</h2>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
            Latency Budget: &lt; 1,800 ms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-xs">
          {[
            { step: '01', title: 'Fundus Ingestion', detail: '45° RGB Input (512x512)', color: 'border-slate-700 bg-slate-800/80' },
            { step: '02', title: 'Quality-CheckNet', detail: 'ResNet-18 Illumination', color: 'border-teal-500/50 bg-teal-950/40 text-teal-300' },
            { step: '03', title: 'DR Severity Grading', detail: 'APTOS EfficientNet-B4', color: 'border-blue-500/50 bg-blue-950/40 text-blue-300' },
            { step: '04', title: 'Lesion Segmentation', detail: 'IDRiD Attention U-Net', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300' },
            { step: '05', title: 'Grad-CAM XAI', detail: 'Pathology Map & Triage', color: 'border-teal-400 bg-teal-900/60 text-white font-bold' }
          ].map((s, idx) => (
            <div key={idx} className={`p-4 rounded-xl border ${s.color} space-y-1 relative`}>
              <div className="text-[10px] font-mono text-slate-400 font-bold">STAGE {s.step}</div>
              <div className="font-bold text-sm">{s.title}</div>
              <div className="text-[11px] text-slate-400">{s.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Production FastAPI & ML Backend Developer Sandbox */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900">
                FastAPI + PyTorch Backend Integration Schema
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Production-ready Python service ready for deployment on Cloud Run, TorchServe, or local PHC edge mini-servers.
            </p>
          </div>

          {/* Code View Switcher & Copy CTA */}
          <div className="flex items-center gap-2">
            <div className="flex bg-slate-200 p-0.5 rounded-lg text-xs font-semibold">
              <button
                onClick={() => setActiveCodeTab('fastapi')}
                className={`px-3 py-1 rounded-md transition ${
                  activeCodeTab === 'fastapi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                main.py
              </button>
              <button
                onClick={() => setActiveCodeTab('curl')}
                className={`px-3 py-1 rounded-md transition ${
                  activeCodeTab === 'curl' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                cURL
              </button>
              <button
                onClick={() => setActiveCodeTab('response')}
                className={`px-3 py-1 rounded-md transition ${
                  activeCodeTab === 'response' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                JSON Output
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-teal-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-4 bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto max-h-[420px] leading-relaxed">
          <pre>
            <code>
              {activeCodeTab === 'fastapi' && FASTAPI_CODE_SNIPPET}
              {activeCodeTab === 'curl' && curlSnippet}
              {activeCodeTab === 'response' && jsonSnippet}
            </code>
          </pre>
        </div>
      </div>

    </div>
  );
};
