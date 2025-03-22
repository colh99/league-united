import PropTypes from 'prop-types';

const MatchOfficials = ({ officials }) => {
  return (
    <div className="component-container match-officials">
      <h3 className="section-title">Officials</h3>
      {officials.length === 0 ? (
        <p>No officials assigned</p>
      ) : (
        <ul className="officials-list">
          {officials.map((official) => (
            <li key={official.match_official_id} className="official-item">
              <span className="official-name">
                {official.official.first_name} {official.official.last_name}
              </span>
              <span className="official-role">{official.role}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MatchOfficials.propTypes = {
  officials: PropTypes.arrayOf(
    PropTypes.shape({
      match_official_id: PropTypes.number.isRequired,
      official: PropTypes.shape({
        first_name: PropTypes.string.isRequired,
        last_name: PropTypes.string.isRequired,
      }).isRequired,
      role: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MatchOfficials;