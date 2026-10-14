import React from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Scale, 
  BadgeCheck, 
  Building2 
} from 'lucide-react';

interface TrustSecuritySectionProps {
  onOpenEnquiry?: () => void;
}

export const TrustSecuritySection: React.FC<TrustSecuritySectionProps> = ({ onOpenEnquiry }) => {
  const trustPillars = [
    {
      id: 'professional-service',
      icon: ShieldCheck,
      badge: 'Professional Excellence',
      title: 'Expert Loan Facilitation',
      subtitle: 'Structured process by seasoned loan specialists',
      description:
        'Every profile undergoes systematic verification by experienced documentation professionals, aligning your credentials precisely with formal bank and NBFC underwriting parameters.',
      highlights: [
        'Multi-lender eligibility mapping',
        'Systematic file structuring',
        'Direct branch officer coordination'
      ]
    },
    {
      id: 'transparent-guidance',
      icon: Scale,
      badge: '100% Transparency',
      title: 'Honest & Transparent Guidance',
      subtitle: 'No surprises, zero hidden intermediary charges',
      description:
        'We believe in absolute honesty from day one. You receive clear visibility on interest brackets, bank processing fees, stamp duties, and eligibility criteria before any file is logged.',
      highlights: [
        'Upfront fee disclosure policy',
        'No hidden commission deductions',
        'Objective multi-option comparison'
      ]
    },
    {
      id: 'reliability-speed',
      icon: Clock,
      badge: 'High Reliability',
      title: 'Dependable Turnaround',
      subtitle: 'Proactive tracking to accelerate approvals',
      description:
        'We eliminate bureaucratic delays with active daily liaison. Real-time updates via phone and WhatsApp ensure you always know the exact progress of your application.',
      highlights: [
        'Dedicated point of contact',
        'Regular WhatsApp & phone updates',
        'Expedited query resolution'
      ]
    },
    {
      id: 'data-privacy',
      icon: Lock,
      badge: 'Data Confidentiality',
      title: 'Rigorous Document Security',
      subtitle: 'Strict protection for your personal & financial records',
      description:
        'Your Aadhaar, PAN, ITRs, bank statements, and property deeds are guarded with institutional confidentiality, used exclusively for lender submission and never disclosed to unauthorized parties.',
      highlights: [
        'Strict document custody protocol',
        'Zero commercial data sharing',
        'Compliance with financial privacy norms'
      ]
    }
  ];

  const trustBadges = [
    {
      icon: Building2,
      label: 'Local Gwalior Office',
      detail: 'Tighra Road, Gol Pahadiya'
    },
    {
      icon: BadgeCheck,
      label: 'Authorized Liaison',
      detail: 'Registered Micro Service'
    },
    {
      icon: FileCheck2,
      label: '100% Paperwork Audit',
      detail: 'Zero Document Rejection Goal'
    },
    {
      icon: CheckCircle2,
      label: 'Client-First Ethos',
      detail: 'Direct Banker Coordination'
    }
  ];

  return (
    <section id="trust" className="py-16 sm:py-24 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold tracking-widest text-amber-800 uppercase mb-2">
            Institutional Integrity & Client Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Trust, Security & Professional Guidance You Can Rely On
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Borrowing requires absolute confidence. At Arvon Micro Service, we uphold the highest standards of financial conduct, complete transparency in advice, and strict security for all customer records.
          </p>
        </div>

        {/* 4 Trust Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {trustPillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className="bg-stone-50/80 rounded-2xl border border-stone-200/90 p-8 flex flex-col justify-between hover:bg-white hover:border-amber-700/40 hover:shadow-sm transition-all duration-200 group"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-900 group-hover:bg-amber-900 group-hover:text-amber-100 flex items-center justify-center shrink-0 transition-colors duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 bg-amber-100/70 border border-amber-200/80 px-2.5 py-1 rounded-md">
                      {pillar.badge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-medium text-amber-800 mt-1 mb-3">
                    {pillar.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-stone-200/80 space-y-2">
                  {pillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification & Trust Badges Ribbon */}
        <div className="mt-12 rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <BadgeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {badge.label}
                    </div>
                    <div className="text-[11px] text-stone-300 mt-0.5 font-medium">
                      {badge.detail}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {onOpenEnquiry && (
            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-300 text-center sm:text-left">
                Have questions about documentation criteria or security of your documents?
              </div>
              <button
                onClick={onOpenEnquiry}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
              >
                Request Confidential Consultation
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
