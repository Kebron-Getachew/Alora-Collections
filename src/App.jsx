import React from 'react';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Collections from './components/Collections';
import Features from './components/Features';

import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Collections />
      <Features />
      
      <Newsletter />
      <Footer />
    </div>
  );
}
