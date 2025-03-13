import PropTypes from 'prop-types';

const TeamRosters = ({ match }) => {
  const positionOrder = {
    Forward: 1,
    Midfielder: 2,
    Defender: 3,
    Goalkeeper: 4,
    Substitute: 5,
  };

  const sortRosterByPosition = (roster) => {
    return roster.sort((a, b) => {
      const positionA = positionOrder[a.position] || positionOrder.Substitute;
      const positionB = positionOrder[b.position] || positionOrder.Substitute;
      return positionA - positionB;
    });
  };

  const homeTeamRoster = sortRosterByPosition(
    match.match_rosters.filter(
      (roster) => roster.team_id === match.home_team.team_id
    )
  );

  const awayTeamRoster = sortRosterByPosition(
    match.match_rosters.filter(
      (roster) => roster.team_id === match.away_team.team_id
    )
  );

  const renderTeamRoster = (teamRoster, teamName, teamId) => (
    <div className="team-roster">
      <h4>{teamName}</h4>
      <ul>
        {teamRoster.map((roster) => (
          <li key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}>
            #{roster.jersey_number} {roster.player.first_name} <strong>{roster.player.last_name}</strong> - {roster.position}
          </li>
        ))}
        {match.match_managers
          .filter((manager) => manager.team_id === teamId)
          .map((manager) => (
            <li key={manager.match_manager_id}>
              Manager: {manager.manager.first_name} {manager.manager.last_name}
            </li>
          ))}
      </ul>
    </div>
  );

  return (
    <div className="component-container">
      <h3>Team Lineups</h3>
      <div className="rosters">
        {renderTeamRoster(homeTeamRoster, match.home_team.name, match.home_team.team_id)}
        {renderTeamRoster(awayTeamRoster, match.away_team.name, match.away_team.team_id)}
      </div>
    </div>
  );
};

TeamRosters.propTypes = {
  match: PropTypes.shape({
    match_rosters: PropTypes.arrayOf(
      PropTypes.shape({
        match_id: PropTypes.number.isRequired,
        team_id: PropTypes.number.isRequired,
        player_id: PropTypes.number.isRequired,
        jersey_number: PropTypes.number.isRequired,
        player: PropTypes.shape({
          last_name: PropTypes.string.isRequired,
          first_name: PropTypes.string.isRequired,
        }).isRequired,
        position: PropTypes.string.isRequired,
      })
    ).isRequired,
    home_team: PropTypes.shape({
      name: PropTypes.string.isRequired,
      team_id: PropTypes.number.isRequired,
    }).isRequired,
    away_team: PropTypes.shape({
      name: PropTypes.string.isRequired,
      team_id: PropTypes.number.isRequired,
    }).isRequired,
    match_managers: PropTypes.arrayOf(
      PropTypes.shape({
        match_manager_id: PropTypes.number.isRequired,
        team_id: PropTypes.number.isRequired,
        manager: PropTypes.shape({
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default TeamRosters;