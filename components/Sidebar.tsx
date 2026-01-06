
import React from 'react';
import { AppView } from '../types';
import { Icons } from '../constants';

interface SidebarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: AppView.CHAT, label: 'Nexus Chat', icon: Icons.Chat },
    { id: AppView.RESEARCH, label: 'Research Lab', icon: Icons.Search },
    { id: AppView.IMAGE, label: 'Imagine Studio', icon: Icons.Image },
  ];

  return (
    <aside className="w-20 md:w-64 flex flex-col glass border-r border-slate-800 h-screen transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-bolt text-white"></i>
        </div>
        <span className="hidden md:block font-bold text-xl tracking-tight">Nexus Studio</span>
      </div>

      <nav className="flex-1 mt-6 px-3 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
              currentView === item.id 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
              : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className="text-xl shrink-0"><item.icon /></span>
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={() => setView(AppView.SETTINGS)}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
            currentView === AppView.SETTINGS 
            ? 'bg-slate-800 text-white' 
            : 'text-slate-400 hover:text-white'
          }`}
        >
          <span className="text-xl shrink-0"><Icons.Settings /></span>
          <span className="hidden md:block font-medium text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
