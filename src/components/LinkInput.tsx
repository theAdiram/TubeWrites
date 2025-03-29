
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface LinkInputProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const LinkInput = ({ onSubmit, isLoading }: LinkInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple YouTube URL validation
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})(\S*)?$/;
    
    if (!youtubeRegex.test(url)) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }
    
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <Input
          type="text"
          placeholder="Paste YouTube video URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1 glassmorphism bg-secondary/50 border-white/10 focus-visible:ring-white/20 placeholder:text-white/30"
        />
        <Button 
          type="submit" 
          disabled={isLoading || !url} 
          className="shrink-0 glassmorphism bg-white/10 hover:bg-white/15 text-white border border-white/10"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </div>
          ) : (
            "Extract Insights"
          )}
        </Button>
      </div>
    </form>
  );
};

export default LinkInput;
