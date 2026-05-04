import React from 'react';
import { Sparkles, Zap, ArrowRight, Stars } from 'lucide-react';
import Button from '../../components/ui/Button';

const AIInsights = () => {
  const insights = [
    {
      id: 1,
      emoji: "🚀",
      text: "Revenue is up 14% this week. Your collection cycle is faster!",
      label: "Growth",
      badge: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 2,
      emoji: "⚠️",
      text: "3 invoices for Thulir Infra are overdue. Send a nudge?",
      label: "Action Needed",
      badge: "bg-amber-50 text-amber-600"
    },
    {
      id: 3,
      emoji: "💎",
      text: "Predicted cash flow for June is ₹2.4L based on contracts.",
      label: "Forecast",
      badge: "bg-blue-50 text-blue-600"
    }
  ];

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] bg-white border border-zinc-100 p-8 shadow-2xl shadow-zinc-200/50">
      
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-blue-50/50 to-transparent pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Stars className="text-white" size={24} />
            </div>
            <div>
              <h4 className="text-xl font-black text-zinc-900 tracking-tight">Smart Assistant</h4>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Webxode Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-zinc-400">Auto-syncing data...</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>

        {/* Horizontal Insights Row */}
        <div className="flex flex-col lg:flex-col gap-4">
          {insights.map((item) => (
            <div 
              key={item.id} 
              className="flex-1 group relative p-5 rounded-[2rem] bg-zinc-50/50 border border-zinc-100 hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/50 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-500">
                  {item.emoji}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${item.badge}`}>
                  {item.label}
                </span>
              </div>
              
              <p className="text-sm font-bold text-zinc-700 leading-snug">
                {item.text}
              </p>

              <button className="mt-4 flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-widest group-hover:gap-3 transition-all">
                Handle now <ArrowRight size={12} />
              </button>
            </div>
          ))}
        </div>

        {/* Action Footer */}
        <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-50 rounded-xl">
              <Zap size={16} className="text-amber-500" fill="currentColor" />
            </div>
            <p className="text-xs font-bold text-zinc-500 italic leading-tight">
              AI found <span className="text-zinc-900">2 more</span> potential savings in your tax logs.
            </p>
          </div>
          <Button variant="secondary" size="medium" icon={Sparkles} className="w-full md:w-auto shadow-sm">
            Generate Weekly Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;