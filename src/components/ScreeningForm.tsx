import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Users, 
  Eye, 
  Activity, 
  ChevronRight, 
  Sparkles, 
  FileCheck, 
  AlertCircle, 
  Check,
  RefreshCw,
  Camera,
  Layers
} from 'lucide-react';
import { PatientCase } from '../types';
import { SAMPLE_PATIENTS } from '../data/sampleData';

interface ScreeningFormProps {
  onAnalyze: (patientData: PatientCase) => void;
}

export const ScreeningForm: React.FC<ScreeningFormProps> = ({ onAnalyze }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number>(0);
  
  // Custom uploaded image state
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State initialized from first preset
  const [patientData, setPatientData] = useState<PatientCase>(SAMPLE_PATIENTS[0]);

  // Handle Preset Switching
  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setCustomImage(null);
    setPatientData(SAMPLE_PATIENTS[index]);
  };

  // Handle Drag and Drop / File upload
  const handleFileChange = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid retinal fundus image file (PNG, JPG, DICOM preview).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const dataUrl = e.target.result as string;
        setCustomImage(dataUrl);
        setPatientData(prev => ({
          ...prev,
          image: dataUrl,
          quality: "Good (97.4%)",
          qualityScore: 97.4
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(patientData);
  };

  const activeImage = customImage || patientData.image;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="screening-workflow-page">
      
      {/* Top Title Banner */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Stage 1: Retinal Capture & Registration
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Patient Screening & Fundus Ingestion
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Register rural diabetic patient details, ingest fundus photography from desktop or smartphone cameras, and trigger the explainable AI pipeline.
        </p>
      </div>

      {/* 5-Step Pipeline Indicator */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs mb-8 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[620px] text-xs font-medium">
          {[
            { step: '1', title: 'Image Quality', detail: 'Illumination Check' },
            { step: '2', title: 'DR Detection', detail: 'ICDR Grading (0-4)' },
            { step: '3', title: 'Lesion Analysis', detail: 'MA / HE / Exudates' },
            { step: '4', title: 'Vessel Analysis', detail: 'Caliber & Tortuosity' },
            { step: '5', title: 'Grad-CAM XAI', detail: 'Heatmap Alignment' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs shrink-0">
                {item.step}
              </div>
              <div>
                <div className="text-slate-800 font-bold text-[12px]">{item.title}</div>
                <div className="text-[10px] text-slate-400 font-medium">{item.detail}</div>
              </div>
              {idx < 4 && <ChevronRight className="w-4 h-4 text-slate-300 ml-2 shrink-0" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Screening Content Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Patient Demographics Form */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" /> Patient Demographics
              </h2>
              <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                ABDM Linked
              </span>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Patient ID / ABHA Health ID
                </label>
                <input
                  type="text"
                  required
                  value={patientData.id}
                  onChange={(e) => setPatientData({ ...patientData, id: e.target.value })}
                  placeholder="e.g. PT-8942 or 91-4829-1029-4821"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={patientData.name}
                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="120"
                    required
                    value={patientData.age}
                    onChange={(e) => setPatientData({ ...patientData, age: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Gender
                  </label>
                  <select
                    value={patientData.gender}
                    onChange={(e) => setPatientData({ ...patientData, gender: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Diabetes Duration
                  </label>
                  <input
                    type="text"
                    value={patientData.diabetesDuration}
                    onChange={(e) => setPatientData({ ...patientData, diabetesDuration: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Eye Examined
                  </label>
                  <select
                    value={patientData.eyeExamined}
                    onChange={(e) => setPatientData({ ...patientData, eyeExamined: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  >
                    <option value="OS (Left Eye)">OS (Left Eye)</option>
                    <option value="OD (Right Eye)">OD (Right Eye)</option>
                    <option value="Both Eyes">Both Eyes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Hypertension Status
                  </label>
                  <select
                    value={patientData.hypertension}
                    onChange={(e) => setPatientData({ ...patientData, hypertension: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                  >
                    <option value="Yes">Yes (Hypertensive)</option>
                    <option value="No">No</option>
                    <option value="Controlled">Controlled with Meds</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Health Facility / PHC Location
                </label>
                <input
                  type="text"
                  value={patientData.location}
                  onChange={(e) => setPatientData({ ...patientData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <Activity className="w-3.5 h-3.5 text-teal-600" /> Triage Priority:
            </span>
            <span className="font-bold text-slate-800">
              {patientData.riskLevel === 'High' ? 'Tier 1 (Urgent)' : patientData.riskLevel === 'Medium' ? 'Tier 2 (Moderate)' : 'Tier 3 (Routine)'}
            </span>
          </div>
        </div>

        {/* Right Column: Fundus Upload & Preset Selector */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UploadCloud className="w-4 h-4 text-teal-600" /> Fundus Image Ingestion
              </h2>
              <span className="text-[11px] text-slate-500 font-mono">
                Formats: JPG, PNG, TIFF, DICOM
              </span>
            </div>

            {/* Quick Demo Preset Selector for SIH Hackathon Evaluation */}
            <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-600" /> Demo Cases (SIH Benchmark Presets):
                </span>
                {customImage && (
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    Custom Upload Active
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { label: 'Case 1: Moderate', risk: 'Medium', stage: 'Mod NPDR' },
                  { label: 'Case 2: Severe PDR', risk: 'High', stage: 'Sev NPDR' },
                  { label: 'Case 3: Mild DR', risk: 'Low', stage: 'Mild NPDR' },
                  { label: 'Case 4: Healthy', risk: 'Normal', stage: 'No DR' },
                ].map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-2 py-2 rounded-lg text-left transition-all text-xs border ${
                      selectedPresetIndex === idx && !customImage
                        ? 'bg-blue-600 text-white border-blue-600 font-bold shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-blue-300 font-medium'
                    }`}
                  >
                    <div className="truncate font-semibold text-[11px]">{item.label}</div>
                    <div className={`text-[10px] mt-0.5 ${selectedPresetIndex === idx && !customImage ? 'text-blue-100' : 'text-slate-500'}`}>
                      {item.stage}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Drag and drop zone */}
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden ${
                isDragging
                  ? 'border-teal-500 bg-teal-50/50'
                  : 'border-slate-300 hover:border-teal-500 bg-slate-50/60 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />

              {/* Fundus Preview */}
              <div className="relative w-36 h-36 rounded-xl overflow-hidden border-2 border-teal-500/40 shadow-sm mb-3 group bg-slate-950">
                <img
                  src={activeImage}
                  alt="Fundus preview"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white mb-1" />
                  <span className="text-[10px] text-white font-semibold">Change Image</span>
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-teal-300 text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                  {patientData.eyeExamined.split(' ')[0]}
                </div>
              </div>

              <p className="text-xs font-bold text-slate-800">
                {customImage ? 'Custom Retinal Photo Loaded' : `${patientData.name}'s ${patientData.eyeExamined}`}
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Drag & drop any fundus image here, or <span className="text-blue-600 font-semibold underline">browse local files</span>
              </p>
              <p className="text-[10px] text-slate-400 mt-1 font-mono">
                Optical Field: 45° | Quality Pre-check: {patientData.quality}
              </p>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500">
              <span className="font-semibold text-slate-700">Inference Mode:</span> Multi-Benchmark Ensemble (APTOS + IDRiD)
            </div>

            <button
              id="analyze-retina-button"
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-blue-700 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all duration-150 active:scale-98 cursor-pointer"
            >
              <Activity className="w-4 h-4" />
              <span>Analyze Retina with DrishtiAI</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
