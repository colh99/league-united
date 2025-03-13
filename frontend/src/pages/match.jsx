import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchById } from "../api/matches.jsx";
import MatchDetails from "../components/match/matchDetails";
import MatchReport from "../components/match/matchReport";
import MatchOfficials from "../components/match/matchOfficials";
import TeamRosters from "../components/match/matchRosters";
import "../styles/match.css";

function MatchPage() {
  const { match_id } = useParams(); // Get the match_id from the URL
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(match_id); // Use the match_id from the URL
      setMatch(data);
    };

    fetchMatch();
  }, [match_id]); // Add match_id as a dependency

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Match Hub</h1>
        <MatchDetails match={match} />
        <MatchReport match={match} />
        <MatchOfficials officials={match.match_officials} />
        <TeamRosters match={match} />
      </div>
      <Footer />
    </div>
  );
}

export default MatchPage;