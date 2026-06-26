import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from './data.js';
import './Catalog.css';
import './ProductImageFix.css';

const FILTERS = ['All', 'Planks', 'Logs & Gutke', 'Boards', 'Raw Timber'];

export default function Catalog({ activeCat, showToast }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();

  const filtered = products.filter((p) => {
    const catMatch = activeCat === 'all' || p.cat === activeCat;
    const filterMatch = activeFilter === 'All' || p.category === activeFilter;
    return catMatch && filterMatch;
  });

  return (
    <section id="catalog" className="catalog-section">
      <div className="catalog-header">
        <div>
          <div className="section-label brown">Our Products</div>
          <h2 className="section-title dark">
            Full <em>Catalog</em>
          </h2>
        </div>
        <div className="result-count">{filtered.length} products found</div>
      </div>

      <div className="filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="products-grid">
          {filtered.map((p) => (
            <div key={p.id} className="prod-card">
              <div className="prod-img-wrap">
                <img src={p.img} alt={p.name} className="prod-real-img" />
                {p.badge && <div className="prod-badge">{p.badge}</div>}
              </div>
              <div className="prod-body">
                <div className="prod-cat">{p.category}</div>
                <div className="prod-name">{p.name}</div>
                <div className="prod-hindi">{p.hindi}</div>
                <div className="prod-specs">
                  <div className="prod-spec">📐 {p.spec1}</div>
                  <div className="prod-spec">✓ {p.spec2}</div>
                </div>
                <div className="prod-footer">
                  <div className="prod-price">{p.price}</div>
                  <button
                    className="inquire-btn"
                    onClick={() => navigate(`/product/${p.id}`)}
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🪵</div>
          <div className="empty-text">No products in this category yet</div>
        </div>
      )}
    </section>
  );
}

