import React, { useState } from 'react';
import useInView from '../hooks/useInView';
import './Newsletter.css';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [ref, visible] = useInView(0.1);

  const handleSubmit = () => {
    if (email.includes('@')) {
      setSubmitted(true);
    }
  };

  return (
    <section className="newsletter" ref={ref}>
      <div className="newsletter-deco-left">✦</div>
      <div className="newsletter-deco-right">✦</div>

      <div className={`newsletter-inner fade-up ${visible ? 'visible' : ''}`}>
        <div className="section-label" style={{ justifyContent: 'center', display: 'flex' }}>
          Join the Circle
        </div>
        <h2 className="newsletter-title">
          Be First to Discover<br />
          <em>New Arrivals</em>
        </h2>
        <p className="newsletter-sub">
          Exclusive access to new collections, styling guides, and members-only offers.
        </p>

        {!submitted ? (
          <div className="newsletter-form">
            <input
              className="newsletter-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button className="newsletter-btn" onClick={handleSubmit}>
              Subscribe
            </button>
          </div>
        ) : (
          <div className="newsletter-success">
            <span className="success-icon">✦</span>
            <span>Welcome to the Alora circle. We'll be in touch.</span>
          </div>
        )}

        <p className="newsletter-note">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
