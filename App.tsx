import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ServicesConfigurator } from './components/ServicesConfigurator';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import { ProcessFAQ } from './components/ProcessFAQ';

type ViewState = 'home' | 'process-faq';

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <main className="w-full overflow-hidden">
      {/* Global noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>
      
      <Navigation 
        isHome={currentView === 'home'} 
        onNavigateHome={() => setCurrentView('home')} 
      />
      
      <div className="relative z-10">
        {currentView === 'home' ? (
          <>
            <Hero />
            <ServicesConfigurator />
            <WhyUs />
            <Process onOpenDetails={() => setCurrentView('process-faq')} />
            <Testimonials />
            <ContactForm />
          </>
        ) : (
          <ProcessFAQ onBack={() => setCurrentView('home')} />
        )}
        
        <Footer />
      </div>
    </main>
  );
}

export default App;