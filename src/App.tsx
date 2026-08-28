import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FeatureCards } from './components/FeatureCards';
import { ScreeningForm } from './components/ScreeningForm';
import { AIProcessing } from './components/AIProcessing';
import { ResultsDashboard } from './components/ResultsDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { DatasetPipeline } from './components/DatasetPipeline';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PatientCase } from './types';
import { SAMPLE_PATIENTS } from './data/sampleData';

export default function App() {
  // Navigation active tab: 'home' | 'screen' | 'processing' | 'results' | 'doctor' | 'pipeline' | 'about'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [patients, setPatients] = useState<PatientCase[]>(SAMPLE_PATIENTS);
  const [selectedPatient, setSelectedPatient] = useState<PatientCase>(SAMPLE_PATIENTS[0]);
  const [processingStep, setProcessingStep] = useState<number>(0);

  // Start AI Screening simulation
  const handleStartScreening = (patientData: PatientCase) => {
    setSelectedPatient(patientData);
    
    // Add to patient list if not already present
    setPatients((prev) => {
      const exists = prev.some(p => p.id === patientData.id);
      if (!exists) {
        return [patientData, ...prev];
      }
      return prev.map(p => p.id === patientData.id ? patientData : p);
    });

    setProcessingStep(0);
    setActiveTab('processing');
  };

  // Skip simulation helper
  const handleSkipProcessing = () => {
    setProcessingStep(5);
    setActiveTab('results');
  };

  // Processing sequential execution timer
  useEffect(() => {
    if (activeTab === 'processing') {
      const timers = [
        setTimeout(() => setProcessingStep(1), 1100),
        setTimeout(() => setProcessingStep(2), 2200),
        setTimeout(() => setProcessingStep(3), 3300),
        setTimeout(() => setProcessingStep(4), 4400),
        setTimeout(() => setProcessingStep(5), 5400),
        setTimeout(() => setActiveTab('results'), 6400),
      ];
      return () => timers.forEach(clearTimeout);
    }
  }, [activeTab]);

  // Handle Referral approval
  const handleApproveReferral = (patientId: string) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patientId
          ? { ...p, triageStatus: 'Referral Approved', priority: 1 }
          : p
      )
    );
    if (selectedPatient.id === patientId) {
      setSelectedPatient((prev) => ({
        ...prev,
        triageStatus: 'Referral Approved',
        priority: 1,
      }));
    }
  };

  const pendingCount = patients.filter(
    (p) => p.riskLevel === 'High' && p.triageStatus !== 'Referral Approved'
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-teal-500 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingCount}
      />

      {/* 2. Main Body Content Switcher */}
      <main className="flex-1">
        {/* Landing Page View */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            <Hero
              onStartScreening={() => setActiveTab('screen')}
              onExploreDoctor={() => setActiveTab('doctor')}
              onViewPipeline={() => setActiveTab('pipeline')}
            />
            <FeatureCards />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider bg-teal-950/80 px-2.5 py-1 rounded border border-teal-800">
                    SIH Hackathon Live Demonstration
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Test High-Risk DR Cases & Grad-CAM Visual Heatmaps
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
                    Select pre-loaded clinical cases from rural Primary Health Centres in Gujarat, UP, and Punjab, or upload any custom retinal image.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('screen')}
                  className="shrink-0 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition cursor-pointer"
                >
                  Launch Retinal Scanner →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Screening Page View */}
        {activeTab === 'screen' && (
          <ScreeningForm onAnalyze={handleStartScreening} />
        )}

        {/* AI Processing Screen */}
        {activeTab === 'processing' && (
          <AIProcessing
            step={processingStep}
            patient={selectedPatient}
            onSkip={handleSkipProcessing}
          />
        )}

        {/* Results Dashboard (3-Column Layout) */}
        {activeTab === 'results' && (
          <ResultsDashboard
            patient={selectedPatient}
            onReset={() => setActiveTab('screen')}
            onGoToDoctor={() => setActiveTab('doctor')}
            onApproveReferral={handleApproveReferral}
          />
        )}

        {/* Doctor Triage Dashboard */}
        {activeTab === 'doctor' && (
          <DoctorDashboard
            patients={patients}
            onSelectPatient={(p) => {
              setSelectedPatient(p);
              setActiveTab('results');
            }}
            onApproveReferral={handleApproveReferral}
            onNewScreening={() => setActiveTab('screen')}
          />
        )}

        {/* Dataset Pipeline & Architecture */}
        {activeTab === 'pipeline' && <DatasetPipeline />}

        {/* About / Rural Impact Page */}
        {activeTab === 'about' && (
          <AboutSection onStartScreening={() => setActiveTab('screen')} />
        )}
      </main>

      {/* 3. Footer */}
      <Footer onNavigate={setActiveTab} />
    </div>
  );
}
