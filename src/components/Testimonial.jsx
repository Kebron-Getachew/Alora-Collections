import React, { useState, useEffect } from 'react';
import useInView from '../hooks/useInView';
import './Testimonial.css';

const testimonials = [
  {
    quote: "I wore my Alora cross necklace on my wedding day. It felt like carrying my grandmother's spirit with me. I've never felt more beautiful.",
    author: 'Meron T.',
    location: 'Toronto, Canada',
    stars: 5,
  },
  {
    quote: "The craftsmanship is absolutely stunning. You can feel the love and heritage in every detail. My bracelet gets compliments everywhere I go.",
    author: 'Selam A.',
    location: 'London, UK',
    stars: 5,
  },
  {
    quote: "Ordering was seamless and the packaging alone made me emotional. Alora isn't just jewelry — it's wearable art with a soul.",
    author: 'Hana M.',
    location: 'Washington D.C.',
    stars: 5,
  },
];

export default function Testimonial() {
  const [active, setActive] = useState(0);
  const [ref, visible] = useInView(0.1);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[active];

  return (
    <section className="testimonial" ref={ref}>
      <div className="testimonial-bg-text">ALORA</div>

      <div className={`testimonial-inner fade-up ${visible ? 'visible' : ''}`}>
        <div className="t-stars">
          {'★'.repeat(t.stars)}
        </div>

        <blockquote className="t-quote" key={active}>
          "{t.quote}"
        </blockquote>

        <div className="t-author">
          <div className="t-line" />
          <div className="t-info">
            <span className="t-name">{t.author}</span>
            <span className="t-location">{t.location}</span>
          </div>
          <div className="t-line" />
        </div>

        <div className="t-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === active ? 'active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
