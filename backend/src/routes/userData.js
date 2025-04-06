const express = require("express");
const router = express.Router();

const userDataController = require("../controllers/userData");

// DASHBOARD

// Get 4 of each entity for the dashboard
router.get("/dashboard", userDataController.getDashboardEntities);

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


// SEASONS

// Get season by id
router.get("/seasons/:id", userDataController.getSeasonById);

// Create a new season
router.post("/seasons", userDataController.createSeason);

// Update a season
router.put("/seasons/:id", userDataController.updateSeason);

// Delete a season
router.delete("/seasons/:id", userDataController.deleteSeason);


// OFFICIALS

// Get all officials belonging to a given user
router.get("/officials", userDataController.getUserOfficials);

// Get a single official by ID
router.get("/officials/:id", userDataController.getOfficialById);

// Create a new official
router.post("/officials", userDataController.createOfficial);

// Update an official
router.put("/officials/:id", userDataController.updateOfficial);

// Delete an official
router.delete("/officials/:id", userDataController.deleteOfficial);


// MATCHES and SCHEDULE

// Create a full season schedule
router.post("/matches/generateSchedule", userDataController.generateSeasonSchedule);

// Clear a full season schedule
router.delete("/matches/clearSchedule/:seasonId", userDataController.clearSeasonSchedule);

module.exports = router;