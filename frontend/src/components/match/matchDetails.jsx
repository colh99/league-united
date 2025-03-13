import PropTypes from 'prop-types';

const MatchDetails = ({ match }) => {
  return (
    <div className="component-container">
      <h2>
        {match.season.headline_year} {match.season.league.name}
      </h2>
      <h2>
        {match.home_team.name} vs. {match.away_team.name}
      </h2>
      <h3>{new Date(match.match_date).toLocaleDateString()}</h3>
      <p>{match.venue.name}</p>
      {match.match_report && (
        <>
          <h3>Score</h3>
          <p>
            {match.match_report.home_team_score} -{" "}
            {match.match_report.away_team_score}
          </p>
        </>
      )}
    </div>
  );
};

MatchDetails.propTypes = {
  match: PropTypes.shape({
    season: PropTypes.shape({
      headline_year: PropTypes.string.isRequired,
      league: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    home_team: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    away_team: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    match_date: PropTypes.string.isRequired,
    venue: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    match_report: PropTypes.shape({
      home_team_score: PropTypes.number,
      away_team_score: PropTypes.number,
      notes: PropTypes.string,
    }),
  }).isRequired,
};

export default MatchDetails;