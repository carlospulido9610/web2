
import React, { useState } from 'react';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { Model, ConfiguratorData } from '../types';

interface QuoteSummaryProps {
    model: Model;
    optionsData: ConfiguratorData;
    selections: Record<string, string | string[]>;
    total: number;
    onBack: () => void;
    onBackToHome: () => void;
}

export const QuoteSummary: React.FC<QuoteSummaryProps> = ({
    model,
    optionsData,
    selections,
    total,
    onBack,
    onBackToHome
}) => {
    // Quote Form State
    const [quoteForm, setQuoteForm] = useState({ name: '', email: '', phone: '' });
    const [quoteSubmitted, setQuoteSubmitted] = useState(false);
    const [quoteRefId, setQuoteRefId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Get selected option details
    const getSelectionDetails = () => {
        const details: { group: string; label: string; price: number }[] = [];

        Object.entries(selections).forEach(([key, value]) => {
            const group = optionsData.groups[key];
            if (!group) return;

            if (Array.isArray(value)) {
                value.forEach(optId => {
                    const opt = group.options.find(o => o.id === optId);
                    if (opt) {
                        details.push({ group: group.label, label: opt.label, price: opt.price });
                    }
                });
            } else {
                const opt = group.options.find(o => o.id === value);
                if (opt) {
                    details.push({ group: group.label, label: opt.label, price: opt.price });
                }
            }
        });

        return details;
    };

    const handleRequestQuote = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const refId = `RVL-${Math.floor(1000 + Math.random() * 9000)}`;
        setQuoteRefId(refId);

        setTimeout(() => {
            setQuoteSubmitted(true);
            setIsSubmitting(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
    };

    const selectionDetails = getSelectionDetails();

    if (quoteSubmitted) {
        return (
            <div className="min-h-screen bg-wood-50 flex items-center justify-center p-6">
                <div className="max-w-md w-full text-center animate-fade-in-up">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={40} className="text-green-600" />
                    </div>
                    <h1 className="text-3xl font-canale uppercase text-wood-900 mb-3">Quote Received!</h1>
                    <p className="text-wood-500 mb-2">Your reference number:</p>
                    <p className="font-mono text-2xl text-wood-900 font-bold mb-6">{quoteRefId}</p>
                    <p className="text-wood-500 text-sm mb-8">We'll contact you within 24 hours with more details about your custom {model.name}.</p>
                    <button
                        onClick={onBackToHome}
                        className="bg-wood-900 text-white px-8 py-3 text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors"
                    >
                        Return to Gallery
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-wood-50 font-manrope">
            {/* Header */}
            <div className="bg-white border-b border-wood-200 sticky top-0 z-50">
                <div className="max-w-2xl mx-auto px-5 py-4 flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="w-10 h-10 flex items-center justify-center text-wood-600 hover:text-wood-900 -ml-2"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="text-sm font-bold uppercase tracking-wider text-wood-900">Quote Summary</h1>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-5 py-8">
                {/* Product Card */}
                <div className="bg-white rounded-lg shadow-sm border border-wood-200 overflow-hidden mb-6">
                    <div className="flex gap-4 p-4">
                        <img
                            src={model.image}
                            alt={model.name}
                            className="w-24 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                            <h2 className="text-lg font-canale uppercase text-wood-900">{model.name}</h2>
                            <p className="text-sm text-wood-500 mt-1">Base Price: ${model.basePrice.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Configuration Details */}
                <div className="bg-white rounded-lg shadow-sm border border-wood-200 overflow-hidden mb-6">
                    <div className="px-5 py-4 border-b border-wood-100">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-wood-900">Your Configuration</h3>
                    </div>

                    <div className="divide-y divide-wood-100">
                        {selectionDetails.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center px-5 py-3">
                                <div>
                                    <span className="text-xs text-wood-400 uppercase tracking-wide">{item.group}</span>
                                    <p className="text-sm font-medium text-wood-900">{item.label}</p>
                                </div>
                                <span className="text-sm text-wood-600">
                                    {item.price > 0 ? `+$${item.price.toLocaleString()}` : 'Included'}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Total */}
                    <div className="px-5 py-4 bg-wood-50 border-t border-wood-200">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-wood-900">Total</span>
                            <span className="text-2xl font-bold text-wood-900">${total.toLocaleString()}.00</span>
                        </div>
                    </div>
                </div>

                {/* Quote Request Form */}
                <div className="bg-white rounded-lg shadow-sm border border-wood-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-wood-100">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-wood-900">Request Your Quote</h3>
                        <p className="text-xs text-wood-500 mt-1">Fill out your details and we'll get back to you within 24 hours.</p>
                    </div>

                    <form onSubmit={handleRequestQuote} className="p-5 space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-wood-700 mb-1">Full Name</label>
                            <input
                                required
                                className="w-full border border-wood-300 rounded-lg px-4 py-3 text-sm focus:border-wood-900 focus:ring-0 outline-none transition-colors"
                                value={quoteForm.name}
                                onChange={e => setQuoteForm({ ...quoteForm, name: e.target.value })}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-wood-700 mb-1">Email Address</label>
                            <input
                                required
                                type="email"
                                className="w-full border border-wood-300 rounded-lg px-4 py-3 text-sm focus:border-wood-900 focus:ring-0 outline-none transition-colors"
                                value={quoteForm.email}
                                onChange={e => setQuoteForm({ ...quoteForm, email: e.target.value })}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-wood-700 mb-1">Phone Number</label>
                            <input
                                required
                                type="tel"
                                className="w-full border border-wood-300 rounded-lg px-4 py-3 text-sm focus:border-wood-900 focus:ring-0 outline-none transition-colors"
                                value={quoteForm.phone}
                                onChange={e => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                                placeholder="+1 (555) 000-0000"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-wood-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-black transition-colors disabled:bg-wood-400 disabled:cursor-not-allowed mt-2"
                        >
                            {isSubmitting ? 'Sending...' : 'Submit Quote Request'}
                        </button>
                    </form>
                </div>

                {/* Back Link */}
                <div className="text-center py-6">
                    <button
                        onClick={onBack}
                        className="text-sm text-wood-500 hover:text-wood-900 underline"
                    >
                        ← Back to configuration
                    </button>
                </div>
            </div>
        </div>
    );
};
