import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import db from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'octofit-backend',
    port,
    baseUrl,
    mongoState: db.readyState,
  });
});

app.get('/api/users/', async (_req, res) => {
  const data = await User.find().sort({ name: 1 }).lean();

  res.json({
    endpoint: `${baseUrl}/api/users/`,
    data,
  });
});

app.get('/api/teams/', async (_req, res) => {
  const data = await Team.find()
    .populate('coach', 'name email role')
    .populate('members', 'name email fitnessLevel')
    .sort({ name: 1 })
    .lean();

  res.json({
    endpoint: `${baseUrl}/api/teams/`,
    data,
  });
});

app.get('/api/activities/', async (_req, res) => {
  const data = await Activity.find()
    .populate('user', 'name email')
    .populate('team', 'name')
    .sort({ activityDate: -1 })
    .lean();

  res.json({
    endpoint: `${baseUrl}/api/activities/`,
    data,
  });
});

app.get('/api/leaderboard/', async (_req, res) => {
  const data = await Leaderboard.find()
    .populate('user', 'name email')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();

  res.json({
    endpoint: `${baseUrl}/api/leaderboard/`,
    data,
  });
});

app.get('/api/workouts/', async (_req, res) => {
  const data = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();

  res.json({
    endpoint: `${baseUrl}/api/workouts/`,
    data,
  });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
