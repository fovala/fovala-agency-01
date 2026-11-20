import React, { useMemo, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, type ProjectCategory, type ProjectItem } from '../data/projects';
import { ProjectMockupPreview } from './ProjectMockupPreview';

interface PortfolioSectionProps {
  onOpenProject: (project: ProjectItem) => void;
}

type FilterOption = 'All Projects' | ProjectCategory;

const FILTERS: FilterOption[] = ['All Projects', 'Business', 'E-commerce', 'Landing Pages'];

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onOpenProject }) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All Projects');
  const [showAll, setShowAll] = useState(false);

  const displayedProjects = useMemo(() => {
    const filtered =
      activeFilter === 'All Projects'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === activeFilter);

    if (activeFilter === 'All Projects' && !showAll) {
      return filtered.slice(0, 3);
    }
    return filtered;
  }, [activeFilter, showAll]);

  return (
    <section
      id="work"
      className="relative bg-luxury-ivory text-[#F3F1F8] py-20 sm:py-28 lg:py-32 overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Row: Editorial Title + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-5"
          >
            <div className="flex items-center gap-4">
              <span className="text-[11px] font-semibold tracking-[0.26em] text-[#9EB8FF] uppercase">
                Featured Work
              </span>
              <span className="h-[1px] w-12 bg-white/20" aria-hidden="true" />
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.85rem] leading-[1.1] tracking-[-0.015em] text-[#F3F1F8] [text-wrap:balance]">
              Stunning Designs.{' '}
              <span className="block">
                Real <span className="text-gradient-lavender">Results.</span>
              </span>
            </h2>
          </motion.div>

          {/* Filter Tabs + View All Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full bg-[#171932] border border-white/12 shadow-sm"
            >
              {FILTERS.map((filter) => {
                const isSelected = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => {
                      setActiveFilter(filter);
                      if (filter !== 'All Projects') setShowAll(true);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap shrink-0 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#9EB8FF] to-[#568DEB] text-[#0D0E1B] shadow-sm'
                        : 'text-[#B8B9C5] hover:text-white'
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            {activeFilter === 'All Projects' && (
              <button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="fx-glow-btn group inline-flex items-center gap-2.5 rounded-full border border-white/20 hover:border-[#9EB8FF] bg-white/[0.04] hover:bg-[#7554D9]/20 px-4 py-2 text-xs font-medium text-[#F3F1F8] transition-all whitespace-nowrap shrink-0"
              >
                <span>{showAll ? 'Show Featured (3)' : 'View All Projects'}</span>
                <span className="w-5 h-5 rounded-full border border-white/20 group-hover:border-[#9EB8FF] flex items-center justify-center">
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          <AnimatePresence mode="popLayout">
            {displayedProjects.map((project, idx) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col"
              >
                {/* Mockup Frame */}
                <button
                  type="button"
                  onClick={() => onOpenProject(project)}
                  aria-label={`View ${project.title} project case study`}
                  className="fx-glow-card relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-[0_18px_40px_rgba(6,8,20,0.45)] transition-all duration-300 text-left"
                >
                  <div className="w-full h-full group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <ProjectMockupPreview project={project} mode="desktop" />
                  </div>
                </button>

                {/* Clean Unboxed Metadata & View Project Link */}
                <div className="pt-4 px-1 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-[#F3F1F8] group-hover:text-[#9EB8FF] transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#B8B9C5] flex flex-wrap items-center gap-1.5">
                      <span>{project.industry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                      {project.isConcept && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>Concept Showcase</span>
                        </>
                      )}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9EB8FF] hover:text-white pt-0.5 transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
