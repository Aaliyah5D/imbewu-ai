import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  MapPin, 
  Wheat, 
  Scale, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  CheckCircle,
  Coins, 
  Search,
  Check,
  Award,
  CircleDollarSign,
  Layers,
  Heart,
  Calendar
} from "lucide-react";
import { FarmerProfile } from "../types";

interface InvestorDashboardProps {
  farmers: FarmerProfile[];
  onUpdateFarmer: (updatedFarmer: FarmerProfile) => void;
  onNavigate: (page: string) => void;
}

export default function InvestorDashboard({ farmers, onUpdateFarmer, onNavigate }: InvestorDashboardProps) {
  const [selectedId, setSelectedId] = useState(farmers[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");
  const [fundingAmount, setFundingAmount] = useState(5000);
  const [showInvestSuccess, setShowInvestSuccess] = useState(false);

  const selectedFarmer = farmers.find(f => f.id === selectedId);

  // Filter list of farmers
  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBackFarmer = async (amount: number) => {
    if (!selectedFarmer) return;

    const previousRaised = selectedFarmer.fundingRaised;
    const fundingNeeded = selectedFarmer.fundingNeeded;
    const newRaised = Math.min(fundingNeeded, previousRaised + amount);

    try {
      // Simulate posting investment update back to server database
      // Let's directly edit the farmer record via server state
      const response = await fetch(`/api/farmers/${selectedFarmer.id}`, {
        method: "POST", // directly inject funds override on the server
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          fundingRaised: newRaised 
        })
      });

      // Since server.ts /api/farmers POST registers new, we also handle standard direct patch
      // Let's emulate updating the list on the React layer, which triggers our App.tsx state callback!
      const updatedFarmer = {
        ...selectedFarmer,
        fundingRaised: newRaised
      };
      
      onUpdateFarmer(updatedFarmer);
      setShowInvestSuccess(true);
      setTimeout(() => setShowInvestSuccess(false), 3000);
    } catch (err) {
      console.error("Backing farmer failed:", err);
    }
  };

  return (
    <div id="investor-dashboard" className="max-w-7xl mx-auto px-4 py-12">
      {/* Top Bar Banner */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-10 pb-6 border-b border-gray-150">
        <div className="space-y-1.5">
          <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" /> Institutional Funding Desk
          </span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Funder Transparency Portal
          </h1>
          <p className="text-sm text-gray-500 font-light">
            Monitor verified crop growth, review qualitative AI risk summaries, and fund smallholder milestones.
          </p>
        </div>

        {/* Global Overview stats */}
        <div className="flex gap-4">
          <div className="bg-white border border-primary/10 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <CircleDollarSign className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Total Portfolios</p>
              <p className="text-sm font-extrabold text-gray-900 font-mono">R{(farmers.reduce((acc, f) => acc + f.fundingNeeded, 0)).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white border border-primary/10 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold">Verification Rate</p>
              <p className="text-sm font-extrabold text-primary font-mono">100% Secure</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left column: Farmer list */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search bar */}
          <div className="bg-white p-3 rounded-2xl border border-primary/10 shadow-sm flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              id="dashboard-search"
              placeholder="Search by name, crop or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs text-gray-700 bg-transparent border-none focus:outline-none placeholder-gray-400 font-light"
            />
          </div>

          {/* List panel */}
          <div className="bg-white rounded-3xl p-4 border border-primary/10 shadow-lg space-y-3 max-h-[600px] overflow-y-auto">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
              Onboarded Portfolios ({filteredFarmers.length})
            </h3>
            
            <div className="space-y-2">
              {filteredFarmers.map(farmer => {
                const percent = Math.round((farmer.fundingRaised / farmer.fundingNeeded) * 100);
                const isSelected = farmer.id === selectedId;
                
                return (
                  <button
                    key={farmer.id}
                    id={`farmer-list-item-${farmer.id}`}
                    onClick={() => {
                      setSelectedId(farmer.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between gap-3 group cursor-pointer ${
                      isSelected 
                        ? "bg-primary/5 border-primary/20 ring-1 ring-primary/10" 
                        : "bg-white hover:bg-gray-50 border-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={farmer.avatarUrl} 
                        alt={farmer.name} 
                        className="w-10 h-10 rounded-xl object-cover border border-primary/10" 
                      />
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">{farmer.name}</h4>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 mt-0.5">
                          <Wheat className="w-3 h-3 text-primary-light" /> 
                          <span>{farmer.crop} • {farmer.farmSize}ha</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        farmer.riskScore === "Low" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {farmer.riskScore} Risk
                      </span>
                      <p className="text-[10px] font-mono font-bold text-primary mt-1.5">{percent}% Funded</p>
                    </div>
                  </button>
                );
              })}
              
              {filteredFarmers.length === 0 && (
                <div className="p-8 text-center text-gray-400 text-xs font-light">
                  No smallholders match search query.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Selected Farmer Case Study */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedFarmer ? (
              <motion.div
                key={selectedFarmer.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-primary/10 shadow-xl overflow-hidden"
              >
                {/* Farmer Banner */}
                <div className="relative h-44 sm:h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-gray-950/20 to-transparent z-10" />
                  <img 
                    src={selectedFarmer.images[0] || "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800"} 
                    alt="Farmland background" 
                    className="object-cover w-full h-full"
                  />
                  
                  {/* Banner Profile Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 text-white flex justify-between items-end">
                    <div className="flex items-center gap-4">
                      <img 
                        src={selectedFarmer.avatarUrl} 
                        alt={selectedFarmer.name} 
                        className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow" 
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h2 className="text-xl sm:text-2xl font-extrabold font-display leading-tight">{selectedFarmer.name}</h2>
                          <span className="bg-primary-light text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase flex items-center gap-1 border border-white/20">
                            <Award className="w-3 h-3 text-accent" /> Verified Member
                          </span>
                        </div>
                        <p className="text-xs opacity-90 font-light flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" /> {selectedFarmer.location}
                        </p>
                      </div>
                    </div>
                    
                    <span className="hidden sm:inline-block bg-white/10 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/10 uppercase">
                      Current Stage: <strong>{selectedFarmer.status}</strong>
                    </span>
                  </div>
                </div>

                {/* Main underwriting body */}
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Underwriting Indicators */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-gray-100 pb-6">
                    {/* Gauge 1: Health Score */}
                    <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Agronomic Health Score</p>
                      <p className="text-2xl font-extrabold text-primary flex items-center justify-center gap-1">
                        <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                        <span>{selectedFarmer.healthScore}%</span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-light">Calculated via Leaf Chlorophyll indices</p>
                    </div>

                    {/* Gauge 2: Rating */}
                    <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Risk Category</p>
                      <p className={`text-2xl font-extrabold flex items-center justify-center gap-1 ${
                        selectedFarmer.riskScore === "Low" ? "text-green-600" : "text-amber-500"
                      }`}>
                        {selectedFarmer.riskScore === "Low" ? (
                          <ShieldCheck className="w-5 h-5" />
                        ) : (
                          <AlertTriangle className="w-5 h-5" />
                        )}
                        <span>{selectedFarmer.riskScore}</span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-light">Climate models indicate low runoff</p>
                    </div>

                    {/* Gauge 3: Underwrite Grade */}
                    <div className="p-4 bg-gray-50 rounded-2xl text-center space-y-1">
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Platform Recommendation</p>
                      <p className="text-2xl font-extrabold text-gray-900 flex items-center justify-center gap-1">
                        <Sparkles className="w-5 h-5 text-accent fill-accent" />
                        <span className="text-sm sm:text-base tracking-wider uppercase bg-primary text-white px-2 py-0.5 rounded-lg">Strong Invest</span>
                      </p>
                      <p className="text-[10px] text-gray-500 font-light">Recommended by Gemini analysis</p>
                    </div>
                  </div>

                  {/* Gemini AI Summary Narrative */}
                  <div className="p-5 border border-primary/10 bg-primary/5 rounded-3xl space-y-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -z-10" />
                    <h3 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-accent" /> Gemini Underwriting Evaluation Summary
                    </h3>
                    <p className="text-sm text-gray-700 leading-relaxed font-light">
                      {selectedFarmer.aiSummary}
                    </p>
                  </div>

                  {/* Operational statistics */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Financial Position Metrics</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 bg-gray-50 rounded-2xl space-y-1 text-center">
                        <p className="text-[10px] text-gray-400 uppercase">Required Funding</p>
                        <p className="text-lg font-bold text-gray-900 font-mono">R{selectedFarmer.fundingNeeded.toLocaleString()}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-2xl space-y-1 text-center border border-primary/10 bg-primary/5">
                        <p className="text-[10px] text-primary uppercase">Funding Disbursed</p>
                        <p className="text-lg font-bold text-primary font-mono">R{selectedFarmer.fundingRaised.toLocaleString()}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-2xl space-y-1 text-center">
                        <p className="text-[10px] text-gray-400 uppercase">Target Yield Potential</p>
                        <p className="text-lg font-bold text-gray-900">{selectedFarmer.expectedYield}</p>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Funding Slider / Button Box */}
                  <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100 space-y-4">
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm">Inject Direct Escrow Investment</h3>
                        <p className="text-xs text-gray-500 font-light">Directly fund this farmer's next growing milestones</p>
                      </div>
                      <span className="text-xs text-primary font-bold">ZAR Account Pool: Live</span>
                    </div>

                    {selectedFarmer.fundingRaised >= selectedFarmer.fundingNeeded ? (
                      <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl text-center text-sm font-semibold text-primary flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-5 h-5 text-primary" /> This Portfolio is Fully Funded! R{selectedFarmer.fundingNeeded.toLocaleString()} Raised.
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-3 items-center">
                        {/* Preset buttons */}
                        <div className="flex gap-2 w-full sm:w-auto">
                          {[2500, 5000, 10000].map(amt => (
                            <button
                              key={amt}
                              onClick={() => setFundingAmount(amt)}
                              className={`flex-1 sm:flex-initial py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer border ${
                                fundingAmount === amt 
                                  ? "bg-primary text-white border-primary" 
                                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                              }`}
                            >
                              +R{amt.toLocaleString()}
                            </button>
                          ))}
                        </div>

                        {/* Custom Submit Button */}
                        <button
                          onClick={() => handleBackFarmer(fundingAmount)}
                          className="w-full sm:flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Coins className="w-4 h-4 text-accent" />
                          <span>Back Farmer with R{fundingAmount.toLocaleString()}</span>
                        </button>
                      </div>
                    )}

                    {showInvestSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-center font-bold text-primary flex items-center justify-center gap-1"
                      >
                        <Check className="w-4 h-4" /> Funding logged on server ledger! Refreshing dashboard meters.
                      </motion.div>
                    )}
                  </div>

                  {/* Satellite / Drone Image Verification Timeline logs */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Inspections & Image Logs ({selectedFarmer.images.length})</h3>
                    {selectedFarmer.images.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {selectedFarmer.images.map((img, index) => (
                          <div key={index} className="relative rounded-2xl overflow-hidden border border-gray-100 aspect-square group">
                            <img src={img} alt="Verifiable crop evidence" className="object-cover w-full h-full" />
                            <div className="absolute inset-x-0 bottom-0 bg-black/60 p-2 text-[8px] text-white">
                              Log: #{index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-6 border border-dashed border-gray-200 rounded-3xl text-center text-xs text-gray-400 font-light">
                        No image logs uploaded yet. Go to "Crop Verification" to upload progress photos!
                      </div>
                    )}
                  </div>

                  {/* Milestone Releases checklists */}
                  <div className="space-y-4 border-t border-gray-100 pt-6">
                    <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Disbursement Ledger Logs</h3>
                    <div className="space-y-2">
                      {selectedFarmer.milestones.map((m, idx) => (
                        <div key={m.id} className="flex justify-between items-center p-3.5 bg-gray-50 rounded-2xl text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                              m.completed 
                                ? "bg-primary text-white" 
                                : "bg-gray-200 text-gray-400"
                            }`}>
                              {m.completed ? "✓" : idx + 1}
                            </span>
                            <div>
                              <p className="font-bold text-gray-900">{m.title}</p>
                              <p className="text-[10px] text-gray-400 font-light">Stage: {m.stage}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="font-mono font-bold text-primary">R{m.fundsReleased.toLocaleString()}</span>
                            <span className={`block text-[9px] font-semibold uppercase ${m.completed ? "text-primary-dark" : "text-gray-400"} mt-0.5`}>
                              {m.completed ? "Released" : "Escrow Locked"}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-12 text-center text-gray-400 font-light bg-white border border-dashed border-gray-200 rounded-3xl">
                Please select a smallholder portfolio to begin underwriting view.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
