'use client';

import React, { useEffect, useRef } from 'react';
import Granim from 'granim';

const AnimatedGradientBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      new Granim({
        element: canvasRef.current,
        name: 'granim',
        states: {
          'default-state': {
            gradients: [
              ['#050507', '#08080a', '#050507'],
              ['#08080a', '#050507', '#08080a']
            ],
            transitionSpeed: 7000
          }
        }
      });
    }
  }, []);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />;
};

export default AnimatedGradientBackground;
