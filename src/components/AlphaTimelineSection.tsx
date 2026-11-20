import React, { useState } from 'react';
import { motion } from 'motion/react';

const TIMELINE_PHASES = [
  {
    id: 'phase-1',
    phase: 'PHASE 1',
    title: 'Discovery & Architecture',
    detail: 'Brand positioning audit, sitemap architecture, and technical platform specification.',
    progress: 100,
    position: 'top',
    nodeIndex: 1,
    accent: 'from-[#9EB8FF] to-[#568DEB]',
  },
  {
    id: 'phase-2',
    phase: 'PHASE 2',
    title: 'Editorial UI & Systems',
    detail: 'Figma component library, typographic hierarchy, and interactive motion prototypes.',
    progress: 82,
    position: 'bottom',
    nodeIndex: 2,
    accent: 'from-[#568DEB] to-[#7554D9]',
  },
  {
    id: 'phase-3',
    phase: 'PHASE 3',
    title: 'Engineering & WebGL',
    detail: 'Responsive semantic builds, 3D WebGL experiences, and Core Web Vitals optimization.',
    progress: 68,
    position: 'top',
    nodeIndex: 4,
    accent: 'from-[#7554D9] to-[#B9A6FF]',
  },
  {
    id: 'phase-4',
    phase: 'PHASE 4',
    title: 'QA & Global Launch',
    detail: 'Accessibility verification, cross-device testing, CMS training, and production deploy.',
    progress: 92,
    position: 'bottom',
    nodeIndex: 5,
    accent: 'from-[#B9A6FF] to-[#9EB8FF]',
  },
];

export const AlphaTimelineSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string>('phase-1');

  return (
    <section
      id="about"
      className="scroll-mt-20 relative bg-[#0D0E1B] text-white py-20 sm:py-28 overflow-hidden border-y border-white/[0.08]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(158,184,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(158,184,255,0.035) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.26em] text-[#9EB8FF]">
              Execution Blueprint
            </p>
            <h2 className="mt-2 font-sans-ui text-2xl sm:text-4xl font-medium tracking-tight text-white">
              Fovala Delivery Timeline
            </h2>
          </div>
          <p className="text-xs text-[#B8B9C5] max-w-xs">
            Select any milestone node to inspect how projects move cleanly from discovery to launch.
          </p>
        </div>

        {/* Desktop Luminous Timeline Track + Staggered Glass Phase Cards */}
        <div className="relative py-6">
          {/* Top Row Phase Cards (Phase 1 & Phase 3) */}
          <div className="hidden lg:grid grid-cols-12 gap-6 mb-10">
            <div className="col-start-3 col-span-4">
              <PhaseCard
                phase={TIMELINE_PHASES[0]}
                isActive={activePhase === TIMELINE_PHASES[0].id}
                onSelect={() => setActivePhase(TIMELINE_PHASES[0].id)}
              />
            </div>
            <div className="col-start-7 col-span-4">
              <PhaseCard
                phase={TIMELINE_PHASES[2]}
                isActive={activePhase === TIMELINE_PHASES[2].id}
                onSelect={() => setActivePhase(TIMELINE_PHASES[2].id)}
              />
            </div>
          </div>

          {/* Glowing Hero Periwinkle -> Electric Blue -> Violet Track */}
          <div className="hidden lg:flex relative items-center justify-between px-4 my-4">
            <div
              aria-hidden="true"
              className="absolute left-6 right-6 h-[3px] rounded-full bg-gradient-to-r from-[#9EB8FF] via-[#568DEB] to-[#7554D9] shadow-[0_0_24px_rgba(86,141,235,0.65)]"
            />
            {[0, 1, 2, 3, 4, 5, 6].map((idx) => {
              const linked = TIMELINE_PHASES.find((p) => p.nodeIndex === idx);
              const isLit = linked ? activePhase === linked.id : false;
              const ringColor =
                idx < 3
                  ? 'border-[#9EB8FF] shadow-[0_0_18px_rgba(158,184,255,0.75)]'
                  : idx < 5
                    ? 'border-[#568DEB] shadow-[0_0_18px_rgba(86,141,235,0.75)]'
                    : 'border-[#B9A6FF] shadow-[0_0_18px_rgba(185,166,255,0.75)]';

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={!linked}
                  onClick={() => linked && setActivePhase(linked.id)}
                  aria-label={linked ? `Select ${linked.title}` : `Milestone ${idx + 1}`}
                  className={`relative z-10 w-6 h-6 rounded-full bg-[#0D0E1B] border-2 ${ringColor} flex items-center justify-center transition-transform ${
                    linked ? 'cursor-pointer hover:scale-125' : 'cursor-default opacity-80'
                  } ${isLit ? 'scale-125' : ''}`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      idx < 3 ? 'bg-[#9EB8FF]' : idx < 5 ? 'bg-[#568DEB]' : 'bg-[#B9A6FF]'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Bottom Row Phase Cards (Phase 2 & Phase 4) */}
          <div className="hidden lg:grid grid-cols-12 gap-6 mt-10">
            <div className="col-start-5 col-span-4">
              <PhaseCard
                phase={TIMELINE_PHASES[1]}
                isActive={activePhase === TIMELINE_PHASES[1].id}
                onSelect={() => setActivePhase(TIMELINE_PHASES[1].id)}
              />
            </div>
            <div className="col-start-9 col-span-4">
              <PhaseCard
                phase={TIMELINE_PHASES[3]}
                isActive={activePhase === TIMELINE_PHASES[3].id}
                onSelect={() => setActivePhase(TIMELINE_PHASES[3].id)}
              />
            </div>
          </div>

          {/* Mobile/Tablet Responsive Stack */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TIMELINE_PHASES.map((p) => (
              <PhaseCard
                key={p.id}
                phase={p}
                isActive={activePhase === p.id}
                onSelect={() => setActivePhase(p.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const PhaseCard: React.FC<{
  phase: (typeof TIMELINE_PHASES)[number];
  isActive: boolean;
  onSelect: () => void;
}> = ({ phase, isActive, onSelect }) => (
  <motion.button
    type="button"
    onClick={onSelect}
    data-active={isActive ? 'true' : 'false'}
    whileHover={{ y: -2 }}
    className={`fx-glow-card w-full text-left rounded-xl p-4 sm:p-5 border overflow-hidden transition-all ${
      isActive
        ? 'bg-[#171A32]/95 border-[#9EB8FF]/55 shadow-[0_18px_40px_rgba(4,6,18,0.5)]'
        : 'bg-[#121428]/85 border-white/10'
    }`}
  >
    <div className="flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold tracking-widest text-white">
        {phase.phase}
      </span>
      <span className="text-[11px] text-[#B8B9C5]">{phase.title}</span>
    </div>
    <p className="mt-2 text-xs text-[#B8B9C5]/90 leading-relaxed">{phase.detail}</p>
    <div className="mt-3.5 h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        style={{ width: `${phase.progress}%` }}
        className={`h-full rounded-full bg-gradient-to-r ${phase.accent}`}
      />
    </div>
  </motion.button>
);
