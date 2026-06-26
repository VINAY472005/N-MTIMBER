import React, { useState } from 'react';
import { whyCards, states, productOptions } from './data.js';
import './WhyContact.css';

const CONTACT_EMAIL = 'vinay.official0000@gmail.com';

/* ─── WHY US ─────────────────────────────────────────────── */
export function WhyUs() {
  return (
    <section id="why" className="why-section">
      <div className="section-label brown">Why Choose Us</div>
      <h2 className="section-title dark">
        Built for <em>Business</em>
      </h2>

      <div className="why-grid">
        {whyCards.map((w, i) => (
          <div key={i} className="why-card">
            <div className="why-icon">{w.icon}</div>
            <div className="why-title">{w.title}</div>
            <div className="why-desc">{w.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────── */
export function Contact({ showToast, cartItems = [], showFormFirst = false, showFormHeading = true }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    state: '',
    location: '',
    geoLat: '',
    geoLng: '',
    product: [],
    qty: '',
    msg: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [useCartProducts, setUseCartProducts] = useState(false);

  const cartProductNames = cartItems.map((item) => item.name);
  const cartTotalQty = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0);

  const setField = (key) => (e) => {
    const value =
      key === 'product'
        ? Array.from(e.target.selectedOptions).map((option) => option.value)
        : e.target.value;

    setForm({ ...form, [key]: value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Location detection is not supported by this browser.');
      return;
    }

    setIsDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `/api/geocode?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}`
          );
          const data = await response.json();
          if (!response.ok)
            throw new Error(data.error || 'Unable to reverse geocode location.');

          const locationText =
            data.display_name || `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`;
          setForm({
            ...form,
            location: locationText,
            geoLat: latitude.toString(),
            geoLng: longitude.toString(),
          });
          showToast('Location detected successfully.');
        } catch (error) {
          console.error('Location reverse geocode failed', error);
          setForm({
            ...form,
            location: `Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`,
            geoLat: latitude.toString(),
            geoLng: longitude.toString(),
          });
          showToast(
            'Location found, but address lookup failed. Please check the location field.'
          );
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        showToast(`Location detection failed: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  const toggleUseCartProducts = () => {
    const nextUseCart = !useCartProducts;
    setUseCartProducts(nextUseCart);

    if (nextUseCart) {
      setForm({
        ...form,
        product: cartProductNames,
        qty: cartTotalQty
          ? `${cartTotalQty} piece${cartTotalQty > 1 ? 's' : ''}`
          : form.qty,
      });
    } else {
      setForm({ ...form, product: [] });
    }
  };

  const selectedProducts = Array.isArray(form.product) ? form.product : [form.product];
  const productValue = selectedProducts.filter(Boolean).join(', ') || 'N/A';

  const buildMailtoUrl = () => {
    const body = `Name: ${form.name}\nEmail: ${form.email || 'N/A'}\nPhone: ${form.phone}\nState/City: ${form.state || 'N/A'}\nDelivery Location: ${form.location || 'N/A'}\nProduct: ${productValue}\nQuantity: ${form.qty || 'N/A'}\nMessage: ${form.msg || 'N/A'}`;

    return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      'New Quote Request from N&MTIMBER Website'
    )}&body=${encodeURIComponent(body)}`;
  };

  const fallbackToMailClient = () => {
    const mailto = buildMailtoUrl();
    window.location.href = mailto;
    showToast('⚠ Backend unavailable. Opening email client so inquiry can still be sent.');
    setFormStatus({
      type: 'info',
      text: 'Backend unavailable. Please send the inquiry from your email client.',
    });
  };

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.email) {
      showToast('⚠ Please fill your Name, Email & Phone number');
      setFormStatus({ type: 'error', text: 'Name, Email and Phone are required.' });
      return;
    }

    setIsSubmitting(true);
    setFormStatus(null);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          product: selectedProducts,
          location: form.location,
          geoLat: form.geoLat,
          geoLng: form.geoLng,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.error || '⚠ Unable to send inquiry. Please try again.';
        showToast(errorMessage);
        setFormStatus({ type: 'error', text: errorMessage });
        setIsSubmitting(false);
        return;
      }

      const successMessage = '✓ Inquiry sent successfully. We will contact you shortly.';
      showToast(successMessage);
      setFormStatus({ type: 'success', text: successMessage });
      setForm({
        name: '',
        email: '',
        phone: '',
        state: '',
        location: '',
        geoLat: '',
        geoLng: '',
        product: [],
        qty: '',
        msg: '',
      });
      setUseCartProducts(false);
      setTimeout(() => setFormStatus(null), 6000);
    } catch (error) {
      console.error('Inquiry submit failed', error);
      fallbackToMailClient();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid contact-grid-form-only">
        {/* Form */}
        <div className="contact-form contact-form-card">

          <div className="form-grid2">
            <div className="form-group">
              <label className="form-label">Your Name *</label>
              <input className="form-input" placeholder="Full name" value={form.name} onChange={setField('name')} />
            </div>
            <div className="form-group">
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" placeholder="Email address" value={form.email} onChange={setField('email')} />
            </div>
          </div>

          <div className="form-grid2">
            <div className="form-group">
              <label className="form-label">Phone *</label>
              <input className="form-input" placeholder="Mobile number" value={form.phone} onChange={setField('phone')} />
            </div>
            <div className="form-group">
              <label className="form-label">State / City</label>
              <select className="form-select" value={form.state} onChange={setField('state')}>
                <option value="">Select your state</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Delivery Location</label>
            <div className="location-row">
              <input
                className="form-input"
                placeholder="City, district or address"
                value={form.location}
                onChange={setField('location')}
              />
              <button
                type="button"
                className="btn-outline"
                onClick={detectLocation}
                disabled={isDetectingLocation}
              >
                {isDetectingLocation ? 'Detecting…' : 'Detect Location'}
              </button>
            </div>
            <div className="form-hint">Use browser location to auto-fill the delivery address.</div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Needed</label>
            {cartItems.length > 0 && (
              <label className="form-checkbox">
                <input type="checkbox" checked={useCartProducts} onChange={toggleUseCartProducts} />
                Use products from quote list ({cartItems.length} item{cartItems.length > 1 ? 's' : ''})
              </label>
            )}

            {useCartProducts ? (
              <div className="form-readonly">
                {cartProductNames.length ? cartProductNames.join(', ') : 'No cart products selected.'}
              </div>
            ) : (
              <>
                <select multiple size={5} className="form-select" value={form.product} onChange={setField('product')}>
                  {productOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <div className="form-hint">Hold Ctrl / Cmd to select multiple product options.</div>
              </>
            )}
          </div>

          <div className="form-grid2">
            <div className="form-group">
              <label className="form-label">Quantity (approx)</label>
              <input className="form-input" placeholder="e.g. 500 pieces" value={form.qty} onChange={setField('qty')} />
            </div>
            <div className="form-group" />
          </div>

          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              className="form-textarea"
              placeholder="Describe your requirement — size, grade, delivery timeline..."
              value={form.msg}
              onChange={setField('msg')}
            />
          </div>

          <button className="submit-btn" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit Quote Request →'}
          </button>

          {formStatus && <div className={`form-status ${formStatus.type}`}>{formStatus.text}</div>}

          <div className="form-note">
            Your quote request is sent to our team and will be delivered to your inbox.
          </div>
        </div>
      </div>
    </section>
  );
}

