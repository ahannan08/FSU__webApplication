// components/Schedule.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Schedule.css";
import calendarData from "../../data/calender_data";

const Schedule = () => {
  const [value, setValue] = useState(new Date());

  const getMatchInfo = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    return calendarData.find((game) => game.date === formattedDate);
  };

  return (
    <div className="schedule-container">
      <h1>Game Schedule</h1>
      <Calendar
        value={value}
        onChange={setValue}
        tileContent={({ date }) => {
          const match = getMatchInfo(date);
          return match ? (
            <div className="match-info">
              <span className="match-teams">{match.teams}</span>
            </div>
          ) : null;
        }}
        tileClassName={({ date }) => {
          const match = getMatchInfo(date);
          return match ? "highlight" : null;
        }}
      />
    </div>
  );
};

export default Schedule;
