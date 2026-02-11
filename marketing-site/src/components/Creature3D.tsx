'use client';

import React, { useRef, useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════
   Creature3D — A CSS 3D animated creature with parallax tilt,
   glowing particle aura, breathing animation, and dynamic
   shadow. These look like living holographic mini-creatures.
   ═══════════════════════════════════════════════════════════ */

interface Creature3DProps {
  name: string;
  element: 'fire' | 'water' | 'earth' | 'lightning' | 'shadow' | 'crystal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  autoAnimate?: boolean;
  className?: string;
}

const CREATURE_SVG: Record<string, { body: string; aura: string; particleColor: string; glowColor: string }> = {
  fire: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="20" rx="22" ry="8" fill="rgba(239,68,68,0.15)" class="creature-shadow"/>
        <!-- Tail -->
        <path d="M-8,5 Q-22,-15 -15,-30 Q-10,-20 -5,0" fill="url(#fireGrad)" opacity="0.8"/>
        <!-- Body -->
        <ellipse cx="0" cy="0" rx="18" ry="15" fill="url(#fireGrad)"/>
        <!-- Belly -->
        <ellipse cx="0" cy="4" rx="12" ry="9" fill="#FCA5A5" opacity="0.3"/>
        <!-- Head -->
        <circle cx="0" cy="-14" r="12" fill="url(#fireGrad)"/>
        <!-- Horns -->
        <path d="M-7,-22 L-10,-34 L-4,-25" fill="#F97316"/>
        <path d="M7,-22 L10,-34 L4,-25" fill="#F97316"/>
        <!-- Eyes -->
        <ellipse cx="-4" cy="-16" rx="3" ry="3.5" fill="white"/>
        <ellipse cx="4" cy="-16" rx="3" ry="3.5" fill="white"/>
        <circle cx="-3.5" cy="-15.5" r="2" fill="#1a1a2e"/>
        <circle cx="4.5" cy="-15.5" r="2" fill="#1a1a2e"/>
        <circle cx="-3" cy="-16" r="0.7" fill="white"/>
        <circle cx="5" cy="-16" r="0.7" fill="white"/>
        <!-- Mouth -->
        <path d="M-3,-9 Q0,-7 3,-9" stroke="#ef4444" stroke-width="0.8" fill="none"/>
        <!-- Fire wisps from head -->
        <path d="M-5,-26 Q-3,-32 0,-28 Q3,-32 5,-26" fill="#FDE047" opacity="0.7" class="flame-wisp"/>
        <!-- Arms -->
        <path d="M-16,0 Q-22,-3 -20,-8" stroke="url(#fireGrad)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M16,0 Q22,-3 20,-8" stroke="url(#fireGrad)" stroke-width="3" stroke-linecap="round" fill="none"/>
        <!-- Claws -->
        <circle cx="-20" cy="-9" r="2.5" fill="#F97316"/>
        <circle cx="20" cy="-9" r="2.5" fill="#F97316"/>
        <!-- Feet -->
        <ellipse cx="-8" cy="14" rx="5" ry="3" fill="#DC2626"/>
        <ellipse cx="8" cy="14" rx="5" ry="3" fill="#DC2626"/>
      </g>
      <defs>
        <linearGradient id="fireGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#F97316"/>
          <stop offset="100%" stop-color="#DC2626"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(239,68,68,0.12)',
    particleColor: '#F97316',
    glowColor: 'rgba(239,68,68,0.4)',
  },
  water: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="20" rx="20" ry="7" fill="rgba(59,130,246,0.15)" class="creature-shadow"/>
        <!-- Tail fin -->
        <path d="M0,12 Q-15,20 -8,30 Q0,22 8,30 Q15,20 0,12" fill="url(#waterGrad)" opacity="0.7"/>
        <!-- Body -->
        <ellipse cx="0" cy="0" rx="16" ry="14" fill="url(#waterGrad)"/>
        <!-- Belly -->
        <ellipse cx="0" cy="4" rx="11" ry="8" fill="#93C5FD" opacity="0.3"/>
        <!-- Head -->
        <circle cx="0" cy="-13" r="11" fill="url(#waterGrad)"/>
        <!-- Fins -->
        <path d="M-14,-5 Q-24,-12 -18,-18" fill="#60A5FA" opacity="0.6"/>
        <path d="M14,-5 Q24,-12 18,-18" fill="#60A5FA" opacity="0.6"/>
        <!-- Crown fin -->
        <path d="M-5,-22 L0,-30 L5,-22" fill="#60A5FA"/>
        <!-- Eyes -->
        <ellipse cx="-4" cy="-14" rx="3.5" ry="4" fill="white"/>
        <ellipse cx="4" cy="-14" rx="3.5" ry="4" fill="white"/>
        <circle cx="-3.5" cy="-13.5" r="2.2" fill="#1e3a5f"/>
        <circle cx="4.5" cy="-13.5" r="2.2" fill="#1e3a5f"/>
        <circle cx="-3" cy="-14" r="0.8" fill="white"/>
        <circle cx="5" cy="-14" r="0.8" fill="white"/>
        <!-- Mouth -->
        <ellipse cx="0" cy="-8" rx="2" ry="1.5" fill="#1e3a5f" opacity="0.5"/>
        <!-- Bubbles -->
        <circle cx="8" cy="-20" r="1.5" fill="rgba(147,197,253,0.4)" class="bubble-1"/>
        <circle cx="12" cy="-25" r="1" fill="rgba(147,197,253,0.3)" class="bubble-2"/>
        <circle cx="6" cy="-28" r="1.8" fill="rgba(147,197,253,0.35)" class="bubble-3"/>
      </g>
      <defs>
        <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#60A5FA"/>
          <stop offset="100%" stop-color="#2563EB"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(59,130,246,0.12)',
    particleColor: '#60A5FA',
    glowColor: 'rgba(59,130,246,0.4)',
  },
  earth: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="22" rx="24" ry="8" fill="rgba(34,197,94,0.15)" class="creature-shadow"/>
        <!-- Shell/Back -->
        <ellipse cx="0" cy="2" rx="20" ry="16" fill="url(#earthGrad)"/>
        <path d="M-12,-6 L0,-10 L12,-6 L8,6 L-8,6 Z" fill="#166534" opacity="0.3"/>
        <!-- Head -->
        <circle cx="0" cy="-14" r="10" fill="#4ADE80"/>
        <!-- Leaf crown -->
        <path d="M-6,-22 Q0,-30 6,-22" fill="#22C55E"/>
        <path d="M-3,-24 Q0,-31 3,-24" fill="#4ADE80"/>
        <!-- Eyes -->
        <ellipse cx="-3.5" cy="-15" rx="3" ry="3.5" fill="white"/>
        <ellipse cx="3.5" cy="-15" rx="3" ry="3.5" fill="white"/>
        <circle cx="-3" cy="-14.5" r="2" fill="#14532d"/>
        <circle cx="4" cy="-14.5" r="2" fill="#14532d"/>
        <circle cx="-2.5" cy="-15" r="0.7" fill="white"/>
        <circle cx="4.5" cy="-15" r="0.7" fill="white"/>
        <!-- Smile -->
        <path d="M-4,-9 Q0,-6 4,-9" stroke="#166534" stroke-width="1" fill="none"/>
        <!-- Arms (stumpy) -->
        <ellipse cx="-18" cy="2" rx="5" ry="4" fill="#4ADE80"/>
        <ellipse cx="18" cy="2" rx="5" ry="4" fill="#4ADE80"/>
        <!-- Feet -->
        <ellipse cx="-9" cy="16" rx="6" ry="4" fill="#4ADE80"/>
        <ellipse cx="9" cy="16" rx="6" ry="4" fill="#4ADE80"/>
      </g>
      <defs>
        <linearGradient id="earthGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4ADE80"/>
          <stop offset="100%" stop-color="#16A34A"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(34,197,94,0.12)',
    particleColor: '#4ADE80',
    glowColor: 'rgba(34,197,94,0.4)',
  },
  lightning: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="20" rx="18" ry="6" fill="rgba(234,179,8,0.15)" class="creature-shadow"/>
        <!-- Tail (lightning bolt) -->
        <path d="M5,8 L12,2 L8,6 L15,-2 L10,4" stroke="#FDE047" stroke-width="2" fill="none" stroke-linecap="round"/>
        <!-- Body -->
        <ellipse cx="0" cy="0" rx="14" ry="13" fill="url(#lightGrad)"/>
        <!-- Belly -->
        <ellipse cx="0" cy="3" rx="9" ry="7" fill="#FDE047" opacity="0.25"/>
        <!-- Head -->
        <circle cx="0" cy="-13" r="10" fill="url(#lightGrad)"/>
        <!-- Ears (pointed) -->
        <path d="M-8,-19 L-12,-28 L-4,-21" fill="#EAB308"/>
        <path d="M8,-19 L12,-28 L4,-21" fill="#EAB308"/>
        <!-- Eyes (intense) -->
        <ellipse cx="-3.5" cy="-14" rx="3" ry="3.5" fill="white"/>
        <ellipse cx="3.5" cy="-14" rx="3" ry="3.5" fill="white"/>
        <circle cx="-3" cy="-13.5" r="2" fill="#713f12"/>
        <circle cx="4" cy="-13.5" r="2" fill="#713f12"/>
        <circle cx="-2.5" cy="-14" r="0.7" fill="white"/>
        <circle cx="4.5" cy="-14" r="0.7" fill="white"/>
        <!-- Zig-zag cheeks -->
        <path d="M-8,-10 L-10,-12 L-8,-14" stroke="#FDE047" stroke-width="0.8" fill="none"/>
        <path d="M8,-10 L10,-12 L8,-14" stroke="#FDE047" stroke-width="0.8" fill="none"/>
        <!-- Arms -->
        <path d="M-13,0 L-18,-4" stroke="url(#lightGrad)" stroke-width="3" stroke-linecap="round"/>
        <path d="M13,0 L18,-4" stroke="url(#lightGrad)" stroke-width="3" stroke-linecap="round"/>
        <!-- Sparks -->
        <circle cx="-18" cy="-5" r="2" fill="#FDE047" class="spark-1"/>
        <circle cx="18" cy="-5" r="2" fill="#FDE047" class="spark-2"/>
        <!-- Feet -->
        <ellipse cx="-6" cy="12" rx="4" ry="3" fill="#CA8A04"/>
        <ellipse cx="6" cy="12" rx="4" ry="3" fill="#CA8A04"/>
      </g>
      <defs>
        <linearGradient id="lightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FDE047"/>
          <stop offset="100%" stop-color="#EAB308"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(234,179,8,0.12)',
    particleColor: '#FDE047',
    glowColor: 'rgba(234,179,8,0.4)',
  },
  shadow: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="20" rx="20" ry="7" fill="rgba(99,102,241,0.1)" class="creature-shadow"/>
        <!-- Wings -->
        <path d="M-14,-5 Q-30,-20 -25,-5 Q-22,0 -16,0" fill="#6366F1" opacity="0.4"/>
        <path d="M14,-5 Q30,-20 25,-5 Q22,0 16,0" fill="#6366F1" opacity="0.4"/>
        <!-- Body -->
        <ellipse cx="0" cy="2" rx="15" ry="14" fill="url(#shadowGrad)"/>
        <!-- Head -->
        <circle cx="0" cy="-12" r="11" fill="url(#shadowGrad)"/>
        <!-- Eye (cyclops) -->
        <ellipse cx="0" cy="-13" rx="5" ry="5.5" fill="#C4B5FD"/>
        <circle cx="0" cy="-12.5" r="3" fill="#312e81"/>
        <circle cx="1" cy="-13" r="1" fill="#C4B5FD"/>
        <!-- Spectral wisps -->
        <path d="M-8,-20 Q-5,-26 -2,-20" stroke="#A78BFA" stroke-width="0.8" fill="none" opacity="0.5" class="wisp-1"/>
        <path d="M2,-20 Q5,-26 8,-20" stroke="#A78BFA" stroke-width="0.8" fill="none" opacity="0.5" class="wisp-2"/>
        <!-- Ghost tail -->
        <path d="M-8,14 Q-4,20 0,16 Q4,20 8,14" fill="#6366F1" opacity="0.5"/>
        <!-- Arms (wispy) -->
        <path d="M-14,2 Q-20,0 -18,-5" stroke="#818CF8" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
        <path d="M14,2 Q20,0 18,-5" stroke="#818CF8" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.7"/>
      </g>
      <defs>
        <linearGradient id="shadowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#818CF8"/>
          <stop offset="100%" stop-color="#4F46E5"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(99,102,241,0.12)',
    particleColor: '#A78BFA',
    glowColor: 'rgba(99,102,241,0.4)',
  },
  crystal: {
    body: `
      <g class="creature-body" transform="translate(50,55)">
        <ellipse cx="0" cy="20" rx="18" ry="6" fill="rgba(236,72,153,0.1)" class="creature-shadow"/>
        <!-- Crystal spikes (back) -->
        <path d="M-10,-8 L-14,-25 L-6,-10" fill="#F9A8D4" opacity="0.5"/>
        <path d="M0,-10 L0,-28 L4,-12" fill="#FBCFE8" opacity="0.6"/>
        <path d="M10,-8 L14,-25 L6,-10" fill="#F9A8D4" opacity="0.5"/>
        <!-- Body (geometric) -->
        <path d="M-14,0 L-10,-12 L0,-16 L10,-12 L14,0 L10,14 L-10,14 Z" fill="url(#crystalGrad)"/>
        <!-- Inner facets -->
        <path d="M0,-16 L-5,0 L0,14" fill="rgba(255,255,255,0.08)"/>
        <path d="M0,-16 L5,0 L0,14" fill="rgba(255,255,255,0.04)"/>
        <!-- Face area -->
        <circle cx="0" cy="-4" r="8" fill="#F472B6" opacity="0.3"/>
        <!-- Eyes -->
        <ellipse cx="-3" cy="-5" rx="2.5" ry="3" fill="white"/>
        <ellipse cx="3" cy="-5" rx="2.5" ry="3" fill="white"/>
        <circle cx="-2.5" cy="-4.5" r="1.8" fill="#831843"/>
        <circle cx="3.5" cy="-4.5" r="1.8" fill="#831843"/>
        <circle cx="-2" cy="-5" r="0.6" fill="white"/>
        <circle cx="4" cy="-5" r="0.6" fill="white"/>
        <!-- Happy mouth -->
        <path d="M-2,0 Q0,3 2,0" stroke="#be185d" stroke-width="0.8" fill="none"/>
        <!-- Shimmer -->
        <circle cx="6" cy="-10" r="1.5" fill="white" opacity="0.4" class="shimmer-1"/>
        <circle cx="-8" cy="2" r="1" fill="white" opacity="0.3" class="shimmer-2"/>
        <!-- Little legs -->
        <ellipse cx="-6" cy="14" rx="4" ry="3" fill="#EC4899"/>
        <ellipse cx="6" cy="14" rx="4" ry="3" fill="#EC4899"/>
      </g>
      <defs>
        <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F472B6"/>
          <stop offset="50%" stop-color="#EC4899"/>
          <stop offset="100%" stop-color="#DB2777"/>
        </linearGradient>
      </defs>`,
    aura: 'rgba(236,72,153,0.12)',
    particleColor: '#F9A8D4',
    glowColor: 'rgba(236,72,153,0.4)',
  },
};

const SIZES = {
  sm: { w: 80, h: 80, viewBox: '15 10 70 70' },
  md: { w: 120, h: 120, viewBox: '10 5 80 80' },
  lg: { w: 180, h: 180, viewBox: '5 0 90 90' },
  xl: { w: 260, h: 260, viewBox: '0 -5 100 100' },
};

export function Creature3D({ name, element, size = 'md', autoAnimate = true, className = '' }: Creature3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const creature = CREATURE_SVG[element];
  const dims = SIZES[size];

  useEffect(() => {
    if (!autoAnimate) return;
    let frame: number;
    let t = 0;

    const animate = () => {
      t += 0.015;
      setTilt({
        x: Math.sin(t * 0.7) * 8,
        y: Math.cos(t * 0.5) * 5 + Math.sin(t * 1.2) * 3,
      });
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [autoAnimate]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (autoAnimate) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTilt({ x: y, y: x });
  };

  return (
    <div
      ref={containerRef}
      className={`creature-3d-container relative inline-flex items-center justify-center ${className}`}
      style={{ width: dims.w, height: dims.h, perspective: '600px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => !autoAnimate && setTilt({ x: 0, y: 0 })}
    >
      {/* Aura glow underneath */}
      <div
        className="absolute rounded-full blur-2xl animate-pulse"
        style={{
          width: dims.w * 0.7,
          height: dims.w * 0.4,
          bottom: '5%',
          background: creature.aura,
        }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2 + Math.random() * 3,
            height: 2 + Math.random() * 3,
            background: creature.particleColor,
            opacity: 0.3 + Math.random() * 0.3,
            left: `${20 + Math.random() * 60}%`,
            top: `${10 + Math.random() * 70}%`,
            animation: `creatureParticle ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * -5}s`,
          }}
        />
      ))}

      {/* The creature SVG with 3D transform */}
      <div
        className="relative transition-transform duration-100"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(10px)`,
          transformStyle: 'preserve-3d',
          animation: autoAnimate ? 'creatureBreathe 4s ease-in-out infinite' : undefined,
        }}
      >
        <svg
          width={dims.w}
          height={dims.h}
          viewBox={dims.viewBox}
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
          style={{
            filter: `drop-shadow(0 0 ${size === 'sm' ? 8 : 15}px ${creature.glowColor})`,
          }}
          dangerouslySetInnerHTML={{ __html: creature.body }}
        />
      </div>

      {/* Name label */}
      {size !== 'sm' && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-xs font-bold text-zinc-400 whitespace-nowrap"
          style={{ fontSize: size === 'xl' ? 14 : size === 'lg' ? 12 : 10 }}
        >
          {name}
        </div>
      )}
    </div>
  );
}
