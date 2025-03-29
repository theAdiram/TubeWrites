
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import LinkInput from "@/components/LinkInput";
import ResearchPaper from "@/components/ResearchPaper";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { processYoutubeVideo } from "@/services/youtubeService";
import { saveToHistory } from "@/utils/localStorage";
import { PaperContent } from "@/types/paperTypes";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paperData, setPaperData] = useState<PaperContent | null>(null);
  const [currentUrl, setCurrentUrl] = useState<string>("");

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
    <div className="min-h-screen bg-background text-foreground relative">
      <Navbar />
      
      <HeroSection />
      
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
              Transform YouTube Videos Into Research Papers
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mb-8">
              Simply paste any YouTube video URL below and our AI will extract valuable insights 
              and transform them into a well-structured research paper.
            </p>
            
            <LinkInput onSubmit={handleSubmit} isLoading={isLoading} />
          </div>
          
          {(isLoading || paperData) && (
            <div className="mt-12">
              <ResearchPaper paperData={paperData} isLoading={isLoading} />
            </div>
          )}
        </div>
      </section>
      
      <Features />
      
      <Stats />
      
      <Footer />
    </div>
  );
};

export default Index;
