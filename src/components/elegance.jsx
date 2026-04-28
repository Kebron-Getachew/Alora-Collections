import React from 'react';
import useInView from '../hooks/useInView';
import elegance from '../assets/elegant.jpeg';
import './elegance.css';


export default function Elegance() {
  const [ref, visible] = useInView(0.1);

  return (
  <section className="elegance" ref={ref}>
    <div className="elegance-img-wrap">
      <img src={elegance} alt="Alora" className="elegance" />
    </div>

    <div className="elegance-overlay" />

    <div className={`elegance-text fade-up ${visible ? 'visible' : ''}`}>
      <h2 className="elegance-heading">
        Elegance in<br />Every Detail
      </h2>
    </div>

    <div className={`elegance-brand fade-up delay-3 ${visible ? 'visible' : ''}`}>
      <span>Alora</span>
    </div>
  </section>
);
}