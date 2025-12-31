import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ServicesConfigurator } from './components/ServicesConfigurator';
import { WhyUs } from './components/WhyUs';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="w-full overflow-hidden">
      {/* Global noise texture overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-noise opacity-40 mix-blend-overlay"></div>
      
      <Navigation />
      
      <div className="relative z-10">
        <Hero />
        <ServicesConfigurator />
        <WhyUs />
        <Process />
        <Testimonials />
        <ContactForm />
        <Footer />
      </div>
    </main>
  );
}

export default App;