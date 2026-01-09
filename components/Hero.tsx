import React from 'react';
import { ArrowRight, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <header className="relative w-full h-[100dvh] min-h-[700px] overflow-hidden bg-wood-900 text-wood-50">
      {/* Background Image - Updated to a frontal, symmetrical luxury wood media wall */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop" 
          alt="Luxury Media Wall with Built-ins" 
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay: 
            Top: Darker (from-black/60) to ensure the white header text pops against ceiling/lights.
            Middle: Semi-transparent to reveal the joinery detail.
            Bottom: Very dark (to-black/95) to anchor the buttons.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95"></div>
      </div>

      {/* Main Content Wrapper - Full Height 
          Mobile: Increased pb from 72 to 80 to shift content further up.
      */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center pt-0 pb-80 md:pt-0 md:pb-0">
        
        {/* TOP SECTION: Text Group 
            Desktop: Shifted up via negative margin (-mt-32)
        */}
        <div className="flex-none flex flex-col justify-center items-center text-center animate-fade-in-up max-w-5xl mx-auto w-full md:-mt-32">
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium leading-[1.1] text-white drop-shadow-2xl">
            Custom Media Walls <br />
            & Built-In Rooms
            </h1>

            {/* Slogan REMOVED */}
        </div>

        {/* BOTTOM SECTION: Hero Actions 
            Mobile: Reduced gap to gap-1 to bring buttons closer.
            Desktop: Pushed down via margin (mt-48) relative to center.
        */}
        <div className="w-full max-w-[380px] md:max-w-none md:w-auto shrink-0 flex flex-col md:flex-row gap-1 md:gap-1 animate-fade-in-up mt-4 md:mt-48 items-center">
            
            {/* Primary Action - Dark Wood Texture */}
            <a 
              href="#models" 
              className="w-full md:w-[340px] md:h-[104px] shrink-0 bg-[#1F1B18] text-wood-50 px-6 py-3 rounded-sm shadow-2xl border border-white/10 hover:bg-[#2C2622] transition-all group text-center relative overflow-hidden flex flex-col justify-center"
            >
              <div className="relative z-10 flex flex-col items-center gap-0.5 md:gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl md:text-2xl leading-none tracking-wide">Choose Your Design</span>
                  <ArrowRight size={18} className="text-wood-300 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-medium text-wood-400 uppercase tracking-widest leading-tight">
                  Adjust size, TV and layout. See pricing instantly.
                </span>
              </div>
            </a>

            {/* Separator - Visible only on Mobile 
                Increased visibility of lines and opacity.
            */}
            <div className="flex md:hidden items-center gap-4 w-full px-8 opacity-90 py-1">
                <div className="h-px bg-white/40 flex-1 box-shadow-sm"></div>
                <span className="text-wood-100 text-xs font-serif italic drop-shadow-md">Not sure?</span>
                <div className="h-px bg-white/40 flex-1 box-shadow-sm"></div>
            </div>

            {/* Secondary Action - Light Stone/Paper Texture */}
            <a 
              href="#contact" 
              className="w-full md:w-[340px] md:h-[104px] shrink-0 bg-[#EBE7DF] text-[#2A2622] px-6 py-3 rounded-sm shadow-xl hover:bg-[#F5F2EB] transition-all group text-center relative flex flex-col justify-center"
            >
               <div className="flex flex-col items-center gap-0.5 md:gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl md:text-2xl leading-none tracking-wide">Get Design Guidance</span>
                  <ArrowRight size={18} className="text-[#5C554F] group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B5D52] leading-tight">
                  Book a showroom or in-home consultation.
                </span>
              </div>
            </a>

        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile, visible on desktop */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-wood-200 opacity-70 hidden md:block">
        <ArrowDown size={24} />
      </div>

    </header>
  );
};