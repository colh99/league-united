const supabase = require("../db/supabase");

const cleanData = (data) => {
  const cleanedData = {};
  for (const key in data) {
    cleanedData[key] = data[key] === "" ? null : data[key];
  }
  return cleanedData;
};

// DASHBOARD

// Get 4 of each entity for the dashboard
const getDashboardEntities = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader; // Extract user_id from the authorization header

  try {
    const leagues = await supabase
      .from("leagues")
      .select("*")
      .eq("user_id", user_id)
      .limit(4);

    const teams = await supabase
      .from("teams")
      .select("*")
      .eq("user_id", user_id)
      .limit(4);

    const seasons = await supabase
      .from("seasons")
      .select("*")
      .eq("user_id", user_id)
      .limit(4);

    const officials = await supabase
      .from("officials")
      .select("*")
      .eq("user_id", user_id)
      .limit(4);

    res.status(200).json({
      leagues: leagues.data,
      teams: teams.data,
      seasons: seasons.data,
      officials: officials.data,
    });
  } catch (error) {
    console.error("Error fetching dashboard entities:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// LEAGUES

// Get all leagues belonging to a given user
const getUserLeagues = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;

  supabase
    .from("leagues")
    .select("*")
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching user leagues:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(200).json(null); // Return null if no data is found
      } else {
        res.status(200).json(data);
      }
    });
};

// Get a single league by ID
const getLeagueById = (req, res) => {
  const leagueId = req.params.id;

  supabase
    .from("leagues")
    .select("*")
    .eq("league_id", leagueId)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching league:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(404).json({ error: "League not found" });
      } else {
        res.status(200).json(data[0]);
      }
    });
};

// Create a new league
const createLeague = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const leagueData = req.body;
  leagueData.user_id = user_id;

  supabase
    .from("leagues")
    .insert(leagueData)
    .select() // Specify that we want the inserted data to be returned
    .then(({ data, error }) => {
      if (error) {
        console.log("Error creating league:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from insert operation");
        res.status(400).json({ error: "Failed to create league" });
      } else {
        console.log("League created successfully:", data);
        res.status(201).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update a league
const updateLeague = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const leagueId = req.params.id;
  const leagueData = req.body;

  supabase
    .from("leagues")
    .update(leagueData)
    .select("*")
    .eq("league_id", leagueId)
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error updating league:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from update operation");
        res.status(404).json({ error: "League not found" });
      } else {
        console.log("League updated successfully:", data);
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Delete a league
const deleteLeague = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const leagueId = req.params.id;

  supabase
    .from("leagues")
    .delete()
    .eq("league_id", leagueId)
    .eq("user_id", user_id)
    .select() // Specify that we want the deleted data to be returned
    .then(({ data, error }) => {
      if (error) {
        console.log("Error deleting league:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from delete operation");
        res.status(404).json({ error: "League not found" });
      } else {
        console.log("League deleted successfully:", data);
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// TEAMS

// Get all teams belonging to a given user
const getUserTeams = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;

  supabase
    .from("teams")
    .select("*")
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching user teams:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(200).json(null); // Return null if no data is found
      } else {
        res.status(200).json(data);
      }
    });
};

// Get a single team by ID
const getTeamById = (req, res) => {
  const teamId = req.params.id;

  supabase
    .from("teams")
    .select("*")
    .eq("team_id", teamId)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching team:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(404).json({ error: "Team not found" });
      } else {
        res.status(200).json(data[0]);
      }
    });
};

// Create a new team
const createTeam = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const { manager, venue, ...teamData } = req.body;
  teamData.user_id = user_id;

  try {
    // Insert the team into the teams table
    const { data: teamResult, error: teamError } = await supabase
      .from("teams")
      .insert(teamData)
      .select();

    if (teamError) {
      console.log("Error creating team:", teamError);
      return res.status(400).json({ error: teamError.message });
    }

    if (!teamResult || teamResult.length === 0) {
      console.log("No data returned from team insert operation");
      return res.status(400).json({ error: "Failed to create team" });
    }

    const createdTeam = teamResult[0];
    const team_id = createdTeam.team_id;

    // Insert the manager into the managers table
    const managerData = { ...manager, team_id, user_id };
    const { error: managerError } = await supabase
      .from("managers")
      .insert(managerData);

    if (managerError) {
      console.log("Error creating manager:", managerError);
      return res.status(400).json({ error: managerError.message });
    }

    // Insert the venue into the venues table
    const venueData = { ...venue, user_id };
    const { data: venueResult, error: venueError } = await supabase
      .from("venues")
      .insert(venueData)
      .select();

    if (venueError) {
      console.log("Error creating venue:", venueError);
      return res.status(400).json({ error: venueError.message });
    }

    if (!venueResult || venueResult.length === 0) {
      console.log("No data returned from venue insert operation");
      return res.status(400).json({ error: "Failed to create venue" });
    }

    const venue_id = venueResult[0].venue_id;

    // Link the venue to the team in the teams_venues join table
    const teamsVenuesData = { team_id, venue_id, is_primary: true, user_id };
    const { error: joinTableError } = await supabase
      .from("teams_venues")
      .insert(teamsVenuesData);

    if (joinTableError) {
      console.log("Error linking team to venue:", joinTableError);
      return res.status(400).json({ error: joinTableError.message });
    }

    console.log("Team, manager, and venue created successfully:", createdTeam);
    res.status(201).json(createdTeam);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a team
const updateTeam = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const team_id = req.params.id;
  const { manager, venue, ...teamData } = req.body;

  try {
    // Update the team in the teams table
    const { data: teamResult, error: teamError } = await supabase
      .from("teams")
      .update(teamData)
      .select("*")
      .eq("team_id", team_id)
      .eq("user_id", user_id);

    if (teamError) {
      console.log("Error updating team:", teamError);
      return res.status(400).json({ error: teamError.message });
    }

    if (!teamResult || teamResult.length === 0) {
      console.log("No data returned from team update operation");
      return res.status(404).json({ error: "Team not found" });
    }

    // Update the manager in the managers table
    const managerData = { ...manager, user_id };
    const { error: managerError } = await supabase
      .from("managers")
      .upsert({ ...managerData, team_id }, { onConflict: ["team_id"] });

    if (managerError) {
      console.log("Error updating manager:", managerError);
      return res.status(400).json({ error: managerError.message });
    }

    // Update the venue in the venues table
    const venueData = { ...venue, user_id };
    const { data: venueResult, error: venueError } = await supabase
      .from("venues")
      .upsert(venueData, { onConflict: ["venue_id"] })
      .select();

    if (venueError) {
      console.log("Error updating venue:", venueError);
      return res.status(400).json({ error: venueError.message });
    }

    if (!venueResult || venueResult.length === 0) {
      console.log("No data returned from venue update operation");
      return res.status(400).json({ error: "Failed to update venue" });
    }

    const venue_id = venueResult[0].venue_id;

    // Ensure the venue is linked to the team in the teams_venues join table
    const teamsVenuesData = { team_id, venue_id, is_primary: true, user_id };
    const { error: joinTableError } = await supabase
      .from("teams_venues")
      .upsert(teamsVenuesData, { onConflict: ["team_id", "venue_id"] });

    if (joinTableError) {
      console.log("Error linking team to venue:", joinTableError);
      return res.status(400).json({ error: joinTableError.message });
    }

    console.log(
      "Team, manager, and venue updated successfully:",
      teamResult[0]
    );
    res.status(200).json(teamResult[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a team
const deleteTeam = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const teamId = req.params.id;

  supabase
    .from("teams")
    .delete()
    .eq("team_id", teamId)
    .eq("user_id", user_id)
    .select() // Specify that we want the deleted data to be returned
    .then(({ data, error }) => {
      if (error) {
        console.log("Error deleting team:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from delete operation");
        res.status(404).json({ error: "Team not found" });
      } else {
        console.log("Team deleted successfully:", data);
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// SEASONS

// Get season by id
const getSeasonById = async (req, res) => {
  const seasonId = req.params.id;

  try {
    // Fetch the season details
    const { data: seasonData, error: seasonError } = await supabase
      .from("seasons")
      .select("*")
      .eq("season_id", seasonId);

    if (seasonError) {
      console.log("Error fetching season:", seasonError);
      return res.status(400).json({ error: seasonError.message });
    }

    if (!seasonData || seasonData.length === 0) {
      return res.status(404).json({ error: "Season not found" });
    }

    const season = seasonData[0];

    // Fetch the associated teams from the seasons_teams join table
    const { data: teamsData, error: teamsError } = await supabase
      .from("seasons_teams")
      .select("team_id, teams(name)") // Fetch team_id and team name from the related teams table
      .eq("season_id", seasonId);

    if (teamsError) {
      console.log("Error fetching associated teams:", teamsError);
      return res.status(400).json({ error: teamsError.message });
    }

    // Add the teams to the season object
    season.teams = teamsData || [];

    console.log("Season fetched successfully:", season);
    res.status(200).json(season);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a new season
const createSeason = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader; // Extract user_id from the authorization header
  const seasonData = req.body;
  const { team_ids, ...seasonDetails } = seasonData; // Exclude team_ids from the season data

  try {
    // Add user_id to the season details
    seasonDetails.user_id = user_id;

    // Insert the season into the seasons table
    const { data: seasonDataResult, error: seasonError } = await supabase
      .from("seasons")
      .insert(seasonDetails) // Insert only the season details
      .select();

    if (seasonError) {
      console.log("Error creating season:", seasonError);
      return res.status(400).json({ error: seasonError.message });
    }

    if (!seasonDataResult || seasonDataResult.length === 0) {
      console.log("No data returned from insert operation");
      return res.status(400).json({ error: "Failed to create season" });
    }

    const createdSeason = seasonDataResult[0];
    const seasonId = createdSeason.season_id;

    // Insert records into the seasons_teams join table
    if (team_ids && Array.isArray(team_ids) && team_ids.length > 0) {
      const seasonsTeamsData = team_ids.map((teamId) => ({
        season_id: seasonId,
        team_id: teamId,
        user_id: user_id, // Include user_id in the join table
      }));

      const { error: joinTableError } = await supabase
        .from("seasons_teams")
        .insert(seasonsTeamsData);

      if (joinTableError) {
        console.log("Error updating seasons_teams join table:", joinTableError);
        return res.status(400).json({ error: joinTableError.message });
      }
    }

    console.log("Season created successfully:", createdSeason);
    res.status(201).json(createdSeason);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a season
const updateSeason = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader; // Extract user_id from the authorization header
  const seasonId = req.params.id;
  const seasonData = req.body;
  const { team_ids, ...seasonDetails } = seasonData; // Exclude team_ids from the season data

  try {
    // Add user_id to the season details
    seasonDetails.user_id = user_id;

    // Update the season in the seasons table
    const { data: seasonDataResult, error: seasonError } = await supabase
      .from("seasons")
      .update(seasonDetails) // Update only the season details
      .select("*")
      .eq("season_id", seasonId)
      .eq("user_id", user_id); // Ensure the user_id matches

    if (seasonError) {
      console.log("Error updating season:", seasonError);
      return res.status(400).json({ error: seasonError.message });
    }

    if (!seasonDataResult || seasonDataResult.length === 0) {
      console.log("No data returned from update operation");
      return res.status(404).json({ error: "Season not found" });
    }

    const updatedSeason = seasonDataResult[0];

    // Update records in the seasons_teams join table
    if (team_ids && Array.isArray(team_ids) && team_ids.length > 0) {
      // Delete existing records for the season
      const { error: deleteError } = await supabase
        .from("seasons_teams")
        .delete()
        .eq("season_id", seasonId)
        .eq("user_id", user_id); // Ensure the user_id matches

      if (deleteError) {
        console.log(
          "Error deleting from seasons_teams join table:",
          deleteError
        );
        return res.status(400).json({ error: deleteError.message });
      }

      // Insert new records
      const seasonsTeamsData = team_ids.map((teamId) => ({
        season_id: seasonId,
        team_id: teamId,
        user_id: user_id, // Include user_id in the join table
      }));

      const { error: joinTableError } = await supabase
        .from("seasons_teams")
        .insert(seasonsTeamsData);

      if (joinTableError) {
        console.log("Error updating seasons_teams join table:", joinTableError);
        return res.status(400).json({ error: joinTableError.message });
      }
    }

    console.log("Season updated successfully:", updatedSeason);
    res.status(200).json(updatedSeason);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a season
const deleteSeason = async (req, res) => {
  const seasonId = req.params.id;

  try {
    // Delete the season from the seasons table
    const { data: seasonDataResult, error: seasonError } = await supabase
      .from("seasons")
      .delete()
      .eq("season_id", seasonId)
      .select();

    if (seasonError) {
      console.log("Error deleting season:", seasonError);
      return res.status(400).json({ error: seasonError.message });
    }

    if (!seasonDataResult || seasonDataResult.length === 0) {
      console.log("No data returned from delete operation");
      return res.status(404).json({ error: "Season not found" });
    }

    // Delete records from the seasons_teams join table
    const { error: joinTableError } = await supabase
      .from("seasons_teams")
      .delete()
      .eq("season_id", seasonId);

    if (joinTableError) {
      console.log(
        "Error deleting from seasons_teams join table:",
        joinTableError
      );
      return res.status(400).json({ error: joinTableError.message });
    }

    console.log("Season deleted successfully:", seasonDataResult[0]);
    res.status(200).json(seasonDataResult[0]);
  } catch (err) {
    console.error("Unexpected error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

// OFFICIALS

// Get all officials belonging to a given user
const getUserOfficials = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;

  supabase
    .from("officials")
    .select("*")
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching user officials:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(200).json(null); // Return null if no data is found
      } else {
        res.status(200).json(data);
      }
    });
};

// Get a single official by ID
const getOfficialById = (req, res) => {
  const officialId = req.params.id;

  supabase
    .from("officials")
    .select("*")
    .eq("official_id", officialId)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error fetching official:", error);
        res.status(400).json({ error: error.message });
      } else if (data.length === 0) {
        res.status(404).json({ error: "Official not found" });
      } else {
        res.status(200).json(data[0]);
      }
    });
};

// Create a new official
const createOfficial = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  let officialData = req.body;
  officialData.user_id = user_id;

  // Clean the data to replace empty values with NULL
  officialData = cleanData(officialData);

  supabase
    .from("officials")
    .insert(officialData)
    .select() // Specify that we want the inserted data to be returned
    .then(({ data, error }) => {
      if (error) {
        console.log("Error creating official:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from insert operation");
        res.status(400).json({ error: "Failed to create official" });
      } else {
        console.log("Official created successfully:", data);
        res.status(201).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Update an official
const updateOfficial = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const officialId = req.params.id;
  let officialData = { ...req.body };

  // Ensure official_id is not included in the update payload
  delete officialData.official_id;

  // Clean the data to replace empty values with NULL
  officialData = cleanData(officialData);

  supabase
    .from("officials")
    .update(officialData)
    .select("*")
    .eq("official_id", officialId)
    .eq("user_id", user_id)
    .then(({ data, error }) => {
      if (error) {
        console.log("Error updating official:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from update operation");
        res.status(404).json({ error: "Official not found" });
      } else {
        console.log("Official updated successfully:", data);
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// Delete an official
const deleteOfficial = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("No authorization header found");
    return res.status(401).json({ error: "Unauthorized" });
  }

  const user_id = authHeader;
  const officialId = req.params.id;

  supabase
    .from("officials")
    .delete()
    .eq("official_id", officialId)
    .eq("user_id", user_id)
    .select() // Specify that we want the deleted data to be returned
    .then(({ data, error }) => {
      if (error) {
        console.log("Error deleting official:", error);
        res.status(400).json({ error: error.message });
      } else if (!data || data.length === 0) {
        console.log("No data returned from delete operation");
        res.status(404).json({ error: "Official not found" });
      } else {
        console.log("Official deleted successfully:", data);
        res.status(200).json(data[0]);
      }
    })
    .catch((err) => {
      console.error("Unexpected error:", err);
      res.status(500).json({ error: "Internal server error" });
    });
};

// MATCHES and SCHEDULE

// Create a full season schedule
const generateSeasonSchedule = async (req, res) => {
  try {
    console.log("Request received to generate season schedule:", req.body);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("No authorization header found");
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user_id = authHeader;

    const {
      seasonId,
      start_date,
      end_date,
      matches_per_team,
      game_days,
      preferred_match_day,
      team_ids,
    } = req.body;

    // Validate input
    if (
      !seasonId ||
      !start_date ||
      !end_date ||
      !matches_per_team ||
      !team_ids ||
      team_ids.length < 2
    ) {
      console.log("Invalid input data:", req.body);
      return res.status(400).json({ error: "Invalid input data" });
    }

    console.log("Validated input data. Proceeding to fetch venues...");

    // Update the season's start and end dates
    const { error: updateSeasonError } = await supabase
      .from("seasons")
      .update({ start_date, end_date })
      .eq("season_id", seasonId);

    if (updateSeasonError) {
      console.error("Error updating season dates:", updateSeasonError);
      return res.status(400).json({ error: "Failed to update season dates" });
    }

    console.log("Season dates updated successfully:", { start_date, end_date });

    // Fetch primary venues for each team
    const { data: venues, error: venueError } = await supabase
      .from("teams_venues")
      .select("team_id, venue_id")
      .eq("is_primary", true)
      .in("team_id", team_ids);

    if (venueError) {
      console.error("Error fetching venues:", venueError);
      return res.status(400).json({ error: "Failed to fetch venues" });
    }

    console.log("Fetched venues:", venues);

    const venueMap = {};
    venues.forEach((venue) => {
      venueMap[venue.team_id] = venue.venue_id;
    });

    console.log("Mapped venues to teams:", venueMap);

    // Generate match schedule
    const matches = [];
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    endDate.setDate(endDate.getDate() + 1); // Add 1 day to include the end date
    const totalDays = (endDate - startDate) / (24 * 60 * 60 * 1000) + 1;

    console.log(
      "Start date:",
      startDate,
      "End date:",
      endDate,
      "Total days:",
      totalDays
    );

    // Filter game days to include only selected days
    const selectedDays = game_days.map((day) => day.day);
    console.log("Selected game days:", selectedDays);

    // Generate round-robin matches with bye weeks for odd number of teams
    if (team_ids.length % 2 !== 0) {
      team_ids.push(null); // Add a "bye" placeholder if the number of teams is odd
    }
    
    const totalRounds = (team_ids.length - 1) * matches_per_team; // Adjust total rounds based on matches_per_team
    const half = Math.floor(team_ids.length / 2);
    
    // Balance home and away games for each team
    const homeAwayCount = {}; // Track home/away counts for each team
    
    // Initialize home/away counts for all teams
    team_ids.forEach((team) => {
      if (team !== null) {
        homeAwayCount[team] = { home: 0, away: 0 };
      }
    });
    
    for (let round = 0; round < totalRounds; round++) {
      for (let i = 0; i < half; i++) {
        const home = team_ids[i];
        const away = team_ids[team_ids.length - 1 - i];
    
        if (home !== null && away !== null) {
          // Assign home/away based on current counts to balance matches
          if (homeAwayCount[home].home <= homeAwayCount[home].away) {
            matches.push({
              home_team_id: home,
              away_team_id: away,
              venue_id: venueMap[home], // Use home team's primary venue
            });
            homeAwayCount[home].home++;
            homeAwayCount[away].away++;
          } else {
            matches.push({
              home_team_id: away,
              away_team_id: home,
              venue_id: venueMap[away], // Use away team's primary venue
            });
            homeAwayCount[away].home++;
            homeAwayCount[home].away++;
          }
        }
      }
    
      // Rotate the teams for the next round (except the first team)
      team_ids.splice(1, 0, team_ids.pop());
    }
    
    console.log("Balanced matches with home/away distribution:", matches);

    const timeSlotMapping = {
      morning: "10:00:00", // 10 AM
      afternoon: "13:00:00", // 1 PM
      evening: "18:00:00", // 6 PM
      default: "17:00:00", // 5 PM
    };

    // Assign match dates and times
    let currentDate = new Date(start_date);
    let matchIndex = 0;

    // Helper function to pick a random time slot
    const getRandomTimeSlot = (times) => {
      return times[Math.floor(Math.random() * times.length)];
    };

    // Schedule matches on the preferred match day first
    while (currentDate <= endDate && matchIndex < matches.length) {
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      if (dayName === preferred_match_day) {
        const availableTimes =
          game_days.find((day) => day.day === dayName)?.times || [];
        const timesToUse =
          availableTimes.length > 0 ? availableTimes : ["default"]; // Use "default" if no times are provided

        const scheduledTeams = new Set(); // Track teams already scheduled on this date

        while (matchIndex < matches.length) {
          const match = matches[matchIndex];
          const { home_team_id, away_team_id } = match;

          // Skip if either team already scheduled today
          if (
            scheduledTeams.has(home_team_id) ||
            scheduledTeams.has(away_team_id)
          ) {
            break; // Stop trying to schedule today — move to next date
          }

          const matchDate = currentDate.toLocaleDateString("en-CA");
          const matchTime = timeSlotMapping[getRandomTimeSlot(timesToUse)];

          match.match_date = `${matchDate}T${matchTime}`;
          match.season_id = seasonId;
          match.user_id = user_id;

          scheduledTeams.add(home_team_id);
          scheduledTeams.add(away_team_id);

          matchIndex++;
        }
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0); // Reset time to the start of the day
    }

    // Reset currentDate to start_date to schedule remaining matches
    currentDate = new Date(start_date);

        // Schedule remaining matches on other available match days
    while (currentDate <= endDate && matchIndex < matches.length) {
      // Collect all scheduled matches up to the current date
      const scheduledDates = matches
        .filter((match) => match.match_date)
        .map((match) => new Date(match.match_date).getTime());
    
      // Find the best day to schedule the next match
      const bestDay = selectedDays
        .filter((day) => day !== preferred_match_day) // Exclude preferred match day
        .map((day) => {
          const dayIndex = selectedDays.indexOf(day);
          const dayDate = new Date(currentDate);
          dayDate.setDate(
            currentDate.getDate() + dayIndex - currentDate.getDay()
          ); // Set to the correct day of the week
    
          if (dayDate < currentDate || dayDate > endDate) return null; // Skip invalid dates
    
          const dayTime = dayDate.getTime();
          const minDistance = scheduledDates.length
            ? Math.min(...scheduledDates.map((date) => Math.abs(date - dayTime)))
            : Infinity; // If no scheduled dates, distance is infinite
    
          return { dayDate, minDistance };
        })
        .filter(Boolean) // Remove null values
        .sort((a, b) => b.minDistance - a.minDistance)[0]; // Pick the day with the largest gap
    
      if (!bestDay) {
        // If no valid day is found, move to the next week
        currentDate.setDate(currentDate.getDate() + 7 - currentDate.getDay());
        currentDate.setHours(0, 0, 0, 0); // Reset time to the start of the day
        continue;
      }
    
      const { dayDate } = bestDay;
      const dayName = dayDate.toLocaleDateString("en-US", { weekday: "long" });
    
      const availableTimes =
        game_days.find((gameDay) => gameDay.day === dayName)?.times || [];
      const timesToUse =
        availableTimes.length > 0 ? availableTimes : ["default"]; // Use "default" if no times are provided
    
      const scheduledTeams = new Set(); // Track teams already scheduled on this date
    
      while (matchIndex < matches.length) {
        const match = matches[matchIndex];
        const { home_team_id, away_team_id } = match;
    
        // Skip if either team already scheduled today
        if (
          scheduledTeams.has(home_team_id) ||
          scheduledTeams.has(away_team_id)
        ) {
          break; // Stop trying to schedule today — move to next date
        }
    
        const matchDate = dayDate.toLocaleDateString("en-CA");
        const matchTime = timeSlotMapping[getRandomTimeSlot(timesToUse)];
    
        match.match_date = `${matchDate}T${matchTime}`;
        match.season_id = seasonId;
        match.user_id = user_id;
    
        scheduledTeams.add(home_team_id);
        scheduledTeams.add(away_team_id);
    
        matchIndex++;
      }
    
      // Move to the next week if no matches were scheduled on this day
      currentDate.setDate(currentDate.getDate() + 7 - currentDate.getDay());
      currentDate.setHours(0, 0, 0, 0); // Reset time to the start of the day
    }

    console.log(
      "Assigned match dates and times. Total matches scheduled:",
      matchIndex
    );

    // Check if all matches were scheduled
    if (matchIndex < matches.length) {
      console.log(
        "Not enough matchdays to schedule all matches. Matches left:",
        matches.length - matchIndex
      );
      return res
        .status(400)
        .json({ error: "Not enough matchdays to schedule all matches" });
    }

    console.log("Inserting matches into the database...");

    // Insert matches into the database
    const { error: insertError } = await supabase
      .from("matches")
      .insert(matches);

    if (insertError) {
      console.error("Error inserting matches:", insertError);
      return res.status(400).json({ error: "Failed to insert matches" });
    }

    console.log("Matches inserted successfully:", matches);

    res
      .status(201)
      .json({ message: "Schedule generated successfully", matches });
  } catch (error) {
    console.error("Error generating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Clear the season schedule
const clearSeasonSchedule = async (req, res) => {
  const { seasonId } = req.params;

  try {
    // Delete matches associated with the given season
    const { error: deleteError } = await supabase
      .from("matches")
      .delete()
      .eq("season_id", seasonId);

    if (deleteError) {
      console.error("Error deleting matches:", deleteError);
      return res.status(400).json({ error: "Failed to delete matches" });
    }

    console.log("Matches deleted successfully for season:", seasonId);
    res.status(200).json({ message: "Schedule cleared successfully" });
  } catch (error) {
    console.error("Error clearing schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getDashboardEntities,
  getUserLeagues,
  getLeagueById,
  createLeague,
  updateLeague,
  deleteLeague,
  getUserTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
  getSeasonById,
  createSeason,
  updateSeason,
  deleteSeason,
  getUserOfficials,
  getOfficialById,
  createOfficial,
  updateOfficial,
  deleteOfficial,
  generateSeasonSchedule,
  clearSeasonSchedule,
};
