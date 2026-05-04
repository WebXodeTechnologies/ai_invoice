import React from 'react';
import { 
  FilePieChart, 
  ArrowUpRight, 
  Download, 
  Globe, 
  Receipt, 
  Coins,
  ShieldCheck,
  Search
} from 'lucide-react';
import Button from '../ui/Button';

const FinancialReports = () => {
  const reports = [
    { 
      id: 1, 
      label: "Domestic GST Reports", 
      period: "April 2026",
      value: "₹2,84,000", 
      status: "Verified", 
      icon: Receipt, 
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    { 
      id: 2, 
      label: "International (Export)", 
      period: "April 2026",
      value: "$4,200", 
      status: "Pending Audit", 
      icon: Globe, 
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    { 
      id: 3, 
      label: "Non-GST / Personal", 
      period: "April 2026",
      value: "₹42,500", 
      status: "Verified", 
      icon: Coins, 
      color: "text-zinc-600",
      bg: "bg-zinc-100"
    },
  ];

  return (
    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-xl shadow-zinc-200/40 overflow-hidden h-full flex flex-col">
      
      {/* Header Section */}
      <div className="p-8 border-b border-zinc-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-black rounded-2xl shadow-lg shadow-zinc-200">
            <FilePieChart className="text-white" size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Financial Audit Reports</h4>
            <p className="text-[12px] text-blue-600 font-bold italic mt-1">Monthly compliance summaries</p>
          </div>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="small" className="font-bold border-zinc-200 flex-1 md:flex-none">
            <Download size={14} className="mr-2" /> Export All
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-x-auto no-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-zinc-50/50">
              <th className="px-8 py-4 text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em]">Report Type</th>
              <th className="px-8 py-4 text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em]">Billing Period</th>
              <th className="px-8 py-4 text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] text-center">Status</th>
              <th className="px-8 py-4 text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] text-right">Revenue</th>
              <th className="px-8 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {reports.map((report) => {
              const Icon = report.icon;
              return (
                <tr key={report.id} className="group hover:bg-zinc-50/50 transition-all duration-300">
                  {/* Report Label */}
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${report.bg} ${report.color}`}>
                        <Icon size={18} />
                      </div>
                      <span className="text-sm font-bold text-zinc-900">{report.label}</span>
                    </div>
                  </td>

                  {/* Period */}
                  <td className="px-8 py-5">
                    <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
                      {report.period}
                    </span>
                  </td>

                  {/* Audit Status */}
                  <td className="px-8 py-5">
                    <div className="flex justify-center">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                        report.status === "Verified" 
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100" 
                        : "bg-amber-50 text-amber-600 border border-amber-100"
                      }`}>
                        {report.status === "Verified" ? <ShieldCheck size={10} /> : <Search size={10} />}
                        {report.status}
                      </div>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="px-8 py-5 text-right">
                    <p className="text-sm font-black text-zinc-900 tracking-tighter">
                      {report.value}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-zinc-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Audit Insight Footer */}
      <div className="p-6 font-black relative">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-zinc-900 rounded-lg animate-pulse">
            <ShieldCheck size={16} className='text-white' />
          </div>
          <div>
            <p className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">AI Compliance Note</p>
            <p className="text-xs font-medium text- mt-1">
              Domestic GST filings are consistent. <span className="text-blue-400">Action:</span> Review exchange rates for the Export report before 15th May.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;