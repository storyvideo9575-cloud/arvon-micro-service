
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { GWALIOR_AREAS } from '../data/servicesData';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  LoaderCircle
} from 'lucide-react';

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
  const [message, setMessage] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (initialService) {
      setMessage((previous) => {
        if (previous) return previous;

        return `I am interested in ${initialService}${
          initialAmount
            ? ` (Estimated requirement: ${initialAmount})`
            : ''
        }.`;
      });
    }
  }, [initialService, initialAmount]);

  const validatePhone = (phone: string) => {
    return phone.length === 10 && /^[6-9]/.test(phone);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const cleanPhone = mobileNumber.replace(/\D/g, '');

    if (!validatePhone(cleanPhone)) {
      setErrorMessage(
        'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.'
      );
      return;
    }

    const finalArea =
      areaColony === 'Other Area in Gwalior'
        ? customArea.trim()
        : areaColony.trim();

    if (!finalArea) {
      setErrorMessage('Please select or specify your area / colony.');
      return;
    }

    if (!message.trim()) {
      setErrorMessage('Please enter your message or loan requirement.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('enquiries')
        .insert({
          full_name: fullName.trim(),
          mobile_number: cleanPhone,
          area_colony: finalArea,
          service_type: initialService || 'General Enquiry',
          loan_amount: initialAmount || null,
          message: message.trim()
        });

      if (error) {
        console.error('Supabase enquiry save error:', error);
        setErrorMessage(
          'Your enquiry could not be submitted. Please try again.'
        );
        return;
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Unexpected enquiry submission error:', error);
      setErrorMessage(
        'Something went wrong. Please check your internet connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setMobileNumber('');
    setAreaColony('');
    setCustomArea('');
    setMessage('');
    setErrorMessage('');

    onClearInitialService?.();
  };

  return (
    <section
      id="enquiry-form"
      className="py-16 sm:py-24 bg-stone-100 border-b border-stone-200"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-stone-200/90 shadow-sm p-8 sm:p-12">
          {!isSubmitted ? (
            <div>
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
                <div
                  role="alert"
                  className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3"
                >
                  <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>

                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      required
                      placeholder="e.g. Rajesh Sharma"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobileNumber"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-xs font-bold text-slate-500">
                        +91
                      </div>

                      <input
                        id="mobileNumber"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(
                            e.target.value.replace(/\D/g, '').slice(0, 10)
                          )
                        }
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm font-mono tabular-nums text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="areaColony"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Area / Colony <span className="text-rose-500">*</span>
                  </label>

                  <select
                    id="areaColony"
                    required
                    value={areaColony}
                    onChange={(e) => setAreaColony(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 bg-white outline-none transition-all cursor-pointer"
                  >
                    <option value="">
                      -- Select Area / Colony in Gwalior --
                    </option>

                    {GWALIOR_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>

                {areaColony === 'Other Area in Gwalior' && (
                  <div>
                    <label
                      htmlFor="customArea"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      Specify Area / Colony Name{' '}
                      <span className="text-rose-500">*</span>
                    </label>

                    <input
                      id="customArea"
                      type="text"
                      required
                      placeholder="Enter your locality / street in Gwalior"
                      value={customArea}
                      onChange={(e) => setCustomArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all"
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    Message <span className="text-rose-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Describe your loan requirement, documentation status, or queries..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-800/10 text-sm text-slate-900 placeholder:text-stone-400 outline-none transition-all resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-amber-400" />
                      <span>Submit Enquiry</span>
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-500 pt-2">
                  Your information will be submitted securely for our team to review.
                </p>
              </form>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Your enquiry has been submitted successfully!
                </h3>

                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Thank you for contacting Arvon Micro Service. Our team will
                  get in touch with you soon.
                </p>
              </div>

              <div className="pt-3 border-t border-stone-200 max-w-xs mx-auto">
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 underline underline-offset-4"
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
