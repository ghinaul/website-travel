/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function DarunnajahLogo({ variant = 'light', size = 'md', className = '' }: LogoProps) {
  // Determine dimensions based on size
  let iconSize = 'h-10 w-10';
  let titleSize = 'text-xl';
  let subtitleSize = 'text-[9px]';
  let tagSize = 'text-xs';

  if (size === 'sm') {
    iconSize = 'h-8 w-8';
    titleSize = 'text-lg';
    subtitleSize = 'text-[8px]';
    tagSize = 'text-[10px]';
  } else if (size === 'lg') {
    iconSize = 'h-14 w-14';
    titleSize = 'text-3xl';
    subtitleSize = 'text-xs';
    tagSize = 'text-sm';
  } else if (size === 'xl') {
    iconSize = 'h-24 w-24';
    titleSize = 'text-5xl';
    subtitleSize = 'text-base';
    tagSize = 'text-lg';
  }

  // The custom high-fidelity SVG representation of the official Darunnajah leaf-and-crescent logo
  const LogoIcon = () => (
    <svg
      viewBox="0 0 400 400"
      className={`${iconSize} shrink-0 transition-all duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main tall leaf gradient (emerald-600 to green-400) */}
        <linearGradient id="mainLeafGrad" x1="120" y1="50" x2="300" y2="350" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22c55e" />     {/* green-500 */}
          <stop offset="50%" stopColor="#16a34a" />    {/* green-600 */}
          <stop offset="100%" stopColor="#15803d" />   {/* green-700 */}
        </linearGradient>

        {/* Inner secondary leaf gradient (light green to dark green) */}
        <linearGradient id="innerLeafGrad" x1="100" y1="180" x2="250" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ade80" />     {/* green-400 */}
          <stop offset="100%" stopColor="#166534" />   {/* green-800 */}
        </linearGradient>

        {/* Lower crescent gradient (yellow to lime-green) */}
        <linearGradient id="crescentGrad" x1="50" y1="250" x2="250" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#eab308" />     {/* yellow-500 */}
          <stop offset="50%" stopColor="#84cc16" />    {/* lime-500 */}
          <stop offset="100%" stopColor="#22c55e" />   {/* green-500 */}
        </linearGradient>
      </defs>

      {/* 1. Main elegant tall leaf (tilts left and drops down) */}
      <path
        d="M50,75 C45,55 60,65 140,150 C240,256 260,300 160,340 C110,360 80,310 80,220 C80,200 70,140 50,75 Z"
        fill="url(#mainLeafGrad)"
      />

      {/* 2. Inner contrasting leaf/fold that overlaps */}
      <path
        d="M80,225 C80,180 140,200 220,280 C260,320 230,350 160,340 C120,335 110,290 80,225 Z"
        fill="url(#innerLeafGrad)"
        stroke="#ffffff"
        strokeWidth="6"
        strokeLinejoin="round"
      />

      {/* 3. The bottom-cradling crescent shape */}
      <path
        d="M50,270 C50,340 100,380 170,380 C240,380 300,310 280,250 C290,300 240,350 170,350 C110,350 63,310 50,270 Z"
        fill="url(#crescentGrad)"
      />
    </svg>
  );

  if (variant === 'icon-only') {
    return <LogoIcon />;
  }

  // Text color based on light or dark variant
  const titleColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const subtitleColor = variant === 'dark' ? 'text-emerald-300' : 'text-emerald-600';
  const motoColor = variant === 'dark' ? 'text-emerald-200/70' : 'text-slate-500';

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Dynamic Animated Logo Icon */}
      <div className="transform hover:scale-105 active:scale-95 transition-all duration-300">
        <LogoIcon />
      </div>

      {/* Typography block */}
      <div className="flex flex-col">
        {/* Brand Main Name - serif style to match official look */}
        <h1 
          className={`${titleSize} font-bold tracking-tight font-serif ${titleColor} leading-none`}
          style={{ fontFamily: 'Georgia, "Playfair Display", serif', letterSpacing: '-0.02em' }}
        >
          Darunnajah
        </h1>
        {/* Subtitle - sans-serif uppercase tracking green */}
        <div 
          className={`${tagSize} font-semibold uppercase tracking-[0.16em] ${subtitleColor} leading-tight mt-1`}
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Tours & Travel
        </div>
        {/* Moto/Caption */}
        <span 
          className={`${subtitleSize} font-medium italic ${motoColor} leading-tight mt-0.5`}
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        >
          Help you find a new perspective
        </span>
      </div>
    </div>
  );
}
