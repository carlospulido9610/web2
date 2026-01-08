import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowLeft } from 'lucide-react';

interface NavigationProps {
  isHome?: boolean;
  onNavigateHome?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isHome = true, onNavigateHome }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle Scroll Effect for Navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Body Scroll Lock when Mobile Menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    if (!isHome && onNavigateHome) {
        onNavigateHome();
        setTimeout(() => {
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        return;
    }

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

  // Dynamic Text Color Logic
  // If we are on Home and NOT scrolled -> White Text (over dark Hero)
  // Otherwise -> Dark Text (over white background)
  const isTransparent = isHome && !scrolled;
  const textColorClass = isTransparent ? 'text-wood-50' : 'text-wood-900';
  const hoverColorClass = isTransparent ? 'hover:text-wood-200' : 'hover:text-wood-600';
  const buttonBorderClass = isTransparent ? 'border-wood-50/30 text-wood-50 hover:bg-wood-50 hover:text-wood-900' : 'border-wood-900/20 text-wood-900 hover:bg-wood-900 hover:text-wood-50';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-wood-50/95 backdrop-blur-md border-b border-wood-200 py-3 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={onNavigateHome}
          className="relative z-[110] group flex items-end gap-1"
        >
          <span className={`text-4xl md:text-5xl font-serif font-medium tracking-tighter transition-colors duration-300 leading-none ${isOpen ? 'text-wood-900' : textColorClass}`}>
            RAVAL
          </span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          {isHome ? (
            <>
              <div className="flex items-center gap-8 mr-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-xs font-bold uppercase tracking-[0.15em] transition-all ${textColorClass} ${scrolled ? 'opacity-70 hover:opacity-100' : 'opacity-90 hover:opacity-100'} ${hoverColorClass}`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* CTA Button */}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all border ${scrolled 
                    ? 'bg-wood-900 text-wood-50 border-wood-900 hover:bg-wood-800' 
                    : 'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-wood-900'}`}
              >
                Get a Quote
              </a>
            </>
          ) : (
            <button 
              onClick={onNavigateHome}
              className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${textColorClass} ${hoverColorClass}`}
            >
              <ArrowLeft size={14} />
              Back to Home
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        {isHome ? (
          <button 
            className={`md:hidden relative z-[110] p-2 transition-colors ${isOpen ? 'text-wood-900' : textColorClass}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
           <button 
            className={`md:hidden relative z-[110] p-2 ${textColorClass}`}
            onClick={onNavigateHome}
          >
            <ArrowLeft size={24} />
          </button>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {isHome && (
        <div 
            className={`fixed inset-0 z-[100] bg-wood-50 flex flex-col justify-center items-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            style={{ height: '100dvh' }}
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)} 
              className="text-4xl font-serif italic text-wood-900 hover:text-wood-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 px-8 py-4 bg-wood-900 text-wood-50 text-sm font-bold uppercase tracking-widest"
          >
            Work with a Designer
          </a>
        </div>
      )}
    </nav>
  );
};