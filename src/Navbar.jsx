import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const WHATSAPP_NUMBER = '919610377582';
const WHATSAPP_MSG    = 'Hello! I am interested in N&M Timber products. Please share more details.';

export default function Navbar({ cartCount }) {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isContactPage = location.pathname === '/contact';
      setIsScrolled(isContactPage ? window.scrollY > 100 : true);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const links = [
    ['/',           'Home'],
    ['/categories', 'Categories'],
    ['/catalog',    'Catalog'],
    ['/contact',    'Contact'],
    ['/quote',      `Quote${cartCount ? ` (${cartCount})` : ''}`],
  ];

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <>
      <nav className="navbar">
        {/* Logo */}
        <div
          className={`nav-logo ${isScrolled ? 'visible' : 'hidden'}`}
          onClick={() => navigate('/')}
        >
          N&MTIMBER
        </div>

        {/* Desktop links */}
        <ul className="nav-links">
          {links.map(([path, label]) => (
            <li key={path}>
              <a
                className={location.pathname === path ? 'active' : ''}
                onClick={() => navigate(path)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop WhatsApp button */}
        <div className="nav-actions">
          <a className="nav-whatsapp-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            <span>💬</span> WhatsApp
          </a>
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="mobile-drawer">
          <ul className="mobile-links">
            {links.map(([path, label]) => (
              <li key={path}>
                <a
                  className={location.pathname === path ? 'active' : ''}
                  onClick={() => navigate(path)}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a className="mobile-whatsapp-btn" href={whatsappUrl} target="_blank" rel="noreferrer">
            💬 Chat on WhatsApp
          </a>
        </div>
      )}
    </>
  );
}