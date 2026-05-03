import React from 'react';
import { TrendingUp, Clock, CheckCircle2, Wallet, Users, UserPlus, UserMinus, Activity, FileText, Wallet2 } from 'lucide-react';

const StatCard = ({ title, value, subValue, icon: Icon, trend, colorClass }) => (
  <div className="bg-white p-5 rounded-2xl border border-zinc-100 shadow-sm hover:shadow-md transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2.5 rounded-xl ${colorClass}`}>
        <Icon size={20} />
      </div>
      {trend && <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{trend}</span>}
    </div>
    <div>
      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{title}</p>
      <h3 className="text-xl font-bold text-zinc-900 mt-1">{value}</h3>
      <p className="text-xs text-zinc-400 mt-1 font-medium">{subValue}</p>
    </div>
  </div>
);

export const SummaryGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    <StatCard title="Total Invoices" value="128" subValue="Across all clients" icon={FileText} colorClass="bg-blue-50 text-blue-600" />
    <StatCard title="Paid Revenue" value="₹4,25,000" subValue="+12% from last month" icon={CheckCircle2} trend="+12%" colorClass="bg-emerald-50 text-emerald-600" />
    <StatCard title="Pending Amount" value="₹85,400" subValue="Needs follow up" icon={Clock} colorClass="bg-amber-50 text-amber-600" />
    <StatCard title="Net Worth" value="₹12.4L" subValue="Total valuation" icon={Wallet2} colorClass="bg-blue-50 text-blue-600" />
    
    <StatCard title="Total Clients" value="42" subValue="Registered businesses" icon={Users} colorClass="bg-indigo-50 text-indigo-600" />
    <StatCard title="Active" value="28" subValue="With active contracts" icon={Activity} colorClass="bg-blue-50 text-blue-600" />
    <StatCard title="New Clients" value="5" subValue="Added this month" icon={UserPlus} colorClass="bg-purple-50 text-purple-600" />
    <StatCard title="Inactive" value="9" subValue="No activity for 60 days" icon={UserMinus} colorClass="bg-zinc-100 text-zinc-500" />
  </div>
);