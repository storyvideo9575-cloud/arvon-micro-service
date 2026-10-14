import React from 'react';
import { ArrowRight, CheckCircle, FileCheck, Users, Clock } from 'lucide-react';

interface ProcessGuideProps {
  onStartEnquiry: () => void;
}

export const ProcessGuide: React.FC<ProcessGuideProps> = ({ onStartEnquiry }) => {
  const steps = [
    {
      num: '01',
      title: 'Requirement Understanding',
      desc: 'We sit down with you or connect via phone to discuss your specific fund requirements and financial goals.',
      icon: Users,
      tagline: 'Initial Discussion'
    },
    {
      num: '02',
      title: 'Documentation Scrutiny',
      desc: 'Our specialists thoroughly review your KYC records, income statements, ITR, and bank records to ensure compliance and avoid mismatches.',
      icon: FileCheck,
      tagline: 'Quality Verification'
    },
    {
      num: '03',
      title: 'Application Preparation',
      desc: 'We guide you in choosing suitable lender categories (banks or registered NBFCs) and assembling an organized application dossier.',
      icon: CheckCircle,
      tagline: 'Lender File Alignment'
    },
    {
      num: '04',
      title: 'Follow-Up & Coordination',
      desc: 'We assist with bank query responses, property/office verification readiness, and follow-ups through to final sanction.',
      icon: Clock,
      tagline: 'Continuous Support'
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-20 bg-stone-100/60 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-amber-800 uppercase mb-2">
            03. Step-by-Step Pathway
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            How Arvon Micro Service Assists You
          </h2>
          <p className="mt-3 text-base text-slate-600">
            A straightforward, four-stage framework designed to remove ambiguity and save your valuable time.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="bg-white p-6 sm:p-7 rounded-2xl border border-stone-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold font-mono tabular-nums text-amber-800">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                    {step.tagline}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Phase {step.num}</span>
                  <span className="text-emerald-700 font-medium">Guided Support</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fast Action Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-base font-bold text-slate-900">Have questions about your loan documentation?</h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Speak directly with our team in Gwalior for immediate guidance.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onStartEnquiry}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>Submit Enquiry</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
