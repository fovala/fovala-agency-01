import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, type ProjectItem } from '../data/projects';
import { PlatformIcon } from './PlatformIcons';
import { ProjectMockupPreview } from './ProjectMockupPreview';

interface CaseStudiesSliderSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

const FEATURED_SLIDES = PROJECTS.slice(0, 4);

const CASCADE_SLOTS = [
  { offset: -165, scale: 0.78, z: 10 },
  { offset: -88, scale: 0.89, z: 20 },
  { offset: 0, scale: 1, z: 30, primary: true },
  { offset: 112, scale: 0.86, z: 20 },
];

export const CaseStudiesSliderSection: React.FC<CaseStudiesSliderSectionProps> = ({
  onOpenProject,
}) => {
  const [index, setIndex] = useState(0);
  const current = FEATURED_SLIDES[index];

  const prev = () => setIndex((i) => (i - 1 + FEATURED_SLIDES.length) % FEATURED_SLIDES.length);
  const next = () => setIndex((i) => (i + 1) % FEATURED_SLIDES.length);

  // Order the 4 mobile websites around the active slide so every mobile frame displays a real website
  // and the active slide sits front-and-center in slot index 2.
  const arrangedMobileFrames = [
    { project: FEATURED_SLIDES[(index + 2) % FEATURED_SLIDES.length], slideIndex: (index + 2) % FEATURED_SLIDES.length },
    { project: FEATURED_SLIDES[(index + 3) % FEATURED_SLIDES.length], slideIndex: (index + 3) % FEATURED_SLIDES.length },
    { project: FEATURED_SLIDES[index], slideIndex: index },
    { project: FEATURED_SLIDES[(index + 1) % FEATURED_SLIDES.length], slideIndex: (index + 1) % FEATURED_SLIDES.length },
  ];

  return (
    <section
      className="relative py-20 sm:py-28 text-white overflow-hidden bg-[#0D0E1B]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse 68% 58% at 72% 45%, rgba(86, 141, 235, 0.16) 0%, rgba(117, 84, 217, 0.14) 48%, rgba(13, 14, 27, 0.96) 86%)',
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-10">
          {/* Left Narrative & Metadata */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#9EB8FF]">
                Case Studies
              </p>
              <div className="mt-1 font-sans-ui text-4xl sm:text-5xl font-semibold tabular-nums tracking-tight text-[#F3F1F8]">
                0{index + 1}
                <span className="text-white/30 font-normal">/0{FEATURED_SLIDES.length}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 pt-4"
              >
                <p className="text-xs font-medium text-[#B9A6FF]">
                  {current.category} · {current.isConcept ? 'Mobile-First Showcase' : 'Client Project'}
                </p>

                <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-[-0.025em] text-[#F3F1F8]">
                  {current.title}
                </h2>

                <p className="text-sm leading-relaxed text-[#B8B9C5] max-w-md">
                  {current.summary}
                </p>

                <div className="pt-2 space-y-2 text-xs">
                  <div className="flex items-center gap-6">
                    <span className="w-14 text-[#B8B9C5]/65">Industry</span>
                    <span className="font-medium text-[#F3F1F8]">{current.industry}</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="w-14 text-[#B8B9C5]/65">Role</span>
                    <span className="font-medium text-[#F3F1F8]">Brand &amp; Mobile UI/UX</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="w-14 text-[#B8B9C5]/65">Domain</span>
                    <span className="font-medium text-[#9EB8FF]">{current.domain}</span>
                  </div>
                </div>

                {/* Tool Stack Badges & Open Preview Action */}
                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-[#161830] border border-white/15 flex items-center justify-center">
                      <PlatformIcon id="figma" className="w-5 h-5" />
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-[#161830] border border-white/15 flex items-center justify-center">
                      <PlatformIcon
                        id={
                          current.platform.toLowerCase().includes('shopify')
                            ? 'shopify'
                            : current.platform.toLowerCase().includes('framer')
                              ? 'framer'
                              : 'webflow'
                        }
                        className="w-5 h-5"
                      />
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProject(current)}
                    className="fx-glow-btn inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#9EB8FF] via-[#B9A6FF] to-[#568DEB] hover:brightness-110 text-[#0D0E1B] text-xs font-semibold px-5 py-2.5 transition-all"
                  >
                    <span>Inspect Showcase</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls + Quick Mobile Industry Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous case study"
                  className="fx-glow-btn w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:border-[#9EB8FF] hover:bg-[#7554D9]/25 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next case study"
                  className="fx-glow-btn w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:border-[#9EB8FF] hover:bg-[#7554D9]/25 text-white flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="inline-flex items-center gap-1.5 text-[11px] text-[#B8B9C5]">
                <Smartphone className="w-3.5 h-3.5 text-[#9EB8FF]" />
                <span>Click any mobile site to preview</span>
              </div>
            </div>
          </div>

          {/* Right Fanned Cascade of Mobile-Friendly Real Websites */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl bg-[#13152A]/85 border border-white/12 p-5 sm:p-8 shadow-[0_28px_70px_rgba(6,8,20,0.65)] overflow-hidden">
              <div className="relative h-[370px] sm:h-[430px] flex items-center justify-center">
                {arrangedMobileFrames.map(({ project, slideIndex }, slotIdx) => {
                  const slot = CASCADE_SLOTS[slotIdx];
                  const isPrimary = Boolean(slot.primary);

                  return (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => {
                        if (isPrimary) {
                          onOpenProject(project);
                        } else {
                          setIndex(slideIndex);
                        }
                      }}
                      aria-label={
                        isPrimary
                          ? `Inspect ${project.title} mobile & desktop showcase`
                          : `Select ${project.title} (${project.industry})`
                      }
                      style={{
                        transform: `translateX(${slot.offset}px) scale(${slot.scale})`,
                        zIndex: slot.z,
                      }}
                      className={`absolute w-[190px] sm:w-[224px] h-[335px] sm:h-[395px] rounded-[26px] border-[4px] bg-[#0B0C18] p-1 shadow-[0_24px_60px_rgba(4,6,18,0.8)] overflow-hidden text-left transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${
                        isPrimary
                          ? 'border-[#9EB8FF]/70 ring-1 ring-[#9EB8FF]/40'
                          : 'border-[#222542] opacity-90 hover:opacity-100 hover:border-[#9EB8FF]/45'
                      }`}
                    >
                      <div className="w-full h-full rounded-[20px] overflow-hidden flex flex-col bg-[#0D0E1B]">
                        {/* Phone Status Bezel */}
                        <div className="px-3 py-1 bg-[#0B0C18] flex items-center justify-between text-[7px] text-white/70 shrink-0">
                          <span>9:41</span>
                          <span className="w-10 h-2 rounded-full bg-black border border-white/15" />
                          <span>5G</span>
                        </div>

                        {/* Complete Real Mobile Website Content */}
                        <div className="flex-1 min-h-0">
                          <ProjectMockupPreview
                            project={project}
                            mode="mobile-sheet"
                            highlightPrimary={isPrimary}
                          />
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
