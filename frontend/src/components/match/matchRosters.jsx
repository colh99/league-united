import PropTypes from 'prop-types';
import goalIcon from "../../assets/icons/goal-icon.webp"; // Adjust the path as needed
import yellowCardIcon from "../../assets/icons/yellow-card-icon.webp"; // Adjust the path as needed
import redCardIcon from "../../assets/icons/red-card-icon.webp"; // Adjust the path as needed
import assistIcon from "../../assets/icons/assist-icon.webp"; // Adjust the path as needed
import subOnIcon from "../../assets/icons/sub-on-icon.webp"; // Adjust the path as needed
import subOffIcon from "../../assets/icons/sub-off-icon.webp"; // Adjust the path as needed

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

  const getPlayerIcons = (player_id, is_starter) => {
    const icons = [];

    match.match_report.goals.forEach((goal) => {
      if (goal.player_id === player_id) {
        icons.push(goalIcon);
      }
      if (goal.assist_player_id === player_id) {
        icons.push(assistIcon);
      }
    });

    match.match_report.bookings.forEach((booking) => {
      if (booking.player_id === player_id) {
        icons.push(booking.card_type === "yellow" ? yellowCardIcon : redCardIcon);
      }
    });

    match.match_rosters.forEach((roster) => {
      if (roster.player_id === player_id && roster.substitution_time !== null) {
        icons.push(is_starter ? subOffIcon : subOnIcon);
      }
    });

    return icons;
  };

  const renderTeamRoster = (teamRoster, teamName, teamId) => {
    const starters = teamRoster.filter((roster) => roster.is_starter);
    const substitutes = teamRoster.filter((roster) => !roster.is_starter);

    return (
      <div className="team-roster">
        <h4>{teamName}</h4>
        <h5>Starters</h5>
        <ul>
          {starters.map((roster) => (
            <li key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}>
              #{roster.jersey_number} {roster.player.first_name} <strong>{roster.player.last_name}</strong> - {roster.position}
              {getPlayerIcons(roster.player_id, true).map((icon, index) => (
                <img key={index} src={icon} alt="icon" style={{ width: "15px", marginLeft: "5px" }} />
              ))}
            </li>
          ))}
        </ul>
        <h5>Substitutes</h5>
        <ul>
          {substitutes.map((roster) => (
            <li key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}>
              #{roster.jersey_number} {roster.player.first_name} <strong>{roster.player.last_name}</strong> - {roster.position}
              {getPlayerIcons(roster.player_id, false).map((icon, index) => (
                <img key={index} src={icon} alt="icon" style={{ width: "15px", marginLeft: "5px" }} />
              ))}
            </li>
          ))}
        </ul>
        {match.match_managers
          .filter((manager) => manager.team_id === teamId)
          .map((manager) => (
            <li key={manager.match_manager_id}>
              Manager: {manager.manager.first_name} {manager.manager.last_name}
            </li>
          ))}
      </div>
    );
  };

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
        is_starter: PropTypes.bool.isRequired,
        substitution_time: PropTypes.string,
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
    match_report: PropTypes.shape({
      goals: PropTypes.arrayOf(
        PropTypes.shape({
          player_id: PropTypes.number.isRequired,
          assist_player_id: PropTypes.number,
        })
      ),
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          player_id: PropTypes.number.isRequired,
          card_type: PropTypes.string.isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default TeamRosters;