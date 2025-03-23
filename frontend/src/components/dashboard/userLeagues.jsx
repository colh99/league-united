import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { getUserLeagues, deleteLeague } from "../../api/userData"; // Import the API calls

const UserLeagues = ({ user }) => {
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
    } catch (error) {
      console.error("Error deleting league:", error);
    }
  };

  return (
    <div className="component-container">
      <h2>Your Leagues</h2>
      {leagues && leagues.length > 0 ? (
        <ul>
          {leagues.map((league) => (
            <li key={league.league_id}>
              {league.name}
              <Link to={`/form/league/${league.league_id}`}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(league.league_id)}>
                Delete
              </button>
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
};

export default UserLeagues;
