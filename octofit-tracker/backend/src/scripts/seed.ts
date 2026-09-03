import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const seedData = {
  users: [
    { name: 'Ada Chen', email: 'ada@example.com', fitnessLevel: 'advanced' },
    { name: 'Milo Brown', email: 'milo@example.com', fitnessLevel: 'intermediate' },
    { name: 'Priya Shah', email: 'priya@example.com', fitnessLevel: 'beginner' }
  ],
  teams: [
    { name: 'Peak Performers', members: ['Ada Chen', 'Milo Brown'] },
    { name: 'Momentum Crew', members: ['Priya Shah'] }
  ],
  activities: [
    { type: 'run', duration: 35, distance: 5.2 },
    { type: 'strength', duration: 45, distance: 0 }
  ],
  workouts: [
    { title: 'HIIT Circuit', difficulty: 'moderate', durationMinutes: 30 },
    { title: 'Steady-State Ride', difficulty: 'easy', durationMinutes: 40 }
  ]
};

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    // Example seed placeholders. Replace with Mongoose models when the data schema is finalized.
    console.log('Seed payload ready:', JSON.stringify(seedData, null, 2));

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
