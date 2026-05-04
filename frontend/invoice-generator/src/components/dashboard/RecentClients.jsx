import React from 'react';
import { 
  Mail, ArrowRight, Globe, User, Briefcase, 
  IndianRupee, BadgeDollarSign, BadgePercent, 
  Receipt 
} from 'lucide-react';
import Button from '../ui/Button';

const RecentClients = ({ clients = [] }) => {
  const displayClients = clients.length > 0 ? clients : [
    { id: 1, name: "Thulir Infra", email: "contact@thulir.in", type: "GST", currency: "INR", total: "₹45,000", niche: "Construction" },
    { id: 2, name: "Global Tech Inc", email: "billing@global.com", type: "Foreign", currency: "USD", total: "$1,200", niche: "Software" },
    { id: 3, name: "Aishwarya Arts", email: "info@arts.com", type: "Non-GST", currency: "INR", total: "₹12,500", niche: "Tanjore Arts" },
  ];

  // Helper to render the specific icon based on client type
  const getTaxIcon = (type) => {
    switch (type) {
      case "GST":
        return <BadgePercent size={14} className="text-emerald-500" />;
      case "Foreign":
        return <BadgeDollarSign size={14} className="text-blue-500" />;
      case "Non-GST":
        return <IndianRupee size={14} className="text-zinc-500" />;
      default:
        return <Receipt size={14} />;
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="p-7 border-b border-zinc-50 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Active Entities</h4>
          <p className="text-[10px] text-zinc-500 font-bold italic mt-1">Real-time billing directory</p>
        </div>
        <Button variant="ghost" size="small" icon={ArrowRight} className="text-blue-600 font-bold">
          Directory
        </Button>
      </div>

      {/* Table Body */}
      <div className="flex-1 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-7 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Client Name</th>
              <th className="px-7 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest">Niche & Contact</th>
              <th className="px-7 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest text-center">Tax Class</th>
              <th className="px-7 py-4 text-[10px] font-black text-zinc-700 uppercase tracking-widest text-right">Revenue</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {displayClients.map((client) => (
              <tr key={client.id} className="group hover:bg-zinc-50/80 transition-all duration-300">
                
                {/* 1. Client Name */}
                <td className="px-7 py-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-all duration-500">
                      {client.type === "Foreign" ? <Globe size={16} /> : <User size={16} />}
                    </div>
                    <p className="text-sm font-bold text-zinc-900 tracking-tight">{client.name}</p>
                  </div>
                </td>

                {/* 2. Niche & Contact */}
                <td className="px-7 py-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-zinc-800 uppercase tracking-wide">
                      <Briefcase size={12} className="text-blue-500" />
                      {client.niche}
                    </div>
                    <div className="flex items-center gap-1.5 text-[12px] text-zinc-800 font-medium italic">
                      <Mail size={10} />
                      {client.email}
                    </div>
                  </div>
                </td>

                {/* 3. Dynamic Tax Class Icon Logic */}
                <td className="px-7 py-5 text-center">
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
                    client.type === "GST" 
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700" 
                    : client.type === "Foreign"
                    ? "bg-blue-50 border-blue-100 text-blue-700"
                    : "bg-zinc-50 border-zinc-100 text-zinc-600"
                  }`}>
                    {getTaxIcon(client.type)}
                    <span className="text-[10px] font-black uppercase tracking-tight">{client.type}</span>
                  </div>
                </td>

                {/* 4. Revenue */}
                <td className="px-7 py-5 text-right">
                  <p className="text-sm font-black text-zinc-900 tracking-tighter">
                    {client.total}
                  </p>
                  <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{client.currency} Summary</span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-5 bg-zinc-50/30 border-t border-zinc-50 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Domestic GST
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-zinc-400 uppercase">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          Export Billing
        </div>
      </div>
    </div>
  );
};

export default RecentClients;