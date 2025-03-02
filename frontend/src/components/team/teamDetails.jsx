import PropTypes from "prop-types";

const TeamDetails = ({ team, manager }) => {
  return (
    <div className="component-container">
      <div className="team-details">
        <h1 className="team-name">{team.name}</h1>
        <h2 className="team-overview">Team Overview</h2>
        <img className="team-logo" src={team.logo_url} alt={team.name} />
        <p className="team-info">
          <strong>Nickname:</strong> {team.nickname}
        </p>
        <p className="team-info">
          <strong>Founded:</strong> {team.founded_year}
        </p>
        <p className="team-info">
          <strong>Email:</strong> {team.contact_email}
        </p>
        <p className="team-info">
          <strong>Manager:</strong> {manager.full_name}
        </p>
      </div>
    </div>
  );
};

TeamDetails.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo_url: PropTypes.string.isRequired,
    nickname: PropTypes.string.isRequired,
    founded_year: PropTypes.number.isRequired,
    contact_email: PropTypes.string.isRequired,
  }).isRequired,
  manager: PropTypes.shape({
    full_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TeamDetails;
