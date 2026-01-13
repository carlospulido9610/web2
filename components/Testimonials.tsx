
import React, { useState, useRef } from 'react';
import { Play, ArrowRight, Hand } from 'lucide-react';
import { Review } from '../types';

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    quote: "It completely changed the vibe of our living room. The fireplace looks like it was always meant to be there.",
    videoThumbnail: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    name: 'Mark & David',
    role: 'Condo Renovation',
    quote: "We were worried about the mess, but they installed everything in one day. Super clean.",
    videoThumbnail: 'https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    name: 'Elena R.',
    role: 'Interior Designer',
    quote: "As a designer, I appreciate their precision. The joinery is flawless.",
    videoThumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 4,
    name: 'James H.',
    role: 'Architect',
    quote: "The ability to customize the dimensions online before meeting saved us weeks of back and forth.",
    videoThumbnail: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1200'
  }
];

export const Testimonials: React.FC = () => {
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
    <section id="reviews" className="pt-8 md:pt-14 pb-0 bg-wood-50 relative overflow-hidden border-t border-wood-200 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-7 md:mb-11">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-5xl md:text-7xl font-canale text-wood-900 uppercase leading-[0.9] tracking-tighter">
              Reviews
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-wood-400 text-[10px] pb-2 font-manrope font-black uppercase tracking-widest">
            <ArrowRight size={16} />
            <span>Drag stories</span>
          </div>
        </div>
      </div>

      <div className="w-full relative">
        <div className={`md:hidden absolute top-1/2 right-6 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center gap-2 text-white/90 transition-opacity duration-700 ${hasInteracted ? 'opacity-0' : 'opacity-100'}`}>
          <Hand className="w-8 h-8 animate-swipe-hand drop-shadow-lg" />
          <span className="text-[10px] font-manrope font-black uppercase tracking-widest drop-shadow-md">Swipe</span>
        </div>

        <div 
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={() => setIsDown(false)}
          onMouseUp={() => setIsDown(false)}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
          className={`flex overflow-x-auto gap-0 md:gap-8 px-0 md:px-0 pb-0 scrollbar-hide cursor-grab active:cursor-grabbing ${isDown ? '' : 'snap-x snap-mandatory'}`}
        >
          {REVIEWS.map((review) => (
            <div key={review.id} className="snap-center shrink-0 w-[100vw] md:w-[700px] select-none">
              <div className="group relative h-[80vh] md:h-[600px] w-full overflow-hidden bg-wood-200 shadow-none transition-all duration-500">
                <img src={review.videoThumbnail} alt={review.name} className="absolute inset-0 w-full h-full object-cover animate-ken-burns pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-wood-900 via-wood-900/20 to-transparent opacity-90 md:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-wood-50/10 backdrop-blur-md border border-wood-50/20 flex items-center justify-center text-wood-50 transition-all scale-90 md:scale-100 group-hover:scale-110">
                    <Play fill="currentColor" size={28} className="ml-1 opacity-90" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
