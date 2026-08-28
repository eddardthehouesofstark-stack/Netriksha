export type RiskLevel = 'Normal' | 'Low' | 'Medium' | 'High';

export type DRSeverity = 
  | 'No DR' 
  | 'Mild NPDR' 
  | 'Moderate NPDR' 
  | 'Severe NPDR' 
  | 'Proliferative DR (PDR)';

export interface LesionPoint {
  id: string;
  type: 'Microaneurysm' | 'Hard Exudate' | 'Soft Exudate / Cotton Wool' | 'Hemorrhage' | 'Neovascularization';
  xPercent: number; // 0 to 100
  yPercent: number; // 0 to 100
  radiusPercent: number;
  severity: 'mild' | 'moderate' | 'critical';
  description: string;
}

export interface PatientCase {
  id: string;
  abhaId?: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  contact: string;
  location: string;
  diabetesDuration: string;
  hypertension: 'Yes' | 'No' | 'Controlled';
  eyeExamined: 'OD (Right Eye)' | 'OS (Left Eye)' | 'Both Eyes';
  screenedAt: string;
  image: string;
  quality: string;
  qualityScore: number; // 0 to 100
  drSeverity: DRSeverity;
  stage: number; // 0: No DR, 1: Mild, 2: Moderate, 3: Severe, 4: PDR
  confidence: number; // e.g. 94.8%
  riskLevel: RiskLevel;
  findings: string[];
  recommendation: string;
  vesselDensity: string;
  vesselTortuosity: string;
  fovealZoneIntegrity: string;
  lesions: LesionPoint[];
  triageStatus?: 'Pending Specialist Review' | 'Tele-Consultation Scheduled' | 'Referral Approved' | 'Discharged';
  priority: number; // 1 (highest) to 4
  referralHospital?: string;
  doctorNotes?: string;
}

export interface ProcessingModule {
  id: string;
  title: string;
  moduleName: string;
  datasetBasis: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  metric: string;
}

export type ViewMode = 'original' | 'gradcam' | 'lesions' | 'vessels' | 'split' | 'overlay';
export type HeatmapColorMap = 'turbo' | 'jet' | 'inferno' | 'spectral';
