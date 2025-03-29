
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const orbsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create floating orbs effect
    const createOrbs = () => {
      if (!orbsContainerRef.current) return;
      const container = orbsContainerRef.current;
      container.innerHTML = '';
      
      const numOrbs = 3;
      
      for (let i = 0; i < numOrbs; i++) {
        const orb = document.createElement('div');
        orb.classList.add('orb');
        
        // Random positions and sizes
        const size = Math.random() * 200 + 150;
        const top = Math.random() * 70 + 10;
        const left = Math.random() * 70 + 10;
        
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.top = `${top}%`;
        orb.style.left = `${left}%`;
        orb.style.transform = `translate(-50%, -50%)`;
        orb.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        
        container.appendChild(orb);
      }
    };
    
    createOrbs();
    window.addEventListener('resize', createOrbs);
    
    return () => {
      window.removeEventListener('resize', createOrbs);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div ref={orbsContainerRef} className="absolute inset-0 pointer-events-none">
        {/* Orbs will be inserted here by the useEffect */}
      </div>
      
      <div className="container px-4 md:px-6 z-10 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6">
          YOUTUBE TO<br />
          RESEARCH PAPER<br />
          TRANSFORMER
        </h1>
        
        <p className="max-w-2xl mx-auto text-muted-foreground text-lg mb-10">
          Extract valuable insights from YouTube videos and convert them into well-structured research papers in seconds.
        </p>
        
        <div className="flex items-center justify-center mb-10">
          <div className="inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium glassmorphism bg-white/5 hover:bg-white/10 border border-white/10">
            <span className="mr-2 inline-flex h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
            Powered by AI
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
