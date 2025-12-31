import React from 'react';
import { MapPin, Clock, ArrowRight } from 'lucide-react';

export const ContactForm: React.FC = () => {
  return (
    <section id="contact" className="bg-wood-900 text-wood-50 py-24 border-t border-wood-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          
          {/* Info Side */}
          <div className="flex flex-col justify-center">
            <span className="block text-xs font-semibold tracking-wider uppercase mb-4 text-wood-400">Next Steps</span>
            <h2 className="text-4xl md:text-5xl font-serif italic font-normal tracking-tight mb-8">
              Ready to transform <br /> <span className="text-wood-400 font-serif italic font-light">your space?</span>
            </h2>
            
            <p className="text-wood-300 mb-8 max-w-md font-light">
              Secure your in-home assessment for a $100 deposit, fully creditable towards your project.
            </p>
            
            <div className="space-y-8 mt-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-wood-400 mt-1" size={20} />
                <div>
                  <h4 className="text-lg font-medium text-wood-100">Showroom</h4>
                  <p className="text-wood-400 font-light mt-1">8074 Shoal Creek Blvd, Suite 204<br />Austin, TX</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-wood-400 mt-1" size={20} />
                <div>
                  <h4 className="text-lg font-medium text-wood-100">Hours</h4>
                  <p className="text-wood-400 font-light mt-1">10:00 AM – 6:00 PM <br />By appointment only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-wood-800 p-8 md:p-12 rounded-2xl border border-wood-700 shadow-2xl">
            <h3 className="text-2xl font-serif italic mb-6">Request Technical Visit</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Name" 
                  className="w-full bg-wood-900 border border-wood-700 rounded-lg p-3 text-sm text-wood-100 focus:outline-none focus:border-wood-500 transition-colors placeholder:text-wood-600"
                />
                <input 
                  type="tel" 
                  placeholder="Phone" 
                  className="w-full bg-wood-900 border border-wood-700 rounded-lg p-3 text-sm text-wood-100 focus:outline-none focus:border-wood-500 transition-colors placeholder:text-wood-600"
                />
              </div>
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-wood-900 border border-wood-700 rounded-lg p-3 text-sm text-wood-100 focus:outline-none focus:border-wood-500 transition-colors placeholder:text-wood-600"
              />
              <textarea 
                rows={3} 
                placeholder="Briefly describe your project..." 
                className="w-full bg-wood-900 border border-wood-700 rounded-lg p-3 text-sm text-wood-100 focus:outline-none focus:border-wood-500 transition-colors resize-none placeholder:text-wood-600"
              ></textarea>
              
              <button type="submit" className="w-full py-4 bg-wood-100 text-wood-900 font-medium rounded-full hover:bg-wood-200 transition-colors mt-4 flex items-center justify-center gap-2 group">
                Schedule Assessment ($100)
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-wood-500 mt-4">
                Fully refundable 24h before appointment.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};