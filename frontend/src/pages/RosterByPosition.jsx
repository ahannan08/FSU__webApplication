import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import Spinner from "../components/spinner/Spinner";
import "./RosterByPosition.css";

const RosterByPosition = () => {
  const [positionData, setPositionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRosterByPosition = async () => {
      try {
        const posRes = await axios.get("http://localhost:8000/api/v1/player-stats/distinct/positions");
        const positions = posRes.data;

        const data = {};
        await Promise.all(
          positions.map(async (position) => {
            const playerRes = await axios.get(
              `http://localhost:8000/api/v1/player-stats?position=${position}&page=1&page_size=100`
            );
            data[position] = Array.isArray(playerRes.data.results)
              ? playerRes.data.results
              : [];
          })
        );

        setPositionData(data);
      } catch (error) {
        console.error("Error fetching roster by position:", error);
        setError("Unable to load players by position. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRosterByPosition();
  }, []);

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
