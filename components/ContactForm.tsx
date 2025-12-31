import React from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="bg-wood-900 text-wood-50 py-32 border-t border-wood-800 scroll-mt-32">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Side: Contact Info */}
          <div className="flex flex-col justify-center pr-0 lg:pr-12">
            <span className="block text-xs font-bold tracking-[0.2em] uppercase mb-6 text-wood-400">
              Contact
            </span>
            <h2 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8 text-wood-100">
              Let's create <br /> 
              <span className="italic text-wood-300">together.</span>
            </h2>
            
            <p className="text-wood-400 mb-16 max-w-md text-lg leading-relaxed font-light">
              Have a vision for your new space? Call us or write to us. We'd love to meet, measure your space, and prepare a non-binding proposal.
            </p>
            
            <div className="space-y-10">
              {/* Address */}
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <MapPin size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Workshop Address</h4>
                  <p className="text-wood-400 font-light text-sm leading-relaxed">
                    8074 Shoal Creek Blvd, Suite 204<br />Austin, TX 78757
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <Phone size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Phone</h4>
                  <p className="text-wood-400 font-light text-sm">
                    +1 (512) 555-0198<br />
                    <span className="text-xs opacity-60">Mon-Fri: 8:00 - 17:00</span>
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-6 group">
                 <div className="w-12 h-12 flex items-center justify-center border border-wood-700 bg-wood-800/50 text-wood-300 rounded-sm transition-colors group-hover:border-wood-500 group-hover:text-wood-100">
                  <Mail size={20} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-medium text-wood-100 mb-1">Email</h4>
                  <p className="text-wood-400 font-light text-sm">
                    hello@raval-design.com<br />
                    design@raval-design.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="relative bg-wood-100 p-8 md:p-12 shadow-2xl overflow-hidden rounded-sm">
            
            {/* Decorative Circle similar to reference */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-wood-200/50 rounded-full blur-3xl pointer-events-none"></div>

            <h3 className="text-4xl font-serif text-wood-900 mb-10 relative z-10">Write to us</h3>
            
            <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Phone</label>
                  <input 
                    type="tel" 
                    placeholder="+1 ..."
                    className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all placeholder:text-wood-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-wood-500">What do you have in mind?</label>
                <textarea 
                  rows={4} 
                  placeholder="Describe your vision... (kitchen, media wall, wardrobe)" 
                  className="w-full bg-white border border-wood-300 p-4 text-wood-900 focus:outline-none focus:border-wood-500 focus:ring-1 focus:ring-wood-500 transition-all resize-none placeholder:text-wood-300"
                ></textarea>
              </div>

              <div className="flex items-start gap-3 py-2">
                <input type="checkbox" id="consent" className="mt-1 accent-wood-900" />
                <label htmlFor="consent" className="text-xs text-wood-500 leading-snug cursor-pointer">
                  I agree to the processing of personal data for the purpose of the inquiry.
                </label>
              </div>
              
              <button type="submit" className="w-full py-5 bg-wood-900 text-wood-50 text-xs font-bold uppercase tracking-widest hover:bg-wood-800 transition-colors mt-6 flex items-center justify-center gap-4 group">
                Send Request
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-wood-300" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};