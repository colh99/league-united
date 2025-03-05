const express = require("express");
const router = express.Router();

const leaguesController = require("../controllers/leagues");

// get all leagues
router.get("/", leaguesController.getAllLeagues);

// get all seasons for all leagues
router.get("/seasons", leaguesController.getAllSeasons);

// get all data for a single season overview page
router.get("/seasons/:id", leaguesController.getSeasonOverview);

// get all data for a single league page
router.get("/:id", leaguesController.getLeagueById);


module.exports = router;