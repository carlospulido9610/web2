import React, { useState } from 'react';
import { Store, Hammer, UserCheck, Receipt, Box, Gem, Plus, Minus, ArrowUpRight } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const reasons = [
    {
      icon: Store,
      title: 'Physical showroom',
      subtitle: 'Not just photos',
      content: "The biggest concern homeowners have when hiring a contractor online is the risk of getting robbed, plain and simple. We’ve invested six figures in a physical showroom where you can see the quality of our products in person, helping you avoid these painful situations."
    },
    {
      icon: Hammer,
      title: 'Built as cabinetry',
      subtitle: 'Not drywall',
      content: "Our projects are built using wood and cabinet-grade finishes, not sheetrock. Woodwork allows for crisper lines and a higher-end feel. You can be an excellent drywall professional with basic tools, but finish carpentry takes years of training and heavy equipment."
    },
    {
      icon: UserCheck,
      title: 'Dedicated manager',
      subtitle: '1-on-1 Experience',
      content: "The person who reviewed your home is the same person responsible for delivering it. Roles aren't passed between individuals. You don’t need to manage or supervise installers; this person is fully dedicated to overseeing the project from start to finish."
    },
    {
      icon: Receipt,
      title: 'Fixed pricing',
      subtitle: 'No surprises',
      content: "We don’t take on projects where the quote needs to stay open. All relevant variables are reviewed during the measurement. We know how unexpected charges destroy trust, so we’d rather absorb the cost than pass it on to you."
    },
    {
      icon: Box,
      title: 'Relocatable Models',
      subtitle: 'Secure Investment',
      content: "Normally, if you move, you lose your investment. Our builds are designed to be uninstalled and adapted to a new space. Instead of moving a generic bed frame, you’re preserving a $5–15k media wall that can be relocated or sold."
    },
    {
      icon: Gem,
      title: 'Boutique approach',
      subtitle: 'Quality over scale',
      content: "We limit how many jobs we take on each month to maintain quality. Many companies turn into fast-food chains; that simply doesn’t represent our style. We chose good taste over mass production and customized unique projects over repetition."
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-wood-50 border-t border-wood-200 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-wood-100/30 -skew-x-12 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20 max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif italic text-wood-900 leading-[1.1]">
            Why Us
          </h2>
        </div>

        {/* Grid Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            
            return (
              <div 
                key={index}
                onClick={() => toggleCard(index)}
                className={`group relative rounded-2xl p-8 cursor-pointer transition-all duration-500 border ${
                  isActive 
                    ? 'bg-wood-900 text-wood-50 border-wood-900 shadow-2xl -translate-y-2' 
                    : 'bg-white text-wood-900 border-wood-200 hover:border-wood-300 hover:shadow-lg hover:-translate-y-1'
                }`}
              >
                {/* Icon & Toggle Indicator */}
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl transition-colors ${
                    isActive ? 'bg-wood-800 text-wood-100' : 'bg-wood-50 text-wood-900'
                  }`}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <button className={`transition-transform duration-300 ${isActive ? 'rotate-180 text-wood-400' : 'text-wood-300 group-hover:text-wood-900'}`}>
                    {isActive ? <Minus size={20} /> : <Plus size={20} />}
                  </button>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-2xl font-serif italic mb-1">{item.title}</h3>
                  <p className={`text-xs font-bold uppercase tracking-widest mb-4 transition-colors ${
                    isActive ? 'text-wood-400' : 'text-wood-500'
                  }`}>
                    {item.subtitle}
                  </p>
                </div>

                {/* Expandable Content */}
                <div 
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
                    isActive ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className={`text-sm leading-relaxed ${isActive ? 'text-wood-200' : 'text-wood-600'}`}>
                      {item.content}
                    </p>
                    
                    {/* "Read less" visual cue only when open */}
                    <div className="mt-4 flex items-center gap-2 text-xs font-medium text-wood-400">
                      <span>Key Advantage</span>
                      <div className="h-[1px] flex-1 bg-wood-700"></div>
                    </div>
                  </div>
                </div>

                {/* Hover hint when closed */}
                {!isActive && (
                  <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <ArrowUpRight size={20} className="text-wood-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};