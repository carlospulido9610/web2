
import React, { useState, useMemo } from 'react';
import { ChevronLeft, Check, ArrowRight, Info } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplaces' | 'consoles' | 'high-ceiling';

interface Option {
  id: string;
  label: string;
  description?: string;
  price: number;
  enabled: boolean;
  image?: string;
}

interface ConfigData {
  basePrices: Record<CategoryId, number>;
  baseImages: Record<CategoryId, string>;
  options: {
    wallHeight: Option[];
    tvSize: Option[];
    tvPlacement: Option[];
    mantel: Option[];
    soundbar: Option[];
    lighting: Option[];
  };
}

const INITIAL_DATA: ConfigData = {
  basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
  baseImages: {
    'media-wall': 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop',
    'fireplaces': 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
    'consoles': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    'high-ceiling': 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
  },
  options: {
    wallHeight: [
      { id: 'h8', label: '8 ft Standard', price: 0, enabled: true },
      { id: 'h10', label: '10 ft Ceiling', price: 800, enabled: true },
      { id: 'h12', label: '12 ft+ Grand', price: 1500, enabled: true, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200' },
    ],
    tvSize: [
      { id: 'tv77', label: 'Up to 77"', price: 0, enabled: true },
      { id: 'tv85', label: '85" XL Display', price: 700, enabled: true },
      { id: 'tv100', label: '100" Cinema', price: 1800, enabled: true },
    ],
    tvPlacement: [
      { id: 'surface', label: 'Surface Mount', price: 0, enabled: true },
      { id: 'recessed', label: 'Recessed Fit', price: 950, enabled: true },
    ],
    mantel: [
      { id: 'no-mantel', label: 'Standard (No Mantel)', price: 0, enabled: true },
      { id: 'premium', label: 'Integrated Luxe Mantel', price: 850, enabled: true },
    ],
    soundbar: [
      { id: 'no-sb', label: 'Standard Audio', price: 0, enabled: true },
      { id: 'integrated', label: 'Integrated Soundbar Niche', price: 600, enabled: true },
    ],
    lighting: [
      { id: 'standard', label: 'No Extra Lighting', price: 0, enabled: true },
      { id: 'ambient', label: 'Ambient LED System', price: 450, enabled: true },
    ]
  }
};

export const Configurator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [config] = useState<ConfigData>(() => {
    const saved = localStorage.getItem('raval_config');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [selections, setSelections] = useState({
    category: 'media-wall' as CategoryId,
    wallHeight: 'h8',
    tvSize: 'tv77',
    tvPlacement: 'surface',
    mantel: 'no-mantel',
    soundbar: 'no-sb',
    lighting: 'standard',
  });

  const currentPreviewImage = useMemo(() => {
    const heightOpt = config.options.wallHeight.find(o => o.id === selections.wallHeight);
    if (heightOpt?.image) return heightOpt.image;
    return config.baseImages[selections.category];
  }, [selections, config]);

  const totalPrice = useMemo(() => {
    let total = config.basePrices[selections.category];
    const keys = ['wallHeight', 'tvSize', 'tvPlacement', 'mantel', 'soundbar', 'lighting'] as const;
    keys.forEach(k => {
      const opt = config.options[k].find(o => o.id === selections[k]);
      if (opt) total += opt.price;
    });
    return total;
  }, [selections, config]);

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-manrope">
      {/* Botón Flotante para Volver */}
      <button 
        onClick={onBack} 
        className="fixed top-6 left-6 z-[60] bg-white p-3 rounded-full border border-wood-200 shadow-sm hover:bg-wood-50 transition-all"
      >
        <ChevronLeft size={20} className="text-wood-900" />
      </button>

      {/* PARTE IZQUIERDA: VISUALIZADOR DE PRODUCTO */}
      <div className="lg:w-[60%] h-[45vh] lg:h-screen sticky top-0 bg-wood-50 overflow-hidden">
        <img 
          src={currentPreviewImage} 
          alt="Preview" 
          className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
          key={currentPreviewImage}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>

      {/* PARTE DERECHA: PANEL DE CONFIGURACIÓN */}
      <div className="lg:w-[40%] h-screen overflow-y-auto scrollbar-hide px-6 md:px-12 pt-20 pb-48 border-l border-wood-100 bg-white">
        <div className="max-w-md mx-auto">
          <header className="mb-10">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-wood-400 mb-2">Build Your</h2>
            <h1 className="text-4xl md:text-5xl font-canale text-wood-900 uppercase tracking-tight leading-none">
              {selections.category.replace('-', ' ')}
            </h1>
          </header>

          {/* Selector de Categoría Principal */}
          <div className="mb-12">
            <div className="grid grid-cols-2 gap-2">
               {(['media-wall', 'fireplaces', 'consoles', 'high-ceiling'] as CategoryId[]).map(cat => (
                 <button 
                  key={cat} 
                  onClick={() => setSelections(s => ({...s, category: cat}))}
                  className={`py-3 px-2 text-[9px] font-black uppercase tracking-widest border rounded-md transition-all ${selections.category === cat ? 'bg-wood-900 text-white border-wood-900 shadow-md' : 'text-wood-400 border-wood-100 hover:border-wood-300'}`}
                 >
                   {cat.replace('-', ' ')}
                 </button>
               ))}
            </div>
          </div>

          <div className="h-px bg-wood-100 my-10" />

          {/* Opciones de Configuración */}
          {(Object.entries(config.options) as [string, Option[]][]).map(([key, opts]) => {
            // Saltamos 'finish' ya que el usuario pidió quitarlo
            if (key === 'finish') return null;
            
            return (
              <div key={key} className="mb-10 animate-fade-in-up">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-wood-400">
                    {key.replace(/([A-Z])/g, ' $1')}
                  </h4>
                  <Info size={14} className="text-wood-200" />
                </div>
                <div className="space-y-2">
                  {opts.filter(o => o.enabled).map(opt => {
                    const isSelected = selections[key as keyof typeof selections] === opt.id;
                    return (
                      <button 
                        key={opt.id} 
                        onClick={() => setSelections(s => ({...s, [key]: opt.id}))}
                        className={`w-full p-5 border rounded-lg flex justify-between items-center transition-all ${isSelected ? 'border-wood-900 bg-wood-50 shadow-sm' : 'border-wood-100 hover:border-wood-200 text-wood-500'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-wood-900 bg-wood-900' : 'border-wood-200'}`}>
                            {isSelected && <Check size={10} className="text-white" />}
                          </div>
                          <span className={`text-xs font-bold uppercase tracking-tight ${isSelected ? 'text-wood-900' : 'text-wood-400'}`}>
                            {opt.label}
                          </span>
                        </div>
                        <span className={`text-xs font-canale ${isSelected ? 'text-wood-900' : 'text-wood-300'}`}>
                          {opt.price > 0 ? `+$${opt.price}` : 'Incl.'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Footer del Panel (Sticky) */}
          <div className="fixed bottom-0 right-0 lg:w-[40%] bg-white/95 backdrop-blur-md border-t border-wood-100 p-6 md:p-8 z-50">
             <div className="max-w-md mx-auto flex items-center justify-between gap-8">
                <div>
                  <p className="text-[9px] font-black text-wood-400 uppercase tracking-widest mb-1">Estimated Total</p>
                  <h2 className="text-4xl md:text-5xl font-canale text-wood-900 leading-none">${totalPrice}</h2>
                </div>
                <button className="flex-1 bg-wood-900 text-white py-5 px-6 rounded-md font-black uppercase tracking-[0.15em] text-[10px] shadow-2xl hover:bg-wood-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                  Book Visit <ArrowRight size={14} />
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
