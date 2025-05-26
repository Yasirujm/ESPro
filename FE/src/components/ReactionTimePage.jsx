import React, { useState, useRef } from "react";
import "./ReactionTimePage.css";

function ReactionTimePage() {
  const [state, setState] = useState("waiting"); // waiting | ready | now
  const [message, setMessage] = useState("Click to start the test");
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const timeoutRef = useRef(null);

  const handleClick = () => {
    if (state === "waiting") {
      setMessage("Wait for green...");
      setState("ready");
      timeoutRef.current = setTimeout(() => {
        setState("now");
        setMessage("Click!");
        setStartTime(Date.now());
      }, Math.floor(Math.random() * 3000) + 2000); // 2-5 seconds
    } else if (state === "ready") {
      clearTimeout(timeoutRef.current);
      setState("waiting");
      setMessage("Too soon! Click to try again.");
    } else if (state === "now") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(time);
      setMessage(`Your reaction time is ${time} ms. Click to try again.`);
      setState("waiting");

      // ✅ Send to backend
      fetch("http://localhost:8080/api/reaction-time/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: new URLSearchParams({ reactionTime: time }),
      })
        .then((res) => {
          if (!res.ok) {
            return res.text().then((text) => {
              throw new Error(text);
            });
          }
          console.log("Reaction time submitted successfully.");
        })
        .catch((err) => {
          console.error("Error submitting reaction time:", err.message);
        });
    }
  };

  return (
    <div className={`reaction-page ${state}`} onClick={handleClick}>
      <div className="reaction-box">
        <h1>{message}</h1>
        {reactionTime !== null && <p className="result">Last result: {reactionTime} ms</p>}
      </div>
    </div>
  );
}

export default ReactionTimePage;
