import React, { useEffect, useState } from "react";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import Spinner from "../components/spinner/Spinner";
import "./Roster.css";
import axios from "axios";

const Roster = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoster = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/player-roster");
        setPlayers(response.data);
      } catch (error) {
        console.error("Failed to fetch player roster:", error);
        setError("Unable to load roster. Please try again later.");
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
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
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
