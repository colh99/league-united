const express = require("express");
const router = express.Router();


// route to test (temporary)
router.get("/", (req, res) => {
  res.json([{ message: "API Working" }]); // Returned as an array
});

// route to teams
router.use("/teams", require("./teams"));

// route to leagues
router.use("/leagues", require("./leagues"));

module.exports = router;