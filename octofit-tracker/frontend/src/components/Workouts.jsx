import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/parseApiResponse';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
      : '/api/workouts/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWorkouts(parseApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      {error && (
        <p className="text-danger">Error loading workouts: {error}</p>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            {workouts.length > 0 &&
              Object.keys(workouts[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {workouts.map((workout) => (
            <tr key={workout._id || workout.id}>
              {Object.values(workout).map((value, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Workouts;
