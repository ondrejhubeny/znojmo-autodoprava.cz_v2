import { useState, useEffect } from 'react';
import { X, ShieldCheck } from 'lucide-react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import StatsSection from './sections/StatsSection';
import FleetSection from './sections/FleetSection';
import ServicesSection from './sections/ServicesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import { LanguageProvider, useLanguage } from './i18n';
import './App.css';

function AppContent() {
  const [preselectedVehicle, setPreselectedVehicle] = useState<string>('');
  const [isGdprOpen, setIsGdprOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isGdprOpen) {
        setIsGdprOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGdprOpen]);

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <StatsSection />
        <FleetSection onSelectVehicleForInquiry={setPreselectedVehicle} />
        <ServicesSection />
        <AboutSection />
        <ContactSection preselectedVehicle={preselectedVehicle} />
      </main>
      <Footer onOpenGdpr={() => setIsGdprOpen(true)} />

      {/* GDPR Modal */}
      {isGdprOpen && (
        <div className="gdpr-modal-backdrop" onClick={() => setIsGdprOpen(false)}>
          <div className="gdpr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gdpr-modal-header">
              <div className="gdpr-modal-title">
                <ShieldCheck size={22} />
                <h3>{t.gdprModal.title}</h3>
              </div>
              <button
                type="button"
                className="gallery-close-btn"
                onClick={() => setIsGdprOpen(false)}
                aria-label={t.gdprModal.closeAria}
              >
                <X size={22} />
              </button>
            </div>

            <div className="gdpr-modal-body">
              {t.gdprModal.sections.map((sec, idx) => (
                <div key={idx}>
                  <h4>{sec.heading}</h4>
                  <p>{sec.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
