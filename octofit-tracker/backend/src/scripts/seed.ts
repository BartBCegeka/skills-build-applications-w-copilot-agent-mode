import mongoose from 'mongoose';

import { Activity, Leaderboard, Team, User, Workout } from '../models';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        name: 'Mona Rivera',
        email: 'mona.rivera@example.com',
        role: 'coach',
        age: 34,
        fitnessLevel: 'advanced',
      },
      {
        name: 'Theo Brooks',
        email: 'theo.brooks@example.com',
        role: 'member',
        age: 29,
        fitnessLevel: 'intermediate',
      },
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        role: 'member',
        age: 26,
        fitnessLevel: 'advanced',
      },
      {
        name: 'Sam Patel',
        email: 'sam.patel@example.com',
        role: 'member',
        age: 41,
        fitnessLevel: 'beginner',
      },
      {
        name: 'Jordan Kim',
        email: 'jordan.kim@example.com',
        role: 'coach',
        age: 38,
        fitnessLevel: 'advanced',
      },
    ]);

    const [mona, theo, ava, sam, jordan] = users;

    const teams = await Team.create([
      {
        name: 'Octo Crushers',
        description: 'Strength-focused team chasing weekly consistency goals.',
        coach: mona._id,
        members: [mona._id, theo._id, ava._id],
      },
      {
        name: 'Cardio Coders',
        description: 'Endurance group built around runs, rides, and recovery.',
        coach: jordan._id,
        members: [jordan._id, sam._id],
      },
    ]);

    const [octoCrushers, cardioCoders] = teams;

    await Activity.create([
      {
        user: theo._id,
        team: octoCrushers._id,
        type: 'Strength Training',
        durationMinutes: 52,
        caloriesBurned: 420,
        activityDate: new Date('2026-07-01T17:30:00.000Z'),
      },
      {
        user: ava._id,
        team: octoCrushers._id,
        type: 'Trail Run',
        durationMinutes: 46,
        caloriesBurned: 510,
        activityDate: new Date('2026-07-02T06:45:00.000Z'),
      },
      {
        user: sam._id,
        team: cardioCoders._id,
        type: 'Zone 2 Bike Ride',
        durationMinutes: 38,
        caloriesBurned: 310,
        activityDate: new Date('2026-07-03T12:15:00.000Z'),
      },
      {
        user: mona._id,
        team: octoCrushers._id,
        type: 'Mobility Flow',
        durationMinutes: 25,
        caloriesBurned: 140,
        activityDate: new Date('2026-07-04T08:00:00.000Z'),
      },
    ]);

    await Leaderboard.create([
      {
        user: ava._id,
        team: octoCrushers._id,
        points: 1280,
        rank: 1,
        weeklyMinutes: 246,
      },
      {
        user: theo._id,
        team: octoCrushers._id,
        points: 1125,
        rank: 2,
        weeklyMinutes: 214,
      },
      {
        user: sam._id,
        team: cardioCoders._id,
        points: 790,
        rank: 3,
        weeklyMinutes: 158,
      },
    ]);

    await Workout.create([
      {
        title: 'Starter Core Circuit',
        description: 'Low-impact core and stability work for building a base.',
        difficulty: 'beginner',
        durationMinutes: 24,
        focusArea: 'Core',
      },
      {
        title: 'Tempo Run Builder',
        description: 'Structured run intervals to improve sustainable pace.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        focusArea: 'Cardio',
      },
      {
        title: 'Power Hypertrophy Split',
        description: 'Heavy compound lifts paired with accessory volume.',
        difficulty: 'advanced',
        durationMinutes: 58,
        focusArea: 'Strength',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
