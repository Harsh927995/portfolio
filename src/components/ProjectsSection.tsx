import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';
import { Github, Layers, ArrowUpRight, Sparkles, ExternalLink } from 'lucide-react';

interface ProjectsSectionProps {
  selectedTechFilter?: string | null;
  onClearTechFilter?: () => void;
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  selectedTechFilter,
  onClearTechFilter,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const activeProjectCategories = new Set(PROJECTS.map((p) => p.category));
    const allCategories = [
      { id: 'all', label: 'All Projects' },
      { id: 'frontend', label: 'Web & Frontend' },
      { id: 'fullstack', label: 'Full Stack & AI' },
      { id: 'cloud', label: 'Cloud & DevOps' },
      { id: 'microservices', label: 'Microservices' },
    ];
    return allCategories.filter((c) => c.id === 'all' || activeProjectCategories.has(c.id as any));
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
      const matchesTech = !selectedTechFilter || p.techStack.includes(selectedTechFilter);
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesTech && matchesSearch;
    });
  }, [activeCategory, selectedTechFilter, searchQuery]);

  const handleOpenProjectUrl = (project: Project) => {
    const targetUrl = project.liveUrl || project.githubUrl;
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      id="projects"
      className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative"
    >
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="text-left">
          <h2
            id="projects-main-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] flex items-center gap-4 mb-2"
          >
            <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
            <span>Featured Engineering Deployments</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl">
            Production-tested architectures designed for zero-downtime scalability, high throughput, and seamless user experiences. Click any project to open live source.
          </p>
        </div>

        {/* Selected Tech Filter Banner */}
        {selectedTechFilter && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00f2ff]/10 border border-[#00f2ff]/30 text-xs font-mono text-[#00f2ff]">
            <span>Filter: <strong>{selectedTechFilter}</strong></span>
            <button
              onClick={onClearTechFilter}
              className="ml-1 text-white hover:text-[#00f2ff] font-bold"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Category Pills & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-4 border-b border-white/5">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`category-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`font-display text-xs sm:text-sm px-4 py-2 rounded transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-white/10 text-[#00f2ff] font-bold border border-[#00f2ff]/40 shadow-[0_0_12px_rgba(0,242,255,0.25)]'
                  : 'text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            placeholder="Search stack or architecture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#0c0f0f] text-xs font-mono text-[#e1fdff] px-3 py-2 rounded border border-white/10 focus:border-[#00f2ff] focus:outline-none placeholder-[#b9cacb]/40"
          />
        </div>
      </div>

      {/* Projects Grid / Wide Showcase */}
      <div className={filteredProjects.length === 1 ? 'w-full mx-auto' : 'grid grid-cols-1 xl:grid-cols-2 gap-8'}>
        {filteredProjects.map((project) => {
          const targetUrl = project.liveUrl || project.githubUrl;

          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              onClick={() => handleOpenProjectUrl(project)}
              className="surface-glass rounded-xl p-6 sm:p-8 lg:p-10 border border-white/10 hover:border-[#00f2ff]/70 hover:shadow-[0_0_35px_rgba(0,242,255,0.25)] transition-all duration-300 group cursor-pointer text-left relative overflow-hidden"
              title="Click to visit project repository on GitHub"
            >
              {/* Top Accent Line on Hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00f2ff] via-[#ebb2ff] to-[#00f2ff] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* 2-Column Responsive Layout on Desktop */}
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch">
                
                {/* Left Column: Project Identity & Specs */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center gap-3 mb-4 flex-wrap">
                      <span className="text-[11px] font-mono text-[#ebb2ff] uppercase tracking-wider bg-[#ebb2ff]/10 px-3 py-1 rounded border border-[#ebb2ff]/20">
                        {project.category}
                      </span>

                      {project.featured && (
                        <span className="text-[11px] font-mono text-[#00f2ff] flex items-center gap-1.5 bg-[#00f2ff]/10 px-3 py-1 rounded-full border border-[#00f2ff]/30">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Featured Engineering Deployment</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div className="mb-3">
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] group-hover:text-[#00f2ff] transition-colors inline-flex items-center gap-2.5"
                      >
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-6 h-6 text-[#00f2ff] opacity-80 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                      </a>
                    </div>

                    {/* Summary */}
                    <p className="font-sans text-sm sm:text-base text-[#b9cacb] leading-relaxed mb-6">
                      {project.summary}
                    </p>

                    {/* Key Architecture Bullet Points */}
                    <div className="space-y-2 mb-6 border-t border-white/5 pt-4">
                      {project.architecture.slice(0, 3).map((point, idx) => (
                        <div key={idx} className="text-xs text-slate-300 flex items-center gap-2 font-mono">
                          <span className={`w-1.5 h-1.5 rounded-full ${idx % 2 === 1 ? 'bg-[#ebb2ff]' : 'bg-[#00f2ff]'}`} />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono text-[#b9cacb] bg-white/5 px-3 py-1 rounded border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Telemetry & Actions */}
                <div className="w-full md:w-[320px] lg:w-[360px] flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-8 shrink-0">
                  <div>
                    <div className="text-xs font-mono text-[#b9cacb]/70 uppercase tracking-wider mb-3">
                      Performance Telemetry
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 py-4 px-3 rounded-lg bg-black/40 border border-white/10 mb-6">
                      {project.metrics.map((m, idx) => (
                        <div key={idx} className="text-center">
                          <div className="text-[10px] font-mono text-[#b9cacb]/70 truncate">{m.label}</div>
                          <div className="text-xs sm:text-sm font-mono font-bold text-[#00f2ff] mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 rounded-lg bg-black/25 border border-white/5 text-xs text-[#b9cacb] leading-relaxed mb-6 font-mono">
                      Deployment Node: <span className="text-[#00f2ff]">{project.githubUrl ? project.githubUrl.replace('https://', '') : 'github.com/Harsh927995'}</span>
                      <br />
                      Status: <span className="text-[#00ff66]">Active // Open Source</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    {targetUrl && (
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full py-3 px-4 rounded-lg text-xs font-display font-bold bg-[#00f2ff] text-[#002022] hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        title="Open project on GitHub"
                      >
                        <Github className="w-4 h-4" />
                        <span>Visit Project ↗</span>
                      </a>
                    )}

                    <button
                      id={`btn-view-architecture-${project.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      className="w-full py-2.5 px-4 rounded-lg text-xs font-display font-semibold text-[#e1fdff] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f2ff]/40 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                      title="View detailed architecture specifications"
                    >
                      <Layers className="w-4 h-4 text-[#00f2ff]" />
                      <span>Architecture Specs</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-16 text-center text-[#b9cacb] font-mono text-sm surface-glass rounded-xl border border-white/10">
          <p>No deployment matching current query filters.</p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
              if (onClearTechFilter) onClearTechFilter();
            }}
            className="mt-3 text-xs text-[#00f2ff] underline font-semibold"
          >
            Reset all filters
          </button>
        </div>
      )}
    </section>
  );
};
