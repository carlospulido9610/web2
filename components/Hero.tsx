
import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-wood-900 text-wood-50">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop" 
          alt="Luxury Media Wall with Built-ins" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col pt-12 pb-10 items-center justify-between">
        
        {/* TOP CONTENT: Textos - Eslogan aumentado para mejor sinergia */}
        <div className="flex flex-col items-center text-center animate-fade-in-up mt-10 md:mt-14">
            <h1 className="text-[34px] md:text-6xl lg:text-[76px] font-extrabold leading-[0.9] text-white tracking-tighter drop-shadow-sm mb-5 uppercase">
              Custom Media Walls <br className="hidden md:block" />
              <span className="text-white/95">& Built-In Rooms</span>
            </h1>
            <p className="text-[15px] md:text-xl font-semibold text-wood-50 tracking-tight opacity-100 max-w-lg leading-snug">
              Designed to move beyond builder-grade
            </p>
        </div>

        {/* BOTTOM CONTENT: Botones compactos y de tamaño idéntico */}
        <div className="w-full max-w-[420px] flex flex-col items-center animate-fade-in-up mb-4">
            
            <div className="w-full flex flex-col gap-0 items-center">
                {/* Botón Principal (Negro) */}
                <a 
                  href="#models" 
                  className="w-full bg-[#141210] text-white px-8 py-4 md:py-5 border border-white/10 hover:bg-[#1f1d1b] transition-all group flex flex-col items-center justify-center rounded-sm text-center shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base md:text-lg font-black uppercase tracking-tight">Choose Your Design</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-bold text-wood-400 uppercase tracking-[0.1em] mt-0.5 whitespace-nowrap">
                    Adjust size, TV and layout. See pricing instantly
                  </span>
                </a>

                {/* Separador con texto "NOT SURE?" */}
                <div className="flex items-center justify-center py-1.5 w-full">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <span className="text-white/50 text-[8px] font-black uppercase tracking-[0.3em] px-4">Not sure?</span>
                    <div className="h-px bg-white/20 flex-1"></div>
                </div>

                {/* Botón Secundario (Beige) */}
                <a 
                  href="#contact" 
                  className="w-full bg-[#E8E4DB] text-[#141210] px-8 py-4 md:py-5 hover:bg-[#F2EEE4] transition-all group flex flex-col items-center justify-center rounded-sm text-center shadow-2xl"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base md:text-lg font-black uppercase tracking-tight">Get Design Guidance</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.1em] text-[#6B5D52] mt-0.5 whitespace-nowrap">
                    Book a showroom or in-home consultation
                  </span>
                </a>
            </div>
        </div>

        {/* Floating Arrow */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
            <ArrowDown size={18} />
        </div>
      </div>
    </header>
  );
};
