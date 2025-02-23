const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getLeagues = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leagues`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched leagues data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching leagues:", error);
    return [];
  }
};

export const getAllSeasons = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/leagues/seasons`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched seasons data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching seasons:", error);
    return [];
  }
};

export const getSeasonOverview = async (season_id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/leagues/seasons/${season_id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched season overview data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching season overview:", error);
    return [];
  }
}