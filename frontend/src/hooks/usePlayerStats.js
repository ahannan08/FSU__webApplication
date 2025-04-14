import { useState } from 'react';
import { fetchPlayerStats } from '../services/api';

const usePlayerStats = (filters, currentPage, itemsPerPage, sortConfig) => {
  const [filteredData, setFilteredData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const result = await fetchPlayerStats(filters, currentPage, itemsPerPage, sortConfig.key, sortConfig.direction);
      if (Array.isArray(result)) {
        setFilteredData(result);
        setTotalItems(result.length);
      } else if (result && typeof result === 'object') {
        setFilteredData(result.items || []);
        setTotalItems(result.total || 0);
      } else {
        setFilteredData([]);
        setTotalItems(0);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setFilteredData([]);
      setTotalItems(0);
    } finally {
      setIsLoading(false);
    }
  };

  return { filteredData, totalItems, isLoading, loadData };
};

export default usePlayerStats;
