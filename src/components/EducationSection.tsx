import React from 'react';
import { EDUCATION_DATA } from '../data/portfolioData';
import { GraduationCap, Calendar, Award } from 'lucide-react';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="text-left">
          <h2
            id="education-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] flex items-center gap-4 mb-2"
          >
            <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
            <span>Academic & Technical Education</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl">
            Foundational computer science curriculum, software engineering principles, and core algorithmic training.
          </p>
        </div>
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {EDUCATION_DATA.map((item, index) => (
          <div
            key={index}
            className="surface-glass rounded-xl p-8 flex flex-col justify-between border border-white/10 hover:border-[#00f2ff]/60 hover:shadow-[0_0_24px_rgba(0,242,255,0.2)] transition-all duration-300 group text-left relative overflow-hidden"
          >
            <div>
              {/* Header Badge */}
              <div className="flex justify-between items-start mb-5">
                <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#00f2ff]">
                  <GraduationCap className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#ebb2ff] bg-[#ebb2ff]/10 px-2.5 py-0.5 rounded border border-[#ebb2ff]/20 uppercase">
                    {item.status}
                  </span>
                  {item.grade && (
                    <span className="font-mono text-xs font-bold text-[#00f2ff]">
                      {item.grade}
                    </span>
                  )}
                </div>
              </div>

              {/* Degree & Institution */}
              <h3 className="font-display text-xl font-bold text-[#e1fdff] group-hover:text-[#00f2ff] transition-colors mb-1.5">
                {item.degree}
              </h3>

              <p className="font-display text-xs font-semibold text-[#00f2ff] tracking-wider uppercase mb-1">
                {item.institution}
              </p>

              <p className="font-mono text-xs text-[#b9cacb]/60 flex items-center gap-1.5 mb-4">
                <Calendar className="w-3 h-3" />
                <span>{item.duration}</span>
              </p>

              {/* Description */}
              <p className="font-sans text-sm text-[#b9cacb] leading-relaxed mb-6">
                {item.desc}
              </p>
            </div>

            {/* Skill Tags */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 mt-auto">
              {item.tags.map((tag, tIndex) => (
                <span
                  key={tIndex}
                  className="font-mono text-[11px] text-[#b9cacb] bg-white/5 px-2.5 py-1 rounded border border-white/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
