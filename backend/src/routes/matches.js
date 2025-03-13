const express = require("express");
const router = express.Router();

const matchesController = require("../controllers/matches");

// get all match data for a single match by id
router.get("/:id", matchesController.getMatchById);

module.exports = router;
