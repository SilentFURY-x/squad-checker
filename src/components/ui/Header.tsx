"use client";

import React from "react";
import { BorderGlow } from "./BorderGlow";

export function Header({ onReset, onSample }: { onReset: () => void; onSample: () => void }) {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-7xl">
      <BorderGlow hoverOnly={true} glowColor="rgba(255,255,255,0.4)">
        <div className="flex items-center justify-between px-8 py-4 bg-zinc-950">
          
          {/* Left Side: Title */}
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-black text-white tracking-tight uppercase">
              Squad Up
            </h1>
            
            <div className="h-5 w-px bg-white/10"></div>
            
            {/* Status Dot */}
            <div className="flex items-center space-x-2 bg-zinc-900/80 px-3 py-1.5 rounded-md border border-white/5">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-zinc-300 text-[10px] font-bold uppercase tracking-wider">Online</span>
            </div>
          </div>

          {/* Right Side: Controls & Socials */}
          <div className="flex items-center space-x-4">
            
            {/* Controls */}
            <button onClick={onReset} className="w-24 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-700 hover:scale-105 active:scale-95 py-2.5 rounded-lg transition-all duration-300 border border-white/10 shadow-sm hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              Reset
            </button>
            <button onClick={onSample} className="w-24 text-xs font-bold text-black bg-white hover:bg-zinc-200 hover:scale-105 active:scale-95 py-2.5 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)]">
              Sample
            </button>

            <div className="h-6 w-px bg-white/10 mx-2"></div>

            {/* High Quality GitHub Logo */}
            <a
              href="https://github.com/SilentFURY-x/squad-checker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-white transition-all duration-300 flex items-center justify-center p-2 rounded-full hover:bg-white/10 hover:scale-110 active:scale-95"
            >
              <svg 
                className="w-6 h-6 drop-shadow-md" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </BorderGlow>
    </header>
  );
}
