import React from 'react';
import { Mail } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface FinalCtaFooterProps {
  onStartProject: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const FinalCtaFooter: React.FC<FinalCtaFooterProps> = ({
  onStartProject,
  onNavigateSection,
}) => {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigateSection(id);
  };

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background:
          'radial-gradient(ellipse 85% 65% at 22% 15%, rgba(117, 84, 217, 0.36) 0%, transparent 58%), radial-gradient(ellipse 75% 60% at 80% 25%, rgba(86, 141, 235, 0.38) 0%, transparent 55%), radial-gradient(ellipse 90% 70% at 50% 95%, rgba(158, 184, 255, 0.22) 0%, transparent 65%), linear-gradient(180deg, #0D0E1B 0%, #151733 52%, #111329 100%)',
      }}
    >
      {/* Luminous Cosmic Horizon Wave Separator (no black box) */}
      <div aria-hidden="true" className="relative w-full h-16 sm:h-24 overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="footerHorizonGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#568DEB" stopOpacity="0.15" />
              <stop offset="35%" stopColor="#B9A6FF" stopOpacity="0.9" />
              <stop offset="65%" stopColor="#568DEB" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#7554D9" stopOpacity="0.15" />
            </linearGradient>
            <linearGradient id="footerWaveFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7554D9" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#141736" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0,78 C320,18 680,108 1040,48 C1220,18 1340,38 1440,58 L1440,120 L0,120 Z"
            fill="url(#footerWaveFill)"
          />
          <path
            d="M0,78 C320,18 680,108 1040,48 C1220,18 1340,38 1440,58"
            fill="none"
            stroke="url(#footerHorizonGlow)"
            strokeWidth="2.2"
          />
          <path
            d="M0,96 C380,46 760,115 1120,62 C1270,40 1370,56 1440,70"
            fill="none"
            stroke="url(#footerHorizonGlow)"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
        </svg>
      </div>

      {/* Main Seamless Footer Row (matching original Turn 1 footer layout & palette) */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 pb-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-8">
          {/* Left: Transparent Hero-Matched Brand Lockup (Header & Footer only) */}
          <a
            href="#top"
            onClick={(e) => handleNav(e, 'top')}
            aria-label="Fovala back to top"
            className="inline-flex items-center group"
          >
            <BrandLogo heightClass="h-8 sm:h-9" variant="hero" />
          </a>

          {/* Center: Clean Footer Navigation */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-7 sm:gap-10 text-sm text-[#E4E1F5]"
          >
            <a href="#work" onClick={(e) => handleNav(e, 'work')} className="hover:text-[#B9A6FF] transition-colors">
              Work
            </a>
            <a href="#services" onClick={(e) => handleNav(e, 'services')} className="hover:text-[#B9A6FF] transition-colors">
              Services
            </a>
            <a href="#about" onClick={(e) => handleNav(e, 'about')} className="hover:text-[#B9A6FF] transition-colors">
              About
            </a>
            <a href="#contact" onClick={(e) => handleNav(e, 'contact')} className="hover:text-[#B9A6FF] transition-colors">
              Contact
            </a>
          </nav>

          {/* Right: Minimal Social Icon Badges + Contact */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onStartProject}
              aria-label="Fovala on X"
              className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 hover:border-[#B9A6FF] hover:bg-[#7554D9]/30 flex items-center justify-center text-xs font-medium text-[#E4E1F5] hover:text-white transition-colors"
            >
              𝕏
            </button>
            <button
              type="button"
              onClick={onStartProject}
              aria-label="Fovala on LinkedIn"
              className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 hover:border-[#B9A6FF] hover:bg-[#7554D9]/30 flex items-center justify-center text-xs font-semibold text-[#E4E1F5] hover:text-white transition-colors"
            >
              in
            </button>
            <button
              type="button"
              onClick={onStartProject}
              aria-label="Fovala on YouTube"
              className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 hover:border-[#B9A6FF] hover:bg-[#7554D9]/30 flex items-center justify-center text-[10px] text-[#E4E1F5] hover:text-white transition-colors"
            >
              ▶
            </button>
            <button
              type="button"
              onClick={onStartProject}
              aria-label="Email Fovala Studio"
              className="w-8 h-8 rounded-lg bg-white/[0.08] border border-white/15 hover:border-[#B9A6FF] hover:bg-[#7554D9]/30 flex items-center justify-center text-[#E4E1F5] hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Subtle Bottom Copyright Hairline (matching original Turn 1 footer) */}
        <div className="pt-6 border-t border-white/12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#C7C6DA]/80">
          <p>
            &copy; {new Date().getFullYear()} Fovala. All rights reserved. &nbsp;|&nbsp; Designed for a better digital tomorrow.
          </p>
          <button
            type="button"
            onClick={onStartProject}
            className="text-[#C7C6DA] hover:text-white transition-colors"
          >
            hello@fovala.studio
          </button>
        </div>
      </div>
    </footer>
  );
};
