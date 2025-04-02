import Header from "../components/header";
import Footer from "../components/footer";
import { getLeagueById } from "../api/leagues.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import LeagueDetails from "../components/league/leagueDetails.jsx";
import SeasonOverview from "../components/seasonOverview/seasonOverview.jsx";

function LeaguesPage() {
  const { league_id } = useParams();
  const navigate = useNavigate(); // For programmatic navigation
  const [league, setLeague] = useState(null); // Stores the league object
  const [seasons, setSeasons] = useState([]); // Stores the seasons array
  const [selectedSeason, setSelectedSeason] = useState(null);

  // Retrieve the logged-in user's ID from local storage
  const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.id;

  useEffect(() => {
    const fetchLeague = async () => {
      const data = await getLeagueById(league_id);

      // Set the league and seasons separately
      setLeague(data.league);
      setSeasons(data.seasons || []);

      // Determine the most recent season if seasons exist
      if (data.seasons && data.seasons.length > 0) {
        const now = new Date();

        // Filter past seasons
        const pastSeasons = data.seasons.filter(
          (season) => new Date(season.start_date) <= now
        );

        let mostRelevantSeason;

        if (pastSeasons.length > 0) {
          // Find the most recent past season
          mostRelevantSeason = pastSeasons.reduce((latest, season) => {
            return new Date(season.start_date) > new Date(latest.start_date)
              ? season
              : latest;
          }, pastSeasons[0]);
        } else {
          // If no past seasons, find the earliest future season
          const futureSeasons = data.seasons.filter(
            (season) => new Date(season.start_date) > now
          );
          if (futureSeasons.length > 0) {
            mostRelevantSeason = futureSeasons.reduce((earliest, season) => {
              return new Date(season.start_date) < new Date(earliest.start_date)
                ? season
                : earliest;
            }, futureSeasons[0]);
          }
        }

        // Set the most relevant season (either the most recent past or earliest future)
        if (mostRelevantSeason) {
          setSelectedSeason(mostRelevantSeason.season_id);
        }
      }
    };

    fetchLeague();
  }, [league_id]);

  if (!league) {
    return <div>Loading...</div>;
  }

  // Check if the logged-in user is the owner of the league
  const isOwner = league.user_id === loggedInUserId;
  console.log(isOwner, league.user_id, loggedInUserId);

  return (
    <div>
      <Header />
      <div className="container">
        <LeagueDetails league={league} />
        {isOwner && (
          <div className="owner-actions">
            <button
              className="add-season-button"
              onClick={() =>
                navigate(`/form/seasons/new?league_id=${league_id}`)
              }
            >
              Add New Season
            </button>
            {selectedSeason && (
              <button
                className="edit-season-button"
                onClick={() => navigate(`/form/seasons/${selectedSeason}?league_id=${league_id}`)}
              >
                Edit Selected Season
              </button>
            )}
          </div>
        )}
        {seasons.length > 0 ? (
          <SeasonOverview
            seasons={seasons}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
          />
        ) : (
          <div>No seasons are currently associated with this league.</div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LeaguesPage;
