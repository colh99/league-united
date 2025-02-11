const express = require("express");
const router = express.Router();

const leaguesController = require("../controllers/leagues");

// get all teams
router.get("/", leaguesController.getLeagues);


module.exports = router;