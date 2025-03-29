
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-12">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">ABOUT</h1>
              <p className="text-muted-foreground leading-relaxed">
                Insight is a forward-thinking web application dedicated to transforming your digital content research. With a focus on creating authentic intelligence, we specialize in extracting valuable information from YouTube videos and reformatting it into academic-quality research papers. Our mission is to empower researchers, students, and professionals to efficiently utilize the vast knowledge available in video content.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe that knowledge should be accessible and adaptable. Our mission is to bridge the gap between video content and academic research by leveraging artificial intelligence to extract, analyze, and reformat valuable insights. By doing so, we aim to save researchers countless hours while enhancing the quality and depth of their work.
              </p>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">How It Works</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">1. Video Transcript Extraction</h3>
                  <p className="text-muted-foreground">
                    Using advanced APIs, we extract detailed transcripts from any YouTube video you provide, capturing all spoken content with high accuracy.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">2. AI Content Analysis</h3>
                  <p className="text-muted-foreground">
                    Our sophisticated AI algorithms analyze the transcript, identifying key concepts, important facts, arguments, and unique insights contained within the video.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">3. Research Paper Generation</h3>
                  <p className="text-muted-foreground">
                    The extracted information is then reorganized and reformatted into a cohesive, well-structured research paper complete with sections, citations, and academic formatting.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">4. Delivery & Storage</h3>
                  <p className="text-muted-foreground">
                    The final research paper is presented in your browser and available for download in various formats. All your generated papers are stored in your history for future reference.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Why Choose Insight</h2>
              <ul className="space-y-2 list-disc pl-5">
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Time Efficiency:</span> Extract hours of video content into concise research papers in minutes
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Academic Quality:</span> AI-generated content that meets scholarly standards
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Comprehensive Analysis:</span> Capture all key points and nuances from video content
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Accessibility:</span> Transform spoken content into well-organized written material
                </li>
                <li className="text-muted-foreground">
                  <span className="text-foreground font-medium">Knowledge Retention:</span> Better retain and reference information from educational videos
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
