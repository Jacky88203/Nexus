
import React, { useState } from 'react';
import { AppView } from './types';
import Sidebar from './components/Sidebar';
import ChatView from './components/ChatView';
import ResearchView from './components/ResearchView';
import ImageView from './components/ImageView';
import { Icons } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.CHAT);

  const renderContent = () => {
    switch (view) {
      case AppView.CHAT:
        return <ChatView />;
      case AppView.RESEARCH:
        return <ResearchView />;
      case AppView.IMAGE:
        return <ImageView />;
      case AppView.SETTINGS:
        return (
          <div className="p-8 max-w-2xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold">System Settings</h1>
            <div className="space-y-4">
              <div className="glass p-6 rounded-2xl border border-slate-800">
                <h3 className="font-semibold mb-2">API Configuration</h3>
                <p className="text-sm text-slate-400 mb-4">Your Gemini API key is managed via environment variables for security.</p>
                <div className="flex items-center gap-3 text-emerald-400 bg-emerald-400/10 p-4 rounded-xl text-sm border border-emerald-400/20">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>API Key Active & Optimized for Google AI Studio deployment.</span>
                </div>
              </div>
              
              <div className="glass p-6 rounded-2xl border border-slate-800">
                <h3 className="font-semibold mb-2">About Nexus Studio</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  A high-performance creative suite leveraging Gemini 3.0 models.
                  Designed for speed, accuracy, and creative freedom.
                </p>
                <div className="mt-6 flex gap-4">
                   <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono">v1.0.4-stable</div>
                   <div className="bg-slate-800 px-3 py-1 rounded-full text-xs font-mono">React 18+</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <ChatView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {/* Top Header for Mobile */}
        <header className="md:hidden glass p-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-xs">
              <i className="fa-solid fa-bolt"></i>
            </div>
            <span className="font-bold tracking-tight">Nexus</span>
          </div>
          <button className="text-slate-400 p-2">
            <Icons.User />
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
