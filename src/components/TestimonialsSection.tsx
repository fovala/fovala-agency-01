import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AUTHENTIC_TESTIMONIALS, STUDIO_STANDARDS } from '../data/testimonials';

interface TestimonialsSectionProps {
  onStartProject: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onStartProject,
}) => {
  const hasAuthenticReviews = AUTHENTIC_TESTIMONIALS.length > 0;
  const totalSlides = hasAuthenticReviews
    ? AUTHENTIC_TESTIMONIALS.length
    : STUDIO_STANDARDS.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalSlides);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [isPaused, totalSlides]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  };

  return (
    <section className="relative bg-luxury-ivory text-[#F3F1F8] py-20 sm:py-28 overflow-hidden">
      {/* Subtle 3D Translucent Wave Accent on Right matching Hero Sphere tones */}
      <svg
        viewBox="0 0 280 280"
        fill="none"
        aria-hidden="true"
        className="pointer-events-none hidden xl:block absolute -right-12 top-6 w-64 h-64 opacity-55"
      >
        <defs>
          <linearGradient id="storyRibbon" x1="0" y1="0" x2="280" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#9EB8FF" />
            <stop offset="55%" stopColor="#B9A6FF" />
            <stop offset="100%" stopColor="#568DEB" />
          </linearGradient>
        </defs>
        <path
          d="M40 220C80 120 155 40 250 75C220 140 165 215 95 245"
          stroke="url(#storyRibbon)"
          strokeWidth="38"
          strokeLinecap="round"
          strokeOpacity="0.42"
        />
      </svg>

      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-start lg:items-center gap-12 lg:gap-10">
          {/* Left Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 space-y-5"
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#9EB8FF] uppercase">
                Client Stories
              </span>
              <span className="h-[1px] w-12 bg-white/20" aria-hidden="true" />
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.65rem] leading-[1.12] tracking-[-0.015em] text-[#F3F1F8] [text-wrap:balance]">
              Trusted by Visionaries{' '}
              <span className="block">
                Around the <span className="text-gradient-lavender">World.</span>
              </span>
            </h2>

            <div className="pt-1">
              <button
                type="button"
                onClick={onStartProject}
                className="fx-glow-btn group inline-flex items-center gap-3 rounded-full border border-white/20 hover:border-[#9EB8FF] bg-white/[0.04] hover:bg-[#7554D9]/20 px-5 py-2.5 text-xs font-medium text-white transition-all whitespace-nowrap"
              >
                <span>Partner With Us</span>
                <span className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#9EB8FF] flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Horizontal Slider */}
          <div
            className="lg:col-span-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={() => setIsPaused(false)}
          >
            <div className="fx-glow-card relative rounded-3xl bg-[#161831]/90 border border-white/12 p-7 sm:p-10 shadow-[0_18px_50px_rgba(6,8,20,0.45)] min-h-[240px] flex flex-col justify-between overflow-hidden">
              <AnimatePresence mode="wait">
                {hasAuthenticReviews ? (
                  (() => {
                    const item = AUTHENTIC_TESTIMONIALS[activeIndex];
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="font-serif-display text-4xl leading-none text-[#9EB8FF]/55 select-none"
                          >
                            &ldquo;
                          </span>
                          <blockquote className="text-base sm:text-lg leading-relaxed text-[#F3F1F8] font-normal">
                            {item.quote}
                          </blockquote>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          {item.portraitUrl ? (
                            <img
                              src={item.portraitUrl}
                              alt={item.clientName}
                              referrerPolicy="no-referrer"
                              className="w-11 h-11 rounded-full object-cover border border-white/15"
                            />
                          ) : (
                            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#9EB8FF] to-[#568DEB] text-[#0D0E1B] text-xs font-semibold flex items-center justify-center">
                              {item.clientName.slice(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {item.clientName}
                            </div>
                            <div className="text-xs text-[#B8B9C5]">
                              {item.role} · {item.company} · {item.projectType}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()
                ) : (
                  (() => {
                    const slide = STUDIO_STANDARDS[activeIndex];
                    return (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -18 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-6"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="font-serif-display text-4xl leading-none text-[#9EB8FF]/55 select-none"
                          >
                            &ldquo;
                          </span>
                          <p className="text-base sm:text-lg leading-relaxed text-[#F3F1F8] font-normal">
                            {slide.quote}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 pt-2">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#9EB8FF] via-[#7554D9] to-[#568DEB] text-white text-xs font-semibold flex items-center justify-center shadow-md shrink-0">
                            {slide.monogram}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {slide.authorLabel}
                            </div>
                            <div className="text-xs text-[#B8B9C5]">
                              {slide.disciplineLabel} · {slide.engagementStage}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()
                )}
              </AnimatePresence>

              {/* Slider Controls & Indicators */}
              <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalSlides }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      aria-label={`View slide ${idx + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === activeIndex
                          ? 'w-7 bg-[#9EB8FF]'
                          : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                    className="w-9 h-9 rounded-full border border-white/15 hover:border-[#9EB8FF] bg-white/[0.04] text-white hover:text-[#9EB8FF] flex items-center justify-center transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                    className="w-9 h-9 rounded-full border border-white/15 hover:border-[#9EB8FF] bg-white/[0.04] text-white hover:text-[#9EB8FF] flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
