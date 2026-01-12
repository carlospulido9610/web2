
import React, { useState } from 'react';
import { Store, Hammer, UserCheck, Receipt, Box, Gem, Plus, Minus } from 'lucide-react';

export const WhyUs: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const toggleCard = (index: number) => setActiveIndex(activeIndex === index ? null : index);

  const reasons = [
    { 
      icon: Store, 
      title: 'Physical showroom', 
      subtitle: 'Not just photos', 
      content: "The biggest concern homeowners have when hiring a contractor online is the risk of getting robbed. We’ve invested six figures in a physical showroom so you can verify our quality in person." 
    },
    { 
      icon: Hammer, 
      title: 'Built as cabinetry', 
      subtitle: 'Not drywall', 
      content: "Our projects are built using wood and cabinet-grade finishes, not sheetrock. Woodwork allows for crisper lines and a higher-end feel compared to standard drywall construction." 
    },
    { 
      icon: UserCheck, 
      title: 'Dedicated manager', 
      subtitle: '1-on-1 Experience', 
      content: "The person who reviewed your home is the same person responsible for delivering it. You don’t need to manage installers; this person is fully dedicated to overseeing your project." 
    },
    { 
      icon: Receipt, 
      title: 'Fixed pricing', 
      subtitle: 'No surprises', 
      content: "We don’t take on projects where the quote needs to stay open. We know how unexpected charges destroy trust, so we’d rather absorb the cost than pass it on to you." 
    },
    { 
      icon: Box, 
      title: 'Relocatable Models', 
      subtitle: 'Secure Investment', 
      content: "Our builds are designed to be uninstalled and adapted to a new space. Instead of sunk costs, you’re preserving a media wall that can be relocated or sold." 
    },
    { 
      icon: Gem, 
      title: 'Boutique approach', 
      subtitle: 'Quality over scale', 
      content: "We limit how many jobs we take on each month to maintain quality. We chose good taste over mass production and customized unique projects over repetition." 
    }
  ];

  return (
    <section id="why-us" className="pt-0 pb-12 bg-wood-50 relative z-10 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="-mt-4 pt-0 mb-4">
          <h2 className="text-5xl md:text-7xl font-canela text-wood-900 mb-2 leading-[0.9] tracking-tighter uppercase">
            Why homeowners <br /> <span className="editorial-serif lowercase normal-case font-normal text-wood-400">trust us.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {reasons.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            return (
              <div 
                key={index}
                onClick={() => toggleCard(index)}
                className={`group p-8 cursor-pointer transition-all duration-300 border rounded-sm overflow-hidden ${
                  isActive ? 'bg-wood-900 border-wood-900 shadow-xl' : 'bg-white border-wood-200'
                }`}
              >
                  <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-sm transition-colors ${isActive ? 'bg-wood-800 text-wood-50' : 'bg-wood-100 text-wood-900'}`}>
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-canela uppercase tracking-tight transition-colors ${isActive ? 'text-wood-50' : 'text-wood-900'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <div className={`transition-transform duration-300 ${isActive ? 'rotate-180' : 'rotate-0'}`}>
                       {isActive ? <Minus size={18} className="text-wood-400" /> : <Plus size={18} className="text-wood-300" />}
                    </div>
                  </div>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-out ${isActive ? 'grid-rows-[1fr] pt-6' : 'grid-rows-[0fr] pt-0'}`}>
                    <div className="overflow-hidden">
                      <p className={`text-[10px] font-manrope font-black uppercase tracking-widest mb-2 ${isActive ? 'text-wood-400' : 'text-wood-500'}`}>
                        {item.subtitle}
                      </p>
                      <p className={`text-sm leading-relaxed font-manrope font-medium ${isActive ? 'text-wood-200' : 'text-wood-600'}`}>
                        {item.content}
                      </p>
                    </div>
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
