
import React, { useState } from 'react';
import { Plus, Dumbbell, Clock, Activity, Zap } from 'lucide-react';
import { Workout, Intensity } from '../types';
import { EXERCISE_TYPES } from '../constants';

interface WorkoutLogProps {
  workouts: Workout[];
  onAddWorkout: (workout: Workout) => void;
}

const WorkoutLog: React.FC<WorkoutLogProps> = ({ workouts, onAddWorkout }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Running',
    duration: 30,
    intensity: Intensity.MODERATE,
    caloriesBurned: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calories = formData.caloriesBurned || calculateEstimatedCalories(formData.type, formData.duration, formData.intensity);
    
    onAddWorkout({
      id: Date.now().toString(),
      type: formData.type,
      duration: formData.duration,
      intensity: formData.intensity,
      caloriesBurned: calories,
      date: new Date().toISOString()
    });
    setShowForm(false);
  };

  const calculateEstimatedCalories = (type: string, duration: number, intensity: Intensity) => {
    // Basic estimation
    let base = 5;
    if (intensity === Intensity.HIGH) base = 10;
    if (intensity === Intensity.LOW) base = 3;
    return duration * base;
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Workouts</h1>
          <p className="text-slate-500">Track your activities and calorie burn.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-100 flex items-center gap-2 hover:bg-indigo-700 transition-all active:scale-95"
        >
          <Plus size={20} />
          Log Workout
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl animate-in zoom-in-95 duration-300">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Exercise Type</label>
              <select 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={formData.type}
                onChange={e => setFormData({ ...formData, type: e.target.value })}
              >
                {EXERCISE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Duration (min)</label>
              <input 
                type="number"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={formData.duration}
                onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Intensity</label>
              <div className="flex gap-2">
                {[Intensity.LOW, Intensity.MODERATE, Intensity.HIGH].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData({ ...formData, intensity: lvl })}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold border transition-all ${
                      formData.intensity === lvl 
                        ? 'bg-indigo-600 border-indigo-600 text-white' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-300'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Calories (Optional)</label>
              <input 
                type="number"
                placeholder="Auto-calculated if empty"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={formData.caloriesBurned || ''}
                onChange={e => setFormData({ ...formData, caloriesBurned: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="md:col-span-2 flex gap-4 mt-2">
              <button 
                type="submit" 
                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Save Workout
              </button>
              <button 
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workouts.map(w => (
          <div key={w.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-6">
              <div className="bg-indigo-50 p-3 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                <Dumbbell size={24} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
                w.intensity === Intensity.HIGH ? 'bg-red-100 text-red-600' :
                w.intensity === Intensity.MODERATE ? 'bg-orange-100 text-orange-600' :
                'bg-green-100 text-green-600'
              }`}>
                {w.intensity}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800 mb-4">{w.type}</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Clock size={16} />
                <span className="text-sm font-medium">{w.duration} min</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Activity size={16} />
                <span className="text-sm font-medium">{w.caloriesBurned} kcal</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
               <span className="text-xs font-bold text-slate-400">
                 {new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
               </span>
               <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                     <img src={`https://picsum.photos/seed/${w.id + i}/24/24`} alt="avatar" />
                   </div>
                 ))}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutLog;
