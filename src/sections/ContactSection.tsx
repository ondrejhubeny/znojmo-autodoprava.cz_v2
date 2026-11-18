import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO, FLEET } from '../constants';

interface ContactSectionProps {
  preselectedVehicle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedVehicle }) => {
  const [selectedCar, setSelectedCar] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedVehicle) {
      setSelectedCar(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="kontakt" className="contact bg-alt">
      <div className="container">
        <div className="section-header">
          <h2>Rezervujte si vůz nebo spočítejte cenu</h2>
          <p className="section-desc">
            Napište nám podrobnosti vaší cesty a obratem vám připravíme přesnou cenovou kalkulaci.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <Phone className="icon-gold" />
              <div>
                <h4>Telefon (Nonstop dispečink)</h4>
                {CONTACT_INFO.phones.map(phone => (
                  <p key={phone}><a href={`tel:${phone}`} className="contact-highlight-link">{phone}</a></p>
                ))}
              </div>
            </div>
            <div className="contact-item">
              <Mail className="icon-gold" />
              <div>
                <h4>E-mail</h4>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
            </div>
            <div className="contact-item">
              <MapPin className="icon-gold" />
              <div>
                <h4>Sídlo společnosti</h4>
                <p>{CONTACT_INFO.owner}</p>
                <p>{CONTACT_INFO.address}</p>
                {CONTACT_INFO.ico && <p>IČO: {CONTACT_INFO.ico}</p>}
              </div>
            </div>
          </div>

          <form id="poptavkovy-formular" className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="name">Jméno a příjmení *</label>
                <input type="text" id="name" placeholder="Jan Novák" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Telefon *</label>
                <input type="tel" id="phone" placeholder="+420 777 000 000" required />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email">E-mail *</label>
                <input type="email" id="email" placeholder="vas@email.cz" required />
              </div>
              <div className="form-group">
                <label htmlFor="vehicle">Preferovaný vůz</label>
                <select
                  id="vehicle"
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                >
                  <option value="">Vyberte vůz (nepovinné)</option>
                  {Array.from(
                    new Map(FLEET.map((v) => [`${v.model} (${v.capacity})`, v])).values()
                  ).map((v) => {
                    const label = `${v.model} (${v.capacity})`;
                    return (
                      <option key={v.id} value={label}>
                        {v.model} – {v.capacity}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="form-row-3">
              <div className="form-group">
                <label htmlFor="from">Odkud *</label>
                <input type="text" id="from" placeholder="Např. Znojmo" required />
              </div>
              <div className="form-group">
                <label htmlFor="to">Kam *</label>
                <input type="text" id="to" placeholder="Např. Letiště Vídeň" required />
              </div>
              <div className="form-group">
                <label htmlFor="date">Datum a čas</label>
                <input type="text" id="date" placeholder="Např. 15. 6. v 8:00" />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Poznámka / Počet osob a zavazadel</label>
              <textarea id="message" rows={3} placeholder="Upřesněte počet osob, zpáteční cestu nebo další požadavky..."></textarea>
            </div>

            <button type="submit" className="btn btn-primary submit-btn">
              {submitted ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>Poptávka připravena k odeslání</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>Odeslat nezávaznou poptávku</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
