
import { useRef, useEffect } from 'react';

const Stats = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counters = document.querySelectorAll('.counter');
            counters.forEach((counter) => {
              const target = parseInt(counter.getAttribute('data-target') || '0', 10);
              let count = 0;
              const updateCounter = () => {
                const increment = target / 50;
                if (count < target) {
                  count += increment;
                  (counter as HTMLElement).innerText = Math.ceil(count).toString();
                  setTimeout(updateCounter, 20);
                } else {
                  (counter as HTMLElement).innerText = target.toString();
                }
              };
              updateCounter();
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 md:px-6" ref={statsRef}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold counter" data-target="10000">0</div>
            <p className="text-muted-foreground text-sm">Papers Generated</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold counter" data-target="32">0</div>
            <p className="text-muted-foreground text-sm">AI Hours Saved</p>
          </div>
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl font-bold counter" data-target="3">0</div>
            <p className="text-muted-foreground text-sm">Citations per Paper</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
