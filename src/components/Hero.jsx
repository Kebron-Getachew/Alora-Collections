import React, { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/hero.jpeg';
import logoImg from '../assets/logo.png';
import './Hero.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const parallax = scrollY * 0.4;

  return (
    <section className="hero" ref={heroRef}>
      {/* Full bleed image with parallax */}
      <div className="hero-bg" style={{ transform: `translateY(${parallax}px)` }}>
        <img src={heroImg} alt="Alora Jewelry" className="hero-img" />
      </div>

      {/* Layered cinematic overlays */}
      <div className="hero-overlay-bottom" />
      <div className="hero-overlay-top" />
      <div className="hero-overlay-left" />

      {/* Vertical side text */}
      <div className="hero-side-text left">
        <span>Handcrafted · African Heritage · Luxury</span>
      </div>
      <div className="hero-side-text right">
        <span>New Collection 2026</span>
      </div>

      {/* Logo watermark */}
      <div className={`hero-logo-mark ${loaded ? 'visible' : ''}`}>
        <img src={logoImg} alt="Alora" />
      </div>

      {/* Main content */}
      <div className="hero-content">
        <div className={`hero-tag ${loaded ? 'visible' : ''}`}>
          <span className="tag-line" />
          <span>Alora Collections</span>
          <span className="tag-line" />
        </div>

        <h1 className={`hero-title ${loaded ? 'visible' : ''}`}>
          <span className="title-line line-1">Adorned</span>
          <span className="title-line line-2">in <em>Gold</em></span>
          <span className="title-line line-3">Born for You</span>
        </h1>

        <p className={`hero-subtitle ${loaded ? 'visible' : ''}`}>
          Where ancient African artistry meets modern luxury
        </p>

        <div className={`hero-actions ${loaded ? 'visible' : ''}`}>
          <a href="#collections" className="btn-hero-primary">
            <span>Shop Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#about" className="btn-hero-ghost">Discover Our Story</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`scroll-cue ${loaded ? 'visible' : ''}`}>
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>

     
    </section>
  );
}
