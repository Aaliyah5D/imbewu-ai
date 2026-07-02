import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Mic, 
  MicOff, 
  Sparkles, 
  MapPin, 
  Wheat, 
  Calendar, 
  Coins, 
  Scale, 
  ArrowRight, 
  CheckCircle,
  TrendingUp,
  AlertTriangle,
  Volume2
} from "lucide-react";
import { FarmerProfile } from "../types";

interface FarmerRegistrationProps {
  onRegisterSuccess: (newFarmer: FarmerProfile) => void;
  onNavigate: (page: string) => void;
}

export default function FarmerRegistration({ onRegisterSuccess, onNavigate }: FarmerRegistrationProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [successRegistered, setSuccessRegistered] = useState(false);
  const [createdProfile, setCreatedProfile] = useState<FarmerProfile | null>(null);

  // High-fidelity voice demo presets
  const VOICE_PRESETS = [
    {
      title: "Nomsa (KwaZulu-Natal)",
      crop: "Maize",
      text: "Hello Imbewu, my name is Nomsa Dlamini, and I am from KwaZulu-Natal. I farm yellow maize across 4.2 hectares. Right now, I need R25,000 to purchase localized fertilizer and hire a weeding crew. We expect our primary harvest by mid October."
    },
    {
      title: "Sipho (Free State)",
      crop: "Sorghum",
      text: "Greeting. I am Sipho Nkosi representing the Free State. I am planting drought-resistant sweet sorghum on 6.5 hectares. I need R35,000 to buy and install secondary drip lines before early dry periods start in November."
    },
    {
      title: "Amina (Limpopo)",
      crop: "Potatoes",
      text: "Good day, this is Amina Diallo from Limpopo. I am shifting to organic potatoes on 2.8 hectares of farm land. I am seeking R18,000 to acquire certified virus-free seed potato tubers and prepare foundation bedding compost by early September."
    }
  ];

  const handleSelectPreset = (text: string) => {
    setSpeechText(text);
    // Auto-trigger simulation
    simulateVoiceStream(text);
  };

  const simulateVoiceStream = async (textToProcess: string) => {
    if (!textToProcess.trim()) return;
    setIsRecording(true);
    setExtractedData(null);
    
    // Simulate audio recording duration
    setTimeout(async () => {
      setIsRecording(false);
      setIsProcessing(true);

      try {
        const response = await fetch("/api/register-voice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ speechText: textToProcess })
        });
        
        const data = await response.json();
        setExtractedData(data);
      } catch (err) {
        console.error("Failed to parse speech:", err);
      } finally {
        setIsProcessing(false);
      }
    }, 1500);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    simulateVoiceStream(speechText);
  };

  const handleConfirmRegistration = async () => {
    if (!extractedData) return;

    setIsProcessing(true);
    try {
      // Structure standard Milestones based on the crop / status
      const defaultMilestones = [
        {
          id: `m-${Date.now()}-1`,
          stage: "Registration" as const,
          title: "Platform Activation",
          description: "Completed full voice onboarding and initial land boundary review.",
          completed: true,
          fundsReleased: Math.round(extractedData.fundingNeeded * 0.25),
          completedAt: new Date().toISOString().split("T")[0],
          imageVerified: true
        },
        {
          id: `m-${Date.now()}-2`,
          stage: "Seed Planted" as const,
          title: `${extractedData.crop} Planting`,
          description: "Verify crop sowing patterns and baseline soil hydration.",
          completed: false,
          fundsReleased: Math.round(extractedData.fundingNeeded * 0.40),
          imageVerified: false
        },
        {
          id: `m-${Date.now()}-3`,
          stage: "Seedling" as const,
          title: "Germination Emergence",
          description: "Verify sprouts using Gemini Vision to unlock middle tier capital.",
          completed: false,
          fundsReleased: Math.round(extractedData.fundingNeeded * 0.20),
          imageVerified: false
        },
        {
          id: `m-${Date.now()}-4`,
          stage: "Vegetative" as const,
          title: "Vegetative Foliage Canopy",
          description: "Verify uniform leaf coverage and lack of pest infestation.",
          completed: false,
          fundsReleased: Math.round(extractedData.fundingNeeded * 0.15),
          imageVerified: false
        }
      ];

      const newFarmerBody = {
        name: extractedData.name,
        location: extractedData.location,
        crop: extractedData.crop,
        farmSize: extractedData.farmSize,
        fundingNeeded: extractedData.fundingNeeded,
        expectedHarvestDate: extractedData.expectedHarvestDate,
        expectedYield: extractedData.expectedYield,
        aiSummary: extractedData.aiSummary,
        recommendations: extractedData.recommendations,
        milestones: defaultMilestones,
        status: "Registration" as const,
        fundingRaised: Math.round(extractedData.fundingNeeded * 0.25) // Initial registration milestone auto-released
      };

      const response = await fetch("/api/farmers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newFarmerBody)
      });

      const savedFarmer = await response.json();
      onRegisterSuccess(savedFarmer);
      setCreatedProfile(savedFarmer);
      setSuccessRegistered(true);
    } catch (error) {
      console.error("Failed to save farmer:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div id="registration-view" className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center space-y-3 mb-12">
        <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Voice-First Technology
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Farmer Voice Onboarding
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-light">
          No typing or complex papers. Farmers describe their crop, acreage, and funding needs in natural voice. Gemini translates their verbal speech into a secure investment-ready application.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Voice Controller */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-[32px] p-6 border border-primary/10 shadow-lg text-center space-y-6 relative overflow-hidden">
            {/* Listening Wave Animations */}
            {isRecording && (
              <div className="absolute inset-0 bg-primary/5 flex items-center justify-center -z-10">
                <div className="w-48 h-48 rounded-full bg-primary/10 animate-ping absolute" />
                <div className="w-32 h-32 rounded-full bg-primary/15 animate-pulse absolute" />
              </div>
            )}
            
            <h3 className="font-bold text-gray-900 text-lg">Simulation Microphone</h3>
            <p className="text-xs text-gray-500 font-light">
              {isRecording 
                ? "Simulating Google Gemini Live speech capture..." 
                : "Select a verbal scenario below or write your own to simulate."}
            </p>

            <button
              id="btn-microphone"
              onClick={() => simulateVoiceStream(speechText || VOICE_PRESETS[0].text)}
              disabled={isProcessing}
              className={`w-28 h-28 mx-auto rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-lg cursor-pointer ${
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-primary text-white hover:bg-primary-dark"
              }`}
            >
              {isRecording ? <Volume2 className="w-10 h-10" /> : <Mic className="w-10 h-10" />}
              <span className="text-xs font-bold mt-2 uppercase tracking-wide">
                {isRecording ? "Listening" : "Tap Speak"}
              </span>
            </button>

            {isProcessing && (
              <div className="text-sm font-semibold text-primary animate-pulse flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" /> Parsing Voice via Gemini...
              </div>
            )}

            {/* Custom Input Text Form */}
            <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-gray-100 text-left space-y-3">
              <label htmlFor="custom-voice" className="block text-xs font-bold text-gray-700 uppercase">
                Write natural verbal statement
              </label>
              <textarea
                id="custom-voice"
                value={speechText}
                onChange={(e) => setSpeechText(e.target.value)}
                placeholder="Type what the farmer says (e.g., 'My name is Sphiwe. I grow sorghum...')"
                className="w-full h-24 text-sm bg-gray-50 rounded-2xl p-3 border border-gray-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-400 transition"
              />
              <button
                type="submit"
                disabled={isRecording || isProcessing || !speechText.trim()}
                className="w-full py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-black transition cursor-pointer disabled:opacity-50"
              >
                Submit Speech Text
              </button>
            </form>
          </div>

          {/* Quick Voice Templates */}
          <div className="bg-white rounded-3xl p-5 border border-primary/10 shadow-md space-y-4">
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Farmer Audio Presets
            </h4>
            <div className="space-y-2.5">
              {VOICE_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  id={`preset-btn-${idx}`}
                  onClick={() => handleSelectPreset(p.text)}
                  className="w-full text-left p-3.5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/20 hover:bg-primary/5 transition flex items-start gap-3 text-sm group cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      {p.title} <span className="text-[10px] bg-primary/10 px-1.5 py-0.5 rounded text-primary">{p.crop}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-light line-clamp-2 mt-1">"{p.text}"</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Results & Status */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {successRegistered && createdProfile ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[32px] p-8 border-2 border-primary shadow-xl text-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">Onboarding Successful!</h3>
                  <p className="text-sm text-gray-600 font-light">
                    <strong>{createdProfile.name}</strong> has been securely registered in the Imbewu agricultural database.
                  </p>
                </div>

                <div className="bg-primary/5 rounded-2xl p-5 text-left border border-primary/10 space-y-3">
                  <div className="flex justify-between border-b border-primary/10 pb-2 text-sm">
                    <span className="text-gray-500 font-light">Farmer Name:</span>
                    <span className="font-bold text-gray-900">{createdProfile.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2 text-sm">
                    <span className="text-gray-500 font-light">Assigned Crop:</span>
                    <span className="font-bold text-gray-900">{createdProfile.crop}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/10 pb-2 text-sm">
                    <span className="text-gray-500 font-light">First Stage Funding:</span>
                    <span className="font-bold text-primary font-mono">
                      R{(createdProfile.fundingNeeded * 0.25).toLocaleString()} Unlocked (25%)
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 leading-relaxed font-light flex items-start gap-1.5 pt-1">
                    <AlertTriangle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>The onboarding milestone has unlocked escrow funds automatically so they can purchase seed stock.</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setSuccessRegistered(false);
                      setExtractedData(null);
                      setSpeechText("");
                    }}
                    className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-50 transition cursor-pointer"
                  >
                    Onboard Another Farm
                  </button>
                  <button
                    onClick={() => onNavigate("investor")}
                    className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View in Dashboard</span>
                    <TrendingUp className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : extractedData ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-primary/10 shadow-xl overflow-hidden"
              >
                {/* Header card banner */}
                <div className="bg-primary px-6 py-5 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-white/15 rounded-lg text-accent">🌱</span>
                    <div>
                      <h3 className="font-bold">Extracted Gemini Underwriting Case</h3>
                      <p className="text-xs opacity-80">Ref: IM-{(extractedData.name || "N").charAt(0)}-{Math.floor(Math.random() * 9000 + 1000)}</p>
                    </div>
                  </div>
                  <span className="bg-white/10 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border border-white/15 uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-accent" /> Gemini 2.5 Active
                  </span>
                </div>

                {/* Structured Fields Grid */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <span className="font-bold text-sm">N</span>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Farmer Name</p>
                        <p className="text-sm font-bold text-gray-900">{extractedData.name}</p>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Location</p>
                        <p className="text-sm font-bold text-gray-900 truncate max-w-[180px]">{extractedData.location}</p>
                      </div>
                    </div>

                    {/* Crop */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Wheat className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Primary Crop</p>
                        <p className="text-sm font-bold text-gray-900">{extractedData.crop}</p>
                      </div>
                    </div>

                    {/* Farm Size */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Scale className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Farm Size</p>
                        <p className="text-sm font-bold text-gray-900">{extractedData.farmSize} Hectares</p>
                      </div>
                    </div>

                    {/* Budget */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Coins className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Required Funding</p>
                        <p className="text-sm font-bold text-primary font-mono">R{extractedData.fundingNeeded?.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Harvest Date */}
                    <div className="p-3 bg-gray-50 rounded-2xl flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase font-medium">Target Harvest / Yield</p>
                        <p className="text-sm font-bold text-gray-900">{extractedData.expectedHarvestDate} ({extractedData.expectedYield})</p>
                      </div>
                    </div>
                  </div>

                  {/* AI Summary Block */}
                  <div className="border border-primary/10 rounded-2xl p-4 bg-primary/5 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-primary uppercase">
                      <Sparkles className="w-4 h-4 text-accent" /> Gemini Qualitative Underwriting Review
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed font-light">
                      {extractedData.aiSummary}
                    </p>
                  </div>

                  {/* Action Recommendations */}
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">
                      Initial Agronomic Requirements
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-600 font-light">
                      {extractedData.recommendations?.map((rec: string, idx: number) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Onboarding Confirmation */}
                  <button
                    onClick={handleConfirmRegistration}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <span>Confirm & Register Profile</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="bg-white/50 rounded-[32px] border border-dashed border-primary/20 p-12 text-center text-gray-500 space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                  <MicOff className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-700 text-lg">No Speech Active</h3>
                <p className="text-sm font-light max-w-sm mx-auto">
                  Onboard a farmer by typing a custom verbal description or clicking a quick preset verbal scenario on the left panel.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
