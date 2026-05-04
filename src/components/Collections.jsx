import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import useInView from '../hooks/useInView';
import anklet from '../assets/anklet.JPG'
import armcuff from '../assets/arm cuff.JPG'
import bangle from '../assets/bangle 1.JPG'
import crossset from '../assets/cross set.JPG'
import earrings from '../assets/earrings.JPG'
import habeshabangle from '../assets/habesha bangle.JPG'
import habeshaset from '../assets/habesha set.JPG'
import rings from '../assets/ringssss.JPG'


import './Collections.css';

const products = [
  { id: 1, name: 'Anklet', category: 'Rings', price: '1450', image: anklet },
  { id: 2, name: 'Arm Cuffs', category: 'Necklaces', price: '600', image: armcuff },
  { id: 3, name: 'Rings', category: 'Bracelets', price: '300', image: rings },
  { id: 4, name: 'Earrings', category: 'Earrings', price: '200', image: earrings },
  { id: 5, name: 'Habesha Set', category: 'Necklaces', price: '3000', image: habeshaset },
  { id: 6, name: 'Bangle', category: 'Bracelets', price: '1300', image: bangle },
];

const gradients = [
  'linear-gradient(145deg, #c8a040, #5C4209)',
  'linear-gradient(145deg, #e8c460, #8B6914)',
  'linear-gradient(145deg, #d4b060, #7a5c10)',
  'linear-gradient(145deg, #f0d080, #9a7020)',
  'linear-gradient(145deg, #b89040, #5C4209)',
  'linear-gradient(145deg, #e0c060, #8B6914)',
];

export default function Collections() {
  const [active, setActive] = useState(2);
  const [headerRef, headerVisible] = useInView(0.1);

  const prev = () => setActive(a => Math.max(0, a - 1));
  const next = () => setActive(a => Math.min(products.length - 1, a + 1));

  return (
    <section className="collections" id="collections">
      <div className="collections-header" ref={headerRef}>
        <div className={`fade-up ${headerVisible ? 'visible' : ''}`}>
          <div className="section-label">Curated For You</div>
          <h2 className="collections-title">Our <em>Collections</em></h2>
        </div>
      </div>

      <div className="cine-stage">
        {products.map((product, i) => {
          const offset = i - active;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <div
              key={product.id}
              className={`cine-card ${isActive ? 'cine-active' : ''}`}
              style={{
                transform: `
                  translateX(calc(${offset} * 280px))
                  translateY(calc(${offset} * -80px))
                  scale(${isActive ? 1 : 0.82 - Math.abs(offset) * 0.04})
                  rotate(${offset * 6}deg)
                `,
                opacity: isVisible ? (isActive ? 1 : 0.75 - Math.abs(offset) * 0.1) : 0,
                zIndex: 10 - Math.abs(offset),
                filter: isActive 
                ? 'none' 
                : `brightness(${0.75 - Math.abs(offset) * 0.08})`,
                pointerEvents: isVisible ? 'auto' : 'none',
              }}
              onClick={() => !isActive && setActive(i)}
            >
              <div
                className="cine-card-img"
                style={{ background: product.image ? 'none' : gradients[i % gradients.length] }}
              >
                {product.image
                  ? <img src={product.image} alt={product.name} />
                  : <span className="cine-card-icon">✦</span>
                }
                {isActive && <div className="cine-shop-tag">Shop</div>}
              </div>
              {isActive && (
                <div className="cine-card-info">
                  <div className="cine-card-name">{product.name}</div>
                  <div className="cine-card-price">{product.price}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Arrow controls */}
      <div className="cine-controls">
        <button className="cine-btn" onClick={prev} disabled={active === 0}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
        </button>
        <span className="cine-counter">{active + 1} / {products.length}</span>
        <button className="cine-btn" onClick={next} disabled={active === products.length - 1}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div className="collections-footer">
        <a href="/shop" className="btn-view-all">
          <span>View All Pieces</span>
          <div className="btn-line" />
        </a>
      </div>
    </section>
  );
}
