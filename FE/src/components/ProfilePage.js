import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: '',  // Ensure user.id exists
    name: '',
    email: '',
    password: '', // Do not expose this directly for security
  });

  const [error, setError] = useState('');
  
  useEffect(() => {
    fetch('http://localhost:8080/api/users/me', {
      method: 'GET',
      credentials: 'include', // Important for sending cookies/session
    })
      .then(res => {
        if (!res.ok) {
          // Handle session expiration or unauthenticated user
          throw new Error('Failed to fetch user. Please login again.');
        }
        return res.json();
      })
      .then(data => {
        setUser({
          id: data.id, // Ensure user.id is correctly set
          name: data.name || '',
          email: data.email || '',
          password: '', // Don't expose password
        });
      })
      .catch(err => {
        setError('Failed to load profile. Please login again.');
        console.error(err);
        // Redirect to login if not authenticated
        navigate('/login');
      });
  }, [navigate]); // Navigate dependency ensures a clean redirect

  const handleChange = (e) => {
    setUser(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSaveChanges = async () => {
    if (!user.id) {
      setError('User ID is missing.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          // For security reasons, avoid sending password unless necessary
        }),
        credentials: 'include', // Send cookies/session
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        alert('Profile updated successfully');
      } else {
        const err = await response.text();
        setError(err || 'Failed to update profile');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while saving changes');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src="/images/logo.png" alt="Logo" className="top-left-logo" />
        <h1>ES PRO</h1>
      </div>

      <div className="profile-content">
        <div className="profile-fields">
          <h2>PROFILE</h2>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Your gaming alias"
              value={user.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="your@email.com"
              value={user.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="••••••••"
              value={user.password}
              onChange={handleChange}
            />
          </div>

          <button className="save-btn" onClick={handleSaveChanges}>SAVE CHANGES</button>

          <div className="profile-links">
            <button className="link-btn riot-btn">
              <img src="/images/riot-icon.png" alt="Riot Icon" className="profile-icon" />
              Link Riot Profile
            </button>
            <button className="link-btn steam-btn">
              <img src="/images/steam-icon.png" alt="Steam Icon" className="profile-icon" />
              Link Steam Profile
            </button>
          </div>
        </div>

        <div className="profile-avatar">
          <img
            src="https://via.placeholder.com/250/88365e/ffffff?text=PROFILE"
            alt="Profile"
            className="avatar-image"
          />
          <button className="change-avatar-btn">Change Avatar</button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
