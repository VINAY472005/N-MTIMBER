import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { categories } from './data.js';
import Catalog from './Catalog.jsx';
import './Catalog.css';

export default function CatalogPage({ showToast }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const activeCat = categories.some((category) => category.id === categoryId)
    ? categoryId
    : 'all';
  const categoryName = categories.find((category) => category.id === activeCat)?.name || 'All Products';

  return (
    <div className="page-frame">
      <section className="catalog-page-top">
        <div>
          <div className="section-label brown">Product Catalog</div>
          <h2 className="section-title dark">{categoryName}</h2>
          <p className="catalog-page-copy">
            Browse products in this category and select an item to view details, request a quote, or begin the purchase process.
          </p>
        </div>
        <button className="btn-outline" onClick={() => navigate('/categories')}>
          Change Category
        </button>
      </section>

      <Catalog activeCat={activeCat} showToast={showToast} />
    </div>
  );
}
