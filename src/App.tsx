import { useState } from 'react';
import Header from './sections/Header';
import Hero from './sections/Hero';
import StatsSection from './sections/StatsSection';
import FleetSection from './sections/FleetSection';
import ServicesSection from './sections/ServicesSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import './App.css';

function App() {
  const [preselectedVehicle, setPreselectedVehicle] = useState<string>('');

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
      <Footer />
    </div>
  );
}

export default App;
