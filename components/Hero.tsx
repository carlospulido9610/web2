import React from 'react';
import { ArrowRight, PencilRuler } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[100vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-wood-50 text-wood-900">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2560&auto=format&fit=crop" 
          alt="Modern Concrete Living Room" 
          className="w-full h-full object-cover opacity-70"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-wood-50/80 via-wood-50/60 to-wood-50"></div>
        {/* Light texture blend for grain */}
        <div className="absolute inset-0 bg-wood-50/20 mix-blend-overlay"></div>
      </div>

      <div className="z-10 text-center max-w-6xl px-6 relative mt-16 flex flex-col items-center animate-fade-in-up">
        {/* Main Title - Dark Text */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-[1.1] text-wood-900 drop-shadow-sm max-w-5xl">
          Raval is a Room <br className="hidden md:block" />
          <span className="italic text-wood-600 font-light">Transformation Company</span>
        </h1>
        
        {/* Subtitle - Darker Text (Changed from wood-600 to wood-800) */}
        <h2 className="text-xl md:text-3xl font-serif text-wood-800 mb-8 font-light tracking-wide max-w-3xl">
          Built around custom built-ins & media walls.
        </h2>
        
        {/* Description - Darkest Text (Changed from wood-800 to wood-900 and removed opacity) */}
        <p className="text-base md:text-lg text-wood-900 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          We help you decide what truly works for your home, your personal taste, and how you plan to use the property over time.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
          
          {/* Primary CTA - Dark Background */}
          <a href="#models" className="group w-full sm:w-auto min-w-[240px] px-8 py-4 bg-wood-900 text-wood-50 hover:bg-wood-800 text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-xl">
            Start with a Single Piece
            <ArrowRight size={16} className="text-wood-300 group-hover:translate-x-1 transition-transform" />
          </a>
          
          {/* Secondary CTA - Light/Glass */}
          <a href="#contact" className="group w-full sm:w-auto min-w-[240px] px-8 py-4 bg-white/80 backdrop-blur-md border border-wood-200 text-wood-900 hover:bg-white text-sm font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-3 shadow-lg">
            Work with a Designer
            <PencilRuler size={16} className="text-wood-500 group-hover:text-wood-900 transition-colors" />
          </a>
        </div>
      </div>
    </header>
  );
};