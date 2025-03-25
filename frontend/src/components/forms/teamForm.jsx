import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const DEFAULT_LOGO_URL = "https://zvmejpvkgkgomhhzqaqv.supabase.co/storage/v1/object/sign/League%20United%20logos/team-placeholder.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJMZWFndWUgVW5pdGVkIGxvZ29zL3RlYW0tcGxhY2Vob2xkZXIucG5nIiwiaWF0IjoxNzQxOTk0NTY1LCJleHAiOjE3NzM1MzA1NjV9.5dh8yXgxBca-78DITxphWnl8vyTuLQNDn0CBYiQhntY";

const TeamForm = ({ initialData, onSubmit }) => {
  const [name, setName] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [abbreviatedName, setAbbreviatedName] = useState("");
  const [foundedYear, setFoundedYear] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setLogoUrl(initialData.logo_url || "");
      setContactEmail(initialData.contact_email || "");
      setNickname(initialData.nickname || "");
      setAbbreviatedName(initialData.abbreviated_name || "");
      setFoundedYear(initialData.founded_year || "");
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
    };
    onSubmit(teamData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">{initialData ? "Update Team" : "Create Team"}</button>
    </form>
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
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default TeamForm;