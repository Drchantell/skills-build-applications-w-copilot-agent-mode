// Normalizes API responses so components can handle both shapes returned by
// the logic tier:
//   - a paginated response, e.g. `{ results: [...] }`
//   - a direct array response, e.g. `[...]`
export const parseApiResponse = (data) => {
  if (Array.isArray(data)) {
    return data;
  }

  if (data && Array.isArray(data.results)) {
    return data.results;
  }

  return [];
};
