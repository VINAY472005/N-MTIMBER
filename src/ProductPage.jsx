import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from './data.js';
import './Catalog.css';
import './ProductImageFix.css';

export default function ProductPage({ showToast, addToCart }) { // addToCart kept for compatibility

  const [qty, setQty] = useState(1);
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id.toString() === productId);

  if (!product) {
    return (
      <div className="page-frame">
        <div className="empty-state">
          <div className="empty-icon">❌</div>
          <div className="empty-text">Product not found.</div>
          <button className="btn-primary" onClick={() => navigate('/catalog')}>
            Back to Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-frame product-page">
      <div className="product-header">
        <button className="btn-outline" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <div>
          <div className="section-label brown">Product Details</div>
          <h2 className="section-title dark">{product.name}</h2>
        </div>
      </div>

      <div className="product-grid">
        <div className="product-image-panel">
          <img src={product.img} alt={product.name} className="product-image" />
        </div>

        <div className="product-details-panel">
          <div className="prod-cat">{product.category}</div>
          <div className="prod-name large">{product.name}</div>
          <div className="prod-hindi">{product.hindi}</div>
          <div className="prod-specs">
            <div className="prod-spec">📐 {product.spec1}</div>
            <div className="prod-spec">✓ {product.spec2}</div>
          </div>
          <div className="prod-price-detail">Price: {product.price}</div>
          <div className="product-qty-row">
            <button className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>
              -
            </button>
            <span>{qty}</span>
            <button className="qty-btn" onClick={() => setQty(qty + 1)}>
              +
            </button>
          </div>
          <div className="product-action-row">
            <button
              className="btn-primary"
              onClick={() => {
                addToCart(product, qty);
                navigate('/contact');
                showToast('Inquiry page opened. Submit your requirements below.');
              }}
            >
              Inquiry
            </button>
            <button className="btn-outline" onClick={() => navigate('/cart')}>
              View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

