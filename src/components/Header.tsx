import React, { useState } from 'react';
import { Phone, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

interface HeaderProps {
  onOpenEnquiry: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Mission', href: '#mission' },
    { label: 'Trust & Security', href: '#trust' },
    { label: 'Process', href: '#process' },
    { label: 'Enquiry', href: '#enquiry-form' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 hover:text-amber-800 transition-colors whitespace-nowrap"
          >
            Arvon Micro Service
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-slate-900 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Direct Calling & WhatsApp actions */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="tel:9171667597"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors whitespace-nowrap"
              title="Call 9171667597"
            >
              <Phone className="w-3.5 h-3.5 text-amber-700" />
              <span>Call: 9171667597</span>
            </a>
            <a
              href="https://wa.me/919575345906"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors whitespace-nowrap"
              title="WhatsApp 9575345906"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
              <span>WhatsApp: 9575345906</span>
            </a>
            <button
              onClick={onOpenEnquiry}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors whitespace-nowrap cursor-pointer ml-1"
            >
              <span>Enquire</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={onOpenEnquiry}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg"
            >
              Enquire
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-stone-100 rounded-md"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-stone-100 space-y-2">
            <div className="text-xs text-slate-500 font-medium px-3">Direct Contact Numbers:</div>
            <div className="grid grid-cols-1 gap-2">
              <a
                href="tel:9171667597"
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-slate-800 bg-stone-100 rounded-md"
              >
                <Phone className="w-3.5 h-3.5 text-amber-700" />
                <span>Calling: 9171667597</span>
              </a>
              <a
                href="https://wa.me/919575345906"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                <span>WhatsApp: 9575345906</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
