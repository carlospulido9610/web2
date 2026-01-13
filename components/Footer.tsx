
import React from 'react';

interface FooterProps {
    onNavigateFAQ?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateFAQ }) => {
  return (
    <footer className="bg-wood-900 text-wood-500 py-12 border-t border-wood-800 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-wood-200 font-canale text-2xl tracking-wide uppercase">Raval.</span>
          <p className="mt-2 text-[10px] font-manrope font-black uppercase tracking-widest">Room Transformation Company</p>
        </div>
        <div className="flex gap-6 font-manrope text-[10px] font-black uppercase tracking-widest">
          {onNavigateFAQ && (
              <button onClick={onNavigateFAQ} className="hover:text-wood-200 transition-colors uppercase">
                FAQ
              </button>
          )}
          <a href="#" className="hover:text-wood-200 transition-colors">Privacy</a>
          <a href="#" className="hover:text-wood-200 transition-colors">Terms</a>
          <a href="#" className="hover:text-wood-200 transition-colors">Instagram</a>
        </div>
        <div className="text-[10px] font-manrope font-bold uppercase tracking-widest">
          © 2024 Raval. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
