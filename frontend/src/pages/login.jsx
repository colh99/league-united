import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      // Redirect to dashboard
      window.location.href = "/dashboard";
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>
        <p>Don&apos;t have an account? <Link to="/register">Register here.</Link></p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
