
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    number: 1,
    title: 'Define your starting point',
    content: 'Send us a photo or visit the showroom. We provide initial guidance whether you know exactly what you want or need help visualizing.'
  },
  {
    number: 2,
    title: 'Clear Quote',
    content: 'We provide a transparent estimate including design, materials, and timeline. No hidden fees.'
  },
  {
    number: 3,
    title: 'Assessment & Deposit',
    content: 'Book an in-home measurement ($100 deposit, credited to project). We confirm technical details and sign the contract.'
  },
  {
    number: 4,
    title: 'Production & Selections',
    content: 'While we build off-site (1-4 weeks), you finalize finish selections. This keeps your home dust-free.'
  },
  {
    number: 5,
    title: 'Installation',
    content: 'Most installations take 1-2 days. We protect your floors and clean up thoroughly.'
  },
  {
    number: 6,
    title: 'Completion',
    content: 'Final walkthrough to ensure perfection before the final payment is made.'
  }
];

interface ProcessProps {
  onOpenDetails?: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenDetails }) => {
  return (
    <section id="process" className="py-12 md:py-24 bg-wood-100 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24">
          
          <div className="lg:w-1/3 self-start">
            <span className="text-xs font-sans font-black tracking-wider uppercase text-wood-500">Process</span>
            <h2 className="text-5xl md:text-7xl font-sans font-black uppercase leading-[0.9] mt-3 mb-4 md:mb-6 text-wood-900 tracking-tight">How it works, <br /><span className="editorial-serif lowercase normal-case font-normal text-wood-400">step by step.</span></h2>
            <p className="text-wood-600 mb-6 md:mb-8 text-sm leading-relaxed font-info font-medium">
              We've streamlined the renovation experience to be predictable, clean, and professional.
            </p>
            <button 
              onClick={onOpenDetails}
              className="group inline-flex items-center text-sm font-sans font-black uppercase tracking-widest text-wood-900 border-b-2 border-wood-300 pb-1 hover:border-wood-900 transition-colors"
            >
              View full process & FAQ 
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:w-2/3 space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className={`relative pl-12 ${index !== steps.length - 1 ? 'border-l border-wood-300' : ''} pb-2 md:pb-4`}>
                <span className={`absolute -left-3 top-0 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-sans font-black ${
                  index === steps.length - 1 ? 'bg-wood-900 border-wood-900 text-wood-50' : 'bg-wood-50 border-wood-300 text-wood-600'
                }`}>
                  {step.number}
                </span>
                <h3 className="text-lg md:text-xl font-sans font-black uppercase tracking-tight mb-2 text-wood-900">{step.title}</h3>
                <p className="text-wood-600 text-sm leading-relaxed max-w-lg font-info font-medium">{step.content}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
