import React, { useEffect } from 'react';
import { X, Phone, Mail, Download } from 'lucide-react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';

interface ContactCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactCardModal: React.FC<ContactCardModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#0c0f0f] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,242,255,0.3)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121414]">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-lg bg-[#00f2ff]/10 text-[#00f2ff] border border-[#00f2ff]/30">
              <Phone className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-display font-bold text-base text-[#e1fdff]">
                Harsh Kashyap — Profile & Contact Card
              </h3>
              <p className="font-mono text-[11px] text-[#00f2ff]">
                VERIFIED DEVELOPER CARD // +91 {DEVELOPER_PROFILE.phone}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#b9cacb] hover:text-[#e1fdff] hover:bg-white/10 transition-colors cursor-pointer"
            title="Close modal (Escape)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card Image Display */}
        <div className="p-4 sm:p-6 bg-[#0c0f0f] flex items-center justify-center">
          <div className="relative rounded-xl overflow-hidden border border-white/15 shadow-[0_0_30px_rgba(0,0,0,0.9)] max-h-[65vh] flex items-center justify-center">
            <img
              src="/og-image.png"
              alt="Harsh Kashyap - Profile & Contact Card"
              className="w-full h-auto object-contain rounded-xl max-h-[65vh]"
            />
          </div>
        </div>

        {/* Action Controls Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#121414] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={`tel:+91${DEVELOPER_PROFILE.phone}`}
              className="px-4 py-2 rounded-lg bg-[#00f2ff] hover:bg-[#33f5ff] text-[#002022] font-display font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,242,255,0.3)] active:scale-95 cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 {DEVELOPER_PROFILE.phone}</span>
            </a>

            <a
              href={`mailto:${DEVELOPER_PROFILE.email}`}
              className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-[#e1fdff] font-mono text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#00f2ff]" />
              <span>{DEVELOPER_PROFILE.email}</span>
            </a>
          </div>

          <a
            href="/og-image.png"
            download="Harsh_Kashyap_Contact_Card.png"
            className="px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#b9cacb] hover:text-[#00f2ff] flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download contact card image"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </div>
  );
};
