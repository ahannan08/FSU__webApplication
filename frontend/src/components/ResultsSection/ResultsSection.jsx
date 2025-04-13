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
  sortConfig,
  setSortConfig,
  filters // Add filters prop here

}) => {
  // Calculate data for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>Player Game Statistics</h2>
        <span className="results-count">
          Showing {filteredData.length} results
        </span>
      </div>
      
      <PlayerTable 
        data={currentItems} 
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        statCategory={filters.statCategory} // Pass the selected stat category

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