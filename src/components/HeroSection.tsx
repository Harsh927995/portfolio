import React, { useState } from 'react';
import { ArrowRight, Terminal, Copy, Check, Play } from 'lucide-react';
import { DEVELOPER_PROFILE, CODE_SNIPPETS } from '../data/portfolioData';
import { AnimatedLetters } from './AnimatedLetters';

interface HeroSectionProps {
  onViewWork: () => void;
  onContact: () => void;
  onOpenTerminal: () => void;
  onOpenContactCard: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWork,
  onContact,
  onOpenTerminal,
  onOpenContactCard,
}) => {
  const [activeTab, setActiveTab] = useState<string>('passion.js');
  const [copied, setCopied] = useState<boolean>(false);
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  const currentSnippet = CODE_SNIPPETS[activeTab] || CODE_SNIPPETS['passion.js'];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsExecuting(true);
    setExecutionOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutionOutput(currentSnippet.output);
    }, 450);
  };

  return (
    <section
      id="home"
      className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 min-h-[88vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 xl:gap-20 pt-32 sm:pt-36 pb-20 relative"
    >
      {/* Atmospheric Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00f2ff]/5 rounded-full blur-[140px] -z-10 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-[#ebb2ff]/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      {/* Left Column: Clean, Attractive Typography & Actions */}
      <div className="lg:w-[52%] xl:w-[50%] z-10 text-left">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f2ff] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></span>
          <span>{DEVELOPER_PROFILE.status}</span>
        </div>

        {/* Main Heading with Elegant Letter Animations */}
        <h1
          id="hero-main-heading"
          className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[66px] font-black text-[#e1fdff] leading-[1.08] tracking-tight mb-6"
        >
          <span className="block">
            <AnimatedLetters text="Building the" staggerDelay={0.028} initialDelay={0.08} />
          </span>
          <span className="block text-[#00f2ff] drop-shadow-[0_0_25px_rgba(0,242,255,0.4)]">
            <AnimatedLetters text="Future of the Web." staggerDelay={0.028} initialDelay={0.38} />
          </span>
        </h1>

        {/* Bio Paragraph */}
        <p
          id="hero-bio-paragraph"
          className="font-sans text-base sm:text-lg text-[#b9cacb] mb-10 max-w-2xl xl:max-w-3xl leading-relaxed font-normal"
        >
          {DEVELOPER_PROFILE.heroBio}
        </p>

        {/* Action Buttons & Interactive Retro Phone Trigger */}
        <div className="flex flex-wrap items-center gap-5 pt-1">
          <button
            id="hero-view-work-btn"
            onClick={onViewWork}
            className="bg-[#00f2ff] text-[#002022] font-display text-base font-bold px-8 py-4 rounded hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer group"
          >
            <span>View My Work</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="hero-terminal-btn"
            onClick={onOpenTerminal}
            className="surface-glass text-[#e1fdff] font-display text-base font-semibold px-6 py-4 rounded hover:bg-white/10 border border-white/10 hover:border-[#00f2ff]/40 transition-all duration-300 flex items-center gap-2 cursor-pointer"
          >
            <Terminal className="w-5 h-5 text-[#00f2ff]" />
            <span>Open Terminal</span>
          </button>

          {/* Interactive Retro Phone with Popping 'Click on me!' Bubble */}
          <div className="relative inline-flex items-center ml-1 sm:ml-3 mt-4 sm:mt-0">
            {/* Animated Popping Speech Bubble */}
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-gradient-to-r from-[#00f2ff] to-[#33f5ff] text-[#002022] font-mono text-[11px] sm:text-xs font-black px-3.5 py-1 rounded-full shadow-[0_0_25px_rgba(0,242,255,0.8)] animate-bounce flex items-center gap-1.5 pointer-events-none select-none tracking-tight">
              <span className="w-2 h-2 rounded-full bg-[#002022] animate-ping" />
              <span>Click on me!</span>
              {/* Downward Speech Bubble Triangle */}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-[#00f2ff] rotate-45" />
            </div>

            {/* Retro Phone Button */}
            <button
              id="hero-retro-phone-btn"
              onClick={onOpenContactCard}
              className="relative p-1.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#00f2ff]/70 transition-all duration-300 cursor-pointer group flex items-center justify-center hover:shadow-[0_0_30px_rgba(0,242,255,0.4)] active:scale-90"
              title="Incoming transmission — Click to view Harsh's Card"
            >
              <img
                src="/retro_phone.png"
                alt="Retro Phone - Click for Contact Card"
                className="w-12 h-14 sm:w-14 sm:h-16 object-contain drop-shadow-[0_0_12px_rgba(0,242,255,0.35)] group-hover:scale-115 group-hover:rotate-6 group-hover:drop-shadow-[0_0_25px_rgba(0,242,255,0.9)] transition-all duration-300"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Interactive IDE Window */}
      <div className="lg:w-[48%] xl:w-[50%] w-full z-10">
        <div className="surface-glass rounded-xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* IDE Window Bar */}
          <div className="bg-[#0c0f0f] px-4 py-3 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-[#b9cacb]/60">
                harsh@devcore-workspace: ~/{currentSnippet.filename}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="p-1.5 rounded hover:bg-white/10 text-[#b9cacb] hover:text-[#00f2ff] transition-colors cursor-pointer"
                title="Copy code snippet"
              >
                {copied ? <Check className="w-4 h-4 text-[#00f2ff]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tab Selection */}
          <div className="bg-[#121414] px-4 pt-2 border-b border-white/5 flex gap-2 overflow-x-auto">
            {Object.keys(CODE_SNIPPETS).map((tabKey) => {
              const snippet = CODE_SNIPPETS[tabKey];
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => {
                    setActiveTab(tabKey);
                    setExecutionOutput(null);
                  }}
                  className={`font-mono text-xs px-3 py-1.5 rounded-t transition-all cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1e2020] text-[#00f2ff] border-t-2 border-[#00f2ff] font-bold'
                      : 'text-[#b9cacb]/60 hover:text-[#b9cacb] hover:bg-white/5'
                  }`}
                >
                  <span>{snippet.filename}</span>
                </button>
              );
            })}
          </div>

          {/* Code Editor Body */}
          <div className="p-6 bg-[#0c0f0f]/90 text-left font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
            <pre className="text-[#e1fdff]">
              <code>{currentSnippet.code}</code>
            </pre>
          </div>

          {/* Run Code Control Bar */}
          <div className="bg-[#121414] px-6 py-3 border-t border-white/5 flex items-center justify-between">
            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-4 py-2 rounded bg-[#00f2ff]/10 hover:bg-[#00f2ff]/20 text-[#00f2ff] border border-[#00f2ff]/40 font-mono text-xs font-bold transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-[#00f2ff]" />
              <span>{isExecuting ? 'Executing...' : 'Run Code'}</span>
            </button>

            <span className="font-mono text-[11px] text-[#b9cacb]/50">
              Environment: Node.js / V8 Engine
            </span>
          </div>

          {/* Execution Output Console */}
          {executionOutput && (
            <div className="bg-[#0c0f0f] border-t border-[#00f2ff]/20 p-4 text-left font-mono text-xs text-[#00f2ff] transition-all">
              <pre className="whitespace-pre-wrap">{executionOutput}</pre>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
