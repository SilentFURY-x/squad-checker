"use client";

import React, { useState, useLayoutEffect, useRef } from "react";
import { Player } from "@/types";
import { PlayerCard } from "@/components/ui/PlayerCard";
import { Header } from "@/components/ui/Header";
import FloatingLines from "@/components/FloatingLines";
import { AnimatedList } from "@/components/ui/AnimatedList";
import { SquadValidator } from "@/core/validator";
import { SquadMetricsBento } from "@/components/dashboard/SquadMetricsBento";
import { ViolationChecklist } from "@/components/dashboard/ViolationChecklist";
import gsap from "gsap";

export default function DashboardClient({ players }: { players: Player[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  
  const leftItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const rightItemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const createBubbles = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement("div");
      bubble.style.position = "fixed";
      bubble.style.left = `${centerX}px`;
      bubble.style.top = `${centerY}px`;
      bubble.style.width = "8px";
      bubble.style.height = "8px";
      bubble.style.borderRadius = "50%";
      bubble.style.backgroundColor = "white"; 
      bubble.style.pointerEvents = "none";
      bubble.style.zIndex = "9999";
      bubble.style.boxShadow = "0 0 10px rgba(255,255,255,0.8)";
      document.body.appendChild(bubble);
      
      const angle = (i / 8) * Math.PI * 2;
      const distance = 40 + Math.random() * 60;
      
      gsap.to(bubble, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0.1,
        duration: 0.5 + Math.random() * 0.3,
        ease: "power2.out",
        onComplete: () => bubble.remove()
      });
    }
  };

  const handleToggleSelect = (playerId: string) => {
    if (selectedIds.includes(playerId)) {
      // Destructive animation
      const rightEl = rightItemRefs.current[playerId];
      if (rightEl) {
        createBubbles(rightEl);
        gsap.to(rightEl, {
          scale: 0.5,
          opacity: 0,
          duration: 0.3,
          ease: "back.in(1.5)",
          onComplete: () => setSelectedIds(prev => prev.filter(id => id !== playerId))
        });
      } else {
        setSelectedIds(prev => prev.filter(id => id !== playerId));
      }
    } else {
      // Add and animate flight
      setSelectedIds(prev => [...prev, playerId]);
      setJustAddedId(playerId);
    }
  };

  const handleReset = () => {
    selectedIds.forEach(id => {
      const rightEl = rightItemRefs.current[id];
      if (rightEl) {
        createBubbles(rightEl);
        gsap.to(rightEl, { scale: 0.5, opacity: 0, duration: 0.3, ease: "back.in(1.5)" });
      }
    });
    setTimeout(() => setSelectedIds([]), 300);
  };

  const handleSample = () => {
    handleReset();
    setTimeout(() => {
      const sampleIds = ["S01", "S02", "S03", "S04", "S05", "S06", "S07"];
      setSelectedIds(sampleIds);
      setJustAddedId("SAMPLE");
    }, 350);
  };

  // Flight Animations
  useLayoutEffect(() => {
    if (!justAddedId) return;

    const animateFlight = (id: string, delay: number = 0) => {
      const leftEl = leftItemRefs.current[id];
      const rightEl = rightItemRefs.current[id];
      if (leftEl && rightEl) {
        const leftRect = leftEl.getBoundingClientRect();
        const rightRect = rightEl.getBoundingClientRect();
        const xOffset = leftRect.left - rightRect.left;
        const yOffset = leftRect.top - rightRect.top;
        
        gsap.fromTo(rightEl, 
          { x: xOffset, y: yOffset, scale: 0.8, opacity: 0.2 },
          { x: 0, y: 0, scale: 1, opacity: 1, duration: 0.6, delay, ease: "back.out(1.2)" }
        );
      }
    };

    if (justAddedId === "SAMPLE") {
      selectedIds.forEach((id, i) => animateFlight(id, i * 0.05));
    } else {
      animateFlight(justAddedId);
    }
    
    setJustAddedId(null);
  }, [selectedIds, justAddedId]);

  const validation = SquadValidator.validate(players, selectedIds);
  const isValid = validation.status === "VALID";
  const selectedPlayers = players.filter((p) => selectedIds.includes(p.PlayerID));

  return (
    <div className="relative h-screen w-screen flex flex-col bg-black text-white">
      <div className="absolute inset-0 z-0">
        <FloatingLines
          linesGradient={["#06B6D4", "#6f6f6f", "#6a6a6a"]}
          enabledWaves={["top", "bottom"]}
          animationSpeed={1}
          interactive
          bendRadius={8}
          bendStrength={-2}
          mouseDamping={0.05}
          parallax
          parallaxStrength={0.2}
          mixBlendMode="normal"
        />
      </div>

      <Header onReset={handleReset} onSample={handleSample} />

      <div className="z-10 flex-1 w-full px-6 md:px-12 lg:px-24 pt-32 pb-6 flex flex-col lg:flex-row gap-8 lg:gap-16 h-[calc(100vh)] overflow-hidden">
        
        {/* LEFT SECTION: Roster List */}
        <section className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between mb-6 pl-4 shrink-0">
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Roster</h2>
            <span className="text-sm font-bold text-zinc-400 px-3 py-1 bg-white/5 rounded-md border border-white/10 shadow-sm">
              {players.length} Total
            </span>
          </div>
          
          {/* Increased top padding (pt-12) so items rest below the shadow mask by default */}
          <div 
            className="flex-1 overflow-y-auto scrollbar-minimal pb-20 pt-6"
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)" }}
          >
            <AnimatedList>
              {players.map((player) => (
                <div 
                  key={player.PlayerID} 
                  ref={(el) => { leftItemRefs.current[player.PlayerID] = el; }}
                >
                  <PlayerCard 
                    player={player}
                    isSelected={selectedIds.includes(player.PlayerID)}
                    onToggleSelect={handleToggleSelect}
                    isRightPanel={false}
                  />
                </div>
              ))}
            </AnimatedList>
          </div>
        </section>

        {/* RIGHT SECTION: Validation Dashboard */}
        <section className="w-full lg:w-1/2 flex flex-col h-full overflow-hidden">
          
          {/* Status Banner */}
          <div className={`shrink-0 mb-6 w-full rounded-2xl border px-6 py-4 flex items-center justify-between shadow-2xl backdrop-blur-xl transition-colors duration-500 ${
            selectedIds.length === 0 ? "bg-zinc-900/50 border-white/10" 
            : isValid ? "bg-emerald-950/40 border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]" 
            : "bg-rose-950/40 border-rose-500/50 shadow-[0_0_30px_rgba(244,63,94,0.15)]"
          }`}>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Squad Status</p>
              <h2 className={`text-2xl font-black tracking-tight ${selectedIds.length === 0 ? "text-white" : isValid ? "text-emerald-400" : "text-rose-400"}`}>
                {selectedIds.length === 0 ? "AWAITING SELECTION" : isValid ? "SQUAD VALID" : "INVALID FORMATION"}
              </h2>
            </div>
            {selectedIds.length > 0 && (
               <div className={`h-12 w-12 rounded-full border-2 flex items-center justify-center transition-colors ${isValid ? "border-emerald-500 text-emerald-500" : "border-rose-500 text-rose-500"}`}>
                 {isValid ? (
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                 ) : (
                   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                 )}
               </div>
            )}
          </div>

          <div 
            className="flex-1 overflow-y-auto scrollbar-minimal pb-20 pt-6" 
            style={{ maskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)" }}
          >
            {/* Bento Grid Metrics extracted to component */}
            <SquadMetricsBento counts={validation.counts} />

            {/* Rule Checklist extracted to component */}
            <ViolationChecklist counts={validation.counts} violations={validation.violations} hasSelection={selectedIds.length > 0} />

            {/* Selected Players */}
            <div className="flex flex-col gap-3 min-h-[400px]">
              {selectedPlayers.map((player) => (
                <div 
                  key={player.PlayerID} 
                  ref={(el) => { rightItemRefs.current[player.PlayerID] = el; }}
                >
                  <PlayerCard 
                    player={player}
                    isSelected={true}
                    onToggleSelect={handleToggleSelect}
                    isRightPanel={true}
                  />
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
