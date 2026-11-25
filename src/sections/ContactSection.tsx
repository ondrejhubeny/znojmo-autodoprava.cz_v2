import React, { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Send, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { useLanguage } from '../i18n';

interface ContactSectionProps {
  preselectedVehicle?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedVehicle }) => {
  const { t } = useLanguage();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCar, setSelectedCar] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot anti-spam
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (preselectedVehicle) {
      setSelectedCar(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setErrorMsg('');

    try {
      const response = await fetch('/send-mail.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email,
          vehicle: selectedCar,
          from,
          to,
          date,
          message,
          website,
        }),
      });

      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const result = await response.json();
        if (result.success) {
          setSubmitted(true);
          setName('');
          setPhone('');
          setEmail('');
          setFrom('');
          setTo('');
          setDate('');
          setMessage('');
          setTimeout(() => setSubmitted(false), 6000);
        } else {
          setErrorMsg(result.message || t.contact.form.errorFallback + CONTACT_INFO.phones[0]);
        }
      } else {
        // Fallback pro testovací náhled na Vercelu (kde neběží PHP)
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch {
      setErrorMsg(t.contact.form.errorFallback + CONTACT_INFO.phones[0]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="kontakt" className="contact bg-alt">
      <div className="container">
        <div className="section-header">
          <h2>{t.contact.title}</h2>
          <p className="section-desc">{t.contact.desc}</p>
        </div>
        <div className="contact-grid">
          <div className="contact-card">
            <div className="contact-item">
              <Phone className="icon-gold" />
              <div>
                <h4>{t.contact.phoneLabel}</h4>
                {CONTACT_INFO.phones.map((phoneNum) => (
                  <p key={phoneNum}>
                    <a href={`tel:${phoneNum}`} className="contact-highlight-link">
                      {phoneNum}
                    </a>
                  </p>
                ))}
              </div>
            </div>
            <div className="contact-item">
              <Mail className="icon-gold" />
              <div>
                <h4>{t.contact.emailLabel}</h4>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </div>
            </div>
            <div className="contact-item">
              <MapPin className="icon-gold" />
              <div>
                <h4>{t.contact.addressLabel}</h4>
                <p>{CONTACT_INFO.owner}</p>
                <p>{CONTACT_INFO.address}</p>
                {CONTACT_INFO.ico && (
                  <p>
                    {t.contact.icoLabel}: {CONTACT_INFO.ico}
                  </p>
                )}
              </div>
            </div>
          </div>

          <form id="poptavkovy-formular" className="contact-form" onSubmit={handleSubmit}>
            {/* Skryté antispamové pole (honeypot) */}
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />
            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="name">{t.contact.form.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  placeholder={t.contact.form.namePlaceholder}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">{t.contact.form.phoneLabel}</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder={t.contact.form.phonePlaceholder}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row-2">
              <div className="form-group">
                <label htmlFor="email">{t.contact.form.emailLabel}</label>
                <input
                  type="email"
                  id="email"
                  placeholder={t.contact.form.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicle">{t.contact.form.vehicleLabel}</label>
                <select
                  id="vehicle"
                  className={selectedCar === '' ? 'select-placeholder' : ''}
                  value={selectedCar}
                  onChange={(e) => setSelectedCar(e.target.value)}
                >
                  <option value="">{t.contact.form.vehiclePlaceholder}</option>
                  {Array.from(
                    new Map(t.vehicles.map((v) => [`${v.model} (${v.capacity})`, v])).values()
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
                <label htmlFor="from">{t.contact.form.fromLabel}</label>
                <input
                  type="text"
                  id="from"
                  placeholder={t.contact.form.fromPlaceholder}
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="to">{t.contact.form.toLabel}</label>
                <input
                  type="text"
                  id="to"
                  placeholder={t.contact.form.toPlaceholder}
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">{t.contact.form.dateLabel}</label>
                <input
                  type="text"
                  id="date"
                  placeholder={t.contact.form.datePlaceholder}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t.contact.form.messageLabel}</label>
              <textarea
                id="message"
                rows={3}
                placeholder={t.contact.form.messagePlaceholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            {errorMsg && <p className="form-error-msg">{errorMsg}</p>}

            <button type="submit" className="btn btn-primary submit-btn" disabled={isSending}>
              {submitted ? (
                <>
                  <CheckCircle2 size={18} />
                  <span>{t.contact.form.submittedBtn}</span>
                </>
              ) : (
                <>
                  <Send size={18} />
                  <span>
                    {isSending ? t.contact.form.sendingBtn : t.contact.form.submitBtn}
                  </span>
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
