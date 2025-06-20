'use client';

import { useEffect, useCallback } from 'react';

interface ScrollOptions {
  offset?: number;
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((
    elementId: string, 
    options: ScrollOptions = {}
  ) => {
    const {
      offset = 80,
      duration = 800,
      easing = 'ease-in-out'
    } = options;

    const element = document.getElementById(elementId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const easeInCubic = (t: number): number => {
      return t * t * t;
    };

    const getEasing = (t: number): number => {
      switch (easing) {
        case 'ease-in':
          return easeInCubic(t);
        case 'ease-out':
          return easeOutCubic(t);
        case 'ease-in-out':
          return easeInOutCubic(t);
        case 'linear':
          return t;
        default:
          return easeInOutCubic(t);
      }
    };

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * getEasing(progress));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  const scrollToTop = useCallback((duration = 600) => {
    const startPosition = window.pageYOffset;
    const startTime = performance.now();

    const animation = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, startPosition * (1 - easeOutCubic));
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }, []);

  return { scrollToElement, scrollToTop };
};

// Scroll progress indicator component
export const ScrollProgress = () => {
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        progressBar.style.width = `${scrollPercent}%`;
      }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-brewery-dark/20 z-[100]">
      <div 
        id="scroll-progress"
        className="h-full bg-gradient-to-r from-brewery-gold to-brewery-primary transition-all duration-150 ease-out"
        style={{ width: '0%' }}
      />
    </div>
  );
}; 