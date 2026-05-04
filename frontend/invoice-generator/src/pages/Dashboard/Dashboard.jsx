import React from 'react';


import Button from "../../components/ui/Button";
import { Plus } from "lucide-react";
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { SummaryGrid } from '../../components/dashboard/SummaryGrid';
import RevenueChart from '../../components/dashboard/RevenueChart';
import RecentClients from '../../components/dashboard/RecentClients';
import AIInsights from '../AI/AIInsights';
import { TaskUpdates } from '../../components/dashboard/AiInsights';

const Dashboard = () => {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <DashboardHeader />

      {/* 1st & 2nd Rows: Stats */}
      <SummaryGrid />

      {/* 3rd Row: Chart & Recent Clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Row 1 below Row 2 on mobile, side-by-side on lg screens */}
  <div className="w-full">
    <RevenueChart />
  </div>
  
  <div className="w-full">
    <RecentClients />
  </div>
</div>

      {/* AI Insights Section */}
      <AIInsights />

      {/* Fourth Row: Payments Table (Simplified for brevity) */}
      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-sm font-bold text-zinc-800">Recent Client Payments</h4>
          <Button size="small" variant="outline">View All</Button>
        </div>
        {/* Payment table goes here... */}
      </div>

      {/* Task Section */}
      <div className="space-y-4">
        <h4 className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">Priority Tasks</h4>
        <TaskUpdates />
      </div>
    </div>
  );
};

export default Dashboard;