const supabase = require("../db/supabase");

// Get all match data for a single match by ID
const getMatchById = async (req, res) => {
  const matchId = req.params.id;
  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      `
        match_id,
        match_date,
        home_team: home_team_id (*),
        away_team: away_team_id (*),
        venue: venue_id (*),
        season: season_id (
            season_id,
            headline_year,
            league: league_id (
                league_id,
                name
            )
        ),
        match_report: match_reports (
            report_id, 
            notes, 
            home_team_score, 
            away_team_score, 
            result,
            goals: goals (goal_id, player_id, team_id, assist_player_id, goal_minute, is_own_goal),
            bookings: bookings (booking_id, player_id, team_id, card_type, booking_minute)
        ),
        match_officials: match_officials (
            match_official_id, 
            official_id, 
            role,
            official: officials (first_name, last_name)
        ),
        match_managers: match_managers (
            match_manager_id, 
            team_id, 
            manager_id,
            manager: managers (first_name, last_name)
        ),
        match_rosters: match_rosters (
            match_id, 
            team_id, 
            player_id, 
            jersey_number, 
            position, 
            is_starter, 
            substitution_time,
            player: players (first_name, last_name)
        )
        `
    )
    .eq("match_id", matchId);

  if (error) return res.status(400).json({ error: error.message });
  if (!matches.length)
    return res
      .status(404)
      .json({ error: `Match with ID ${matchId} not found.` });

  res.status(200).json(matches[0]);
};

// Get all matches for a season, used for a fixtures calendar
const getMatchesBySeason = async (req, res) => {
  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      `
        match_id,
        match_date,
        home_team: home_team_id (
          team_id,
          name
        ),
        away_team: away_team_id (
          team_id,
          name
        ),
        venue: venue_id (
          venue_id,
          name
        ),
        season: season_id (
          season_id,
          headline_year,
          league: league_id (
            league_id,
            name
          )
        ),
        match_report: match_reports (
          report_id, 
          home_team_score, 
          away_team_score, 
          result
        ),
        match_officials: match_officials (
          match_official_id, 
          official_id, 
          role,
          official: officials (
            first_name, 
            last_name
          )
        )
      `
    )
    .eq("season_id", req.params.seasonId);

  if (error) return res.status(400).json({ error: error.message });
  if (!matches.length)
    return res
      .status(404)
      .json({ error: `No matches found for season ${req.params.seasonId}.` });

  res.status(200).json(matches);
};

// Get all matches for a team
const getMatchesByTeam = async (req, res) => {
  const { data: matches, error } = await supabase
    .from("matches")
    .select(
      `
        match_id,
        match_date,
        home_team: home_team_id (
          team_id,
          name
        ),
        away_team: away_team_id (
          team_id,
          name
        ),
        venue: venue_id (
          venue_id,
          name
        ),
        season: season_id (
          season_id,
          headline_year,
          league: league_id (
            league_id,
            name
          )
        ),
        match_report: match_reports (
          report_id, 
          home_team_score, 
          away_team_score, 
          result
        ),
        match_officials: match_officials (
          match_official_id, 
          official_id, 
          role,
          official: officials (
            first_name, 
            last_name
          )
        )
      `
    )
    .or(`home_team_id.eq.${req.params.teamId},away_team_id.eq.${req.params.teamId}`);

  if (error) return res.status(400).json({ error: error.message });
  if (!matches.length)
    return res
      .status(404)
      .json({ error: `No matches found for team ${req.params.teamId}.` });

  res.status(200).json(matches);
};


module.exports = { getMatchById, getMatchesBySeason, getMatchesByTeam };
