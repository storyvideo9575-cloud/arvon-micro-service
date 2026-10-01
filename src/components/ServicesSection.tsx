import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { Check, ArrowRight, FileText, UserCheck, FileSpreadsheet, Shield } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServicesSectionProps {
  onSelectServiceForEnquiry: (serviceName: any) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForEnquiry }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('loan-services');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const handleImageError = (id: string) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'loan-services':
        return <UserCheck className="w-5 h-5 text-amber-700" />;
      case 'documentation-guidance':
        return <FileSpreadsheet className="w-5 h-5 text-amber-700" />;
      case 'application-process-support':
        return <Shield className="w-5 h-5 text-amber-700" />;
      default:
        return <FileText className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-bold tracking-widest text-amber-800 uppercase mb-2">
            01. Professional Capabilities
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
            Our Core Financial Assistance Services
          </h2>
          <p className="mt-3 text-base text-slate-600">
            We provide structured, dependable guidance at every step of your loan journey. Review our assistance verticals below.
          </p>
        </div>

        {/* 3 Interactive Service Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-stone-200/70 rounded-xl mb-8">
          {SERVICES_DATA.map((service) => {
            const isActive = service.id === selectedServiceId;
            return (
              <button
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                className={`flex items-center gap-2.5 px-4 py-3 text-left rounded-lg transition-all text-xs sm:text-sm font-semibold cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/40'
                }`}
              >
                <span className="shrink-0">{getServiceIcon(service.id)}</span>
                <span className="truncate">{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card for Selected Service */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Left Content Area */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {activeService.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Key Benefits */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                  How We Assist You
                </h4>
                <div className="space-y-2.5">
                  {activeService.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[2.5]" />
                      </div>
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action for this service */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onSelectServiceForEnquiry(activeService.title)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Enquire For {activeService.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                </button>
                <span className="text-xs text-slate-500">
                  Direct one-on-one document review in Gwalior
                </span>
              </div>
            </div>

            {/* Right Media / Proof Column */}
            <div className="lg:col-span-5 bg-stone-100 border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col">
              {activeService.imagePath && !imgErrors[activeService.id] ? (
                <div className="relative h-64 lg:h-full min-h-[300px]">
                  <img
                    src={activeService.imagePath}
                    alt={activeService.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(activeService.id)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <p className="text-lg sm:text-xl font-bold tracking-tight text-white drop-shadow-sm">
                      Arvon Micro Service
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-[280px] p-8 flex flex-col justify-between bg-gradient-to-br from-stone-900 to-slate-950 text-white">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-600/30 text-amber-400 flex items-center justify-center mb-4">
                      {getServiceIcon(activeService.id)}
                    </div>
                    <h4 className="text-lg font-bold">{activeService.title}</h4>
                    <p className="text-xs text-stone-300 mt-2 leading-relaxed">
                      Structured local assistance ensuring all guidelines and regulatory checklists are fully prepared before submission.
                    </p>
                  </div>
                  <div className="pt-6 border-t border-stone-800 text-xs text-stone-400">
                    Founded in 2023 · Gwalior, Madhya Pradesh
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* 3 Cards Grid View for quick reference */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv, index) => (
            <div 
              key={srv.id}
              onClick={() => setSelectedServiceId(srv.id)}
              className={`p-6 rounded-xl border transition-all cursor-pointer ${
                srv.id === selectedServiceId
                  ? 'border-amber-600 bg-amber-50/30 shadow-xs'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="text-xs text-amber-800 font-bold mb-2">0{index + 1}.</div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{srv.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{srv.shortDesc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
