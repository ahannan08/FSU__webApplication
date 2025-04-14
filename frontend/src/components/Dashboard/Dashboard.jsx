// pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import FilterSection from '../FilterSection/FilterSection';
import ResultsSection from '../ResultsSection/ResultsSection';
import usePlayerStats from '../../hooks/usePlayerStats';
import { handleSearch, handleReset } from '../../utils/handlers';
import './Dashboard.css';

const Dashboard = () => {
  // Filters & Sort
  const [filters, setFilters] = useState({
    playerName: '',
    position: '',
    season: '',
    opponent: '',
    gameType: '',
    statCategory: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 5;

  // Hook: Data loading logic abstracted
  const { filteredData, totalItems, isLoading, loadData } = usePlayerStats(
    filters,
    currentPage,
    itemsPerPage,
    sortConfig
  );

  // Effects: Trigger data load
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [currentPage]);

  useEffect(() => {
    if (sortConfig.key) loadData();
  }, [sortConfig]);

  return (
    <div className="dashboard-container">
      <main>
        <FilterSection 
          filters={filters}
          setFilters={setFilters}
          handleSearch={() => handleSearch(setCurrentPage, loadData)}
          handleReset={() => handleReset(setFilters, setCurrentPage, setSortConfig, loadData)}
        />

        <ResultsSection 
          filteredData={filteredData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          sortConfig={sortConfig}
          setSortConfig={setSortConfig}
          filters={filters}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default Dashboard;
