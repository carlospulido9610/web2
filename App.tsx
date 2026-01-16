
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
import { Configurator } from './components/Configurator';
import { AdminPanel } from './components/AdminPanel';

type ViewState = 'home' | 'process' | 'faq' | 'configurator' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Shortcut para admin: Alt + A
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a') setCurrentView('admin');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigateToSection = (sectionId: string) => {
    setCurrentView('home');
    setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <main className="w-full min-h-screen relative">
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>
      
      {currentView !== 'configurator' && currentView !== 'admin' && (
        <Navigation 
          isHome={currentView === 'home'} 
          onNavigateHome={() => setCurrentView('home')} 
          onNavigateFAQ={() => setCurrentView('faq')}
          onNavigateSection={handleNavigateToSection}
        />
      )}
      
      <div className="relative z-10">
        {currentView === 'home' && (
          <>
            <Hero />
            <ServicesConfigurator onOpenConfigurator={() => setCurrentView('configurator')} />
            <WhyUs />
            <Process onOpenProcess={() => setCurrentView('process')} />
            <Testimonials />
            <ContactForm />
          </>
        )}

        {currentView === 'process' && (
            <ProcessPage onBack={() => setCurrentView('home')} onNavigateFAQ={() => setCurrentView('faq')} />
        )}

        {currentView === 'faq' && (
            <FAQPage onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'configurator' && (
            <Configurator onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'admin' && (
            <AdminPanel onBack={() => setCurrentView('home')} />
        )}
        
        {currentView !== 'configurator' && currentView !== 'admin' && (
          <Footer onNavigateFAQ={() => setCurrentView('faq')} />
        )}
      </div>
    </main>
  );
}

export default App;
