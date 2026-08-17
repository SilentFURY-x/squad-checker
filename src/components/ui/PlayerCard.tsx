"use client";

import React from "react";
import { Player } from "@/types";
import { BorderGlow } from "./BorderGlow";
import { User, Shield, Zap, Goal, Activity } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  isRightPanel?: boolean;
}

export function PlayerCard({ player, isSelected, onToggleSelect, isRightPanel = false }: PlayerCardProps) {
  const getPositionIcon = (pos: string) => {
    switch (pos) {
      case "GOALKEEPER": return <User className="w-3 h-3" />;
      case "DEFENDER": return <Shield className="w-3 h-3" />;
      case "FORWARD": return <Goal className="w-3 h-3" />;
      case "UTILITY": return <Zap className="w-3 h-3" />;
      default: return <Activity className="w-3 h-3" />;
    }
  };

  const getPositionColor = (pos: string) => {
    switch (pos) {
      case "GOALKEEPER": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "DEFENDER": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "FORWARD": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      case "UTILITY": return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      default: return "text-zinc-400 bg-zinc-400/10 border-zinc-400/20";
    }
  };

  const isAvailable = player.Availability === "AVAILABLE";
  const avatarUrl = `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(player.Student || player.PlayerID)}&backgroundColor=18181b`;

  // If in left panel and selected, dim it. If in right panel, never dim it.
  const opacityClass = !isRightPanel && isSelected ? "opacity-40" : "opacity-100";

  return (
    <div className={`transition-opacity duration-300 ${opacityClass}`} onClick={() => onToggleSelect(player.PlayerID)}>
      <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #d4d4d8 100%)" className="w-full cursor-pointer rounded-2xl group">
        <div className="flex items-center justify-between p-3 bg-zinc-950 hover:bg-[#0c0c0e] transition-colors rounded-[15px]">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src={avatarUrl} alt={player.Student} className="w-10 h-10 rounded-xl object-cover ring-1 ring-white/10" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-zinc-500">{player.PlayerID}</span>
                <h3 className="text-sm font-bold text-zinc-100">{player.Student}</h3>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center space-x-1 ${getPositionColor(player.Position)}`}>
                  {getPositionIcon(player.Position)}
                  <span>{player.Position}</span>
                </span>
                <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-white/5">
                  Year {player.Cohort.replace("YEAR_", "")}
                </span>
                {!isAvailable && (
                  <span className="text-[10px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded border border-rose-400/20">
                    Unavailable
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            {/* The Checkmark logic */}
            <div className={`w-6 h-6 rounded-md flex items-center justify-center transition-all duration-300 border ${
              isSelected 
                ? "bg-emerald-500 border-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                : "bg-white/5 border-white/10 text-transparent"
            }`}>
              <svg className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "scale-100" : "scale-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}
