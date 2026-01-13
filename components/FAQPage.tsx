
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ_DATA = [
  { 
    id: 'sales', 
    title: 'Sales & Process', 
    items: [
      { 
        question: "How do I place an order?", 
        answer: "Fill out the contact form and someone will reach out the same day.\nYou can also text us to receive information about visiting the showroom or booking an in-home visit. From there, a visit is scheduled, a deposit is placed, and your project moves forward." 
      },
      { 
        question: "Where is your showroom and when can I visit?", 
        answer: "8074 Shoal Creek Blvd, Suite 204\nYou can book an appointment to tour the models between 10:00 AM -- 6:00 PM, any available day on the calendar." 
      },
      { 
        question: "Do you offer free quotes?", 
        answer: "Quotes are free and can be provided over the phone with a reference image and approximate dimensions, or in person at the showroom.\nWe're happy to answer questions and make recommendations based on your input.\nIf you're looking for an in-home consultation, where we evaluate your home's specific conditions and help guide decisions based on architecture, taste, and budget, a $100 deposit is required. This amount is fully credited toward your total if you move forward." 
      },
      { 
        question: "What's included in the in-home visit? Is it refundable?", 
        answer: "The in-home visit is a no-time-limit consultation where we review your space, discuss options, show similar projects, provide feedback, work toward a clear design direction, deliver a fixed quote, and estimate timelines.\nIt's not refundable, but the amount remains credited to you if you decide to move forward --- whether next week or next year." 
      },
      { 
        question: "How far out are you booking projects?", 
        answer: "We can book projects up to 6 months in advance, depending on availability and project scope." 
      },
      { 
        question: "When are you available to start?", 
        answer: "Exact installation dates are scheduled after a deposit is placed, as projects are delivered and scheduled on a rolling basis.\nOnce your deposit is in, you can generally expect a 1--4 week wait, depending on the complexity of your project and current workload." 
      },
      { 
        question: "How long does a project take?", 
        answer: "Center units: 1--2 days\nFull media walls: 2--4 days\nWall-to-wall builds, room transformations, or larger custom projects: 4--6 days" 
      },
      { 
        question: "Do you work with designers, architects, contractors, or builders?", 
        answer: "We work directly with designers.\nWe can also work with architects or builders once a clear partnership has been established.\nWe don't work as subcontractors for other contractors." 
      },
      { 
        question: "Do you offer a warranty?", 
        answer: "All projects include a one-year warranty on items purchased through us." 
      },
      { 
        question: "Are you insured and bonded?", 
        answer: "Yes." 
      }
    ] 
  },
  { 
    id: 'pricing', 
    title: 'Pricing & Payments', 
    items: [
      { 
        question: "Do you offer financing?", 
        answer: "Not at this time. However, payments are split into phases. You can place your deposit first and let us know when you're financially ready to schedule installation." 
      },
      { 
        question: "How much is the deposit?", 
        answer: "Projects under $4,000: 50% deposit\nProjects over $4,000: 35% deposit\nAccent walls: fixed deposit between $250--$600, depending on scope" 
      },
      { 
        question: "What is the minimum project size?", 
        answer: "Due to our overhead and the logistics required to ensure consistent results, our minimum project sizes are:\n\n$2,500 for center units\n$4,500 for media walls and cabinetry\n$1,200 for accent walls and painting\n\nWe don't take on small repairs or handyman-type jobs unless we're already on site." 
      },
      { 
        question: "What payment methods do you accept?", 
        answer: "Cash, check, Zelle, Venmo, and credit cards through the Venmo app." 
      },
      { 
        question: "When do I make payments?", 
        answer: "Deposit due at contract signing (home visit, showroom, or remotely)\nOne-day projects: remaining balance due upon completion\nMulti-day projects:\n\n- deposit at signing\n- second payment at installation start\n- final payment upon completion" 
      },
      { 
        question: "Is pricing negotiable?", 
        answer: "Not typically. However, multiple projects completed at the same time may receive better pricing due to reduced logistics.\nWe're happy to adjust the scope of work creatively to help you get as close as possible to the look you want within your budget. Occasionally, we may run limited promotions." 
      },
      { 
        question: "Can I supply my own materials and pay only for labor?", 
        answer: "No --- unless the material itself is the project (for example, if you already own the correct tile, panels, or fireplace).\nAll other components are handled by us. We provide a closed solution, which allows us to take full responsibility for the final result." 
      }
    ] 
  },
  { 
    id: 'technical', 
    title: 'Technical & Install', 
    items: [
      { 
        question: "Are your projects built with drywall or wood?", 
        answer: "Our projects are built using wood construction and cabinet-grade finishes, not standard drywall.\nThis allows for cleaner lines, better durability, and a higher-end final result." 
      },
      { 
        question: "Who will be working on my project?", 
        answer: "All projects are completed by our in-house team, not random subcontractors.\nEach project is supervised by a dedicated manager --- the same person who reviewed your home and sold you the project." 
      },
      { 
        question: "Should my fireplace go all the way up the wall?", 
        answer: "For one-story ceilings, yes --- this achieves the best visual result.\nFor two-story ceilings, going all the way up is the most striking option. If budget doesn't allow for it, stopping at the first-floor height still looks intentional and cohesive." 
      },
      { 
        question: "I have a tilted, irregular, or two-story ceiling. Can you do my project?", 
        answer: "We have multiple solutions for sloped or irregular ceilings, and we design each project around those conditions.\nAll of our fireplaces and media walls can also be built at two-story height." 
      },
      { 
        question: "How do you connect everything electrically?", 
        answer: "We connect the media wall using an extension from your existing outlet, similar to plugging in a lamp.\nNo additional electrical installation is required." 
      },
      { 
        question: "How do I control the lights?", 
        answer: "Lighting is controlled either through an app or with remote controls, depending on the setup." 
      },
      { 
        question: "How is the soundbar installed and connected?", 
        answer: "Your soundbar can be installed floating, using brackets that are nearly invisible, or integrated, with a custom opening built specifically for it.\nIn both cases, we create a concealed access point behind the soundbar so all wiring runs internally through the build and connects directly to the back of the TV." 
      },
      { 
        question: "Will I see any wires?", 
        answer: "No. All required wiring is routed inside the unit, completely hidden from view.\nVisible wires defeat the purpose of a built-in. The only situation where wires would be visible is if additional devices or cables are added after the project is completed without allowing us to plan for them." 
      },
      { 
        question: "Do I need a TV mount?", 
        answer: "If you want us to install the TV, a brand-new mount is required.\nYou may supply one or purchase it from us. We don't install used mounts, as we can't guarantee their integrity." 
      },
      { 
        question: "Will you install the fireplace, TV, soundbar, Apple TV, etc.?", 
        answer: "We will, as long as this is discussed upfront and all wiring is supplied and explained in advance.\nWe leave everything installed, connected, and fully tested before completion." 
      }
    ] 
  },
  { 
    id: 'fireplace', 
    title: 'Fireplace', 
    items: [
      { 
        question: "What size fireplace is right for my TV?", 
        answer: "TVs 75\" or smaller: a 60\" fireplace works well\nTVs 85\" and larger: we recommend at least a 72\" fireplace" 
      },
      { 
        question: "Do you install gas fireplaces?", 
        answer: "No. We don't install gas fireplaces." 
      },
      { 
        question: "Does the fireplace insert come with a warranty? Can I buy and install my own?", 
        answer: "If purchased through us, the fireplace includes a one-year replacement warranty, handled directly by us at no cost.\nIf you supply your own fireplace, we can install it, but we won't be able to provide warranty coverage." 
      },
      { 
        question: "I have a gas fireplace. Can you work on my home?", 
        answer: "We can either design and build around an existing gas fireplace or remove it and replace it with one of our electric fireplace inserts.\nWe don't install gas fireplaces." 
      },
      { 
        question: "I don't want a fireplace, or I already have one I plan to keep. Can you design the project without it?", 
        answer: "A fireplace is optional. We can design the project without one and replace it with storage or other elements that better fit your living room and how you use the space." 
      },
      { 
        question: "Does the fireplace provide heat?", 
        answer: "The fireplace provides heat and includes color-changing options.\nThat said, it's primarily designed for ambiance. We recommend using your home's HVAC system for primary heating." 
      }
    ] 
  },
  { 
    id: 'future', 
    title: 'Future', 
    items: [
      { 
        question: "Can I add elements to my design later on?", 
        answer: "In most cases, yes. For example, you can start with a center unit and add side units later, repaint the piece if you want a change, or incorporate additional features over time." 
      },
      { 
        question: "What's better for my project: a recessed TV or a surface-mounted TV?", 
        answer: "If your design features materials that are very prominent --- such as tile, stone, or paneling --- we usually recommend placing the TV on the surface rather than recessed. This creates a cleaner look and allows more flexibility for future TV size changes.\nA recessed TV can look sharper in certain designs. However, replacing the TV later would require using the same size.\nUltimately, this is a matter of personal preference. There's no right or wrong option --- only what works best for your design and how you plan to use the space." 
      },
      { 
        question: "Should I pay extra for a relocatable model?", 
        answer: "A relocatable model turns your build into an asset, allowing you to move your investment with you instead of paying for it again.\nIn some cases, the piece can also be resold." 
      }
    ] 
  }
];

export const FAQPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState(FAQ_DATA[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const activeCategory = FAQ_DATA.find(cat => cat.id === activeTab) || FAQ_DATA[0];

  return (
    <div className="bg-wood-50 min-h-screen animate-fade-in-up">
      {/* Header */}
      <div className="bg-wood-900 text-white pt-24 md:pt-32 pb-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-8xl font-canale uppercase mb-4 md:mb-6 tracking-tight leading-[0.9]">F.A.Q.</h1>
            <p className="text-wood-200 text-base md:text-xl font-manrope font-medium max-w-2xl leading-relaxed opacity-80">
               Common questions about pricing, timeline, and installation.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-6 md:py-10">
           {/* Horizontal Navigation Grid: Eliminates whitespace, ensures visibility on entry */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 md:mb-10">
                {FAQ_DATA.map((cat) => (
                  <button key={cat.id} onClick={() => { setActiveTab(cat.id); setOpenFaqIndex(null); }}
                    className={`px-4 py-3 md:py-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] font-manrope rounded-sm transition-all border text-center flex items-center justify-center ${activeTab === cat.id ? 'bg-wood-900 text-white border-wood-900' : 'bg-white text-wood-400 border-wood-200 hover:border-wood-300 hover:text-wood-900'}`}>
                    {cat.title}
                  </button>
                ))}
           </div>
             
           {/* Content Area */}
           <div className="min-h-[60vh]">
             <div className="bg-white border border-wood-100 divide-y divide-wood-50 rounded-sm shadow-sm">
               {activeCategory.items.map((faq, index) => {
                 const isOpen = openFaqIndex === index;
                 return (
                   <div key={index}>
                     <button onClick={() => setOpenFaqIndex(isOpen ? null : index)} className="w-full flex items-center justify-between p-6 md:p-8 text-left font-manrope hover:bg-wood-50/50 transition-colors">
                       <span className="font-bold text-wood-900 uppercase text-xs md:text-base tracking-tight pr-8 leading-snug">{faq.question}</span>
                       {isOpen ? <Minus size={18} className="text-wood-900 shrink-0" /> : <Plus size={18} className="text-wood-300 shrink-0" />}
                     </button>
                     <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                       <div className="px-6 pb-6 md:px-8 md:pb-8 text-wood-500 text-sm md:text-base leading-relaxed font-manrope font-medium whitespace-pre-line">
                          {faq.answer}
                       </div>
                     </div>
                   </div>
                 );
               })}
             </div>
           </div>
      </div>
    </div>
  );
};
