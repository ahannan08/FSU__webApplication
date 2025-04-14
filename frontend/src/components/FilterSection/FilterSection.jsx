import React, { useCallback } from 'react';
import './FilterSection.css';
import useFilterOptions from '../../hooks/useFilterOptions';

const FilterSection = ({ filters, setFilters, handleSearch, handleReset }) => {
  const { positions, seasons, opponents, gameTypes, isLoading } = useFilterOptions();

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  }, [setFilters]);

  const renderSelect = (label, id, options) => (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={filters[id]} onChange={handleChange} disabled={isLoading}>
        <option value="">{`All ${label}`}</option>
        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  );

  return (
    <section className="filter-section">
      <h2>Search Players & Games</h2>
      <form 
        id="search-form" 
        className="filter-form" 
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="form-group">
          <label htmlFor="playerName">Player Name</label>
          <input
            type="text"
            id="playerName"
            placeholder="Enter player name"
            value={filters.playerName}
            onChange={handleChange}
          />
        </div>

        {renderSelect("Position", "position", positions)}
        {renderSelect("Season", "season", seasons)}
        {renderSelect("Opponent", "opponent", opponents)}
        {renderSelect("Game Type", "gameType", gameTypes)}

        <div className="form-group">
          <label htmlFor="statCategory">Stat Category</label>
          <select id="statCategory" value={filters.statCategory} onChange={handleChange}>
            <option value="">All Stats</option>
            <option value="passing">Passing</option>
            <option value="rushing">Rushing</option>
            <option value="receiving">Receiving</option>
            <option value="defense">Defense</option>
            <option value="special-teams">Special Teams</option>
          </select>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={handleReset}
            disabled={isLoading}
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Search'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FilterSection;
