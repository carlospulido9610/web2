
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, Minus, Plus } from 'lucide-react';
import { Model, ConfiguratorData, OptionGroup } from '../types';

interface ConfiguratorProps {
    model: Model;
    optionsData: ConfiguratorData;
    onBack: () => void;
    onRequestQuote: (selections: Record<string, string | string[]>, total: number) => void;
}

// Step definitions with Apple-style questions and help content
const STEP_DEFINITIONS = [
    {
        key: 'wallHeight',
        title: 'WALL HEIGHT',
        question: 'What height works for your space?',
        description: 'Defines the total height from floor to ceiling. Exact measurements will be verified by our team.',
        help: {
            title: 'Not sure what height to choose?',
            videoPlaceholder: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>Measure your ceiling height with a tape measure or estimate based on number of floors.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Standard:</strong> Most ceilings are 8-9ft.</li>
                        <li><strong>High Ceilings:</strong> Newer homes often have 10-12ft ceilings.</li>
                        <li><strong>Double Height:</strong> Foyers or great rooms can be 18-20ft+.</li>
                    </ul>
                    <p className="text-xs text-wood-400">Our team will verify exact measurements during installation.</p>
                </div>
            )
        }
    },
    {
        key: 'tvSize',
        title: 'TV SIZE',
        question: 'What size TV will you mount?',
        description: 'Select the screen size of your television to ensure the perfect cutout dimensions.',
        help: {
            title: 'How to measure your TV?',
            videoPlaceholder: 'https://images.unsplash.com/photo-1593784653277-ca5241487503?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>TV sizes are measured diagonally from corner to corner of the screen, not including the bezel.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Check Model #</strong>: It usually contains the size (e.g., XR-<strong>65</strong>X90J is 65").</li>
                        <li><strong>Future Proofing</strong>: Consider if you might upgrade to a larger size soon.</li>
                    </ul>
                </div>
            )
        }
    },
    {
        key: 'tvPlacement',
        title: 'TV PLACEMENT',
        question: 'How should your TV be integrated?',
        description: 'Choose between a seamless recessed look or a simplified surface mount.',
        help: {
            title: 'Recessed vs. Surface Mount?',
            videoPlaceholder: 'https://images.unsplash.com/photo-1558882224-dda166733046?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>Both options provide a clean look, but the installation requirements differ.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Recessed:</strong> The TV sits flush with the media wall face. Requires precise depth.</li>
                        <li><strong>Surface Mount:</strong> The TV is mounted on top of the panel capabilities. Easier to change TVs later.</li>
                    </ul>
                </div>
            )
        }
    },
    {
        key: 'mantel',
        title: 'MANTEL',
        question: 'Add a shelf above your fireplace?',
        description: 'A floating shelf acts as a heat deflector and aesthetic divider.',
        help: {
            title: 'Do I need a mantel?',
            videoPlaceholder: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>Mantels serve both functional and aesthetic purposes.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Heat Protection:</strong> Protects your TV from fireplace heat rising up.</li>
                        <li><strong>Decor:</strong> A perfect spot for photos, candles, or seasonal decorations.</li>
                    </ul>
                </div>
            )
        }
    },
    {
        key: 'soundbar',
        title: 'SOUNDBAR',
        question: 'How will your sound system be positioned?',
        description: 'Designate a specific niche for your soundbar or keep it simple.',
        help: {
            title: 'Soundbar integration options',
            videoPlaceholder: 'https://images.unsplash.com/photo-1544652478-6653e09f1826?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>We can build a custom cutout for your specific soundbar model.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Open Niche:</strong> Exposed soundbar for best audio quality.</li>
                        <li><strong>Acoustic Fabric:</strong> Hidden soundbar behind transparent fabric for a cleaner look.</li>
                    </ul>
                </div>
            )
        }
    },
    {
        key: 'fireplaceType',
        title: 'FIREPLACE TYPE',
        question: 'Choose your fireplace style',
        description: 'Select the electric fireplace unit that fits your design vision.',
        help: {
            title: 'Comparing fireplace styles',
            videoPlaceholder: 'https://images.unsplash.com/photo-1600585154526-996dcb19366e?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>Electric fireplaces offer ambiance without the maintenance of gas or wood.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Linear:</strong> Modern, wide look. perfect for contemporary spaces.</li>
                        <li><strong>Traditional:</strong> Taller, square aspect ratio resembling a classic hearth.</li>
                    </ul>
                </div>
            )
        }
    },
    {
        key: 'lighting',
        title: 'LIGHTING',
        question: 'Add accent lighting? (Select all that apply)',
        description: 'Enhance the mood with integrated LED strips.',
        multi: true,
        help: {
            title: 'Lighting ideas',
            videoPlaceholder: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?auto=format&fit=crop&q=80&w=600',
            content: (
                <div className="space-y-4">
                    <p>Dimmable warm white LEDs are installed in routed channels with diffusers.</p>
                    <ul className="list-disc pl-5 space-y-1 text-wood-600">
                        <li><strong>Shelving:</strong> Under-shelf lighting highlights decor objects.</li>
                        <li><strong>Perimeter:</strong> Backlighting behind the main panel creates a floating effect.</li>
                    </ul>
                </div>
            )
        }
    },
];



export const Configurator: React.FC<ConfiguratorProps> = ({ model, optionsData, onBack, onRequestQuote }) => {
    // --- State ---
    const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
    const [expandedHelp, setExpandedHelp] = useState<Set<string>>(new Set());
    const [selections, setSelections] = useState<Record<string, string | string[]>>({});
    const [quantity, setQuantity] = useState(1);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Calculate dynamic steps based on available data
    const steps = useMemo(() => {
        const ordered = STEP_DEFINITIONS.filter(def => optionsData.groups[def.key]);
        const extraKeys = Object.keys(optionsData.groups).filter(k => !STEP_DEFINITIONS.find(d => d.key === k));
        const extras = extraKeys.map(key => ({
            key,
            title: optionsData.groups[key].label.toUpperCase(),
            question: `Select your ${optionsData.groups[key].label.toLowerCase()} preference`,
            description: '',
            multi: false,
            help: undefined
        }));
        return [...ordered, ...extras];
    }, [optionsData]);

    // Initialize defaults
    useEffect(() => {
        const initial: Record<string, string | string[]> = {};
        steps.forEach(step => {
            if (!step.multi) {
                const group = optionsData.groups[step.key];
                if (group && group.options.length > 0) {
                    initial[step.key] = group.options[0].id;
                }
            } else {
                initial[step.key] = [];
            }
        });
        setSelections(prev => Object.keys(prev).length === 0 ? initial : prev);
    }, [optionsData, steps]);

    // --- Calculations ---
    const total = useMemo(() => {
        let total = model.basePrice;

        Object.entries(selections).forEach(([key, value]) => {
            const group = optionsData.groups[key];
            if (!group) return;

            if (Array.isArray(value)) {
                value.forEach(optId => {
                    const opt = group.options.find(o => o.id === optId);
                    if (opt) total += opt.price;
                });
            } else {
                const opt = group.options.find(o => o.id === value);
                if (opt) total += opt.price;
            }
        });
        return total;
    }, [selections, model, optionsData]);

    // --- Handlers ---
    const toggleSection = (key: string) => {
        setExpandedSections(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    const toggleHelp = (key: string) => {
        setExpandedHelp(prev => {
            const newSet = new Set(prev);
            if (newSet.has(key)) {
                newSet.delete(key);
            } else {
                newSet.add(key);
            }
            return newSet;
        });
    };

    const handleOptionSelect = (stepKey: string, optionId: string, isMulti: boolean) => {
        if (isMulti) {
            setSelections(prev => {
                const current = (prev[stepKey] as string[]) || [];
                if (current.includes(optionId)) {
                    return { ...prev, [stepKey]: current.filter(id => id !== optionId) };
                } else {
                    return { ...prev, [stepKey]: [...current, optionId] };
                }
            });
        } else {
            setSelections(prev => ({ ...prev, [stepKey]: optionId }));
        }
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleRequestQuote = () => {
        onRequestQuote(selections, total * quantity);
    };

    // --- Render Compact Accordion Section ---
    const renderAccordionSection = (step: typeof steps[0]) => {
        const isExpanded = expandedSections.has(step.key);
        const isHelpOpen = expandedHelp.has(step.key);
        const group = optionsData.groups[step.key] as OptionGroup;
        if (!group) return null;

        return (
            <div key={step.key} className="border-b border-wood-200">
                {/* Accordion Header - Compact */}
                <button
                    onClick={() => toggleSection(step.key)}
                    className="w-full flex items-center justify-between py-4 text-left hover:bg-wood-50 transition-colors"
                >
                    <span className="text-[13px] font-bold tracking-wide text-wood-900 uppercase font-manrope">
                        {step.title}
                    </span>
                    <ChevronDown
                        size={18}
                        className={`text-wood-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                </button>

                {/* Accordion Content - Compact */}
                {isExpanded && (
                    <div className="pb-5 animate-fade-in-up">
                        {/* Question */}
                        <p className="text-sm text-wood-500 mb-2">
                            {step.question}
                        </p>

                        {/* Static Description (if available) - New style */}
                        {step.description && (
                            <p className="text-sm text-wood-600 mb-4 leading-relaxed">
                                {step.description}
                            </p>
                        )}

                        {/* Help Toggle - Apple Style */}
                        {step.help && (
                            <div className="mb-6">
                                <button
                                    onClick={() => toggleHelp(step.key)}
                                    className="flex items-center gap-2 text-xs font-semibold text-wood-900 hover:text-wood-700 transition-colors group"
                                >
                                    {isHelpOpen ? (
                                        <Plus size={14} className="rotate-45 transition-transform duration-200" />
                                    ) : (
                                        <Plus size={14} className="transition-transform duration-200" />
                                    )}
                                    <span className="border-b border-wood-900/30 group-hover:border-wood-900 pb-0.5 transition-colors">
                                        {step.help.title}
                                    </span>
                                </button>

                                {isHelpOpen && (
                                    <div className="mt-4 bg-wood-50 rounded-xl overflow-hidden animate-fade-in-up border border-wood-100">
                                        <div className="p-5">
                                            {/* Video Placeholder */}
                                            <div className="relative aspect-video w-full bg-wood-200 rounded-lg overflow-hidden mb-4 group cursor-pointer">
                                                <img
                                                    src={step.help.videoPlaceholder}
                                                    alt="Guide thumbnail"
                                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M1 1L11 7L1 13V1Z" fill="#1F1915" stroke="#1F1915" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] text-white font-medium uppercase tracking-wider">
                                                    Watch Guide
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="text-sm text-wood-700 leading-relaxed">
                                                {step.help.content}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Options - Compact Grid (Restored Style) */}
                        <div className="grid grid-cols-2 gap-2">
                            {group.options.map((option) => {
                                const isSelected = step.multi
                                    ? (selections[step.key] as string[])?.includes(option.id)
                                    : selections[step.key] === option.id;

                                return (
                                    <button
                                        key={option.id}
                                        onClick={() => handleOptionSelect(step.key, option.id, !!step.multi)}
                                        className={`text-left px-3 py-2.5 rounded border transition-all duration-150 ${isSelected
                                            ? 'border-wood-900 bg-wood-50'
                                            : 'border-wood-200 hover:border-wood-400'
                                            }`}
                                    >
                                        <span className={`block text-sm font-medium ${isSelected ? 'text-wood-900' : 'text-wood-600'}`}>
                                            {option.label}
                                        </span>
                                        <span className="block text-[11px] text-wood-400 mt-0.5">
                                            {option.price === 0 ? 'Included' : `+$${option.price.toLocaleString()}`}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        );
    };

    // Product Content (shared between mobile and desktop)
    const ProductContent = () => (
        <>
            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-canale uppercase tracking-tight text-wood-900 leading-[0.95] mb-6">
                {model.name}
            </h1>

            {/* Product Description */}
            <div className="mb-8 text-sm text-wood-600 leading-relaxed space-y-3">
                <p>
                    Transform your living room with this contemporary media wall featuring integrated lighting, floating shelves, and custom fireplace surround. Built using cabinet-grade wood construction—not drywall—for superior durability and finish quality.
                </p>

                <div>
                    <span className="font-semibold text-wood-900 block mb-2">This design includes:</span>
                    <ul className="space-y-1 text-wood-600">
                        <li className="flex items-center gap-2">
                            <span className="text-wood-400">✓</span> Electric fireplace insert (60")
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-wood-400">✓</span> TV mounting up to 77"
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-wood-400">✓</span> Hidden cable management
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-wood-400">✓</span> Professional installation
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-wood-400">✓</span> 1-year warranty
                        </li>
                    </ul>
                </div>
            </div>

            {/* ACCORDION SECTIONS - Compact Style */}
            <div className="border-t border-wood-200">
                {steps.map(step => renderAccordionSection(step))}
            </div>

            {/* PRICE */}
            <div className="py-6 border-b border-wood-200">
                <div className="text-3xl md:text-4xl font-bold text-wood-900">
                    ${(total * quantity).toLocaleString()}.00
                </div>
                <span className="text-xs text-wood-400 mt-1 block">
                    Final price calculated upon request.
                </span>
            </div>

            {/* REQUEST QUOTE BUTTON */}
            <div className="py-6 flex items-center gap-3">
                <div className="flex items-center border border-wood-300 rounded">
                    <button
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 flex items-center justify-center text-wood-500 hover:text-wood-900"
                    >
                        <Minus size={16} />
                    </button>
                    <span className="w-8 text-center text-sm font-medium text-wood-900">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 flex items-center justify-center text-wood-500 hover:text-wood-900"
                    >
                        <Plus size={16} />
                    </button>
                </div>
                <button
                    onClick={handleRequestQuote}
                    className="flex-1 bg-wood-900 text-white py-3 px-6 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors"
                >
                    Request Quote
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-white font-manrope">

            {/* ===== MOBILE LAYOUT ===== */}
            <div className="md:hidden">
                <div ref={scrollContainerRef}>
                    {/* Initial Image Stack (Excluding Last) */}
                    {model.gallery && model.gallery.length > 0 && [model.image, ...model.gallery.slice(0, -1)].map((img, idx) => (
                        <div key={idx} className="w-full aspect-[4/3] bg-wood-100 border-b border-white/20 relative z-0">
                            {/* Back Button - Only on first image */}
                            {idx === 0 && (
                                <button
                                    onClick={onBack}
                                    className="absolute top-4 left-4 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                                >
                                    <ChevronLeft size={20} className="text-wood-900" />
                                </button>
                            )}
                            <img
                                src={img}
                                alt={`${model.name} view ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}

                    {/* STICKY PREVIEW HEADER (Last Image) */}
                    <div className="sticky top-0 z-30 w-full h-[35vh] bg-wood-100 shadow-md">
                        {/* Back Button (Fallback if gallery is short) */}
                        {(!model.gallery || model.gallery.length === 0) && (
                            <button
                                onClick={onBack}
                                className="absolute top-4 left-4 z-40 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                            >
                                <ChevronLeft size={20} className="text-wood-900" />
                            </button>
                        )}
                        <img
                            src={model.gallery && model.gallery.length > 0 ? model.gallery[model.gallery.length - 1] : model.image}
                            alt={`${model.name} Final Preview`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* PRODUCT INFO SECTION - Mobile (Scrolls Under) */}
                    <div className="px-5 py-6 relative z-10 bg-white min-h-screen">
                        <ProductContent />
                    </div>
                </div>
            </div>

            {/* ===== DESKTOP LAYOUT ===== */}
            <div className="hidden md:flex h-screen">
                {/* LEFT SIDE - Sticky Image Gallery with Scroll */}
                <div className="w-1/2 h-screen sticky top-0 overflow-y-auto bg-wood-100 scrollbar-hide">
                    {/* Back Button - Desktop */}
                    <button
                        onClick={onBack}
                        className="fixed top-6 left-6 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                    >
                        <ChevronLeft size={20} className="text-wood-900" />
                    </button>

                    {/* Image Gallery - Scrollable */}
                    <div className="flex flex-col">
                        {/* Main Image */}
                        <div className="w-full aspect-[4/3] bg-wood-100">
                            <img
                                src={model.image}
                                alt={model.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Additional Gallery Images */}
                        {model.gallery?.map((img, idx) => (
                            <div key={idx} className="w-full aspect-[4/3] bg-wood-100 border-t border-white/20">
                                <img
                                    src={img}
                                    alt={`${model.name} view ${idx + 2}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SIDE - Scrollable Content */}
                <div className="w-1/2 h-screen overflow-y-auto">
                    <div className="px-12 py-12 max-w-xl mx-auto">
                        <ProductContent />
                    </div>
                </div>
            </div>
        </div>
    );
};
