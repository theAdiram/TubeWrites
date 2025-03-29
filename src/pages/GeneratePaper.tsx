
import { useState } from "react";
import { toast } from "sonner";
import LinkInput from "@/components/LinkInput";
import ResearchPaper from "@/components/ResearchPaper";
import { processYoutubeVideo } from "@/services/youtubeService";
import { saveToHistory } from "@/utils/localStorage";
import { PaperContent } from "@/types/paperTypes";

import { Link } from "react-router-dom";
import { Home, FileText, History as HistoryIcon, Info, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "@/components/DashboardHeader";

const GeneratePaper = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperContent | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmit = async (url: string) => {
    try {
      setIsLoading(true);
      setCurrentUrl(url);
      setPaperData(null);
      
      toast.info("Processing your video...", {
        duration: 2000,
      });
      
      const paperContent = await processYoutubeVideo(url);
      setPaperData(paperContent);
      
      // Save to history
      saveToHistory(url, paperContent);
      
      toast.success("Research paper generated successfully!");
    } catch (error) {
      console.error("Error processing video:", error);
      toast.error("Failed to process video. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            className="justify-start gap-3 bg-white/10"
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
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight mb-2">Generate Research Paper</h1>
            <p className="text-muted-foreground">
              Transform YouTube videos into academic-quality research papers in seconds.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="glassmorphism bg-white/5 p-6 rounded-lg mb-8">
              <h2 className="text-lg font-medium mb-4">Enter YouTube Video URL</h2>
              <LinkInput onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
            
            {(isLoading || paperData) && (
              <div className="mt-8">
                <ResearchPaper paperData={paperData} isLoading={isLoading} />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GeneratePaper;
