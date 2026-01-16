
import React, { useState, useMemo } from 'react';
import { ChevronLeft, Check, ArrowRight, Info, X } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplaces' | 'consoles' | 'high-ceiling';

const Tooltip: React.FC<{ title: string; text: string; onClose: () => void }> = ({ title, text, onClose }) => (
  <div className="absolute z-[100] top-0 right-0 mt-8 w-72 bg-wood-900 text-white p-5 rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.4)] animate-fade-in-up border border-wood-800">
    <div className="flex justify-between items-start mb-3 border-b border-wood-800 pb-2">
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-wood-400">{title}</span>
      <button onClick={onClose} className="text-wood-500 hover:text-white transition-colors">
        <X size={16} />
      </button>
    </div>
    <div className="text-[11px] font-medium leading-relaxed text-wood-100 italic whitespace-pre-line">
      {text}
    </div>
    <div className="absolute bottom-full right-4 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-wood-900"></div>
  </div>
);

export const Configurator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  
  const [siteData] = useState<any>(() => {
    const saved = localStorage.getItem('raval_site_data');
    if (saved) return JSON.parse(saved);
    return null;
  });

  // Default detailed info based on user request
  const defaultGroups = {
    wallHeight: {
      label: 'Wall Height',
      description: "Defines the total height of the media wall from floor to ceiling. Exact measurements will be verified by our team.\n\nNote: This is just a quoting mechanism; use the number that is closer to what you have at home or what accommodates your budget.",
      options: [
        { id: 'h8', label: '8 ft', price: 0 },
        { id: 'h9', label: '9 ft', price: 200 },
        { id: 'h10', label: '10 ft', price: 500 },
        { id: 'h10p', label: '10 ft+', price: 800 },
        { id: 'h12p', label: '12 ft+', price: 1200 },
        { id: 'h14p', label: '14 ft+', price: 1800 },
        { id: 'h16p', label: '16 ft+', price: 2500 },
        { id: 'h20p', label: '20 ft+', price: 3500 }
      ]
    },
    tvSize: {
      label: 'TV Size',
      description: "Affects the overall width and internal structure of the media wall.\n\n• Up to 77\": Standard fit.\n• 85\"-87\": Requires a wider structure and additional reinforcement.\n• 100\"+: Fully customized design for oversized TVs; typically requires 3 installers.",
      options: [
        { id: 'tv77', label: 'Up to 77"', price: 0 },
        { id: 'tv85', label: '85"–87"', price: 450 },
        { id: 'tv100', label: '100" and above', price: 1200 }
      ]
    },
    tvPlacement: {
      label: 'TV Placement',
      description: "How the TV is visually integrated.\n\n• Surface mounted: TV is on the surface. Lighter look, simpler install, and easier to upgrade to a bigger TV later.\n• Recessed: TV is built into the wall for a seamless look. Requires higher precision and custom fabrication.",
      options: [
        { id: 'surface', label: 'Surface mounted', price: 0 },
        { id: 'recessed', label: 'Recessed (Flush)', price: 650 }
      ]
    },
    mantel: {
      label: 'Mantel',
      description: "Decorative and functional shelf.\n\n• No mantel: Clean, minimalist.\n• Regular: Standard floating mantel.\n• Storage mantel: Includes hidden storage inside. Requires additional fabrication and hardware.",
      options: [
        { id: 'no-mantel', label: 'No mantel', price: 0 },
        { id: 'regular-mantel', label: 'Regular mantel', price: 350 },
        { id: 'storage-mantel', label: 'Storage mantel', price: 750 }
      ]
    },
    soundbar: {
      label: 'Soundbar',
      description: "Integration style for your sound system.\n\n• On the mantel: Placed on top with hidden wires.\n• Floating: Mounted independently for a modern look.\n• Inserted: Fully integrated (Built-in). Requires precise sizing and ventilation.",
      options: [
        { id: 'no-soundbar', label: 'No soundbar', price: 0 },
        { id: 'on-mantel', label: 'On the mantel', price: 150 },
        { id: 'floating', label: 'Floating', price: 250 },
        { id: 'inserted', label: 'Inserted (Built-in)', price: 450 }
      ]
    },
    fireplaceType: {
      label: 'Fireplace Type',
      description: "Visual depth of the unit.\n\n• Regular: Standard single-sided fireplace.\n• 3-sided: Visible from front and sides. More depth and higher complexity.",
      options: [
        { id: 'front', label: 'Front-facing', price: 0 },
        { id: '3sided', label: '3-sided', price: 850 }
      ]
    },
    lighting: {
      label: 'Lighting',
      description: "Integrated accent lighting.\n\n• Above: Installed above TV/Fireplace.\n• Under: Below shelves/mantel.\n• Sides: Vertical accent lighting on the sides.",
      options: [
        { id: 'no-lighting', label: 'None', price: 0 },
        { id: 'above', label: 'Above', price: 250 },
        { id: 'under', label: 'Under', price: 250 },
        { id: 'sides', label: 'Sides', price: 450 }
      ]
    }
  };

  const config = siteData?.configurator || {
    basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
    groups: defaultGroups
  };

  const baseImages: Record<string, string> = {
    'media-wall': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop',
    'fireplaces': 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
    'consoles': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    'high-ceiling': 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
  };

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = { category: 'media-wall' };
    if (config.groups) {
      Object.keys(config.groups).forEach(key => {
        initial[key] = config.groups[key].options?.[0]?.id || '';
      });
    }
    return initial;
  });

  const totalPrice = useMemo(() => {
    let total = config.basePrices[selections.category as CategoryId] || 0;
    if (config.groups) {
      Object.entries(config.groups).forEach(([key, group]: [any, any]) => {
        const opt = group.options?.find((o: any) => o.id === selections[key]);
        if (opt) total += opt.price;
      });
    }
    return total;
  }, [selections, config]);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-manrope">
      <button onClick={onBack} className="fixed top-6 left-6 z-[70] bg-white/90 backdrop-blur-md p-3 rounded-full border border-wood-200 shadow-xl hover:scale-105 transition-all">
        <ChevronLeft size={20} className="text-wood-900" />
      </button>

      {/* Preview Image Section */}
      <div className="relative lg:w-[55%] h-[40vh] lg:h-screen sticky top-0 bg-wood-50 overflow-hidden shrink-0">
        <img 
          src={baseImages[selections.category] || baseImages['media-wall']} 
          alt="Preview" 
          className="w-full h-full object-cover transition-all duration-700" 
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/10 to-transparent pointer-events-none" />
      </div>

      {/* Customization Panel */}
      <div className="lg:w-[45%] h-screen overflow-y-auto scrollbar-hide px-6 md:px-12 pt-10 lg:pt-16 pb-48 bg-white border-l border-wood-100">
        <div className="max-w-lg mx-auto">
          <header className="mb-14">
            <p className="text-wood-400 text-[9px] font-black uppercase tracking-[0.3em] mb-3 opacity-60">Customizer</p>
            <h1 className="text-4xl md:text-5xl font-canale text-wood-900 uppercase tracking-tight leading-none mb-10">
              {selections.category.replace('-', ' ')}
            </h1>

            {/* Category Selector Grid */}
            <div className="grid grid-cols-2 gap-2 mb-10">
               {Object.keys(config.basePrices).map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setSelections(s => ({...s, category: cat}))} 
                  className={`py-4 px-2 text-[9px] font-bold uppercase tracking-widest border rounded-lg transition-all ${selections.category === cat ? 'bg-[#1A1816] text-white border-[#1A1816] shadow-md' : 'bg-white text-wood-400 border-wood-100 hover:border-wood-200'}`}
                 >
                   {cat.replace('-', ' ')}
                 </button>
               ))}
            </div>
          </header>

          {/* Dynamic Option Groups */}
          <div className="space-y-14 pb-10">
            {Object.entries(config.groups).map(([key, group]: [any, any]) => (
              <div key={key} className="animate-fade-in-up">
                <div className="mb-6 relative">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className="text-[14px] font-canale uppercase tracking-tight text-wood-900 leading-none">
                      {group.label}
                    </h4>
                    <button 
                      onClick={() => setActiveTooltip(activeTooltip === key ? null : key)} 
                      className="p-1 text-wood-300 hover:text-wood-900 transition-colors"
                      aria-label="More info"
                    >
                      <Info size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                  
                  {activeTooltip === key && (
                    <Tooltip 
                      title={group.label} 
                      text={group.description} 
                      onClose={() => setActiveTooltip(null)} 
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {group.options?.map((opt: any) => {
                    const isSelected = selections[key] === opt.id;
                    return (
                      <button 
                        key={opt.id} 
                        onClick={() => setSelections(s => ({...s, [key]: opt.id}))} 
                        className={`w-full p-4 border rounded-lg flex justify-between items-center transition-all group ${isSelected ? 'border-wood-900 bg-white ring-1 ring-wood-900' : 'border-wood-100 hover:border-wood-200 bg-white'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${isSelected ? 'border-wood-900 bg-wood-900' : 'border-wood-200'}`}>
                            {isSelected && <Check size={10} className="text-white stroke-[3px]" />}
                          </div>
                          <span className={`text-[12px] font-bold uppercase tracking-tight text-left ${isSelected ? 'text-wood-900' : 'text-wood-400 group-hover:text-wood-600'}`}>
                            {opt.label}
                          </span>
                        </div>
                        <span className={`text-[11px] font-bold tracking-widest uppercase ${isSelected ? 'text-wood-900' : 'text-wood-300'}`}>
                          {opt.price > 0 ? `+$${opt.price}` : 'Incl.'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Total Bar */}
          <div className="fixed bottom-0 left-0 right-0 lg:left-auto lg:w-[45%] bg-white/95 backdrop-blur-xl border-t border-wood-100 py-4 px-6 md:px-10 md:py-6 z-[60] shadow-[0_-15px_50px_rgba(0,0,0,0.04)]">
             <div className="max-w-lg mx-auto flex items-center justify-between gap-6">
                <div>
                  <p className="text-[8px] font-black text-wood-400 uppercase tracking-[0.2em] mb-0.5">Estimated Total</p>
                  <h2 className="text-4xl md:text-5xl font-canale text-wood-900 leading-none tracking-tighter">${totalPrice}</h2>
                </div>
                <button className="flex-1 bg-[#1A1816] text-white h-11 px-6 rounded-lg font-black uppercase tracking-[0.2em] text-[9px] shadow-lg hover:bg-black active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Request Build <ArrowRight size={14} strokeWidth={2.5} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
