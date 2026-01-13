
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ProcessStepDetail {
  number: number;
  title: string;
  description?: string;
  subOptions?: { title: string; content: string }[];
}

const DETAILED_STEPS: ProcessStepDetail[] = [
  { 
    number: 1, 
    title: 'Define your starting point and what you need from us', 
    subOptions: [
        { 
            title: "I know what I want — I just need pricing", 
            content: "Send us a reference image or sketch along with your approximate wall dimensions and location. After a few clarifying questions, we can provide clear, exact pricing. We'll also suggest variations of the same design across different price ranges so you can make an informed decision." 
        },
        { 
            title: "I know what I like, but I need guidance to make the right decision", 
            content: "Browse our catalog or visit the showroom to get inspired and guided through the process of customizing one of our proven models based on your space.\nYou can also book an in-home assessment, where we'll help refine your ideas and propose a solution that works for your home while reflecting your personal taste. This requires a $100 deposit, which is applied toward your quote." 
        },
        { 
            title: "I want to invest in a fully designed environment for my home", 
            content: "For full room transformations or projects involving multiple elements, we begin with a dedicated design phase to properly define the concept, layout, and key decisions.\nThis phase is offered as a separate service for larger scopes of work and focuses on curation, rendering, and working with a designer prior to construction. It can begin with an in-home assessment or at the showroom, where you can propose and refine your vision." 
        }
    ]
  },
  { 
    number: 2, 
    title: 'Get a clear quote with everything you need to know', 
    description: "Whether you request pricing remotely or visit the showroom, a quote can often be provided on the spot. We don't take days to get back to you, and we don't use jargon that's difficult for the average person to understand.\nOur systems and pricing are well defined, and our quotes are standardized.\nEach quote includes:\n\n• The base design and the maximum possible size included, which will later be adjusted during the on-site visit\n• Requested customizations, add-ons, and material allowances\n• Estimated turnaround and installation time\n• Payment structure\n• What's included and what's not" 
  },
  { 
    number: 3, 
    title: 'Start the process and place a deposit', 
    description: "After reviewing the quote, you can decide whether to book the measurement appointment. This visit requires a $100 deposit, which is applied toward your final quote.\nDuring the appointment, we confirm every detail on site, review everything together, and walk you through the installation process. If everything looks good, the contract will be signed and your project deposit will be placed.\nIf you move ahead directly at the showroom, your deposit can be placed there and your measurement appointment scheduled on the spot." 
  },
  { 
    number: 4, 
    title: 'Selections and final decisions', 
    description: "You don't need to have everything decided to move forward.\nFinal selections such as colors, finishes, or similar details don't affect how the project is built or how long it takes, so they don't impact pricing. This allows you to move forward with confidence and refine those choices later with our guidance, knowing pricing is locked and the project is already scheduled.\nMany clients get stuck in the material or color-selection phase indefinitely. Committing to the project first often makes those decisions feel easier.\nOnce the project begins, our typical turnaround is 1–4 weeks, depending on complexity. This gives you time to finalize selections, visualize the result, and visit suppliers while knowing the project is already in motion.\nAfter the project is confirmed, you'll receive a selection list to complete, including our recommendations and the specific variations of your chosen design." 
  },
  { 
    number: 5, 
    title: 'Installation', 
    description: "In some cases, an installation date can be agreed upon in advance. However, as a general rule, we can't provide an exact installation date at the start of the process. Instead, we work within a defined turnaround timeframe of 1–4 weeks, depending on project complexity.\nApproximately one week before installation, we'll confirm the scheduled date, the expected duration of the install, and any preparation needed to make the process as smooth as possible for everyone involved.\nOnce installation begins, the second of three payments is due if the project spans multiple days." 
  },
  { 
    number: 6, 
    title: 'Completion and walkthrough', 
    description: "Once the project is completed, we'll walk you through the finished work, explain how everything is laid out and connected, and go over any details that may be useful for you in the future.\nWe don't rush this step. We take the time needed to review everything together and ensure the project is completed as it should be, helping avoid unnecessary callbacks later on.\nOnce the walkthrough is complete and everything has been reviewed, final payment is due and expected at that time." 
  }
];

export const ProcessPage: React.FC<{ onBack: () => void; onNavigateFAQ: () => void }> = ({ onBack, onNavigateFAQ }) => {
  return (
    <div className="bg-wood-50 min-h-screen animate-fade-in-up">
      <div className="bg-wood-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-canale uppercase mb-8 tracking-tight leading-[0.9]">How it works, step by step</h1>
            <p className="text-wood-200 text-base md:text-xl font-manrope font-medium max-w-3xl leading-relaxed opacity-80">
              Some clients come in knowing exactly what they want. Others need help making the right decisions. And a few want to design and build an entire room with intention.
              <br/><br/>
              Our process is built to support all three. Here's how pricing is defined, how your project is executed, how decisions are made along the way, and how we ensure the final result aligns with what you have in mind.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        
        <div className="space-y-12 md:space-y-16">
        {DETAILED_STEPS.map((step) => (
            <div key={step.number} className="flex flex-row gap-5 md:gap-16 border-l-2 border-wood-200 pl-5 md:pl-8 relative items-start">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-wood-900"></div>
            
            {/* Number Column - Adjusted for visibility and alignment */}
            <div className="w-10 md:w-1/4 shrink-0 pt-1 md:pt-0">
                <span className="text-3xl md:text-6xl font-canale text-wood-300 md:text-wood-100 leading-none">0{step.number}</span>
            </div>

            {/* Content Column */}
            <div className="flex-1 md:w-3/4">
                <h4 className="text-2xl md:text-4xl font-canale text-wood-900 mb-4 md:mb-6 tracking-tight uppercase leading-[0.95]">{step.title}</h4>
                {step.description && <p className="text-wood-600 text-sm md:text-lg font-manrope font-medium leading-relaxed mb-6 md:mb-8 whitespace-pre-line">{step.description}</p>}
                
                {step.subOptions && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8">
                        {step.subOptions.map((opt, idx) => (
                            <div key={idx} className="bg-white p-5 md:p-6 border border-wood-100 rounded-sm">
                                <h5 className="font-manrope font-bold text-sm md:text-base text-wood-900 mb-3 uppercase tracking-wide leading-relaxed">{opt.title}</h5>
                                <p className="text-xs md:text-sm text-wood-500 font-manrope leading-relaxed whitespace-pre-line mt-2">{opt.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            </div>
        ))}
        </div>

        <div className="mt-20 md:mt-24 pt-12 border-t border-wood-200 flex justify-end">
             <button onClick={onNavigateFAQ} className="group flex items-center gap-4 text-lg md:text-2xl font-canale uppercase text-wood-900 hover:text-wood-600 transition-colors">
                Have questions? Read FAQ <ArrowRight className="group-hover:translate-x-2 transition-transform" />
             </button>
        </div>
      </div>
    </div>
  );
};
