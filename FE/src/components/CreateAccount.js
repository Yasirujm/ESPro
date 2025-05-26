import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignup = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Registered:', result);
        navigate('/login');
      } else {
        const err = await response.text();
        setError(err);
      }
    } catch (err) {
      setError('Something went wrong!');
      console.error(err);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="create-account-container">
      <div className="account-content">
        <div className="account-header">
          <h1>ESPRO</h1>
          <h2>CREATE ACCOUNT</h2>
        </div>

        <div className="account-form">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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

          <div className="account-buttons">
            <button className="signup-btn" onClick={handleSignup}>SIGN UP</button>
            <button className="login-btn" onClick={handleLoginClick}>LOG IN</button>
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

      <div className="console-image">
        <img src="/images/console.png" alt="Gaming Console" className="console-img" />
      </div>
    </div>
  );
}

export default CreateAccount;
