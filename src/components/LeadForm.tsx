import React, { useState, useEffect } from 'react';
import { EnquiryData } from '../types';
import { GWALIOR_AREAS } from '../data/servicesData';
import { Send, CheckCircle2, Phone, MessageSquare, AlertCircle, RefreshCw } from 'lucide-react';

interface LeadFormProps {
  initialService?: string;
  initialAmount?: string;
  onClearInitialService?: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({
  initialService,
  initialAmount,
  onClearInitialService
}) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [areaColony, setAreaColony] = useState('');
  const [customArea, setCustomArea] = useState('');
  const [serviceType, setServiceType] = useState<EnquiryData['serviceType']>('Loan Services');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSubmittedData, setLastSubmittedData] = useState<EnquiryData | null>(null);

  // Sync props if changed
  useEffect(() => {
    if (initialService) {
      if (
        initialService === 'Loan Services' ||
        initialService === 'Loan Documentation Guidance' ||
        initialService === 'Application Process Support'
      ) {
        setServiceType(initialService as EnquiryData['serviceType']);
      }
    }
  }, [initialService]);

  useEffect(() => {
    if (initialAmount) {
      setMessage((prev) => 
        prev ? `${prev} (Estimated requirement: ${initialAmount})` : `Estimated requirement: ${initialAmount}`
      );
    }
  }, [initialAmount]);

  const validatePhone = (phone: string) => {
    // 10-digit Indian mobile number format
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!validatePhone(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
      return;
    }

    const finalArea = areaColony === 'Other Area in Gwalior' && customArea.trim() 
      ? customArea.trim() 
      : (areaColony.trim() || 'Gwalior');

    if (!finalArea) {
      setErrorMessage('Please select or specify your Area / Colony in Gwalior.');
      return;
    }

    setIsSubmitting(true);

    const newEnquiry: EnquiryData = {
      id: 'ENQ-' + Date.now(),
      fullName: fullName.trim(),
      mobileNumber: cleanPhone,
      areaColony: finalArea,
      serviceType,
      loanAmount: initialAmount,
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    // Save locally
    try {
      const existing = localStorage.getItem('arvon_enquiries');
      const parsed: EnquiryData[] = existing ? JSON.parse(existing) : [];
      parsed.unshift(newEnquiry);
      localStorage.setItem('arvon_enquiries', JSON.stringify(parsed));
    } catch {
      // LocalStorage fallback
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setLastSubmittedData(newEnquiry);
    }, 400);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setAreaColony('');
    setCustomArea('');
    setMessage('');
    setErrorMessage('');
    setLastSubmittedData(null);
    if (onClearInitialService) {
      onClearInitialService();
    }
  };

  // WhatsApp quick link for the customer
  const getWhatsAppLink = (enquiry: EnquiryData) => {
    const text = encodeURIComponent(
      `Hello Arvon Micro Service Team, I have submitted an enquiry on your website.\n\n*Name:* ${enquiry.fullName}\n*Phone:* ${enquiry.mobileNumber}\n*Area:* ${enquiry.areaColony}\n*Service:* ${enquiry.serviceType}\n${enquiry.message ? `*Message:* ${enquiry.message}\n` : ''}Please connect with me.`
    );
    return `https://wa.me/919575345906?text=${text}`;
  };

  return (
    <section id="enquiry-form" className="py-16 sm:py-24 bg-stone-100 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Form Container */}
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 sm:p-12">
          
          {!isSubmitted ? (
            <div>
              {/* Heading */}
              <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Direct Inquiries & Documentation Assistance
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Get in Touch With Us
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Fill in your details below and our team in Gwalior will review your requirement and assist you with clarity.
                </p>

                {/* Direct Calling & WhatsApp numbers */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
                  <a
                    href="tel:9171667597"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-stone-100 hover:bg-stone-200 text-slate-800 rounded-lg font-semibold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-800" />
                    <span>Calling: 9171667597</span>
                  </a>
                  <a
                    href="https://wa.me/919575345906"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    <span>WhatsApp: 9575345906</span>
                  </a>
                </div>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name & Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-500">
                        +91
                      </div>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm font-mono tabular-nums text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Type & Area / Colony */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Assistance Vertical
                    </label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value as EnquiryData['serviceType'])}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 bg-white outline-none transition-all cursor-pointer"
                    >
                      <option value="Loan Services">Loan Services</option>
                      <option value="Loan Documentation Guidance">Loan Documentation Guidance</option>
                      <option value="Application Process Support">Application Process Support</option>
                      <option value="General Enquiry">General Enquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Area / Colony in Gwalior <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={areaColony}
                      onChange={(e) => setAreaColony(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 bg-white outline-none transition-all cursor-pointer"
                    >
                      <option value="">-- Select Area / Colony --</option>
                      {GWALIOR_AREAS.map((ar) => (
                        <option key={ar} value={ar}>{ar}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Custom Area if selected 'Other Area' */}
                {areaColony === 'Other Area in Gwalior' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Specify Area / Colony Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your locality / street in Gwalior"
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your loan requirement, existing documentation status, or questions..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all resize-y"
                  ></textarea>
                </div>

                {/* Submit Enquiry Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-amber-400" />
                        <span>Submit Enquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-2">
                  🔒 We respect your privacy. Your information is securely handled by our local Gwalior advisory desk.
                </div>
              </form>
            </div>
          ) : (
            /* After Submission View (Exact text per prompt) */
            <div className="text-center py-6 sm:py-8 space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              {/* Exact user requested post-submission message */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Enquiry Submitted
                </h3>
                <blockquote className="text-base sm:text-lg font-medium text-slate-700 max-w-lg mx-auto bg-stone-50 p-4 rounded-xl border border-stone-200">
                  &ldquo;Thank you for contacting Arvon Micro Service. Our team will get in touch with you shortly.&rdquo;
                </blockquote>
              </div>

              {/* Instant Connect Actions */}
              {lastSubmittedData && (
                <div className="pt-4 max-w-md mx-auto space-y-3">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Need an immediate response?
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                      href={getWhatsAppLink(lastSubmittedData)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-emerald-950 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-800" />
                      <span>WhatsApp: 9575345906</span>
                    </a>

                    <a
                      href="tel:9171667597"
                      className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-bold text-slate-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <Phone className="w-4 h-4 text-amber-800" />
                      <span>Call: 9171667597</span>
                    </a>
                  </div>
                </div>
              )}

              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Submit Another Enquiry</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
