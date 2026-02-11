'use client';

import React, { useEffect, useRef } from 'react';

const MONSTER_EMOJIS = ['👾', '🐉', '👹', '🦇', '🔮', '⚡', '🌀', '💀', '🐲', '🦑', '👻', '🧿'];

export function FloatingMonsters() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Create floating monsters
    for (let i = 0; i < 12; i++) {
      const monster = document.createElement('div');
      const emoji = MONSTER_EMOJIS[i % MONSTER_EMOJIS.length];
      monster.textContent = emoji;
      monster.style.cssText = `
        position: absolute;
        font-size: ${20 + Math.random() * 30}px;
        opacity: ${0.05 + Math.random() * 0.12};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${6 + Math.random() * 8}s ease-in-out infinite;
        animation-delay: ${Math.random() * -10}s;
        pointer-events: none;
        filter: blur(${Math.random() > 0.5 ? 1 : 0}px);
        z-index: 0;
      `;
      container.appendChild(monster);
    }

    // Create particles
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      const colors = ['139,92,246', '234,179,8', '34,197,94', '236,72,153', '59,130,246'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 4}px;
        height: ${2 + Math.random() * 4}px;
        border-radius: 50%;
        background: rgba(${color}, ${0.2 + Math.random() * 0.3});
        left: ${Math.random() * 100}%;
        top: ${100 + Math.random() * 20}%;
        --drift: ${-50 + Math.random() * 100}px;
        animation: particle ${8 + Math.random() * 15}s linear infinite;
        animation-delay: ${Math.random() * -20}s;
        pointer-events: none;
      `;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
