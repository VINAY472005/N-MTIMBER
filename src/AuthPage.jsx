import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';

export default function AuthPage({ showToast, user, loginUser, registerUser, logoutUser }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (mode === 'login') {
      const result = loginUser(form.email.trim(), form.password);
      if (result.success) {
        showToast(result.message);
        navigate('/');
      } else {
        setError(result.message);
      }
      return;
    }

    if (!form.name.trim()) {
      setError('Name is required.');
      return;
    }

    const result = registerUser(form.name.trim(), form.email.trim(), form.password);
    if (result.success) {
      showToast(result.message);
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  if (user) {
    return (
      <div className="page-frame auth-page">
        <div className="auth-card">
          <h2>Welcome back, {user.name || user.email}</h2>
          <p>You are already signed in.</p>
          <button
            className="btn-primary"
            onClick={() => {
              logoutUser();
              showToast('Logged out successfully.');
              navigate('/');
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-frame auth-page">
      <div className="auth-card">
        <div className="auth-switch">
          <button className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Register
          </button>
        </div>

        <h2>{mode === 'login' ? 'Login to Your Account' : 'Create a New Account'}</h2>
        {error && <div className="form-status error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'register' && (
            <div className="form-group">
              <label>Name</label>
              <input value={form.name} onChange={handleChange('name')} placeholder="Full name" />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={handleChange('email')}
              placeholder="Email address"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={handleChange('password')}
              placeholder="Password"
            />
          </div>

          <button type="submit" className="btn-primary">
            {mode === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}
