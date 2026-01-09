import React, { useState, useRef } from 'react';
import { ArrowRight, ChevronDown, Check, ArrowUpRight } from 'lucide-react';

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

const SECTIONS = [
  { 
    id: 'media-wall', 
    label: 'Media Walls', 
    description: 'Integrated entertainment centers designed to conceal wires and display what matters.' 
  },
  { 
    id: 'fireplace', 
    label: 'Fireplaces', 
    description: 'Warmth meets modern architecture. Electric inserts with stone, wood, or micro-cement finishes.' 
  },
  { 
    id: 'high-ceiling', 
    label: 'High Ceiling', 
    description: 'Dramatic verticality. Custom engineering for double-height living spaces.' 
  }
];

// --- Sub-Component: Carousel Only ---
const ModelCarousel: React.FC<{
  models: ModelItem[];
}> = ({ models }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="relative -mx-6 md:mx-0 animate-fade-in-up">
      {/* Desktop Hint */}
      <div className="hidden md:flex justify-end mb-4 px-1">
         <div className="flex items-center gap-2 text-wood-400 text-xs font-bold uppercase tracking-widest">
            <span>Drag to explore</span>
            <ArrowRight size={14} />
         </div>
      </div>

      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-0 md:gap-8 pb-0 md:pb-8 px-0 md:px-0 scrollbar-hide cursor-grab active:cursor-grabbing ${
          isDown ? '' : 'snap-x snap-mandatory'
        }`}
      >
        {models.map((model) => (
          <div 
            key={model.id}
            className="snap-center shrink-0 w-[100vw] md:w-[550px] lg:w-[600px] select-none"
          >
            {/* Card Container - Immersive on mobile (80vh, no padding) */}
            <div className="group relative h-[80vh] md:h-[650px] w-full bg-wood-200 md:rounded-sm overflow-hidden shadow-none md:shadow-lg hover:shadow-2xl transition-all duration-500">
              
              {/* Background Image */}
              <img 
                src={model.image} 
                alt={model.name} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Overlay Gradient - Darker at bottom for white text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

              {/* Price Tag (Top Right) - Solid Paper Style */}
              <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-wood-50 px-4 py-3 md:px-5 md:py-4 shadow-xl rounded-sm text-center min-w-[100px] md:min-w-[120px]">
                <span className="block text-[10px] font-bold uppercase tracking-widest text-wood-500 mb-1">Starting at</span>
                <span className="block font-serif text-2xl md:text-3xl text-wood-900">${model.price}</span>
              </div>

              {/* Content Area - Bottom Left */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col items-start z-10">
                
                {/* Title visible on mobile again */}
                <h3 className="block text-3xl md:text-5xl font-serif text-white mb-3 shadow-sm leading-tight">
                  {model.name}
                </h3>
                
                {/* Description visible on mobile again */}
                <p className="block text-wood-100 text-sm md:text-base font-light leading-relaxed mb-6 md:mb-8 max-w-sm drop-shadow-md opacity-90">
                  {model.description}
                </p>
                
                {/* Rectangular White Button */}
                <a 
                  href="#contact"
                  className="w-full bg-wood-50 text-wood-900 px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] hover:bg-white transition-colors flex items-center justify-center gap-3 rounded-sm shadow-xl group/btn"
                >
                  Customize and Quote
                  <ArrowUpRight size={16} className="text-wood-900 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>

              </div>

            </div>
          </div>
        ))}
        
        {/* Spacer for right edge scrolling on Desktop */}
        <div className="hidden md:block w-1 shrink-0"></div>
      </div>
    </div>
  );
};


// --- Main Component ---
export const ServicesConfigurator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('media-wall');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentSection = SECTIONS.find(s => s.id === activeCategory) || SECTIONS[0];

  return (
    <section id="models" className="py-12 md:py-24 bg-wood-50 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Header Section */}
        <div className="mb-12">
            <span className="text-xs font-semibold tracking-wider uppercase text-wood-500 mb-3 block">The Collection</span>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h2 className="text-5xl md:text-7xl font-serif text-wood-900 mb-6 leading-none">
                        Signature Models
                    </h2>
                    
                    {/* Minimalist Dropdown Selector */}
                    <div className="relative inline-block text-left z-30">
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="group inline-flex items-center gap-3 text-xl md:text-2xl font-serif italic text-wood-600 hover:text-wood-900 transition-colors"
                        >
                            Viewing collection: 
                            <span className="relative">
                                <span className="not-italic font-sans font-bold uppercase tracking-widest text-xs md:text-sm border-b-2 border-wood-200 pb-1 group-hover:border-wood-900 transition-colors">
                                    {currentSection.label}
                                </span>
                            </span>
                            <ChevronDown size={20} className={`transition-transform duration-300 text-wood-400 group-hover:text-wood-900 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                <div className="absolute left-0 mt-4 w-72 bg-white border border-wood-100 shadow-2xl rounded-sm z-20 animate-fade-in-up origin-top-left">
                                    <div className="p-2">
                                        {SECTIONS.map((section) => (
                                            <button
                                                key={section.id}
                                                onClick={() => {
                                                    setActiveCategory(section.id as CategoryId);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-5 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-between group transition-colors rounded-sm ${
                                                    activeCategory === section.id 
                                                    ? 'bg-wood-100 text-wood-900' 
                                                    : 'hover:bg-wood-50 text-wood-500 hover:text-wood-900'
                                                }`}
                                            >
                                                {section.label}
                                                {activeCategory === section.id && <Check size={16} className="text-wood-900" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>

        {/* Dynamic Carousel Area */}
        <div key={activeCategory}>
             <ModelCarousel models={MODELS_DATA[activeCategory]} />
        </div>

      </div>
    </section>
  );
};