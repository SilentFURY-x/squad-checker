"use client";

import React, { useRef, useState, useEffect } from "react";

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  hoverOnly?: boolean;
}

export function BorderGlow({
  children,
  className = "",
  glowColor = "conic-gradient(from 90deg at 50% 50%, #00000000 50%, #06b6d4 100%)", // Dynamic cyan default
  hoverOnly = false,
}: BorderGlowProps) {
  const [isHovered, setIsHovered] = useState(!hoverOnly);

  useEffect(() => {
    if (!hoverOnly) setIsHovered(true);
  }, [hoverOnly]);

  return (
    <div
      onMouseEnter={() => hoverOnly && setIsHovered(true)}
      onMouseLeave={() => hoverOnly && setIsHovered(false)}
      className={`relative rounded-2xl overflow-hidden p-[1px] group transition-transform duration-300 ${className}`}
    >
      {/* Background container for the border effect */}
      <div className="absolute inset-0 z-0 bg-white/5 rounded-2xl" />

      {/* The Conic Gradient Glow */}
      <div
        className={`absolute -inset-[100%] z-0 rounded-full pointer-events-none transition-opacity duration-500 ease-in-out ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: glowColor,
          animation: "spin 4s linear infinite",
        }}
      />

      {/* Inner Content - Masks the middle of the glow leaving only the border */}
      <div className="relative z-10 w-full h-full bg-zinc-950 rounded-[15px] overflow-hidden backdrop-blur-xl">
        {children}
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
}
