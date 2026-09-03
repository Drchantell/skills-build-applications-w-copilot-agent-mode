import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/parseApiResponse';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : '/api/leaderboard/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setEntries(parseApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      {error && (
        <p className="text-danger">Error loading leaderboard: {error}</p>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            {entries.length > 0 &&
              Object.keys(entries[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry._id || entry.id}>
              {Object.values(entry).map((value, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
