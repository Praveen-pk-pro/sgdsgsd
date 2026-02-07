
import { Intensity, AppState } from './types';

export const INITIAL_STATE: AppState = {
  workouts: [
    { id: '1', type: 'Running', duration: 30, intensity: Intensity.HIGH, caloriesBurned: 350, date: new Date().toISOString() },
    { id: '2', type: 'Yoga', duration: 45, intensity: Intensity.LOW, caloriesBurned: 150, date: new Date(Date.now() - 86400000).toISOString() },
  ],
  dailyStats: [
    { steps: 8400, waterIntake: 2000, caloriesConsumed: 1800, weight: 75, date: new Date().toISOString().split('T')[0] },
    { steps: 6200, waterIntake: 1500, caloriesConsumed: 2100, weight: 75.2, date: new Date(Date.now() - 86400000).toISOString().split('T')[0] },
  ],
  goal: {
    type: 'weight-loss',
    targetWeight: 70,
    targetSteps: 10000,
    targetCalories: 2000
  }
};

export const EXERCISE_TYPES = [
  'Running', 'Cycling', 'Swimming', 'Walking', 'Weightlifting', 'Yoga', 'HIIT', 'Pilates', 'Other'
];
