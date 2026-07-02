/**
 * Imbewu AI Core Types
 * For robust, type-safe agricultural crowdfunding & verification modeling.
 */

export type FarmMilestoneStage =
  | "Registration"
  | "Seed Planted"
  | "Seedling"
  | "Vegetative"
  | "Flowering"
  | "Harvest Ready";

export interface Milestone {
  id: string;
  stage: FarmMilestoneStage;
  title: string;
  description: string;
  completed: boolean;
  fundsReleased: number; // in Rands (ZAR)
  completedAt?: string;
  imageVerified?: boolean;
}

export interface FarmerProfile {
  id: string;
  name: string;
  location: string;
  crop: string;
  farmSize: number; // in hectares
  fundingNeeded: number; // in ZAR (Rands)
  fundingRaised: number; // in ZAR (Rands)
  expectedHarvestDate: string;
  expectedYield: string; // e.g. "12 tons"
  status: FarmMilestoneStage;
  healthScore: number; // 0 - 100%
  riskScore: "Low" | "Medium" | "High";
  climateRisk: string; // e.g. "Low risk, moderate rainfall expected"
  avatarUrl: string;
  aiSummary: string;
  images: string[]; // urls or base64 of verified crop photos
  milestones: Milestone[];
  recommendations: string[];
  registeredAt: string;
  hasAudioClip?: boolean;
}

export interface CropAnalysisResult {
  cropType: string;
  growthStage: FarmMilestoneStage;
  cropHealth: string; // e.g. "Excellent", "Drought Stressed"
  diseaseDetected: string; // e.g. "None" or "Maize Streak Virus"
  droughtDetection: string; // e.g. "No water stress detected" or "Severe soil moisture deficit"
  confidenceScore: number; // e.g. 96
  aiVerified: boolean;
  timestamp: string;
}

export interface ClimateAdvice {
  dailyTip: string;
  weatherAlert?: string;
  droughtWarning?: string;
  pestPrevention: string;
  plantingRec: string;
  waterSaving: string;
  timestamp: string;
}
