import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-wood-900 text-wood-500 py-12 border-t border-wood-800 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <span className="text-wood-200 font-serif italic text-lg tracking-wide">Raval.</span>
          <p className="mt-2 text-xs">Room Transformation Company</p>
        </div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-wood-200 transition-colors">Privacy</a>
          <a href="#" className="hover:text-wood-200 transition-colors">Terms</a>
          <a href="#" className="hover:text-wood-200 transition-colors">Instagram</a>
        </div>
        <div className="text-xs">
          © 2024 Raval. All rights reserved.
        </div>
      </div>
    </footer>
  );
};