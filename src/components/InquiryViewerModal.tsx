import React, { useState, useEffect } from 'react';
import { EnquiryData } from '../types';
import { X, Trash2, Download, Phone, MapPin, Calendar } from 'lucide-react';

interface InquiryViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InquiryViewerModal: React.FC<InquiryViewerModalProps> = ({ isOpen, onClose }) => {
  const [inquiries, setInquiries] = useState<EnquiryData[]>([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('arvon_enquiries');
        if (stored) {
          setInquiries(JSON.parse(stored));
        } else {
          setInquiries([]);
        }
      } catch {
        setInquiries([]);
      }
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all recorded enquiries on this browser?')) {
      localStorage.removeItem('arvon_enquiries');
      setInquiries([]);
    }
  };

  const handleExportCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Date', 'Full Name', 'Mobile Number', 'Area/Colony', 'Service', 'Message'];
    const rows = inquiries.map(q => [
      q.id,
      new Date(q.createdAt).toLocaleString(),
      `"${q.fullName.replace(/"/g, '""')}"`,
      q.mobileNumber,
      `"${q.areaColony.replace(/"/g, '""')}"`,
      `"${q.serviceType}"`,
      `"${(q.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `arvon_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-200">
        
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-base">Recorded Client Inquiries</h3>
            <p className="text-xs text-slate-500">
              {inquiries.length} {inquiries.length === 1 ? 'enquiry' : 'enquiries'} recorded in local session
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto flex-1 space-y-3">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              No inquiries submitted yet. Submit an enquiry through the form to see it listed here.
            </div>
          ) : (
            inquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-4 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{enq.fullName}</span>
                  <span className="text-[11px] font-semibold text-amber-900 bg-amber-100 px-2 py-0.5 rounded">
                    {enq.serviceType}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <a href={`tel:${enq.mobileNumber}`} className="font-mono hover:text-amber-800">
                      +91 {enq.mobileNumber}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{enq.areaColony}</span>
                  </div>
                </div>

                {enq.message && (
                  <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-stone-200 text-xs">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{new Date(enq.createdAt).toLocaleString()}</span>
                  </div>
                  <span className="font-mono">{enq.id}</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-stone-200 flex items-center justify-between bg-stone-50 rounded-b-2xl">
          <div className="flex items-center gap-2">
            {inquiries.length > 0 && (
              <>
                <button
                  onClick={handleExportCSV}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-stone-300 rounded-lg hover:bg-stone-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={handleClear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-white border border-rose-200 rounded-lg hover:bg-rose-50"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear List</span>
                </button>
              </>
            )}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 rounded-lg hover:bg-slate-800"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
