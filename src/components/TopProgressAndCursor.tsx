import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const TopProgressAndCursor: React.FC = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      setScrollPercent(pct);
      setShowBackToTop(window.scrollY > 720);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let rafId = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const tick = () => {
      currentX += (targetX - currentX) * 0.16;
      currentY += (targetY - currentY) * 0.16;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX - 14}px, ${currentY - 14}px, 0)`;
        cursorRef.current.style.opacity = targetX > 0 ? '1' : '0';
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX - 240}px, ${currentY - 240}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-gradient-to-r from-[#7554D9] via-[#B9A6FF] to-[#568DEB]"
          style={{ width: `${scrollPercent}%`, transition: 'width 60ms linear' }}
        />
      </div>

      {/* Subtle Mouse-Following Spotlight (Desktop Fine Pointer Only) */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed top-0 left-0 z-30 w-[480px] h-[480px] rounded-full opacity-30 mix-blend-screen"
        style={{
          background:
            'radial-gradient(circle, rgba(117, 84, 217, 0.14) 0%, rgba(86, 141, 235, 0.05) 45%, transparent 72%)',
        }}
      />

      {/* Precision Desktop Cursor Ring */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="hidden lg:block pointer-events-none fixed top-0 left-0 z-50 w-7 h-7 rounded-full border border-[#B9A6FF]/55 opacity-0 transition-opacity duration-200"
      />

      {/* Back to Top Control */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-[#101116]/90 border border-[#B9A6FF]/35 text-white flex items-center justify-center shadow-lg hover:bg-[#7554D9] hover:border-[#B9A6FF] transition-all duration-200 ${
          showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </>
  );
};
