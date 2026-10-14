import React from 'react';
import { Target, Compass, Sparkles, Building2 } from 'lucide-react';

export const MissionVisionSection: React.FC = () => {
  return (
    <section id="mission" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold tracking-widest text-amber-800 uppercase mb-2">
            02. Identity & Purpose
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Our Guiding Mission & Forward Vision
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Founded in 2023 in Gwalior, Arvon Micro Service was established with a clear commitment to integrity, financial clarity, and responsible client advocacy.
          </p>
        </div>

        {/* Editorial Split Grid: Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mission Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-stone-50 border border-stone-200 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Core Purpose</span>
                  <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
                </div>
              </div>

              {/* Exact user text in blockquote */}
              <blockquote className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal italic border-l-2 border-amber-600 pl-4 my-4">
                &ldquo;Our mission is to make the loan process simpler, more transparent, and accessible for individuals and businesses. We aim to understand each customer’s financial requirements and provide clear guidance throughout the application and documentation process.&rdquo;
              </blockquote>

              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                By demystifying underwriting requirements and verifying file health before formal filing, we protect applicants from uninformed rejections and needless delays.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-200/80 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Arvon Micro Service · Est. 2023</span>
              <span className="text-amber-800 font-semibold">Simplicity & Transparency</span>
            </div>
          </div>

          {/* Vision Card */}
          <div className="p-8 sm:p-10 rounded-2xl bg-stone-900 text-white border border-stone-800 flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                  <Compass className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Long-Term Aspiration</span>
                  <h3 className="text-xl font-bold text-white">Our Vision</h3>
                </div>
              </div>

              {/* Exact user text in blockquote */}
              <blockquote className="text-base sm:text-lg text-stone-200 leading-relaxed font-normal italic border-l-2 border-amber-400 pl-4 my-4">
                &ldquo;Our vision is to build a trusted financial service brand that helps individuals and entrepreneurs move forward with confidence by providing professional guidance, transparent communication, and dependable support for their financial requirements.&rdquo;
              </blockquote>

              <p className="text-xs text-stone-400 mt-4 leading-relaxed">
                We believe trust is earned through consistent honesty, clear communication about borrower qualifications, and zero tolerance for deceptive practices.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400 font-medium">
              <span>Gwalior, Madhya Pradesh</span>
              <span className="text-amber-400 font-semibold">Dependable Guidance</span>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Arvon's Practice */}
        <div className="mt-14 pt-12 border-t border-stone-200">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-6 text-center">
            How We Uphold Our Values in Daily Practice
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Clear Communication</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No misleading jargon or hidden contingencies. We explain every step in plain language.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <Target className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Rigorous File Audit</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We identify and resolve documentation discrepancies before files are submitted to lenders.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <Building2 className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Local Accessibility</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated loan guidance and documentation review for clients in Gwalior.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/70">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                <Compass className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-sm text-slate-900 mb-1">Ethical Standard</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We focus strictly on genuine eligibility, transparent guidance, and meticulous file preparation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
