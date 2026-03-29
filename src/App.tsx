import RootLayout    from './layout/RootLayout';
import ErrorBoundary from './components/ErrorBoundary';
import About         from './sections/About';
import Experience    from './sections/Experience';
import Projects      from './sections/Projects';
import Skills        from './sections/Skills';
import Contact       from './sections/Contact';

function App() {
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
