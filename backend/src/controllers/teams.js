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

module.exports = { getTeams };
