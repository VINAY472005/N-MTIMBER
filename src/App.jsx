import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar        from './Navbar.jsx';
import HomePage      from './HomePage.jsx';
import CategoriesPage from './CategoriesPage.jsx';
import CatalogPage   from './CatalogPage.jsx';
import ProductPage   from './ProductPage.jsx';
import CartPage      from './CartPage.jsx';
import ContactPage   from './ContactPage.jsx';
import AuthPage      from './AuthPage.jsx';
import Footer        from './Footer.jsx';
import './App.css';

export default function App() {
  const [toast, setToast] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('timberCurrentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const persistUser = (userData) => {
    setUser(userData);
    localStorage.setItem('timberCurrentUser', JSON.stringify(userData));
  };

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('timberUsers') || '[]');
    const account = users.find((item) => item.email === email && item.password === password);

    if (!account) {
      return { success: false, message: 'Invalid email or password.' };
    }

    persistUser({ name: account.name, email: account.email });
    return { success: true, message: 'Logged in successfully.' };
  };

  const registerUser = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem('timberUsers') || '[]');

    if (!name || !email || !password) {
      return { success: false, message: 'Name, email and password are required.' };
    }

    if (users.some((item) => item.email === email)) {
      return { success: false, message: 'Email already registered. Please login instead.' };
    }

    const newAccount = { name, email, password };
    localStorage.setItem('timberUsers', JSON.stringify([...users, newAccount]));
    persistUser({ name, email });
    return { success: true, message: 'Registration successful. You are now logged in.' };
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('timberCurrentUser');
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const addToCart = (product, qty = 1) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...current, { ...product, qty }];
    });
    showToast(`${product.name} added to quote list.`);
  };

  const updateCartQty = (id, qty) => {
    setCartItems((current) =>
      current
        .map((item) => (item.id === id ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    showToast('Cart cleared.');
  };

  return (
    <div className="app">
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.qty, 0)}
        user={user}
        logoutUser={logoutUser}
      />

      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage showToast={showToast} />} />
          <Route path="/categories" element={<CategoriesPage showToast={showToast} />} />
          <Route path="/catalog/:categoryId?" element={<CatalogPage showToast={showToast} />} />
          <Route
            path="/product/:productId"
            element={<ProductPage showToast={showToast} addToCart={addToCart} />}
          />
          <Route
            path="/quote"
            element={
              <CartPage
                cartItems={cartItems}
                updateCartQty={updateCartQty}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
                showToast={showToast}
              />
            }
          />
          <Route
            path="/contact"
            element={
              <ContactPage />
            }
          />
          <Route
            path="/auth"
            element={
              <AuthPage
                showToast={showToast}
                user={user}
                loginUser={loginUser}
                registerUser={registerUser}
                logoutUser={logoutUser}
              />
            }
          />
        </Routes>
      </main>

      <Footer />

      {toast && (
        <div className="toast">
          {toast}
        </div>
      )}
    </div>
  );
}
