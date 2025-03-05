import PropTypes from "prop-types";
import "../../styles/details.css";

const TeamDetails = ({ team, manager, venue }) => {
  return (
    <div className="component-container">
      <div className="details">
        <h1 className="name">{team.name}</h1>
        <h2 className="overview">Team Overview</h2>
        <img className="logo" src={team.logo_url} alt={team.name} />
        <p className="info">
          <strong>Nickname:</strong> {team.nickname}
        </p>
        <p className="info">
          <strong>Founded:</strong> {team.founded_year}
        </p>
        <p className="info">
          <strong>Email:</strong> {team.contact_email}
        </p>
        <p className="info">
          <strong>Manager:</strong> {manager.full_name}
        </p>
        <p className="info">
          <strong>Venue:</strong> {venue.venues.name}
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
  venue: PropTypes.shape({
    venues: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TeamDetails;
