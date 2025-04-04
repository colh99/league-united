import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/dashboard.css";
import UserEntities from "../components/dashboard/userEntities";
import Message from "../components/dashboard/message";
import { getDashboardEntities, getUserLeagues, deleteLeague, getUserTeams, deleteTeam, getUserOfficials, deleteOfficial } from "../api/userData"; // Import the necessary functions

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    leagues: [],
    teams: [],
    officials: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        navigate("/login"); // Redirect to login if user is not logged in
      } else {
        // Fetch dashboard data after user is authenticated
        const data = await getDashboardEntities(user.id);
        setDashboardData(data);
      }
    };

    fetchUser();
  }, [navigate]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
      // Clear the message after displaying it
      const timer = setTimeout(() => {
        setMessage(null);
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  return (
    <div>
      <Header />
      {user ? (
        <div className="container">
          <h1>Dashboard</h1>
          <Message
            username={user.user_metadata.display_name}
            message={message}
          />
          <UserEntities
            setMessage={setMessage}
            entityType="leagues"
            entityTypeSingular="league"
            entities={dashboardData.leagues} // Pass initial leagues
            deleteEntity={deleteLeague} // Function to delete a league
            idField="league_id"
            fetchEntities={getUserLeagues} // Function to fetch all leagues
          />
          <UserEntities
            setMessage={setMessage}
            entityType="teams"
            entityTypeSingular="team"
            entities={dashboardData.teams} // Pass initial teams
            deleteEntity={deleteTeam} // Function to delete a team
            idField="team_id"
            fetchEntities={getUserTeams} // Function to fetch all teams
          />
          <UserEntities
            setMessage={setMessage}
            entityType="officials"
            entityTypeSingular="official"
            entities={dashboardData.officials} // Pass initial officials
            deleteEntity={deleteOfficial} // Function to delete an official
            idField="official_id"
            fetchEntities={getUserOfficials} // Function to fetch all officials
          />
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;