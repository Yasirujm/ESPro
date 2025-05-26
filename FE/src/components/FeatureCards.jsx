import React from "react";
import "../Home.css";
import nightmarketimg from "../images/night-market.jpg";
import Dota2img from "../images/dota2.jpg";

function FeatureCards() {
  return (
    <div className="features">
      <div className="card">
        <h3>ES PREMIUM</h3>
        <p>Personalized Profiles</p>
        <p>Priority Support</p>
        <p className="coming-soon">Coming Soon</p>
      </div>
      <div className="card">
        <h3>Valorant Night Market April 2025</h3>
        <img src={nightmarketimg} alt="Valorant Champions Tour 2025" />
      </div>
      <div className="card">
        <h3>Introducing DOTA 2 to ES PRO</h3>
        <img src={Dota2img} alt="DOTA 2" />
      </div>
    </div>
  );
}

export default FeatureCards;
