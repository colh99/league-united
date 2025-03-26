import PropTypes from "prop-types";

const Roster = ({ roster }) => {
  // Define the order of positions
  const positionOrder = ["Forward", "Midfielder", "Defender", "Goalkeeper"];

  // Sort the roster by the defined order of positions
  const sortedRoster = roster.sort(
    (a, b) =>
      positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  return (
    <div className="component-container">
      <h3 className="roster-title">Roster</h3>
      {sortedRoster.length > 0 ? (
        <ul className="roster-list">
          {sortedRoster.map((player, index) => (
            <li key={index} className="roster-item">
              <span className="roster-number">#{player.jersey_number}</span>
              <span className="roster-name">
                {player.players.first_name} <span className="roster-last-name">{player.players.last_name}</span>
                {player.players.known_as && (
                  <span className="roster-known-as">({player.players.known_as})</span>
                )}
              </span>
              <span className="roster-position">{player.position}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No players in the roster.</p>
      )}
    </div>
  );
};

Roster.propTypes = {
  roster: PropTypes.arrayOf(
    PropTypes.shape({
      position: PropTypes.string.isRequired,
      jersey_number: PropTypes.number.isRequired,
      players: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
        known_as: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
};

export default Roster;