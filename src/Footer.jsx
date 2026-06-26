import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div>
          <div className="footer-brand">N&MTIMBER</div>
          <div className="footer-desc">
            N&MTIMBER is a premium wood &amp; timber B2B marketplace. Connecting mills
            directly to contractors, builders, and manufacturers.
            Trusted by 500+ businesses across 28 states.
          </div>
        </div>

        <div>
          <div className="footer-col-title">Products</div>
          <ul className="footer-links">
            {['Planks / Fante','Gutke / Logs','Plywood Panels',
              'Furniture Parts','Flooring Wood','Raw Timber','Wood Hardware']
              .map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>

          <div className="footer-contact-under-products">
            <div className="footer-col-title footer-contact-title">Contact us</div>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <span className="footer-contact-ico">📞</span>
                <span>+91 96103 77582</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-ico">📧</span>
                <span>vinay.official0000@gmail.com</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-ico">📍</span>
                <span>N&M Timber Office, Badiyal Road, Bandikui, Dausa, Rajasthan</span>
              </div>
              <div className="footer-contact-row">
                <span className="footer-contact-ico">⏰</span>
                <span>Mon–Sat, 9 AM – 7 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="footer-col-title">Company</div>
          <ul className="footer-links">
            {['About Us','Our Mill','Quality Standards','Delivery Policy',
              'Bulk Orders','Partner With Us','Contact']
              .map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">© 2025 N&MTIMBER. All rights reserved.</div>
        <div className="india-badge">🇮🇳 Proudly Made in India</div>
      </div>
    </footer>
  );
}
