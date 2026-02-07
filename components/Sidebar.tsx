
import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Target, 
  Sparkles,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'goals', icon: Target, label: 'Goals' },
    { id: 'ai', icon: Sparkles, label: 'AI Insights' },
  ];

  return (
    <nav className="w-20 md:w-64 bg-white border-r border-slate-200 flex flex-col items-center md:items-start p-4 transition-all duration-300">
      <div className="flex items-center gap-2 mb-12 px-2">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
          <Zap size={24} />
        </div>
        <span className="hidden md:block font-bold text-xl text-slate-800 tracking-tight">FitPulse AI</span>
      </div>

      <div className="flex-1 w-full space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-indigo-50 text-indigo-600' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-500'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600' : 'group-hover:scale-110 transition-transform'} />
              <span className={`hidden md:block font-medium ${isActive ? 'text-indigo-700' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:block p-4 mt-auto bg-slate-50 rounded-2xl border border-slate-100 w-full">
        <p className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Status</p>
        <p className="text-sm font-semibold text-slate-700">Premium Active</p>
      </div>
    </nav>
  );
};

export default Sidebar;
