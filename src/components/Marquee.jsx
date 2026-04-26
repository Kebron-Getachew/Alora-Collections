import React from 'react';
import './Marquee.css';

const items = [
  'Free Shipping Over $150',
  'Handcrafted Luxury',
  '14K & 18K Gold',
  'African Heritage',
  'Certificate of Authenticity',
  'Hassle-Free Returns',
  'Bespoke Orders Welcome',
];

export default function Marquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
