
import React, { useState } from 'react';
import { Save, ChevronLeft, ShieldCheck, Image as ImageIcon } from 'lucide-react';

type CategoryId = 'media-wall' | 'fireplaces' | 'consoles' | 'high-ceiling';

interface Option {
  id: string;
  label: string;
  price: number;
  enabled: boolean;
  image?: string;
}

interface ConfigData {
  basePrices: Record<CategoryId, number>;
  baseImages: Record<CategoryId, string>;
  options: Record<string, Option[]>;
}

const INITIAL_DATA: ConfigData = {
  basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
  baseImages: {
    'media-wall': 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    'fireplaces': 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
    'consoles': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    'high-ceiling': 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
  },
  options: {
    wallHeight: [
      { id: 'h8', label: '8 ft', price: 0, enabled: true },
      { id: 'h12', label: '12 ft+', price: 1500, enabled: true, image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200' },
    ],
    tvSize: [
      { id: 'tv77', label: 'Up to 77"', price: 0, enabled: true },
      { id: 'tv100', label: '100"+', price: 1400, enabled: true },
    ],
    tvPlacement: [
      { id: 'surface', label: 'Outside', price: 0, enabled: true },
      { id: 'recessed', label: 'Recessed', price: 950, enabled: true },
    ],
    mantel: [
      { id: 'no-mantel', label: 'No mantel', price: 0, enabled: true },
      { id: 'storage-mantel', label: 'Storage mantel', price: 850, enabled: true },
    ],
    soundbar: [
      { id: 'no-sb', label: 'No soundbar', price: 0, enabled: true },
      { id: 'built-in-sb', label: 'Built-in', price: 600, enabled: true },
    ],
    fireplaceType: [
      { id: 'front', label: 'Regular', price: 0, enabled: true },
      { id: '3side', label: '3-sided', price: 850, enabled: true },
    ],
    lighting: [
      { id: 'above', label: 'Above', price: 250, enabled: true },
      { id: 'under', label: 'Under', price: 250, enabled: true },
    ]
  }
};

export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [config, setConfig] = useState<ConfigData>(() => {
    const saved = localStorage.getItem('raval_config');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const save = () => {
    localStorage.setItem('raval_config', JSON.stringify(config));
    alert('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-wood-50 p-6 md:p-12 lg:p-20 font-manrope">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16 animate-fade-in-up">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 bg-white border border-wood-200 rounded-full hover:bg-wood-100 transition-colors shadow-sm">
              <ChevronLeft size={24} />
            </button>
            <div>
              <div className="flex items-center gap-2 text-wood-900 mb-1">
                <ShieldCheck size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Admin Command Center</span>
              </div>
              <h1 className="text-4xl font-canale uppercase">Raval Master Controls</h1>
            </div>
          </div>
          <button onClick={save} className="bg-green-600 text-white px-10 py-5 rounded-sm font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl hover:bg-green-700 transition-all">
            <Save size={18} /> Save All Changes
          </button>
        </header>

        <section className="bg-white border border-wood-100 p-10 rounded-sm shadow-sm mb-12">
          <h2 className="text-2xl font-canale uppercase mb-8 border-b pb-4">Category Fundamentals</h2>
          <div className="space-y-8">
            {(Object.keys(config.basePrices) as CategoryId[]).map(cat => (
              <div key={cat} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-b border-wood-50 pb-8 last:border-0">
                <div className="md:col-span-3">
                  <span className="text-[10px] font-black uppercase text-wood-400 block mb-2">{cat.replace('-', ' ')}</span>
                  <div className="flex items-center">
                    <span className="bg-wood-100 border border-r-0 border-wood-200 px-4 py-3 text-wood-500 font-bold">$</span>
                    <input type="number" value={config.basePrices[cat]} onChange={e => setConfig({...config, basePrices: {...config.basePrices, [cat]: parseInt(e.target.value) || 0}})}
                      className="w-full border border-wood-200 p-3 font-bold text-wood-900 focus:border-wood-900 outline-none" />
                  </div>
                </div>
                <div className="md:col-span-9">
                  <span className="text-[10px] font-black uppercase text-wood-400 block mb-2">Base Preview Image URL</span>
                  <div className="flex items-center gap-3">
                    <ImageIcon size={20} className="text-wood-300 shrink-0" />
                    <input type="text" value={config.baseImages[cat]} onChange={e => setConfig({...config, baseImages: {...config.baseImages, [cat]: e.target.value}})}
                      className="w-full border border-wood-200 p-3 text-xs font-mono bg-wood-50 focus:bg-white transition-colors outline-none" />
                    {config.baseImages[cat] && <img src={config.baseImages[cat]} alt="preview" className="w-12 h-12 object-cover border border-wood-200 rounded-sm" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-8">
          {(Object.entries(config.options) as [string, Option[]][]).map(([groupKey, opts]) => (
            <section key={groupKey} className="bg-white border border-wood-100 p-10 rounded-sm shadow-sm">
              <h2 className="text-2xl font-canale uppercase mb-8 border-b pb-4">{groupKey.replace(/([A-Z])/g, ' $1')}</h2>
              <div className="space-y-6">
                {opts.map((opt, idx) => (
                  <div key={opt.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-wood-50 pb-6 last:border-0">
                    <div className="md:col-span-3">
                      <span className="text-[10px] font-black uppercase text-wood-400 block">Label</span>
                      <span className="font-bold text-wood-900">{opt.label}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-[10px] font-black uppercase text-wood-400 block">Price Offset</span>
                      <input type="number" value={opt.price} onChange={e => {
                        const newOpts = [...opts];
                        newOpts[idx] = {...opt, price: parseInt(e.target.value) || 0};
                        setConfig({...config, options: {...config.options, [groupKey]: newOpts}});
                      }} className="w-full border-b border-wood-200 p-2 font-bold outline-none focus:border-wood-900" />
                    </div>
                    <div className="md:col-span-5">
                      <span className="text-[10px] font-black uppercase text-wood-400 block">Override Image URL (Layer)</span>
                      <input type="text" value={opt.image || ''} placeholder="Leave empty for base image" onChange={e => {
                        const newOpts = [...opts];
                        newOpts[idx] = {...opt, image: e.target.value};
                        setConfig({...config, options: {...config.options, [groupKey]: newOpts}});
                      }} className="w-full text-[10px] border-b border-wood-200 p-2 outline-none font-mono" />
                    </div>
                    <div className="md:col-span-2 flex justify-end">
                      <button onClick={() => {
                        const newOpts = [...opts];
                        newOpts[idx] = {...opt, enabled: !opt.enabled};
                        setConfig({...config, options: {...config.options, [groupKey]: newOpts}});
                      }} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all ${opt.enabled ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {opt.enabled ? 'Enabled' : 'Disabled'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
