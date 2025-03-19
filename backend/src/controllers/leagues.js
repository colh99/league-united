const supabase = require("../db/supabase");

/* 
A league has many seasons, which are a separate table with a foreign key to the league table.
*/

// Get all leagues
const getAllLeagues = async (req, res) => {
  try {
    const { data, error } = await supabase.from("leagues").select("*");
    if (error) {
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all data for leagues and the list of associated seasons
const getAllSeasons = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("leagues")
      .select(`*, seasons(*)`);
    if (error) {
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* Get all data for a single season overview page, including:
- The league name
- The list of teams in the season
- The list of matches in the season and their match report
*/
const getSeasonOverview = async (req, res) => {
  try {
    // season data
    const { data: seasonData, error: seasonError } = await supabase
      .from("seasons")
      .select("*")
      .eq("season_id", req.params.id)
      .single();
    if (seasonError) {
      throw seasonError;
    }
    // League data for the season
    const { data: leagueData, error: leagueError } = await supabase
      .from("leagues")
      .select("*")
      .eq("league_id", seasonData.league_id)
      .single();
    if (leagueError) {
      throw leagueError;
    }
    // Teams in the league for the season (seasons_teams joint table)
    const { data: teamsData, error: teamsError } = await supabase
      .from("seasons_teams")
      .select(`*, teams(*)`)
      .eq("season_id", req.params.id);
    if (teamsError) {
      throw teamsError;
    }
    // Matches in the season
    const { data: matchesData, error: matchesError } = await supabase
      .from("matches")
      .select(`
        *,
        home_team:home_team_id(name),
        away_team:away_team_id(name)
      `)
      .eq("season_id", req.params.id);
    if (matchesError) {
      throw matchesError;
    }
    // Match reports
    const { data: reportsData, error: reportsError } = await supabase
      .from("match_reports")
      .select("*")
      .in("match_id", matchesData.map((match) => match.match_id));
    if (reportsError) {
      throw reportsError;
    }

    res.status(200).json({
      season: seasonData,
      league: leagueData,
      teams: teamsData,
      matches: matchesData,
      reports: reportsData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all data for a single league page
const getLeagueById = async (req, res) => {
  try {
    // League data
    const { data: leagueData, error: leagueError } = await supabase
      .from("leagues")
      .select("*")
      .eq("league_id", req.params.id)
      .single();
    if (leagueError) {
      throw leagueError;
    }
    // Seasons for the league
    const { data: seasonsData, error: seasonsError } = await supabase
      .from("seasons")
      .select("*")
      .eq("league_id", req.params.id);
    if (seasonsError) {
      throw seasonsError;
    }
    res.status(200).json({
      league: leagueData,
      seasons: seasonsData,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = { getAllLeagues, getAllSeasons, getSeasonOverview, getLeagueById };
