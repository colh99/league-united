import Header from "../components/header";
import Footer from "../components/footer";
import { getLeagueById } from "../api/leagues.jsx";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LeagueDetails from "../components/league/leagueDetails.jsx";
import SeasonOverview from "../components/seasonOverview/seasonOverview.jsx";

function LeaguesPage() {
  const { league_id } = useParams();
  const [league, setLeague] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);

  useEffect(() => {
    const fetchLeague = async () => {
      const data = await getLeagueById(league_id);
      setLeague(data);
      if (data.seasons && data.seasons.length > 0) {
        const now = new Date();
        const pastSeasons = data.seasons.filter(season => new Date(season.start_date) <= now);
        const mostRecentSeason = pastSeasons.reduce((latest, season) => {
          return new Date(season.start_date) > new Date(latest.start_date) ? season : latest;
        }, pastSeasons[0]);

        setSelectedSeason(mostRecentSeason.season_id);
      }
    };

    fetchLeague();
  }, [league_id]);

  if (!league) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <LeagueDetails league={league.league} />
        {selectedSeason && (
          <SeasonOverview
            seasons={league.seasons}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default LeaguesPage;