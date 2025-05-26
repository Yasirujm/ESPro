import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUpClick = () => {
    navigate('/create-account');
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Send the session cookie
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Login successful:', result);

        // Redirect to carousel/dashboard page
        navigate('/dashboard');
      } else {
        const err = await response.text();
        setError(err || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong!');
    }
  };

  return (
    <div className="login-container">
      <div className="espro-logo-container">
        <img src="/images/logo.png" alt="ESPRO Logo" className="espro-logo" />
      </div>

      <div className="login-content">
        <div className="character-column">
          <img src="/images/login_character.png" alt="Login Character" className="login-character" />
        </div>

        <div className="form-column">
          <div className="login-header">
            <h2>LOGIN</h2>
          </div>

          <div className="login-form">
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button className="login-btn" onClick={handleLogin}>LOGIN</button>

            <div className="signup-link">
              Don't have an account?{' '}
              <span className="signup-text" onClick={handleSignUpClick} style={{ cursor: 'pointer' }}>
                Sign Up
              </span>
            </div>

            <div className="social-divider">
              <span className="divider-line"></span>
              <span className="divider-text">OR</span>
              <span className="divider-line"></span>
            </div>

            <div className="social-buttons">
              <button className="social-btn facebook-btn">
                <img src="/images/facebook.png" alt="Facebook" className="social-icon" />
                Continue with Facebook
              </button>
              <button className="social-btn google-btn">
                <img src="/images/google.png" alt="Google" className="social-icon" />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
