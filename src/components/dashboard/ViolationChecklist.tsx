"use client";

import React from "react";
import { BorderGlow } from "@/components/ui/BorderGlow";
import { ValidationCounts } from "@/types";

interface ViolationChecklistProps {
  counts: ValidationCounts;
  violations: string[];
  hasSelection: boolean;
}

export function ViolationChecklist({ counts, violations, hasSelection }: ViolationChecklistProps) {
  const rules = [
    { text: "Squad size must be exactly 7", cond: counts.size === 7 },
    { text: "Exactly 1 Goalkeeper", cond: counts.goalkeeper === 1 },
    { text: "At least 2 Defenders", cond: counts.defender >= 2 },
    { text: "At least 2 Forwards", cond: counts.forward >= 2 },
    { text: "No unavailable players", cond: !violations.some(v => v.includes("PLAYER_UNAVAILABLE")) },
    { text: "Max 4 Year 2 players", cond: counts.YEAR_2 <= 4 },
    { text: "Max 4 Year 3 players", cond: counts.YEAR_3 <= 4 },
  ];

  return (
    <BorderGlow hoverOnly={true} glowColor="conic-gradient(from 90deg at 50% 50%, #00000000 50%, #d4d4d8 100%)" className="mb-8 w-full rounded-2xl">
      <div className="p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-[15px]">
        <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Rule Checklist</h3>
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-sm flex items-center justify-center border transition-colors ${
                !hasSelection ? "border-white/20 bg-transparent" : rule.cond ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400" : "bg-rose-500/20 border-rose-500/50 text-rose-400"
              }`}>
                {rule.cond && hasSelection && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                {!rule.cond && hasSelection && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>}
              </div>
              <span className={`text-sm font-medium ${!hasSelection ? "text-zinc-500" : rule.cond ? "text-zinc-200" : "text-rose-400"}`}>
                {rule.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </BorderGlow>
  );
}
