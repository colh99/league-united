import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserLeagues, deleteLeague } from "../../api/userData"; // Import the API calls

const UserLeagues = ({ user, setMessage }) => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getUserLeagues(); // Use the API call
        setLeagues(data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    if (user) {
      fetchLeagues();
    }
  }, [user]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this league? This will also delete all associated seasons and matches. This action cannot be undone."
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteLeague(id);
      setLeagues(leagues.filter((league) => league.league_id !== id));
      setMessage("League deleted successfully."); // Set the message
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error("Error deleting league:", error);
      setMessage("Error deleting league."); // Set the error message
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="sub-component-container">
      <h2>Your Leagues</h2>
      {leagues && leagues.length > 0 ? (
        <ul className="dashboard-entity-list">
          {leagues.map((league) => (
            <li key={league.league_id}>
              <Link to={`/leagues/${league.league_id}`}>
                <div className="entity-info">
                  <h3>{league.name} </h3>
                  <img src={league.logo_url} alt={league.name} />
                </div>
              </Link>
              <div className="button-container">
                <Link to={`/form/league/${league.league_id}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(league.league_id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You do not own any leagues</p>
      )}
      <Link to="/form/league">
        <button>Create New League</button>
      </Link>
    </div>
  );
};

UserLeagues.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_metadata: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setMessage: PropTypes.func.isRequired, // Add setMessage prop type
};

export default UserLeagues;