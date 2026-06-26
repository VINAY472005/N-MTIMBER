import React from 'react';
import './Hero.css';

export default function Hero({ onNav }) {
  return (
    <section id="home" className="hero">
      <div className="hero-texture" />
      <div className="hero-glow" />

      <div className="hero-content">
        <div className="hero-badge fadeUp-1">
          <span className="badge-dot" />
          🇮🇳 Delivering Pan-India
        </div>

        <h1 className="fadeUp-2">
          Premium Wood
          <em>Business Hub</em>
        </h1>

        <p className="hero-sub fadeUp-3">
          India's trusted wholesale marketplace for{' '}
          <span>planks (फंटे)</span>, timber (लकड़ी), gutke (गुटके) &amp;
          furniture parts — directly to contractors, builders &amp;
          manufacturers.
        </p>

        <div className="hero-actions fadeUp-4">
          <button className="btn-primary" onClick={() => onNav('catalog')}>
            Browse Wood Range
          </button>
          <button className="btn-outline" onClick={() => onNav('categories')}>
            View Categories
          </button>
        </div>

        <div className="hero-stats fadeUp-5">
          {[
            ['25+',  'Years in Business'],
            ['500+', 'B2B Clients'],
            ['28',   'States Covered'],
            ['48+',  'Wood Products'],
          ].map(([num, label]) => (
            <div key={label} className="stat">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
