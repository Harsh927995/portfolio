import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Mail, MapPin, Send, CheckCircle2, Github, Linkedin, Twitter, Radio, Phone } from 'lucide-react';

interface ContactSectionProps {
  onOpenContactCard?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactCard }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ text: '', type: '' });

    // Simulate sending transmission
    setTimeout(() => {
      setSubmitting(false);
      setStatus({
        text: '✓ Packet transmission verified. Response will be dispatched to your coordinates.',
        type: 'success',
      });
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus({ text: '', type: '' }), 6000);
    }, 1000);
  };

  return (
    <section id="contact" className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="text-left">
          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] flex items-center gap-4 mb-2"
          >
            <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
            <span>Initiate Direct Transmission</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl">
            Dispatch prioritized inquiries, project contracts, or architectural discussions directly to the developer node.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#00f2ff]">
          <span className="w-2 h-2 rounded-full bg-[#00f2ff] animate-pulse"></span>
          <span>{DEVELOPER_PROFILE.status}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Transmission Form */}
        <div className="lg:col-span-7 surface-glass p-8 sm:p-10 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-[#00f2ff] mb-6">
            <Radio className="w-4 h-4 text-[#00f2ff]" />
            <span>TRANSMISSION_PROTOCOL // SECURE_SOCKET</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                  Sender Identity
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-[#0c0f0f] border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-[#00f2ff] focus:outline-none placeholder-[#b9cacb]/40"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                  Return Coordinates (Email)
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  placeholder="alex@enterprise.com"
                  className="w-full bg-[#0c0f0f] border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-[#00f2ff] focus:outline-none placeholder-[#b9cacb]/40"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleInputChange}
                required
                placeholder="Contract / Full-Time Engineering Opportunity"
                className="w-full bg-[#0c0f0f] border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-[#00f2ff] focus:outline-none placeholder-[#b9cacb]/40"
              />
            </div>

            <div>
              <label className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                Payload Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Detail the technical specifications, timeline, or position overview..."
                className="w-full bg-[#0c0f0f] border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-[#00f2ff] focus:outline-none placeholder-[#b9cacb]/40 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded bg-[#00f2ff] text-[#002022] font-display text-sm font-bold tracking-wider hover:shadow-[0_0_25px_rgba(0,242,255,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'TRANSMITTING PACKETS...' : 'DISPATCH TRANSMISSION'}</span>
            </button>

            {status.text && (
              <div
                className={`p-4 rounded border text-xs font-mono flex items-center gap-2.5 ${
                  status.type === 'success'
                    ? 'bg-[#00f2ff]/10 border-[#00f2ff]/40 text-[#00f2ff]'
                    : 'bg-red-500/10 border-red-500/40 text-red-400'
                }`}
              >
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{status.text}</span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Transmission Coordinates */}
        <div className="lg:col-span-5 flex flex-col gap-6 text-left">
          <div className="surface-glass p-8 rounded-xl border border-white/10 shadow-[0_0_25px_rgba(0,0,0,0.5)]">
            <h3 className="font-display font-bold text-lg text-[#e1fdff] mb-4">
              Direct Transmission Endpoints
            </h3>
            <p className="font-sans text-sm text-[#b9cacb] leading-relaxed mb-6">
              Prefer asynchronous direct communication? Reach out via encrypted email or connect on professional platforms.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded bg-black/40 border border-white/5">
                <Mail className="w-5 h-5 text-[#00f2ff]" />
                <div>
                  <div className="text-[10px] font-mono text-[#b9cacb]/60 uppercase">Primary Email</div>
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}`}
                    className="text-xs sm:text-sm font-mono text-[#e1fdff] hover:text-[#00f2ff] transition-colors"
                  >
                    {DEVELOPER_PROFILE.email}
                  </a>
                </div>
              </div>

              <div
                onClick={onOpenContactCard}
                className="flex items-center justify-between p-3 rounded bg-black/40 border border-white/5 hover:border-[#00f2ff]/40 transition-all cursor-pointer group"
                title="Click to view Contact Card"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-[#00f2ff] group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] font-mono text-[#b9cacb]/60 uppercase">Direct Voice / WhatsApp</div>
                    <a
                      href={`tel:+91${DEVELOPER_PROFILE.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs sm:text-sm font-mono text-[#e1fdff] hover:text-[#00f2ff] transition-colors"
                    >
                      +91 {DEVELOPER_PROFILE.phone}
                    </a>
                  </div>
                </div>
                {onOpenContactCard && (
                  <span className="text-[11px] font-mono text-[#00f2ff] opacity-80 group-hover:opacity-100 transition-opacity bg-[#00f2ff]/10 px-2 py-0.5 rounded border border-[#00f2ff]/30">
                    Card &rarr;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-black/40 border border-white/5">
                <MapPin className="w-5 h-5 text-[#ebb2ff]" />
                <div>
                  <div className="text-[10px] font-mono text-[#b9cacb]/60 uppercase">Physical Node Location</div>
                  <div className="text-xs sm:text-sm font-mono text-[#e1fdff]">
                    {DEVELOPER_PROFILE.location}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Profiles Card */}
          <div className="surface-glass p-6 rounded-xl border border-white/10 flex items-center justify-between">
            <div className="text-xs font-mono text-[#b9cacb]">
              GITHUB_PROFILE: <strong>{DEVELOPER_PROFILE.handle}</strong>
            </div>
            <a
              href={DEVELOPER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-[#00f2ff] border border-white/10 hover:border-[#00f2ff]/40 transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Inspect</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
