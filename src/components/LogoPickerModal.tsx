import React from 'react';
import { X, Check, Download, Sparkles } from 'lucide-react';
import { LOGO_OPTIONS, LogoId } from '../data/logos';

interface LogoPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLogoId: LogoId;
  onSelectLogo: (id: LogoId) => void;
}

export const LogoPickerModal: React.FC<LogoPickerModalProps> = ({
  isOpen,
  onClose,
  selectedLogoId,
  onSelectLogo,
}) => {
  if (!isOpen) return null;

  const activeLogo = LOGO_OPTIONS.find((l) => l.id === selectedLogoId) ?? LOGO_OPTIONS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Choose Portfolio Logo Style"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-surface border border-white/15 rounded-2xl shadow-[0_0_50px_rgb(var(--theme-primary-rgb)/0.25)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-surface-lowest px-6 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-accent" />
            <div className="text-left">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#e1fdff]">
                Select Portfolio Logo
              </h3>
              <p className="font-mono text-[11px] text-[#b9cacb]/70">
                Choose between 4 custom portrait emblem styles
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close logo selector"
            className="p-1.5 rounded-lg text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Logo Options Grid */}
        <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {LOGO_OPTIONS.map((option) => {
            const isSelected = option.id === selectedLogoId;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onSelectLogo(option.id)}
                className={`group relative flex flex-col items-center p-3 rounded-xl border transition-all text-center cursor-pointer ${
                  isSelected
                    ? 'bg-accent/15 border-accent shadow-[0_0_24px_rgb(var(--theme-primary-rgb)/0.3)]'
                    : 'bg-black/30 border-white/10 hover:border-accent/50 hover:bg-white/5'
                }`}
              >
                {isSelected && (
                  <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-accent text-accent-ink flex items-center justify-center shadow-sm z-10">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </span>
                )}

                <div className="w-full aspect-square rounded-xl overflow-hidden border border-white/10 mb-3 bg-surface-lowest">
                  <img
                    src={option.src}
                    alt={`${option.name} logo option`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="font-display font-bold text-xs sm:text-sm text-[#e1fdff]">
                  {option.name}
                </div>
                <div className="font-mono text-[10px] text-accent mt-0.5">
                  {option.tag}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="bg-surface-lowest px-6 py-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs text-[#b9cacb]">
            Active: <strong className="text-accent">{activeLogo.name}</strong>
          </span>

          <div className="flex items-center gap-2.5">
            <a
              href={activeLogo.src}
              download={`harsh-${activeLogo.id}-logo.png`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/40 text-xs font-mono text-[#e1fdff] hover:text-accent transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-accent text-accent-ink font-display font-bold text-xs hover:shadow-[0_0_18px_rgb(var(--theme-primary-rgb)/0.5)] transition-all cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
