import React, { useState, useEffect } from 'react';
import { ArrowRight, Car } from 'lucide-react';
import { FLEET } from '../constants';

export const Hero: React.FC = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

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
        <h1>Cestujte na úrovni s Autodopravou CHOCHOLA</h1>

        <p className="hero-lead">
          Profesionální osobní, mikrobusová a autobusová přeprava ze Znojma po celé ČR i Evropě.
          Od luxusního sedanu pro 4 osoby až po zájezdový autokar Setra pro 52 cestujících.
        </p>

        <div className="hero-actions">
          <a href="#kontakt" className="btn btn-primary btn-lg">
            <span>Nezávazná poptávka</span>
            <ArrowRight size={18} />
          </a>
          <a href="#vozovy-park" className="btn btn-outline btn-lg">
            <Car size={18} />
            <span>Prohlédnout vozový park</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
