import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { User, Sparkles, MapPin, GraduationCap, Github, ArrowUpRight } from 'lucide-react';

interface AboutSectionProps {
  onOpenResume?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenResume }) => {
  return (
    <section
      id="about"
      className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-20 border-t border-white/10 relative"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="text-left">
          <h2
            id="about-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] flex items-center gap-4 mb-2"
          >
            <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
            <span>About Me</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl">
            A quick glimpse into my background, engineering mindset, and dedication to crafting high-impact digital products.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f2ff] w-fit">
          <User className="w-3.5 h-3.5 text-[#00f2ff]" />
          <span>ENGINEER_PROFILE // HARSH KASHYAP</span>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        
        {/* Left Column: Personal Manifesto & Engineering Focus */}
        <div className="lg:col-span-7 surface-glass p-8 sm:p-10 rounded-xl border border-white/10 flex flex-col justify-between text-left relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00f2ff]/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#ebb2ff] uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4 text-[#ebb2ff]" />
              <span>Who I Am & What Drives Me</span>
            </div>

            <h3 className="font-display text-xl sm:text-2xl font-bold text-[#e1fdff] mb-4 leading-snug">
              Passionate about building fast, intuitive web applications and solving real-world challenges.
            </h3>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[#b9cacb] leading-relaxed">
              <p>
                Hello! I am <strong className="text-[#e1fdff]">Harsh Kashyap</strong>, a software engineer and frontend developer focused on high-performance React applications, modern build systems, and scalable full-stack architectures.
              </p>
              <p>
                Beyond writing code, I love designing systems that directly help people. That mindset led me to engineer <strong className="text-[#00f2ff]">Khoje Khatam</strong>—a comprehensive study and Previous Year Question (PYQ) companion built for engineering students across multiple branches.
              </p>
            </div>

            {/* Core Trait Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2.5 p-2.5 rounded bg-black/30 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />
                <span className="font-mono text-xs text-slate-200">High-Performance React UI</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded bg-black/30 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#ebb2ff] shadow-[0_0_8px_#ebb2ff]" />
                <span className="font-mono text-xs text-slate-200">Clean & Scalable Architecture</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded bg-black/30 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#00dbe7] shadow-[0_0_8px_#00dbe7]" />
                <span className="font-mono text-xs text-slate-200">Vite & Modern Tooling</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded bg-black/30 border border-white/5">
                <span className="w-2 h-2 rounded-full bg-[#27c93f] shadow-[0_0_8px_#27c93f]" />
                <span className="font-mono text-xs text-slate-200">Open-Source Contributor</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Profile Photo & Quick Coordinates Card */}
        <div className="lg:col-span-5 surface-glass p-8 sm:p-10 rounded-xl border border-white/10 flex flex-col justify-between text-left relative overflow-hidden">
          <div>
            {/* Photo & Header Section */}
            <div className="flex items-center gap-5 sm:gap-6 mb-6 pb-6 border-b border-white/10">
              <div className="relative group shrink-0">
                {/* Cyber Frame around Harsh's new photo */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl p-[2px] bg-gradient-to-tr from-[#00f2ff] via-[#ebb2ff] to-[#00f2ff] shadow-[0_0_30px_rgba(0,242,255,0.35)] group-hover:shadow-[0_0_40px_rgba(0,242,255,0.55)] transition-all duration-300">
                  <div className="w-full h-full rounded-2xl overflow-hidden bg-[#0c0f0f] relative">
                    <img
                      src="/harsh_portrait.jpg"
                      alt="Harsh Kashyap - Software Engineer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.hasFallback) {
                          target.dataset.hasFallback = 'true';
                          target.src = '/avatar.jpg';
                        } else {
                          target.src = 'https://avatars.githubusercontent.com/u/177816366?v=4';
                          target.onerror = null;
                        }
                      }}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Subtle Cyber Scan Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00f2ff]/5 to-transparent pointer-events-none opacity-60" />
                  </div>
                </div>

                {/* Live Status Pip */}
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#121414] flex items-center justify-center border border-white/20" title="Node Status: Active">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00ff66] animate-pulse" />
                </span>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#00f2ff] uppercase tracking-wider mb-1">
                  DEVELOPER_NODE // ACTIVE
                </div>
                <h4 className="font-display text-lg sm:text-xl font-bold text-[#e1fdff]">
                  Harsh Kashyap
                </h4>
                <p className="font-mono text-xs text-[#b9cacb]/80 mt-0.5">
                  Software Engineer
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#ebb2ff]" />
                  <span>India</span>
                </div>
              </div>
            </div>

            {/* Quick Parameters */}
            <div className="space-y-3.5 font-mono text-xs sm:text-sm">
              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-[#b9cacb]/60 uppercase">Specialization</span>
                <span className="text-[#00f2ff]">Frontend & React</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-[#b9cacb]/60 uppercase">Education</span>
                <span className="text-slate-200">B.Tech (CSE)</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-[#b9cacb]/60 uppercase">Availability</span>
                <span className="text-[#00ff66]">Open to Opportunities</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-white/5">
                <span className="text-[#b9cacb]/60 uppercase">GitHub</span>
                <span className="text-[#ebb2ff]">@Harsh927995</span>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 px-4 rounded bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f2ff]/40 text-xs font-mono text-[#00f2ff] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="py-2.5 px-4 rounded bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 border border-[#00f2ff]/30 text-xs font-display font-bold text-[#00f2ff] flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>View CV</span>
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
