import { useEffect, useState } from 'react';
import { getApiBaseUrl } from '../config/api';
import { parseApiResponse } from '../utils/parseApiResponse';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = `${getApiBaseUrl()}/users/`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setUsers(parseApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      {error && <p className="text-danger">Error loading users: {error}</p>}
      <table className="table table-striped">
        <thead>
          <tr>
            {users.length > 0 &&
              Object.keys(users[0]).map((key) => <th key={key}>{key}</th>)}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id || user.id}>
              {Object.values(user).map((value, index) => (
                <td key={index}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
