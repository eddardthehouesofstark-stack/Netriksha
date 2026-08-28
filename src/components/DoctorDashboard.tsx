import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Activity, 
  Eye, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Building2, 
  Send, 
  Download, 
  FileText, 
  Sparkles,
  ArrowUpDown,
  ShieldCheck
} from 'lucide-react';
import { PatientCase, RiskLevel } from '../types';

interface DoctorDashboardProps {
  patients: PatientCase[];
  onSelectPatient: (patient: PatientCase) => void;
  onApproveReferral: (patientId: string) => void;
  onNewScreening: () => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  patients,
  onSelectPatient,
  onApproveReferral,
  onNewScreening
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRisk, setFilterRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'confidence' | 'time'>('priority');

  // Statistics calculation
  const totalCount = 148 + patients.length;
  const highRiskCount = patients.filter(p => p.riskLevel === 'High').length + 17;
  const pendingReviewsCount = patients.filter(p => p.triageStatus === 'Pending Specialist Review').length + 5;
  const normalCount = patients.filter(p => p.riskLevel === 'Normal').length + 120;

  // Filtered and sorted patient list
  const filteredPatients = patients
    .filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.abhaId && p.abhaId.includes(searchQuery)) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchRisk =
        filterRisk === 'all' || p.riskLevel.toLowerCase() === filterRisk.toLowerCase();

      return matchSearch && matchRisk;
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        return a.priority - b.priority;
      }
      if (sortBy === 'confidence') {
        return b.confidence - a.confidence;
      }
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="doctor-triage-dashboard">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5" /> District Tele-Ophthalmology Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Specialist Triage & Referral Queue
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Centralized tele-consultation workstation for reviewing high-risk DR cases flagged across primary rural centers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onNewScreening}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Screen New Patient</span>
          </button>
        </div>
      </div>

      {/* 4 Statistics Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: 'Total Screenings Today',
            val: totalCount.toString(),
            sub: '+18% vs Yesterday',
            color: 'text-blue-700',
            bg: 'bg-white border-blue-100',
            icon: Eye
          },
          {
            label: 'High Risk Referrals',
            val: highRiskCount.toString(),
            sub: 'Requires urgent 24h review',
            color: 'text-red-600',
            bg: 'bg-white border-red-100',
            icon: AlertTriangle
          },
          {
            label: 'Pending Specialist Triage',
            val: pendingReviewsCount.toString(),
            sub: 'Avg response time: 14 mins',
            color: 'text-amber-600',
            bg: 'bg-white border-amber-100',
            icon: Clock
          },
          {
            label: 'Normal / Discharged',
            val: normalCount.toString(),
            sub: 'Routine 12-mo recall',
            color: 'text-teal-700',
            bg: 'bg-white border-teal-100',
            icon: CheckCircle2
          }
        ].map((card, idx) => {
          const CardIcon = card.icon;
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl border shadow-xs ${card.bg} flex flex-col justify-between`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">{card.label}</span>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                  <CardIcon className="w-4 h-4" />
                </div>
              </div>
              <div className={`text-3xl font-black mt-2 tracking-tight ${card.color}`}>
                {card.val}
              </div>
              <div className="text-[11px] text-slate-500 font-medium mt-1">
                {card.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Patient Screening Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        
        {/* Table Search and Filters Toolbar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Name, ABHA ID, Patient ID, or PHC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
            />
          </div>

          {/* Filters & Sort Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-xl">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Risk Tier:</span>
              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="font-bold text-slate-800 focus:outline-hidden bg-transparent cursor-pointer"
              >
                <option value="all">All Tiers</option>
                <option value="high">High Risk Only</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
                <option value="normal">Normal</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-slate-200 rounded-xl">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-medium">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="font-bold text-slate-800 focus:outline-hidden bg-transparent cursor-pointer"
              >
                <option value="priority">Triage Priority</option>
                <option value="confidence">Confidence Score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Patient Rows Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Priority</th>
                <th className="px-5 py-3.5">Patient Details</th>
                <th className="px-5 py-3.5">PHC Location</th>
                <th className="px-5 py-3.5">DR Severity</th>
                <th className="px-5 py-3.5">Risk Badge</th>
                <th className="px-5 py-3.5">Confidence</th>
                <th className="px-5 py-3.5">Triage Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-10 text-center text-slate-400 text-xs">
                    No matching patients found in tele-triage queue.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((pt) => {
                  const isHigh = pt.riskLevel === 'High';
                  const isMedium = pt.riskLevel === 'Medium';
                  const isLow = pt.riskLevel === 'Low';
                  const isNormalTier = pt.riskLevel === 'Normal';

                  return (
                    <tr key={pt.id} className="hover:bg-slate-50/80 transition-colors">
                      {/* Priority Tag */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full font-bold text-xs ${
                          pt.priority === 1
                            ? 'bg-red-100 text-red-700 border border-red-300 font-extrabold'
                            : pt.priority === 2
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}>
                          P{pt.priority}
                        </span>
                      </td>

                      {/* Patient Name & ABHA ID */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={pt.image}
                            alt={pt.name}
                            className="w-10 h-10 rounded-lg object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 text-sm hover:text-blue-700 cursor-pointer" onClick={() => onSelectPatient(pt)}>
                              {pt.name}
                            </div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {pt.id} • {pt.age}y/{pt.gender[0]} • {pt.eyeExamined.split(' ')[0]}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Location & Time */}
                      <td className="px-5 py-4 text-xs">
                        <div className="font-medium text-slate-800 truncate max-w-[180px]">{pt.location}</div>
                        <div className="text-slate-400 text-[11px] flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" /> {pt.screenedAt}
                        </div>
                      </td>

                      {/* DR Severity */}
                      <td className="px-5 py-4 font-bold text-slate-900 text-xs">
                        {pt.drSeverity}
                        <div className="text-[10px] text-slate-400 font-normal">ICDR Grade {pt.stage}</div>
                      </td>

                      {/* Risk Badge */}
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          isHigh
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : isMedium
                            ? 'bg-amber-100 text-amber-700 border border-amber-200'
                            : isLow
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'bg-teal-100 text-teal-700 border border-teal-200'
                        }`}>
                          {pt.riskLevel}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="px-5 py-4 text-xs font-mono font-bold text-slate-800">
                        {pt.confidence}%
                      </td>

                      {/* Triage Status */}
                      <td className="px-5 py-4 text-xs">
                        <span className={`font-semibold ${
                          pt.triageStatus === 'Referral Approved'
                            ? 'text-emerald-700'
                            : pt.triageStatus === 'Tele-Consultation Scheduled'
                            ? 'text-indigo-700'
                            : pt.triageStatus === 'Discharged'
                            ? 'text-slate-500'
                            : 'text-amber-700'
                        }`}>
                          {pt.triageStatus || 'Pending'}
                        </span>
                      </td>

                      {/* Action Buttons */}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onSelectPatient(pt)}
                            className="text-xs font-bold bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 px-3 py-1.5 rounded-lg border border-blue-200 transition cursor-pointer"
                          >
                            Open XAI →
                          </button>

                          {pt.riskLevel === 'High' && pt.triageStatus !== 'Referral Approved' && (
                            <button
                              onClick={() => onApproveReferral(pt.id)}
                              title="Approve Urgent Referral"
                              className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-lg transition shadow-2xs cursor-pointer"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Summary */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Showing <strong>{filteredPatients.length}</strong> active patient cases in tele-queue</span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="font-medium text-slate-700">ABDM Tele-Consultation Sync Active</span>
          </div>
        </div>
      </div>

    </div>
  );
};
