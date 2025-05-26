import React, { useEffect, useState } from "react";

export default function GameplayAnalysis() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      background: "#0d0d0d",
      minHeight: "100vh",
      padding: "40px 20px",
      color: "#fff",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    title: {
      fontSize: 28,
      marginBottom: 30,
      fontWeight: "bold",
      color: "#ff3c3c"
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#ff3c3c",
      margin: "20px 0 10px"
    },
    table: {
      borderCollapse: "collapse",
      width: "90%",
      maxWidth: 800,
      backgroundColor: "#1a1a1a",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 0 12px rgba(255, 60, 60, 0.2)",
      marginBottom: 30
    },
    th: {
      backgroundColor: "#262626",
      color: "#fff",
      padding: "12px 16px",
      fontWeight: "bold",
      textAlign: "left",
      borderBottom: "1px solid #333"
    },
    td: {
      padding: "12px 16px",
      borderBottom: "1px solid #333",
      color: "#ddd"
    },
    button: {
      backgroundColor: "#ff3c3c",
      color: "#fff",
      border: "none",
      padding: "12px 24px",
      borderRadius: 8,
      fontSize: 16,
      cursor: "pointer",
      transition: "0.2s"
    }
  };

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('http://localhost:8080/api/stats/analyze', {
          credentials: 'include'
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) return <div style={styles.container}>Loading stats...</div>;
  if (error) return <div style={styles.container}>Error: {error}</div>;
  if (!stats) return <div style={styles.container}>No stats available.</div>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Player Stats Overview</h1>

      {/* Reaction Time */}
      <h2 style={styles.sectionTitle}>Reaction Time (ms)</h2>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Metric</th><th style={styles.th}>Best</th><th style={styles.th}>Worst</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>Reaction Time</td>
            <td style={styles.td}>{stats.bestReaction?.reactionTime ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstReaction?.reactionTime ?? 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Gridshot */}
      <h2 style={styles.sectionTitle}>Gridshot</h2>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Metric</th><th style={styles.th}>Best</th><th style={styles.th}>Worst</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>Accuracy</td>
            <td style={styles.td}>{stats.bestGridAcc?.accuracy ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstGridAcc?.accuracy ?? 'N/A'}</td>
          </tr>
          <tr>
            <td style={styles.td}>Time to Kill (ms)</td>
            <td style={styles.td}>{stats.bestGridTime?.ttk ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstGridTime?.ttk ?? 'N/A'}</td>
          </tr>
          <tr>
            <td style={styles.td}>Score</td>
            <td style={styles.td}>{stats.bestGridScore?.score ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstGridScore?.score ?? 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      {/* Sixshot */}
      <h2 style={styles.sectionTitle}>Sixshot</h2>
      <table style={styles.table}>
        <thead>
          <tr><th style={styles.th}>Metric</th><th style={styles.th}>Best</th><th style={styles.th}>Worst</th></tr>
        </thead>
        <tbody>
          <tr>
            <td style={styles.td}>Accuracy</td>
            <td style={styles.td}>{stats.bestSixAcc?.accuracy ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstSixAcc?.accuracy ?? 'N/A'}</td>
          </tr>
          <tr>
            <td style={styles.td}>Time to Kill (ms)</td>
            <td style={styles.td}>{stats.bestSixTime?.ttk ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstSixTime?.ttk ?? 'N/A'}</td>
          </tr>
          <tr>
            <td style={styles.td}>Score</td>
            <td style={styles.td}>{stats.bestSixScore?.score ?? 'N/A'}</td>
            <td style={styles.td}>{stats.worstSixScore?.score ?? 'N/A'}</td>
          </tr>
        </tbody>
      </table>

      <button style={styles.button}>View Detailed Analysis</button>
    </div>
  );
}
