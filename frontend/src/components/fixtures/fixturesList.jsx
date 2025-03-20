import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMatchesBySeason, getMatchesByTeam } from "../../api/matches";
import "../../styles/calendar.css"; // Add CSS for styling the calendar

function FixturesList({ seasonId, teamId }) {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFixtures = async () => {
      try {
        let data;
        if (teamId) {
          data = await getMatchesByTeam(teamId);
        } else if (seasonId) {
          data = await getMatchesBySeason(seasonId);
        }
        setFixtures(data);
      } catch (err) {
        setError(err.message);
      }
    };

    getFixtures();
  }, [seasonId, teamId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const renderCalendar = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    ).getDay();
    const calendarDays = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="calendar-day empty"></div>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dayFixtures = fixtures.filter(
        (fixture) => new Date(fixture.match_date).getDate() === day
      );
      calendarDays.push(
        <div key={day} className="calendar-day">
          <div className="date">{day}</div>
          {dayFixtures.map((fixture) => (
            <div key={fixture.match_id} className="fixture">
              {fixture.home_team.name} vs {fixture.away_team.name}
            </div>
          ))}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>
      <div className="calendar-body">{renderCalendar()}</div>
    </div>
  );
}

FixturesList.propTypes = {
  seasonId: PropTypes.string,
  teamId: PropTypes.string,
};

export default FixturesList;
