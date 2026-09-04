import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SystemDiagnosticsSection } from './components/SystemDiagnosticsSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { InteractiveTerminalModal } from './components/InteractiveTerminalModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ContactCardModal } from './components/ContactCardModal';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isContactCardOpen, setIsContactCardOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Global Keyboard shortcuts: press '~' or 'Ctrl+K' to toggle CLI Terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === '`' || e.key === '~') {
        const activeElem = document.activeElement;
        const isInput =
          activeElem instanceof HTMLInputElement ||
          activeElem instanceof HTMLTextAreaElement ||
          activeElem instanceof HTMLSelectElement;
        if (!isInput) {
          e.preventDefault();
          setIsTerminalOpen((prev) => !prev);
        }
      } else if (e.key === 'Escape') {
        setIsResumeOpen(false);
        setIsTerminalOpen(false);
        setIsContactCardOpen(false);
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'diagnostics', 'about', 'services', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleTechSelectFromDiagnostics = (tech: string) => {
    setSelectedTechFilter(tech);
    if (tech) {
      handleNavigate('projects');
    }
  };

  return (
    <div className="bg-[#121414] text-[#e2e2e2] min-h-screen flex flex-col font-sans selection:bg-[#00f2ff] selection:text-[#002022] overflow-x-hidden">
      {/* Fixed Cyber Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero with Interactive IDE Code Runner */}
        <HeroSection
          onViewWork={() => handleNavigate('projects')}
          onContact={() => handleNavigate('contact')}
          onOpenTerminal={() => setIsTerminalOpen(true)}
          onOpenContactCard={() => setIsContactCardOpen(true)}
        />

        {/* 2. System Diagnostics & Telemetry Metrics */}
        <SystemDiagnosticsSection
          onSelectTech={handleTechSelectFromDiagnostics}
          selectedTech={selectedTechFilter}
        />

        {/* 2.5. Personal About Section */}
        <AboutSection onOpenResume={() => setIsResumeOpen(true)} />

        {/* 3. Core Engineering Capabilities / Services */}
        <ServicesSection />

        {/* 4. Featured Projects (Khoje Khatam web_dev) */}
        <ProjectsSection
          selectedTechFilter={selectedTechFilter}
          onClearTechFilter={() => setSelectedTechFilter(null)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 5. Academic & Technical Education */}
        <EducationSection />

        {/* 6. Direct Transmission / Contact Console */}
        <ContactSection onOpenContactCard={() => setIsContactCardOpen(true)} />
      </main>

      {/* Cyber Footer */}
      <Footer onScrollToTop={() => handleNavigate('home')} />

      {/* Interactive CLI Terminal Modal */}
      <InteractiveTerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => {
          setIsTerminalOpen(false);
          setIsResumeOpen(true);
        }}
      />

      {/* Executive CV / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Architecture Specs Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Profile & Contact Card Popup Modal */}
      <ContactCardModal
        isOpen={isContactCardOpen}
        onClose={() => setIsContactCardOpen(false)}
      />
    </div>
  );
}
