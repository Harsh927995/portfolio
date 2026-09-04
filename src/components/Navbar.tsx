import React, { useState, useEffect } from 'react';
import { Terminal, FileText, Menu, X, Code2 } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenTerminal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'diagnostics', label: 'Diagnostics' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-[#121414]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
        : 'bg-[#121414]/70 backdrop-blur-md border-b border-white/5'
        }`}
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 h-20 flex justify-between items-center">
        {/* Brand */}
        <button
          id="brand-logo-btn"
          onClick={() => handleItemClick('home')}
          className="font-display text-2xl sm:text-[28px] font-black text-[#e1fdff] tracking-tight flex items-center gap-2.5 group transition-all hover:scale-105 active:scale-95 text-left cursor-pointer"
        >
          <span className="text-[#00f2ff] font-mono text-2xl font-bold transition-transform group-hover:translate-x-0.5">&gt;_</span>
          <span className="group-hover:text-[#00f2ff] transition-colors">portfolio</span>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1.5 lg:gap-2.5 xl:gap-3.5">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`font-display text-[15px] xl:text-base font-semibold px-3.5 py-2 rounded-lg transition-all duration-200 cursor-pointer ${isActive
                  ? 'text-[#00f2ff] bg-[#00f2ff]/10 shadow-[0_0_16px_rgba(0,242,255,0.2)] border border-[#00f2ff]/30 font-bold'
                  : 'text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/5 font-medium'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Terminal Trigger */}
          <button
            id="nav-terminal-btn"
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f2ff]/50 text-sm font-mono text-[#00f2ff] font-medium transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.15)]"
            title="Open CLI Terminal (Ctrl+K or ~)"
          >
            <Terminal className="w-4 h-4 text-[#00f2ff]" />
            <span>CLI</span>
            <kbd className="text-xs bg-black/50 px-1.5 py-0.5 rounded border border-white/15 text-[#b9cacb] font-mono">
              ~
            </kbd>
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-[#00f2ff]/15 hover:bg-[#00f2ff]/25 text-[#00f2ff] border border-[#00f2ff]/50 text-sm font-display font-bold transition-all cursor-pointer shadow-[0_0_18px_rgba(0,242,255,0.25)] hover:shadow-[0_0_24px_rgba(0,242,255,0.5)] active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>CV</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded text-[#b9cacb] hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#00f2ff]" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#121414]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`font-display text-left text-lg font-semibold py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${isActive
                  ? 'text-[#00f2ff] bg-[#00f2ff]/10 font-bold'
                  : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-[#00f2ff] shadow-[0_0_8px_#00f2ff]" />}
              </button>
            );
          })}
          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-[#00f2ff] flex justify-center items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>CLI Terminal</span>
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-[#00f2ff]/15 border border-[#00f2ff]/40 text-sm font-display font-bold text-[#00f2ff] flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(0,242,255,0.2)]"
            >
              <FileText className="w-4 h-4" />
              <span>Resume</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
