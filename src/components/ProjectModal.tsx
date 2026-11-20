import React, { useEffect, useState } from 'react';
import { Monitor, Smartphone, X, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { ProjectItem } from '../data/projects';
import { ProjectMockupPreview } from './ProjectMockupPreview';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onStartSimilar: (projectType: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStartSimilar,
}) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    setViewMode('desktop');
  }, [project?.id]);

  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  const mapCategoryToProjectType = (cat: ProjectItem['category']): string => {
    if (cat === 'E-commerce') return 'E-commerce Website Design';
    if (cat === 'Landing Pages') return 'Landing Page Design';
    return 'Business Website Design';
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} project preview`}
          className="fixed inset-0 z-50 bg-[#0D0E1B]/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-3xl bg-[#131528] border border-white/15 text-white overflow-hidden shadow-[0_32px_90px_rgba(4,6,18,0.8)] my-auto"
          >
            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-6 sm:px-8 py-5 border-b border-white/10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-[#B9A6FF]">
                  {project.isConcept ? 'Concept Case Study' : 'Featured Project'} · {project.platform}
                </p>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-white mt-0.5">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                {/* Desktop / Mobile Frame Switcher */}
                <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-white/10">
                  <button
                    type="button"
                    onClick={() => setViewMode('desktop')}
                    aria-label="Desktop preview"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      viewMode === 'desktop'
                        ? 'bg-[#7554D9] text-white'
                        : 'text-[#B8B9C5] hover:text-white'
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('mobile')}
                    aria-label="Mobile preview"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      viewMode === 'mobile'
                        ? 'bg-[#7554D9] text-white'
                        : 'text-[#B8B9C5] hover:text-white'
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Mobile</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close project modal"
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[#B8B9C5] hover:text-white hover:border-white/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Preview Stage */}
            <div className="p-6 sm:p-8 bg-[#0D0E1B] border-b border-white/10">
              {viewMode === 'desktop' ? (
                <div className="w-full aspect-[16/9] max-h-[420px] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
                  <ProjectMockupPreview project={project} mode="desktop" />
                </div>
              ) : (
                <div className="py-2">
                  <ProjectMockupPreview project={project} mode="mobile" />
                </div>
              )}
            </div>

            {/* Project Architectural Details */}
            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              <div className="md:col-span-7 space-y-3">
                <p className="text-xs text-[#B8B9C5]">
                  {project.industry} · {project.category} · Built for {project.platform}
                </p>
                <p className="text-sm text-[#F3F1F8]/90 leading-relaxed">
                  {project.summary}
                </p>
              </div>

              <div className="md:col-span-5 space-y-4">
                <ul className="space-y-2">
                  {project.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-[#B8B9C5]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B9A6FF] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onStartSimilar(mapCategoryToProjectType(project.category))}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7554D9] to-[#568DEB] hover:opacity-95 text-white text-xs font-medium py-3 px-5 transition-opacity"
                >
                  <span>Commission a Similar Experience</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
