// Builds the base URL for the logic tier (Express/API) depending on the environment.
//
// When running in a GitHub Codespace, the backend is reachable at the
// forwarded Codespaces URL for port 8000, which requires the Codespace name
// (`VITE_CODESPACE_NAME`) to be set as a Vite environment variable, e.g. in
// `octofit-tracker/frontend/.env.local`:
//
//   VITE_CODESPACE_NAME=your-codespace-name
//
// If `VITE_CODESPACE_NAME` is unset/empty (for example, running locally
// outside of a Codespace), we fall back to a relative `/api` base so the app
// never constructs an invalid `https://undefined-8000...` URL.
export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return '/api';
};
