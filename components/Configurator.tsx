
import React, { useState, useMemo } from 'react';
import { ChevronLeft, Check, ArrowRight, Info, X } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplaces' | 'consoles' | 'high-ceiling';

interface Option {
  id: string;
  label: string;
  price: number;
  enabled: boolean;
}

interface ConfigGroup {
  label: string;
  description: string;
  tooltipTitle: string;
  tooltipContent: string; // Explicación detallada de la categoría
  options: Option[];
}

interface ConfigData {
  basePrices: Record<CategoryId, number>;
  baseImages: Record<CategoryId, string>;
  groups: Record<string, ConfigGroup>;
}

const CONFIG_DATA: ConfigData = {
  basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
  baseImages: {
    'media-wall': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop',
    'fireplaces': 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
    'consoles': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    'high-ceiling': 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
  },
  groups: {
    wallHeight: {
      label: 'Wall Height',
      description: 'Defines the total height from floor to ceiling.',
      tooltipTitle: 'About Wall Height',
      tooltipContent: 'Exact measurements will be verified by our team. This is a quoting mechanism; use the number closest to what you have at home or what accommodates your budget.',
      options: [
        { id: 'h8', label: '8 ft', price: 0, enabled: true },
        { id: 'h9', label: '9 ft', price: 200, enabled: true },
        { id: 'h10', label: '10 ft', price: 500, enabled: true },
        { id: 'h10plus', label: '10 ft+', price: 800, enabled: true },
        { id: 'h12plus', label: '12 ft+', price: 1200, enabled: true },
        { id: 'h14plus', label: '14 ft+', price: 1800, enabled: true },
        { id: 'h16plus', label: '16 ft+', price: 2500, enabled: true },
        { id: 'h20plus', label: '20 ft+', price: 4000, enabled: true },
      ]
    },
    tvSize: {
      label: 'TV Size',
      description: 'Affects the width and internal structure.',
      tooltipTitle: 'TV Size & Structure',
      tooltipContent: '100" and above requires a fully customized design to accommodate oversized TVs which needs 3 installers regularly.',
      options: [
        { id: 'tv77', label: 'Up to 77"', price: 0, enabled: true },
        { id: 'tv85', label: '85"-87"', price: 450, enabled: true },
        { id: 'tv100', label: '100" and above', price: 1200, enabled: true },
      ]
    },
    tvPlacement: {
      label: 'TV Placement',
      description: 'How the TV is visually integrated.',
      tooltipTitle: 'Placement Guidance',
      tooltipContent: 'Outside (Surface) allows you to replace the TV with a bigger model in the future. Recessed (Flush) requires higher precision and custom fabrication for a seamless look.',
      options: [
        { id: 'surface', label: 'Outside (Surface mounted)', price: 0, enabled: true },
        { id: 'recessed', label: 'Recessed (Flush / Integrated)', price: 950, enabled: true },
      ]
    },
    mantel: {
      label: 'Mantel',
      description: 'Decorative and functional shelf.',
      tooltipTitle: 'Mantel Options',
      tooltipContent: 'Storage mantel includes hidden compartments inside and requires additional fabrication and hardware.',
      options: [
        { id: 'no-mantel', label: 'No mantel', price: 0, enabled: true },
        { id: 'regular', label: 'Regular mantel', price: 450, enabled: true },
        { id: 'storage', label: 'Storage mantel', price: 850, enabled: true },
      ]
    },
    soundbar: {
      label: 'Soundbar',
      description: 'How the audio system is incorporated.',
      tooltipTitle: 'Audio Integration',
      tooltipContent: 'Inserted (Built-in) requires precise sizing and ventilation considerations. Floating is mounted independently for a modern look.',
      options: [
        { id: 'no-sb', label: 'No soundbar', price: 0, enabled: true },
        { id: 'on-mantel', label: 'On the mantel', price: 150, enabled: true },
        { id: 'floating', label: 'Floating', price: 300, enabled: true },
        { id: 'built-in', label: 'Inserted (Built-in)', price: 600, enabled: true },
      ]
    },
    fireplaceType: {
      label: 'Fireplace Type',
      description: 'Style and visual depth of the fireplace.',
      tooltipTitle: '3-Sided Fireplaces',
      tooltipContent: '3-sided fireplaces provide more visual depth and have a higher installation complexity compared to standard front-facing models.',
      options: [
        { id: 'front', label: 'Regular (Front-facing)', price: 0, enabled: true },
        { id: '3sided', label: '3-sided', price: 850, enabled: true },
      ]
    },
    lighting: {
      label: 'Lighting',
      description: 'Integrated lighting to enhance depth.',
      tooltipTitle: 'Lighting Placement',
      tooltipContent: 'Vertical accent lighting on the sides or ambient glow under shelves to highlight materials.',
      options: [
        { id: 'above', label: 'Above', price: 250, enabled: true },
        { id: 'under', label: 'Under', price: 250, enabled: true },
        { id: 'sides', label: 'Sides', price: 450, enabled: true },
      ]
    }
  }
};

const Tooltip: React.FC<{ title: string; text: string; onClose: () => void }> = ({ title, text, onClose }) => (
  <div className="absolute z-[100] top-0 right-0 mt-8 w-72 bg-wood-900 text-white p-5 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-fade-in-up border border-wood-800">
    <div className="flex justify-between items-start mb-3 border-b border-wood-800 pb-2">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-wood-400">{title}</span>
      <button onClick={onClose} className="text-wood-500 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
    <p className="text-[11px] font-medium leading-relaxed text-wood-100 italic">
      {text}
    </p>
    <div className="absolute bottom-full right-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-wood-900"></div>
  </div>
);

export const Configurator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({
    category: 'media-wall',
    wallHeight: 'h8',
    tvSize: 'tv77',
    tvPlacement: 'surface',
    mantel: 'no-mantel',
    soundbar: 'no-sb',
    fireplaceType: 'front',
    lighting: 'none',
  });

  const totalPrice = useMemo(() => {
    let total = CONFIG_DATA.basePrices[selections.category as CategoryId] || 0;
    Object.entries(CONFIG_DATA.groups).forEach(([key, group]) => {
      const opt = group.options.find(o => o.id === selections[key]);
      if (opt) total += opt.price;
    });
    return total;
  }, [selections]);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-manrope">
      {/* Back Button */}
      <button 
        onClick={onBack} 
        className="fixed top-6 left-6 z-[70] bg-white/90 backdrop-blur-md p-3 rounded-full border border-wood-200 shadow-xl hover:scale-105 active:scale-95 transition-all"
      >
        <ChevronLeft size={20} className="text-wood-900" />
      </button>

      {/* LEFT: VISUALIZER */}
      <div className="relative lg:w-[55%] h-[40vh] lg:h-screen sticky top-0 bg-wood-50 overflow-hidden shrink-0">
        <img 
          src={CONFIG_DATA.baseImages[selections.category as CategoryId]} 
          alt="Design Preview" 
          className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          style={{ 
            maskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 95%, transparent 100%)'
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* RIGHT: CONFIG PANEL */}
      <div className="lg:w-[45%] h-screen overflow-y-auto scrollbar-hide px-6 md:px-12 pt-10 lg:pt-20 pb-56 bg-white border-l border-wood-100">
        <div className="max-w-lg mx-auto">
          <header className="mb-12">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-wood-400 mb-3">Customizer</h2>
            <h1 className="text-4xl md:text-5xl font-canale text-wood-900 uppercase tracking-tight leading-none mb-10">
              {selections.category.replace('-', ' ')}
            </h1>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
               {(['media-wall', 'fireplaces', 'consoles', 'high-ceiling'] as CategoryId[]).map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setSelections(s => ({...s, category: cat}))}
                  className={`py-3 px-1 text-[8px] font-black uppercase tracking-widest border rounded-md transition-all ${selections.category === cat ? 'bg-wood-900 text-white border-wood-900 shadow-lg' : 'text-wood-400 border-wood-100 hover:border-wood-300'}`}
                 >
                   {cat.replace('-', ' ')}
                 </button>
               ))}
            </div>
          </header>

          {/* Config Groups */}
          {Object.entries(CONFIG_DATA.groups).map(([key, group]) => (
            <div key={key} className="mb-12 animate-fade-in-up">
              {/* Nivel 1: Cabecera de Categoría con ⓘ */}
              <div className="mb-6 relative">
                <div className="flex items-center justify-between">
                  <h4 className="text-[12px] font-black uppercase tracking-[0.15em] text-wood-900">
                    {group.label}
                  </h4>
                  <button 
                    onClick={() => setActiveTooltip(activeTooltip === key ? null : key)}
                    className={`p-1.5 rounded-full transition-all ${activeTooltip === key ? 'bg-wood-900 text-white scale-110 shadow-lg' : 'text-wood-300 hover:text-wood-900 hover:bg-wood-100'}`}
                  >
                    <Info size={18} />
                  </button>
                </div>
                <p className="text-[11px] font-semibold text-wood-400 leading-relaxed uppercase tracking-wide opacity-70 mt-1 pr-10">
                  {group.description}
                </p>

                {/* Tooltip flotante en el título */}
                {activeTooltip === key && (
                  <Tooltip 
                    title={group.tooltipTitle} 
                    text={group.tooltipContent} 
                    onClose={() => setActiveTooltip(null)} 
                  />
                )}
              </div>

              {/* Opciones individuales limpias */}
              <div className="grid grid-cols-1 gap-2.5">
                {group.options.map(opt => {
                  const isSelected = selections[key] === opt.id;
                  return (
                    <button 
                      key={opt.id}
                      onClick={() => setSelections(s => ({...s, [key]: opt.id}))}
                      className={`w-full p-5 border rounded-lg flex justify-between items-center transition-all ${isSelected ? 'border-wood-900 bg-wood-50 shadow-sm' : 'border-wood-100 hover:border-wood-200 text-wood-400'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${isSelected ? 'border-wood-900 bg-wood-900' : 'border-wood-200'}`}>
                          {isSelected && <Check size={10} className="text-white" />}
                        </div>
                        <span className={`text-[11px] font-black uppercase tracking-tight transition-colors ${isSelected ? 'text-wood-900' : ''}`}>
                          {opt.label}
                        </span>
                      </div>
                      <span className={`text-xs font-canale transition-colors ${isSelected ? 'text-wood-900' : 'text-wood-300'}`}>
                        {opt.price > 0 ? `+$${opt.price}` : 'Incl.'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* TOTAL PANEL */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-[45%] bg-white/95 backdrop-blur-2xl border-t border-wood-100 p-6 md:px-12 md:py-8 z-[60]">
             <div className="max-w-lg mx-auto flex items-center justify-between gap-6">
                <div>
                  <p className="text-[9px] font-black text-wood-400 uppercase tracking-widest mb-1.5">Estimated Total</p>
                  <h2 className="text-4xl md:text-5xl font-canale text-wood-900 leading-none">${totalPrice}</h2>
                </div>
                <button className="flex-1 bg-wood-900 text-white py-5 px-6 rounded-md font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:bg-wood-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Request Build <ArrowRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
