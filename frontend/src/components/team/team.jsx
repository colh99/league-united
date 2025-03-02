import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById } from "../../api/teams.jsx";
import TeamDetails from "./teamDetails";
import Roster from "./roster";
import PreviousMatches from "./previousMatches.jsx";
import "../../styles/team.css";

// Team page for a single team

const Team = () => {
  const { team_id } = useParams(); // Get the team_id from the URL
  const [team, setTeam] = useState(null);

  useEffect(() => {
    const fetchTeam = async () => {
      const data = await getTeamById(team_id); // Use the team_id from the URL
      setTeam(data);
    };

    fetchTeam();
  }, [team_id]); // Add team_id as a dependency

  if (!team) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <TeamDetails team={team.team} manager={team.manager} />
      <PreviousMatches matches={team.previousMatches} teamId={team_id} />
      <Roster roster={team.roster} />
    </div>
  );
};

export default Team;