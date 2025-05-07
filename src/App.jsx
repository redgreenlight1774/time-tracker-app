import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [beginTime, setBeginTime] = useState(localStorage.getItem("beginTime"));
  const [endTime, setEndTime] = useState(localStorage.getItem("endTime"));

  const handleBegin = () => {
    const now = new Date().toISOString();
    localStorage.setItem("beginTime", now);
    setBeginTime(now);
  };

  const handleEnd = () => {
    const now = new Date().toISOString();
    localStorage.setItem("endTime", now);
    setEndTime(now);
  };

  const formatTime = (iso) => {
    if (!iso) return "--";
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDuration = () => {
    if (!beginTime || !endTime) return "";
    const start = new Date(beginTime);
    const end = new Date(endTime);
    const diff = Math.floor((end - start) / 60000);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}hrs${minutes > 0 ? `, ${minutes}mins` : ""}`;
  };

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <div className="app">
      <header>
        <div className="calendar">
          <div className="month">May 2025</div>
          <div className="days">
            <span>Sun</span><span>Mon</span><span>Tue</span>
            <span className="active">Wed</span>
            <span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
        </div>
        <a href="#" className="signout">Sign out</a>
      </header>

      <div className="user-tag">Candace</div>
      <div className="title">TimeSheet</div>

      <div className="clock-section">
        <div className="label">Clock In</div>
        <div className="time-display">{formatTime(beginTime)}</div>
        <div className="label">Clock Out</div>
        <div className="time-display">{formatTime(endTime)}</div>
      </div>

      <div className="buttons">
        <button className="begin" onClick={handleBegin}>Begin</button>
        <button className="end" onClick={handleEnd}>End</button>
      </div>

      {endTime && (
        <div className="summary">
          <div className="total">
            <span>Total:</span> <strong className="red">{getDuration()}</strong>
          </div>
          <div className="log">
            <span>{today}:</span>
            <span className="red">{getDuration()}</span>
            <span className="black">
              {formatTime(beginTime)} To {formatTime(endTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
