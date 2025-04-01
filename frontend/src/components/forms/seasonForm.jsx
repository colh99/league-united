import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Select from "react-select"; // Import react-select

const SeasonForm = ({ initialData, additionalData, onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);

  const availableTeams = additionalData || [];

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const leagueId = queryParams.get("league_id");

  useEffect(() => {
    if (initialData) {
      setStartDate(initialData.start_date || "");
      setEndDate(initialData.end_date || "");
      setSelectedTeams(
        Array.isArray(initialData.teams)
          ? initialData.teams.map((team) => team.team_id) // Extract team_id from the teams array
          : []
      );
    }

  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const seasonData = {
      start_date: startDate,
      end_date: endDate,
      team_ids: selectedTeams,
      league_id: leagueId,
    };
    onSubmit(seasonData);
  };

  // Map available teams to react-select format
  const teamOptions = availableTeams.map((team) => ({
    value: team.team_id,
    label: team.name,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />
      </label>
      <label>
        Select Teams:
        <Select
          isMulti
          options={teamOptions}
          value={teamOptions.filter((option) => selectedTeams.includes(option.value))} // Auto-select teams
          onChange={(selectedOptions) =>
            setSelectedTeams(selectedOptions.map((option) => option.value))
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

SeasonForm.propTypes = {
  initialData: PropTypes.shape({
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    teams: PropTypes.arrayOf(PropTypes.string),
  }),
  additionalData: PropTypes.arrayOf(
    PropTypes.shape({
      team_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};

export default SeasonForm;
