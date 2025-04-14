
import API_BASE_URL from '../services/api';

import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';


export const useRosterByPosition = () => {
  const [positionData, setPositionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRosterByPosition = async () => {
      try {
        const posRes = await axios.get(`${API_BASE_URL}/player-stats/distinct/positions`);
        const positions = posRes.data;

        const data = {};
        await Promise.all(
          positions.map(async (position) => {
            const playerRes = await axios.get(
              `${API_BASE_URL}/player-stats?position=${position}&page=1&page_size=100`
            );
            data[position] = Array.isArray(playerRes.data.results) 
              ? playerRes.data.results 
              : [];
          })
        );

        setPositionData(data);
      } catch (err) {
        console.error("Error fetching roster by position:", err);
        setError("Unable to load players by position. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRosterByPosition();
  }, []);

  return { positionData, loading, error };
};