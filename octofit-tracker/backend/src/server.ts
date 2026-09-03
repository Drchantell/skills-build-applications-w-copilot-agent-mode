import express from 'express';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT || 8000);

const codespaceName = process.env.CODESPACE_NAME;
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const mockData = {
  users: [
    { id: 1, name: 'Ada Chen', email: 'ada@example.com', fitnessLevel: 'advanced' },
    { id: 2, name: 'Milo Brown', email: 'milo@example.com', fitnessLevel: 'intermediate' },
    { id: 3, name: 'Priya Shah', email: 'priya@example.com', fitnessLevel: 'beginner' }
  ],
  teams: [
    { id: 1, name: 'Peak Performers', members: ['Ada Chen', 'Milo Brown'] },
    { id: 2, name: 'Momentum Crew', members: ['Priya Shah'] }
  ],
  activities: [
    { id: 1, type: 'run', duration: 35, distance: 5.2 },
    { id: 2, type: 'strength', duration: 45, distance: 0 },
    { id: 3, type: 'cycling', duration: 60, distance: 18.6 }
  ],
  leaderboard: [
    { rank: 1, name: 'Ada Chen', points: 980 },
    { rank: 2, name: 'Milo Brown', points: 872 },
    { rank: 3, name: 'Priya Shah', points: 784 }
  ],
  workouts: [
    { id: 1, title: 'HIIT Circuit', difficulty: 'moderate', durationMinutes: 30 },
    { id: 2, title: 'Steady-State Ride', difficulty: 'easy', durationMinutes: 40 },
    { id: 3, title: 'Strength Builder', difficulty: 'moderate', durationMinutes: 50 }
  ]
};

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({
    name: 'Octofit Tracker API',
    status: 'running',
    apiUrl: apiBaseUrl,
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/api/config', (_req, res) => {
  res.json({
    apiUrl: apiBaseUrl,
    codespaceName: codespaceName || null,
    port
  });
});

const respondWithResource = (resourceName: keyof typeof mockData, res: express.Response) => {
  res.json({
    message: `${resourceName.charAt(0).toUpperCase() + resourceName.slice(1)} retrieved successfully`,
    data: mockData[resourceName]
  });
};

app.get(['/api/users', '/api/users/'], (_req, res) => {
  respondWithResource('users', res);
});

app.get(['/api/teams', '/api/teams/'], (_req, res) => {
  respondWithResource('teams', res);
});

app.get(['/api/activities', '/api/activities/'], (_req, res) => {
  respondWithResource('activities', res);
});

app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
  respondWithResource('leaderboard', res);
});

app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
  respondWithResource('workouts', res);
});

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const server = app.listen(port, () => {
  console.log(`Octofit Tracker API listening on ${apiBaseUrl}`);
  console.log(`Database connection status: ${db.name || 'initialized'}`);
});

export { app, server };
