
import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ServicesConfigurator } from './components/ServicesConfigurator';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProcessPage } from './components/ProcessPage';
import { FAQPage } from './components/FAQPage';

type ViewState = 'home' | 'process' | 'faq';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentView('home');
    // Allow React to mount the Home components
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
  };

  return (
    <main className="w-full min-h-screen relative">
      {/* Global noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>
      
      <Navigation 
        isHome={currentView === 'home'} 
        onNavigateHome={() => setCurrentView('home')} 
        onNavigateFAQ={() => setCurrentView('faq')}
        onNavigateSection={handleNavigateToSection}
      />
      
      <div className="relative z-10">
        {currentView === 'home' && (
          <>
            <Hero />
            <ServicesConfigurator />
            <WhyUs />
            <Process onOpenProcess={() => setCurrentView('process')} />
            <Testimonials />
            <ContactForm />
          </>
        )}

        {currentView === 'process' && (
            <ProcessPage 
                onBack={() => setCurrentView('home')} 
                onNavigateFAQ={() => setCurrentView('faq')}
            />
        )}

        {currentView === 'faq' && (
            <FAQPage onBack={() => setCurrentView('home')} />
        )}
        
        <Footer onNavigateFAQ={() => setCurrentView('faq')} />
      </div>
    </main>
  );
}

export default App;
