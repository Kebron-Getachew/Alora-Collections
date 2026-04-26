import React, { useState } from 'react';
import useInView from '../hooks/useInView';
import './Collections.css';

const products = [
  {
    id: 1,
    name: 'Ethiopian Cross Ring',
    category: 'Rings',
    price: '$145',
    tag: 'Bestseller',
    gradient: 'linear-gradient(145deg, #c8a040 0%, #8B6914 60%, #5C4209 100%)',
    icon: '💍',
  },
  {
    id: 2,
    name: 'Habesha Pendant',
    category: 'Necklaces',
    price: '$220',
    tag: 'New',
    gradient: 'linear-gradient(145deg, #e8c460 0%, #c9a040 50%, #8B6914 100%)',
    icon: '📿',
  },
  {
    id: 3,
    name: 'Gold Link Bracelet',
    category: 'Bracelets',
    price: '$98',
    tag: null,
    gradient: 'linear-gradient(145deg, #d4b060 0%, #b08020 50%, #7a5c10 100%)',
    icon: '✨',
  },
  {
    id: 4,
    name: 'Filigree Earrings',
    category: 'Earrings',
    price: '$115',
    tag: 'New',
    gradient: 'linear-gradient(145deg, #f0d080 0%, #d4a840 50%, #9a7020 100%)',
    icon: '🌟',
  },
  {
    id: 5,
    name: 'Tsinat Choker',
    category: 'Necklaces',
    price: '$185',
    tag: null,
    gradient: 'linear-gradient(145deg, #b89040 0%, #8a6810 50%, #5C4209 100%)',
    icon: '🔮',
  },
  {
    id: 6,
    name: 'Melkam Cuff',
    category: 'Bracelets',
    price: '$130',
    tag: 'Bestseller',
    gradient: 'linear-gradient(145deg, #e0c060 0%, #c09030 50%, #8B6914 100%)',
    icon: '⭐',
  },
];

const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings'];

export default function Collections() {
  const [active, setActive] = useState('All');
  const [headerRef, headerVisible] = useInView(0.1);

  const filtered = active === 'All' ? products : products.filter(p => p.category === active);

  return (
    <section className="collections" id="collections">
      <div className="collections-header" ref={headerRef}>
        <div className={`fade-up ${headerVisible ? 'visible' : ''}`}>
          <div className="section-label">Curated For You</div>
          <h2 className="collections-title">
            Our <em>Collections</em>
          </h2>
        </div>

        <div className={`filter-tabs fade-up delay-2 ${headerVisible ? 'visible' : ''}`}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-tab ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="products-grid">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      <div className="collections-footer">
        <a href="#" className="btn-view-all">
          <span>View All Pieces</span>
          <div className="btn-line" />
        </a>
      </div>
    </section>
  );
}

function ProductCard({ product, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`product-card fade-up ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="card-img-wrap">
        <div
          className="card-bg"
          style={{ background: product.gradient }}
        >
          <span className="card-icon">{product.icon}</span>
          <div className={`card-shine ${hovered ? 'active' : ''}`} />
        </div>

        {product.tag && (
          <div className="card-tag">{product.tag}</div>
        )}

        <div className={`card-hover-panel ${hovered ? 'active' : ''}`}>
          <button className="btn-add-to-cart">Add to Cart</button>
          <button className="btn-wishlist" aria-label="Wishlist">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="card-info">
        <div className="card-category">{product.category}</div>
        <div className="card-name">{product.name}</div>
        <div className="card-price">{product.price}</div>
      </div>
    </div>
  );
}
