import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MatchDetails = ({ match }) => {
  return (
    <div className="component-container">
      <h2 className='competition'>
        <Link to={`/leagues/${match.season.league.league_id}`}>
          {match.season.headline_year} {match.season.league.name}
        </Link>
      </h2>
      <h2 className='match-title'>
        <Link to={`/teams/${match.home_team.team_id}`}>
          {match.home_team.name} 
        </Link> 
        <br></br>
        vs.
        <br></br>
        <Link to={`/teams/${match.away_team.team_id}`}>
          {match.away_team.name}
        </Link>
      </h2>
      <h3 className='date'>{new Date(match.match_date).toLocaleDateString()}</h3>
      <h3 className='date'>{new Date(match.match_date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}</h3>
      <p className='venue'>
          {match.venue.name}
      </p>
    </div>
  );
};

MatchDetails.propTypes = {
  match: PropTypes.shape({
    season: PropTypes.shape({
      headline_year: PropTypes.string.isRequired,
      league: PropTypes.shape({
        league_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    home_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    away_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    match_date: PropTypes.string.isRequired,
    venue: PropTypes.shape({
      id: PropTypes.number.isRequired,
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