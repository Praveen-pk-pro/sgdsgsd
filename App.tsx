
import React, { useState, useEffect } from 'react';
import { AppState, Workout, DailyStats, UserGoal } from './types';
import { INITIAL_STATE } from './constants';
import Dashboard from './components/Dashboard';
import WorkoutLog from './components/WorkoutLog';
import GoalSettings from './components/GoalSettings';
import AIInsights from './components/AIInsights';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('fitpulse_data');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'workouts' | 'goals' | 'ai'>('dashboard');

  useEffect(() => {
    localStorage.setItem('fitpulse_data', JSON.stringify(state));
  }, [state]);

  const addWorkout = (workout: Workout) => {
    setState(prev => ({ ...prev, workouts: [workout, ...prev.workouts] }));
  };

  const updateDailyStats = (stats: Partial<DailyStats>) => {
    const today = new Date().toISOString().split('T')[0];
    setState(prev => {
      const existingIndex = prev.dailyStats.findIndex(s => s.date === today);
      let newStats = [...prev.dailyStats];
      
      if (existingIndex > -1) {
        newStats[existingIndex] = { ...newStats[existingIndex], ...stats };
      } else {
        newStats.unshift({
          steps: 0,
          waterIntake: 0,
          caloriesConsumed: 0,
          weight: prev.dailyStats[0]?.weight || 70,
          date: today,
          ...stats
        });
      }
      return { ...prev, dailyStats: newStats };
    });
  };

  const updateGoal = (goal: UserGoal) => {
    setState(prev => ({ ...prev, goal }));
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard 
              state={state} 
              updateStats={updateDailyStats} 
            />
          )}
          {activeTab === 'workouts' && (
            <WorkoutLog 
              workouts={state.workouts} 
              onAddWorkout={addWorkout} 
            />
          )}
          {activeTab === 'goals' && (
            <GoalSettings 
              goal={state.goal} 
              onUpdateGoal={updateGoal} 
            />
          )}
          {activeTab === 'ai' && (
            <AIInsights state={state} />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
