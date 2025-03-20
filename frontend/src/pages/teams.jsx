import TeamList from "../components/teamList";
import Header from "../components/header";
import Footer from "../components/footer";

function TeamsPage() {
  return (
    <div>
      <Header />
      <div className="container">
        <h1>Teams</h1>
        <TeamList />
      </div>
      <Footer />
    </div>
  );
}

export default TeamsPage;
