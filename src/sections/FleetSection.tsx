import React, { useState, useEffect, useRef } from 'react';
import { Users, Camera, Check, X, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import { FLEET } from '../constants';
import type { Vehicle } from '../types';

interface FleetSectionProps {
  onSelectVehicleForInquiry?: (vehicleName: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicleForInquiry }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);

  // Touch swipe state for mobile gallery
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const openGallery = (vehicle: Vehicle, startIndex = 0) => {
    setSelectedVehicle(vehicle);
    setPhotoIndex(startIndex);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedVehicle(null);
    document.body.style.overflow = '';
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedVehicle) return;
    setPhotoIndex((prev) => (prev + 1) % selectedVehicle.gallery.length);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedVehicle) return;
    setPhotoIndex((prev) => (prev - 1 + selectedVehicle.gallery.length) % selectedVehicle.gallery.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold 35px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 35) {
      if (deltaX > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedVehicle) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVehicle]);

  const handleBookVehicle = (vehicle: Vehicle, e?: React.MouseEvent) => {
    e?.stopPropagation();
    closeGallery();
    if (onSelectVehicleForInquiry) {
      onSelectVehicleForInquiry(`${vehicle.model} (${vehicle.capacity})`);
    }
    const contactEl = document.getElementById('kontakt');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="vozovy-park" className="fleet">
      <div className="container">
        <div className="section-header">
          <span className="subtitle">Mercedes-Benz &amp; Setra</span>
          <h2>Náš vozový park</h2>
          <p className="section-desc">
            Klikněte na kterékoliv vozidlo pro zobrazení fotogalerie exteriéru a interiéru.
          </p>
        </div>

        <div className="fleet-cards-grid">
          {FLEET.map((vehicle) => (
            <article
              key={vehicle.id}
              className="fleet-card"
              onClick={() => openGallery(vehicle, 0)}
            >
              <div className="fleet-card-image-wrap">
                <img
                  src={vehicle.image}
                  alt={vehicle.model}
                  className="fleet-card-img"
                  loading="lazy"
                />
                <div className="fleet-capacity-badge">
                  <Users size={15} />
                  <span>{vehicle.capacity}</span>
                </div>
                <div className="fleet-gallery-overlay">
                  <span className="fleet-gallery-trigger">
                    <Camera size={18} />
                    Galerie
                  </span>
                </div>
              </div>

              <div className="fleet-card-body">
                <div className="fleet-card-header">
                  <h3>{vehicle.model}</h3>
                  {vehicle.subtitle && <span className="fleet-card-sub">{vehicle.subtitle}</span>}
                </div>

                <ul className="fleet-features-list">
                  {vehicle.features.map((feat, idx) => (
                    <li key={idx}>
                      <Check size={14} className="icon-gold" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <div className="fleet-card-actions">
                  <button
                    type="button"
                    className="btn-gallery-open"
                    onClick={(e) => {
                      e.stopPropagation();
                      openGallery(vehicle, 0);
                    }}
                  >
                    <Camera size={16} />
                    <span>Galerie</span>
                  </button>
                  <button
                    type="button"
                    className="btn-vehicle-book"
                    onClick={(e) => handleBookVehicle(vehicle, e)}
                  >
                    <span>Poptat vůz</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Gallery */}
      {selectedVehicle && (
        <div className="gallery-modal-backdrop" onClick={closeGallery}>
          <div className="gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="gallery-modal-header">
              <div className="gallery-header-title-group">
                <h3>{selectedVehicle.model}</h3>
                <span className="gallery-mobile-counter">
                  {photoIndex + 1} / {selectedVehicle.gallery.length}
                </span>
                <span className="gallery-modal-meta">
                  {selectedVehicle.subtitle} • Kapacita: <strong>{selectedVehicle.capacity}</strong> • Fotka {photoIndex + 1} z {selectedVehicle.gallery.length}
                </span>
              </div>
              <div className="gallery-modal-header-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-sm gallery-book-btn-desktop"
                  onClick={(e) => handleBookVehicle(selectedVehicle, e)}
                >
                  <CalendarCheck size={15} />
                  <span>Poptat tento vůz</span>
                </button>
                <button
                  type="button"
                  className="gallery-close-btn"
                  onClick={closeGallery}
                  aria-label="Zavřít galerii"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div
              className="gallery-main-stage"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                className="gallery-nav-btn prev"
                onClick={prevPhoto}
                aria-label="Předchozí fotka"
              >
                <ChevronLeft size={30} />
              </button>

              <div className="gallery-main-img-wrapper">
                <img
                  src={selectedVehicle.gallery[photoIndex]}
                  alt={`${selectedVehicle.model} - foto ${photoIndex + 1}`}
                  className="gallery-main-img"
                  draggable={false}
                />
              </div>

              <button
                type="button"
                className="gallery-nav-btn next"
                onClick={nextPhoto}
                aria-label="Další fotka"
              >
                <ChevronRight size={30} />
              </button>
            </div>

            <div className="gallery-thumbnails">
              {selectedVehicle.gallery.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`gallery-thumb-btn ${idx === photoIndex ? 'active' : ''}`}
                  onClick={() => setPhotoIndex(idx)}
                >
                  <img src={thumb} alt={`Náhled ${idx + 1}`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FleetSection;
