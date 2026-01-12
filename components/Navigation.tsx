
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface NavigationProps {
  isHome?: boolean;
  onNavigateHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isHome = true, onNavigateHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Models', href: '#models' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const isTransparent = isHome && !scrolled;
  const textColorClass = isTransparent ? 'text-wood-50' : 'text-wood-900';
  const hoverColorClass = isTransparent ? 'hover:text-wood-200' : 'hover:text-wood-600';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-wood-50/98 backdrop-blur-md border-b border-wood-200 py-3 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo - Usando Canela explícitamente */}
        <button 
          onClick={onNavigateHome}
          className="relative z-[110] flex items-center"
        >
          <span className={`text-3xl md:text-4xl font-canela tracking-tight transition-colors duration-300 leading-none ${isOpen ? 'text-wood-900' : textColorClass}`}>
            RAVAL
          </span>
        </button>

        {/* Desktop Menu - Todo en Red Hat Display (font-sans) */}
        <div className="hidden md:flex items-center gap-10">
          {isHome ? (
            <>
              <div className="flex items-center gap-10">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-[10px] font-bold uppercase tracking-[0.2em] font-sans transition-all ${textColorClass} opacity-80 hover:opacity-100 ${hoverColorClass}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] font-sans transition-all rounded-sm border ${scrolled 
                    ? 'bg-wood-900 text-wood-50 border-wood-900 hover:bg-wood-800' 
                    : 'bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white hover:text-wood-900'}`}
              >
                Get a Quote
              </a>
            </>
          ) : (
            <button 
              onClick={onNavigateHome}
              className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] font-sans transition-colors ${textColorClass} ${hoverColorClass}`}
            >
              <ArrowLeft size={14} />
              Back to Home
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden relative z-[110] p-2 transition-colors ${isOpen ? 'text-wood-900' : textColorClass}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
          className={`fixed inset-0 z-[100] bg-wood-50 flex flex-col justify-center items-center gap-10 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ height: '100dvh' }}
      >
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)} 
            className="text-5xl font-sans font-black italic text-wood-900 hover:text-wood-500 transition-colors tracking-tight uppercase"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#contact"
          onClick={(e) => handleNavClick(e, '#contact')}
          className="mt-8 px-10 py-5 bg-wood-900 text-wood-50 text-xs font-bold uppercase tracking-[0.3em] rounded-sm font-sans"
        >
          Work with Us
        </a>
      </div>
    </nav>
  );
};
