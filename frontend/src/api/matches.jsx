const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getMatchById = async (match_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${match_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching match with ID ${match_id}: ${response.statusText}`);
    }
    const matchData = await response.json();
    console.log("Fetched match data for", matchData.match_date, matchData.home_team.name, "vs", matchData.away_team.name, matchData);
    return matchData;
  } catch (error) {
    console.error("Error fetching match data:", error);
    throw error;
  }
};

export const getMatchesBySeason = async (season_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/season/${season_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching matches for season ${season_id}: ${response.statusText}`);
    }
    const matchesData = await response.json();
    console.log("Fetched matches data for season", season_id, matchesData);
    return matchesData;
  } catch (error) {
    console.error("Error fetching matches data:", error);
    throw error;
  }
};

export const getMatchesByTeam = async (team_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/team/${team_id}`);
    if (!response.ok) {
      throw new Error(`Error fetching matches for team ${team_id}: ${response.statusText}`);
    }
    const matchesData = await response.json();
    console.log("Fetched matches data for team", team_id, matchesData);
    return matchesData;
  } catch (error) {
    console.error("Error fetching matches data:", error);
    throw error;
  }
};