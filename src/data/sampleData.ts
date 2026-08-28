import { PatientCase } from '../types';

export const SAMPLE_PATIENTS: PatientCase[] = [
  {
    id: "PT-8942",
    abhaId: "91-4829-1029-4821",
    name: "Ramesh Patel",
    age: 58,
    gender: "Male",
    contact: "+91 98251 44320",
    location: "PHC Anand Sub-Center 04, Gujarat",
    diabetesDuration: "12 Years (Type 2)",
    hypertension: "Yes",
    eyeExamined: "OS (Left Eye)",
    screenedAt: "12 mins ago",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    quality: "Good (98.2%)",
    qualityScore: 98.2,
    drSeverity: "Moderate NPDR",
    stage: 2,
    confidence: 91.4,
    riskLevel: "Medium",
    findings: [
      "Microaneurysms (Inferotemporal quadrant)",
      "Hard Exudates (Foveal avascular zone margin)",
      "Dot & Blot Hemorrhages (Nasal & Temporal)"
    ],
    recommendation: "Refer to District Hospital Ophthalmologist within 3-4 weeks. Schedule tele-ophthalmology review, optimize glycemic control (HbA1c target < 7.0%).",
    vesselDensity: "Normal (14.2%)",
    vesselTortuosity: "Slight venous dilation (Grade 1)",
    fovealZoneIntegrity: "Preserved with borderline perifoveal rings",
    lesions: [
      {
        id: "l-1",
        type: "Microaneurysm",
        xPercent: 52,
        yPercent: 44,
        radiusPercent: 4,
        severity: "mild",
        description: "Small red pinpoint dilatation of retinal capillary"
      },
      {
        id: "l-2",
        type: "Hard Exudate",
        xPercent: 62,
        yPercent: 50,
        radiusPercent: 7,
        severity: "moderate",
        description: "Lipid and lipoprotein deposits near macular perimeter"
      },
      {
        id: "l-3",
        type: "Hemorrhage",
        xPercent: 38,
        yPercent: 58,
        radiusPercent: 6,
        severity: "moderate",
        description: "Deep retinal capillary bleeding in inner nuclear layer"
      },
      {
        id: "l-4",
        type: "Hard Exudate",
        xPercent: 70,
        yPercent: 35,
        radiusPercent: 5,
        severity: "mild",
        description: "Waxy lipid ring in temporal arch"
      }
    ],
    triageStatus: "Pending Specialist Review",
    priority: 2,
    referralHospital: "SSG District Hospital, Vadodara",
    doctorNotes: "Needs dilated slit lamp exam and OCT for macular thickness quantification."
  },
  {
    id: "PT-9104",
    abhaId: "23-8104-9912-3341",
    name: "Sunita Devi",
    age: 63,
    gender: "Female",
    contact: "+91 94150 82193",
    location: "Community Health Centre, Sitapur, Uttar Pradesh",
    diabetesDuration: "18 Years (Uncontrolled)",
    hypertension: "Yes",
    eyeExamined: "OD (Right Eye)",
    screenedAt: "32 mins ago",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    quality: "Excellent (99.1%)",
    qualityScore: 99.1,
    drSeverity: "Severe NPDR",
    stage: 3,
    confidence: 96.8,
    riskLevel: "High",
    findings: [
      "Extensive Flame & Blot Hemorrhages across 4 quadrants",
      "Multiple Soft Exudates (Cotton Wool Spots)",
      "Venous Beading in Superior Temporal branch",
      "Clinically Significant Macular Edema (CSME) Suspected"
    ],
    recommendation: "URGENT Tele-Ophthalmology consult & Tertiary Care referral within 48-72 hours. High probability of requiring Pan-Retinal Photocoagulation (PRP) or Anti-VEGF intravitreal injection.",
    vesselDensity: "Attenuated / Tortuous (9.8%)",
    vesselTortuosity: "Severe Venous Caliber Variation (Grade 3)",
    fovealZoneIntegrity: "Edematous distortion with central elevation",
    lesions: [
      {
        id: "l-10",
        type: "Hemorrhage",
        xPercent: 42,
        yPercent: 38,
        radiusPercent: 9,
        severity: "critical",
        description: "Confluent blot hemorrhage indicating deep capillary occlusion"
      },
      {
        id: "l-11",
        type: "Soft Exudate / Cotton Wool",
        xPercent: 68,
        yPercent: 42,
        radiusPercent: 8,
        severity: "critical",
        description: "Axoplasmic stasis caused by micro-infarction of nerve fiber layer"
      },
      {
        id: "l-12",
        type: "Microaneurysm",
        xPercent: 55,
        yPercent: 65,
        radiusPercent: 5,
        severity: "moderate",
        description: "Capillary breakdown cluster in inferior retina"
      },
      {
        id: "l-13",
        type: "Neovascularization",
        xPercent: 30,
        yPercent: 50,
        radiusPercent: 7,
        severity: "critical",
        description: "Fragile abnormal new vessels breaching inner limiting membrane"
      }
    ],
    triageStatus: "Tele-Consultation Scheduled",
    priority: 1,
    referralHospital: "King George's Medical University (KGMU), Lucknow",
    doctorNotes: "Urgent tele-slot booked for 2:30 PM with Retina Fellow on duty."
  },
  {
    id: "PT-7320",
    abhaId: "14-9920-3312-8874",
    name: "Vikramjit Singh",
    age: 49,
    gender: "Male",
    contact: "+91 98762 10924",
    location: "PHC Nabha Rural Health Unit, Punjab",
    diabetesDuration: "5 Years",
    hypertension: "Controlled",
    eyeExamined: "Both Eyes",
    screenedAt: "2 hours ago",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    quality: "Fair (89.5%)",
    qualityScore: 89.5,
    drSeverity: "Mild NPDR",
    stage: 1,
    confidence: 88.2,
    riskLevel: "Low",
    findings: [
      "Solitary Microaneurysms (< 5 detected)",
      "No exudative signs or macular involvement",
      "Normal Optic Disc margins"
    ],
    recommendation: "Routine re-screening at primary health centre in 6 to 9 months. Maintain strict lifestyle modifications and annual blood pressure monitoring.",
    vesselDensity: "Normal (15.1%)",
    vesselTortuosity: "Normal vasculature without tortuosity",
    fovealZoneIntegrity: "Clear, intact foveal avascular zone",
    lesions: [
      {
        id: "l-20",
        type: "Microaneurysm",
        xPercent: 64,
        yPercent: 48,
        radiusPercent: 4,
        severity: "mild",
        description: "Isolated microaneurysm in temporal perifovea"
      },
      {
        id: "l-21",
        type: "Microaneurysm",
        xPercent: 45,
        yPercent: 60,
        radiusPercent: 3,
        severity: "mild",
        description: "Early focal microvascular dilation"
      }
    ],
    triageStatus: "Discharged",
    priority: 3,
    referralHospital: "Civil Hospital Patiala",
    doctorNotes: "Patient educated on dietary management and warning signs (floaters, sudden blurriness)."
  },
  {
    id: "PT-6601",
    abhaId: "33-7721-0091-5512",
    name: "Ananya Roy",
    age: 42,
    gender: "Female",
    contact: "+91 97321 88402",
    location: "CHC Bolpur, Birbhum, West Bengal",
    diabetesDuration: "2 Years (Diet controlled)",
    hypertension: "No",
    eyeExamined: "OS (Left Eye)",
    screenedAt: "4 hours ago",
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=800&q=80",
    quality: "Excellent (99.5%)",
    qualityScore: 99.5,
    drSeverity: "No DR",
    stage: 0,
    confidence: 98.9,
    riskLevel: "Normal",
    findings: [
      "Clear optical media with sharp optic disc margin",
      "Absence of microaneurysms, hemorrhages or lipid exudates",
      "Crisp physiological cup-to-disc ratio (0.3)"
    ],
    recommendation: "Normal healthy retinal screening. Standard annual diabetic retinopathy surveillance recommended as per national guidelines.",
    vesselDensity: "Healthy (15.8%)",
    vesselTortuosity: "Standard arterial-venous ratio (2:3)",
    fovealZoneIntegrity: "Pristine foveal reflex and contour",
    lesions: [],
    triageStatus: "Discharged",
    priority: 4,
    referralHospital: "Burdwan Medical College & Hospital",
    doctorNotes: "Congratulated patient on maintaining HbA1c at 6.2%. Next screening scheduled in 12 months."
  },
  {
    id: "PT-5418",
    abhaId: "45-1102-8834-9021",
    name: "Kuppusamy Thangavel",
    age: 67,
    gender: "Male",
    contact: "+91 94432 17822",
    location: "PHC Chettipalayam, Coimbatore, Tamil Nadu",
    diabetesDuration: "22 Years",
    hypertension: "Yes",
    eyeExamined: "OD (Right Eye)",
    screenedAt: "5 hours ago",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    quality: "Good (95.4%)",
    qualityScore: 95.4,
    drSeverity: "Proliferative DR (PDR)",
    stage: 4,
    confidence: 97.5,
    riskLevel: "High",
    findings: [
      "Neovascularization of the Disc (NVD > 1/3 disc area)",
      "Preretinal / Vitreous Hemorrhage warning signs",
      "Fibrovascular tissue proliferation along arcades"
    ],
    recommendation: "CRITICAL: Immediate referral to Vitreoretinal surgeon. Urgent Pan-Retinal Photocoagulation (PRP) needed to prevent catastrophic tractional retinal detachment.",
    vesselDensity: "Severely Compromised (8.4%)",
    vesselTortuosity: "Pathological neovascular fronds",
    fovealZoneIntegrity: "Macular traction suspected",
    lesions: [
      {
        id: "l-30",
        type: "Neovascularization",
        xPercent: 48,
        yPercent: 32,
        radiusPercent: 12,
        severity: "critical",
        description: "Abnormal new vessel tufts at optic nerve head"
      },
      {
        id: "l-31",
        type: "Hemorrhage",
        xPercent: 60,
        yPercent: 62,
        radiusPercent: 10,
        severity: "critical",
        description: "Preretinal boat-shaped hemorrhage"
      },
      {
        id: "l-32",
        type: "Hard Exudate",
        xPercent: 75,
        yPercent: 45,
        radiusPercent: 8,
        severity: "critical",
        description: "Circinate exudate ring surrounding ischemic zone"
      }
    ],
    triageStatus: "Referral Approved",
    priority: 1,
    referralHospital: "Aravind Eye Hospital, Coimbatore",
    doctorNotes: "Emergency tele-ambulance transit coordination initiated."
  }
];

export const DATASET_SPECIFICATIONS = [
  {
    dataset: "APTOS 2019 Blindness Detection",
    role: "Global DR Grading & Severity Classification",
    desc: "Trained on 3,662 diverse clinical retinal images collected in clinical conditions at Aravind Eye Hospital in Tamil Nadu, India. Represents authentic rural Indian fundus camera variations.",
    model: "EfficientNet-B4 + MixUp Augmentation + ArcFace Loss",
    badge: "Severity Grading (ICDR 0-4)",
    classes: ["Class 0: No DR", "Class 1: Mild NPDR", "Class 2: Moderate NPDR", "Class 3: Severe NPDR", "Class 4: Proliferative DR"],
    sensitivity: "95.2%",
    specificity: "93.8%",
    aucScore: "0.984",
    inputResolution: "512 x 512 px"
  },
  {
    dataset: "IDRiD (Indian Diabetic Retinopathy Dataset)",
    role: "Lesion Localization & Abnormality Segmentation",
    desc: "Provides pixel-level annotations for Microaneurysms, Hemorrhages, Hard Exudates, and Soft Exudates in Indian diabetic cohorts. Essential for explainable bounding boxes and Grad-CAM alignment.",
    model: "Attention U-Net with ResNeXt-50 Backbone",
    badge: "Micro-Pathology Segmentation",
    classes: ["Microaneurysms (MA)", "Hemorrhages (HE)", "Hard Exudates (EX)", "Cotton Wool Spots (SE)"],
    sensitivity: "92.6%",
    specificity: "96.1%",
    aucScore: "0.971",
    inputResolution: "1024 x 1024 px"
  },
  {
    dataset: "DRIVE (Digital Retinal Images for Vessel Extraction)",
    role: "Retinal Vasculature Caliber & Tortuosity Analysis",
    desc: "Standard benchmark for blood vessel graph extraction. Computes vessel caliber ratios, ischemic non-perfusion zones, and arteriolar narrowing metrics to correlate systemic hypertension with DR.",
    model: "Res-UNet with Morphological Graph Reconstruction",
    badge: "Vasculature Caliber & Tortuosity",
    classes: ["Arteriolar Caliber", "Venular Caliber", "Bifurcation Angle", "Capillary Non-Perfusion"],
    sensitivity: "94.1%",
    specificity: "97.4%",
    aucScore: "0.979",
    inputResolution: "584 x 565 px"
  }
];

export const FASTAPI_CODE_SNIPPET = `# DrishtiAI / Netriksha - Production ML Backend Service
# Serving APTOS 2019 + IDRiD + DRIVE Ensemble with Grad-CAM

import io
import torch
import numpy as np
from PIL import Image
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional

app = FastAPI(
    title="DrishtiAI Explainable DR Screening API",
    description="Explainable Tele-Ophthalmology Inference Engine for Rural India (ABDM & ICDR Compliant)",
    version="2.4.0"
)

# Enable CORS for Next/React Frontends
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LesionBox(BaseModel):
    type: str
    x_percent: float
    y_percent: float
    radius_percent: float
    confidence: float

class ScreeningResponse(BaseModel):
    patient_id: str
    dr_severity: str
    icdr_stage: int # 0 to 4
    confidence: float
    quality_score: float
    risk_level: str # Normal | Low | Medium | High
    findings: List[str]
    recommendation: str
    vessel_density: str
    gradcam_heatmap_base64: str
    lesions_detected: List[LesionBox]
    processing_time_ms: float

@app.post("/api/v1/screen-retina", response_model=ScreeningResponse)
async def screen_retina(
    patient_id: str = Form(...),
    patient_name: str = Form(...),
    diabetes_years: int = Form(...),
    eye_examined: str = Form("OS"),
    file: UploadFile = File(...)
):
    """
    Executes end-to-end 5-module pipeline:
    1. Quality-CheckNet (ResNet-18)
    2. DR Severity Classification (APTOS EfficientNet-B4)
    3. Lesion Pixel Segmentation (IDRiD Attention U-Net)
    4. DRIVE Vessel Graph & Caliber Extraction
    5. Score-CAM / Grad-CAM Attention Map Generation
    """
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be a valid retinal fundus image")

    # Read image buffer
    contents = await file.read()
    raw_image = Image.open(io.BytesIO(contents)).convert("RGB")
    
    # 1. Quality Check
    # quality_score = quality_model.predict(raw_image)
    # if quality_score < 0.70:
    #     return {"warning": "Low illumination / poor focus. Please recapture."}

    # 2. Forward pass through ensemble
    # dr_logits, gradcam_map = dr_classifier.forward_with_gradcam(raw_image)
    # lesions = unet_segmenter.extract_lesions(raw_image)

    return ScreeningResponse(
        patient_id=patient_id,
        dr_severity="Moderate NPDR",
        icdr_stage=2,
        confidence=91.4,
        quality_score=98.2,
        risk_level="Medium",
        findings=[
            "Microaneurysms (Inferotemporal quadrant)",
            "Hard Exudates (Foveal avascular zone margin)",
            "Dot & Blot Hemorrhages"
        ],
        recommendation="Refer to District Hospital Ophthalmologist within 3-4 weeks. Optimize HbA1c control.",
        vessel_density="Normal (14.2%)",
        gradcam_heatmap_base64="data:image/png;base64,...",
        lesions_detected=[],
        processing_time_ms=1420.5
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
`;
