import { useState } from "react";
import PropTypes from "prop-types";
import { createMatchReport } from "../../api/userData.jsx"; // Import the API for submitting match reports

function MatchReportForm({ matchId }) {
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reportData = {
        match_id: matchId,
        home_team_score: homeScore,
        away_team_score: awayScore,
      };
      await createMatchReport(reportData); // Call the API to submit the match report
      alert("Match report submitted successfully!");
      window.location.reload(); // Reload the page to reflect the changes
    } catch (error) {
      console.error("Error submitting match report:", error);
      alert("Failed to submit match report. Please try again.");
    }
  };

  return (
    <div className="component-container">
      <h2>Submit Match Report</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="homeScore">Home Team Score:</label>
          <input
            type="number"
            min="0"
            id="homeScore"
            value={homeScore}
            onChange={(e) => setHomeScore(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="awayScore">Away Team Score:</label>
          <input
            type="number"
            min="0"
            id="awayScore"
            value={awayScore}
            onChange={(e) => setAwayScore(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

MatchReportForm.propTypes = {
  matchId: PropTypes.string.isRequired,
};

export default MatchReportForm;