import React from 'react';

import { useNavigate } from 'react-router-dom';

import './CartPage.css';

export default function CartPage({ cartItems, updateCartQty, removeFromCart, clearCart, showToast }) {
  const navigate = useNavigate();


  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const amount = Number(item.price.replace(/[^0-9]/g, '')) || 0;
    return sum + amount * item.qty;
  }, 0);

  const handleCheckout = () => {
    if (!cartItems.length) {
      showToast('Your cart is empty. Add a wood product first.');
      return;
    }
    navigate('/contact');
    showToast('Please submit your inquiry on the contact page.');
  };



  return (
    <div className="page-frame cart-page">

      <div className="cart-header">
        <div>
          <div className="section-label brown">Cart</div>
          <h2 className="section-title dark">Selected Items</h2>
          <p className="cart-summary">{totalItems} items selected across {cartItems.length} products.</p>
        </div>
          <button className="btn-outline" onClick={clearCart} disabled={!cartItems.length}>
          Clear
        </button>
      </div>

      {cartItems.length ? (
        <>
          <div className="cart-grid">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.img} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-content">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-meta">{item.category} • {item.hindi}</div>

                    <div className="cart-item-actions">
                      <button onClick={() => updateCartQty(item.id, item.qty - 1)} disabled={item.qty <= 1}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateCartQty(item.id, item.qty + 1)}>+</button>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary-panel">
              <div className="summary-box">
                <div className="summary-row">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="summary-row">
                  <span>Products</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="summary-row total">
                  <span>Total Estimate</span>
                  <span>₹{totalPrice}</span>
                </div>
                <button
                  className="btn-primary"
                  onClick={handleCheckout}
                >
                  Contact
                </button>


              </div>
            </div>
          </div>

        </>
      ) : (


        <div className="empty-state">
          <div className="empty-icon">🛒</div>
          <div className="empty-text">Your inquiry list is empty.</div>

          <button className="btn-primary" onClick={() => navigate('/categories')}>

            Browse Categories
          </button>
        </div>
      )}
    </div>
  );
}
