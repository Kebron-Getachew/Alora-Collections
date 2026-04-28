import React from 'react';
import aboutImg from '../assets/about.jpeg';
import useInView from '../hooks/useInView';
import './About.css';

export default function About() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="about" id="about" ref={ref}>
      {/* Full bleed image background */}
      <div className="about-img-wrap">
        <img src={aboutImg} alt="Alora Jewelry" className="about-img" />
        <div className="about-img-overlay" />
      </div>

      {/* Content panel floated right */}
      <div className={`about-panel ${visible ? 'visible' : ''}`}>
        <div className="about-panel-inner">
          <div className="section-label">Our Story</div>
          <h2 className="about-title">
            Born from<br />
            <em>Passion</em><br />
            & Purpose
          </h2>
          <div className="about-divider">
            <span />
            <span className="divider-gem">✦</span>
            <span />
          </div>
          <p className="about-body">
            Alora started the way the best things do, with a dream and a little courage. As a college student looking for a side hustle, the answer was always there: jewelry.
          </p>
          <p className="about-body" style={{ marginTop: '16px' }}>
             Deeply rooted in Ethiopian tradition and a love for timeless elegance, Alora Collections was born, a small business with a big heart, where every piece tells a story of heritage, beauty, and pride.
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
