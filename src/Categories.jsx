import React from 'react';
import { categories } from './data.js';
import './Categories.css';

export default function Categories({ activeCat, setActiveCat, onNav }) {
  const handleClick = (id) => {
    setActiveCat(id);
    onNav('catalog');
  };

  return (
    <section id="categories" className="categories-section">
      <div className="cats-header">
        <div>
          <div className="section-label gold">Browse by Type</div>
          <h2 className="section-title white">
            Wood <em>Categories</em>
          </h2>
        </div>
        <button
          className="see-all-btn"
          onClick={() => { setActiveCat('all'); onNav('catalog'); }}
        >
          See All Products
        </button>
      </div>

      <div className="cats-grid">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`cat-card ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => handleClick(c.id)}
          >
            {c.img ? (
              <div className="cat-img-wrap">
                <img src={c.img} alt={c.name} className="cat-img" />
                <div className="cat-img-overlay" />
                <div className="cat-info-over">
                  <div className="cat-name">{c.name}</div>
                  <div className="cat-hindi">{c.hindi}</div>
                  <div className="cat-count">{c.count}</div>
                </div>
              </div>
            ) : (
              <>
                <div className="cat-icon">{c.icon}</div>
                <div className="cat-name">{c.name}</div>
                <div className="cat-hindi">{c.hindi}</div>
                <div className="cat-count">{c.count}</div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
