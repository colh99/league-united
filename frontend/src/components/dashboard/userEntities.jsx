import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UserEntities = ({ setMessage, entityType, entityTypeSingular, entities, deleteEntity, idField, fetchEntities }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [allEntities, setAllEntities] = useState(entities); // Default to the initial entities
  const [loading, setLoading] = useState(false);

  const handleExpand = async () => {
    if (!isExpanded) {
      // Only fetch data if it hasn't been fetched yet
      if (allEntities.length === 0) {
        setLoading(true);
        try {
          const fetchedEntities = await fetchEntities(); // Fetch all entities
          setAllEntities(fetchedEntities);
        } catch (error) {
          console.error(`Error fetching ${entityType}:`, error);
          setMessage(`Error fetching ${entityType}.`);
        } finally {
          setLoading(false);
        }
      }
    }
    setIsExpanded(!isExpanded); // Toggle the expanded state
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this ${entityTypeSingular}? This action cannot be undone.`
    );
    if (!confirmed) {
      return;
    }

    try {
      await deleteEntity(id);
      setMessage(`${entityTypeSingular.charAt(0).toUpperCase() + entityTypeSingular.slice(1)} deleted successfully.`);
      setAllEntities((prevEntities) => prevEntities.filter((entity) => entity[idField] !== id)); // Remove deleted entity
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    } catch (error) {
      console.error(`Error deleting ${entityTypeSingular}:`, error);
      setMessage(`Error deleting ${entityTypeSingular}.`);
      // Clear the message after 7 seconds
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  };

  return (
    <div className="sub-component-container">
      <div className="header-container" onClick={handleExpand}>
        <h2 className="entity-header">
          Your {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
        </h2>
        <button className="expand-button">{isExpanded ? "Collapse" : "View All and Edit"}</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : isExpanded ? (
        allEntities && allEntities.length > 0 ? (
          <ul className="dashboard-entity-list">
            {allEntities.map((entity) => (
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
        )
      ) : (
        // Simpler list view when collapsed
        <ul className="dashboard-simple-list">
          {entities.map((entity) => (
            <li key={entity[idField]}>
              <Link to={`/${entityType}/${entity[idField]}`}>
                {entityType === "officials"
                  ? `${entity.first_name} ${entity.last_name}` // Combine first and last name for officials
                  : entity.name} {/* Use name for other entity types */}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link to={`/form/${entityType}`}>
        <button>Create New {entityTypeSingular.charAt(0).toUpperCase() + entityTypeSingular.slice(1)}</button>
      </Link>
    </div>
  );
};

UserEntities.propTypes = {
  setMessage: PropTypes.func.isRequired,
  entityType: PropTypes.string.isRequired,
  entityTypeSingular: PropTypes.string.isRequired,
  entities: PropTypes.arrayOf(PropTypes.object).isRequired, // Entities are passed as a prop
  deleteEntity: PropTypes.func.isRequired,
  idField: PropTypes.string.isRequired,
  fetchEntities: PropTypes.func.isRequired, // Function to fetch all entities
};

export default UserEntities;