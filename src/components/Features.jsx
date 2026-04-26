import React from 'react';
import useInView from '../hooks/useInView';
import './Features.css';

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: 'Ethically Sourced',
    desc: 'Every material responsibly and sustainably sourced with the utmost care.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: 'Certified Gold',
    desc: '14K & 18K solid gold. Each piece comes with a certificate of authenticity.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
      </svg>
    ),
    title: 'Luxury Packaging',
    desc: 'Arrives in our signature gold-embossed gift box — perfect from the first touch.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
    title: 'Easy Returns',
    desc: '30-day hassle-free returns. Shop with full confidence, no questions asked.',
  },
];

export default function Features() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="features" ref={ref}>
      <div className="features-label-wrap">
        <div className={`section-label fade-up ${visible ? 'visible' : ''}`}>
          Why Alora
        </div>
      </div>

      <div className="features-grid">
        {features.map((f, i) => (
          <div
            key={i}
            className={`feature-item fade-up ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="feature-icon-wrap">
              <div className="feature-icon">{f.icon}</div>
              <div className="feature-icon-ring" />
            </div>
            <div className="feature-title">{f.title}</div>
            <div className="feature-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
