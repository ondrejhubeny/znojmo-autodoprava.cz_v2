import React, { useState, useEffect } from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { FLEET } from '../constants';
import { useLanguage } from '../i18n';

export const Hero: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { t } = useLanguage();

  // Subtle Ken-Burns slideshow fallback until /hero-video.mp4 is placed in public/
  useEffect(() => {
    if (videoLoaded) return;
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % FLEET.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [videoLoaded]);

  return (
    <section className="hero">
      {/* Background Video + Animated Fallback */}
      <div className="hero-media-bg" aria-hidden="true">
        {FLEET.map((item, idx) => (
          <div
            key={item.id}
            className={`hero-fallback-slide ${idx === bgIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${item.image})` }}
          />
        ))}
        <video
          className={`hero-video ${videoLoaded ? 'loaded' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" />
      </div>

      <div className="container hero-content">
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>

        <p className="hero-lead">
          <span className="hero-lead-line">{t.hero.leadLine1}</span>
          <span className="hero-lead-line">{t.hero.leadLine2}</span>
        </p>

        <div className="hero-actions">
          <a href="#poptavkovy-formular" className="btn btn-primary btn-lg">
            <span>{t.hero.ctaPrimary}</span>
            <ArrowRight size={18} />
          </a>
          <a href="#vozovy-park" className="btn btn-outline btn-lg">
            <Car size={18} />
            <span>{t.hero.ctaSecondary}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
