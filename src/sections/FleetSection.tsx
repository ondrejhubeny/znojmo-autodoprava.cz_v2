import React, { useState, useEffect, useRef } from 'react';
import { Users, Camera, Check, X, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import type { Vehicle } from '../types';
import { useLanguage } from '../i18n';

interface FleetSectionProps {
  onSelectVehicleForInquiry?: (vehicleName: string) => void;
}

export const FleetSection: React.FC<FleetSectionProps> = ({ onSelectVehicleForInquiry }) => {
  const { t } = useLanguage();
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const selectedVehicle = t.vehicles.find((v) => v.id === selectedVehicleId) || null;

  // Touch swipe state for mobile gallery
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const openGallery = (vehicle: Vehicle, startIndex = 0) => {
    setSelectedVehicleId(vehicle.id);
    setPhotoIndex(startIndex);
    setDragOffset(0);
    setIsDragging(false);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setSelectedVehicleId(null);
    setDragOffset(0);
    setIsDragging(false);
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
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - touchStartX.current;
    const deltaY = currentY - touchStartY.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      setDragOffset(deltaX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;

    // Horizontal swipe threshold 40px
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        nextPhoto();
      } else {
        prevPhoto();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
    setIsDragging(false);
    setDragOffset(0);
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
    const formEl = document.getElementById('poptavkovy-formular') || document.getElementById('kontakt');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="vozovy-park" className="fleet">
      <div className="container">
        <div className="section-header">
          <h2>{t.fleet.title}</h2>
          <p className="section-desc">{t.fleet.desc}</p>
        </div>

        <div className="fleet-cards-grid">
          {t.vehicles.map((vehicle) => (
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
                    {t.fleet.galleryBtn}
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
                    className="btn-vehicle-book"
                    onClick={(e) => handleBookVehicle(vehicle, e)}
                  >
                    <span>{t.fleet.bookBtn}</span>
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
                  {selectedVehicle.subtitle} • {t.fleet.capacityLabel}:{' '}
                  <strong>{selectedVehicle.capacity}</strong> •{' '}
                  {t.fleet.photoOf(photoIndex + 1, selectedVehicle.gallery.length)}
                </span>
              </div>
              <div className="gallery-modal-header-actions">
                <button
                  type="button"
                  className="btn btn-primary btn-sm gallery-book-btn-desktop"
                  onClick={(e) => handleBookVehicle(selectedVehicle, e)}
                >
                  <CalendarCheck size={15} />
                  <span>{t.fleet.bookThisVehicle}</span>
                </button>
                <button
                  type="button"
                  className="gallery-close-btn"
                  onClick={closeGallery}
                  aria-label={t.fleet.closeGallery}
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            <div
              className="gallery-main-stage"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button
                type="button"
                className="gallery-nav-btn prev"
                onClick={prevPhoto}
                aria-label={t.fleet.prevPhoto}
              >
                <ChevronLeft size={30} />
              </button>

              <div
                className={`gallery-slider-track ${isDragging ? 'dragging' : ''}`}
                style={{
                  transform: `translate3d(calc(-${photoIndex * 100}% + ${dragOffset}px), 0, 0)`,
                }}
              >
                {selectedVehicle.gallery.map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className={`gallery-slide ${idx === photoIndex ? 'active' : ''}`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${selectedVehicle.model} - ${idx + 1}`}
                      className="gallery-main-img"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="gallery-nav-btn next"
                onClick={nextPhoto}
                aria-label={t.fleet.nextPhoto}
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
                  <img src={thumb} alt={t.fleet.thumbAlt(idx + 1)} />
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
