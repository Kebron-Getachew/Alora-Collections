import React, { useState } from 'react';
import './Shop.css';

const allProducts = [
  { id: 1, name: 'Ethiopian Cross Ring', category: 'Rings', price: '$145', image: null },
  { id: 2, name: 'Habesha Pendant', category: 'Necklaces', price: '$220', image: null },
  { id: 3, name: 'Gold Link Bracelet', category: 'Bracelets', price: '$98', image: null },
  { id: 4, name: 'Filigree Earrings', category: 'Earrings', price: '$115', image: null },
  { id: 5, name: 'Tsinat Choker', category: 'Necklaces', price: '$185', image: null },
  { id: 6, name: 'Melkam Cuff', category: 'Bracelets', price: '$130', image: null },
  { id: 7, name: 'Adwa Ring', category: 'Rings', price: '$160', image: null },
  { id: 8, name: 'Sun Pendant', category: 'Necklaces', price: '$175', image: null },
  { id: 9, name: 'Chain Earrings', category: 'Earrings', price: '$90', image: null },
  { id: 10, name: 'Selam Bangle', category: 'Bracelets', price: '$110', image: null },
];

const categories = ['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings'];

const gradients = [
  'linear-gradient(145deg, #c8a040, #5C4209)',
  'linear-gradient(145deg, #e8c460, #8B6914)',
  'linear-gradient(145deg, #d4b060, #7a5c10)',
  'linear-gradient(145deg, #f0d080, #9a7020)',
  'linear-gradient(145deg, #b89040, #5C4209)',
  'linear-gradient(145deg, #e0c060, #8B6914)',
];

export default function Shop() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === active);

  return (
    <div className="shop">
      <div className="shop-header">
        <p className="shop-sub">From Classic to Contemporary—</p>
        <h1 className="shop-title">Your Perfect Piece Awaits</h1>
        <div className="shop-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`shop-filter ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-grid">
        {filtered.map((product, i) => (
          <div className="shop-card" key={product.id}>
            <div
              className="shop-card-img"
              style={{ background: product.image ? 'none' : gradients[i % gradients.length] }}
            >
              {product.image
                ? <img src={product.image} alt={product.name} />
                : <span className="shop-card-icon">✦</span>
              }
            </div>
            <div className="shop-card-name">{product.name}</div>
            <div className="shop-card-price">{product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}