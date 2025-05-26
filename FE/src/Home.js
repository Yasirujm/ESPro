import React from 'react';
import { useNavigate } from 'react-router-dom';
import './components/App.css'; // Make sure this path is correct

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  const goToSignUp = () => {
    navigate('/create-account');
  };

  return (
    <div className="landing-container">
      {/* Logo positioned absolutely at top-left */}
      <img src="/images/logo.png" alt="ES PRO Logo" className="logo-image" />

      <div className="content-column">
        <div className="header">
          <h1 className="es-pro-title">ES PRO</h1>
          <h2 className="e-trainer-title">E-TRAINER</h2>
        </div>
        <p className="description">
          Level up your game with personalized coaching, expert tips, and performance tracking
          tailored for eSports athletes. Whether you're climbing the ranks or going pro,
          eTrainer helps you train smarter, play better, and win more.
        </p>
        <div className="buttons">
          <button className="signup-btn" onClick={goToSignUp}>SIGN UP</button>
          <button className="login-btn" onClick={goToLogin}>LOGIN</button>
        </div>
      </div>

      <div className="image-column">
        <img src="/images/character.png" alt="Game Character" className="character-image" />
      </div>
    </div>
  );
}

export default Home;
