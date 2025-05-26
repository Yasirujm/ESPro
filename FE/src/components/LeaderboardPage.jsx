import React, { useState, useEffect } from "react";
import "./Leaderboard.css";

function LeaderboardPage() {
  const [filter, setFilter] = useState("gridshot");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/leaderboard/${filter}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch leaderboard data");
        }
        return res.json();
      })
      .then((data) => {
        setLeaderboardData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leaderboard data:", error);
        setLeaderboardData([]);
        setLoading(false);
      });
  }, [filter]);

  const handleFilterChange = (gameType) => {
    setFilter(gameType);
  };

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard</h1>
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange("gridshot")}>Gridshot</button>
        <button onClick={() => handleFilterChange("sixshot")}>Sixshot</button>
        <button onClick={() => handleFilterChange("reactionTime")}>Reaction Time</button>
      </div>

      <div className="leaderboard">
        <h2>{filter.charAt(0).toUpperCase() + filter.slice(1)} Leaderboard</h2>

        {loading ? (
          <p>Loading...</p>
        ) : leaderboardData.length === 0 ? (
          <p>No data available.</p>
        ) : (
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>{filter === "reactionTime" ? "Reaction Time (ms)" : "Score"}</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((entry) => (
                <tr key={entry.rank}>
                  <td>{entry.rank}</td>
                  <td>{entry.name}</td>
                  <td>{entry.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default LeaderboardPage;
