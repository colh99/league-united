const supabase = require("../db/supabase");

// Get all teams with their primary venue details
const getTeams = async (req, res) => {
  const { data, error } = await supabase
    .from("teams_venues") // Query the join table
    .select("teams(*), venues(name)") // Fetch related teams and venues
    .eq("is_primary", true); // Only get the primary venue

  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

// Get a team by ID for the team page
const getTeamById = async (req, res) => {
  const { team_id } = req.params;

  // Fetch team details
  const { data: teamData, error: teamError } = await supabase
    .from("teams")
    .select("*")
    .eq("team_id", team_id)
    .single();

  if (teamError) {
    return res.status(400).json({ error: teamError.message });
  }

  // Fetch roster
  const { data: rosterData, error: rosterError } = await supabase
    .from("team_rosters")
    .select("*, players(*)") // Corrected syntax for related table
    .eq("team_id", team_id);

  if (rosterError) {
    return res.status(400).json({ error: rosterError.message });
  }

  const now = new Date().toISOString(); // Convert to ISO format for database comparison
  // Fetch up to 3 upcoming matches with opposing team names and venue names
  const { data: upcomingMatchesData, error: upcomingError } = await supabase
    .from("matches")
    .select("*, home_team:home_team_id(name), away_team:away_team_id(name), venue:venue_id(name)") // Include team and venue names
    .or(`home_team_id.eq.${team_id},away_team_id.eq.${team_id}`)
    .gte("match_date", now) // Get matches in the future
    .order("match_date", { ascending: true }) // Earliest upcoming matches first
    .limit(3);

  if (upcomingError) {
    return res.status(400).json({ error: upcomingError.message });
  }

  // Fetch up to 3 previous matches with opposing team names and venue names
  const { data: previousMatchesData, error: previousError } = await supabase
    .from("matches")
    .select("*, home_team:home_team_id(name), away_team:away_team_id(name), venue:venue_id(name)") // Include team and venue names
    .or(`home_team_id.eq.${team_id},away_team_id.eq.${team_id}`)
    .lt("match_date", now) // Get matches in the past
    .order("match_date", { ascending: false }) // Most recent previous matches first
    .limit(3);

  if (previousError) {
    return res.status(400).json({ error: previousError.message });
  }

  const { data: venueData, error: venueError } = await supabase
    .from("teams_venues")
    .select("venues(*)")
    .eq("team_id", team_id)
    .eq("is_primary", true) // Only gets the primary venue
    .single();

  if (venueError) {
    return res.status(400).json({ error: venueError.message });
  }

  const { data: managerData, error: managerError } = await supabase
    .from("managers")
    .select("*")
    .eq("team_id", team_id)
    .single();

  if (managerError) {
    return res.status(400).json({ error: managerError.message });
  }

  res.status(200).json({
    team: teamData,
    roster: rosterData,
    previousMatches: previousMatchesData,
    upcomingMatches: upcomingMatchesData,
    primaryVenue: venueData,
    manager: managerData,
  });
};

module.exports = { getTeams, getTeamById };
