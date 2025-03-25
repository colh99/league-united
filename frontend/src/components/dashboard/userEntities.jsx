import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserEntities = ({ user, setMessage, entityType, fetchEntities, deleteEntity, idField }) => {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEntities(); // Use the fetch function
        setEntities(data);
      } catch (error) {
        console.error(`Error fetching ${entityType}:`, error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, fetchEntities, entityType]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${entityType}? This action cannot be undone.`
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteEntity(id);
      setEntities(entities.filter((entity) => entity[idField] !== id));
      setMessage(`${entityType.charAt(0).toUpperCase() + entityType.slice(1)} deleted successfully.`); // Set the message
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Error deleting ${entityType}:`, error);
      setMessage(`Error deleting ${entityType}.`); // Set the error message
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="sub-component-container">
      <h2>Your {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</h2>
      {entities && entities.length > 0 ? (
        <ul className="dashboard-entity-list">
          {entities.map((entity) => (
            <li key={entity[idField]}>
              <Link to={`/${entityType}/${entity[idField]}`}>
                <div className="entity-info">
                  <h3>{entity.name}</h3>
                  <img src={entity.logo_url} alt={entity.name} />
                </div>
              </Link>
              <div className="button-container">
                <Link to={`/form/${entityType}/${entity[idField]}`}>
                  <button className="edit-button">Edit</button>
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(entity[idField])}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>You do not own any {entityType}</p>
      )}
      <Link to={`/form/${entityType}`}>
        <button>Create New {entityType.charAt(0).toUpperCase() + entityType.slice(1)}</button>
      </Link>
    </div>
  );
};

UserEntities.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    user_metadata: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setMessage: PropTypes.func.isRequired, // Add setMessage prop type
  entityType: PropTypes.string.isRequired, // Add entityType prop type
  fetchEntities: PropTypes.func.isRequired, // Add fetchEntities prop type
  deleteEntity: PropTypes.func.isRequired, // Add deleteEntity prop type
  idField: PropTypes.string.isRequired, // Add idField prop type
};

export default UserEntities;