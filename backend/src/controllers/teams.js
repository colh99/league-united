const supabase = require("../db/supabase");

// Get all teams
const getTeams = async (req, res) => {
  const { data, error } = await supabase.from("teams").select("*");
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

module.exports = { getTeams };