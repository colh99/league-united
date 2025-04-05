import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DEFAULT_LOGO_URL =
  "https://zvmejpvkgkgomhhzqaqv.supabase.co/storage/v1/object/sign/League%20United%20logos/team-placeholder.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJMZWFndWUgVW5pdGVkIGxvZ29zL3RlYW0tcGxhY2Vob2xkZXIucG5nIiwiaWF0IjoxNzQxOTk0NTY1LCJleHAiOjE3NzM1MzA1NjV9.5dh8yXgxBca-78DITxphWnl8vyTuLQNDn0CBYiQhntY";

const TeamForm = ({ initialData, onSubmit }) => {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [abbreviatedName, setAbbreviatedName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [venueName, setVenueName] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [venueCity, setVenueCity] = useState("");
  const [venueState, setVenueState] = useState("");
  const [venueZipCode, setVenueZipCode] = useState("");
  const [venueCapacity, setVenueCapacity] = useState("");
  const [managerFirstName, setManagerFirstName] = useState("");
  const [managerLastName, setManagerLastName] = useState("");
  const [managerDateOfBirth, setManagerDateOfBirth] = useState("");
  const [managerEmail, setManagerEmail] = useState("");
  const [managerPhoneNumber, setManagerPhoneNumber] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLogoUrl(initialData.logo_url || "");
      setContactEmail(initialData.contact_email || "");
      setNickname(initialData.nickname || "");
      setAbbreviatedName(initialData.abbreviated_name || "");
      setFoundedYear(initialData.founded_year || "");
      setVenueName(initialData.venue_name || "");
      setVenueAddress(initialData.venue_address || "");
      setVenueCity(initialData.venue_city || "");
      setVenueState(initialData.venue_state || "");
      setVenueZipCode(initialData.venue_zip_code || "");
      setVenueCapacity(initialData.venue_capacity || "");
      setManagerFirstName(initialData.manager_first_name || "");
      setManagerLastName(initialData.manager_last_name || "");
      setManagerDateOfBirth(initialData.manager_date_of_birth || "");
      setManagerEmail(initialData.manager_email || "");
      setManagerPhoneNumber(initialData.manager_phone_number || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const teamData = {
      name,
      logo_url: logoUrl || DEFAULT_LOGO_URL,
      contact_email: contactEmail,
      nickname,
      abbreviated_name: abbreviatedName,
      founded_year: foundedYear,
      venue: {
        name: venueName,
        address: venueAddress,
        city: venueCity,
        state: venueState,
        zip_code: venueZipCode,
        capacity: venueCapacity,
      },
      manager: {
        first_name: managerFirstName,
        last_name: managerLastName,
        date_of_birth: managerDateOfBirth,
        email: managerEmail,
        phone_number: managerPhoneNumber,
      },
    };
    onSubmit(teamData);
  };

  return (
    <div className="component-container">
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Team Details</legend>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="logoUrl">Logo URL:</label>
          <input
            type="url"
            id="logoUrl"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="contactEmail">Contact Email:</label>
          <input
            type="email"
            id="contactEmail"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="abbreviatedName">Abbreviated Name:</label>
          <input
            type="text"
            id="abbreviatedName"
            value={abbreviatedName}
            onChange={(e) => setAbbreviatedName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="foundedYear">Founded Year:</label>
          <input
            type="number"
            id="foundedYear"
            value={foundedYear}
            onChange={(e) => setFoundedYear(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Primary Venue</legend>
        <div>
          <label htmlFor="venueName">Venue Name:</label>
          <input
            type="text"
            id="venueName"
            value={venueName}
            onChange={(e) => setVenueName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="venueAddress">Address:</label>
          <input
            type="text"
            id="venueAddress"
            value={venueAddress}
            onChange={(e) => setVenueAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="venueCity">City:</label>
          <input
            type="text"
            id="venueCity"
            value={venueCity}
            onChange={(e) => setVenueCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="venueState">State:</label>
          <input
            type="text"
            id="venueState"
            value={venueState}
            onChange={(e) => setVenueState(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="venueZipCode">Zip Code:</label>
          <input
            type="text"
            id="venueZipCode"
            value={venueZipCode}
            onChange={(e) => setVenueZipCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="venueCapacity">Capacity:</label>
          <input
            type="number"
            id="venueCapacity"
            value={venueCapacity}
            onChange={(e) => setVenueCapacity(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <fieldset>
        <legend>Manager Details</legend>
        <div>
          <label htmlFor="managerFirstName">First Name:</label>
          <input
            type="text"
            id="managerFirstName"
            value={managerFirstName}
            onChange={(e) => setManagerFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="managerLastName">Last Name:</label>
          <input
            type="text"
            id="managerLastName"
            value={managerLastName}
            onChange={(e) => setManagerLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="managerDateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="managerDateOfBirth"
            value={managerDateOfBirth}
            onChange={(e) => setManagerDateOfBirth(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="managerEmail">Email:</label>
          <input
            type="email"
            id="managerEmail"
            value={managerEmail}
            onChange={(e) => setManagerEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="managerPhoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="managerPhoneNumber"
            value={managerPhoneNumber}
            onChange={(e) => setManagerPhoneNumber(e.target.value)}
            required
          />
        </div>
      </fieldset>
      <button type="submit">
        {initialData ? "Update Team" : "Create Team"}
      </button>
    </form>
    </div>
  );
};

TeamForm.propTypes = {
  initialData: PropTypes.shape({
    team_id: PropTypes.string,
    name: PropTypes.string,
    logo_url: PropTypes.string,
    contact_email: PropTypes.string,
    nickname: PropTypes.string,
    abbreviated_name: PropTypes.string,
    founded_year: PropTypes.string,
    venue_name: PropTypes.string,
    venue_address: PropTypes.string,
    venue_city: PropTypes.string,
    venue_state: PropTypes.string,
    venue_zip_code: PropTypes.string,
    venue_capacity: PropTypes.string,
    manager_first_name: PropTypes.string,
    manager_last_name: PropTypes.string,
    manager_date_of_birth: PropTypes.string,
    manager_email: PropTypes.string,
    manager_phone_number: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default TeamForm;
