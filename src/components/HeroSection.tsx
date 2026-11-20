import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroTrafficEcosystem } from './HeroTrafficEcosystem';

interface HeroSectionProps {
  onExploreWork: () => void;
  onStartProject: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onStartProject,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight || 800;
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / vh)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => undefined);
      }
    };
  }, []);

  const toggleAmbientSound = () => {
    try {
      if (!soundEnabled) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => undefined);
        }

        if (!gainRef.current) {
          const master = ctx.createGain();
          master.gain.setValueAtTime(0.0001, ctx.currentTime);
          master.connect(ctx.destination);

          // Soft atmospheric ambient pad chord (A2 + E3 + B3)
          [110, 164.81, 246.94].forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            osc.type = idx === 0 ? 'sine' : 'triangle';
            osc.frequency.value = freq;
            const oscGain = ctx.createGain();
            oscGain.gain.value = idx === 0 ? 0.35 : 0.14;
            osc.connect(oscGain);
            oscGain.connect(master);
            osc.start();
          });
          gainRef.current = master;
        }
        gainRef.current.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.5);
        setSoundEnabled(true);
      } else {
        if (audioCtxRef.current && gainRef.current) {
          gainRef.current.gain.exponentialRampToValueAtTime(
            0.0001,
            audioCtxRef.current.currentTime + 0.35,
          );
        }
        setSoundEnabled(false);
      }
    } catch {
      setSoundEnabled(false);
    }
  };

  return (
    <section
      id="top"
      className="relative min-h-screen bg-[#0D0E1B] text-white overflow-hidden pt-24 pb-8 sm:pt-28 flex flex-col justify-between"
    >
      {/* Atmospheric Midnight Radial Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 58% at 72% 45%, rgba(86, 141, 235, 0.16) 0%, rgba(117, 84, 217, 0.14) 45%, rgba(13, 14, 27, 0.95) 85%)',
        }}
      />

      {/* Main Hero Grid */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 w-full my-auto py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 lg:gap-4">
          {/* Left Column: Oversized Typographic Statement + Inline Media Capsule + Circular CTA */}
          <div className="lg:col-span-7 relative lg:pl-10">
            {/* Vertical Scroll Down Rail on Left Edge */}
            <div
              aria-hidden="true"
              className="hidden lg:flex flex-col items-center gap-3 absolute left-0 bottom-4"
            >
              <span className="h-14 w-[1px] bg-[#9EB8FF]/20" />
              <span className="text-[10px] tracking-[0.22em] text-[#7D83A1] [writing-mode:vertical-rl] rotate-180">
                Scroll Down
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans-ui font-semibold text-[2.75rem] sm:text-[3.85rem] lg:text-[4.65rem] leading-[1.04] tracking-[-0.03em] bg-gradient-to-br from-[#D6DAF0] via-[#B8BEE0] to-[#8E96C2] bg-clip-text text-transparent"
            >
              <span className="block">Dedication</span>
              <span className="block mt-1">shapes true</span>
              <span className="block mt-1">brilliance</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xs sm:text-sm text-[#898FA9] max-w-sm leading-relaxed"
            >
              We function as a cutting-edge digital firm, housing top-tier experts committed to pioneering and advancing bespoke web experiences.
            </motion.p>

            {/* Signature Circular Outline "DISCOVER MORE" + Small Companion Arrow Circle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex items-center gap-4"
            >
              <button
                type="button"
                onClick={onExploreWork}
                className="fx-glow-btn group relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#9EB8FF]/20 hover:border-[#9EB8FF]/50 flex items-center justify-center text-center transition-all duration-300 bg-[#14172D]/40 hover:bg-[#7554D9]/15"
              >
                <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-[#C1C6E0] group-hover:text-[#E2E6FA]">
                  Discover More
                </span>
              </button>

              <button
                type="button"
                onClick={onStartProject}
                aria-label="Start a project"
                className="fx-glow-btn w-10 h-10 rounded-full border border-[#9EB8FF]/20 hover:border-[#9EB8FF]/55 bg-[#14172D]/45 hover:bg-[#7554D9]/45 flex items-center justify-center text-[#C1C6E0] hover:text-[#E2E6FA] transition-all duration-200"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Right Column: Interactive Website Traffic Ecosystem + Sound Control */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            <HeroTrafficEcosystem scrollProgress={scrollProgress} />

            {/* Subtle Interactive Ambient Sound Wave Toggle matching reference */}
            <button
              type="button"
              onClick={toggleAmbientSound}
              aria-pressed={soundEnabled}
              className="fx-glow-btn self-end mt-1 inline-flex items-center gap-2.5 text-[11px] text-[#898FA9] hover:text-[#CBD0EA] transition-colors px-3 py-1.5 rounded-full border border-[#9EB8FF]/14 hover:border-[#9EB8FF]/35 bg-[#14172D]/45"
            >
              <span>Sound</span>
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-[#9EB8FF]" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-[#898FA9]" />
              )}
              <span aria-hidden="true" className="inline-flex items-end gap-0.5 h-3">
                {[0.4, 0.9, 0.6, 1, 0.5].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      height: `${Math.round(h * 12)}px`,
                    }}
                    className={`w-[1.5px] rounded-full transition-colors ${
                      soundEnabled ? 'bg-[#B9A6FF]' : 'bg-white/40'
                    }`}
                  />
                ))}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
