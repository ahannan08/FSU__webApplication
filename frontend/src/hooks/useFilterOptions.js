// hooks/useFilterOptions.js
import { useEffect, useState } from 'react';
import {
  fetchDistinctPositions,
  fetchDistinctSeasons,
  fetchDistinctOpponents,
  fetchDistinctGameTypes
} from '../services/api';

const useFilterOptions = () => {
  const [positions, setPositions] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [opponents, setOpponents] = useState([]);
  const [gameTypes, setGameTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDropdownOptions = async () => {
      setIsLoading(true);
      try {
        const [pos, sea, opp, types] = await Promise.all([
          fetchDistinctPositions(),
          fetchDistinctSeasons(),
          fetchDistinctOpponents(),
          fetchDistinctGameTypes()
        ]);
        setPositions(pos);
        setSeasons(sea);
        setOpponents(opp);
        setGameTypes(types);
      } catch (error) {
        console.error("Dropdown load error:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDropdownOptions();
  }, []);

  return { positions, seasons, opponents, gameTypes, isLoading };
};

export default useFilterOptions;
