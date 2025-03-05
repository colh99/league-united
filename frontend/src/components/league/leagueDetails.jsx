import PropTypes from "prop-types";
import "../../styles/details.css";

const LeagueDetails = ({ league }) => {
  return (
    <div className="component-container">
      <div className="details">
        <h1 className="name">{league.name}</h1>
        <h2 className="overview">League Overview</h2>
        <img className="logo" src={league.logo_url} alt={league.name} />
        <p className="info">
          <strong>Founded:</strong> {league.founded_year}
        </p>
        <p className="info">{league.description}</p>
      </div>
    </div>
  );
};

export default LeagueDetails;

LeagueDetails.propTypes = {
  league: PropTypes.shape({
    name: PropTypes.string.isRequired,
    logo_url: PropTypes.string.isRequired,
    founded_year: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
