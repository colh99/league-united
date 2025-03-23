import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const DEFAULT_LOGO_URL = 'https://zvmejpvkgkgomhhzqaqv.supabase.co/storage/v1/object/sign/League%20United%20logos/league-placeholder.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJMZWFndWUgVW5pdGVkIGxvZ29zL2xlYWd1ZS1wbGFjZWhvbGRlci5wbmciLCJpYXQiOjE3NDExMzM2MjQsImV4cCI6MTc3MjY2OTYyNH0.RpcVY9TVLTjsjkz1IEi4A_49u4GzUcOM8lqnmGn4pMI';

const LeagueForm = ({ initialData, onSubmit }) => {
  const [leagueName, setLeagueName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [foundedYear, setFoundedYear] = useState('');

  useEffect(() => {
    if (initialData) {
      setLeagueName(initialData.name || '');
      setLogoUrl(initialData.logo_url || '');
      setDescription(initialData.description || '');
      setFoundedYear(initialData.founded_year || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const leagueData = {
      name: leagueName,
      logo_url: logoUrl || DEFAULT_LOGO_URL,
      description,
      founded_year: foundedYear,
    };
    onSubmit(leagueData); // Call the onSubmit callback passed as a prop
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        League Name:
        <input
          type="text"
          value={leagueName}
          onChange={(e) => setLeagueName(e.target.value)}
          required
        />
      </label>
      <label>
        Logo URL:
        <input
          type="text"
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label>
        Founded Year:
        <input
          type="number"
          value={foundedYear}
          onChange={(e) => setFoundedYear(e.target.value)}
        />
      </label>
      <button type="submit">{initialData ? 'Update League' : 'Create League'}</button>
    </form>
  );
};

LeagueForm.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    logo_url: PropTypes.string,
    description: PropTypes.string,
    founded_year: PropTypes.number,
  }),
  onSubmit: PropTypes.func.isRequired,
};

export default LeagueForm;