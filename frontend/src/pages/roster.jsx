// pages/roster.jsx
import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard/PlayerCard"; // Adjust path if needed
import axios from "axios";
import "./Roster.css"; // CSS file import

const Roster = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/player-roster");
        setPlayers(response.data);
      } catch (error) {
        console.error("Failed to fetch player roster:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoster();
  }, []);

  return (
    <div className="roster-container">
      <h1 className="roster-title">Team Roster</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <div className="roster-grid">
          {players.map((player, index) => (
            <PlayerCard
              key={index}
              playerName={player.playerName}
              position={player.position}
              starts={player.starts}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Roster;
