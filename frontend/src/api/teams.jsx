const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getTeams = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched teams data for all teams", data);
    return data;
  } catch (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
};


export const getTeamById = async (team_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/teams/${team_id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched team data for", data.team.name, data);
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    return {};
  }
};