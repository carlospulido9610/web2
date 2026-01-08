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

      {/* Main Content Wrapper - Full Height */}
      {/* Layout: flex-col. 
          Mobile: pt-24 pb-8 to space out content. 
          Desktop: justify-center to center content group vertically. */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center pt-24 pb-8 md:justify-center md:py-0 md:pt-0">
        
        {/* TOP SECTION: Text Group 
            Mobile: flex-1 takes all space, pushing buttons to bottom.
            Desktop: md:flex-none allows it to shrink to fit content so it stays with buttons in center. */}
        <div className="flex-1 md:flex-none flex flex-col justify-center items-center text-center animate-fade-in-up max-w-4xl mx-auto w-full">
            {/* Top Label - Company Definition */}
            <div className="mb-4 md:mb-6 backdrop-blur-md bg-white/10 px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-wood-50">
                Raval is a Room Transformation Company
            </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-4 md:mb-6 leading-[1.1] text-white drop-shadow-2xl">
            Built around custom <br />
            built-ins & media walls.
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-lg font-medium text-wood-100/90 leading-relaxed max-w-2xl mx-auto drop-shadow-md tracking-wide">
            We help you decide what truly works for your home, your personal taste, and how you plan to use the property over time.
            </p>
        </div>

        {/* BOTTOM SECTION: Hero Actions - Anchored at bottom with shrink-0 */}
        <div className="w-full max-w-[380px] md:max-w-none md:w-auto shrink-0 flex flex-col md:flex-row gap-3 md:gap-6 animate-fade-in-up md:mt-10 items-center">
            
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

            {/* Separator - Visible only on Mobile */}
            <div className="flex md:hidden items-center gap-4 w-full px-8 opacity-80 py-0">
                <div className="h-px bg-wood-200/30 flex-1 box-shadow-sm"></div>
                <span className="text-wood-100 text-xs font-serif italic drop-shadow-md">Not sure?</span>
                <div className="h-px bg-wood-200/30 flex-1 box-shadow-sm"></div>
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