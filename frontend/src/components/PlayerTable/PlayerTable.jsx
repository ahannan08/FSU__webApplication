// components/PlayerTable.js
import React from 'react';
import './PlayerTable.css';

const PlayerTable = ({ data, sortConfig, setSortConfig, statCategory }) => {
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (columnName) => {
    if (sortConfig.key === columnName) {
      return sortConfig.direction === 'asc' ? ' sorted-asc' : ' sorted-desc';
    }
    return '';
  };

  // Define columns based on statCategory
  const columns = {
    default: [
      { key: 'opponent', label: 'Game' },
      { key: 'date', label: 'Date' },
    ],
    passing: [
      { key: 'passingYards', label: 'Passing Yards' },
      { key: 'passingTDs', label: 'Passing TDs' },
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
      { key: 'position', label: 'Position' },
    ],
  };

  // Combine default columns with selected stat category columns
  const selectedColumns = [
    ...columns.default,
    ...(statCategory ? columns[statCategory] : Object.values(columns).flat()),
  ];

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
          {data.length > 0 ? (
            data.map((player) => (
              <tr key={player.id}>
                <td>
                  <div className="player-info">
                    <img
                      className="player-photo"
                      src={player.playerPhoto}
                      alt={player.playerName}
                    />
                    <span className="player-name">{player.playerName}</span>
                  </div>
                </td>
                <td>{player.position}</td>
                {selectedColumns.map((col) => (
                  <td
                    key={col.key}
                    className={player[col.key] > 0 ? 'stats-highlight' : ''}
                  >
                    {col.key === 'date'
                      ? new Date(player[col.key]).toLocaleDateString()
                      : player[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2 + selectedColumns.length} className="no-results">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerTable;