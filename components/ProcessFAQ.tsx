
import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface ProcessStepDetail {
  number: number;
  title: string;
  description?: string;
  subOptions?: { title: string; content: string }[];
}

const DETAILED_STEPS: ProcessStepDetail[] = [
  { number: 1, title: 'Define your starting point', subOptions: [{ title: "I know what I want", content: "Send us a reference image or sketch. We provide clear, exact pricing across different price ranges." }, { title: "I need guidance", content: "Browse our catalog or visit the showroom. Book an in-home assessment to refine your ideas." }, { title: "Full design service", content: "For room transformations, we begin with a dedicated design phase, curation, and 3D rendering." }] },
  { number: 2, title: 'Get a clear quote', description: 'We provide exact pricing instantly. No jargon, just standardized quotes including everything from materials to installation timelines.' },
  { number: 3, title: 'Assessment & Deposit', description: "Book an in-home measurement visit. Confirm every detail on site before signing the final contract and placing your project deposit." },
  { number: 4, title: 'Production & Selections', description: "We build off-site (1-4 weeks). You finalize finish selections while we schedule your installation." },
  { number: 5, title: 'Installation', description: "Our professional team installs everything in 1-2 days. We ensure a clean, dust-free process and total floor protection." },
  { number: 6, title: 'Completion Walkthrough', description: "Final review of every detail. We explain the layout and connectivity before the final project sign-off." }
];

const FAQ_DATA = [
  { id: 'sales', title: 'Sales & Process', items: [{ question: "How do I place an order?", answer: "Fill out the contact form. We will reach out the same day to discuss your project or schedule a showroom visit." }, { question: "Do you offer free quotes?", answer: "Yes. Remote quotes via reference photos are free. In-home consultations require a $100 deposit, credited toward your project." }] },
  { id: 'pricing', title: 'Pricing & Payments', items: [{ question: "How much is the deposit?", answer: "35% for projects over $4,000; 50% for projects under $4,000." }, { question: "Payment methods?", answer: "Cash, check, Zelle, and credit cards." }] }
];

export const ProcessFAQ: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(FAQ_DATA[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const activeCategory = FAQ_DATA.find(cat => cat.id === activeTab) || FAQ_DATA[0];

  return (
    <div className="bg-wood-50 min-h-screen">
      <div className="bg-wood-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-8xl font-canale uppercase mb-8 tracking-tight leading-[0.9]">Process & FAQ</h1>
            <p className="text-wood-200 text-lg md:text-xl font-manrope font-medium max-w-2xl leading-relaxed opacity-80">
              Transparency is our foundation. Detailed workflow and answers to every technical question.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="mb-32">
          <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-wood-400 mb-16 flex items-center gap-4 font-manrope">
            <div className="h-px w-8 bg-wood-300"></div> Detailed Workflow
          </h3>
          <div className="space-y-16">
            {DETAILED_STEPS.map((step) => (
              <div key={step.number} className="flex flex-col md:flex-row gap-8 md:gap-16 border-l-2 border-wood-100 pl-8 relative">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-wood-900"></div>
                <div className="md:w-1/4">
                  <span className="text-6xl font-canale text-wood-100 leading-none">0{step.number}</span>
                </div>
                <div className="md:w-3/4">
                  <h4 className="text-3xl md:text-4xl font-canale text-wood-900 mb-6 tracking-tight uppercase">{step.title}</h4>
                  {step.description && <p className="text-wood-600 text-lg font-manrope font-medium leading-relaxed mb-8">{step.description}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-24 border-t border-wood-200">
           <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-wood-400 mb-16 flex items-center gap-4 font-manrope">
             <div className="h-px w-8 bg-wood-300"></div> Common Questions
           </h3>
           <div className="flex flex-col lg:flex-row gap-12">
             <div className="lg:w-1/4 flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
               {FAQ_DATA.map((cat) => (
                 <button key={cat.id} onClick={() => setActiveTab(cat.id)}
                   className={`shrink-0 text-left px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] font-manrope rounded-sm ${activeTab === cat.id ? 'bg-wood-900 text-white' : 'bg-white text-wood-400 border border-wood-100'}`}>
                   {cat.title}
                 </button>
               ))}
             </div>
             <div className="lg:w-3/4">
               <div className="bg-white border border-wood-100 divide-y divide-wood-50">
                 {activeCategory.items.map((faq, index) => {
                   const isOpen = openFaqIndex === index;
                   return (
                     <div key={index}>
                       <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-8 text-left font-manrope">
                         <span className="font-bold text-wood-900 uppercase text-sm md:text-base tracking-tight">{faq.question}</span>
                         {isOpen ? <Minus size={20} className="text-wood-900" /> : <Plus size={20} className="text-wood-300" />}
                       </button>
                       {isOpen && <div className="px-8 pb-8 text-wood-500 text-base leading-relaxed font-manrope font-medium">{faq.answer}</div>}
                     </div>
                   );
                 })}
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
