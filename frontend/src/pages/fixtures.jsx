import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";
import FixturesList from "../components/fixtures/fixturesList";

function FixturesPage() {
  const { seasonId, teamId } = useParams();
  const location = useLocation();

  const isTeamPage = location.pathname.includes('/team/');

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Fixtures</h1>
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