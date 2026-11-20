export type ProjectCategory = 'Business' | 'E-commerce' | 'Landing Pages';

export interface ShowcaseMiniCard {
  title: string;
  priceOrMeta: string;
  image: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  domain: string;
  brandMark: string;
  navLinks: string[];
  ctaLabel: string;
  mockupHeadline: string;
  mockupTagline: string;
  industry: string;
  category: ProjectCategory;
  platform: string;
  isConcept: boolean;
  theme:
    | 'dark-indigo'
    | 'light-architectural'
    | 'dark-violet-wave'
    | 'ivory-editorial'
    | 'midnight-slate'
    | 'cobalt-launch';
  heroImage: string;
  secondaryImage: string;
  ratingLabel: string;
  quickBarTitle: string;
  quickBarFields: string[];
  showcaseCards: ShowcaseMiniCard[];
  testimonialQuote: string;
  testimonialAuthor: string;
  summary: string;
  highlights: string[];
  accentHex: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'veloce-ecommerce',
    slug: 'veloce-nextgen-ecommerce',
    title: 'Veloce Athletics',
    domain: 'veloceathletics.com',
    brandMark: 'VELOCE',
    navLinks: ['Footwear', 'Apparel', 'Lookbook'],
    ctaLabel: 'Shop Drop',
    mockupHeadline: 'Engineered For\nPure Velocity',
    mockupTagline: 'Limited carbon-plate running drops and technical studio gear.',
    industry: 'E-commerce Store',
    category: 'E-commerce',
    platform: 'Shopify Plus',
    isConcept: true,
    theme: 'dark-indigo',
    heroImage: '/assets/showcase/ecommerce-run.jpg',
    secondaryImage: '/assets/showcase/ecommerce-hero.jpg',
    ratingLabel: '4.9 ★ · 1.2k Verified Buyers',
    quickBarTitle: 'Select Drop Spec',
    quickBarFields: ['Men US 10', 'Carbon Black', 'Express Free'],
    showcaseCards: [
      { title: 'Apex Carbon V2', priceOrMeta: '$195', image: '/assets/showcase/ecommerce-run.jpg' },
      { title: 'Aero Knit Pro', priceOrMeta: '$160', image: '/assets/showcase/ecommerce-hero.jpg' },
      { title: 'Tempo Track Low', priceOrMeta: '$145', image: '/assets/showcase/ecommerce-run.jpg' },
    ],
    testimonialQuote: 'Fastest checkout experience we have ever shipped on Shopify Plus.',
    testimonialAuthor: 'Marcus Chen · Head of Digital',
    summary:
      'A high-converting athletic e-commerce flagship featuring instant size filtering, live inventory badges, a sticky quick-add bag drawer, and editorial lookbook chapters.',
    highlights: [
      'Real-time size selector and instant slide-over shopping bag',
      'Editorial product storytelling tuned for mobile conversion',
      'Sub-second collection filtering across 120+ performance SKUs',
    ],
    accentHex: '#7554D9',
  },
  {
    id: 'purespace-cleaning',
    slug: 'purespace-cleaning-service',
    title: 'PureSpace Cleaning',
    domain: 'purespaceclean.com',
    brandMark: 'PureSpace',
    navLinks: ['Services', 'Pricing', 'Reviews'],
    ctaLabel: 'Book Clean',
    mockupHeadline: 'Spotless Homes,\nBooked in 60s',
    mockupTagline: 'Trusted eco-friendly residential and commercial deep cleaning crews.',
    industry: 'Cleaning Service',
    category: 'Business',
    platform: 'Webflow',
    isConcept: true,
    theme: 'light-architectural',
    heroImage: '/assets/showcase/cleaning-hero.jpg',
    secondaryImage: '/assets/showcase/cleaning-kitchen.jpg',
    ratingLabel: '4.9 ★ · 680+ Local Homes',
    quickBarTitle: 'Instant Quote Estimator',
    quickBarFields: ['3 Bed · 2 Bath', 'Deep Clean', 'Tomorrow 9AM'],
    showcaseCards: [
      { title: 'Deep Home Clean', priceOrMeta: 'From $149', image: '/assets/showcase/cleaning-hero.jpg' },
      { title: 'Kitchen Sanitizing', priceOrMeta: 'From $89', image: '/assets/showcase/cleaning-kitchen.jpg' },
      { title: 'Office Care Plan', priceOrMeta: 'Weekly', image: '/assets/showcase/cleaning-hero.jpg' },
    ],
    testimonialQuote: 'Online bookings rose 3.4x in the first month after launching the instant estimator.',
    testimonialAuthor: 'Elena Brooks · Founder',
    summary:
      'A conversion-focused service website for a modern home and office cleaning brand—combining transparent flat-rate pricing calculators, service checklists, and one-tap recurring bookings.',
    highlights: [
      '60-second bedroom & frequency booking calculator',
      'Eco-certified service packages with clear transparent pricing',
      'Mobile-first appointment rescheduling and crew tracking',
    ],
    accentHex: '#568DEB',
  },
  {
    id: 'luminary-dental',
    slug: 'luminary-dental-studio',
    title: 'Luminary Dental',
    domain: 'luminarydental.studio',
    brandMark: 'Luminary',
    navLinks: ['Treatments', 'Doctors', 'Patients'],
    ctaLabel: 'Book Visit',
    mockupHeadline: 'Modern Dentistry,\nDesigned for Calm',
    mockupTagline: 'Cosmetic veneers, laser whitening, and gentle 3D aligner care.',
    industry: 'Dental Clinic',
    category: 'Business',
    platform: 'Webflow',
    isConcept: true,
    theme: 'ivory-editorial',
    heroImage: '/assets/showcase/dental-smile.jpg',
    secondaryImage: '/assets/showcase/dental-hero.jpg',
    ratingLabel: '5.0 ★ · 510+ Patient Reviews',
    quickBarTitle: 'Reserve Consultation',
    quickBarFields: ['New Patient Exam', 'Dr. Hannah Lin', 'Thu 11:30 AM'],
    showcaseCards: [
      { title: 'Laser Whitening', priceOrMeta: '45 Min', image: '/assets/showcase/dental-smile.jpg' },
      { title: 'Porcelain Veneers', priceOrMeta: 'Free Consult', image: '/assets/showcase/dental-hero.jpg' },
      { title: '3D Clear Aligners', priceOrMeta: '$129 / mo', image: '/assets/showcase/dental-smile.jpg' },
    ],
    testimonialQuote: 'Patients consistently tell us the website made them feel comfortable before arriving.',
    testimonialAuthor: 'Dr. Hannah Lin · Lead DDS',
    summary:
      'A serene, high-trust digital clinic website engineered to turn local search visitors into booked dental consultations with clear treatment guides, doctor bios, and real-time slot booking.',
    highlights: [
      'Dedicated treatment pages for implants, veneers, and aligners',
      'Direct new-patient appointment request with insurance verification',
      'Accessible typography and calm mobile patient onboarding',
    ],
    accentHex: '#9EB8FF',
  },
  {
    id: 'kestrel-architecture',
    slug: 'kestrel-architectural-studio',
    title: 'Kestrel Architecture',
    domain: 'kestrelstudio.com',
    brandMark: 'KESTREL',
    navLinks: ['Projects', 'Practice', 'Journal'],
    ctaLabel: 'Inquire',
    mockupHeadline: 'Spatial Craft\nAcross Borders',
    mockupTagline: 'Bespoke residential architecture and warm contemporary interiors.',
    industry: 'Architecture & Interiors',
    category: 'Business',
    platform: 'Webflow',
    isConcept: true,
    theme: 'midnight-slate',
    heroImage: '/assets/showcase/arch-hero.jpg',
    secondaryImage: '/assets/showcase/cleaning-kitchen.jpg',
    ratingLabel: '18 International Design Awards',
    quickBarTitle: 'Commission Scope',
    quickBarFields: ['Private Residence', 'Full Interior', 'Q3 Start'],
    showcaseCards: [
      { title: 'Nordic Timber Lounge', priceOrMeta: 'Zurich', image: '/assets/showcase/arch-hero.jpg' },
      { title: 'Atrium Kitchen Villa', priceOrMeta: 'Kyoto', image: '/assets/showcase/cleaning-kitchen.jpg' },
      { title: 'Courtyard Residence', priceOrMeta: 'Oslo', image: '/assets/showcase/arch-hero.jpg' },
    ],
    testimonialQuote: 'An architectural portfolio that frames our photography with museum-grade restraint.',
    testimonialAuthor: 'Soren Lindqvist · Principal',
    summary:
      'A calm, daylight-inspired monograph website showcasing commercial commissions, material palettes, floor plans, and direct RFP inquiry workflows.',
    highlights: [
      'Full-bleed project dossiers with material specification tags',
      'Mobile-responsive lookbook tailored for private client reviews',
      'Streamlined architectural commission brief drawer',
    ],
    accentHex: '#568DEB',
  },
  {
    id: 'solis-atelier',
    slug: 'solis-botanical-atelier',
    title: 'Solis Atelier',
    domain: 'solisatelier.co',
    brandMark: 'SOLIS',
    navLinks: ['Skincare', 'Rituals', 'Refills'],
    ctaLabel: 'Shop Now',
    mockupHeadline: 'Botanical Skin\nDaily Rituals',
    mockupTagline: 'Small-batch barrier creams and cold-pressed serums delivered monthly.',
    industry: 'Skincare E-commerce',
    category: 'E-commerce',
    platform: 'Shopify',
    isConcept: true,
    theme: 'cobalt-launch',
    heroImage: '/assets/showcase/skincare-hero.jpg',
    secondaryImage: '/assets/showcase/skincare-hero.jpg',
    ratingLabel: '4.9 ★ · 940+ Clean Beauty Reviews',
    quickBarTitle: 'Build Your Routine',
    quickBarFields: ['Dry & Sensitive', 'Refill Every 30d', 'Save 15%'],
    showcaseCards: [
      { title: 'Ceramide Cloud Cream', priceOrMeta: '$68', image: '/assets/showcase/skincare-hero.jpg' },
      { title: 'Calm Barrier Serum', priceOrMeta: '$72', image: '/assets/showcase/skincare-hero.jpg' },
      { title: 'Evening Recovery Set', priceOrMeta: '$124', image: '/assets/showcase/skincare-hero.jpg' },
    ],
    testimonialQuote: 'Subscription signups jumped 48% once we introduced the mobile routine builder.',
    testimonialAuthor: 'Clara Moreau · Co-Founder',
    summary:
      'A tactile direct-to-consumer skincare storefront balancing ingredient transparency, one-tap refill subscriptions, and effortless mobile checkout.',
    highlights: [
      'Interactive routine builder with skin-type recommendations',
      'Subscription cadence toggle baked directly into product cards',
      'Clean editorial ingredient glossary and clinical results section',
    ],
    accentHex: '#7554D9',
  },
  {
    id: 'aurelia-treasury',
    slug: 'aurelia-digital-finance',
    title: 'Aurelia Treasury',
    domain: 'aureliatreasury.io',
    brandMark: 'AURELIA',
    navLinks: ['Platform', 'Security', 'Pricing'],
    ctaLabel: 'Get Access',
    mockupHeadline: 'Global Treasury\nWithout Borders',
    mockupTagline: 'Multi-currency accounts, automated yield, and instant FX settlement.',
    industry: 'Financial Technology',
    category: 'Landing Pages',
    platform: 'Framer',
    isConcept: true,
    theme: 'dark-violet-wave',
    heroImage: '/assets/showcase/fintech-hero.jpg',
    secondaryImage: '/assets/showcase/fintech-hero.jpg',
    ratingLabel: '$4.2B+ Processed Annually',
    quickBarTitle: 'Live FX Settlement',
    quickBarFields: ['USD → EUR', '$250,000', '0.02% Fee'],
    showcaseCards: [
      { title: 'Treasury Vault', priceOrMeta: '4.85% APY', image: '/assets/showcase/fintech-hero.jpg' },
      { title: 'Global FX Desk', priceOrMeta: 'Instant', image: '/assets/showcase/fintech-hero.jpg' },
      { title: 'Corporate Cards', priceOrMeta: 'Unlimited', image: '/assets/showcase/fintech-hero.jpg' },
    ],
    testimonialQuote: 'Our enterprise demo requests doubled within two weeks of relaunch.',
    testimonialAuthor: 'David Park · VP Product',
    summary:
      'A high-contrast dark fintech launch experience pairing real-time FX settlement previews, SOC-2 security badges, and streamlined enterprise demo capture.',
    highlights: [
      'Interactive multi-currency settlement calculator inside the hero',
      'Crisp institutional typography tuned for CFO and founder buyers',
      'Responsive mobile dashboard preview with live liquidity metrics',
    ],
    accentHex: '#B9A6FF',
  },
];
