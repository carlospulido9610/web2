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
            Top: Darker to ensure the white header text pops against ceiling/lights.
            Middle: Semi-transparent to reveal the joinery detail.
            Bottom: Very dark to anchor the buttons.
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/95"></div>
      </div>

      {/* Main Content Wrapper - Full Height */}
      {/* Layout: Changed to justify-center to center everything vertically, removed excessive top padding dependency */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center pt-24 pb-8 md:pt-0">
        
        {/* TOP SECTION: Text Group 
            Changed: Removed flex-1 so it doesn't push buttons to the bottom edge. */}
        <div className="flex-none flex flex-col justify-center items-center text-center animate-fade-in-up max-w-4xl mx-auto w-full">
            
            {/* Main Heading - Period removed */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-medium mb-6 leading-[1.1] text-white drop-shadow-2xl">
            Built around custom <br />
            built-ins & media walls
            </h1>

            {/* Sub-Description Text - Margin reduced to bring buttons closer (mb-6) */}
            <p className="text-wood-100 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-6 drop-shadow-lg px-4 opacity-90">
                We help you decide what truly works for your home, your personal taste, and how you plan to use the property over time.
            </p>
        </div>

        {/* BOTTOM SECTION: Hero Actions - Centered with the text group */}
        <div className="w-full max-w-[380px] md:max-w-none md:w-auto shrink-0 flex flex-col md:flex-row gap-3 md:gap-6 animate-fade-in-up items-center">
            
            {/* Primary Action - Dark Wood Texture (wood-900) */}
            <a 
              href="#models" 
              className="w-full md:w-[340px] md:h-[104px] shrink-0 bg-wood-900 text-wood-50 px-6 py-3 rounded-sm shadow-2xl border border-white/10 hover:bg-wood-800 transition-all group text-center relative overflow-hidden flex flex-col justify-center"
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
            <div className="flex md:hidden items-center gap-4 w-full px-8 opacity-100 py-2">
                <div className="h-px bg-wood-200/50 flex-1 box-shadow-sm"></div>
                <span className="text-wood-50 text-lg font-serif italic tracking-wide drop-shadow-md">Not sure?</span>
                <div className="h-px bg-wood-200/50 flex-1 box-shadow-sm"></div>
            </div>

            {/* Secondary Action - Light Stone/Paper Texture (wood-200) */}
            <a 
              href="#contact" 
              className="w-full md:w-[340px] md:h-[104px] shrink-0 bg-wood-200 text-wood-900 px-6 py-3 rounded-sm shadow-xl hover:bg-wood-100 transition-all group text-center relative flex flex-col justify-center"
            >
               <div className="flex flex-col items-center gap-0.5 md:gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-xl md:text-2xl leading-none tracking-wide">Get Design Guidance</span>
                  <ArrowRight size={18} className="text-wood-600 group-hover:translate-x-1 transition-transform" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-wood-500 leading-tight">
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