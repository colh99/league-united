import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import FixturesList from "../components/fixtures/fixturesList";
import { getTeamById } from "../api/teams";
import { getSeasonOverview } from "../api/leagues";

function FixturesPage() {
  const { seasonId, teamId } = useParams();
  const location = useLocation();
  const [header, setHeader] = useState("");
  const isTeamPage = location.pathname.includes('/team/');

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        if (isTeamPage && teamId) {
          const teamDetails = await getTeamById(teamId);
          setHeader(teamDetails.team.name);
        } else if (seasonId) {
          const seasonDetails = await getSeasonOverview(seasonId);
          setHeader(seasonDetails.season.headline_year + " " + seasonDetails.league.name + " Season");
        }
      } catch (err) {
        console.error("Failed to fetch header details:", err);
      }
    };

    fetchHeader();
  }, [seasonId, teamId, isTeamPage]);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Fixtures</h1>
        <h2>{header}</h2>
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