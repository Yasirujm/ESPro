import React, { useState } from "react";
import "../Home.css";
import profilePic from "../images/profile.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogoClick = () => {
    navigate("/dashboard");
  };

  const handleSignOut = () => {
    // localStorage.clear(); // optional
    navigate("/login");
  };

  const handleEditProfile = () => {
    setShowDropdown(false); // Close dropdown
    navigate("/profile");   // Navigate to profile page
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        ES PRO
      </div>
      <ul className="nav-links">
        <li><Link to="/dashboard">Home</Link></li>
        {/* Changed Gameplay Analysis to a Link */}
        <li><Link to="/gameplay-analysis">Gameplay Analysis</Link></li>
        <li><Link to="/highlights">Streaming & Highlights</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/training">Training</Link></li>
      </ul>
      <div
        className="profile-icon"
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ position: "relative", cursor: "pointer" }}
      >
        <img src={profilePic} alt="Profile" className="profile-img" />
        {showDropdown && (
          <div className="dropdown-menu">
            <button onClick={handleEditProfile} className="dropdown-item">
              <b><center>Edit Profile</center></b>
            </button>
            <button onClick={handleSignOut} className="dropdown-item">
              <b><center>Sign Out</center></b>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
