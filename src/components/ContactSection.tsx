import React, { useState } from 'react';
import { DEVELOPER_PROFILE } from '../data/portfolioData';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle, Github, Linkedin, Radio, Phone, ExternalLink } from 'lucide-react';

interface ContactSectionProps {
  onOpenContactCard?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenContactCard }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    honeypot: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ text: string; type: 'success' | 'error' | '' }>({
    text: '',
    type: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(form.subject || `Portfolio Inquiry from ${form.name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    return `mailto:${DEVELOPER_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return;

    setSubmitting(true);
    setStatus({ text: '', type: '' });

    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
    const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    try {
      let response: Response;

      if (formspreeEndpoint) {
        response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });
      } else if (web3FormsKey) {
        response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: form.name,
            email: form.email,
            subject: form.subject,
            message: form.message,
          }),
        });
      } else {
        response = await fetch(`https://formsubmit.co/ajax/${DEVELOPER_PROFILE.email}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            _subject: `[Portfolio] ${form.subject}`,
            _template: 'table',
            message: form.message,
          }),
        });
      }

      const data = await response.json().catch(() => ({}));
      const isOk = response.ok && data.success !== false && data.success !== 'false';

      if (!isOk) {
        throw new Error(data.message || 'Transmission endpoint rejected the request.');
      }

      setStatus({
        text: 'Packet transmitted successfully. Harsh will reply to your email shortly.',
        type: 'success',
      });
      setForm({ name: '', email: '', subject: '', message: '', honeypot: '' });
      setTimeout(() => setStatus({ text: '', type: '' }), 7000);
    } catch {
      setStatus({
        text: 'Direct transmission could not reach the relay right now. Use the email button below to send directly via your mail app.',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="text-left">
          <h2
            id="contact-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] mb-2"
          >
            Initiate Direct Transmission
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl">
            Dispatch prioritized inquiries, project contracts, or architectural discussions directly to the developer node.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-accent">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span>{DEVELOPER_PROFILE.status}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Transmission Form */}
        <div className="lg:col-span-7 surface-glass p-8 sm:p-10 rounded-xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.6)] text-left">
          <div className="flex items-center gap-2 font-mono text-xs text-accent mb-6">
            <Radio className="w-4 h-4 text-accent" />
            <span>TRANSMISSION_PROTOCOL // SECURE_SOCKET</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="honeypot"
              value={form.honeypot}
              onChange={handleInputChange}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact-name" className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                  Sender Identity
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g. Alex Mercer"
                  className="w-full bg-surface-lowest border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-accent focus:outline-none placeholder-[#b9cacb]/40"
                />
              </div>

              <div>
                <label htmlFor="contact-email" className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                  Return Coordinates (Email)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  required
                  placeholder="alex@enterprise.com"
                  className="w-full bg-surface-lowest border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-accent focus:outline-none placeholder-[#b9cacb]/40"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                Subject
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleInputChange}
                required
                placeholder="Contract / Full-Time Engineering Opportunity"
                className="w-full bg-surface-lowest border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-accent focus:outline-none placeholder-[#b9cacb]/40"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="block font-mono text-xs text-[#b9cacb] mb-2 uppercase">
                Payload Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleInputChange}
                required
                rows={5}
                placeholder="Detail the technical specifications, timeline, or position overview..."
                className="w-full bg-surface-lowest border border-white/10 rounded px-4 py-2.5 text-xs sm:text-sm font-mono text-[#e1fdff] focus:border-accent focus:outline-none placeholder-[#b9cacb]/40 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded bg-accent text-accent-ink font-display text-sm font-bold tracking-wider hover:shadow-[0_0_25px_rgb(var(--theme-primary-rgb)/0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'TRANSMITTING PACKETS...' : 'DISPATCH TRANSMISSION'}</span>
            </button>

            {status.text && (
              <div
                role="status"
                aria-live="polite"
                className={`p-4 rounded border text-xs font-mono flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  status.type === 'success'
                    ? 'bg-accent/10 border-accent/40 text-accent'
                    : 'bg-red-500/10 border-red-500/40 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  )}
                  <span>{status.text}</span>
                </div>
                {status.type === 'error' && (
                  <a
                    href={buildMailtoHref()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-[#e1fdff] border border-white/15 shrink-0 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Email App</span>
                  </a>
                )}
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
                <Mail className="w-5 h-5 text-accent" />
                <div>
                  <div className="text-[10px] font-mono text-[#b9cacb]/60 uppercase">Primary Email</div>
                  <a
                    href={`mailto:${DEVELOPER_PROFILE.email}`}
                    className="text-xs sm:text-sm font-mono text-[#e1fdff] hover:text-accent transition-colors"
                  >
                    {DEVELOPER_PROFILE.email}
                  </a>
                </div>
              </div>

              <div
                onClick={onOpenContactCard}
                onKeyDown={(e) => {
                  if (onOpenContactCard && (e.key === 'Enter' || e.key === ' ')) {
                    e.preventDefault();
                    onOpenContactCard();
                  }
                }}
                role={onOpenContactCard ? 'button' : undefined}
                tabIndex={onOpenContactCard ? 0 : undefined}
                aria-label={onOpenContactCard ? 'Open Harsh Kashyap contact card' : undefined}
                className="flex items-center justify-between p-3 rounded bg-black/40 border border-white/5 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all cursor-pointer group"
                title="Click to view Contact Card"
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                  <div>
                    <div className="text-[10px] font-mono text-[#b9cacb]/60 uppercase">Direct Voice / WhatsApp</div>
                    <a
                      href={`tel:+91${DEVELOPER_PROFILE.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-xs sm:text-sm font-mono text-[#e1fdff] hover:text-accent transition-colors"
                    >
                      +91 {DEVELOPER_PROFILE.phone}
                    </a>
                  </div>
                </div>
                {onOpenContactCard && (
                  <span className="text-[11px] font-mono text-accent opacity-80 group-hover:opacity-100 transition-opacity bg-accent/10 px-2 py-0.5 rounded border border-accent/30">
                    Card &rarr;
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 p-3 rounded bg-black/40 border border-white/5">
                <MapPin className="w-5 h-5 text-accent-secondary" />
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
          <div className="surface-glass p-6 rounded-xl border border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[#b9cacb]">
                GITHUB: <strong className="text-[#e1fdff]">{DEVELOPER_PROFILE.handle}</strong>
              </div>
              <a
                href={DEVELOPER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-accent border border-white/10 hover:border-accent/40 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Inspect</span>
              </a>
            </div>

            <div className="h-[1px] bg-white/5" />

            <div className="flex items-center justify-between">
              <div className="text-xs font-mono text-[#b9cacb]">
                LINKEDIN: <strong className="text-[#e1fdff]">harsh-kashyap-</strong>
              </div>
              <a
                href={DEVELOPER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-xs font-mono text-accent border border-white/10 hover:border-accent/40 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-accent-dim" />
                <span>Connect</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
