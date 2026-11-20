export type ServiceIllustrationType =
  | 'business'
  | 'ecommerce'
  | 'landing'
  | 'wordpress'
  | 'shopify'
  | 'redesign';

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  illustration: ServiceIllustrationType;
  projectTypeValue: string;
  description: string;
  deliverables: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'business-website-design',
    title: 'Business Website Design',
    subtitle: 'Grow your brand online.',
    illustration: 'business',
    projectTypeValue: 'Business Website Design',
    description:
      'Editorial corporate flagships engineered to elevate brand authority, articulate complex value propositions, and convert enterprise decision-makers.',
    deliverables: [
      'Bespoke art direction & typography system',
      'Responsive multi-device layout architecture',
      'Technical SEO & performance optimization',
    ],
  },
  {
    id: 'ecommerce-website-design',
    title: 'E-commerce Website Design',
    subtitle: 'Sell smarter, grow bigger.',
    illustration: 'ecommerce',
    projectTypeValue: 'E-commerce Website Design',
    description:
      'Tactile digital flagships that unite luxury merchandising with frictionless product discovery, cart drawers, and checkout conversion.',
    deliverables: [
      'Custom product storytelling & lookbook layouts',
      'Streamlined cart & variant selection UX',
      'Mobile-first thumb-zone checkout flow',
    ],
  },
  {
    id: 'landing-page-design',
    title: 'Landing Page Design',
    subtitle: 'Turn clicks into customers.',
    illustration: 'landing',
    projectTypeValue: 'Landing Page Design',
    description:
      'Focused, narrative-driven campaign pages crafted for product launches, fundraising milestones, and high-intent acquisition.',
    deliverables: [
      'Conversion-oriented narrative hierarchy',
      'Interactive product demonstrations',
      'Fast-loading edge deployment',
    ],
  },
  {
    id: 'wordpress-solutions',
    title: 'WordPress Solutions',
    subtitle: 'Power your site with WP.',
    illustration: 'wordpress',
    projectTypeValue: 'WordPress Solutions',
    description:
      'Clean, maintainable custom WordPress engineering without bloated page builders—giving marketing teams effortless publishing control.',
    deliverables: [
      'Custom Gutenberg blocks & ACF schemas',
      'Hardened security & caching architecture',
      'Editorial workflow & multilingual setup',
    ],
  },
  {
    id: 'shopify-store-solutions',
    title: 'Shopify Store Solutions',
    subtitle: 'Build. Sell. Scale.',
    illustration: 'shopify',
    projectTypeValue: 'Shopify Store Solutions',
    description:
      'End-to-end Shopify and Shopify Plus builds featuring custom Online Store 2.0 themes, subscriptions, and global storefront scaling.',
    deliverables: [
      'Custom OS 2.0 modular theme architecture',
      'Third-party ERP & fulfillment integrations',
      'Merchandising & bundle logic setup',
    ],
  },
  {
    id: 'website-redesign',
    title: 'Website Redesign',
    subtitle: 'Modernize. Perform better.',
    illustration: 'redesign',
    projectTypeValue: 'Website Redesign',
    description:
      'Comprehensive visual and architectural transformation for established brands ready to leave outdated templates behind.',
    deliverables: [
      'UX audit & conversion bottleneck analysis',
      'Modernized design system & motion language',
      'Zero-downtime migration & URL preservation',
    ],
  },
];
