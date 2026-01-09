
import React, { useState, useRef } from 'react';
import { ChevronDown, Check, ArrowUpRight, Hand } from 'lucide-react';

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
  { id: 'media-wall', label: 'Media Walls' },
  { id: 'fireplace', label: 'Fireplaces' },
  { id: 'high-ceiling', label: 'High Ceiling' }
];

const ModelCarousel: React.FC<{ models: ModelItem[] }> = ({ models }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!hasInteracted && e.currentTarget.scrollLeft > 20) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="relative -mx-6 md:mx-0">
      {/* Swipe Hint (Mobile Only) - Lado derecho y centrado verticalmente */}
      <div className={`md:hidden absolute top-1/2 right-6 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 text-white/90 transition-opacity duration-700 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
        <Hand className="w-10 h-10 animate-swipe-hand drop-shadow-2xl" />
        <span className="text-[10px] font-black uppercase tracking-[0.3em] drop-shadow-md">Swipe models</span>
      </div>

      <div 
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={() => setIsDown(false)}
        onMouseUp={() => setIsDown(false)}
        onMouseMove={handleMouseMove}
        onScroll={handleScroll}
        className={`flex overflow-x-auto gap-0 md:gap-8 pb-4 px-0 md:px-0 scrollbar-hide cursor-grab active:cursor-grabbing ${isDown ? '' : 'snap-x snap-mandatory'}`}
      >
        {models.map((model) => (
          <div key={model.id} className="snap-center shrink-0 w-[100vw] md:w-[600px] select-none">
            <div className="group relative h-[75vh] md:h-[650px] w-full bg-wood-200 md:rounded-sm overflow-hidden shadow-none md:shadow-xl">
              <img src={model.image} alt={model.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent"></div>
              
              {/* Price Tag - Unified Boldness */}
              <div className="absolute top-6 right-6 bg-white px-5 py-4 rounded-sm shadow-xl text-center min-w-[130px]">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] text-wood-400 mb-1">Starting at</span>
                <span className="block text-2xl font-extrabold text-wood-900 tracking-tight">${model.price}</span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10">
                <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-3 leading-tight tracking-tighter uppercase">{model.name}</h3>
                <p className="text-wood-100 text-sm md:text-base font-medium mb-8 max-w-sm opacity-90 leading-relaxed">{model.description}</p>
                <a href="#contact" className="inline-flex items-center justify-center gap-3 w-full md:w-auto bg-white text-wood-900 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] hover:bg-wood-100 transition-colors rounded-sm shadow-lg">
                  Customize and Quote
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for desktop right edge */}
        <div className="hidden md:block w-8 shrink-0"></div>
      </div>
    </div>
  );
};

export const ServicesConfigurator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('media-wall');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const currentSection = SECTIONS.find(s => s.id === activeCategory) || SECTIONS[0];

  return (
    <section id="models" className="py-16 md:py-24 bg-wood-50 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <span className="text-xs font-black tracking-[0.3em] uppercase text-wood-400 mb-4 block">The Collection</span>
          <h2 className="text-5xl md:text-8xl font-extrabold text-wood-900 mb-8 md:mb-10 leading-[0.85] tracking-tighter uppercase">Signature Models</h2>
          
          <div className="relative inline-block text-left z-30">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-extrabold text-wood-900/60 hover:text-wood-900 transition-colors uppercase tracking-tighter"
            >
              Collection: <span className="text-wood-900 border-b-4 border-wood-200 pb-1">{currentSection.label}</span>
              <ChevronDown size={28} strokeWidth={3} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-4 w-72 bg-white border border-wood-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm z-50 p-1.5">
                {SECTIONS.map((section) => (
                  <button 
                    key={section.id} 
                    onClick={() => { setActiveCategory(section.id as CategoryId); setIsDropdownOpen(false); }}
                    className={`w-full text-left px-5 py-4 text-[11px] font-black uppercase tracking-widest flex items-center justify-between rounded-sm transition-all ${
                      activeCategory === section.id 
                        ? 'bg-wood-900 text-white' 
                        : 'hover:bg-wood-50 text-wood-400 hover:text-wood-900'
                    }`}
                  >
                    {section.label}
                    {activeCategory === section.id && <Check size={16} strokeWidth={3} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <ModelCarousel models={MODELS_DATA[activeCategory]} />
      </div>
    </section>
  );
};
