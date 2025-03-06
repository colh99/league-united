import Header from "../components/header";
import Footer from "../components/footer";
import AllLeaguesList from "../components/league/allLeaguesList";

function LeaguesPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Leagues</h1>
        <AllLeaguesList />
      </div>
      <Footer />
    </div>
  );
}

export default LeaguesPage;
