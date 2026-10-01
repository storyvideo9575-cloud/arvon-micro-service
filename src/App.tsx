/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { MissionVisionSection } from './components/MissionVisionSection';
import { TrustSecuritySection } from './components/TrustSecuritySection';
import { ProcessGuide } from './components/ProcessGuide';
import { LeadForm } from './components/LeadForm';
import { ComplianceDisclaimer } from './components/ComplianceDisclaimer';
import { Footer } from './components/Footer';
import { InquiryViewerModal } from './components/InquiryViewerModal';
import { Phone, MessageSquare, Inbox } from 'lucide-react';

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

        {/* 4. Trust & Security Section */}
        <TrustSecuritySection onOpenEnquiry={scrollToEnquiry} />

        {/* 5. 4-Stage Process Pathway */}
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

      {/* Floating Quick Action Bar for Mobile (<15% screen height) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
        <a
          href="tel:9171667597"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-slate-900 rounded-lg text-xs font-bold transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-amber-800" />
          <span>Call: 9171667597</span>
        </a>
        <a
          href="https://wa.me/919575345906"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>WhatsApp: 9575345906</span>
        </a>
      </div>

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
