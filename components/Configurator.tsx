
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, Info, X, ArrowRight, ArrowLeft, Check, Ruler, Monitor, Layers, Minus, Speaker, Flame, Lightbulb, CheckCircle2, Circle, Square, CheckSquare, Edit2 } from 'lucide-react';
import { Model, ConfiguratorData, OptionGroup } from '../types';

interface ConfiguratorProps {
  model: Model;
  optionsData: ConfiguratorData;
  onBack: () => void;
}

// Fixed step order as per requirements
const STEP_DEFINTIONS = [
  { key: 'wallHeight', title: 'Wall Height', icon: Ruler },
  { key: 'tvSize', title: 'TV Size', icon: Monitor },
  { key: 'tvPlacement', title: 'TV Placement', icon: Layers },
  { key: 'mantel', title: 'Mantel', icon: Minus },
  { key: 'soundbar', title: 'Soundbar', icon: Speaker },
  { key: 'fireplaceType', title: 'Fireplace Type', icon: Flame },
  { key: 'lighting', title: 'Lighting', icon: Lightbulb, multi: true },
];

export const Configurator: React.FC<ConfiguratorProps> = ({ model, optionsData, onBack }) => {
  // --- State ---
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selections, setSelections] = useState<Record<string, string | string[]>>({});
  const [isSummary, setIsSummary] = useState(false);
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  
  // Quote Form State
  const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '' });
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [quoteRefId, setQuoteRefId] = useState('');

  // Scroll to top on step change
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Calculate dynamic steps based on available data
  const steps = useMemo(() => {
    // Filter definitions to only include groups that exist in optionsData
    const ordered = STEP_DEFINTIONS.filter(def => optionsData.groups[def.key]);
    
    // Add any extra groups from optionsData that aren't in the fixed list (fallback)
    const extraKeys = Object.keys(optionsData.groups).filter(k => !STEP_DEFINTIONS.find(d => d.key === k));
    const extras = extraKeys.map(key => ({ key, title: optionsData.groups[key].label, icon: Check, multi: false }));
    
    return [...ordered, ...extras];
  }, [optionsData]);

  const currentStep = steps[currentStepIndex];
  const currentGroup = currentStep ? (optionsData.groups[currentStep.key] as OptionGroup) : null;

  // Initialize defaults (only for single-select steps)
  useEffect(() => {
    const initial: Record<string, string | string[]> = {};
    steps.forEach(step => {
      if (!step.multi) {
        // Default to first option for single select if exists
        const group = optionsData.groups[step.key];
        if (group && group.options.length > 0) {
           initial[step.key] = group.options[0].id;
        }
      } else {
        // Default to empty array for multi select
        initial[step.key] = [];
      }
    });
    // Only set defaults if selections are empty to prevent overwriting during navigation
    setSelections(prev => Object.keys(prev).length === 0 ? initial : prev);
  }, [optionsData, steps]);

  useEffect(() => {
    if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStepIndex, isSummary]);

  // --- Calculations ---
  const { total, breakdown } = useMemo(() => {
    let total = model.basePrice;
    const items: { label: string; price: number; group: string; stepIndex: number }[] = [];
    
    Object.entries(selections).forEach(([key, value]) => {
      const group = optionsData.groups[key];
      const stepIdx = steps.findIndex(s => s.key === key);
      if (!group) return;

      if (Array.isArray(value)) {
        // Multi-select
        value.forEach(optId => {
            const opt = group.options.find(o => o.id === optId);
            if (opt) {
                total += opt.price;
                if (opt.price > 0) items.push({ label: opt.label, price: opt.price, group: group.label, stepIndex: stepIdx });
            }
        });
      } else {
        // Single-select
        const opt = group.options.find(o => o.id === value);
        if (opt) {
            total += opt.price;
            if (opt.price > 0) items.push({ label: opt.label, price: opt.price, group: group.label, stepIndex: stepIdx });
        }
      }
    });
    return { total, breakdown: items };
  }, [selections, model, optionsData, steps]);

  // --- Handlers ---
  const handleOptionSelect = (optionId: string) => {
    if (!currentStep) return;

    if (currentStep.multi) {
      setSelections(prev => {
        const current = (prev[currentStep.key] as string[]) || [];
        if (current.includes(optionId)) {
          return { ...prev, [currentStep.key]: current.filter(id => id !== optionId) };
        } else {
          return { ...prev, [currentStep.key]: [...current, optionId] };
        }
      });
    } else {
      setSelections(prev => ({ ...prev, [currentStep.key]: optionId }));
    }
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsSummary(true);
    }
  };

  // Navigates backwards within the configurator steps
  const handleStepBack = () => {
    if (isSummary) {
      setIsSummary(false);
    } else if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleEditStep = (index: number) => {
    setCurrentStepIndex(index);
    setIsSummary(false);
  };

  const handleRequestQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `RVL-${Math.floor(1000 + Math.random() * 9000)}`;
    setQuoteRefId(refId);
    // Simulate API call
    setTimeout(() => {
        setQuoteSubmitted(true);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
    }, 1500);
  };

  // --- Render Helpers ---
  const renderOptionCard = (option: any, isSelected: boolean, isMulti: boolean) => (
    <button
        key={option.id}
        onClick={() => handleOptionSelect(option.id)}
        className={`w-full flex items-center justify-between px-4 py-3 md:py-4 mb-2 rounded-lg border-2 transition-all duration-200 group text-left relative overflow-hidden ${
            isSelected 
            ? 'border-wood-900 bg-wood-50' 
            : 'border-wood-100 bg-white hover:border-wood-300'
        }`}
    >
        <div className="flex-1 flex flex-col items-start justify-center pr-4">
            <span className={`block text-sm md:text-base font-bold font-manrope uppercase tracking-wide leading-tight ${isSelected ? 'text-wood-900' : 'text-wood-700'}`}>
                {option.label}
            </span>
            <span className={`text-[10px] md:text-xs font-medium mt-0.5 ${isSelected ? 'text-wood-500' : 'text-wood-400'}`}>
                {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
            </span>
        </div>

        <div className={`transition-all duration-200 shrink-0 ${isSelected ? 'text-wood-900' : 'text-wood-200 group-hover:text-wood-300'}`}>
            {isMulti ? (
                isSelected ? <CheckSquare size={22} strokeWidth={2} /> : <Square size={22} strokeWidth={1.5} />
            ) : (
                // Using a more minimal radio circle for the "Tesla/Apple" feel
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-wood-900' : 'border-current'}`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-wood-900" />}
                </div>
            )}
        </div>
    </button>
  );

  return (
    <div className="fixed inset-0 z-[60] bg-wood-50 flex flex-col font-manrope">
      
      {/* --- DESKTOP HEADER (Hidden on Mobile) --- */}
      <div className="hidden md:flex shrink-0 h-16 bg-white/90 backdrop-blur-md border-b border-wood-100 items-center justify-between px-8 z-50">
        <button onClick={onBack} className="p-2 -ml-2 text-wood-500 hover:text-wood-900 transition-colors">
            <ChevronLeft size={24} />
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-wood-900">{model.name}</span>
        <span className="text-[9px] font-bold text-wood-400">Step {currentStepIndex + 1} of {steps.length}</span>
      </div>

      {/* --- MAIN CONTENT SPLIT --- */}
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        
        {/* LEFT/TOP: HERO IMAGE */}
        {/* Mobile: Immersive top area. Desktop: Left split. */}
        <div className={`relative bg-wood-100 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${isSummary ? 'hidden md:block md:w-1/3' : 'h-[40vh] md:h-full md:w-1/2'}`}>
             
             {/* Mobile EXIT Button (Floating) - Now calls onBack (Exit) */}
             <button 
                onClick={onBack} 
                className="md:hidden absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg active:scale-95 transition-transform"
             >
                <ChevronLeft size={24} />
             </button>

             <img 
                src={model.image} 
                alt={model.name} 
                className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-wood-50 via-transparent to-black/20 opacity-80 md:opacity-10"></div>
             
             {/* Mobile Step Dots - Floating */}
             {!isSummary && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center md:hidden z-10">
                    <div className="flex gap-1.5 bg-black/20 backdrop-blur-lg px-3 py-1.5 rounded-full shadow-sm border border-white/10">
                        {steps.map((_, idx) => (
                            <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentStepIndex ? 'w-4 bg-white' : 'w-1 bg-white/40'}`} />
                        ))}
                    </div>
                </div>
             )}
        </div>

        {/* RIGHT/BOTTOM: STEPS */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto bg-wood-50 relative w-full scroll-smooth rounded-t-3xl md:rounded-none -mt-4 md:mt-0 z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] md:shadow-none">
            
            {/* CONFIGURATION STEPS */}
            {!isSummary && currentGroup && (
                <div className="p-6 md:p-12 pb-32 max-w-xl mx-auto min-h-full flex flex-col pt-8 md:pt-12">
                    
                    {/* Desktop Progress Bar */}
                    <div className="hidden md:flex items-center gap-4 mb-10 text-[10px] font-black uppercase tracking-widest text-wood-300">
                        <span>Configuration</span>
                        <div className="flex-1 h-px bg-wood-200 rounded-full overflow-hidden">
                            <div className="h-full bg-wood-900 transition-all duration-500 ease-out" style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}></div>
                        </div>
                    </div>

                    {/* Step Header */}
                    <div className="mb-6 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3 text-wood-900">
                                {currentStep.icon && <currentStep.icon size={20} strokeWidth={1.5} className="md:w-6 md:h-6" />}
                                <h2 className="text-2xl md:text-3xl font-canale uppercase tracking-tight">{currentGroup.label}</h2>
                            </div>
                            <button 
                                onClick={() => setActiveInfo(currentGroup.description)}
                                className="text-wood-300 hover:text-wood-600 transition-colors p-2 -mr-2"
                            >
                                <Info size={18} />
                            </button>
                        </div>
                        <p className="text-xs md:text-sm text-wood-500 font-medium leading-relaxed line-clamp-2 md:line-clamp-none">
                            {currentGroup.description}
                        </p>
                    </div>

                    {/* Options Grid */}
                    <div className="space-y-0 animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
                        {currentGroup.options.map((option) => {
                            const isSelected = currentStep.multi 
                                ? (selections[currentStep.key] as string[]).includes(option.id)
                                : selections[currentStep.key] === option.id;
                            
                            return renderOptionCard(option, isSelected, !!currentStep.multi);
                        })}
                    </div>
                </div>
            )}

            {/* SUMMARY SCREEN */}
            {isSummary && (
                <div className="p-6 md:p-12 pb-40 max-w-2xl mx-auto animate-fade-in-up pt-12">
                    {!quoteSubmitted ? (
                        <>
                            <div className="mb-8 text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-canale uppercase tracking-tight text-wood-900 mb-2">Review</h2>
                                <p className="text-wood-500 text-xs md:text-sm">Please verify your selections.</p>
                            </div>

                            {/* Manifest Card */}
                            <div className="bg-white rounded-lg shadow-sm border border-wood-100 overflow-hidden mb-8">
                                <div className="p-6 border-b border-wood-50 bg-wood-50/30 flex justify-between items-center">
                                    <div>
                                        <h3 className="text-lg font-canale uppercase text-wood-900">{model.name}</h3>
                                        <span className="text-[10px] font-black uppercase text-wood-400 tracking-widest">Base Model</span>
                                    </div>
                                    <span className="text-sm font-bold text-wood-900">${model.basePrice.toLocaleString()}</span>
                                </div>
                                
                                <div className="divide-y divide-wood-50">
                                     {steps.map((step, idx) => {
                                         const val = selections[step.key];
                                         const group = optionsData.groups[step.key];
                                         if (!group) return null;

                                         let label = 'Default';
                                         let price = 0;
                                         
                                         if (Array.isArray(val)) {
                                             const selectedOpts = group.options.filter(o => val.includes(o.id));
                                             if (selectedOpts.length > 0) {
                                                 label = selectedOpts.map(o => o.label).join(', ');
                                                 price = selectedOpts.reduce((sum, o) => sum + o.price, 0);
                                             } else {
                                                 label = 'None';
                                             }
                                         } else {
                                             const opt = group.options.find(o => o.id === val);
                                             if (opt) {
                                                 label = opt.label;
                                                 price = opt.price;
                                             }
                                         }
                                         
                                         return (
                                             <button 
                                                key={step.key} 
                                                onClick={() => handleEditStep(idx)}
                                                className="w-full flex justify-between items-center text-left group hover:bg-wood-50 p-4 transition-colors"
                                             >
                                                 <div className="flex-1 pr-4">
                                                     <div className="flex items-center gap-2">
                                                         <span className="text-[9px] font-black uppercase text-wood-400 w-24 shrink-0">{group.label}</span>
                                                         <span className="text-xs font-bold text-wood-900 truncate">{label}</span>
                                                     </div>
                                                 </div>
                                                 <div className="flex items-center gap-2">
                                                    <span className="text-xs font-medium text-wood-600">
                                                        {price > 0 ? `+$${price.toLocaleString()}` : '—'}
                                                    </span>
                                                    <Edit2 size={10} className="text-wood-300 opacity-0 group-hover:opacity-100" />
                                                 </div>
                                             </button>
                                         );
                                     })}
                                </div>
                            </div>

                            {/* Quote Form */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold uppercase text-wood-900 mb-2">Finalize Request</h3>
                                <form onSubmit={handleRequestQuote} className="space-y-3">
                                    <input 
                                        required 
                                        className="w-full bg-white border border-wood-200 rounded-md p-3 text-sm font-manrope font-bold text-wood-900 focus:border-wood-900 outline-none" 
                                        value={quoteForm.name}
                                        onChange={e => setQuoteForm({...quoteForm, name: e.target.value})}
                                        placeholder="Full Name"
                                    />
                                    <input 
                                        required 
                                        type="email" 
                                        className="w-full bg-white border border-wood-200 rounded-md p-3 text-sm font-manrope font-bold text-wood-900 focus:border-wood-900 outline-none" 
                                        value={quoteForm.email}
                                        onChange={e => setQuoteForm({...quoteForm, email: e.target.value})}
                                        placeholder="Email Address"
                                    />
                                    <input 
                                        required 
                                        type="tel"
                                        className="w-full bg-white border border-wood-200 rounded-md p-3 text-sm font-manrope font-bold text-wood-900 focus:border-wood-900 outline-none" 
                                        value={quoteForm.phone}
                                        onChange={e => setQuoteForm({...quoteForm, phone: e.target.value})}
                                        placeholder="Phone Number"
                                    />
                                    <button className="w-full py-4 bg-wood-900 text-wood-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-md hover:bg-black transition-colors shadow-lg mt-2">
                                        Send Request
                                    </button>
                                </form>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 animate-fade-in-up">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-700 mb-6">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-3xl font-canale uppercase text-wood-900 mb-2 text-center">Received</h3>
                            <p className="text-wood-500 text-sm text-center mb-8">Ref: <span className="font-mono text-wood-900">{quoteRefId}</span></p>
                            <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-wood-900 border-b border-wood-900 pb-1">
                                Return to Gallery
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
      </div>

      {/* --- STICKY FOOTER NAVIGATION --- */}
      {!quoteSubmitted && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-wood-100 p-4 md:p-6 md:pl-[50%] z-50">
              <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
                  {/* Left: Price (Shown in footer now) */}
                  <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-widest text-wood-400">Total</span>
                      <span className="text-2xl font-canale text-wood-900 leading-none tracking-tight">${total.toLocaleString()}</span>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2">
                      {/* Internal Configurator BACK Button - Visible if step > 0 OR isSummary */}
                      {(currentStepIndex > 0 || isSummary) && (
                          <button 
                              onClick={handleStepBack}
                              className="w-12 h-11 md:h-12 border border-wood-200 text-wood-900 rounded-md hover:bg-wood-50 transition-colors flex items-center justify-center bg-white"
                          >
                              <ArrowLeft size={18} />
                          </button>
                      )}
                      
                      {!isSummary && (
                          <button 
                              onClick={handleNext}
                              className="px-8 h-11 md:h-12 bg-wood-900 text-wood-50 text-[10px] font-black uppercase tracking-[0.2em] rounded-md hover:bg-black transition-colors shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
                          >
                              {currentStepIndex === steps.length - 1 ? 'Review' : 'Next'} 
                              <ArrowRight size={14} />
                          </button>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* --- INFO MODAL --- */}
      {activeInfo && (
        <div className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm flex items-end md:items-center justify-center p-0 md:p-6 animate-fade-in-up" onClick={() => setActiveInfo(null)}>
            <div className="bg-white text-wood-900 p-6 md:p-8 rounded-t-xl md:rounded-lg shadow-2xl max-w-sm w-full relative" onClick={e => e.stopPropagation()}>
                <div className="w-12 h-1 bg-wood-200 rounded-full mx-auto mb-6 md:hidden"></div>
                <div className="flex items-center gap-3 mb-4 text-wood-900">
                    <Info size={20} />
                    <span className="text-xs font-black uppercase tracking-widest">Description</span>
                </div>
                <p className="text-sm font-medium text-wood-600 leading-relaxed mb-6">
                    {activeInfo}
                </p>
                <button onClick={() => setActiveInfo(null)} className="w-full py-3 bg-wood-100 text-wood-900 text-[10px] font-black uppercase tracking-widest rounded-md hover:bg-wood-200">
                    Close
                </button>
            </div>
        </div>
      )}

    </div>
  );
};
