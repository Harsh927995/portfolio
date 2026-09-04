import React from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#0c0f0f] border-t border-white/5 mt-auto py-16"
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <button
          onClick={onScrollToTop}
          className="font-display text-2xl font-bold text-[#e1fdff] opacity-85 hover:opacity-100 transition-opacity text-left cursor-pointer flex items-center gap-2"
        >
          <span className="text-[#00f2ff]">&gt;_</span>
          <span>portfolio</span>
        </button>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a
            href={DEVELOPER_PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-[#00f2ff] transition-colors duration-200"
          >
            GitHub
          </a>
          <a
            href={DEVELOPER_PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-[#ebb2ff] transition-colors duration-200"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${DEVELOPER_PROFILE.email}`}
            className="font-sans text-sm sm:text-base text-[#b9cacb] hover:text-[#00f2ff] transition-colors duration-200"
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
