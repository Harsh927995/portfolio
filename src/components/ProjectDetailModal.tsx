import React from 'react';
import { Project } from '../types';
import { X, ExternalLink, Github, Layers, CheckCircle, Cpu, Zap } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} architecture details`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
    >
      <div className="w-full max-w-2xl bg-surface border border-accent/30 rounded-xl overflow-hidden shadow-[0_0_35px_rgb(var(--theme-primary-rgb)/0.2)] flex flex-col my-auto max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-surface-lowest px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-accent-secondary bg-accent-secondary/10 px-2 py-0.5 rounded uppercase">
              {project.category}
            </span>
            <h3 className="font-display font-bold text-lg text-[#e1fdff]">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-1 rounded text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 select-text text-[#b9cacb] font-sans">
          <div>
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
              // System Overview
            </h4>
            <p className="text-sm sm:text-base leading-relaxed text-[#e2e2e2]">
              {project.description}
            </p>
          </div>

          {/* Benchmarks / Metrics */}
          <div>
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>// Benchmarks & Telemetry</span>
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 bg-black/40 rounded border border-white/10 text-center">
                  <div className="text-[11px] font-mono text-[#b9cacb]/80">{m.label}</div>
                  <div className="text-base font-mono font-bold text-accent mt-1">{m.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Specs */}
          <div>
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>// Architectural Decisions</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {project.architecture.map((arch, idx) => (
                <li key={idx} className="flex items-start gap-2.5 bg-white/5 p-3 rounded border border-white/5">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <span className="text-[#e2e2e2]">{arch}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-mono text-accent uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" />
              <span>// Dependencies</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded text-xs font-mono text-accent-secondary bg-accent-secondary/10 border border-accent-secondary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-surface-lowest px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <div className="text-xs font-mono text-[#b9cacb]/60">
            SYSTEM_ID: {project.id}
          </div>
          <div className="flex items-center gap-3">
            {project.liveUrl && project.liveUrl !== project.githubUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live System</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 rounded text-xs font-display font-bold bg-accent text-accent-ink hover:shadow-[0_0_15px_rgb(var(--theme-primary-rgb)/0.4)] transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Visit on GitHub ↗</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded text-xs font-display font-semibold text-[#b9cacb] hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
