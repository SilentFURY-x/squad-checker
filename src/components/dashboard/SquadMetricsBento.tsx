"use client";

import React from "react";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { ValidationCounts } from "@/types";

interface MetricsBentoProps {
  counts: ValidationCounts;
}

export function SquadMetricsBento({ counts }: MetricsBentoProps) {
  return (
    <div className="grid grid-cols-4 grid-rows-2 gap-3 mb-8 h-[220px]">
      
      {/* Total Squad Size - Large Bento Block (Spans 2 cols, 2 rows) */}
      <div className="col-span-2 row-span-2 group">
        <BorderGlow hoverOnly={false} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #10b981 100%)" className="w-full h-full rounded-[2rem]">
          <div className="flex flex-col justify-center items-center h-full p-6 text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[31px]">
            <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-2">Total Size</span>
            <div className="flex items-baseline space-x-2">
              <span className={`text-7xl font-black tracking-tighter ${counts.size === 7 ? "text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" : "text-white"}`}>
                {counts.size}
              </span>
              <span className="text-2xl text-zinc-600 font-bold">/ 7</span>
            </div>
          </div>
        </BorderGlow>
      </div>

      {/* Cohorts (Stack on top of each other) */}
      <div className="col-span-1 row-span-1 group">
        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #f43f5e 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full px-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Year 2</span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-2xl font-black text-white">{counts.YEAR_2}</span>
              <span className="text-[10px] font-bold text-zinc-500">/ 4 max</span>
            </div>
          </div>
        </BorderGlow>
      </div>

      <div className="col-span-1 row-span-1 group">
        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #f43f5e 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full px-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Year 3</span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-2xl font-black text-white">{counts.YEAR_3}</span>
              <span className="text-[10px] font-bold text-zinc-500">/ 4 max</span>
            </div>
          </div>
        </BorderGlow>
      </div>

      {/* Positions */}
      <div className="col-span-2 row-span-1 grid grid-cols-4 gap-3">
        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #eab308 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[9px] font-bold text-zinc-400 uppercase">GK</span>
            <span className="text-lg font-black text-white">{counts.goalkeeper}</span>
          </div>
        </BorderGlow>
        
        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #10b981 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[9px] font-bold text-zinc-400 uppercase">DEF</span>
            <span className="text-lg font-black text-white">{counts.defender}</span>
          </div>
        </BorderGlow>

        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #f43f5e 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[9px] font-bold text-zinc-400 uppercase">FWD</span>
            <span className="text-lg font-black text-white">{counts.forward}</span>
          </div>
        </BorderGlow>

        <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #3b82f6 100%)" className="w-full h-full rounded-2xl">
          <div className="flex flex-col justify-center h-full text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
            <span className="text-[9px] font-bold text-zinc-400 uppercase">UTL</span>
            <span className="text-lg font-black text-white">{counts.utility}</span>
          </div>
        </BorderGlow>
      </div>
      
    </div>
  );
}
