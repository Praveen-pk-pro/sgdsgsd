
import React from 'react';
import { Target, Weight, Footprints, Zap, Check } from 'lucide-react';
import { UserGoal } from '../types';

interface GoalSettingsProps {
  goal: UserGoal;
  onUpdateGoal: (goal: UserGoal) => void;
}

const GoalSettings: React.FC<GoalSettingsProps> = ({ goal, onUpdateGoal }) => {
  const goalTypes = [
    { id: 'weight-loss', label: 'Weight Loss', icon: Weight, color: 'text-orange-600', bg: 'bg-orange-50' },
    { id: 'muscle-gain', label: 'Muscle Gain', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { id: 'endurance', label: 'Endurance', icon: Footprints, color: 'text-green-600', bg: 'bg-green-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Your Goals</h1>
        <p className="text-slate-500">Define your targets to help the AI guide you.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 mb-6 flex items-center gap-2">
              <Target size={20} className="text-indigo-600" />
              Primary Goal Type
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {goalTypes.map(type => {
                const Icon = type.icon;
                const isSelected = goal.type === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => onUpdateGoal({ ...goal, type: type.id as any })}
                    className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50/30' 
                        : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-2 right-2 bg-indigo-600 text-white rounded-full p-0.5">
                        <Check size={12} />
                      </div>
                    )}
                    <div className={`${type.bg} ${type.color} p-3 rounded-xl w-fit mb-4`}>
                      <Icon size={24} />
                    </div>
                    <span className="font-bold text-slate-800">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-8">
            <h3 className="font-bold text-lg text-slate-800 mb-6">Target Metrics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-600">Target Weight (kg)</label>
                  <span className="text-indigo-600 font-bold">{goal.targetWeight} kg</span>
                </div>
                <input 
                  type="range"
                  min="40"
                  max="150"
                  step="0.5"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={goal.targetWeight}
                  onChange={e => onUpdateGoal({ ...goal, targetWeight: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-600">Daily Steps Goal</label>
                  <span className="text-indigo-600 font-bold">{goal.targetSteps.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min="1000"
                  max="30000"
                  step="500"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={goal.targetSteps}
                  onChange={e => onUpdateGoal({ ...goal, targetSteps: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-600">Daily Calorie Target</label>
                  <span className="text-indigo-600 font-bold">{goal.targetCalories.toLocaleString()} kcal</span>
                </div>
                <input 
                  type="range"
                  min="1200"
                  max="5000"
                  step="100"
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  value={goal.targetCalories}
                  onChange={e => onUpdateGoal({ ...goal, targetCalories: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-indigo-600 p-8 rounded-3xl text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold text-xl mb-4">Pro Tip</h3>
              <p className="text-indigo-100 text-sm leading-relaxed">
                Setting realistic, incremental goals increases long-term adherence by up to 60%. Start small and scale as you build habits!
              </p>
            </div>
            <Zap className="absolute -bottom-4 -right-4 text-indigo-500 opacity-20" size={120} />
          </div>

          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Milestones</h3>
            <div className="space-y-4">
              {[
                { label: 'First 5k Run', done: true },
                { label: 'Lose 2kg', done: false },
                { label: '7 Day Streak', done: true },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${m.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-300'}`}>
                    {m.done && <Check size={12} />}
                  </div>
                  <span className={`text-sm ${m.done ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>{m.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalSettings;
