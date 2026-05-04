import React from 'react';
import { MoreHorizontal, Mail, ExternalLink, Briefcase } from 'lucide-react';
import Button from '../ui/Button';

const RecentClients = ({ clients = [] }) => {
  // Dummy data fallback for preview
  const displayClients = clients.length > 0 ? clients : [
    { id: 1, name: "Thulir Infra", email: "contact@thulir.in", category: "Construction", total: "₹45,000", status: "Active" },
    { id: 2, name: "Annai Agro", email: "export@annai.com", category: "Exports", total: "₹1,20,000", status: "New" },
    { id: 3, name: "Aishwarya Arts", email: "info@aishwarya.com", category: "Tanjore Arts", total: "₹12,500", status: "Active" },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-6 md:p-8 border-b border-zinc-50 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Recent Clients</h4>
          <p className="text-[10px] text-zinc-400 font-bold italic mt-1">Latest business additions</p>
        </div>
        <Button variant="ghost" size="small" icon={ExternalLink} className="text-blue-600">
          View All
        </Button>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50">Client Details</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50 text-right">Revenue</th>
              <th className="px-6 py-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest border-b border-zinc-50"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {displayClients.map((client) => (
              <tr key={client.id} className="group hover:bg-zinc-50/80 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      {client.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-black text-zinc-800 tracking-tight">{client.name}</p>
                      <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-bold">
                        <Mail size={10} />
                        {client.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Briefcase size={12} className="text-zinc-300" />
                    <span className="text-[11px] font-bold text-zinc-500">{client.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <p className="text-sm font-black text-zinc-900 tracking-tighter">{client.total}</p>
                  <span className="text-[9px] font-black text-emerald-500 uppercase">Paid</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-zinc-300 hover:text-zinc-900 transition-colors rounded-lg">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer Usage Summary */}
      <div className="p-4 bg-zinc-50/30 border-t border-zinc-50 text-center">
        <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
          Database Synced • {displayClients.length} Active Entities
        </p>
      </div>
    </div>
  );
};

export default RecentClients;