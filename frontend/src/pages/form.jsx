import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueForm from "../components/forms/leagueForm";
import TeamForm from "../components/forms/teamForm";
import { createClient } from "@supabase/supabase-js";
import { createLeague, updateLeague, getLeagueById, createTeam, updateTeam, getTeamById } from '../api/userData'; // Import the API functions

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const entityConfig = {
  leagues: {
    formComponent: LeagueForm,
    create: createLeague,
    update: updateLeague,
    getById: getLeagueById,
    successMessage: {
      create: 'League created successfully!',
      update: 'League updated successfully!',
    },
  },
  teams: {
    formComponent: TeamForm,
    create: createTeam,
    update: updateTeam,
    getById: getTeamById,
    successMessage: {
      create: 'Team created successfully!',
      update: 'Team updated successfully!',
    },
  },
  // Add more configurations for other entity types as needed
};

const EntityForm = () => {
  const { entityType, id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const config = entityConfig[entityType];

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
        if (config && id) {
          const data = await config.getById(id);
          setInitialData(data);
        }
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [config, id]);

  const handleSubmit = async (data) => {
    try {
      if (config) {
        if (id) {
          await config.update(id, data);
          navigate('/dashboard', { state: { message: config.successMessage.update } });
        } else {
          await config.create(data);
          navigate('/dashboard', { state: { message: config.successMessage.create } });
        }
        console.log(id ? 'Updated entity:' : 'Created entity:', data);
      }
    } catch (error) {
      console.error(`Error submitting ${entityType} data:`, error);
    }
  };

  if (!config) {
    return <p>Invalid entity type</p>;
  }

  const FormComponent = config.formComponent;

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