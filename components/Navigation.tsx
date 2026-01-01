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
      // Optional: Prevent iOS rubber-banding if needed, 
      // but overflow: hidden usually suffices for the visual bug.
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Should we navigate home first?
    if (!isHome && onNavigateHome) {
        onNavigateHome();
        // Allow time for view to switch before scrolling
        setTimeout(() => {
            const targetId = href.replace('#', '');
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        return;
    }

    // Standard scroll on home page
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

  return (
    // Increased z-index to z-[100] to be absolutely sure it sits above all content
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-wood-50/95 backdrop-blur-md border-b border-wood-200 py-3 shadow-sm' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo - Always visible and clickable */}
        <button 
          onClick={onNavigateHome}
          className="relative z-[110] group flex items-end gap-1"
        >
          <span className="text-4xl md:text-5xl font-serif font-medium tracking-tighter transition-colors duration-300 leading-none text-wood-900">
            RAVAL
          </span>
        </button>

        {/* Desktop Menu - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-10">
          {isHome ? (
            <>
              <div className="flex items-center gap-8 mr-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name} 
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`text-xs font-bold uppercase tracking-[0.15em] transition-all text-wood-900 ${
                      scrolled 
                        ? 'opacity-70 hover:opacity-100' 
                        : 'opacity-80 hover:opacity-100 hover:text-wood-600'
                    }`}
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* CTA Button in Nav */}
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all border ${
                  scrolled 
                    ? 'bg-wood-900 text-wood-50 border-wood-900 hover:bg-wood-800' 
                    : 'bg-wood-900/5 backdrop-blur-sm text-wood-900 border-wood-900/20 hover:bg-wood-900 hover:text-wood-50'
                }`}
              >
                Get a Quote
              </a>
            </>
          ) : (
            <button 
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-wood-900 hover:text-wood-600 transition-colors"
            >
              <ArrowLeft size={14} />
              Back to Home
            </button>
          )}
        </div>

        {/* Mobile Menu Button - Z-Index 110 to stay above the overlay */}
        {isHome ? (
          <button 
            className="md:hidden relative z-[110] p-2 transition-colors text-wood-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        ) : (
           <button 
            className="md:hidden relative z-[110] p-2 text-wood-900"
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
            style={{ height: '100dvh' }} // Use dynamic viewport height to fix mobile browser bar issues
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