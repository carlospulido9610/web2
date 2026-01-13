
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProcessStep } from '../types';

const steps: ProcessStep[] = [
  {
    number: 1,
    title: 'DEFINE YOUR STARTING POINT',
    content: "If you know what you want, send us a reference image for remote pricing. If you need guidance, visit the showroom to customize one of our models or book an in-home visit where we help refine your ideas based on your space and taste. In-home assessments require a $100 deposit, credited toward your project."
  },
  {
    number: 2,
    title: 'CLEAR QUOTE',
    content: "We provide pricing on the spot in most cases. The quote includes design, materials, timeline, payment structure, and what's included. No jargon, no waiting."
  },
  {
    number: 3,
    title: 'ASSESSMENT & DEPOSIT',
    content: "We confirm every detail on site, walk you through the process, and sign the contract if everything looks good. Your project deposit is placed and installation is scheduled."
  },
  {
    number: 4,
    title: 'PRODUCTION & SELECTIONS',
    content: "You don't need everything decided to move forward. Colors and finishes don't affect how the project is built or pricing, so you can lock in the project and finalize those choices later with our guidance. Typical turnaround is 1-4 weeks, giving you time to make selections while we build off-site. Many clients find it easier to commit first and decide on finishes once the project is already in motion."
  },
  {
    number: 5,
    title: 'INSTALLATION',
    content: "We confirm the date about a week out. Center units take 1-2 days, media walls 2-4 days, larger builds 4-6 days. Second payment is due when installation starts if the project spans multiple days."
  },
  {
    number: 6,
    title: 'COMPLETION',
    content: "We walk through everything, explain how it's all connected, and answer questions. Once you're satisfied, final payment is due."
  }
];

interface ProcessProps {
  onOpenProcess?: () => void;
}

export const Process: React.FC<ProcessProps> = ({ onOpenProcess }) => {
  return (
    <section id="process" className="py-10 md:py-16 bg-wood-100 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24">
          
          <div className="lg:w-1/3 self-start lg:sticky lg:top-32">
            <h2 className="text-5xl md:text-7xl font-canale uppercase leading-[0.9] mb-4 md:mb-6 text-wood-900 tracking-tight">
              How it works, <br />
              <span className="font-canale text-wood-400 opacity-60">step by step</span>
            </h2>
            <p className="text-wood-600 mb-6 md:mb-8 text-sm leading-relaxed font-manrope font-medium">
              Some clients come in knowing exactly what they want. Others need help making the right decisions. And a few want to design and build an entire room with intention.
              <br/><br/>
              Our process is built to support all three.
            </p>
            <button 
              onClick={onOpenProcess}
              className="group inline-flex items-center text-[10px] font-manrope font-black uppercase tracking-widest text-wood-900 border-b-2 border-wood-300 pb-1 hover:border-wood-900 transition-colors"
            >
              View full process
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="lg:w-2/3 space-y-8 md:space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className={`relative pl-12 ${index !== steps.length - 1 ? 'border-l border-wood-300' : ''} pb-2 md:pb-4`}>
                <span className={`absolute -left-3 top-0 w-6 h-6 rounded-full border flex items-center justify-center text-[10px] font-manrope font-black bg-wood-50 border-wood-300 text-wood-600`}>
                  {step.number}
                </span>
                <h3 className="text-lg md:text-xl font-canale uppercase tracking-tight mb-2 text-wood-900">{step.title}</h3>
                <p className="text-wood-600 text-sm leading-relaxed max-w-lg font-manrope font-medium">{step.content}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
