import PropTypes from "prop-types";
import "../../styles/details.css";

const TeamDetails = ({ team, manager, venue }) => {
  return (
    <div className="component-container">
      <div className="details">
        <h1 className="name">{team?.name || "N/A"}</h1>
        <h2 className="overview">Team Overview</h2>
        <img className="logo" src={team?.logo_url || "default-logo-url"} alt={team?.name || "Team Logo"} />
        <p className="info">
          <strong>Nickname:</strong> {team?.nickname || "N/A"}
        </p>
        <p className="info">
          <strong>Founded:</strong> {team?.founded_year || "N/A"}
        </p>
        <p className="info">
          <strong>Email:</strong> {team?.contact_email || "N/A"}
        </p>
        <p className="info">
          <strong>Manager:</strong> {manager?.full_name || "N/A"}
        </p>
        <p className="info">
          <strong>Venue:</strong> {venue?.venues?.name || "N/A"}
        </p>
      </div>
    </div>
  );
};

TeamDetails.propTypes = {
  team: PropTypes.shape({
    name: PropTypes.string,
    logo_url: PropTypes.string,
    nickname: PropTypes.string,
    founded_year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    contact_email: PropTypes.string,
  }),
  manager: PropTypes.shape({
    full_name: PropTypes.string,
  }),
  venue: PropTypes.shape({
    venues: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default TeamDetails;