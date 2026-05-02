import React from "react";
import { ChevronDown, User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProfileDropdown = ({ isOpen, onToggle }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // FIX: Safety check to prevent .charAt(0) crash on undefined
  const displayName = user?.name || user?.businessName || "User";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button 
        onClick={onToggle} 
        className="flex items-center space-x-3 p-1.5 rounded-xl hover:bg-slate-100 transition-all duration-200 border border-transparent active:scale-95"
      > 
        {user?.avatar ? (
          <img src={user.avatar} alt="Avatar" className="h-9 w-9 object-cover rounded-xl shadow-sm"/> 
        ) : (
          <div className="h-9 w-9 bg-linear-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <span className="text-white font-bold text-sm">
              {userInitial}
            </span>
          </div>
        )}
        
        <div className="hidden sm:block text-left">
          <p className="text-sm font-bold text-slate-900 leading-none">{displayName}</p>
          <p className="text-[11px] text-slate-500 font-medium mt-1">{user?.email}</p>
        </div>
        <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && ( 
        <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-100 animate-in fade-in zoom-in duration-200">
          <div className="px-4 py-3 border-b border-slate-50">
            <p className="text-sm font-bold text-slate-900">{displayName}</p>
            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          </div>
          
          <div className="p-1">
            <button 
              onClick={() => { navigate('/profile'); onToggle(); }} 
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <User size={16} /> View Profile
            </button>
            <button 
              onClick={() => { navigate('/settings'); onToggle(); }} 
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Settings size={16} /> Account Settings
            </button>
          </div>

          <div className="border-t border-slate-50 mt-1 p-1">
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;