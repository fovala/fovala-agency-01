/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { PROJECTS, type ProjectItem } from './data/projects';
import { IntroLoader } from './components/IntroLoader';
import { TopProgressAndCursor } from './components/TopProgressAndCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesDriveResultsSection } from './components/ServicesDriveResultsSection';
import { CapabilityCardsSection } from './components/CapabilityCardsSection';
import { CaseStudiesSliderSection } from './components/CaseStudiesSliderSection';
import { PortfolioSection } from './components/PortfolioSection';
import { AlphaTimelineSection } from './components/AlphaTimelineSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FinalCtaFooter } from './components/FinalCtaFooter';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<string>('Business Website Design');
  const [inquiryNote, setInquiryNote] = useState<string>('');

  const openContact = useCallback(
    (projectType = 'Business Website Design', note = '', pushHash = true) => {
      setInquiryType(projectType);
      setInquiryNote(note);
      setSelectedProject(null);
      setContactOpen(true);
      if (pushHash && window.location.hash !== '#contact') {
        window.history.pushState(null, '', '#contact');
      }
    },
    [],
  );

  const openProject = useCallback((project: ProjectItem, pushHash = true) => {
    setSelectedProject(project);
    if (pushHash) {
      window.history.pushState(null, '', `#project/${project.slug}`);
    }
  }, []);

  const closeOverlays = useCallback(() => {
    setSelectedProject(null);
    setContactOpen(false);
    if (
      window.location.hash === '#contact' ||
      window.location.hash.startsWith('#project/')
    ) {
      window.history.pushState(null, '', '#top');
    }
  }, []);

  const navigateToSection = useCallback(
    (sectionId: string) => {
      if (sectionId === 'contact') {
        openContact('Business Website Design', '', true);
        return;
      }

      setSelectedProject(null);
      setContactOpen(false);

      if (window.location.hash !== `#${sectionId}`) {
        window.history.pushState(null, '', `#${sectionId}`);
      }

      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [openContact],
  );

  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#contact') {
        setSelectedProject(null);
        setContactOpen(true);
        return;
      }
      if (hash.startsWith('#project/')) {
        const slug = hash.replace('#project/', '');
        const found = PROJECTS.find((p) => p.slug === slug) || null;
        setContactOpen(false);
        setSelectedProject(found);
        return;
      }

      setContactOpen(false);
      setSelectedProject(null);

      const id = hash.replace('#', '');
      if (id) {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    window.addEventListener('popstate', syncFromHash);
    return () => {
      window.removeEventListener('hashchange', syncFromHash);
      window.removeEventListener('popstate', syncFromHash);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#0D0E1B] text-[#F3F1F8]">
      <IntroLoader />
      <TopProgressAndCursor />

      <Navbar
        onStartProject={() => openContact('Business Website Design')}
        onNavigateSection={navigateToSection}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection
          onExploreWork={() => navigateToSection('work')}
          onStartProject={() => openContact('Business Website Design')}
        />

        {/* 2A. Services That Drive Results (4 Sculptural Dark Cards) */}
        <ServicesDriveResultsSection
          onSelectService={(projectType) => openContact(projectType)}
        />

        {/* 2B. 3-Column Violet Capability Spotlight Cards */}
        <CapabilityCardsSection
          onSelectCapability={(projectType) => openContact(projectType)}
        />

        {/* 3A. Case Studies 01/03 Fanned Showcase */}
        <CaseStudiesSliderSection onOpenProject={(project) => openProject(project)} />

        {/* 3B. Filterable Featured Projects Portfolio */}
        <PortfolioSection onOpenProject={(project) => openProject(project)} />

        {/* 5. Interactive Alpha Delivery Timeline */}
        <AlphaTimelineSection />

        {/* 6. Client Stories Slider */}
        <TestimonialsSection
          onStartProject={() => openContact('Business Website Design')}
        />
      </main>

      {/* 9. Cosmic Horizon Wave Footer */}
      <FinalCtaFooter
        onStartProject={() => openContact('Business Website Design')}
        onNavigateSection={navigateToSection}
      />

      <ProjectModal
        project={selectedProject}
        onClose={closeOverlays}
        onStartSimilar={(type) =>
          openContact(
            type,
            selectedProject
              ? `Inspired by the ${selectedProject.title} concept (${selectedProject.platform}).`
              : '',
          )
        }
      />

      <ContactModal
        open={contactOpen}
        initialProjectType={inquiryType}
        initialNote={inquiryNote}
        onClose={closeOverlays}
      />
    </div>
  );
}
