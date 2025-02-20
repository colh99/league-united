import { useEffect, useState } from "react";
import { getTeams } from "../api/teams.jsx"; // Import API function

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      const data = await getTeams();
      console.log(data);
      setTeams(data);
    };

    fetchTeams();
  }, []);

  return (
    <div>
      <h1>All Teams</h1>
      <div>
        {teams.map((entry, index) => (
          <div key={index}>
            <h3>{entry.teams.name}</h3>
            <img
              src={entry.teams.logo_url}
              alt={entry.teams.name}
              width="100"
              height="100"
            />
            <p>
              <strong>Nickname:</strong> {entry.teams.nickname}
            </p>
            <p>
              <strong>Founded:</strong> {entry.teams.founded_year}
            </p>
            <p>
              <strong>Primary Venue:</strong> {entry.venues.name}
            </p>
            <p>
              <strong>Manager:</strong> {entry.teams.manager_name}
            </p>
            <p>
              <strong>Email:</strong> {entry.teams.contact_email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;
