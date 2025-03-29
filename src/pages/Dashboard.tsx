
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { 
  Home, 
  FileText, 
  History as HistoryIcon, 
  Info, 
  Menu, 
  X,
  LogOut
} from "lucide-react";

import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardContent from "@/components/DashboardContent";

const Dashboard = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside 
        className={`fixed md:static top-0 bottom-0 left-0 z-40 w-64 bg-black/20 border-r border-white/10 backdrop-blur-lg transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link to="/dashboard" className="text-xl font-bold tracking-tighter">
            insight<span className="text-primary/80">.</span>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 p-4">
          <Button 
            variant="ghost" 
            className="justify-start gap-3"
            asChild
          >
            <Link to="/dashboard">
              <Home className="h-5 w-5" />
              Dashboard
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-3"
            asChild
          >
            <Link to="/generate">
              <FileText className="h-5 w-5" />
              Generate Paper
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-3"
            asChild
          >
            <Link to="/history">
              <HistoryIcon className="h-5 w-5" />
              History
            </Link>
          </Button>
          <Button 
            variant="ghost" 
            className="justify-start gap-3"
            asChild
          >
            <Link to="/about">
              <Info className="h-5 w-5" />
              About
            </Link>
          </Button>
          <div className="mt-auto pt-4 border-t border-white/10 mt-8">
            <Button 
              variant="ghost" 
              className="justify-start gap-3 w-full text-muted-foreground"
              onClick={() => navigate("/")}
            >
              <LogOut className="h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
