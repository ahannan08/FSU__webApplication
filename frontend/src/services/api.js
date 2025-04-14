// services/api.js

// API configuration with environment variables
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://13.233.246.60/api/v1';

export default API_BASE_URL;
/**
 * Fetch player stats with filtering, pagination and sorting
 */
export const fetchPlayerStats = async (filters, page, pageSize, sortKey = null, sortDirection = 'asc') => {
  const queryParams = new URLSearchParams({
    page,
    page_size: pageSize,
    ...(filters.playerName && { player_name: filters.playerName }),
    ...(filters.position && { position: filters.position }),
    ...(filters.season && { season: filters.season }),
    ...(filters.opponent && { opponent: filters.opponent }),
    ...(filters.gameType && { game_type: filters.gameType }),
    ...(filters.statCategory && { stat_category: filters.statCategory }),
    ...(sortKey && { sort_by: sortKey }),
    ...(sortKey && { sort_direction: sortDirection })
  });
  
  try {
    console.log(`Making API request to: ${API_BASE_URL}/player-stats?${queryParams}`);
    
    const response = await fetch(`${API_BASE_URL}/player-stats?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Raw API response:", data);
    
    // Handle different response formats
    if (Array.isArray(data)) {
      // If API returns an array
      return { 
        items: data, 
        total: data.length 
      };
    } else if (data && typeof data === 'object') {
      // If API returns an object with data property
      if (Array.isArray(data.data)) {
        return {
          items: data.data,
          total: data.total || data.count || data.data.length
        };
      }
      // If API returns the expected format directly
      if (data.items && Array.isArray(data.items)) {
        return {
          items: data.items,
          total: data.total || 0
        };
      }
      // If API returns a single player object
      if (data.playerName) {
        return {
          items: [data], // Wrap it in an array
          total: 1
        };
      }
      // If the API returns multiple items but in a different format
      if (data.results && Array.isArray(data.results)) {
        return {
          items: data.results,
          total: data.count || data.results.length
        };
      }
    }
    
    // Fallback if response format is unexpected
    console.error("Unexpected API response format:", data);
    return { items: [], total: 0 };
    
  } catch (error) {
    console.error("Error fetching player stats:", error);
    // Return empty data structure on error
    return { items: [], total: 0 };
  }
};


/**
 * Fetch distinct positions for dropdown
 */
export const fetchDistinctPositions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player-stats/distinct/positions`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.positions)) {
      return data.positions;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching positions:", error);
    return [];
  }
};

/**
 * Fetch distinct seasons for dropdown
 */
export const fetchDistinctSeasons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player-stats/distinct/seasons`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.seasons)) {
      return data.seasons;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return [];
  }
};

/**
 * Fetch distinct opponents for dropdown
 */
export const fetchDistinctOpponents = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player-stats/distinct/opponents`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.opponents)) {
      return data.opponents;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching opponents:", error);
    return [];
  }
};

/**
 * Fetch distinct game types for dropdown
 */
export const fetchDistinctGameTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/player-stats/distinct/game-types`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle different response formats
    if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.data)) {
      return data.data;
    } else if (data && Array.isArray(data.gameTypes)) {
      return data.gameTypes;
    }
    
    return [];
  } catch (error) {
    console.error("Error fetching game types:", error);
    return [];
  }
};