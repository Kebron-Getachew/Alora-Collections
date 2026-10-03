import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/hero.jpeg';
import './Hero.css';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  // Trigger the entrance animations shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax: updates the DOM directly (no re-render), once per frame,
  // and only while the hero is on screen
  useEffect(() => {
    const hero = heroRef.current;
    const bg = bgRef.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    let visible = true;
    let ticking = false;

    const update = () => {
      ticking = false;
      if (visible) bg.style.transform = `translateY(${window.scrollY * 0.4}px)`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    observer.observe(hero);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      {/* Full bleed image: wrapper handles parallax, image handles the slow zoom */}
      <div className="hero-bg" ref={bgRef}>
        <img src={heroImg} alt="Alora Jewelry" className="hero-img" />
      </div>

      {/* Layered cinematic overlays */}
      <div className="hero-overlay-bottom" />
      <div className="hero-overlay-top" />
      <div className="hero-overlay-left" />

      {/* Main content */}
      <div className="hero-content">
        <div className={`hero-tag ${loaded ? 'visible' : ''}`}>
          <span className="tag-line" />
          <span>Alora Collections</span>
          <span className="tag-line" />
        </div>

        <h1 className={`hero-title ${loaded ? 'visible' : ''}`}>
          <span className="title-line line-1">Heritage</span>
          <span className="title-line line-2">in <em>Gold</em></span>
          <span className="title-line line-3">Made for You</span>
        </h1>

        <p className={`hero-subtitle ${loaded ? 'visible' : ''}`}>
          Where tradition becomes timeless
        </p>

        <div className={`hero-actions ${loaded ? 'visible' : ''}`}>
          <Link to="/shop" className="btn-hero-primary">
            <span>Shop Now</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
          <a href="#about" className="btn-hero-ghost">Discover Our Story</a>
        </div>
      </div>
    </section>
  );
}