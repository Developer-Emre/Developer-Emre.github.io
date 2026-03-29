import type { ReactNode } from 'react';
import BackgroundScene from '../components/BackgroundScene';
import Navbar from './Navbar';
import Footer from './Footer';

interface RootLayoutProps {
  children: ReactNode;
}

/**
 * RootLayout
 * BackgroundScene + Navbar + içerik + Footer sarmalayıcısı.
 * Tüm sayfalar bu layout üzerinden render edilir.
 */
const RootLayout = ({ children }: RootLayoutProps) => (
  <>
    <a href="#main-content" className="skip-link">Skip to main content</a>
    <BackgroundScene />
    <Navbar />

    <main id="main-content" className="relative z-10">
      {children}
    </main>

    <Footer />
  </>
);

export default RootLayout;
