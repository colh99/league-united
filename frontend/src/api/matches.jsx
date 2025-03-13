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