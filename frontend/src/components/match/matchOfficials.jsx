import PropTypes from 'prop-types';

const MatchOfficials = ({ officials, reportNotes }) => {
  return (
    <div className="component-container match-officials">
      <h3 className="section-title">Officials</h3>
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
      <h3 className="section-title">Official&apos;s Notes</h3>
      <p className="notes">{reportNotes}</p>
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
  reportNotes: PropTypes.string,
};

export default MatchOfficials;