import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Users, Sparkles,
  Settings, Briefcase, ChevronLeft,
  Menu, BarChart3, LayoutPanelLeft, Zap,
  HelpCircle
} from 'lucide-react';

const Sidebar = ({ isOpen, isMobile, setOpen }) => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navGroups = [
    {
      group: "Management",
      items: [
        { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { label: "Invoices", icon: FileText, path: "/invoices" },
        { label: "Clients", icon: Users, path: "/clients" },
        { label: "AI Insights", icon: Sparkles, path: "/ai-insights", pro: true },
        { label: "Settings", icon: Settings, path: "/settings" },
      ]
    },
    {
      group: "Resources",
      items: [
        { label: "Reports", icon: BarChart3, path: "/reports" },
        { label: "Templates", icon: LayoutPanelLeft, path: "/templates" },
        { label: "AI Generator", icon: Zap, path: "/ai-generator", pro: true },
      ]
    }
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-60 bg-white border-r border-slate-200 transition-all duration-300 ease-in-out ${isMobile ? (isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64") : (isCollapsed ? "w-20" : "w-64")}`}>
      <div className="flex flex-col h-full relative">

        {/* Collapse Toggle */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-3 top-10 bg-white border border-slate-200 rounded-full p-1 text-slate-400 hover:text-blue-600 shadow-sm z-70 transition-colors"
          >
            {isCollapsed ? <Menu size={12} /> : <ChevronLeft size={12} />}
          </button>
        )}

        {/* Brand Identity - Now Wrapped in Link */}
        <Link
          to="/dashboard"
          className={`h-16 flex items-center px-6 gap-3 mb-2 hover:opacity-80 transition-opacity ${isCollapsed ? 'justify-center px-0' : ''}`}
        >
          <div className="bg-blue-600 p-2.5 rounded-xl shrink-0 shadow-lg shadow-blue-100">
            <Briefcase size={20} className="text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap animate-in fade-in duration-500">
              <span className="text-zinc-900 font-semibold text-lg tracking-normal leading-none">AI invoice App</span>
              <span className="text-[10px] text-blue-600 font-extrabold uppercase tracking-widest mt-1">Powered by AI</span>
            </div>
          )}
        </Link>

        {/* Nav Content */}
        <div className="flex-1 px-3 space-y-8 overflow-y-auto py-6 no-scrollbar">
          {navGroups.map((group) => (
            <div key={group.group} className="space-y-2">
              {!isCollapsed && (
                <p className="px-4 text-sm font-extrabold text-zinc-900 uppercase tracking-widest mb-4">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => isMobile && setOpen(false)}
                    className={`flex items-center rounded-xl transition-all duration-200 group relative ${isCollapsed ? 'justify-center p-3' : 'px-4 py-2.5 justify-between'} 
                    ${isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-zinc-800 hover:bg-zinc-50 hover:text-zinc-900"}`}
                  >
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <Icon
                          size={20}
                          strokeWidth={isActive ? 2.5 : 2}
                          className={isActive ? "text-blue-600" : "group-hover:text-blue-500 transition-colors"}
                        />
                      )}
                      {!isCollapsed && <span className="text-sm tracking-tight">{item.label}</span>}
                    </div>

                    {!isCollapsed && item.pro && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-black border ${isActive ? "bg-blue-600 border-blue-600 text-white" : "bg-blue-50 border-blue-100 text-blue-600"}`}>
                        PRO
                      </span>
                    )}

                    {isActive && isCollapsed && (
                      <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Area */}
        <div className="p-4 mt-auto">
          {!isCollapsed ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 shadow-sm group hover:border-blue-200 transition-all">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-blue-100 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors text-blue-600">
                      <Zap size={12} fill="currentColor" />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Credits</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600">84%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full w-[84%] bg-linear-to-r from-blue-500 to-blue-600 rounded-full group-hover:from-blue-600 group-hover:to-indigo-600 transition-all" />
                </div>
                <p className="text-[11px] text-zinc-400 mt-3 font-medium leading-tight group-hover:text-zinc-500 transition-colors">
                  You've used <span className="text-zinc-900 font-bold">1,240</span> of 1,500 monthly AI scans.
                </p>
              </div>
              <button className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white border border-zinc-200 rounded-xl text-xs font-bold text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 transition-all group">
                <HelpCircle size={14} className="text-zinc-400 group-hover:text-blue-600" />
                Help & Documentation
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Link to="/dashboard" className="h-10 w-10 flex items-center justify-center rounded-xl bg-zinc-50 border border-zinc-100 text-blue-600 hover:bg-blue-50 cursor-pointer transition-all">
                <Zap size={18} fill="currentColor" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;