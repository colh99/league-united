import Header from "../components/header";
import Footer from "../components/footer";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Sign up user with email and password
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: name }, // Store name in user metadata
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(
        "User registered successfully! Please check your email to verify your account."
      );
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={handleSignUp}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
        <p>Already have an account? <Link to="/login">Login here.</Link></p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
