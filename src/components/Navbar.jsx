
import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.png';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

      {/* Logo */}
      <a href="/" className="nav-logo">
        <img src={logoImg} alt="Alora" className="nav-logo-img" />
        <div className="nav-logo-text">
          <span className="logo-alora">ALORA</span>
          <span className="logo-sub">Collections</span>
        </div>
      </a>

      {/* Links */}
      <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>

        {/* Collections */}
        <li
          className="nav-item has-dropdown"
          onMouseEnter={() => setCollectionsOpen(true)}
          onMouseLeave={() => setCollectionsOpen(false)}
        >
          <a href="#collections" className="nav-link">
            Collections
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </a>
          {collectionsOpen && (
            <div className="dropdown">
              <a href="/shop?category=heritage" className="dropdown-item" onClick={() => setCollectionsOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Heritage Collection
              </a>
              <a href="/shop?category=modern" className="dropdown-item" onClick={() => setCollectionsOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Modern Collection
              </a>
            </div>
          )}
        </li>

        {/* Shop */}
        <li
          className="nav-item has-dropdown"
          onMouseEnter={() => setShopOpen(true)}
          onMouseLeave={() => setShopOpen(false)}
        >
          <a href="/shop" className="nav-link">
            Shop
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </a>
          {shopOpen && (
            <div className="dropdown">
              <a href="/shop?category=necklaces" className="dropdown-item" onClick={() => setShopOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Necklaces
              </a>
              <a href="/shop?category=bracelets" className="dropdown-item" onClick={() => setShopOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Bracelets
              </a>
              <a href="/shop?category=rings" className="dropdown-item" onClick={() => setShopOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Rings
              </a>
              <a href="/shop?category=earrings" className="dropdown-item" onClick={() => setShopOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Earrings
              </a>
              <a href="/shop?category=arm+cuffs" className="dropdown-item" onClick={() => setShopOpen(false)}>
                <span className="dropdown-icon">✦</span>
                Arm Cuffs
              </a>
            </div>
          )}
        </li>

        {/* Our Story */}
        <li className="nav-item">
          <a href="#about" className="nav-link">Our Story</a>
        </li>

      </ul>

      {/* Right icons */}
      <div className="nav-right">
        <button className="nav-icon" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        </button>

        <button className="nav-icon" aria-label="Sign Up / Login">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>

        <button className="nav-icon" aria-label="Wishlist">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        <button className="nav-icon" aria-label="Cart">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </button>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

    </nav>
  );
}