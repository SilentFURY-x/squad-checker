"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AnimatedListProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedList({ children, className = "" }: AnimatedListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Select all direct children (PlayerCard wrappers)
    if (!containerRef.current) return;
    const items = gsap.utils.toArray(containerRef.current.children);
    
    // Animate items staggering in
    gsap.fromTo(
      items,
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.2)",
      }
    );
  }, { scope: containerRef, dependencies: [] }); 
  // Empty dependency array means it only staggers on the initial mount. 
  // If the list completely changes, we can add dependencies, but for now we'll do mount only.

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return null;
        
        // Wrap each child in a div so GSAP can target it easily without interfering with child refs
        return (
          <div className="mb-3 opacity-0" key={child.key || index}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
