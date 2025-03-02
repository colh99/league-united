const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teams");

// get all teams
router.get("/", teamsController.getTeams);

// get team by id for team page
router.get("/:team_id", teamsController.getTeamById);

module.exports = router;