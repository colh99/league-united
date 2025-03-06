import { useEffect, useState } from "react";
import { getAllLeagues } from "../../api/leagues.jsx"; // Import API function
import { Link } from "react-router-dom";
import "../../styles/allLeaguesList.css";

const AllLeaguesList = () => {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      const data = await getAllLeagues();
      console.log(data);
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  return (
    <div className="component-container">
      {leagues.map((league) => (
        <div key={league.league_id} className="league">
          <img src={league.logo_url} alt={league.name} className="league-logo"/>
          <h2>
            <Link to={`/leagues/${league.league_id}`}>{league.name}</Link>
          </h2>
          <p className="founded"><strong>Founded:</strong> {league.founded_year} </p>
          <p>{league.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllLeaguesList;
