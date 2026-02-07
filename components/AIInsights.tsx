
import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Loader2, ArrowRight, AlertCircle, TrendingUp, Heart, CheckCircle2 } from 'lucide-react';
import { getAIInsights } from '../services/gemini';
import { AppState } from '../types';

interface Insight {
  title: string;
  advice: string;
  priority: 'High' | 'Medium' | 'Low';
}

const AIInsights: React.FC<{ state: AppState }> = ({ state }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const result = await getAIInsights(state);
      setInsights(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
            AI Health Coach
            <div className="bg-indigo-100 text-indigo-600 p-1.5 rounded-lg">
              <Sparkles size={20} />
            </div>
          </h1>
          <p className="text-slate-500">Personalized data-driven advice powered by Gemini.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 hover:bg-slate-50 transition-all font-bold disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Brain size={18} />}
          Refresh Insights
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin" />
            <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600" size={24} />
          </div>
          <p className="text-slate-500 font-medium animate-pulse">Analyzing your activity patterns...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => (
            <div 
              key={idx} 
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 p-2 rounded-bl-2xl text-[10px] font-bold uppercase tracking-widest ${
                insight.priority === 'High' ? 'bg-red-50 text-red-600' :
                insight.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                'bg-green-50 text-green-600'
              }`}>
                {insight.priority} Priority
              </div>
              
              <div className="mb-6 bg-slate-50 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                {idx === 0 ? <TrendingUp size={24} /> : idx === 1 ? <Heart size={24} /> : <CheckCircle2 size={24} />}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">{insight.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm mb-6">
                {insight.advice}
              </p>

              <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:gap-3 transition-all">
                Implement Plan <ArrowRight size={16} />
              </button>
            </div>
          ))}

          {insights.length === 0 && !loading && (
             <div className="col-span-full bg-white p-12 rounded-3xl border border-slate-100 flex flex-col items-center text-center">
                <AlertCircle size={48} className="text-slate-300 mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Insights Yet</h3>
                <p className="text-slate-500 max-w-sm">
                  Log more workouts and update your daily stats to receive personalized AI recommendations.
                </p>
             </div>
          )}
        </div>
      )}

      {/* Recommendations Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-700 p-10 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
         <div className="max-w-xl relative z-10">
           <h2 className="text-3xl font-bold mb-4">Smart Meal Suggestion</h2>
           <p className="text-indigo-100 mb-8 leading-relaxed">
             Based on your {state.workouts[0]?.type || 'recent activity'} session, your body needs complex carbs and protein to recover. We suggest Grilled Salmon with Quinoa and steamed broccoli.
           </p>
           <div className="flex flex-wrap gap-4">
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium">Protein: 35g</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium">Carbs: 45g</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium">Calories: 520kcal</span>
           </div>
         </div>
         <div className="absolute top-1/2 right-[-5%] -translate-y-1/2 opacity-20 rotate-12 scale-150">
            <Sparkles size={240} />
         </div>
      </div>
    </div>
  );
};

export default AIInsights;
