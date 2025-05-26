import React from "react";
import "./TaskSelectionPage.css"; // <-- import the specific styles
import { Link } from "react-router-dom";

function TaskSelectionPage() {
  return (
    <div className="task-selection-page">
      <div className="features">
        <Link to="/gridshot" className="task-card">
          <img src="/images/bullseye.png" alt="Gridshot" />
          <h3>Gridshot</h3>
          <p>Fast-paced aim test</p>
        </Link>
        <Link to="/sixshot" className="task-card">
          <img src="/images/bullet.png" alt="Sixshot" />
          <h3>Sixshot</h3>
          <p>Precision and control</p>
        </Link>
        <Link to="/reaction-time" className="task-card">
          <img src="/images/agility.png" alt="Reaction Time" />
          <h3>Reaction Time</h3>
          <p>Test your reflexes</p>
        </Link>
      </div>
    </div>
  );
}

export default TaskSelectionPage;
