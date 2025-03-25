import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FixturesList = ({ matches, reports, seasonId }) => {
  return (
    <div className="sub-component-container">
      <Link to={`/fixtures/season/${seasonId}`} className="fixtures-header">
        <h3>Fixtures and Results</h3>
        <p>View season schedule</p>
      </Link>
      <ul className="fixtures-list">
        {matches.map((match) => {
          const report = reports.find(
            (report) => report.match_id === match.match_id
          );
          const matchDate = new Date(match.match_date);
          const homeTeamName = match.home_team ? match.home_team.name : "Unknown";
          const awayTeamName = match.away_team ? match.away_team.name : "Unknown";

          return (
            <Link to={`/matches/${match.match_id}`} key={match.match_id}>
              <li key={match.match_id} className="fixture">
                <p className="date">
                  {matchDate.toLocaleDateString()}{" "}
                  {matchDate.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>
                <div className="teams">
                  <p className="home-team">{homeTeamName}</p>
                  {report ? (
                    <p className="score">
                      {report.home_team_score} - {report.away_team_score}
                    </p>
                  ) : (
                    <p className="score">vs</p>
                  )}
                  <p className="away-team">{awayTeamName}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

FixturesList.propTypes = {
  matches: PropTypes.arrayOf(
    PropTypes.shape({
      match_id: PropTypes.number.isRequired,
      match_date: PropTypes.string.isRequired,
      home_team: PropTypes.shape({
        name: PropTypes.string,
      }),
      away_team: PropTypes.shape({
        name: PropTypes.string,
      }),
    })
  ).isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      match_id: PropTypes.number.isRequired,
      home_team_score: PropTypes.number.isRequired,
      away_team_score: PropTypes.number.isRequired,
    })
  ).isRequired,
  seasonId: PropTypes.string,
};

export default FixturesList;