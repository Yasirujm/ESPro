import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Highlights.css";

function Highlights() {
  const [liveVideos, setLiveVideos] = useState([]);
  const [highlightVideos, setHighlightVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("valorant highlights");
  const apiKey = ""; //add youtube API here.

  useEffect(() => {
    // Fetch live videos
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          eventType: "live",
          type: "video",
          maxResults: 2,
          q: "valorant",
          key: apiKey,
        },
      })
      .then((res) => {
        setLiveVideos(res.data.items);
      })
      .catch((err) => console.error("Error fetching live videos:", err));

    // Fetch initial highlight videos
    fetchHighlights(searchTerm);
  }, [apiKey, searchTerm]);

  const fetchHighlights = (term) => {
    axios
      .get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          part: "snippet",
          q: term,
          type: "video",
          maxResults: 6,
          key: apiKey,
        },
      })
      .then((res) => {
        setHighlightVideos(res.data.items);
      })
      .catch((err) => console.error("Error fetching highlight videos:", err));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchHighlights(searchTerm);
  };

  const renderVideoCard = (video, isLive = false) => (
    <div className="video-card" key={video.id.videoId}>
      <a
        href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="thumbnail-container">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
          />
          {isLive && <span className="live-badge">LIVE</span>}
        </div>
        <div className="video-info">
          <p className="video-title">{video.snippet.title}</p>
          <p className="video-channel">{video.snippet.channelTitle}</p>
        </div>
      </a>
    </div>
  );

  return (
    <div className="highlights-container">
      <h2>WATCH LIVE</h2>
      <div className="video-grid">
        {liveVideos.length > 0
          ? liveVideos.map((video) => renderVideoCard(video, true))
          : <p>Loading live videos...</p>}
      </div>

      <h2>HIGHLIGHTS</h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search game highlights..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <div className="video-grid">
        {highlightVideos.length > 0
          ? highlightVideos.map((video) => renderVideoCard(video, false))
          : <p>Loading highlights...</p>}
      </div>
    </div>
  );
}

export default Highlights;
