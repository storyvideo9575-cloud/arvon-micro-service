import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const ComplianceDisclaimer: React.FC = () => {
  return (
    <section className="py-10 bg-stone-100 border-b border-stone-200 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-white border border-stone-200/90 space-y-3">
          
          <div className="flex items-center gap-2 text-slate-900 font-bold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <span>Important Advisory & Regulatory Transparency Notice</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-600">
            <div>
              <p>
                <strong>Role of Arvon Micro Service:</strong> Founded in 2023 in Gwalior (Madhya Pradesh), Arvon Micro Service operates as an independent loan assistance, documentation guidance, and application facilitation service. We do not directly issue loan currency from our own balance sheet unless registered as an institutional lender.
              </p>
            </div>
            <div>
              <p>
                <strong>Underwriting & Sanction:</strong> All credit evaluations, approvals, final interest rates, processing charges, and loan disbursements are determined strictly at the sole discretion of participating RBI-regulated commercial banks, financial institutions, and NBFCs based on the applicant’s verifiable income, documentation, and credit score.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100 flex items-start gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-amber-800 shrink-0 mt-0.5" />
            <span>
              <strong>Ethical Notice:</strong> Arvon Micro Service strictly refrains from making unverified claims of &ldquo;100% guaranteed approvals&rdquo; or soliciting unlawful advance commissions. We provide authentic, professional file preparation and support.
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
