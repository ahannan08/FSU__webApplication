export const handleSearch = (setCurrentPage, loadData) => {
    setCurrentPage(1);
    loadData();
  };
  
  export const handleReset = (setFilters, setCurrentPage, setSortConfig, loadData) => {
    setFilters({ playerName: '', position: '', season: '', opponent: '', gameType: '', statCategory: '' });
    setCurrentPage(1);
    setSortConfig({ key: null, direction: 'asc' });
    setTimeout(() => loadData(), 0);
  };
  