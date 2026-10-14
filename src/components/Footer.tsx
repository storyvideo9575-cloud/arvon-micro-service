import React from 'react';
import { ArrowUp, ArrowRight } from 'lucide-react';

interface FooterProps {
  onOpenEnquiry: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenEnquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-stone-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Mission column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xl font-bold tracking-tight text-white block">
              Arvon Micro Service
            </span>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed max-w-sm">
              Professional loan assistance, documentation guidance, and application process support for individuals and businesses across Gwalior, Madhya Pradesh.
            </p>
            <div className="text-xs text-amber-400/90 font-medium">
              Founded in 2023 · Gwalior, Madhya Pradesh
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#mission" className="hover:text-white transition-colors">
                  Mission & Vision
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition-colors">
                  Application Process
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenEnquiry}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Send Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Contact summary: Professional requirement note without personal or contact details */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Have a Requirement?
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Send us your enquiry and our team will get in touch with you.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 border border-stone-800 rounded-lg transition-colors cursor-pointer"
              >
                <span>Send Enquiry</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © {new Date().getFullYear()} Arvon Micro Service. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-stone-400 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
