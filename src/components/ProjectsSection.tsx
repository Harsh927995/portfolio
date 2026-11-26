import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import {
  Github,
  Layers,
  ArrowUpRight,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Monitor,
  GitBranch,
  Search,
  Terminal,
  BookOpen,
  Cpu,
} from 'lucide-react';

interface ProjectsSectionProps {
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
  onSelectProject: (project: Project) => void;
}

const normalizeTechTokens = (value: string): string[] => {
  return value
    .toLowerCase()
    .replace(/\([^)]*\)/g, '')
    .split('&')
    .map((part) => part.replace(/\.js$/i, '').replace(/\s+\d+(\.\d+)*$/g, '').trim())
    .filter(Boolean);
};

const matchesTechFilter = (techStack: string[], filter: string): boolean => {
  const filterTokens = normalizeTechTokens(filter);
  return techStack.some((tech) => {
    if (tech.toLowerCase() === filter.toLowerCase()) return true;
    const techTokens = normalizeTechTokens(tech);
    return filterTokens.some((token) => techTokens.includes(token));
  });
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedTechFilter,
  onClearTechFilter,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [previewMode, setPreviewMode] = useState<'ui' | 'blueprint'>('ui');

  const categories = useMemo(() => {
    const activeProjectCategories = new Set(PROJECTS.map((p) => p.category));
    const allCategories = [
      { id: 'all', label: 'All Projects' },
      { id: 'frontend', label: 'Web & Frontend' },
      { id: 'fullstack', label: 'Full Stack & AI' },
      { id: 'cloud', label: 'Cloud & DevOps' },
      { id: 'microservices', label: 'Microservices' },
    ];
    return allCategories.filter((c) => c.id === 'all' || activeProjectCategories.has(c.id as Project['category']));
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesTech = !selectedTechFilter || matchesTechFilter(p.techStack, selectedTechFilter);
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [activeCategory, selectedTechFilter, searchQuery]);

  useEffect(() => {
    if (activeIndex >= filteredProjects.length) {
      setActiveIndex(0);
    }
  }, [filteredProjects.length, activeIndex]);

  const activeProject = filteredProjects[activeIndex] ?? null;
  const targetUrl = activeProject ? activeProject.liveUrl || activeProject.githubUrl : undefined;

  const handleOpenProjectUrl = (project: Project) => {
    const url = project.liveUrl || project.githubUrl;
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handlePrev = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    if (filteredProjects.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handleDeckKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const renderMockupCanvas = (project: Project) => {
    if (previewMode === 'blueprint') {
      return (
        <div className="p-5 sm:p-6 space-y-3 min-h-[260px] flex flex-col justify-center">
          <div className="flex items-center justify-between text-[11px] font-mono text-accent mb-1">
            <span className="flex items-center gap-1.5">
              <GitBranch className="w-3.5 h-3.5" />
              <span>ARCHITECTURE_PIPELINE // {project.id.toUpperCase()}</span>
            </span>
            <span className="text-accent-secondary">4 MODULES</span>
          </div>

          <div className="space-y-2.5">
            {project.architecture.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg bg-black/45 border border-white/10"
              >
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-accent/15 text-accent border border-accent/30 shrink-0">
                  0{idx + 1}
                </span>
                <p className="font-mono text-xs text-slate-200 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (project.id === 'khoje-khatam-web-dev') {
      return (
        <div className="p-5 sm:p-6 space-y-4 min-h-[260px] flex flex-col justify-between">
          {/* Simulated Khoje Khatam App Header & Query Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center text-accent">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <div className="font-display font-bold text-sm text-[#e1fdff]">Khoje Khatam SPA</div>
                <div className="font-mono text-[10px] text-accent">?branch=CSE&amp;filter=PYQ</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/50 border border-white/10 text-[11px] font-mono text-[#b9cacb]">
              <Search className="w-3 h-3 text-accent" />
              <span>useMemo(cached)</span>
            </div>
          </div>

          {/* Branch Selector Pills */}
          <div className="flex flex-wrap gap-1.5">
            {['CSE', 'ECE', 'ME', 'CE', 'EE'].map((branch, idx) => (
              <span
                key={branch}
                className={`px-2.5 py-1 rounded text-[11px] font-mono border ${
                  idx === 0
                    ? 'bg-accent text-accent-ink border-accent font-bold'
                    : 'bg-white/5 text-[#b9cacb] border-white/10'
                }`}
              >
                {branch}
              </span>
            ))}
          </div>

          {/* Indexed Resource Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-black/45 border border-accent/25 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-accent">PYQ ARCHIVE</span>
                <span className="text-[#00ff66]">INDEXED</span>
              </div>
              <div className="font-display font-bold text-xs text-[#e1fdff]">
                Data Structures &amp; Algorithms
              </div>
              <div className="font-mono text-[11px] text-[#b9cacb]/80">
                5 Years Solved + Unit Notes
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-black/45 border border-accent-secondary/25 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono">
                <span className="text-accent-secondary">SYLLABUS</span>
                <span className="text-accent">URL SYNCED</span>
              </div>
              <div className="font-display font-bold text-xs text-[#e1fdff]">
                Operating Systems &amp; DBMS
              </div>
              <div className="font-mono text-[11px] text-[#b9cacb]/80">
                Shareable State Mapping
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-5 sm:p-6 space-y-4 min-h-[260px] flex flex-col justify-between">
        {/* Simulated DEV_CORE Runtime Preview */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/15 border border-accent/40 flex items-center justify-center text-accent">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="font-display font-bold text-sm text-[#e1fdff]">DEV_CORE Workspace</div>
              <div className="font-mono text-[10px] text-accent">Ctrl+K Shell // Dynamic Themes</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-accent/10 border border-accent/30 text-[10px] font-mono text-accent">
            100 / 100 LIGHTHOUSE
          </span>
        </div>

        {/* Simulated Code + Telemetry Blocks */}
        <div className="p-3.5 rounded-lg bg-black/55 border border-white/10 font-mono text-xs space-y-1.5">
          <div className="text-accent-secondary">$ devcore status --live</div>
          <div className="text-slate-300">&gt; Interactive Hero IDE: READY (3 snippets)</div>
          <div className="text-slate-300">&gt; Lazy Modal Chunks: 4 split bundles</div>
          <div className="text-accent">&gt; ATS 1-Page PDF Export: ACTIVE</div>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-black/40 border border-white/10 text-center">
              <div className="font-mono text-[10px] text-[#b9cacb]/70 truncate">{metric.label}</div>
              <div className="font-mono text-xs font-bold text-accent mt-0.5">{metric.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative"
    >
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="text-left">
          <h2
            id="projects-main-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] mb-2"
          >
            Featured Engineering Deployments
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-2xl">
            Explore each project inside an interactive live-preview deck. Switch cards or toggle Blueprint view, and click the preview window or Visit Project to open on GitHub.
          </p>
        </div>

        {/* Selected Tech Filter Banner */}
        {selectedTechFilter && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-xs font-mono text-accent w-fit">
            <span>Filter: <strong>{selectedTechFilter}</strong></span>
            <button
              onClick={onClearTechFilter}
              aria-label="Clear technology filter"
              className="ml-1 text-white hover:text-accent font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-white/5">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`category-filter-${cat.id}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setActiveIndex(0);
              }}
              className={`font-display text-xs sm:text-sm px-4 py-2 rounded transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/10 text-accent font-bold border border-accent/40 shadow-[0_0_12px_rgb(var(--theme-primary-rgb)/0.25)]'
                  : 'text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            aria-label="Search projects by stack or architecture"
            placeholder="Search stack or architecture..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveIndex(0);
            }}
            className="w-full bg-surface-lowest text-xs font-mono text-[#e1fdff] px-3 py-2 rounded border border-white/10 focus:border-accent focus:outline-none placeholder-[#b9cacb]/40"
          />
        </div>
      </div>

      {/* Interactive Live-Preview Deck */}
      {activeProject ? (
        <div
          onKeyDown={handleDeckKeyDown}
          tabIndex={0}
          aria-label="Interactive project preview deck. Use Left and Right arrow keys to switch projects."
          className="space-y-6 focus:outline-none"
        >
          {/* Deck Top Navigation Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              {filteredProjects.map((proj, idx) => {
                const isSelected = idx === activeIndex;
                const shortLabel = proj.title.split(':')[0].trim();
                return (
                  <button
                    key={proj.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`px-3.5 py-2 rounded-lg font-mono text-xs transition-all flex items-center gap-2 border cursor-pointer ${
                      isSelected
                        ? 'bg-accent/15 border-accent/50 text-accent font-bold shadow-[0_0_15px_rgb(var(--theme-primary-rgb)/0.2)]'
                        : 'bg-white/5 border-white/10 text-[#b9cacb] hover:text-[#e1fdff] hover:border-white/20'
                    }`}
                  >
                    <span className="opacity-70">0{idx + 1}</span>
                    <span>{shortLabel}</span>
                  </button>
                );
              })}
            </div>

            {filteredProjects.length > 1 && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#b9cacb]/70 mr-2">
                  0{activeIndex + 1} / 0{filteredProjects.length}
                </span>
                <button
                  onClick={handlePrev}
                  aria-label="Previous project"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 text-[#e1fdff] hover:text-accent transition-all cursor-pointer"
                  title="Previous project (Left Arrow)"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next project"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 text-[#e1fdff] hover:text-accent transition-all cursor-pointer"
                  title="Next project (Right Arrow)"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Main Deck Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              id={`project-card-${activeProject.id}`}
              className="surface-glass rounded-2xl border border-white/10 overflow-hidden shadow-[0_0_45px_rgba(0,0,0,0.75)] relative"
            >
              {/* Top Gradient Accent Bar */}
              <div className="h-[2px] w-full bg-gradient-to-r from-accent via-accent-secondary to-accent" />

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Interactive Browser / IDE Mockup Window */}
                <div
                  onClick={() => handleOpenProjectUrl(activeProject)}
                  onKeyDown={(e) => {
                    if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleOpenProjectUrl(activeProject);
                    }
                  }}
                  role="link"
                  tabIndex={0}
                  aria-label={`Open ${activeProject.title} repository on GitHub`}
                  title="Click preview to visit repository on GitHub"
                  className="lg:col-span-7 p-5 sm:p-7 lg:p-8 bg-black/25 border-b lg:border-b-0 lg:border-r border-white/10 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <div className="rounded-xl overflow-hidden border border-white/10 group-hover:border-accent/60 bg-surface-lowest shadow-[0_10px_35px_rgba(0,0,0,0.65)] transition-all duration-300">
                    {/* Browser Chrome Header */}
                    <div className="px-4 py-3 bg-surface border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                        <span className="ml-2 px-2.5 py-1 rounded bg-black/45 border border-white/10 font-mono text-[11px] text-[#b9cacb] truncate max-w-[200px] sm:max-w-[280px]">
                          {(targetUrl || 'https://github.com/Harsh927995').replace('https://', '')}
                        </span>
                      </div>

                      {/* Preview / Blueprint Mode Toggle */}
                      <div
                        className="flex items-center gap-1 bg-black/40 p-1 rounded-lg border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setPreviewMode('ui')}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                            previewMode === 'ui'
                              ? 'bg-accent/20 text-accent font-bold'
                              : 'text-[#b9cacb]/70 hover:text-[#e1fdff]'
                          }`}
                        >
                          <Monitor className="w-3 h-3" />
                          <span>Preview</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPreviewMode('blueprint')}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                            previewMode === 'blueprint'
                              ? 'bg-accent-secondary/20 text-accent-secondary font-bold'
                              : 'text-[#b9cacb]/70 hover:text-[#e1fdff]'
                          }`}
                        >
                          <Cpu className="w-3 h-3" />
                          <span>Blueprint</span>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Mockup Canvas */}
                    {renderMockupCanvas(activeProject)}

                    {/* Bottom Status Strip */}
                    <div className="px-4 py-2.5 bg-surface/80 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-[#b9cacb]/70">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                        <span>Active // Open Source</span>
                      </span>
                      <span className="text-accent group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                        <span>Open Repo</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Project Info, Metrics & Actions */}
                <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between text-left">
                  <div>
                    {/* Badges */}
                    <div className="flex items-center gap-2.5 mb-4 flex-wrap">
                      <span className="text-[11px] font-mono text-accent-secondary uppercase tracking-wider bg-accent-secondary/10 px-3 py-1 rounded border border-accent-secondary/20">
                        {activeProject.category}
                      </span>
                      {activeProject.featured && (
                        <span className="text-[11px] font-mono text-accent flex items-center gap-1.5 bg-accent/10 px-3 py-1 rounded-full border border-accent/30">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Featured Deployment</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-display text-2xl sm:text-[26px] font-bold text-[#e1fdff] hover:text-accent transition-colors inline-flex items-start gap-2 mb-3 group"
                    >
                      <span>{activeProject.title}</span>
                      <ArrowUpRight className="w-6 h-6 text-accent shrink-0 mt-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                    {/* Summary */}
                    <p className="font-sans text-sm sm:text-base text-[#b9cacb] leading-relaxed mb-6">
                      {activeProject.summary}
                    </p>

                    {/* Telemetry Metrics */}
                    <div className="grid grid-cols-3 gap-2.5 p-3.5 rounded-xl bg-black/40 border border-white/10 mb-6">
                      {activeProject.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-[10px] font-mono text-[#b9cacb]/70 truncate">{m.label}</div>
                          <div className="text-xs sm:text-sm font-mono font-bold text-accent mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack */}
                    <div className="mb-6">
                      <div className="text-[11px] font-mono text-[#b9cacb]/60 uppercase tracking-wider mb-2.5">
                        Stack &amp; Dependencies
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-mono text-[#e1fdff] bg-white/5 px-3 py-1 rounded border border-white/10"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-white/10">
                    {targetUrl && (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-3 px-4 rounded-lg text-xs font-display font-bold bg-accent text-accent-ink hover:shadow-[0_0_25px_rgb(var(--theme-primary-rgb)/0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Github className="w-4 h-4" />
                        <span>Visit Project ↗</span>
                      </a>
                    )}

                    <button
                      id={`btn-view-architecture-${activeProject.id}`}
                      onClick={() => onSelectProject(activeProject)}
                      className="flex-1 py-3 px-4 rounded-lg text-xs font-display font-semibold text-[#e1fdff] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                    >
                      <Layers className="w-4 h-4 text-accent" />
                      <span>Architecture Specs</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Compact Quick-Switch Cards Strip */}
          {filteredProjects.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProjects.map((project, idx) => {
                const isSelected = idx === activeIndex;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'surface-glass-active shadow-[0_0_24px_rgb(var(--theme-primary-rgb)/0.16)]'
                        : 'surface-glass border-white/10 hover:border-white/25 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-mono text-[11px] text-accent mb-1">
                        <span>0{idx + 1}</span>
                        <span className="text-[#b9cacb]/50">//</span>
                        <span className="text-accent-secondary uppercase">{project.category}</span>
                      </div>
                      <div className="font-display font-bold text-sm sm:text-base text-[#e1fdff] truncate">
                        {project.title}
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded text-[11px] font-mono shrink-0 border ${
                        isSelected
                          ? 'bg-accent text-accent-ink border-accent font-bold'
                          : 'bg-white/5 text-[#b9cacb] border-white/10'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Inspect'}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="py-16 text-center text-[#b9cacb] font-mono text-sm surface-glass rounded-xl border border-white/10">
          <p>
            {selectedTechFilter
              ? `No featured deployment tagged with "${selectedTechFilter}".`
              : 'No deployment matching current query filters.'}
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              if (onClearTechFilter) onClearTechFilter();
            }}
            className="mt-3 text-xs text-accent underline font-semibold cursor-pointer"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
};
