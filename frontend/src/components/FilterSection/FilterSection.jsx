import React from 'react';
import './FilterSection.css';

const FilterSection = ({ 
  filters, 
  setFilters, 
  handleSearch, 
  handleReset 
}) => {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section className="filter-section">
      <h2>Search Players & Games</h2>
      <form id="search-form" className="filter-form" onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}>
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
        
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <select 
            id="position" 
            value={filters.position}
            onChange={handleChange}
          >
            <option value="">All Positions</option>
            <option value="QB">Quarterback (QB)</option>
            <option value="RB">Running Back (RB)</option>
            <option value="WR">Wide Receiver (WR)</option>
            <option value="TE">Tight End (TE)</option>
            <option value="OL">Offensive Line (OL)</option>
            <option value="DL">Defensive Line (DL)</option>
            <option value="LB">Linebacker (LB)</option>
            <option value="CB">Cornerback (CB)</option>
            <option value="S">Safety (S)</option>
            <option value="K">Kicker (K)</option>
            <option value="P">Punter (P)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="season">Season</label>
          <select 
            id="season" 
            value={filters.season}
            onChange={handleChange}
          >
            <option value="">All Seasons</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="opponent">Opponent</label>
          <select 
            id="opponent" 
            value={filters.opponent}
            onChange={handleChange}
          >
            <option value="">All Opponents</option>
            <option value="Miami">Miami</option>
            <option value="Florida">Florida</option>
            <option value="Clemson">Clemson</option>
            <option value="NC State">NC State</option>
            <option value="Duke">Duke</option>
            <option value="Pittsburgh">Pittsburgh</option>
            <option value="Wake Forest">Wake Forest</option>
            <option value="Syracuse">Syracuse</option>
            <option value="Boston College">Boston College</option>
            <option value="Georgia Tech">Georgia Tech</option>
            <option value="Louisiana">Louisiana</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="gameType">Game Type</label>
          <select 
            id="gameType" 
            value={filters.gameType}
            onChange={handleChange}
          >
            <option value="">All Games</option>
            <option value="regular">Regular Season</option>
            <option value="bowl">Bowl Game</option>
            <option value="playoff">Playoff</option>
            <option value="conference">Conference Game</option>
            <option value="non-conference">Non-Conference</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="statCategory">Stat Category</label>
          <select 
            id="statCategory" 
            value={filters.statCategory}
            onChange={handleChange}
          >
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
          >
            Reset
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default FilterSection;