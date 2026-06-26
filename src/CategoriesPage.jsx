import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from './data.js';
import Catalog from './Catalog.jsx';
import './Categories.css';

export default function CategoriesPage({ showToast }) {
  const [activeCat, setActiveCat] = useState('all');

  return (
    <div className="page-frame">
      <section className="categories-page-top">
        <div>
          <div className="section-label gold">Browse by Type</div>
          <h2 className="section-title dark">Wood <em>Categories</em></h2>
          <p className="categories-page-copy">
            Select a category to open the product page and make a purchase inquiry.
          </p>
        </div>
      </section>

      <div className="cats-grid categories-page-grid">
        {categories.map((c) => (
          <div
            key={c.id}
            className={`cat-card ${activeCat === c.id ? 'active' : ''}`}
            onClick={() => {
              setActiveCat(c.id);
              navigate(`/catalog/${c.id}`);
            }}
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

      <div className="categories-page-body">
        <div className="section-subtitle">Products for {categories.find((c) => c.id === activeCat)?.name || 'All'}</div>
        <Catalog
          activeCat={activeCat}
          showToast={showToast}
        />
      </div>
    </div>
  );
}
