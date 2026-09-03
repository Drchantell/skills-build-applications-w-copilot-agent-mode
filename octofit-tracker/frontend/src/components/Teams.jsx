import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';
import { parseApiResponse } from '../utils/parseApiResponse';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${getApiBaseUrl()}/teams/`;

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
