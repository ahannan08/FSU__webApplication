import React, { useMemo, useCallback } from 'react';
import './PlayerTable.css';

const PlayerTable = ({ data, sortConfig, onSort, statCategory }) => {
  // Memoize sort handler to prevent recreation on each render
  const handleSort = useCallback((key) => {
    onSort(key); // ← just call onSort, let parent handle logic
  }, [onSort]);
  






  // Memoize sort indicator function
  const getSortIndicator = useCallback((columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'asc' ? ' sorted-asc' : ' sorted-desc';
    }
    return '';
  }, [sortConfig]);






  // Define all column configurations - moved outside component in a real app
  const columnConfigs = useMemo(() => ({
    default: [
      { key: 'opponent', label: 'Game' },
      { key: 'date', label: 'Date' },
      { key: 'result', label: 'Result' },
    ],
    passing: [
      { key: 'passingYards', label: 'Passing Yards' },
      { key: 'passingTDs', label: 'Passing TDs' },
      { key: 'passingInt', label: 'Interceptions' },
    ],
    rushing: [
      { key: 'rushingYards', label: 'Rushing Yards' },
      { key: 'rushingTDs', label: 'Rushing TDs' },
    ],
    receiving: [
      { key: 'receptions', label: 'Receptions' },
      { key: 'receivingYards', label: 'Receiving Yards' },
      { key: 'receivingTDs', label: 'Receiving TDs' },
    ],
    defense: [
      { key: 'tackles', label: 'Tackles' },
      { key: 'sacks', label: 'Sacks' },
      { key: 'interceptions', label: 'Interceptions' },
    ],
    'special-teams': [
      { key: 'fieldGoals', label: 'Field Goals' },
      { key: 'extraPoints', label: 'Extra Points' },
      { key: 'punts', label: 'Punts' },
    ],
    all: [
      { key: 'passingYards', label: 'Passing Yards' },
      { key: 'passingTDs', label: 'Passing TDs' },
      { key: 'passingInt', label: 'Interceptions' },
      { key: 'rushingYards', label: 'Rushing Yards' },
      { key: 'rushingTDs', label: 'Rushing TDs' },
      { key: 'receptions', label: 'Receptions' },
      { key: 'receivingYards', label: 'Receiving Yards' },
      { key: 'receivingTDs', label: 'Receiving TDs' },
      { key: 'tackles', label: 'Tackles' },
      { key: 'sacks', label: 'Sacks' },
      { key: 'interceptions', label: 'Interceptions' },
      { key: 'fieldGoals', label: 'Field Goals' },
      { key: 'extraPoints', label: 'Extra Points' },
      { key: 'punts', label: 'Punts' },
    ]
  }), []);





  // Memoize selected columns based on statCategory
  const selectedColumns = useMemo(() => [
    ...columnConfigs.default,
    ...(statCategory === 'all' || !statCategory 
      ? columnConfigs.all 
      : (columnConfigs[statCategory] || []))
  ], [columnConfigs, statCategory]);




  // Safety check - ensure data is an array
  const safeData = Array.isArray(data) ? data : [];
  


  // Early return for empty data
  if (safeData.length === 0) {
    return <div className="results-table-container">
      <div className="no-results">No results found</div>
    </div>;
  }



  // Helper function to format cell content
  const formatCellContent = (key, value) => {
    if (value === undefined) return '-';
    if (key === 'date' && value) return new Date(value).toLocaleDateString();
    return value;
  };



  
  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            <th
              className={`sortable${getSortIndicator('playerName')}`}
              onClick={() => handleSort('playerName')}
            >
              Player
            </th>
            <th
              className={`sortable${getSortIndicator('position')}`}
              onClick={() => handleSort('position')}
            >
              Position
            </th>
            {selectedColumns.map((col) => (
              <th
                key={col.key}
                className={`sortable${getSortIndicator(col.key)}`}
                onClick={() => handleSort(col.key)}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {safeData.map((player, index) => (
            <tr key={player.id || index}>
              <td>
                <div className="player-info">
                  {player.playerPhoto ? (
                    <img
                      className="player-photo"
                      src={player.playerPhoto}
                      alt={player.playerName}
                    />
                  ) : (
                    <div className="player-photo-placeholder"></div>
                  )}
                  <span className="player-name">{player.playerName}</span>
                </div>
              </td>
              <td>{player.position}</td>
              {selectedColumns.map((col) => (
                <td
                  key={col.key}
                  className={Number(player[col.key]) > 0 ? 'stats-highlight' : ''}
                >
                  {formatCellContent(col.key, player[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(PlayerTable);