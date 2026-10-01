import React, { useState, useEffect } from 'react';
import { EnquiryData } from '../types';
import { GWALIOR_AREAS } from '../data/servicesData';
import { Send, CheckCircle2, MessageSquare, AlertCircle, RefreshCw, Copy, Check, ExternalLink } from 'lucide-react';

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
  // Exactly the 4 requested form fields:
  // 1. Full Name
  // 2. Mobile Number
  // 3. Area / Colony
  // 4. Message
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [areaColony, setAreaColony] = useState('');
  const [customArea, setCustomArea] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // If user navigated from a specific service card, set as initial message draft
  useEffect(() => {
    if (initialService) {
      setMessage((prev) => {
        if (!prev) {
          return `I am interested in ${initialService}${initialAmount ? ` (Estimated requirement: ${initialAmount})` : ''}.`;
        }
        return prev;
      });
    }
  }, [initialService, initialAmount]);

  const validatePhone = (phone: string) => {
    // 10-digit Indian mobile number format
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10 && /^[6-9]/.test(cleaned);
  };

  // Helper to determine destination URL (App on mobile, Web on desktop)
  const getWhatsAppTargetUrl = (messageText: string, forceWeb: boolean = false) => {
    const encoded = encodeURIComponent(messageText);
    const targetNumber = '919575345906';

    if (forceWeb) {
      return `https://web.whatsapp.com/send?phone=${targetNumber}&text=${encoded}`;
    }

    const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile) {
      // Directs to native WhatsApp application on mobile devices
      return `https://api.whatsapp.com/send?phone=${targetNumber}&text=${encoded}`;
    } else {
      // Opens WhatsApp Web directly on desktop devices
      return `https://web.whatsapp.com/send?phone=${targetNumber}&text=${encoded}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // 1. Validate that Full Name, Mobile Number, Area / Colony, and Message are entered.
    if (!fullName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!validatePhone(cleanPhone)) {
      setErrorMessage('Please enter a valid 10-digit Mobile Number (starting with 6, 7, 8, or 9).');
      return;
    }

    const finalArea = areaColony === 'Other Area in Gwalior' && customArea.trim()
      ? customArea.trim()
      : areaColony.trim();

    if (!finalArea) {
      setErrorMessage('Please select or specify your Area / Colony.');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please enter your Message or loan requirement.');
      return;
    }

    // 2. Create a clean professional WhatsApp message containing only the submitted information:
    // Arvon Micro Service
    //
    // Name: [Full Name]
    // Mobile: [Mobile Number]
    // Area / Colony: [Area / Colony]
    // Message: [Message]
    const formattedMessage = `Arvon Micro Service\n\nName: ${fullName.trim()}\nMobile: ${cleanPhone}\nArea / Colony: ${finalArea}\nMessage: ${message.trim()}`;

    setGeneratedMessage(formattedMessage);

    // Save locally for browser persistence without any paid/cloud dependencies
    try {
      const newEnquiry: EnquiryData = {
        id: 'ENQ-' + Date.now(),
        fullName: fullName.trim(),
        mobileNumber: cleanPhone,
        areaColony: finalArea,
        serviceType: 'General Enquiry',
        loanAmount: initialAmount,
        message: message.trim(),
        createdAt: new Date().toISOString()
      };
      const existing = localStorage.getItem('arvon_enquiries');
      const parsed: EnquiryData[] = existing ? JSON.parse(existing) : [];
      parsed.unshift(newEnquiry);
      localStorage.setItem('arvon_enquiries', JSON.stringify(parsed));
    } catch {
      // LocalStorage fallback
    }

    // 3. Open WhatsApp using pre-filled message with business number 919575345906
    const whatsappUrl = getWhatsAppTargetUrl(formattedMessage);

    try {
      const opened = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (!opened || opened.closed || typeof opened.closed === 'undefined') {
        const a = document.createElement('a');
        a.href = whatsappUrl;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch {
      // Fallback
    }

    // 9. Show confirmation view: "Your enquiry is ready to send on WhatsApp."
    setIsSubmitted(true);
  };

  const handleCopyMessage = () => {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setAreaColony('');
    setCustomArea('');
    setMessage('');
    setErrorMessage('');
    setGeneratedMessage('');
    setIsCopied(false);
    if (onClearInitialService) {
      onClearInitialService();
    }
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
                  Have a Requirement?
                </h2>
                <p className="mt-2 text-sm text-slate-600">
                  Send us your enquiry and our team will get in touch with you.
                </p>
              </div>

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Full Name & 2. Mobile Number */}
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

                {/* 3. Area / Colony */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Area / Colony <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={areaColony}
                    onChange={(e) => setAreaColony(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 bg-white outline-none transition-all cursor-pointer"
                  >
                    <option value="">-- Select Area / Colony in Gwalior --</option>
                    {GWALIOR_AREAS.map((ar) => (
                      <option key={ar} value={ar}>{ar}</option>
                    ))}
                  </select>
                </div>

                {/* Custom Area if selected 'Other Area' */}
                {areaColony === 'Other Area in Gwalior' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Specify Area / Colony Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your locality / street in Gwalior"
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                    />
                  </div>
                )}

                {/* 4. Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your loan requirement, documentation status, or queries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all resize-y"
                  ></textarea>
                </div>

                {/* Submit Enquiry Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-4 px-6 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-[0.99] rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-amber-400" />
                    <span>Submit Enquiry</span>
                  </button>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-2">
                  📱 Pre-fills message to WhatsApp. You can review and press Send directly in WhatsApp.
                </div>
              </form>
            </div>
          ) : (
            /* Confirmation View: "Your enquiry is ready to send on WhatsApp." */
            <div className="text-center py-6 sm:py-8 space-y-6">
              
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              {/* Exact confirmation title */}
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Your enquiry is ready to send on WhatsApp.
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  WhatsApp has opened with your pre-filled details. Please review your message in WhatsApp and press <strong>Send</strong> to deliver it directly to our desk.
                </p>
              </div>

              {/* Pre-filled Message Preview Card */}
              {generatedMessage && (
                <div className="max-w-lg mx-auto bg-stone-50 border border-stone-200 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Pre-filled WhatsApp Message
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyMessage}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-amber-800 hover:text-amber-900 cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed bg-white p-3.5 rounded-xl border border-stone-200">
                    {generatedMessage}
                  </pre>
                </div>
              )}

              {/* Action Buttons to Re-open or Send */}
              <div className="pt-2 max-w-md mx-auto space-y-3">
                <a
                  href={getWhatsAppTargetUrl(generatedMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-600 rounded-xl transition-all shadow-sm hover:shadow"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Open WhatsApp & Send</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1 opacity-80" />
                </a>

                {/* Desktop WhatsApp Web Alternative */}
                <a
                  href={getWhatsAppTargetUrl(generatedMessage, true)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-xl transition-colors"
                >
                  <span>Open in WhatsApp Web</span>
                </a>
              </div>

              {/* Reset to submit another enquiry */}
              <div className="pt-3 border-t border-stone-200 max-w-xs mx-auto">
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
