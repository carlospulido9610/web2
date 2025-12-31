import React, { useState, useRef } from 'react';
import { ArrowRight, SlidersHorizontal, ArrowUpRight, Hand } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplace' | 'high-ceiling';

interface ModelItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const MODELS_DATA: Record<CategoryId, ModelItem[]> = {
  'media-wall': [
    {
      id: 'mw-1',
      name: 'The Floating Oak',
      price: 4500,
      description: 'Minimalist floating console with integrated LED lighting and acoustic slat backing.',
      image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'mw-2',
      name: 'Cinema Suite',
      price: 6200,
      description: 'Full wall integration with hidden storage, soundbar niche, and ambient backlighting.',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'mw-3',
      name: 'Library Wall',
      price: 5800,
      description: 'A perfect blend of open shelving for display and closed cabinetry for storage.',
      image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=1200'
    }
  ],
  'fireplace': [
    {
      id: 'fp-1',
      name: 'Modern Linear',
      price: 3800,
      description: 'Sleek panoramic electric fireplace insert with micro-cement finish surround.',
      image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'fp-2',
      name: 'Stone Statement',
      price: 5200,
      description: 'Floor-to-ceiling natural marble cladding with a traditional hearth design.',
      image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'fp-3',
      name: 'Nordic Corner',
      price: 4100,
      description: 'Asymmetrical corner design utilizing warm wood tones and plaster texture.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200'
    }
  ],
  'high-ceiling': [
    {
      id: 'hc-1',
      name: 'The Cathedral',
      price: 8500,
      description: 'Grand scale joinery designed specifically for double-height voids.',
      image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200'
    },
    {
      id: 'hc-2',
      name: 'Vertical Slat',
      price: 7900,
      description: 'Elongated vertical lines to accentuate height, featuring hidden storage.',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200'
    }
  ]
};

export const ServicesConfigurator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('media-wall');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Drag to scroll logic
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Handle Category Change
  const handleCategoryChange = (catId: CategoryId) => {
    if (activeCategory === catId) return;
    
    setIsAnimating(true);
    
    // Slight delay to allow fade out, then switch data and reset scroll
    setTimeout(() => {
      setActiveCategory(catId);
      if (sliderRef.current) {
        sliderRef.current.scrollLeft = 0;
        setScrollProgress(0);
      }
      // Fade back in
      setTimeout(() => setIsAnimating(false), 50);
    }, 200);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Scroll-fast multiplier
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  // Calculate scroll progress for the bar
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    setScrollProgress(progress);

    // Hide hand animation if user swipes significantly
    if (!hasInteracted && scrollLeft > 20) {
      setHasInteracted(true);
    }
  };

  return (
    <section id="models" className="py-24 bg-wood-50 relative z-10 scroll-mt-20">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Text */}
        <div className="mb-8">
          <span className="text-xs font-semibold tracking-wider uppercase text-wood-500 mb-2 block">The Collection</span>
          <h2 className="text-4xl md:text-6xl font-serif text-wood-900 mb-4">Signature Models</h2>
          <p className="text-wood-600 text-base md:text-lg font-light leading-relaxed max-w-xl">
            Architectural grade joinery. Browse our curated configurations, each adaptable to your specific dimensions.
          </p>
        </div>

        {/* 
            MOVED FILTERS HERE 
            Sticky container that sits below the text but sticks to top when scrolling.
            Adjusted top value to clear the main navigation.
        */}
        <div className="sticky top-[72px] md:top-[96px] z-30 bg-wood-50/95 backdrop-blur-sm -mx-6 px-6 md:mx-0 md:px-0 py-4 mb-8 transition-all border-y border-wood-100/50 md:border-none md:bg-wood-50">
           <div className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide pb-1">
            {[
              { id: 'fireplace', label: 'Fireplaces' },
              { id: 'media-wall', label: 'Media Walls' },
              { id: 'high-ceiling', label: 'High Ceiling' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id as CategoryId)}
                className={`whitespace-nowrap px-6 py-3 rounded-sm text-[11px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat.id
                    ? 'bg-wood-900 text-wood-50 border-wood-900 shadow-sm'
                    : 'bg-white text-wood-500 border-wood-200 hover:border-wood-900 hover:text-wood-900 hover:bg-wood-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        {/* Mobile: -mx-6 for full bleed. gap-0 for seamless story feel. */}
        <div className="relative -mx-6 md:mx-0 min-h-[500px]">
          
          {/* Animated Swipe Hint (Mobile Only) */}
          <div className={`md:hidden absolute bottom-32 right-8 z-20 pointer-events-none flex flex-col items-center gap-2 mix-blend-difference text-white transition-opacity duration-700 ${hasInteracted ? 'opacity-0' : 'opacity-80'}`}>
            <Hand className="w-8 h-8 animate-swipe-hand" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Swipe</span>
          </div>

          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className={`flex overflow-x-auto gap-0 md:gap-8 pb-0 md:pb-12 px-0 md:px-0 scrollbar-hide cursor-grab active:cursor-grabbing transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            } ${
              isDown ? '' : 'snap-x snap-mandatory' // Disable snap while dragging for smoothness
            }`}
          >
            
            {MODELS_DATA[activeCategory].map((model) => (
              <div 
                key={model.id}
                // Immersive Mobile: w-[100vw] (Full Width), h-[75vh] (Taller), No gaps.
                className="snap-center shrink-0 w-[100vw] md:w-[450px] lg:w-[500px] select-none"
              >
                <div className="group relative h-[70vh] md:h-[600px] w-full bg-wood-200 md:rounded-sm overflow-hidden shadow-sm md:shadow-xl transition-shadow hover:shadow-2xl pointer-events-none md:pointer-events-auto">
                  
                  {/* Background Image with Ken Burns Effect */}
                  <img 
                    src={model.image} 
                    alt={model.name} 
                    className="absolute inset-0 w-full h-full object-cover animate-ken-burns pointer-events-none"
                  />
                  
                  {/* Overlay Gradient - Darker at bottom for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-wood-900 via-wood-900/40 to-transparent opacity-90"></div>

                  {/* Price Tag (Corner) */}
                  <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-wood-50/90 backdrop-blur-md px-5 py-3 rounded-sm shadow-lg z-10">
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-wood-500 mb-0.5">Starting at</span>
                    <span className="font-serif text-xl md:text-2xl text-wood-900">${model.price.toLocaleString()}</span>
                  </div>

                  {/* Content (Bottom) */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 flex flex-col items-start z-10">
                    <h3 className="text-4xl md:text-4xl font-serif text-wood-50 mb-3">{model.name}</h3>
                    <p className="text-wood-200 text-sm font-light leading-relaxed mb-8 max-w-md line-clamp-2 md:line-clamp-none">
                      {model.description}
                    </p>
                    
                    <a 
                      href="#contact"
                      className="w-full md:w-auto px-8 py-4 bg-wood-50 text-wood-900 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors flex items-center justify-center gap-3 rounded-sm pointer-events-auto"
                    >
                      Customize and quote
                      <ArrowUpRight size={16} />
                    </a>
                  </div>

                </div>
              </div>
            ))}
            
          </div>
          
          {/* Mobile Progress Bar (Visual Indicator) */}
          <div className={`md:hidden px-6 mt-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="w-full h-0.5 bg-wood-200 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-wood-900 transition-all duration-300 ease-out"
                 style={{ width: `${Math.max(10, scrollProgress)}%` }} // Min width 10% visibility
               ></div>
            </div>
            <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] uppercase tracking-widest text-wood-400 font-bold">
                    {activeCategory.replace('-', ' ')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-wood-400 flex items-center gap-1">
                    Swipe to explore <ArrowRight size={10} />
                </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};