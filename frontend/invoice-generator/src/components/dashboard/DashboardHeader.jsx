import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import { useAuth } from "../../context/AuthContext";

const DashboardHeader = () => {

  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);

  // Use useMemo to prevent the "quotes" array from re-initializing on every render
  const quotes = useMemo(() => [
    { text: "You're crushing it today! Let's get those invoices cleared.", emoji: "😍", color: "from-rose-400 to-orange-500" },
    { text: "Your growth this month is actually insane. Keep that energy!", emoji: "🔥", color: "from-orange-500 to-red-600" },
    { text: "Sending positive vibes to Webxode HQ. You've got this!", emoji: "😊", color: "from-yellow-400 to-amber-500" },
    { text: "Precision, Power, and Passion. That's the Webxode way.", emoji: "❤️‍🔥", color: "from-red-500 to-rose-700" },
    { text: "Work hard in silence, let your success be your noise.", emoji: "😘", color: "from-pink-400 to-fuchsia-600" },
    { text: "Another day, another milestone. Ready to lead?", emoji: "😎", color: "from-blue-500 to-cyan-500" }
  ], []);

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      setIsChanging(true);
      setTimeout(() => {
        setCurrentQuote(prev => {
          const filtered = quotes.filter(q => q.text !== prev.text);
          return filtered[Math.floor(Math.random() * filtered.length)];
        });
        setIsChanging(false);
      }, 600);
    }, 8000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [quotes]);

  return (
    <div className="relative mb-10 overflow-hidden rounded-[2.5rem] bg-white border border-zinc-100 p-8 md:p-12 shadow-2xl shadow-zinc-200/60">
      <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full bg-linear-to-br opacity-15 blur-[80px] transition-all duration-1000 ${currentQuote.color}`} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-3xl font-black text-zinc-800 tracking-tight leading-snug">
              Welcome back, <span className="text-blue-600 ml-1">{user?.name || "User"}</span>
            </h1>
          </div>

          <div className={`transition-all duration-700 ease-out transform ${isChanging ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
            <p className="text-lg md:text-xl font-bold text-zinc-600 leading-relaxed max-w-xl">
              {currentQuote.text}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-2xl border border-zinc-100 shadow-sm">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              <span className="text-[12px] font-black text-zinc-600 uppercase tracking-widest">Active Session</span>
            </div>
            <span className="text-[12px] font-bold text-zinc-800 uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        <div className="relative group perspective-1000">
          <div className={`absolute inset-0 bg-linear-to-tr opacity-30 blur-3xl rounded-full transition-all duration-1000 scale-150 ${currentQuote.color}`} />
          <div className={`relative h-32 w-32 md:h-44 md:w-44 flex items-center justify-center text-7xl md:text-8xl select-none transition-all duration-700 ${isChanging ? 'scale-0 opacity-0 rotate-30' : 'scale-100 opacity-100 rotate-0'} hover:scale-110 cursor-pointer transition-transform`}
            style={{ animation: 'premium-bounce 4s ease-in-out infinite' }}>
            {currentQuote.emoji}
          </div>
          <Sparkles className="absolute -top-4 -right-4 text-amber-400 animate-pulse" size={isMobile ? 32 : 48} />
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `@keyframes premium-bounce { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(5deg); } }` }} />
    </div>
  );
};

export default DashboardHeader;