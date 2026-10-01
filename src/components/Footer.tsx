import React from 'react';
import { Phone, Mail, MapPin, ArrowUp, MessageSquare } from 'lucide-react';

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
                <a href="#trust" className="hover:text-white transition-colors">
                  Trust & Security
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

          {/* Contact summary */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Reach Our Desk
            </div>
            <div className="space-y-2.5 text-xs text-stone-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Tighra Road, Gol Pahadiya, Gwalior, Madhya Pradesh – 474001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-stone-300 font-medium">Calling: </span>
                  <a href="tel:9171667597" className="hover:text-white transition-colors font-mono">
                    9171667597
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="text-stone-300 font-medium">WhatsApp: </span>
                  <a 
                    href="https://wa.me/919575345906" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
                  >
                    9575345906
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:info.arvonfinance@gmail.com" className="hover:text-white transition-colors">
                  info.arvonfinance@gmail.com
                </a>
              </div>
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
