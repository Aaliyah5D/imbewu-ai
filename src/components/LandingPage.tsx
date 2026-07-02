import React from "react";
import { motion } from "motion/react";
import { 
  Mic, 
  ShieldCheck, 
  TrendingUp, 
  CloudSun, 
  ArrowRight, 
  Globe, 
  Users, 
  Leaf, 
  Award,
  CircleDollarSign,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";
import { FarmerProfile } from "../types";

interface LandingPageProps {
  farmers: FarmerProfile[];
  onNavigate: (page: string) => void;
}

export default function LandingPage({ farmers, onNavigate }: LandingPageProps) {
  // Compute real-time stats from current backend list
  const totalFarmersSupported = farmers.length + 12400; // adding baseline mock offset
  const totalFundingNeeded = farmers.reduce((acc, f) => acc + f.fundingNeeded, 0);
  const totalFundingRaised = farmers.reduce((acc, f) => acc + f.fundingRaised, 0);
  const formattedRaised = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(totalFundingRaised + 4280000); // with baseline offset

  const verifiedCount = farmers.filter(f => f.milestones.some(m => m.completed && m.imageVerified)).length;
  const verificationRate = (((verifiedCount + 12050) / (farmers.length + 12100)) * 100).toFixed(1);

  return (
    <div id="landing-container" className="min-h-screen bg-bg-warm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-1.5 rounded-full text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Google Cloud & Gemini Buildathon Entry</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-none">
                Plant the Future. <br />
                <span className="text-primary">Fund Farmers.</span> <br />
                Grow Together.
              </h1>
              
              <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Millions of smallholder farmers across Africa lack collateral but possess fertile land and expertise. 
                <strong className="font-semibold text-primary"> Imbewu AI</strong> bridging the credit-trust gap using Google Gemini Voice Onboarding and Crop Stage Verification.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  id="btn-hero-register"
                  onClick={() => onNavigate("register")}
                  className="inline-flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-2xl text-white bg-primary hover:bg-primary-dark shadow-md hover:shadow-lg transition-all gap-2 group cursor-pointer"
                >
                  <Mic className="w-5 h-5" />
                  <span>Onboard via Voice</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  id="btn-hero-investor"
                  onClick={() => onNavigate("investor")}
                  className="inline-flex items-center justify-center px-6 py-3.5 border-2 border-primary/20 text-base font-semibold rounded-2xl text-primary hover:bg-primary/5 transition-all gap-2 cursor-pointer"
                >
                  <TrendingUp className="w-5 h-5" />
                  <span>Investor Dashboard</span>
                </button>
              </div>
            </div>

            {/* Hero Image Block */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary-light to-accent rounded-[32px] blur-xl opacity-30 -z-10 animate-pulse-slow" />
              <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-2xl aspect-[4/3] sm:aspect-video lg:aspect-[4/5] xl:aspect-[1/1]">
                <img 
                  src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=800" 
                  alt="African smallholder farmers inspecting crops together in unity" 
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-sm font-medium opacity-90">Cooperative farming near KwaZulu-Natal</p>
                    <p className="text-xs opacity-70">Verified 100% Carbon-Efficient Soil Prep</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Platform Impact Stats */}
      <section className="bg-white border-y border-primary/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
            <div id="stat-farmers" className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary font-display">
                {totalFarmersSupported.toLocaleString()}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Users className="w-4 h-4 text-primary" /> Farmers Supported
              </p>
            </div>
            <div id="stat-funding" className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary font-display">
                {formattedRaised}
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <CircleDollarSign className="w-4 h-4 text-primary" /> Funding Unlocked
              </p>
            </div>
            <div id="stat-verified" className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-primary font-display">
                {verificationRate}%
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" /> AI Crop Verification
              </p>
            </div>
            <div id="stat-alerts" className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-accent-dark font-display">
                3 Active
              </p>
              <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <CloudSun className="w-4 h-4 text-accent-dark" /> Climate Advisory Alerts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Core Google Gemini Tech Capabilities */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              An AI-Powered Bridge Built on Trust
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              We leverage Google's premier AI technology to eliminate the complexity of paperwork and give international funders complete, verified visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Capability 1 */}
            <div 
              id="feature-card-voice"
              onClick={() => onNavigate("register")}
              className="material-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mic className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  Voice-First Registration
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  No typing or complex paperwork required. Rural farmers onboard naturally by talking to Google Gemini in their native language.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>Start Voice Setup</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Capability 2 */}
            <div 
              id="feature-card-vision"
              onClick={() => onNavigate("verify")}
              className="material-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  AI Crop Verification
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Farmers snap crop photos. Gemini Vision immediately processes leaf condition, growth stage, and verifies milestones without costly manual field audits.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>Analyze Crop Photo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Capability 3 */}
            <div 
              id="feature-card-climate"
              onClick={() => onNavigate("climate")}
              className="material-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <CloudSun className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  Climate Assistant
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Tailored conversational warnings and actionable tips generated by Gemini to proactively help farmers safeguard crops against droughts or pests.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>Talk to Assistant</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Capability 4 */}
            <div 
              id="feature-card-investor"
              onClick={() => onNavigate("investor")}
              className="material-card p-6 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                  Funder Transparency
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-light">
                  Investors can view real-time visual proof of growth stages, verification stamps, and localized risk profiles, creating unmatched credit confidence.
                </p>
              </div>
              <div className="pt-6 flex items-center gap-1.5 text-xs font-semibold text-primary">
                <span>Open Investor Desk</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Scalability & Startup Potential Pitch */}
      <section className="bg-primary/5 py-20 border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-primary flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary animate-bounce" /> Hackathon Commercial Scalability Outline
              </span>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
                How Imbewu AI Becomes a Real High-Yield Startup
              </h2>
              <p className="text-gray-600 font-light leading-relaxed">
                We are not just presenting a visual toy—Imbewu solves a highly lucrative structural funding crisis. Our revenue framework scales across three core commercial pillars:
              </p>
              
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Platform Escrow Fee (2.5%)</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      A marginal convenience commission applied strictly to successful funding disbursements managed securely via milestone payouts.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Institutional SaaS & Underwriting API</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      We license our customized, fine-tuned agronomic Gemini Vision underwriting scorecards to traditional African commercial banks and insurance companies.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">NGO & Cooperative White-Label</h4>
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      White-labeled agricultural oversight portals offered to government departments and NGOs looking to trace developmental fund impacts.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map/Process graphics */}
            <div className="bg-white rounded-3xl p-8 border border-primary/10 shadow-lg space-y-6">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-4">
                <Briefcase className="w-5 h-5 text-primary" /> Multi-Year Growth Roadmap
              </h3>
              
              <div className="relative border-l-2 border-primary/20 ml-4 space-y-8 pb-2">
                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white shadow" />
                  <span className="text-xs font-semibold text-primary uppercase">Phase 1: Seed Onboarding (Months 1-6)</span>
                  <h4 className="font-bold text-sm text-gray-900">Voice-to-Form & Vision Core</h4>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Onboard 5,000 smallholders across KwaZulu-Natal and Limpopo through localized radio-sponsored voice campaigns.
                  </p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary-light border-4 border-white shadow" />
                  <span className="text-xs font-semibold text-primary uppercase">Phase 2: Micro-Escrows (Months 6-18)</span>
                  <h4 className="font-bold text-sm text-gray-900">Institutional Escrows & Banking Hooks</h4>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Partner with 3 local agricultural cooperatives and micro-finance banks to distribute R15,000,000 in micro-advances.
                  </p>
                </div>

                <div className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-accent border-4 border-white shadow" />
                  <span className="text-xs font-semibold text-accent-dark uppercase">Phase 3: Sat-Imagery Integration (Month 18+)</span>
                  <h4 className="font-bold text-sm text-gray-900">Google Earth Engine Automation</h4>
                  <p className="text-xs text-gray-500 font-light mt-1">
                    Integrate Sentinel satellite moisture and chlorophyll indexes with Gemini Vision validation to expand nationwide.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aesthetic Call-to-Action */}
      <section className="py-20 bg-primary relative text-white text-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-light/30 via-transparent to-transparent opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative">
          <Leaf className="w-12 h-12 mx-auto text-accent animate-bounce" />
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">
            Ready to Seed the Future?
          </h2>
          <p className="text-primary-light text-lg max-w-xl mx-auto font-light">
            Whether you are a rural smallholder ready to scale or an agricultural funder seeking complete crop clarity, Imbewu AI is your trusted partner.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button 
              id="cta-bottom-register"
              onClick={() => onNavigate("register")}
              className="px-8 py-3.5 bg-accent hover:bg-accent-dark text-gray-900 font-bold rounded-2xl transition shadow-lg hover:shadow-xl cursor-pointer"
            >
              Get Started as Farmer
            </button>
            <button 
              id="cta-bottom-investor"
              onClick={() => onNavigate("investor")}
              className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl transition border border-white/20 cursor-pointer"
            >
              Access Investor Desk
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-800">
            <div className="space-y-4">
              <span className="text-white text-xl font-bold font-display tracking-wider flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm">🌱</span>
                Imbewu AI
              </span>
              <p className="text-sm font-light leading-relaxed">
                Empowering smallholder communities, removing financial friction, and engineering climate-resilient micro-credit infrastructures.
              </p>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Google Technologies</h4>
              <ul className="space-y-2 text-sm font-light">
                <li>Google AI Studio & Gemini 2.5</li>
                <li>Gemini Vision (Multimodal Verification)</li>
                <li>Google Cloud Run Containers</li>
                <li>Firebase Cloud Storage & Firestore</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Africa Footprint</h4>
              <p className="text-sm font-light">
                Active pilot centers across KwaZulu-Natal, Limpopo, Free State, and Mpumalanga.
              </p>
              <p className="text-xs text-primary-light mt-2 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5" /> Over 12,000 hectares monitored.
              </p>
            </div>
          </div>
          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <span>&copy; {new Date().getFullYear()} Imbewu AI (Pty) Ltd. Built for Google Buildathon. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">Platform Status: Live</a>
              <a href="#" className="hover:text-white transition">Security Rules: Active</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
