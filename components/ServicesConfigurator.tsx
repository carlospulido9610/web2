
import React, { useState, useRef } from 'react';
import { ArrowUpRight, Hand } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplace' | 'consoles' | 'high-ceiling';

interface ModelItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string; 
}

const MODELS_DATA: Record<CategoryId, ModelItem[]> = {
  'media-wall': [
    { id: 'mw-1', name: 'The Floating Oak', price: 4500, description: 'Minimalist floating console with integrated LED lighting and acoustic slat backing.', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1200' },
    { id: 'mw-2', name: 'Cinema Suite', price: 6200, description: 'Full wall integration with hidden storage, soundbar niche, and ambient backlighting.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200' }
  ],
  'fireplace': [
    { id: 'fp-1', name: 'Modern Linear', price: 3800, description: 'Sleek panoramic electric fireplace insert with micro-cement finish surround.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200' }
  ],
  'consoles': [
    { id: 'cn-1', name: 'Minimalist Entry', price: 2400, description: 'Slim profile entry console with premium wood finish and cable management.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200' }
  ],
  'high-ceiling': [
    { id: 'hc-1', name: 'The Cathedral', price: 8500, description: 'Grand scale joinery designed specifically for double-height voids.', image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200' },
    { id: 'hc-2', name: 'Vertical Slat', price: 7900, description: 'Elongated vertical lines to accentuate height, featuring hidden storage.', image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200' }
  ]
};

const SECTIONS = [
  { id: 'media-wall' as CategoryId, label: 'Media Wall' },
  { id: 'fireplace' as CategoryId, label: 'Fireplaces' },
  { id: 'consoles' as CategoryId, label: 'Consoles' },
  { id: 'high-ceiling' as CategoryId, label: 'High Ceiling' }
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
      <div className={`md:hidden absolute top-1/2 right-6 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 text-white/90 transition-opacity duration-700 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
          <Hand className="w-8 h-8 animate-swipe-hand drop-shadow-lg" />
          <span className="text-[10px] font-manrope font-black uppercase tracking-widest drop-shadow-md">Swipe</span>
      </div>

      <div ref={sliderRef} 
           onScroll={handleScroll}
           onMouseDown={handleMouseDown} onMouseLeave={() => setIsDown(false)} onMouseUp={() => setIsDown(false)} onMouseMove={handleMouseMove}
        className={`flex overflow-x-auto gap-0 md:gap-8 pb-0 px-0 md:px-0 scrollbar-hide cursor-grab active:cursor-grabbing ${isDown ? '' : 'snap-x snap-mandatory'}`}>
        {models.map((model) => (
          <div key={model.id} className="snap-center shrink-0 w-[100vw] md:w-[600px] select-none">
            <div className="group relative h-[65vh] md:h-[600px] w-full bg-wood-200 md:rounded-sm overflow-hidden border-none">
              <img src={model.image} alt={model.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent"></div>
              
              {/* PRICE BOX - UPDATED TO CANALE */}
              <div className="absolute top-6 right-6 bg-white px-5 py-4 text-center min-w-[140px] z-20 shadow-xl border-none">
                <span className="block text-[9px] font-manrope font-black uppercase tracking-[0.2em] text-wood-400 mb-0.5">Starting at</span>
                <span className="block text-4xl font-canale text-wood-900 leading-none tracking-tight">
                  ${model.price}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-10">
                <h3 className="text-3xl md:text-5xl font-canale text-white mb-2 leading-[0.9] tracking-tight uppercase">{model.name}</h3>
                <p className="text-wood-100 text-xs md:text-sm font-manrope font-medium mb-6 opacity-80 max-w-xs">{model.description}</p>
                <button className="bg-white text-wood-900 px-6 py-3 text-[10px] font-manrope font-black uppercase tracking-widest flex items-center gap-2 hover:bg-wood-100 transition-colors">
                   Configure now <ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ServicesConfigurator: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('media-wall');
  return (
    <section id="models" className="pt-8 md:pt-14 pb-1 md:pb-2 bg-wood-50 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl font-canale text-wood-900 leading-[0.9] mb-7 uppercase tracking-tighter">
          Models
        </h2>
        
        <div className="flex border border-wood-200 bg-white -mx-6 md:mx-0 mb-0 overflow-x-auto scrollbar-hide">
          {SECTIONS.