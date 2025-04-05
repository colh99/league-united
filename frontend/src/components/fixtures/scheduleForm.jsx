import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { generateSeasonSchedule } from "../../api/userData";

const ScheduleForm = ({ seasonOverview }) => {
  const [startDate, setStartDate] = useState(seasonOverview.start_date || "");
  const [endDate, setEndDate] = useState(seasonOverview.end_date || "");
  const [preferredMatchDay, setPreferredMatchDay] = useState("");
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

      // Calculate the number of available matchdays
      let availableMatchdays = 0;
      let currentDate = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() + 1
      ); // Ensure no time offset

      for (let i = 0; i < totalDays; i++) {
        const dayName = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        if (gameDays[dayName]?.checked) {
          availableMatchdays++;
        }
        currentDate.setDate(currentDate.getDate() + 1); // Increment the date by 1 day
      }

      setFeedback({
        totalMatchesPerTeam: totalMatchesPerTeam,
        totalWeeks: totalWeeks,
        gamesPerWeek: parseFloat(gamesPerWeek.toFixed(2)),
        availableMatchdays: availableMatchdays,
      });
    } else {
      setFeedback({
        totalMatchesPerTeam: 0,
        totalWeeks: 0,
        gamesPerWeek: 0,
        availableMatchdays: 0,
      });
    }
  }, [startDate, endDate, matchesPerTeam, seasonOverview.teams, gameDays]);

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

    const handleSubmit = async (e) => {
    e.preventDefault();
  
    const selectedDays = Object.entries(gameDays)
      .filter(([, value]) => value.checked)
      .map(([day, value]) => ({
        day,
        times: Object.entries(value.times)
          .filter(([, isChecked]) => isChecked)
          .map(([time]) => time),
      }));
  
    const teamIds = seasonOverview.teams.map((team) => team.team_id);
  
    const scheduleData = {
      seasonId: seasonOverview.season_id,
      start_date: startDate,
      end_date: endDate,
      matches_per_team: matchesPerTeam,
      game_days: selectedDays,
      preferred_match_day: preferredMatchDay,
      team_ids: teamIds,
    };
  
    // Log the input data
    console.log("Schedule data to be submitted:", scheduleData);
  
    try {
      const response = await generateSeasonSchedule(scheduleData);
      console.log("Schedule generated successfully:", response);
      alert("Schedule generated successfully!");
    } catch (error) {
      console.error("Error generating schedule:", error);
      alert(`Error: ${error.message || "Failed to generate schedule"}`);
    }
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
              {gameDays[day].checked && (
                <div className="preferred-day">
                  <label>
                    <input
                      type="radio"
                      name="preferredMatchDay"
                      value={day}
                      checked={preferredMatchDay === day}
                      onChange={() => setPreferredMatchDay(day)}
                    />
                    Preferred Weekly Match Day
                  </label>
                </div>
              )}
            </div>
          ))}
        </fieldset>
        <div className="schedule-feedback">
          <h4>Schedule Feedback</h4>
          <p>
            There are <strong>{seasonOverview.teams.length} teams</strong> set
            to participate.
          </p>
          <p>
            Each team would play{" "}
            <strong>{feedback.totalMatchesPerTeam} matches</strong> total in a
            span of <strong>{feedback.totalWeeks} weeks</strong>, with{" "}
            <strong>{feedback.gamesPerWeek} matches per week.</strong>
          </p>
          <p>
            There are{" "}
            <strong>{feedback.availableMatchdays} available matchdays</strong>{" "}
            between the selected start and end dates.
          </p>
          {feedback.availableMatchdays < feedback.totalMatchesPerTeam && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              Not enough matchdays to schedule all matches (
              {feedback.totalMatchesPerTeam} matchdays required, only{" "}
              {feedback.availableMatchdays} matchdays available).
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={feedback.availableMatchdays < feedback.totalMatchesPerTeam}
        >
          Generate Schedule
        </button>
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
};

export default ScheduleForm;
