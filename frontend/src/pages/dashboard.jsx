import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import Header from "../components/header";
import Footer from "../components/footer";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        navigate('/login'); // Redirect to login if user is not logged in
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Dashboard</h1>
        {user ? (
          <div>
            <p>Welcome, <strong>{user.user_metadata.display_name}!</strong></p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;