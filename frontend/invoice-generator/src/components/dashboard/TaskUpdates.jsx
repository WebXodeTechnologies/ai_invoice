import React from 'react';
import { 
  Plus, MoreHorizontal, MessageSquare, Layers, 
  CheckSquare, Clock, CheckCircle2, AlertCircle 
} from 'lucide-react';

const TaskUpdates = () => {
  const taskGroups = [
    {
      id: "todo",
      label: "To Do",
      count: 2,
      color: "bg-zinc-100 text-zinc-600",
      tasks: [
        { id: 101, title: "Audit Export Bill #102", niche: "Software", priority: "High", comments: 3, subtasks: "0/2" },
        { id: 102, title: "Update GST slabs for Q1", niche: "Compliance", priority: "Medium", comments: 1, subtasks: "1/4" }
      ]
    },
    {
      id: "in-progress",
      label: "In Progress",
      count: 1,
      color: "bg-blue-50 text-blue-600",
      tasks: [
        { id: 103, title: "Thulir Infra Verification", niche: "Construction", priority: "High", comments: 5, subtasks: "3/5" }
      ]
    },
    {
      id: "review",
      label: "Review",
      count: 1,
      color: "bg-amber-50 text-amber-600",
      tasks: [
        { id: 104, title: "Aishwarya Arts Payment", niche: "Arts", priority: "Urgent", comments: 2, subtasks: "2/2" }
      ]
    }
  ];

  return (
    <div className="bg-[#F9FAFB] rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 p-8 h-full flex flex-col">
      
      {/* 1. Header with Status Stats Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-10 pb-8 border-b border-zinc-100">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-lg">
            <Layers className="text-white" size={24} />
          </div>
          <div>
            <h4 className="text-lg font-black text-zinc-900 uppercase tracking-widest leading-none">Workflow</h4>
            <p className="text-[12px] text-zinc-500 font-bold italic mt-1">Management Hub</p>
          </div>
        </div>

        {/* The Summary Icons (Pending, Completed, Due) */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-zinc-100 shadow-sm">
             <div className="p-2 bg-rose-50 rounded-lg text-rose-600"><Clock size={16} /></div>
             <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter leading-none">Due Today</p>
                <p className="text-sm font-black text-zinc-800">04</p>
             </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-zinc-100 shadow-sm">
             <div className="p-2 bg-amber-50 rounded-lg text-amber-600"><AlertCircle size={16} /></div>
             <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter leading-none">Pending</p>
                <p className="text-sm font-black text-zinc-800">12</p>
             </div>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-zinc-100 shadow-sm">
             <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><CheckCircle2 size={16} /></div>
             <div>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter leading-none">Completed</p>
                <p className="text-sm font-black text-zinc-800">28</p>
             </div>
          </div>
          <button className="h-12 w-12 flex items-center justify-center bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* 2. Kanban Board Layout Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-1 overflow-hidden">
        {taskGroups.map((group) => (
          <div key={group.id} className="flex flex-col h-full">
            
            {/* Column Label */}
            <div className="flex items-center justify-between mb-5 px-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${group.color}`}>
                  {group.label}
                </span>
                <span className="text-[10px] font-bold text-zinc-400">{group.count} Tasks</span>
              </div>
              <MoreHorizontal size={14} className="text-zinc-300 cursor-pointer" />
            </div>

            {/* Task Cards Container */}
            <div className="space-y-4 overflow-y-auto no-scrollbar pb-6">
              {group.tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="bg-white p-6 rounded-4xl border border-zinc-100 shadow-sm hover:shadow-xl hover:shadow-zinc-200/50 hover:border-blue-200 transition-all group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-lg ${
                      task.priority === "Urgent" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
                    }`}>
                      {task.priority}
                    </span>
                    <span className="text-[10px] font-bold text-zinc-300">#{task.id}</span>
                  </div>

                  <h5 className="text-[14px] font-black text-zinc-900 leading-snug mb-3">
                    {task.title}
                  </h5>

                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[9px] font-black text-zinc-500 bg-zinc-50 px-2.5 py-1 rounded-lg border border-zinc-100">
                      {task.niche}
                    </span>
                  </div>

                  {/* Footer Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-blue-600 transition-colors">
                        <MessageSquare size={14} />
                        <span className="text-[12px] font-black text-zinc-800">{task.comments}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-400 group-hover:text-blue-600 transition-colors">
                        <CheckSquare size={14} />
                        <span className="text-[12px] font-black text-zinc-800">{task.subtasks}</span>
                      </div>
                    </div>
                    
                    <div className="h-7 w-7 rounded-full bg-zinc-900 border-2 border-white flex items-center justify-center text-[8px] font-black text-white">
                      AK
                    </div>
                  </div>
                </div>
              ))}
              
              <button className="w-full py-4 rounded-3xl border-2 border-dashed border-zinc-200 text-zinc-400 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:border-blue-200 hover:text-blue-600 transition-all">
                + New Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskUpdates;