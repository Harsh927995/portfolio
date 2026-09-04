import React, { useState } from 'react';
import { DEVELOPER_PROFILE, CORE_DEPENDENCIES, SYSTEM_METRICS } from '../data/portfolioData';
import { Activity, ShieldCheck, Zap, Server, Cpu, Database, Cloud } from 'lucide-react';

interface SystemDiagnosticsProps {
  onSelectTech?: (tech: string) => void;
  selectedTech?: string | null;
}

export const SystemDiagnosticsSection: React.FC<SystemDiagnosticsProps> = ({
  onSelectTech,
  selectedTech,
}) => {
  const [activeMetricIndex, setActiveMetricIndex] = useState<number | null>(null);

  return (
    <section
      id="diagnostics"
      className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative"
    >
      {/* Section Header */}
      <h2
        id="diagnostics-heading"
        className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] mb-12 flex items-center gap-4"
      >
        <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
        <span>System Diagnostics</span>
      </h2>

      {/* Main Staggered Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Bio Panel */}
        <div
          id="diagnostics-bio-panel"
          className="lg:col-span-5 surface-glass p-8 rounded-xl h-full flex flex-col justify-between border border-white/10 hover:border-[#00f2ff]/30 transition-all duration-300 relative group overflow-hidden"
        >
          <div className="space-y-6 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-[#00f2ff] tracking-wider uppercase">
              <Activity className="w-4 h-4 text-[#00f2ff]" />
              <span>Architectural Manifesto</span>
            </div>

            <p className="font-sans text-base text-[#b9cacb] leading-relaxed">
              {DEVELOPER_PROFILE.aboutBio}
            </p>

            {/* Micro telemetry badges */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="bg-black/30 p-3 rounded border border-white/5">
                <div className="text-[11px] font-mono text-[#b9cacb]/70">ZERO DOWNTIME</div>
                <div className="text-sm font-mono font-bold text-[#00f2ff]">Rolling Deploys</div>
              </div>
              <div className="bg-black/30 p-3 rounded border border-white/5">
                <div className="text-[11px] font-mono text-[#b9cacb]/70">CACHE HIT RATE</div>
                <div className="text-sm font-mono font-bold text-[#ebb2ff]">99.4% Edge</div>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#b9cacb]/60">
            <span>NODE_ENV: production</span>
            <span className="text-[#00f2ff] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></span>
              All systems nominal
            </span>
          </div>
        </div>

        {/* Right Core Dependencies Panel */}
        <div
          id="diagnostics-dependencies-panel"
          className="lg:col-span-7 surface-glass rounded-xl p-8 h-full flex flex-col justify-between border border-white/10 hover:border-[#00f2ff]/30 transition-all duration-300"
        >
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#e1fdff] flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#00f2ff]" />
                <span>Core Dependencies</span>
              </h4>
              <span className="text-xs font-mono text-[#ebb2ff] hidden sm:inline-block">
                Click tag to filter projects
              </span>
            </div>

            {/* Dependency Tags Cloud */}
            <div className="flex flex-wrap gap-3">
              {CORE_DEPENDENCIES.map((tech) => {
                const isSelected = selectedTech === tech;
                return (
                  <button
                    key={tech}
                    id={`tech-tag-${tech.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => onSelectTech && onSelectTech(isSelected ? '' : tech)}
                    className={`font-mono text-sm px-4 py-2 rounded transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'text-[#002022] bg-[#00f2ff] font-bold shadow-[0_0_15px_rgba(0,242,255,0.6)] border border-[#00f2ff]'
                        : 'text-[#ebb2ff] border border-[#ebb2ff]/30 hover:bg-[#ebb2ff]/10 hover:border-[#ebb2ff] hover:shadow-[0_0_12px_rgba(235,178,255,0.2)]'
                    }`}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-6 border-t border-white/10">
            {SYSTEM_METRICS.map((metric, idx) => (
              <div
                key={metric.id}
                onMouseEnter={() => setActiveMetricIndex(idx)}
                onMouseLeave={() => setActiveMetricIndex(null)}
                className="p-2.5 rounded bg-black/20 border border-white/5 hover:border-[#00f2ff]/40 transition-all text-left"
              >
                <div className="text-[11px] font-mono text-[#b9cacb]/80 truncate">{metric.label}</div>
                <div className="text-base font-mono font-bold text-[#e1fdff] mt-0.5">{metric.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
