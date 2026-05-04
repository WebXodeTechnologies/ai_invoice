import { useState } from "react";
import { Search, Plus, Maximize, Bell, ChevronDown, Zap, Menu, X, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { notificationsData } from "../../utils/data";
import Button from "../ui/Button";

const Navbar = ({ isMobile, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100 h-16 flex items-center shadow-sm">
      <div className="flex items-center justify-between w-full px-4 md:px-6 lg:px-8 gap-4">
        
        {/* LEFT: Sidebar Toggle & Mobile Toggle */}
        <div className="flex items-center gap-3">
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2.5 hover:bg-blue-50 text-zinc-600 hover:text-blue-600 rounded-xl transition-all border border-zinc-100 lg:hidden"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}
        </div>

        {/* CENTER: Left-aligned Search Bar */}
        <div className="hidden lg:flex items-center w-full max-w-[280px] xl:max-w-md transition-all duration-300">
          <div className={`flex items-center w-full px-4 py-2 rounded-xl border transition-all duration-300 ${
            isSearchFocused 
            ? 'bg-white border-blue-600 shadow-lg shadow-blue-900/5 ring-4 ring-blue-600/5' 
            : 'bg-zinc-100/80 border-transparent hover:bg-zinc-200/50'
          }`}>
            <Search size={16} className={isSearchFocused ? "text-blue-600" : "text-zinc-500"} />
            <input
              type="text"
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search directory..."
              className="bg-transparent border-none outline-none text-[12px] ml-3 w-full text-zinc-800 font-bold placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* RIGHT: Action Group */}
        <div className="flex items-center justify-end gap-2 md:gap-4 shrink-0">
          
          {/* Quick Action Dropdown */}
          <div className="relative">
            <Button
              variant="primary"
              size="small"
              icon={Plus}
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="bg-blue-600 hover:bg-blue-700 h-9 sm:h-10 px-3 sm:px-4 rounded-xl shadow-blue-200 shadow-lg"
            >
              <span className="hidden xl:inline-block ml-1 font-black text-[12px] uppercase tracking-wider">Quick Action</span>
              <ChevronDown size={14} className={`ml-1 transition-transform ${showQuickActions ? "rotate-180" : ""}`} />
            </Button>

            {showQuickActions && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowQuickActions(false)} />
                <div className="absolute right-0 mt-3 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 text-[10px] font-black text-zinc-400 uppercase tracking-widest">Generate</div>
                  <button
                    onClick={() => { navigate("/invoices/new"); setShowQuickActions(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold text-zinc-800 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                  >
                    <Plus size={14} /> New Invoice
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-bold text-zinc-800 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                    <Zap size={14} /> AI Smart Scan
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Tools & Notifications */}
          <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl p-0.5 sm:p-1">
            <button 
              onClick={handleFullscreen}
              className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all hidden md:block"
            >
              <Maximize size={16} />
            </button>

            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-lg transition-all relative ${showNotifications ? "bg-white text-blue-600 shadow-sm" : "text-zinc-500 hover:text-blue-600 hover:bg-white"}`}
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                )}
              </button>

              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowNotifications(false)} />
                  <div className="absolute -right-10 sm:right-0 mt-3 w-72 sm:w-96 bg-white border border-zinc-100 rounded-[2rem] shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                      <span className="text-[12px] font-black text-zinc-900 uppercase tracking-widest">Notifications</span>
                      <span className="text-[10px] bg-blue-600 text-white px-2.5 py-1 rounded-lg font-black uppercase">{unreadCount} New</span>
                    </div>

                    <div className="max-h-80 overflow-y-auto no-scrollbar divide-y divide-zinc-50">
                      {notificationsData.map((notif) => {
                        const IconComponent = notif.icon;
                        return (
                          <div 
                            key={notif.id} 
                            className="p-4 flex gap-4 hover:bg-blue-50/30 transition-colors cursor-pointer relative group"
                          >
                            {notif.unread && (
                              <div className="absolute left-0 top-0 w-1 h-full bg-blue-600" />
                            )}
                            <div className={`shrink-0 w-10 h-10 rounded-2xl ${notif.bgColor} flex items-center justify-center ${notif.iconColor}`}>
                              <IconComponent size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <p className="text-[12px] font-black text-zinc-900 leading-tight truncate max-w-[150px] sm:max-w-none">
                                  {notif.title}
                                </p>
                                <span className="text-[10px] text-zinc-400 font-bold flex items-center gap-1 whitespace-nowrap">
                                  <Clock size={10} /> {notif.time}
                                </span>
                              </div>
                              <p className="text-[11px] text-zinc-500 font-medium mt-1 leading-relaxed line-clamp-2">
                                {notif.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <button className="w-full py-4 text-[11px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50 transition-colors border-t border-zinc-100">
                      Clear All Notifications
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Profile Section */}
          <div className="pl-2 border-l border-zinc-200">
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;