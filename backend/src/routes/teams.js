const express = require("express");
const router = express.Router();

const teamsController = require("../controllers/teams");

// get all teams
router.get("/", teamsController.getTeams);


module.exports = router;