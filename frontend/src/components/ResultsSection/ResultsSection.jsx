// components/ResultsSection.js
import React from 'react';
import PlayerTable from '../PlayerTable/PlayerTable';
import Pagination from '../Pagination/Pagination';
import './ResultsSection.css';

const ResultsSection = ({ 
  filteredData, 
  currentPage, 
  setCurrentPage,
  itemsPerPage,
  totalItems, // New prop for total items from API
  sortConfig,
  setSortConfig,
  filters,
  isLoading // New prop for loading state
}) => {
  // Calculate total pages using totalItems from API
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Show loading indicator when data is being fetched
  if (isLoading) {
    return (
      <section className="results-section">
        <div className="results-header">
          <h2>Player Game Statistics</h2>
        </div>
        <div className="loading-indicator">Loading data...</div>
      </section>
    );
  }

  // Make sure filteredData is an array (to prevent "Cannot read properties of undefined" error)
  const safeData = Array.isArray(filteredData) ? filteredData : [];

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>Player Game Statistics</h2>
        <span className="results-count">
          Showing {safeData.length} of {totalItems} results
        </span>
      </div>
      
      <PlayerTable 
        data={safeData} // Using safe data that's guaranteed to be an array
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        statCategory={filters.statCategory}
      />
      
      {totalPages > 1 && (
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </section>
  );
};

export default ResultsSection;