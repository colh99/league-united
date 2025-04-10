import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getMatchesBySeason, getMatchesByTeam } from "../../api/matches";
import "../../styles/fixtures.css";
import { Link } from "react-router-dom";

function FixturesList({ seasonId, teamId, onEditMatch, onDeleteMatch, isOwner }) {
  const [fixtures, setFixtures] = useState([]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isCalendarView, setIsCalendarView] = useState(false); // State to manage view mode

  useEffect(() => {
    const getFixtures = async () => {
      try {
        let data;
        if (teamId) {
          data = await getMatchesByTeam(teamId);
        } else if (seasonId) {
          data = await getMatchesBySeason(seasonId);
        }
        setFixtures(data || []); // Set fixtures to an empty array if data is null

        // Find the last month with fixtures
        if (data && data.length > 0) {
          const lastFixtureDate = new Date(
            Math.max(...data.map((fixture) => new Date(fixture.match_date)))
          );
          setCurrentDate(
            new Date(
              lastFixtureDate.getFullYear(),
              lastFixtureDate.getMonth(),
              1
            )
          );
        }
      } catch (err) {
        setError(err.message);
      }
    };

    getFixtures();
  }, [seasonId, teamId]);

  const handlePreviousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const renderCalendar = () => {
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
      const dayFixtures = fixtures.filter((fixture) => {
        const fixtureDate = new Date(fixture.match_date);
        return (
          fixtureDate.getFullYear() === currentDate.getFullYear() &&
          fixtureDate.getMonth() === currentDate.getMonth() &&
          fixtureDate.getDate() === day
        );
      });
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

  const renderList = () => {
    if (fixtures.length === 0) {
      return <div>No matches available.</div>;
    }

    // Sort fixtures by match_date in ascending order
    const sortedFixtures = [...fixtures].sort(
      (a, b) => new Date(a.match_date) - new Date(b.match_date)
    );

    return sortedFixtures.map((fixture) => {
      const fixtureDate = new Date(fixture.match_date);
      const dateString = fixtureDate.toLocaleDateString();
      const timeString = fixtureDate.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      });
      const matchReport = fixture.match_report;
      const isHomeTeam = fixture.home_team.team_id === parseInt(teamId);
      const opponentTeam = isHomeTeam
        ? fixture.away_team.name
        : fixture.home_team.name;

      let score = teamId ? "" : "vs";
      let result = "";
      if (matchReport) {
        const homeScore = matchReport.home_team_score;
        const awayScore = matchReport.away_team_score;
        if (isHomeTeam) {
          score = `${homeScore} - ${awayScore}`;
          result =
            homeScore === awayScore ? "D" : homeScore > awayScore ? "W" : "L";
        } else {
          score = `${awayScore} - ${homeScore}`;
          result =
            awayScore === homeScore ? "D" : awayScore > homeScore ? "W" : "L";
        }
      }

      const versusSymbol = isHomeTeam ? "vs" : "@";

      return (
        <div key={fixture.match_id} className="fixture-list-item">
          <Link to={`/matches/${fixture.match_id}`}>
            <span className="date-time">
              {dateString} {timeString}
            </span>
            <span className="teams">
              {teamId ? (
                <>
                  <span>
                    {versusSymbol} {opponentTeam}
                  </span>
                  <span className="score">{score}</span>
                  <span>{result}</span>
                </>
              ) : (
                <>
                  <span>{fixture.home_team.name}</span>
                  <span className="score">{score}</span>
                  <span>{fixture.away_team.name}</span>
                </>
              )}
            </span>
          </Link>
          {isOwner && (
            <span className="fixture-actions">
              <button onClick={() => onEditMatch(fixture)}>Edit</button>
              <button onClick={() => onDeleteMatch(fixture.match_id)} className="delete-button">
                Delete
              </button>
            </span>
          )}
        </div>
      );
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="component-container">
        <button
          onClick={() => setIsCalendarView(!isCalendarView)}
          className="calendar-toggle"
        >
          {isCalendarView ? "Switch to List View" : "Switch to Calendar View"}
        </button>
        {isCalendarView ? (
          <div className="calendar">
            <div className="calendar-header">
              <button onClick={handlePreviousMonth}>Previous</button>
              <div>
                {currentDate.toLocaleString("default", { month: "long" })}{" "}
                {currentDate.getFullYear()}
              </div>
              <button onClick={handleNextMonth}>Next</button>
            </div>
            <div className="calendar-weekdays">
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
        ) : (
          <div className="fixture-list">{renderList()}</div>
        )}
      </div>
    </div>
  );
}

FixturesList.propTypes = {
  seasonId: PropTypes.string,
  teamId: PropTypes.string,
  onEditMatch: PropTypes.func.isRequired,
  onDeleteMatch: PropTypes.func.isRequired,
  isOwner: PropTypes.bool.isRequired, // Add isOwner as a required prop
};

export default FixturesList;