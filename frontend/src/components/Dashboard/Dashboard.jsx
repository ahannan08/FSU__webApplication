// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import FilterSection from '../FilterSection/FilterSection';
import ResultsSection from '../ResultsSection/ResultsSection';
import { playerGameData } from '../../data/sample_data';
import './Dashboard.css';

const Dashboard = () => {
  // State for filters
  const [filters, setFilters] = useState({
    playerName: '',
    position: '',
    season: '',
    opponent: '',
    gameType: '',
    statCategory: ''
  });
  
  // State for filtered data and pagination
  const [filteredData, setFilteredData] = useState([...playerGameData]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc'
  });
  
  // Apply sorting when sortConfig changes
  useEffect(() => {
    let sortedData = [...filteredData];
    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    setFilteredData(sortedData);
  }, [sortConfig]);
  
  // Reset to first page when filtered data changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);
  
  // Search handler
  const handleSearch = () => {
    const filtered = playerGameData.filter(item => {
      const nameMatch = !filters.playerName || 
        item.playerName.toLowerCase().includes(filters.playerName.toLowerCase());
      const positionMatch = !filters.position || 
        item.position === filters.position;
      const seasonMatch = !filters.season || 
        item.season === filters.season;
      const opponentMatch = !filters.opponent || 
        item.opponent === filters.opponent;
      const gameTypeMatch = !filters.gameType || 
        item.gameType === filters.gameType;
      
      // Stat category filtering
      let statMatch = true;
      if (filters.statCategory) {
        switch (filters.statCategory) {
          case 'passing':
            statMatch = item.passingYards > 0 || item.passingTDs > 0;
            break;
          case 'rushing':
            statMatch = item.rushingYards > 0 || item.rushingTDs > 0;
            break;
          case 'receiving':
            statMatch = item.receptions > 0 || item.receivingYards > 0;
            break;
          case 'defense':
            statMatch = item.tackles > 0 || item.sacks > 0 || item.interceptions > 0;
            break;
          case 'special-teams':
            statMatch = item.position === 'K' || item.position === 'P';
            break;
          default:
            break;
        }
      }
      
      return nameMatch && positionMatch && seasonMatch && 
        opponentMatch && gameTypeMatch && statMatch;
    });
    
    setFilteredData(filtered);
    setSortConfig({ key: null, direction: 'asc' });
  };
  
  // Reset handler
  const handleReset = () => {
    setFilters({
      playerName: '',
      position: '',
      season: '',
      opponent: '',
      gameType: '',
      statCategory: ''
    });
    setFilteredData([...playerGameData]);
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
  };
  
  return (
    <div className="dashboard-container">
      <main>
        <FilterSection 
          filters={filters}
          setFilters={setFilters}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
        
        <ResultsSection 
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          filters={filters} // Pass filters to ResultsSection

        />
      </main>
    </div>
  );
};

export default Dashboard;