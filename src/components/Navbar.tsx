import React, { useState, useEffect, useRef } from 'react';
import { Terminal, FileText, Menu, X, Palette, Check } from 'lucide-react';
import { THEMES, ThemeId } from '../data/themes';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenResume: () => void;
  onOpenTerminal: () => void;
  theme: ThemeId;
  onChangeTheme: (theme: ThemeId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenResume,
  onOpenTerminal,
  theme,
  onChangeTheme,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const activeTheme = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!themeMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setThemeMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setThemeMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [themeMenuOpen]);

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
        ? 'bg-surface/90 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.8)]'
        : 'bg-surface/70 backdrop-blur-md border-b border-white/5'
        }`}
    >
      <div className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 h-20 flex justify-between items-center">
        {/* Brand */}
        <button
          id="brand-logo-btn"
          onClick={() => handleItemClick('home')}
          aria-label="Go to top of portfolio"
          className="font-display text-2xl sm:text-[28px] font-black text-[#e1fdff] tracking-tight flex items-center gap-2.5 group transition-all hover:scale-105 active:scale-95 text-left cursor-pointer"
        >
          <span className="text-accent font-mono text-2xl font-bold transition-transform group-hover:translate-x-0.5">&gt;_</span>
          <span className="group-hover:text-accent transition-colors">portfolio</span>
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
                  ? 'text-accent bg-accent/10 shadow-[0_0_16px_rgb(var(--theme-primary-rgb)/0.2)] border border-accent/30 font-bold'
                  : 'text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/5 font-medium'
                  }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3">
          {/* Theme Switcher */}
          <div ref={themeMenuRef} className="relative">
            <button
              id="nav-theme-btn"
              onClick={() => setThemeMenuOpen((prev) => !prev)}
              aria-label="Switch color theme"
              aria-expanded={themeMenuOpen}
              aria-haspopup="menu"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 text-xs sm:text-sm font-mono text-[#e1fdff] transition-all cursor-pointer"
              title={`Theme: ${activeTheme.name}`}
            >
              <Palette className="w-4 h-4 text-accent" />
              <span className="hidden xl:inline text-xs text-[#b9cacb]">{activeTheme.shortName}</span>
              <span
                className="w-2.5 h-2.5 rounded-full border border-white/30"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.primary} 50%, ${activeTheme.secondary} 50%)`,
                }}
              />
            </button>

            {themeMenuOpen && (
              <div
                role="menu"
                aria-label="Select color theme"
                className="absolute right-0 mt-2 w-56 rounded-xl bg-surface-lowest/95 backdrop-blur-xl border border-white/15 shadow-[0_12px_35px_rgba(0,0,0,0.85)] p-2 z-50"
              >
                <div className="px-2.5 py-1.5 text-[10px] font-mono uppercase tracking-wider text-[#b9cacb]/60">
                  DEV_CORE // Theme Matrix
                </div>
                <div className="space-y-1">
                  {THEMES.map((item) => {
                    const isSelected = item.id === theme;
                    return (
                      <button
                        key={item.id}
                        role="menuitemradio"
                        aria-checked={isSelected}
                        onClick={() => {
                          onChangeTheme(item.id);
                          setThemeMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-accent/15 text-accent border border-accent/30 font-semibold'
                            : 'text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/25 shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${item.primary} 50%, ${item.secondary} 50%)`,
                            }}
                          />
                          <span>{item.name}</span>
                        </span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-accent" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Terminal Trigger */}
          <button
            id="nav-terminal-btn"
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 text-sm font-mono text-accent font-medium transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgb(var(--theme-primary-rgb)/0.15)]"
            title="Open CLI Terminal (Ctrl+K or ~)"
          >
            <Terminal className="w-4 h-4 text-accent" />
            <span>CLI</span>
            <kbd className="text-xs bg-black/50 px-1.5 py-0.5 rounded border border-white/15 text-[#b9cacb] font-mono">
              ~
            </kbd>
          </button>

          {/* Resume Modal Trigger */}
          <button
            id="nav-resume-btn"
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-accent/15 hover:bg-accent/25 text-accent border border-accent/50 text-sm font-display font-bold transition-all cursor-pointer shadow-[0_0_18px_rgb(var(--theme-primary-rgb)/0.25)] hover:shadow-[0_0_24px_rgb(var(--theme-primary-rgb)/0.5)] active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>CV</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          id="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded text-[#b9cacb] hover:text-white cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-accent" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-3">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`font-display text-left text-lg font-semibold py-2.5 px-3 rounded-lg transition-colors flex items-center justify-between ${isActive
                  ? 'text-accent bg-accent/10 font-bold'
                  : 'text-[#b9cacb] hover:text-white hover:bg-white/5'
                  }`}
              >
                <span>{item.label}</span>
                {isActive && <span className="w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_var(--theme-primary)]" />}
              </button>
            );
          })}

          {/* Mobile Theme Switcher */}
          <div className="pt-3 border-t border-white/5">
            <div className="text-[11px] font-mono text-[#b9cacb]/70 uppercase mb-2 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-accent" />
              <span>Theme</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {THEMES.map((item) => {
                const isSelected = item.id === theme;
                return (
                  <button
                    key={item.id}
                    onClick={() => onChangeTheme(item.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-accent/15 border-accent/40 text-accent font-semibold'
                        : 'bg-white/5 border-white/10 text-[#b9cacb]'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${item.primary} 50%, ${item.secondary} 50%)`,
                      }}
                    />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/5">
            <button
              onClick={() => {
                onOpenTerminal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm font-mono text-accent flex justify-center items-center gap-2"
            >
              <Terminal className="w-4 h-4" />
              <span>CLI Terminal</span>
            </button>
            <button
              onClick={() => {
                onOpenResume();
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 rounded-lg bg-accent/15 border border-accent/40 text-sm font-display font-bold text-accent flex justify-center items-center gap-2 shadow-[0_0_15px_rgb(var(--theme-primary-rgb)/0.2)]"
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
