import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "../styles/index.css";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">League United</h1>
        <button className="menu-toggle" onClick={toggleMenu}>
          {menuOpen ? "✖" : "☰"}
        </button>
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/leagues">Leagues</Link>
          <Link to="/teams">Teams</Link>
          <div className="auth-buttons">
            {user ? (
              <>
                <span className="user-display-name">
                  {user.user_metadata.display_name}
                </span>
                <Link to="/dashboard" className="dashboard-button">
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-button">
                  Login
                </Link>
                <Link to="/register" className="auth-button">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
