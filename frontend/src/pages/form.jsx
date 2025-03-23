import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueForm from "../components/forms/leagueForm";
import { createLeague, updateLeague, getLeagueById } from '../api/userData'; // Import the API functions
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const EntityForm = () => {
  const { entityType, id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    const fetchData = async () => {
      try {
        let data;
        if (entityType === "league" && id) {
          data = await getLeagueById(id);
        }
        // Add more cases for other entity types if needed
        setInitialData(data);
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [entityType, id]);

  const handleSubmit = async (data) => {
    try {
      if (id) {
        await updateLeague(id, data);
        navigate('/dashboard', { state: { message: 'League updated successfully!' } });
      } else {
        await createLeague(data);
        navigate('/dashboard', { state: { message: 'League created successfully!' } });
      }
      console.log(id ? 'Updated entity:' : 'Created entity:', data);
    } catch (error) {
      console.error('Error submitting league data:', error);
    }
  };

  let FormComponent;
  switch (entityType) {
    case "league":
      FormComponent = LeagueForm;
      break;
    // Add more cases for other forms if needed
    default:
      FormComponent = function InvalidEntityType() {
        return <p>Invalid entity type</p>;
      };
      FormComponent.displayName = "InvalidEntityType";
  }

  return (
    <div>
      <Header />
      <div className="container">
        <h2>{id ? `Edit ${entityType}` : `Create ${entityType}`}</h2>
        {user ? (
          <FormComponent initialData={initialData} onSubmit={handleSubmit} />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EntityForm;