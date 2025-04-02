import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import FixturesList from "../components/fixtures/fixturesList";
import ScheduleForm from "../components/fixtures/scheduleForm"; // Import the form component
import { getTeamById } from "../api/teams";
import { getSeasonOverview } from "../api/leagues";

function FixturesPage() {
  const { seasonId, teamId } = useParams();
  const location = useLocation();
  const [header, setHeader] = useState("");
  const [isOwner, setIsOwner] = useState(false); // State to track ownership
  const [showScheduleForm, setShowScheduleForm] = useState(false); // State to toggle form visibility
  const [seasonOverview, setSeasonOverview] = useState(null); // Store season details
  const isTeamPage = location.pathname.includes("/team/");

  useEffect(() => {
    const fetchHeaderAndOwnership = async () => {
      try {
        if (isTeamPage && teamId) {
          const teamDetails = await getTeamById(teamId);
          setHeader(teamDetails.team.name);
        } else if (seasonId) {
          const seasonDetails = await getSeasonOverview(seasonId);
          setHeader(
            seasonDetails.season.headline_year +
              " " +
              seasonDetails.league.name +
              " Season"
          );
          setSeasonOverview({
            ...seasonDetails.season,
            teams: seasonDetails.teams, // Include the teams array
          });

          // Check if the user owns the season
          const userId = JSON.parse(localStorage.getItem("user"))?.id;
          if (seasonDetails.season.user_id === userId) {
            setIsOwner(true);
          }
        }
      } catch (err) {
        console.error("Failed to fetch header or ownership details:", err);
      }
    };

    fetchHeaderAndOwnership();
  }, [seasonId, teamId, isTeamPage]);

  const handleGenerateScheduleClick = () => {
    setShowScheduleForm((prev) => !prev); // Toggle the form visibility
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Fixtures</h1>
        <h2>{header}</h2>
        {!isTeamPage && isOwner && (
          <div className="create-schedule-button">
            <button onClick={handleGenerateScheduleClick}>
              {showScheduleForm
                ? "Hide Schedule Form"
                : "Generate Season Schedule"}
            </button>
          </div>
        )}
        {showScheduleForm && seasonOverview && (
          <ScheduleForm
            seasonOverview={{
              ...seasonOverview, // Spread the season details
            }}
            onSubmit={(scheduleData) => {
              console.log("Schedule Data Submitted:", scheduleData);
              setShowScheduleForm(false); // Optionally hide the form after submission
            }}
          />
        )}
        {isTeamPage ? (
          <FixturesList teamId={teamId} />
        ) : (
          <FixturesList seasonId={seasonId} />
        )}
      </div>
      <Footer />
    </div>
  );
}

FixturesPage.propTypes = {
  seasonId: PropTypes.string,
  teamId: PropTypes.string,
};

export default FixturesPage;
