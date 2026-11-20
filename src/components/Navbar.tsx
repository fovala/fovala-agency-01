import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandLogo } from './BrandLogo';
import { MagneticButton } from './MagneticButton';

interface NavbarProps {
  onStartProject: () => void;
  onNavigateSection: (sectionId: string) => void;
}

const NAV_LINKS = [
  { label: 'Work', id: 'work' },
  { label: 'Services', id: 'services' },
  { label: 'About', id: 'about' },
  { label: 'Contact', id: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onStartProject, onNavigateSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigateSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#0D0E1B]/90 backdrop-blur-md border-b border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.45)]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Transparent Full Brand Lockup (Header only) */}
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, 'top')}
          aria-label="Fovala Home"
          className="whitespace-nowrap shrink-0 flex items-center"
        >
          <BrandLogo heightClass="h-7 sm:h-8" variant="hero" />
        </a>

        {/* Zone 2: 4 Single-line Navigation Links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleLinkClick(e, link.id)}
              className="group relative text-sm font-normal text-[#8D92AD] hover:text-[#CBD0EA] transition-colors whitespace-nowrap shrink-0 py-1"
            >
              <span>{link.label}</span>
              <span
                aria-hidden="true"
                className="absolute left-0 right-0 -bottom-0.5 h-[1px] bg-gradient-to-r from-[#9EB8FF]/70 to-[#568DEB]/70 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200"
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Let's Talk Primary Pill CTA + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <MagneticButton
            type="button"
            onClick={onStartProject}
            className="fx-glow-btn hidden sm:inline-flex items-center gap-2 rounded-full border border-[#9EB8FF]/20 hover:border-[#9EB8FF]/45 bg-[#14172D]/60 hover:bg-[#1B1F3B]/80 px-5 py-2 text-xs font-medium text-[#C5CAE4] hover:text-[#E2E6FA] transition-all duration-200 whitespace-nowrap shrink-0"
          >
            <span>Let&apos;s Talk</span>
          </MagneticButton>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="fx-glow-btn md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#9EB8FF]/20 text-[#C5CAE4] hover:border-[#9EB8FF]/45 hover:text-[#E2E6FA] transition-colors"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Smooth Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[#0D0E1B]/98 border-b border-white/10 px-6 py-6"
          >
            <nav className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className="text-base font-medium text-[#F3F1F8] hover:text-[#B9A6FF] py-1.5 border-b border-white/5 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  onStartProject();
                }}
                className="fx-glow-btn mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#7554D9] hover:bg-[#568DEB] text-white text-sm font-medium py-3 px-5 transition-colors"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
