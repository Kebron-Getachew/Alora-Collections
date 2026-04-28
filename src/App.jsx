import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import Collections from './components/Collections';

import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Shop from './components/Shop';
import CollectionCategories from './components/CollectionCategories'
import './App.css';

function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <About />
      <CollectionCategories/>
      <Newsletter />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}