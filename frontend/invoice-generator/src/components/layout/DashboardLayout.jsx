import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Mobile toggle
  const [isCollapsed, setIsCollapsed] = useState(false); // Desktop collapse
  const [isMobile, setIsMobile] = useState(false);

  // 1. Single source of truth for responsive state
  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 1024;
      setIsMobile(isMobileView);
      if (!isMobileView) setSidebarOpen(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <div className="min-h-screen bg-slate-50 flex overflow-x-hidden antialiased text-zinc-900 font-inter">

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        setOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Mobile Backdrop Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-zinc-950/40 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Container - Dynamic Margin based on Sidebar State */}
      <div className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
        ${!isMobile ? (isCollapsed ? "ml-20" : "ml-64") : "ml-0"}
      `}>

        {/* Top Navigation */}
        <Navbar
          isMobile={isMobile}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page Content Area */}
        <main className="p-4 md:p-6 lg:p-8 flex-1">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;