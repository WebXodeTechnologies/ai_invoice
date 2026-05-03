import { useState } from "react";
import {
  Plus,
  Maximize,
  Bell,
  Search,
  ChevronDown,
  Zap,
  Menu,
  X,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
import { notificationsData } from "../../utils/data";
import Button from "../ui/Button"; // Import your custom button

const Navbar = ({ isMobile, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notificationsData.filter((n) => n.unread).length;

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8">
      {/* Left Section: Mobile Toggle */}
      <div className="flex items-center gap-4 z-10">
        {isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-zinc-100 rounded-xl transition-colors border border-zinc-200 text-zinc-600"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        )}
      </div>

      {/* Center Section: Search Bar */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center bg-zinc-100/80 border border-zinc-200 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:bg-white focus-within:border-zinc-400 transition-all w-full">
          <Search size={16} className="text-zinc-500" />
          <input
            type="text"
            placeholder="Search invoices, clients..."
            className="bg-transparent border-none outline-none text-sm ml-3 w-full text-zinc-800 placeholder:text-zinc-400 font-medium"
          />
        </div>
      </div>

      {/* Right Section: Action Tools */}
      <div className="flex items-center gap-2 md:gap-4 z-10">

        {/* Quick Actions using Custom Button Component */}
        <div className="relative">
          <Button
            variant="primary"
            size="medium"
            icon={Plus}
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="group"
          >
            <span className="hidden sm:inline">Quick Action</span>
            <ChevronDown
              size={14}
              className={`ml-2 transition-transform duration-200 ${showQuickActions ? "rotate-180" : ""
                }`}
            />
          </Button>

          {showQuickActions && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowQuickActions(false)}
              />
              <div className="absolute right-0 mt-3 w-60 bg-white border border-zinc-100 rounded-2xl shadow-xl z-20 py-2 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  Generate
                </div>
                <button
                  onClick={() => {
                    navigate("/invoices/new");
                    setShowQuickActions(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-800 hover:bg-zinc-50 transition-colors"
                >
                  <div className="p-1.5 bg-blue-50 rounded-lg">
                    <Plus size={14} className="text-blue-600" />
                  </div>
                  New Manual Invoice
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-800 hover:bg-zinc-50 transition-colors">
                  <div className="p-1.5 bg-amber-50 rounded-lg">
                    <Zap size={14} className="text-amber-600" />
                  </div>
                  AI Smart Scan
                </button>
              </div>
            </>
          )}
        </div>

        {/* Notifications & Tools Area */}
        <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-xl p-1 gap-1">
          <button
            onClick={handleFullscreen}
            className="p-2 text-zinc-500 hover:text-blue-600 hover:bg-white rounded-lg transition-all hidden md:block"
          >
            <Maximize size={18} />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`p-2 rounded-lg transition-all relative ${showNotifications
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-zinc-500 hover:text-blue-600 hover:bg-white"
                }`}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              )}
            </button>

            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white border border-zinc-100 rounded-2xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
                    <h3 className="text-sm font-bold text-zinc-800">
                      Notifications
                    </h3>
                    <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full font-bold">
                      {unreadCount} New
                    </span>
                  </div>

                  <div className="max-h-80 overflow-y-auto no-scrollbar">
                    {notificationsData.map((notif) => {
                      const IconComponent = notif.icon;
                      return (
                        <div
                          key={notif.id}
                          className="p-4 flex gap-3 hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0 cursor-pointer relative group"
                        >
                          {notif.unread && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r-full" />
                          )}
                          <div
                            className={`shrink-0 w-10 h-10 rounded-xl ${notif.bgColor} flex items-center justify-center ${notif.iconColor}`}
                          >
                            <IconComponent size={20} />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <p className="text-xs font-bold text-zinc-800">
                                {notif.title}
                              </p>
                              <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                <Clock size={10} /> {notif.time}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 mt-1 leading-snug line-clamp-2">
                              {notif.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <button className="w-full p-3 text-center text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border-t border-zinc-100">
                    Mark all as read
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="pl-2 border-l border-zinc-200">
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
};

export default Navbar;