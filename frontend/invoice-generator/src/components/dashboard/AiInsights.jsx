export const AIInsights = () => (
  <div className="bg-zinc-900 p-6 rounded-2xl text-white relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Sparkles size={80} />
    </div>
    <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
      <Zap size={16} className="text-blue-400" fill="currentColor" /> AI Smart Insights
    </h4>
    <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
      Based on your last 30 days, your collection period has improved by <span className="text-blue-400 font-bold">14%</span>. 
      Suggested action: Send a reminder to <span className="text-white font-bold underline">Thulir Infra</span> for pending payments.
    </p>
  </div>
);

export const TaskUpdates = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {['Update invoice templates', 'Sync with Razorpay', 'Review client logs'].map((task, i) => (
      <div key={i} className="bg-white p-4 rounded-xl border border-zinc-100 flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-blue-600" />
        <span className="text-xs font-bold text-zinc-700">{task}</span>
      </div>
    ))}
  </div>
);