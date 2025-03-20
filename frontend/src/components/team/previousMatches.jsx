import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const PreviousMatches = ({ matches, reports, teamId }) => {
  return (
    <div className="component-container">
      <Link to={`/fixtures/team/${teamId}`} className="matches-header">
        <h3 className="matches-title">Previous Results</h3>
        <p>View team schedule</p>
      </Link>
      <ul className="matches-list">
        {matches.map((match, index) => {
          const matchDate = new Date(match.match_date); // Parse match_date as Date object
          const isHomeTeam = match.home_team_id === parseInt(teamId);
          const opponentName = isHomeTeam
            ? match.away_team.name
            : match.home_team.name;
          const homeOrAway = isHomeTeam ? "vs" : "@";

          // Find the report for the current match
          const report = reports.find(
            (report) => report.match_id === match.match_id
          );
          const result = report
            ? `${report.home_team_score} - ${report.away_team_score}`
            : "No report";

          let outcome = "";
          let outcomeClass = "";
          if (report) {
            const { result: matchResult } = report;
            if (matchResult === "home_win") {
              outcome = isHomeTeam ? "W" : "L";
              outcomeClass = isHomeTeam ? "win" : "loss";
            } else if (matchResult === "away_win") {
              outcome = isHomeTeam ? "L" : "W";
              outcomeClass = isHomeTeam ? "loss" : "win";
            } else if (matchResult === "draw") {
              outcome = "D";
              outcomeClass = "draw";
            }
          }

          return (
            <Link to={`/matches/${match.match_id}`} key={match.match_id}>
              <li key={index} className="match-item">
                <div className="match-header">
                  <span className="match-date">
                    {matchDate.toLocaleDateString()}{" "}
                    {matchDate.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                  <span className="match-opponent">
                    {homeOrAway} {opponentName}
                  </span>
                </div>
                <div className="match-details">
                  <span className="match-venue">Venue: {match.venue.name}</span>
                  <span className="match-result">
                    Result: {result} (
                    <span className={outcomeClass}>{outcome}</span>)
                  </span>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

PreviousMatches.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      match_date: PropTypes.string.isRequired,
      home_team_id: PropTypes.number.isRequired,
      away_team_id: PropTypes.number.isRequired,
      home_team: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      away_team: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      match_id: PropTypes.number.isRequired,
      home_team_score: PropTypes.number.isRequired,
      away_team_score: PropTypes.number.isRequired,
      result: PropTypes.string, // "home_win", "away_win", or "draw"
    })
  ).isRequired,
  teamId: PropTypes.string.isRequired,
};

export default PreviousMatches;
