import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const DashboardHeader = ({ userName = "Akash" }) => {
  const quotes = [
    { text: "Your hard work is paying off!", emoji: "🚀" },
    { text: "Let's make today productive.", emoji: "✨" },
    { text: "Success is a series of small wins.", emoji: "🏆" },
    { text: "Financial clarity starts here.", emoji: "💰" }
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        setFade(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 flex items-center gap-2">
          Welcome back, {userName} <Sparkles className="text-amber-400" size={24} />
        </h1>
        <p className={`text-sm font-medium text-zinc-500 transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          {currentQuote.emoji} {currentQuote.text}
        </p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Today's Date</p>
        <p className="text-sm font-bold text-zinc-800 mt-1">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;