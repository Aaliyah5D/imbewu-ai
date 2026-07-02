import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  TrendingUp, 
  CloudSun, 
  Layers, 
  Cpu, 
  Network,
  Home
} from "lucide-react";
import { FarmerProfile } from "./types";

// Page Components
import LandingPage from "./components/LandingPage";
import FarmerRegistration from "./components/FarmerRegistration";
import CropVerification from "./components/CropVerification";
import FundingProgress from "./components/FundingProgress";
import InvestorDashboard from "./components/InvestorDashboard";
import ClimateAssistant from "./components/ClimateAssistant";
import ArchitectureDiagram from "./components/ArchitectureDiagram";

export default function App() {
  const [activePage, setActivePage] = useState<string>("landing");
  const [farmers, setFarmers] = useState<FarmerProfile[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch farmers list on mount from Express state store
  const fetchFarmers = async () => {
    try {
      const res = await fetch("/api/farmers");
      const data = await res.json();
      setFarmers(data);
      if (data.length > 0 && !selectedFarmerId) {
        setSelectedFarmerId(data[0].id);
      }
    } catch (err) {
      console.error("Failed to fetch farmers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  const handleRegisterSuccess = (newFarmer: FarmerProfile) => {
    setFarmers(prev => [...prev, newFarmer]);
    setSelectedFarmerId(newFarmer.id);
  };

  const handleUpdateFarmer = (updatedFarmer: FarmerProfile) => {
    setFarmers(prev => prev.map(f => f.id === updatedFarmer.id ? updatedFarmer : f));
  };

  // Safe navigation wrapper that shuts mobile menu
  const navigateTo = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-warm">
      {/* Platform Header Banner (Google I/O Grade) */}
      <div className="bg-primary-dark text-white text-[11px] py-1.5 px-4 flex justify-between items-center border-b border-primary font-mono tracking-wide">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span>Platform Host: Cloud Run Container</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span>Database: Live Escrows Active</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-accent fill-accent animate-pulse" /> API Channels: Gemini 2.5 Pro Connected
          </span>
        </div>
      </div>

      {/* Main Material Header */}
      <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-primary/5 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button 
              onClick={() => navigateTo("landing")}
              className="flex items-center gap-2 px-2 py-1.5 rounded-2xl hover:bg-primary/5 transition cursor-pointer text-left"
            >
              <span className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white text-lg shadow-md font-bold">
                🌱
              </span>
              <div>
                <span className="text-xl font-extrabold text-gray-950 font-display tracking-tight flex items-center gap-1">
                  Imbewu AI
                </span>
                <span className="block text-[10px] text-primary uppercase tracking-widest font-bold -mt-0.5">Plant the Future</span>
              </div>
            </button>

            {/* Desktop Navigation Link Tabs */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <button
                id="nav-tab-landing"
                onClick={() => navigateTo("landing")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "landing" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </button>

              <button
                id="nav-tab-register"
                onClick={() => navigateTo("register")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "register" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>Voice Register</span>
              </button>

              <button
                id="nav-tab-verify"
                onClick={() => navigateTo("verify")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "verify" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Crop Verification</span>
              </button>

              <button
                id="nav-tab-progress"
                onClick={() => navigateTo("progress")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "progress" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Funding Milestones</span>
              </button>

              <button
                id="nav-tab-investor"
                onClick={() => navigateTo("investor")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "investor" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                <span>Investor Desk</span>
              </button>

              <button
                id="nav-tab-climate"
                onClick={() => navigateTo("climate")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "climate" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <CloudSun className="w-4 h-4" />
                <span>Climate Assistant</span>
              </button>

              <button
                id="nav-tab-architecture"
                onClick={() => navigateTo("architecture")}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                  activePage === "architecture" ? "bg-primary text-white" : "text-gray-600 hover:bg-primary/5 hover:text-primary"
                }`}
              >
                <Network className="w-4 h-4" />
                <span>System Architecture</span>
              </button>
            </nav>

            {/* Mobile menu toggle button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-gray-700 hover:bg-primary/5 hover:text-primary transition cursor-pointer"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-gray-150 bg-white shadow-inner"
            >
              <div className="px-4 pt-2 pb-6 space-y-1.5 font-display">
                {[
                  { id: "landing", label: "Home Page", icon: <Home className="w-4 h-4" /> },
                  { id: "register", label: "Voice Onboarding", icon: <Mic className="w-4 h-4" /> },
                  { id: "verify", label: "Crop Verification", icon: <ShieldCheck className="w-4 h-4" /> },
                  { id: "progress", label: "Funding Milestones", icon: <Layers className="w-4 h-4" /> },
                  { id: "investor", label: "Investor Desk", icon: <TrendingUp className="w-4 h-4" /> },
                  { id: "climate", label: "Climate Assistant", icon: <CloudSun className="w-4 h-4" /> },
                  { id: "architecture", label: "System Architecture", icon: <Network className="w-4 h-4" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition flex items-center gap-3 cursor-pointer ${
                      activePage === item.id 
                        ? "bg-primary text-white" 
                        : "text-gray-700 hover:bg-primary/5 hover:text-primary"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Dynamic Viewport Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm text-gray-500 font-light">Loading Imbewu AI Escrow Engine...</p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              {activePage === "landing" && (
                <LandingPage 
                  farmers={farmers} 
                  onNavigate={navigateTo} 
                />
              )}
              {activePage === "register" && (
                <FarmerRegistration 
                  onRegisterSuccess={handleRegisterSuccess} 
                  onNavigate={navigateTo} 
                />
              )}
              {activePage === "verify" && (
                <CropVerification 
                  farmers={farmers} 
                  onUpdateFarmer={handleUpdateFarmer} 
                  onNavigate={navigateTo} 
                />
              )}
              {activePage === "progress" && (
                <FundingProgress 
                  farmers={farmers} 
                  onNavigate={navigateTo} 
                  onSelectFarmerId={setSelectedFarmerId}
                />
              )}
              {activePage === "investor" && (
                <InvestorDashboard 
                  farmers={farmers} 
                  onUpdateFarmer={handleUpdateFarmer} 
                  onNavigate={navigateTo} 
                />
              )}
              {activePage === "climate" && (
                <ClimateAssistant 
                  onNavigate={navigateTo} 
                />
              )}
              {activePage === "architecture" && (
                <ArchitectureDiagram />
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
