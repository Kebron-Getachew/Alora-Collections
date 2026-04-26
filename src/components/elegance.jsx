import React from 'react';
import useInView from '../hooks/useInView';
import './elegance.css';
// Replace with your own image:
// import eleganceImg from '../assets/elegance.jpg';

export default function Elegance() {
  const [ref, visible] = useInView(0.1);

  return (
    <section className="elegance" ref={ref}>
      <div className={`elegance-text fade-up ${visible ? 'visible' : ''}`}>
        <h2 className="elegance-heading">
          Elegance in<br />Every Detail
        </h2>
      </div>

      <div className={`elegance-img-wrap fade-up delay-2 ${visible ? 'visible' : ''}`}>
        {/* Replace the div below with an <img> once you have your photo */}
        <div className="elegance-img-placeholder">
          <span>Your image here</span>
        </div>
        {/* <img src={eleganceImg} alt="Alora packaging" className="elegance-img" /> */}
      </div>

      <div className={`elegance-brand fade-up delay-3 ${visible ? 'visible' : ''}`}>
        <span>Alora</span>
      </div>
    </section>
  );
}