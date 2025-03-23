const express = require("express");
const router = express.Router();

const userDataController = require("../controllers/userData");

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

module.exports = router;