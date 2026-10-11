import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import { useCart } from '../context/CartContext';
import anklet from '../assets/anklet.JPG';
import armcuff from '../assets/arm cuff.JPG';
import bangle from '../assets/bangles.JPG';
import earrings from '../assets/earrings.JPG';
import habeshaset from '../assets/hero.png';
import rings from '../assets/ringssss.JPG';
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
  const [stageRef, stageVisible] = useInView(0.2);

  // entered: the stage has scrolled into view (latches on, so the spread plays once)
  // introDone: the spread has finished, so normal arrow/click navigation is snappy
  const [entered, setEntered] = useState(false);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (stageVisible) setEntered(true);
  }, [stageVisible]);

  useEffect(() => {
    if (!entered) return;
    const t = setTimeout(() => setIntroDone(true), 1700);
    return () => clearTimeout(t);
  }, [entered]);

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

      <div className="cine-stage" ref={stageRef}>
        {products.map((product, i) => {
          const offset = i - active;
          const a = Math.abs(offset);
          const isActive = offset === 0;
          const isVisible = a <= 2;

          // Final resting position: an even arc, small tilt, side cards a bit smaller
          const settled = `
            translateX(calc(${offset} * var(--card-step)))
            translateY(calc(${a * a} * var(--card-sag)))
            scale(${1 - a * 0.11})
            rotate(${offset * 3}deg)
          `;

          // Starting position: every card piled up off-screen on the right
          const stacked = 'translateX(70vw) translateY(0px) scale(0.7) rotate(10deg)';

          return (
            <div
              key={product.id}
              className={`cine-card ${isActive ? 'cine-active' : ''}`}
              style={{
                transform: entered ? settled : stacked,
                opacity: entered && isVisible ? 1 - a * 0.06 : 0,
                zIndex: 10 - a,
                pointerEvents: entered && isVisible ? 'auto' : 'none',
                // During the intro: slower, and rightmost card leaves first (right to left)
                transitionDuration: introDone ? '0.55s' : '1.1s',
                transitionDelay: introDone ? '0s' : `${Math.min(4, Math.max(0, 2 - offset)) * 0.12}s`,
              }}
              onClick={() => !isActive && setActive(i)}
            >
              <ScrollCard product={product} index={i} isActive={isActive} />
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
        <Link to="/shop" className="btn-view-all">
          <span>View All Pieces</span>
          <div className="btn-line" />
        </Link>
      </div>
    </section>
  );
}

function ScrollCard({ product, index, isActive }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="cine-card-inner">
      <div
        className="cine-card-img"
        style={{ background: product.image ? 'none' : gradients[index % gradients.length] }}
      >
        {product.image
          ? <img src={product.image} alt={product.name} />
          : <span className="cine-card-icon">✦</span>
        }

        {isActive && <div className="cine-shop-tag">Shop</div>}

        {/* Add to cart overlay — only shows on active card */}
        {isActive && (
          <div className="cine-add-overlay">
            {/* Quantity selector */}
            <div className="cine-qty" onClick={e => e.stopPropagation()}>
              <button onClick={e => { e.stopPropagation(); setQty(q => Math.max(1, q - 1)); }}>−</button>
              <span>{qty}</span>
              <button onClick={e => { e.stopPropagation(); setQty(q => q + 1); }}>+</button>
            </div>

            {/* Add to cart button */}
            <button className="cine-add-btn" onClick={handleAdd}>
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
          </div>
        )}
      </div>

      {isActive && (
        <div className="cine-card-info">
          <div className="cine-card-name">{product.name}</div>
          <div className="cine-card-price">${product.price}</div>
        </div>
      )}
    </div>
  );
}