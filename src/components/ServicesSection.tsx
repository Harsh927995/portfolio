import React from 'react';
import { SERVICES_DATA } from '../data/portfolioData';
import { Code, Layers, Cpu } from 'lucide-react';

export const ServicesSection: React.FC = () => {
  const getIcon = (name: string, color: string) => {
    switch (name) {
      case 'code':
        return <Code className="w-6 h-6" style={{ color }} />;
      case 'layers':
        return <Layers className="w-6 h-6" style={{ color }} />;
      case 'cpu':
        return <Cpu className="w-6 h-6" style={{ color }} />;
      default:
        return <Code className="w-6 h-6" style={{ color }} />;
    }
  };

  return (
    <section id="services" className="w-full max-w-[1720px] 2xl:max-w-[1840px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-24 border-t border-white/10 relative">
      {/* Section Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2
            id="services-heading"
            className="font-display text-2xl sm:text-3xl font-bold text-[#e1fdff] flex items-center gap-4 mb-2"
          >
            <span className="w-12 h-1 bg-[#00f2ff] shadow-[0_0_12px_#00f2ff] inline-block rounded-full"></span>
            <span>Core Engineering Capabilities</span>
          </h2>
          <p className="font-sans text-sm sm:text-base text-[#b9cacb] max-w-xl text-left">
            Production-grade competencies in full-stack architecture, high-density developer tooling, and modern frontend systems.
          </p>
        </div>
      </div>

      {/* Services Grid with Cyber Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {SERVICES_DATA.map((service) => (
          <div
            key={service.id}
            className="surface-glass rounded-xl p-8 flex flex-col justify-between border border-white/10 hover:border-[#00f2ff]/60 hover:shadow-[0_0_30px_rgba(0,242,255,0.2)] transition-all duration-300 group text-left relative overflow-hidden"
          >
            {/* Top Border Glow Strip */}
            <span
              className="absolute top-0 left-0 w-0 h-[2px] group-hover:w-full transition-all duration-500"
              style={{ backgroundColor: service.color, boxShadow: `0 0 10px ${service.color}` }}
            />

            <div>
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                {getIcon(service.iconName, service.color)}
              </div>

              {/* Service Title */}
              <h3 className="font-display text-xl font-bold text-[#e1fdff] group-hover:text-[#00f2ff] transition-colors mb-3">
                {service.title}
              </h3>

              {/* Service Description */}
              <p className="font-sans text-sm text-[#b9cacb] leading-relaxed">
                {service.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
