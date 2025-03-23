const supabase = require("../db/supabase");

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

module.exports = {
  getUserLeagues,
  getLeagueById,
  createLeague,
  updateLeague,
  deleteLeague,
};