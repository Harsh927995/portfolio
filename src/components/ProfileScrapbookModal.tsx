import React, { useState } from 'react';
import { X, Download, Sparkles, Image as ImageIcon, LayoutGrid } from 'lucide-react';
import { PROFILE_SCRAPBOOK_DATA } from '../data/profileCardData';

interface ProfileScrapbookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileScrapbookModal: React.FC<ProfileScrapbookModalProps> = ({ isOpen, onClose }) => {
  const [showPoster, setShowPoster] = useState(false);

  if (!isOpen) return null;

  const data = PROFILE_SCRAPBOOK_DATA;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Who Is Harsh? Profile Card"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[92vh] bg-surface border border-white/15 rounded-2xl shadow-[0_0_45px_rgb(var(--theme-primary-rgb)/0.22)] flex flex-col my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Minimal Header */}
        <div className="bg-surface-lowest px-5 py-3.5 border-b border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="font-display font-bold text-sm sm:text-base text-[#e1fdff]">
              Who Is Harsh?
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPoster((prev) => !prev)}
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-white/5 hover:bg-white/10 border border-white/10 text-[#e1fdff] flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {showPoster ? (
                <>
                  <LayoutGrid className="w-3.5 h-3.5 text-accent" />
                  <span>Card View</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-3.5 h-3.5 text-accent-secondary" />
                  <span>Poster View</span>
                </>
              )}
            </button>

            <a
              href="/harsh-profile-card.png"
              download="Harsh_Kashyap_Profile_Card.png"
              className="px-3 py-1.5 rounded-lg text-xs font-mono bg-accent text-accent-ink font-bold hover:shadow-[0_0_16px_rgb(var(--theme-primary-rgb)/0.45)] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile card"
              className="p-1.5 rounded-lg text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto bg-[#0b0d10]">
          {showPoster ? (
            <div className="flex justify-center">
              <div className="max-w-sm w-full rounded-xl overflow-hidden border border-white/15 shadow-2xl bg-[#f4ead8]">
                <img
                  src="/harsh-profile-card.png"
                  alt="Who Is Harsh Profile Poster"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          ) : (
            <div
              className="relative mx-auto rounded-xl p-6 sm:p-8 text-[#2b1b14] shadow-2xl border border-[#d6c2a8] overflow-hidden select-text"
              style={{
                backgroundColor: '#f4ead8',
                backgroundImage:
                  'repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(139, 109, 80, 0.14) 28px)',
              }}
            >
              {/* Simple Masking Tape Corners */}
              <div className="pointer-events-none absolute -top-2 left-6 w-16 h-5 bg-[#d6b78e]/75 -rotate-12" />
              <div className="pointer-events-none absolute -top-2 right-6 w-16 h-5 bg-[#d6b78e]/75 rotate-12" />

              {/* Headline */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2.5">
                  <span className="font-display font-black text-3xl sm:text-5xl text-[#6a231c]">
                    WHO
                  </span>
                  <span className="px-2.5 py-0.5 bg-[#e5d2b8] border border-[#b99b76] -rotate-3 font-serif italic font-bold text-lg sm:text-xl text-[#3b251b]">
                    IS
                  </span>
                  <span className="font-display font-black text-3xl sm:text-5xl text-[#6a231c]">
                    HE?
                  </span>
                </div>
              </div>

              {/* Clean 3-Column Layout */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* Left: About & Class Badge */}
                <div className="md:col-span-4 space-y-4 text-left">
                  <div className="bg-[#fbf4e9] p-4 rounded border border-[#cbb394] shadow-sm -rotate-1">
                    <div className="font-serif italic font-bold text-sm text-[#6a231c] mb-2">
                      About me ♥
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-[#3b251b]">
                      {data.aboutItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#6a231c]">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#fcf8f0] border border-[#cbb394] rounded-md p-3 shadow-sm rotate-1 w-32 text-center mx-auto md:mx-0">
                    <div className="bg-[#7c261e] text-[#fff8ee] font-display font-bold text-[10px] py-0.5 rounded-t uppercase">
                      {data.badgeTop}
                    </div>
                    <div className="font-display font-black text-2xl text-[#2b1b14] py-1 border-x border-b border-[#cbb394] rounded-b bg-white">
                      {data.badgeYear}
                    </div>
                  </div>
                </div>

                {/* Center: Portrait Sticker */}
                <div className="md:col-span-4 flex flex-col items-center">
                  <div className="w-48 sm:w-52 aspect-[3/4] rounded-2xl p-2 bg-[#fffdf9] shadow-lg border border-[#d6c2a8]">
                    <img
                      src="/harsh portrait.jpg"
                      alt="Harsh Kashyap"
                      className="w-full h-full object-cover object-top rounded-xl"
                    />
                  </div>
                  <p className="mt-3 font-serif italic text-xs sm:text-sm text-[#4e3426] text-center">
                    {data.mantraQuote}
                  </p>
                </div>

                {/* Right: Stack & Likes */}
                <div className="md:col-span-4 space-y-4 text-left">
                  <div className="bg-[#fbf4e9] p-4 rounded border border-[#cbb394] shadow-sm rotate-1">
                    <div className="inline-block px-2.5 py-0.5 bg-[#6a231c] text-[#fff8ee] font-serif italic font-bold text-xs mb-2">
                      Core Stack
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-[#3b251b]">
                      {data.stackItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#6a231c]">›</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#ead8bf] p-4 rounded border border-[#bfa17b] shadow-sm -rotate-1">
                    <div className="inline-block px-2.5 py-0.5 bg-[#6a231c] text-[#fff8ee] font-serif italic font-bold text-xs mb-2">
                      Likes
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm font-medium text-[#2b1b14]">
                      {data.likesItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="text-[#6a231c]">✦</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
