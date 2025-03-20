const express = require("express");
const router = express.Router();

const matchesController = require("../controllers/matches");

// get all match data for a single match by id
router.get("/:id", matchesController.getMatchById);

// get all matches for a season, used for a fixtures calendar
router.get("/season/:seasonId", matchesController.getMatchesBySeason);

// get all matches for a team in a season
router.get("/team/:teamId", matchesController.getMatchesByTeam);

module.exports = router;
