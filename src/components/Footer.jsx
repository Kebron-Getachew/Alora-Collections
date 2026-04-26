import React from 'react';
import logoImg from '../assets/logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src={logoImg} alt="Alora" className="footer-logo" />
          <div className="footer-brand-name">ALORA</div>
          <div className="footer-brand-tag">Collections</div>
          <p className="footer-brand-desc">
            Luxury African-inspired jewelry for the woman who wears her story with pride.
          </p>
          <div className="footer-socials">
            <a href="#" className="social-link" aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="5"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
            <a href="#" className="social-link" aria-label="Twitter/X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l16 16M4 20L20 4"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Shop</div>
          <ul>
            {['New Arrivals', 'Rings', 'Necklaces', 'Bracelets', 'Earrings', 'Bespoke'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Help</div>
          <ul>
            {['Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQs', 'Track Order'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-col-title">Company</div>
          <ul>
            {['Our Story', 'Press', 'Careers', 'Contact', 'Privacy Policy'].map(item => (
              <li key={item}><a href="#">{item}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <div className="footer-copy">
          © 2026 Alora Collections. All rights reserved.
        </div>
        <div className="footer-bottom-right">
          <span>Made with love · African Heritage</span>
        </div>
      </div>
    </footer>
  );
}
