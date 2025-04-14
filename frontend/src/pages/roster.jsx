import React from "react";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import Spinner from "../components/spinner/Spinner";
import { usePlayerRoster } from "../hooks/usePlayerRoster";
import "./Roster.css";

const Roster = () => {
  const { players, loading, error } = usePlayerRoster();

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