import PropTypes from "prop-types";
import goalIcon from "../../assets/icons/goal-icon.webp"; // Adjust the path as needed
import yellowCardIcon from "../../assets/icons/yellow-card-icon.webp"; // Adjust the path as needed
import redCardIcon from "../../assets/icons/red-card-icon.webp"; // Adjust the path as needed
import subIcon from "../../assets/icons/sub-icon.webp"; // Adjust the path as needed

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
      minuteText: `${goal.goal_minute}'`,
      playerName: getPlayerName(goal.player_id),
      teamName: getTeamName(goal.team_id),
      assistPlayer: goal.assist_player_id
        ? `${getPlayerName(goal.assist_player_id)}`
        : null,
    })) || []),
    ...(match.match_report?.bookings.map((booking) => ({
      type: "booking",
      minute: booking.booking_minute,
      icon: booking.card_type === "yellow" ? yellowCardIcon : redCardIcon,
      minuteText: `${booking.booking_minute}'`,
      cardType: booking.card_type === "yellow" ? "Yellow" : "Red",
      playerName: getPlayerName(booking.player_id),
      teamName: getTeamName(booking.team_id),
    })) || []),
    ...(match.match_rosters
      .filter((roster) => roster.substitution_time !== null)
      .reduce((acc, roster) => {
        const minute = parseInt(roster.substitution_time, 10);
        const existingSub = acc.find((sub) => sub.minute === minute && sub.teamName === getTeamName(roster.team_id));
        if (existingSub) {
          if (roster.is_starter) {
            existingSub.playersOff.push(getPlayerName(roster.player_id));
          } else {
            existingSub.playersOn.push(getPlayerName(roster.player_id));
          }
        } else {
          acc.push({
            type: "substitution",
            minute,
            icon: subIcon,
            minuteText: `${minute}'`,
            teamName: getTeamName(roster.team_id),
            playersOn: roster.is_starter ? [] : [getPlayerName(roster.player_id)],
            playersOff: roster.is_starter ? [getPlayerName(roster.player_id)] : [],
          });
        }
        return acc;
      }, []) || []),
  ].sort((a, b) => {
    if (a.minute === b.minute) {
      if (a.type === "booking") return -1;
      if (b.type === "booking") return 1;
      if (a.type === "substitution") return -1;
      if (b.type === "substitution") return 1;
      return 0;
    }
    return a.minute - b.minute;
  });

  return (
    <div className="component-container">
      {match.match_report ? (
        <>
          <h3 className="result-title">Result</h3>
          <p className="result">
            {match.home_team.name} <strong>{match.match_report.home_team_score} -{" "}
            {match.match_report.away_team_score}</strong> {match.away_team.name}
          </p>
          <h3 className="facts-title">Match Facts</h3>
          <ul className="facts-list">
            {matchFacts.map((fact, index) => (
              <li key={index} className="fact-item">
                <img
                  src={fact.icon}
                  alt={fact.type}
                  className="fact-icon"
                />
                <span className="minute">{fact.minuteText} </span>
                <span className="description">
                  {fact.type === "goal" ? (
                    <>
                      <strong>Goal!</strong>
                      <span className="fact-team-name">{fact.teamName}</span>
                      <span className="nowrap">Scored by <span className="fact-player-name">{fact.playerName}</span></span>
                      {fact.assistPlayer && <> <span className="assist">Assisted by <span className="fact-player-name">{fact.assistPlayer}</span></span></>}
                    </>
                  ) : fact.type === "booking" ? (
                    <>
                      <strong>{fact.cardType} Card</strong>
                      <span className="fact-team-name">{fact.teamName}</span>
                      <span className="fact-player-name">
                        {fact.playerName}
                      </span>
                    </>
                  ) : (
                    <>
                      <strong>Substitution</strong>
                      <span className="fact-team-name">{fact.teamName}</span>
                      <br />
                      <span className="nowrap">On: <span className="fact-player-name">{fact.playersOn.join(", ")}</span></span>
                      <br />
                      <span className="nowrap">Off: <span className="fact-player-name">{fact.playersOff.join(", ")}</span></span>
                    </>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>No report available</p>
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
        substitution_time: PropTypes.string,
        is_starter: PropTypes.bool.isRequired,
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