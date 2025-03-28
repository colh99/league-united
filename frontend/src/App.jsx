import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import FormPage from "./pages/form";
import LeaguesPage from "./pages/leagues";
import LeaguePage from "./pages/league";
import TeamsPage from "./pages/teams";
import TeamPage from "./pages/team";
import FixturesPage from "./pages/fixtures";
import MatchPage from "./pages/match";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/form/:entityType/:id?" element={<FormPage />}/>
      <Route path="/leagues" element={<LeaguesPage />} />
      <Route path="/leagues/:league_id" element={<LeaguePage />} />
      <Route path="/teams" element={<TeamsPage />} />
      <Route path="/teams/:team_id" element={<TeamPage />} />
      <Route path="/fixtures/team/:teamId" element={<FixturesPage />} />
      <Route path="/fixtures/season/:seasonId" element={<FixturesPage />} />
      <Route path="/matches/:match_id" element={<MatchPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
