import React from 'react';
import { Star, Menu, ArrowRight, Check } from 'lucide-react';
import type { ProjectItem } from '../data/projects';

interface ProjectMockupPreviewProps {
  project: ProjectItem;
  mode?: 'desktop' | 'mobile' | 'mobile-sheet';
  highlightPrimary?: boolean;
}

export const ProjectMockupPreview: React.FC<ProjectMockupPreviewProps> = ({
  project,
  mode = 'desktop',
  highlightPrimary = false,
}) => {
  const isLight =
    project.theme === 'light-architectural' || project.theme === 'ivory-editorial';

  const surfaceBg = isLight
    ? 'bg-[#F6F5FB] text-[#0D0E1B]'
    : 'bg-[#0F1124] text-[#F3F1F8]';

  const subCardBg = isLight
    ? 'bg-white border-black/8 shadow-[0_2px_10px_rgba(13,14,27,0.06)]'
    : 'bg-[#171A34] border-white/10';

  const mutedText = isLight ? 'text-[#4B4E63]' : 'text-[#B8B9C5]';

  const accentBtn = isLight
    ? 'bg-gradient-to-r from-[#0D0E1B] to-[#23274D] text-white'
    : 'bg-gradient-to-r from-[#9EB8FF] via-[#B9A6FF] to-[#568DEB] text-[#0D0E1B]';

  if (mode === 'mobile-sheet') {
    return (
      <div
        className={`relative w-full h-full flex flex-col overflow-hidden select-none ${surfaceBg}`}
      >
        {/* Mobile Status + Header Navbar */}
        <div
          className={`px-3 pt-2 pb-1.5 flex items-center justify-between border-b shrink-0 ${
            isLight ? 'border-black/8 bg-white/95' : 'border-white/10 bg-[#13152A]'
          }`}
        >
          <span className="text-[9px] font-bold tracking-tight truncate">
            {project.brandMark}
          </span>
          <div className="flex items-center gap-1.5">
            <span
              className={`px-1.5 py-0.5 rounded-full text-[7px] font-semibold whitespace-nowrap ${accentBtn}`}
            >
              {project.ctaLabel}
            </span>
            <Menu className="w-2.5 h-2.5 opacity-60" />
          </div>
        </div>

        {/* Mobile Hero Banner with Real Photo */}
        <div className="relative h-[108px] sm:h-[124px] w-full overflow-hidden shrink-0">
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#0D0E1B]/90 via-[#0D0E1B]/45 to-[#0D0E1B]/20"
          />
          <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
            <span className="text-[7px] uppercase tracking-[0.18em] text-[#9EB8FF] font-semibold">
              {project.industry}
            </span>
            <h4 className="font-serif-display text-[13px] sm:text-[15px] leading-[1.08] mt-0.5 whitespace-pre-line">
              {project.mockupHeadline}
            </h4>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#9EB8FF] to-[#568DEB] text-[#0D0E1B] text-[7px] font-semibold px-2 py-0.5">
                {project.ctaLabel}
                <ArrowRight className="w-2 h-2" />
              </span>
              <span className="text-[7px] text-white/80 truncate">{project.ratingLabel}</span>
            </div>
          </div>
        </div>

        {/* Interactive Booking / Quick Filter Strip */}
        <div className="px-2.5 pt-2 shrink-0">
          <div
            className={`rounded-lg border px-2 py-1.5 ${
              isLight
                ? 'bg-white border-black/10 shadow-xs'
                : 'bg-[#161831] border-white/12'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[7px] font-semibold uppercase tracking-wider text-[#568DEB]">
                {project.quickBarTitle}
              </span>
              <span className="text-[6.5px] opacity-60">{project.domain}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {project.quickBarFields.map((field) => (
                <div
                  key={field}
                  className={`rounded px-1 py-0.5 text-[6.5px] font-medium truncate text-center ${
                    isLight ? 'bg-[#EFEFF8] text-[#1A1D35]' : 'bg-white/[0.06] text-[#E4E1F8]'
                  }`}
                >
                  {field}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Services / Products Photo Cards */}
        <div className="px-2.5 pt-2 pb-2 flex-1 flex flex-col justify-between min-h-0">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[8px] font-semibold tracking-tight">
                Popular {project.category === 'E-commerce' ? 'Products' : 'Services'}
              </span>
              <span className={`text-[7px] ${mutedText}`}>View all →</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {project.showcaseCards.map((card) => (
                <div
                  key={card.title}
                  className={`rounded-lg border overflow-hidden flex flex-col ${subCardBg}`}
                >
                  <div className="h-11 sm:h-12 w-full overflow-hidden">
                    <img
                      src={card.image}
                      alt={card.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-1">
                    <p className="text-[6.5px] font-semibold leading-tight truncate">
                      {card.title}
                    </p>
                    <p className="text-[6px] font-medium text-[#568DEB] mt-0.5 truncate">
                      {card.priceOrMeta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Client Review & Mobile Footer Strip */}
          <div className="space-y-1.5 pt-1.5">
            <div
              className={`rounded-lg border px-2 py-1 flex items-center gap-1.5 ${subCardBg}`}
            >
              <div className="flex items-center gap-0.5 text-[#568DEB] shrink-0">
                <Star className="w-2 h-2 fill-current" />
                <span className="text-[7px] font-bold">5.0</span>
              </div>
              <p className={`text-[6.5px] truncate ${mutedText}`}>
                “{project.testimonialQuote}”
              </p>
            </div>

            <div
              className={`flex items-center justify-between text-[7px] pt-1 border-t ${
                isLight ? 'border-black/10 text-[#4B4E63]' : 'border-white/10 text-[#B8B9C5]'
              }`}
            >
              <span className="font-medium truncate">
                {highlightPrimary ? 'Mobile Ready · 100% Responsive' : project.platform}
              </span>
              <span className="text-[#568DEB] font-semibold shrink-0">Open →</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'mobile') {
    return (
      <div className="mx-auto w-[280px] rounded-[36px] border-[6px] border-[#1D1F2C] bg-[#080910] p-2 shadow-2xl">
        <div className="relative h-[500px] rounded-[28px] overflow-hidden flex flex-col">
          <div className="bg-[#0D0E1B] px-4 py-1.5 flex items-center justify-between text-[9px] text-white/75 shrink-0">
            <span>9:41</span>
            <div className="w-14 h-3 rounded-full bg-black border border-white/10" />
            <span>5G</span>
          </div>
          <div className="flex-1 min-h-0">
            <ProjectMockupPreview project={project} mode="mobile-sheet" highlightPrimary />
          </div>
        </div>
      </div>
    );
  }

  // mode === 'desktop' -> Crisp full website frame for "Stunning Designs. Real Results." & Desktop Modal
  return (
    <div
      className={`relative w-full h-full flex flex-col overflow-hidden select-none ${surfaceBg}`}
    >
      {/* Realistic Browser Chrome + Website Navbar */}
      <div
        className={`px-3.5 py-2 flex items-center justify-between gap-2 border-b shrink-0 ${
          isLight ? 'border-black/8 bg-white/95' : 'border-white/10 bg-[#121428]'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex items-center gap-1 shrink-0" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F56]/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFBD2E]/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F]/80" />
          </div>
          <span className="text-[10px] font-bold tracking-tight truncate">
            {project.brandMark}
          </span>
          <span
            className={`hidden sm:inline-block text-[8px] px-1.5 py-0.5 rounded bg-black/5 truncate ${
              isLight ? 'bg-black/[0.04] text-[#4B4E63]' : 'bg-white/[0.06] text-[#B8B9C5]'
            }`}
          >
            {project.domain}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {project.navLinks.map((link) => (
            <span key={link} className={`hidden sm:inline text-[8px] font-medium ${mutedText}`}>
              {link}
            </span>
          ))}
          <span
            className={`px-2.5 py-0.5 rounded-full text-[8px] font-semibold ${accentBtn}`}
          >
            {project.ctaLabel}
          </span>
        </div>
      </div>

      {/* Above-the-Fold Split Hero */}
      <div className="px-3.5 pt-2.5 pb-2 grid grid-cols-12 gap-2.5 items-center flex-1 min-h-0">
        <div className="col-span-6 flex flex-col justify-center space-y-1.5">
          <span className="inline-flex items-center gap-1 text-[7.5px] font-semibold uppercase tracking-[0.14em] text-[#568DEB]">
            <Check className="w-2.5 h-2.5" />
            {project.industry}
          </span>
          <h4 className="font-serif-display text-[15px] sm:text-[18px] leading-[1.06] tracking-tight whitespace-pre-line">
            {project.mockupHeadline}
          </h4>
          <p className={`text-[8.5px] leading-snug line-clamp-2 ${mutedText}`}>
            {project.mockupTagline}
          </p>
          <div className="pt-0.5 flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[8px] font-semibold ${accentBtn}`}
            >
              {project.ctaLabel}
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
            <span className={`text-[7.5px] font-medium ${mutedText}`}>
              {project.ratingLabel}
            </span>
          </div>
        </div>

        {/* Hero Real Photography Window */}
        <div className="col-span-6 h-full max-h-[118px] rounded-xl overflow-hidden border border-white/15 shadow-md relative">
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0E1B]/40 via-transparent to-transparent"
          />
        </div>
      </div>

      {/* Lower Website Section: 3 Real Service / Product Cards */}
      <div className="px-3.5 pb-2.5 shrink-0">
        <div className="grid grid-cols-3 gap-2">
          {project.showcaseCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-lg border p-1.5 flex items-center gap-1.5 ${subCardBg}`}
            >
              <img
                src={card.image}
                alt={card.title}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded object-cover shrink-0"
              />
              <div className="min-w-0">
                <p className="text-[7.5px] font-semibold leading-tight truncate">
                  {card.title}
                </p>
                <p className="text-[7px] font-medium text-[#568DEB] truncate">
                  {card.priceOrMeta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
