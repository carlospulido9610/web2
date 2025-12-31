import React, { useState } from 'react';
import { ArrowLeft, Plus, Minus, HelpCircle, ShieldCheck, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';

// --- DATA STRUCTURES ---

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

interface ProcessStepDetail {
  number: number;
  title: string;
  description?: string;
  subOptions?: { title: string; content: string }[];
  listItems?: string[];
  footer?: string;
}

// --- DATA CONTENT ---

const DETAILED_STEPS: ProcessStepDetail[] = [
  {
    number: 1,
    title: 'Define your starting point and what you need from us',
    description: '',
    subOptions: [
      {
        title: "I know what I want — I just need pricing (See models)*",
        content: "Great. Send us a reference image or sketch along with your approximate wall dimensions and location. After a few clarifying questions, we can provide clear, exact pricing. We’ll also suggest variations of the same design across different price ranges so you can make an informed decision."
      },
      {
        title: "I know what I like, but I need guidance (Make an appointment)*",
        content: "Perfect. Browse our catalog or visit the showroom to get inspired and guided through the process of customizing one of our proven models based on your space. You can also book an in-home assessment, where we’ll help refine your ideas and propose a solution that works for your home while reflecting your personal taste. This requires a $100 deposit, which is applied toward your quote."
      },
      {
        title: "I want to invest in a fully designed environment for my home (See our design services)*",
        content: "For full room transformations or projects involving multiple elements, we begin with a dedicated design phase to properly define the concept, layout, and key decisions. This phase is offered as a separate service for larger scopes of work and focuses on curation, rendering, and working with a designer prior to construction. It can begin with an in-home assessment or at the showroom, where you can propose and refine your vision."
      }
    ]
  },
  {
    number: 2,
    title: 'Get a clear quote with everything you need to know',
    description: 'Whether you request pricing remotely or visit the showroom, a quote can often be provided on the spot. We don’t take days to get back to you, and we don’t use jargon that’s difficult for the average person to understand. Our systems and pricing are well defined, and our quotes are standardized.',
    listItems: [
      "The base design and the maximum possible size included, which will later be adjusted during the on-site visit",
      "Requested customizations, add-ons, and material allowances",
      "Estimated turnaround and installation time",
      "Payment structure",
      "What’s included and what’s not"
    ]
  },
  {
    number: 3,
    title: 'Start the process and place a deposit',
    description: "After reviewing the quote, you can decide whether to book the measurement appointment. This visit requires a $100 deposit, which is applied toward your final quote. During the appointment, we confirm every detail on site, review everything together, and walk you through the installation process. If everything looks good, the contract will be signed and your project deposit will be placed.",
    footer: "If you move ahead directly at the showroom, your deposit can be placed there and your measurement appointment scheduled on the spot."
  },
  {
    number: 4,
    title: 'Selections and final decisions',
    description: "You don’t need to have everything decided to move forward. Final selections such as colors, finishes, or similar details don’t affect how the project is built or how long it takes, so they don’t impact pricing. This allows you to move forward with confidence and refine those choices later with our guidance, knowing pricing is locked and the project is already scheduled. Many clients get stuck in the material or color-selection phase indefinitely. Committing to the project first often makes those decisions feel easier.",
    footer: "Once the project begins, our typical turnaround is 1–4 weeks, depending on complexity. After the project is confirmed, you’ll receive a selection list to complete, including our recommendations and the specific variations of your chosen design."
  },
  {
    number: 5,
    title: 'Installation',
    description: "In some cases, an installation date can be agreed upon in advance. However, as a general rule, we can’t provide an exact installation date at the start of the process. Instead, we work within a defined turnaround timeframe of 1–4 weeks, depending on project complexity. Approximately one week before installation, we’ll confirm the scheduled date, the expected duration of the install, and any preparation needed to make the process as smooth as possible for everyone involved.",
    footer: "Once installation begins, the second of three payments is due if the project spans multiple days."
  },
  {
    number: 6,
    title: 'Completion and walkthrough',
    description: "Once the project is completed, we’ll walk you through the finished work, explain how everything is laid out and connected, and go over any details that may be useful for you in the future. We don’t rush this step. We take the time needed to review everything together and ensure the project is completed as it should be, helping avoid unnecessary callbacks later on.",
    footer: "Once the walkthrough is complete and everything has been reviewed, final payment is due and expected at that time."
  }
];

const FAQ_DATA: FAQCategory[] = [
  {
    id: 'sales',
    title: 'Sales & Process',
    items: [
      {
        question: "How do I place an order?",
        answer: "Fill out the contact form and someone will reach out the same day. You can also text us to receive information about visiting the showroom or booking an in-home visit. From there, a visit is scheduled, a deposit is placed, and your project moves forward."
      },
      {
        question: "Where is your showroom and when can I visit?",
        answer: "We are located at 8074 Shoal Creek Blvd, Suite 204. You can book an appointment to tour the models between 10:00 AM – 6:00 PM, any available day on the calendar."
      },
      {
        question: "Do you offer free quotes?",
        answer: "Yes. Quotes are free and can be provided over the phone with a reference image and approximate dimensions, or in person at the showroom. We’re happy to answer questions and make recommendations based on your input. If you’re looking for an in-home consultation, where we evaluate your home’s specific conditions and help guide decisions based on architecture, taste, and budget, a $100 deposit is required. This amount is fully credited toward your total if you move forward."
      },
      {
        question: "What’s included in the in-home visit? Is it refundable?",
        answer: "The in-home visit is a no-time-limit consultation where we review your space, discuss options, show similar projects, provide feedback, work toward a clear design direction, deliver a fixed quote, and estimate timelines. It’s not refundable, but the amount remains credited to you if you decide to move forward — whether next week or next year."
      },
      {
        question: "How far out are you booking projects?",
        answer: "We can book projects up to 6 months in advance, depending on availability and project scope."
      },
      {
        question: "When are you available to start?",
        answer: "Exact installation dates are scheduled after a deposit is placed, as projects are delivered and scheduled on a rolling basis. Once your deposit is in, you can generally expect a 1–4 week wait, depending on the complexity of your project and current workload."
      },
      {
        question: "How long does a project take?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Center units:</strong> 1–2 days</li>
            <li><strong>Full media walls:</strong> 2–4 days</li>
            <li><strong>Wall-to-wall builds:</strong> 4–6 days (includes room transformations or larger custom projects)</li>
          </ul>
        )
      },
      {
        question: "Do you work with designers, architects, contractors, or builders?",
        answer: "We work directly with designers. We can also work with architects or builders once a clear partnership has been established. However, we don’t work as subcontractors for other contractors."
      },
      {
        question: "Do you offer a warranty?",
        answer: "Yes. All projects include a one-year warranty on items purchased through us."
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
        answer: "Not at this time. However, payments are split into phases. You can place your deposit first and let us know when you’re financially ready to schedule installation."
      },
      {
        question: "How much is the deposit?",
        answer: (
           <ul className="list-disc pl-5 space-y-1">
            <li><strong>Projects under $4,000:</strong> 50% deposit</li>
            <li><strong>Projects over $4,000:</strong> 35% deposit</li>
            <li><strong>Accent walls:</strong> Fixed deposit between $250–$600, depending on scope</li>
          </ul>
        )
      },
      {
        question: "What is the minimum project size?",
        answer: (
          <div className="space-y-2">
            <p>Due to our overhead and the logistics required to ensure consistent results, our minimum project sizes are:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>$2,500</strong> for center units</li>
              <li><strong>$4,500</strong> for media walls and cabinetry</li>
              <li><strong>$1,200</strong> for accent walls and painting</li>
            </ul>
            <p className="text-xs italic mt-2">We don’t take on small repairs or handyman-type jobs unless we’re already on site.</p>
          </div>
        )
      },
      {
        question: "What payment methods do you accept?",
        answer: "Cash, check, Zelle, Venmo, and credit cards through the Venmo app."
      },
      {
        question: "When do I make payments?",
        answer: (
          <div className="space-y-2">
            <p><strong>Deposit:</strong> Due at contract signing (home visit, showroom, or remotely).</p>
            <p><strong>One-day projects:</strong> Remaining balance due upon completion.</p>
            <p><strong>Multi-day projects:</strong></p>
             <ul className="list-disc pl-5 space-y-1">
              <li>Deposit at signing</li>
              <li>Second payment at installation start</li>
              <li>Final payment upon completion</li>
            </ul>
          </div>
        )
      },
      {
        question: "Is pricing negotiable?",
        answer: "No. However, multiple projects completed at the same time may receive better pricing due to reduced logistics. We’re also happy to adjust the scope of work creatively to help you get as close as possible to the look you want within your budget. Occasionally, we may run limited promotions."
      },
      {
        question: "Can I supply my own materials and pay only for labor?",
        answer: "No — unless the material itself is the project (for example, if you already own the correct tile, panels, or fireplace). All other components are handled by us. We provide a closed solution, which allows us to take full responsibility for the final result."
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Installation',
    items: [
      {
        question: "Are your projects built with drywall or wood?",
        answer: "Our projects are built using wood construction and cabinet-grade finishes, not standard drywall. This allows for cleaner lines, better durability, and a higher-end final result."
      },
      {
        question: "Who will be working on my project?",
        answer: "All projects are completed by our in-house team, not random subcontractors. Each project is supervised by a dedicated manager — the same person who reviewed your home and sold you the project."
      },
      {
        question: "Should my fireplace go all the way up the wall?",
        answer: "For one-story ceilings, yes — this achieves the best visual result. For two-story ceilings, going all the way up is the most striking option. If budget doesn’t allow for it, stopping at the first-floor height still looks intentional and cohesive."
      },
      {
        question: "I have a tilted, irregular, or two-story ceiling. Can you do my project?",
        answer: "Yes. We have multiple solutions for sloped or irregular ceilings, and we design each project around those conditions. All of our fireplaces and media walls can also be built at two-story height."
      },
      {
        question: "How do you connect everything electrically?",
        answer: "We connect the media wall using an extension from your existing outlet, similar to plugging in a lamp. No additional electrical installation is required."
      },
      {
        question: "How do I control the lights?",
        answer: "Lighting is controlled either through an app or with remote controls, depending on the setup."
      },
      {
        question: "How is the soundbar installed and connected?",
        answer: "Your soundbar can be installed floating, using brackets that are nearly invisible, or integrated, with a custom opening built specifically for it. In both cases, we create a concealed access point behind the soundbar so all wiring runs internally through the build and connects directly to the back of the TV."
      },
      {
        question: "Will I see any wires?",
        answer: "No. All required wiring is routed inside the unit, completely hidden from view. Visible wires defeat the purpose of a built-in. The only situation where wires would be visible is if additional devices or cables are added after the project is completed without allowing us to plan for them."
      },
      {
        question: "Do I need a TV mount?",
        answer: "Yes. If you want us to install the TV, a brand-new mount is required. You may supply one or purchase it from us. We don’t install used mounts, as we can’t guarantee their integrity."
      },
      {
        question: "Will you install the fireplace, TV, soundbar, Apple TV, etc.?",
        answer: "Yes, as long as this is discussed upfront and all wiring is supplied and explained in advance. We leave everything installed, connected, and fully tested before completion."
      }
    ]
  },
  {
    id: 'fireplace',
    title: 'Fireplace Questions',
    items: [
      {
        question: "What size fireplace is right for my TV?",
        answer: (
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>TVs 75” or smaller:</strong> a 60” fireplace works well</li>
            <li><strong>TVs 85” and larger:</strong> we recommend at least a 72” fireplace</li>
          </ul>
        )
      },
      {
        question: "Do you install gas fireplaces?",
        answer: "No. We don’t install gas fireplaces."
      },
      {
        question: "Does the fireplace insert come with a warranty? Can I buy and install my own?",
        answer: "If purchased through us, the fireplace includes a one-year replacement warranty, handled directly by us at no cost. If you supply your own fireplace, we can install it, but we won’t be able to provide warranty coverage."
      },
      {
        question: "I have a gas fireplace. Can you work on my home?",
        answer: "Yes. We can either design and build around an existing gas fireplace or remove it and replace it with one of our electric fireplace inserts. We don’t install gas fireplaces."
      },
      {
        question: "I don’t want a fireplace, or I already have one I plan to keep. Can you design the project without it?",
        answer: "Yes. A fireplace is optional. We can design the project without one and replace it with storage or other elements that better fit your living room and how you use the space."
      },
      {
        question: "Does the fireplace provide heat?",
        answer: "Yes. The fireplace provides heat and includes color-changing options. That said, it’s primarily designed for ambiance. We recommend using your home’s HVAC system for primary heating."
      }
    ]
  },
  {
    id: 'future',
    title: 'Future Considerations',
    items: [
      {
        question: "Can I add elements to my design later on?",
        answer: "In most cases, yes. For example, you can start with a center unit and add side units later, repaint the piece if you want a change, or incorporate additional features over time."
      },
      {
        question: "What’s better for my project: a recessed TV or a surface-mounted TV?",
        answer: "If your design features materials that are very prominent — such as tile, stone, or paneling — we usually recommend placing the TV on the surface rather than recessed. This creates a cleaner look and allows more flexibility for future TV size changes. A recessed TV can look sharper in certain designs. However, replacing the TV later would require using the same size. Ultimately, this is a matter of personal preference. There’s no right or wrong option — only what works best for your design and how you plan to use the space."
      },
      {
        question: "Should I pay extra for a relocatable model?",
        answer: "Yes. A relocatable model turns your build into an asset, allowing you to move your investment with you instead of paying for it again. In some cases, the piece can also be resold."
      }
    ]
  }
];

interface ProcessFAQProps {
  onBack: () => void;
}

export const ProcessFAQ: React.FC<ProcessFAQProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<string>(FAQ_DATA[0].id);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const activeCategory = FAQ_DATA.find(cat => cat.id === activeTab) || FAQ_DATA[0];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setOpenFaqIndex(null); // Close accordion when switching tabs
  };

  const handleToggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-wood-50 min-h-screen animate-fade-in-up">
      
      {/* --- HERO SECTION --- */}
      <div className="bg-wood-900 text-wood-50 pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wood-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif mb-6">Process & <span className="italic text-wood-300">Frequently Asked Questions</span></h1>
            <p className="text-wood-200 text-lg font-light max-w-2xl leading-relaxed">
              Transparency is the foundation of our business. Here is a detailed look at our workflow and answers to everything you need to know.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* --- PART 1: PROCESS (Vertical Detailed Layout) --- */}
        <div className="mb-32">
          <h3 className="text-2xl font-serif text-wood-900 flex items-center gap-3 mb-12">
            <FileText className="text-wood-400" />
            Detailed Workflow
          </h3>
          
          <div className="space-y-16">
            {DETAILED_STEPS.map((step, index) => (
              <div key={step.number} className="relative flex gap-8">
                
                {/* Number Column */}
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-wood-900 text-wood-50 font-serif text-xl z-10">
                    {step.number}
                  </div>
                  {/* Line connector */}
                  {index !== DETAILED_STEPS.length - 1 && (
                    <div className="w-px h-full bg-wood-300 my-4"></div>
                  )}
                </div>

                {/* Content Column */}
                <div className="pb-4 w-full">
                  <h4 className="text-3xl font-serif text-wood-900 mb-4">{step.title}</h4>
                  
                  {step.description && (
                    <p className="text-wood-600 text-lg font-light leading-relaxed max-w-3xl mb-6">
                      {step.description}
                    </p>
                  )}

                  {/* Sub Options (Step 1 Special Layout) */}
                  {step.subOptions && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                      {step.subOptions.map((opt, i) => (
                        <div key={i} className="bg-white p-6 border border-wood-200 rounded-sm shadow-sm hover:shadow-md transition-shadow">
                          <h5 className="font-bold text-wood-900 mb-3 text-sm uppercase tracking-wide">{opt.title}</h5>
                          <p className="text-sm text-wood-600 leading-relaxed">{opt.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Lists (Step 2 Special Layout) */}
                  {step.listItems && (
                    <div className="bg-wood-100/50 p-6 rounded-sm border border-wood-200 max-w-2xl">
                      <p className="text-xs font-bold uppercase tracking-widest text-wood-500 mb-4">What's included in the quote:</p>
                      <ul className="space-y-3">
                        {step.listItems.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-wood-800 text-sm">
                            <CheckCircle2 size={16} className="shrink-0 text-wood-400 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Footer Text */}
                  {step.footer && (
                    <div className="mt-4 p-4 bg-wood-50 border-l-2 border-wood-400 text-wood-700 text-sm italic">
                      {step.footer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Box */}
          <div className="bg-wood-900 text-wood-100 p-8 md:p-12 rounded-sm mt-20 flex flex-col md:flex-row gap-8 items-center border border-wood-800">
             <div className="shrink-0 p-4 bg-wood-800 rounded-full text-wood-300">
               <ShieldCheck size={32} />
             </div>
             <div>
                <h4 className="font-serif text-2xl text-wood-50 mb-3">Our Guarantee</h4>
                <p className="text-wood-300 leading-relaxed max-w-3xl font-light">
                  We guarantee our joinery for 10 years against structural defects. Hardware (hinges, drawer slides) carries a lifetime warranty from the manufacturer (Blum or Hettich).
                </p>
             </div>
          </div>
        </div>


        {/* --- PART 2: FAQ SECTION --- */}
        <div id="faq" className="scroll-mt-24 pt-12 border-t border-wood-200">
           <h3 className="text-3xl font-serif text-wood-900 flex items-center gap-3 mb-12">
            <HelpCircle className="text-wood-400" />
            Common Questions
          </h3>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Sticky Categories */}
            <div className="lg:w-1/4">
              <div className="sticky top-24 space-y-2 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0">
                {FAQ_DATA.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id)}
                    className={`shrink-0 text-left px-5 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-between group ${
                      activeTab === cat.id
                        ? 'bg-wood-900 text-wood-50 shadow-md transform scale-105 lg:translate-x-2'
                        : 'bg-white text-wood-400 hover:bg-wood-50 hover:text-wood-900 border border-wood-100'
                    }`}
                  >
                    {cat.title}
                    <ChevronRight size={14} className={`hidden lg:block transition-transform duration-300 ${activeTab === cat.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Content Area */}
            <div className="lg:w-3/4 min-h-[500px]">
              <div className="bg-white border border-wood-200 rounded-sm shadow-sm p-1">
                {activeCategory.items.map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div 
                      key={index} 
                      className={`border-b border-wood-100 last:border-0 transition-colors ${isOpen ? 'bg-wood-50/50' : 'hover:bg-wood-50/30'}`}
                    >
                      <button 
                        onClick={() => handleToggleFaq(index)}
                        className="w-full flex items-start justify-between p-6 text-left focus:outline-none"
                      >
                        <span className={`font-medium pr-8 text-base md:text-lg leading-snug transition-colors ${isOpen ? 'text-wood-900' : 'text-wood-700'}`}>
                          {faq.question}
                        </span>
                        <div className={`shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                          {isOpen ? <Minus size={20} className="text-wood-900" /> : <Plus size={20} className="text-wood-400" />}
                        </div>
                      </button>
                      
                      <div 
                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-6 pb-8 pt-0 text-sm md:text-base text-wood-600 leading-relaxed font-light">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
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