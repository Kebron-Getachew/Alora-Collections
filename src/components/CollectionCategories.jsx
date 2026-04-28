import React from 'react';
import { useNavigate } from 'react-router-dom';
import useInView from '../hooks/useInView';
import './CollectionCategories.css';

export default function CollectionCategories() {
  const [ref, visible] = useInView(0.1);
  const navigate = useNavigate();

  return (
    <section className="col-categories" ref={ref}>
      <div className={`col-cat-header fade-up ${visible ? 'visible' : ''}`}>
        <div className="section-label">Browse By Style</div>
        <h2 className="col-cat-title">Find Your <em>Perfect Piece</em></h2>
      </div>

      <div className="col-cat-grid">
        {/* Heritage Card */}
        <div className={`col-cat-card fade-up ${visible ? 'visible' : ''}`}>
          <div className="col-cat-img heritage">
            <div className="col-cat-overlay" />
            <div className="col-cat-content">
              <div className="col-cat-tag">Traditional</div>
              <h3 className="col-cat-name">Heritage<br />Collection</h3>
              <p className="col-cat-desc">
                Rooted in Ethiopian culture. Timeless crosses, filigree, and ceremonial gold pieces passed down through generations.
              </p>
              <button
                className="col-cat-btn"
                onClick={() => navigate('/shop?category=heritage')}
              >
                Browse Heritage
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Modern Card */}
        <div className={`col-cat-card fade-up delay-2 ${visible ? 'visible' : ''}`}>
          <div className="col-cat-img modern">
            <div className="col-cat-overlay" />
            <div className="col-cat-content">
              <div className="col-cat-tag">Contemporary</div>
              <h3 className="col-cat-name">Modern<br />Collection</h3>
              <p className="col-cat-desc">
                Clean lines, bold statements. Minimalist gold pieces designed for the modern woman who moves with intention.
              </p>
              <button
                className="col-cat-btn"
                onClick={() => navigate('/shop?category=modern')}
              >
                Browse Modern
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}