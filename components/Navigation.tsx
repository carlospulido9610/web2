
import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavigationProps {
  isHome?: boolean;
  onNavigateHome?: () => void;
  onNavigateFAQ?: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isHome = true, onNavigateHome, onNavigateFAQ, onNavigateSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.split('?')[0].replace('#', '');
    
    if (isHome) {
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            // If it's the booking button, trigger the mode switch in ContactForm
            if (href.includes('booking=true')) {
              window.dispatchEvent(new CustomEvent('setContactMode', { detail: 'booking' }));
            }
        }
    } else {
        if (onNavigateSection) {
            onNavigateSection(targetId);
        } else if (onNavigateHome) {
            onNavigateHome();
        }
    }
  };

  const navLinks = [
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Models', href: '#models' },
    { name: 'Reviews', href: '#reviews' },
  ];

  const textColorClass = !scrolled ? 'text-wood-50' : 'text-wood-900';

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-wood-50 border-b border-wood-200 py-3 shadow-sm' : 'bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        <button onClick={onNavigateHome} className="relative z-[110]">
          <span className={`text-4xl md:text-5xl font-canale tracking-tight transition-colors duration-300 ${isOpen ? 'text-wood-900' : textColorClass}`}>
            RAVAL
          </span>
        </button>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
              className={`text-[10px] font-black uppercase tracking-[0.2em] font-manrope transition-all opacity-80 hover:opacity-100 ${textColorClass}`}>
              {link.name}
            </a>
          ))}
          
          <button onClick={() => onNavigateFAQ && onNavigateFAQ()} 
              className={`text-[10px] font-black uppercase tracking-[0.2em] font-manrope transition-all opacity-80 hover:opacity-100 ${textColorClass}`}>
              FAQ
          </button>

          {isHome ? (
            <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}
              className={`px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] font-manrope transition-all rounded-sm border ${scrolled ? 'bg-wood-900 text-wood-50 border-wood-900' : 'bg-white/10 backdrop-blur-md border-white/20 text-white'}`}>
              Get a Quote
            </a>
          ) : (
            <button onClick={onNavigateHome} className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] font-manrope hover:opacity-70 transition-opacity ${textColorClass}`}>
              <span>Close</span>
              <div className={`p-1 rounded-full border ${!scrolled ? 'border-white/30' : 'border-wood-900/30'}`}>
                 <X size={14} />
              </div>
            </button>
          )}
        </div>

        <button className={`md:hidden relative z-[110] p-2 ${isOpen ? 'text-wood-900' : textColorClass}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`fixed inset-0 z-[100] bg-wood-50 flex flex-col justify-center items-center gap-6 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ height: '100dvh' }}>
        {navLinks.map((link) => (
          <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)} 
            className="text-[32px] font-manrope font-black text-wood-900 uppercase tracking-tight hover:opacity-70 transition-opacity">
            {link.name}
          </a>
        ))}
        <button onClick={() => { setIsOpen(false); if (onNavigateFAQ) onNavigateFAQ(); }} 
          className="text-[32px] font-manrope font-black text-wood-900 uppercase tracking-tight hover:opacity-70 transition-opacity">
            FAQ
        </button>
        
        <div className="mt-6 px-6 w-full max-w-xs">
          <button 
            onClick={(e) => handleNavClick(e, '#contact?booking=true')}
            className="w-full bg-[#1F1915] text-wood-50 py-5 rounded-sm flex items-center justify-center gap-3 text-[10px] font-manrope font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
          >
            <Calendar size={16} />
            Book Appointment
          </button>
        </div>
      </div>
    </nav>
  );
};
