import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import ContactSection from './components/ContactSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

function App() {
  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const target = e.target;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href').slice(1);
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 80, // Adjust for navbar height
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="bg-white">
      <Navbar />
      <main className="pt-16"> {/* Add padding-top for fixed navbar */}
        <Hero />
        <About />
        <Services />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

export default App;