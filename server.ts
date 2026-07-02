import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { INITIAL_FARMERS, INITIAL_CLIMATE_ADVICE } from "./src/data/mockData";
import { FarmerProfile, FarmMilestoneStage, Milestone } from "./src/types";

dotenv.config();

const app = express();
const PORT = 3000;

// Body parsing middleware
app.use(express.json({ limit: "20mb" }));

// In-memory data store for the live demo session
let farmersDatabase: FarmerProfile[] = [...INITIAL_FARMERS];
let climateAdviceStore = { ...INITIAL_CLIMATE_ADVICE };

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;
const API_KEY = process.env.GEMINI_API_KEY;

if (API_KEY && API_KEY !== "MY_GEMINI_API_KEY" && API_KEY.trim() !== "") {
  console.log("Initializing server-side Gemini client with provided API Key...");
  ai = new GoogleGenAI({ apiKey: API_KEY });
} else {
  console.log("No GEMINI_API_KEY detected. Running in Smart-Simulation Demo Mode.");
}

// Helper to construct fallback structured outputs when API key is missing
const simulateVoiceRegistration = (speechText: string): any => {
  const lowercase = speechText.toLowerCase();
  
  // Default values
  let name = "Mandla Ndlovu";
  let location = "Gauteng, South Africa";
  let crop = "White Maize";
  let farmSize = 3.5;
  let fundingNeeded = 22000;
  let expectedHarvestDate = "2026-11-20";
  let expectedYield = "12 Tons";
  
  if (lowercase.includes("sipho") || lowercase.includes("nkosi")) {
    name = "Sipho Nkosi";
    location = "Free State, South Africa";
    crop = "Sweet Sorghum";
    farmSize = 6.5;
    fundingNeeded = 35000;
    expectedHarvestDate = "2026-11-02";
    expectedYield = "22 Tons";
  } else if (lowercase.includes("amina") || lowercase.includes("diallo") || lowercase.includes("potatoes")) {
    name = "Amina Diallo";
    location = "Limpopo, South Africa";
    crop = "Organic Potatoes";
    farmSize = 2.8;
    fundingNeeded = 18000;
    expectedHarvestDate = "2026-09-10";
    expectedYield = "40 Tons";
  } else if (lowercase.includes("nomsa") || lowercase.includes("dlamini")) {
    name = "Nomsa Dlamini";
    location = "KwaZulu-Natal, South Africa";
    crop = "Yellow Maize";
    farmSize = 4.2;
    fundingNeeded = 25000;
    expectedHarvestDate = "2026-10-15";
    expectedYield = "15 Tons";
  } else {
    // Attempt custom extractions from standard keywords
    const nameMatch = speechText.match(/my name is ([\w\s]+?)(?: and| I| my|\.|$)/i);
    if (nameMatch) name = nameMatch[1].trim();
    
    const locationMatch = speechText.match(/in ([\w\s,]+?)(?: farming| and| representing|\.|$)/i);
    if (locationMatch) location = locationMatch[1].trim();
    
    const cropMatch = speechText.match(/(?:farm|grow|growing|planting) ([\w\s]+?)(?: with| on| in|\.|$)/i);
    if (cropMatch) crop = cropMatch[1].trim();

    const sizeMatch = speechText.match(/(\d+(?:\.\d+)?)\s*(?:hectare|hectares|ha)/i);
    if (sizeMatch) farmSize = parseFloat(sizeMatch[1]);

    const budgetMatch = speechText.match(/(?:need|seeking|requesting|r)\s*(\d+(?:,\d+)?|\d+)/i);
    if (budgetMatch) {
      fundingNeeded = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
    }
  }

  return {
    name,
    location,
    crop,
    farmSize,
    fundingNeeded,
    expectedHarvestDate,
    expectedYield,
    aiSummary: `Verbal registration successfully parsed via Imbewu AI. ${name} represents a dedicated smallholder in ${location} seeking ${fundingNeeded} ZAR to scale their ${crop} crop on ${farmSize} hectares. Soil hydration parameters are optimized.`,
    recommendations: [
      `Source certified adaptive ${crop} cultivars.`,
      "Prepare organic nutrient blends to safeguard seedbed soil pH.",
      "Integrate baseline moisture sensors before seed drilling."
    ]
  };
};

const simulateCropAnalysis = (cropTypeHint?: string): any => {
  const isMaize = !cropTypeHint || cropTypeHint.toLowerCase().includes("maize");
  return {
    cropType: isMaize ? "Yellow Maize" : (cropTypeHint || "Organic Potatoes"),
    growthStage: isMaize ? "Vegetative" : "Seedling",
    cropHealth: "Excellent (Green Leaf Index: 94%)",
    diseaseDetected: "None detected (Visual analysis confirms clear foliage and root collar stability)",
    droughtDetection: "Adequate (Soil moisture reflection points indicate optimal cell turgor pressure)",
    confidenceScore: 94,
    aiVerified: true,
    recommendations: [
      "Maintain active weeding lines across current acreage.",
      "Schedule next minor nitrogen amendment ahead of forecasted showers.",
      "Calibrate irrigation frequency to maintain soil hydration without pooling."
    ]
  };
};


// ----------------- API ROUTES -----------------

// 1. Farmers Endpoints
app.get("/api/farmers", (req, res) => {
  res.json(farmersDatabase);
});

app.get("/api/farmers/:id", (req, res) => {
  const farmer = farmersDatabase.find((f) => f.id === req.params.id);
  if (!farmer) {
    return res.status(404).json({ error: "Farmer profile not found" });
  }
  res.json(farmer);
});

app.post("/api/farmers", (req, res) => {
  const newFarmer: FarmerProfile = {
    id: `farmer-${Date.now()}`,
    registeredAt: new Date().toISOString().split("T")[0],
    fundingRaised: 0,
    status: "Registration",
    healthScore: 100,
    riskScore: "Low",
    climateRisk: "Determined after regional coordinates and crop classification verify.",
    images: [],
    avatarUrl: `https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=200&h=200`,
    ...req.body
  };
  
  farmersDatabase.push(newFarmer);
  res.status(201).json(newFarmer);
});

// Verify milestone & release partial funds
app.post("/api/farmers/:id/verify-milestone", (req, res) => {
  const { milestoneId, imageBase64 } = req.body;
  const farmerIndex = farmersDatabase.findIndex((f) => f.id === req.params.id);
  
  if (farmerIndex === -1) {
    return res.status(404).json({ error: "Farmer profile not found" });
  }

  const farmer = farmersDatabase[farmerIndex];
  const milestoneIndex = farmer.milestones.findIndex((m) => m.id === milestoneId);

  if (milestoneIndex === -1) {
    return res.status(404).json({ error: "Milestone not found" });
  }

  const milestone = farmer.milestones[milestoneIndex];
  milestone.completed = true;
  milestone.imageVerified = true;
  milestone.completedAt = new Date().toISOString().split("T")[0];

  // Release funds (increase funding raised up to fundingNeeded cap)
  const previousRaised = farmer.fundingRaised;
  farmer.fundingRaised = Math.min(farmer.fundingNeeded, previousRaised + milestone.fundsReleased);
  
  // Progress status to this milestone stage if appropriate
  farmer.status = milestone.stage;
  
  // If an image was supplied, append it
  if (imageBase64) {
    farmer.images.push(imageBase64);
  }

  farmersDatabase[farmerIndex] = farmer;
  res.json(farmer);
});


// 2. Voice Registration parsing route (Uses Gemini)
app.post("/api/register-voice", async (req, res) => {
  const { speechText } = req.body;
  if (!speechText) {
    return res.status(400).json({ error: "Speech text is required" });
  }

  if (!ai) {
    // Simulation mode
    console.log("Simulating voice extraction due to absent Gemini API key");
    const mockExtracted = simulateVoiceRegistration(speechText);
    return res.json({ ...mockExtracted, sim: true });
  }

  try {
    const prompt = `
      You are an expert agricultural investment analyst parsing a verbal onboarding interview from an African smallholder farmer.
      The farmer has provided this transcript of their verbal statement:
      
      "${speechText}"

      Extract and infer the following details:
      1. Farmer Name (default to "Sibusiso Zulu" if missing or unclear)
      2. Farm Location (specific African region, default to "Limpopo, South Africa")
      3. Crop (primary crop mentioned, e.g. Maize, Sorghum, Potatoes, Sweet Potatoes)
      4. Farm Size (in hectares, must be a float/number. Standardize to float. Default to 2.5 if missing)
      5. Funding Needed (estimate ZAR Rands budget. MUST be a number, default to 20000)
      6. Expected Harvest Date (predict target date within next 4-6 months, e.g. "2026-11-15")
      7. Expected Yield (e.g. "12 Tons")
      8. AI Summary (a warm, professional, encouraging paragraph describing their agricultural experience, land readiness, and motivation)
      9. Recommendations (3 bulleted actionable agricultural advice points based on their crop type)

      Provide the response strictly following the JSON Schema requested.
    `;

    const voiceSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        name: { type: Type.STRING },
        location: { type: Type.STRING },
        crop: { type: Type.STRING },
        farmSize: { type: Type.NUMBER },
        fundingNeeded: { type: Type.INTEGER },
        expectedHarvestDate: { type: Type.STRING },
        expectedYield: { type: Type.STRING },
        aiSummary: { type: Type.STRING },
        recommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: [
        "name", "location", "crop", "farmSize", "fundingNeeded", 
        "expectedHarvestDate", "expectedYield", "aiSummary", "recommendations"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: voiceSchema,
        temperature: 0.1
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);
  } catch (error: any) {
    console.error("Gemini voice parsing failed:", error);
    // Graceful fallback
    const mockExtracted = simulateVoiceRegistration(speechText);
    res.json({ ...mockExtracted, error: error.message });
  }
});


// 3. Crop Verification / Vision Route
app.post("/api/verify-crop", async (req, res) => {
  const { imageBase64, cropTypeHint } = req.body;
  if (!imageBase64) {
    return res.status(400).json({ error: "Base64 image is required" });
  }

  // Strip prefix from data URL if present
  const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

  if (!ai) {
    console.log("Simulating crop vision analysis due to absent Gemini API key");
    const mockAnalysis = simulateCropAnalysis(cropTypeHint);
    return res.json({ ...mockAnalysis, sim: true });
  }

  try {
    const prompt = `
      You are an award-winning agronomy expert and satellite/drone computer vision inspector.
      Analyze this user-uploaded agricultural photo.
      
      Determine:
      1. Crop Type (e.g., Yellow Maize, Sweet Sorghum, Potatoes)
      2. Growth Stage (Must strictly be one of: "Seed Planted", "Seedling", "Vegetative", "Flowering", "Harvest Ready")
      3. Crop Health (e.g., "Excellent (Green Leaf Index: 95%)", "Moderate Stress", "Early Chlorosis")
      4. Disease Detection (Detail any visible diseases such as Maize Streak Virus, Leaf Blight, or specify "None" with reasoning)
      5. Drought Detection (Estimate soil moisture status, e.g., "No water stress", "Moderate soil dryness")
      6. Confidence Score (Estimate percentage 0-100 indicating AI visual certainty)
      7. AI Verified (boolean, true if the image is valid farm vegetation, false if irrelevant or extremely poor quality)
      8. Recommendations (3 professional recommendations for the farmer based on what is visible in the photo, e.g., spacing adjustments, watering, fertilizer timing)

      Be constructive, encouraging, and highly detailed. Return strictly as a JSON object adhering to the schema.
    `;

    const cropVisionSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        cropType: { type: Type.STRING },
        growthStage: { 
          type: Type.STRING, 
          enum: ["Seed Planted", "Seedling", "Vegetative", "Flowering", "Harvest Ready"]
        },
        cropHealth: { type: Type.STRING },
        diseaseDetected: { type: Type.STRING },
        droughtDetection: { type: Type.STRING },
        confidenceScore: { type: Type.INTEGER },
        aiVerified: { type: Type.BOOLEAN },
        recommendations: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      },
      required: [
        "cropType", "growthStage", "cropHealth", "diseaseDetected", 
        "droughtDetection", "confidenceScore", "aiVerified", "recommendations"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: "image/jpeg"
          }
        },
        prompt
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: cropVisionSchema,
        temperature: 0.2
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json(parsedJson);
  } catch (error: any) {
    console.error("Gemini vision analysis failed:", error);
    const mockAnalysis = simulateCropAnalysis(cropTypeHint);
    res.json({ ...mockAnalysis, error: error.message });
  }
});


// 4. Climate Assistant Advice Route
app.post("/api/climate-assistant", async (req, res) => {
  const { location, crop } = req.body;
  const targetLocation = location || "Limpopo, South Africa";
  const targetCrop = crop || "Maize";

  if (!ai) {
    console.log("Simulating climate assistance due to absent Gemini API key");
    return res.json({ ...climateAdviceStore, sim: true });
  }

  try {
    const prompt = `
      You are Imbewu AI's Climate-Smart Agriculture Assistant.
      The farmer represents the region of "${targetLocation}" growing "${targetCrop}".
      Provide custom localized recommendations.
      
      Generate a JSON object with:
      1. dailyTip: A warm, practical single-sentence tip for today's field actions.
      2. weatherAlert: Optional short alert indicating regional rainfall or heat patterns.
      3. droughtWarning: Optional statement of dry-spells or soil moisture watch.
      4. pestPrevention: Specific preventative actions against regional pests targeting "${targetCrop}".
      5. plantingRec: Best planting spacing or companion planting window guidance.
      6. waterSaving: Specific water preservation tip.

      Strictly follow the requested JSON structure. Keep terms constructive, clear, and culturally friendly.
    `;

    const climateSchema: Schema = {
      type: Type.OBJECT,
      properties: {
        dailyTip: { type: Type.STRING },
        weatherAlert: { type: Type.STRING },
        droughtWarning: { type: Type.STRING },
        pestPrevention: { type: Type.STRING },
        plantingRec: { type: Type.STRING },
        waterSaving: { type: Type.STRING }
      },
      required: [
        "dailyTip", "pestPrevention", "plantingRec", "waterSaving"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: climateSchema,
        temperature: 0.3
      }
    });

    const parsedJson = JSON.parse(response.text || "{}");
    res.json({
      ...parsedJson,
      timestamp: new Date().toISOString().split("T")[0]
    });
  } catch (error: any) {
    console.error("Gemini climate assistant failed:", error);
    res.json({ ...climateAdviceStore, error: error.message });
  }
});


// ----------------- VITE MIDDLEWARE CONFIG -----------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting Express + Vite server in Development Mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting Express + Vite server in Production Mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Imbewu AI Backend] Running at http://localhost:${PORT}`);
  });
}

startServer();
