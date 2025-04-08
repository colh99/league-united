import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import FixturesList from "../components/fixtures/fixturesList";
import ScheduleForm from "../components/fixtures/scheduleForm";
import FixtureForm from "../components/fixtures/fixtureForm";
import { getTeamById } from "../api/teams";
import { getSeasonOverview } from "../api/leagues";
import { clearSeasonSchedule, deleteMatch } from "../api/userData";

function FixturesPage() {
  const { seasonId, teamId } = useParams();
  const location = useLocation();
  const [header, setHeader] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [showFixtureForm, setShowFixtureForm] = useState(false);
  const [selectedMatchData, setSelectedMatchData] = useState(null);
  const [seasonOverview, setSeasonOverview] = useState(null);
  const isTeamPage = location.pathname.includes("/team/");
  const formRef = useRef(null); // Ref for the form container

  useEffect(() => {
    const fetchHeaderAndOwnership = async () => {
      try {
        if (isTeamPage && teamId) {
          const teamDetails = await getTeamById(teamId);
          setHeader(teamDetails.team.name);
        } else if (seasonId) {
          const seasonDetails = await getSeasonOverview(seasonId);
          setHeader(
            `${seasonDetails.season.headline_year} ${seasonDetails.league.name} Season`
          );
          setSeasonOverview({
            ...seasonDetails.season,
            teams: seasonDetails.teams,
            venues: seasonDetails.venues,
          });

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
    setShowScheduleForm((prev) => !prev);
    setShowFixtureForm(false);
  };

  const handleClearScheduleClick = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the schedule? This action cannot be undone."
      )
    ) {
      clearSeasonSchedule(seasonId)
        .then(() => {
          alert("Schedule cleared successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error clearing schedule:", error);
          alert("Failed to clear schedule. Please try again.");
        });
    }
  };

  const handleAddMatchClick = () => {
    setSelectedMatchData(null);
    setShowFixtureForm(true);
    setShowScheduleForm(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  const handleEditMatchClick = (matchData) => {
    setSelectedMatchData(matchData);
    setShowFixtureForm(true);
    setShowScheduleForm(false);
    formRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the form
  };

  const handleDeleteMatchClick = (matchId) => {
    if (window.confirm("Are you sure you want to delete this match?")) {
      console.log("Deleting match with ID:", matchId);
      // Call the API to delete the match
      deleteMatch(matchId)
        .then(() => {
          alert("Match deleted successfully!");
          window.location.reload(); // Reload the page after deletion
        })
        .catch((error) => {
          console.error("Error deleting match:", error);
          alert("Failed to delete match. Please try again.");
        });
    }
  };

  const handleFixtureFormSubmit = (matchData) => {
    console.log("Match Data Submitted:", matchData);
    setShowFixtureForm(false);
    // Optionally refresh the fixtures list or update the state
  };

  const handleFixtureFormCancel = () => {
    setShowFixtureForm(false);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Fixtures</h1>
        <h2>{header}</h2>
        {!isTeamPage && isOwner && (
          <div>
            <button onClick={handleGenerateScheduleClick}>
              {showScheduleForm
                ? "Hide Schedule Form"
                : "Generate Season Schedule"}
            </button>
            <button onClick={handleAddMatchClick} className="add-button">
              {showFixtureForm ? "Hide Add Match Form" : "Add Match"}
            </button>
            <button
              onClick={handleClearScheduleClick}
              className="delete-button"
            >
              Clear Schedule
            </button>
          </div>
        )}
        {showScheduleForm && seasonOverview && (
          <ScheduleForm
            seasonOverview={{
              ...seasonOverview,
            }}
            onSubmit={(scheduleData) => {
              console.log("Schedule Data Submitted:", scheduleData);
              setShowScheduleForm(false);
            }}
          />
        )}
        <div ref={formRef}>
          {showFixtureForm && (
            <FixtureForm
              matchData={selectedMatchData}
              season_id={seasonOverview?.season_id}
              teams={seasonOverview?.teams || []}
              venues={seasonOverview?.venues || []}
              onSubmit={handleFixtureFormSubmit}
              onCancel={handleFixtureFormCancel}
            />
          )}
        </div>
        {isTeamPage ? (
          <FixturesList
            teamId={teamId}
            onEditMatch={handleEditMatchClick}
            onDeleteMatch={handleDeleteMatchClick}
          />
        ) : (
          <FixturesList
            seasonId={seasonId}
            onEditMatch={handleEditMatchClick}
            onDeleteMatch={handleDeleteMatchClick}
            isOwner={isOwner}
          />
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