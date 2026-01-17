
import React, { useState, useEffect } from 'react';
import { Save, ChevronLeft, ShieldCheck, Layout, Settings, MessageSquare, Plus, Trash2, Globe, Edit3, CheckCircle2, Grid } from 'lucide-react';
import { ConfiguratorData, Model } from '../types';

type Tab = 'models' | 'configurator' | 'hero' | 'reviews' | 'general';

const INITIAL_MODELS: Model[] = [
    { id: 'mw-1', name: 'The Floating Oak', category: 'media-wall', basePrice: 4500, description: 'Minimalist floating console with integrated LED lighting and acoustic slat backing.', image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1200' },
    { id: 'mw-2', name: 'Cinema Suite', category: 'media-wall', basePrice: 6200, description: 'Full wall integration with hidden storage, soundbar niche, and ambient backlighting.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200' },
    { id: 'fp-1', name: 'Modern Linear', category: 'fireplaces', basePrice: 3800, description: 'Sleek panoramic electric fireplace insert with micro-cement finish surround.', image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200' },
    { id: 'cn-1', name: 'Minimalist Entry', category: 'consoles', basePrice: 2400, description: 'Slim profile entry console with premium wood finish and cable management.', image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200' },
    { id: 'hc-1', name: 'The Cathedral', category: 'high-ceiling', basePrice: 8500, description: 'Grand scale joinery designed specifically for double-height voids.', image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200' }
];

const INITIAL_GROUPS = {
      wallHeight: {
        label: 'Wall Height',
        description: 'Defines the total height of the media wall from floor to ceiling. Exact measurements will be verified by our team.',
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
        description: 'Affects the overall width and internal structure of the media wall.',
        options: [
          { id: 'tv77', label: 'Up to 77"', price: 0 },
          { id: 'tv85', label: '85"–87" (Reinforced)', price: 450 },
          { id: 'tv100', label: '100" and above (Custom)', price: 1200 }
        ]
      },
      tvPlacement: {
        label: 'TV Placement',
        description: 'How the TV is visually integrated into the media wall.',
        options: [
          { id: 'surface', label: 'Outside (Surface mounted)', price: 0 },
          { id: 'recessed', label: 'Recessed (Flush / Integrated)', price: 650 }
        ]
      },
      mantel: {
        label: 'Mantel',
        description: 'Decorative and functional shelf above the fireplace.',
        options: [
          { id: 'no-mantel', label: 'No mantel', price: 0 },
          { id: 'regular-mantel', label: 'Regular mantel', price: 350 },
          { id: 'storage-mantel', label: 'Storage mantel', price: 750 }
        ]
      },
      soundbar: {
        label: 'Soundbar',
        description: 'How the sound system is incorporated into the design.',
        options: [
          { id: 'no-soundbar', label: 'No soundbar', price: 0 },
          { id: 'on-mantel', label: 'On the mantel', price: 150 },
          { id: 'floating', label: 'Floating', price: 250 },
          { id: 'inserted', label: 'Inserted (Built-in)', price: 450 }
        ]
      },
      fireplaceType: {
        label: 'Fireplace Type',
        description: 'Defines the style and visual depth of the fireplace.',
        options: [
          { id: 'front', label: 'Regular (Front-facing)', price: 0 },
          { id: '3sided', label: '3-sided', price: 850 }
        ]
      },
      lighting: {
        label: 'Lighting',
        description: 'Integrated lighting to enhance depth and materials.',
        options: [
          { id: 'no-lighting', label: 'None', price: 0 },
          { id: 'above', label: 'Above', price: 250 },
          { id: 'under', label: 'Under', price: 250 },
          { id: 'sides', label: 'Sides', price: 450 }
        ]
      }
};

const INITIAL_DATA = {
  hero: {
    title: "Custom Media Walls & built-in rooms",
    subtitle: "Designed to move beyond builder-grade",
    bgImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop"
  },
  reviews: [
    { id: 1, name: 'Sarah Jenkins', role: 'Homeowner', quote: "It completely changed the vibe of our living room.", videoThumbnail: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=1200' },
    { id: 2, name: 'Mark & David', role: 'Condo Renovation', quote: "We were worried about the mess, but they installed everything in one day.", videoThumbnail: 'https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?auto=format&fit=crop&q=80&w=1200' }
  ],
  configurator: {
    models: INITIAL_MODELS,
    basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
    groups: INITIAL_GROUPS
  }
};

export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('models');
  const [data, setData] = useState<any>(() => {
    const saved = localStorage.getItem('raval_site_data');
    const parsed = saved ? JSON.parse(saved) : null;
    // Merge new initial structure if old data exists
    if (parsed && !parsed.configurator.models) {
        return { 
            ...parsed, 
            configurator: { 
                ...parsed.configurator, 
                models: INITIAL_MODELS, 
                groups: parsed.configurator.groups || INITIAL_GROUPS 
            } 
        };
    }
    return parsed || INITIAL_DATA;
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSave = () => {
    localStorage.setItem('raval_site_data', JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('site-data-updated'));
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const addOption = (groupId: string) => {
    const newId = `opt-${Date.now()}`;
    const newData = { ...data };
    newData.configurator.groups[groupId].options.push({
      id: newId,
      label: 'New Option',
      price: 0
    });
    setData(newData);
  };

  const removeOption = (groupId: string, optIndex: number) => {
    const newData = { ...data };
    newData.configurator.groups[groupId].options.splice(optIndex, 1);
    setData(newData);
  };

  const addModel = () => {
    const newModel: Model = {
        id: `m-${Date.now()}`,
        name: 'New Model',
        category: 'media-wall',
        basePrice: 5000,
        description: 'Description here...',
        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=600'
    };
    const newData = { ...data };
    newData.configurator.models.push(newModel);
    setData(newData);
  };

  const removeModel = (index: number) => {
    const newData = { ...data };
    newData.configurator.models.splice(index, 1);
    setData(newData);
  };

  const updateModel = (index: number, field: keyof Model, value: any) => {
    const newData = { ...data };
    newData.configurator.models[index][field] = value;
    setData(newData);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col font-manrope">
      <div className="flex flex-1">
        <aside className="w-64 bg-wood-900 text-white flex flex-col p-6 sticky top-0 h-screen overflow-y-auto z-40">
          <div className="flex items-center gap-3 mb-12 shrink-0">
            <ShieldCheck className="text-wood-400" />
            <h1 className="font-canale text-2xl uppercase tracking-tight">Raval Admin</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {[
                { id: 'models', label: 'Models Gallery', icon: Grid },
                { id: 'configurator', label: 'Options Logic', icon: Settings }, 
                { id: 'hero', label: 'Hero Content', icon: Layout }, 
                { id: 'reviews', label: 'Reviews', icon: MessageSquare }, 
                { id: 'general', label: 'Settings', icon: Globe }
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id as Tab)} className={`flex items-center gap-3 px-4 py-3 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/10 text-white shadow-inner' : 'text-wood-500 hover:text-white'}`}>
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6 border-t border-wood-800">
            <button onClick={onBack} className="flex items-center gap-2 text-wood-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest">
              <ChevronLeft size={14} /> Exit CMS
            </button>
          </div>
        </aside>

        <main className="flex-1 p-8 md:p-16 max-w-5xl overflow-y-auto relative">
          <header className="flex justify-between items-center mb-12 sticky top-0 bg-[#F8F7F4]/90 backdrop-blur-md z-30 py-4 border-b border-wood-200/50">
            <div>
              <h2 className="text-4xl font-canale uppercase text-wood-900 leading-none">{activeTab}</h2>
              <p className="text-wood-400 text-[10px] font-black uppercase tracking-widest mt-1">Full Content Management</p>
            </div>
            <div className="flex items-center gap-4">
              {showSuccess && <span className="text-green-600 text-[10px] font-black uppercase flex items-center gap-2 animate-fade-in-up"><CheckCircle2 size={14}/> Site Updated!</span>}
              <button onClick={handleSave} className="bg-wood-900 text-white px-8 py-4 rounded-sm flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </header>

          <div className="space-y-12 pb-20">
            
            {activeTab === 'models' && (
                <section className="space-y-8">
                    <div className="flex justify-between items-center">
                        <h3 className="text-[12px] font-black uppercase tracking-widest text-wood-900">Manage Models</h3>
                        <button onClick={addModel} className="flex items-center gap-2 bg-wood-200 hover:bg-wood-300 text-wood-900 px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-colors">
                            <Plus size={14} /> Add New Model
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        {data.configurator.models.map((model: Model, index: number) => (
                            <div key={model.id} className="bg-white border border-wood-100 rounded-sm p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                                <div className="w-full md:w-32 aspect-square bg-wood-100 shrink-0 rounded-sm overflow-hidden border border-wood-200">
                                    <img src={model.image} alt={model.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 space-y-4 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-wood-400 mb-1">Model Name</label>
                                            <input className="w-full border border-wood-200 p-2 text-sm font-bold" value={model.name} onChange={e => updateModel(index, 'name', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-wood-400 mb-1">Category</label>
                                            <select className="w-full border border-wood-200 p-2 text-sm" value={model.category} onChange={e => updateModel(index, 'category', e.target.value)}>
                                                <option value="media-wall">Media Wall</option>
                                                <option value="fireplaces">Fireplaces</option>
                                                <option value="consoles">Consoles</option>
                                                <option value="high-ceiling">High Ceiling</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-wood-400 mb-1">Base Price ($)</label>
                                            <input type="number" className="w-full border border-wood-200 p-2 text-sm font-bold" value={model.basePrice} onChange={e => updateModel(index, 'basePrice', parseInt(e.target.value) || 0)} />
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold uppercase text-wood-400 mb-1">Image URL</label>
                                            <input className="w-full border border-wood-200 p-2 text-xs" value={model.image} onChange={e => updateModel(index, 'image', e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                         <label className="block text-[9px] font-bold uppercase text-wood-400 mb-1">Description</label>
                                         <textarea className="w-full border border-wood-200 p-2 text-xs" rows={2} value={model.description} onChange={e => updateModel(index, 'description', e.target.value)} />
                                    </div>
                                </div>
                                <button onClick={() => removeModel(index)} className="p-2 text-red-300 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {activeTab === 'configurator' && (
              <div className="space-y-10">
                <section className="space-y-6">
                  {Object.entries(data.configurator.groups).map(([groupId, group]: [string, any]) => (
                    <div key={groupId} className="bg-white border border-wood-100 rounded-sm shadow-sm">
                      <div className="bg-wood-50 px-8 py-4 border-b border-wood-100 flex justify-between items-center">
                        <h4 className="font-canale text-xl text-wood-900 uppercase">{group.label}</h4>
                      </div>
                      <div className="p-8 space-y-4">
                        <textarea className="w-full border border-wood-100 p-3 text-xs mb-4" rows={2} value={group.description} onChange={e => {
                          const newData = {...data};
                          newData.configurator.groups[groupId].description = e.target.value;
                          setData(newData);
                        }} />
                        <div className="space-y-2">
                          {group.options.map((opt: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-3">
                              <input className="flex-1 border border-wood-100 p-2 text-xs font-bold" value={opt.label} onChange={e => {
                                const newData = {...data};
                                newData.configurator.groups[groupId].options[idx].label = e.target.value;
                                setData(newData);
                              }} />
                              <div className="flex items-center w-32">
                                <span className="bg-wood-50 border border-wood-100 p-2 text-[10px] font-black">$</span>
                                <input type="number" className="w-full border border-wood-100 p-2 text-xs font-black" value={opt.price} onChange={e => {
                                  const newData = {...data};
                                  newData.configurator.groups[groupId].options[idx].price = parseInt(e.target.value) || 0;
                                  setData(newData);
                                }} />
                              </div>
                              <button onClick={() => removeOption(groupId, idx)} className="text-red-300 hover:text-red-600"><Trash2 size={14} /></button>
                            </div>
                          ))}
                          <button onClick={() => addOption(groupId)} className="w-full py-3 border border-dashed border-wood-200 text-wood-300 hover:text-wood-500 text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2"><Plus size={14}/> Add option</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>
              </div>
            )}
            
            {(activeTab === 'hero' || activeTab === 'reviews' || activeTab === 'general') && (
                <div className="flex items-center justify-center h-64 text-wood-400 font-canale text-2xl uppercase">
                    Settings for {activeTab}
                </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
