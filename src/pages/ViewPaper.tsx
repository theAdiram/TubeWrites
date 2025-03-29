
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ResearchPaper from "@/components/ResearchPaper";
import { getHistoryItem } from "@/utils/localStorage";
import { PaperContent } from "@/types/paperTypes";

const ViewPaper = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [paperData, setPaperData] = useState<PaperContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const historyItem = getHistoryItem(id);
      
      if (historyItem) {
        setPaperData(historyItem.paper);
      } else {
        toast.error("Paper not found");
        navigate("/history");
      }
      
      setIsLoading(false);
    }
  }, [id, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Button
              variant="outline"
              size="sm"
              className="glassmorphism bg-white/5 hover:bg-white/10"
              asChild
            >
              <Link to="/history">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to History
              </Link>
            </Button>
          </div>
          
          <ResearchPaper paperData={paperData} isLoading={isLoading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewPaper;
