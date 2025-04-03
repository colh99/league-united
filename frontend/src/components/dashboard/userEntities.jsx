import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserEntities = ({ user, setMessage, entityType, entityTypeSingular, fetchEntities, deleteEntity, idField }) => {
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
                  <h3>
                    {entityType === "officials"
                      ? `${entity.first_name} ${entity.last_name}` // Combine first and last name for officials
                      : entity.name} {/* Use name for other entity types */}
                  </h3>
                  {entity.logo_url && ( // Only render the image if logo_url exists
                    <img src={entity.logo_url} alt={entity.name} />
                  )}
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
        <p>You do not manage any {entityType}</p>
      )}
      <Link to={`/form/${entityType}`}>
        <button>Create New {entityTypeSingular.charAt(0).toUpperCase() + entityTypeSingular.slice(1)}</button>
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
  setMessage: PropTypes.func.isRequired, 
  entityType: PropTypes.string.isRequired, 
  entityTypeSingular: PropTypes.string.isRequired, 
  fetchEntities: PropTypes.func.isRequired, 
  deleteEntity: PropTypes.func.isRequired, 
  idField: PropTypes.string.isRequired,
};

export default UserEntities;