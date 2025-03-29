
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaperContent } from "@/types/paperTypes";

interface ResearchPaperProps {
  paperData: PaperContent | null;
  isLoading: boolean;
}

const ResearchPaper = ({ paperData, isLoading }: ResearchPaperProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!paperData) return null;

  const downloadPdf = () => {
    // In a real implementation, this would generate a PDF
    // For now, we'll just download the text content
    const element = document.createElement("a");
    const file = new Blob([
      `INSIGHT PAPER: ${paperData.title}\n\n` +
      `Abstract: ${paperData.abstract}\n\n` +
      `${paperData.sections.map(section => 
        `${section.heading}\n${section.content}\n\n`
      ).join('')}`,
    ], { type: 'text/plain' });
    
    element.href = URL.createObjectURL(file);
    element.download = `${paperData.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full glassmorphism rounded-lg border border-white/10 overflow-hidden">
      <div className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">{paperData.title}</h2>
            <p className="text-sm text-muted-foreground">
              Based on video by <span className="text-foreground/80">{paperData.author}</span>
            </p>
          </div>
          <Button 
            onClick={downloadPdf}
            variant="outline" 
            className="shrink-0 glassmorphism bg-white/5 hover:bg-white/10"
          >
            Download PDF
          </Button>
        </div>

        <Tabs defaultValue="paper" className="w-full">
          <TabsList className="glassmorphism bg-secondary/30 mb-6">
            <TabsTrigger value="paper">Research Paper</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paper" className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Abstract</h3>
              <p className="text-muted-foreground leading-relaxed">
                {paperData.abstract}
              </p>
            </div>
            
            {paperData.sections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{section.heading}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
            
            {paperData.references && paperData.references.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">References</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {paperData.references.map((reference, index) => (
                    <li key={index} className="text-muted-foreground">
                      {reference}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="summary">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Key Takeaways</h3>
              <ul className="list-disc pl-5 space-y-3">
                {paperData.keyPoints.map((point, index) => (
                  <li key={index} className="text-muted-foreground">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => {
  return (
    <div className="w-full glassmorphism rounded-lg border border-white/10 p-6 sm:p-8">
      <div className="animate-pulse space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="space-y-3 w-full sm:w-2/3">
            <div className="h-7 bg-white/10 rounded-md"></div>
            <div className="h-4 bg-white/10 rounded-md w-48"></div>
          </div>
          <div className="w-full sm:w-32 h-9 bg-white/10 rounded-md"></div>
        </div>
        
        <div className="h-10 bg-white/10 rounded-md w-48 mb-6"></div>
        
        <div className="space-y-3">
          <div className="h-5 bg-white/10 rounded-md w-32"></div>
          <div className="h-4 bg-white/10 rounded-md"></div>
          <div className="h-4 bg-white/10 rounded-md"></div>
          <div className="h-4 bg-white/10 rounded-md w-5/6"></div>
        </div>
        
        <div className="space-y-3">
          <div className="h-5 bg-white/10 rounded-md w-40"></div>
          <div className="h-4 bg-white/10 rounded-md"></div>
          <div className="h-4 bg-white/10 rounded-md"></div>
          <div className="h-4 bg-white/10 rounded-md w-4/5"></div>
        </div>
      </div>
    </div>
  );
};

export default ResearchPaper;
