import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
  onOpenLogoPicker: () => void;
  logoSrc: string;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollToTop,
  onOpenLogoPicker,
  logoSrc,
}) => {
  return (
    <footer
      id="main-footer"
      className="bg-surface-lowest border-t border-white/5 mt-auto py-16"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenLogoPicker}
            aria-label="Choose portfolio logo style"
            title="Click to switch logo (4 options)"
            className="rounded-lg p-0.5 border border-accent/40 hover:border-accent shadow-[0_0_12px_rgb(var(--theme-primary-rgb)/0.25)] transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <img
              src={logoSrc}
              alt="Harsh Kashyap Portfolio Logo"
              className="w-9 h-9 rounded-md object-cover"
            />
          </button>
          <button
            onClick={onScrollToTop}
            className="font-display text-2xl font-bold text-[#e1fdff] hover:text-accent opacity-90 hover:opacity-100 transition-all text-left cursor-pointer"
          >
            portfolio
          </button>
        </div>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-accent transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-accent-secondary transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-accent transition-colors duration-200"
          >
            Email
          </a>
        </div>

        {/* Copyright */}
        <p className="font-mono text-xs sm:text-sm text-[#b9cacb] opacity-85">
          © {new Date().getFullYear()} Harsh Kashyap Portfolio
        </p>
      </div>
    </footer>
  );
};
