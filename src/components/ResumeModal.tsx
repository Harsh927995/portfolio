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
${PROJECTS.map(
  (project) => `### ${project.title} (${project.techStack.join(', ')})
${project.architecture.map((bullet) => `- ${bullet}`).join('\n')}
`
).join('\n')}

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

  return (
    <div
      id="resume-modal-root"
      role="dialog"
      aria-modal="true"
      aria-label="Curriculum Vitae — Harsh Kashyap"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div id="resume-modal-card" className="w-full max-w-4xl max-h-[92vh] bg-surface border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] flex flex-col my-auto overflow-hidden">
        
        {/* Top Controls Bar */}
        <div className="no-print bg-surface-lowest px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_var(--theme-primary)]"></span>
            <h3 className="font-display font-bold text-base sm:text-lg text-[#e1fdff]">
              Curriculum Vitae // Harsh Kashyap
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/Harsh_Kashyap_Resume.pdf"
              download="Harsh_Kashyap_Resume.pdf"
              id="btn-download-resume-pdf"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-accent/10 hover:bg-accent/20 text-accent border border-accent/30 transition-colors cursor-pointer"
              title="Download 1-page PDF Resume"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              id="btn-copy-resume-md"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-white/5 border border-white/10 text-[#b9cacb] hover:text-accent hover:border-accent/40 transition-colors cursor-pointer"
              title="Copy Markdown resume to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
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
              aria-label="Close resume modal"
              className="p-1.5 rounded text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 transition-colors cursor-pointer"
              title="Close modal (Escape)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div id="printable-resume" className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans text-[#b9cacb] select-text text-left">
          
          {/* Header Info */}
          <div className="border-b border-white/15 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
              <h1 className="font-display text-3xl sm:text-4xl font-black text-[#e1fdff] tracking-tight">
                Harsh Kashyap
              </h1>
              <span className="font-mono text-xs text-accent bg-accent/10 px-3 py-1 rounded border border-accent/30 w-fit">
                B.Tech Computer Science &amp; Engineering
              </span>
            </div>

            {/* Coordinates Row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-[#b9cacb]/90">
              <a href={`tel:${DEVELOPER_PROFILE.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Phone className="w-3.5 h-3.5 text-accent" />
                <span>{DEVELOPER_PROFILE.phone}</span>
              </a>

              <a href={`mailto:${DEVELOPER_PROFILE.email}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent-secondary" />
                <span>{DEVELOPER_PROFILE.email}</span>
              </a>

              <a href={DEVELOPER_PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Linkedin className="w-3.5 h-3.5 text-accent-dim" />
                <span>linkedin.com/in/harsh-kashyap-</span>
              </a>

              <a href={DEVELOPER_PROFILE.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                <Github className="w-3.5 h-3.5 text-[#e1fdff]" />
                <span>github.com/Harsh927995</span>
              </a>
            </div>
          </div>

          {/* Summary Section */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <span>// SUMMARY</span>
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-[#e2e2e2] bg-black/30 p-4 rounded-xl border border-white/5 font-sans">
              {DEVELOPER_PROFILE.summary}
            </p>
          </div>

          {/* Technical Skills Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <Code className="w-3.5 h-3.5" />
              <span>// TECHNICAL SKILLS</span>
            </h4>
            
            <div className="grid grid-cols-1 gap-2.5 bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-xs">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                <span className="text-accent min-w-[180px] shrink-0 font-semibold">Programming Languages:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.languages.join(', ')}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 pt-2 border-t border-white/5">
                <span className="text-accent-secondary min-w-[180px] shrink-0 font-semibold">Libraries &amp; Tools:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.librariesAndTools.join(', ')}</span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 pt-2 border-t border-white/5">
                <span className="text-accent-dim min-w-[180px] shrink-0 font-semibold">Tools &amp; Concepts:</span>
                <span className="text-[#e1fdff]">{TECHNICAL_SKILLS.conceptsAndTools.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <span>// PROJECTS</span>
            </h4>

            <div className="space-y-4">
              {PROJECTS.map((project, pIdx) => {
                const projectUrl = project.githubUrl || project.liveUrl;
                return (
                  <div key={project.id} className="p-5 rounded-xl bg-black/30 border border-white/10 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-white/5 pb-2.5">
                      <div>
                        <h5 className="font-display font-bold text-base text-[#e1fdff] flex flex-wrap items-center gap-2">
                          <span>{project.title}</span>
                          {projectUrl && (
                            <a
                              href={projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-accent hover:underline inline-flex items-center gap-1 text-xs font-mono"
                            >
                              <span>{pIdx === 0 ? '[View Source]' : '[Live Demo / Code]'}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </h5>
                        <div className="font-mono text-xs text-accent mt-0.5">
                          Stack: {project.techStack.join(', ')}
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 text-xs sm:text-sm text-[#b9cacb] leading-relaxed list-disc list-inside">
                      {project.architecture.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" />
              <span>// EXPERIENCE</span>
            </h4>

            <div className="space-y-4">
              {WORK_EXPERIENCE.map((exp, eIdx) => (
                <div key={eIdx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h5 className="font-display font-bold text-sm sm:text-base text-[#e1fdff]">
                        {exp.role}
                      </h5>
                      <div className="font-mono text-xs text-accent">
                        {exp.company}
                      </div>
                    </div>
                    <div className="font-mono text-xs text-accent-secondary">
                      {exp.location} • {exp.period}
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#b9cacb] list-disc list-inside leading-relaxed">
                    {exp.highlights.map((highlight, hIdx) => (
                      <li key={hIdx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="space-y-3">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>// EDUCATION</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_DATA.map((edu, idx) => {
                const match = edu.institution.match(/^(.*?)\s*\(([^)]+)\)$/);
                const primaryInstitution = match ? match[1] : edu.institution;
                const secondaryBoard = match ? match[2] : null;
                const isPursuing = edu.status.toLowerCase() === 'pursuing';

                return (
                  <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isPursuing ? 'text-accent' : 'text-accent-secondary'}>{edu.duration}</span>
                      <span
                        className={
                          isPursuing
                            ? 'text-[#00ff66] bg-[#00ff66]/10 px-2 py-0.5 rounded text-[10px]'
                            : 'text-[#b9cacb] bg-white/5 px-2 py-0.5 rounded text-[10px]'
                        }
                      >
                        {edu.status}
                      </span>
                    </div>
                    <h5 className="font-display font-bold text-sm text-[#e1fdff]">
                      {edu.degree}
                    </h5>
                    <p className="text-xs text-[#b9cacb]">
                      {primaryInstitution}
                    </p>
                    {secondaryBoard && (
                      <p className="text-[11px] font-mono text-[#b9cacb]/70">
                        {secondaryBoard}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="space-y-3 pt-2">
            <h4 className="font-mono text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>// CERTIFICATIONS &amp; ACHIEVEMENTS</span>
            </h4>

            <div className="grid grid-cols-1 gap-2.5">
              {CERTIFICATIONS.map((cert, cIdx) => (
                <div key={cIdx} className="p-3.5 rounded-lg bg-black/30 border border-white/5 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0 shadow-[0_0_8px_var(--theme-primary)]" />
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
