import React from "react";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import Spinner from "../components/spinner/Spinner";
import { useRosterByPosition } from "../hooks/useRosterByPosition";
import "./RosterByPosition.css";

const RosterByPosition = () => {
  const { positionData, loading, error } = useRosterByPosition();

  return (
    <div className="roster-container">
      <h1>Roster by Position</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        Object.entries(positionData).map(([position, players]) => (
          <div key={position} className="position-section">
            <h2>{position}</h2>
            <div className="cards-row">
              {players.length > 0 ? (
                players.map((player, idx) => (
                  <PlayerCard
                    key={idx}
                    playerName={player.playerName}
                    position={player.position}
                  />
                ))
              ) : (
                <p className="no-players">No players available</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default RosterByPosition;