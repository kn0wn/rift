"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRive, useStateMachineInput } from '@rive-app/react-canvas';

interface EnhancedScrollRiveAnimationProps {
  src: string;
  stateMachineName: string;
  inputName?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  // Enhanced scroll control options
  scrollSections?: number; // Number of sections to divide scroll into (default: 3)
  sectionThresholds?: number[]; // Custom thresholds for each section (e.g., [33.33, 66.66])
  debugMode?: boolean; // Show debug information
}

export default function EnhancedScrollRiveAnimation({
  src,
  stateMachineName,
  inputName = 'scroll',
  className = '',
  style = {},
  children,
  scrollSections = 3,
  sectionThresholds,
  debugMode = false
}: EnhancedScrollRiveAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const { rive, RiveComponent } = useRive({
    src,
    stateMachines: stateMachineName,
    autoplay: true,
  });

  // Get reference to your scroll input
  const scrollInput = useStateMachineInput(rive, stateMachineName, inputName);

  // Calculate section thresholds
  const thresholds = sectionThresholds || 
    Array.from({ length: scrollSections - 1 }, (_, i) => 
      ((i + 1) / scrollSections) * 100
    );

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollInput || !containerRef.current) return;

      // Get the container's position and dimensions
      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress as percentage (0 to 100)
      let scrollPercent = 0;
      
      if (containerTop <= windowHeight && containerTop + containerHeight >= 0) {
        // Container is in viewport
        const visibleTop = Math.max(0, -containerTop);
        const visibleHeight = Math.min(containerHeight, windowHeight - Math.max(0, containerTop));
        scrollPercent = (visibleTop / containerHeight) * 100;
        
        // Clamp between 0 and 100
        scrollPercent = Math.max(0, Math.min(100, scrollPercent));
      } else if (containerTop < 0) {
        // Container is above viewport (scrolled past)
        scrollPercent = 100;
      }

      // Determine current section based on thresholds
      let newSection = 0;
      for (let i = 0; i < thresholds.length; i++) {
        if (scrollPercent >= thresholds[i]) {
          newSection = i + 1;
        }
      }

      // Update state
      setScrollProgress(scrollPercent);
      setCurrentSection(newSection);

      // Update the Rive state machine input
      scrollInput.value = scrollPercent;

      // Debug logging
      if (debugMode) {
        console.log(`Scroll: ${scrollPercent.toFixed(2)}%, Section: ${newSection + 1}/${scrollSections}`);
      }
    };

    // Add scroll event listener with passive option for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set the correct state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollInput, thresholds, scrollSections, debugMode]);

  return (
    <div 
      ref={containerRef}
      className={`relative ${className}`}
      style={style}
    >
      <RiveComponent className="w-full h-full" />
      
      {/* Debug information overlay */}
      {debugMode && (
        <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white p-2 rounded text-sm font-mono">
          <div>Scroll: {scrollProgress.toFixed(1)}%</div>
          <div>Section: {currentSection + 1}/{scrollSections}</div>
          <div>Thresholds: {thresholds.map(t => t.toFixed(1)).join(', ')}</div>
        </div>
      )}
      
      {children}
    </div>
  );
}
