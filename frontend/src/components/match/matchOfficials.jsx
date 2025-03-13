import PropTypes from 'prop-types';

const MatchOfficials = ({ officials }) => {
  return (
    <div className="component-container">
      <h3>Officials</h3>
      <ul>
        {officials.map((official) => (
          <li key={official.match_official_id}>
            {official.official.first_name} {official.official.last_name} -{" "}
            {official.role}
          </li>
        ))}
      </ul>
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