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

// route to matches
router.use("/matches", require("./matches"));

// route to userData
router.use("/userData", require("./userData"));

module.exports = router;