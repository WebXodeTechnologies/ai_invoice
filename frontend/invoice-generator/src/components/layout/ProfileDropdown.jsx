import { useState } from 'react';
import { User, Settings, LogOut, ChevronDown, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Fallback initial
  const userInitial = user?.name?.charAt(0).toUpperCase() || "A";

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-2 rounded-xl hover:bg-zinc-50 transition-all border border-transparent hover:border-zinc-200"
      >
        <div className="h-9 w-9 rounded-lg bg-linear-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-sm overflow-hidden border border-white/20">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <span>{userInitial}</span>
          )}
        </div>
        <div className="hidden lg:flex flex-col items-start text-left">
          <span className="text-sm font-bold text-zinc-900 leading-none">{user?.name || "Akash SM"}</span>
          <span className="text-[12px] text-zinc-900 font-semibold mt-1">Admin Account</span>
        </div>
        <ChevronDown size={14} className={`text-zinc-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-3 w-56 bg-white border border-zinc-100 rounded-2xl shadow-2xl z-30 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-zinc-50 mb-1">
              <p className="text-sm font-bold text-zinc-800">{user?.name}</p>
              <p className="text-[12px] text-zinc-900 truncate">{user?.email || "admin@webxode.tech"}</p>
            </div>
            
            <button 
              onClick={() => { navigate('/profile'); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              <User size={16} /> My Profile
            </button>
            
            <button 
              onClick={() => { navigate('/settings'); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              <Settings size={16} /> Account Settings
            </button>

            <div className="my-1 border-t border-zinc-50" />
            
            <button 
              onClick={() => { logout(); setIsOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDropdown;