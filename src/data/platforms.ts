export type PlatformId = 'wordpress' | 'shopify' | 'webflow' | 'wix' | 'framer' | 'figma';

export interface PlatformItem {
  id: PlatformId;
  name: string;
  role: string;
  accentColor: string;
  summary: string;
  deliverables: string[];
  orbitPosition: {
    lat: number;
    lon: number;
    radiusMultiplier: number;
    speed: number;
  };
}

export const PLATFORMS: PlatformItem[] = [
  {
    id: 'wordpress',
    name: 'WordPress',
    role: 'Enterprise CMS Architecture',
    accentColor: '#21759B',
    summary: 'Bespoke theme engineering, headless WordPress setups, and scalable editorial workflows built for performance.',
    deliverables: ['Custom Block Themes', 'Headless API Integration', 'Core Web Vitals Tuning'],
    orbitPosition: { lat: 34, lon: -128, radiusMultiplier: 1.46, speed: 0.14 },
  },
  {
    id: 'shopify',
    name: 'Shopify',
    role: 'High-Converting Commerce',
    accentColor: '#95BF47',
    summary: 'Luxury direct-to-consumer storefronts with custom Liquid sections, fast checkout journeys, and Hydrogen capabilities.',
    deliverables: ['Bespoke Storefront UI', 'Conversion Architecture', 'International Multi-Currency'],
    orbitPosition: { lat: -2, lon: -145, radiusMultiplier: 1.54, speed: 0.12 },
  },
  {
    id: 'webflow',
    name: 'Webflow',
    role: 'Visual Motion & CMS',
    accentColor: '#146EF5',
    summary: 'Pixel-accurate editorial marketing sites with fluid scroll choreography and clean, client-editable CMS collections.',
    deliverables: ['Client-First Architecture', 'Interactive Motion Systems', 'Rapid GTM Launches'],
    orbitPosition: { lat: -36, lon: -115, radiusMultiplier: 1.45, speed: 0.15 },
  },
  {
    id: 'wix',
    name: 'Wix Studio',
    role: 'Agile Business Presence',
    accentColor: '#FACC15',
    summary: 'Streamlined, responsive service websites engineered for fast iteration, bookings, and autonomous team updates.',
    deliverables: ['Responsive Grid Systems', 'Integrated Booking Flows', 'Editorial Brand Kits'],
    orbitPosition: { lat: 4, lon: 145, radiusMultiplier: 1.54, speed: 0.13 },
  },
  {
    id: 'framer',
    name: 'Framer',
    role: 'Interactive Product Stories',
    accentColor: '#00AAFF',
    summary: 'Ultra-fluid interactive brand launches and high-velocity landing experiences with custom code overrides.',
    deliverables: ['Interactive Prototypes', 'Micro-Interaction Craft', 'Instant Edge Hosting'],
    orbitPosition: { lat: -34, lon: 118, radiusMultiplier: 1.46, speed: 0.16 },
  },
  {
    id: 'figma',
    name: 'Figma',
    role: 'Design Systems & Craft',
    accentColor: '#A259FF',
    summary: 'Foundational design systems, multi-breakpoint art direction, and tokenized component libraries before a single line of code.',
    deliverables: ['Component Design Systems', 'Interactive Prototyping', 'Typography & Grid Specs'],
    orbitPosition: { lat: 36, lon: 122, radiusMultiplier: 1.48, speed: 0.11 },
  },
];
