import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const LeagueTable = ({ leagueTable }) => {
  return (
    <div className="component-container">
      <h3>League Table</h3>
      <div className="league-table-container">
        <table className="league-table">
          <thead>
            <tr>
              <th className="position"></th>
              <th className="team"></th>
              <th className="points"></th>
              <th className="games-played"></th>
              <th className="wins"></th>
              <th className="draws"></th>
              <th className="losses"></th>
              <th className="goal-difference"></th>
              <th className="goals-for"></th>
              <th className="goals-against"></th>
            </tr>
          </thead>
          <tbody>
            {leagueTable.map((team, index) => (
              <tr key={team.team_id}>
                <td>{index + 1}</td>
                <td className="team-cell">
                  <img src={team.logo} alt={team.team} width="50" height="50" />
                  <Link to={`/teams/${team.team_id}`}>{team.team}</Link>
                </td>
                <td className="points">{team.points}</td>
                <td className="games-played">{team.gamesPlayed}</td>
                <td className="wins">{team.wins}</td>
                <td className="draws">{team.draws}</td>
                <td className="losses">{team.losses}</td>
                <td className="goal-difference">{team.goalDifference}</td>
                <td className="goals-for">{team.goalsFor}</td>
                <td className="goals-against">{team.goalsAgainst}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

LeagueTable.propTypes = {
  leagueTable: PropTypes.arrayOf(
    PropTypes.shape({
      team_id: PropTypes.number.isRequired,
      logo: PropTypes.string.isRequired,
      team: PropTypes.string.isRequired,
      points: PropTypes.number.isRequired,
      goalDifference: PropTypes.number.isRequired,
      goalsFor: PropTypes.number.isRequired,
      goalsAgainst: PropTypes.number.isRequired,
      wins: PropTypes.number.isRequired,
      draws: PropTypes.number.isRequired,
      losses: PropTypes.number.isRequired,
      gamesPlayed: PropTypes.number.isRequired, // Added prop type
    })
  ).isRequired,
};

export default LeagueTable;