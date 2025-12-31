import React, { useState } from 'react';
import { MaterialType, MaterialOption, ServiceCategory } from '../types';
import { Check, ChevronRight } from 'lucide-react';

const CATEGORIES: ServiceCategory[] = [
  {
    id: 'media-wall',
    name: 'Media Walls',
    description: 'Integrated TV, sound, and storage solutions.',
    basePrice: 4500,
    image: 'https://images.unsplash.com/photo-1556020685-ae79c95edfbc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'fireplace',
    name: 'Fireplaces',
    description: 'Statement centerpieces with electric or gas inserts.',
    basePrice: 3800,
    image: 'https://images.unsplash.com/photo-1510627489930-0c1b0dc58e85?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'high-ceiling',
    name: 'High Ceilings',
    description: 'Floor-to-ceiling designs for grand spaces.',
    basePrice: 6500,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800'
  }
];

const MATERIALS: MaterialOption[] = [
  { type: MaterialType.PAINT, priceMultiplier: 120, description: 'High-grade satin finish in any color.' },
  { type: MaterialType.WOOD, priceMultiplier: 180, description: 'Real wood oak, walnut, or ash veneers.' },
  { type: MaterialType.STONE, priceMultiplier: 250, description: 'Natural marble or quartz slab features.' },
];

export const ServicesConfigurator: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(CATEGORIES[0]);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(MATERIALS[0]);
  const [width, setWidth] = useState<number>(10); // Feet

  const calculateTotal = () => {
    return selectedCategory.basePrice + (width * selectedMaterial.priceMultiplier);
  };

  return (
    <section id="models" className="py-24 bg-wood-50 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <span className="text-xs font-semibold tracking-wider uppercase text-wood-500">Estimator</span>
          <h2 className="text-4xl md:text-5xl font-serif italic mt-3 text-wood-900">Design & Pricing</h2>
          <p className="mt-4 text-wood-600 max-w-2xl">
            Visualize your project and get an instant ballpark estimate. Select a model, choose your finish, and adjust the size.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Visualizer Side */}
          <div className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[600px] shadow-2xl transition-all duration-500">
            <img 
              src={selectedCategory.image} 
              alt={selectedCategory.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-wood-900/80 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 text-wood-50">
              <h3 className="text-3xl font-serif italic mb-2">{selectedCategory.name}</h3>
              <p className="text-wood-200 text-sm max-w-md">{selectedCategory.description}</p>
            </div>
            
            {/* Price Tag Overlay */}
            <div className="absolute top-8 right-8 bg-wood-50/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg border border-wood-200">
              <p className="text-xs text-wood-500 font-semibold uppercase tracking-wider mb-1">Estimated Price</p>
              <p className="text-3xl font-serif text-wood-900">${calculateTotal().toLocaleString()}</p>
            </div>
          </div>

          {/* Controls Side */}
          <div className="space-y-12">
            
            {/* 1. Category Selection */}
            <div>
              <h4 className="text-lg font-semibold text-wood-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-wood-900 text-wood-50 flex items-center justify-center text-xs">1</span>
                Select Model
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat)}
                    className={`p-4 rounded-xl text-left transition-all border ${
                      selectedCategory.id === cat.id 
                      ? 'bg-wood-900 text-wood-50 border-wood-900 shadow-lg' 
                      : 'bg-white text-wood-900 border-wood-200 hover:border-wood-400'
                    }`}
                  >
                    <span className="block font-medium mb-1">{cat.name}</span>
                    <span className="text-xs opacity-70">Starting at ${cat.basePrice.toLocaleString()}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Dimensions */}
            <div>
              <h4 className="text-lg font-semibold text-wood-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-wood-900 text-wood-50 flex items-center justify-center text-xs">2</span>
                Width (Linear Feet)
              </h4>
              <div className="bg-white p-6 rounded-xl border border-wood-200">
                <div className="flex justify-between mb-4 text-wood-900 font-medium">
                  <span>8 ft</span>
                  <span className="text-2xl font-serif text-wood-600">{width} ft</span>
                  <span>20 ft</span>
                </div>
                <input 
                  type="range" 
                  min="8" 
                  max="20" 
                  step="1" 
                  value={width}
                  onChange={(e) => setWidth(parseInt(e.target.value))}
                  className="w-full h-2 bg-wood-200 rounded-lg appearance-none cursor-pointer accent-wood-900"
                />
              </div>
            </div>

            {/* 3. Materials */}
            <div>
              <h4 className="text-lg font-semibold text-wood-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-wood-900 text-wood-50 flex items-center justify-center text-xs">3</span>
                Primary Finish
              </h4>
              <div className="space-y-3">
                {MATERIALS.map((mat) => (
                  <button
                    key={mat.type}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                      selectedMaterial.type === mat.type 
                      ? 'border-wood-900 bg-wood-100/50 ring-1 ring-wood-900' 
                      : 'border-wood-200 hover:bg-wood-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        selectedMaterial.type === mat.type ? 'border-wood-900' : 'border-wood-300'
                      }`}>
                         {selectedMaterial.type === mat.type && <div className="w-2.5 h-2.5 rounded-full bg-wood-900" />}
                      </div>
                      <div className="text-left">
                        <span className="block font-medium text-wood-900">{mat.type}</span>
                        <span className="text-xs text-wood-500">{mat.description}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-wood-200">
              <a href="#contact" className="w-full py-4 rounded-xl bg-wood-900 text-wood-50 font-medium flex items-center justify-center gap-2 hover:bg-wood-800 transition-colors shadow-lg">
                Start Design with {selectedCategory.name}
                <ChevronRight size={18} />
              </a>
              <p className="text-center text-xs text-wood-500 mt-3">
                *Prices are estimates. Final quote provided after technical measurement.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};