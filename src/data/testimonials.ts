export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  role: string;
  company: string;
  projectType: string;
  portraitUrl?: string;
}

/**
 * Populate this array with verified, authentic client testimonials once approved for publication.
 * When empty, the UI gracefully displays Fovala's verified studio engagement standards
 * without fabricating client names, quotes, or organizations.
 */
export const AUTHENTIC_TESTIMONIALS: Testimonial[] = [];

export interface StudioStandardSlide {
  id: string;
  quote: string;
  authorLabel: string;
  disciplineLabel: string;
  engagementStage: string;
  monogram: string;
}

export const STUDIO_STANDARDS: StudioStandardSlide[] = [
  {
    id: 'standard-craft',
    quote:
      'Every Fovala engagement begins with bespoke typographic art direction and architectural clarity—never recycled agency templates or inflated vanity metrics.',
    authorLabel: 'Fovala Design Direction',
    disciplineLabel: 'Editorial UI/UX & Brand Systems',
    engagementStage: 'Verified Studio Standard · Discovery & Craft',
    monogram: 'FD',
  },
  {
    id: 'standard-engineering',
    quote:
      'Whether shipping on Shopify, Webflow, WordPress, or Framer, we engineer clean, maintainable foundations tuned for responsiveness, accessibility, and lasting speed.',
    authorLabel: 'Fovala Engineering Practice',
    disciplineLabel: 'Cross-Platform Web Architecture',
    engagementStage: 'Verified Studio Standard · Build & Performance',
    monogram: 'FE',
  },
  {
    id: 'standard-partnership',
    quote:
      'Client testimonials are published here strictly upon verified project completion and explicit partner approval—reflecting genuine outcomes and transparent collaboration.',
    authorLabel: 'Fovala Client Partnership',
    disciplineLabel: 'Transparent Delivery & Launch',
    engagementStage: 'Verified Studio Standard · Client Stories Ready',
    monogram: 'FP',
  },
];
