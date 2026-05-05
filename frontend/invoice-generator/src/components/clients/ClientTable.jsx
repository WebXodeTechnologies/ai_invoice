import React from 'react';
import { Mail, Globe, Receipt, Briefcase, Eye, Edit3, Trash2, ChevronRight } from 'lucide-react';

const ClientTable = ({ clients, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-blue-900/5 overflow-hidden">
      <div className="overflow-x-auto no-scrollbar">
        {/* min-w-900px ensures it looks perfect on 1024px laptop screens */}
        <table className="w-full text-left border-collapse min-w-225">
          <thead>
            <tr className="bg-blue-50/30 border-b border-zinc-100/50">
              <th className="px-8 py-5 text-[12px] font-black text-blue-900/50 uppercase tracking-[0.15em]">Client Entity</th>
              <th className="px-8 py-5 text-[12px] font-black text-blue-900/50 uppercase tracking-[0.15em]">Industry</th>
              <th className="px-8 py-5 text-[12px] font-black text-blue-900/50 uppercase tracking-[0.15em] text-center">Tax Class</th>
              <th className="px-8 py-5 text-[12px] font-black text-blue-900/50 uppercase tracking-[0.15em] text-center">Currency</th>
              <th className="px-8 py-5 text-[12px] font-black text-blue-900/50 uppercase tracking-[0.15em] text-right">Operations</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {clients.map((client) => (
              <tr 
                key={client.id} 
                className="group hover:bg-blue-50/40 transition-all duration-300"
              >
                {/* 1. Identity */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:scale-110 transition-all duration-500">
                      {client.type === "Foreign" ? <Globe size={18} /> : <span className="text-[14px] font-black">{client.name[0]}</span>}
                    </div>
                    <div>
                      <p className="text-[14px] font-black text-zinc-900 tracking-tight mb-1">{client.name}</p>
                      <div className="flex items-center gap-1.5 text-[12px] text-zinc-400 font-bold">
                        <Mail size={12} className="text-blue-300" />
                        {client.email}
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Industry */}
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-xl w-fit group-hover:bg-white transition-colors">
                    <Briefcase size={14} className="text-blue-500" />
                    <span className="text-[12px] font-bold text-zinc-800">{client.niche}</span>
                  </div>
                </td>

                {/* 3. Tax Class */}
                <td className="px-8 py-6 text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-black uppercase tracking-tight transition-all duration-300 group-hover:bg-white ${client.type === 'GST' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      client.type === 'Foreign' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                        'bg-amber-50 border-amber-100 text-amber-700'
                    }`}>
                    <Receipt size={12} />
                    {client.type}
                  </div>
                </td>

                {/* 4. Currency */}
                <td className="px-8 py-6 text-center">
                  <span className="text-[12px] font-black text-zinc-800 px-4 py-1.5 bg-white border border-zinc-200 rounded-xl shadow-sm group-hover:border-blue-200 transition-all">
                    {client.currency}
                  </span>
                </td>

                {/* 5. Actions */}
                <td className="px-8 py-6">
                  <div className="flex items-center justify-end gap-2.5 opacity-40 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <button 
                      onClick={() => onView(client)}
                      className="p-2.5 text-blue-600 hover:bg-blue-600 hover:text-white bg-blue-50 rounded-xl transition-all"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => onEdit(client)}
                      className="p-2.5 text-zinc-500 hover:bg-zinc-800 hover:text-white bg-zinc-100 rounded-xl transition-all"
                      title="Edit"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(client.id)}
                      className="p-2.5 text-rose-500 hover:bg-rose-600 hover:text-white bg-rose-50 rounded-xl transition-all"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern Footer */}
      <div className="px-8 py-6 bg-zinc-50/50 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[12px] font-bold text-zinc-500">
          Total business entities: <span className="text-blue-600 font-black tracking-tight">{clients.length}</span>
        </p>
        <div className="flex items-center gap-2">
           <button className="h-9 px-4 text-[11px] font-black text-zinc-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Prev</button>
           <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-blue-600 text-white text-[12px] font-black shadow-lg shadow-blue-200">1</button>
           <button className="h-9 px-4 text-[11px] font-black text-zinc-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default ClientTable;