import React from 'react';
import heroImg from '../assets/hero.jpeg';
import useInView from '../hooks/useInView';
import './About.css';

export default function About() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="about" id="about" ref={ref}>
      {/* Full bleed image background */}
      <div className="about-img-wrap">
        <img src={heroImg} alt="Alora Jewelry" className="about-img" />
        <div className="about-img-overlay" />
      </div>

      {/* Content panel floated right */}
      <div className={`about-panel ${visible ? 'visible' : ''}`}>
        <div className="about-panel-inner">
          <div className="section-label">Our Heritage</div>
          <h2 className="about-title">
            Quick and<br />
            <em>hassle-free</em><br />
            shopping
          </h2>
          <div className="about-divider">
            <span />
            <span className="divider-gem">✦</span>
            <span />
          </div>
          <p className="about-body">
            Every Alora piece is a celebration of culture and craftsmanship. We blend ancient African artistry with modern luxury — jewelry that carries meaning, beauty, and soul.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
            Shop with confidence. Fast delivery, easy returns, and a team that truly cares about your experience.
          </p>
          <a href="#collections" className="btn-about">
            <span>Shop the Collection</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Floating accent text */}
      <div className={`about-accent ${visible ? 'visible' : ''}`}>
        <span>Alora Jewelry</span>
      </div>
    </section>
  );
}
