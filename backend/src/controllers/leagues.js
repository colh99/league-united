const supabase = require("../db/supabase");

// Get all leagues
const getLeagues = async (req, res) => {
  const { data, error } = await supabase.from("leagues").select("*");
  if (error) {
    res.status(400).json({ error: error.message });
  } else {
    res.status(200).json(data);
  }
};

module.exports = { getLeagues };
