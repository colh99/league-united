import PropTypes from "prop-types";

const PreviousMatches = ({ matches, teamId }) => {
  return (
    <div className="component-container">
      <h3 className="matches-title">Previous Matches</h3>
      <ul className="matches-list">
        {matches.map((match, index) => {
          const matchDate = new Date(match.match_date); // Parse match_date as Date object
          const isHomeTeam = match.home_team_id === parseInt(teamId);
          const opponentName = isHomeTeam
            ? match.away_team.name
            : match.home_team.name;
          const homeOrAway = isHomeTeam ? "vs" : "@";
          return (
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
              <div className="match-venue">
                Venue: {match.venue.name}
              </div>
            </li>
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
  teamId: PropTypes.string.isRequired,
};

export default PreviousMatches;