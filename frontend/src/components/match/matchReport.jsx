import PropTypes from "prop-types";
import goalIcon from "../../assets/icons/goal-icon.png"; // Adjust the path as needed
import yellowCardIcon from "../../assets/icons/yellow-card-icon.png"; // Adjust the path as needed
import redCardIcon from "../../assets/icons/red-card-icon.png"; // Adjust the path as needed

const MatchReport = ({ match }) => {
  const getPlayerName = (player_id) => {
    const player = match.match_rosters.find(
      (roster) => roster.player_id === player_id
    );
    return player
      ? `${player.player.first_name} ${player.player.last_name}`
      : "Unknown Player";
  };

  const getTeamName = (team_id) => {
    if (team_id === match.home_team.team_id) {
      return match.home_team.name;
    } else if (team_id === match.away_team.team_id) {
      return match.away_team.name;
    }
    return "Unknown Team";
  };

  const matchFacts = [
    ...(match.match_report?.goals.map((goal) => ({
      type: "goal",
      minute: goal.goal_minute,
      icon: goalIcon,
      description: `${goal.goal_minute}' Goal - ${getPlayerName(
        goal.player_id
      )} for ${getTeamName(goal.team_id)} ${
        goal.assist_player_id
          ? ` (assisted by ${getPlayerName(goal.assist_player_id)})`
          : ""
      }`,
    })) || []),
    ...(match.match_report?.bookings.map((booking) => ({
      type: "booking",
      minute: booking.booking_minute,
      icon: booking.card_type === "yellow" ? yellowCardIcon : redCardIcon,
      description: `${booking.booking_minute}' ${
        booking.card_type === "yellow" ? "Yellow" : "Red"
      } Card - ${getPlayerName(booking.player_id)} (${getTeamName(
        booking.team_id
      )})`,
    })) || []),
  ].sort((a, b) => a.minute - b.minute);

  return (
    <div className="component-container">
      {match.match_report && (
        <>
          <h3>Official&apos;s Notes</h3>
          <p>{match.match_report.notes}</p>
          <h3>Match Facts</h3>
          <ul>
            {matchFacts.map((fact, index) => (
              <li key={index}>
                <img src={fact.icon} alt={fact.type} style={{ width: "15px", marginRight: "10px" }} />
                {fact.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

MatchReport.propTypes = {
  match: PropTypes.shape({
    match_rosters: PropTypes.arrayOf(
      PropTypes.shape({
        player_id: PropTypes.number.isRequired,
        player: PropTypes.shape({
          first_name: PropTypes.string.isRequired,
          last_name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    home_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    away_team: PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    match_report: PropTypes.shape({
      home_team_score: PropTypes.number,
      away_team_score: PropTypes.number,
      notes: PropTypes.string,
      goals: PropTypes.arrayOf(
        PropTypes.shape({
          goal_minute: PropTypes.number.isRequired,
          player_id: PropTypes.number.isRequired,
          team_id: PropTypes.number.isRequired,
          assist_player_id: PropTypes.number,
        })
      ),
      bookings: PropTypes.arrayOf(
        PropTypes.shape({
          booking_minute: PropTypes.number.isRequired,
          player_id: PropTypes.number.isRequired,
          card_type: PropTypes.string.isRequired,
        })
      ),
    }),
  }).isRequired,
};

export default MatchReport;