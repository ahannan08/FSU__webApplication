import React from 'react';
import PlayerTable from '../PlayerTable/PlayerTable';
import Pagination from '../Pagination/Pagination';
import './ResultsSection.css';
import Spinner from '../spinner/Spinner';

const ResultsSection = ({
  filteredData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  totalItems,
  sortConfig,
  setSortConfig,
  filters,
  isLoading,
  onSortChange // <-- Add this to parent if not already
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const safeData = Array.isArray(filteredData) ? filteredData : [];

  const handleSort = (columnKey) => {
    let direction = 'asc';
    if (sortConfig?.key === columnKey && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const newSort = { key: columnKey, direction };
    setSortConfig(newSort);
    onSortChange(newSort); // Trigger re-fetch from parent
  };

  if (isLoading) {
    return (
      <section className="results-section">
        <div className="results-header">
          <h2>Player Game Statistics</h2>
        </div>
        <Spinner />
      </section>
    );
  }

  return (
    <section className="results-section">
      <div className="results-header">
        <h2>Player Game Statistics</h2>
        <span className="results-count">
          Showing {safeData.length} of {totalItems} results
        </span>
      </div>

      <PlayerTable
        data={safeData}
        sortConfig={sortConfig}
        statCategory={filters.statCategory}
        onSort={handleSort}
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
