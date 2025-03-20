import PropTypes from 'prop-types';

function FixtureItem({ fixture, teamId }) {
  const getResult = () => {
    if (!fixture.match_report) return null;
    const { home_team_score, away_team_score } = fixture.match_report;
    if (teamId) {
      if (fixture.home_team.team_id === parseInt(teamId)) {
        if (home_team_score > away_team_score) return 'W';
        if (home_team_score < away_team_score) return 'L';
        return 'D';
      } else if (fixture.away_team.team_id === parseInt(teamId)) {
        if (away_team_score > home_team_score) return 'W';
        if (away_team_score < home_team_score) return 'L';
        return 'D';
      }
    }
    return null;
  };

  const result = getResult();

  return (
    <div className="fixture-item">
      <h3>{fixture.home_team.name} vs {fixture.away_team.name}</h3>
      <p>Date: {new Date(fixture.match_date).toLocaleDateString()}</p>
      <p>Time: {new Date(fixture.match_date).toLocaleTimeString()}</p>
      <p>Location: {fixture.venue.name}</p>
      {fixture.match_report && (
        <p>Score: {fixture.match_report.home_team_score} - {fixture.match_report.away_team_score} {result && `(${result})`}</p>
      )}
    </div>
  );
}

FixtureItem.propTypes = {
  fixture: PropTypes.shape({
    match_id: PropTypes.number.isRequired,
    match_date: PropTypes.string.isRequired,
    home_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    away_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    venue: PropTypes.shape({
      venue_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    match_report: PropTypes.shape({
      report_id: PropTypes.number,
      home_team_score: PropTypes.number,
      away_team_score: PropTypes.number,
      result: PropTypes.string,
    }),
  }).isRequired,
  teamId: PropTypes.string,
};

export default FixtureItem;