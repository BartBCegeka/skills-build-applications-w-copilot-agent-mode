import { Schema, model, models, Types } from 'mongoose';

export interface UserDocument {
  name: string;
  email: string;
  role: 'member' | 'coach';
  age: number;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface TeamDocument {
  name: string;
  description: string;
  members: Types.ObjectId[];
  coach: Types.ObjectId;
}

export interface ActivityDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  activityDate: Date;
}

export interface LeaderboardDocument {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  weeklyMinutes: number;
}

export interface WorkoutDocument {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusArea: string;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['member', 'coach'], required: true },
    age: { type: Number, required: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
  },
  { timestamps: true },
);

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    coach: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    weeklyMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<WorkoutDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
  },
  { timestamps: true },
);

export const User = models.User || model<UserDocument>('User', userSchema);
export const Team = models.Team || model<TeamDocument>('Team', teamSchema);
export const Activity =
  models.Activity || model<ActivityDocument>('Activity', activitySchema);
export const Leaderboard =
  models.Leaderboard ||
  model<LeaderboardDocument>('Leaderboard', leaderboardSchema);
export const Workout =
  models.Workout || model<WorkoutDocument>('Workout', workoutSchema);