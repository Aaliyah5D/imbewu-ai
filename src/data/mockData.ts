import { FarmerProfile, ClimateAdvice } from "../types";

export const INITIAL_FARMERS: FarmerProfile[] = [
  {
    id: "farmer-1",
    name: "Nomsa Dlamini",
    location: "KwaZulu-Natal, South Africa",
    crop: "Yellow Maize",
    farmSize: 4.2,
    fundingNeeded: 25000,
    fundingRaised: 18500,
    expectedHarvestDate: "2026-10-15",
    expectedYield: "15 Tons",
    status: "Vegetative",
    healthScore: 95,
    riskScore: "Low",
    climateRisk: "Stable moderate rainfall predicted. Low threat of storm damage.",
    avatarUrl: "https://images.unsplash.com/photo-1530893609608-32a9af3aa95c?auto=format&fit=crop&q=80&w=200&h=200",
    aiSummary: "Nomsa is an experienced third-generation maize farmer who has successfully completed soil rejuvenation. Her vegetative-stage maize crop exhibits outstanding leaf nitrogen index and robust root crown development as verified via Gemini Vision analysis.",
    images: [
      "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=800"
    ],
    registeredAt: "2026-05-10",
    hasAudioClip: true,
    recommendations: [
      "Apply localized nitrogen-rich organic top-dressing in week 8.",
      "Check underside of leaves for early signs of Fall Armyworm infestation.",
      "Clear secondary weeding channels before the upcoming light rains."
    ],
    milestones: [
      {
        id: "m1-1",
        stage: "Registration",
        title: "Platform Onboarding & Soil Report",
        description: "Verify farm land boundaries and complete introductory voice registration.",
        completed: true,
        fundsReleased: 5000,
        completedAt: "2026-05-12",
        imageVerified: true
      },
      {
        id: "m1-2",
        stage: "Seed Planted",
        title: "Seed Procurement & Planting",
        description: "Sowing high-yield, drought-resistant yellow maize seed stocks.",
        completed: true,
        fundsReleased: 7500,
        completedAt: "2026-06-02",
        imageVerified: true
      },
      {
        id: "m1-3",
        stage: "Seedling",
        title: "Seedling Emergence Inspection",
        description: "Gemini Vision confirms over 90% uniform germination spacing and healthy shoot vigor.",
        completed: true,
        fundsReleased: 6000,
        completedAt: "2026-06-20",
        imageVerified: true
      },
      {
        id: "m1-4",
        stage: "Vegetative",
        title: "Vegetative Height & Canopy Cover",
        description: "Verify leaf coverage, stalk strength, and implement weeding schedules.",
        completed: false,
        fundsReleased: 4000,
        imageVerified: false
      },
      {
        id: "m1-5",
        stage: "Flowering",
        title: "Tasseling & Pollination Check",
        description: "Inspect silks and ear initiation indicators to predict final yields.",
        completed: false,
        fundsReleased: 2500,
        imageVerified: false
      }
    ]
  },
  {
    id: "farmer-2",
    name: "Sipho Nkosi",
    location: "Free State, South Africa",
    crop: "Sweet Sorghum",
    farmSize: 6.5,
    fundingNeeded: 35000,
    fundingRaised: 35000,
    expectedHarvestDate: "2026-11-02",
    expectedYield: "22 Tons",
    status: "Seedling",
    healthScore: 88,
    riskScore: "Medium",
    climateRisk: "Early seasonal dry spells predicted. Requires water preservation practices.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    aiSummary: "Sipho is pivoting to drought-resistant sweet sorghum to counter regional water strains. His seedlings have successfully emerged, though slight moisture stress is visible on peripheral sandy patches. Immediate mulching is advised.",
    images: [
      "https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800"
    ],
    registeredAt: "2026-06-01",
    hasAudioClip: true,
    recommendations: [
      "Introduce immediate straw or dry grass mulching around seedling rows.",
      "Initiate micro-drip watering early in the morning to prevent evaporation.",
      "Prepare organic liquid fertilizer sprays to boost sapling vigor."
    ],
    milestones: [
      {
        id: "m2-1",
        stage: "Registration",
        title: "Farmer Profile Activation",
        description: "Completed full verbal voice interview and mapped boundaries in Free State.",
        completed: true,
        fundsReleased: 10000,
        completedAt: "2026-06-03",
        imageVerified: true
      },
      {
        id: "m2-2",
        stage: "Seed Planted",
        title: "Sorghum Sowing Verification",
        description: "Confirm planting depth and moisture levels for high-resistance Sorghum.",
        completed: true,
        fundsReleased: 15000,
        completedAt: "2026-06-18",
        imageVerified: true
      },
      {
        id: "m2-3",
        stage: "Seedling",
        title: "Sprout Germination & Vigor",
        description: "Monitor early sprout structures for uniformity and localized root strength.",
        completed: false,
        fundsReleased: 10000,
        imageVerified: false
      }
    ]
  },
  {
    id: "farmer-3",
    name: "Amina Diallo",
    location: "Limpopo, South Africa",
    crop: "Organic Potatoes",
    farmSize: 2.8,
    fundingNeeded: 18000,
    fundingRaised: 5200,
    expectedHarvestDate: "2026-09-10",
    expectedYield: "40 Tons",
    status: "Registration",
    healthScore: 92,
    riskScore: "Low",
    climateRisk: "Optimal temperature windows. Moderate humidity may increase fungal watch.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    aiSummary: "Amina is shifting from chemical inputs to premium organic potato cultivation. Her land preparation and compost soil mixing are verified as organic grade. She seeks funding to secure organic seed tubers and early drip line pipes.",
    images: [],
    registeredAt: "2026-06-25",
    hasAudioClip: false,
    recommendations: [
      "Acquire certified virus-free seed potato tubers.",
      "Ensure ridging spacing matches 75cm requirements to avoid greening.",
      "Apply ready-made compost mixtures as foundation bedding before sprout."
    ],
    milestones: [
      {
        id: "m3-1",
        stage: "Registration",
        title: "Soil Preparation & Boundary Mapping",
        description: "Complete voice interview, verify compost prep, and register farm coordinates.",
        completed: true,
        fundsReleased: 5000,
        completedAt: "2026-06-27",
        imageVerified: true
      },
      {
        id: "m3-2",
        stage: "Seed Planted",
        title: "Tuber Ridging & Planting Verification",
        description: "Sowing seed tubers and checking soil moisture thresholds.",
        completed: false,
        fundsReleased: 8000,
        imageVerified: false
      },
      {
        id: "m3-3",
        stage: "Seedling",
        title: "Sprout Emergence Verification",
        description: "Inspect emerging foliage for early vigor and root development.",
        completed: false,
        fundsReleased: 5000,
        imageVerified: false
      }
    ]
  }
];

export const INITIAL_CLIMATE_ADVICE: ClimateAdvice = {
  dailyTip: "Early morning mulching is recommended today to protect soil moisture from rising temperatures. It reduces evaporation rates by up to 35% in sandy clay loam soils.",
  weatherAlert: "Light scattered showers (3-6mm) expected across KwaZulu-Natal and Limpopo late afternoon. Great opportunity to gather rainwater, but hold off on applying heavy surface fertilizers to prevent runoff.",
  droughtWarning: "Free State continues to exhibit high thermal stress index. Smallholders should prioritize drought-resistant Sorghum and Cassava rows with early micro-drip cycling.",
  pestPrevention: "Warmer winter-end temperatures are favoring early hatching of Fall Armyworm in sweet maize. Inspect the whorls of maize leaves daily. Apply organic neem oil sprays at the first sign of leaf windowpaning.",
  plantingRec: "Now is an excellent window for planting dry beans and root crops in Limpopo, as ground moisture profiles are stabilized following last week's cold front.",
  waterSaving: "Utilize localized bucket-drip systems with plastic bottle caps or recycled containers. Placing these directly at the base of vegetative saplings conserves up to 70% water compared to surface flood irrigation.",
  timestamp: "2026-07-02"
};
