import { useEffect, useState } from "react";
import { getAllSeasons } from "../api/leagues.jsx"; // Import API function
import { Link } from "react-router-dom";
import "../styles/allLeaguesList.css";

const AllSeasonsList = () => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    const fetchSeasons = async () => {
      const data = await getAllSeasons();
      console.log(data);
      setSeasons(data);
    };

    fetchSeasons();
  }, []);

  return (
    <div className="container">
      <h1>Leagues and Seasons</h1>
      {seasons.map((league) => (
        <div key={league.league_id} className="league">
          <h2><Link to={`/leagues/${league.league_id}`}>{league.name}</Link></h2>
          <p className="founded">Founded {league.founded_year} </p>
          <p>{league.description}</p>
          <h3>Seasons</h3>
          <ul>
            {league.seasons.map((season) => (
              <li key={season.season_id}>
                <Link to={`/leagues/${league.league_id}?season=${season.season_id}`}>{season.headline_year}</Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllSeasonsList;
