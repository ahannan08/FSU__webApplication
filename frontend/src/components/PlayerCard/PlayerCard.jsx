// components/PlayerCard.jsx
import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ playerName, position }) => (
  <div className="player-card">
    <h3 className="player-name">{playerName}</h3>
    <p className="player-position">Position: {position}</p>
  </div>
);

export default PlayerCard;
