const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";


// DASHBOARD

// get 4 of each entity type for the dashboard
export const getDashboardEntities = async (userId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/userData/dashboard`, {
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
    console.log("Fetched dashboard data", data);
    return data;
  } catch (error) {
    console.error("Error fetching dashboard entities:", error);
    return null;
  }
};


// LEAGUES  

export const getUserLeagues = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

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


// TEAMS

export const getUserTeams = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/teams`, {
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
    console.log("Fetched user teams data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user teams:", error);
    return [];
  }
};

export const getTeamById = async (teamId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userData/teams/${teamId}`,
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
    console.log("Fetched team data for", data.name, data);
    return data;
  } catch (error) {
    console.error("Error fetching team:", error);
    return null;
  }
};

export const createTeam = async (teamData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
      body: JSON.stringify(teamData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Created team data", data);
    return data;
  } catch (error) {
    console.error("Error creating team:", error);
    return null;
  }
};

export const updateTeam = async (teamId, teamData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/teams/${teamId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
        body: JSON.stringify(teamData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Updated team data", data);
    return data;
  } catch (error) {
    console.error("Error updating team:", error);
    return null;
  }
};

export const deleteTeam = async (teamId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/teams/${teamId}`,
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
    console.log("Deleted team with ID", teamId);
  } catch (error) {
    console.error("Error deleting team:", error);
  }
};


// SEASONS

export const getSeasonById = async (seasonId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userData/seasons/${seasonId}`,
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
    console.log("Fetched season data for", data.headline_year, data);
    return data;
  } catch (error) {
    console.error("Error fetching season:", error);
    return null;
  }
};

export const createSeason = async (seasonData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/seasons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
      body: JSON.stringify(seasonData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Created season data", data);
    return data;
  } catch (error) {
    console.error("Error creating season:", error);
    return null;
  }
}

export const updateSeason = async (seasonId, seasonData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/seasons/${seasonId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
        body: JSON.stringify(seasonData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Updated season data", data);
    return data;
  } catch (error) {
    console.error("Error updating season:", error);
    return null;
  }
};

export const deleteSeason = async (seasonId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/seasons/${seasonId}`,
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
    console.log("Deleted season with ID", seasonId);
  } catch (error) {
    console.error("Error deleting season:", error);
  }
};

// OFFICIALS

export const getUserOfficials = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/officials`, {
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
    console.log("Fetched user officials data", data);
    return data;
  } catch (error) {
    console.error("Error fetching user officials:", error);
    return [];
  }
};

export const getOfficialById = async (officialId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/userData/officials/${officialId}`,
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
    console.log("Fetched official data for", data.name, data);
    return data;
  } catch (error) {
    console.error("Error fetching official:", error);
    return null;
  }
};

export const createOfficial = async (officialData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(`${API_BASE_URL}/userData/officials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userId,
      },
      body: JSON.stringify(officialData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Created official data", data);
    return data;
  } catch (error) {
    console.error("Error creating official:", error);
    return null;
  }
}

export const updateOfficial = async (officialId, officialData) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/officials/${officialId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
        body: JSON.stringify(officialData),
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Parse the JSON response
    console.log("Updated official data", data);
    return data;
  } catch (error) {
    console.error("Error updating official:", error);
    return null;
  }
}

export const deleteOfficial = async (officialId) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    const response = await fetch(
      `${API_BASE_URL}/userData/officials/${officialId}`,
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
    console.log("Deleted official with ID", officialId);
  } catch (error) {
    console.error("Error deleting official:", error);
  }
};


// MATCHES and SCHEDULE

export const generateSeasonSchedule = async (scheduleData) => {
  try {
    // Retrieve the user from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user.id;

    if (!userId) {
      throw new Error("User ID not found in local storage");
    }

    // Make the API request
    const response = await fetch(
      `${API_BASE_URL}/userData/matches/generateSchedule`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId, // Pass the user ID in the Authorization header
        },
        body: JSON.stringify(scheduleData), // Send the schedule data in the request body
      }
    );

    // Check if the response is successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to generate schedule");
    }

    // Parse and return the response data
    const data = await response.json();
    console.log("Generated schedule data:", data);
    return data;
  } catch (error) {
    console.error("Error generating schedule:", error);
    throw error; // Re-throw the error for the caller to handle
  }
};