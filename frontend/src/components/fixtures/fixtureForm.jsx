import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createMatch, updateMatch } from "../../api/userData";

const FixtureForm = ({ matchData, teams, season_id, onSubmit, onCancel }) => {
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");

  // Initialize form state with matchData when editing
  useEffect(() => {
    if (matchData) {
      setHomeTeam(matchData.home_team?.team_id || ""); // Extract nested home_team.team_id
      setAwayTeam(matchData.away_team?.team_id || ""); // Extract nested away_team.team_id
      setMatchDate(matchData.match_date ? matchData.match_date.split("T")[0] : "");
      setMatchTime(matchData.match_date ? matchData.match_date.split("T")[1] : "");
    } else {
      // Reset fields when adding a new match
      setHomeTeam("");
      setAwayTeam("");
      setMatchDate("");
      setMatchTime("");
    }
  }, [matchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (homeTeam === awayTeam) {
      alert("Home and away teams cannot be the same.");
      return;
    }

    const matchDetails = {
      home_team_id: homeTeam,
      away_team_id: awayTeam,
      match_date: matchDate,
      match_time: matchTime,
      season_id: matchData?.season_id || season_id, // Use season_id from matchData or props
    };

    try {
      if (matchData) {
        // Update existing match
        await updateMatch(matchData.match_id, matchDetails);
      } else {
        // Create new match
        await createMatch(matchDetails);
      }
      onSubmit(matchDetails);
      window.location.reload(); // Reload the page after successful submission
    } catch (error) {
      console.error("Error submitting match:", error);
      alert("Failed to submit match. Please try again.");
    }
  };

  return (
    <div className="component-container">
      <form onSubmit={handleSubmit}>
        <h2>{matchData ? "Edit Match" : "Add Match"}</h2>

        <div>
          <label htmlFor="homeTeam">Home Team:</label>
          <select
            id="homeTeam"
            value={homeTeam}
            onChange={(e) => setHomeTeam(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Home Team
            </option>
            {teams.map((team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.teams.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="awayTeam">Away Team:</label>
          <select
            id="awayTeam"
            value={awayTeam}
            onChange={(e) => setAwayTeam(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Away Team
            </option>
            {teams.map((team) => (
              <option key={team.team_id} value={team.team_id}>
                {team.teams.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="matchDate">Match Date:</label>
          <input
            type="date"
            id="matchDate"
            value={matchDate}
            onChange={(e) => setMatchDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="matchTime">Match Time:</label>
          <input
            type="time"
            id="matchTime"
            value={matchTime}
            onChange={(e) => setMatchTime(e.target.value)}
            required
          />
        </div>

        <div>
          <button type="submit">
            {matchData ? "Save Changes" : "Add Match"}
          </button>
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FixtureForm;

FixtureForm.propTypes = {
  matchData: PropTypes.shape({
    match_id: PropTypes.string,
    home_team: PropTypes.shape({
      team_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    away_team: PropTypes.shape({
      team_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    match_date: PropTypes.string,
    season_id: PropTypes.string, // Include season_id in matchData
  }),
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      team_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      teams: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  season_id: PropTypes.string.isRequired, // Ensure season_id is required
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};