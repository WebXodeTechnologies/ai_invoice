import { useState, useEffect } from "react";
import { 
  Briefcase, LogOut, Menu, X, LayoutDashboard, 
  FileText, Users, Sparkles, Settings, Bell, Search 
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

const DashboardLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { id: "invoices", label: "Invoices", icon: FileText, path: "/invoices" },
    { id: "clients", label: "Clients", icon: Users, path: "/clients" },
    { id: "ai-insights", label: "AI Insights", icon: Sparkles, path: "/ai-insights", pro: true },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth < 1024;
      setIsMobile(mobileView);
      // Ensure sidebar is closed when switching to mobile, open when desktop
      if (!mobileView) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden antialiased text-slate-900">
      
      {/* 1. Sidebar - Fixed on desktop, sliding on mobile */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out
        ${isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link className="flex items-center space-x-3 group" to="/dashboard">
              <div className="h-9 w-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-slate-900 font-bold text-lg">AI Invoice</span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => isMobile && setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group
                    ${isActive 
                      ? "bg-blue-50 text-blue-600 font-bold shadow-sm" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={`h-5 w-5 ${isActive ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span className="text-sm font-medium tracking-wide">{item.label}</span>
                  </div>
                  {item.pro && !isActive && (
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-extrabold border border-blue-200">PRO</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-100">
            <button 
              onClick={() => { logout(); navigate('/login'); }}
              className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all group"
            >
              <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 3. Main Content Wrapper */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${!isMobile ? "ml-64" : "ml-0"}`}>
        
        {/* Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isMobile && (
              <button 
                onClick={toggleSidebar} 
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200"
              >
                {sidebarOpen ? <X size={20} className="text-slate-900" /> : <Menu size={20} className="text-slate-900" />}
              </button>
            )}
            
            <div className="flex flex-col">
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                Welcome, <span className="text-blue-600 font-extrabold">{user?.name || "Member"}</span>!
              </h1>
              <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                Overview
              </p>
            </div>
          </div>

          {/* Right Header Area */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
               <Search size={14} className="text-slate-400 mr-2" />
               <input type="text" placeholder="Search..." className="bg-transparent text-xs outline-none w-32 focus:w-48 transition-all" />
            </div>
            
            <ProfileDropdown 
              isOpen={profileDropdownOpen} 
              onToggle={() => setProfileDropdownOpen(!profileDropdownOpen)} 
            />
          </div>
        </header>
        
        {/* Main Content Area */}
        <main className="p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;