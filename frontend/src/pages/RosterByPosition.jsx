import React, { useEffect, useState } from "react";
import axios from "axios";
import PlayerCard from "../components/PlayerCard/PlayerCard";
import "./RosterByPosition.css";

const RosterByPosition = () => {
  const [positionData, setPositionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRosterByPosition = async () => {
      try {
        // Fetch all distinct positions
        const posRes = await axios.get("http://localhost:8000/api/v1/player-stats/distinct/positions");
        const positions = posRes.data;
        console.log("Positions list:", positions);

        const data = {};

        // Loop through each position and fetch players for that position
        await Promise.all(
          positions.map(async (position) => {
            const playerRes = await axios.get(`http://localhost:8000/api/v1/player-stats?position=${position}&page=1&page_size=100`);
            console.log(`Players for ${position}:`, playerRes.data);

            // Fix: Extract results from the response
            data[position] = Array.isArray(playerRes.data.results) ? playerRes.data.results : [];
          })
        );

        // Update state with fetched data
        setPositionData(data);
      } catch (error) {
        console.error("Error fetching roster:", error);
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
        <p>Loading...</p>
      ) : (
        Object.entries(positionData).map(([position, players]) => (
          <div key={position} className="position-section">
            <h2>{position}</h2>
            <div className="cards-row">
              {players.length > 0 ? (
                players.map((player, idx) => (
                  <PlayerCard key={idx} playerName={player.playerName} position={player.position} />
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
