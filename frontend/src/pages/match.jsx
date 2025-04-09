import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchById } from "../api/matches.jsx";
import MatchDetails from "../components/match/matchDetails";
import MatchReport from "../components/match/matchReport";
import MatchOfficials from "../components/match/matchOfficials";
import TeamRosters from "../components/match/matchRosters";
import MatchReportForm from "../components/match/matchReportForm"; // Import the form component
import "../styles/match.css";

function MatchPage() {
  const { match_id } = useParams(); // Get the match_id from the URL
  const [match, setMatch] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // State to toggle the form
  const [isOwner, setIsOwner] = useState(false); // State to track ownership

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(match_id); // Use the match_id from the URL
      setMatch(data);

      // Check if the logged-in user is the owner of the match
      const userId = JSON.parse(localStorage.getItem("user"))?.id;
      if (data.user_id === userId) {
        setIsOwner(true);
      }
    };

    fetchMatch();
  }, [match_id]); // Add match_id as a dependency

  const toggleForm = () => {
    setIsFormOpen((prev) => !prev); // Toggle the form visibility
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Match Hub</h1>
        <MatchDetails match={match} />
        {match.match_report && <MatchReport match={match} />}
        {match.match_report && <TeamRosters match={match} />}
        <MatchOfficials officials={match.match_officials} />

        {/* Conditionally render the button and form */}
        {isOwner && !match.match_report && (
          <>
            <button onClick={toggleForm} className="toggle-form-button">
              {isFormOpen ? "Close Match Report Form" : "Submit Match Report"}
            </button>
            {isFormOpen && <MatchReportForm matchId={match_id} />}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default MatchPage;