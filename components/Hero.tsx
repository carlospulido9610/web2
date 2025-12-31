import React from 'react';
import { ArrowRight, PencilRuler } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-wood-900 text-wood-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2560&auto=format&fit=crop" 
          alt="Modern Concrete Living Room" 
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-wood-900/40 via-transparent to-wood-900/80"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      <div className="z-10 text-center max-w-6xl px-6 relative mt-16 flex flex-col items-center animate-fade-in-up">
        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-[1.1] text-wood-50 drop-shadow-lg max-w-5xl">
          Raval is a Room <br className="hidden md:block" />
          <span className="italic text-wood-100 font-light">Transformation Company</span>
        </h1>
        
        {/* Subtitle Highlight */}
        <h2 className="text-xl md:text-3xl font-serif text-wood-200 mb-8 font-light tracking-wide max-w-3xl">
          Built around custom built-ins & media walls.
        </h2>
        
        {/* Description */}
        <p className="text-base md:text-lg text-wood-100 max-w-2xl mx-auto mb-12 font-medium leading-relaxed drop-shadow-md opacity-90">
          We help you decide what truly works for your home, your personal taste, and how you plan to use the property over time.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          <a href="#models" className="group w-full sm:w-auto min-w-[240px] px-8 py-4 bg-wood-50 text-wood-900 hover:bg-white text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-xl">
            Start with a Single Piece
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="group w-full sm:w-auto min-w-[240px] px-8 py-4 bg-wood-900/40 backdrop-blur-md border border-wood-50/30 text-wood-50 hover:bg-wood-900/60 text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-xl">
            Work with a Designer
            <PencilRuler size={16} className="opacity-80 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </header>
  );
};