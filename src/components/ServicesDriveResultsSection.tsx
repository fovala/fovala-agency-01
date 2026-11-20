import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesDriveResultsSectionProps {
  onSelectService: (projectType: string) => void;
}

const RESULT_SERVICES = [
  {
    num: '01',
    title: 'Web Design',
    description:
      'Designing clean, well-structured websites that balance editorial aesthetics, usability, and measurable business goals.',
    projectType: 'Business Website Design',
    image: '/assets/services/web-design.jpg',
    imageAlt:
      'Responsive website design displayed across desktop, laptop, and tablet devices on a wooden studio desk',
  },
  {
    num: '02',
    title: 'Branding',
    description:
      'Building cohesive visual identities through sculptural marks, color systems, refined typography, and design guidelines.',
    projectType: 'Custom Digital Experience',
    image: '/assets/services/branding.jpg',
    imageAlt:
      'Brand designer reviewing sans serif, serif, and script typography pairings on a studio laptop',
  },
  {
    num: '03',
    title: 'Development',
    description:
      'Engineering flexible, content-driven websites across modern stacks that stay fast, accessible, and easy to manage.',
    projectType: 'Custom Digital Experience',
    image: '/assets/services/development.jpg',
    imageAlt:
      'Clean JavaScript application code open inside a dark-mode developer workspace on a laptop screen',
  },
  {
    num: '04',
    title: 'Design Consulting',
    description:
      'Providing strategic design direction to elevate flagship products, conversion journeys, and digital brand experiences.',
    projectType: 'Website Redesign',
    image: '/assets/services/design-consulting.jpg',
    imageAlt:
      'Design strategist taking structured project notes beside a laptop during a product consultation',
  },
] as const;

export const ServicesDriveResultsSection: React.FC<ServicesDriveResultsSectionProps> = ({
  onSelectService,
}) => {
  return (
    <section
      id="services"
      className="scroll-mt-20 relative bg-[#0D0E1B] text-white py-16 sm:py-24 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 75% 40%, rgba(86, 141, 235, 0.14) 0%, rgba(117, 84, 217, 0.12) 48%, transparent 80%)',
        }}
      />
      <div className="relative z-10 max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="rounded-[28px] bg-[#121428]/90 border border-white/12 px-5 sm:px-10 py-12 sm:py-16 shadow-[0_30px_80px_rgba(4,6,18,0.65)]">
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-center text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.025em] text-[#F3F1F8] mb-12"
          >
            Services that{' '}
            <span className="font-serif-display font-bold text-gradient-lavender">
              drive results
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESULT_SERVICES.map((item, idx) => (
              <motion.article
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="fx-glow-card group rounded-2xl bg-[#161831] border border-white/10 p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-8">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium tabular-nums text-[#B8B9C5]">
                      {item.num}
                    </span>

                    <button
                      type="button"
                      onClick={() => onSelectService(item.projectType)}
                      className="fx-glow-btn inline-flex items-center gap-1.5 rounded-full border border-white/20 hover:border-[#9EB8FF] hover:text-[#9EB8FF] px-3 py-1 text-[11px] font-medium text-white/90 transition-colors"
                    >
                      <span>More info</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <h3 className="text-xl font-medium text-white">{item.title}</h3>
                  <p className="mt-2.5 text-xs leading-relaxed text-[#B8B9C5]/85">
                    {item.description}
                  </p>
                </div>

                {/* Real-life Service Photography Frame */}
                <div className="mt-6 h-44 rounded-xl bg-[#0B0C18] border border-white/[0.08] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0D0E1B]/55 via-transparent to-[#568DEB]/10"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
