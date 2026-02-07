
export enum Intensity {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High'
}

export interface Workout {
  id: string;
  type: string;
  duration: number; // in minutes
  intensity: Intensity;
  caloriesBurned: number;
  date: string;
}

export interface DailyStats {
  steps: number;
  waterIntake: number; // in ml
  caloriesConsumed: number;
  weight: number;
  date: string;
}

export interface UserGoal {
  type: 'weight-loss' | 'muscle-gain' | 'endurance';
  targetWeight: number;
  targetSteps: number;
  targetCalories: number;
}

export interface AppState {
  workouts: Workout[];
  dailyStats: DailyStats[];
  goal: UserGoal;
}
