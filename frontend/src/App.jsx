import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import LeaguesPage from "./pages/leagues";
import TeamsPage from "./pages/teams";
import NotFound from "./pages/notFound";
import SeasonOverviewPage from "./pages/seasonOverview";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/leagues" element={<LeaguesPage />} />
      <Route path="/leagues/:league_id" element={<LeaguesPage />} />
      <Route path="/seasons/:season_id" element={<SeasonOverviewPage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:team_id" element={<TeamsPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
