
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
  const [siteData, setSiteData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('raval_site_data');
    if (saved) {
      setSiteData(JSON.parse(saved));
    }
    
    window.scrollTo(0, 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      // Desactivamos el shortcut si estamos en el configurador
      if (e.altKey && e.key === 'a' && currentView !== 'configurator') {
        setCurrentView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]); // Agregamos currentView como dependencia

  useEffect(() => {
    const handleUpdate = () => {
      const saved = localStorage.getItem('raval_site_data');
      if (saved) setSiteData(JSON.parse(saved));
    };
    window.addEventListener('site-data-updated', handleUpdate);
    return () => window.removeEventListener('site-data-updated', handleUpdate);
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
            <Hero data={siteData?.hero} />
            <ServicesConfigurator onOpenConfigurator={() => setCurrentView('configurator')} />
            <WhyUs />
            <Process onOpenProcess={() => setCurrentView('process')} />
            <Testimonials reviews={siteData?.reviews} />
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
          <Footer onNavigateFAQ={() => setCurrentView('faq')} onNavigateAdmin={() => setCurrentView('admin')} />
        )}
      </div>
    </main>
  );
}

export default App;
