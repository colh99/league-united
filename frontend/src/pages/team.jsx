import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamById } from "../api/teams.jsx";
import TeamDetails from "../components/team/teamDetails";
import Roster from "../components/team/roster";
import FixturesResults from "../components/team/fixturesResults.jsx";
import "../styles/team.css";

function TeamPage() {
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
    <div>
      <Header />
        <div className="container">
              <TeamDetails team={team.team} manager={team.manager} venue={team.primaryVenue} />
              <FixturesResults matches={team.previousMatches} teamId={team_id} reports={team.match_reports} />
              <Roster roster={team.roster} />
            </div>
      <Footer />
    </div>
  );
}

export default TeamPage;
