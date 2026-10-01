/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MissionVisionSection } from './components/MissionVisionSection';
import { ProcessGuide } from './components/ProcessGuide';
import { LeadForm } from './components/LeadForm';
import { ComplianceDisclaimer } from './components/ComplianceDisclaimer';
import { Footer } from './components/Footer';
import { InquiryViewerModal } from './components/InquiryViewerModal';
import { Inbox } from 'lucide-react';

export default function App() {
  const [selectedService, setSelectedService] = useState<string>('Loan Services');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  const scrollToEnquiry = () => {
    const el = document.getElementById('enquiry-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForEnquiry = (serviceName: string) => {
    setSelectedService(serviceName);
    scrollToEnquiry();
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-slate-800">
      
      {/* Top Bar Navigation */}
      <Header onOpenEnquiry={scrollToEnquiry} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenEnquiry={scrollToEnquiry} />

        {/* 2. Core Services Section */}
        <ServicesSection onSelectServiceForEnquiry={handleSelectServiceForEnquiry} />

        {/* 3. Mission & Vision */}
        <MissionVisionSection />

        {/* 4. 4-Stage Process Pathway */}
        <ProcessGuide onStartEnquiry={scrollToEnquiry} />

        {/* 6. Lead Capture Form */}
        <LeadForm
          initialService={selectedService}
          onClearInitialService={() => {}}
        />

        {/* 7. Compliance & Regulatory Disclosures */}
        <ComplianceDisclaimer />
      </main>

      {/* Footer */}
      <Footer onOpenEnquiry={scrollToEnquiry} />

      {/* Discreet Tester / Admin Lead Inquiries Button in bottom-left */}
      <div className="fixed bottom-4 left-4 z-40 hidden md:block">
        <button
          onClick={() => setIsInquiryModalOpen(true)}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-stone-300 hover:text-white text-xs font-medium rounded-full shadow-md border border-stone-700 transition-all hover:bg-slate-800 cursor-pointer"
          title="View submitted client enquiries in this browser"
        >
          <Inbox className="w-3.5 h-3.5 text-amber-400" />
          <span>Inquiries Inbox</span>
        </button>
      </div>

      {/* Inquiries modal */}
      <InquiryViewerModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />

    </div>
  );
}
