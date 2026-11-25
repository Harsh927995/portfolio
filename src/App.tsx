import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SystemDiagnosticsSection } from './components/SystemDiagnosticsSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { ProjectsSection } from './components/ProjectsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CyberCursor } from './components/CyberCursor';
import { Project } from './types';
import { ThemeId, getStoredTheme, applyTheme } from './data/themes';
import { LogoId, getStoredLogoId, getLogoById, applyLogoFavicon } from './data/logos';

const ResumeModal = lazy(() =>
  import('./components/ResumeModal').then((m) => ({ default: m.ResumeModal }))
);
const InteractiveTerminalModal = lazy(() =>
  import('./components/InteractiveTerminalModal').then((m) => ({ default: m.InteractiveTerminalModal }))
);
const ProjectDetailModal = lazy(() =>
  import('./components/ProjectDetailModal').then((m) => ({ default: m.ProjectDetailModal }))
);
const ContactCardModal = lazy(() =>
  import('./components/ContactCardModal').then((m) => ({ default: m.ContactCardModal }))
);
const LogoPickerModal = lazy(() =>
  import('./components/LogoPickerModal').then((m) => ({ default: m.LogoPickerModal }))
);

export default function App() {
  const [theme, setTheme] = useState<ThemeId>(() => getStoredTheme());
  const [logoId, setLogoId] = useState<LogoId>(() => getStoredLogoId());
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedTechFilter, setSelectedTechFilter] = useState<string | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState<boolean>(false);
  const [isContactCardOpen, setIsContactCardOpen] = useState<boolean>(false);
  const [isLogoPickerOpen, setIsLogoPickerOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const activeLogo = getLogoById(logoId);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    applyLogoFavicon(activeLogo);
  }, [activeLogo]);

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
        setIsLogoPickerOpen(false);
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

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <div className="bg-surface text-[#e2e2e2] min-h-screen flex flex-col font-sans selection:bg-accent selection:text-accent-ink overflow-x-hidden transition-colors duration-300">
      {/* Animated Cyber Cursor (desktop fine-pointer only) */}
      <CyberCursor />

      {/* Fixed Cyber Navbar */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenLogoPicker={() => setIsLogoPickerOpen(true)}
        logoSrc={activeLogo.src}
        theme={theme}
        onChangeTheme={setTheme}
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
      <Footer
        onScrollToTop={() => handleNavigate('home')}
        onOpenLogoPicker={() => setIsLogoPickerOpen(true)}
        logoSrc={activeLogo.src}
      />

      <Suspense fallback={null}>
        {/* Interactive CLI Terminal Modal */}
        {isTerminalOpen && (
          <InteractiveTerminalModal
            isOpen={isTerminalOpen}
            onClose={() => setIsTerminalOpen(false)}
            onOpenResume={() => {
              setIsTerminalOpen(false);
              setIsResumeOpen(true);
            }}
            theme={theme}
            onChangeTheme={setTheme}
          />
        )}

        {/* Executive CV / Resume Modal */}
        {isResumeOpen && (
          <ResumeModal
            isOpen={isResumeOpen}
            onClose={() => setIsResumeOpen(false)}
          />
        )}

        {/* Architecture Specs Modal */}
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

        {/* Profile & Contact Card Popup Modal */}
        {isContactCardOpen && (
          <ContactCardModal
            isOpen={isContactCardOpen}
            onClose={() => setIsContactCardOpen(false)}
          />
        )}

        {/* 4-Option Logo Switcher Modal */}
        {isLogoPickerOpen && (
          <LogoPickerModal
            isOpen={isLogoPickerOpen}
            onClose={() => setIsLogoPickerOpen(false)}
            selectedLogoId={logoId}
            onSelectLogo={setLogoId}
          />
        )}
      </Suspense>
    </div>
  );
}
