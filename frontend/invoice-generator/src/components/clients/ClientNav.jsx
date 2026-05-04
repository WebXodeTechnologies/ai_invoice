import React from 'react';
import { Plus, Users, FileSpreadsheet, FileText, Share2 } from 'lucide-react';

const ClientNav = ({ onAddClick, onExportExcel, onExportPDF }) => {
  return (
    <div className="bg-white p-5 sm:p-6 lg:p-8 rounded-4xl border border-zinc-100 shadow-xl shadow-blue-900/5 mb-6 lg:mb-8 transition-all">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        {/* Left: Branding & Status */}
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <Users className="text-white" size={22} />
          </div>
          <div>
            <h2 className="text-[18px] font-black text-zinc-900 tracking-tight leading-tight">Client Directory</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <p className="text-[12px] text-zinc-500 font-bold uppercase tracking-widest">Active Entities</p>
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          {/* Export Group */}
          <div className="flex items-center gap-2 w-full sm:w-auto bg-zinc-50 p-1.5 rounded-2xl border border-zinc-100">
            <button 
              onClick={onExportExcel}
              className="flex-1 sm:flex-none flex items-center gap-2 px-3 py-2 text-zinc-600 hover:text-emerald-600 hover:bg-white rounded-xl transition-all group"
              title="Export to Excel"
            >
              <FileSpreadsheet size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-wider hidden xl:inline">Excel</span>
            </button>
            
            <div className="w-px h-4 bg-zinc-200 mx-1 hidden sm:block"></div>

            <button 
              onClick={onExportPDF}
              className="flex-1 sm:flex-none flex items-center gap-2 px-3 py-2 text-zinc-600 hover:text-rose-600 hover:bg-white rounded-xl transition-all group"
              title="Export to PDF"
            >
              <FileText size={16} className="group-hover:scale-110 transition-transform" />
              <span className="text-[11px] font-black uppercase tracking-wider hidden xl:inline">PDF</span>
            </button>
          </div>

          {/* Primary Action */}
          <button 
            onClick={onAddClick}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 text-[12px] font-black uppercase tracking-wider group"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>Add Client</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientNav;