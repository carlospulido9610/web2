
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
      content: "The biggest concern homeowners have when hiring a contractor online is the risk of getting robbed, plain and simple, whether financially or in terms of quality. For our customers' peace of mind, we've invested six figures in a physical showroom where you can see the quality of our products and materials in person, be guided and get inspired with our proven models, helping you avoid these painful situations." 
    },
    { 
      icon: Hammer, 
      title: 'Built as cabinetry', 
      subtitle: 'Not drywall', 
      content: "Our projects are built using wood and cabinet-grade finishes, not sheetrock. Have you ever noticed how some companies have better-looking projects than others, even when the design is the same? This is the main reason. Woodwork allows for crisper lines and a higher-end feel, while using more durable materials. There's a level of precision that isn't comparable to standard drywall work. You can be an excellent drywall professional with little more than a truck and basic tools, while becoming a competent finish carpenter takes years of training, heavy equipment, and experience, and that difference shows in the final result." 
    },
    { 
      icon: UserCheck, 
      title: 'Dedicated manager', 
      subtitle: 'For each project', 
      content: "The person who reviewed your home for the installation and sold you the project is the same person responsible for delivering it with our in-house team. Giving you a 1 on 1 experience. When hiring a professional company, roles are often passed between individuals, and it's not always clear who is making sure everything discussed is executed as agreed. We've limited our capacity to ensure a smoother installation process. You don't need to manage or supervise installers, this person is fully dedicated to overseeing the project from start to finish." 
    },
    { 
      icon: Receipt, 
      title: 'Fixed pricing', 
      subtitle: 'No surprises', 
      content: "We don't take on projects where the outcome is uncertain and the quote needs to stay open. Your price is fixed — there are no surprises or upcharges. All relevant variables are reviewed during the measurement appointment and accounted for in your final pricing. We take this seriously. As consumers ourselves, we know how unexpected charges completely destroy trust, and we'd rather absorb the cost than pass it on to you. You'll only pay more if you choose to add more work. That's it." 
    },
    { 
      icon: Box, 
      title: 'Relocatable Models', 
      subtitle: 'Secure Investment', 
      content: "Normally, if you suddenly move, you lose the investment you just made. That's why we introduced our Relocatable Models. These builds are designed to be uninstalled and adapted to a new space. Just like taking your bed frame with you when you move. The difference is that instead of moving a $200 bed frame, you're preserving a $5-15k media wall that can be relocated to your next home, or sold again." 
    },
    { 
      icon: Gem, 
      title: 'Boutique approach', 
      subtitle: 'Quality over scale', 
      content: "We intentionally take a boutique approach with our customers, limiting how many jobs we take on each month, that allows us to maintain quality, customization, and control over every piece we build. After gaining traction, many media wall companies turn project layouts into photocopies, operating more like fast-food chains than custom builders, and that simply doesn't represent our style. We've grown by taking on larger and more unique projects, not by repeating the same thing over and over, and we will always choose good taste over mass production." 
    }
  ];

  return (
    <section id="why-us" className="pt-8 md:pt-14 pb-12 md:pb-20 bg-wood-50 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <h2 className="text-5xl md:text-7xl font-canale text-wood-900 mb-6 md:mb-10 leading-[0.9] tracking-tighter uppercase">
          Why <span className="font-canale text-wood-400 opacity-60">Us</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-3">
          {reasons.map((item, index) => {
            const isActive = activeIndex === index;
            const Icon = item.icon;
            return (
              <div key={index} onClick={() => toggleCard(index)}
                className={`p-5 md:p-8 cursor-pointer border rounded-sm transition-all flex flex-col justify-center min-h-[80px] md:min-h-[120px] ${isActive ? 'bg-wood-900 border-wood-900' : 'bg-white border-wood-200 shadow-sm'}`}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 md:gap-4 flex-1">
                      <div className={`shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center rounded-sm transition-colors ${isActive ? 'bg-wood-800 text-wood-50' : 'bg-wood-100 text-wood-900'}`}>
                        <Icon size={18} className="md:w-5 md:h-5" />
                      </div>
                      <h3 className={`text-sm md:text-xl font-canale uppercase tracking-tight leading-none md:leading-tight ${isActive ? 'text-wood-50' : 'text-wood-900'}`}>
                        {item.title}
                      </h3>
                    </div>
                    <div className="shrink-0 ml-2">
                      {isActive ? <Minus size={16} className="text-wood-400" /> : <Plus size={16} className="text-wood-300" />}
                    </div>
                  </div>
                  
                  <div className={`grid transition-[grid-template-rows,margin-top] duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] mt-5 md:mt-6' : 'grid-rows-[0fr] mt-0'}`}>
                    <div className="overflow-hidden">
                      <p className={`text-[9px] md:text-[10px] font-manrope font-black uppercase tracking-widest mb-2 ${isActive ? 'text-wood-400' : 'text-wood-500'}`}>{item.subtitle}</p>
                      <p className={`text-xs md:text-sm leading-relaxed font-manrope font-medium ${isActive ? 'text-wood-200' : 'text-wood-600'}`}>{item.content}</p>
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
