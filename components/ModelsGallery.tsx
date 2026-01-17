
import React, { useState } from 'react';
import { ArrowRight, Filter } from 'lucide-react';
import { Model } from '../types';

interface ModelsGalleryProps {
  models: Model[];
  onSelectModel: (model: Model) => void;
  onBack: () => void;
}

const CATEGORIES = [
  { id: 'all', label: 'All Models' },
  { id: 'media-wall', label: 'Media Walls' },
  { id: 'fireplaces', label: 'Fireplaces' },
  { id: 'consoles', label: 'Consoles' },
  { id: 'high-ceiling', label: 'High Ceiling' },
];

export const ModelsGallery: React.FC<ModelsGalleryProps> = ({ models, onSelectModel, onBack }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredModels = activeCategory === 'all' 
    ? models 
    : models.filter(m => m.category === activeCategory);

  return (
    <div className="min-h-screen bg-wood-50 pt-24 pb-20 animate-fade-in-up">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-12 md:mb-16 text-center md:text-left">
          <button 
            onClick={onBack}
            className="text-[10px] font-manrope font-black uppercase tracking-widest text-wood-400 hover:text-wood-900 mb-6 block transition-colors"
          >
            ← Back to Home
          </button>
          <h1 className="text-4xl md:text-7xl font-canale text-wood-900 uppercase tracking-tight leading-none mb-4">
            Select a Design
          </h1>
          <p className="text-wood-500 text-lg font-manrope font-medium max-w-2xl">
            Choose a starting point for your project. Customize dimensions, finishes, and features in the next step.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="sticky top-20 z-30 bg-wood-50/95 backdrop-blur-sm py-4 mb-8 -mx-6 px-6 md:mx-0 md:px-0 overflow-x-auto scrollbar-hide border-b border-wood-200">
          <div className="flex gap-2 md:gap-4 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-wood-900 text-white border-wood-900'
                    : 'bg-white text-wood-500 border-wood-200 hover:border-wood-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {filteredModels.map((model) => (
            <div 
              key={model.id}
              onClick={() => onSelectModel(model)}
              className="group cursor-pointer flex flex-col bg-white border border-wood-100 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-wood-200">
                <img 
                  src={model.image} 
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-sm">
                  <span className="text-[9px] font-manrope font-black uppercase tracking-widest text-wood-900">
                    From ${model.basePrice.toLocaleString()}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-wood-400 mb-2 block">
                        {CATEGORIES.find(c => c.id === model.category)?.label || model.category}
                    </span>
                    <h3 className="text-2xl font-canale text-wood-900 uppercase leading-none mb-2 group-hover:text-wood-600 transition-colors">
                        {model.name}
                    </h3>
                    <p className="text-sm text-wood-500 font-manrope line-clamp-2">
                        {model.description}
                    </p>
                </div>
                
                <div className="mt-auto pt-4 border-t border-wood-50 flex justify-between items-center text-wood-900">
                    <span className="text-[10px] font-black uppercase tracking-widest">Configure</span>
                    <div className="w-8 h-8 rounded-full border border-wood-200 flex items-center justify-center group-hover:bg-wood-900 group-hover:text-white group-hover:border-wood-900 transition-all">
                        <ArrowRight size={14} />
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
