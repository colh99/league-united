const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const getUserLeagues = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    console.log("User ID from local storage:", userId);

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/leagues`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Fetched user leagues data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user leagues:", error);
    return [];
  }
};

export const getLeagueById = async (leagueId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userData/leagues/${leagueId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Fetched league data for", data.name, data);
    return data;
  } catch (error) {
    console.error("Error fetching league:", error);
    return null;
  }
};

export const createLeague = async (leagueData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    console.log("User ID from local storage:", userId);

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/leagues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
      body: JSON.stringify(leagueData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Created league data", data);
    return data;
  } catch (error) {
    console.error("Error creating league:", error);
    return null;
  }
};

export const updateLeague = async (leagueId, leagueData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    console.log("User ID from local storage:", userId);

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/leagues/${leagueId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
        body: JSON.stringify(leagueData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Updated league data", data);
    return data;
  } catch (error) {
    console.error("Error updating league:", error);
    return null;
  }
};

export const deleteLeague = async (leagueId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;
    console.log("User ID from local storage:", userId);

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/leagues/${leagueId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("Deleted league with ID", leagueId);
  } catch (error) {
    console.error("Error deleting league:", error);
  }
};
