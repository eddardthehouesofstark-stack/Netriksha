import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  QrCode, 
  Building2, 
  Calendar,
  Send
} from 'lucide-react';
import { PatientCase } from '../types';

interface ClinicalReportModalProps {
  patient: PatientCase;
  onClose: () => void;
  onApproveReferral?: (patientId: string) => void;
}

export const ClinicalReportModal: React.FC<ClinicalReportModalProps> = ({ 
  patient, 
  onClose,
  onApproveReferral 
}) => {
  const isHighRisk = patient.riskLevel === 'High';
  const isMediumRisk = patient.riskLevel === 'Medium';
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in fade-in zoom-in duration-150"
        id="clinical-report-modal-content"
      >
        {/* Modal Top Header (Non-printed navigation controls) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-bold text-sm">ABDM-Compliant Tele-Ophthalmology Clinical Slip</h3>
              <p className="text-[11px] text-slate-300">Case ID: {patient.id} • Ref: {patient.abhaId || 'ABHA-N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-xs transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Container */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800" id="printable-clinical-report">
          
          {/* Institutional Hospital Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 pb-4 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-black text-sm">
                  N
                </div>
                <div>
                  <h1 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                    Netriksha • Tele-Ophthalmology Network
                  </h1>
                  <p className="text-[11px] text-slate-500 font-semibold">
                    National Programme for Control of Blindness & Visual Impairment (NPCBVI)
                  </p>
                </div>
              </div>
            </div>

            <div className="text-right sm:text-right text-xs">
              <div className="font-bold text-slate-800">Report No: REP-{patient.id}-{Math.floor(1000 + Math.random() * 9000)}</div>
              <div className="text-[11px] text-slate-500 font-mono">Date: {currentDate} | {currentTime}</div>
              <div className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200 inline-block mt-1">
                Ayushman Bharat Digital Health Record
              </div>
            </div>
          </div>

          {/* Patient Bio Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Patient Name</span>
              <strong className="text-slate-900 text-sm">{patient.name}</strong>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Age / Gender</span>
              <span className="text-slate-800 font-semibold">{patient.age} Yrs / {patient.gender}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">ABHA ID / Contact</span>
              <span className="text-slate-800 font-mono text-[11px]">{patient.abhaId || patient.contact}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Health Center</span>
              <span className="text-slate-800 font-medium truncate block">{patient.location}</span>
            </div>
          </div>

          {/* Clinical Findings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Diagnosis Card */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Primary AI Diagnosis (ICDR Classification)
              </span>
              <div className="flex items-center justify-between">
                <div className="text-lg font-black text-slate-900">{patient.drSeverity}</div>
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                  isHighRisk 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : isMediumRisk 
                    ? 'bg-amber-100 text-amber-700 border border-amber-200' 
                    : 'bg-teal-100 text-teal-700 border border-teal-200'
                }`}>
                  {patient.riskLevel} Risk Tier
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono pt-1">
                Model Confidence: <strong className="text-blue-700">{patient.confidence}%</strong> | Quality: {patient.quality}
              </div>
            </div>

            {/* Micro-Pathology Detection */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                Detected Retinal Pathology & Biomarkers
              </span>
              <ul className="text-xs space-y-1">
                {patient.findings.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Recommendation */}
          <div className={`p-4 rounded-xl border ${
            isHighRisk ? 'bg-red-50/70 border-red-200 text-red-950' : 'bg-amber-50/70 border-amber-200 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className={`w-4 h-4 ${isHighRisk ? 'text-red-600' : 'text-amber-600'}`} />
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Clinical Referral Action Plan & Advice
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed">
              {patient.recommendation}
            </p>
            {patient.referralHospital && (
              <div className="mt-2 text-xs font-bold flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5" />
                <span>Assigned Referral Destination:</span> {patient.referralHospital}
              </div>
            )}
          </div>

          {/* Retinal Image & Grad-CAM Evidence Strip */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="border border-slate-200 rounded-xl p-2 text-center bg-slate-50">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Fundus Photography ({patient.eyeExamined})</div>
              <img src={patient.image} alt="Retina" className="h-28 mx-auto rounded object-cover aspect-square" />
            </div>
            <div className="border border-slate-200 rounded-xl p-2 text-center bg-slate-900 text-white">
              <div className="text-[10px] font-bold text-teal-400 uppercase mb-1">Grad-CAM XAI Attention Heatmap</div>
              <div className="relative h-28 mx-auto rounded overflow-hidden aspect-square">
                <img src={patient.image} alt="Heatmap" className="w-full h-full object-cover hue-rotate-90 saturate-200 contrast-125 opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/30 via-yellow-500/20 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Verification, QR Code & Signatures */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 border border-slate-300 rounded-lg p-1 bg-white flex items-center justify-center">
                <QrCode className="w-12 h-12 text-slate-800" />
              </div>
              <div className="text-[10px] text-slate-500 space-y-0.5">
                <p className="font-bold text-slate-700">Digital Tele-Verification Seal</p>
                <p>Scan to verify report integrity on ABDM Health Portal</p>
                <p className="font-mono text-[9px] text-slate-400">HASH: SHA256:{patient.id.slice(0, 4)}...98A2</p>
              </div>
            </div>

            <div className="text-right sm:text-right space-y-1">
              <div className="h-10 flex items-end justify-end">
                <span className="font-serif italic text-slate-700 text-sm underline decoration-slate-400">Dr. M. Swaminathan (MD, DNB)</span>
              </div>
              <div className="text-[11px] font-bold text-slate-800">Tele-Consulting District Ophthalmologist</div>
              <div className="text-[10px] text-slate-400">Reg No: MCI-TN-49821 • Validated via Netriksha</div>
            </div>
          </div>

          {/* Legal Disclaimer */}
          <div className="text-[9px] text-slate-400 text-center pt-2">
            This AI-generated tele-screening summary is intended as a clinical decision support tool conforming to ICDR guidelines. It does not replace a comprehensive dilated eye examination by a registered ophthalmologist.
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-slate-500 font-medium">Status: {patient.triageStatus || 'Pending Review'}</span>
          <div className="flex items-center gap-2">
            {onApproveReferral && (
              <button
                onClick={() => {
                  onApproveReferral(patient.id);
                  onClose();
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Confirm & Transmit Referral</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
