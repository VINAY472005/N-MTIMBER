import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="page-frame about-page">
      <section className="about-top">
        <div className="section-label gold">About Us</div>
        <h2 className="section-title dark">
          N&amp;MTIMBER <em>Business</em> &amp; Trust
        </h2>
        <p className="about-intro">
          We are a premium B2B wood &amp; timber marketplace connecting mills to contractors,
          builders, and manufacturers. Our focus is to make procurement simple, fast, and
          reliable—so your project never stalls.
        </p>
      </section>

      <section className="about-grid">
        <div className="about-card">
          <div className="about-card-title">Who we help</div>
          <ul className="about-list">
            <li>Contractors &amp; civil contractors</li>
            <li>Builders &amp; developers</li>
            <li>Manufacturers &amp; furniture units</li>
            <li>Retail wholesalers needing bulk supply</li>
          </ul>
        </div>

        <div className="about-card">
          <div className="about-card-title">What we offer</div>
          <ul className="about-list">
            <li>Planks / Fante (फंटे)</li>
            <li>Gutke / Logs (गुटके)</li>
            <li>Plywood panels</li>
            <li>Furniture parts</li>
            <li>Flooring wood, raw timber &amp; hardware</li>
          </ul>
        </div>
      </section>

      {/* Opt-in section removed per request */}
      <section className="optin-section">
        <div className="optin-label">Get in touch</div>
        <h3 className="optin-title">We’ll help you with timber supply &amp; bulk orders</h3>
        <p className="optin-text">
          For business inquiries, use our Contact page and share your requirements.
        </p>

        <button
          className="submit-btn optin-submit"
          onClick={() => navigate('/contact')}
        >
          Go to Contact →
        </button>
      </section>
    </div>
  );
}

