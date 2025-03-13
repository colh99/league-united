import Header from "../components/header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchById } from "../api/matches.jsx";
import "../styles/match.css";

function MatchPage() {
  const { match_id } = useParams(); // Get the match_id from the URL
  const [match, setMatch] = useState(null);

  useEffect(() => {
    const fetchMatch = async () => {
      const data = await getMatchById(match_id); // Use the match_id from the URL
      setMatch(data);
    };

    fetchMatch();
  }, [match_id]); // Add match_id as a dependency

  if (!match) {
    return <div>Loading...</div>;
  }

  const getPlayerName = (player_id) => {
    const player = match.match_rosters.find(
      (roster) => roster.player_id === player_id
    );
    return player
      ? `${player.player.first_name} ${player.player.last_name}`
      : "Unknown Player";
  };

  const getTeamName = (team_id) => {
    if (team_id === match.home_team.team_id) {
      return match.home_team.name;
    } else if (team_id === match.away_team.team_id) {
      return match.away_team.name;
    }
    return "Unknown Team";
  };

  const matchFacts = [
    ...(match.match_report?.goals.map((goal) => ({
      type: "goal",
      minute: goal.goal_minute,
      description: `${getPlayerName(goal.player_id)} scored for ${getTeamName(
        goal.team_id
      )} at ${goal.goal_minute} minute${
        goal.assist_player_id
          ? ` (assisted by ${getPlayerName(goal.assist_player_id)})`
          : ""
      }`,
    })) || []),
    ...(match.match_report?.bookings.map((booking) => ({
      type: "booking",
      minute: booking.booking_minute,
      description: `${getPlayerName(booking.player_id)} received a ${
        booking.card_type
      } card at ${booking.booking_minute} minute`,
    })) || []),
  ].sort((a, b) => a.minute - b.minute);

  const positionOrder = {
    Forward: 1,
    Midfielder: 2,
    Defender: 3,
    Goalkeeper: 4,
    Substitute: 5,
  };

  const sortRosterByPosition = (roster) => {
    return roster.sort((a, b) => {
      const positionA = positionOrder[a.position] || positionOrder.Substitute;
      const positionB = positionOrder[b.position] || positionOrder.Substitute;
      return positionA - positionB;
    });
  };

  const homeTeamRoster = sortRosterByPosition(
    match.match_rosters.filter(
      (roster) => roster.team_id === match.home_team.team_id
    )
  );

  const awayTeamRoster = sortRosterByPosition(
    match.match_rosters.filter(
      (roster) => roster.team_id === match.away_team.team_id
    )
  );

  return (
    <div>
      <Header />
      <div className="container">
        <h1>Match Details</h1>
        <h2>
          {match.season.headline_year} {match.season.league.name}
        </h2>
        <h2>
          {match.home_team.name} vs. {match.away_team.name}
        </h2>
        <h3>{new Date(match.match_date).toLocaleDateString()}</h3>
        <p>{match.venue.name}</p>
        {match.match_report && (
          <>
            <h3>Score</h3>
            <p>
              {match.match_report.home_team_score} -{" "}
              {match.match_report.away_team_score}
            </p>
            <h3>Official&apos;s Notes</h3>
            <p>{match.match_report.notes}</p>
            <h3>Match Facts</h3>
            <ul>
              {matchFacts.map((fact, index) => (
                <li key={index}>{fact.description}</li>
              ))}
            </ul>
          </>
        )}
        <h3>Officials</h3>
        <ul>
          {match.match_officials.map((official) => (
            <li key={official.match_official_id}>
              {official.official.first_name} {official.official.last_name} -{" "}
              {official.role}
            </li>
          ))}
        </ul>
        <h3>Rosters</h3>
        <div className="rosters">
          <div className="team-roster">
            <h4>{match.home_team.name} Roster</h4>
            <ul>
              {homeTeamRoster.map((roster) => (
                <li
                  key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}
                >
                  #{roster.jersey_number} {roster.player.last_name}, {roster.player.first_name} - {roster.position}
                </li>
              ))}
              {match.match_managers
                .filter(
                  (manager) => manager.team_id === match.home_team.team_id
                )
                .map((manager) => (
                  <li key={manager.match_manager_id}>
                    Manager: {manager.manager.first_name}{" "}
                    {manager.manager.last_name}
                  </li>
                ))}
            </ul>
          </div>
          <div className="team-roster">
            <h4>{match.away_team.name} Roster</h4>
            <ul>
              {awayTeamRoster.map((roster) => (
                <li
                  key={`${roster.match_id}-${roster.team_id}-${roster.player_id}`}
                >
                  #{roster.jersey_number} {roster.player.last_name}, {roster.player.first_name} - {roster.position}
                </li>
              ))}
              {match.match_managers
                .filter(
                  (manager) => manager.team_id === match.away_team.team_id
                )
                .map((manager) => (
                  <li key={manager.match_manager_id}>
                    Manager: {manager.manager.first_name}{" "}
                    {manager.manager.last_name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MatchPage;
