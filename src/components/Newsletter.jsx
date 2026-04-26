import React from 'react';
import contactImg from '../assets/contact.JPG';
import useInView from '../hooks/useInView';
import './Newsletter.css';

export default function Newsletter() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="contact-section" ref={ref}>
      <img src={contactImg} alt="Contact" className="contact-bg-img" />
      <div className="contact-overlay" />

      <div className={`contact-content fade-up ${visible ? 'visible' : ''}`}>
        <h2 className="contact-title">
          <em>Contact</em> Information
        </h2>

        <div className="contact-item">
          <div className="contact-label">Instagram</div>
          <div className="contact-value">@_alora_collectionss_</div>
        </div>

        <div className="contact-item">
          <div className="contact-label">Email Address</div>
          <div className="contact-value">alorajewelry@gmail.com</div>
        </div>

        <div className="contact-item">
          <div className="contact-label">Phone Number</div>
          <div className="contact-value">+251-965111066</div>
        </div>
      </div>
    </section>
  );
}