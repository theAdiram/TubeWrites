
import { 
  FileText, 
  Youtube, 
  Clock, 
  Sparkles, 
  FileDown, 
  BookOpen 
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Youtube className="h-10 w-10 text-white/80" />,
      title: "YouTube Transcript Extraction",
      description: "Seamlessly extract transcripts from any YouTube video by simply pasting the URL."
    },
    {
      icon: <Sparkles className="h-10 w-10 text-white/80" />,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes the transcript to identify key points, facts, and insights from the video content."
    },
    {
      icon: <FileText className="h-10 w-10 text-white/80" />,
      title: "Research Paper Generation",
      description: "Transform video content into a well-structured research paper with proper sections and citations."
    },
    {
      icon: <Clock className="h-10 w-10 text-white/80" />,
      title: "Save Time",
      description: "Extract the essence of hour-long videos in seconds, saving you valuable research time."
    },
    {
      icon: <BookOpen className="h-10 w-10 text-white/80" />,
      title: "Knowledge Retention",
      description: "Organize complex information into easily digestible research formats for better understanding."
    },
    {
      icon: <FileDown className="h-10 w-10 text-white/80" />,
      title: "Export Options",
      description: "Download your research paper in multiple formats including PDF for easy sharing and reference."
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            OUR SERVICES
          </h2>
          <p className="max-w-[700px] text-muted-foreground mb-6">
            Streamline your research process with our advanced tools and technologies. Extract valuable insights from video content and transform them into academic-quality documents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col p-6 glassmorphism rounded-lg border border-white/10 transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
