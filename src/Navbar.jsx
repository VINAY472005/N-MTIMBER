import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ cartCount, user, logoutUser }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Show logo after scrolling 100px down on contact page
      const isContactPage = location.pathname === '/contact';
      if (isContactPage) {
        setIsScrolled(window.scrollY > 100);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const links = [
    ['/', 'Home'],
    ['/categories', 'Categories'],
    ['/catalog', 'Catalog'],
    ['/contact', 'Contact'],
    ['/quote', `Quote${cartCount ? ` (${cartCount})` : ''}`],
  ];

  return (
    <nav className="navbar">
      <div className={`nav-logo ${isScrolled ? 'visible' : 'hidden'}`} onClick={() => navigate('/')}>N&MTIMBER</div>

      <ul className="nav-links">
        {links.map(([path, label]) => (
          <li key={path}>
            <a onClick={() => navigate(path)}>{label}</a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {user ? (
          <div className="nav-user">
            <span className="nav-user-label">Hi, {user.name || user.email}</span>
            <button
              className="nav-logout"
              onClick={() => {
                logoutUser();
                navigate('/');
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="nav-cta" onClick={() => navigate('/auth')}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
