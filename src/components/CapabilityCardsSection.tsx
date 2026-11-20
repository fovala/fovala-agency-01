import React from 'react';
import { motion } from 'motion/react';
import { Database, Search, Globe, Code2, Sparkles } from 'lucide-react';
import { BrandIcon } from './BrandLogo';
import { PlatformIcon } from './PlatformIcons';

interface CapabilityCardsSectionProps {
  onSelectCapability: (projectType: string) => void;
}

const MARQUEE_PLATFORMS = [
  { id: 'framer', name: 'Framer' },
  { id: 'figma', name: 'Figma' },
  { id: 'wordpress', name: 'WordPress' },
  { id: 'elementor', name: 'Elementor' },
  { id: 'shopify', name: 'Shopify' },
  { id: 'hostinger', name: 'Hostinger' },
  { id: 'webflow', name: 'Webflow' },
  { id: 'wix', name: 'Wix' },
  { id: 'woocommerce', name: 'WooCommerce' },
] as const;

const MarqueeGlyph: React.FC<{ id: (typeof MARQUEE_PLATFORMS)[number]['id'] }> = ({ id }) => {
  switch (id) {
    case 'framer':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M4 2h16v6h-8L4 2zm0 6h8l8 8H4V8zm0 8h8v6l-8-6z" />
        </svg>
      );
    case 'figma':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
          <path d="M9 21a3 3 0 0 0 3-3v-3H9a3 3 0 0 0 0 6z" />
          <path d="M6 12a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
          <path d="M6 6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3z" />
          <path d="M12 3h3a3 3 0 1 1 0 6h-3V3z" />
          <circle cx="15" cy="12" r="3" />
        </svg>
      );
    case 'wordpress':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" aria-hidden="true">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M6.2 7.4L9.8 18l2.5-6.9L9.8 6.5M14.2 6.5l3 9.7 1.8-5.5c.4-1.3.1-2.5-.6-3.7M12.3 12.1L14.5 18.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'elementor':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M5 4.5h3.2v15H5v-15zm5.8 0H19v3h-8.2v-3zm0 6H19v3h-8.2v-3zm0 6H19v3h-8.2v-3z" />
        </svg>
      );
    case 'shopify':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true">
          <path d="M6.5 7.5h11l1.5 13H5l1.5-13z" strokeLinejoin="round" />
          <path d="M9 7.5a3 3 0 0 1 6 0" strokeLinecap="round" />
          <path d="M13.6 11.4c-.4-.3-.9-.4-1.4-.4-.9 0-1.5.5-1.5 1.2 0 1.4 2.8 1.2 2.8 2.9 0 .9-.7 1.5-1.8 1.5-.7 0-1.4-.2-1.9-.6" strokeLinecap="round" />
        </svg>
      );
    case 'hostinger':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M5.5 3.5h3.2v6.6l6.6-3.6V3.5h3.2v17h-3.2v-6.6l-6.6 3.6v3H5.5v-17z" />
        </svg>
      );
    case 'webflow':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
          <path d="M21 6.5l-3.7 11h-3.4l1.5-4.9c-1.4 2.7-3.8 4.4-7 4.9v-3.6c2-.4 3.5-1.6 4.4-3.3H8.3V6.5h6.3l-.6 2.3c1-1.4 2.7-2.3 4.7-2.3H21z" />
        </svg>
      );
    case 'wix':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="w-5 h-5" aria-hidden="true">
          <path d="M3.5 8l2.2 8 1.8-5.5L9.3 16l2.2-8M14 8v8M16.8 8l3.7 8M20.5 8l-3.7 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case 'woocommerce':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-5 h-5" aria-hidden="true">
          <rect x="2.5" y="5.5" width="19" height="12" rx="3" />
          <path d="M6 10l1.1 4 1.2-2.6L9.5 14l1.1-4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="12" r="1.4" />
          <circle cx="17.8" cy="12" r="1.4" />
        </svg>
      );
  }
};

export const CapabilityCardsSection: React.FC<CapabilityCardsSectionProps> = ({
  onSelectCapability,
}) => {
  const repeatedPlatforms = [...MARQUEE_PLATFORMS, ...MARQUEE_PLATFORMS];

  return (
    <section className="relative bg-[#0D0E1B] text-white pt-4 pb-16 sm:pt-6 sm:pb-24 overflow-hidden">
      {/* Live Continuous Platforms Marquee Strip directly above the capability cards (non-clickable display) */}
      <div
        aria-label="Supported web platforms"
        className="relative mb-14 sm:mb-16 border-y border-white/[0.08] bg-[#0B0C18]/75 py-5 overflow-hidden pointer-events-none select-none"
      >
        {/* Left & Right Soft Edge Fades */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 z-10 bg-gradient-to-r from-[#0D0E1B] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 z-10 bg-gradient-to-l from-[#0D0E1B] to-transparent"
        />

        <div className="animate-platform-marquee flex items-center gap-12 sm:gap-16">
          {repeatedPlatforms.map((platform, idx) => (
            <div
              key={`${platform.id}-${idx}`}
              className="inline-flex items-center gap-3 px-4 py-1 text-[#8A8FA9]/70 shrink-0"
            >
              <span className="text-[#8E9FD4]/65">
                <MarqueeGlyph id={platform.id} />
              </span>
              <span className="font-serif-display font-medium text-xl sm:text-2xl tracking-tight whitespace-nowrap">
                {platform.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Brand Design */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCapability('Business Website Design')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCapability('Business Website Design');
            }}
            className="fx-glow-card group relative rounded-3xl bg-[#131528] border border-white/12 p-6 flex flex-col justify-between min-h-[340px] overflow-hidden cursor-pointer hover:-translate-y-1"
          >
            {/* Top-Right Subtle Gradient Sheen + Ambient Center Glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-10 w-56 h-44 rounded-full blur-2xl opacity-55 group-hover:opacity-90 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle, rgba(117, 84, 217, 0.42) 0%, rgba(86, 141, 235, 0.26) 45%, transparent 72%)',
              }}
            />

            {/* Mini Brand System UI Diagram */}
            <div className="relative z-10 h-44 flex items-center justify-center">
              <div className="relative w-full max-w-[260px] h-36 rounded-2xl border border-white/15 bg-[#171A31]/90 p-3 flex items-center justify-between gap-2 shadow-xl">
                <div className="grid grid-cols-2 gap-1 w-14 shrink-0">
                  {['#9EB8FF', '#B9A6FF', '#7554D9', '#568DEB', '#232645', '#0D0E1B'].map((c) => (
                    <span key={c} style={{ backgroundColor: c }} className="h-5 rounded border border-white/10" />
                  ))}
                </div>

                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-base font-serif-display text-white">
                    Aa
                  </div>
                  <span className="mt-2 text-[10px] tracking-[0.26em] text-[#B9A6FF] uppercase">
                    Fovala System
                  </span>
                </div>

                <div className="w-10 space-y-1.5 shrink-0">
                  <div className="h-2 rounded-full bg-white/25" />
                  <div className="h-2 rounded-full bg-[#7554D9]/60" />
                  <div className="h-2 rounded-full bg-white/15" />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#B9A6FF] transition-colors">
                Brand Design
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B8B9C5]">
                We craft clear, memorable brand systems that feel consistent across every touchpoint and build trust from the first impression.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Platform Migration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCapability('Website Redesign')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCapability('Website Redesign');
            }}
            className="fx-glow-card group relative rounded-3xl bg-[#131528] border border-white/12 p-6 flex flex-col justify-between min-h-[340px] overflow-hidden cursor-pointer hover:-translate-y-1"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-10 w-56 h-44 rounded-full blur-2xl opacity-55 group-hover:opacity-90 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle, rgba(158, 184, 255, 0.42) 0%, rgba(117, 84, 217, 0.28) 45%, transparent 72%)',
              }}
            />

            {/* Orbiting Migration Arc */}
            <div className="relative z-10 h-44 flex items-center justify-center">
              <div className="relative w-56 h-40 flex items-end justify-center pb-2">
                {/* Orbiting Source Badges */}
                <span className="absolute left-1 bottom-8 w-8 h-8 rounded-lg bg-[#181A31] border border-white/15 flex items-center justify-center text-[#B8B9C5]">
                  <Code2 className="w-4 h-4" />
                </span>
                <span className="absolute left-10 top-5 w-9 h-9 rounded-lg bg-[#181A31] border border-white/15 flex items-center justify-center">
                  <PlatformIcon id="wordpress" className="w-5 h-5" />
                </span>
                <span className="absolute left-1/2 -translate-x-1/2 top-0 w-9 h-9 rounded-lg bg-[#181A31] border border-white/15 flex items-center justify-center">
                  <PlatformIcon id="wix" className="w-5 h-5" />
                </span>
                <span className="absolute right-10 top-5 w-9 h-9 rounded-lg bg-[#181A31] border border-white/15 flex items-center justify-center">
                  <PlatformIcon id="shopify" className="w-5 h-5" />
                </span>
                <span className="absolute right-1 bottom-8 w-8 h-8 rounded-lg bg-[#181A31] border border-white/15 flex items-center justify-center">
                  <PlatformIcon id="framer" className="w-4 h-4" />
                </span>

                {/* Central Glowing Hero Fovala Icon Node */}
                <div className="w-16 h-16 rounded-full bg-[#0D0E1B] border border-[#9EB8FF]/45 flex items-center justify-center shadow-[0_0_40px_rgba(86,141,235,0.45)]">
                  <BrandIcon sizeClass="w-8 h-8" variant="hero" />
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#9EB8FF] transition-colors">
                Platform Migration
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B8B9C5]">
                Seamlessly migrate your site to Webflow, Shopify, or modern stacks while preserving structure, content, and SEO—without downtime.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Performance & SEO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => onSelectCapability('Custom Digital Experience')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') onSelectCapability('Custom Digital Experience');
            }}
            className="fx-glow-card group relative rounded-3xl bg-[#131528] border border-white/12 p-6 flex flex-col justify-between min-h-[340px] overflow-hidden cursor-pointer hover:-translate-y-1"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 -right-10 w-56 h-44 rounded-full blur-2xl opacity-55 group-hover:opacity-90 transition-opacity duration-300"
              style={{
                background:
                  'radial-gradient(circle, rgba(86, 141, 235, 0.45) 0%, rgba(185, 166, 255, 0.25) 45%, transparent 72%)',
              }}
            />

            <div className="relative z-10 h-44 flex items-center justify-center">
              <div className="relative w-44 h-40 flex items-center justify-center">
                <div className="w-36 h-36 rounded-full border border-[#9EB8FF]/25 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#0D0E1B] border border-[#9EB8FF]/45 flex items-center justify-center shadow-[0_0_40px_rgba(86,141,235,0.45)]">
                    <BrandIcon sizeClass="w-8 h-8" variant="hero" />
                  </div>
                </div>
                <span className="absolute top-3 left-2 w-8 h-8 rounded-full bg-[#241A46] border border-[#B9A6FF]/35 flex items-center justify-center text-[#B9A6FF]">
                  <Database className="w-3.5 h-3.5" />
                </span>
                <span className="absolute top-3 right-2 w-8 h-8 rounded-full bg-[#241A46] border border-[#B9A6FF]/35 flex items-center justify-center text-[#B9A6FF]">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <span className="absolute bottom-3 left-2 w-8 h-8 rounded-full bg-[#241A46] border border-[#B9A6FF]/35 flex items-center justify-center text-[#B9A6FF]">
                  <Globe className="w-3.5 h-3.5" />
                </span>
                <span className="absolute bottom-3 right-2 w-8 h-8 rounded-full bg-[#241A46] border border-[#B9A6FF]/35 flex items-center justify-center text-[#B9A6FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-4">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#B9A6FF] transition-colors">
                Performance &amp; SEO
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#B8B9C5]">
                Ongoing technical architecture and Core Web Vitals optimization to keep your flagship fast, visible, and built to scale.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
