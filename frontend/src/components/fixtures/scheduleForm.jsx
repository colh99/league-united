import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ScheduleForm = ({ seasonOverview, onSubmit }) => {
  const [startDate, setStartDate] = useState(seasonOverview.start_date || "");
  const [endDate, setEndDate] = useState(seasonOverview.end_date || "");
  const [matchesPerTeam, setMatchesPerTeam] = useState(1);
  const [feedback, setFeedback] = useState({
    totalMatchesPerTeam: 0,
    totalWeeks: 0,
    gamesPerWeek: 0,
  });
  const [gameDays, setGameDays] = useState({});

  useEffect(() => {
    // Initialize gameDays state with all days and time slots unchecked
    setGameDays({
      Sunday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Monday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Tuesday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Wednesday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Thursday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Friday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
      Saturday: {
        checked: false,
        times: { morning: false, afternoon: false, evening: false },
      },
    });
  }, []);

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      matchesPerTeam > 0 &&
      seasonOverview.teams.length > 1
    ) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const totalDays = (end - start) / (24 * 60 * 60 * 1000) + 1; // Include both start and end
      const numberOfTeams = seasonOverview.teams.length;

      // Calculate the number of matches a team plays in a season
      const totalMatchesPerTeam = matchesPerTeam * (numberOfTeams - 1);

      // Calculate the average number of games per week
      const totalWeeks = Math.ceil(totalDays / 7);
      const gamesPerWeek = totalMatchesPerTeam / totalWeeks;

      setFeedback({
        totalMatchesPerTeam: totalMatchesPerTeam,
        totalWeeks: totalWeeks,
        gamesPerWeek: parseFloat(gamesPerWeek.toFixed(2)),
      });
    } else {
      setFeedback({
        totalMatchesPerTeam: 0,
        totalWeeks: 0,
        gamesPerWeek: 0,
      });
    }
  }, [startDate, endDate, matchesPerTeam, seasonOverview.teams]);

  const handleDayChange = (day) => {
    setGameDays((prev) => ({
      ...prev,
      [day]: { ...prev[day], checked: !prev[day].checked },
    }));
  };

  const handleTimeChange = (day, time) => {
    setGameDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        times: { ...prev[day].times, [time]: !prev[day].times[time] },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDays = Object.entries(gameDays)
      .filter(([, value]) => value.checked) // Removed unused '_'
      .map(([day, value]) => ({
        day,
        times: Object.entries(value.times)
          .filter(([, isChecked]) => isChecked) // Removed unused '_'
          .map(([time]) => time),
      }));
    onSubmit({
      seasonId: seasonOverview.season_id,
      start_date: startDate,
      end_date: endDate,
      matches_per_team: matchesPerTeam,
      game_days: selectedDays,
    });
  };

  return (
    <div className="component-container">
      <form onSubmit={handleSubmit} className="schedule-form">
        <h3>Generate Schedule</h3>
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
          Number of Times Each Team Plays Each Other:
          <input
            type="number"
            min="1"
            value={matchesPerTeam}
            onChange={(e) => setMatchesPerTeam(Number(e.target.value))}
            required
          />
        </label>
        <div className="schedule-feedback">
          <p>
            There are <strong>{seasonOverview.teams.length}</strong> teams set
            to participate.
          </p>
          <p>
            Each team would play <strong>{feedback.totalMatchesPerTeam}</strong>{" "}
            matches total in a span of <strong>{feedback.totalWeeks}</strong>{" "}
            weeks, with <strong>{feedback.gamesPerWeek}</strong> matches per
            week.
          </p>
        </div>
        <fieldset>
          <legend>Select Game Days and Times:</legend>
          {Object.keys(gameDays).map((day) => (
            <div key={day} className="day-selection">
              <label className="day-label">
                <input
                  type="checkbox"
                  checked={gameDays[day].checked}
                  onChange={() => handleDayChange(day)}
                />
                {day}
              </label>
              {gameDays[day].checked && (
                <div className="time-options">
                  {["morning", "afternoon", "evening"].map((time) => (
                    <label key={time} className="time-label">
                      <input
                        type="checkbox"
                        checked={gameDays[day].times[time]}
                        onChange={() => handleTimeChange(day, time)}
                      />
                      {time.charAt(0).toUpperCase() + time.slice(1)}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </fieldset>
        <button type="submit">Generate Schedule</button>
      </form>
    </div>
  );
};

ScheduleForm.propTypes = {
  seasonOverview: PropTypes.shape({
    season_id: PropTypes.string.isRequired,
    start_date: PropTypes.string,
    end_date: PropTypes.string,
    teams: PropTypes.arrayOf(
      PropTypes.shape({
        team_id: PropTypes.number.isRequired,
        teams: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ScheduleForm;
