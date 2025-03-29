
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getHistory, deleteHistoryItem, clearHistory } from "@/utils/localStorage";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const History = () => {
  const [history, setHistory] = useState<any[]>([]);
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const historyData = getHistory();
    setHistory(historyData);
    setIsEmpty(historyData.length === 0);
  };

  const handleDelete = (id: string) => {
    deleteHistoryItem(id);
    toast.success("Item removed from history");
    loadHistory();
  };

  const handleClearAll = () => {
    clearHistory();
    toast.success("History cleared");
    loadHistory();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2">History</h1>
              <p className="text-muted-foreground">
                View your previously generated research papers
              </p>
            </div>
            
            {!isEmpty && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="mt-4 md:mt-0">
                    Clear History
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="glassmorphism border border-white/10">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear history?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="glassmorphism bg-secondary/50 hover:bg-secondary">Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleClearAll}
                      className="glassmorphism bg-destructive/80 hover:bg-destructive"
                    >
                      Clear
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">No History Yet</h3>
              <p className="text-muted-foreground mb-6">
                Generate your first research paper to see it here.
              </p>
              <Button asChild className="glassmorphism bg-white/10 hover:bg-white/15">
                <Link to="/">Generate Paper</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-6">
              {history.map((item) => (
                <div 
                  key={item.id} 
                  className="p-6 glassmorphism rounded-lg border border-white/10"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-semibold">{item.paper.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Generated on {formatDate(item.date)}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="glassmorphism bg-white/5 hover:bg-white/10"
                      >
                        <Link to={`/view/${item.id}`} className="flex items-center">
                          View Paper
                        </Link>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="glassmorphism bg-destructive/20 hover:bg-destructive/30 text-destructive-foreground"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                    {item.paper.abstract}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default History;
