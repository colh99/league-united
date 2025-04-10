import Header from "../components/header";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LeagueForm from "../components/forms/leagueForm";
import TeamForm from "../components/forms/teamForm";
import SeasonForm from "../components/forms/seasonForm";
import OfficialForm from "../components/forms/officialForm";
import { createClient } from "@supabase/supabase-js";
import { createLeague, updateLeague, getLeagueById, 
         createTeam, updateTeam, getTeamById, 
         createSeason, updateSeason, getSeasonById, getUserTeams, 
         createOfficial, updateOfficial, getOfficialById } from '../api/userData'; // Import the API functions

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
  seasons: {
    formComponent: SeasonForm,
    create: createSeason,
    update: updateSeason,
    getById: getSeasonById,
    getAdditionalData: getUserTeams, // Add getUserTeams here
    successMessage: {
      create: 'Season created successfully!',
      update: 'Season updated successfully!',
    },
  },
  officials: {
    formComponent: OfficialForm,
    create: createOfficial,
    update: updateOfficial,
    getById: getOfficialById,
    successMessage: {
      create: 'Official created successfully!',
      update: 'Official updated successfully!',
    },
  }
  // Add more configurations for other entity types as needed
};

const EntityForm = () => {
  const { entityType, id } = useParams();
  const entityTypeSingular =
    entityType.slice(-1) === "s"
      ? entityType.slice(0, -1).charAt(0).toUpperCase() + entityType.slice(0, -1).slice(1)
      : entityType.charAt(0).toUpperCase() + entityType.slice(1);
  const [initialData, setInitialData] = useState(null);
  const [additionalData, setAdditionalData] = useState(null); // State for additional data
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
        if (config && id && id !== "new") {
          const data = await config.getById(id);
          setInitialData(data);
        } else if (id === "new") {
          // Handle creation case (e.g., pre-fill with defaults or leave empty)
          setInitialData(null);
        }
      } catch (error) {
        console.error("Error fetching entity data:", error);
      }
    };

    fetchData();
  }, [config, id]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        if (config && config.getAdditionalData) {
          const data = await config.getAdditionalData();
          setAdditionalData(data);
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchAdditionalData();
  }, [config]);

  const handleSubmit = async (data) => {
    try {
      if (config) {
        if (id && id !== "new") {
          await config.update(id, data);
          navigate('/dashboard', { state: { message: config.successMessage.update } });
        } else {
          await config.create(data);
          navigate('/dashboard', { state: { message: config.successMessage.create } });
        }
        console.log(id && id !== "new" ? 'Updated entity:' : 'Created entity:', data);
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
        <h2>{id && id !== "new" ? `Edit ${entityTypeSingular}` : `Create ${entityTypeSingular}`}</h2>
        {user ? (
          <FormComponent
            initialData={initialData}
            additionalData={additionalData} // Pass additional data to the form
            onSubmit={handleSubmit}
          />
        ) : (
          <p>Loading user information...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EntityForm;