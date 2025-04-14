
// Hook for fetching player roster

import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';

import API_BASE_URL from '../services/api';
export const usePlayerRoster = () => {
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchRoster = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/player-roster`);
          setPlayers(response.data);
        } catch (err) {
          console.error("Failed to fetch player roster:", err);
          setError("Unable to load roster. Please try again later.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchRoster();
    }, []);
  
    return { players, loading, error };
  };