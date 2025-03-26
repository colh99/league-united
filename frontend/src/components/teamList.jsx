import { useEffect, useState } from "react";
import { getTeams } from "../api/teams.jsx"; // Import API function
import { Link } from "react-router-dom";

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeams();
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return (
    <div className="component-container">
      <div>
        {teams.map((entry, index) => (
          <div key={index}>
            <h3><Link to={`/teams/${entry.team_id}`}>{entry.name}</Link></h3>
            <img
              src={entry.logo_url}
              alt={entry.name}
              width="100"
              height="100"
            />
            <p>
              <strong>Nickname:</strong> {entry.nickname || "N/A"}
            </p>
            <p>
              <strong>Founded:</strong> {entry.founded_year || "N/A"}
            </p>
            <p>
              <strong>Primary Venue:</strong> {entry.teams_venues[0]?.venues.name || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {entry.contact_email || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;