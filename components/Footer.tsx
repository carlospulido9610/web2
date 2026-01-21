
import React from 'react';
import { Lock } from 'lucide-react';

interface FooterProps {
  onNavigateFAQ?: () => void;
  onNavigateAdmin?: () => void;
  onNavigatePrivacy?: () => void;
  onNavigateTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateFAQ, onNavigateAdmin, onNavigatePrivacy, onNavigateTerms }) => {
  return (
    <footer className="bg-wood-900 text-wood-500 py-12 border-t border-wood-800 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-wood-200 font-canale text-2xl tracking-wide uppercase">Raval.</span>
          <p className="mt-2 text-[10px] font-manrope font-black uppercase tracking-widest">Room Transformation Company</p>
        </div>
        <div className="flex gap-6 font-manrope text-[10px] font-black uppercase tracking-widest items-center">
          {onNavigateFAQ && (
            <button onClick={onNavigateFAQ} className="hover:text-wood-200 transition-colors uppercase">
              FAQ
            </button>
          )}
          {onNavigatePrivacy && (
            <button onClick={onNavigatePrivacy} className="hover:text-wood-200 transition-colors uppercase">
              Privacy
            </button>
          )}
          {onNavigateTerms && (
            <button onClick={onNavigateTerms} className="hover:text-wood-200 transition-colors uppercase">
              Terms
            </button>
          )}
          {onNavigateAdmin && (
            <button
              onClick={onNavigateAdmin}
              className="flex items-center gap-1.5 hover:text-wood-100 transition-colors opacity-30 hover:opacity-100 border border-wood-800 px-2 py-1 rounded"
              title="Admin Panel (Alt+A)"
            >
              <Lock size={10} />
              <span>Admin</span>
            </button>
          )}
        </div>
        <div className="text-[10px] font-manrope font-bold uppercase tracking-widest">
          © 2024 Raval. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
