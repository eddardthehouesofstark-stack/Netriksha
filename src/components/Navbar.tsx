import React from 'react';
import { Eye, Sparkles, Activity, Layers, Database, Shield, Wifi } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, pendingCount = 7 }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Eye },
    { id: 'screen', label: 'Screen Patient', icon: Sparkles },
    { id: 'doctor', label: 'Doctor Triage', icon: Activity, badge: pendingCount },
    { id: 'pipeline', label: 'AI Pipeline & Datasets', icon: Database },
    { id: 'about', label: 'Rural XAI Impact', icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none group" 
          onClick={() => setActiveTab('home')}
          id="navbar-brand-logo"
        >
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-teal-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
              <Eye className="w-5 h-5 stroke-[2.3]" />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-teal-600 to-teal-700 bg-clip-text text-transparent">
                Netriksha
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                XAI Vision
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium hidden sm:block">Explainable Tele-Ophthalmology for Bharat</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Header Items */}
        <div className="flex items-center gap-2.5">
          {/* Edge/Offline PHC Ready status chip */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 text-xs font-medium">
            <Wifi className="w-3.5 h-3.5 text-teal-600" />
            <span className="text-[11px]">PHC Edge Sync</span>
          </div>

          <button
            id="nav-cta-start-screening"
            onClick={() => setActiveTab('screen')}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs hover:shadow transition-all duration-150 active:scale-98 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Screen Patient</span>
          </button>
        </div>
      </div>
      
      {/* Mobile navigation row */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-100 px-3 py-1.5 gap-1 bg-white/90">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg shrink-0 ${
                isActive ? 'bg-blue-50 text-blue-700' : 'text-slate-600'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
