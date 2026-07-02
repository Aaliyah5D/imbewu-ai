import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  CheckCircle, 
  Clock, 
  HelpCircle, 
  ArrowRight, 
  Coins, 
  Sparkles,
  Users,
  Eye,
  Camera,
  Layers,
  ShieldAlert
} from "lucide-react";
import { FarmerProfile, Milestone } from "../types";

interface FundingProgressProps {
  farmers: FarmerProfile[];
  onNavigate: (page: string) => void;
  onSelectFarmerId?: (id: string) => void;
}

export default function FundingProgress({ farmers, onNavigate, onSelectFarmerId }: FundingProgressProps) {
  const [selectedFarmerId, setSelectedFarmerId] = useState(farmers[0]?.id || "");

  const selectedFarmer = farmers.find(f => f.id === selectedFarmerId);

  if (!selectedFarmer) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-gray-500">
        <Users className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <h3 className="font-bold text-lg">No Farmers Registered Yet</h3>
        <p className="text-sm font-light">Onboard a farmer via the voice assistant first.</p>
      </div>
    );
  }

  // Compute stats
  const totalFunding = selectedFarmer.fundingNeeded;
  const fundingRaised = selectedFarmer.fundingRaised;
  const percentage = Math.round((fundingRaised / totalFunding) * 100);

  const formattedRaised = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(fundingRaised);

  const formattedTotal = new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0
  }).format(totalFunding);

  return (
    <div id="funding-progress-view" className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-3 mb-10">
        <span className="bg-primary/10 text-primary border border-primary/20 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" /> Smart Micro-Escrow Ledgers
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Milestone Funding Progress
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-light">
          Imbewu AI manages investor funding through intelligent, visual escrows. Funds are not released in one risky lump sum. Instead, each agricultural milestone triggers automated partial disbursements.
        </p>
      </div>

      {/* Selector bar */}
      <div className="bg-white rounded-3xl p-5 border border-primary/10 shadow-md flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
        <div className="flex items-center gap-3">
          <img 
            src={selectedFarmer.avatarUrl} 
            alt={selectedFarmer.name} 
            className="w-12 h-12 rounded-2xl object-cover border-2 border-primary/10" 
          />
          <div>
            <h3 className="font-bold text-gray-900 text-base">{selectedFarmer.name}</h3>
            <p className="text-xs text-gray-500 font-light">{selectedFarmer.crop} • {selectedFarmer.location}</p>
          </div>
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <select
            id="progress-farmer-select"
            value={selectedFarmerId}
            onChange={(e) => setSelectedFarmerId(e.target.value)}
            className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary font-medium flex-1 sm:flex-initial"
          >
            {farmers.map(f => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Bar & Financial Summary */}
      <div className="bg-white rounded-[32px] p-6 sm:p-8 border border-primary/10 shadow-lg space-y-6 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Disbursement Progress</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-primary font-mono">{formattedRaised}</span>
              <span className="text-sm text-gray-400 font-light">released of {formattedTotal}</span>
            </div>
          </div>
          <div className="bg-primary/10 text-primary font-bold px-4 py-2 rounded-2xl text-sm font-mono flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-accent animate-pulse" /> {percentage}% Funded
          </div>
        </div>

        {/* Linear Progress bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden relative border border-gray-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-primary h-full rounded-full"
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 font-light">
            <span>0% (Onboarded)</span>
            <span>Current stage: <strong className="font-bold text-primary">{selectedFarmer.status}</strong></span>
            <span>100% (Harvest Complete)</span>
          </div>
        </div>
      </div>

      {/* Milestone Cards Timeline Grid */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
          <Coins className="w-5 h-5 text-primary" /> Milestone Escrow Ledger Entries
        </h3>

        <div className="relative border-l-2 border-primary/10 ml-5 pl-8 space-y-8">
          {selectedFarmer.milestones.map((milestone, idx) => {
            const isCompleted = milestone.completed;
            const isCurrent = !isCompleted && (idx === 0 || selectedFarmer.milestones[idx - 1]?.completed);
            
            return (
              <div key={milestone.id} className="relative">
                {/* Timeline node icon */}
                <span className={`absolute -left-[45px] top-1 w-8 h-8 rounded-full flex items-center justify-center border-4 border-bg-warm shadow ${
                  isCompleted 
                    ? "bg-primary text-white" 
                    : isCurrent 
                      ? "bg-accent text-gray-900 ring-4 ring-accent/15" 
                      : "bg-gray-100 text-gray-400"
                }`}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4 animate-spin" />
                  ) : (
                    <HelpCircle className="w-4 h-4" />
                  )}
                </span>

                {/* Milestone Detail Card */}
                <div className={`rounded-2xl p-5 sm:p-6 border transition-all ${
                  isCompleted 
                    ? "bg-white border-primary/10 hover:border-primary/20" 
                    : isCurrent 
                      ? "bg-white border-accent ring-2 ring-accent/10" 
                      : "bg-white/50 border-gray-100 opacity-70"
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-100 pb-4 mb-4">
                    <div>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isCompleted 
                          ? "bg-primary/10 text-primary" 
                          : isCurrent 
                            ? "bg-accent/20 text-accent-dark" 
                            : "bg-gray-100 text-gray-500"
                      }`}>
                        Stage {idx + 1}: {milestone.stage}
                      </span>
                      <h4 className="font-bold text-gray-900 text-base mt-1">{milestone.title}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 font-light">Funds Released</p>
                      <p className="font-bold text-primary font-mono text-sm">R{milestone.fundsReleased.toLocaleString()}</p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Attachment thumbnails and CTAs */}
                  {isCompleted && (
                    <div className="mt-4 flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
                      {selectedFarmer.images[idx] ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                          <img 
                            src={selectedFarmer.images[idx]} 
                            alt="Milestone proof photo" 
                            className="object-cover w-full h-full"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] bg-gray-50 border border-gray-200 text-gray-500 px-2 py-1 rounded">No photo uploaded</span>
                      )}
                      <span className="text-xs text-primary font-bold flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5" /> Checked & Dispatched to Escrow Ledger
                      </span>
                    </div>
                  )}

                  {isCurrent && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-accent/20">
                      <div className="flex items-center gap-1.5 text-xs text-accent-dark font-semibold">
                        <ShieldAlert className="w-4 h-4 animate-bounce" /> Action Required: Upload Visual Verification
                      </div>
                      <button
                        onClick={() => {
                          if (onSelectFarmerId) onSelectFarmerId(selectedFarmer.id);
                          onNavigate("verify");
                        }}
                        className="inline-flex items-center gap-1 bg-accent hover:bg-accent-dark text-gray-900 px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Scan Photo</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
