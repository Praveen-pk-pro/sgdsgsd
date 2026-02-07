
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { 
  Footprints, 
  Flame, 
  Droplets, 
  Scale, 
  Plus,
  ArrowRight
} from 'lucide-react';
import { AppState, DailyStats } from '../types';

interface DashboardProps {
  state: AppState;
  updateStats: (stats: Partial<DailyStats>) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ state, updateStats }) => {
  const today = state.dailyStats[0] || { steps: 0, waterIntake: 0, caloriesConsumed: 0, weight: 0 };
  
  const stepProgress = Math.min((today.steps / state.goal.targetSteps) * 100, 100);
  const calorieProgress = Math.min((today.caloriesConsumed / state.goal.targetCalories) * 100, 100);

  // Prepare chart data (reverse for chronological order)
  const chartData = [...state.dailyStats].slice(0, 7).reverse();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome Back!</h1>
          <p className="text-slate-500">Here's your progress for today, {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}.</p>
        </div>
        <div className="flex gap-2">
           <button 
             onClick={() => updateStats({ waterIntake: today.waterIntake + 250 })}
             className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-700 hover:bg-indigo-50 hover:border-indigo-200 transition-all font-medium"
           >
             <Droplets size={18} className="text-blue-500" />
             +250ml
           </button>
        </div>
      </header>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Footprints className="text-orange-500" />} 
          label="Steps" 
          value={today.steps.toLocaleString()} 
          target={state.goal.targetSteps.toLocaleString()}
          color="bg-orange-50"
          progress={stepProgress}
          onClick={() => {
            const val = prompt("Enter steps count:", today.steps.toString());
            if (val) updateStats({ steps: parseInt(val) });
          }}
        />
        <StatCard 
          icon={<Flame className="text-red-500" />} 
          label="Calories" 
          value={today.caloriesConsumed.toLocaleString()} 
          target={state.goal.targetCalories.toLocaleString()}
          color="bg-red-50"
          progress={calorieProgress}
          onClick={() => {
            const val = prompt("Enter calories consumed:", today.caloriesConsumed.toString());
            if (val) updateStats({ caloriesConsumed: parseInt(val) });
          }}
        />
        <StatCard 
          icon={<Droplets className="text-blue-500" />} 
          label="Water (ml)" 
          value={today.waterIntake.toLocaleString()} 
          target="3000"
          color="bg-blue-50"
          progress={Math.min((today.waterIntake / 3000) * 100, 100)}
          onClick={() => {
             const val = prompt("Enter water intake in ml:", today.waterIntake.toString());
             if (val) updateStats({ waterIntake: parseInt(val) });
          }}
        />
        <StatCard 
          icon={<Scale className="text-indigo-500" />} 
          label="Weight (kg)" 
          value={today.weight.toString()} 
          target={state.goal.targetWeight.toString()}
          color="bg-indigo-50"
          progress={75} // Arbitrary
          onClick={() => {
            const val = prompt("Enter current weight:", today.weight.toString());
            if (val) updateStats({ weight: parseFloat(val) });
          }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Weekly Steps</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">7 Day Trend</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="steps" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm shadow-slate-200/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 text-lg">Calories Intake</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="caloriesConsumed" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorCal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Workouts Mini List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-800 text-lg">Recent Activities</h3>
          <button className="text-indigo-600 text-sm font-semibold hover:underline flex items-center gap-1">
            View All <ArrowRight size={14} />
          </button>
        </div>
        <div className="space-y-4">
          {state.workouts.slice(0, 3).map(w => (
            <div key={w.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-white p-2.5 rounded-xl shadow-sm">
                  <Dumbbell className="text-indigo-600" size={20} />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{w.type}</p>
                  <p className="text-xs text-slate-500">{new Date(w.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-indigo-600">{w.caloriesBurned} kcal</p>
                <p className="text-xs text-slate-500">{w.duration} mins • {w.intensity}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ 
  icon: React.ReactNode, 
  label: string, 
  value: string, 
  target: string, 
  color: string, 
  progress: number,
  onClick: () => void
}> = ({ icon, label, value, target, color, progress, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
  >
    <div className="flex items-center justify-between mb-4">
      <div className={`${color} p-3 rounded-2xl group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <Plus size={18} className="text-slate-300 group-hover:text-slate-500" />
    </div>
    <div className="space-y-1">
      <p className="text-slate-500 text-sm font-medium">{label}</p>
      <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
      <p className="text-xs text-slate-400 font-medium">Goal: {target}</p>
    </div>
    <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
      <div 
        className={`h-full transition-all duration-700 ease-out rounded-full ${
          progress >= 100 ? 'bg-green-500' : 'bg-indigo-500'
        }`}
        style={{ width: `${progress}%` }}
      />
    </div>
  </div>
);

import { Dumbbell } from 'lucide-react';

export default Dashboard;
