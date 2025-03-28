const express = require("express");
const router = express.Router();

const userDataController = require("../controllers/userData");

// LEAGUES

// Get all leagues belonging to a given user
router.get("/leagues", userDataController.getUserLeagues);

// Get a single league by ID
router.get("/leagues/:id", userDataController.getLeagueById);

// Create a new league
router.post("/leagues", userDataController.createLeague);

// Update a league
router.put("/leagues/:id", userDataController.updateLeague);

// Delete a league
router.delete("/leagues/:id", userDataController.deleteLeague);

// TEAMS

// Get all teams belonging to a given user
router.get("/teams", userDataController.getUserTeams);

// Get a single team by ID
router.get("/teams/:id", userDataController.getTeamById);

// Create a new team
router.post("/teams", userDataController.createTeam);

// Update a team
router.put("/teams/:id", userDataController.updateTeam);

// Delete a team
router.delete("/teams/:id", userDataController.deleteTeam);

module.exports = router;