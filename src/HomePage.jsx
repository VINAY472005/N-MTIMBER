import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from './Hero.jsx';
import { WhyUs } from './WhyContact.jsx';
import { categories } from './data.js';
import './HomePage.css';

export default function HomePage({ showToast }) {
  const navigate = useNavigate();
  const previewCategories = categories.filter((c) => c.id !== 'all').slice(0, 4);

  return (
    <>
      <Hero onNav={(id) => navigate(`/${id}`)} />

      <section className="home-quickstart">
        <div className="home-quickstart-content">
          <div className="home-quick-copy">
            <div className="section-label gold">Browse by Category</div>
            <h2 className="home-quick-title">Discover wood products by category with polished previews.</h2>
            <p className="home-quick-text">
              Explore our timber range, compare products at a glance, and jump straight to the category you need.
            </p>
            <button className="btn-primary" onClick={() => navigate('/categories')}>
              Browse Categories
            </button>
          </div>

          <div className="home-cat-preview">
            {previewCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className="home-cat-card"
                onClick={() => navigate(`/catalog/${category.id}`)}
              >
                <div className="home-cat-image">
                  {category.img ? <img src={category.img} alt={category.name} /> : <span>{category.icon}</span>}
                </div>
                <div className="home-cat-meta">
                  <div className="home-cat-name">{category.name}</div>
                  <div className="home-cat-hindi">{category.hindi}</div>
                  <div className="home-cat-count">{category.count}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <WhyUs />

      <section className="home-about-inline">
        <div className="home-about-inline-inner">
          <div className="section-label gold">About Us</div>
          <h2 className="home-about-inline-title">
            N&amp;MTIMBER <em>Business</em> &amp; Trust
          </h2>

          <p className="home-about-inline-text">
            We are a premium B2B wood &amp; timber marketplace connecting mills to contractors,
            builders, and manufacturers. Our focus is to make procurement simple, fast, and
            reliable—so your project never stalls.
          </p>

          <div className="home-about-inline-grid">
            <div className="home-about-inline-card">
              <div className="home-about-inline-card-title">Who we help</div>
              <ul className="home-about-inline-list">
                <li>Contractors &amp; civil contractors</li>
                <li>Builders &amp; developers</li>
                <li>Manufacturers &amp; furniture units</li>
                <li>Retail wholesalers needing bulk supply</li>
              </ul>
            </div>

            <div className="home-about-inline-card">
              <div className="home-about-inline-card-title">What we offer</div>
              <ul className="home-about-inline-list">
                <li>Planks / Fante (फंटे)</li>
                <li>Gutke / Logs (गुटके)</li>
                <li>Plywood panels</li>
                <li>Furniture parts</li>
                <li>Flooring wood, raw timber &amp; hardware</li>
              </ul>
            </div>
          </div>

          <button className="btn-outline" onClick={() => navigate('/contact')}>
            Go to Contact →
          </button>
        </div>
      </section>
    </>
  );
}

