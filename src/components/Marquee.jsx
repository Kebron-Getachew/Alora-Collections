import React from 'react';
import './Marquee.css';

const items = [
  'Ethiopian Traditional Pieces',
  'Delivery across Addis Ababa',
  'Handcrafted Pieces',
  'African Heritage',
  'Modern Collections',
  'Custom Orders',
 
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
