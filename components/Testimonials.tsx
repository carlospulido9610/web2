import React from 'react';
import { Play } from 'lucide-react';
import { Review } from '../types';

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Homeowner',
    quote: "It completely changed the vibe of our living room. The fireplace looks like it was always meant to be there.",
    videoThumbnail: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    name: 'Mark & David',
    role: 'Condo Renovation',
    quote: "We were worried about the mess, but they installed everything in one day. Super clean.",
    videoThumbnail: 'https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    name: 'Elena R.',
    role: 'Interior Designer',
    quote: "As a designer, I appreciate their precision. The joinery is flawless.",
    videoThumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=600'
  }
];

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-wood-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-wood-500">Validation</span>
          <h2 className="text-4xl md:text-5xl font-serif italic mt-3 text-wood-900">Real Homes. Real Results.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="group cursor-pointer">
              <div className="relative aspect-[9/16] md:aspect-[4/5] rounded-2xl overflow-hidden mb-6 shadow-md">
                <img 
                  src={review.videoThumbnail} 
                  alt={review.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-wood-50/20 backdrop-blur-md flex items-center justify-center text-wood-50 border border-wood-50/50 transition-transform group-hover:scale-110">
                    <Play fill="currentColor" size={24} className="ml-1" />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-wood-800 italic mb-2">"{review.quote}"</p>
                <p className="text-xs font-bold text-wood-900 uppercase tracking-wider">{review.name} <span className="text-wood-400 font-normal">/ {review.role}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};