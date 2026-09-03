import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/parseApiResponse';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : '/api/teams/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setTeams(parseApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Teams</h2>
      {error && <p className="text-danger">Error loading teams: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            {teams.length > 0 &&
              Object.keys(teams[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team._id || team.id}>
              {Object.values(team).map((value, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
