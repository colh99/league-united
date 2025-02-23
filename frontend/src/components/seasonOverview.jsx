// filepath: /d:/User Libraries/Documents/School Work/2025 Winter/Senior Project/League United/frontend/src/components/SeasonOverview.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeasonOverview } from "../api/leagues.jsx"; // Import API function
import "../styles/seasonOverview.css";
import "../styles/leagueTable.css";

const SeasonOverview = () => {
  const { season_id } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    const fetchSeason = async () => {
      const data = await getSeasonOverview(season_id);
      console.log(data);
      setSeason(data);
    };

    fetchSeason();
  }, [season_id]);

  if (!season) {
    return <div>Loading...</div>;
  }

  // Get the team name by ID
  const getTeamNameById = (id) => {
    const team = season.teams.find((team) => team.teams.team_id === id);
    return team ? team.teams.name : "Unknown Team";
  };

  // Create the league table
  const createLeagueTable = () => {
    const leagueTable = season.teams.map((team) => {
      const teamMatches = season.matches.filter(
        (match) =>
          match.home_team_id === team.teams.team_id ||
          match.away_team_id === team.teams.team_id
      );
      // Filter for wins, draws, and losses
      const teamWins = teamMatches.filter((match) => {
        const report = season.reports.find(
          (report) => report.match_id === match.match_id
        );
        return (
          (match.home_team_id === team.teams.team_id &&
            report.home_team_score > report.away_team_score) ||
          (match.away_team_id === team.teams.team_id &&
            report.away_team_score > report.home_team_score)
        );
      });

      const teamDraws = teamMatches.filter((match) => {
        const report = season.reports.find(
          (report) => report.match_id === match.match_id
        );
        return report.home_team_score === report.away_team_score;
      });

      const teamLosses = teamMatches.filter((match) => {
        const report = season.reports.find(
          (report) => report.match_id === match.match_id
        );
        return (
          (match.home_team_id === team.teams.team_id &&
            report.home_team_score < report.away_team_score) ||
          (match.away_team_id === team.teams.team_id &&
            report.away_team_score < report.home_team_score)
        );
      });
      // Filter for goals for and against, and calculate goal difference
      const goalsFor = teamMatches.reduce((total, match) => {
        const report = season.reports.find(
          (report) => report.match_id === match.match_id
        );
        return (
          total +
          (match.home_team_id === team.teams.team_id
            ? report.home_team_score
            : report.away_team_score)
        );
      }, 0);

      const goalsAgainst = teamMatches.reduce((total, match) => {
        const report = season.reports.find(
          (report) => report.match_id === match.match_id
        );
        return (
          total +
          (match.home_team_id === team.teams.team_id
            ? report.away_team_score
            : report.home_team_score)
        );
      }, 0);
      const goalDifference = goalsFor - goalsAgainst;

      // Calculate points
      const teamPoints = teamWins.length * 3 + teamDraws.length;
      // Get the team logo
      const logo = team.teams.logo_url;

      return {
        logo: logo,
        team: team.teams.name,
        wins: teamWins.length,
        draws: teamDraws.length,
        losses: teamLosses.length,
        goalsFor: goalsFor,
        goalsAgainst: goalsAgainst,
        goalDifference: goalDifference,
        points: teamPoints,
      };
    });
    
    // Sort by points, then goal difference, then goals for, then wins
    leagueTable.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
      return b.wins - a.wins;
    });

    return leagueTable;
  };

  const leagueTable = createLeagueTable(); // Call the function to create the league table

  // Display the season overview
  return (
    <div>
      <h1>{season.league.name}</h1>
      <h2>{season.season.headline_year} Season Overview</h2>

      <h3>League Table</h3>
      <table className="league-table">
        <thead>
          <tr>
            <th className="position"></th>
            <th className="team"></th>
            <th className="points"></th>
            <th className="goal-difference"></th>
            <th className="goals-for"></th>
            <th className="goals-against"></th>
            <th className="wins"></th>
            <th className="draws"></th>
            <th className="losses"></th>
          </tr>
        </thead>
        <tbody>
          {leagueTable.map((team) => (
            <tr key={team.team}>
              <td>{leagueTable.indexOf(team) + 1}</td>
              <td className="team-cell">
                <img src={team.logo} alt={team.team} width="50" height="50" />
                {team.team}
              </td>
              <td className="points">{team.points}</td>
              <td className="goal-difference">{team.goalDifference}</td>
              <td className="goals-for">{team.goalsFor}</td>
              <td className="goals_against">{team.goalsAgainst}</td>
              <td className="wins">{team.wins}</td>
              <td className="draws">{team.draws}</td>
              <td className="losses">{team.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Fixtures and Results</h3>
      <ul className="fixtures-list">
        {season.matches.map((match) => {
          const report = season.reports.find(
            (report) => report.match_id === match.match_id
          );
          const matchDate = new Date(match.match_date);
          return (
            <li key={match.match_id} className="fixture">
              <p className="date">
                {matchDate.toLocaleDateString()}{" "}
                {matchDate.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <div className="teams">
                <p className="home-team">
                  {getTeamNameById(match.home_team_id)}
                </p>
                {report ? (
                  <p className="score">
                    {report.home_team_score} - {report.away_team_score}
                  </p>
                ) : (
                  <p className="score">vs</p>
                )}
                <p className="away-team">
                  {getTeamNameById(match.away_team_id)}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SeasonOverview;
