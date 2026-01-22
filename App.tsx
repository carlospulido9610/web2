
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
import { QuoteSummary } from './components/QuoteSummary';
import { AdminPanel } from './components/AdminPanel';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { TermsOfServicePage } from './components/TermsOfServicePage';
import { ModelsGallery } from './components/ModelsGallery';
import { Model } from './types';

type ViewState = 'home' | 'process' | 'faq' | 'gallery' | 'configurator' | 'quote-summary' | 'admin' | 'privacy' | 'terms';

const INITIAL_MODELS_DEFAULT: Model[] = [
  {
    id: 'mw-1',
    name: 'The Floating Oak',
    category: 'media-wall',
    basePrice: 4500,
    description: 'Minimalist floating console with integrated LED lighting and acoustic slat backing.',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'mw-2',
    name: 'Cinema Suite',
    category: 'media-wall',
    basePrice: 6200,
    description: 'Full wall integration with hidden storage, soundbar niche, and ambient backlighting.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600210491892-03d54cc8d27e?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'fp-1',
    name: 'Modern Linear',
    category: 'fireplaces',
    basePrice: 3800,
    description: 'Sleek panoramic electric fireplace insert with micro-cement finish surround.',
    image: 'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'cn-1',
    name: 'Minimalist Entry',
    category: 'consoles',
    basePrice: 2400,
    description: 'Slim profile entry console with premium wood finish and cable management.',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566753376-12c8ab78f754?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'hc-1',
    name: 'The Cathedral',
    category: 'high-ceiling',
    basePrice: 8500,
    description: 'Grand scale joinery designed specifically for double-height voids.',
    image: 'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1600585153223-dac327bfe178?auto=format&fit=crop&q=80&w=1200'
    ]
  },
  {
    id: 'hc-2',
    name: 'Vertical Slat',
    category: 'high-ceiling',
    basePrice: 7900,
    description: 'Elongated vertical lines to accentuate height, featuring hidden storage.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&q=80&w=1200',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&q=80&w=1200'
    ]
  }
];

const INITIAL_GROUPS_DEFAULT = {
  wallHeight: {
    label: 'Wall Height',
    description: 'Defines the total height of the media wall from floor to ceiling. Exact measurements will be verified by our team.',
    options: [
      { id: 'h8', label: '8 ft', price: 0 },
      { id: 'h9', label: '9 ft', price: 200 },
      { id: 'h10', label: '10 ft', price: 500 },
      { id: 'h10p', label: '10 ft+', price: 800 },
      { id: 'h12p', label: '12 ft+', price: 1200 },
      { id: 'h14p', label: '14 ft+', price: 1800 },
      { id: 'h16p', label: '16 ft+', price: 2500 },
      { id: 'h20p', label: '20 ft+', price: 3500 }
    ]
  },
  tvSize: {
    label: 'TV Size',
    description: 'Affects the overall width and internal structure of the media wall.',
    options: [
      { id: 'tv77', label: 'Up to 77"', price: 0 },
      { id: 'tv85', label: '85"–87" (Reinforced)', price: 450 },
      { id: 'tv100', label: '100" and above (Custom)', price: 1200 }
    ]
  },
  tvPlacement: {
    label: 'TV Placement',
    description: 'How the TV is visually integrated into the media wall.',
    options: [
      { id: 'surface', label: 'Outside (Surface mounted)', price: 0 },
      { id: 'recessed', label: 'Recessed (Flush / Integrated)', price: 650 }
    ]
  },
  mantel: {
    label: 'Mantel',
    description: 'Decorative and functional shelf above the fireplace.',
    options: [
      { id: 'no-mantel', label: 'No mantel', price: 0 },
      { id: 'regular-mantel', label: 'Regular mantel', price: 350 },
      { id: 'storage-mantel', label: 'Storage mantel', price: 750 }
    ]
  },
  soundbar: {
    label: 'Soundbar',
    description: 'How the sound system is incorporated into the design.',
    options: [
      { id: 'no-soundbar', label: 'No soundbar', price: 0 },
      { id: 'on-mantel', label: 'On the mantel', price: 150 },
      { id: 'floating', label: 'Floating', price: 250 },
      { id: 'inserted', label: 'Inserted (Built-in)', price: 450 }
    ]
  },
  fireplaceType: {
    label: 'Fireplace Type',
    description: 'Defines the style and visual depth of the fireplace.',
    options: [
      { id: 'front', label: 'Regular (Front-facing)', price: 0 },
      { id: '3sided', label: '3-sided', price: 850 }
    ]
  },
  lighting: {
    label: 'Lighting',
    description: 'Integrated lighting to enhance depth and materials.',
    options: [
      { id: 'no-lighting', label: 'None', price: 0 },
      { id: 'above', label: 'Above', price: 250 },
      { id: 'under', label: 'Under', price: 250 },
      { id: 'sides', label: 'Sides', price: 450 }
    ]
  }
};

const DEFAULT_SITE_DATA = {
  hero: {
    title: "Custom Media Walls & built-in rooms",
    subtitle: "Designed to move beyond builder-grade",
    bgImage: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=2560&auto=format&fit=crop"
  },
  reviews: [
    { id: 1, name: 'Sarah Jenkins', role: 'Homeowner', quote: "It completely changed the vibe of our living room.", videoThumbnail: 'https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=1200' },
    { id: 2, name: 'Mark & David', role: 'Condo Renovation', quote: "We were worried about the mess, but they installed everything in one day.", videoThumbnail: 'https://images.unsplash.com/photo-1512918760532-3ed64bc8066e?auto=format&fit=crop&q=80&w=1200' }
  ],
  configurator: {
    models: INITIAL_MODELS_DEFAULT,
    basePrices: { 'media-wall': 4500, 'fireplaces': 3200, 'consoles': 2400, 'high-ceiling': 6500 },
    groups: INITIAL_GROUPS_DEFAULT
  }
};

function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [siteData, setSiteData] = useState<any>(DEFAULT_SITE_DATA);
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [quoteSelections, setQuoteSelections] = useState<Record<string, string | string[]>>({});
  const [quoteTotal, setQuoteTotal] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('raval_site_data');
    if (saved) {
      setSiteData(JSON.parse(saved));
    }

    window.scrollTo(0, 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'a' && currentView !== 'configurator') {
        setCurrentView('admin');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentView]);

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

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model);
    setCurrentView('configurator');
  };

  const handleOpenGallery = (modelId?: string) => {
    if (modelId && typeof modelId === 'string') {
      const model = models.find(m => m.id === modelId) || INITIAL_MODELS_DEFAULT.find(m => m.id === modelId);
      if (model) {
        setSelectedModel(model);
        setCurrentView('configurator');
        window.scrollTo(0, 0);
        return;
      }
    }
    setCurrentView('gallery');
    window.scrollTo(0, 0);
  };

  const handleRequestQuote = (selections: Record<string, string | string[]>, total: number) => {
    setQuoteSelections(selections);
    setQuoteTotal(total);
    setCurrentView('quote-summary');
    window.scrollTo(0, 0);
  };
  //...
  // Safe accessors for data
  const models = siteData?.configurator?.models || [];
  const optionsData = siteData?.configurator || { groups: {} };


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
            <ServicesConfigurator onOpenConfigurator={handleOpenGallery} />
            <WhyUs />
            <Process onOpenProcess={() => setCurrentView('process')} />
            <Testimonials reviews={siteData?.reviews} />
            <ContactForm onNavigatePrivacy={() => { window.scrollTo(0, 0); setCurrentView('privacy'); }} />
          </>
        )}

        {currentView === 'gallery' && (
          <ModelsGallery
            models={models.length > 0 ? models : INITIAL_MODELS_DEFAULT}
            onSelectModel={handleModelSelect}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'process' && (
          <ProcessPage onBack={() => setCurrentView('home')} onNavigateFAQ={() => setCurrentView('faq')} />
        )}

        {currentView === 'faq' && (
          <FAQPage onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'configurator' && selectedModel && (
          <Configurator
            model={selectedModel}
            optionsData={optionsData}
            onBack={() => handleNavigateToSection('models')}
            onRequestQuote={handleRequestQuote}
          />
        )}

        {currentView === 'quote-summary' && selectedModel && (
          <QuoteSummary
            model={selectedModel}
            optionsData={optionsData}
            selections={quoteSelections}
            total={quoteTotal}
            onBack={() => setCurrentView('configurator')}
            onBackToHome={() => setCurrentView('gallery')}
          />
        )}

        {currentView === 'privacy' && (
          <PrivacyPolicyPage onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'terms' && (
          <TermsOfServicePage onBack={() => setCurrentView('home')} />
        )}

        {currentView === 'admin' && (
          <AdminPanel onBack={() => setCurrentView('home')} />
        )}

        {currentView !== 'configurator' && currentView !== 'quote-summary' && currentView !== 'admin' && (
          <Footer
            onNavigateFAQ={() => setCurrentView('faq')}
            onNavigateAdmin={() => setCurrentView('admin')}
            onNavigatePrivacy={() => { window.scrollTo(0, 0); setCurrentView('privacy'); }}
            onNavigateTerms={() => { window.scrollTo(0, 0); setCurrentView('terms'); }}
          />
        )}
      </div>
    </main>
  );
}

export default App;
