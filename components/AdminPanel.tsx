
import React, { useState, useEffect } from 'react';
import { Save, ChevronLeft, ShieldCheck, Layout, Settings, MessageSquare, Plus, Trash2, Globe, Edit3, CheckCircle2 } from 'lucide-react';

type Tab = 'configurator' | 'hero' | 'reviews' | 'general';

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
    basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
    groups: {
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
    }
  }
};

export const AdminPanel: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<Tab>('configurator');
  const [data, setData] = useState<any>(() => {
    const saved = localStorage.getItem('raval_site_data');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
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

  return (
    <div className="min-h-screen bg-[#F8F7F4] flex flex-col font-manrope">
      <div className="flex flex-1">
        <aside className="w-64 bg-wood-900 text-white flex flex-col p-6 sticky top-0 h-screen">
          <div className="flex items-center gap-3 mb-12">
            <ShieldCheck className="text-wood-400" />
            <h1 className="font-canale text-2xl uppercase tracking-tight">Raval Admin</h1>
          </div>
          <nav className="flex flex-col gap-2">
            {[{ id: 'configurator', label: 'Configurator', icon: Settings }, { id: 'hero', label: 'Hero Content', icon: Layout }, { id: 'reviews', label: 'Reviews', icon: MessageSquare }, { id: 'general', label: 'Settings', icon: Globe }].map(tab => (
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

        <main className="flex-1 p-8 md:p-16 max-w-5xl overflow-y-auto">
          <header className="flex justify-between items-center mb-12 sticky top-0 bg-[#F8F7F4]/80 backdrop-blur-md z-20 py-4">
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

          <div className="space-y-12">
            {activeTab === 'configurator' && (
              <div className="space-y-10">
                <section className="bg-white p-8 border border-wood-100 rounded-sm shadow-sm">
                  <h3 className="text-[12px] font-black uppercase tracking-widest text-wood-900 mb-6 border-b pb-4">Base Category Pricing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(data.configurator.basePrices).map(([cat, price]: [any, any]) => (
                      <div key={cat}>
                        <label className="block text-[10px] font-bold uppercase text-wood-400 mb-1">{cat.replace('-', ' ')}</label>
                        <div className="flex">
                          <span className="bg-wood-50 border border-r-0 border-wood-200 px-4 py-3 font-bold text-wood-400">$</span>
                          <input type="number" className="w-full border border-wood-200 p-3 font-black" value={price} onChange={e => {
                            const newPrices = {...data.configurator.basePrices, [cat]: parseInt(e.target.value) || 0};
                            setData({...data, configurator: {...data.configurator, basePrices: newPrices}});
                          }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

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
            {/* Omitidas otras tabs para brevedad, se mantienen igual */}
          </div>
        </main>
      </div>
    </div>
  );
};
