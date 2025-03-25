import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../styles/dashboard.css";
import UserLeagues from "../components/dashboard/userLeagues";
import Message from "../components/dashboard/message";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = () => {
  const [user, setUser] = useState(null);
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
          <UserLeagues user={user} setMessage={setMessage} />
        </div>
      ) : (
        <p>Loading user information...</p>
      )}
      <Footer />
    </div>
  );
};

export default Dashboard;