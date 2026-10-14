import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, MapPin, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenEnquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEnquiry }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Core Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            {/* Unboxed Metadata Line (Zero-pill compliant) */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide text-amber-800 uppercase">
              <span>Established 2023</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>Gwalior, Madhya Pradesh</span>
              <span aria-hidden="true" className="text-amber-400">·</span>
              <span>Loan Advisory & Support</span>
            </div>

            {/* Homepage Main Message */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] text-balance">
              Your Financial Requirements. <br className="hidden sm:inline" />
              <span className="text-amber-800">Our Professional Assistance.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Arvon Micro Service provides professional loan assistance, documentation guidance, and application support for individuals and businesses.
            </p>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Comprehensive Loan Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Strict Pre-Submission File Audit</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Direct Local Office in Gwalior</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Transparent & Dependable Support</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all hover:translate-y-[-1px] cursor-pointer whitespace-nowrap"
              >
                <span>Send Enquiry</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>

              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Contact Us</span>
              </button>
            </div>

            {/* Location & Service indicator */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Gwalior, Madhya Pradesh</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with resilient fallback */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200/80 bg-stone-900">
              {!imageError ? (
                <img
                  src="/src/assets/images/hero_financial_advisory_1790764399563.jpg"
                  alt="Arvon Micro Service team assisting client with loan paperwork and documentation in Gwalior"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-auto object-cover aspect-[16/11] brightness-[0.98] contrast-[1.02]"
                />
              ) : (
                <div className="w-full aspect-[16/11] bg-gradient-to-br from-slate-900 via-stone-800 to-amber-950 flex flex-col justify-end p-6 text-white">
                  <ShieldCheck className="w-10 h-10 text-amber-400 mb-3" />
                  <p className="font-bold text-lg">Professional Loan Facilitation</p>
                  <p className="text-xs text-stone-300">Loan assistance for individuals & businesses in Gwalior</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
