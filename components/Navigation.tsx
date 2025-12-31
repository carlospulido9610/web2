import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Models', href: '#models' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-wood-50/95 backdrop-blur-md border-b border-wood-200 py-3 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#" className="relative z-50 group flex items-end gap-1">
          <span className={`text-4xl md:text-5xl font-serif font-medium tracking-tighter transition-colors duration-300 leading-none ${scrolled ? 'text-wood-900' : 'text-wood-50'}`}>
            RAVAL
          </span>
        </a>

        {/* Desktop Menu - Right Aligned */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 mr-4">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={`text-xs font-bold uppercase tracking-[0.15em] transition-all hover:opacity-100 ${
                  scrolled 
                    ? 'text-wood-900 opacity-70' 
                    : 'text-wood-50 opacity-80 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button in Nav */}
          <a 
            href="#contact" 
            className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border ${
              scrolled 
                ? 'bg-wood-900 text-wood-50 border-wood-900 hover:bg-wood-800' 
                : 'bg-white/10 backdrop-blur-sm text-wood-50 border-white/30 hover:bg-white/20'
            }`}
          >
            Get a Quote
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden relative z-50 p-2 transition-colors ${scrolled || isOpen ? 'text-wood-900' : 'text-wood-50'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-wood-50 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            className="text-4xl font-serif italic text-wood-900 hover:text-wood-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#contact" 
          className="mt-6 px-8 py-4 bg-wood-900 text-wood-50 text-sm font-bold uppercase tracking-widest"
          onClick={() => setIsOpen(false)}
        >
          Work with a Designer
        </a>
      </div>
    </nav>
  );
};