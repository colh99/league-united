import PropTypes from "prop-types";
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
    const events = [];

    match.match_report.goals.forEach((goal) => {
      if (goal.player_id === player_id) {
        events.push({ time: goal.goal_minute, icon: goalIcon });
      }
      if (goal.assist_player_id === player_id) {
        events.push({ time: goal.goal_minute, icon: assistIcon });
      }
    });

    match.match_report.bookings.forEach((booking) => {
      if (booking.player_id === player_id) {
        events.push({
          time: booking.booking_minute,
          icon: booking.card_type === "yellow" ? yellowCardIcon : redCardIcon,
        });
      }
    });

    match.match_rosters.forEach((roster) => {
      if (roster.player_id === player_id && roster.substitution_time !== null) {
        events.push({
          time: roster.substitution_time,
          icon: is_starter ? subOffIcon : subOnIcon,
        });
      }
    });

    events.sort((a, b) => a.time - b.time);

    return events.map((event) => event.icon);
  };

  const renderTeamRoster = (teamRoster, teamName, teamId) => {
    const starters = teamRoster.filter((roster) => roster.is_starter);
    const substitutes = teamRoster.filter((roster) => !roster.is_starter);

    return (
      <div className="team-roster">
        <h4 className="team-name">{teamName}</h4>
        <h5 className="roster-section-title">Starters</h5>
        <ul className="roster-list">
          {starters.map((roster) => (
            <li
              key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}
              className="roster-item"
            >
              <span className="jersey-number">#{roster.jersey_number}</span>
              <span className="player-name">
                {roster.player.first_name}{" "}
                <strong>{roster.player.last_name}</strong>
                {getPlayerIcons(roster.player_id, true).map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    alt="icon"
                    className="event-icon"
                  />
                ))}
              </span>
              <span className="player-position">{roster.position}</span>
            </li>
          ))}
        </ul>
        <h5 className="roster-section-title">Substitutes</h5>
        <ul className="roster-list">
          {substitutes.map((roster) => (
            <li
              key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}
              className="roster-item"
            >
              <span className="jersey-number">#{roster.jersey_number}</span>
              <span className="player-name">
                {roster.player.first_name}{" "}
                <strong>{roster.player.last_name}</strong>
                {getPlayerIcons(roster.player_id, false).map((icon, index) => (
                  <img
                    key={index}
                    src={icon}
                    alt="icon"
                    className="event-icon"
                  />
                ))}
              </span>
              <span className="player-position">{roster.position}</span>
            </li>
          ))}
        </ul>
        {match.match_managers
          .filter((manager) => manager.team_id === teamId)
          .map((manager) => (
            <li key={manager.match_manager_id} className="manager-item">
              Manager: {manager.manager.first_name} {manager.manager.last_name}
            </li>
          ))}
      </div>
    );
  };

  return (
    <div className="component-container">
      <h3>Team Lineups</h3>
      <div className="rosters-container">
        {renderTeamRoster(
          homeTeamRoster,
          match.home_team.name,
          match.home_team.team_id
        )}
        {renderTeamRoster(
          awayTeamRoster,
          match.away_team.name,
          match.away_team.team_id
        )}
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
        substitution_time: PropTypes.number,
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
          goal_minute: PropTypes.number.isRequired,
        })
      ),
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          player_id: PropTypes.number.isRequired,
          card_type: PropTypes.string.isRequired,
          booking_minute: PropTypes.number.isRequired,
        })
      ),
    }).isRequired,
  }).isRequired,
};

export default TeamRosters;
