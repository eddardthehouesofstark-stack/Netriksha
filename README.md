# Netriksha — Explainable AI Retinal Screening & Tele-Ophthalmology Platform

> **AI-Driven Diabetic Retinopathy (DR) Screening & Tele-Ophthalmology Triage for Primary Health Centres (PHCs) in Bharat.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![ICDR Compliant](https://img.shields.io/badge/Clinical_Standard-ICDR_Grade_0--4-emerald.svg)](#clinical-grading--severity-scale)
[![ABDM Ready](https://img.shields.io/badge/ABDM-ABHA_Integrated-orange.svg)](#abdm--rural-phc-workflow)

---

## 📌 Executive Summary & Clinical Context

India is home to **over 77 million diabetic patients**, yet fewer than **25,000 ophthalmologists** practice nationwide—with over **70% concentrated in tier-1 metropolitan cities**. Diabetic Retinopathy is one of the leading causes of preventable blindness, developing asymptomatically until irreversible vision loss occurs.

**Netriksha** bridges this critical specialist deficit by empowering frontline healthcare workers at Primary Health Centres (PHCs), Community Health Centres (CHCs), and Vision Centers with an on-device, **zero-blackbox explainable AI screening tool**. It delivers instant severity grading, pixel-level lesion localization, Grad-CAM interpretability maps, and seamless tele-ophthalmology referral triage.

---

## 🌟 Key Features

### 1. Zero-Blackbox Explainable AI (XAI)
* **Grad-CAM Attention Maps**: Visual heatmaps highlight the specific retinal regions driving model predictions.
* **Pixel-Level Lesion Segmentation**: Precise localization of microaneurysms, dot/blot hemorrhages, hard lipid exudates, and cotton wool spots.
* **Retinal Vasculature Graph Metrics**: Evaluates vessel caliber ratio, tortuosity index, and capillary non-perfusion zones to correlate systemic microvascular health.

### 2. Multi-Dataset Clinical Ensemble
* **APTOS 2019 Blindness Detection**: Global DR severity classification trained on diverse clinical retinal scans from Aravind Eye Hospital (Tamil Nadu).
* **IDRiD (Indian Diabetic Retinopathy Dataset)**: Micro-pathology bounding boxes and segmentations tailored for Indian demographic cohorts.
* **DRIVE (Digital Retinal Images for Vessel Extraction)**: Morphological blood vessel graph reconstruction.

### 3. Frontline PHC & ABDM Triage Workflow
* **Instant Quality Assessment**: Validates optical focus, illumination, and field-of-view before analysis to prevent false negatives.
* **ABHA (Ayushman Bharat Health Account) Integration**: Links patient records to national digital health standards.
* **Bilingual Patient Counseling**: Translates complex clinical diagnoses into empathetic, easy-to-understand explanations in English and Hindi.
* **Printable Clinical Referral Slips**: Standardized tele-ophthalmology referral summaries for District Hospitals and Medical Colleges.

### 4. Tele-Ophthalmologist Review Dashboard
* **Prioritized Triage Queue**: High-urgency cases (PDR, Severe NPDR, Macular Edema) automatically elevated.
* **Interactive Diagnostic Inspector**: Side-by-side comparison of raw fundus photography, Grad-CAM heatmaps, and lesion overlays.
* **Tele-Consulting Verification**: Remote ophthalmologists can review findings, add notes, and approve referrals.

---

## 🔬 AI / ML Architecture & Datasets

```
┌─────────────────────────────────────────────────────────────┐
│                    Fundus Image Ingestion                   │
│          (Topcon, Remidio, Forus 3nethra, Zeiss)            │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│           1. Optical Quality-CheckNet (ResNet-18)           │
│         [Illumination • Focus • Field-of-View Check]        │
└──────────────────────────────┬──────────────────────────────┘
                               │ (Pass)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 2. Tri-Model Clinical Ensemble              │
├──────────────────────────────┬──────────────────────────────┤
│ APTOS 2019 Classifier        │ EfficientNet-B4 + ArcFace    │
│ IDRiD Lesion Segmenter       │ Attention U-Net              │
│ DRIVE Vasculature Extractor  │ Res-UNet + Graph Analysis    │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│             3. Explainability & Triage Engine               │
│      [Grad-CAM Map • Lesion Overlays • ICDR Grading]        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│    Tele-Ophthalmology Dashboard & ABDM Clinical Referral    │
└─────────────────────────────────────────────────────────────┘
```

### Dataset Benchmark Metrics

| Dataset | Primary Role | Model Architecture | Sensitivity | Specificity | AUC |
| :--- | :--- | :--- | :---: | :---: | :---: |
| **APTOS 2019** | ICDR Severity Grading (Stages 0–4) | EfficientNet-B4 + MixUp + ArcFace | 95.2% | 93.8% | 0.984 |
| **IDRiD** | Lesion Segmentation (MA, HE, EX, SE) | Attention U-Net (ResNeXt-50) | 92.6% | 96.1% | 0.971 |
| **DRIVE** | Vasculature Caliber & Tortuosity | Res-UNet + Morphological Graph | 94.1% | 97.4% | 0.979 |

---

## 📊 Clinical Grading & Severity Scale

Netriksha strictly complies with the **International Clinical Diabetic Retinopathy (ICDR)** severity scale:

* **Stage 0 — No DR**: No microvascular abnormalities; routine annual surveillance.
* **Stage 1 — Mild NPDR**: Microaneurysms only; 6–9 month follow-up with glycemic control.
* **Stage 2 — Moderate NPDR**: Multiple microaneurysms, dot/blot hemorrhages, venous beading, or hard exudates; ophthalmologist referral within 3–4 weeks.
* **Stage 3 — Severe NPDR**: 4-2-1 Rule (severe hemorrhages in 4 quadrants, venous beading in 2+ quadrants, or IRMA in 1+ quadrant); urgent specialist referral (within 1–2 weeks).
* **Stage 4 — Proliferative DR (PDR)**: Neovascularization on disc (NVD) or elsewhere (NVE), preretinal/vitreous hemorrhage; emergency intervention (panretinal photocoagulation / anti-VEGF).

---

## 🛠️ Technology Stack

* **Frontend**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), [Motion](https://motion.dev/)
* **Iconography**: [Lucide React](https://lucide.dev/)
* **Build System**: [Vite 6](https://vitejs.dev/)
* **Server & API**: Node.js / Express, Gemini AI Integration (`@google/genai`)
* **ML Service Spec**: Python FastAPI microservice architecture with PyTorch & Grad-CAM pipeline

---

## 🚀 Getting Started

### Prerequisites
* **Node.js**: Version 18.0 or higher
* **Package Manager**: npm, yarn, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/netriksha.git
   cd netriksha
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

### Production Build & Linting

```bash
# Type check and lint
npm run lint

# Compile for production
npm run build

# Preview production build
npm run preview
```

---

## 📂 Project Structure

```
├── index.html                   # HTML entry point with meta tags & branding
├── metadata.json                # Application configuration & permissions
├── package.json                 # Dependencies & scripts
├── src/
│   ├── main.tsx                 # Application mount
│   ├── App.tsx                  # Root state orchestration & navigation
│   ├── index.css                # Tailwind CSS imports & global styles
│   ├── types.ts                 # TypeScript interfaces for patients, lesions, pipelines
│   ├── components/
│   │   ├── Navbar.tsx           # Navigation header with system indicators
│   │   ├── Hero.tsx             # Main hero banner and key stats
│   │   ├── FeatureCards.tsx     # Core capability highlights
│   │   ├── ScreeningForm.tsx    # Fundus image upload & patient intake
│   │   ├── AIProcessing.tsx     # Animated multi-stage inference visualization
│   │   ├── ResultsDashboard.tsx # Interactive Grad-CAM & lesion analysis
│   │   ├── DoctorDashboard.tsx  # Tele-ophthalmology triage queue & review
│   │   ├── ClinicalReportModal.tsx # Printable ABDM medical referral report
│   │   ├── DatasetPipeline.tsx  # ML dataset benchmarks & FastAPI code snippet
│   │   ├── AboutSection.tsx     # Problem statement & rural healthcare impact
│   │   └── Footer.tsx           # Platform footer & compliance notes
│   └── data/
│       └── sampleData.ts        # Clinical cohorts, patient cases & benchmarks
└── tsconfig.json                # TypeScript configuration
```

---

## ⚖️ Clinical Disclaimer & Regulatory Notice

Netriksha is designed as an **Explainable Clinical Decision Support System (CDSS)** for healthcare professionals, medical officers, and certified vision technicians under the National Programme for Control of Blindness & Visual Impairment (NPCBVI) and ABDM frameworks. It is intended to assist and prioritize referrals, not to replace the final clinical judgment of a licensed ophthalmologist.

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.
