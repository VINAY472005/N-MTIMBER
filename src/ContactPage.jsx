import React from 'react';
import { Contact } from './WhyContact.jsx';

export default function ContactPage() {
  return (
    <div className="page-frame contact-page">
      <section className="contact-page-top">
        <div className="section-label gold">Contact</div>
        <h2 className="section-title dark">
          Contact <em>Us</em>
        </h2>
        <p className="contact-page-intro">
          Reach out to our team with your timber requirements. Submit your quote request below, and our team will get back to you shortly.
        </p>
      </section>

      {/* Quote request form (submit inquiry) */}
      <Contact showFormFirst />
    </div>
  );
}

