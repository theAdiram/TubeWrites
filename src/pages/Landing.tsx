
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simple Navbar for Landing Page */}
      <nav className="py-4 px-4 md:px-8 w-full absolute top-0 z-50">
        <div className="container flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-tighter">
            insight<span className="text-primary/80">.</span>
          </Link>

          <div className="flex items-center space-x-4 md:space-x-8">
            <Link to="/about" className="text-sm text-foreground/80 hover:text-foreground transition-colors">
              About
            </Link>
            <Button asChild variant="outline" size="sm" className="glassmorphism">
              <Link to="/dashboard">
                Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with CTA */}
      <HeroSection />
      
      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Transform Video Content Into Academic Knowledge
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10">
            Our AI-powered platform extracts valuable insights from YouTube videos and 
            converts them into well-structured research papers in seconds.
          </p>
          <Button asChild size="lg" className="glassmorphism bg-white/10 hover:bg-white/15">
            <Link to="/dashboard" className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
      
      <Features />
      
      <Stats />
      
      {/* Call to Action Section */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-background to-background/80">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to transform your research process?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of researchers, students, and professionals who are saving time 
              and enhancing their understanding with our AI-powered research paper generator.
            </p>
            <Button asChild size="lg" className="glassmorphism bg-white/10 hover:bg-white/15">
              <Link to="/dashboard" className="group">
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;
