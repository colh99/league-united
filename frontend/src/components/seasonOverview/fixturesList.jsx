import PropTypes from "prop-types";

const FixturesList = ({ matches, reports, getTeamNameById }) => {
  return (
    <div className="component-container">
      <h3>Fixtures and Results</h3>
      <ul className="fixtures-list">
        {matches.map((match) => {
          const report = reports.find(
            (report) => report.match_id === match.match_id
          );
          const matchDate = new Date(match.match_date);
          return (
            <li key={match.match_id} className="fixture">
              <p className="date">
                {matchDate.toLocaleDateString()}{" "}
                {matchDate.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <div className="teams">
                <p className="home-team">
                  {getTeamNameById(match.home_team_id)}
                </p>
                {report ? (
                  <p className="score">
                    {report.home_team_score} - {report.away_team_score}
                  </p>
                ) : (
                  <p className="score">vs</p>
                )}
                <p className="away-team">
                  {getTeamNameById(match.away_team_id)}
                </p>
              </div>
            </li>
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
      home_team_id: PropTypes.number.isRequired,
      away_team_id: PropTypes.number.isRequired,
    })
  ).isRequired,
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      match_id: PropTypes.number.isRequired,
      home_team_score: PropTypes.number.isRequired,
      away_team_score: PropTypes.number.isRequired,
    })
  ).isRequired,
  getTeamNameById: PropTypes.func.isRequired,
};

export default FixturesList;