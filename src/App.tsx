import { useEffect } from 'react';
import RootLayout    from './layout/RootLayout';
import ErrorBoundary from './components/ErrorBoundary';
import About         from './sections/About';
import Experience    from './sections/Experience';
import Projects      from './sections/Projects';
import Skills        from './sections/Skills';
import Contact       from './sections/Contact';
import { analytics } from './lib/analytics';

function App() {
  useEffect(() => {
    const trackedDepths = new Set<number>();
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight === 0) return;
      
      const scrolled = window.scrollY;
      const depth = Math.round((scrolled / scrollHeight) * 100);
      
      // Track at 25%, 50%, 75%, 100%
      const depths = [25, 50, 75, 100];
      depths.forEach(d => {
        if (depth >= d && !trackedDepths.has(d)) {
          trackedDepths.add(d);
          analytics.scrollDepth(d);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ErrorBoundary>
      <RootLayout>
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </RootLayout>
    </ErrorBoundary>
  );
}

export default App;
