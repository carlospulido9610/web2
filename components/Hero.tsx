
import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-wood-900 text-wood-50">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop" alt="Luxury Media Wall" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/45"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col pt-12 pb-10 items-center justify-between">
        <div className="flex flex-col items-center text-center animate-fade-in-up mt-10 md:mt-14">
            {/* Tamaño reducido un 20%: de text-[42px] a [34px], de 7xl a 6xl, de [92px] a [74px] */}
            <h1 className="text-[34px] md:text-6xl lg:text-[74px] font-canale text-white leading-[1.1] mb-6 tracking-tight uppercase">
              Custom Media Walls <br className="hidden md:block" />
              <span className="font-canale text-white uppercase"> & built-in rooms</span>
            </h1>
            <p className="text-[15px] md:text-xl font-manrope font-medium text-wood-100 tracking-wide opacity-90 max-w-lg leading-snug">
              Designed to move beyond builder-grade
            </p>
        </div>

        <div className="w-full max-w-[500px] flex flex-col items-center animate-fade-in-up mb-4">
            <div className="w-full flex flex-col gap-0 items-center">
                <a href="#models" className="w-full bg-[#141210] text-white px-6 py-4 md:py-5 border border-white/10 hover:bg-[#1f1d1b] transition-all group flex flex-col items-center justify-center rounded-sm text-center">
                  <div className="flex items-center gap-3">
                    <span className="text-base md:text-lg font-manrope font-black uppercase tracking-widest">Choose Your Design</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[9px] font-manrope font-bold text-wood-400 uppercase tracking-widest mt-1 whitespace-nowrap">Adjust size, TV and layout. See pricing instantly</span>
                </a>

                <div className="flex items-center justify-center py-2 w-full">
                    <div className="h-px bg-white/20 flex-1"></div>
                    <span className="text-white/50 text-[9px] font-manrope font-black uppercase tracking-[0.25em] px-4">Not sure?</span>
                    <div className="h-px bg-white/20 flex-1"></div>
                </div>

                <a href="#contact" className="w-full bg-[#E8E4DB] text-[#141210] px-6 py-4 md:py-5 hover:bg-[#F2EEE4] transition-all group flex flex-col items-center justify-center rounded-sm text-center">
                  <div className="flex items-center gap-3">
                    <span className="text-base md:text-lg font-manrope font-black uppercase tracking-widest">Get Design Guidance</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[9px] font-manrope font-bold uppercase tracking-widest text-[#6B5D52] mt-1 whitespace-nowrap">Book a showroom or in-home consultation</span>
                </a>
            </div>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce text-white/30 hidden md:block">
            <ArrowDown size={18} />
        </div>
      </div>
    </header>
  );
};
