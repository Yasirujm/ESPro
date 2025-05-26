import React from "react";
import "./Home.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import FeatureCards from "./components/FeatureCards";
import TaskSelectionPage from "./components/TaskSelectionPage";
import Sixshot from "./components/Sixshot";
import Gridshot from "./components/Gridshot";
import Highlights from "./components/Highlights";
import Home from "./Home";
import LoginPage from "./components/LoginPage";
import CreateAccount from "./components/CreateAccount";
import ProfilePage from "./components/ProfilePage";
import ReactionTimePage from "./components/ReactionTimePage";
import LeaderboardPage from "./components/LeaderboardPage";

// Import your new GameplayAnalysis component here
import GameplayAnalysis from "./components/GameplayAnalysis";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  const hideNavbarPaths = ["/", "/sixshot", "/gridshot", "/login", "/create-account"];
  const shouldShowNavbar = !hideNavbarPaths.includes(location.pathname.toLowerCase());

  return (
    <div className="app">
      {shouldShowNavbar && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              <>
                <Carousel />
                <FeatureCards />
              </>
            }
          />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/training" element={<TaskSelectionPage />} />
          <Route path="/sixshot" element={<Sixshot />} />
          <Route path="/gridshot" element={<Gridshot />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reaction-time" element={<ReactionTimePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          {/* Add the route for Gameplay Analysis here */}
          <Route path="/gameplay-analysis" element={<GameplayAnalysis />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
