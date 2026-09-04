import React, { useState } from 'react';
import { X, Download, Printer, Copy, Check, Briefcase, GraduationCap, Code, Award, Phone, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';
import { DEVELOPER_PROFILE, WORK_EXPERIENCE, TECHNICAL_SKILLS, EDUCATION_DATA, CERTIFICATIONS, PROJECTS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# Harsh Kashyap
${DEVELOPER_PROFILE.phone} | ${DEVELOPER_PROFILE.email} | ${DEVELOPER_PROFILE.linkedin} | ${DEVELOPER_PROFILE.github}

## SUMMARY
${DEVELOPER_PROFILE.summary}

## TECHNICAL SKILLS
- Programming Languages: ${TECHNICAL_SKILLS.languages.join(', ')}
- Libraries & Tools: ${TECHNICAL_SKILLS.librariesAndTools.join(', ')}
- Tools & Core Concepts: ${TECHNICAL_SKILLS.conceptsAndTools.join(', ')}

## PROJECTS
### Khoje Khatam — B.Tech Academic Resource & Discovery Platform (React, Vite, React Router)
${PROJECTS[0].architecture.map((bullet) => `- ${bullet}`).join('\n')}

## EXPERIENCE
${WORK_EXPERIENCE.map(
  (exp) => `### ${exp.role} – ${exp.company}
${exp.location} | ${exp.period}
${exp.highlights.map((h) => `- ${h}`).join('\n')}
`
).join('\n')}

## EDUCATION
${EDUCATION_DATA.map(
  (edu) => `### ${edu.institution}
${edu.degree} | ${edu.duration}
- ${edu.desc}
`
).join('\n')}

## CERTIFICATIONS
${CERTIFICATIONS.map((cert) => `- ${cert.title} (${cert.issuer}): ${cert.detail}`).join('\n')}
`;
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredProject = PROJECTS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-4xl max-h-[92vh] bg-[#121414] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col my-auto overflow-hidden">
        
        {/* Top Controls Bar */}
        <div className="bg-[#0c0f0f] px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]"></span>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#e1fdff]">
              Curriculum Vitae // Harsh Kashyap
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Harsh_Kashyap_Resume.pdf"
              download="Harsh_Kashyap_Resume.pdf"
              id="btn-download-resume-pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/30 transition-colors cursor-pointer"
              title="Download 1-page PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              id="btn-copy-resume-md"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-white/5 border border-white/10 text-[#b9cacb] hover:text-[#00f2ff] hover:border-[#00f2ff]/40 transition-colors cursor-pointer"
              title="Copy Markdown resume to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00f2ff]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied MD' : 'Copy MD'}</span>
            </button>

            <button
              onClick={handlePrint}
              id="btn-print-resume"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono bg-white/5 hover:bg-white/10 text-[#e1fdff] border border-white/10 transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 transition-colors cursor-pointer"
              title="Close modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-[#b9cacb] select-text text-left">
          
          {/* Header Info */}
          <div className="border-b border-white/15 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h1 className="font-display text-3xl sm:text-4xl font-black text-[#e1fdff] tracking-tight">
                Harsh Kashyap
              </h1>
              <span className="font-mono text-xs text-[#00f2ff] bg-[#00f2ff]/10 px-3 py-1 rounded border border-[#00f2ff]/30 w-fit">
                B.Tech Computer Science &amp; Engineering
              </span>
            </div>

            {/* Coordinates Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#b9cacb]/90">
              <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="flex items-center gap-1.5 hover:text-[#00f2ff] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#00f2ff]" />
                <span>{DEVELOPER_PROFILE.phone}</span>
              </a>

              <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="flex items-center gap-1.5 hover:text-[#00f2ff] transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#ebb2ff]" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </a>

              <a href={DEVELOPER_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00f2ff] transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-[#00dbe7]" />
                <span>LinkedIn</span>
              </a>

              <a href={DEVELOPER_PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#00f2ff] transition-colors">
                <Github className="w-3.5 h-3.5 text-[#e1fdff]" />
                <span>github.com/Harsh927995</span>
              </a>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <span>// SUMMARY</span>
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#e2e2e2] bg-black/30 p-4 rounded-xl border border-white/5 font-sans">
              {DEVELOPER_PROFILE.summary}
            </p>
          </div>

          {/* Technical Skills Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3.5 h-3.5" />
              <span>// TECHNICAL SKILLS</span>
            </h4>
            
            <div className="grid grid-cols-1 gap-2.5 bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-[#00f2ff] min-w-[180px] shrink-0 font-semibold">Programming Languages:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.languages.join(', ')}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 pt-2 border-t border-white/5">
                <span className="text-[#ebb2ff] min-w-[180px] shrink-0 font-semibold">Libraries &amp; Tools:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.librariesAndTools.join(', ')}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 pt-2 border-t border-white/5">
                <span className="text-[#00dbe7] min-w-[180px] shrink-0 font-semibold">Tools &amp; Concepts:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.conceptsAndTools.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <span>// PROJECTS</span>
            </h4>

            <div className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-2.5">
                <div>
                  <h5 className="font-display font-bold text-base text-[#e1fdff] flex items-center gap-2">
                    <span>{featuredProject.title}</span>
                    <a
                      href={featuredProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f2ff] hover:underline inline-flex items-center gap-1 text-xs font-mono"
                    >
                      <span>[View Source]</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </h5>
                  <div className="font-mono text-xs text-[#00f2ff] mt-0.5">
                    Stack: React, Vite, React Router v6
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-[#b9cacb] leading-relaxed list-disc list-inside">
                <li>
                  Architected a responsive Single Page Application (SPA) using React and Vite to index and serve branch-specific academic metadata, syllabus modules, and PYQs across 5 engineering disciplines.
                </li>
                <li>
                  Optimized deep data retrieval performance using React <code className="text-[#00f2ff] bg-black/50 px-1 py-0.5 rounded font-mono">useMemo</code> hooks, eliminating redundant calculation layers during real-time multi-branch keyword filtering.
                </li>
                <li>
                  Engineered flexible state routing utilizing URL query param mappings, allowing instantaneous sharing and persistent bookmarking of pre-filtered application states.
                </li>
              </ul>
            </div>

            {/* Project 2: DEV_CORE */}
            <div className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-2.5">
                <div>
                  <h5 className="font-display font-bold text-base text-[#e1fdff] flex items-center gap-2">
                    <span>DEV_CORE — Interactive Engineering Portfolio</span>
                    <a
                      href="https://github.com/Harsh927995"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00f2ff] hover:underline inline-flex items-center gap-1 text-xs font-mono"
                    >
                      <span>[Live Demo / Code]</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </h5>
                  <div className="font-mono text-xs text-[#00f2ff] mt-0.5">
                    Stack: React 18, TypeScript, Tailwind CSS, Vite
                  </div>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-[#b9cacb] leading-relaxed list-disc list-inside">
                <li>
                  Designed and deployed a high-performance developer portfolio featuring an in-browser interactive IDE playground simulating live code execution and an integrated CLI terminal modal.
                </li>
                <li>
                  Engineered modern responsive layouts with strict TypeScript type-safety, achieving 100/100 Lighthouse performance metrics, sub-200ms build times, and fluid cross-device ergonomics.
                </li>
              </ul>
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>// EXPERIENCE</span>
            </h4>

            <div className="space-y-4">
              {/* Infosys Springboard */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h5 className="font-display font-bold text-sm sm:text-base text-[#e1fdff]">
                      AI &amp; Generative AI Virtual Graduate Intern
                    </h5>
                    <div className="font-mono text-xs text-[#00f2ff]">
                      Infosys Springboard
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#ebb2ff]">
                    Remote • May 2024 – June 2024
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#b9cacb] list-disc list-inside leading-relaxed">
                  <li>
                    Completed an advanced corporate training sequence covering Artificial Intelligence architectures, data preprocessing, and predictive evaluation matrices.
                  </li>
                  <li>
                    Mastered foundational Generative AI principles, LLM prompt engineering primitives, and neural framework workflows through standardized professional evaluations.
                  </li>
                </ul>
              </div>

              {/* Web Development Self-Learner */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h5 className="font-display font-bold text-sm sm:text-base text-[#e1fdff]">
                      Web Development
                    </h5>
                    <div className="font-mono text-xs text-[#00f2ff]">
                      Self-Learner &amp; Open Source Projects
                    </div>
                  </div>
                  <div className="font-mono text-xs text-[#ebb2ff]">
                    Remote — 2024 – Present
                  </div>
                </div>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#b9cacb] list-disc list-inside leading-relaxed">
                  <li>
                    Learned and applied core HTML, CSS, JavaScript, and React concepts by building practical web applications, modules, and responsive user interfaces.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>// EDUCATION</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#00f2ff]">Sep 2023 – Aug 2027</span>
                  <span className="text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded text-[10px]">Pursuing</span>
                </div>
                <h5 className="font-display font-bold text-sm text-[#e1fdff]">
                  B.Tech in Computer Science and Engineering
                </h5>
                <p className="text-xs text-[#b9cacb]">
                  Chaibasa Engineering College
                </p>
                <p className="text-[11px] font-mono text-[#b9cacb]/70">
                  Jharkhand University of Technology, Ranchi
                </p>
              </div>

              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#ebb2ff]">Apr 2020 – May 2022</span>
                  <span className="text-[#b9cacb] bg-white/5 px-2 py-0.5 rounded text-[10px]">Completed</span>
                </div>
                <h5 className="font-display font-bold text-sm text-[#e1fdff]">
                  Intermediate in Science
                </h5>
                <p className="text-xs text-[#b9cacb]">
                  Kendriya Vidyalaya, Godda
                </p>
                <p className="text-[11px] font-mono text-[#b9cacb]/70">
                  Central Board of Secondary Education (CBSE)
                </p>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs font-bold text-[#00f2ff] uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>// CERTIFICATIONS &amp; ACHIEVEMENTS</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {CERTIFICATIONS.map((cert, cIdx) => (
                <div key={cIdx} className="p-3.5 rounded-lg bg-black/30 border border-white/5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#00f2ff] mt-1.5 shrink-0 shadow-[0_0_8px_#00f2ff]" />
                  <div>
                    <div className="font-display font-bold text-xs sm:text-sm text-[#e1fdff]">
                      {cert.title}
                    </div>
                    <div className="text-xs text-[#b9cacb]/80 mt-0.5 font-sans">
                      {cert.detail} ({cert.issuer})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
