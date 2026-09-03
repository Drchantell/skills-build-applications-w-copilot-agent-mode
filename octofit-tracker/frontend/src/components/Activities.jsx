import { useEffect, useState } from 'react';
import { parseApiResponse } from '../utils/parseApiResponse';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
    const apiUrl = codespaceName
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : '/api/activities/';

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setActivities(parseApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {error && (
        <p className="text-danger">Error loading activities: {error}</p>
      )}
      <table className="table table-striped">
        <thead>
          <tr>
            {activities.length > 0 &&
              Object.keys(activities[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity) => (
            <tr key={activity._id || activity.id}>
              {Object.values(activity).map((value, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Activities;
