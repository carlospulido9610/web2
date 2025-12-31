import React from 'react';
import { ArrowRight, PencilRuler } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[95vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-wood-900 text-wood-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2560&auto=format&fit=crop" 
          alt="Modern Media Wall" 
          className="w-full h-full object-cover opacity-40 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wood-900 via-wood-900/40 to-transparent"></div>
      </div>

      <div className="z-10 text-center max-w-5xl px-6 relative mt-16 animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-wood-50/10 bg-wood-50/5 text-xs font-medium tracking-wide text-wood-200 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-wood-400"></span>
            Raval
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif italic font-normal mb-8 leading-[1.05] text-wood-50">
          Room Transformation Company <br className="hidden md:block" />
          <span className="text-wood-400 text-4xl md:text-6xl lg:text-7xl not-italic font-light block mt-2">
            Built around custom built-ins & media walls.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-wood-300 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          We help you decide what truly works for your home, your personal taste, and how you plan to use the property over time.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#models" className="group min-w-[240px] px-8 py-4 rounded-full text-sm font-medium bg-wood-50 text-wood-900 hover:bg-wood-200 transition-all flex items-center justify-center gap-2">
            Start with a Single Piece
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#contact" className="group min-w-[240px] px-8 py-4 rounded-full text-sm font-medium border border-wood-50/20 text-wood-50 hover:bg-wood-50/10 transition-colors backdrop-blur-sm flex items-center justify-center gap-2">
            Work with a Designer
            <PencilRuler size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </header>
  );
};