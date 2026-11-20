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
import { CONTACT_INFO } from './constants';
import './App.css';

function App() {
  const [preselectedVehicle, setPreselectedVehicle] = useState<string>('');
  const [isGdprOpen, setIsGdprOpen] = useState<boolean>(false);

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
        <ContactSection
          preselectedVehicle={preselectedVehicle}
          onOpenGdpr={() => setIsGdprOpen(true)}
        />
      </main>
      <Footer onOpenGdpr={() => setIsGdprOpen(true)} />

      {/* GDPR Modal */}
      {isGdprOpen && (
        <div className="gdpr-modal-backdrop" onClick={() => setIsGdprOpen(false)}>
          <div className="gdpr-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gdpr-modal-header">
              <div className="gdpr-modal-title">
                <ShieldCheck size={22} />
                <h3>Zásady ochrany osobních údajů (GDPR)</h3>
              </div>
              <button
                type="button"
                className="gallery-close-btn"
                onClick={() => setIsGdprOpen(false)}
                aria-label="Zavřít okno GDPR"
              >
                <X size={22} />
              </button>
            </div>

            <div className="gdpr-modal-body">
              <h4>1. Správce osobních údajů</h4>
              <p>
                Správcem osobních údajů je <strong>{CONTACT_INFO.owner}</strong>, se sídlem{' '}
                {CONTACT_INFO.address}, IČO: <strong>{CONTACT_INFO.ico}</strong>, telefon:{' '}
                {CONTACT_INFO.phones[0]}, e-mail: {CONTACT_INFO.email}.
              </p>

              <h4>2. Rozsah a účel zpracování</h4>
              <p>
                Pokud využijete poptávkový formulář na tomto webu, zpracováváme vámi vyplněné údaje
                (jméno a příjmení, telefonní číslo, e-mailovou adresu a parametry poptávané cesty)
                výhradně za účelem vyřízení vaší poptávky, vypracování cenové kalkulace a případné
                realizace přepravy (předsmluvní jednání a plnění smlouvy dle čl. 6 odst. 1 písm. b)
                nařízení GDPR).
              </p>

              <h4>3. Doba uchování a předávání údajů</h4>
              <p>
                Osobní údaje jsou uchovávány pouze po dobu nezbytnou k vyřízení poptávky a realizaci
                přepravy, případně po dobu stanovenou příslušnými daňovými a účetními předpisy.
                Osobní údaje nejsou předávány třetím stranám pro marketingové účely.
              </p>

              <h4>4. Soubory cookies</h4>
              <p>
                Tyto webové stránky nepoužívají žádné reklamní ani sledovací soubory cookies třetích
                stran.
              </p>

              <h4>5. Vaše práva</h4>
              <p>
                Máte právo požadovat přístup ke svým osobním údajům, jejich opravu, výmaz nebo
                omezení zpracování, případně vznést námitku proti zpracování. Se svými požadavky se
                můžete kdykoliv obrátit na výše uvedený e-mail nebo telefon správce, případně na
                Úřad pro ochranu osobních údajů (uoou.cz).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
