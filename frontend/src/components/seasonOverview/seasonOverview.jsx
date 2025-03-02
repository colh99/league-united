import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSeasonOverview } from "../../api/leagues.jsx"; // Import API function
import LeagueTable from "./leagueTable";
import FixturesList from "./fixturesList";
import "../../styles/seasonOverview.css";
import "../../styles/leagueTable.css";

const SeasonOverview = () => {
  const { season_id } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    const fetchSeason = async () => {
      const data = await getSeasonOverview(season_id);
      //console.log(data);
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
      const teamPoints = teamWins.length * 3 + teamDraws.length;
      const logo = team.teams.logo_url;

      return {
        team_id: team.teams.team_id,
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
    <div className="container">
      <h1>{season.league.name}</h1>
      <h2>{season.season.headline_year} Season Overview</h2>
      <LeagueTable leagueTable={leagueTable} />
      <FixturesList
        matches={season.matches}
        reports={season.reports}
        getTeamNameById={getTeamNameById}
      />
    </div>
  );
};

export default SeasonOverview;